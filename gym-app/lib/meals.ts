import type { DietType } from "./db";

// Starter meal database — Indian-first with global basics. Macros are
// per stated serving, based on standard home recipes; treat as ±15%.

export type Slot = "breakfast" | "lunch" | "dinner" | "snack";

export interface Meal {
  id: string;
  name: string;
  serving: string;
  slots: Slot[];
  diet: DietType; // minimum diet level: vegan ⊂ veg ⊂ eggetarian ⊂ nonveg
  kcal: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  tags: string[];
}

const m = (
  id: string,
  name: string,
  serving: string,
  slots: Slot[],
  diet: DietType,
  kcal: number,
  proteinG: number,
  carbsG: number,
  fatG: number,
  tags: string[] = []
): Meal => ({ id, name, serving, slots, diet, kcal, proteinG, carbsG, fatG, tags });

export const MEALS: Meal[] = [
  // ── Breakfast ──
  m("poha", "Poha with peanuts", "1 large bowl", ["breakfast"], "vegan", 320, 8, 52, 9, ["quick", "budget"]),
  m("upma", "Vegetable upma", "1 large bowl", ["breakfast"], "veg", 300, 8, 48, 8, ["quick", "budget"]),
  m("idli-sambar", "Idli with sambar (3 idli)", "3 idli + 1 katori sambar", ["breakfast", "dinner"], "vegan", 330, 12, 60, 4, ["budget"]),
  m("dosa", "Masala dosa with chutney", "1 dosa", ["breakfast"], "veg", 380, 8, 55, 13, []),
  m("besan-chilla", "Besan chilla (2) with curd", "2 chilla + 1 katori curd", ["breakfast", "dinner"], "veg", 340, 17, 36, 13, ["high-protein", "quick"]),
  m("oats-milk", "Masala oats / oats with milk", "60g oats + 250ml milk", ["breakfast"], "veg", 350, 15, 50, 9, ["quick", "hostel"]),
  m("eggs-toast", "3 eggs + 2 toast", "3 whole eggs, 2 slices", ["breakfast"], "eggetarian", 400, 24, 28, 20, ["high-protein", "quick"]),
  m("egg-bhurji", "Egg bhurji (3 eggs) with 2 roti", "1 plate", ["breakfast", "dinner"], "eggetarian", 480, 27, 34, 24, ["high-protein"]),
  m("sprouts-chaat", "Moong sprouts chaat", "1 large bowl", ["breakfast", "snack"], "vegan", 220, 14, 34, 3, ["high-protein", "budget", "no-cook"]),
  m("pb-banana-toast", "Peanut butter banana toast", "2 slices + 1 banana", ["breakfast", "snack"], "vegan", 380, 12, 50, 15, ["quick", "hostel", "no-cook"]),
  m("greek-yogurt-bowl", "Curd/yogurt bowl with fruit & honey", "250g curd + fruit", ["breakfast", "snack"], "veg", 280, 14, 38, 8, ["quick", "no-cook"]),

  // ── Lunch / Dinner mains ──
  m("dal-rice", "Dal + rice + salad", "1.5 katori dal, 1.5 katori rice", ["lunch", "dinner"], "vegan", 520, 18, 88, 10, ["budget", "hostel"]),
  m("rajma-rice", "Rajma chawal", "1.5 katori rajma, 1.5 katori rice", ["lunch", "dinner"], "vegan", 560, 20, 92, 11, ["budget"]),
  m("chole-rice", "Chole with rice", "1.5 katori chole, 1.5 katori rice", ["lunch", "dinner"], "vegan", 580, 19, 90, 14, ["budget"]),
  m("dal-roti", "Dal + 3 roti + sabzi", "1 thali", ["lunch", "dinner"], "vegan", 550, 20, 82, 14, ["budget", "hostel"]),
  m("paneer-roti", "Paneer sabzi (100g) + 3 roti", "1 plate", ["lunch", "dinner"], "veg", 620, 28, 60, 28, ["high-protein"]),
  m("paneer-bhurji", "Paneer bhurji (150g) + 2 roti", "1 plate", ["lunch", "dinner"], "veg", 590, 32, 44, 30, ["high-protein"]),
  m("soya-curry", "Soya chunk curry + 2 roti / rice", "1 katori curry (50g dry soya)", ["lunch", "dinner"], "vegan", 480, 30, 58, 12, ["high-protein", "budget"]),
  m("chicken-curry-roti", "Chicken curry (150g) + 3 roti", "1 plate", ["lunch", "dinner"], "nonveg", 640, 42, 58, 24, ["high-protein"]),
  m("chicken-rice", "Chicken (200g) + rice bowl", "grilled/curry chicken + 1.5 katori rice", ["lunch", "dinner"], "nonveg", 620, 48, 62, 16, ["high-protein"]),
  m("fish-curry-rice", "Fish curry (150g) + rice", "1 plate", ["lunch", "dinner"], "nonveg", 540, 34, 62, 15, ["high-protein"]),
  m("egg-curry-rice", "Egg curry (2 eggs) + rice", "1 plate", ["lunch", "dinner"], "eggetarian", 520, 22, 64, 18, ["budget"]),
  m("veg-pulao-raita", "Veg pulao + raita", "1.5 katori pulao + 1 katori raita", ["lunch", "dinner"], "veg", 480, 13, 74, 14, []),
  m("khichdi", "Dal khichdi with ghee + curd", "1.5 katori + 1 katori curd", ["lunch", "dinner"], "veg", 460, 17, 70, 12, ["budget", "hostel"]),
  m("chicken-biryani", "Chicken biryani (restaurant-style)", "1 plate", ["lunch", "dinner"], "nonveg", 750, 35, 85, 28, ["eating-out"]),
  m("paneer-wrap", "Paneer kathi roll / wrap", "1 large wrap", ["lunch", "snack"], "veg", 450, 20, 48, 20, ["office", "eating-out"]),
  m("chicken-wrap", "Chicken kathi roll / wrap", "1 large wrap", ["lunch", "snack"], "nonveg", 480, 30, 46, 18, ["office", "eating-out"]),
  m("tofu-stirfry-rice", "Tofu stir-fry (150g) with rice", "1 bowl", ["lunch", "dinner"], "vegan", 490, 25, 60, 16, ["high-protein"]),
  m("pasta-veg", "Pasta with vegetables (red sauce)", "1 large bowl", ["lunch", "dinner"], "veg", 520, 15, 82, 14, []),
  m("chicken-pasta", "Chicken pasta (red sauce)", "1 large bowl", ["lunch", "dinner"], "nonveg", 610, 38, 74, 16, ["high-protein"]),
  m("sandwich-veg", "Grilled veg-cheese sandwich (2)", "2 sandwiches", ["breakfast", "lunch", "snack"], "veg", 420, 15, 52, 17, ["office", "quick"]),

  // ── Snacks ──
  m("whey-shake", "Whey protein shake (water)", "1 scoop", ["snack"], "veg", 130, 24, 4, 2, ["high-protein", "quick", "no-cook", "hostel"]),
  m("whey-milk", "Whey shake with milk + banana", "1 scoop + 250ml milk + banana", ["snack"], "veg", 340, 32, 40, 6, ["high-protein", "quick", "no-cook"]),
  m("boiled-eggs", "Boiled eggs (3)", "3 whole eggs", ["snack"], "eggetarian", 210, 18, 2, 15, ["high-protein", "quick", "budget"]),
  m("roasted-chana", "Roasted chana", "50g", ["snack"], "vegan", 180, 10, 28, 3, ["budget", "no-cook", "hostel", "office"]),
  m("peanuts", "Roasted peanuts", "40g", ["snack"], "vegan", 230, 10, 7, 19, ["budget", "no-cook", "hostel"]),
  m("fruit-nuts", "Fruit + handful of nuts", "1 apple/banana + 20g nuts", ["snack"], "vegan", 220, 5, 30, 10, ["no-cook", "office"]),
  m("curd-snack", "Plain curd (200g)", "1 bowl", ["snack"], "veg", 130, 8, 10, 6, ["no-cook", "budget"]),
  m("paneer-cubes", "Raw paneer cubes (100g)", "100g", ["snack"], "veg", 290, 18, 4, 22, ["high-protein", "no-cook"]),
  m("chicken-tikka", "Chicken tikka (150g)", "6-8 pieces", ["snack", "dinner"], "nonveg", 280, 38, 6, 11, ["high-protein", "eating-out"]),
  m("milk-glass", "Glass of milk (250ml, toned)", "250 ml", ["snack"], "veg", 150, 8, 12, 7, ["no-cook", "hostel", "budget"]),
  m("banana-2", "Bananas (2)", "2 medium", ["snack"], "vegan", 210, 2, 54, 1, ["no-cook", "budget", "hostel"]),
  m("soya-chaat", "Boiled soya chunk chaat", "50g dry soya, spiced", ["snack"], "vegan", 200, 26, 18, 1, ["high-protein", "budget"]),
];

