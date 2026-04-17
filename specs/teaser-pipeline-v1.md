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
| 1 | `scan.couvert.ai` | Google-Maps-URL eingeben | 10 s |
| 2 | Same page | Email-Gate (Pflichtfeld Business-Email) | 10 s |
| 3 | Confirmation screen | "Ihr Teaser ist in 5 Minuten in Ihrer Inbox" | — |
| 4 | Email (async) | PDF als Anhang **und** als signierter Link (Fallback bei Spamfiltern) + 1 CTA-Button "Erstgespräch buchen" | 5–10 min |
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

## 5. Agent-Struktur und Datenquellen

Couvert.ai besteht aus **12 Agents in 4 Teams** (siehe `couvert.ai/team.html`).
Der Teaser aktiviert **6 Agents**, die mit rein öffentlichen Daten arbeiten.
Die anderen 6 Agents werden auf dem Teaser **sichtbar als `🔒 locked` angezeigt** —
sie bilden den Upgrade-Trigger zu Tier 2 / Aufbauphase.

### 5.1 Active Agents (Public-Data-Only) — erscheinen mit Insight

| Team | Agent | Datenquelle | Cost/Lead |
|---|---|---|---|
| Guest Experience | Reputation Manager | Outscraper (Reviews) | $0.50 |
| Quality & Operations | Quality Watchdog | Outscraper (Review-Texte) | (same) |
| Revenue & Menu | Revenue Analyst | Computed (Modell, Kap. 18) | $0 |
| Revenue & Menu | Menu Intelligence | Firecrawl (Website) | $0.10 |
| Market & Growth | Marketing Engine | Apify (Instagram) | $0.20 |
| Market & Growth | Competitor Radar | Outscraper (3–4 Wettbewerber) | $0.30 |

### 5.2 Locked Agents — erscheinen auf Teaser als `🔒`, kein Insight

| Team | Agent | Benötigt |
|---|---|---|
| Guest Experience | Guest Recovery | CRM/Reservierungssystem |
| Guest Experience | Booking Optimizer | Reservierungssystem |
| Quality & Operations | Operations Advisor | Reservierungs- + Schichtdaten |
| Quality & Operations | Predictive Staffing | Rosterplan, Wetter-API |
| Quality & Operations | Staff Communication | Interne Kommunikationssysteme |
| Revenue & Menu | Food Waste Agent | POS + Einkaufsdaten |

**Verteilung pro Team (auf Teaser sichtbar als `[X/Y]`-Counter):**
- Guest Experience: **1/3 aktiv**
- Quality & Operations: **1/4 aktiv**
- Revenue & Menu: **2/3 aktiv**
- Market & Growth: **2/2 aktiv**

Die `[X/Y]`-Counter sind **psychologisch der stärkste Upgrade-Trigger** — sie
machen sichtbar, was der Gastronom *noch nicht hat*. Loss Aversion > Gain.

**Total Scrape-Kosten: ~$1.10 pro Lead.**

---

## 6. Agent Output Schemas

Alle LLM-Calls verwenden **structured outputs via Claude Tool Use**.
Schemas in `lib/schemas/agents.ts`. Es gibt 6 Schemas (nur für Active Agents).
Locked Agents haben kein Schema — sie werden im Renderer als statische
`🔒`-Einträge mit Tooltip-Text ausgegeben.

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

### 6.4 Menu Intelligence

```typescript
{
  menuPositionsCount: number,
  avgPricePerCategory: {
    category: string,                // "Pizza", "Pasta"
    ownPrice: number,                // CHF
    benchmarkPrice: number | null
  }[],
  pricePositioning: "höchste" | "obere" | "mittlere" | "günstige",
  headline: string,
  insight: string
}
```

### 6.5 Marketing Engine

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

### 6.6 Competitor Radar

