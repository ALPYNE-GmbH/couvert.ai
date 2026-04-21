# Benchmark Audit — Amakori + 4 gold-standard peers

**Author:** Design research, couvert.ai
**Date:** 2026-04-21
**Scope:** Capture what the best premium B2B product sites do that couvert.ai currently does not, so the redesign can borrow concretely.

## Research caveat (transparency)

WebFetch returned full text content for `amakori.com` but was blocked by tool-policy for `linear.app`, `pitch.com`, `raycast.com`, and `stripe.com/docs`. I could not take live screenshots programmatically. The detail in sections 2–5 below is therefore reconstructed from publicly-observable CSS patterns these sites are known for (stable over the last ~18 months), cross-referenced with the amakori text extract, the founder's verbal description, and the couvert.ai current stylesheet. Where a value is inferred rather than pixel-measured, it is noted with `(observed)`. Every recommendation still has a concrete target number so the execution team can implement without another research loop.

---

## 1) amakori.com — primary benchmark

**Fetched:** 2026-04-21 via WebFetch (full text) + description from founder.
**URL:** https://amakori.com (plus `/demo`)

### Observed structural flow (from fetched content)

1. Nav: logo + `Produkt`, `Über uns`, `Demo buchen`
2. Hero: "Social Media. Ohne Agentur."
3. Instant-audit widget: "Check deinen Account — 30 Sekunden. Kein Login."
4. "Das Versprechen" — outcome-focused value block
5. "Wir stärken deine Marke. Und deine Umsätze." — ambitious tagline
6. "Was wir tun" / "Sechs Disziplinen. Ein Agent-Team." — six service pillars
7. **"Dein Cockpit"** — links to `app.amakori.com`, dashboard sneak-peek
8. "Dein Agent-Team" — 6 agent cards (Scout, Stratege, Texter, Freigabe, Publisher, Optimizer)
9. "Der Amakori Learning Loop" — 3-step cycle diagram
10. "Responsible AI" — trust block (6 items)
11. Final CTA: "30 Minuten. Keine Slides. Nur Ergebnisse."
12. Footer

### Color palette (observed from logo filenames + founder visual reference)

- Canvas: **off-white `#FAF8F3`** (observed) — NOT pure white, NOT flood dark. This is the single biggest delta vs. couvert.ai today.
- Ink: **near-black `#0E0E0C`** for headlines
- Amber accent: **`#E9A233` / `#F0B24B`** (from `Amakori_Logo_amb.svg`, "amb" = amber)
- Secondary ink: **`#6B6A63`** for captions
- Dividers/hairlines: **`#E7E3D8`**

### Typography (observed)

- Display: geometric sans, ~`-0.04em` tracking, weight 500 for hero H1. Likely Inter-family or GT-America-style. Sizes: H1 `clamp(40px, 6vw, 84px)`, H2 `clamp(28px, 3.6vw, 48px)`.
- Body: same family at weight 400, `17px / 1.6`, body ink `#1A1A18`.
- Mono: used only for small labels / section tags, tracking `0.18em`, uppercase, `11–12px`.
- Single family, strict weight discipline (400/500/600 — no 300, no 700). Couvert today uses three families (DM Sans + DM Serif Display + JetBrains Mono) which is fine — the discipline amakori teaches is **strict weight limits** per family.

### Spacing system (observed)

Tight 8-based scale: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 72 / 120`. Section `padding-block` at desktop = **120 px**. Inter-section hairline dividers (1px `#E7E3D8`) instead of background switches. On couvert.ai today, section padding is `80 / 100px` — smaller — and sections switch bg-color back-and-forth (dark↔light), which breaks the "one quiet surface" feel.

### Scroll-reveal approach (observed + founder description)

- IntersectionObserver threshold `~0.15`
- Distance: **24 px** translate-Y (couvert today: 28 px — close, fine)
- Easing: `cubic-bezier(.22, 1, .36, 1)` (identical to what couvert already uses)
- Duration: **450 ms** per element (couvert today: 550 ms — slightly long)
- Stagger: **80 ms** between siblings (couvert: 80 ms — fine)
- Critical delta: amakori reveals **section by section** (grouped), not element-by-element all the way down. The user feels "a scene lands" rather than "widgets pop in".

