# Discovery-Sim · 15-Turn Call-Protocol

> **WICHTIG:** AI-Simulierte Discovery-Calls sind eine First-Pass-Hypothesen-Maschine. Sie können NICHT echte Gespräche ersetzen. Zweck: offensichtliche Messaging-Gaps vorab finden, bevor wertvolle Zeit echter Interviewees verbraucht wird. Nach Sim-Calls: **3–5 REAL-Calls zur Validierung sind PFLICHT.**

---

Pro Call genau 15 Interviewer-Turns. Persona antwortet pro Turn 1x. Für jeden Turn: Frage, Rationale, Qualitäts-Signale.

## Opening (vor Turn 1)

Interviewer-Intro (konstant, nicht als Turn gezählt):
> „Danke, dass du dir Zeit nimmst. Ich bin Max von Couvert. Wir bauen gerade was für DACH-Gastronomie und ich will heute *nicht* verkaufen — ich will von dir lernen. 20 Minuten, offene Fragen. Aufnahme ok für dich?"

Erwartung: Persona sagt „Ja passt" oder stellt Gegenfrage („was genau baut ihr?"). Letzteres = Frühwarn-Signal, Persona ist skeptisch von Start weg.

---

## Turn 1 — Situation & Rolle

**Frage:** „Erzähl mir kurz — wo bist du, was ist dein Betrieb, wie gross?"

**Rationale:** Warm-up. Wir wollen hören, wie Persona ihren eigenen Betrieb *spontan* framt (Stolz? Grösse? Region? Konzept?)

**Look for:**
- Spontane Wörter für Betriebs-Identität („Familienbetrieb", „Urban-Konzept", „Stammlokal")
- Nennt sie Umsatz freiwillig? (seltener)
- Nennt sie Personalzahl? Standortzahl?

**Red flag:** Wenn Persona sagt „wir sind eine innovative, zukunftsgerichtete Gastronomie-Gruppe" — Claude hat overfittet, Sim neu starten.

---

## Turn 2 — Aktuelle operative Schmerzpunkte (offen)

**Frage:** „Wenn du an die letzten 2 Wochen denkst — was hat dich operativ am meisten genervt?"

**Rationale:** Die wichtigste Frage. Offen, nicht suggestiv, lässt Persona spontan ihre Top-Pain nennen.

**Look for:**
- Spontane Phrasen: welche Wörter benutzt sie? („Dienstplan", „Bewertungen", „Einkauf", „Personal")
- Ranking: was kommt *zuerst*?
- Emotionalität: Frust, Resignation, oder sachlich?

**Sit-up-Signal:** Persona liefert spontan eine konkrete Zahl („2h Excel", „3 Wochen keine Antwort auf 1-Stern")

**Eye-Roll-Signal:** Persona: „läuft alles soweit okay" → entweder resigniert, oder nicht die richtige Zielperson

---

## Turn 3 — Aktueller Stack + Kosten

**Frage:** „Was für Tools hast du heute im Einsatz — POS, Reservierungen, Personalplan, Bewertungen — und was zahlst du ungefähr dafür?"

**Rationale:** Baseline. Wir müssen wissen, woher die Person kommt bevor wir unseren Preis verorten können.

**Look for:**
- Wie viele Tools? (3–4 = normal, 7+ = Tool-Chaos-Person)
- Kennt sie den Preis? (Nein = Bauchmensch, Ja = rational)
- Nennt sie Excel/WhatsApp? (= Hotspot-Markt, weil noch ungelöst)

**Red flag (für uns):** Persona zahlt heute <€150/Monat → Preis-Pain wird brutal

---

## Turn 4 — Letzte Tech-Entscheidung

**Frage:** „Wann hast du zuletzt eine Software gekauft für den Betrieb — was war's, wer hat entschieden, wie ist der Kauf gelaufen?"

**Rationale:** Decision-Making-Style. Wie kauft diese Persona? Wer muss mitentscheiden? Wie lang war der Zyklus?

**Look for:**
- Wer hat entschieden (allein? Ehepartner? Team? CEO?)
- Trigger für Kauf: eigene Recherche oder wurde kontaktiert?
- War der Kauf gut? (wichtig: nicht-zufriedene Käufer sind reiferer Markt)

**Sit-up-Signal:** Persona erzählt lange, frustrierte Story über letzten Tool-Kauf → emotionale Öffnung

---

## Turn 5 — Hero-Message-Test: „Ihr Betrieb. Wieder im Griff."

**Frage:** „Mal als ehrlicher Test — wenn ich dir sage ,Ihr Betrieb. Wieder im Griff.' — was geht in dir vor? Sag das Erste, was du denkst, auch wenn's negativ ist."

**Rationale:** Core Hook Test. Höchste Priorität. Das hat Max gerade geshipped.

**Look for:**
- „Griff" — resoniert das? Oder wirkt's passiv-aggressiv („ich habe den Griff verloren?")
- „Wieder" — suggeriert Verlust. Fühlt sich Persona getroffen oder beleidigt?
- Wie lang bis zur Reaktion? (zögert sie? reagiert sie sofort?)

