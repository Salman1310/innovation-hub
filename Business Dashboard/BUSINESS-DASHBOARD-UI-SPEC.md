# Business Dashboard UI Spec — Sun Life Light Theme

> **Target:** SLGS Capacity Analysis Dashboard (standalone `.html` file, vanilla HTML/CSS/JS)
> **Goal:** Adapt the current dark-themed dashboard to Sun Life Innovation Hub light theme + add ticker tape and "Did You Know" bubble.

---

## 1. Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-page` | `#FFFFFF` | Page background |
| `--bg-card` | `#FFFFFF` | Card backgrounds |
| `--bg-card-alt` | `#F8F9FC` | Alternate card bg / subtle sections |
| `--bg-cream` | `#FFF7E3` | Highlight backgrounds, badge fills |
| `--text-primary` | `#1F2A2E` | Headings, primary labels |
| `--text-secondary` | `#5B6770` | Body text, descriptions |
| `--text-muted` | `#8A9299` | Tertiary text, timestamps |
| `--accent-yellow` | `#FFCD00` | Primary Sun Life yellow — buttons, highlights |
| `--accent-gold` | `#ECAB23` | Secondary gold — borders, active states |
| `--accent-teal` | `#0E5665` | Teal — production/positive indicators |
| `--accent-light-teal` | `#0E3846` | Dark teal — nav accents |
| `--accent-navy` | `#002855` | Button text on yellow, dark emphasis |
| `--status-growing` | `#0E5665` | "Growing" status |
| `--status-stable` | `#ECAB23` | "Stable" status |
| `--status-declining` | `#D63031` | "Declining" / negative status |
| `--border-default` | `rgba(236, 171, 35, 0.12)` | Card borders, dividers |
| `--border-subtle` | `rgba(236, 171, 35, 0.06)` | Table row separators |
| `--shadow-card` | `0 8px 32px rgba(14, 56, 70, 0.06)` | Card elevation |
| `--shadow-card-hover` | `0 12px 40px rgba(14, 56, 70, 0.10)` | Card hover state |
| `--glass-bg` | `rgba(255, 255, 255, 0.86)` | Glassmorphism background |
| `--glass-border` | `rgba(236, 171, 35, 0.18)` | Glassmorphism border |

---

## 2. Typography

| Role | Font Family | Weight | Size |
|------|------------|--------|------|
| Headings / Display | `'Space Grotesk', sans-serif` | 700 | 28–48px |
| Body text | `'Inter', sans-serif` | 400–500 | 14–16px |
| Metrics / Numbers | `'JetBrains Mono', monospace` | 500–700 | 18–42px |
| Labels / Captions | `'Inter', sans-serif` | 600 | 10–12px, uppercase, tracking 0.1em |
| Ticker text | `'JetBrains Mono', monospace` | 500 | 13px |

**Load via Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

---

## 3. Nav / Header

**Structure:** Fixed top bar, solid white, full-width.

```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo]  SLGS Capacity Analysis Dashboard   │  Nav Links  │ [Button] │
└─────────────────────────────────────────────────────────────────┘
```

**Specs:**
- `background: #FFFFFF`
- `border-bottom: 1px solid rgba(236, 171, 35, 0.12)`
- `box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04)`
- `padding: 12px 32px`
- `position: fixed; top: 0; left: 0; right: 0; z-index: 50`
- Logo: Sun Life logo image, height 36px
- Title: Space Grotesk 700, 18px, color `#1F2A2E`
- Nav links: Inter 500, 14px, color `#5B6770`, hover `#ECAB23`
- Active link: color `#ECAB23`, underline offset 4px

**Filter Controls (dropdowns in header):**
- `background: #FFFFFF`
- `border: 1px solid rgba(236, 171, 35, 0.18)`
- `border-radius: 8px`
- `padding: 8px 14px`
- `font-size: 13px`
- `color: #1F2A2E`
- Focus ring: `box-shadow: 0 0 0 2px rgba(255, 205, 0, 0.3)`

---

## 4. Metric Cards (KPI Tiles)

The large colored metric boxes at the top. In light theme, these become white cards with a **colored left accent border**.

**Layout:** Horizontal grid, 5–6 cards in a row, responsive wrap.

**Card specs:**
- `background: #FFFFFF`
- `border: 1px solid rgba(236, 171, 35, 0.12)`
- `border-left: 4px solid [accent-color]` — varies per card category
- `border-radius: 14px`
- `padding: 20px 24px`
- `box-shadow: 0 8px 32px rgba(14, 56, 70, 0.06)`
- Hover: `transform: translateY(-2px)`, shadow increases