```typescript
{
  competitorsFound: number,          // 3-4 Wettbewerber im Umkreis
  ownRatingVsBenchmark: number,      // Delta in Sternen (negativ = schlechter)
  ownPriceVsBenchmark: number,       // Delta in CHF / % zum Median
  benchmarkCompetitor: string,       // anonymisiert oder namentlich
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
**Farben** (gleich wie aktueller Vollreport `reports/Couvert_Report_60_Seconds_to_Napoli.pdf`):
- Hintergrund: `#0E3531` (deep forest green)
- Primär: `#E85D24` (Couvert orange)
- Text primär: `#FFFFFF`
- Text sekundär: `#9A9A9A`
- Akzent (Zahlen, CHF-Werte): `#F5A623` (warm yellow-orange)
- Kritisch / negativ (Rot-Werte im Report): `#E85D24` (gleiches Orange, höhere Opacity)
- Locked-Styling (Graut 🔒): `#9A9A9A` bei 50 % Opacity

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
| 8 | Divider + H2 | 40pt | "12 Agents in 4 Teams. 6 arbeiten heute. 6 warten auf Sie." |
| 9 | 4-Team-Grid | 400pt | 2 Spalten × 2 Zeilen. Jede Kachel = ein Team mit `[X/Y]`-Counter, aktiven Agent-Insights und `🔒`-Einträgen für locked Agents |
| 10 | Locked-Hinweis | 20pt | "🔒 Diese Agents werden mit Ihren Betriebsdaten aktiviert — ab Aufbauphase." |
| 11 | Divider + H3 | 30pt | "Im Vollaudit" |
| 12 | Bullet-Liste | 80pt | 4 Bullets: was im Vollreport dazukommt |
| 13 | CTA-Box | 60pt | Dual-CTA: "Vollreport CHF 4'500" + "Erstgespräch buchen" |
| 14 | Footer | 20pt | hello@couvert.ai · couvert.ai |

### Team-Kachel (Zellformat)

```
┌────────────────────────────────────┐
│ [TEAM NAME]              [X/Y]     │ ← 12pt header + counter rechts
│                                    │
│ ✓ Active Agent 1          (11pt)   │ ← Icon + Agent-Name (bold)
│   [headline]              (13pt)   │ ← Main Pain-Zahl
│   [insight]               (10pt)   │ ← Cliffhanger (max 2 Zeilen)
│                                    │
│ ✓ Active Agent 2          (11pt)   │ ← Nur wenn Team ≥2 aktive Agents hat
│   [headline + insight]             │
│                                    │
│ ─────────                          │ ← Visueller Trenner
│ 🔒 Locked Agent 1         (10pt)   │ ← Graut, Name + lock icon, kein Insight
│ 🔒 Locked Agent 2                  │
│ 🔒 Locked Agent 3                  │
└────────────────────────────────────┘
```

Padding innen: 16pt. Zwischen Kacheln: 12pt gap.

**Team-Counter-Logik:** `[X/Y]` in dezent-orange rechts oben in der Team-Kachel.
- Guest Experience: [1/3]
- Quality & Operations: [1/4]
- Revenue & Menu: [2/3]
- Market & Growth: [2/2]

**Locked-Styling:** 40% Opacity auf Text, `🔒` Icon in Orange. Keine Headlines
oder Insights — nur der Name. Das erzeugt die visuelle Spannung.

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

## 12. Legal & Privacy

Basierend auf Deep-Research (April 2026). Operative Checkliste: siehe
`specs/legal-compliance-checklist.md`.

### 12.1 Rechtsrahmen

Drei Gesetze sind einschlägig:

| Gesetz | Relevanz |
|---|---|
| **UWG Art. 3 Abs. 1 lit. o** | Spam-Artikel: Opt-In vor E-Mail-Massenwerbung Pflicht |
| **revDSG (nDSG, seit 09/2023)** | Bearbeitung von Personendaten (Review-Verfasser) |
| **UWG (allgemein)** | Irreführungsverbot bei Verwendung von Bewertungen |

### 12.2 V1 ist Opt-In — rechtlich sauber

Der V1-Flow ist **user-initiiert**: Der Inhaber gibt selbst Google-URL + Email
ein und bestätigt den Versand. Das ist **Opt-In nach Art. 3 lit. o UWG**, kein
Massenmailing. Auf der Scan-Form muss allerdings stehen:

- Klare Zweckangabe ("Sie erhalten einen kostenlosen Analyse-Teaser per E-Mail")
- Checkbox mit explizitem Hinweis, dass die angegebene Email auch für einen
  Follow-up-Kontakt verwendet werden darf (oder ausdrücklicher Verzicht darauf)
- Link zur Datenschutzerklärung

### 12.3 Anforderungen an die Scan-Seite `scan.couvert.ai`

| Element | Pflicht | Hinweis |
|---|---|---|
| Impressum (Firma, Adresse, Kontakt) | ✅ | Klar verlinkt, leicht auffindbar |
| Datenschutzerklärung | ✅ | Muss Google-Review-Analyse explizit nennen |
| Cookie-Banner (wenn Tracking) | ✅ | Google Consent Mode kompatibel für CH |
| Opt-In-Checkbox am Formular | ✅ | Nicht vorausgefüllt (Art. 6 nDSG) |
| Opt-Out-Link in jeder Mail | ✅ | Ein-Klick, ohne Login |

### 12.4 Review-Zitate: Was erlaubt ist

| Umfang | Zulässig? | Regel |
|---|---|---|
| Aggregierte Kennzahlen (Rating, Count, %) | ✅ | Quelle nennen ("Quelle: Google") |
| Kurze Zitate aus Reviews (1–3 Sätze) | ✅ | **Verfassername IMMER anonymisieren** → "Google-Gast, 1★, März 2026" |
| Vollständige Review-Texte | ❌ | Urheberrecht unklar, DSG-Risiko |
| Review-Verfasser-Profilbilder | ❌ | Personendaten, nie im Report |
| Cherry-Picking nur negativer/positiver Reviews | ❌ | Irreführungstatbestand UWG |

### 12.5 E-Mail-Formalia (Pflicht in jeder ausgehenden Mail)

- Vollständige Absenderangaben: Firma, Postadresse, Kontakt
- Klare Kennzeichnung als geschäftliche Kommunikation (Betreff + Einleitung)
- Ein-Klick-Opt-Out-Link (kostenlos, kein Login nötig)
- Kein Tracking ohne Consent (keine Pixel, die vor Consent laden)

### 12.6 Phase 2 Outbound: Zwei-Stufen-Flow Pflicht

Sobald wir **outbound** machen (Kaltakquise an Restaurants, die wir identifiziert
haben), wechseln wir zum Zwei-Stufen-Flow:

1. **Mail 1 (kurz, permission-request):** Keine Anhänge, kein Report. Fragt
   nur, *ob* der Inhaber einen kostenlosen Teaser erhalten möchte. Muss
   Impressum und Opt-Out enthalten. Kann als Einzelansprache an bekannte
   Kontakte oder als Double-Opt-In-Anfrage versendet werden.
2. **Mail 2 (nach explizitem "Ja"):** Report mit Anhang + Link. Damit nähern
   wir uns dem Opt-In-Standard an.

**Alternative Kanäle ohne Mail-Risiko:**
- Telefon
- Physische Besuche / Postversand
- LinkedIn (Einzel-Nachrichten, kein Bulk)
- Partner-Vermittlungen (z. B. Lieferanten, Gastro-Verbände)

### 12.7 Dokumentation (revDSG-Pflicht)

Couvert GmbH führt ein **Verzeichnis der Bearbeitungstätigkeiten**, in dem
eingetragen ist:

- **Bearbeitungszweck:** Betriebswirtschaftliche Analyse für Gastronomiebetriebe
- **Datenkategorien:** Öffentlich zugängliche Online-Bewertungen, Review-Texte,
  Speisekarten, Website-Content, Instagram-Profile
- **Rechtsgrundlage:** Überwiegendes Interesse des Restaurant-Kunden
  (Art. 31 Abs. 2 lit. e revDSG)
- **Aufbewahrungsfristen:** Scan-Daten max. 90 Tage, danach Aggregate/Anonymisierung
- **Betroffenenrechte:** Auskunft/Löschung via `privacy@couvert.ai` in 30 Tagen

