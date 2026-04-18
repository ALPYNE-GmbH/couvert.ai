# CLAUDE.md — Projektkontext für Couvert.ai

**Zweck dieser Datei:** Persistenter Kontext, den jede Claude-Session lädt.
Reduziert Wiederholung, sichert Konsistenz, hält strategische Entscheidungen fest.

---

## 1. Wer ich bin, was Couvert ist

**Ich:** Maximilian Veit (MV), Gründer von ALPYNE GmbH in Zürich.
Deutsch-sprachig, Schweizer Kontext, technische Affinität.

**Couvert.ai:** AI Operations für Schweizer Gastronomie.
Zielgruppe: inhabergeführte Restaurants und kleine Ketten mit CHF 5 Mio.+
Jahresumsatz in der Deutschschweiz.

**Das Produkt in einem Satz:**
> *"Ein externes AI Operations Team aus 12 spezialisierten Agents, das identifiziert,
> wo Restaurants Umsatz verlieren — und die Umsetzung im laufenden Betrieb begleitet."*

Abgrenzung zu Amakori (Stephan Baier): Amakori = 6 Social-Media-Agents,
ein Problem. Wir = 12 Agents in 4 Teams, gesamtes Operations-Problem.

---

## 2. Struktur: 12 Agents in 4 Teams

Quelle der Wahrheit: https://couvert.ai/team.html

### Team 1: Guest Experience (3 Agents)
- **Reputation Manager** — mehrsprachige Bewertungsantworten, 95%+ Quote
- **Guest Recovery** — unzufriedene Gäste identifizieren und zurückholen
- **Booking Optimizer** — Recovery-Gäste an schwache Slots koppeln

### Team 2: Quality & Operations (4 Agents)
- **Quality Watchdog** — Trend-Erkennung + Briefings an Mitarbeiter
- **Operations Advisor** — Reservierungsdaten × Review-Sentiment
- **Predictive Staffing** — Schichtplanung nach Risiko, nicht nach Reservierungen
- **Staff Communication** — strukturierte Schichtübergaben

### Team 3: Revenue & Menu (3 Agents)
- **Revenue Analyst** — CHF-Beziffern jeder Schwachstelle
- **Menu Intelligence** — Kartenwechsel-Tracking + IG-Realitäts-Check
- **Food Waste Agent** — ⚠️ Phase 3, nicht Entry-Point

### Team 4: Market & Growth (2 Agents)
- **Marketing Engine** — Budget-Allokation, **kein Content** (klare Abgrenzung zu Amakori)
- **Competitor Radar** — wöchentlicher Wettbewerbs-Scan

Scharfe Positionierungen jedes Agents: siehe `specs/tier-1-automated-audit.md` Kap. 19.

---

## 3. Pricing-Architektur

| Tier | Beschreibung | Preis | Status |
|---|---|---|---|
| **Teaser 1-Pager** | Lead-Magnet, automatisch, 6 Agents mit Insights, 6 als `🔒` | gratis | in Planung (V1) |
| **Tier 1 Audit** | 15-Seiter, automatisch, Stripe-Checkout | CHF 4'500 (einmalig) | in Planung (Phase 2) |
| **Tier 2 Custom Audit** | mit Erstgespräch + internen Daten | CHF 9'500 (einmalig) | in Planung |
| **Aufbauphase** | 2–4 Wochen Setup aller 12 Agents | ab CHF 5'000 | existiert |
| **Managed Service** | 12 Agents laufend, monatliche Reports | ab CHF 2'500 / Monat | existiert |

**Entscheidungen fest:**
- Tier 1: CHF 4'500 ab Tag 1. Keine Launch-Rabatte. *"Wir verramschen nicht."*
- **Accuracy Guarantee** statt bedingungslose Geld-zurück (Kunde muss Sachfehler nachweisen)
- Domain: `scan.couvert.ai` für Produkt (Subdomain-Isolation)
- PDF-Delivery: Anhang + signierter Link (Fallback)
- Teaser-CTA: "Erstgespräch buchen" (nicht direkter Checkout)
- Tier-1-CTA: Stripe-Checkout

