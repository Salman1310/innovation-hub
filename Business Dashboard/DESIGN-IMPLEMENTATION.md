# Design Implementation Spec — SLGS Capacity Creation Leadership Dashboard

> **Instruction:** Apply this design system to the existing dashboard. Do NOT modify any data, KPI values, layout structure, header, filter dropdowns, or table arrangements. Only apply visual enhancements and add the specified new components.

---

## CRITICAL: What NOT to Change

- **Header** — "Capacity Creation Leadership Dashboard" header stays exactly as-is (text, position, metadata)
- **KPI Row 1** — 6 cards layout, their order, labels, values, and grid positioning
- **KPI Row 2** — 4-5 cards layout, their order, labels, values, and grid positioning
- **All tables** — Column structure, data, row order, side-by-side arrangements
- **Filter dropdowns** — Position, options, functionality
- **Any data values** — Numbers, percentages, text content must remain untouched
- **Any JavaScript logic** — Data computation, filtering, interactivity

---

## 1. Typography (Apply to existing elements)

Load these fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

Apply:
| Element | Font | Weight | Size |
|---------|------|--------|------|
| Dashboard title / section headers | `'Space Grotesk', sans-serif` | 700 | Keep existing size |
| Body text, labels, descriptions | `'Inter', sans-serif` | 400-600 | Keep existing size |
| All numbers, values, percentages | `'JetBrains Mono', monospace` | 500-700 | Keep existing size |
| KPI card labels (uppercase) | `'Inter', sans-serif` | 700, 9-10px, uppercase, letter-spacing: 0.12em | |
| Table headers | `'Inter', sans-serif` | 600, 11px, uppercase, letter-spacing: 0.12em | |

---

## 2. Page Background

Replace the current page background with:
```css
body {
  background:
    radial-gradient(ellipse 72% 55% at 18% -10%, rgba(248, 213, 106, 0.38) 0%, transparent 62%),
    radial-gradient(ellipse 56% 44% at 88% 24%, rgba(14, 86, 101, 0.07) 0%, transparent 58%),
    radial-gradient(ellipse 64% 50% at 50% 105%, rgba(236, 171, 35, 0.14) 0%, transparent 62%),
    #FFF9EE;
  background-attachment: fixed;
}
```

Add subtle grain overlay:
```css
body::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1000;
  opacity: 0.02;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
}
```

---

## 3. Animated Aurora Background (KPI Rows ONLY)

Wrap the existing KPI Row 1 + KPI Row 2 container with an animated aurora wrapper. Do NOT move or restructure the KPIs — just add the wrapper around them.

```css
.kpi-aurora-wrapper {
  position: relative;
  border-radius: 24px;
  padding: 32px 28px;
  margin-bottom: 28px;
  overflow: hidden;
  background: linear-gradient(135deg, #FFFDF5 0%, #FFF8E8 40%, #FFFBF0 100%);
  border: 1px solid rgba(236, 171, 35, 0.15);
}

.kpi-aurora-wrapper::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(
      100deg,
      rgba(255, 205, 0, 0.06) 0%,
      rgba(255, 205, 0, 0.02) 7%,
      transparent 10%,
      transparent 12%,
      rgba(255, 205, 0, 0.04) 16%
    ),
    repeating-linear-gradient(
      100deg,
      rgba(236, 171, 35, 0.08) 10%,
      rgba(248, 213, 106, 0.05) 15%,
      rgba(14, 86, 101, 0.03) 20%,
      rgba(255, 255, 255, 0.02) 25%,
      rgba(236, 171, 35, 0.06) 30%
    );
  background-size: 300% 200%;
  animation: kpi-aurora-flow 60s linear infinite;
  opacity: 0.9;
}

.kpi-aurora-wrapper::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 10% 50%, rgba(255, 205, 0, 0.10) 0%, transparent 70%),
    radial-gradient(ellipse 50% 60% at 90% 30%, rgba(236, 171, 35, 0.08) 0%, transparent 70%),
    radial-gradient(ellipse 40% 40% at 50% 90%, rgba(14, 86, 101, 0.04) 0%, transparent 60%);
  animation: kpi-aurora-pulse 12s ease-in-out infinite alternate;
}

@keyframes kpi-aurora-flow {
  from { background-position: 50% 50%, 50% 50%; }
  to { background-position: 350% 50%, 350% 50%; }
}

@keyframes kpi-aurora-pulse {
  0% { opacity: 0.5; }
  100% { opacity: 1; }
}
```

