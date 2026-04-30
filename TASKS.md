# TASKS — Couvert.ai Roadmap

**Status:** Living document · **Owner:** MV · **Last update:** 2026-04-18

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

### T-015 · Patent- und Markenschutz für Couvert prüfen lassen
**Status:** noch nicht initiiert. Mit Blick auf DACH-Expansion (GTM-Phase-2 DE ab Q3 2027) und potenzielle Nachahmer (Gastronovi, re:spondelligent, mögliche US-Player-Eindringung) muss IP-Schutz früh geklärt werden.

**Zwei Schienen parallel:**

1. **Markenschutz (prioritär, niedrige Hürde):**
   - Wortmarke "Couvert" DACH-weit registrieren
   - Entweder via **IGE** (Schweiz nur, CHF 550 + Klassen) + **DPMA** (Deutschland, EUR 290 + Klassen) + **ÖPA** (Österreich) einzeln
   - Oder **EUIPO** (EU-weit, EUR 850 für 1 Klasse, 2 weitere Klassen je EUR 50 + EUR 100) → deckt DE + AT ab, nicht CH
   - Klassen vermutlich: 9 (Software), 35 (Business Management), 42 (SaaS)
   - Logo-Design-Schutz als eigene Marke zusätzlich
   - Prüfen ob "Couvert" (französisch für Gedeck) bereits von Dritten im Gastro-Kontext markiert ist

2. **Patentschutz (niedrigere Priorität, hohe Hürde):**
   - Software-Patente in EU restriktiv (Art. 52 EPÜ schliesst "Computerprogramme als solche" aus) — nur Patent wenn technischer Effekt über reine Datenverarbeitung hinaus
   - Potenzielle Angle: Kombination aus deterministischer CHF-Math-Engine + AI-Agent-Orchestrierung + Expectation-Reference-Signal-Klassifikation könnte als "Verfahren zur automatisierten Quantifizierung von Gastronomie-Reputations-Verlusten" formuliert werden
   - Realistisch: Aufwand EUR 15'000–40'000, Erfolgsquote mittel, Durchsetzbarkeit schwierig — **Business-Secret + schneller Markteintritt schlägt in diesem Segment fast immer den Patentweg**

**Action:**
- [ ] Schweizer Marken-Anwalt (z.B. Vischer, Rentsch Partner, Meyerlustenberger Lachenal) für 1h-Erstgespräch (typisch CHF 300–500) kontaktieren
- [ ] EUIPO-Recherche-Tool + IGE-Database nach "Couvert"-Vorbestand prüfen (selbst machen, kostenlos)
- [ ] Entscheidung: EUIPO + IGE-Kombination oder je einzeln
- [ ] Parallel: Domain-Portfolio absichern (couvert.de, couvert.at, couvert.com ggf. nachregistrieren)

**Timing:** vor Phase-2-DE-Launch abschliessen (Q3 2027). Je früher, desto kleiner das Risiko einer Namens-Kollision die nachträgliches Rebranding erzwingt.

### T-012 · Off-site SEO — Google-Recognition herstellen
**Status:** On-site-Signale sind live (JSON-LD Organization, Meta-Tags, sitemap.xml, robots.txt auf allen 8 Seiten, Couvert Operations GmbH als legalName). Google AI Overview verwechselt couvert.ai aktuell mit Coupert-Browser-Extension. Off-site-Hebel muss MV selbst bedienen:
- [ ] **Google Search Console** — Property `https://couvert.ai` hinzufügen, via DNS oder HTML-File verifizieren, Sitemap `https://couvert.ai/sitemap.xml` einreichen, pro Seite "Request Indexing" klicken
- [ ] **Google Business Profile** — anlegen als "Couvert Operations GmbH" · Pfäffikon SZ · Kategorie Softwareunternehmen/Unternehmensberatung · Website couvert.ai · Verifizieren
- [ ] **AI Overview Feedback** absenden (Text wurde 2026-04-18 in Chat-Verlauf erstellt) — vor Submit "ALPYNE GmbH, Zürich" durch "Couvert Operations GmbH, Pfäffikon SZ" ersetzen
- [ ] **LinkedIn Company Page** — "Couvert.ai (Couvert Operations GmbH)" · Schweiz · Software für Gastronomie · Link auf couvert.ai
- [ ] **Crunchbase-Profil** — Couvert.ai unter Couvert Operations GmbH registrieren
- [ ] **Rich-Result-Test** auf search.google.com/test/rich-results — couvert.ai prüfen, Organization-Schema-Erkennung verifizieren
**Erwarteter Effekt:** 3–14 Tage bis Google Couvert als eigenständige Entity erkennt und Coupert-Verwechslung verschwindet.

