# Homepage Makeover — section-by-section Before/After

**Author:** Design research, couvert.ai
**Date:** 2026-04-21
**Target file (not modified):** `/Users/maximilianveit/couvert.ai/docs/index.html`
**Depends on:** `styleguide.md` tokens

All proposals assume the new `:root` from the styleguide is live. Color references use token names.

## Page-global changes

- Body bg: `var(--canvas)` (`#FAF8F3`). Header bg: `rgba(250,248,243,0.85)` + `backdrop-filter: blur(16px)`, bottom-hairline.
- Section defaults: `padding: var(--sp-9) 0` (120 px block) at desktop, `var(--sp-7) 0` (48 px) at mobile.
- **Silence gaps**: insert `<div class="silence"></div>` between major chapters. `.silence { height: var(--sp-10); }` at desktop, `var(--sp-7)` mobile.
- Global bg switches removed: no more `light-section` class — the whole page is one canvas with underlays where needed.

## Section order (unchanged)

1. Hero
2. Value-Grid
3. Proof-Bar
4. Stages
5. Solutions
6. Couvert Agents
7. Mockups-Gallery
8. Calculator
9. Final CTA

(Plus Origin + Science inside Methodik/Ablauf subpages — not in scope here.)

---

## 1) Hero

### Current state
Dark-green flood bg, H1 with italic serif em, hero-teaser card linking to beispiel-report, bullets row below, copper radial-glow blob in top-right. Padding-top 140 px. Feels heavy because of the green flood and the 700 px radial glow. No dashboard visible.

### Proposed state

**Layout:** 2-column on desktop (`grid-template-columns: 1.1fr 1fr`, gap `var(--sp-7)`), stacked on tablet/mobile.

- **Left column**: overline (mono label `VON SCAN ZU OPERATIONS`), H1 `clamp(48px, 6.4vw, 88px)` DM Sans 600 on `--ink` with ONE DM Serif Display italic em-span ("Agentic Service OS"), sub-lead `--fs-body-lg`, two buttons (`btn--primary` → Scan buchen; `btn--ghost` → Beispielreport), trust-bullets row (svg-check + label × 4, in `--ink-3` at 13 px).
- **Right column**: `.dashboard-embed` (the hero asset). Contains a real screenshot of the Reports product (`docs/mockups/product-report.html` rendered at 1:1, or a PNG export of it). Window-chrome bar on top. Size: fills column, aspect-ratio 16/10.
- **Scroll behavior**:
  - At scroll-y 0: dashboard enters with opacity 0 → 1 and `scale(.96) → 1`, duration 800 ms, easing `--ease-out-quint`, starting at load.
  - From 0 → 400 px scroll: dashboard translates `translateY(-8 px)` with mild parallax (CSS: `transform: translateY(calc(var(--scroll-y) * -0.04))`, set by rAF-throttled scroll listener).
- **Background**: `--canvas`. Remove radial copper glow. Replace with a single quiet linen texture overlay at 3% opacity (optional P2).
- **Padding**: `padding-top: 120px; padding-bottom: var(--sp-9)`.

### Why
Borrowed from **amakori** (dashboard rises with scroll) and **linear** (dashboard asset as hero, not decoration). Kills the "dark-green flood" feeling immediately. Makes the product tangible in the first 3 seconds.

### Exact specs

```
Bg: var(--canvas)  /* #FAF8F3 */
Container: max-width 1240, padding-inline clamp(20px, 4vw, 56px)
Section: padding-block 120px desktop / 48px mobile
H1: clamp(48px, 6.4vw, 88px), DM Sans 600, -0.04em, line-height 1.05, color var(--ink)
H1 em: DM Serif Display 400 italic, color var(--copper)
Sublead: clamp(17px, 1.4vw, 19px), 400, var(--ink-2), line-height 1.6, max-width 540
Overline: JetBrains Mono 500, 12px, 0.18em, uppercase, var(--copper)
Buttons: see styleguide (.btn--primary, .btn--ghost)
Dashboard-embed: aspect-ratio 16/10, radius 16, box-shadow var(--shadow-xl), 1px hairline border
Grid gap: var(--sp-7) (48px)
Reveal: hero content at 0ms; dashboard at 80ms with scale(.96)→1 over 800ms
```

---

## 2) Value-Grid (4 cards: "Was wir konkret verbessern")

### Current state
4 cards in a row on dark-green bg2. 1px `--border`, copper icon, cream-bright titles, text-dim body. Cards are dense (`min-height: 220px`). Hover: `translateY(-3px)` + copper-tint bg. Feels like a menu panel, not a narrative.