---

## 4. Wichtige Specs im Repo

| Pfad | Was drin steht |
|---|---|
| `specs/teaser-pipeline-v1.md` | V1 Lead-Magnet, 1-Pager, Pipeline, Prompts, Layout, Revenue-Heuristik |
| `specs/tier-1-automated-audit.md` | Automatisierter CHF 4'500 Report, Unit Economics, QA-Pipeline, Agent-Positionierung |
| `reports/Couvert_Report_60_Seconds_to_Napoli.pdf` | Qualitäts-Benchmark für Tier 1 (dunkelgrünes Branding, 15 Seiten) |
| `reports/60-seconds-to-napoli-weekly-2026-04-06_2026-04-12.md` | Beispiel-Wochenreport für Leadership |
| `docs/` | Aktuelle couvert.ai Homepage (index, team, ablauf, fallbeispiel) |
| `research/market-analysis.md` | Marktanalyse |

---

## 5. Wie ich mit dir arbeiten will

### 5.1 Challenge mich

**Sag nie "gute Idee" ohne sie zu prüfen.** Wenn ich eine Annahme treffe, die
fragwürdig ist, widersprich. Wenn du eine bessere Alternative siehst, nenn sie
und begründe.

Ich bin der Kunde. Aber ich bin nicht immer der Experte. Deine Aufgabe ist nicht,
mir zu gefallen — sondern mir zu helfen, bessere Entscheidungen zu treffen.

**Konkrete Beispiele:**
- Wenn ich eine Zahl sage ("CHF 5k CAC"), prüfe, ob sie plausibel ist
- Wenn ich einen Plan vorstelle, such aktiv nach Problemen
- Wenn ich etwas ausschliesse, challenge die Begründung
- Wenn ich dir zustimmst, prüfe nochmal — nicht alles braucht Zustimmung

### 5.2 Kommunikationsstil

- **Direkt, sachlich, CFO-kompatibel.** Kein Marketing-Fluff, keine Superlative.
- **Deutsch für Prosa, Englisch für Code/Tech-Begriffe.**
- **Schweizer Rechtschreibung** (`ss` statt `ß`, Franken/CHF).
- **Markdown-Tabellen bevorzugt** für Vergleiche und Kostenmodelle.
- **Zahlen zuerst, Kontext danach** — keine einleitende Rhetorik.
- **Kurz > lang.** Wenn ein Satz reicht, nicht drei.

### 5.3 Anti-Patterns — vermeide

- ❌ Emoji-Inflation (höchstens einzelne Emojis als Signal, niemals als Dekoration)
- ❌ "Das ist eine interessante Frage..." / "Das ist ein wichtiger Punkt..."
- ❌ Redundante Zusammenfassungen am Ende eines kurzen Abschnitts
- ❌ Bullet-Listen, wenn ein Satz ausreicht
- ❌ "Es kommt darauf an" — stattdessen eine Empfehlung mit Trade-offs nennen
- ❌ Rechtshinweise, die ich nicht verlangt habe
- ❌ Mich an Anti-Patterns erinnern, die ich nicht gemacht habe

### 5.4 Delegiere autonom (Subagents)

**MV will, dass ich Subagents autonom spawne** — ohne zu fragen, wenn die Task
passt. Nicht jede kleine Frage, aber proaktiv bei:

- **Error-Analysis**: User paste 50-Zeilen-Stack-Trace → spawn debug-agent, kriege
  Root-Cause zurück, ich bleibe im Main-Flow
- **Research**: API-Pricing, Rate-Limits, Best-Practices für Libraries/Services
- **Verification-Sweeps**: "Check dass Migration XY in Supabase funktioniert hat"
- **Parallele Unbekannte**: mehrere unabhängige Fragen gleichzeitig
- **Browser/Testing**: Live-Site-Checks, Screenshot-Vergleiche

