# Dashboard Design System

Reusable design reference for building professional team/department dashboards. Derived from Sun Life Innovation Hub — stripped of animations, particle effects, and scroll-driven theatrics. What remains: the structural patterns, color system, typography, and component anatomy that make dashboards look polished at executive level.

---

## Color Palette

### Core Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#FFFFFF` | Page background |
| `--bg-2` | `#FFFFFF` | Card/surface background |
| `--text` | `#1F2A2E` | Primary headings, bold text |
| `--text-2` | `#5B6770` | Body text, descriptions |
| `--text-3` | `#5B6770` | Muted/tertiary text |
| `--cream` | `#FFF7E3` | Soft background fills (badges, progress track) |

### Accent Colors

| Token | Hex | Role |
|-------|-----|------|
| `--accent-1` | `#ECAB23` | Primary brand (gold/amber) — labels, highlights, active states |
| `--accent-2` | `#F8D56A` | Secondary (light gold) — gradients, hover states |
| `--accent-3` | `#0E5665` | Tertiary (deep teal) — info indicators, secondary buttons |
| `--accent-4` | `#0E3846` | Dark teal — dark sections, footer-band backgrounds |
| `--accent-5` | `#082F3A` | Darkest teal — text on accent backgrounds |

### Glass Effect

| Token | Value | Usage |
|-------|-------|-------|
| `--glass` | `rgba(255, 255, 255, 0.86)` | Card background |
| `--glass-border` | `rgba(236, 171, 35, 0.28)` | Card border (subtle gold tint) |

### Adapting Colors for Another Team

Replace `--accent-1` through `--accent-5` with your team's palette. Keep `--bg`, `--text`, `--text-2`, `--cream` as neutrals. The system works with any single-hue accent ramp (e.g., blue: `#2563EB` primary → `#93C5FD` light → `#1E3A5F` dark).

---

## Typography

### Font Stack

| Variable | Font | Weight Range | Usage |
|----------|------|--------------|-------|
| `--font-display` | Space Grotesk | 500–700 | Headings, section titles, metric numbers |
| `--font-main` | Inter | 300–600 | Body text, descriptions, UI labels |
| `--font-mono` | JetBrains Mono | 400–500 | Data values, stats, tags, version labels |

### Scale

| Element | Size | Weight | Font |
|---------|------|--------|------|
| Page heading (h1) | `text-4xl` / `text-5xl` on md+ | 700 | Display |
| Section heading (h2) | `text-4xl` / `text-5xl` on md+ | 700 | Display |
| Card title (h3) | `text-lg` | 700 | Display |
| Widget heading (h4) | `text-base` | 700 | Display |
| Section label (overline) | `text-xs` | 700 | Main (uppercase, `tracking-[0.18em]`) |
| Body paragraph | `text-sm` | 400 | Main |
| Data value / metric | `text-3xl` | 700 | Display or Mono |
| Caption / muted | `text-xs` | 500 | Main or Mono |
| Tag / badge | `text-[10px]` or `text-xs` | 500–700 | Mono |

### Gradient Text (for emphasis words)

```css
.gradient-text {
  background: linear-gradient(135deg, #ECAB23 0%, #F8D56A 40%, #0E5665 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

Use sparingly — one word per heading max (e.g., "Impact **Dashboard**").

---

## Spacing and Layout

### Container

```
max-width: 7xl (80rem / 1280px)
padding-x: 2rem (px-8)
centered: mx-auto
```

### Section Spacing

| Pattern | Value |
|---------|-------|
| Section vertical padding | `py-24` (6rem) |
| Between section title and content | `mb-10` to `mb-16` |
| Between cards in grid | `gap-6` |
| Between metric cards | `gap-4` |
| Card internal padding | `p-5` to `p-8` |

### Responsive Grid Patterns

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| Metrics row | 2 cols | 3 cols | 6 cols |
| Chart widgets | 1 col | 1 col | 3 cols |
| Card gallery | 1 col | 2 cols | 3 cols |
| Hero split | stacked | stacked | 2 cols |

---

## Component Patterns

### 1. Glass Card (primary surface)

The foundational container for all content blocks.

```css
.glass-card {
  background: rgba(255, 255, 255, 0.86);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(236, 171, 35, 0.28);
  border-radius: 16px;
  box-shadow: 0 18px 60px rgba(14, 56, 70, 0.08);
}
```

**Simplified version (no backdrop-filter):**
```css
.card {
  background: #ffffff;
  border: 1px solid rgba(236, 171, 35, 0.15);
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(14, 56, 70, 0.06);
}
```

### 2. Navigation Bar

Structure:
```
[Logo + Brand Name]     [Nav Links]     [CTA Button]
```

- Fixed top, full width
- Glass card style (blur background)
- Logo: 32x32 rounded-lg div with gradient background + initials
- Brand name: `text-lg font-bold`, display font
- Links: `text-sm font-medium text-[--text-2]`, hover → accent color
- CTA: gradient button (see Buttons below)

### 3. Section Header Pattern

Every dashboard section follows this structure:

```
┌─────────────────────────────────────────┐
│  [OVERLINE LABEL]          (small, uppercase, accent color, tracking-wide)
│  Section Title with Gradient Word       (h2, display font, bold)
│  One-line description paragraph         (text-2 color, max-w-xl, centered)
└─────────────────────────────────────────┘
```

Optional: pill badge above the overline:
```html
<div class="inline-block rounded-full px-4 py-1.5 text-xs font-semibold"
     style="background: #FFF7E3; color: #ECAB23; border: 1px solid rgba(236,171,35,0.15)">
  Category Label