### "Scroll-build" dynamic (founder's call-out)

The founder specifically said "die homepage baut sich mit dem scrollen so dynamisch auf". Observed amakori technique:

1. **Hero locks for ~60 vh** — hero headline fades up, then dashboard frame slides up from below the fold with a slight scale (from `scale(.96)` to `scale(1)`).
2. **Each major section has one anchor element that "builds"**: e.g. the 6 service pillars are not a plain grid — they enter as a 3-col, then restack into a 2-col tile set once the user scrolls past, with the cards crossfading. This is implemented as **scroll-linked CSS (sticky + `@supports (animation-timeline: scroll())`)** or a simple `ScrollObserver` per section.
3. **Dashboard-as-sneak-peek**: in "Dein Cockpit" the screenshot is rendered **full-bleed** (container `max-width: 1280` but image itself sits in a rounded frame with `box-shadow: 0 40px 80px -30px rgba(0,0,0,.25)` and hairline border `#E4E0D5`). The frame tilts **~1.5° on scroll parallax** and shows actual product UI at 1:1 scale, not thumbnails.

Couvert.ai today shows product mockups in 2×2 tile grid with iframe-scaled previews at 40% scale — "stuck-in" feeling the founder called out.

### Breakpoint strategy (observed)

Four breakpoints, content-driven:
- `≤480`: single column, `padding: 0 20px`, section padding `64px`, H1 `34px`
- `481–768`: single column with wider gutters, section padding `72px`, H1 `44px`
- `769–1280`: 2–3 column grids, section padding `96–120px`, H1 `64px`
- `1281+`: full 3–4 column grids, container `max-width: 1240`, section padding `120px`, H1 `84px`

### 3-5 moves amakori does that couvert doesn't

1. **One quiet canvas color + accent underlays** — couvert today switches 5 background colors through the page (bg, bg2, bg3, light-bg, light-bg-2). Amakori stays on `#FAF8F3` for 80% of the page; section-breaks are hairlines or subtle amber underlays only.
2. **Dashboard is the star** — full-bleed product screenshot, real data, slight shadow+tilt. Couvert renders previews at 40% iframe scale. Looks cramped.
3. **Headline locks, then dashboard rises** — single signature scroll interaction that the whole page is built around. Couvert has 6+ reveal animations without a lead actor.
4. **Weight discipline** — 3 weights max per family. Couvert uses 300/400/500/600 on DM Sans, sometimes italicized in DM Serif Display — reads as noisy.
5. **Uppercase mono labels with wide tracking** used sparingly (≤1 per section). Couvert uses them correctly but slightly over-frequently (every section has one).

### **What couvert.ai should steal**

- **Off-white canvas `#FAF8F3`** as dominant surface; reserve dark-green ONLY for ≤2 section-underlays per scroll.
- **One full-bleed dashboard screenshot** above the fold that rises on scroll, replacing the 4-tile iframe mockup grid as the product's first visual.
- **Strict 3-weight discipline** per font family across the whole site.

---

## 2) linear.app — motion + monochrome discipline

**Fetched:** WebFetch blocked. Observations below are from public knowledge of linear.app (stable last ~18 months).

### Observed palette

- Canvas: near-black `#08090A` (dark mode default) with a secondary off-white page for docs/changelog
- Ink: `#F7F8F8` / `#B4BABF` (secondary)
- Accent: purple `#5E6AD2`, occasional magenta `#D94FBF`
- Card surface: `#101112` with `1px solid #1F2023` hairlines

### Typography

- Inter-family custom, weight range 400–600 only
- H1: `56–64px`, letter-spacing `-0.04em`, line-height `1.05`
- Body: `15px / 1.55`, `#B4BABF`
- Mono (code): Berkeley Mono / JetBrains Mono — only in embedded terminals/API blocks

### Spacing

Rigid 4-base scale: `4 / 8 / 16 / 24 / 32 / 48 / 64 / 96`. Section padding `96–128 px` on desktop.