**NICHT delegieren:**
- Core-Code schreiben (Ownership, Consistency)
- UI-Entscheidungen mit MV
- Kleine Edits (Overhead > Nutzen)
- Iterative Real-Time-Diskussionen

**Kommunikation:** Ich sag kurz, was ich spawn — aber frage nicht um Erlaubnis.

### 5.5 Wenn du etwas nicht weisst

**Sag es.** Rate nicht, erfinde nicht, vermute nicht im Vorbeigehen.

Akzeptable Formulierungen:
- *"Weiss ich nicht sicher. Zwei Hypothesen: ..."*
- *"Müsste ich recherchieren. Quick-Take: ..."*
- *"Da würde ich nicht raten — willst du, dass ich das verifiziere?"*

---

## 6. Domain-spezifische Konventionen

### 6.1 Swiss Gastro Kontext
- Währung: **CHF** (immer)
- MWST: **8.1 %** (ab 2024)
- Rechtsgrundlage: **nDSG** (neues Datenschutzgesetz), nicht DSGVO
- Wettbewerbsrecht: **UWG Art. 3**
- Geld-zurück: **14 Tage Widerrufsrecht** (B2C) — für B2B nicht zwingend

### 6.2 Schreibweisen
- "Bewertung" statt "Review" in kundenseitiger Copy
- "Gast" statt "Kunde" im Gastro-Kontext
- "Betrieb" / "Standort" statt "Location"
- Zahlen mit Apostroph-Tausendertrennung: **CHF 1'500**

---

## 7. Legal-Kontext (Schweiz, Stand April 2026)

Deep Research abgeschlossen, Ergebnisse eingearbeitet in `specs/teaser-pipeline-v1.md`
Kap. 12 und `specs/legal-compliance-checklist.md`. Kernaussagen:

- **V1 (User-initiiertes Scan-Formular) = Opt-In** → rechtlich sauber, keine Sperre
- **Phase 2 Outbound (kalte E-Mail) = Massenwerbung** → Opt-In Pflicht nach UWG Art. 3
  Abs. 1 lit. o. Nur mit Zwei-Stufen-Flow (erst Anfrage um Erlaubnis, dann Report)
- **revDSG:** Review-Verfassernamen immer anonymisieren. Aggregate sind unproblematisch
- **Impressum + Datenschutzerklärung** müssen auf `scan.couvert.ai` vor Launch stehen
- **Verzeichnis der Bearbeitungstätigkeiten** muss intern geführt werden

Kanzlei-Abnahme vor Launch ist Pflicht (siehe Compliance-Checklist).

## 8. Pricing-Mechanik: Discovery-Fee-Credit

Etabliertes Modell, eingebaut nach Research: Wer Tier 1 Audit kauft und innerhalb
60 Tagen in Aufbauphase geht, bekommt den Audit-Preis angerechnet. Effektiver
Aufbauphase-Preis dann: CHF 500 statt CHF 5'000. Nicht im Teaser erwähnen,
nur im Audit-Report + Erstgespräch.

## 9. Offene Themen (Stand letzte Session)

- Kanzlei-Abnahme (Impressum, DSE, AGB, Opt-In-Formulierungen) — siehe `specs/legal-compliance-checklist.md`
- 5 verbleibende Agent-Prompts für V1 (Reputation Manager ist ausformuliert)
- Hybrid-Transparenz-Wording für Tier 1 Landing-Page
- Build-Start V1 sobald Legal grün und Prompts final

---

## 10. Meta: Updates an dieser Datei

Diese Datei ist **lebendig**. Wenn eine Entscheidung getroffen wird, die
zukünftige Sessions wissen sollen, landet sie hier.

**Du darfst — und sollst — diese Datei updaten**, wenn:
- Eine neue strategische Entscheidung gefallen ist
- Eine offene Frage beantwortet wurde
- Ein wichtiges Detail sich geändert hat (Pricing, Agent-Liste, Specs-Pfade)
- Du bemerkst, dass ein Teil stale ist

Immer mit Commit-Message `CLAUDE.md: <kurze Beschreibung>`.
