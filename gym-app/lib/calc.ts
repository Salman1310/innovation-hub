import type { Goal, NutritionGoal, Profile } from "./db";

// ── Strength math ──────────────────────────────────────────────

/** Epley estimated 1RM, capped at 10 reps where the formula stays sane. */
export function e1rm(weightKg: number, reps: number): number {
  if (reps <= 0 || weightKg <= 0) return 0;
  const r = Math.min(reps, 10);
  return Math.round(weightKg * (1 + r / 30) * 10) / 10;
}

export function setVolume(weightKg?: number, reps?: number): number {
  return (weightKg ?? 0) * (reps ?? 0);
}

// ── Nutrition math (Mifflin-St Jeor) ───────────────────────────

const ACTIVITY_MULT: Record<Profile["activityLevel"], number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.65,
  very_active: 1.725,
};

const GOAL_ADJUST: Record<Goal, number> = {
  fat_loss: -0.2,
  muscle_gain: 0.15,
  lean_bulk: 0.1,
  maintenance: 0,
  strength: 0.05,
  recomp: 0,
};

const GOAL_PROTEIN_PER_KG: Record<Goal, number> = {
  fat_loss: 2.2,
  muscle_gain: 1.8,
  lean_bulk: 1.9,
  maintenance: 1.6,
  strength: 1.8,
  recomp: 2.0,
};

export function bmr(p: Pick<Profile, "sex" | "age" | "heightCm" | "weightKg">): number {
  const base = 10 * p.weightKg + 6.25 * p.heightCm - 5 * p.age;
  return Math.round(p.sex === "male" ? base + 5 : base - 161);
}

export function computeNutritionGoal(p: Profile): Omit<NutritionGoal, "id" | "effectiveFrom"> {
  const bmrKcal = bmr(p);
  const tdee = Math.round(bmrKcal * ACTIVITY_MULT[p.activityLevel]);
  // Safety floor: never eat below BMR; deficit capped at 25%.
  const raw = Math.round(tdee * (1 + GOAL_ADJUST[p.goal]));
  const target = Math.max(raw, bmrKcal, Math.round(tdee * 0.75));

  const proteinG = Math.round(GOAL_PROTEIN_PER_KG[p.goal] * p.weightKg);
  const fatG = Math.max(Math.round((target * 0.25) / 9), Math.round(0.6 * p.weightKg));
  const carbsG = Math.max(0, Math.round((target - proteinG * 4 - fatG * 9) / 4));
  const fiberG = Math.round((target / 1000) * 14);
  const waterMl = Math.round(35 * p.weightKg);

  const goalLabel = GOAL_LABELS[p.goal];
  return {
    tdeeKcal: tdee,
    targetKcal: target,
    proteinG,
    carbsG,
    fatG,
    fiberG,
    waterMl,
    rationale: {
      tdee: `Your body burns ~${tdee} kcal/day (BMR ${bmrKcal} × activity ${ACTIVITY_MULT[p.activityLevel]}).`,
      calories:
        p.goal === "fat_loss"
          ? `A moderate ~20% deficit — enough to lose fat steadily without wrecking energy or muscle. Never set below your BMR.`
          : p.goal === "lean_bulk" || p.goal === "muscle_gain"
          ? `A controlled surplus for ${goalLabel.toLowerCase()} — big enough to build, small enough to limit fat gain.`
          : `Eating at maintenance supports ${goalLabel.toLowerCase()} while your training drives the adaptation.`,
      protein: `${GOAL_PROTEIN_PER_KG[p.goal]} g/kg bodyweight — ${
        p.goal === "fat_loss" ? "high protein protects muscle in a deficit." : "enough to maximise muscle repair and growth."
      }`,
      fat: `At least 25% of calories (min 0.6 g/kg) to keep hormones healthy.`,
      carbs: `The rest goes to carbs — they fuel your training.`,
      fiber: `14 g per 1000 kcal, the standard gut-health guideline.`,
      water: `~35 ml per kg bodyweight; add ~500 ml on training days.`,
    },
  };
}

export const GOAL_LABELS: Record<Goal, string> = {
  fat_loss: "Fat loss",
  muscle_gain: "Muscle gain",
  lean_bulk: "Lean bulk",
  maintenance: "Maintenance",
  strength: "Strength",
  recomp: "Recomposition",
};

// ── Dates / streaks ────────────────────────────────────────────

export function dateKey(ts: number): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

/** Weekly streak: consecutive calendar weeks (ending this week) with ≥1 workout. */
export function weeklyStreak(workoutTimestamps: number[]): number {
  if (!workoutTimestamps.length) return 0;
  const weekOf = (ts: number) => {
    const d = new Date(ts);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); // Monday
    return d.getTime();
  };
  const weeks = new Set(workoutTimestamps.map(weekOf));
  let streak = 0;
  let cursor = weekOf(Date.now());
  const WEEK = 7 * 24 * 3600 * 1000;
  // current week counts if trained; otherwise start from last week
  if (!weeks.has(cursor)) cursor -= WEEK;
  while (weeks.has(cursor)) {
    streak++;
    cursor -= WEEK;
  }
  return streak;
}

export function fmtDuration(ms: number): string {
  const m = Math.round(ms / 60000);
  return m < 60 ? `${m} min` : `${Math.floor(m / 60)}h ${m % 60}m`;
}

export function fmtWeight(kg: number, units: "kg" | "lb" = "kg"): string {
  return units === "lb" ? `${Math.round(kg * 2.20462 * 10) / 10} lb` : `${kg} kg`;
}
