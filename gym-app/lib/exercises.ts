// Exercise library loader — data from free-exercise-db (public domain).
// JSON bundled at public/data/exercises.json; images loaded from the
// project's GitHub raw CDN and cached by the service worker.

export interface Exercise {
  id: string;
  name: string;
  force: string | null;
  level: "beginner" | "intermediate" | "expert";
  mechanic: string | null;
  equipment: string | null;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  category: string;
  images: string[];
}

const IMG_BASE =
  "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/";

export const exerciseImage = (path: string) => `${IMG_BASE}${path}`;

let cache: Exercise[] | null = null;
let byIdCache: Map<string, Exercise> | null = null;
let pending: Promise<Exercise[]> | null = null;

export async function loadExercises(): Promise<Exercise[]> {
  if (cache) return cache;
  if (!pending) {
    pending = fetch("/data/exercises.json")
      .then((r) => r.json())
      .then((data: Exercise[]) => {
        cache = data;
        byIdCache = new Map(data.map((e) => [e.id, e]));
        return data;
      });
  }
  return pending;
}

export async function getExercise(id: string): Promise<Exercise | undefined> {
  await loadExercises();
  return byIdCache?.get(id);
}

export const MUSCLE_GROUPS = [
  "chest",
  "lats",
  "middle back",
  "lower back",
  "traps",
  "shoulders",
  "biceps",
  "triceps",
  "forearms",
  "quadriceps",
  "hamstrings",
  "glutes",
  "calves",
  "abdominals",
  "adductors",
  "abductors",
] as const;

export const EQUIPMENT_FILTERS = [
  { key: "barbell", label: "Barbell" },
  { key: "dumbbell", label: "Dumbbell" },
  { key: "machine", label: "Machine" },
  { key: "cable", label: "Cable" },
  { key: "body only", label: "Bodyweight" },
  { key: "bands", label: "Bands" },
  { key: "kettlebells", label: "Kettlebell" },
] as const;

export function filterExercises(
  all: Exercise[],
  opts: { q?: string; muscle?: string; equipment?: string; level?: string }
): Exercise[] {
  const q = opts.q?.trim().toLowerCase();
  return all.filter((e) => {
    if (q && !e.name.toLowerCase().includes(q)) return false;
    if (opts.muscle && !e.primaryMuscles.includes(opts.muscle)) return false;
    if (opts.equipment && e.equipment !== opts.equipment) return false;
    if (opts.level && e.level !== opts.level) return false;
    return true;
  });
}
