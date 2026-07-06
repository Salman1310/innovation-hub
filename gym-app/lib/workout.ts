import { db, uid, type Workout, type WorkoutSet, type WorkoutTemplate } from "./db";
import { e1rm } from "./calc";

/** The one active (unfinished) workout, if any. */
export function activeWorkoutQuery() {
  return db.workouts.filter((w) => w.endedAt === undefined).first();
}

export async function startWorkout(template?: WorkoutTemplate): Promise<Workout> {
  const existing = await activeWorkoutQuery();
  if (existing) return existing;
  const w: Workout = {
    id: uid(),
    templateId: template?.id,
    name: template?.name ?? "Workout",
    startedAt: Date.now(),
    exerciseOrder: template ? template.exercises.map((e) => e.exerciseId) : [],
  };
  await db.workouts.add(w);
  if (template) {
    const sets: WorkoutSet[] = [];
    template.exercises.forEach((te, pos) => {
      for (let i = 0; i < te.targetSets; i++) {
        sets.push({
          id: uid(),
          workoutId: w.id,
          exerciseId: te.exerciseId,
          position: pos,
          setNumber: i + 1,
          setType: "working",
          isPr: false,
        });
      }
    });
    await db.sets.bulkAdd(sets);
  }
  return w;
}

/** Duplicate the most recent finished workout (exercises + set counts + weights prefilled). */
export async function repeatLastWorkout(): Promise<Workout | null> {
  const last = await db.workouts.orderBy("startedAt").reverse().filter((w) => !!w.endedAt).first();
  if (!last) return null;
  const lastSets = await db.sets.where("workoutId").equals(last.id).toArray();
  const w: Workout = {
    id: uid(),
    templateId: last.templateId,
    name: last.name,
    startedAt: Date.now(),
    exerciseOrder: [...last.exerciseOrder],
  };
  await db.workouts.add(w);
  await db.sets.bulkAdd(
    lastSets
      .sort((a, b) => a.position - b.position || a.setNumber - b.setNumber)
      .map((s) => ({
        id: uid(),
        workoutId: w.id,
        exerciseId: s.exerciseId,
        position: s.position,
        setNumber: s.setNumber,
        setType: s.setType,
        weightKg: s.weightKg, // prefill last weights; user confirms/edits
        reps: s.reps,
        isPr: false,
      }))
  );
  return w;
}

export async function addExercise(workout: Workout, exerciseId: string) {
  if (workout.exerciseOrder.includes(exerciseId)) return;
  const position = workout.exerciseOrder.length;
  await db.workouts.update(workout.id, {
    exerciseOrder: [...workout.exerciseOrder, exerciseId],
  });
  const sets: WorkoutSet[] = [1, 2, 3].map((n) => ({
    id: uid(),
    workoutId: workout.id,
    exerciseId,
    position,
    setNumber: n,
    setType: "working",
    isPr: false,
  }));
  await db.sets.bulkAdd(sets);
}

export async function removeExercise(workout: Workout, exerciseId: string) {
  await db.sets.where("workoutId").equals(workout.id).filter((s) => s.exerciseId === exerciseId).delete();
  await db.workouts.update(workout.id, {
    exerciseOrder: workout.exerciseOrder.filter((e) => e !== exerciseId),
  });
}

export async function addSet(workoutId: string, exerciseId: string) {
  const existing = await db.sets
    .where("workoutId")
    .equals(workoutId)
    .filter((s) => s.exerciseId === exerciseId)
    .toArray();
  const last = existing.sort((a, b) => a.setNumber - b.setNumber).at(-1);
  await db.sets.add({
    id: uid(),
    workoutId,
    exerciseId,
    position: last?.position ?? 0,
    setNumber: (last?.setNumber ?? 0) + 1,
    setType: "working",
    weightKg: last?.weightKg,
    reps: last?.reps,
    isPr: false,
  });
}

export async function deleteSet(setId: string) {
  await db.sets.delete(setId);
}

/**
 * Mark a set complete and detect PRs (max weight and e1RM) against
 * all-time records for the exercise. Returns which PRs were hit.
 */
export async function completeSet(
  set: WorkoutSet,
  weightKg: number | undefined,
  reps: number | undefined,
  rpe?: number
): Promise<{ prWeight: boolean; prE1rm: boolean }> {
  const result = { prWeight: false, prE1rm: false };
  const now = Date.now();

  if (set.setType === "working" && weightKg && reps) {
    const [maxW, maxE] = await Promise.all([
      db.progressRecords.where("[exerciseId+kind]").equals([set.exerciseId, "max_weight"]).first(),
      db.progressRecords.where("[exerciseId+kind]").equals([set.exerciseId, "e1rm"]).first(),
    ]);
    const est = e1rm(weightKg, reps);
    if (!maxW || weightKg > maxW.value) {
      result.prWeight = !!maxW; // first-ever entry isn't celebrated as a PR
      await db.progressRecords.put({
        id: maxW?.id ?? uid(),
        exerciseId: set.exerciseId,
        kind: "max_weight",
        value: weightKg,
        reps,
        weightKg,
        setId: set.id,
        achievedAt: now,
      });
    }
    if (!maxE || est > maxE.value) {
      result.prE1rm = !!maxE;
      await db.progressRecords.put({
        id: maxE?.id ?? uid(),
        exerciseId: set.exerciseId,
        kind: "e1rm",
        value: est,
        reps,
        weightKg,
        setId: set.id,
        achievedAt: now,
      });
    }
  }

  await db.sets.update(set.id, {
    weightKg,
    reps,
    rpe,
    completedAt: now,
    isPr: result.prWeight || result.prE1rm,
  });
  return result;
}

export async function uncompleteSet(setId: string) {
  await db.sets.update(setId, { completedAt: undefined, isPr: false });
}

export async function finishWorkout(workout: Workout) {
  // Drop untouched placeholder sets.
  await db.sets
    .where("workoutId")
    .equals(workout.id)
    .filter((s) => !s.completedAt)
    .delete();
  const remaining = await db.sets.where("workoutId").equals(workout.id).count();
  if (remaining === 0) {
    await db.workouts.delete(workout.id);
    return null;
  }
  await db.workouts.update(workout.id, { endedAt: Date.now() });
  return workout.id;
}

export async function cancelWorkout(workoutId: string) {
  await db.sets.where("workoutId").equals(workoutId).delete();
  await db.workouts.delete(workoutId);
}

/** Last completed performance for an exercise: sets from its most recent finished workout. */
export async function previousPerformance(exerciseId: string, excludeWorkoutId: string) {
  const done = await db.sets
    .where("exerciseId")
    .equals(exerciseId)
    .filter((s) => !!s.completedAt && s.workoutId !== excludeWorkoutId)
    .toArray();
  if (!done.length) return null;
  const byWorkout = new Map<string, typeof done>();
  for (const s of done) {
    const arr = byWorkout.get(s.workoutId) ?? [];
    arr.push(s);
    byWorkout.set(s.workoutId, arr);
  }
  let bestTs = 0;
  let bestSets: typeof done = [];
  for (const sets of byWorkout.values()) {
    const ts = Math.max(...sets.map((s) => s.completedAt!));
    if (ts > bestTs) {
      bestTs = ts;
      bestSets = sets;
    }
  }
  return bestSets.sort((a, b) => a.setNumber - b.setNumber);
}
