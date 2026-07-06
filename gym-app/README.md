# RepBase — Personal Gym Tracker & Nutrition Coach

A mobile-first PWA that replaces paid gym apps: workout logging with rest timers and PR detection, an 870+ exercise library with animated form demos, progress analytics, and an Indian-first nutrition engine — all local-first, no account, no subscription, ₹0/month.

Built per the product blueprint in `gym-app-blueprint/PRODUCT_PLAN.md` (Phase 0 / MVP scope).

## What's inside (v0.1 MVP)

- **Onboarding** — goal, experience, body stats, activity, training days, equipment, diet type, injuries, coaching style, safety disclaimer. Generates your nutrition targets and recommends a routine split.
- **Workout logging** — start from a routine, repeat last workout, or go freestyle; per-set weight/reps/RPE with **previous performance prefilled**; **rest timer** with beep, vibration, ±15s, and screen wake-lock; **PR detection** (max weight + estimated 1RM) with celebration; discard/finish safety dialogs.
- **8 built-in routines** — Push/Pull/Legs, Upper/Lower, Full Body, Strength A/B, Home Dumbbell. Your onboarding answers star the right ones.
- **Exercise library** — 873 exercises (public-domain [free-exercise-db](https://github.com/yuhonas/free-exercise-db)) with two-frame motion demos, step-by-step instructions, muscle/equipment/level filters, and a form-video deep link. Accessible mid-workout without leaving the logging screen.
- **Dashboard** — weekly streak, this week's workouts and volume, up-next routine, macro targets, recent PRs, bodyweight trend.
- **History** — training calendar + expandable session cards with every set.
- **Progress** — per-exercise estimated-1RM charts, best set / best e1RM, bodyweight logging and trend.
- **Nutrition** — Mifflin-St Jeor TDEE → goal-adjusted calories/protein/carbs/fat/fiber/water with plain-language "why these numbers"; Indian-first daily meal plan (veg/eggetarian/non-veg/vegan aware) with one-tap **swaps** and plan-vs-target bars.
- **Backup** — one-tap JSON export/import in Settings. Your data lives only on your device.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
```

## Deploy free + install on your phone (~5 minutes)

1. Push this folder to a GitHub repo (see migration below).
2. Go to [vercel.com](https://vercel.com) → Add New Project → import the repo → **Deploy** (zero config needed).
3. Open the deployed URL on your phone:
   - **Android (Chrome):** menu ⋮ → *Add to Home screen* → Install.
   - **iPhone (Safari):** Share → *Add to Home Screen*.
4. It launches full-screen like a native app and works offline after first load.

**First-run tip (the week-1 test from the blueprint):** start a workout, log a set, and check the rest timer beeps with the phone in your hand. The app holds a screen wake-lock during workouts so the timer can't be killed by the lock screen.

**Backups:** Settings → *Export backup*, weekly. Browsers can evict local data from web apps unused for weeks.

## Moving this into the AI-Gym repo

From a machine with git access:

```bash
git clone --branch claude/ai-gym-tracker-app-lga8m5 https://github.com/Salman1310/innovation-hub.git tmp-hub
git clone https://github.com/Salman1310/AI-Gym.git
cp -r tmp-hub/gym-app/. AI-Gym/                       # the app at repo root
cp -r tmp-hub/gym-app-blueprint AI-Gym/docs           # blueprint into docs/
cd AI-Gym && git add . && git commit -m "RepBase v0.1 — MVP app + product blueprint" && git push
```

Then connect `AI-Gym` to Vercel (step 2 above). Alternatively: grant Claude access to `AI-Gym` in your Claude GitHub app settings and ask a new session to do the migration.

## Tech

Next.js 15 (App Router, TypeScript) · Tailwind CSS v4 · Dexie (IndexedDB) · PWA (manifest + service worker) · no backend, no analytics, no tracking.

## Disclaimer

RepBase provides general fitness and nutrition information, not medical advice. It is not a substitute for a doctor, registered dietitian, or qualified professional. Macros assume standard home recipes (±15%). Pain is a stop signal.
