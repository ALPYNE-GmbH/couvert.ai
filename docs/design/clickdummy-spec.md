# Click-Dummy Spec — 4-screen interactive product demo

**Author:** Design research, couvert.ai
**Date:** 2026-04-21
**Scope:** A captivating 4-screen click-through that lets a prospect feel they're using Couvert as a paying customer for 60–90 seconds.
**Stack:** vanilla JS, zero framework. Shared `_cockpit.css` + `_cockpit.js`.
**Mock data source:** `/Users/maximilianveit/couvert.ai/reports/Couvert_Report_Pizzeria_X_anonymized.md`

The 4 existing product files already exist at `/Users/maximilianveit/couvert.ai/docs/mockups/product-*.html`. This spec turns them from 4 static mockup pages into 4 linked, interactive screens sharing a common cockpit chrome.

---

## 0. Entry point from homepage

**CTA:** In the Mockups-Gallery section, a centered `btn--primary` labelled **"Klick-Dummy öffnen"** — icon: external-arrow. Also reachable from hero as a secondary text-link `Jetzt durchklicken →`.

**Transition:**
- Full-screen modal overlay (not modal-dialog; a dedicated route).
- Route: `/cockpit/` — loads `/cockpit/index.html` which defaults to the Reviews screen.
- On open: page fades from white (`opacity 0 → 1 over 220 ms`) with a subtle `translateY(12px → 0)` on the chrome.
- URL immediately reflects `/cockpit/#reviews`.
- Exit: top-right `×` button (→ `window.history.back()` with fade-out), or Escape key.

---

## 1. Cockpit chrome (shared across all 4 screens)

### Layout

```
┌─────────────────────────────────────────────────────┐
│ Top-nav (56px) — logo, screen-tabs, user-chip, ×    │
├──────────┬──────────────────────────────────────────┤
│          │                                          │
│ Side-nav │  Main content (varies per screen)        │
│ (240px)  │                                          │
│          │                                          │
│          │                                          │
└──────────┴──────────────────────────────────────────┘
```

- **Top-nav**: `bg: var(--canvas-raised)`, height 56 px, 1px bottom hairline. Logo left. Center: 4 screen-tabs (Reviews · Report · Shift · Competitor) each as `.chip--filter`. Right: operator chip (`Pizzeria X · Zürich`) + close `×` icon button.
- **Side-nav**: `bg: var(--canvas)`, right-border 1px hairline, width 240. Nav groups:
  - **GUEST EXPERIENCE** (overline mono 11px `--copper`) → Reviews (active)
  - **QUALITY & OPERATIONS** → Report, Shift
  - **REVENUE & MENU** (empty stub, "Bald")
  - **MARKET & GROWTH** → Competitor
- **Main**: `bg: var(--canvas)`, padding 32 40.

### Shared JS — `_cockpit.js`

```
1. Hash-router: reads window.location.hash on load; swaps active screen.
2. Tab-clicks update hash, fade-swap main content (200 ms), updates active class.
3. ⌘K / Ctrl+K: opens command palette (P2, not required for first ship).
4. Escape: closes cockpit.
5. prefers-reduced-motion: disables crossfades, uses instant swap.
```

---

## 2. Screen 1 — Reviews (default landing)

**Hash:** `#reviews`
**URL:** `/cockpit/#reviews`
**Source layout:** `docs/mockups/product-reviews.html` (already exists; extract content into the shared chrome).

### Layout

2-column: `grid-template-columns: 380px 1fr; gap: 0; border-left: 1px solid var(--hairline)`:
- **Left pane (380 px)**: filter chips row (All / 1–2★ / 3★ / Unanswered), then scrollable review list. Each review row: 12 px vertical, stars + date header, 2-line quote, sentiment tag.
- **Right pane**: selected review details + AI reply draft panel.

### Mock data (from Pizzeria X report)

- 6 representative reviews including:
  - 1★ "Für Samstag 19:00 reserviert, 4 Erwachsene + 3 Kinder. Pünktlich, trotzdem 30 Min. bei der Eingangstür gewartet." (wartezeit tag)
  - 2★ "Ordered the carbonara pizza thing! It was no pizza dough." (teig tag)
  - 2★ Review mentioning price/upselling
  - 3★ Review with expectation gap
  - 4★ positive-but-slow review
  - 5★ glowing review

### Micro-interactions (5)

