"use client";

import { exerciseImage, type Exercise } from "@/lib/exercises";

/** Bottom-sheet with the two-frame demo animation and form instructions. */
export default function ExerciseSheet({
  exercise,
  onClose,
}: {
  exercise: Exercise;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/60" onClick={onClose}>
      <div
        className="max-h-[85dvh] w-full overflow-y-auto rounded-t-3xl border-t border-line bg-bg p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-bg-3" />
        <h3 className="mb-1 text-xl font-bold">{exercise.name}</h3>
        <p className="mb-4 text-xs capitalize text-ink-3">
          {exercise.primaryMuscles.join(", ")}
          {exercise.secondaryMuscles.length > 0 && ` (+ ${exercise.secondaryMuscles.join(", ")})`}
          {" · "}
          {exercise.equipment ?? "no equipment"} · {exercise.level}
        </p>

        {exercise.images.length >= 2 ? (
          <div className="relative mb-4 aspect-video overflow-hidden rounded-2xl bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={exerciseImage(exercise.images[1])}
              alt=""
              className="absolute inset-0 h-full w-full object-contain"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={exerciseImage(exercise.images[0])}
              alt={exercise.name}
              className="frame-a absolute inset-0 h-full w-full object-contain"
            />
          </div>
        ) : (
          exercise.images[0] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={exerciseImage(exercise.images[0])}
              alt={exercise.name}
              className="mb-4 aspect-video w-full rounded-2xl bg-white object-contain"
            />
          )
        )}

        <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-3">How to do it</h4>
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink-2">
          {exercise.instructions.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>

        <a
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
            exercise.name + " form"
          )}`}
          target="_blank"
          rel="noreferrer"
          className="mt-4 block w-full rounded-xl border border-line py-3 text-center text-sm font-bold text-accent"
        >
          Watch form videos ↗
        </a>
        <button onClick={onClose} className="mt-2 w-full rounded-xl bg-bg-2 py-3 font-bold text-ink-2">
          Close
        </button>
      </div>
    </div>
  );
}