The KPI cards inside must have `position: relative; z-index: 2;` so they sit above the animated pseudo-elements.

---

## 4. KPI Card Styling (Apply to existing cards)

Do NOT change card content or layout. Only apply these visual styles:

```css
/* Each KPI card */
.kpi-card {
  background: #FFFFFF;
  border: 1px solid rgba(236, 171, 35, 0.12);
  border-left: 4px solid; /* color varies per card type — see below */
  border-radius: 12px;
  padding: 18px 20px;
  box-shadow: 0 4px 16px rgba(14, 56, 70, 0.06);
  transition: all 0.2s ease;
}

.kpi-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(14, 56, 70, 0.10);
}
```

### Card Color Coding (left border + value font color)

Apply based on the **semantic meaning** of each KPI card. The existing dashboard already uses color to indicate category — keep those same categories, just apply these exact hex values:

| Card Semantic | Left Border Color | Value Font Color | Label Font Color |
|---------------|------------------|------------------|------------------|
| Default / neutral | `#ECAB23` | `#1F2A2E` (dark) | `#5B6770` |
| Green (positive / realized / on-track) | `#4A8C5C` | `#2D6A3F` | `#4A8C5C` |
| Brown (pipeline / pending / in-progress) | `#8B6914` | `#8B6914` | `#A67C1A` |
| Red (at-risk / fallout / declining) | `#C94C4C` | `#C94C4C` | `#D65C5C` |
| Teal (redeployed / active movement) | `#0E5665` | `#0E5665` | `#1A7A8A` |
| Gold (attrition / contract / planned exit) | `#ECAB23` | `#A67C1A` | `#A67C1A` |

### Progress Bars inside KPI cards (where applicable)

For cards showing Green/Brown split (like "Capacity To Be Created" showing Green: 97, Brown: 40):

```css
.kpi-bar {
  height: 6px;
  border-radius: 3px;
  margin-top: 8px;
  background: #F0F0F0;
  overflow: hidden;
  display: flex;
}
.kpi-bar-segment {
  height: 100%;
}
```

```html
<!-- Example: 70% green, 30% brown -->
<div class="kpi-bar">
  <div class="kpi-bar-segment" style="width:70%;background:#4A8C5C"></div>
  <div class="kpi-bar-segment" style="width:30%;background:#8B6914"></div>
</div>
```

---

## 5. Table Styling (Apply to existing tables)

Do NOT change table structure or data. Apply these visual styles:

```css
.table-container {
  background: #FFFFFF;
  border: 1px solid rgba(236, 171, 35, 0.12);
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(14, 56, 70, 0.06);
  margin-bottom: 24px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead tr {
  background: #F8F9FC;
}

thead th {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #5B6770;
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid rgba(236, 171, 35, 0.12);
}

tbody td {
  padding: 14px 16px;
  font-size: 14px;
  color: #1F2A2E;
  border-bottom: 1px solid rgba(236, 171, 35, 0.06);
}

tbody tr:hover {
  background: #FFF7E3;
}

/* Numeric columns — right align, mono font */
tbody td:not(:first-child) {
  text-align: right;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 500;
}
```

### Status Pills (for status columns in tables)

