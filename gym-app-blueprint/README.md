# AI Gym Tracker — Product Blueprint

> **Note:** This folder is a standalone personal project blueprint, unrelated to the Innovation Hub dashboard.
> It lives here temporarily because this session could not create a new GitHub repository.
> See "Moving this to its own repo" below.

## What this is

A product blueprint for a **personal, mobile-first gym tracker + AI nutrition coach** — built to replace paid apps like Hevy with something you own, that costs ₹0/month to run, and that adds what those apps lack: nutrition (with real Indian diet support), coaching logic driven by your own training data, and animated exercise guidance — all in one app.

The full plan is in **[PRODUCT_PLAN.md](./PRODUCT_PLAN.md)**: product strategy, AI design, UI concepts, tech stack, database schema, phased roadmap, monetization (if it ever stops being personal), and a deliberately skeptical risk analysis.

## Headline decisions (details and reasoning in the plan)

| Decision | Choice |
|---|---|
| Platform (phase 1) | Next.js PWA, installed to phone home screen, offline-first |
| Data | Local-first: IndexedDB on your phone, no backend, no account |
| "AI" | Deterministic engine (TDEE/macros, progressive overload, plateau/deload detection) + **optional** bring-your-own Claude API key for chat |
| Exercise content | Open-licensed `free-exercise-db` (~870 exercises) + custom animated loops for the top ~60 |
| UI direction | Premium health-tech, dark-first |
| First build scope | Tracker + exercise library + coach-lite. No social, no payments, no photo AI |
| Monthly running cost | ₹0 (Vercel/GitHub Pages free tier; LLM chat optional, pennies, your key) |

## Build phases

1. **MVP (~2–3 weekends):** workout logging done properly — routines, sets/reps/weight/RPE, rest timer, previous performance, PRs, history, exercise library with media, dashboard, onboarding, nutrition targets + Indian/global meal plan templates.
2. **V1:** progress analytics (e1RM, volume, measurements, photos), coach-lite heuristics, meal logging vs targets, grocery lists.
3. **V2 (only if still using it after 8+ weeks):** optional Claude-powered chat coach/nutritionist, data export/sync, wearable basics.
4. **Long-term (only if it becomes a product):** accounts, cloud sync, social, payments, photo meal estimation.

**The success metric that matters:** cancel Hevy and still be logging workouts in this app 4 weeks later.

## Moving this to its own repo

The Claude GitHub integration couldn't create a repository (permission scope). To give this project its proper home:

1. Create an empty **private** repo on GitHub, e.g. `Salman1310/ai-gym-tracker` (no README/license — fully empty).
2. From a machine with this branch checked out:
   ```bash
   git clone https://github.com/Salman1310/innovation-hub.git --branch claude/ai-gym-tracker-app-lga8m5 tmp-hub
   mkdir ai-gym-tracker && cp -r tmp-hub/gym-app-blueprint/* ai-gym-tracker/
   cd ai-gym-tracker && git init -b main && git add . && git commit -m "Product blueprint"
   git remote add origin https://github.com/Salman1310/ai-gym-tracker.git && git push -u origin main
   ```
3. Or simpler: start a new Claude session, grant it access to the new empty repo in the Claude GitHub settings, and ask it to move the blueprint over and start the MVP build there.
