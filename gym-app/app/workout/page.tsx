"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLiveQuery } from "dexie-react-hooks";
import clsx from "clsx";
import { db, type Workout, type WorkoutSet, type WorkoutTemplate } from "@/lib/db";
import {
  activeWorkoutQuery,
  startWorkout,
  repeatLastWorkout,
  addExercise,
  removeExercise,
  addSet,
  deleteSet,
  completeSet,
  uncompleteSet,
  finishWorkout,
  cancelWorkout,
} from "@/lib/workout";
import { loadExercises, exerciseImage, type Exercise } from "@/lib/exercises";
import { setVolume } from "@/lib/calc";
import ExercisePicker from "@/components/ExercisePicker";
import ExerciseSheet from "@/components/ExerciseSheet";

export default function WorkoutPage() {
  // null = "no active workout"; undefined = still loading
  const workout = useLiveQuery(async () => (await activeWorkoutQuery()) ?? null, []);
  if (workout === undefined) return null;
  return workout ? <ActiveWorkout workout={workout} /> : <StartScreen />;
}

// ── Start screen ───────────────────────────────────────────────

function StartScreen() {
  const templates = useLiveQuery(() => db.templates.toArray(), []);
  const recommended = useLiveQuery(async () => {
    const s = await db.settings.get("recommendedTemplates");
    return s ? (JSON.parse(s.value) as string[]) : [];
  }, []);
  const hasHistory = useLiveQuery(
    () => db.workouts.filter((w) => !!w.endedAt).count(),
    []
  );

  const sorted = useMemo(() => {
    if (!templates) return [];
    const rec = recommended ?? [];
    return [...templates].sort(
      (a, b) => (rec.includes(b.id) ? 1 : 0) - (rec.includes(a.id) ? 1 : 0)
    );
  }, [templates, recommended]);

  return (
    <div className="px-5 pb-28 pt-8">
      <h1 className="mb-1 text-2xl font-bold">Start training</h1>
      <p className="mb-6 text-sm text-ink-2">Pick a routine or go freestyle.</p>

      <div className="mb-6 grid grid-cols-2 gap-3">
        <button
          onClick={() => startWorkout()}
          className="card flex flex-col items-start gap-1 p-4 text-left active:bg-bg-3"
        >
          <span className="text-xl">🏋️</span>
          <span className="font-bold">Empty workout</span>
          <span className="text-xs text-ink-3">Add exercises as you go</span>
        </button>
        <button
          onClick={() => repeatLastWorkout()}
          disabled={!hasHistory}
          className="card flex flex-col items-start gap-1 p-4 text-left active:bg-bg-3 disabled:opacity-40"
        >
          <span className="text-xl">🔁</span>
          <span className="font-bold">Repeat last</span>
          <span className="text-xs text-ink-3">Same exercises, weights prefilled</span>
        </button>
      </div>

      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-3">Routines</h2>
      <div className="space-y-3">
        {sorted.map((t) => (
          <TemplateCard key={t.id} template={t} starred={(recommended ?? []).includes(t.id)} />
        ))}
      </div>
    </div>
  );
}

function TemplateCard({ template, starred }: { template: WorkoutTemplate; starred: boolean }) {
  return (
    <button
      onClick={() => startWorkout(template)}
      className="card w-full p-4 text-left active:bg-bg-3"
    >
      <div className="flex items-center justify-between">
        <span className="font-bold">
          {template.name}
          {starred && <span className="ml-2 rounded-full bg-accent-dim px-2 py-0.5 text-[10px] font-bold text-accent">FOR YOU</span>}
        </span>
        <span className="text-xs text-ink-3">{template.exercises.length} exercises</span>
      </div>
      <p className="mt-1 text-xs text-ink-3">{template.description}</p>
    </button>
  );
}

// ── Active workout ─────────────────────────────────────────────