```css
.status-pill {
  display: inline-block;
  border-radius: 999px;
  padding: 3px 10px;
  font-size: 11px;
  font-weight: 600;
}

/* Growing / On Track / Active */
.status-pill--green {
  background: rgba(74, 140, 92, 0.08);
  color: #2D6A3F;
}

/* Stable / Watch / In Progress */
.status-pill--gold {
  background: rgba(236, 171, 35, 0.12);
  color: #A67C1A;
}

/* Declining / At Risk / Over */
.status-pill--red {
  background: rgba(201, 76, 76, 0.08);
  color: #C94C4C;
}
```

---

## 6. Ticker Tape (NEW — Add above footer)

Insert a scrolling marquee between the main content and footer. It shows key live metrics.

**Position:** After all dashboard content, before any footer element.

```html
<div class="ticker-wrap">
  <div class="ticker-track">
    <!-- Repeat this block 3x for seamless loop -->
    <span class="ticker-item"><span class="ticker-dot ticker-dot--yellow"></span>5,535 SLGS headcount</span>
    <span class="ticker-item"><span class="ticker-dot ticker-dot--teal"></span>70 FTEs realized</span>
    <span class="ticker-item"><span class="ticker-dot ticker-dot--yellow"></span>67 in pipeline</span>
    <span class="ticker-item"><span class="ticker-dot ticker-dot--teal"></span>22 redeployed</span>
    <span class="ticker-item"><span class="ticker-dot ticker-dot--yellow"></span>68% AI reinvestment</span>
    <span class="ticker-item"><span class="ticker-dot ticker-dot--teal"></span>158 open positions</span>
    <span class="ticker-item"><span class="ticker-dot ticker-dot--yellow"></span>62 niche skill roles</span>
    <span class="ticker-item"><span class="ticker-dot ticker-dot--teal"></span>8.7 days avg bench TAT</span>
    <!-- Copy above 8 items 2 more times -->
  </div>
</div>
```

```css
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
  flex-shrink: 0;
}
.ticker-dot--yellow { background: #FFCD00; }
.ticker-dot--teal { background: #4ECDC4; }

@keyframes ticker-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-33.333%); }
}
```

---

## 7. "Did You Know" Floating Bubble (NEW — Add to page)

A floating widget fixed at bottom-right. Auto-appears after 3 seconds, cycles facts every 6 seconds. Dismissible to a circle button.

**Position:** `fixed; bottom: 32px; right: 32px; z-index: 90;`

```html
<div class="dyk-bubble" id="dykBubble">
  <div class="dyk-card dyk-hidden" id="dykCard">
    <div class="dyk-card__label">Did you know?</div>
    <div class="dyk-card__highlight" id="dykHighlight"></div>
    <div class="dyk-card__text" id="dykText"></div>
    <button class="dyk-card__dismiss" id="dykDismiss">Dismiss</button>
  </div>
  <button class="dyk-circle dyk-hidden" id="dykCircle">&#128161;</button>
</div>
```

```css
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
```

**JavaScript (add before `</body>`):**

```javascript
(function() {
  var facts = [
    { highlight: "5,535 total headcount", text: "SLGS spans 21 functions across India and Philippines — Canada & US Ops leads at 1,571 HC (27.6%)." },
    { highlight: "70 FTEs realized", text: "Capacity creation has achieved 70 FTEs against 1,383.8 target — Green contributes 94% of realized capacity." },
    { highlight: "68% AI reinvestment", text: "15 out of 22 redeployed FTEs were reinvested into AI roles — signalling the shift toward intelligent automation." },
    { highlight: "8.7 days avg TAT", text: "Average turnaround time from bench to new engagement is under 9 days — well within the 30-day SLA." },
    { highlight: "158 open positions", text: "Active hiring across 3 channels: 38 PH DRF demands, 107 India TA roles, and 13 contractor positions." },
    { highlight: "62 niche skill roles", text: "58% of India TA demand requires niche skills — GenAI, Legal, Analytics, and specialized engineering." },
    { highlight: "Q2 is peak demand", text: "80.3 FTE capacity creation planned for Q2 2026 — the highest concentration of any quarter this fiscal year." },
    { highlight: "Technology leads demand", text: "Technology function has 84 hot pipeline positions and 2,109 warm — the largest growth driver across SLGS." },
  ];

  var currentIndex = 0;
  var cycleTimer = null;
  var card = document.getElementById('dykCard');
  var circle = document.getElementById('dykCircle');
  var highlight = document.getElementById('dykHighlight');
  var text = document.getElementById('dykText');
  var dismiss = document.getElementById('dykDismiss');

  function showFact(index) {
    highlight.textContent = facts[index].highlight;
    text.textContent = facts[index].text;
    card.style.animation = 'none';
    card.offsetHeight;
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

  setTimeout(function() {
    showFact(0);
    card.classList.remove('dyk-hidden');
    startCycle();
  }, 3000);
})();
```