1. **Hover a review row** → right pane live-previews that review's full text with a 120 ms fade (no click needed). Small indicator "Preview" appears top-right.
2. **Click a review** → pane locks; 300 ms after click, an AI-reply draft generates token-by-token using a fake streaming effect (each token appended every 25 ms, text length ~180 chars), with chip `Reputation Manager agent · schreibt...` (chip--agent with pulsing dot) above the draft.
3. **Click "Antwort bearbeiten"** → draft becomes editable contenteditable, border flashes copper.
4. **Click "Senden"** → button morphs to "Gesendet ✓" with `--success` bg, toast appears bottom-right `An Google veröffentlicht · Rating-Impact wird in 24h gemessen` (auto-dismiss 4 s).
5. **Click filter chip** → list re-filters with 200 ms stagger (each row fades-up individually, 40 ms apart).

### Exit-to-next

Right pane footer: `Weiter zum Bericht →` text-link → navigates to `#report`.

---

## 3. Screen 2 — Report (Umsatz-Wirkung)

**Hash:** `#report`
**Source:** `docs/mockups/product-report.html`

### Layout

Stacked single column, 840 max-width within main, padding 40 block:

1. Title row: `CX & Revenue Impact` H1 + subtitle + export PDF button (`.btn--ghost`).
2. KPI row: 4 cards (Gesamtverlust CHF 390k / Antwortquote 0% / 10 Schwachstellen / Recovery CHF 280k+). Each card: number in `--gold-ink` mono 36 px, label below.
3. Rating trend: small line chart, 5 data-points (Dez 2025: 4.65 → Apr 2026: 4.40), benchmark line at 4.70 in `--success`. SVG, 100% width × 160 px.
4. Impact table: 10 rows. Each row: `Impact-Hebel | Umsatzeffekt | Team | Status`. Alternating `--canvas-raised` / `--canvas` zebra.

### Micro-interactions (5)

1. **KPI cards animate count-up on first-view**: 0 → final over 1200 ms, `--ease-out-quint`, stagger 100 ms.
2. **Hover rating line** → vertical guide line + tooltip shows exact month's rating.
3. **Click a row** in impact table → drawer slides in from right (400 ms, `--ease-out-expo`) covering 40% of viewport. Drawer shows: Hebel-detail, affected reviews (mini-list), agent breakdown, "Massnahme starten →" button.
4. **Click export-PDF** → button spins icon, after 900 ms (fake) toast `Beispiel-Report generiert · öffnet neues Tab` and opens `/reports/Couvert_Report_Pizzeria_X_anonymized.pdf`.
5. **Scroll into impact table** → top row sticky with column headers, 1px hairline shadow appears on sticky edge.

### Exit

Below impact table: `Weiter zur Schicht-Vorbereitung →` → `#shift`.

---

## 4. Screen 3 — Shift (Shift-Brief)

**Hash:** `#shift`
**Source:** `docs/mockups/product-shift.html`

### Layout

2-column `grid-template-columns: 1fr 1fr; gap: 24px`:
- **Left**: today's reservations. Each row: time | name | party-size | tags (VIP, Allergie, Kind, Geburtstag). Sorted by time, ~12 rows. Scrollable.
- **Right**: shift brief panel. Top: weather + cover forecast (200 covers expected). Middle: 3 priority bullets ("Focus heute"). Bottom: "Brief an Team senden" `btn--primary`.

### Mock data (from Pizzeria X report)

- 12 reservations for Samstag Abend, derived from "44% der negativen Bewertungen stammen von Samstag/Sonntag" context.
- VIP row: `19:30 · Familie Huber · 4 · VIP · Stammgast · Geburtstag Vater`
- Priority bullets:
  - "Teigqualität heute priorisieren — 7 Beschwerden in den letzten 14 Tagen"
  - "Wartezeit-Kommunikation ab 19:00 aktiv — Gäste bei Ankunft sofort begrüssen"
  - "Upselling-Disziplin — Dessert-Vorschlag nur bei entsprechender Gästefrage"

### Micro-interactions (4)

1. **Hover reservation row** → VIP context tooltip (220 × auto) slides up from row: shows last visit, preferences, previous review rating.
2. **Click a tag chip** → filter applied; list narrows to matching rows with 200 ms fade.
3. **Click "Brief an Team senden"** → button fills progress-bar-style copper left→right over 800 ms, then morphs to "Gesendet ✓" and toast `An 6 Schichtmitglieder verschickt · Slack, WhatsApp, E-Mail` 4 s dismiss.
4. **Click weather widget** → small panel expands showing hourly temperature + "Empfehlung: Terrasse ab 18:00 offen halten".

### Exit

`Weiter zum Wettbewerber-Puls →` → `#competitor`.

---

## 5. Screen 4 — Competitor

**Hash:** `#competitor`
**Source:** `docs/mockups/product-competitor.html`

### Layout

