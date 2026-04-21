# couvert.ai Design System — Styleguide proposal

**Author:** Design research, couvert.ai
**Date:** 2026-04-21
**Status:** Proposal (not yet applied to production)
**Supersedes:** implicit tokens in `docs/style.css` `:root`

This is the new source of truth. Implementation should derive `:root` CSS variables from this doc only.

---

## 1. Color tokens

### 1.1 Canvas & ink

| Token | Hex | Role |
|---|---|---|
| `--canvas` | `#FAF8F3` | Primary page background — **replaces** current `--bg: #1A3C34`. Clinical warm off-white. |
| `--canvas-raised` | `#FFFFFF` | Cards, dashboard surface, form fields |
| `--canvas-sunken` | `#F2EFE7` | Subtle inset blocks (proof-bar, calc-detail-panel bg) |
| `--ink` | `#12221E` | Primary text, headlines (replaces `--cream-bright`) |
| `--ink-2` | `#384844` | Body copy |
| `--ink-3` | `#6C726E` | Captions, metadata, placeholder text |
| `--ink-4` | `#9BA19D` | Disabled, very quiet labels |
| `--hairline` | `rgba(18,34,30,0.08)` | Dividers, card borders, table lines |
| `--hairline-strong` | `rgba(18,34,30,0.14)` | Hover-state borders, focus rings |

### 1.2 Dark-green as ACCENT / UNDERLAY only

| Token | Hex | Role |
|---|---|---|
| `--green-deep` | `#1A3C34` | Underlay blocks only (max 2 per scroll). Text on this block uses `--canvas`. |
| `--green-deep-2` | `#142D27` | Second-layer contrast inside an underlay block (card-within-underlay) |
| `--green-ink` | `#F5F0EB` | Text color when placed on `--green-deep` block |
| `--green-accent` | `#2F5E52` | Small accents only (agent-team glyphs, data-viz secondary) |

### 1.3 Primary accent — copper (keep, ration)

| Token | Hex | Role |
|---|---|---|
| `--copper` | `#C4673A` | Primary CTA button, primary link, single most-important hover state. **Max 3 applications per viewport.** |
| `--copper-hover` | `#B05930` | Hover for primary CTA |
| `--copper-tint` | `rgba(196,103,58,0.06)` | Subtle card-hover background wash |
| `--copper-ink-on-canvas` | `#A0522D` | When copper is used as body link text (AA contrast on off-white) |

### 1.4 Data-viz / emphasis — gold

| Token | Hex | Role |
|---|---|---|
| `--gold` | `#E8B931` | Big numbers in calculator/KPIs, star-ratings, positive-delta highlights (NOT buttons) |
| `--gold-ink` | `#8A6A12` | Gold as text on off-white canvas (for AA contrast) |

### 1.5 Semantic status

| Token | Hex | Role |
|---|---|---|
| `--success` | `#3E8D68` | Success toasts, positive delta arrows |
| `--success-bg` | `#E7F2EC` | Success tint fill |
| `--danger` | `#C14438` | Errors, red-down delta |
| `--danger-bg` | `#F9E7E5` | Error tint fill |
| `--warning` | `#C48A1E` | Caution states |

### 1.6 Usage matrix (where each color goes)

| Surface | Background | Ink | Accent |
|---|---|---|---|
| Hero | `--canvas` | `--ink` | `--copper` on CTA only |
| Value-grid cards | `--canvas-raised` | `--ink` | `--copper` icon |
| Proof-bar | `--canvas-sunken` | `--ink-2` | `--copper` on numbers |
| Stages (Scan/Intel/Ops) | `--canvas` with 1px `--hairline` between | `--ink` | `--green-accent` step label |
| Solutions (sticky story) | `--canvas`, one `--green-deep` underlay block wrapping the dashboard | `--green-ink` inside underlay, `--ink` outside | `--copper` step-indicator |
| Calculator | `--canvas` | `--ink` | `--gold` on numbers, `--copper` on slider thumb |
| Agents | `--canvas` with individual cards on `--canvas-raised` | `--ink` | per-team glyph color |
| CTA (final) | `--green-deep` underlay | `--green-ink` | `--copper` button |
| Footer | `--canvas-sunken` | `--ink-3` | `--copper` on links |
| Error field | `--canvas-raised` | `--danger` | `--danger` border 1.5px |
| Success toast | `--success-bg` | `--ink` | `--success` left-border 3px |