**Inside card:**
- Category label: Inter 600, 10px, uppercase, tracking 0.15em, color = accent color
- Main value: JetBrains Mono 700, 36px, color `#1F2A2E`
- Subtext/context: Inter 400, 12px, color `#5B6770`
- Delta indicator: `+312.5` in green (`#0E5665`), negative in red (`#D63031`)

**Accent border colors by section:**
| Section | Left border color |
|---------|------------------|
| Green (confirmed) | `#0E5665` |
| Orange (pipeline) | `#ECAB23` |
| Placement / rate | `#FFCD00` |
| Generic | `rgba(236, 171, 35, 0.4)` |

---

## 5. Secondary Metric Row

Smaller cards below the main KPIs (Placement Rate, Net Pipeline, etc.)

- Same card style as above but smaller padding: `16px 20px`
- Value: JetBrains Mono 700, 28px
- Label: Inter 500, 11px, uppercase
- Percentage/delta: JetBrains Mono 500, 13px, colored by status

---

## 6. Table Styling (Pipeline by Function)

**Container:**
- `background: #FFFFFF`
- `border: 1px solid rgba(236, 171, 35, 0.12)`
- `border-radius: 14px`
- `padding: 24px`
- `box-shadow: 0 8px 32px rgba(14, 56, 70, 0.06)`

**Table header:**
- `background: #F8F9FC`
- `font: Inter 600, 11px, uppercase, tracking 0.12em`
- `color: #5B6770`
- `padding: 12px 16px`
- `border-bottom: 1px solid rgba(236, 171, 35, 0.12)`

**Table rows:**
- `padding: 14px 16px`
- `border-bottom: 1px solid rgba(236, 171, 35, 0.06)`
- Hover: `background: #FFF7E3`
- Font: Inter 400, 14px, color `#1F2A2E`
- Numbers: JetBrains Mono 500, 14px

**Status column ("Growing", "Stable", "Declining"):**
- Pill-shaped badge: `border-radius: 999px; padding: 3px 10px; font-size: 11px; font-weight: 600`
- Growing: `background: rgba(14, 86, 101, 0.08); color: #0E5665`
- Stable: `background: rgba(236, 171, 35, 0.12); color: #ECAB23`
- Declining: `background: rgba(214, 48, 49, 0.08); color: #D63031`

---

## 7. Buttons

**Primary (Sun Life yellow):**
- `background: #FFCD00`
- `color: #002855`
- `border: none`
- `border-radius: 8px`
- `padding: 10px 20px`
- `font: Inter 600, 14px`
- `box-shadow: 0 4px 16px rgba(255, 205, 0, 0.3)`
- Hover: `background: #E5B800; box-shadow: 0 6px 20px rgba(255, 205, 0, 0.4)`
- `transition: all 0.2s ease`

**Secondary (outline):**
- `background: transparent`
- `color: #ECAB23`
- `border: 1.5px solid #ECAB23`
- `border-radius: 8px`
- `padding: 10px 20px`
- Hover: `background: #FFF7E3`

---

## 8. Ticker Tape — Working Snippet

Horizontal scrolling marquee above the footer area. Shows live capacity/FTE data.