function ActiveWorkout({ workout }: { workout: Workout }) {
  const router = useRouter();
  const [exMap, setExMap] = useState<Map<string, Exercise>>(new Map());
  const [showPicker, setShowPicker] = useState(false);
  const [rest, setRest] = useState<{ endsAt: number; total: number } | null>(null);
  const [prFlash, setPrFlash] = useState<string | null>(null);
  const [confirmEnd, setConfirmEnd] = useState<"finish" | "cancel" | null>(null);

  const sets = useLiveQuery(
    () => db.sets.where("workoutId").equals(workout.id).toArray(),
    [workout.id]
  );
  const template = useLiveQuery(
    () => (workout.templateId ? db.templates.get(workout.templateId) : undefined),
    [workout.templateId]
  );

  useEffect(() => {
    loadExercises().then((all) => setExMap(new Map(all.map((e) => [e.id, e]))));
  }, []);

  // Keep the screen awake mid-workout so the rest timer always fires.
  useEffect(() => {
    let lock: { release: () => Promise<void> } | null = null;
    const request = async () => {
      try {
        lock = await navigator.wakeLock?.request("screen");
      } catch {}
    };
    request();
    const onVis = () => document.visibilityState === "visible" && request();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      lock?.release().catch(() => {});
    };
  }, []);

  const restFor = useCallback(
    (exerciseId: string) =>
      template?.exercises.find((e) => e.exerciseId === exerciseId)?.restSeconds ?? 120,
    [template]
  );

  const onSetDone = useCallback(
    (exerciseId: string, pr: boolean, exName: string) => {
      const seconds = restFor(exerciseId);
      setRest({ endsAt: Date.now() + seconds * 1000, total: seconds });
      if (pr) {
        setPrFlash(exName);
        setTimeout(() => setPrFlash(null), 2600);
        if ("vibrate" in navigator) navigator.vibrate?.([60, 40, 120]);
      }
    },
    [restFor]
  );

  const byExercise = useMemo(() => {
    const map = new Map<string, WorkoutSet[]>();
    for (const s of sets ?? []) {
      const arr = map.get(s.exerciseId) ?? [];
      arr.push(s);
      map.set(s.exerciseId, arr);
    }
    for (const arr of map.values()) arr.sort((a, b) => a.setNumber - b.setNumber);
    return map;
  }, [sets]);

  const doneCount = (sets ?? []).filter((s) => s.completedAt).length;
  const volume = (sets ?? []).reduce(
    (v, s) => v + (s.completedAt ? setVolume(s.weightKg, s.reps) : 0),
    0
  );

  async function handleFinish() {
    const id = await finishWorkout(workout);
    router.push(id ? "/history" : "/");
  }

  return (
    <div className="pb-40">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-line bg-bg/95 px-4 pb-3 pt-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">{workout.name}</h1>
            <Elapsed since={workout.startedAt} extra={`${doneCount} sets · ${Math.round(volume)} kg volume`} />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setConfirmEnd("cancel")}
              className="rounded-xl border border-line px-3 py-2 text-xs font-bold text-ink-3"
            >
              Discard
            </button>
            <button
              onClick={() => setConfirmEnd("finish")}
              className="rounded-xl bg-accent px-4 py-2 text-sm font-bold text-black"
            >
              Finish
            </button>
          </div>
        </div>
      </div>

      {/* PR flash */}
      {prFlash && (
        <div className="pr-pop energy-gradient fixed left-1/2 top-20 z-50 -translate-x-1/2 rounded-full px-5 py-2.5 text-sm font-black text-black shadow-xl">
          🏆 PR — {prFlash}!
        </div>
      )}

      {/* Exercises */}
      <div className="space-y-5 px-4 pt-4">
        {workout.exerciseOrder.map((exId) => (
          <ExerciseBlock
            key={exId}
            workout={workout}
            exercise={exMap.get(exId)}
            exerciseId={exId}
            sets={byExercise.get(exId) ?? []}
            onSetDone={onSetDone}
          />
        ))}

        <button
          onClick={() => setShowPicker(true)}
          className="w-full rounded-2xl border-2 border-dashed border-line py-4 font-bold text-accent active:bg-bg-2"
        >
          ＋ Add exercise
        </button>
      </div>

      {/* Rest timer */}
      {rest && <RestTimer rest={rest} onChange={setRest} />}

      {/* Confirm dialogs */}
      {confirmEnd && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4">
          <div className="card w-full max-w-md p-5">
            <h3 className="mb-1 text-lg font-bold">
              {confirmEnd === "finish" ? "Finish workout?" : "Discard workout?"}
            </h3>
            <p className="mb-4 text-sm text-ink-2">
              {confirmEnd === "finish"
                ? `${doneCount} completed sets will be saved. Empty sets are dropped.`
                : "This deletes the session and all its sets."}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmEnd(null)}
                className="flex-1 rounded-xl border border-line py-3 font-semibold text-ink-2"
              >
                Back
              </button>
              <button
                onClick={() =>
                  confirmEnd === "finish" ? handleFinish() : cancelWorkout(workout.id).then(() => router.push("/"))
                }
                className={clsx(
                  "flex-1 rounded-xl py-3 font-bold",
                  confirmEnd === "finish" ? "bg-accent text-black" : "bg-bad/20 text-bad"
                )}
              >
                {confirmEnd === "finish" ? "Finish" : "Discard"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showPicker && (
        <ExercisePicker
          onClose={() => setShowPicker(false)}
          onPick={(e) => {
            addExercise(workout, e.id);
            setShowPicker(false);
          }}
        />
      )}
    </div>
  );
}

