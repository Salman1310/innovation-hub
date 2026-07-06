"use client";

import { useMemo, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import clsx from "clsx";
import { db } from "@/lib/db";
import { generateDayPlan, swapOptions, type Meal, type Slot } from "@/lib/meals";

export default function NutritionPage() {
  const profile = useLiveQuery(() => db.profiles.get("me"), []);
  const goal = useLiveQuery(
    () => db.nutritionGoals.orderBy("effectiveFrom").reverse().first(),
    []
  );
  const [seed, setSeed] = useState(() => new Date().getDate());
  const [overrides, setOverrides] = useState<Record<number, Meal>>({});
  const [swapping, setSwapping] = useState<number | null>(null);
  const [showWhy, setShowWhy] = useState(false);

  const plan = useMemo(() => {
    if (!profile || !goal) return null;
    return generateDayPlan(goal.targetKcal, goal.proteinG, profile.dietType, seed, profile.dislikes);
  }, [profile, goal, seed]);

  const slots = useMemo(() => {
    if (!plan) return [];
    return plan.slots.map((s, i) => (overrides[i] ? { ...s, meal: overrides[i] } : s));
  }, [plan, overrides]);

  const totals = useMemo(
    () =>
      slots.reduce(
        (acc, s) => ({
          kcal: acc.kcal + s.meal.kcal * s.portion,
          protein: acc.protein + s.meal.proteinG * s.portion,
        }),
        { kcal: 0, protein: 0 }
      ),
    [slots]
  );

  if (!profile || !goal) return null;

  return (
    <div className="px-4 pt-8">
      <h1 className="mb-1 px-1 text-2xl font-bold">Nutrition</h1>
      <p className="mb-4 px-1 text-sm text-ink-2">Indian-first meal plan for your goal.</p>

      {/* Targets */}
      <div className="card mb-4 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-ink-3">Daily targets</span>
          <button onClick={() => setShowWhy(!showWhy)} className="text-xs font-semibold text-accent">
            {showWhy ? "Hide why" : "Why these numbers?"}
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center">
          <Target label="kcal" value={goal.targetKcal} />
          <Target label="protein" value={goal.proteinG} unit="g" highlight />
          <Target label="carbs" value={goal.carbsG} unit="g" />
          <Target label="fat" value={goal.fatG} unit="g" />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 text-center">
          <Target label="fiber" value={goal.fiberG} unit="g" small />
          <Target label="water" value={Math.round(goal.waterMl / 100) / 10} unit="L" small />
        </div>
        {showWhy && (
          <div className="mt-3 space-y-2 border-t border-line pt-3 text-xs leading-relaxed text-ink-2">
            {Object.entries(goal.rationale).map(([k, v]) => (
              <p key={k}>
                <span className="font-bold capitalize text-ink">{k}:</span> {v}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Day plan */}
      <div className="mb-2 flex items-center justify-between px-1">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-3">Today&apos;s plan</h2>
        <button
          onClick={() => {
            setOverrides({});
            setSeed((s) => s + 1);
          }}
          className="text-xs font-semibold text-accent"
        >
          ↻ New plan
        </button>
      </div>

      <div className="space-y-2.5 pb-4">
        {slots.map((s, i) => (
          <div key={i} className="card p-4">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent">{s.slot}</span>
              <button onClick={() => setSwapping(i)} className="text-xs font-semibold text-ink-3">
                Swap ⇄
              </button>
            </div>
            <div className="font-semibold">{s.meal.name}</div>
            <div className="mt-0.5 text-xs text-ink-3">
              {s.meal.serving}
              {s.portion !== 1 && ` × ${s.portion}`}
            </div>
            <div className="font-num mt-2 flex gap-3 text-xs text-ink-2">
              <span>{Math.round(s.meal.kcal * s.portion)} kcal</span>
              <span className="font-bold text-accent">{Math.round(s.meal.proteinG * s.portion)}g protein</span>
              <span>{Math.round(s.meal.carbsG * s.portion)}g carbs</span>
              <span>{Math.round(s.meal.fatG * s.portion)}g fat</span>
            </div>
          </div>
        ))}
      </div>

      {/* Plan total vs target */}
      <div className="card mb-4 p-4">
        <Bar label="Calories" value={Math.round(totals.kcal)} target={goal.targetKcal} unit="kcal" />
        <Bar label="Protein" value={Math.round(totals.protein)} target={goal.proteinG} unit="g" accent />
      </div>

      <p className="px-2 pb-6 text-center text-[10px] leading-relaxed text-ink-3">
        Macros assume standard home recipes (±15%). General information, not medical advice — for
        medical conditions, consult a doctor or registered dietitian before major diet changes.
      </p>

      {/* Swap sheet */}
      {swapping !== null && plan && (
        <SwapSheet
          current={slots[swapping].meal}
          slot={slots[swapping].slot}
          diet={profile.dietType}
          onPick={(meal) => {
            setOverrides((o) => ({ ...o, [swapping]: meal }));
            setSwapping(null);
          }}
          onClose={() => setSwapping(null)}
        />
      )}
    </div>
  );
}

function Target({
  label,
  value,
  unit = "",
  highlight,
  small,
}: {
  label: string;
  value: number;
  unit?: string;
  highlight?: boolean;
  small?: boolean;
}) {
  return (
    <div className={clsx("rounded-xl bg-bg-3 py-2", small && "py-1.5")}>
      <div className={clsx("font-num font-black", small ? "text-sm" : "text-lg", highlight && "text-accent")}>
        {value}
        <span className="text-xs font-bold">{unit}</span>
      </div>
      <div className="text-[10px] uppercase text-ink-3">{label}</div>
    </div>
  );
}

function Bar({
  label,
  value,
  target,
  unit,
  accent,
}: {
  label: string;
  value: number;
  target: number;
  unit: string;
  accent?: boolean;
}) {
  const pct = Math.min(100, (value / target) * 100);
  return (
    <div className="mb-3 last:mb-0">
      <div className="mb-1 flex justify-between text-xs">
        <span className="font-semibold text-ink-2">{label}</span>
        <span className="font-num text-ink-3">
          {value} / {target} {unit}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-bg-3">
        <div
          className={clsx("h-full rounded-full", accent ? "bg-accent" : "bg-good")}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function SwapSheet({
  current,
  slot,
  diet,
  onPick,
  onClose,
}: {
  current: Meal;
  slot: Slot;
  diet: Parameters<typeof swapOptions>[2];
  onPick: (m: Meal) => void;
  onClose: () => void;
}) {
  const options = swapOptions(current, slot, diet);
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/60" onClick={onClose}>
      <div
        className="max-h-[75dvh] w-full overflow-y-auto rounded-t-3xl border-t border-line bg-bg p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-bg-3" />
        <h3 className="mb-3 text-lg font-bold">Swap “{current.name}”</h3>
        <div className="space-y-2 pb-4">
          {options.map((m) => (
            <button key={m.id} onClick={() => onPick(m)} className="card w-full p-3.5 text-left active:bg-bg-3">
              <div className="font-semibold">{m.name}</div>
              <div className="font-num mt-1 text-xs text-ink-3">
                {m.kcal} kcal · {m.proteinG}g protein · {m.serving}
              </div>
            </button>
          ))}
          {options.length === 0 && (
            <p className="py-6 text-center text-sm text-ink-3">No similar meals for this slot yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
