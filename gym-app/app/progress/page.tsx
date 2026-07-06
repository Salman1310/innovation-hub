"use client";

import { useEffect, useMemo, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import clsx from "clsx";
import { db, uid } from "@/lib/db";
import { e1rm } from "@/lib/calc";
import { loadExercises, type Exercise } from "@/lib/exercises";
import LineChart from "@/components/LineChart";

export default function ProgressPage() {
  const [exMap, setExMap] = useState<Map<string, Exercise>>(new Map());
  const [selected, setSelected] = useState<string>("");
  const [newWeight, setNewWeight] = useState("");

  const allSets = useLiveQuery(
    () => db.sets.filter((s) => !!s.completedAt).toArray(),
    []
  );
  const measurements = useLiveQuery(
    () => db.bodyMeasurements.orderBy("measuredAt").toArray(),
    []
  );
  const records = useLiveQuery(() => db.progressRecords.toArray(), []);

  useEffect(() => {
    loadExercises().then((all) => setExMap(new Map(all.map((e) => [e.id, e]))));
  }, []);

  // Exercises with logged history, most-logged first.
  const trained = useMemo(() => {
    const counts = new Map<string, number>();
    for (const s of allSets ?? []) counts.set(s.exerciseId, (counts.get(s.exerciseId) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([id]) => id);
  }, [allSets]);

  useEffect(() => {
    if (!selected && trained.length) setSelected(trained[0]);
  }, [trained, selected]);

  // Best e1RM per day for the selected exercise.
  const e1rmPoints = useMemo(() => {
    const byDay = new Map<string, { x: number; y: number }>();
    for (const s of allSets ?? []) {
      if (s.exerciseId !== selected || !s.weightKg || !s.reps) continue;
      const est = e1rm(s.weightKg, s.reps);
      const day = new Date(s.completedAt!).toDateString();
      const cur = byDay.get(day);
      if (!cur || est > cur.y) byDay.set(day, { x: s.completedAt!, y: est });
    }
    return [...byDay.values()].sort((a, b) => a.x - b.x);
  }, [allSets, selected]);

  const bests = useMemo(() => {
    const w = (records ?? []).find((r) => r.exerciseId === selected && r.kind === "max_weight");
    const e = (records ?? []).find((r) => r.exerciseId === selected && r.kind === "e1rm");
    return { w, e };
  }, [records, selected]);

  const weightPoints = (measurements ?? [])
    .filter((m) => m.weightKg)
    .map((m) => ({ x: m.measuredAt, y: m.weightKg! }));

  async function logWeight() {
    const w = Number(newWeight);
    if (!w || w < 20 || w > 400) return;
    await db.bodyMeasurements.add({ id: uid(), measuredAt: Date.now(), weightKg: w });
    const p = await db.profiles.get("me");
    if (p) await db.profiles.update("me", { weightKg: w, updatedAt: Date.now() });
    setNewWeight("");
  }

  return (
    <div className="px-4 pt-8">
      <h1 className="mb-4 px-1 text-2xl font-bold">Progress</h1>

      {/* Strength */}
      <div className="card mb-4 p-4">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-ink-3">
          Strength — estimated 1RM
        </div>
        {trained.length === 0 ? (
          <p className="py-6 text-center text-sm text-ink-3">Log workouts to see strength trends.</p>
        ) : (
          <>
            <div className="mb-3 flex gap-1.5 overflow-x-auto pb-1">
              {trained.slice(0, 12).map((id) => (
                <button
                  key={id}
                  onClick={() => setSelected(id)}
                  className={clsx(
                    "whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold",
                    selected === id
                      ? "border-accent bg-accent-dim text-accent"
                      : "border-line bg-bg-2 text-ink-2"
                  )}
                >
                  {exMap.get(id)?.name ?? id.replace(/_/g, " ")}
                </button>
              ))}
            </div>
            <LineChart points={e1rmPoints} unit="kg" />
            <div className="mt-3 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-xl bg-bg-3 p-2.5">
                <div className="font-num text-lg font-black text-energy">
                  {bests.w ? `${bests.w.weightKg}kg × ${bests.w.reps}` : "—"}
                </div>
                <div className="text-[10px] uppercase text-ink-3">Best set</div>
              </div>
              <div className="rounded-xl bg-bg-3 p-2.5">
                <div className="font-num text-lg font-black text-accent">
                  {bests.e ? `${bests.e.value} kg` : "—"}
                </div>
                <div className="text-[10px] uppercase text-ink-3">Est. 1RM</div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bodyweight */}
      <div className="card mb-6 p-4">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-ink-3">Bodyweight</div>
        <LineChart points={weightPoints} unit="kg" color="var(--good)" height={120} />
        <div className="mt-3 flex gap-2">
          <input
            type="number"
            inputMode="decimal"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            placeholder="Today's weight (kg)"
            className="font-num flex-1 rounded-xl border border-line bg-bg px-4 py-3 outline-none focus:border-accent"
          />
          <button
            onClick={logWeight}
            className="rounded-xl bg-accent px-5 font-bold text-black disabled:opacity-40"
            disabled={!newWeight}
          >
            Log
          </button>
        </div>
      </div>
    </div>
  );
}