### Proposed state

**Layout**: `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))` — fluid, 4→3→2→1 cols automatically.

- Each card uses `.card.card--flat` (no heavy shadow, only 1px `--hairline`). Hover: border upgrades to `--hairline-strong`, no lift needed.
- Icon container 48 × 48, bg `--copper-tint`, radius 10 px, icon stroke `--copper`.
- H3 17 px DM Sans 600 `--ink`; body 14.5 px 400 `--ink-3`.
- Inter-card gap 16 px.
- Section padding 120 px block; section-label mono overline `WAS WIR KONKRET VERBESSERN` above a serif-free H2 `clamp(32px, 3.4vw, 40px)` DM Sans 600 `--ink` centered in a 680 max-width header.

### Why
**Amakori "Sechs Disziplinen"** pattern — uniform flat cards, icon-in-tint, calm rhythm. Removes the hover-lift that makes every card feel like a popup.

### Exact specs

```
Bg: var(--canvas)
Card: bg var(--canvas-raised), border 1px var(--hairline), radius 12, padding 28 24 24
Card hover: border-color var(--hairline-strong), bg unchanged, no transform
Icon box: 48x48, bg var(--copper-tint), radius 10, svg 24x24 stroke var(--copper)
H3: 17px DM Sans 600 var(--ink) -0.01em
P: 14.5px DM Sans 400 var(--ink-3) line-height 1.55
Min-card-width: 260px (auto-fit grid)
Reveal: reveal-stagger children, 60ms per card
```

---

## 3) Proof-Bar

### Current state
4-KPI row on `--light-bg` with hairlines. Works. Mono numbers, copper color. Acceptable but the surrounding page is dark-green, so this light strip is jarring.

### Proposed state

Surface `--canvas-sunken` (`#F2EFE7`) — a quiet inset, not a page switch.

- 4 columns (auto-fit). Each cell: KPI number in `--gold-ink` at `clamp(26px, 2.6vw, 32px)` JetBrains Mono 500 tabular-nums, label below at 13 px `--ink-3`.
- Separators: 1px `--hairline` verticals.
- Top-context pill removed (currently reads `Beispiel: Gastro-Betrieb Zürich`) — replace with a small label above: `AUS EINEM AKTUELLEN SCAN` mono 11 px `--copper` centered.
- Padding 48 px block.
- Count-up: on reveal, each number animates from 0 to final over 1200 ms, easing `--ease-out-quint`, stagger 100 ms per column.

### Why
**Stripe docs** inset pattern — the surface looks like a docked information strip, not a separate page. Count-up animation is the one "mitreissend" moment before the Stages section.

---

## 4) Stages (Scan / Intelligence / Operations)

### Current state
Dark-green bg, 3-col grid with 1px-border gaps, copper top-accent on cards, stage-cta link. Works structurally; feels heavy due to the dark bg.

### Proposed state

- Section bg `--canvas`.
- 3 cards, now on `--canvas-raised` with `.card.card--flat` style, 1px `--hairline` border, no 1px-grid-trick.
- Gap `var(--sp-4)` between cards.
- Each card has a **large mono step-number** in top-left (`01` / `02` / `03`) at 52 px DM Sans 600 `--copper-tint` outline-style (CSS `color: transparent; -webkit-text-stroke: 1.5px var(--copper)`). Underneath, the step label mono 11 px `--copper`, then stage-title in DM Sans 600 24 px `--ink`, body 15 px `--ink-2`, then a subtle chevron link.
- Hover: border → `--hairline-strong`, card lifts 2 px.
- Between stages, SVG chevron connectors (desktop only): small `›` arrow mono 24 px `--ink-4` in the gutter.

### Why
**Pitch numbered-chapter pattern** — replaces the copper 2px top-border (a "shouty" decoration) with a semi-transparent outlined numeral that feels editorial. Chevron connectors make the sequence legible without arrows-and-arrows.

### Exact specs

```
Stage-num: 52px DM Sans 600, color transparent, -webkit-text-stroke 1.5px var(--copper), line-height 0.9
Stage-label: 11px mono 500 var(--copper) 0.18em
Stage-title: 24px DM Sans 600 var(--ink) -0.01em line-height 1.2
Stage-body: 15px 400 var(--ink-2) line-height 1.6
Card padding: 32 28
Grid: auto-fit minmax(300px, 1fr), gap 16
```

---

## 5) Solutions (the critical one — founder's 4-team look-alike problem)