Single column:
1. Top switcher: 2 segmented-control buttons — `Wettbewerber A` (default) vs. `Wettbewerber B`.
2. Hero row: 3 KPI comparisons (Rating / Antwortquote / Review-Volumen last 30 days). Each shows your number vs. competitor number + delta.
3. Pulse bars: 5 horizontal bars — one per theme (Wartezeit, Teigqualität, Service, Preis, Ambiente). Bar shows your score + competitor's score as a secondary marker.
4. Event feed (right-side or below): last 7 days of competitor activity: `Wettbewerber A antwortete auf 14 Reviews · 2d`, `Neuer 1-Stern-Review Wettbewerber A · 3d`, `Wettbewerber A postete Instagram-Story · 4d`, etc.

### Mock data

Based on Pizzeria X competitive section:
- Your rating 4.40 vs Wettbewerber A 4.70 (benchmark), Wettbewerber B 4.35
- Your answer-rate 0% vs A 78% vs B 22%
- Volume (last 30d): you 42 / A 61 / B 18

### Micro-interactions (4)

1. **Toggle A ↔ B**: full chart swap with horizontal slide (200 ms), KPI numbers count-animate to new values over 600 ms.
2. **Click a pulse bar** → tooltip expands showing 2 example reviews from competitor mentioning that theme.
3. **Click an alert in feed** → feed expands inline below the alert: 2 related reviews + "Reaktion vorschlagen" link.
4. **Hover KPI delta** → small icon appears; tooltip explains the benchmark source ("Basis: 30-Tage-Rolling, Google").

### Exit — FINAL CTA

Below all content, a full-width block (inside the main pane, not outside cockpit):

```
Heading (DM Serif Display italic 32px): „Das ist ein simuliertes Szenario."
Para (16px var--ink-2): Möchten Sie denselben Scan für Ihren eigenen Betrieb?
                        45 Minuten. Kostenlos. Kein Login.
Buttons: Scan buchen (primary) + Beispielreport ansehen (ghost)
```

---

## 6. Shared interaction tokens

| Behaviour | Duration | Easing |
|---|---|---|
| Tab fade-swap | 200 ms | `--ease-out-quint` |
| Drawer slide-in | 400 ms | `--ease-out-expo` |
| Count-up | 1200 ms | `--ease-out-quint` |
| Toast in | 250 ms | `--ease-out-quint` |
| Toast auto-dismiss | 4000 ms | — |
| Token-stream (fake typing) | 25 ms/token | linear |
| Row hover preview fade | 120 ms | `--ease-out-quint` |

All driven from `_cockpit.css` custom properties + classes, set by `_cockpit.js` toggles.

---

## 7. Files to create

```
/docs/cockpit/
  index.html            (router shell — loads first screen based on hash)
  reviews.html          (or inline — see note)
  report.html
  shift.html
  competitor.html
  _cockpit.css          (shared styles: chrome + all 4 screen classes)
  _cockpit.js           (router + all micro-interactions)
  _mockdata.js          (export JS objects: reviewsData, reportKPIs, reservations, competitorData)
```

**Implementation note on HTML structure:**
Two equally valid options — pick based on SEO preference:
- **Option A (recommended):** single `index.html` with all 4 screens inlined as `<section>` blocks; JS toggles `data-active` on sections. Single document, hash just picks which section shows. Faster transitions (no network). Enables shared top-nav without re-rendering.
- **Option B:** 4 separate HTML files, each `@import _cockpit.css`. Works for sharing-by-link to a specific screen, but transitions require real page nav.

Prefer A for the click-dummy feel. The `product-*.html` files can remain as SEO-indexable standalone pages; the cockpit route just re-uses their section HTML.

---

## 8. Accessibility

- All interactive elements reachable by keyboard (tab-order follows DOM).
- `Escape` closes cockpit.
- `role="tablist"` on top screen-tabs, `role="tab"` on each, `aria-selected` on active.
- Drawer uses `role="dialog"` + focus-trap while open.
- `prefers-reduced-motion`: disable all crossfades and count-up animations, use instant swaps.
- Toasts: `role="status"` `aria-live="polite"`.

---

## 9. Priority bucket

**P0 — ship-to-show (enough for founder demo)**
1. Shared chrome (`_cockpit.css` + `_cockpit.js` hash-router + tab-swap).
2. Reviews screen with hover-preview + click-to-reply + fake token stream.
3. Report screen with count-up KPIs + click-to-drawer.
4. Homepage entry-CTA + route `/cockpit/#reviews`.

**P1**
5. Shift screen with reservation rows + "Brief senden" toast.
6. Competitor screen with A↔B toggle + pulse bars.
7. Sidenav with 4 team groups.
8. Exit-to-next link inside every screen.

**P2**
9. ⌘K command palette.
10. Deep-link query params (e.g. `?scenario=pizzeria`, `?scenario=bistro`) swapping mock data sets.
11. Analytics event-fire on each micro-interaction so the founder can measure where users drop off.
12. Printable variant (CSS `@media print`) for the Report screen.
