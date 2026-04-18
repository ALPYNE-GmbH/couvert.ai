# TASKS — Couvert.ai Roadmap

**Status:** Living document · **Owner:** MV · **Last update:** 2026-04-17

Zentrale Task-Liste für alles, was identifiziert, priorisiert oder explizit
aufgeschoben wurde. Gilt als Single Source of Truth für Roadmap-Fragen.

---

## 🔥 Blocker / In Arbeit

*(Keine aktuell.)*

### ✅ T-HOT-001 · Sonnet-vs-Opus-A/B (2026-04-18) — resolved
Ran side-by-side on 500 Hamburg reviews. Opus 6.9× more expensive,
~15-20% qualitatively better reasoning. Decision: Sonnet default,
Opus selectively for Tier-1 report synthesis + Competitor Radar
strategic suggestions. Code stays `MODELS.OPUS`-configurable per call.

---

## 🟠 High Priority — als Nächstes anpacken

### T-001 · Interaktiver Scan-Lead-Magnet auf `scan.couvert.ai`

**Was:** User-initiierte Scan-Form, die in 60s einen 1-Pager-Teaser-PDF
generiert (6 Agents aus öffentlichen Daten, 6 als `🔒` für Tier-2-Upsell).

**Warum:** Das ist der Kernfunnel. Homepage-CTA *"Scan-Beta anfragen"* zeigt
aktuell auf Calendly als Bridge. Sobald der Scan live ist, direkt verlinken.

**Spec:** `specs/teaser-pipeline-v1.md` (vollständig ausgearbeitet)

**Technisch nötig:**
- Next.js 15 App Router auf `scan.couvert.ai`
- Inngest für Async-Queue
- Outscraper + Firecrawl + Apify für Scraping
- Claude Sonnet für 6 Agent-Outputs
- React-PDF für 1-Pager-Template
- Resend für Email-Delivery
- Opt-In-Flow + Datenschutzerklärung auf der Scan-Seite (Legal-Compliance)

**Blocker:**
- Legal-Abnahme (Impressum, DSE, Opt-In-Text) — siehe
  `specs/legal-compliance-checklist.md`
- 5 verbleibende Agent-Prompts ausarbeiten (Reputation Manager ist fertig)

**Geschätzter Aufwand:** 2–3 Wochen Solo-Dev-Arbeit.

---

### T-002 · Chain/Enterprise-Pricing-Spec

**Was:** Neue Spec für Multi-Location-Deals (z. B. Gusto Gruppe mit 50+
Standorten, Adrians 27 Restaurants).

**Warum:** Aktuelle Specs decken nur Single-Location-Flow (Teaser → Tier 1
→ Tier 2 → Aufbauphase → Managed). Chain-Motion fehlt strukturell.

**Inhalt der Spec:**
- Chain-Pricing-Modell (Staffelung pro Standort, Volume-Konditionen)
- Master-Services-Agreement-Template-Struktur
- Multi-Location-Onboarding-Flow (Pilot → Rollout)
- Group-Level-Reporting + Store-Level-Dashboards
- Zentrale Daten-Governance bei Gruppen
- Enterprise-Sales-Kollateral (Case Studies, ROI-Decks)

**Trigger:** Adrian-Gespräch nach Report-Versand. Wenn Adrian Gruppen-
Rollout signalisiert → Spec beschleunigt fertigstellen.

**Geschätzter Aufwand:** 1 Tag Scoping, 2–3 Tage Iterationen.

---

### T-003 · Visual Cockpit-Mockups

**Was:** Screenshot-artige Mockups des zukünftigen Kunden-Dashboards.

**Warum:** Amakori zeigt `app.amakori.com` als Produktvorschau. Couvert
sagt dagegen nur textuell, was die Agents tun. Visueller Proof fehlt.

**Umfang:**
- 1 Mockup: Kunden-Cockpit-Übersicht (4 Teams, aktive Agents, Alerts)
- 1 Mockup: Beispiel-Alert auf Handy (*"Quality Watchdog: 8× nasser Teig"*)
- 1 Mockup: Beispiel-Review-Antwort (2-Stern-Review links, Antwort rechts)
- 1 Mockup: Monatsbericht-Ausschnitt (Rating-Entwicklung, Top-3-Hebel in CHF)
- 1 Mockup: Schicht-Briefing (*"Freitag 17:00 — VIP-Gast, Sonderwünsche"*)

**Technisch:** Figma oder HTML-Mockups, als PNG exportiert und auf
Homepage eingebunden.