function Elapsed({ since, extra }: { since: number; extra: string }) {
  const [, tick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => tick((x) => x + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const s = Math.floor((Date.now() - since) / 1000);
  const mm = Math.floor(s / 60);
  const label = mm >= 60 ? `${Math.floor(mm / 60)}h ${mm % 60}m` : `${mm}:${String(s % 60).padStart(2, "0")}`;
  return (
    <p className="font-num text-xs text-ink-3">
      {label} · {extra}
    </p>
  );
}

// ── Exercise block with set rows ───────────────────────────────

function ExerciseBlock({
  workout,
  exercise,
  exerciseId,
  sets,
  onSetDone,
}: {
  workout: Workout;
  exercise?: Exercise;
  exerciseId: string;
  sets: WorkoutSet[];
  onSetDone: (exerciseId: string, pr: boolean, exName: string) => void;
}) {
  const [prev, setPrev] = useState<WorkoutSet[] | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    import("@/lib/workout").then(({ previousPerformance }) =>
      previousPerformance(exerciseId, workout.id).then(setPrev)
    );
  }, [exerciseId, workout.id]);

  const name = exercise?.name ?? exerciseId.replace(/_/g, " ");

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between px-4 pt-3.5">
        <button onClick={() => setShowInfo(true)} className="flex items-center gap-2 text-left">
          {exercise?.images[0] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={exerciseImage(exercise.images[0])}
              alt=""
              loading="lazy"
              className="h-9 w-9 rounded-md bg-white object-cover"
            />
          )}
          <span className="font-bold leading-tight">{name}</span>
        </button>
        <button
          onClick={() => removeExercise(workout, exerciseId)}
          className="px-2 text-xs font-semibold text-ink-3"
        >
          ✕
        </button>
      </div>

      <div className="px-4 pb-4 pt-2">
        <div className="mb-1 grid grid-cols-[2rem_1fr_4.5rem_4rem_3rem_2.75rem] items-center gap-2 text-[10px] font-bold uppercase tracking-wide text-ink-3">
          <span>Set</span>
          <span>Previous</span>
          <span className="text-center">kg</span>
          <span className="text-center">Reps</span>
          <span className="text-center">RPE</span>
          <span />
        </div>
        {sets.map((s, i) => (
          <SetRow
            key={s.id}
            set={s}
            prev={prev?.[i]}
            exName={name}
            onDone={(pr) => onSetDone(exerciseId, pr, name)}
          />
        ))}
        <button
          onClick={() => addSet(workout.id, exerciseId)}
          className="mt-2 w-full rounded-xl bg-bg-3 py-2.5 text-sm font-bold text-ink-2 active:bg-line"
        >
          ＋ Add set
        </button>
      </div>

      {showInfo && exercise && <ExerciseSheet exercise={exercise} onClose={() => setShowInfo(false)} />}
    </div>
  );
}

