import type { WorkoutTemplate } from "./db";

// Built-in routine templates. Exercise IDs verified against the bundled
// free-exercise-db dataset.

const t = (
  id: string,
  name: string,
  description: string,
  goalTag: string,
  exercises: [string, number, number, number, number][] // [exerciseId, sets, repMin, repMax, restSec]
): WorkoutTemplate => ({
  id,
  name,
  description,
  goalTag,
  builtin: true,
  createdAt: 0,
  exercises: exercises.map(([exerciseId, targetSets, repMin, repMax, restSeconds]) => ({
    exerciseId,
    targetSets,
    repMin,
    repMax,
    restSeconds,
  })),
});

export const BUILTIN_TEMPLATES: WorkoutTemplate[] = [
  t("ppl-push", "Push Day", "Chest, shoulders, triceps — part of Push/Pull/Legs.", "Hypertrophy", [
    ["Barbell_Bench_Press_-_Medium_Grip", 4, 6, 10, 150],
    ["Barbell_Incline_Bench_Press_-_Medium_Grip", 3, 8, 12, 120],
    ["Seated_Dumbbell_Press", 3, 8, 12, 120],
    ["Side_Lateral_Raise", 3, 12, 20, 75],
    ["Cable_Crossover", 3, 12, 15, 75],
    ["Triceps_Pushdown", 3, 10, 15, 75],
  ]),
  t("ppl-pull", "Pull Day", "Back and biceps — part of Push/Pull/Legs.", "Hypertrophy", [
    ["Barbell_Deadlift", 3, 4, 6, 180],
    ["Pullups", 3, 6, 12, 150],
    ["Bent_Over_Barbell_Row", 3, 8, 12, 120],
    ["Seated_Cable_Rows", 3, 10, 12, 90],
    ["Face_Pull", 3, 12, 20, 75],
    ["Barbell_Curl", 3, 8, 12, 75],
    ["Hammer_Curls", 2, 10, 15, 75],
  ]),
  t("ppl-legs", "Leg Day", "Quads, hamstrings, glutes, calves — part of Push/Pull/Legs.", "Hypertrophy", [
    ["Barbell_Squat", 4, 5, 8, 180],
    ["Romanian_Deadlift", 3, 8, 12, 150],
    ["Leg_Press", 3, 10, 15, 120],
    ["Lying_Leg_Curls", 3, 10, 15, 90],
    ["Leg_Extensions", 3, 12, 15, 75],
    ["Standing_Calf_Raises", 4, 10, 15, 60],
  ]),
  t("upper", "Upper Body", "Chest, back, shoulders, arms — Upper/Lower split.", "Hypertrophy", [
    ["Barbell_Bench_Press_-_Medium_Grip", 4, 6, 10, 150],
    ["Bent_Over_Barbell_Row", 4, 6, 10, 150],
    ["Barbell_Shoulder_Press", 3, 8, 12, 120],
    ["Wide-Grip_Lat_Pulldown", 3, 10, 12, 90],
    ["Barbell_Curl", 3, 10, 12, 75],
    ["Triceps_Pushdown", 3, 10, 12, 75],
  ]),
  t("lower", "Lower Body", "Squat and hinge focused — Upper/Lower split.", "Hypertrophy", [
    ["Barbell_Squat", 4, 5, 8, 180],
    ["Romanian_Deadlift", 3, 8, 10, 150],
    ["Barbell_Lunge", 3, 8, 12, 120],
    ["Lying_Leg_Curls", 3, 10, 15, 90],
    ["Standing_Calf_Raises", 4, 10, 15, 60],
    ["Hanging_Leg_Raise", 3, 10, 15, 60],
  ]),
  t("fullbody", "Full Body", "Efficient all-round session — great at 2–3 days/week.", "General", [
    ["Barbell_Squat", 3, 5, 8, 180],
    ["Barbell_Bench_Press_-_Medium_Grip", 3, 6, 10, 150],
    ["Bent_Over_Barbell_Row", 3, 8, 10, 120],
    ["Seated_Dumbbell_Press", 2, 8, 12, 90],
    ["Romanian_Deadlift", 2, 8, 12, 120],
    ["Plank", 3, 30, 60, 60],
  ]),
  t("strength-a", "Strength A (Squat focus)", "Heavy compounds, low reps — strength emphasis.", "Strength", [
    ["Barbell_Squat", 5, 3, 5, 210],
    ["Barbell_Bench_Press_-_Medium_Grip", 5, 3, 5, 210],
    ["Bent_Over_Barbell_Row", 4, 5, 6, 180],
    ["Plank", 3, 30, 60, 60],
  ]),
  t("strength-b", "Strength B (Deadlift focus)", "Heavy hinge and press — strength emphasis.", "Strength", [
    ["Barbell_Deadlift", 5, 3, 5, 240],
    ["Barbell_Shoulder_Press", 5, 4, 6, 180],
    ["Pullups", 4, 5, 8, 150],
    ["Hanging_Leg_Raise", 3, 8, 12, 75],
  ]),
  t("home-db", "Home Dumbbell", "Dumbbells-only full body for home training.", "General", [
    ["Goblet_Squat", 4, 8, 12, 120],
    ["Dumbbell_Bench_Press", 4, 8, 12, 120],
    ["Seated_Dumbbell_Press", 3, 8, 12, 90],
    ["Side_Lateral_Raise", 3, 12, 20, 60],
    ["Hammer_Curls", 3, 10, 15, 60],
    ["Russian_Twist", 3, 15, 25, 60],
  ]),
];

/** Pick a starting split from onboarding answers. */
export function recommendTemplates(daysPerWeek: number, goal: string, equipment: string[]): string[] {
  const homeOnly = equipment.length > 0 && !equipment.includes("barbell") && !equipment.includes("machine");
  if (homeOnly) return ["home-db"];
  if (goal === "strength") return ["strength-a", "strength-b"];
  if (daysPerWeek <= 3) return ["fullbody"];
  if (daysPerWeek === 4) return ["upper", "lower"];
  return ["ppl-push", "ppl-pull", "ppl-legs"];
}