### 1.7 What to REMOVE from current :root

Drop these tokens (no longer referenced): `--bg2`, `--bg3`, `--cream-bright`, `--text`, `--text-dim`, `--border`, `--border-hover`, `--leinen`, `--graphit`, `--stein`, `--light-bg`, `--light-bg-2`, `--light-ink-softer`, `--light-border-hover`, `--light-accent`. Rename `--copper-soft` → `--copper-hover`. This alone removes ~16 tokens.

---

## 2. Typography scale

### 2.1 Families (unchanged but weight-disciplined)

- **Display/Serif:** `DM Serif Display` — weight 400 only (italic variant allowed for emphasis in H1 only)
- **Sans:** `DM Sans` — weights **400 and 600 only** (remove 300, remove 500, remove 700)
- **Mono:** `JetBrains Mono` — weight 500 only

Three families, five total weight-instances. Current stylesheet uses four weights of DM Sans — this is the biggest typographic cleanup.

### 2.2 Fluid scale

```
--fs-display : clamp(48px, 6.4vw, 88px);   /* Hero H1, one per page */
--fs-h1      : clamp(36px, 4.6vw, 56px);   /* Section openers */
--fs-h2      : clamp(28px, 3.4vw, 42px);   /* Subsection titles */
--fs-h3      : clamp(20px, 1.9vw, 24px);   /* Card titles */
--fs-h4      : 17px;                        /* Small block labels */
--fs-body-lg : clamp(17px, 1.4vw, 19px);   /* Lead paragraphs */
--fs-body    : 16px;                        /* Default */
--fs-body-sm : 14.5px;                      /* Card body, captions */
--fs-label   : 12px;                        /* Mono labels (uppercase, tracking .18em) */
--fs-micro   : 11px;                        /* Finest captions, footer legal */

--lh-tight   : 1.05;   /* Display */
--lh-heading : 1.15;   /* H1–H3 */
--lh-body    : 1.6;
--lh-snug    : 1.45;   /* Card titles */
```

### 2.3 Type-role map

| Role | Family | Weight | Size token | LH | Tracking |
|---|---|---|---|---|---|
| Hero H1 | DM Sans | 600 | `--fs-display` | `--lh-tight` | `-0.04em` |
| Hero H1 italic em | DM Serif Display | 400 italic | inherit | inherit | `-0.02em` |
| Section H2 | DM Sans | 600 | `--fs-h1` | `--lh-heading` | `-0.03em` |
| Serif accent H2 (origin, cta) | DM Serif Display | 400 | `--fs-h1` | `--lh-heading` | `-0.01em` |
| H3 card title | DM Sans | 600 | `--fs-h3` | `--lh-snug` | `-0.01em` |
| Body lead | DM Sans | 400 | `--fs-body-lg` | `--lh-body` | `0` |
| Body default | DM Sans | 400 | `--fs-body` | `--lh-body` | `0` |
| Caption | DM Sans | 400 | `--fs-body-sm` | 1.5 | `0` |
| Section label (overline) | JetBrains Mono | 500 | `--fs-label` | 1 | `0.18em` uppercase |
| KPI number | JetBrains Mono | 500 | `clamp(36px, 4vw, 56px)` | 1 | `-0.02em` tabular-nums |
| Button | DM Sans | 600 | 15px | 1 | `0.01em` |

### 2.4 Serif restriction

DM Serif Display is used ONLY at:
- Hero H1 em-span (one italicized phrase)
- Origin section H2 (founder story, once)
- Final CTA H2 (once)

Every other current use of DM Serif Display (stage-title, ai-team h3, mc-title, scan-count, science-title) converts to DM Sans 600.

---

## 3. Spacing scale

