# Tier 1 — Automated Full Audit (CHF 4'500)

**Status:** Draft · **Owner:** MV · **Depends on:** `teaser-pipeline-v1.md` · **Last update:** 2026-04-17

---

## 1. Was das ist

Ein **vollständiger 15-seitiger CX & Revenue Impact Report**, der nach Zahlung instant
vom Couvert-System generiert und ausgeliefert wird. Aufbau und Content-Tiefe identisch
zum bestehenden manuellen Audit (`reports/Couvert_Report_60_Seconds_to_Napoli.pdf`)
— aber ohne manuellen Aufwand, skalierbar auf unbegrenzte Nachfrage.

**Grundlage:** Nur öffentlich verfügbare Daten (Google Reviews, Website, Speisekarte,
Instagram, Wettbewerber-Profile). Interne Betriebsdaten bleiben Tier 2 vorbehalten.

**Agent-Aktivierung:** Von den **12 Couvert-Agents in 4 Teams** sind auf Tier 1
**6 Agents aktiv** (Reputation Manager, Quality Watchdog, Revenue Analyst, Menu
Intelligence, Marketing Engine, Competitor Radar). Die 6 Internal-Data-Agents
(Guest Recovery, Booking Optimizer, Operations Advisor, Predictive Staffing,
Staff Communication, Food Waste) werden im Report sichtbar als `🔒 Tier 2`
referenziert — jedes Kapitel endet mit einer "Precision Upgrade"-Box, die den
nächsten Schritt zeigt.

---

## 2. Positionierung im Funnel

```
Teaser (1-Pager, gratis, V1)
    │
    ├───▶  TIER 1 — Automated Full Audit
    │       CHF 4'500 · Instant-Checkout · 10 Min Delivery
    │       Skaliert via Paid Ads
    │
    └───▶  TIER 2 — Custom Audit (mit Erstgespräch)
            CHF 9'500 · High-Touch · mit internen Betriebsdaten
            Für Kunden, die maximale Präzision wollen
```

**Tier 1 Ziel-Gastronom:** Moderne Inhaber, digital-affin, entscheidungsfreudig,
wollen schnell und ohne Sales-Reibung eine datenbasierte Standortbestimmung.

**Tier 2 Ziel-Gastronom:** Inhaber grösserer Ketten oder konservativerer Betriebe,
die persönliche Übergabe wollen und bereit sind, interne Daten zu teilen.

---

## 3. Die drei nicht verhandelbaren Anforderungen

### 3.1 Null Halluzinationen

**Regel:** Das LLM formuliert. Der Code rechnet.

| Art der Aussage | Quelle | Wer erzeugt? |
|---|---|---|
| Anzahl Reviews, Rating, Antwortquote | Scraping (gezählt) | Code (deterministisch) |
| Prozentzahlen Beschwerdekategorien | LLM-Klassifikation, dann Code-Zählung | Hybrid |
| CHF-Verlustberechnungen | Formel + gescrapete Inputs + ggf. Annahmen | Code (deterministisch) |
| Zitate aus Reviews | Review-Datenbank, 1:1 Kopie | Code (Auswahl), LLM-Ranking |
| Textuelle Formulierung der Befunde | Prompt + LLM | LLM |
| Empfehlungen (Massnahmenkatalog) | Template + kontextuelle LLM-Füllung | LLM + Template |

**Technisch:**
- Jede numerische Behauptung trägt intern eine `source_id` (z. B. Review-ID, Rechen-Node)
- Pre-Render-Validator prüft: Alle Zahlen im Text entsprechen Werten aus dem Daten-Graph
- CI-Check: Kein `f"{random_text_from_llm}"` darf Zahlen enthalten, die nicht aus Code stammen

### 3.2 CHF-4'500-Rechtfertigung

Der Report muss objektiv den Preis wert sein — auch für einen Gastronom, der nachher
merkt, dass das System AI-gestützt ist.

**Benchmarks, an denen sich Tier 1 messen muss:**