### Current state
`.solutions-section` on `#FAF7F2` with 4 color-coded tabs (Guest/Quality/Revenue/Market). Each tab shows a big colored left tile (filled with team color) + right-side KPI card + quote card + extra card. The founder's complaint: **the 4 screens all look the same** — same layout, same card proportions, just recolored.

### Proposed state: sticky-dashboard chapter (pitch-pattern)

**Concept:** ONE sticky dashboard on the right, four scroll-linked text chapters on the left. As the user scrolls, the dashboard visibly swaps to show that team's view, and the currently-active chapter text is highlighted.

**Layout (desktop ≥1024):**

```
grid-template-columns: 0.9fr 1.1fr
```

- **Left column**: a vertical stack of 4 chapters. Each chapter is `min-height: 80vh` so scrolling one chapter = one "screen". Inside each chapter:
  - Mono overline `TEAM 01 · GUEST EXPERIENCE` (per-team accent color)
  - H2 `clamp(28px, 3.2vw, 40px)` DM Sans 600 `--ink`
  - Body 16 px `--ink-2` 2 short paras (max 60 chars/line)
  - 2–3 chips listing the agents (e.g. `Reputation Manager`, `Sentiment Analyst`, `Booking Optimizer`)
  - One outcome KPI: `CHF 80.000+ jährlich`, in `--gold-ink` 36 px mono
  - A small `Mehr sehen →` link to `/mockups/product-*.html`
- **Right column**: one `.dashboard-embed` pinned with `position: sticky; top: 120px`. Inside, four layered screenshots stacked using `position: absolute; inset: 32px 0 0 0; opacity: 0`. The one matching the current chapter has `opacity: 1`. Crossfade 300 ms.

**Scroll logic**: `IntersectionObserver` on each chapter with `rootMargin: -40% 0px -40% 0px`. When chapter enters that central band, it becomes active → sets `data-active="true"` on left + toggles dashboard layer.

**Sub-differentiation per team (addresses "all screens look the same"):**

Instead of identical tab layouts, each chapter's dashboard swap actually shows a **different UI**:

| Team | Dashboard shown | Distinct visual |
|---|---|---|
| Guest Experience | `product-reviews.html` | Left-list of reviews + right-pane reply drafting |
| Quality & Operations | `product-report.html` scrolled to complaint-theme heatmap | Heatmap grid (weekday × hour) |
| Revenue & Menu | `product-report.html` scrolled to impact table | Full-width KPI-row + impact-breakdown table |
| Market & Growth | `product-competitor.html` | Competitor pulse bars + alerts feed |

Each view has a distinctly different **dominant UI pattern** (list, heatmap, table, bars) — this is the "visually differentiate" ask.

**Mobile (≤768)**: sticky is disabled. Chapters stack with each chapter showing its dashboard inline below the text at aspect 16/10. Crossfade becomes sequential reveal.

### Why
Directly borrows **pitch.com scroll-pinned chapters**. The founder's complaint ("alle sehen gleich aus") is solved by showing ACTUAL different UIs per team, not recolored clones.

### Exact specs

```
Section bg: var(--canvas)
Chapter height: min 80vh desktop, auto mobile
Dashboard-embed: sticky top 120px, z-index 1, aspect-ratio 16/10
Chapter overline per team: mono 11px 0.18em with team accent:
  guest → var(--copper), quality → var(--green-accent),
  revenue → var(--gold-ink), market → #7A4A5A
Chapter H2: clamp(28px, 3.2vw, 40px) DM Sans 600
Chips: .chip--agent style
Outcome-number: 36px mono 500 var(--gold-ink) tabular-nums
Active-chapter indicator: left-border 2px team-accent + fade chapter-text opacity from .45 (idle) to 1 (active) over 300ms
Crossfade between dashboard layers: 300ms ease-out-quint
IntersectionObserver rootMargin: -40% 0px -40% 0px
```

---

## 6) Couvert Agents (12 agents, 4 teams)

### Current state
`.ai-team-section` on `--light-bg` with 2×2 grid of team cards. Each card: overline, team name in serif, italic intro, list of 3 agents with bold name + description. Clean but static — doesn't communicate "agent working live".

### Proposed state

**Layout**: Bento grid (raycast pattern), 12-col, 2 rows:

```
row 1: Guest (col-span 7) | Quality (col-span 5)
row 2: Revenue (col-span 5) | Market (col-span 7)
```