---

## 8. Color Reference (Complete Palette)

| Token | Hex | Usage |
|-------|-----|-------|
| Page background | `#FFF9EE` | Base page color |
| Card background | `#FFFFFF` | All cards and table containers |
| Card alt / table header | `#F8F9FC` | Alternate backgrounds |
| Cream highlight | `#FFF7E3` | Table row hover, badge fills |
| Text primary | `#1F2A2E` | Headings, primary values |
| Text secondary | `#5B6770` | Labels, descriptions |
| Text muted | `#8A9299` | Timestamps, tertiary text |
| Sun Life Yellow | `#FFCD00` | Buttons, bubble, ticker dots |
| Gold | `#ECAB23` | Default card borders, accents |
| Green (value) | `#2D6A3F` | Positive KPI values |
| Green (border/label) | `#4A8C5C` | Green card borders and labels |
| Brown (value) | `#8B6914` | Pipeline/pending values |
| Brown (label) | `#A67C1A` | Brown card labels |
| Red (value) | `#C94C4C` | At-risk / negative values |
| Teal (value) | `#0E5665` | Redeployment / active movement |
| Border default | `rgba(236, 171, 35, 0.12)` | Card and section borders |
| Border subtle | `rgba(236, 171, 35, 0.06)` | Table row separators |
| Shadow card | `0 4px 16px rgba(14, 56, 70, 0.06)` | Default card shadow |
| Shadow hover | `0 8px 24px rgba(14, 56, 70, 0.10)` | Card hover shadow |
| Ticker dark bg | `linear-gradient(135deg, #1F2A2E 0%, #0E3846 50%, #1F2A2E 100%)` | Ticker strip |

---

## 9. Implementation Checklist

- [ ] Add Google Fonts link to `<head>`
- [ ] Apply font-family to all text elements (headings, body, numbers)
- [ ] Replace page `background` with radial gradient + noise overlay
- [ ] Wrap KPI Row 1 + Row 2 in `.kpi-aurora-wrapper` (add the div, don't restructure cards)
- [ ] Apply white card styles with colored left borders to all KPI cards
- [ ] Apply progress bar HTML inside cards that show Green/Brown splits
- [ ] Apply table container styles (rounded, shadow, header bg)
- [ ] Apply status pill styles to status columns
- [ ] Add ticker tape HTML + CSS before footer
- [ ] Add "Did You Know" bubble HTML + CSS + JS before `</body>`
- [ ] Add card hover effects (`translateY(-2px)` + shadow)
- [ ] Verify all KPI values unchanged after styling
- [ ] Verify all table data unchanged after styling
- [ ] Verify header unchanged after styling
- [ ] Test responsive at 768px and 1200px

---

## Summary

This spec transforms the dashboard from a basic white/gray layout into a **premium Sun Life branded experience** while preserving 100% of the existing data, structure, and logic. The only additions are visual polish (aurora bg, typography, shadows, hover states) and two new interactive components (ticker + DYK bubble).