| Anbieter | Leistung | Preis |
|---|---|---|
| McKinsey | 1 Seite strategische Analyse | ~CHF 15–30k |
| Gastronovi Consulting | 3-Tages-Audit | CHF 8–12k |
| BBE Handelsberatung | Standort-Audit | CHF 8–15k |
| Zolar (EinzelStandort-KPI-Report) | Templatisierter Report | CHF 2–4k |
| **Couvert Tier 1** | **Voll-Audit + AI-Analyse** | **CHF 4'500** |
| Respondelligent | Review-Management-Tool only | ~CHF 300/Monat |

**Tier 1 liegt im oberen Mittelfeld.** Vertretbar, wenn Tiefe und Präzision stimmen.

### 3.3 Transparenz-Strategie: Hybrid

**Positionierung:** *"Couvert-System-Analyse, finalisiert durch unser Team."*

Praktisch:
- Pipeline generiert den Report
- Automatischer QA-Check (Kapitel 12)
- Couvert-Teammitglied prüft in 5–10 Min vor Versand
- Approval → Versand. Bei Auffälligkeiten: manuelle Korrektur oder Refund.

Bei 100 Reports/Monat = ~10 h/Monat Review-Aufwand. Bei 500/Monat ~50 h → dann
mehrstufig: automatischer QA für 90 %, manuelle Review nur bei Red Flags.

Kommunikation auf der Landing-Page:
> *"Unser Couvert-System analysiert Reviews, Speisekarte und Wettbewerber
> Ihres Betriebs. Jeder Report wird vor Versand von unserem Team geprüft."*

Nichts davon ist gelogen, nichts versteckt die Skalierbarkeit, und der
menschliche Trust-Anchor bleibt bestehen.

---

## 4. Architektur — baut auf Teaser V1 auf

```
┌──────────────────────────────────────────────────────────────┐
│ GEMEINSAMER LAYER (aus V1 Teaser Pipeline)                   │
│                                                              │
│  Scrape → Normalisierung → Agent-Pipeline (LLM) → Datagraph  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┴─────────────────┐
            ▼                                   ▼
┌──────────────────────┐             ┌──────────────────────┐
│ TEASER RENDERER      │             │ TIER 1 RENDERER      │
│ - 1 Seite            │             │ - 15 Seiten          │
│ - Min. Agent-Output  │             │ - Max. Agent-Output  │
│ - React-PDF template │             │ - React-PDF template │
│ - Instant            │             │ - Charts (Recharts)  │
└──────────────────────┘             └──────────────────────┘
            │                                   │
            ▼                                   ▼
       Free Delivery                Stripe Checkout → QA → Email
```

**80 % Pipeline-Sharing.** Der gleiche Datagraph füttert beide Renderer.

### 4.1 Zusätzliche Komponenten (über V1 hinaus)

| Komponente | Zweck | Cost |
|---|---|---|
| Stripe Checkout | Zahlung CHF 4'500 | 2.9 % + CHF 0.30 |
| Competitor Scraper | 3–4 Wettbewerber automatisch identifizieren | $0.50/Lead |
| Chart Renderer | Rating-Entwicklung, Kategorien-Bars | ~$0 (serverside) |
| QA Pipeline | Automatische Red-Flag-Erkennung | ~$0.10/Lead |
| Admin Dashboard | Review-Queue für MV/Team | Einmalig |
| Refund Handling | Stripe API | manuell |

---

## 5. Datenquellen — Tier 1 Erweiterungen

| Datenquelle | Agent(s) | Ausbau ggü. Teaser |
|---|---|---|
| Google Reviews | Reputation, Quality, Operations | **Alle** Reviews, nicht cap 500 |
| Review-Metadaten (Wochentag, Stunde) | Operations | Neu: explizite Extraktion |
| Website (Menu, Hours) | Menu Intelligence | Gleich |
| Instagram Profil | Marketing | **Mehr Posts** (30 → 100) für Trend |
| Competitor Places | Menu, Reputation | **Neu:** 3–4 Top-Wettbewerber im Umkreis |
| OpenTable/LaFourchette/Quandoo | Operations | Neu: Kapazität + Besetzungsraten-Proxy |
| Lieferdienst-Apps (UberEats, Eat.ch) | Menu | Neu: alternative Menü-Datenquelle |
| TripAdvisor | Reputation | Neu: Second-Source für Konsistenz-Check |

