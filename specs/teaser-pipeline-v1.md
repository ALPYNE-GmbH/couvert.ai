# Teaser Pipeline — V1 Specification

**Status:** Draft · **Owner:** MV · **Last update:** 2026-04-17

---

## 1. Zweck

Der **Teaser** ist ein automatisch generierter 1-Pager-PDF, der Restaurantinhabern auf
Basis öffentlich verfügbarer Daten einen Pain-spezifischen Anriss ihres Betriebs liefert.

**Er ist kein Verkaufsdokument — er ist die Einladung zum Erstgespräch.**

Der eigentliche Wert (Vollaudit CHF 4'500) entsteht erst, wenn im Erstgespräch interne
Betriebsdaten (Auslastung, Platzanzahl, Schichten, Durchschnittsbon) dazukommen.

---

## 2. Funnel-Kontext

```
┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐
│  TEASER 1-PAGER  │→  │  ERSTGESPRÄCH    │→  │  VOLLAUDIT       │
│  (gratis, auto)  │   │  (30 Min, manuell│   │  CHF 4'500       │
│  V1 Scope        │   │   Datenaufnahme) │   │  Phase 1         │
└──────────────────┘   └──────────────────┘   └──────────────────┘
                                                       ↓
                                         ┌──────────────────┐
                                         │  AUFBAUPHASE     │
                                         │  ab CHF 5'000    │
                                         └──────────────────┘
                                                       ↓
                                         ┌──────────────────┐
                                         │  MANAGED TEAM    │
                                         │  ab CHF 2'500/M  │
                                         └──────────────────┘
```

V1 Scope dieser Spezifikation: **nur die TEASER-Box.**

---

## 3. User Journey

| Schritt | Touchpoint | Aktion | Zeit |
|---|---|---|---|
| 1 | `couvert.ai/scan` | Google-Maps-URL eingeben | 10 s |
| 2 | Same page | Email-Gate (Pflichtfeld Business-Email) | 10 s |
| 3 | Confirmation screen | "Ihr Teaser ist in 5 Minuten in Ihrer Inbox" | — |
| 4 | Email (async) | PDF-Anhang + 1 CTA-Button "Erstgespräch buchen" | 5–10 min |
| 5 | PDF geöffnet | 6-Agent-Teaser gelesen, CTA geklickt | 2–5 min |
| 6 | Calendly | Termin wird gebucht | 1 min |

**Total Zeit bis Termin:** ~10–15 Minuten.

---

## 4. Architektur

```
┌─────────────┐     ┌─────────────┐     ┌──────────────────┐
│ Next.js     │────►│ Inngest     │────►│ Scrape Layer     │
│ Frontend    │     │ Queue       │     │ - Outscraper     │
│ - Form      │     │ (async)     │     │ - Firecrawl      │
│ - Confirm   │     └─────────────┘     │ - Apify          │
└─────────────┘                          └──────┬───────────┘
                                                 ▼
                                          ┌──────────────────┐
                                          │ LLM Pipeline     │
                                          │ - Claude Sonnet  │
                                          │ - 6 Agent Prompts│
                                          │ - Structured Out │
                                          └──────┬───────────┘
                                                 ▼
                                          ┌──────────────────┐
                                          │ PDF Renderer     │
                                          │ - React-PDF      │
                                          │ - Template V1    │
                                          └──────┬───────────┘
                                                 ▼
                                          ┌──────────────────┐
                                          │ Delivery         │
                                          │ - Resend (email) │
                                          │ - R2 (PDF store) │
                                          │ - Posthog (event)│
                                          └──────────────────┘
```

### Tech-Stack

| Layer | Choice | Rationale |
|---|---|---|
| Frontend | Next.js 15 App Router | Reuse existing couvert.ai stack |
| Queue | Inngest | Native async jobs, retry, observability |
| Scrape Reviews | Outscraper (API) | Alle Reviews, $1.50/1000, OAuth |
| Scrape Menu | Firecrawl | Clean Markdown aus Website |
| Scrape Instagram | Apify (free tier + paid) | Reliable public profile data |
| LLM | Anthropic Claude Sonnet 4.5 | Structured outputs, Tool use |
| PDF | `@react-pdf/renderer` | Component-based, good Typography |
| Email | Resend | Reliable, API-first |
| PDF Storage | Cloudflare R2 | Cheap, S3-compatible |
| Analytics | PostHog | Funnel tracking, feature flags |
| Error tracking | Sentry | Standard |

---

## 5. Datenquellen pro Agent

| Agent | Primärquelle | Sekundärquelle | Cost/Lead |
|---|---|---|---|
| Reputation Manager | Outscraper (Reviews) | — | $0.50 (cap 500 Reviews) |
| Quality Watchdog | Outscraper (Review-Texte) | — | (same data as above) |
| Revenue Analyst | Computed (Modell) | Outscraper Metadata | $0.00 |
| Operations Advisor | Outscraper (timestamps) | — | (same data as above) |
| Menu Intelligence | Firecrawl (Website) | Places API (competitors) | $0.10 |
| Marketing Engine | Apify (Instagram-Profil) | Website (Firecrawl) | $0.20 |

**Total Scrape-Kosten: ~$0.80 pro Lead.**

---

## 6. Agent Output Schemas

Alle LLM-Calls verwenden **structured outputs via Claude Tool Use**.
Schemas in `lib/schemas/agents.ts`.

### 6.1 Reputation Manager

```typescript
{
  totalReviews: number,
  currentRating: number,      // e.g. 4.40
  ratingTrend4Months: {       // last 4 month averages
    month: string,            // "Jan 26"
    rating: number
  }[],
  responseRate: number,       // 0.0 – 1.0
  ratingDelta4Months: number, // negative = erosion
  headline: string,           // Auto-gen teaser sentence, max 120 Zeichen
  insight: string             // 1 Satz, max 150 Zeichen — zeigt Pain ohne Lösung
}
```

### 6.2 Quality Watchdog

```typescript
{
  totalNegativeReviews: number,      // 1-3 star count
  topPainCategories: {
    name: string,                    // z.B. "Teigqualität"
    percentOfNegative: number,       // 0-100
    trendDirection: "up" | "flat" | "down",
    trendStrength: "strong" | "moderate" | "weak"
  }[],  // top 3
  headline: string,
  insight: string                    // welcher Trend besonders auffällt
}
```

### 6.3 Revenue Analyst

```typescript
{
  estimatedAnnualLossRange: {
    low: number,   // CHF
    high: number   // CHF
  },
  assumptionsUsed: string[],         // "Annahme: Jahresumsatz CHF 5M", etc.
  confidenceBand: "low" | "medium" | "high",
  headline: string,
  insight: string
}
```

### 6.4 Operations Advisor

```typescript
{
  weekendNegativeShare: number,      // 0-100 %
  peakHourPattern: string,           // z.B. "Fr/Sa 19-22 Uhr"
  reservationProblems: {
    mentioned: boolean,
    percentOfNegative: number
  },
  headline: string,
  insight: string
}
```

### 6.5 Menu Intelligence

```typescript
{
  menuPositionsCount: number,
  avgPricePerCategory: {
    category: string,                // "Pizza", "Pasta"
    ownPrice: number,                // CHF
    benchmarkPrice: number | null    // if competitors scraped
  }[],
  pricePositioning: "höchste" | "obere" | "mittlere" | "günstige",
  riskyItem: {
    name: string,                    // Gericht-Name
    reason: string                   // kurze Begründung (abstract)
  } | null,
  headline: string,
  insight: string
}
```

### 6.6 Marketing Engine

```typescript
{
  instagramFollowers: number | null,
  postingFrequency: string,          // "3x/Woche"
  expectationGapPercent: number,     // % der negativen Reviews, die Erwartungslücke thematisieren
  influencerReliance: "hoch" | "mittel" | "niedrig",
  headline: string,
  insight: string
}
```

---

## 7. LLM Prompts (V1)

Jeder Agent bekommt:
- **System prompt** mit Rolle + Output-Schema-Hinweis (via Tool)
- **User prompt** mit den rohen Daten
- **max_tokens: 1000** (Struktur-Outputs sind kompakt)
- **temperature: 0.3** (Konsistenz > Kreativität)

### 7.1 Prompt-Template (generisch)

```
Du bist der [AGENT_NAME] von Couvert.ai. Deine Aufgabe: Aus den folgenden
Daten einen einzelnen pointierten Teaser-Insight für einen 1-Pager
extrahieren.

REGELN:
- Keine Lösungen nennen. Nur Diagnose.
- Keine konkreten CHF-Aufschlüsselungen (kommen im Vollaudit).
- Zahlen: nur eine Kern-Zahl pro Agent, die prägnant ist.
- Ton: direkt, sachlich, CFO-kompatibel. Kein Marketing-Fluff.
- Sprache: Deutsch (Schweizer Rechtschreibung: "ss" statt "ß").
- headline: max 120 Zeichen, beginnt mit einer Zahl oder einem Fakt.
- insight: max 150 Zeichen, Cliffhanger-Stil. Lässt offen, was genau zu tun ist.

DATEN:
[DYNAMIC DATA BLOCK PER AGENT]

Gib das Ergebnis im vorgegebenen Schema zurück.
```

### 7.2 Spezifische Agent-Prompts

Werden in `lib/prompts/agents/*.ts` versioniert abgelegt.

Siehe Kapitel 13 für V1-Prompt-Beispiele pro Agent.

---

## 8. 1-Pager PDF — Layout Spec

**Format:** A4 hochkant, 1 Seite.
**Schrift:** Inter (Titel) + Source Serif Pro (Zahlen-Hero) — passend zum Vollreport.
**Farben:**
- Hintergrund: `#0A0A0A` (deep black, gleich wie Vollreport)
- Primär: `#E85D24` (Couvert orange)
- Text primär: `#FFFFFF`
- Text sekundär: `#9A9A9A`
- Akzent (Zahlen): `#F5A623` (gelb-orange für CHF-Werte)

### Sektionen (von oben nach unten)

| # | Sektion | Höhe (rel) | Inhalt |
|---|---|---|---|
| 1 | Header | 60pt | Logo + Datum, rechtsbündig |
| 2 | Eyebrow | 14pt | "CX SCAN" in Orange, kleingeschrieben |
| 3 | Restaurant Name | 36pt | H1, Serif |
| 4 | Standort | 18pt | Orange, sub-title |
| 5 | Hero-Claim | 80pt | "Ihr Betrieb verliert geschätzt **CHF 300'000 – 500'000** pro Jahr." |
| 6 | Basis-Satz | 30pt | "Basierend auf [N] Reviews, [M] Wettbewerbern und der öffentlichen Speisekarte." |
| 7 | 3 KPI-Boxen | 80pt | Grid: Reviews / Rating-Trend / Antwortquote |
| 8 | Divider + H2 | 40pt | "Was unsere 6 Agents in Ihrem Betrieb sehen" |
| 9 | 6-Agent-Grid | 340pt | 2 Spalten × 3 Zeilen, je Kachel Agent-Name + headline + insight |
| 10 | Divider + H3 | 30pt | "Im Vollaudit" |
| 11 | Bullet-Liste | 80pt | 4 Bullets: was im Vollreport dazukommt |
| 12 | CTA-Box | 60pt | "Erstgespräch buchen →" mit Calendly-URL |
| 13 | Footer | 20pt | hello@couvert.ai · couvert.ai |

### Agent-Kachel (Zellformat)

```
┌─────────────────────────────────┐
│ [AGENT NAME]             (10pt) │
│                                 │
│ [headline]              (14pt)  │
│ max 2 Zeilen                    │
│                                 │
│ [insight]                (11pt) │
│ max 2 Zeilen                    │
└─────────────────────────────────┘
```

Padding innen: 16pt. Zwischen Kacheln: 12pt gap.

---

## 9. CTA & Calendly-Integration

**Ein einziger CTA im PDF:** *"Erstgespräch buchen"* mit Direkt-Link zu Calendly.

Calendly-URL: `https://calendly.com/couvert/erstgespraech?utm_source=teaser&utm_medium=pdf&utm_campaign=v1&restaurant={slug}`

**`{slug}`** wird aus dem Restaurant-Namen generiert — so siehst du im Calendly, welches Restaurant kommt.

---

## 10. Error Handling & Fallbacks

| Szenario | Verhalten |
|---|---|
| Google-URL invalid | Frontend-Validierung, Fehlermeldung |
| Restaurant nicht in Schweiz | Email: "Couvert.ai ist aktuell auf die Schweiz fokussiert" |
| Weniger als 50 Reviews | Teaser wird trotzdem gesendet, Fokus auf Menu/Marketing statt Quality |
| Outscraper-Fehler | Retry 3x, dann manuelle Email an MV + Fallback-Email an User |
| LLM liefert invalid Schema | Retry 2x mit Korrektur-Prompt, dann Skip des Agents (Placeholder) |
| Email-Delivery fehlgeschlagen | Resend-Webhook → Sentry Alert, MV informiert |
| Rate-Limit | max 3 Audits pro Restaurant-Domain pro Tag (gegen Spam/Scraping-Attacks) |

---

## 11. Kostenmodell

| Posten | Pro Lead | @ 100/Monat | @ 500/Monat |
|---|---|---|---|
| Outscraper (500 Reviews cap) | $0.50 | $50 | $250 |
| Firecrawl (Website) | $0.10 | $10 | $50 |
| Apify (Instagram) | $0.20 | $20 | $100 |
| Claude Sonnet (6 Calls × 3K input) | $0.30 | $30 | $150 |
| R2 Storage (PDF, 200 KB) | ~$0 | ~$0 | $5 |
| Resend (Email) | $0.01 | $1 | $5 |
| Sentry + PostHog | — | $0 (Free Tier) | ~$0 |
| **Total** | **~$1.11** | **~$111** | **~$560** |

**ROI-Annahme:** 1 % Conversion von Teaser → CHF 4'500 Audit = **CHF 4'500 bei $560 Cost = 8x ROAS**. Tragbar.

---

## 12. Legal & Privacy (TBD)

**PLACEHOLDER — wird mit Deep-Research-Ergebnissen gefüllt.**

Offene Fragen:
- Rechtsgrundlage für unsolicited Business-Reports (nDSG, UWG Art. 3 lit. o)
- Anonymisierung von Review-Texten: erforderlich oder optional?
- Opt-Out-Mechanismus erforderlich?
- AGB + Privacy-Policy-Passus für `/scan`

**TODO nach Research:** Dieses Kapitel mit konkreten Handlungsanweisungen füllen.

---

## 13. V1 Prompt-Beispiele

### 13.1 Reputation Manager

```
Du bist der Reputation Manager von Couvert.ai. Extrahiere aus den folgenden
Google-Reviews-Metadaten einen prägnanten Teaser-Insight für einen 1-Pager.

DATEN:
- Anzahl Reviews: {totalReviews}
- Aktuelles Rating: {currentRating}
- Rating-Verlauf letzte 4 Monate: {ratingTrend4Months}
- Antwortquote: {responseRate}

REGELN:
- Keine Lösung nennen. Nur Diagnose.
- headline: beginnt mit der stärksten Zahl. Max 120 Zeichen.
- insight: Cliffhanger — was folgt, wenn nichts passiert? Max 150 Zeichen.
- Schweizer Rechtschreibung.

Gib das Ergebnis via `reputation_manager_output` Tool zurück.
```

*Beispiel-Output (kuratiert für 60 Seconds to Napoli):*
```json
{
  "totalReviews": 2825,
  "currentRating": 4.40,
  "responseRate": 0.0,
  "headline": "2'825 Reviews. 0 beantwortet.",
  "insight": "Ihr Rating erodiert seit vier Monaten kontinuierlich. Ohne Gegenmassnahme geht der Trend weiter."
}
```

### 13.2 – 13.6: Quality Watchdog, Revenue Analyst, Operations Advisor, Menu Intelligence, Marketing Engine

*(Siehe `lib/prompts/agents/*.ts` in der Implementierung.)*

---

## 14. V1 vs V2

### V1 (MVP, 2 Wochen)
- [x] Scan-Form auf `couvert.ai/scan`
- [x] Outscraper-Integration (cap 500 Reviews)
- [x] Firecrawl für Menu
- [x] 6 LLM-Calls mit Claude Sonnet
- [x] PDF-Template React-PDF
- [x] Resend-Delivery
- [x] Calendly-Link im PDF
- [x] PostHog-Tracking Funnel

### V2 (später)
- [ ] Apify Instagram-Integration (dann erst Marketing-Agent voll)
- [ ] Wettbewerber-Scraping (dann Menu-Agent voll)
- [ ] Multi-Language (FR/IT für Romandie/Ticino)
- [ ] Retargeting-Flow bei Non-Conversion nach 7 Tagen
- [ ] A/B-Test verschiedener Hero-Zeilen
- [ ] White-Label für Business-Partner

---

## 15. Offene Fragen (vor Build)

| # | Frage | Blocker? | Wer entscheidet |
|---|---|---|---|
| 1 | Rechtsgrundlage unsolicited Teaser-Versand | 🟡 soft | Nach Deep Research |
| 2 | Preispunkt Calendly-Gespräch: 0 CHF oder Qualifier? | 🟢 | MV |
| 3 | Email-Domain: `couvert.ai` oder `scan.couvert.ai`? | 🟢 | MV |
| 4 | PDF-Anhang oder Link zum PDF? | 🟢 | MV (Empfehlung: Anhang, aber Link in der Email auch, falls Anhang geblockt) |
| 5 | Annahme Bon/Jahresumsatz für Revenue Analyst bei unbekanntem Betrieb? | 🟡 | MV (Empfehlung: Range basierend auf Google-Kategorie + Standort) |

---

## 16. Definition of Done (V1)

- [ ] Form auf `couvert.ai/scan` live und funktionsfähig
- [ ] Pipeline verarbeitet 3 Test-Restaurants ohne Fehler
- [ ] PDF ist visuell auf Niveau des Vollreports
- [ ] Mindestens 5 Friendly-Test-Restaurants haben Teaser erhalten + Feedback gegeben
- [ ] Conversion-Rate Teaser → Calendly-Klick > 20 %
- [ ] MV hat Prompts abgenommen und freigegeben
- [ ] Legal-Abschnitt (Kap. 12) gefüllt und freigegeben
- [ ] Monitoring/Sentry/PostHog aktiv

---

## 17. Nächste Schritte

1. **Research-Ergebnisse abwarten** (läuft parallel) → fülle Kapitel 12
2. **Prompts finalisieren** (Kap. 7 + 13) — iterativ mit 3 Test-Restaurants
3. **PDF-Template in React-PDF bauen** (Kap. 8)
4. **Pipeline-Skeleton** mit Inngest, Outscraper, Firecrawl
5. **Friendly-Testing mit 5 bekannten Restaurants** (warme Kontakte)
6. **Launch** — `couvert.ai/scan` öffentlich

---

*Ende V1-Spec.*