Tight 4/8 hybrid ratio. Only these values allowed:

```
--sp-0  : 0
--sp-1  : 4px
--sp-2  : 8px
--sp-3  : 12px
--sp-4  : 16px
--sp-5  : 24px
--sp-6  : 32px
--sp-7  : 48px
--sp-8  : 72px
--sp-9  : 120px
--sp-10 : 240px   /* silence-gap between major chapters (desktop only) */
```

### 3.1 Application rules

| Usage | Value |
|---|---|
| Card inner padding (default) | `--sp-5` block × `--sp-6` inline at desktop; `--sp-4` × `--sp-4` at mobile |
| Section padding-block (desktop) | `--sp-9` (120 px) |
| Section padding-block (mobile) | `--sp-7` (48 px) |
| Silence between chapters (desktop) | `--sp-10` (240 px) — empty space, no bg switch |
| Silence between chapters (mobile) | `--sp-8` (72 px) |
| Stack-spacing inside card | `--sp-3` between items |
| Grid gap (default) | `--sp-4` (16 px) |
| Grid gap (wide — sol-grid) | `--sp-5` (24 px) |
| Inline gap (chips, meta) | `--sp-2` (8 px) |

### 3.2 Container

```
--container-max : 1240px;
--container-pad : clamp(20px, 4vw, 56px);
```

---

## 4. Component library

All components use tokens above. No inline colors, no ad-hoc sizes.

### 4.1 Button

```
.btn {
  display: inline-flex; align-items: center; gap: var(--sp-2);
  font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 15px;
  padding: 14px 24px; border-radius: 8px; border: 1px solid transparent;
  transition: background .2s cubic-bezier(.22,1,.36,1),
              transform .15s cubic-bezier(.22,1,.36,1),
              box-shadow .2s;
  min-height: 44px; letter-spacing: 0.01em; text-decoration: none;
  cursor: pointer;
}
.btn:active { transform: translateY(1px); }
.btn:focus-visible { outline: 2px solid var(--copper); outline-offset: 3px; }

/* Variants */
.btn--primary   { background: var(--copper); color: #FFF; }
.btn--primary:hover { background: var(--copper-hover); transform: translateY(-1px); box-shadow: 0 6px 16px -6px rgba(196,103,58,.4); }

.btn--ghost     { background: transparent; color: var(--ink); border-color: var(--hairline-strong); }
.btn--ghost:hover { border-color: var(--ink); }

.btn--icon      { padding: 10px; border-radius: 8px; min-height: 40px; min-width: 40px; }

.btn--pill      { border-radius: 999px; padding: 10px 18px; font-size: 13px; }

/* When placed inside a green-deep underlay */
.green-underlay .btn--ghost { color: var(--green-ink); border-color: rgba(245,240,235,.3); }
.green-underlay .btn--ghost:hover { border-color: var(--green-ink); }
```

### 4.2 Card

```
.card {
  background: var(--canvas-raised);
  border: 1px solid var(--hairline);
  border-radius: 12px;
  padding: var(--sp-6) var(--sp-6);
  transition: border-color .25s, box-shadow .25s, transform .25s;
}
.card--elevated { box-shadow: 0 1px 2px rgba(0,0,0,.03), 0 12px 32px -12px rgba(18,34,30,.08); }
.card--flat     { box-shadow: none; }
.card--interactive:hover {
  border-color: var(--hairline-strong);
  box-shadow: 0 2px 4px rgba(0,0,0,.04), 0 20px 40px -16px rgba(18,34,30,.12);
  transform: translateY(-2px);
}
```

### 4.3 Navigation

**Top nav (marketing):**
- Height 68 px, `backdrop-filter: blur(16px)`, bg `rgba(250,248,243,0.85)`, bottom-border `1px solid var(--hairline)`.
- Logo left, links center-right, single CTA right.
- Items: DM Sans 400, 14 px, `--ink-2`; hover → `--ink`. Active page: `--copper` + 2px underline offset 6px.