**Zusatzkosten pro Lead gegenüber Teaser: ~$3–5.**

---

## 6. Content-Struktur des 15-Seiters

Identisch zum bestehenden manuellen Report (`reports/Couvert_Report_60_Seconds_to_Napoli.pdf`).
Jedes Kapitel wird durch eine Kombination aus Code (deterministisch) und LLM (Formulierung)
erzeugt.

| # | Kapitel | Erzeugungslogik | Tier-1-Präzision |
|---|---|---|---|
| Cover | Restaurant-Name, Standort, Datum | Template | 100 % |
| TOC | Auto-generiert aus Kapiteln | Template | 100 % |
| Exec Summary | 3 KPI-Boxen, Top-3 Hebel, CHF-Range | Code + LLM-Formulierung | **Range statt Punktwert** |
| Kap. 1 Reputation | Rating-Chart, Antwortquote, Wettbewerbsvergleich | Code (Chart) + LLM | 100 % (Public Data) |
| Kap. 2 Qualität & Muster | Top-10 Kategorien-Chart, 6 Zitate | LLM-Klassifikation + Code-Zählung | 100 % |
| Kap. 3 Umsatz-Wirkung | Modellbasierte Berechnung | Code-Formel mit geschätzten Inputs | **Range-basiert** |
| Kap. 4 Betrieb | Muster aus Review-Metadaten, **Operations Advisor als 🔒 Tier 2 markiert** | Code (Zeitmuster) + LLM (Interpretation) | 60 % (ohne interne Schicht-/Reservierungsdaten) |
| Kap. 5 Speisekarte | Menü-Analyse, Wettbewerbs-Preise | Code + LLM | 100 % |
| Kap. 6 Marketing | Instagram-Analyse, Erwartungslücke | Code + LLM | 100 % |
| Kap. 7 Wettbewerb | Tabelle 3–4 Wettbewerber | Code + LLM | 100 % |
| Kap. 8 Massnahmenkatalog | Top-10 priorisiert nach CHF-Hebel | Template mit dynamischen Werten | 90 % |
| Kap. 9 Nächste Schritte | Phasen-Pitch, Tier-2-Upsell | Template | 100 % |
| Anhang | Methodik, Quellen | Template (statisch) | 100 % |

**Wo Tier 1 bewusst weicher ist:** Kapitel 3 (Ranges statt Punktwerte), Kapitel 4
(Observational-Only-Insights, Operations Advisor als 🔒 markiert).

**Natürlicher Tier-2-Upsell:** Jedes Kapitel, in dem ein Agent **gesperrt** ist,
bekommt am Ende eine farblich markierte "Precision Upgrade"-Box. Zusätzlich
nennt das Executive Summary explizit die 6 gesperrten Agents mit einem Satz
pro Agent ("Was Guest Recovery bei Ihnen tun würde"):

> *"Mit Ihren internen Betriebsdaten reduzieren wir diese Range von CHF 250K–450K
> auf einen einzelnen Wert mit ±5 % Konfidenzintervall. → Tier 2 buchen."*

---

## 7. Deterministische Berechnungs-Engine

Alle CHF-Werte werden in einem zentralen Modul berechnet: `lib/audit/calculations.ts`.

### 7.1 Input-Schema

```typescript
type AuditInputs = {
  reviews: {
    total: number,
    byStars: Record<1|2|3|4|5, number>,
    withText: number,
    categorized: Record<string, number>,  // z.B. "wartezeit": 34
    responseRate: number
  },
  menu: {
    positions: number,
    avgPricePerCategory: Record<string, number>,
    competitorPrices: Record<string, number[]>
  },
  estimates: {
    annualRevenueRange: [number, number],      // z.B. [4_500_000, 7_000_000]
    seatsEstimate: number | null,
    avgBonEstimate: number                     // aus Menü + Annahme "2 Items pro Person"
  },
  benchmark: {
    ownRating: number,
    benchmarkRating: number                    // höchstes Wettbewerber-Rating
  }
}
```

