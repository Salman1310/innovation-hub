"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { db, uid, type Goal, type DietType, type Experience, type CoachStyle, type Profile } from "@/lib/db";
import { computeNutritionGoal, GOAL_LABELS } from "@/lib/calc";
import { BUILTIN_TEMPLATES, recommendTemplates } from "@/lib/templates";

const STEPS = ["Goal", "You", "Training", "Diet", "Safety"] as const;

const EQUIPMENT_OPTIONS = ["barbell", "dumbbell", "machine", "cable", "bands", "bodyweight only"];

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);

  const [goal, setGoal] = useState<Goal>("muscle_gain");
  const [experience, setExperience] = useState<Experience>("beginner");
  const [sex, setSex] = useState<"male" | "female">("male");
  const [age, setAge] = useState(25);
  const [heightCm, setHeightCm] = useState(172);
  const [weightKg, setWeightKg] = useState(70);
  const [activity, setActivity] = useState<Profile["activityLevel"]>("light");
  const [days, setDays] = useState(4);
  const [equipment, setEquipment] = useState<string[]>(["barbell", "dumbbell", "machine", "cable"]);
  const [diet, setDiet] = useState<DietType>("nonveg");
  const [injuries, setInjuries] = useState("");
  const [medical, setMedical] = useState(false);
  const [style, setStyle] = useState<CoachStyle>("friendly");
  const [accepted, setAccepted] = useState(false);

  async function finish() {
    setSaving(true);
    const now = Date.now();
    const profile: Profile = {
      id: "me",
      displayName: "You",
      sex,
      age,
      heightCm,
      weightKg,
      goal,
      experience,
      activityLevel: activity,
      trainingDaysPerWeek: days,
      equipment,
      injuries: injuries ? injuries.split(",").map((s) => s.trim()) : [],
      medicalFlags: medical ? ["self_reported_condition"] : [],
      dietType: diet,
      dislikes: [],
      coachStyle: style,
      units: "kg",
      createdAt: now,
      updatedAt: now,
    };
    await db.profiles.put(profile);
    const goalCalc = computeNutritionGoal(profile);
    await db.nutritionGoals.put({ id: uid(), effectiveFrom: now, ...goalCalc });
    // Seed built-in templates, starred set chosen by onboarding answers.
    await db.templates.bulkPut(BUILTIN_TEMPLATES.map((t) => ({ ...t, createdAt: now })));
    await db.settings.put({
      key: "recommendedTemplates",
      value: JSON.stringify(recommendTemplates(days, goal, equipment)),
    });
    await db.bodyMeasurements.put({ id: uid(), measuredAt: now, weightKg });
    router.replace("/");
  }

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));

  return (
    <div className="flex min-h-dvh flex-col px-5 pb-8 pt-10">
      <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">RepBase</div>
      <h1 className="mb-1 text-2xl font-bold">Let&apos;s set you up</h1>
      <div className="mb-6 flex gap-1.5">
        {STEPS.map((s, i) => (
          <div
            key={s}
            className={clsx("h-1 flex-1 rounded-full", i <= step ? "bg-accent" : "bg-bg-3")}
          />
        ))}
      </div>

      <div className="flex-1 space-y-6 fade-up" key={step}>
        {step === 0 && (
          <>
            <Section title="What's your main goal?">
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(GOAL_LABELS) as Goal[]).map((g) => (
                  <Choice key={g} active={goal === g} onClick={() => setGoal(g)}>
                    {GOAL_LABELS[g]}
                  </Choice>
                ))}
              </div>
            </Section>
            <Section title="Training experience">
              <div className="grid grid-cols-3 gap-2">
                {(["beginner", "intermediate", "advanced"] as Experience[]).map((e) => (
                  <Choice key={e} active={experience === e} onClick={() => setExperience(e)}>
                    {e[0].toUpperCase() + e.slice(1)}
                  </Choice>
                ))}
              </div>
            </Section>
          </>
        )}

        {step === 1 && (
          <>
            <Section title="About you">
              <div className="grid grid-cols-2 gap-2">
                <Choice active={sex === "male"} onClick={() => setSex("male")}>Male</Choice>
                <Choice active={sex === "female"} onClick={() => setSex("female")}>Female</Choice>
              </div>
            </Section>
            <NumField label="Age" value={age} set={setAge} min={13} max={90} suffix="yrs" />
            <NumField label="Height" value={heightCm} set={setHeightCm} min={120} max={230} suffix="cm" />
            <NumField label="Weight" value={weightKg} set={setWeightKg} min={30} max={250} suffix="kg" />
            <Section title="Daily activity (outside the gym)">
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    ["sedentary", "Desk job, little walking"],
                    ["light", "Some walking daily"],
                    ["moderate", "On my feet a lot"],
                    ["active", "Physical job"],
                  ] as const
                ).map(([k, d]) => (
                  <Choice key={k} active={activity === k} onClick={() => setActivity(k)} desc={d}>
                    {k[0].toUpperCase() + k.slice(1)}
                  </Choice>
                ))}
              </div>
            </Section>
          </>
        )}

        {step === 2 && (
          <>
            <Section title="Days per week you can train">
              <div className="grid grid-cols-6 gap-2">
                {[2, 3, 4, 5, 6, 7].map((d) => (
                  <Choice key={d} active={days === d} onClick={() => setDays(d)}>
                    {d}
                  </Choice>
                ))}
              </div>
            </Section>
            <Section title="Equipment you have access to">
              <div className="grid grid-cols-2 gap-2">
                {EQUIPMENT_OPTIONS.map((eq) => (
                  <Choice
                    key={eq}
                    active={equipment.includes(eq)}
                    onClick={() =>
                      setEquipment((cur) =>
                        cur.includes(eq) ? cur.filter((x) => x !== eq) : [...cur, eq]
                      )
                    }
                  >
                    {eq[0].toUpperCase() + eq.slice(1)}
                  </Choice>
                ))}
              </div>
            </Section>
            <Section title="Coaching style you prefer">
              <div className="grid grid-cols-2 gap-2">
                {(["friendly", "strict", "scientific", "motivational"] as CoachStyle[]).map((s) => (
                  <Choice key={s} active={style === s} onClick={() => setStyle(s)}>
                    {s[0].toUpperCase() + s.slice(1)}
                  </Choice>
                ))}
              </div>
            </Section>
          </>
        )}

        {step === 3 && (
          <Section title="Food preference">
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  ["veg", "Vegetarian"],
                  ["eggetarian", "Eggetarian"],
                  ["nonveg", "Non-vegetarian"],
                  ["vegan", "Vegan"],
                ] as [DietType, string][]
              ).map(([k, label]) => (
                <Choice key={k} active={diet === k} onClick={() => setDiet(k)}>
                  {label}
                </Choice>
              ))}
            </div>
            <p className="mt-3 text-sm text-ink-2">
              Meal plans are Indian-first with global options — dal, paneer, eggs, chicken, soya and
              more, matched to your calories and protein.
            </p>
          </Section>
        )}

        {step === 4 && (
          <>
            <Section title="Injuries or pain areas (optional)">
              <input
                className="w-full rounded-xl border border-line bg-bg-2 px-4 py-3 text-ink outline-none focus:border-accent"
                placeholder="e.g. lower back, left shoulder"
                value={injuries}
                onChange={(e) => setInjuries(e.target.value)}
              />
            </Section>
            <label className="flex items-start gap-3 text-sm text-ink-2">
              <input
                type="checkbox"
                checked={medical}
                onChange={(e) => setMedical(e.target.checked)}
                className="mt-1 accent-[--accent]"
              />
              I have a medical condition (diabetes, heart/kidney issues, pregnancy, eating-disorder
              history, etc.)
            </label>
            {medical && (
              <div className="card p-4 text-sm text-warn">
                Because of your condition, RepBase will keep recommendations conservative — and you
                should consult a doctor or registered dietitian before making major diet or training
                changes.
              </div>
            )}
            <div className="card p-4 text-xs leading-relaxed text-ink-3">
              RepBase provides general fitness and nutrition information, not medical advice. It is
              not a substitute for a doctor, registered dietitian, or qualified professional. Stop
              any exercise that causes pain (pain is different from muscle fatigue) and seek
              professional guidance when in doubt.
            </div>
            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-1 accent-[--accent]"
              />
              I understand and accept this.
            </label>
          </>
        )}
      </div>

      <div className="mt-8 flex gap-3">
        {step > 0 && (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="rounded-xl border border-line px-5 py-3.5 font-semibold text-ink-2"
          >
            Back
          </button>
        )}
        {step < STEPS.length - 1 ? (
          <button
            onClick={next}
            className="flex-1 rounded-xl bg-accent py-3.5 font-bold text-black"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={finish}
            disabled={!accepted || saving}
            className="flex-1 rounded-xl bg-accent py-3.5 font-bold text-black disabled:opacity-40"
          >
            {saving ? "Setting up…" : "Build my plan"}
          </button>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-2.5 text-sm font-semibold text-ink-2">{title}</h2>
      {children}
    </div>
  );
}