**Side nav (inside click-dummy):**
- Width 240 px, bg `var(--canvas-raised)`, right-border `1px solid var(--hairline)`.
- Items: 40 px tall, 12 px radius, DM Sans 500 14 px, padding 10px 14px; hover bg `var(--canvas-sunken)`; active: `--copper` left-border 2px + `--copper-tint` bg.

**Breadcrumb:**
- Mono 12 px, tracking `0.1em`, `--ink-3`. Separator: `›` at `--ink-4`. Last item `--ink`.

### 4.4 Form fields

```
.field {
  background: var(--canvas-raised);
  border: 1px solid var(--hairline);
  border-radius: 8px;
  padding: 12px 14px;
  font: 400 15px/1.4 'DM Sans', sans-serif;
  color: var(--ink);
  transition: border-color .2s, box-shadow .2s;
}
.field:focus { border-color: var(--copper); box-shadow: 0 0 0 3px rgba(196,103,58,.12); outline: none; }
.field::placeholder { color: var(--ink-4); }
.field--error { border-color: var(--danger); }

.select { background-image: chevron-down-svg; padding-right: 36px; appearance: none; }

.checkbox {
  width: 18px; height: 18px; border: 1.5px solid var(--hairline-strong); border-radius: 4px;
  background: var(--canvas-raised); transition: all .15s;
}
.checkbox:checked { background: var(--copper); border-color: var(--copper); }
```

### 4.5 Tag / Chip

Three roles:

```
.chip { display: inline-flex; align-items: center; gap: 6px; border-radius: 999px;
        font: 500 12px/1 'JetBrains Mono', monospace; padding: 6px 10px;
        letter-spacing: 0.04em; }

.chip--agent   { background: var(--canvas-sunken); color: var(--ink-2); }
.chip--agent::before { content:''; width:6px; height:6px; border-radius:50%; background: var(--success); }

.chip--status  { background: var(--success-bg); color: var(--success); }
.chip--status-warn { background: #FAEFD7; color: var(--warning); }
.chip--status-danger { background: var(--danger-bg); color: var(--danger); }

.chip--filter  { background: transparent; border: 1px solid var(--hairline-strong); color: var(--ink-2); cursor: pointer; }
.chip--filter[aria-pressed="true"] { background: var(--ink); color: var(--canvas); border-color: var(--ink); }
```

### 4.6 Dashboard-embed (THE sneak-peek frame)

This is the most important new component. Used in hero, in each Solutions chapter, and at top of each click-dummy screen.

```
.dashboard-embed {
  position: relative;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  background: var(--canvas-raised);
  border: 1px solid var(--hairline);
  box-shadow:
    0 1px 2px rgba(0,0,0,.04),
    0 24px 48px -16px rgba(18,34,30,.12),
    0 64px 96px -40px rgba(18,34,30,.18);
  aspect-ratio: 16 / 10;
}
.dashboard-embed__chrome {
  /* tiny faux window bar */
  height: 32px; border-bottom: 1px solid var(--hairline);
  display: flex; align-items: center; padding: 0 14px; gap: 6px;
  background: var(--canvas-sunken);
}
.dashboard-embed__dot { width: 10px; height: 10px; border-radius: 50%; background: var(--hairline-strong); }
.dashboard-embed__content { position: absolute; inset: 32px 0 0 0; }

/* Parallax on scroll — applied via JS, not CSS sticky, so it doesn't capture wheel */
.dashboard-embed[data-parallax] {
  transform: translate3d(0, var(--parallax-y, 0), 0) scale(var(--parallax-s, 1));
  transition: transform .6s cubic-bezier(.22,1,.36,1);
  will-change: transform;
}

@media (max-width: 800px) {
  .dashboard-embed { border-radius: 10px; box-shadow: 0 12px 32px -12px rgba(18,34,30,.12); }
}
```

### 4.7 Section-underlay

The mechanism for using dark-green sparingly as a block, not as a page bg.