### 7.2 Berechnungs-Funktionen (alle deterministisch)

```typescript
// Dunkelziffer-Faktor (Kolsky 2015)
function unspokenGuests(reviewsWithNegativeText: number): number {
  return reviewsWithNegativeText * 7
}

// Abwanderungsrate (ReviewTrackers 2023)
function churnRate(responseRate: number): number {
  if (responseRate === 0) return 0.55
  if (responseRate < 0.3) return 0.45
  if (responseRate < 0.7) return 0.30
  return 0.20
}

// Rating-Effekt (Luca 2016)
function ratingEffect(ownRating: number, benchmark: number, revenue: number): [number, number] {
  const delta = benchmark - ownRating
  const effectPct = [0.05, 0.09]  // 5-9%
  return [delta * effectPct[0] * revenue, delta * effectPct[1] * revenue]
}

// Category loss (z.B. Wartezeit, Teigqualität)
function categoryLoss(
  mentions: number,
  avgBon: number,
  visitsPerYear = 4,
  responseRate: number
): [number, number] {
  const unspoken = unspokenGuests(mentions)
  const churning = unspoken * churnRate(responseRate)
  const annualLoss = churning * visitsPerYear * avgBon
  return [annualLoss * 0.7, annualLoss * 1.3]  // ±30 % Konfidenz-Band
}
```

Alle Rechen-Funktionen sind **unit-tested**. LLM kommt nie in die Nähe.

---

## 8. LLM-Prompts pro Kapitel

Jedes Kapitel hat ein eigenes Prompt-File unter `lib/prompts/audit/chapter-N.ts`.

**Gemeinsame System-Regeln (alle Kapitel):**

```
Du bist ein Teil des Couvert.ai Analyse-Systems. Deine Rolle: Formulierung von
Analyse-Text für einen professionellen Audit-Report für Schweizer Gastronomie.

HARTE REGELN:
1. Du darfst KEINE Zahlen erfinden oder verändern. Alle Zahlen kommen aus den
   Daten im User-Prompt. Wenn du Zahlen schreibst, nutze exakt die gelieferten Werte.
2. Schweizer Rechtschreibung ("ss" statt "ß", "Franken" oder "CHF").
3. Tonalität: sachlich, direkt, CFO-kompatibel. Kein Marketing-Fluff.
4. Keine Superlative ("revolutionär", "einzigartig").
5. Zitiere Quellen wörtlich aus den gelieferten `reviews[]` - niemals paraphrasieren.
6. Länge: halte dich an die `target_length` im User-Prompt.

STIL-REFERENZ:
Siehe bestehenden Report `60_Seconds_to_Napoli` — gleiche Tonalität, gleiche
Strukturebene, gleiche Dichte.
```

Pro Kapitel gibt es dann einen spezifischen Prompt mit:
- Dem Daten-Paket (JSON, vom Datagraph)
- Der Ziel-Sektion-Struktur (welche Unter-Überschriften)
- Der `target_length` (Zeichen)
- Konkreten Anweisungen (z. B. "Erwähne Trend-Richtung in Kapitel 2")

Beispiel Kapitel 2 (Qualität & Muster):

```
Schreibe die Prosa-Abschnitte für Kapitel 2 "Qualität & Muster".

DATEN:
{agentOutput_qualityWatchdog}

STRUKTUR:
- "Datengrundlage" (60 Wörter)
- "Kernbefund" (80 Wörter) — benenne die dominante Kategorie und ihren Trend
- "Muster, die nur durch Datenanalyse sichtbar werden" (200 Wörter)
  - 3 Unter-Befunde
  - jeder mit 1 numerischem Anchor-Punkt aus den Daten
- "Was unser Quality Watchdog hier tut" (5 Bullet Points)

ZITATE: Wähle aus `negativeReviews[]` genau 6 Zitate aus, die die Top-3 Kategorien
illustrieren. Kopiere den Review-Text 1:1 (anonymisiere den Verfassernamen).

Gib das Ergebnis via `chapter_2_output` Tool zurück.
```

---

## 9. PDF-Rendering