function Choice({
  active,
  onClick,
  children,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  desc?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "rounded-xl border px-3 py-3 text-left text-sm font-semibold transition-colors",
        active ? "border-accent bg-accent-dim text-accent" : "border-line bg-bg-2 text-ink"
      )}
    >
      {children}
      {desc && <div className="mt-0.5 text-[11px] font-normal text-ink-3">{desc}</div>}
    </button>
  );
}

function NumField({
  label,
  value,
  set,
  min,
  max,
  suffix,
}: {
  label: string;
  value: number;
  set: (n: number) => void;
  min: number;
  max: number;
  suffix: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm font-semibold text-ink-2">{label}</span>
      <div className="flex items-center gap-2">
        <Stepper onClick={() => set(Math.max(min, value - 1))}>−</Stepper>
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(e) => set(Number(e.target.value))}
          className="font-num w-20 rounded-xl border border-line bg-bg-2 py-2.5 text-center text-lg font-bold outline-none focus:border-accent"
        />
        <Stepper onClick={() => set(Math.min(max, value + 1))}>＋</Stepper>
        <span className="w-8 text-xs text-ink-3">{suffix}</span>
      </div>
    </div>
  );
}

function Stepper({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-bg-2 text-lg font-bold text-ink-2 active:bg-bg-3"
    >
      {children}
    </button>
  );
}
