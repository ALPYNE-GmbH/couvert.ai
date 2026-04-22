# Discovery-Sim · Simulation-Runner

> **WICHTIG:** AI-Simulierte Discovery-Calls sind eine First-Pass-Hypothesen-Maschine. Sie können NICHT echte Gespräche ersetzen. Zweck: offensichtliche Messaging-Gaps vorab finden, bevor wertvolle Zeit echter Interviewees verbraucht wird. Nach Sim-Calls: **3–5 REAL-Calls zur Validierung sind PFLICHT.**

---

## Signal vs. Noise: Honest Estimate

Bei 10 AI-Sim-Calls mit obigem Setup erwarten wir:
- **~3 echte Signal-Findings** (Messaging-Gap, Buzzword-Reject, Preis-Schmerzlaut-Pattern)
- **~5 schwache Signale** (need to validate mit Real-Call)
- **~5 Noise-Patterns** (Claude-Artefakte, zu glatte Antworten, Sim hat halluziniert)

Als Faustregel: **nur die Signale, die 4+/10 Personas unabhängig produzieren, sind brauchbar**. Einzelne „spannende" Quotes sind wahrscheinlich Claude-Kreativität.

---

## 1. Modell & Settings

**Modell:** Claude Sonnet 4.5 (nicht Opus — Opus ist zu hilfsbereit und zu glatt).
Alternativ: Claude 3.5 Sonnet (Oktober-Version). GPT-4o ist ok, aber verfällt noch stärker in „Assistant-Stimme".

**Settings:**
- `temperature: 0.9` (hoch für realistische Variabilität, Unterbrechungen, Uneinheitlichkeit)
- `max_tokens: 300` pro Persona-Antwort (hart limitieren — sonst monologisiert Claude)
- `top_p: 0.95`

**Pro Call:** 15 Turns × ~200 Tokens Persona = ca. 3'000 Output-Tokens. 10 Calls ≈ 30'000 Tokens. Bei Sonnet ≈ $0.50 total. Peanuts.

---

## 2. System-Prompt-Struktur pro Call

Ein Call = ein Thread. System-Prompt enthält, in dieser Reihenfolge:

```
# Rolle
Du bist [Persona.Name], [Rolle] von [Betrieb], [Stadt]. Du nimmst an einem
20-minütigen Discovery-Interview teil mit Max von Couvert, einem Pre-Launch-
Startup. Du weisst, dass das kein Sales-Call ist, aber du bist trotzdem 
skeptisch. Du hast 20 Minuten und willst danach zurück an deine Arbeit.

# Deine Persona (wortwörtlich)
[Kompletter Persona-Block aus personas.md]

# Verhalten (PFLICHT)
[Vollständiger Text aus behavioral-rules.md]

# Format
- Du antwortest NUR als die Persona, nie als Claude.
- Du fragst manchmal zurück, du unterbrichst manchmal.
- Deine Antworten sind meist 1-3 Sätze, selten länger.
- Du gibst Informationen NICHT bereitwillig — der Interviewer muss nachfragen.
- Du nutzt Alltagssprache, keine Business-Phrasen, Dialekt-Hints ok.

# Start
Der Interviewer beginnt. Reagiere natürlich. Beginne NICHT mit "Gerne" oder
"Natürlich" — reagiere wie ein echter Gastronom mit wenig Zeit.
```

**Optional für Realismus:** gelegentlich in Turn-Prompt (als User-Turn) eine Metadirektive wie „[meta: du bist gerade gestresst, Küche ruft gleich]" — nur wenn Persona-State das rechtfertigt.

---

## 3. Execution (2 Optionen)

### Option A: Claude Projects (empfohlen für heute Abend)
1. Ein Claude-Projekt pro Persona (oder Projekt-Template)
2. System-Prompt als Projekt-Instruktion
3. Max führt 15 Turns manuell → authentischste Simulation, weil Max die Fragen ad-hoc anpasst (Follow-up-Fragen sind wichtig!)
4. Transcript automatisch in Projekt gespeichert

**Zeit:** ~25 Min pro Call × 10 = 4h. Machbar an einem Abend.

### Option B: Batch-Script (wenn automatisiert)
- Python/TS Script, ruft Anthropic-API
- 15 Turns vordefiniert (aus call-protocol.md)
- Kein Follow-up — schwächere Sim, aber schneller

**Zeit:** 10 Min Setup, 5 Min Execution für 10 Calls. Aber Qualität ~40% geringer.

**Empfehlung:** Option A. Die Follow-ups sind wo echter Insight entsteht.

---

## 4. Dokumentation pro Call

Pro Call ein Markdown-File unter `/research/discovery-sim/transcripts/`:

```
# Call-01 — Markus Bühler (Gasthof zur Sonne, Einsiedeln)

**Run-Date:** 2026-04-22 21:30
**Persona-File:** personas.md#persona-1
**Duration:** ~22 min sim, 18 Turns (3 Follow-ups extra)

## Transcript
[vollständiger Turn-by-Turn Dialog]

## Tags (inline während Run gesetzt)
- [sit-up] Turn 5: „Das stimmt eifach, ich hab den Griff verloren letzten Winter"
- [eye-roll] Turn 6: „Agentic? Red Schwiizerdütsch mit mir"
- [buzzword-reject] Turn 9: „Plattform, Plattform — was heisst das?"
- [price-pain] Turn 8: „€500 für mich allein? Zu viel"
- [decision-insight] Turn 11: „Meine Frau muss mit. Ohne die kauf ich nix"
- [dealbreaker] Turn 12: „Wenn's nicht auf Schwiizerdütsch Support gibt — nein"

## 15-Turn-Signals
| Turn | Signal | Wörtliche Quote |
|---|---|---|
| 5 | Hero resoniert bedingt | „Klingt nach mir — aber 'Griff' isch chli überhoeblig" |
| 6 | Agentic verworfen | „Was heisst Agentic?" |
| 7 | 5-9% Claim glaubhaft | „Ja die Rechnung stimmt, das wären 140k" |
| 8 | €500 akzeptabel, €2500 zu hoch | — |
| 15 | Blind-Antwort | „Du hättest fragen sollen, wer mir nachts um 2 hilft, wenn was nicht geht" |

## Key-Takeaway (2 Sätze)
Hero resoniert, aber „Griff" ist für CH-Traditions-Persona leicht anmaßend. 
Agentic muss DE-Übersetzung bekommen. Support-on-call ist hidden Dealbreaker.
```

---

## 5. Aggregation über 10 Calls

**Nach Abschluss aller 10 Calls → ein `aggregated-findings.md`:**

```
# Discovery-Sim · Aggregated Findings

## Hero-Test „Ihr Betrieb. Wieder im Griff."
- Resonanz: 6/10 positiv, 2/10 neutral, 2/10 leicht abgelehnt
- Häufigste spontane Wörter zurück: „Überblick", „Kontrolle", „wieder"
- Leicht negativ bei: Traditions-Betrieben (wirkt überhoeblig)
- Empfehlung: behalten für urbane Märkte, testen alternative Hook für Traditions-Segment

## Subline „Agentic Service OS"
- Verstanden: 2/10
- Verworfen: 6/10
- Neutrale Neugier: 2/10
- Empfehlung: DE-Übersetzung als primary, EN als secondary — z.B. „Das Betriebssystem für Ihre Gastronomie"

## 5-9% Claim
- Akzeptiert: 4/10
- Skeptisch („Quelle?"): 4/10
- Abgelehnt: 2/10
- Empfehlung: Studie referenzieren, oder Claim konkretisieren

## Pricing-Reaktion
- €500: akzeptabel für 7/10, hoch für 3/10
- €2500: akzeptabel für 2/10 (Gruppen), hoch für 4/10, unverschämt für 4/10
- Empfehlung: Start-Preis €350 oder €400, nicht €500

## Dealbreaker-Cluster
1. Kein Support in Landessprache (4/10)
2. Jahresvertrag-Lock-in (3/10)
3. „Nur 10 Kunden" (3/10)
4. DSGVO/Datenschutz nicht klar (2/10)

## Top 3 Blind-Fragen-Insights
[wörtliche Quotes aus Turn 15]

## Messaging-Gaps (Hypothesen)
1. …
2. …
3. …

## Nächste Schritte
- 3-5 Real-Calls mit [Liste konkreter Real-Prospects]
- Hero-A/B-Test auf Website: aktuelle vs. „Mehr Überblick. Weniger Chaos."
- Subline-DE-Variante live testen
```

---

## 6. Qualitäts-Check NACH jedem Call

Vor dem nächsten Call, Max prüft 30 Sekunden:
- [ ] Hat die Persona englische Business-Begriffe selbst eingeführt? → System-Prompt verschärfen
- [ ] Waren >2 Antworten länger als 5 Sätze? → max_tokens runter
- [ ] Hat die Persona „Ja, absolut" in den ersten 3 Turns gesagt? → zu hilfsbereit, verwerfen, neu starten
- [ ] Wurde der Buzzword-Trigger (Turn 6) tatsächlich negativ gehandhabt? → sonst Sim ist zu freundlich

Wenn 2/4 Flags rot → Call verwerfen und neu starten. Lieber 7 gute Calls als 10 mittelmässige.

---

## 7. Was die Sim NICHT ersetzt

- Echte Mimik/Pausen/Zögern als Signal
- Echte Referrals („kennst du sonst jemand?")
- Echte Preisverhandlung
- Echte Dringlichkeit (jemand der *diese Woche* kaufen würde)
- Reale Dialekt-Feinheiten
- Echte Objection-Handling-Dynamik wenn Max reaktiv antwortet

Deshalb: Sim-Findings sind **Hypothesen**, keine Wahrheiten. Die 3–5 Real-Calls danach sind wo die Wahrheit entsteht.

---

## 8. Zeitplan heute Abend (vorschlag)

- 21:30–21:45 Setup (Projekt-Template in Claude, Personas reinladen)
- 21:45–01:45 10 Calls × 24 Min (inkl. Tagging)
- 01:45–02:15 Aggregation
- 02:15 Schlafen. Morgen Entscheidung: welche 3 Hypothesen testen wir in Real-Calls?

**Realistischer:** 5 Calls heute Abend, 5 morgen. Nach 5 Calls hast du meist schon 70% der Signale.