</div>
```

### 4. Metric Cards (KPI Row)

Grid of small cards showing headline numbers:

```
┌────────────┐  ┌────────────┐  ┌────────────┐
│    80      │  │    12      │  │     6      │
│   POCs     │  │ Production │  │ Prototyping│
└────────────┘  └────────────┘  └────────────┘
```

- Card: glass-card, `p-5 text-center`
- Number: `text-3xl font-bold`, display font, colored per metric
- Label: `text-xs font-medium text-[--text-2]`
- Hover: `scale-105` transform
- Grid: `grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4`

### 5. Widget Card (Charts, Heatmaps, Bars)

```
┌─────────────────────────────────────────────────┐
│  OVERLINE LABEL                         [Icon]  │
│  Widget Title                                   │
│                                                 │
│  [Chart / Data Visualization Content]           │
│                                                 │
└─────────────────────────────────────────────────┘
```

- Header row: flex justify-between
- Overline: `text-xs font-bold uppercase tracking-[0.18em]` in accent-1
- Title: `text-lg font-bold text-[--text]`, display font
- Icon: `h-5 w-5` in accent-1 (lucide-react)
- Content padding: `p-6`
- Header margin: `mb-5`

### 6. Gallery Card (Project/Item cards)

```
┌─────────────────────────────────────────────────┐
│  [Featured Badge — optional]                    │
│  Card Title                    [Status Pill]    │
│  Description text (2 lines max)                 │
│  [tag] [tag] [tag]                              │
│  Unit/Team                     Impact Metric    │
└─────────────────────────────────────────────────┘
```

- Glass card with `p-6`
- Title: `text-base font-bold`, hover → accent color
- Status pill: `rounded-full px-2 py-0.5 text-xs font-semibold` with tinted bg
- Tags: `rounded-full bg-[--cream] px-2 py-0.5 text-[10px]`, mono font
- Hover: `-translate-y-1` + stronger shadow
- Featured: spans 2 cols (`md:col-span-2`)

### 7. Filter Toolbar

Row of pill-shaped toggle buttons:

```
[All]  [Category A]  [Category B]  [Category C]
```

- Active: `bg-[--accent-1] text-white border-[--accent-1]`
- Inactive: `bg-white/72 text-[--text-2] border-[--accent-1]/18`
- Shape: `rounded-full px-4 py-2 text-xs font-bold`

### 8. Live Indicator / Ticker Bar

```
┌─────────────────────────────────────────────────┐
│  ● [pulsing dot]  Latest update text     [meta] │
└─────────────────────────────────────────────────┘
```

- Glass card, flex row, items-center
- Dot: layered span (outer ping animation + inner solid circle), teal color
- Text: `text-sm font-semibold`
- Meta label: `text-xs text-[--text-2]`, mono font

### 9. Trend Badges Row

Compact info cards in a 3-column grid:

```
┌──────────────────┐
│  +42%            │
│  Quarter Growth  │  [↗ icon]
└──────────────────┘
```

- Glass card, `p-4`, flex between
- Value: `text-xs font-bold uppercase tracking-[0.18em]`, colored by tone
- Label: `text-sm font-semibold text-[--text]`
- Icon: `ArrowUpRight h-5 w-5`, colored by tone

### 10. Bar Chart (Year-over-Year)

```
         18     38     80     14
        ┌──┐   ┌──┐   ┌──┐   ┌──┐
        │  │   │  │   │  │   │  │
        │  │   │  │   │  │   │  │
        └──┘   └──┘   └──┘   └──┘
        2023   2024   2025   2026
```

- Container: glass card with `p-8`
- Bars: `rounded-t-lg`, gradient fill (accent-1 → accent-2)
- Labels above: `text-sm font-bold`, mono font, accent color
- Labels below: `text-xs font-medium text-[--text-2]`
- Height container: `h-48 flex items-end gap-6`

### 11. Progress Bars (Impact/Breakdown)

```
Label                                   Value
[████████████████████░░░░░░░░░]
```

- Track: `h-3 rounded-full bg-[--cream]`
- Fill: `h-full rounded-full` with linear-gradient (colored → accent-2)
- Label row: `flex justify-between text-xs font-semibold text-[--text-2]`
- Value: mono font

### 12. Donut Chart

SVG-based ring chart:
- Outer: `viewBox="0 0 100 100"`, ring radius 42, strokeWidth 12
- Background ring: accent-1 at 10% opacity
- Segments: colored strokes with `strokeLinecap="round"`
- Legend beside: dot + label + value, stacked vertically

### 13. Footer

```
[Logo + Brand]          [Attribution text]          [Version badge]
```

- Top border: `border-t border-[--accent-1]/10`
- Padding: `px-8 py-16`
- Flex row (stacked on mobile)
- Version: pill badge with cream bg, mono font

### 14. Marquee Band (Stats Ticker)

Dark horizontal band:
```
● 80 POCs tracked  ● 12 in production  ● 6 prototypes  ...
```

- Background: gradient from `#1F2A2E` → `#0E3846` → `#1F2A2E`
- Text: `text-sm font-medium text-white/80`, mono font
- Dots: tiny circles alternating accent-1 and accent-3
- Padding: `py-6`