### 12.8 Offene rechtliche Punkte vor Launch

| Punkt | Wer klärt |
|---|---|
| Vorlage Impressum + DSE für `scan.couvert.ai` | Schweizer IT-/Werberechtskanzlei |
| Muster-Text für Opt-In-Checkbox am Scan-Formular | Kanzlei |
| Finaler Text für Opt-Out-Link-Flow | MV + Kanzlei |
| Prüfung: Ist "Couvert-System-Analyse geprüft durch unser Team" als Transparenz-Claim haltbar? | Kanzlei |
| AGB-Template inkl. Accuracy Guarantee und Widerrufs-Ausschluss bei B2B-Digitalprodukten | Kanzlei |

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

**Bereits entschieden:**
- Email-Domain: `scan.couvert.ai` (eigene Subdomain für Produkt-Isolation und saubere Email-Deliverability)
- PDF-Delivery: **beides** — als Anhang (primär, fühlt sich greifbar an) **und** als signierter Link (Fallback bei Corporate-Spamfiltern, zusätzlich Tracking möglich)
- Revenue-Heuristik: siehe neues Kapitel 18

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

## 18. Copy-Guidelines — Soft FOMO, keine Angstmacherei

Der Teaser nutzt **Loss Aversion** als Trigger, aber bleibt **professionell und nüchtern**.
Keine Alarm-Sprache, keine aufgebauschten Schadenszahlen, keine Drohkulissen.

### 18.1 Prinzipien

- **Faktisch statt emotional.** "6 von 12 Agents arbeiten heute" ist stärker als "Sie verlieren Zugang zu 6 Agents"
- **Offen statt gesperrt.** "Warten auf Ihre Betriebsdaten" ist einladender als "Gesperrt ohne Upgrade"
- **Keine Schreckzahlen pro Agent.** Die Gesamt-CHF-Range im Hero reicht. Einzelne "kostet Sie CHF X/Monat"-Angaben pro locked Agent sind aggressiv und unseriös.
- **CFO-kompatibler Ton.** Lies die Copy laut vor. Wenn sie wie ein Verkaufspitch klingt, ist sie zu laut.

### 18.2 Do / Don't

| ✓ Do (soft, professionell) | ✗ Don't (zu aggressiv) |
|---|---|
| "6 arbeiten heute. 6 warten auf Sie." | "Sie verlieren 6 Agents." |
| "Warten auf Ihre Betriebsdaten" | "Gesperrt ohne Aufbauphase" |
| "Aktivierung ab Aufbauphase" | "Nicht verfügbar — jetzt freischalten!" |
| "[2/4]"-Counter als dezente Ziffern | "Nur 2 von 4!!!" |
| "Was Guest Recovery bei Ihnen tun würde" | "Was Ihnen entgeht" |

### 18.3 Der Hero-Satz

Version V1 (final):

> *"Ihr Betrieb verliert geschätzt CHF 300'000 – 500'000 pro Jahr. 6 unserer Agents haben das aus öffentlichen Daten erkannt. 6 weitere warten darauf, mit Ihnen zu arbeiten."*

Drei Teile:
1. **Schadensrange** — faktisch, mit "geschätzt" als Konfidenz-Signal
2. **Active-Framing** — "6 haben erkannt" zeigt Kompetenz
3. **Invitation** — "warten darauf, mit Ihnen zu arbeiten" statt "Sie brauchen"

### 18.4 Kein Pricing oder CTA im FOMO-Bereich

Der 🔒-Bereich bleibt **rein informativ**. Der Pricing-/CTA-Block kommt erst im
dedizierten Abschnitt am Ende. Sonst wirkt's wie ein Upsell-Popup.

---

## 19. Revenue-Estimation-Heuristik (für Revenue Analyst ohne interne Daten)

Der Revenue Analyst braucht eine belastbare Jahresumsatz-Schätzung als Input für
das Verlust-Modell (Dunkelziffer, Rating-Effekt etc.) — auch wenn der Gastronom
uns noch keine Zahlen gegeben hat.