- Each team card uses `.card.card--elevated`, radius 16, padding 40 32.
- Top: team glyph (32 × 32, filled team-accent, serif monogram inside), then team name H3 24 px DM Sans 600 `--ink`, tagline 14 px `--ink-3`.
- Agent list: 3 items. Each item is a `.agent-row` — 40 px tall, `chip--agent` on the left (green dot = active), agent name 14 px DM Sans 600 `--ink`, one-liner 13 px `--ink-3`. Hover: row bg `--canvas-sunken`, chip dot pulse 2 s.
- Bottom of each card: mini "live tick" showing something the agent did today — e.g. `Reputation Manager · 14:07 · drafted reply for 3-star review #1823`. Mono 12 px `--ink-3` with a left-border 2px team-accent. This is a **fake-live** element; data can be statically hardcoded but rotating via JS for visual life.

**Per-team distinct accent tint** (5% opacity gradient on card top-right corner keyed to team color) — category identity without overwhelming.

### Why
**Raycast bento** (variable spans) + **stripe** (text-first, real-data-feeling). The "live tick" is the "feels like you're already using the product" beat.

### Exact specs

```
Section bg: var(--canvas)
Grid: 12-col, gap var(--sp-5)
Card: radius 16, padding 40 32, shadow var(--shadow-md)
Team glyph: 32x32, radius 8, serif 15px monogram, color white, bg team-accent
Agent row: padding 12 0, border-top 1px var(--hairline) between rows
Agent chip dot: 6px, bg var(--success), keyframe pulse .4→1 over 1.4s infinite
Live-tick bar: bg var(--canvas-sunken), border-left 2px team-accent, padding 10 14, mono 12px
Category gradient overlay: top-right radial, 5% team-color, 180px radius
```

---

## 7) Mockups-Gallery

### Current state
2×2 grid of `.mockup-card` — each card contains a scaled-down iframe preview of the 4 product pages. Feels "stuck in" (founder). The product-*.html files themselves are strong ("sehr stark, hut ab"), but showing them at 40% scale inside small cards reads as screenshot-placeholder.

### Proposed state: dominant + thumbnails

**Layout:**
```
grid-template-areas: "dominant dominant thumbs thumbs"
                     "dominant dominant thumbs thumbs";
grid-template-columns: 2fr 2fr 1fr 1fr;
```

- **Dominant (left, span 2×2)**: large `.dashboard-embed` showing the currently-selected product-*.html at aspect-ratio 16/10, 1:1 pixel scale (not scaled). Window chrome, heavy `--shadow-xl`. Default: `product-report.html`.
- **Thumbs (right column)**: 4 vertical thumbnail cards, each ~200 × 140. Each shows a static PNG of the product screen + overline label (`REVIEWS`, `REPORT`, `SHIFT`, `COMPETITOR`). Clicking a thumb crossfades the dominant (300 ms) to that product, updates URL hash, and marks the thumb active (2 px copper left-border + `--canvas-sunken` bg).
- Mobile: stack — dominant becomes 100% width, thumbs become a horizontally-scrolling chip row below (`overflow-x: auto; scroll-snap-type: x mandatory`).

