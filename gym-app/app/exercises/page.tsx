"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import {
  loadExercises,
  filterExercises,
  exerciseImage,
  MUSCLE_GROUPS,
  EQUIPMENT_FILTERS,
  type Exercise,
} from "@/lib/exercises";
import ExerciseSheet from "@/components/ExerciseSheet";

export default function ExercisesPage() {
  const [all, setAll] = useState<Exercise[]>([]);
  const [q, setQ] = useState("");
  const [muscle, setMuscle] = useState("");
  const [equipment, setEquipment] = useState("");
  const [level, setLevel] = useState("");
  const [selected, setSelected] = useState<Exercise | null>(null);
  const [limit, setLimit] = useState(50);

  useEffect(() => {
    loadExercises().then(setAll);
  }, []);

  const results = useMemo(
    () => filterExercises(all, { q, muscle, equipment, level }),
    [all, q, muscle, equipment, level]
  );

  return (
    <div className="px-4 pt-8">
      <h1 className="mb-1 px-1 text-2xl font-bold">Exercise library</h1>
      <p className="mb-4 px-1 text-sm text-ink-2">
        {all.length ? `${results.length} of ${all.length} exercises` : "Loading…"}
      </p>

      <input
        className="mb-2 w-full rounded-xl border border-line bg-bg-2 px-4 py-3 outline-none focus:border-accent"
        placeholder="Search exercises…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <FilterRow>
        <Chip active={!muscle} onClick={() => setMuscle("")}>All muscles</Chip>
        {MUSCLE_GROUPS.map((mg) => (
          <Chip key={mg} active={muscle === mg} onClick={() => setMuscle(muscle === mg ? "" : mg)}>
            {mg}
          </Chip>
        ))}
      </FilterRow>
      <FilterRow>
        <Chip active={!equipment} onClick={() => setEquipment("")}>Any equipment</Chip>
        {EQUIPMENT_FILTERS.map((eq) => (
          <Chip
            key={eq.key}
            active={equipment === eq.key}
            onClick={() => setEquipment(equipment === eq.key ? "" : eq.key)}
          >
            {eq.label}
          </Chip>
        ))}
      </FilterRow>
      <FilterRow>
        {["beginner", "intermediate", "expert"].map((lv) => (
          <Chip key={lv} active={level === lv} onClick={() => setLevel(level === lv ? "" : lv)}>
            {lv}
          </Chip>
        ))}
      </FilterRow>

      <div className="mt-3 space-y-2">
        {results.slice(0, limit).map((e) => (
          <button
            key={e.id}
            onClick={() => setSelected(e)}
            className="card flex w-full items-center gap-3 p-3 text-left active:bg-bg-3"
          >
            {e.images[0] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={exerciseImage(e.images[0])}
                alt=""
                loading="lazy"
                className="h-14 w-14 rounded-lg bg-white object-cover"
              />
            )}
            <div className="min-w-0 flex-1">
              <div className="truncate font-semibold">{e.name}</div>
              <div className="text-xs capitalize text-ink-3">
                {e.primaryMuscles.join(", ")} · {e.equipment ?? "no equipment"}
              </div>
            </div>
            <span
              className={clsx(
                "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                e.level === "beginner" && "bg-good/15 text-good",
                e.level === "intermediate" && "bg-warn/15 text-warn",
                e.level === "expert" && "bg-bad/15 text-bad"
              )}
            >
              {e.level}
            </span>
          </button>
        ))}
        {results.length > limit && (
          <button
            onClick={() => setLimit((l) => l + 50)}
            className="w-full rounded-xl border border-line py-3 text-sm font-bold text-ink-2"
          >
            Show more ({results.length - limit} left)
          </button>
        )}
      </div>

      {selected && <ExerciseSheet exercise={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function FilterRow({ children }: { children: React.ReactNode }) {
  return <div className="mb-1.5 flex gap-1.5 overflow-x-auto pb-1">{children}</div>;
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
      className={clsx(
        "whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold capitalize",
        active ? "border-accent bg-accent-dim text-accent" : "border-line bg-bg-2 text-ink-2"
      )}
    >
      {children}
    </button>
  );
}