```
.underlay {
  background: var(--green-deep);
  color: var(--green-ink);
  border-radius: 24px;
  padding: var(--sp-9) var(--sp-7);
  max-width: var(--container-max);
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}
.underlay::before {
  /* subtle texture — optional */
  content:''; position: absolute; inset: 0;
  background: radial-gradient(circle at 20% 10%, rgba(196,103,58,.12), transparent 50%);
  pointer-events: none;
}
.underlay h2, .underlay h3 { color: var(--green-ink); }
.underlay p { color: rgba(245,240,235,.82); }
.underlay .chip--agent { background: rgba(245,240,235,.1); color: var(--green-ink); }
.underlay .chip--agent::before { background: var(--gold); }

@media (max-width: 800px) {
  .underlay { border-radius: 16px; padding: var(--sp-7) var(--sp-5); }
}
```

**Rule:** max 2 underlays per homepage scroll. Current proposal: one on Solutions section dashboard-chapter, one on final CTA.

---

## 5. Motion system

### 5.1 Easings

```
--ease-out-quint : cubic-bezier(.22, 1, .36, 1);   /* default */
--ease-out-expo  : cubic-bezier(.16, 1, .3, 1);    /* dramatic reveals */
--ease-in-out    : cubic-bezier(.65, 0, .35, 1);   /* bidirectional */
--ease-spring    : cubic-bezier(.34, 1.56, .64, 1); /* micro-interactions only */
```

### 5.2 Durations

```
--dur-instant : 100ms    /* hover state change */
--dur-fast    : 200ms    /* button bg, border-color */
--dur-base    : 400ms    /* scroll-reveal, card lift */
--dur-slow    : 600ms    /* hero dashboard rise, chapter transitions */
--dur-linger  : 1200ms   /* count-up numbers, rating bar fill */
```

### 5.3 Scroll-reveal

```
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--dur-base) var(--ease-out-quint),
              transform var(--dur-base) var(--ease-out-quint);
  will-change: opacity, transform;
}
.reveal.is-visible { opacity: 1; transform: none; }

/* Stagger: children of .reveal-stagger fade in 60ms apart */
.reveal-stagger > * { opacity:0; transform: translateY(16px);
  transition: opacity 350ms var(--ease-out-quint),
              transform 350ms var(--ease-out-quint); }
.reveal-stagger.is-visible > *:nth-child(1) { transition-delay: 0ms }
.reveal-stagger.is-visible > *:nth-child(2) { transition-delay: 60ms }
.reveal-stagger.is-visible > *:nth-child(3) { transition-delay: 120ms }
.reveal-stagger.is-visible > *:nth-child(4) { transition-delay: 180ms }
.reveal-stagger.is-visible > *:nth-child(n+5) { transition-delay: 240ms }
```

Numbers tuned down from current: 28→20 px distance, 550→400 ms duration, stagger 80→60 ms. These match linear/amakori blended.

IntersectionObserver threshold: **0.15** (element revealed once 15% visible).

### 5.4 Hover transitions

- Cards: transform 200 ms, box-shadow 250 ms, border 150 ms — all `--ease-out-quint`.
- Buttons: background 200 ms, lift 150 ms.
- Links: color 150 ms, underline 200 ms.

### 5.5 Micro-interactions (click feedback)

```
.interactive:active { transform: scale(.98); transition-duration: 80ms; }
```

Applied to: every button, every card that opens a drawer, every chip in `--filter` mode.

### 5.6 Signature: scroll-pinned dashboard

(Implemented in the Solutions section — see `homepage-makeover-spec.md`.)

- IntersectionObserver on `.chapter` blocks
- One dashboard, sticky-positioned `top: 120px` while chapter is in view
- As user scrolls, data-step attribute on parent increments 1 → 4
- Each step triggers `clip-path` or opacity swap on a `<g>`/`<div>` inside the dashboard (200 ms fade)

### 5.7 Reduced motion

```
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0ms !important; transition-duration: 0ms !important; }
  .reveal { opacity: 1 !important; transform: none !important; }
  .dashboard-embed[data-parallax] { transform: none !important; }
}
```

---

## 6. Responsive behavior (4 breakpoints)