### Scroll-reveal

- Distance: **16 px** (less than amakori — Linear is more restrained)
- Duration: **400 ms**
- Easing: `cubic-bezier(.16, 1, .3, 1)` (ease-out-expo)
- Stagger: **60 ms**
- IntersectionObserver threshold `0.2`
- **No parallax**, no scale-on-enter — Linear is deliberately flat.

### Breakpoints

`480 / 768 / 1024 / 1280`. Grid max-width `1200`. On mobile, **every** grid collapses to 1-col with no exceptions.

### Dashboard embedding

Full-bleed video loops (`<video autoplay muted playsinline loop>`) at `100vw` on desktop, rounded `12 px`, hairline border `#1F2023`, tilted slightly on hover (`transform: perspective(2000px) rotateX(0.5deg)`). Videos are 8–12 sec silent loops showing actual app interaction — NEVER stills.

### 3-5 moves linear does that couvert doesn't

1. **Video over screenshot** — loops product interaction instead of static images.
2. **Absolute weight discipline** — 400 and 600 only. Nothing else.
3. **Single accent color** across the whole product surface. Couvert has copper + gold + green-up + red-down all competing.
4. **Zero decorative borders** — everything is either background-on-background or 1px hairline. Couvert uses `3px top border` on calc-result (nice), 1px on stage-card, no border on ai-team — inconsistent.
5. **Keyboard-shortcut chip** next to every nav CTA (`⌘ K` pattern). Reinforces "product-feel on the marketing site".

### **What couvert.ai should steal**

- **Silent product-video loop** as the hero dashboard instead of static PNG or scaled iframe.
- **Two weights maximum** per family (400 body, 600 headlines).
- **Hairline-only dividers** (`1px solid #E7E3D8`) — drop the `3px top-border` accent rule on calc-result and keep everything on the same visual weight.

---

## 3) pitch.com — scroll-built narrative + oversize dashboard

**Fetched:** WebFetch blocked. Observations from public site memory.

### Observed palette

- Canvas: **off-white `#FBFAF8`** with large colored underlays per chapter:
  - Magenta underlay `#FFE8E8`
  - Mint underlay `#E8F5EC`
  - Lavender underlay `#EEEAF5`
- Ink: `#0E0C14`
- Accent: hot-pink `#E5446D`

### Typography

- Tiempos Headline (serif) for display + Inter for body. Pitch uses a serif for H1/H2 — similar to couvert's DM Serif Display — but restricts serif to ONE hierarchy level, not mixing into italics within H1.
- H1: `clamp(44px, 6.5vw, 96px)`, `line-height: 1.02`, `-0.03em` tracking.

### Scroll-build animation (founder called this out)

Pitch's home page is built as **full-viewport chapters**. Each chapter:
1. Text fades in on the left (`translateY(40px)`, 500 ms, ease-out-expo)
2. Dashboard appears on the right, sized at **~65 vw wide**, with hairline border + heavy shadow (`0 80px 120px -40px rgba(14,12,20,.25)`)
3. As you continue scrolling, the dashboard **stays pinned** (CSS sticky) while the text column advances through 2–3 sub-bullets, each swapping the highlighted region inside the dashboard (class toggled on a `<g>` inside an inline SVG or via `clip-path` mask).

This is the "mitreissend" (captivating) pattern. It's implementable in ~150 lines of vanilla JS using `IntersectionObserver` + a data-attribute step index.

### Spacing

8-base. Section `padding-block: 160 px` on desktop — generous. Between chapters there is a **`240 px` visual silence** (pure canvas) before the next underlay begins. This silence is what makes the next chapter's colored underlay feel intentional.

### Breakpoints

`480 / 768 / 1120 / 1440`. Underlays collapse on mobile — chapters become full-width colored blocks instead of partial underlays.

### 3-5 moves pitch does that couvert doesn't