### T-013 · Google Workspace für couvert.ai separat aufsetzen
**Status:** Derzeit läuft E-Mail über ALPYNE-Workspace. Widerspricht der Legal-Entity-Trennung (Couvert Operations GmbH ≠ ALPYNE). DKIM-Signing zeigt aktuell ALPYNE als Infrastruktur-Betreiber, sichtbar in Mail-Headern beim Empfänger.
**Plan:** Google Workspace Business Starter · ~CHF 6.50/User/Monat · initial nur MV.
**Setup-Schritte (ca. 30 Min, einmalig):**
1. Workspace anlegen auf workspace.google.com — Primary-Domain couvert.ai
2. MX-Records bei DNS-Provider setzen (5 Google-Einträge)
3. DKIM aktivieren, TXT-Record eintragen
4. DMARC-Record setzen: `v=DMARC1; p=none; rua=mailto:dmarc@couvert.ai` (erstmal Monitoring, später auf `quarantine`)
5. User hello@couvert.ai + Alias kontakt@couvert.ai anlegen
6. ALPYNE-Mail-History via Google Takeout exportieren, später in Couvert-Workspace importieren falls Couvert-spezifische alte Mails nötig
**Claude liefert auf Anforderung:** DNS-Records-Tabelle zum Copy-Paste, sobald Workspace-Setup startet.

### T-014 · Backlinks CH-Gastro-Ökosystem aufbauen
**Status:** Parallel zu T-012. CH-Domain-zu-CH-Domain-Backlinks in derselben Branche sind das stärkste Signal für Google, dass couvert.ai = Gastronomie-relevant (nicht Coupon-Extension).
- [ ] **Gusto-Gruppe / 60 Seconds** — falls Kooperation aktiv, Backlink von deren Site (Fallbeispiel/Partner-Section) auf couvert.ai
- [ ] **Hotellerie Gastronomie Zeitung** oder **Gastrojournal** — kurzer Artikel/Nennung mit Link
- [ ] **Ludwig-Netzwerk** — falls Gastro-Blog oder Newsletter, Gast-Beitrag platzieren
- [ ] **Zürich Tourism / Zürich City** — falls B2B-relevante Listings verfügbar
**Trigger:** Nach T-012 abgeschlossen und erstem paying customer.

### T-004 · Switch von Outscraper zu DataForSEO — Kostenersparnis 80%
**Status:** Reviews Research zeigt DataForSEO bietet identische Felder bei $0.60–$1.20 pro 1'000 Reviews (Standard/Priority) vs Outscraper $3/1'000.
**Trigger:** Nach V1-Launch, wenn erste 20+ echte Scans durchgelaufen sind. Switch-Aufwand: ~2 Stunden (neuer Client in `src/lib/scraping/dataforseo.ts`, selbes Interface wie outscraper.ts).
**Ersparnis bei 200 Scans/Monat × 2'500 Reviews:** $1'200/Monat → $240/Monat = **$960/Monat = $11'500/Jahr**.
**Schritt-für-Schritt:** 2-wöchiger A/B-POC mit DataForSEO ($50 Prepaid), Felder gegen Outscraper-Output diffen, dann Switch.

### T-005 · Tier 2 Deep Social Analysis
**Status:** Für Tier 2 (CHF 9'500) ist vollständige Social-Intelligence vorgesehen — Competitor-Vergleich auf IG, saisonale Content-Analyse, Influencer-ROI-Schätzung, TikTok + Google Posts.
**Trigger:** Nach Adrian-Gespräch, wenn wir wissen ob der echte Bedarf da ist. Bis dahin nur Tier 1 Light Touch in Marketing Engine Agent.
**Inhalt Tier 2:**
- Competitor-Vergleich auf Social (3 Wettbewerber)
- Saisonale Content-Analyse (letzte 6 Monate)
- Influencer-Kartographie mit ROI-Schätzung
- TikTok, Google Posts
- Audience-Growth-Attribution

### T-006 · Sampling-Regel: Tier-Differenzierung implementiert
**Status:** Aktuell hardcoded 500 Reviews für alle Scans. Braucht Tier-Logik.
**Plan:**
- Teaser: newest 500 Reviews (fast, cheap)
- Tier 1: 12 Monate, max 2'500 Reviews (trend + state)
- Tier 2: 24 Monate, max 10'000 Reviews (historical depth)
- Change Detector bestimmt Analyse-Fenster (post-change bei Change, sonst voll)
- Trend-Chart zeigt immer alle Reviews, mit Change-Marker wenn vorhanden

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
