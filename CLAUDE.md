# Innovation Hub -- Sun Life Innovation Department Dashboard

## Project Overview

Sun Life's Innovation Hub is an interactive portfolio dashboard and landing page showcasing Proof-of-Concept (POC) projects built by the Innovation team. It features animated heroes, particle physics backgrounds, an aurora-tinted dashboard, scroll-driven storytelling, and a "Did You Know" floating widget.

**Live features:**
- Animated hero with rotating text ("future", "AI-first", "useful", "live", "scalable")
- Antigravity particle field (HTML5 Canvas physics)
- Impact Dashboard hero section with Aurora background
- POC Gallery with category filters (All/AI-ML/Web3/Data/Infra)
- Interactive donut chart, impact bars, activity heatmap
- Aurora-tinted content area behind dashboard widgets
- "Did You Know" floating fact bubble (auto-shows, collapses to circle button)
- Team carousel ("Your Idea Could Be Next" encouraging section)
- Scroll-driven Story page with GSAP ScrollTrigger pinned sections
- Zoom parallax section with team stats
- Live ticker with recent activity
- Smooth scroll via Lenis

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.6 |
| React | React + React DOM | 19.2.4 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS v4 (CSS-first config) | ^4 |
| PostCSS | @tailwindcss/postcss | ^4 |
| Animation | Framer Motion | ^12.39.0 |
| Scroll Animation | GSAP + ScrollTrigger + @gsap/react | ^3.15.0 / ^2.1.2 |
| Smooth Scroll | @studio-freight/lenis | ^1.0.42 |
| Icons | lucide-react | ^1.16.0 |
| Utilities | clsx, tailwind-merge, class-variance-authority | latest |
| UI Primitives | @radix-ui/react-slot | ^1.2.4 |
| Runtime | Node.js | v24.15.0+ |
| Package Manager | npm | v11+ |

---

## Quick Start

```bash
# Clone the repo
git clone <repo-url>
cd innovation-hub

# Install dependencies
npm install

# Run dev server
npm run dev
# -> http://localhost:3000

# Build for production
npm run build
npm start
```

**Required:** Node.js 20+ (tested on v24.15.0)

---

## Project Structure

```
innovation-hub/
|-- app/
|   |-- layout.tsx          # Root layout (Geist fonts, metadata)
|   |-- page.tsx            # Main dashboard page (~810 lines, "use client")
|   |-- story/
|   |   +-- page.tsx        # Scroll-driven story page (GSAP + Lenis)
|   |-- globals.css         # Design system, aurora keyframes, Tailwind v4 config
|   +-- favicon.ico
|-- components/
|   |-- AntigravityField.tsx     # Canvas-based particle physics simulation
|   |-- FloatingGeometry.tsx     # Decorative floating shapes
|   +-- ui/
|       |-- animated-hero.tsx         # Rotating text hero with stats
|       |-- aurora-background.tsx     # Full aurora background effect component
|       |-- button.tsx                # Base button (cva variants)
|       |-- button-colorful.tsx       # Gradient animated button
|       |-- did-you-know.tsx          # Floating fact bubbles widget
|       |-- scroll-expansion-hero.tsx # Impact Dashboard hero section
|       |-- story-scroll.tsx          # GSAP ScrollTrigger pinned sections
|       |-- testimonial.tsx           # Team member carousel
|       +-- zoom-parallax.tsx         # Framer Motion parallax on scroll
|-- lib/
|   +-- utils.ts            # cn() helper (clsx + tailwind-merge)
|-- public/
|   |-- file.svg, globe.svg, next.svg, vercel.svg, window.svg
|-- package.json
|-- tsconfig.json
|-- postcss.config.mjs
|-- eslint.config.mjs
|-- .gitignore
+-- CLAUDE.md               # This file
```

---

## Architecture Decisions

### Tailwind CSS v4 -- CSS-First Configuration

**No `tailwind.config.js` or `tailwind.config.ts` exists.** Tailwind v4 uses CSS-first configuration via `@theme inline` blocks in `globals.css`.

- Colors, fonts, and animations registered in `@theme inline { ... }`
- Custom CSS variables in `:root` for design tokens
- Aurora animation registered as: `--animate-aurora: aurora 60s linear infinite;`
- PostCSS config uses `@tailwindcss/postcss` plugin (not the old `tailwindcss` plugin)

### No `src/` Directory

Standard Next.js App Router layout. Files at root: `app/`, `components/`, `lib/`.

### Path Alias

`@/*` maps to `./*` (tsconfig paths). Import like: `@/components/ui/button`

### All Pages Are Client Components