**Grundprinzip:** Alle drei Inputs aus öffentlichen Daten ableiten, dann
triangulieren. Die Schätzung ist eine **Range mit ±30 % Konfidenz**, nicht ein
Punktwert — im Report klar so dargestellt.

### 18.1 Durchschnittlicher Bon pro Gast

Aus der gescrapten Speisekarte:

```typescript
function estimateAvgBon(menu: Menu): number {
  const mains = menu.mainCourses.map(i => i.price)
  const apps = menu.appetizers.map(i => i.price)
  const desserts = menu.desserts.map(i => i.price)
  const drinks = menu.drinks.map(i => i.price)

  const avgMain = median(mains)
  const avgApp = median(apps)
  const avgDessert = median(desserts)
  const avgDrink = median(drinks)

  // Typical guest: 1 main + 0.5 appetizer + 0.3 dessert + 1.2 drinks + 10% tip
  const bon = avgMain + avgApp * 0.5 + avgDessert * 0.3 + avgDrink * 1.2
  return bon * 1.10  // Trinkgeld
}
```

**Realitäts-Check:** Für 60 Seconds to Napoli mit CHF 25.50 avg Pizza →
geschätzter Bon ~CHF 48. Der tatsächliche Bon-Wert im echten Report:
CHF 50. Abweichung < 5 %.

### 18.2 Geschätztes Gäste-Volumen pro Jahr

Aus Review-Zeitreihe:

```typescript
function estimateAnnualGuests(reviews: Review[], restaurantOpenSince: Date): number {
  const reviewsPerYear = reviews.length / yearsSinceOpen(restaurantOpenSince)

  // Review-Rate je Cuisine-Typ (empirisch, wird über Zeit kalibriert)
  const REVIEW_RATIO = {
    "italian": 0.008,   // 0.8 % der Gäste hinterlassen Review
    "japanese": 0.012,
    "casual_fine": 0.010,
    "fine_dining": 0.018,
    "fast_casual": 0.005,
    "default": 0.010
  }

  const ratio = REVIEW_RATIO[cuisine] || REVIEW_RATIO.default
  return reviewsPerYear / ratio
}
```

**Triangulationscheck:** Wenn eine zweite Datenquelle (z. B. OpenTable Buchungen,
Google "Beliebte Zeiten", Lieferdienst-Bestellvolumen) verfügbar ist, wird der Wert
kalibriert. Bei >30 % Abweichung zwischen Quellen: Warning in QA-Pipeline.

### 18.3 Jahresumsatz-Range

```typescript
function estimateAnnualRevenue(bon: number, guests: number): [number, number] {
  const pointEstimate = bon * guests
  return [pointEstimate * 0.7, pointEstimate * 1.3]
}
```

Ergebnis wird im Report **nie als Punktwert** kommuniziert, sondern als Range:
> *"Basierend auf Speisekarte und Review-Zeitreihe schätzen wir den Jahresumsatz
> auf CHF 4.5 – 8.5 Millionen."*

### 18.4 Auslastungsmuster aus Review-Timestamps

Reviews tragen `published_at`-Timestamps. Daraus ableitbar:

- **Wochentag-Verteilung** der Reviews → Proxy für Besuchs-Verteilung
- **Saisonalität** (Monat für Monat über Jahre)
- **Stosszeiten-Indikator** — nicht präzise, aber Trend

Wird im Operations-Advisor-Output als **"44 % der Reviews stammen vom
Wochenende"**-Insight verwendet (statt "44 % des Umsatzes").

### 18.5 Sitzplatzzahl-Schätzung

Quellen in Reihenfolge der Zuverlässigkeit:

1. Restaurant-Website ("90 Plätze innen")
2. OpenTable/Quandoo API (Reservierungs-Grid-Grösse)
3. Google Maps Fotos (AI-basierte Stuhlzählung, V2)
4. Fallback: Median des Cuisine-Types im lokalen Markt

---

*Ende V1-Spec.*
