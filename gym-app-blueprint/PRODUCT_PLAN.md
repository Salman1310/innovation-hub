# AI Gym Tracker — Full Product Blueprint

*A skeptical, practical plan for a personal gym tracker + AI nutrition coach. Written to be executed, not to be admired.*

**Working name:** RepBase *(placeholder — pick anything; just don't ship "Hevy clone")*

---

## 1. Product Summary

A mobile-first workout tracker and nutrition coach that replaces two paid subscriptions (a gym logger like Hevy and a nutrition app like HealthifyMe) with one app you own and run for free.

Three things define it:

1. **Fast, serious workout logging** — routines, sets/reps/weight/RPE, rest timers, previous-performance hints, PRs, history, and progress analytics. This is the table-stakes core and it must be *better to use in the gym* than Hevy, or nothing else matters.
2. **A coach that is mostly math, not mostly chatbot** — TDEE and macro targets, progressive-overload suggestions, plateau and deload detection, all computed deterministically from your own data. An *optional* Claude API key unlocks conversational coaching on top. No mandatory AI cost, ever.
3. **Nutrition that understands India** — veg/eggetarian/non-veg/vegan meal plans built around dal, paneer, roti, rice, curd, eggs, and chicken — with hostel/office/budget variants — not "grilled salmon with quinoa" templates localized badly.

**Phase-1 reality check:** this is a personal app for one user (you). That changes everything: no accounts, no backend, no social features, no payments. Local-first PWA, data on your phone, ₹0/month. The blueprint below covers the full productized vision too, but every section is honest about which parts only matter *if* it stops being personal.

---

## 2. Target Users

**Primary (and only, for MVP): you.** A lifter who already tracks workouts, understands progressive overload, wants macros handled, eats Indian food, and resents paying ~₹2,000–4,000/year across fitness subscriptions. Design decisions default to *your* preferences, not a hypothetical market.

If it productizes later, in priority order:

1. **Intermediate lifters in India (1–4 years training)** — track seriously, hit plateaus, get no useful nutrition help from Western apps. Most underserved, most willing to pay.
2. **Beginners (0–1 year)** — need form guidance (animations), simple plans, and confidence. Largest group, worst retention, hardest to monetize.
3. **Serious/advanced lifters** — need RPE, e1RM trends, volume-per-muscle-group, deload logic. Small group, loudest feedback, best word-of-mouth.

**Who this is *not* for:** CrossFit/HIIT class-goers, runners (different logging model), and people who want a passive step counter. Saying no to them keeps the product coherent.

---

## 3. Key Problem Being Solved

1. **Subscription fatigue.** Hevy Pro, Strong Pro, Fitbod, MyFitnessPal Premium, HealthifyMe — each solves a slice, each charges monthly, forever. A committed lifter easily pays for two at once.
2. **Training and nutrition live in different apps** that don't talk to each other. Your workout app doesn't know you're cutting; your nutrition app doesn't know you squatted heavy today.
3. **No credible Indian nutrition support in the good trackers.** Hevy/Strong/Fitbod have no nutrition at all; MyFitnessPal's Indian food database is crowdsourced chaos; HealthifyMe has the food knowledge but weak lifting support and aggressive upselling.
4. **Coaching is either dumb or expensive.** Static PDF-style plans don't adapt; human coaches cost thousands per month; existing "AI" features are mostly upsell wrappers.
5. **Form guidance is bolted on.** Exercise demos exist but are buried; beginners screenshot YouTube instead.

The honest version of the problem statement for phase 1: *"I pay for Hevy, it doesn't do nutrition, and I'm capable of building the tool I actually want."*

---

## 4. Unique Value Proposition

> **One app that tracks your lifting, plans your food (including real Indian meals), and coaches you from your own data — with no subscription, because the intelligence is math first and LLM second.**

The differentiated pieces, ranked by defensibility:

1. **Deterministic coach + BYO-key LLM.** Competitors must charge monthly because their AI runs on their bill. A rules-engine coach with an optional user-supplied API key structurally undercuts the subscription model. Nobody with VC funding can copy "free forever."
2. **Indian diet depth.** Meal plans, swaps, and grocery lists built natively around Indian cuisine and constraints (hostel mess, office dabba, budget weeks). Genuinely rare in this category.
3. **Training + nutrition in one data model.** The coach can say "you're cutting and your squat stalled — that's expected, hold weight, don't panic" because it sees both sides.
4. **Local-first ownership.** Your data is yours, on your device, exportable. Privacy as a feature, not a settings page.

What is **not** a differentiator: workout logging itself (Hevy's is excellent), exercise libraries (commodity), dark-mode UI (everyone has it). Don't pretend otherwise.

---

## 5. Core Features

Everything from the original spec, sequenced. **Tier key:** `MVP` = first build · `V1` = weeks 4–10 · `V2` = only after 8+ weeks of real personal use · `LT` = long-term, only if productized.

### 5.1 Workout tracker

| Feature | Tier | Notes |
|---|---|---|
| Create custom routines | MVP | Named routines with ordered exercises, target sets/reps/rest |
| Start empty workout / add exercises mid-workout | MVP | Core loop |
| Log sets: reps, weight, RPE, notes | MVP | Weight/reps are 95% of usage |
| Set types: warm-up, working, drop, failure | MVP | Tag on set |
| Duration/distance/bodyweight set types | V1 | Cardio & weighted bodyweight; don't complicate MVP logging |
| Smart rest timer (per-exercise default, auto-start on set save) | MVP | Must survive screen lock — see §10 PWA caveat |
| Previous performance inline while logging | MVP | "Last time: 60kg × 8, 8, 7" — the single most valuable logging feature |
| PRs & milestones (weight, reps, e1RM, volume) | MVP | Detect on save, celebrate briefly |
| Workout history calendar | MVP | Month grid + streak |
| Exercise-wise progress graphs | MVP | e1RM & top-set weight over time |
| Duplicate previous workout | MVP | Trivial and high-value |
| Template packs (PPL, Upper/Lower, Full Body, Strength, Hypertrophy, Fat Loss) | MVP | Ship 6–8 curated templates |
| Muscle-group volume tracking (weekly sets per muscle) | V1 | Needs exercise→muscle mapping, which the library provides |
| Weekly/monthly training summary | V1 | Volume, frequency, PR count |
| Plate calculator | V1 | Small, beloved |
| Supersets/circuits | V1 | Real need, but complicates the MVP data model — design for it, build later |

### 5.2 Exercise library — `MVP` (seeded), enriched in V1

~870 exercises from open data (see §8), filterable by muscle group, equipment (barbell/dumbbell/machine/cable/band/bodyweight/none), difficulty, and type. Each exercise: demo media, step-by-step instructions, primary/secondary muscles. Common mistakes, safety tips, beginner alternatives, advanced variations, and goal-based rep ranges are `V1` content work (they don't exist in open datasets — someone has to write them; start with the top 60 exercises only).

### 5.3 AI nutritionist — targets & plans `MVP`, logging `V1`, chat & photo `V2`
Full design in §6.

### 5.4 AI workout coach — heuristics `V1`, chat `V2`
Full design in §7.

### 5.5 Onboarding — `MVP`
Full flow in §6.1 / §9. Goal, experience, body stats, equipment, days/week, diet preference, injuries/medical disclaimer, coaching-style preference.

### 5.6 Dashboard — `MVP` (lite), full in `V1`
Today's workout, streak, weekly volume, macro targets vs logged (V1), bodyweight trend, recent PRs, next planned workout, coach suggestion card (V1), water/protein reminder state.

### 5.7 Progress tracking

| Feature | Tier |
|---|---|
| Bodyweight log + trend (7-day smoothed) | MVP |
| Strength graphs & per-exercise history | MVP |
| Estimated 1RM (Epley/Brzycki, capped at 10 reps) | MVP |
| Body measurements (10 sites) | V1 |
| Progress photos (local storage, private) | V1 |
| Training volume over time, macro adherence, consistency score | V1 |
| Goal timeline (target weight/lift by date, on/off pace) | V2 |

### 5.8 Social / community — `LT` only

Follows, shared workouts, likes/comments, badges: **all deferred.** For a single-user app they are dead weight. If productized: private-by-default, opt-in sharing, badges first (they're single-player). The schema (§11) reserves tables so nothing needs remodeling later.

### 5.9 Explicitly out (all phases until proven needed)

Live workout sharing, in-app messaging, trainer marketplace, barcode scanning (huge database licensing problem), Apple Watch app, Android widget, gamified XP systems.

---

## 6. AI Nutritionist Design

**Principle: the nutritionist is a calculator with a menu, wearing an optional chat interface.** Everything essential works offline and free; the LLM adds conversation, not correctness.

### 6.1 Onboarding intake (MVP)

Collected once, editable anytime: age, sex, height, weight, goal (fat loss / muscle gain / lean bulk / maintenance / strength / recomp), activity level (sedentary → very active), training days/week, diet type (veg / eggetarian / non-veg / vegan), allergies & dislikes, medical flags (see safety), budget tier, cooking situation (full kitchen / hostel mess / office + tiffin / mostly outside), cuisine preference (North Indian / South Indian / mixed / global), meals per day.

### 6.2 Target engine (MVP — pure math)

- **BMR:** Mifflin-St Jeor. **TDEE:** BMR × activity multiplier (1.2–1.725), with training days nudging the multiplier.
- **Calories by goal:** fat loss −20% (floor: never below BMR); lean bulk +10%; muscle gain +15%; recomp/maintenance ±0; strength +5%.
- **Protein:** 1.6–2.2 g/kg by goal (higher end when cutting). **Fat:** 20–30% of calories (min 0.6 g/kg). **Carbs:** remainder. **Fiber:** 14 g/1000 kcal. **Water:** ~35 ml/kg, +500 ml on training days.
- Every number shown with a one-line "why" (e.g. "protein is high because you're cutting — it protects muscle"). This is the "explain why this plan suits you" requirement, done deterministically.
- Weekly auto-adjustment (V1): if 7-day average weight trend deviates from goal pace for 2+ weeks, nudge calories ±100–150 and tell the user why.

### 6.3 Meal plan engine (MVP — template + constraint solver, not LLM)

A curated food/meal database (~150 meals to start, hand-built — this is honest content work, budget a full weekend):

- Each meal: name, cuisine, diet type, kcal + macros per serving, cost tier, prep effort, tags (`hostel-friendly`, `office-friendly`, `high-protein`, `quick`, `no-cook`).
- Indian staples first: dal + rice, rajma/chole, paneer bhurji, egg bhurji, chicken curry + roti, curd/raita, poha, upma, idli-sambar, dosa, sprouts chaat, soya chunk curry, besan chilla, sattu drink, dahi-chuda; plus global basics (oats, eggs & toast, chicken rice bowls, yogurt bowls, sandwiches, pasta).
- **Plan generation:** pick meals matching diet/budget/cooking constraints, scale portions to hit the day's kcal within ±5% and protein at ≥ target. Greedy + portion scaling is enough; this is not a hard optimization problem.
- **Swaps:** "don't like rajma" → suggest same-slot meals within ±10% macros and same constraints. Deterministic lookup.
- **Grocery list:** aggregate ingredients across the week's plan, grouped by category.
- **Simple recipes:** 4–6 steps per meal, stored with the meal.

### 6.4 Tracking & feedback (V1)

Manual meal logging: tap meals from the database (portion multiplier) or quick-add macros. Day view: target vs actual rings for kcal/protein/carbs/fat/water. Reminders (protein gap at 8pm, water every 2–3h during the day, meal-time nudges) via local notifications — with the PWA caveat in §10.

### 6.5 LLM layer (V2 — optional, BYO Claude API key)

- Settings field for the user's Anthropic API key (stored locally, calls made directly or via a tiny proxy — see §10).
- Chat grounded in real data: system prompt includes profile, current targets, this week's plan, last 7 days of logs, recent training. So "I'm travelling for 3 days and eating out, what do I do?" gets a contextual answer.
- LLM **proposes**, engine **validates**: any plan the LLM suggests is checked against the target engine before display (no 800-kcal crash-diet outputs).
- Photo meal estimation: send photo to Claude vision, get food guess + portion estimate, user confirms/edits before logging. Ship as "rough estimate" with explicit error expectations (±25% is the honest truth for photo calorie estimation).

### 6.6 Safety rails (MVP — non-negotiable, built into both engine and prompts)

- Persistent, visible disclaimer: *"This app provides general fitness and nutrition information, not medical advice. It is not a substitute for a doctor or registered dietitian."* Shown at onboarding, in the nutritionist UI, and in every LLM system prompt.
- **Medical flags → refer out:** diabetes, kidney/liver disease, heart conditions, pregnancy/breastfeeding, eating-disorder history, BMI > 35 or < 17, age < 18. If flagged: no aggressive deficits, conservative defaults only, and an explicit "please consult a professional before major diet changes" gate.
- Hard floors regardless of user input: never below BMR; deficit capped at 25%; no fasting protocols, detoxes, or supplement pushing; weight-change pace capped at ~0.75%/week.
- LLM system prompt: forbidden-topics list (medical dosing, ED-adjacent coaching, extreme protocols), plus instruction to defer to engine numbers.

---

## 7. AI Workout Coach Design

**Same principle: rules first, LLM as optional interpreter.** Rules are deterministic, testable, explainable, offline, and free. An LLM guessing your next squat weight is strictly worse than `last_weight + 2.5kg if you hit all target reps` — use LLMs for language, not arithmetic.

### 7.1 Plan recommendation (MVP)

Decision table from onboarding: experience × days/week × equipment × goal → one of the curated templates (§5.1), with equipment-aware substitutions (no barbell → DB/machine variants) and injury-aware exclusions (e.g. "shoulder pain" flag removes overhead pressing, suggests landmine variants, tells you to get it assessed).

### 7.2 Progression engine (V1) — the heart of the coach

- **Double progression per exercise:** target rep range (e.g. 6–10). Hit top of range on all working sets at RPE ≤ 8 → suggest +2.5 kg (upper) / +5 kg (lower/compound). Below range floor → hold or −5%.
- **Plateau detection:** best e1RM for an exercise hasn't improved in 4–6 sessions → flag it, suggest (in order): rep-range change, variation swap, volume bump, or deload — with plain-language reasoning.
- **Deload trigger:** 6–8 weeks of continuous progression, or 2+ plateaued lifts simultaneously, or RPE creeping ≥ 9 across sessions → suggest a deload week (−40% volume, −10% load), explained.
- **Volume guardrails:** per-muscle weekly sets vs a 10–20 set reference band; flag "0 sets for hamstrings in 2 weeks" or "28 sets of chest is probably junk volume."
- **Recovery-aware nudges (V1-lite):** post-workout soreness (0–3) + optional sleep quality; two poor-recovery signals in a row → suggest lighter session. Honest note: without wearable data this is self-report and only as good as your honesty.
- Every suggestion is a **card with a reason and Accept / Modify / Dismiss** — the coach proposes, you decide. Trust comes from transparency, not authority.

### 7.3 LLM layer (V2 — optional, same BYO key)

Chat grounded in training history + engine state: "why did it suggest a deload?", "give me a hotel-gym version of tomorrow's push day", "explain RDL vs deadlift like I'm new". Coaching-style preference from onboarding (strict/friendly/scientific/motivational) becomes a tone parameter in the system prompt. Same guardrails: LLM may not override engine safety limits, always nods to form and pain-vs-soreness distinction.

### 7.4 Safety

No "push through pain" language ever; pain ≠ soreness education built into content; injury flags permanently filter suggestions; progression suggestions capped (never > +10% load jump).

---

## 8. Exercise Animation System

**The honest hard part.** Animation content is the single most expensive asset class in this app, and licensing traps are real: ripping GIFs from Gymvisual/MusclewWiki-style sites into a personal app is technically copyright infringement, and becomes genuinely dangerous the moment the app productizes.

**Strategy — three layers:**

1. **Base layer (MVP, free & legal):** [`free-exercise-db`](https://github.com/yuhonas/free-exercise-db) — ~870 exercises, Unlicense (public domain), with instructions, muscle mappings, and two-frame position photos. Two frames cross-faded with CSS gives a serviceable "motion" impression for the long tail. Ship all of it bundled (~40MB images; lazy-load, cache in the service worker).
2. **Hero layer (V1, the differentiator):** custom animated loops for the **top 60 exercises** (the ones that cover ~90% of real logged sets). Realistic options, pick one:
   - **Lottie/vector loops** — commissioned or self-made in After Effects/Rive. Tiny files (20–80KB), style-consistent, scalable. Cost if commissioned: roughly ₹800–2,500 per exercise on freelance markets; a full set of 60 ≈ ₹60k–1.5L. **For personal use: skip commissioning; make 5–10 yourself for your main lifts, or live with layer 1.**
   - Licensed 3D animation packs exist (e.g. muscle-highlight style) but licenses are per-app and negotiable — a productization decision, not a personal-use one.
3. **Fallback layer:** embedded YouTube search deep-link per exercise ("form video ↗") costs nothing and is legally clean.

**Delivery:** media served from the app's static hosting (free tier), cached offline via service worker after first view; Lottie rendered with `lottie-web` (already tiny). No CDN bill at personal scale; at product scale, Cloudflare R2 + CDN (~$5/mo at thousands of users).

**In-workout integration (the UX requirement):** exercise row → thumbnail always visible; tap → bottom-sheet with loop, instructions, mistakes, alternatives — *without leaving the logging screen*. This is the "animations feel integrated, not hidden" requirement and it's a UI decision, not a content one: build it in MVP with layer-1 media so the slot exists when better media arrives.

---

## 9. UI/UX Concepts

Non-negotiables across all concepts: **logging speed beats beauty** (thumb-reachable controls, numeric keypad with ±2.5kg / ±1 rep steppers, auto-advance to next set, one-tap "same as last time"); dark-mode first; rest timer always visible while running; animations enhance, never block.

### Concept A — "Iron" (hardcore gym/athlete)
Near-black `#0A0A0B`, blood red `#E63946` accents, condensed display type (Barlow Condensed), sharp corners, high contrast, aggressive microcopy ("NO MISSED REPS"), chalk/grain textures. **Strengths:** identity, motivation for a specific personality. **Weaknesses:** exhausting daily; hostile to nutrition/coach surfaces (an aggressive nutritionist is a bad nutritionist); ages into cringe; alienates beginners.

### Concept B — "Pulse" (premium health-tech) ← **recommended**
Deep charcoal-navy base (`#0E1116` / elevated `#161B22`), one electric accent — cyan `#22D3EE` — plus a warm energy gradient (amber→coral) reserved *only* for PRs, streaks, and celebrations. Space Grotesk display + Inter body + JetBrains Mono for numbers (weights, timers, macros — tabular figures matter when glancing mid-set). Rounded-but-tight cards (12–16px), thin data-viz strokes, glowing progress rings, subtle haptics on set-save and PR. Feels like a serious instrument: Whoop/Linear energy, not Instagram-gym energy.

### Concept C — "Spot" (friendly beginner-first)
Light-first with dark option, soft violet + mint palette, large rounded cards, mascot-ish illustration style, celebratory confetti, simplified vocabulary ("how hard did that feel?" instead of "RPE"). **Strengths:** onboarding comfort, approachable. **Weaknesses:** you (the actual user) would outgrow it in a month; undermines the data-serious analytics; "friendly" and "premium fitness-tech" rarely coexist.

### Why B wins
1. The primary user is an experienced lifter — B matches how you'll actually feel using it daily for years.
2. It's the only concept that serves *all three* surfaces well: logging (instrument-like), analytics (data-native), and nutrition/coach (calm, credible — a coach in "Iron" clothing shouts, a coach in "Spot" clothing patronizes).
3. Beginner-friendliness is better delivered through **progressive disclosure** (hide RPE/advanced set types until enabled; plain-language explainers behind ⓘ taps) than through a soft visual identity. B can wear beginner mode; C can't wear advanced mode.
4. It ages best and is the only one that still works if the app productizes.

---

## 10. Recommended Tech Stack

### Phase 1 (personal use) — optimize for ₹0/month and shipping fast

| Layer | Choice | Why |
|---|---|---|
| App | **Next.js 15+ PWA** (App Router, TypeScript, Tailwind v4) | Your existing stack — zero learning curve; installable to home screen; one codebase for "iOS and Android" |
| Local data | **IndexedDB via Dexie.js** | Real queryable DB in the browser, offline by default, survives app closes; `dexie-export-import` gives one-tap JSON backup |
| State | Zustand (workout-in-progress) + Dexie live queries | Boring and sufficient |
| Charts | Recharts or lightweight d3 wrappers | Progress graphs |
| Animations | Framer Motion + `lottie-web` | You already know Framer |
| Auth | **None.** | Single user, local data. Biggest scope cut available |
| Hosting | Vercel free tier / GitHub Pages | Static PWA, ₹0 |
| LLM (optional) | Claude API, key stored locally in the app | Direct calls from client are acceptable for personal use since it's *your* key on *your* device |
| Push/reminders | Web Push + local notifications | See caveat below |
| Analytics | None (personal app) | — |
| Payments | None | — |

**PWA honesty — the caveats you must accept:**
- **Rest-timer notifications with the screen locked are unreliable on iOS.** Workarounds: keep-screen-awake during workouts (Wake Lock API) + audio cue; it works, but it's the #1 native-app envy you'll feel.
- iOS can evict IndexedDB for PWAs unused for ~weeks — mitigated by using it regularly (you will) and by weekly export reminders. Non-negotiable: build **export/import from day one.**
- No HealthKit/Health Connect, no haptics API on iOS Safari (Android Chrome has vibration). Accepted losses for phase 1.

### Phase 2+ (if productized) — the graduation path

- **React Native (Expo) over Flutter or native.** Reasons: your React/TS skills transfer nearly 1:1 (Flutter = new language + ecosystem; native = two codebases you can't staff); Expo now handles push, haptics, background timers, HealthKit/Health Connect, and app-store builds well; the Dexie schema ports to SQLite (expo-sqlite/WatermelonDB) with the same shape. Flutter's edge (rendering consistency) doesn't matter for this app; native's edge (platform polish) isn't worth 2× cost.
- **Backend: Supabase** (Postgres + Auth + Storage + Realtime) — the §11 schema is written to drop into it; row-level security fits privacy-by-default social. **Sync:** last-write-wins per row with `updated_at`, offline queue on device (don't attempt CRDTs; workout data conflicts are rare and trivially mergeable).
- **LLM proxy:** a single serverless function holding the API key server-side, per-user rate-limited — mandatory the moment anyone but you uses AI features.
- **Push:** Expo Notifications / FCM + APNs. **Analytics:** PostHog (self-hostable, generous free tier). **Payments:** RevenueCat over raw StoreKit/Play Billing (subscription edge cases are a swamp). **Wearables:** HealthKit/Health Connect read (bodyweight, sleep, HR) first; watch *apps* are LT.

---

## 11. Database Schema

Written as logical tables that work today as Dexie stores and later as Postgres. `id` = UUID, timestamps everywhere (`created_at`, `updated_at` — `updated_at` is the future sync key). Tables marked 💤 are dormant until V2+/productization but reserved now so nothing needs remodeling.

```
users 💤 (phase 1: single implicit user)
  id, email, auth_provider, created_at

profiles
  id, user_id → users
  display_name, sex, birth_date, height_cm
  goal (fat_loss|muscle_gain|lean_bulk|maintenance|strength|recomp)
  experience (beginner|intermediate|advanced)
  activity_level, training_days_per_week
  equipment (jsonb: available equipment list)
  injuries (jsonb: [{area, note}]), medical_flags (jsonb)
  diet_type (veg|eggetarian|nonveg|vegan)
  allergies (jsonb), dislikes (jsonb)
  budget_tier, cooking_situation, cuisine_pref, coaching_style
  units (kg|lb), is_public (bool, default false) 💤

exercises
  id, slug, name, category (strength|cardio|stretch)
  primary_muscles (jsonb), secondary_muscles (jsonb)
  equipment, difficulty (beginner|intermediate|advanced)
  instructions (jsonb: steps[]), common_mistakes (jsonb), safety_tips (jsonb)
  alternatives (jsonb: exercise_ids easier[]/harder[])
  rep_range_guides (jsonb: {strength, hypertrophy, endurance})
  is_custom (bool), source (freeexdb|custom)

exercise_animations
  id, exercise_id → exercises
  kind (two_frame|lottie|video|gif), urls (jsonb), thumbnail_url
  duration_ms, size_bytes, license_note

workout_templates
  id, user_id, name, description, goal_tag, days (jsonb) -- or normalized:
template_exercises
  id, template_id → workout_templates, exercise_id → exercises
  position, target_sets, target_rep_min, target_rep_max, target_rpe, rest_seconds, superset_group

workouts
  id, user_id, template_id? → workout_templates
  name, started_at, ended_at, bodyweight_kg?, notes, mood?, soreness_score?

sets
  id, workout_id → workouts, exercise_id → exercises
  position, set_type (warmup|working|drop|failure)
  reps?, weight_kg?, duration_s?, distance_m?, rpe?, notes
  is_pr (bool), completed_at

progress_records   -- materialized PRs & e1RM history for fast graphs
  id, user_id, exercise_id → exercises
  kind (max_weight|max_reps_at_weight|e1rm|session_volume)
  value, unit, set_id? → sets, achieved_at

body_measurements
  id, user_id, measured_at
  weight_kg?, body_fat_pct?
  neck_cm?, shoulders_cm?, chest_cm?, waist_cm?, hips_cm?,
  bicep_l_cm?, bicep_r_cm?, thigh_l_cm?, thigh_r_cm?, calf_cm?
  photo_refs (jsonb: local/storage keys)

nutrition_goals
  id, user_id, effective_from
  tdee_kcal, target_kcal, protein_g, carbs_g, fat_g, fiber_g, water_ml
  rationale (jsonb: how each number was derived)   -- powers "explain why"

meals   -- curated food/meal database
  id, name, cuisine, diet_type, kcal, protein_g, carbs_g, fat_g, fiber_g
  serving_desc, cost_tier, prep_effort, tags (jsonb), recipe (jsonb: steps[]), ingredients (jsonb)

meal_plans
  id, user_id, week_start, generated_by (engine|llm)
  days (jsonb: [{date, slots: [{slot, meal_id, portion}]}])
  grocery_list (jsonb)

meal_logs
  id, user_id, logged_at, slot (breakfast|lunch|dinner|snack)
  meal_id? → meals, portion, custom_name?, custom_macros? (jsonb)
  source (plan|manual|quick_add|photo_estimate)

ai_chat_history
  id, user_id, agent (nutritionist|coach), role (user|assistant)
  content, context_snapshot (jsonb), created_at

social_posts 💤
  id, user_id, workout_id? → workouts, caption, visibility (private|followers|public), created_at
post_reactions 💤
  id, post_id → social_posts, user_id, kind (like|comment), comment_text?, created_at
followers 💤
  follower_id → users, followee_id → users, status (pending|accepted), created_at

subscriptions 💤
  id, user_id, tier (free|pro|lifetime), platform (ios|android|stripe)
  status, started_at, renews_at, revenuecat_ref
```

Key derived values (computed, not stored, except snapshots in `progress_records`): e1RM = Epley `w × (1 + reps/30)` capped at 10 reps; weekly volume = Σ(reps × weight) grouped by muscle via `exercises.primary_muscles`; streak from `workouts.started_at`.

---

## 12. MVP Roadmap

### Phase 0 — MVP: "Replace Hevy" (~2–3 weekends of focused work)

- **In:** PWA shell + onboarding; exercise library (free-exercise-db, filters, detail sheets); routines + 6–8 templates; the logging screen (sets/reps/weight/RPE, rest timer, previous performance, PR detection, duplicate workout); history calendar; per-exercise graphs + e1RM; bodyweight log; nutrition **targets** + first-cut meal plans (~60 meals); export/import backup.
- **Out (resist):** meal *logging*, coach heuristics, LLM anything, measurements, photos, supersets, cardio set types, social, payments.
- **Complexity:** moderate — the logging screen UX is 50% of total MVP effort and deserves it. Meal database seeding is the hidden time sink.
- **Risks:** scope creep (this spec is a temptation engine); logging UX worse than Hevy → instant abandonment; iOS PWA timer friction discovered late → *test rest timer on your actual phone in week 1*.
- **Validation:** cancel Hevy. Log every real workout for 4 weeks. Track two numbers honestly: seconds-per-set-logged vs Hevy, and "did I skip logging because the app annoyed me" count. **If you drift back to Hevy, stop building and diagnose before adding features.**

### Phase 1 — V1: "Better than Hevy for me" (weeks 4–10, only if Phase 0 validated)

- **In:** coach heuristics (progression suggestions, plateau/deload detection, volume guardrails); meal logging + adherence rings + reminders; grocery lists + swaps; measurements + progress photos; weekly summaries; muscle-group volume; supersets; cardio/duration sets; plate calculator; enriched content (mistakes/tips/alternatives) for top 60 exercises; self-made animation loops for your main lifts.
- **Out:** LLM features, accounts/sync, social, payments, barcode scanning.
- **Complexity:** moderate; mostly logic + content, little new infrastructure.
- **Risks:** coach suggestions feel wrong → trust dies fast (tune thresholds on your own history first); content writing is boring and will stall — timebox it.
- **Validation:** do you *accept* the coach's suggestions? Is meal logging still happening in week 3, or did it decay? (Nutrition logging decay is the most common failure in this category — if manual logging dies, plan-adherence mode beats log-everything mode.)

### Phase 2 — V2: "The AI layer" (only after 8+ weeks of sustained personal use)

- **In:** BYO-key Claude chat (nutritionist + coach, grounded prompts, engine validation); photo meal estimation (clearly labeled as rough); goal timelines; data export improvements; optional Supabase sync if you want multi-device.
- **Out:** social, payments, marketplace.
- **Complexity:** moderate-high — grounding, guardrails, and prompt/context management are real work; the chat UI is easy, making it *not hallucinate about your data* is not.
- **Risks:** LLM novelty wears off in 2 weeks and the money was wasted (that's why it's V2, after the boring parts proved sticky); API cost surprises (cap tokens, cache context).
- **Validation:** are you still opening chat in week 4? Which 3 questions do you actually ask? (Those become buttons, and half the chat surface can be deleted.)

### Phase 3 — LT: "Maybe a product" (months away; a decision, not a phase)

- **In (only with external demand signals):** Expo RN port, accounts + sync, LLM proxy + rate limits, social (badges → opt-in sharing → follows), RevenueCat payments, wearable reads, analytics, legal review (nutrition-advice liability, ToS, privacy policy), commissioned animation set.
- **Complexity:** high — this phase is 5–10× everything before it. App-store review, support, abuse, refunds, GDPR/DPDP compliance are a second job.
- **Validation before building any of it:** 10 real people (not friends being polite) use your APK/TestFlight build unprompted for 4 weeks; ≥3 say they'd pay. No signal → keep it as the best free personal gym app ever built, which was the original goal anyway.

---

## 13. Monetization Model

**Blunt framing:** phase 0–2 has no monetization — the product *is* the savings (₹2–4k/year of cancelled subscriptions). This section only activates in Phase 3, and here's the skeptical math first:

- Fitness apps convert ~2–5% free→paid. 1,000 users → maybe 30 payers → ~₹3k–9k/month at Indian price points. **Monetization is a distant hypothesis, not a plan.** Build for phase 0's user (you), not phase 3's revenue.

If Phase 3 happens:

| Tier | Contents | Price anchor (India) |
|---|---|---|
| **Free** | Full workout logging (never cripple the core — Hevy's free tier is generous and that's *why* it won), 3 custom routines, full exercise library, basic graphs, nutrition targets | ₹0 |
| **Pro** | Unlimited routines, coach engine, nutrition plans + logging + grocery lists, AI chat (on app's key, rate-limited), advanced analytics, cloud sync, wearables | ₹149–199/mo or ₹999–1,199/yr (undercut Hevy Pro meaningfully) |
| **Lifetime** | Pro minus ongoing-cost features: **exclude or cap AI chat and heavy sync** | ~₹2,999 one-time |

- **Lifetime + AI is a trap:** a one-time payment funding recurring LLM costs bleeds forever. Either exclude AI from lifetime, cap it monthly, or keep BYO-key as the lifetime AI path (elegant: power users bring their own key, you owe them nothing recurring).
- BYO-API-key stays available even in the paid product — it's the ideological differentiator and costs nothing.
- Trainer marketplace / paid personalized plans: real potential (India's online-coaching market is large and unstructured) but it's a two-sided marketplace — a *different company*. Park it.

---

## 14. Risks and Challenges

Ordered by how likely they are to actually kill this project:

1. **You stop using it (the #1 killer).** Not competition, not tech — abandonment. Personal fitness projects die exactly like gym memberships: strong January, silent March. **Mitigation:** the Phase-0 validation gate is sacred — cancel Hevy, force real usage, and treat "I drifted back" as a product bug to diagnose, not a personal failing to ignore.
2. **Building instead of lifting.** The meta-risk: the app becomes the hobby and the training suffers, defeating the entire point. Mitigation: timebox building to non-gym hours; the roadmap's "out" lists are as important as its "in" lists.
3. **Logging UX loses to Hevy.** Hevy's logging flow has years of polish; if yours is 20% slower you'll feel it every session. Mitigation: this is why the MVP spends half its effort on one screen, and why the metric is seconds-per-set.
4. **iOS PWA limitations bite.** Locked-screen rest timers and notification reliability are genuinely worse than native. Mitigation: wake-lock + audio strategy, tested week 1; accept the trade consciously; Expo port is the documented escape hatch.
5. **Data loss.** One eviction of IndexedDB without a backup and trust in the app dies permanently. Mitigation: export/import in MVP, weekly backup reminder, one-tap export to file.
6. **Nutrition-content quality.** The meal engine is only as good as its 150-meal database, and macro numbers for home-cooked Indian food are genuinely fuzzy (ghee quantity alone swings a dal 150 kcal). Mitigation: standard-recipe assumptions stated per meal; portions in household units (katori, roti-count); treat all food numbers as ±15%.
7. **Content workload underestimated.** Mistakes/tips/alternatives × 60 exercises + 150 meals + recipes = many boring hours no framework removes. Mitigation: top-60/150 caps, LLM-drafted then human-verified content, ship incomplete long tail.
8. **AI features underdeliver on the dream.** Chat coaches feel magical for a week, then most users' needs are the same 5 questions. Mitigation: rules-engine-first architecture means the AI layer is garnish, not foundation — if it flops, the app still stands.
9. **If productized — liability and compliance.** Nutrition advice to strangers (some with the medical conditions in §6.6), India's DPDP Act, app-store health-app policies, and photo-of-food privacy. Mitigation: the safety rails exist from MVP; a real legal pass is a Phase-3 gate, budgeted, non-optional.
10. **If productized — why users won't pay:** Hevy free is excellent, MyFitnessPal free exists, and Indian consumers are price-sensitive with world-class free YouTube fitness content. The paid conversion story must be *nutrition + coach integration*, not tracking. If that story doesn't survive contact with 10 test users, it stays a personal app — which, again, was the goal.

**Features that are hardest to build relative to their value** (be suspicious of each): photo calorie estimation (low accuracy ceiling, high effort), barcode scanning (database licensing), watch apps (whole new platform), social feed (moderation + network effects you don't have), automatic exercise detection (research project). None are on the path.

---

## 15. How to Make It Successful + Final Recommended Build Plan

### Success, defined honestly

- **Phase 0–2 success:** you train consistently, log every session in *your* app, pay ₹0/month, and your nutrition is on-plan more weeks than not. That alone beats 95% of fitness side-projects.
- **Phase 3 success (optional):** 10+ non-friend users retained a month; 3+ willing to pay. Anything more is upside.

### Principles that make the difference

1. **Protect the logging loop above all.** Every feature must not add a single tap to logging a set.
2. **Sequence ruthlessly.** The original 15-section spec describes a 12-person-month product. The only way a solo build survives is the phase gates above — each phase earns the next.
3. **Rules before models.** Deterministic coach + optional LLM is the architectural bet that keeps it free, testable, and offline. Don't invert it in a moment of AI enthusiasm.
4. **Own your data loudly.** Export from day one; it's both the insurance policy and the identity of the product.
5. **Content is a product surface.** The 60 enriched exercises and 150 meals will drive more daily value than any algorithm. Budget real time for them.

### Final build plan (concrete)

| When | What |
|---|---|
| **Weekend 1** | Repo + Next.js PWA scaffold, Dexie schema (§11), seed free-exercise-db, exercise browser with filters + detail sheet. **Test PWA install + wake-lock rest timer on your actual iPhone/Android before writing more code.** |
| **Weekend 2** | The logging screen: start workout (empty/template/duplicate), set entry with previous-performance, rest timer, PR detection, finish + summary. Templates (6–8 curated). |
| **Weekend 3** | History calendar, per-exercise graphs + e1RM, bodyweight log, onboarding flow, nutrition target engine + rationale UI, first 60 meals + plan generator, export/import. **Cancel Hevy.** |
| **Weeks 4–7** | Use it. Fix friction only. Keep a "friction log" note on your phone; every skipped log is a bug report. |
| **Weeks 5–10** (interleaved) | V1: coach heuristics tuned on your own history, meal logging + rings, grocery lists, measurements/photos, supersets, top-60 content enrichment. |
| **Week 12+** | Decide on V2 (LLM layer) based on one question: *"what do I keep wishing I could ask it?"* If the answer is "nothing," skip V2 without guilt. |
| **Someday, maybe** | Phase 3 — only on external pull, never on internal push. |

**First action after this document:** move this blueprint to its own repo (steps in README), then Weekend 1.

---

*Disclaimer carried by the product itself: this app provides general fitness and nutrition information and is not a substitute for advice from a doctor, registered dietitian, or qualified medical professional. Users with medical conditions should consult a professional before making significant diet or training changes.*