**Geschätzter Aufwand:** 1–2 Tage Design + Einbindung.

---

## 🟡 Medium Priority — im Auge behalten

### T-004 · 5 verbleibende Agent-Prompts für V1-Teaser ausformulieren
Teaser-Pipeline braucht 6 Agent-Prompts. Reputation Manager ist fertig,
ausstehend: Quality Watchdog, Revenue Analyst, Menu Intelligence, Marketing
Engine, Competitor Radar. Spec-Referenz: `specs/teaser-pipeline-v1.md`
Kap. 7 + 13.

### T-005 · Kanzlei-Kontakt für Legal-Abnahme
Review der Scan-Form-Compliance, AGB-Template für Tier 1, Opt-In-Text.
Vorschlag: 1–2h Rubber-Stamp-Review (CHF 600–1500) statt Full-Mandate.
Spec: `specs/legal-compliance-checklist.md` Kap. 6.

### T-006 · Learning-Loop mit realem Kunden-Fall ersetzen
Aktuelle Learning-Loop auf Homepage nutzt das Teig-Beispiel (hypothetisch).
Sobald erster realer Kunde 6-Monats-Daten liefert → echten Case einbauen.

### T-007 · "Fallbeispiel"-Seite aktualisieren
`docs/fallbeispiel.html` sollte konsistent zum neuen Report (12 Agents,
4 Teams, 11 Massnahmen) sein. Derzeit evtl. veraltet.

---

## 🟢 Low Priority / Nice-to-have

### T-008 · Multi-Language Homepage (FR, IT)
Für Romandie- und Ticino-Expansion. Nur wenn signifikante Nachfrage.

### T-009 · SEO-Optimierung für "Gastronomie-Beratung Zürich"
Keyword-Research, Meta-Tags, Blog-Content. Mittelfristig.

### T-010 · A/B-Test verschiedene Hero-Headlines
Aktuelle: *"Ihr Restaurant verliert Geld"*. Alternative testen:
*"Gastro-Beratung. Ohne Berater."* oder ähnliche Anti-Consultancy-Framings.

### T-011 · Homepage-Positionierung anti-consultancy schärfen
Hero-Overline aktuell: *"AI Operations for Gastronomy"*. Baier-Analyse
ergab: spezifische Gegenspieler-Framings (z. B. *"Gastro-Beratung.
Ohne Berater."*) sind stärker. Erfordert finale Entscheidung.

---

## ✅ Erledigt (Stand 17.04.2026)

- [x] V1-Teaser-Spezifikation (`specs/teaser-pipeline-v1.md`)
- [x] Tier-1-Audit-Spezifikation (`specs/tier-1-automated-audit.md`)
- [x] Legal-Compliance-Checkliste (`specs/legal-compliance-checklist.md`)
- [x] CLAUDE.md mit persistentem Projektkontext
- [x] Agent-Struktur auf 12 Agents / 4 Teams aligned
- [x] Discovery-Fee-Credit-Mechanik designed (Tier 1 → Aufbauphase)
- [x] Unit Economics mit Channel-Mix und realistic Blended CAC
- [x] Weekly Report für 60 Seconds generiert und in Repo
- [x] Homepage-Konsistenz: 6/11 → 12 Agents überall
- [x] Homepage: Pricing von ablauf.html entfernt
- [x] Homepage: Trust-Badges unter Hero (nDSG, Anthropic Claude)
- [x] Homepage: Learning-Loop-Sektion
- [x] Homepage: Scan-Teaser-Sektion (Option C)
- [x] Full Couvert Report für 60 Seconds fertig und geprüft
- [x] 5 Fixes für finalen Report vor Versand an Adrian

---

## 🗒️ Backlog / Ideen (noch nicht priorisiert)

- Industry-Benchmark-Report: Couvert aggregiert anonymisierte Daten
  aller Kunden → Branchenreport *"State of Swiss Gastronomy"* als
  PR-Hebel.
- Partner-Vermittlungsmodell: Lieferanten, Gastro-Verbände, Banken
  empfehlen Couvert → Revenue Share.
- White-Label-Version für Beratungen oder Banken, die an ihre
  Gastro-Kunden ausspielen.
- Push-Benachrichtigungen via WhatsApp Business API (Gastronomen nutzen
  WhatsApp intensiv).

---

*Update diese Datei, wenn Tasks erledigt, neue aufkommen oder sich
Prioritäten verschieben. Commit-Convention: `TASKS: <kurze Beschreibung>`.*