Stack: `@react-pdf/renderer` + `recharts` (serverside rendered) + eigenes Design-System.

### 9.1 Wiederverwendete Komponenten

Aus V1 Teaser Pipeline:
- Farben, Typografie, Grid
- KPI-Box
- Agent-Kachel
- Footer

### 9.2 Neue Komponenten für Tier 1

- **Chapter Page** (Header, Eyebrow, H1, Body, Agent-Callout-Box)
- **Line Chart** (Rating-Entwicklung)
- **Bar Chart** (Top-10 Beschwerdekategorien)
- **Comparison Table** (Wettbewerbsvergleich)
- **Data Table** (Operational Data)
- **Quote Block** (anonymisiertes Review)
- **Measure Row** (Massnahmenkatalog-Zeile mit Aufwand/Effekt)
- **Precision Upgrade Box** (farblich markiert, Tier-2-Upsell)
- **Phase Card** (Nächste-Schritte-Pricing-Karte)

### 9.3 Rendering-Performance

- PDF-Generierung in einer Lambda/Worker (Inngest)
- Erwartete Zeit: 5–15 s pro Report (mit Charts)
- Output-Grösse: 1–3 MB

---

## 10. Checkout-Flow

```
Teaser-PDF gelesen
    ↓
Klick "Vollreport kaufen" im PDF
    ↓
couvert.ai/report-checkout?restaurant={slug}&scan_id={id}
    ↓
Stripe Checkout (CHF 4'500, MWST 8.1%)
    ↓
Webhook: payment.succeeded
    ↓
Inngest-Job: generate_tier_1_report({scan_id})
    ↓
Pipeline läuft (Scrape-Erweiterung + Agent-Outputs + PDF)
    ↓
QA-Queue (Admin-Dashboard)
    ↓
Approval durch MV/Team (Ziel: < 30 Min nach Zahlung)
    ↓
Email-Delivery mit PDF + Invoice
    ↓
Tier-2-Upsell per Follow-up nach 3 Tagen
```

**Happy Path Ziel:** Kauf → Report in Inbox in < 30 Min.

---

## 11. Quality Assurance (QA) Pipeline

Automatische Checks vor manueller Review:

| Check | Kriterium | Fail → |
|---|---|---|
| Numeric Consistency | Alle im Text genannten Zahlen matchen Werte im Daten-Graph | Block |
| Quote Integrity | Alle Zitate existieren wörtlich in Review-DB | Block |
| Schema Compliance | Alle Agent-Outputs entsprechen Zod-Schemas | Block |
| Minimum Data Depth | Mindestens 100 Reviews, Menu scrapebar | Warnung |
| PDF Rendering | PDF ist generierbar, alle Seiten vorhanden | Block |
| Rating Plausibility | Eigenes Rating ± 0.5 vom Google-Wert | Warnung |
| CHF Plausibility | Gesamtverlust im Range [CHF 50K, CHF 2M] | Warnung |
| No Hallucination Markers | Keine generischen Phrasen ("normalerweise", "oft") ohne Daten-Anker | Warnung |

**Bei Block: Auto-Refund + Alert an MV.**
**Bei Warnung: Review-Queue mit Flag.**

---

## 12. Admin-Dashboard (Review-Queue)

Minimal-Interface für MV/Team:

```
┌──────────────────────────────────────────────────────────────┐
│  REPORT QUEUE                                                │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  [WAITING 3]  [APPROVED 127]  [REJECTED 4]                   │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Pizzeria Milano Zürich · paid 14:32 · ready 14:41      │  │
│  │ Auto-QA: ✓ all checks passed                           │  │
│  │ [Preview PDF]  [Approve & Send]  [Reject & Refund]     │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Ristorante Bellavista Bern · paid 12:15 · ready 12:23  │  │
│  │ Auto-QA: ⚠ 1 warning (Rating plausibility)             │  │
│  │ [Preview PDF]  [Approve & Send]  [Reject & Refund]     │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 13. Kostenmodell & Unit Economics

### 13.1 Cost of Goods Sold (COGS)

| Posten | Pro Report | @ 100/Monat | @ 500/Monat |
|---|---|---|---|
| Teaser-Base (aus V1) | $1.10 | $110 | $550 |
| Erweiterte Scraping (alle Reviews, Competitors, IG-Trend) | $3.50 | $350 | $1'750 |
| Claude Sonnet (längere Generierung, 9 Kapitel × 5K Tokens) | $1.50 | $150 | $750 |
| Chart-Rendering | $0 | $0 | $0 |
| PDF-Storage (R2) | $0.05 | $5 | $25 |
| Stripe-Gebühren (2.9%+0.30) | CHF 131 | CHF 13'100 | CHF 65'500 |
| **Total COGS** | **~CHF 137** | **~CHF 13'700** | **~CHF 68'500** |
| **Umsatz** (CHF 4'500 × N) | | **CHF 450'000** | **CHF 2'250'000** |
| **Gross Margin** | **97 %** | **97 %** | **97 %** |

### 13.2 Lifetime Value (LTV)

Tier 1 ist Entry-Point in den gesamten Funnel. Der echte Kundenwert kommt aus
den Folge-Phasen:

| Produkt | Revenue |
|---|---|
| Tier 1 Report | CHF 4'500 (einmalig) |
| Aufbauphase (Phase 2) | CHF 5'000 (einmalig) |
| Managed Service (Phase 3) | CHF 2'500 × 12 = CHF 30'000 / Jahr |
| **Full-Funnel-Kunde (Jahr 1)** | **CHF 39'500** |

**Blended LTV** bei Konversions-Annahmen:
- 100 % bezahlen Tier 1
- 20 % konvertieren in Aufbauphase + Managed Service

```
Blended LTV = 4'500 + 0.20 × (5'000 + 30'000) = CHF 11'500
```

### 13.3 Customer Acquisition Cost (CAC) — Kanal-Mix

Realistischer Lead-Mix für Schweizer Gastronomie-B2B:

| Kanal | Anteil am Lead-Mix | CAC pro Kunde |
|---|---|---|
| Word-of-Mouth (Kunde empfiehlt Peer) | ~25 % | CHF 0 |
| LinkedIn Organic (Founder-Content, Gastro-Netzwerk) | ~25 % | ~CHF 200 (Zeit) |
| Direct Outreach (Teaser als Opener) | ~20 % | ~CHF 500 (Zeit) |
| Paid Ads (Meta/LinkedIn) | ~30 % | CHF 4'000–5'000 |
| **Blended CAC** | — | **~CHF 1'500** |

**Warum Word-of-Mouth in Swiss Gastro stark ist:**
1. Kleine, vernetzte Community — Zürcher Gastronomen kennen sich über Lieferanten,
   Events, Verbände
2. Vertrauensökonomie — bei CHF 4'500+ wird nicht gegoogelt, sondern gefragt
3. Report ist **talkable content** — ein CHF 390K-Verlust-Befund wird im Kreis
   4 zwischen Inhabern geteilt
4. Gegensatz zu klassischer Beratung: Ein Couvert-Report darf man zeigen,
   eine McKinsey-Analyse nicht

**Design-Implikation:** Der Report muss **teilbar** sein. Klare Snapshots,
eigene Share-URL (anonymisierbar), Copy-paste-Zitate. Virality-Features gehören
von Anfang an in den Report.

### 13.4 LTV / CAC

```
LTV / CAC = 11'500 / 1'500 = 7.7
```

**Einordnung:**
- < 1 → Geld verbrennen
- 1–3 → dünnes Eis
- 3–5 → gesund (SaaS-Benchmark)
- **7.7 → Top-Quartile B2B**
- 10+ → Geldmaschine

### 13.5 Szenarien

| Szenario | Blended CAC | LTV | LTV/CAC | Payback |
|---|---|---|---|---|
| **Launch** (Founder-led, starkes Netzwerk) | CHF 800 | CHF 11'500 | 14.4 | < 1 Monat |
| **Scale** (Word-of-Mouth greift) | CHF 1'500 | CHF 11'500 | 7.7 | 1–2 Monate |
| **Reifemarkt** (WoM-Potenzial schwindet) | CHF 2'500 | CHF 11'500 | 4.6 | 2–3 Monate |
| **Stress-Test** (nur Paid, schwache Conversion) | CHF 5'000 | CHF 11'500 | 2.3 | 5 Monate |

**Wichtig:** Der stärkste Hebel ist nicht der Preis, sondern die
**Managed-Service-Conversion-Rate**. Jeder Prozentpunkt dort verschiebt LTV
massiv. Deshalb ist Tier 1 primär als **qualifizierender Sales-Schritt**
zu verstehen, nicht als Standalone-Produkt.

---

## 14. Legal Considerations

**PLACEHOLDER — abhängig von Deep-Research-Ergebnissen (siehe `teaser-pipeline-v1.md` Kap. 12).**

Zusätzliche Tier-1-spezifische Punkte:

- **Kaufvertrag & AGB:** Klarer Leistungsumfang, Widerrufsrecht, Garantie
- **Accuracy Guarantee** (ersetzt bedingungslose Geld-zurück-Garantie):
  - Erstattung **nur** bei nachweisbar falschen sachlichen Aussagen im Report
    (z. B. falsche Zahl, erfundenes Zitat, falsche Wettbewerberzuordnung)
  - Kunde muss die fehlerhafte Stelle konkret benennen
  - Wir prüfen innerhalb 7 Werktagen und korrigieren oder erstatten anteilig
  - Begründung: "unzufrieden" ist kein Erstattungsgrund — das ist eine
    strategische Analyse, keine Produkt-Probe. Bedingungslose Rückgabe wäre ein
    Einladungsschild für Bad-Faith-Käufer, die Insights extrahieren und danach
    Geld zurückverlangen
  - Kommunikation: "Jede Zahl ist nachvollziehbar. Jedes Zitat ist echt. Sollte
    uns ein sachlicher Fehler unterlaufen, erstatten wir."
- **DSGVO/nDSG:** Report enthält identifizierbare Drittpersonen (Review-Verfasser) — Anonymisierung zwingend
- **UWG-Risiko:** Wettbewerbsvergleich namentlich → Zurückhaltung bei bewertender Sprache
- **MWST:** CHF 4'500 inkl. oder exkl. 8.1 % MWST? Empfehlung: **exkl.** für B2B-Klarheit
- **Rechnungsstellung:** Automatisiert via Stripe Tax + QR-Rechnung (Swiss-konform)

---

## 15. Phase 2 vs Phase 3 Scope

### Phase 2 (Tier 1 MVP, 6–8 Wochen)

- [x] Stripe-Integration + Checkout-Flow
- [x] Erweiterte Scraper (Competitors, TripAdvisor, Lieferapp)
- [x] Chart-Rendering (Rating, Categories)
- [x] 9 Kapitel-Prompts + Content-Generation
- [x] Deterministische Calculation-Engine
- [x] QA-Pipeline (automatisch)
- [x] Admin-Dashboard (Approval-Queue)
- [x] Email-Delivery mit Rechnung
- [x] Geld-zurück-Garantie-Handling
- [x] Landing-Page mit Pricing + Trust-Elementen
- [x] 10 Friendly-Test-Restaurants mit Refund-Abdeckung

### Phase 3 (später)

- [ ] Tier 2 Upsell-Flow
- [ ] Multi-Language (FR, IT)
- [ ] B2B-Partner-Konditionen (z. B. für Immobilien-Broker, die Standorte analysieren lassen)
- [ ] Quartalsweise automatische Follow-up-Reports für Bestandskunden
- [ ] Industry-Benchmarks über alle bisherigen Reports aggregiert ("Sie sind in Top-25 %")
- [ ] White-Label-Version für Berater/Banken

---

## 16. Risiken

| # | Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|---|---|---|---|---|
| 1 | Report wird als "AI-Schrott" wahrgenommen | Mittel | Hoch | Hybrid-Transparenz + Top-Qualität + Accuracy Guarantee |
| 2 | Halluzinierte CHF-Werte führen zu Shitstorm | Niedrig | Sehr hoch | Deterministic Calc-Engine + Pre-Render-Validator |
| 3 | Legal: nDSG-Beschwerde wegen Review-Verfassernamen | Niedrig | Mittel | Strikte Anonymisierung |
| 4 | Legal: UWG wegen Wettbewerbsvergleich | Niedrig | Mittel | Sprache neutral, kein Bewerten |
| 5 | Paid-Ads-CAC höher als modelliert | Mittel | Mittel | LTV durch Upsell in Managed Service |
| 6 | QA-Review wird zum Bottleneck | Niedrig | Hoch | Automatische QA macht 90 %, nur Red Flags manuell |
| 7 | Accuracy-Claims → mehr Refunds als erwartet | Niedrig | Mittel | Deterministische Calc-Engine + Auto-QA. Kunde muss Fehler nachweisen. |
| 8 | Scraping-Provider fällt aus (Outscraper etc.) | Niedrig | Hoch | Mindestens 2 Fallback-Provider eingeplant |
| 9 | Google-API-Sperre gegen Scraper eskaliert | Niedrig | Hoch | Rate-Limit auf eigener Seite, Provider-Rotation |
| 10 | Kunde verlangt Rohdaten / detaillierte Methodik | Mittel | Niedrig | Methodik-Seite im Report + FAQ vorbereiten |

---

## 17. Offene Fragen

| # | Frage | Blocker? | Wer entscheidet |
|---|---|---|---|
| 1 | Zahlung: nur CHF oder auch EUR/USD? | 🟢 | MV (Empfehlung: Launch CH-only) |
| 2 | Report-Sprache: nur DE oder zusätzlich EN? | 🟢 | MV (Empfehlung: DE V1, EN in Phase 3) |
| 3 | Hybrid-Transparenz: exakte Wording auf Landing-Page | 🟡 | MV + Research |

**Bereits entschieden:**
- **Preis:** CHF 4'500 ab Tag 1. Keine Launch-Rabatte. *"Wir verramschen nicht."*
- **Garantie:** **Accuracy Guarantee** statt bedingungslose Geld-zurück. Erstattung
  nur bei nachweisbar falschen Aussagen im Report (siehe Kap. 14).
- **Tier-2-Pricing:** CHF 9'500 bestätigt.
- **QA-Freigabe-Zeit:** max. 2 h an Werktagen, max. 24 h über Wochenende.

---

## 18. Definition of Done (Phase 2)

- [ ] Stripe Checkout live, testweise CHF 0.01 Test-Kauf erfolgreich
- [ ] Mindestens 10 Test-Restaurants erhalten vollständige Reports, alle < 30 Min Delivery
- [ ] Kein einziger Auto-QA-Block-Fail in letzten 20 Reports
- [ ] Rendering < 30 s pro Report
- [ ] Admin-Dashboard für Queue + Approve-Action funktional
- [ ] 3 Friendly-Customer-Zahlungen real (CHF 4'500 je), Feedback strukturiert erhoben
- [ ] Legal-Section (Kap. 14) vom Anwalt abgenommen
- [ ] Landing-Page mit Checkout-CTA live
- [ ] Accuracy-Guarantee-Workflow getestet (Customer meldet Fehler → Prüfung → Korrektur oder Refund)
- [ ] Tier-2-Upsell-Link im Report funktional

---

## 19. Nächste Schritte

1. **V1 Teaser launchen** (aus `teaser-pipeline-v1.md`) — zuerst abschliessen
2. **Mit 20+ Teaser-Generierungen Datengraph validieren** — Edge Cases finden
3. **Legal-Research-Ergebnisse einarbeiten** — Kapitel 14 füllen
4. **Calculation-Engine bauen** (Kap. 7) + Unit-Tests
5. **9 Kapitel-Prompts schreiben** (Kap. 8) + 3 Test-Generierungen pro Prompt
6. **PDF-Template bauen** (Kap. 9)
7. **QA-Pipeline + Admin-Dashboard** (Kap. 11, 12)
8. **Stripe-Integration + Checkout** (Kap. 10)
9. **Friendly-Testing** mit 10 Restaurants
10. **Launch** als Paid-Ads-Funnel

---

*Ende Tier-1-Spec.*