const DIET_RANK: Record<DietType, number> = { vegan: 0, veg: 1, eggetarian: 2, nonveg: 3 };

export function mealsForDiet(diet: DietType): Meal[] {
  return MEALS.filter((meal) => DIET_RANK[meal.diet] <= DIET_RANK[diet]);
}

export interface DayPlan {
  slots: { slot: Slot; meal: Meal; portion: number }[];
  kcal: number;
  proteinG: number;
}

/**
 * Deterministic-ish day plan: pick meals per slot for the diet, scale
 * portions to approach the calorie target with protein prioritised.
 * `seed` varies selection day to day.
 */
export function generateDayPlan(
  targetKcal: number,
  targetProteinG: number,
  diet: DietType,
  seed: number,
  dislikes: string[] = []
): DayPlan {
  const pool = mealsForDiet(diet).filter((meal) => !dislikes.includes(meal.id));
  const pick = (slot: Slot, offset: number, prefer?: (x: Meal) => boolean) => {
    let candidates = pool.filter((x) => x.slots.includes(slot));
    if (prefer) {
      const preferred = candidates.filter(prefer);
      if (preferred.length) candidates = preferred;
    }
    return candidates[(seed + offset) % candidates.length];
  };

  const slots: { slot: Slot; meal: Meal; portion: number }[] = [
    { slot: "breakfast", meal: pick("breakfast", 0), portion: 1 },
    { slot: "lunch", meal: pick("lunch", 3), portion: 1 },
    { slot: "snack", meal: pick("snack", 5, (x) => x.tags.includes("high-protein")), portion: 1 },
    { slot: "dinner", meal: pick("dinner", 7), portion: 1 },
  ];

  const total = (k: "kcal" | "proteinG") =>
    slots.reduce((s, x) => s + x.meal[k] * x.portion, 0);

  // If protein is short, add/upgrade a protein snack.
  if (total("proteinG") < targetProteinG * 0.85) {
    const proteinSnacks = pool.filter(
      (x) => x.slots.includes("snack") && x.tags.includes("high-protein")
    );
    if (proteinSnacks.length) {
      slots.push({ slot: "snack", meal: proteinSnacks[seed % proteinSnacks.length], portion: 1 });
    }
  }

  // Scale main-meal portions toward the calorie target (±5%), within sane bounds.
  const kcalNow = total("kcal");
  const scale = Math.min(1.6, Math.max(0.6, targetKcal / kcalNow));
  for (const s of slots) {
    if (s.slot === "lunch" || s.slot === "dinner" || s.slot === "breakfast") {
      s.portion = Math.round(scale * 4) / 4; // quarter-portion steps
    }
  }

  return { slots, kcal: Math.round(total("kcal")), proteinG: Math.round(total("proteinG")) };
}

/** Same-slot swap suggestions within ±12% kcal. */
export function swapOptions(meal: Meal, slot: Slot, diet: DietType): Meal[] {
  return mealsForDiet(diet)
    .filter(
      (x) =>
        x.id !== meal.id &&
        x.slots.includes(slot) &&
        Math.abs(x.kcal - meal.kcal) <= Math.max(80, meal.kcal * 0.12)
    )
    .slice(0, 6);
}