function SetRow({
  set,
  prev,
  onDone,
}: {
  set: WorkoutSet;
  prev?: WorkoutSet;
  exName: string;
  onDone: (pr: boolean) => void;
}) {
  const [weight, setWeight] = useState<string>(set.weightKg?.toString() ?? "");
  const [reps, setReps] = useState<string>(set.reps?.toString() ?? "");
  const [rpe, setRpe] = useState<string>(set.rpe?.toString() ?? "");
  const done = !!set.completedAt;

  // Prefill from previous session when both fields are empty.
  useEffect(() => {
    if (!set.weightKg && !set.reps && prev && weight === "" && reps === "") {
      if (prev.weightKg) setWeight(String(prev.weightKg));
      if (prev.reps) setReps(String(prev.reps));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prev]);

  async function toggle() {
    if (done) {
      await uncompleteSet(set.id);
      return;
    }
    const w = weight ? Number(weight) : undefined;
    const r = reps ? Number(reps) : undefined;
    const { prWeight, prE1rm } = await completeSet(set, w, r, rpe ? Number(rpe) : undefined);
    onDone(prWeight || prE1rm);
  }

  return (
    <div
      className={clsx(
        "grid grid-cols-[2rem_1fr_4.5rem_4rem_3rem_2.75rem] items-center gap-2 rounded-lg py-1",
        done && "opacity-90"
      )}
    >
      <span className={clsx("font-num text-sm font-bold", set.isPr ? "text-energy" : "text-ink-3")}>
        {set.isPr ? "🏆" : set.setNumber}
      </span>
      <span className="font-num truncate text-xs text-ink-3">
        {prev?.weightKg ? `${prev.weightKg}kg × ${prev.reps}` : "—"}
      </span>
      <NumInput value={weight} onChange={setWeight} done={done} step={2.5} />
      <NumInput value={reps} onChange={setReps} done={done} step={1} />
      <NumInput value={rpe} onChange={setRpe} done={done} step={0.5} placeholder="·" />
      <button
        onClick={toggle}
        className={clsx(
          "flex h-10 w-10 items-center justify-center rounded-xl text-lg font-black transition-colors",
          done ? "bg-good text-black" : "bg-bg-3 text-ink-3 active:bg-line"
        )}
      >
        ✓
      </button>
    </div>
  );
}

function NumInput({
  value,
  onChange,
  done,
  placeholder = "0",
}: {
  value: string;
  onChange: (v: string) => void;
  done: boolean;
  step: number;
  placeholder?: string;
}) {
  return (
    <input
      type="number"
      inputMode="decimal"
      value={value}
      disabled={done}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={clsx(
        "font-num h-10 w-full rounded-xl border bg-bg px-1 text-center text-base font-bold outline-none",
        done ? "border-transparent text-good" : "border-line focus:border-accent"
      )}
    />
  );
}

// ── Rest timer bar ─────────────────────────────────────────────

function RestTimer({
  rest,
  onChange,
}: {
  rest: { endsAt: number; total: number };
  onChange: (r: { endsAt: number; total: number } | null) => void;
}) {
  const [now, setNow] = useState(Date.now());
  const beeped = useRef(false);

  useEffect(() => {
    beeped.current = false;
    const t = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(t);
  }, [rest.endsAt]);

  const remaining = Math.max(0, Math.round((rest.endsAt - now) / 1000));

  useEffect(() => {
    if (remaining === 0 && !beeped.current) {
      beeped.current = true;
      beep();
      if ("vibrate" in navigator) navigator.vibrate?.([180, 90, 180]);
      const t = setTimeout(() => onChange(null), 2500);
      return () => clearTimeout(t);
    }
  }, [remaining, onChange]);

  const pct = Math.min(100, (remaining / rest.total) * 100);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-lg border-t border-line bg-bg-2/95 px-4 pb-[max(env(safe-area-inset-bottom),10px)] pt-3 backdrop-blur">
      <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-bg-3">
        <div
          className={clsx("h-full rounded-full transition-all", remaining === 0 ? "bg-good" : "bg-accent")}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-ink-3">
          {remaining === 0 ? "Go! Next set" : "Rest"}
        </span>
        <span className="font-num text-2xl font-black">
          {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onChange({ ...rest, endsAt: rest.endsAt - 15000 })}
            className="rounded-lg border border-line px-2.5 py-1.5 text-xs font-bold text-ink-2"
          >
            −15s
          </button>
          <button
            onClick={() => onChange({ endsAt: rest.endsAt + 15000, total: rest.total + 15 })}
            className="rounded-lg border border-line px-2.5 py-1.5 text-xs font-bold text-ink-2"
          >
            ＋15s
          </button>
          <button
            onClick={() => onChange(null)}
            className="rounded-lg bg-bg-3 px-2.5 py-1.5 text-xs font-bold text-ink-2"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}

function beep() {
  try {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    [0, 0.22, 0.44].forEach((t, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = i === 2 ? 1320 : 880;
      o.connect(g);
      g.connect(ctx.destination);
      g.gain.setValueAtTime(0.25, ctx.currentTime + t);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.18);
      o.start(ctx.currentTime + t);
      o.stop(ctx.currentTime + t + 0.2);
    });
  } catch {}
}