| BP | Range | Grid | Section pad | Type scale | Notable changes |
|---|---|---|---|---|---|
| MOBILE | `≤480 px` | 1 col everywhere | 48 px block, 20 px inline | base scale -15% | Silence-gap 48 px. Dashboard 12px radius. Dashboard width: 100%. Nav collapses to burger. CTA buttons 100% width. |
| TABLET | `481–768 px` | 2 col for grids-of-4, 1 col for grids-of-2 or 3 | 64 px block, 28 px inline | base scale -5% | Silence-gap 96 px. Sticky-chapters disabled → linear stack. Dashboard: full-viewport width, no tilt. |
| LAPTOP | `769–1280 px` | 3–4 col, sol-grid switches to `1.6fr 1fr` | 96 px block, 40 px inline | base | Silence-gap 160 px. Sticky-chapter enabled. Dashboard parallax `translate-Y` range `±24 px`. |
| DESKTOP | `≥1281 px` | full grids, container 1240 | 120 px block, 56 px inline | base, H1 caps out | Silence-gap 240 px. Dashboard parallax range `±40 px`. 2-column hero with dashboard-embed on right. |

### 6.1 Container query adjustments

Use `@container` on dashboard-embed so the chrome bar shrinks on narrow parents:

```
.dashboard-embed { container-type: inline-size; }
@container (max-width: 600px) {
  .dashboard-embed__chrome { height: 24px; padding: 0 10px; }
  .dashboard-embed__content { inset: 24px 0 0 0; }
}
```

### 6.2 Amakori-per-zoll adaptation (what the founder noticed)

The reason amakori "adapts per zoll" is two mechanisms working together:

1. **fluid `clamp()` on every type size**, not media-query stepping. Type grows continuously.
2. **Fluid container padding** `clamp(20px, 4vw, 56px)` — no hard jumps at breakpoints.
3. **Grid auto-flow** via `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` on value-grids — so a 4-col becomes 3-col becomes 2-col becomes 1-col smoothly without a discrete breakpoint triggering.

Couvert currently uses fixed `grid-template-columns: repeat(4, 1fr)` and breakpoints at 960/520. Swap to `auto-fit + minmax()` for the value-grid, mockups-grid, and ai-teams-grid.

---

## 7. Radius & shadow tokens

```
--radius-sm : 6px   /* chips, small buttons */
--radius-md : 8px   /* buttons, fields */
--radius-lg : 12px  /* cards */
--radius-xl : 16px  /* dashboard-embed */
--radius-2xl: 24px  /* underlay blocks */
--radius-pill: 999px

--shadow-sm : 0 1px 2px rgba(18,34,30,.04)
--shadow-md : 0 2px 4px rgba(18,34,30,.04), 0 12px 28px -10px rgba(18,34,30,.10)
--shadow-lg : 0 2px 4px rgba(18,34,30,.04), 0 24px 48px -16px rgba(18,34,30,.14)
--shadow-xl : 0 4px 8px rgba(18,34,30,.06), 0 48px 96px -32px rgba(18,34,30,.22)   /* dashboard-embed */
```

---

## 8. Iconography

- Stroke-only SVG, `stroke-width: 1.5`, `stroke-linecap: round`, `stroke-linejoin: round`.
- Three sizes: 16, 20, 24 px.
- Color inherits `currentColor`.
- No filled glyphs. No gradients.

---

## 9. Priority bucket

**P0**
1. Ship the color token swap (`--canvas`, `--green-deep` as underlay only). This is the single biggest visual delta.
2. Ship the weight discipline (DM Sans 400/600 only — strip 300/500/700).
3. Ship the 4-breakpoint table with `clamp()` type and `auto-fit` grids.

**P1**
4. Ship `.dashboard-embed`, `.underlay`, `.card` components as reusable classes.
5. Ship motion tokens + reduced-motion guard.
6. Retire unused CSS variables from current `:root`.

**P2**
7. Add container queries on dashboard-embed chrome.
8. Add signature scroll-pinned chapter behavior (requires JS — see homepage-makeover-spec).
9. Add optional subtle radial texture inside underlays.
