import Dexie, { type EntityTable } from "dexie";

// ── Types ──────────────────────────────────────────────────────

export type Goal =
  | "fat_loss"
  | "muscle_gain"
  | "lean_bulk"
  | "maintenance"
  | "strength"
  | "recomp";

export type Experience = "beginner" | "intermediate" | "advanced";
export type DietType = "veg" | "eggetarian" | "nonveg" | "vegan";
export type CoachStyle = "friendly" | "strict" | "scientific" | "motivational";

export interface Profile {
  id: string; // always "me" — single-user app
  displayName: string;
  sex: "male" | "female";
  age: number;
  heightCm: number;
  weightKg: number;
  goal: Goal;
  experience: Experience;
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very_active";
  trainingDaysPerWeek: number;
  equipment: string[];
  injuries: string[];
  medicalFlags: string[];
  dietType: DietType;
  dislikes: string[];
  coachStyle: CoachStyle;
  units: "kg" | "lb";
  createdAt: number;
  updatedAt: number;
}

export interface NutritionGoal {
  id: string;
  effectiveFrom: number;
  tdeeKcal: number;
  targetKcal: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG: number;
  waterMl: number;
  rationale: Record<string, string>;
}

export type SetType = "warmup" | "working" | "drop" | "failure";

export interface WorkoutSet {
  id: string;
  workoutId: string;
  exerciseId: string;
  position: number; // order of exercise within workout
  setNumber: number;
  setType: SetType;
  reps?: number;
  weightKg?: number;
  rpe?: number;
  notes?: string;
  isPr: boolean;
  completedAt?: number; // undefined = not yet done
}

export interface Workout {
  id: string;
  templateId?: string;
  name: string;
  startedAt: number;
  endedAt?: number; // undefined = active workout
  bodyweightKg?: number;
  notes?: string;
  exerciseOrder: string[]; // exercise ids in order
}

export interface TemplateExercise {
  exerciseId: string;
  targetSets: number;
  repMin: number;
  repMax: number;
  restSeconds: number;
}

export interface WorkoutTemplate {
  id: string;
  name: string;
  description: string;
  goalTag: string;
  builtin: boolean;
  exercises: TemplateExercise[];
  createdAt: number;
}

export interface ProgressRecord {
  id: string;
  exerciseId: string;
  kind: "max_weight" | "e1rm" | "max_reps";
  value: number;
  reps?: number;
  weightKg?: number;
  setId: string;
  achievedAt: number;
}

export interface BodyMeasurement {
  id: string;
  measuredAt: number;
  weightKg?: number;
  waistCm?: number;
  chestCm?: number;
  hipsCm?: number;
  bicepCm?: number;
  thighCm?: number;
  notes?: string;
}

export interface MealLog {
  id: string;
  loggedAt: number;
  dateKey: string; // YYYY-MM-DD
  slot: "breakfast" | "lunch" | "dinner" | "snack";
  mealId?: string;
  name: string;
  portion: number;
  kcal: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
}

export interface Setting {
  key: string;
  value: string;
}

// ── Database ───────────────────────────────────────────────────

export class RepBaseDB extends Dexie {
  profiles!: EntityTable<Profile, "id">;
  nutritionGoals!: EntityTable<NutritionGoal, "id">;
  workouts!: EntityTable<Workout, "id">;
  sets!: EntityTable<WorkoutSet, "id">;
  templates!: EntityTable<WorkoutTemplate, "id">;
  progressRecords!: EntityTable<ProgressRecord, "id">;
  bodyMeasurements!: EntityTable<BodyMeasurement, "id">;
  mealLogs!: EntityTable<MealLog, "id">;
  settings!: EntityTable<Setting, "key">;

  constructor() {
    super("repbase");
    this.version(1).stores({
      profiles: "id",
      nutritionGoals: "id, effectiveFrom",
      workouts: "id, startedAt, endedAt",
      sets: "id, workoutId, exerciseId, completedAt, [exerciseId+completedAt]",
      templates: "id, name",
      progressRecords: "id, exerciseId, [exerciseId+kind], achievedAt",
      bodyMeasurements: "id, measuredAt",
      mealLogs: "id, dateKey, loggedAt",
      settings: "key",
    });
  }
}

export const db = new RepBaseDB();

export const uid = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;

// ── Backup / restore ───────────────────────────────────────────

const TABLES = [
  "profiles",
  "nutritionGoals",
  "workouts",
  "sets",
  "templates",
  "progressRecords",
  "bodyMeasurements",
  "mealLogs",
  "settings",
] as const;

export async function exportAll(): Promise<string> {
  const dump: Record<string, unknown[]> = {};
  for (const t of TABLES) {
    dump[t] = await db.table(t).toArray();
  }
  return JSON.stringify(
    { app: "repbase", schema: 1, exportedAt: new Date().toISOString(), data: dump },
    null,
    1
  );
}

export async function importAll(json: string): Promise<void> {
  const parsed = JSON.parse(json);
  if (parsed?.app !== "repbase" || !parsed.data) {
    throw new Error("Not a RepBase backup file");
  }
  await db.transaction("rw", TABLES.map((t) => db.table(t)), async () => {
    for (const t of TABLES) {
      await db.table(t).clear();
      if (Array.isArray(parsed.data[t]) && parsed.data[t].length) {
        await db.table(t).bulkPut(parsed.data[t]);
      }
    }
  });
}