```html
<!-- TICKER TAPE -->
<style>
  .ticker-wrap {
    width: 100%;
    overflow: hidden;
    background: linear-gradient(135deg, #1F2A2E 0%, #0E3846 50%, #1F2A2E 100%);
    padding: 14px 0;
  }
  .ticker-track {
    display: flex;
    gap: 48px;
    white-space: nowrap;
    animation: ticker-scroll 25s linear infinite;
  }
  .ticker-item {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.8);
  }
  .ticker-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
  .ticker-dot--yellow { background: #FFCD00; }
  .ticker-dot--teal { background: #0E5665; }

  @keyframes ticker-scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-33.333%); }
  }
</style>

<div class="ticker-wrap">
  <div class="ticker-track">
    <!-- Repeat 3x for seamless loop -->
    <span class="ticker-item"><span class="ticker-dot ticker-dot--yellow"></span>380 FTEs confirmed</span>
    <span class="ticker-item"><span class="ticker-dot ticker-dot--teal"></span>141.5 FTEs in pipeline</span>
    <span class="ticker-item"><span class="ticker-dot ticker-dot--yellow"></span>68% placement rate</span>
    <span class="ticker-item"><span class="ticker-dot ticker-dot--teal"></span>Net pipeline +312.5</span>
    <span class="ticker-item"><span class="ticker-dot ticker-dot--yellow"></span>57% attrition coverage</span>
    <span class="ticker-item"><span class="ticker-dot ticker-dot--teal"></span>20 bench pool active</span>
    <!-- Copy above block 2 more times for seamless scroll -->
    <span class="ticker-item"><span class="ticker-dot ticker-dot--yellow"></span>380 FTEs confirmed</span>
    <span class="ticker-item"><span class="ticker-dot ticker-dot--teal"></span>141.5 FTEs in pipeline</span>
    <span class="ticker-item"><span class="ticker-dot ticker-dot--yellow"></span>68% placement rate</span>
    <span class="ticker-item"><span class="ticker-dot ticker-dot--teal"></span>Net pipeline +312.5</span>
    <span class="ticker-item"><span class="ticker-dot ticker-dot--yellow"></span>57% attrition coverage</span>
    <span class="ticker-item"><span class="ticker-dot ticker-dot--teal"></span>20 bench pool active</span>
    <span class="ticker-item"><span class="ticker-dot ticker-dot--yellow"></span>380 FTEs confirmed</span>
    <span class="ticker-item"><span class="ticker-dot ticker-dot--teal"></span>141.5 FTEs in pipeline</span>
    <span class="ticker-item"><span class="ticker-dot ticker-dot--yellow"></span>68% placement rate</span>
    <span class="ticker-item"><span class="ticker-dot ticker-dot--teal"></span>Net pipeline +312.5</span>
    <span class="ticker-item"><span class="ticker-dot ticker-dot--yellow"></span>57% attrition coverage</span>
    <span class="ticker-item"><span class="ticker-dot ticker-dot--teal"></span>20 bench pool active</span>
  </div>
</div>
```

---

## 9. "Did You Know" Bubble — Working Snippet

Floating widget fixed at bottom-right. Auto-appears after 3s, cycles facts every 6s. Dismissible to a small circle button.

```html
<!-- DID YOU KNOW BUBBLE -->
<style>
  .dyk-bubble {
    position: fixed;
    bottom: 32px;
    right: 32px;
    z-index: 90;
    font-family: 'Inter', sans-serif;
  }
  .dyk-card {
    background: #FFFFFF;
    border: 1px solid rgba(236, 171, 35, 0.18);
    border-radius: 16px;
    padding: 20px 24px;
    max-width: 300px;
    box-shadow: 0 12px 40px rgba(14, 56, 70, 0.12);
    animation: dyk-fade-in 0.3s ease;
  }
  .dyk-card__label {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #ECAB23;
    margin-bottom: 8px;
  }
  .dyk-card__highlight {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #1F2A2E;
    margin-bottom: 6px;
  }
  .dyk-card__text {
    font-size: 13px;
    line-height: 1.6;
    color: #5B6770;
    margin-bottom: 12px;
  }
  .dyk-card__dismiss {
    background: none;
    border: none;
    color: #8A9299;
    font-size: 12px;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 6px;
    transition: color 0.2s;
  }
  .dyk-card__dismiss:hover { color: #1F2A2E; }

  .dyk-circle {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #FFCD00;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 20px rgba(255, 205, 0, 0.35);
    transition: transform 0.2s, box-shadow 0.2s;
    font-size: 18px;
  }
  .dyk-circle:hover {
    transform: scale(1.08);
    box-shadow: 0 8px 28px rgba(255, 205, 0, 0.45);
  }

  .dyk-hidden { display: none; }

  @keyframes dyk-fade-in {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>

<div class="dyk-bubble" id="dykBubble">
  <!-- Expanded card -->
  <div class="dyk-card" id="dykCard">
    <div class="dyk-card__label">Did you know?</div>
    <div class="dyk-card__highlight" id="dykHighlight"></div>
    <div class="dyk-card__text" id="dykText"></div>
    <button class="dyk-card__dismiss" id="dykDismiss">Dismiss</button>
  </div>
  <!-- Collapsed circle -->
  <button class="dyk-circle dyk-hidden" id="dykCircle">💡</button>
</div>

<script>
(function() {
  const facts = [
    { highlight: "380 FTEs confirmed", text: "Our green-confirmed headcount has reached 380 FTEs — the highest pipeline conversion this quarter." },
    { highlight: "68% placement rate", text: "More than two-thirds of confirmed resources have been placed into active engagements across all functions." },
    { highlight: "+312.5 net pipeline", text: "Net pipeline demand is up 312.5 FTEs over last quarter, signalling strong growth across Technology and Operations." },
    { highlight: "57% attrition covered", text: "Over half of projected attrition has already been back-filled through proactive bench and pipeline planning." },
    { highlight: "20 bench pool active", text: "The bench pool currently holds 20 resources ready for rapid deployment to new engagements." },
    { highlight: "Technology leads demand", text: "Technology function accounts for the largest ramp-up demand at 187 FTEs, followed by Operations at 163." },
  ];

  let currentIndex = 0;
  let cycleTimer = null;
  const card = document.getElementById('dykCard');
  const circle = document.getElementById('dykCircle');
  const highlight = document.getElementById('dykHighlight');
  const text = document.getElementById('dykText');
  const dismiss = document.getElementById('dykDismiss');

  function showFact(index) {
    highlight.textContent = facts[index].highlight;
    text.textContent = facts[index].text;
    card.style.animation = 'none';
    card.offsetHeight; // reflow
    card.style.animation = 'dyk-fade-in 0.3s ease';
  }

  function startCycle() {
    cycleTimer = setInterval(function() {
      currentIndex = (currentIndex + 1) % facts.length;
      showFact(currentIndex);
    }, 6000);
  }

  function collapse() {
    card.classList.add('dyk-hidden');
    circle.classList.remove('dyk-hidden');
    clearInterval(cycleTimer);
  }

  function expand() {
    currentIndex = (currentIndex + 1) % facts.length;
    showFact(currentIndex);
    circle.classList.add('dyk-hidden');
    card.classList.remove('dyk-hidden');
    startCycle();
  }

  dismiss.addEventListener('click', collapse);
  circle.addEventListener('click', expand);

  // Auto-show after 3 seconds
  setTimeout(function() {
    showFact(0);
    card.classList.remove('dyk-hidden');
    startCycle();
  }, 3000);

  // Initially hidden
  card.classList.add('dyk-hidden');
})();
</script>
```