Both `app/page.tsx` and `app/story/page.tsx` use `"use client"` directive at top since they rely heavily on browser APIs (Canvas, scroll events, Framer Motion, GSAP).

---

## Design System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#f8f9fc` | Page background |
| `--bg-2` | `#ffffff` | Card backgrounds |
| `--text` | `#1a1a2e` | Primary text (dark navy) |
| `--text-2` | `#555580` | Secondary text |
| `--text-3` | `#8888aa` | Tertiary/muted text |
| `--accent-1` | `#6c5ce7` | Primary purple |
| `--accent-2` | `#a29bfe` | Light purple |
| `--accent-3` | `#00cec9` | Teal accent |
| `--accent-4` | `#fd79a8` | Pink accent |
| `--accent-5` | `#fdcb6e` | Yellow accent |
| `--glass` | `rgba(255,255,255,0.72)` | Glassmorphism bg |
| `--glass-border` | `rgba(108,92,231,0.15)` | Glass border |

### Fonts (loaded via Google Fonts CDN in globals.css)

| Variable | Font | Usage |
|----------|------|-------|
| `--font-display` | Space Grotesk | Headings, display text |
| `--font-main` | Inter | Body text |
| `--font-mono` | JetBrains Mono | Code, stats, technical |

**Additionally:** Geist Sans and Geist Mono loaded via `next/font/google` in `layout.tsx` (CSS variables `--font-geist-sans`, `--font-geist-mono`).

### Design Patterns

- **Glassmorphism:** `backdrop-filter: blur(16px)` + semi-transparent bg + subtle border
- **Gradient text:** `background: linear-gradient(135deg, #6c5ce7, #a29bfe, #00cec9)` with `background-clip: text`
- **Aurora effect:** Layered repeating-linear-gradient with 60s infinite animation + mix-blend-difference
- **Dot grid:** Radial gradient pattern `28px` spacing
- **Rounded corners:** `16px` (cards), `28px` (hero media), `full` (buttons/badges)

---

## Key Components

### `app/page.tsx` (Main Page)

Contains all dashboard logic inline (~810 lines):
- `CountUp` -- Animated number counter with intersection observer
- `DonutChart` -- SVG donut with animated stroke-dasharray
- `ImpactBars` -- Horizontal progress bars with labels
- `ActivityHeatmap` -- Grid-based calendar heatmap
- `LiveTicker` -- Auto-scrolling recent activity feed
- `PocGallery` -- Filterable card grid (9 POC cards)
- Metrics: 80 POCs, 12 Production, 6 Prototyping, 8 Markets, 5 Leaders, 8+ Tech Streams

### `components/AntigravityField.tsx`

Full HTML5 Canvas particle system with:
- Mouse-repulsion physics (antigravity effect)
- Connection lines between nearby particles
- Responsive resize handling
- RequestAnimationFrame loop

### `components/ui/aurora-background.tsx`

Reusable aurora background wrapper using CSS custom properties and layered gradients. Uses `mix-blend-difference` and `filter: invert` for the light-on-dark effect.

### `components/ui/did-you-know.tsx`

Floating widget fixed `bottom-8 right-8`:
- Auto-appears after 2.5s
- Cycles through facts every 6s
- On dismiss: collapses to small purple circle button
- Click circle: shows next fact
- 8 facts from portfolio data (Gen AI dominance, markets, team stats)

### `components/ui/scroll-expansion-hero.tsx`

Impact Dashboard hero with AuroraBackground wrapper. Shows title, description, and media (image/video) with stat overlays. Children render in a separate plain section below.

### `app/story/page.tsx`

Scroll-driven narrative page:
- Lenis smooth scroll initialization
- GSAP ScrollTrigger pinned full-screen story sections
- 5 FlowSections with varying content
- ZoomParallax section with team data
- Responsive font clamping

---

## Data and Content

### POC Cards (9 entries)

| Name | Category | Status |
|------|----------|--------|
| Agentic AI Workflow | AI-ML | Live |
| Blockchain Claims Audit | Web3 | Pilot |
| Predictive Underwriting | AI-ML | Live |
| Smart Contract Policies | Web3 | Prototype |
| Real-time Risk Engine | Data | Live |
| Knowledge Graph Builder | AI-ML | Pilot |
| Zero-Knowledge ID Verification | Web3 | Prototype |
| Streaming Analytics Pipeline | Data | Live |
| Cloud-Native Microservices | Infra | Live |

### Fun Facts (DidYouKnow widget)

8 facts covering: Gen AI entries (27/80), multi-market reach (8 markets), team size (5 innovation leaders), tech streams (8+), prototyping phase (6 POCs), production rate (12 live), AI-ML dominance, quarterly growth.

### Team Members

