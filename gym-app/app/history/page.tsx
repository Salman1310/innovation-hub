"use client";

import { useEffect, useMemo, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import clsx from "clsx";
import { db, type Workout, type WorkoutSet } from "@/lib/db";
import { dateKey, fmtDuration, setVolume } from "@/lib/calc";
import { loadExercises, type Exercise } from "@/lib/exercises";

export default function HistoryPage() {
  const [month, setMonth] = useState(() => {
    const d = new Date();
    return { y: d.getFullYear(), m: d.getMonth() };
  });
  const [expanded, setExpanded] = useState<string | null>(null);
  const [exMap, setExMap] = useState<Map<string, Exercise>>(new Map());

  const workouts = useLiveQuery(
    () => db.workouts.filter((w) => !!w.endedAt).reverse().sortBy("startedAt"),
    []
  );
  const allSets = useLiveQuery(() => db.sets.toArray(), []);

  useEffect(() => {
    loadExercises().then((all) => setExMap(new Map(all.map((e) => [e.id, e]))));
  }, []);

  const setsByWorkout = useMemo(() => {
    const map = new Map<string, WorkoutSet[]>();
    for (const s of allSets ?? []) {
      if (!s.completedAt) continue;
      const arr = map.get(s.workoutId) ?? [];
      arr.push(s);
      map.set(s.workoutId, arr);
    }
    return map;
  }, [allSets]);

  const trainedDays = useMemo(
    () => new Set((workouts ?? []).map((w) => dateKey(w.startedAt))),
    [workouts]
  );

  // Calendar grid for the shown month.
  const first = new Date(month.y, month.m, 1);
  const startPad = (first.getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(month.y, month.m + 1, 0).getDate();
  const todayKey = dateKey(Date.now());

  return (
    <div className="px-4 pt-8">
      <h1 className="mb-4 px-1 text-2xl font-bold">History</h1>

      {/* Calendar */}
      <div className="card mb-5 p-4">
        <div className="mb-3 flex items-center justify-between">
          <button onClick={() => setMonth(prev(month))} className="px-2 text-ink-2">←</button>
          <span className="font-bold">
            {first.toLocaleString("en", { month: "long" })} {month.y}
          </span>
          <button onClick={() => setMonth(next(month))} className="px-2 text-ink-2">→</button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-ink-3">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {Array.from({ length: startPad }).map((_, i) => (
            <span key={`p${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const key = `${month.y}-${String(month.m + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;
            const trained = trainedDays.has(key);
            const isToday = key === todayKey;
            return (
              <div
                key={key}
                className={clsx(
                  "font-num flex h-9 items-center justify-center rounded-lg text-sm",
                  trained && "bg-accent font-black text-black",
                  !trained && isToday && "border border-accent text-accent",
                  !trained && !isToday && "text-ink-2"
                )}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
      </div>

      {/* Workout list */}
      <div className="space-y-3 pb-6">
        {(workouts ?? []).map((w) => (
          <WorkoutCard
            key={w.id}
            workout={w}
            sets={setsByWorkout.get(w.id) ?? []}
            exMap={exMap}
            expanded={expanded === w.id}
            onToggle={() => setExpanded(expanded === w.id ? null : w.id)}
          />
        ))}
        {workouts?.length === 0 && (
          <p className="py-10 text-center text-sm text-ink-3">
            No workouts yet. Hit <span className="font-bold text-accent">Train</span> to start your first one.
          </p>
        )}
      </div>
    </div>
  );
}

const prev = (m: { y: number; m: number }) =>
  m.m === 0 ? { y: m.y - 1, m: 11 } : { y: m.y, m: m.m - 1 };
const next = (m: { y: number; m: number }) =>
  m.m === 11 ? { y: m.y + 1, m: 0 } : { y: m.y, m: m.m + 1 };

function WorkoutCard({
  workout,
  sets,
  exMap,
  expanded,
  onToggle,
}: {
  workout: Workout;
  sets: WorkoutSet[];
  exMap: Map<string, Exercise>;
  expanded: boolean;
  onToggle: () => void;
}) {
  const volume = Math.round(sets.reduce((v, s) => v + setVolume(s.weightKg, s.reps), 0));
  const prCount = sets.filter((s) => s.isPr).length;

  const byExercise = useMemo(() => {
    const map = new Map<string, WorkoutSet[]>();
    for (const s of sets) {
      const arr = map.get(s.exerciseId) ?? [];
      arr.push(s);
      map.set(s.exerciseId, arr);
    }
    for (const arr of map.values()) arr.sort((a, b) => a.setNumber - b.setNumber);
    return map;
  }, [sets]);

  return (
    <button onClick={onToggle} className="card w-full p-4 text-left">
      <div className="flex items-center justify-between">
        <span className="font-bold">{workout.name}</span>
        <span className="text-xs text-ink-3">
          {new Date(workout.startedAt).toLocaleDateString("en", {
            day: "numeric",
            month: "short",
          })}
        </span>
      </div>
      <div className="mt-1 text-xs text-ink-3">
        {workout.endedAt ? fmtDuration(workout.endedAt - workout.startedAt) : ""} · {sets.length} sets ·{" "}
        {volume} kg
        {prCount > 0 && <span className="ml-1 font-bold text-energy">· {prCount} PR{prCount > 1 ? "s" : ""} 🏆</span>}
      </div>

      {expanded && (
        <div className="mt-3 space-y-3 border-t border-line pt-3">
          {workout.exerciseOrder
            .filter((exId) => byExercise.has(exId))
            .map((exId) => (
              <div key={exId}>
                <div className="mb-1 text-sm font-semibold">
                  {exMap.get(exId)?.name ?? exId.replace(/_/g, " ")}
                </div>
                <div className="font-num flex flex-wrap gap-1.5 text-xs text-ink-2">
                  {byExercise.get(exId)!.map((s) => (
                    <span
                      key={s.id}
                      className={clsx(
                        "rounded-md px-2 py-1",
                        s.isPr ? "bg-energy/15 font-bold text-energy" : "bg-bg-3"
                      )}
                    >
                      {s.weightKg ?? 0}kg × {s.reps ?? 0}
                      {s.rpe ? ` @${s.rpe}` : ""}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </button>
  );
}