---

## 10. General Layout Patterns

**Page structure:**
```
┌─── Nav (fixed) ────────────────────────────────────────────┐
├─── Main Content (padding-top: 72px) ───────────────────────┤
│  ┌── KPI Cards Row (grid, 5-6 cols) ──────────────────┐   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌── Secondary Metrics Row (grid, 5 cols) ─────────────┐   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌── Table Section (full width card) ──────────────────┐   │
│  └─────────────────────────────────────────────────────┘   │
├─── Ticker Tape ────────────────────────────────────────────┤
├─── Footer ─────────────────────────────────────────────────┤
└────────────────────────────────────────────────────────────┘
[Did You Know bubble - fixed bottom-right]
```

**Grid:**
- Max width: `1400px`, centered with `margin: 0 auto`
- Side padding: `32px`
- Card gap: `20px`
- Section vertical spacing: `32px`

**Border radius:**
- Cards: `14px`
- Buttons: `8px`
- Badges/pills: `999px`
- Inputs/dropdowns: `8px`

**Transitions:**
- All interactive elements: `transition: all 0.2s ease`
- Cards on hover: `transform: translateY(-2px)`

---

## 11. Responsive Breakpoints

| Breakpoint | Cards per row | Table | Ticker |
|------------|--------------|-------|--------|
| > 1200px | 5–6 | Full table | Full speed |
| 768–1200px | 3 | Horizontal scroll | Normal |
| < 768px | 1–2 stacked | Stacked rows | Slower (35s) |

---

## 12. Accessibility Notes

- All text meets WCAG AA contrast on white bg
- Focus states: `outline: 2px solid #FFCD00; outline-offset: 2px`
- Ticker: include `aria-live="polite"` and `role="marquee"`
- DYK bubble: trap focus when expanded, `aria-label` on circle button
- Status colors paired with text labels (never color-only)

---

## Summary Checklist

- [ ] Replace dark backgrounds with `#FFFFFF` / `#F8F9FC`
- [ ] Apply Sun Life color palette (yellow/teal/navy)
- [ ] Switch fonts to Space Grotesk + Inter + JetBrains Mono
- [ ] Restyle metric cards with white bg + colored left border
- [ ] Restyle table with light header, subtle row separators
- [ ] Restyle dropdowns/buttons to Sun Life yellow
- [ ] Add ticker tape above footer (copy snippet)
- [ ] Add "Did You Know" bubble (copy snippet)
- [ ] Restyle status badges to pill format with semantic colors
- [ ] Add card hover elevations and transitions
- [ ] Test responsive at 768px and 1200px breakpoints