- Sachin Mathur -- Innovation Team Leader
- Prashant Agarwal -- Principal Solution Designer
- Shelza Jindal -- Innovation Hub Owner
- Karthik Ramadurai -- Innovation Engineer
- Chandan Singh -- Innovation Engineer

---

## CSS Architecture

### `globals.css` Structure

1. Google Fonts import (Space Grotesk, Inter, JetBrains Mono)
2. `@import "tailwindcss"` (Tailwind v4 entry point)
3. `:root` -- All CSS custom properties + aurora variables
4. `@theme inline` -- Tailwind theme tokens (colors, fonts, animations)
5. Base styles (box-sizing, body, scroll-behavior)
6. Utility classes: `.bg-dot-grid`, `.bg-aurora`, `.aurora-layer`, `.glass-card`, `.gradient-text`, `.grain`
7. `@keyframes aurora` -- Background position animation (50% to 350%)
8. `@keyframes marquee` -- Translate animation for ticker
9. Custom scrollbar styles

### Aurora CSS Variables

```css
--aurora-white: rgba(255,255,255,0.96);
--aurora-transparent: rgba(255,255,255,0);
--aurora-black: rgba(9,9,27,0.95);
--aurora-blue-500: #3b82f6;
--aurora-indigo-300: #a5b4fc;
--aurora-blue-300: #7dd3fc;
--aurora-violet-200: #ddd6fe;
--aurora-blue-400: #38bdf8;
```

---

## Configuration Files

### `postcss.config.mjs`
```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

### `tsconfig.json` (key settings)
- `target`: ES2017
- `module`: esnext
- `moduleResolution`: bundler
- `jsx`: react-jsx (Next.js 16 default)
- `paths`: `@/*` maps to `./*`
- Includes `.next/types/**/*.ts` for Next.js type generation

---

## Development Notes

### Running Locally
```bash
npm run dev          # Starts on http://localhost:3000 (Turbopack)
npm run build        # Production build
npm run lint         # ESLint
```

### Common Issues

1. **Port conflict**: If `next dev` says port 3000 taken, kill existing process: `taskkill /PID <pid> /F` (Windows) or `kill <pid>` (Mac/Linux)
2. **No tailwind.config.js**: This is intentional. Tailwind v4 uses CSS-first config. Don't create one.
3. **"use client" everywhere**: Required because every page uses hooks, Canvas, or animation libraries.
4. **GSAP plugin registration**: Done inside `useEffect` with `gsap.registerPlugin(ScrollTrigger)` -- GSAP plugins must register client-side only.

### When Making Changes

- **Adding Tailwind animations**: Add to `@theme inline` block in `globals.css` as `--animate-<name>: <name> <duration> <timing> <iteration>;`
- **Adding CSS variables**: Add to `:root` in `globals.css`
- **New components**: Place in `components/ui/` for reusable UI, `components/` for page-specific
- **New pages**: Create `app/<route>/page.tsx` with `"use client"` if using any client features

---

## Dependencies Installation

When setting up on a new machine, run:

```bash
npm install
```

This installs all dependencies from `package.json`:

**Runtime:**
- `next@16.2.6` -- React framework
- `react@19.2.4` + `react-dom@19.2.4` -- UI library
- `framer-motion@^12.39.0` -- Declarative animations
- `gsap@^3.15.0` + `@gsap/react@^2.1.2` -- Scroll-driven animations
- `@studio-freight/lenis@^1.0.42` -- Smooth scroll
- `lucide-react@^1.16.0` -- Icon library
- `class-variance-authority@^0.7.1` -- Component variant helper
- `clsx@^2.1.1` + `tailwind-merge@^3.6.0` -- Class utilities
- `@radix-ui/react-slot@^1.2.4` -- Polymorphic component primitive

**Dev:**
- `tailwindcss@^4` + `@tailwindcss/postcss@^4` -- Styling
- `typescript@^5` -- Type checking
- `eslint@^9` + `eslint-config-next@16.2.6` -- Linting
- `@types/node@^20` + `@types/react@^19` + `@types/react-dom@^19` -- Type definitions

---

## Branding

This is a **Sun Life** Innovation Hub project. No references to "Hilti" should exist. Key messaging:
- "Sun Life's Innovation Hub is where breakthrough ideas become real products -- fast."
- Team section: "Your Idea Could Be Next" (encouraging participation, not showcasing team)
- Dashboard subtitle: "Innovation AI Portfolio"

---

## Git and Deployment

- `.gitignore` excludes: `node_modules/`, `.next/`, `.env*`, `*.tsbuildinfo`
- No environment variables needed for basic local dev
- No database or external APIs required
- All data is hardcoded/static (POC cards, team members, facts)
