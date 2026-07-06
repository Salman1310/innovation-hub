"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { weeklyStreak, setVolume, GOAL_LABELS } from "@/lib/calc";
import { loadExercises, type Exercise } from "@/lib/exercises";
import LineChart from "@/components/LineChart";

export default function Dashboard() {
  const profile = useLiveQuery(() => db.profiles.get("me"), []);
  const goal = useLiveQuery(
    () => db.nutritionGoals.orderBy("effectiveFrom").reverse().first(),
    []
  );
  const workouts = useLiveQuery(
    () => db.workouts.filter((w) => !!w.endedAt).toArray(),
    []
  );
  const allSets = useLiveQuery(() => db.sets.toArray(), []);
  const prs = useLiveQuery(
    () => db.progressRecords.orderBy("achievedAt").reverse().limit(4).toArray(),
    []
  );
  const weights = useLiveQuery(
    () => db.bodyMeasurements.orderBy("measuredAt").toArray(),
    []
  );
  const recommended = useLiveQuery(async () => {
    const s = await db.settings.get("recommendedTemplates");
    return s ? (JSON.parse(s.value) as string[]) : [];
  }, []);
  const templates = useLiveQuery(() => db.templates.toArray(), []);
  const [exMap, setExMap] = useState<Map<string, Exercise>>(new Map());

  useEffect(() => {
    loadExercises().then((all) => setExMap(new Map(all.map((e) => [e.id, e]))));
  }, []);

  const streak = useMemo(
    () => weeklyStreak((workouts ?? []).map((w) => w.startedAt)),
    [workouts]
  );

  const weekStats = useMemo(() => {
    if (!workouts || !allSets) return { count: 0, volume: 0, sets: 0 };
    const monday = new Date();
    monday.setHours(0, 0, 0, 0);
    monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
    const ids = new Set(workouts.filter((w) => w.startedAt >= monday.getTime()).map((w) => w.id));
    let volume = 0;
    let sets = 0;
    for (const s of allSets) {
      if (ids.has(s.workoutId) && s.completedAt) {
        volume += setVolume(s.weightKg, s.reps);
        sets++;
      }
    }
    return { count: ids.size, volume: Math.round(volume), sets };
  }, [workouts, allSets]);

  // Next suggested routine: least-recently-used among recommended.
  const nextTemplate = useMemo(() => {
    if (!templates || !recommended?.length) return null;
    const lastUse = new Map<string, number>();
    for (const w of workouts ?? []) {
      if (w.templateId) lastUse.set(w.templateId, Math.max(lastUse.get(w.templateId) ?? 0, w.startedAt));
    }
    const candidates = templates.filter((t) => recommended.includes(t.id));
    candidates.sort((a, b) => (lastUse.get(a.id) ?? 0) - (lastUse.get(b.id) ?? 0));
    return candidates[0] ?? null;
  }, [templates, recommended, workouts]);

  const weightPoints = (weights ?? [])
    .filter((m) => m.weightKg)
    .map((m) => ({ x: m.measuredAt, y: m.weightKg! }));

  if (!profile) return null;

  return (
    <div className="px-4 pb-6 pt-8">
      <div className="mb-6 flex items-start justify-between px-1">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-accent">RepBase</div>
          <h1 className="text-2xl font-bold">
            {new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 17 ? "Good afternoon" : "Good evening"}
          </h1>
          <p className="text-sm text-ink-2">Goal: {GOAL_LABELS[profile.goal]}</p>
        </div>
        <Link href="/settings" className="rounded-xl border border-line p-2.5 text-lg leading-none">
          ⚙
        </Link>
      </div>

      {/* Streak + week stats */}
      <div className="mb-4 grid grid-cols-3 gap-3">
        <Stat label="Week streak" value={String(streak)} accent={streak > 0} suffix={streak === 1 ? "week" : "weeks"} />
        <Stat label="This week" value={String(weekStats.count)} suffix={`workout${weekStats.count === 1 ? "" : "s"}`} />
        <Stat label="Volume" value={weekStats.volume >= 1000 ? `${(weekStats.volume / 1000).toFixed(1)}t` : String(weekStats.volume)} suffix={weekStats.volume >= 1000 ? "lifted" : "kg lifted"} />
      </div>

      {/* Today's workout */}
      {nextTemplate && (
        <Link href="/workout" className="card mb-4 block p-4 active:bg-bg-3">
          <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-accent">Up next</div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold">{nextTemplate.name}</div>
              <div className="text-xs text-ink-3">
                {nextTemplate.exercises.length} exercises ·{" "}
                {nextTemplate.exercises
                  .slice(0, 3)
                  .map((e) => exMap.get(e.exerciseId)?.name ?? e.exerciseId.replace(/_/g, " "))
                  .join(", ")}
                …
              </div>
            </div>
            <span className="accent-glow flex h-11 w-11 items-center justify-center rounded-full bg-accent text-xl font-black text-black">
              →
            </span>
          </div>
        </Link>
      )}

      {/* Macros snapshot */}
      {goal && (
        <Link href="/nutrition" className="card mb-4 block p-4 active:bg-bg-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-ink-3">Daily targets</span>
            <span className="text-xs font-semibold text-accent">Meal plan →</span>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center">
            <Macro label="kcal" value={goal.targetKcal} />
            <Macro label="protein" value={goal.proteinG} unit="g" highlight />
            <Macro label="carbs" value={goal.carbsG} unit="g" />
            <Macro label="fat" value={goal.fatG} unit="g" />
          </div>
        </Link>
      )}

      {/* Recent PRs */}
      {(prs ?? []).length > 0 && (
        <div className="card mb-4 p-4">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-ink-3">Recent records</div>
          <div className="space-y-2">
            {prs!.map((pr) => (
              <div key={pr.id} className="flex items-center justify-between text-sm">
                <span className="truncate pr-2">
                  🏆 {exMap.get(pr.exerciseId)?.name ?? pr.exerciseId.replace(/_/g, " ")}
                </span>
                <span className="font-num whitespace-nowrap font-bold text-energy">
                  {pr.kind === "e1rm" ? `${pr.value} e1RM` : `${pr.weightKg}kg × ${pr.reps}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bodyweight trend */}
      <div className="card mb-4 p-4">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-ink-3">Bodyweight</span>
          <Link href="/progress" className="text-xs font-semibold text-accent">
            Progress →
          </Link>
        </div>
        <LineChart points={weightPoints} unit="kg" height={110} />
      </div>

      <p className="px-2 text-center text-[10px] leading-relaxed text-ink-3">
        RepBase gives general fitness information, not medical advice. Train smart — pain is a stop
        signal.
      </p>
    </div>
  );
}

function Stat({
  label,
  value,
  suffix,
  accent,
}: {
  label: string;
  value: string;
  suffix?: string;
  accent?: boolean;
}) {
  return (
    <div className="card p-3">
      <div className="text-[10px] font-bold uppercase tracking-wider text-ink-3">{label}</div>
      <div className={`font-num text-2xl font-black ${accent ? "text-accent" : ""}`}>{value}</div>
      {suffix && <div className="text-[10px] text-ink-3">{suffix}</div>}
    </div>
  );
}

function Macro({
  label,
  value,
  unit = "",
  highlight,
}: {
  label: string;
  value: number;
  unit?: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className={`font-num text-lg font-bold ${highlight ? "text-accent" : ""}`}>
        {value}
        <span className="text-xs">{unit}</span>
      </div>
      <div className="text-[10px] uppercase text-ink-3">{label}</div>
    </div>
  );
}