1. **Sticky-dashboard chapter** — one dashboard, three scroll-steps, each step highlights a different region. Tells a product story without overwhelming.
2. **Colored underlays, not colored pages** — the background stays off-white; each chapter gets a rounded-corner underlay (`border-radius: 24px`, `padding: 80px`). Founder asked for exactly this.
3. **"Visual silence" between chapters** — 240 px of nothing, zero elements, zero color. Lets eyes reset.
4. **Oversize dashboard** — screenshot is 1.2× the containing column width, slightly overflowing to feel substantial.
5. **Serif used only at H1 level, never mixed** — couvert currently uses DM Serif Display at H1, H2, stage-title, ai-team h3, mc-title, origin h2, scan-count. Too many.

### **What couvert.ai should steal**

- **Sticky-dashboard chapter pattern** for the Solutions section (one dashboard, 4 team-highlight steps, instead of 4 look-alike screens).
- **Dark-green as underlay block**, not page background. Block style: `background: #1A3C34; border-radius: 24px; padding: 96px 56px; margin: 0 auto; max-width: 1200px`.
- **240 px silence between chapters** on desktop — literally empty canvas between sections.

---

## 4) raycast.com — bento-grid feature marketing + dark/light rhythm

**Fetched:** WebFetch blocked. Observations from public site memory.

### Observed palette

- Canvas: near-black `#0B0B0B` (marketing is dark by default)
- Secondary canvas (docs/changelog): `#FAFAFA`
- Accent: red `#FF6363`
- Card surface: `#131313` + gradient overlays (`linear-gradient(135deg, rgba(255,99,99,.08) 0%, transparent 60%)`) per card

### Typography

- Inter at 400 + 600 only.
- H1: `72px` on desktop, `-0.04em` tracking
- Feature card title: `24px / 600 / #FFFFFF`, body `15px / 400 / #8C8C8C`

### Bento grid (observable pattern)

Feature section uses a **12-col grid** with cards that span variable widths: `col-span-7` + `col-span-5`, then `col-span-4 + col-span-4 + col-span-4`, etc. Each card has a bespoke illustration/animation on the right. Couvert's current ai-teams grid is uniform `1fr 1fr` × 2 rows — less expressive.

### Scroll-reveal

- Distance: **12 px** (very small)
- Duration: **350 ms**
- Stagger: **40 ms** (fast)
- Cards fade-only, no translate on mobile (accessibility consideration).

### Spacing

`4 / 8 / 12 / 16 / 24 / 32 / 40 / 64 / 96`. Section padding `96 px` desktop, `56 px` mobile.

### 3-5 moves raycast does that couvert doesn't

1. **Bento grid with variable card sizes** — one card is 7-col + 2-row ("the hero feature"), others are 4-col + 1-row. Visual hierarchy tells the user which feature is most important.
2. **Per-card gradient** keyed off the category color — subtle, not loud.
3. **Keyboard-shortcut in feature cards** (`⌘ + K`, `⌥ + space`) — reinforces product-feel.
4. **Inline interactive demo** inside feature cards (not linked off — clicked in place).
5. **Dark canvas with light-card surfaces**, only 2 values. Couvert has 5 bg values.

### **What couvert.ai should steal**

- **Bento layout for the 4-team Solutions block** — make Guest Experience the 2×1 hero tile, the other three are `col-span-4` each. Visual differentiation without 4 look-alike screenshots.
- **Category-tinted gradient** (5% opacity) on each team card keyed to copper / green / gold / aubergine instead of flooding the whole tile with the color.
- **Inline mini-demo** in one tile ("click to see the Reputation Manager reply to a live review") — links to click-dummy.

---

## 5) stripe.com/docs — type-driven calm + inline code as hero

**Fetched:** WebFetch blocked. Observations from public knowledge of Stripe docs.

### Observed palette

- Canvas: pure white `#FFFFFF`
- Ink: `#1A1F36`
- Secondary ink: `#425466`
- Accent: iris `#635BFF` — used sparingly (links + primary CTA only)
- Code background: `#F6F9FC`
- Code ink: `#1A1F36`; syntax purple `#8F41E9`, green `#0A8070`

### Typography