---

## Buttons

### Primary (Gradient CTA)

```css
background: linear-gradient(135deg, #ECAB23, #0E5665);
color: white;
border-radius: 9999px;
padding: 0.5rem 1.25rem;
font-size: 0.875rem;
font-weight: 600;
```

### Ghost / Outline

```css
background: transparent;
border: 1px solid rgba(236, 171, 35, 0.3);
color: var(--text-2);
border-radius: 9999px;
```

---

## Shadows

| Level | Value | Usage |
|-------|-------|-------|
| Card default | `0 18px 60px rgba(14, 56, 70, 0.08)` | Glass cards at rest |
| Card hover | `0 18px 60px rgba(236, 171, 35, 0.18)` | Gallery cards on hover |
| Subtle | `0 4px 24px rgba(14, 56, 70, 0.06)` | Simplified card variant |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius` | `16px` | Cards, containers |
| `--radius-sm` | `10px` | Smaller elements, heatmap cells |
| Full | `9999px` | Buttons, badges, pills, tags |
| Large | `24px` | Hero media, featured sections |

---

## Background Patterns

### Dot Grid (subtle texture)

```css
background-image: radial-gradient(circle, rgba(236,171,35,0.18) 1px, transparent 1px);
background-size: 28px 28px;
```

Use at ~40% opacity as a section backdrop.

### Soft Gradient (page-level ambient)

```css
background:
  radial-gradient(ellipse 72% 55% at 18% -10%, rgba(248,213,106,0.46) 0%, transparent 62%),
  radial-gradient(ellipse 56% 44% at 88% 24%, rgba(14,86,101,0.10) 0%, transparent 58%),
  radial-gradient(ellipse 64% 50% at 50% 105%, rgba(236,171,35,0.18) 0%, transparent 62%),
  #FFFFFF;
```

Gives the page warmth without being distracting. Replace accent colors as needed.

---

## Responsive Behavior

| Breakpoint | Key Changes |
|------------|-------------|
| Mobile (<768px) | Single column, stacked nav, hidden CTA, full-width cards |
| Tablet (768–1024px) | 2-col gallery, 3-col metrics, nav links visible |
| Desktop (1024px+) | Full grid layouts, side-by-side hero, 6-col metrics |

---

## Interaction States (Static Equivalents)

Since this system strips animations, use these static hover/focus cues:

| Element | Hover State |
|---------|-------------|
| Gallery card | `translateY(-4px)` + stronger shadow |
| Metric card | `scale(1.05)` |
| Nav link | Color change to accent-1 |
| Filter button | Background swap to accent-1, text to white |
| CTA button | Slight brightness increase |

---

## Checklist: Creating a New Dashboard

1. **Set up color tokens** — swap accent ramp to team's brand colors
2. **Pick fonts** — keep Inter for body, swap display font if brand requires
3. **Build nav** — logo + brand + links + CTA
4. **Hero section** — split layout (text left, visual right) or centered heading
5. **Metrics row** — 4–6 KPI cards with big numbers
6. **Widget grid** — 2–3 chart/data cards in responsive grid
7. **Gallery** — filterable card grid for projects/items/products
8. **Footer** — branding + attribution + version

---

## File Structure for a New Dashboard

```
new-dashboard/
├── app/
│   ├── layout.tsx        # Fonts, metadata
│   ├── page.tsx          # Main page
│   └── globals.css       # Tokens + utilities from this doc
├── components/
│   └── ui/
│       ├── card.tsx      # Glass card wrapper
│       ├── metric.tsx    # KPI number card
│       ├── widget.tsx    # Chart container with header
│       └── filter.tsx    # Pill filter toolbar
├── lib/
│   ├── utils.ts          # cn() helper
│   └── data.ts           # Static data arrays
└── package.json
```

---

## What Was Removed (and why you don't need it)

| Feature | Why Removed |
|---------|-------------|
| Aurora background effect | Heavy CSS animation, distracting in data-focused dashboards |
| Antigravity particle field | Canvas physics sim — impressive but zero utility |
| Framer Motion layout animations | Adds bundle weight; CSS transitions sufficient |
| GSAP ScrollTrigger sections | Scroll storytelling is for landing pages, not dashboards |
| Lenis smooth scroll | Interferes with native scroll UX |
| Grain noise overlay | Aesthetic flair, not professional utility |
| Marquee ticker animation | Static stats bar works fine |
| CountUp number animation | Just show the number |

Keep the **visual structure** (glass cards, color system, typography hierarchy, grid patterns). Drop the **motion layer**. Result: same professional polish, faster load, simpler codebase.