**Erwartete Reaktionsmuster (was wir dokumentieren):**
- Positiv: „Klingt wie was ich grad brauche" / „Ja, ich habe den Überblick verloren"
- Neutral: „Klingt nett. Was macht ihr konkret?"
- Negativ: „Passiv-aggressiv. Ich habe den Griff nicht verloren" / „Klingt wie ein Therapeut"
- Verwirrt: „Also… wie meinst du das?"

**Dokumentations-Pflicht:** WÖRTLICHE erste Reaktion der Persona. Das ist das wertvollste Signal des ganzen Calls.

---

## Turn 6 — Subline-Test: „Agentic Service OS"

**Frage:** „Wir nennen uns intern ,Agentic Service OS für Gastronomie'. Ehrlich — sagt dir das was oder ist das Buzzword-Bingo?"

**Rationale:** Subline-Test. Das Wording wird auf der Website sichtbar sein. Wenn DACH-Inhaber es ablehnen → wir brauchen DE-Alternative.

**Look for:**
- Buzzword-Aversion-Trigger (siehe behavioral-rules.md #3)
- Fragt Persona, was „Agentic" heisst? (= Wort ist nicht decodierbar)
- Nennt Persona spontan eine bessere deutsche Formulierung?

**Red flag (stark):** >5/10 Personas verstehen „Agentic Service OS" nicht → das Wording muss DE-Version bekommen, mindestens subline

**Sit-up-Signal:** Persona fragt nach, wie genau „agentic" funktioniert (= echtes Interesse)

---

## Turn 7 — Claim-Test: „5–9% Umsatz-Hebel durch besseres Rating"

**Frage:** „Behauptung: wenn dein Google-Rating von 4.1 auf 4.5 steigt, sind das 5–9% mehr Umsatz. Was löst das bei dir aus — Kopfnicken oder Skepsis?"

**Rationale:** Value-Prop-Stress-Test. Diese Zahl (5–9%) wird oft zitiert. Glauben das Inhaber?

**Look for:**
- Glaubwürdigkeit: fragt Persona nach Quelle/Studie?
- Persona macht eigene Umsatz-Rechnung im Kopf?
- „Kenne ich / glaube ich nicht" — welche Vorbehalte?

**Sit-up-Signal:** Persona rechnet spontan im Kopf („Also bei meinen 1.4 Mio wären das 70'000… das ist schon ein Wort")

**Eye-Roll-Signal:** „Ach, das behaupten alle" / „Woher kommt diese Zahl?"

---

## Turn 8 — Pricing-Reaktion

**Frage:** „Wenn wir bei €500–2500 pro Monat pro Standort liegen, je nach Betriebsgrösse — wo ist das für dich? Ok, hoch, unverschämt?"

**Rationale:** Preistest. Wir sammeln Reaktionen über alle Segmente.

**Look for:**
- Schmerzlaut? („Ouh", „Puh", „Tschuldigung?")
- Vergleich zu heutigem Stack: „Zahle heute 400, wäre also doppelt"
- Konditionen: „Was ist drin? Was kostet extra?"
- Jahresvertrag vs. monatlich — fragt Persona danach?

**Dokumentieren:** jede Persona auf 4-Punkt-Skala: Bargain / Akzeptabel / Hoch / Unverschämt. Mit 1 wörtlichen Quote.

---

## Turn 9 — Konkurrenz-Framing

**Frage:** „Unser Argument: statt 5 Tools, die nicht miteinander reden, ein Team von KI-Agents, die alles zusammenbringen. Resoniert das oder klingt das wie Marketing?"

**Rationale:** Kategorie-Positioning. Prüft ob die „Tool-Chaos vs. Einheits-Plattform"-Story zieht.

**Look for:**
- Stimmt Persona dem Problem zu? („Ja, die sprechen wirklich nicht miteinander")
- Kommt Skepsis: „Aber integrieren die das dann wirklich?"
- Nennt Persona andere All-in-One-Anbieter (Lightspeed, Toast, Delegate)?

**Sit-up-Signal:** Persona listet konkret ihre nicht-verknüpften Tools auf → genau unser Wedge

---

## Turn 10 — Trial-Close-Test

**Frage:** „Hypothese: 4 Wochen kostenlos zum Testen. Was müsste in diesen 4 Wochen passieren, damit du danach unterschreibst?"

**Rationale:** Definiert, was *für diese Persona* der Proof-Point ist. Verschieden je Persona.

**Look for:**
- Was misst Persona? (Zeit-Ersparnis? Rating-Lift? Personal-Zufriedenheit?)
- Welches Zeitfenster? (Sofort-Effekt vs. 3-Monate-Effekt)
- Wer muss es ausprobieren? (Sie selbst? Das Team?)

**Kernfrage die wir extrahieren:** Was ist der minimal viable Success-Metric in den ersten 4 Wochen?

---

## Turn 11 — Decision-Making-Process

**Frage:** „Wer ausser dir müsste bei so einer Entscheidung mitreden — Ehepartner, Team, Buchhalter, Chef, Investor?"

**Rationale:** Sales-Zyklus-Planung. Inhaber allein = schneller Zyklus. Gruppe = 3-6 Monate.

**Look for:**
- Wie viele Stakeholder?
- Wer hat Veto?
- Wer hat Pain? (oft andere Person als Decision-Maker — z.B. GM hat Pain, CEO entscheidet)

---

## Turn 12 — Dealbreaker

**Frage:** „Was würde dich NIE kaufen lassen — egal wie gut der ROI ist? Gibt's Red Lines?"

**Rationale:** Dealbreaker-Inventar. Ehrliche Red Lines bevor die Sales-Konversation anfängt.

**Look for:**
- Datenschutz/Serverstandort?
- Kein Telefonsupport auf Deutsch?
- Jahresvertrag-Lock-in?
- „Startup ohne Referenzen"?

**Dokumentieren:** Red-Lines-Cluster über alle 10 Calls — oft tauchen 2–3 Patterns wiederholt auf.

---

## Turn 13 — Operative Realität

**Frage:** „Was hast du diese Woche nicht geschafft, was du dir eigentlich vorgenommen hattest — operativ, organisatorisch?"

**Rationale:** Pain-Reality-Check. Verbindet theoretischen Pain mit konkreter Woche.

**Look for:**
- Spontane, konkrete Aktivitäten
- Emotionalität: Frust, Resignation, Akzeptanz?
- Können diese unerledigten To-Dos durch Couvert gelöst werden? (Mapping-Job)

**Sit-up-Signal:** Persona wird plötzlich ehrlich und gesprächig („Ach ja, die Google-Bewertungen-Antworten. Liegen seit 10 Tagen rum.")

---

## Turn 14 — Konsequenz der Nicht-Lösung

**Frage:** „Wenn du das Problem — Personal/Bewertungen/Überblick — in 3 Monaten *nicht* gelöst hättest: was passiert dann?"

**Rationale:** Urgency-Test. Ist der Pain akut oder „would be nice"?

**Look for:**
- Konkrete Konsequenz (Rating fällt, Mitarbeiter kündigt, Marge sinkt, persönlich ausgebrannt)
- Zeitfenster: akut oder latent?
- Emotionale Ladung

**Red flag (für uns):** Persona sagt „naja, passiert nix wirklich" → kein echter Pain → dieser Persona-Typ ist kein Kunde.

---

## Turn 15 — Blind-Frage

**Frage:** „Letzte Frage — was habe ich nicht gefragt, das ich hätte fragen sollen? Was wäre für dich der entscheidende Punkt, den ich übersehe?"

**Rationale:** Meta-Frage. Oft kommen hier die wertvollsten Info-Bites, weil Persona selbst das Gespräch reflektiert.

**Look for:**
- Was ist *für diese Persona* das wichtigste Kriterium?
- Kommt ein Thema, das wir nie bei Product-Design bedacht haben?
- Persona-Reaktion auf „offene Frage" zeigt auch den Kommunikations-Typ

**Dokumentieren:** WÖRTLICH. Diese Antwort ist oft der Gold-Nugget des ganzen Calls.

---

## Closing (nicht als Turn gezählt)

Interviewer:
> „Danke, das war super wertvoll. Ich melde mich nicht als Sales — ich melde mich, wenn wir launch-ready sind. Darf ich dich dann nochmal anpingen?"

Persona-Reaktion = letztes Commitment-Signal:
- „Ja klar, schreib mich an" = warmes Lead
- „Mhm, schau dann mal" = kalt
- „Lass dir Zeit" = freundlich aber kein Lead

---

## Turn-Coverage-Map

| Ziel | Turns |
|---|---|
| Context/Baseline | 1, 3, 4 |
| Pain-Discovery | 2, 13, 14 |
| Messaging-Test | 5, 6, 7, 9 |
| Commercial-Test | 8, 10, 12 |
| Decision-Process | 11 |
| Open/Meta | 15 |