**CTA footer** inside the section: centered `.btn--primary` "Klick-Dummy öffnen" → opens `/clickdummy/` route (spec'd in `clickdummy-spec.md`).

### Why
**Amakori "Dein Cockpit"** (one big dashboard) + **pitch.com thumbnail-ribbon navigation**. Respects the founder's "keep the product-*.html feel but make the dominant view bigger" ask.

### Exact specs

```
Section bg: var(--canvas)
Dashboard-embed: aspect 16/10, radius 16, shadow var(--shadow-xl)
Thumb: 200x140 (desktop), radius 10, 1px hairline, padding-bottom label 10px 14px
Thumb overline: mono 10px 0.2em uppercase var(--copper)
Thumb thumbnail image: object-fit cover, 1:1 pixel-scaled screenshot
Active thumb: 2px left-border var(--copper), bg var(--canvas-sunken)
Crossfade: 300ms ease-out-quint
Iframe or <img>: prefer PNG export. Fall back to <iframe loading="lazy"> for interactive live-preview only if perf allows.
```

**Note:** generating PNG exports of the 4 product pages is a one-time step — use Playwright headless + `page.screenshot` at 1920 × 1200 for crisp retina.

---

## 8) Calculator

### Current state
2-column (form left, results right). Sliders with copper thumbs, result-cards with `3px` top-border accents, detail-panel showing churn-indicator. Technically fine but visually loud — every result card has a colored top-stripe, the churn bar has a rainbow gradient, and the copper slider-pulse adds yet another moving part.

### Proposed state

- Keep 2-column structure, tighten visuals.
- **Result cards**: remove `3px` top-border. Replace with a small `.chip--status` at top (green "Recovery" / red "Verlust") — same information, less weight.
- **Slider pulse**: keep but reduce opacity peak from .6 → .3, reduce scale peak from 2.2 → 1.6. Fires only on first slider-interaction, then never again (current behavior fires ×4 per slider — excessive).
- **Churn-indicator**: replace the 3-stop gradient (`green→copper-soft→red`) with a 2-stop (`--success → --danger`), same 6 px height.
- **KPI numbers**: currently `--gold`; keep, but use `--gold-ink` when on light bg (`#8A6A12`) for AA contrast.
- **Bridge quote** (italic copper-bordered): keep; replace copper left-border with `var(--green-accent)` 2 px to diversify from the surrounding copper.
- Add ONE `dashboard-embed` preview below the calculator results showing "this is what your Couvert report looks like" — 120 × 75 thumbnail + "Beispiel-Report öffnen" link.

### Why
**Linear restraint** — reduce competing decorations. **Stripe** "data is the hero" — let the numbers breathe. Calculator was the single noisiest block on current homepage (5 colored accents in one view).

### Exact specs

```
Result card: bg var(--canvas-raised), border 1px var(--hairline), radius 12
Top chip: .chip--status--danger ("Umsatzverlust") or ...--success ("Recovery-Potenzial")
Number: clamp(28px, 3vw, 36px) mono 500 tabular-nums, var(--gold-ink) on light, var(--gold) on dark
Slider thumb: 24x24 var(--copper) border 2px var(--canvas-raised)
Slider track: 4px bg var(--hairline), active fill var(--copper)
Churn bar: 6px, linear-gradient var(--success) → var(--danger)
Bridge quote: border-left 2px var(--green-accent), padding 18 24, italic 16px var(--ink-2)
```

---

## 9) Final CTA

### Current state
Centered H2 in serif, para, two buttons. On dark-green canvas (same as rest of page today). Gets lost.

### Proposed state

This is where the **second `.underlay` block** appears (the only other besides Solutions).

- Full container-width `.underlay` in `--green-deep`, radius 24, padding 96 56 desktop / 48 24 mobile.
- Center-aligned: mono overline `NÄCHSTER SCHRITT · 45 MINUTEN`, serif italic H2 `Lassen Sie uns einen Scan für Ihren Betrieb starten.` `clamp(32px, 4vw, 48px)` DM Serif Display 400 italic `--green-ink`, sub 16 px rgba(245,240,235,.82), two buttons (primary + ghost-on-green).
- Subtle radial glow top-left inside underlay (`rgba(196,103,58,.12)` at 15% radius).
- Below the underlay (outside it, on `--canvas`): a small trust-row (3 mono items): `DSGVO · CH/EU-HOSTING · KEIN LOGIN NÖTIG`.

### Why
Last word on the page should feel like a decisive moment. The green underlay concentrates brand identity in one powerful block at the close, rather than diffusing it across every section.

### Exact specs

```
Wrapper: .underlay, bg var(--green-deep), radius 24, padding 96 56
H2: DM Serif Display 400 italic, clamp(32px, 4vw, 48px), color var(--green-ink), -0.01em, line-height 1.15
Sub: 16px 400 rgba(245,240,235,.82), max-width 540, centered
Buttons: .btn--primary (copper) + .btn--ghost (on-green variant)
Glow: radial-gradient at 20% 10%, rgba(196,103,58,.18) → transparent 50%, absolute inset 0, pointer-events none
Trust row (below underlay): gap 32, mono 11px 0.15em var(--ink-3), each item prefixed by 6px var(--copper) dot
```

---

## Priority bucket

**P0 — ship first (delivers the 15% jump)**
1. Hero: swap bg to canvas + place `.dashboard-embed` right column with scroll-rise.
2. Solutions: convert to sticky-dashboard chapter with 4 distinct product-views.
3. Mockups-Gallery: dominant + thumbs layout, replace 4 iframes with 1 big + 4 thumbs.
4. Global: remove `--bg / bg2 / bg3` dark-green flood; reduce to `--canvas`/`--canvas-raised`/`--canvas-sunken` + two `--green-deep` underlays.

**P1**
5. Stages: new `01/02/03` outlined numeral + hairline cards.
6. Agents: bento grid + live-tick rows.
7. Proof-Bar: count-up on first reveal, sunken-canvas surface.
8. Final CTA: green underlay block.

**P2**
9. Value-Grid: `auto-fit` fluid grid, calmer hover.
10. Calculator: restraint pass (remove 3px top-border, reduce pulse intensity).
11. Silence-gaps (240 px) between chapters on desktop.
12. Reduced-motion guard refresh.
