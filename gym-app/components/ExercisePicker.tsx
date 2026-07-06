"use client";

import { useEffect, useMemo, useState } from "react";
import {
  loadExercises,
  filterExercises,
  exerciseImage,
  MUSCLE_GROUPS,
  type Exercise,
} from "@/lib/exercises";

export default function ExercisePicker({
  onPick,
  onClose,
}: {
  onPick: (e: Exercise) => void;
  onClose: () => void;
}) {
  const [all, setAll] = useState<Exercise[]>([]);
  const [q, setQ] = useState("");
  const [muscle, setMuscle] = useState("");

  useEffect(() => {
    loadExercises().then(setAll);
  }, []);

  const results = useMemo(
    () => filterExercises(all, { q, muscle }).slice(0, 60),
    [all, q, muscle]
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-bg">
      <div className="border-b border-line p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">Add exercise</h2>
          <button onClick={onClose} className="rounded-lg px-3 py-1.5 text-sm font-semibold text-ink-2">
            Close
          </button>
        </div>
        <input
          autoFocus
          className="w-full rounded-xl border border-line bg-bg-2 px-4 py-3 outline-none focus:border-accent"
          placeholder="Search 870+ exercises…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
          <Chip active={!muscle} onClick={() => setMuscle("")}>
            All
          </Chip>
          {MUSCLE_GROUPS.map((mg) => (
            <Chip key={mg} active={muscle === mg} onClick={() => setMuscle(mg)}>
              {mg}
            </Chip>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {results.map((e) => (
          <button
            key={e.id}
            onClick={() => onPick(e)}
            className="flex w-full items-center gap-3 border-b border-line px-4 py-3 text-left active:bg-bg-2"
          >
            {e.images[0] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={exerciseImage(e.images[0])}
                alt=""
                loading="lazy"
                className="h-12 w-12 rounded-lg bg-white object-cover"
              />
            )}
            <div className="min-w-0">
              <div className="truncate font-semibold">{e.name}</div>
              <div className="text-xs text-ink-3">
                {e.primaryMuscles.join(", ")} · {e.equipment ?? "no equipment"}
              </div>
            </div>
          </button>
        ))}
        {all.length > 0 && results.length === 0 && (
          <p className="p-6 text-center text-sm text-ink-3">No matches.</p>
        )}
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold capitalize ${
        active ? "border-accent bg-accent-dim text-accent" : "border-line bg-bg-2 text-ink-2"
      }`}
    >
      {children}
    </button>
  );
}