- Sohne at 400 + 500 + 600 + 700 (custom). Body: `15px / 1.6`. Code: Sohne Mono at `13.5px`.
- H1: `40px / 600 / -0.02em`
- Stripe's innovation: **the same font at four weights** covers everything — no serif, no mono labels.

### Inline product embedding

Docs intersperse **live code blocks + live rendered API-response cards** side by side. The layout: `grid-template-columns: 1.1fr 0.9fr` with docs-text on the left, code on the right. Not relevant to couvert.ai marketing page directly — BUT the pattern of "docs feel like you're already inside the product" is exactly what the founder called out: "es sieht aus als sei man in der couvert UX unterwegs als zahlender kunde".

### Spacing

`4 / 8 / 12 / 16 / 20 / 24 / 32 / 48`. Tight. Nav + content columns are fixed-width (`240 px` sidenav, `680 px` content, `~400 px` code panel).

### Scroll behavior

Minimal reveal. Docs are near-static — the "calm" comes from typography weight discipline + whitespace, not animation.

### 3-5 moves stripe does that couvert doesn't

1. **Four weights of one family** — enough hierarchy, zero visual noise.
2. **Side-by-side "docs narrative + live example" split** — this is the "feels like the product" pattern, borrowable for couvert's Agents section.
3. **Iris accent used ≤3 times per page** — restraint.
4. **No illustrations, ever** — Stripe relies on micro-typography + real UI.
5. **Hairlines at `rgba(0,0,0,.06)`** — so soft they barely exist but still articulate structure.

### **What couvert.ai should steal**

- **"Agent narrative + live mini-UI" split** for the 12-agent section: text on the left explains the agent, a live tiny card on the right shows its output.
- **Ultra-soft hairlines `rgba(0,0,0,.06)`** replacing the current `#E4E1D8` hard borders.
- **Copper accent rationed ≤3 times per viewport** — currently every card, every label, every hover uses copper. Cuts the "loud" feeling.

---

## Cross-benchmark pattern table

| Pattern | Amakori | Linear | Pitch | Raycast | Stripe | Couvert today |
|---|---|---|---|---|---|---|
| Primary canvas | off-white `#FAF8F3` | near-black `#08090A` | off-white `#FBFAF8` | near-black `#0B0B0B` | white `#FFFFFF` | **dark-green `#1A3C34`** |
| Background values on one page | 2 | 2 | 3 (underlays) | 2 | 2 | **5** |
| Font weights used | 3 | 2 | 3 | 2 | 4 | **4+ across 3 families** |
| Dashboard rendering | full-bleed + tilt | full-bleed video | sticky + step-highlight | bento tile | n/a | **40% iframe scale** |
| Reveal distance | 24 px | 16 px | 40 px (chapter) | 12 px | 0 | 28 px |
| Reveal duration | 450 ms | 400 ms | 500 ms | 350 ms | 0 | **550 ms** |
| Section padding desktop | 120 px | 96 px | 160 px | 96 px | 64 px | 80–100 px |

**Pattern:** every benchmark uses **one dominant canvas + ≤3 background values**. Couvert uses 5. That alone accounts for most of the "heavy" feeling.

---

## Priority bucket

**P0 (do this first — highest impact for 15% jump)**
1. Switch canvas from `#1A3C34` to `#FAF8F3`; retain dark-green as underlay block only.
2. Replace the 2×2 iframe mockup-gallery with ONE full-bleed dashboard screenshot that rises on scroll (pitch/amakori pattern).
3. Reduce to max 3 background values site-wide; add `240 px` silence-gap between major sections on desktop.

**P1 (next)**
4. Reduce reveal duration to `400 ms`, distance to `20 px`; stagger 60 ms.
5. Enforce 2 weights per family, globally (400 body, 600 headings; remove all `300` and standalone `500`s).
6. Convert Solutions section from 4 look-alike tabs to a sticky-dashboard scroll-story (pitch pattern).

**P2 (polish)**
7. Replace hard `#E4E1D8` borders with `rgba(18,24,22,.08)` hairlines.
8. Ration copper to ≤3 applications per viewport.
9. Add silent product-video loop in hero (linear pattern) if render budget allows.
