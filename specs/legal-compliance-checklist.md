# Legal Compliance Checklist — `scan.couvert.ai` & Tier 1 Launch

**Status:** Draft · **Owner:** MV · **Letzte Aktualisierung:** 2026-04-17
**Basierend auf:** Deep Research April 2026 + `specs/teaser-pipeline-v1.md` Kap. 12

---

## 1. Rechtsrahmen Schweiz — Was gilt

| Gesetz | Wofür einschlägig | Key-Referenz |
|---|---|---|
| **UWG Art. 3 Abs. 1 lit. o** | E-Mail-Massenwerbung, Opt-In-Pflicht | [haerting.ch](https://haerting.ch/wissen/datenschutzrechtliche-bestimmungen-bei-werbung/) |
| **revDSG (nDSG)** | Bearbeitung von Personendaten (Review-Autoren) | [edoeb.admin.ch](https://www.edoeb.admin.ch/) |
| **UWG (allgemein)** | Irreführung bei Werbung mit Bewertungen | [mll-news.com](https://www.mll-news.com/) |
| **OR Art. 40a ff.** | Widerrufsrecht bei Konsumentenverträgen (B2B i.d.R. nicht anwendbar) | n/a |

⚠️ **Kanzlei-Abnahme vor Launch ist Pflicht.** Diese Liste ist keine Rechtsberatung.

---

## 2. Pre-Launch Checklist — Was vor V1 stehen muss

### 2.1 Infrastruktur `scan.couvert.ai`

- [ ] **Impressum** — leicht auffindbar, folgende Angaben Pflicht:
  - Firma (ALPYNE GmbH / Couvert)
  - Vollständige Postadresse
  - E-Mail (direkt klickbar)
  - Telefonnummer
  - Handelsregister-Nummer (UID)
  - MWST-Nummer (wenn erhoben)

- [ ] **Datenschutzerklärung** — muss folgende Abschnitte enthalten:
  - Verantwortlicher (Art. 19 revDSG)
  - Zweck der Datenbearbeitung ("betriebswirtschaftliche Analyse für Gastronomie")
  - Kategorien bearbeiteter Daten (Scan-Email, Google-Review-Texte, Speisekarten-Inhalte)
  - Rechtsgrundlage (Einwilligung + überwiegendes Interesse des Restaurant-Kunden)
  - Speicherdauer (Scan-Daten 90 Tage, danach Anonymisierung)
  - Auskunfts-/Löschrechte + Kontakt (`privacy@couvert.ai`)
  - Auftragsbearbeiter (Outscraper, Firecrawl, Apify, Anthropic, Resend, Cloudflare)
  - Datenübermittlung ins Ausland (USA für Anthropic/Resend — Angemessenheitsbeschluss oder Standardvertragsklauseln)
  - Cookies & Tracking (wenn PostHog genutzt)

- [ ] **Cookie-Banner** (wenn PostHog oder anderes Tracking live):
  - Google Consent Mode v2 kompatibel für CH
  - "Notwendige" Cookies opt-in-frei, alles andere opt-in
  - Widerrufsmöglichkeit jederzeit

### 2.2 Scan-Formular-Design

- [ ] **Zweckangabe** über dem Formular:
  - *"Sie erhalten einen kostenlosen Teaser Ihrer Gäste- und Operations-Daten per E-Mail."*

- [ ] **Opt-In-Checkbox** — nicht vorausgefüllt:
  - *"☐ Ich bin damit einverstanden, dass Couvert mir den Analyse-Teaser per E-Mail zusendet und ggf. mit mir zu dieser Analyse Kontakt aufnimmt. Widerruf jederzeit möglich."*

- [ ] **DSE-Link** am Formular:
  - *"Mit dem Absenden akzeptieren Sie unsere [Datenschutzerklärung](link)."*

### 2.3 E-Mail-Templates

**Jede ausgehende Mail muss enthalten:**

- [ ] Vollständige Absenderangaben in Signatur (Firma, Adresse, Kontakt)
- [ ] Betreff: Klar als Geschäftsmail erkennbar (kein Clickbait)
- [ ] Einleitung: Bezug auf die Scan-Anfrage (*"Sie haben am [Datum] den Scan für [Restaurant] angefordert"*)
- [ ] Ein-Klick-Opt-Out-Link im Footer (kostenlos, kein Login)
- [ ] Kein Tracking-Pixel ohne Consent
- [ ] Keine personalisierten Tracking-Links ohne Consent

### 2.4 PDF-Report-Regeln

- [ ] **Review-Zitate:**
  - Max. 2–3 Sätze pro Zitat
  - Quelle immer: *"Google-Gast, [Sterne], [Monat Jahr]"*
  - NIE Verfassernamen, NIE Profilbilder
  - NIE Cherry-Picking (muss proportional sein)

- [ ] **Aggregate-Angaben:**
  - Rating, Count, Prozentverteilungen: OK, Quelle nennen
  - Trends: OK, Zeitraum explizit angeben

- [ ] **Accuracy-Hinweis am Ende:**
  - *"Alle Zahlen sind aus öffentlichen Daten abgeleitet. Sollte uns ein Sachfehler unterlaufen sein, melden Sie sich unter hello@couvert.ai — wir korrigieren oder erstatten."*

### 2.5 Interne Dokumentation (revDSG-Pflicht)

- [ ] **Verzeichnis der Bearbeitungstätigkeiten** (VVT) — Template:
  - Bearbeitungszweck
  - Datenkategorien
  - Empfänger (Auftragsbearbeiter)
  - Aufbewahrungsfristen
  - Sicherheitsmassnahmen (Verschlüsselung, Zugriffskontrollen)
  - Grenzüberschreitende Bekanntgabe

- [ ] **Auftragsbearbeitungsverträge (AVV/DPA)** mit:
  - Outscraper
  - Firecrawl
  - Apify
  - Anthropic
  - Resend
  - Cloudflare

- [ ] **Datenschutz-Folgenabschätzung (DSFA)** — einmalig dokumentieren für
  das Profiling aus Review-Daten. Nicht streng Pflicht bei unserem Volumen,
  aber Best Practice.

### 2.6 AGB für Tier 1 (Audit-Verkauf)

- [ ] Klarer Leistungsumfang (was ist im CHF 4'500 drin)
- [ ] Widerrufsrecht: Ausschluss bei digitalen Produkten nach Lieferung
  (B2B-üblich, prüfen lassen)
- [ ] **Accuracy Guarantee** wörtlich:
  - *"Sollten wir im Report nachweisbar falsche sachliche Aussagen treffen,
    prüfen wir den Befund innerhalb 7 Werktagen und korrigieren oder erstatten
    anteilig. Subjektive Unzufriedenheit mit der Analyse ist kein Erstattungsgrund."*
- [ ] Gerichtsstand: Zürich
- [ ] Anwendbares Recht: Schweizer Recht
- [ ] MWST-Handhabung (8.1 %, inkl. oder exkl. klar ausgewiesen)

---

## 3. Phase-2-Warnung: Cold Outreach ist anders

Sobald wir **nicht-user-initiierte** Kampagnen starten (z. B. kalte Outbound-Mails
an Restaurants, die wir aus Google Maps identifiziert haben), ändert sich die
Rechtslage drastisch:

### 3.1 Was NICHT geht

- ❌ Systematisches Versenden des Teaser-PDFs an viele Restaurants ohne Zustimmung
- ❌ E-Mail-Marketing-Tool mit gekaufter/gescrapter Liste, nur weil "B2B"
- ❌ Umgehung des Opt-Ins durch Trick-Formulierungen

### 3.2 Was geht

- ✅ **Zwei-Stufen-Flow:** Mail 1 ist Permission-Request, Mail 2 (nach "Ja") ist Report
- ✅ **Einzelansprache** über LinkedIn (kein Bulk)
- ✅ **Telefon-Kaltakquise** (UWG-Regeln beachten, aber kein Opt-In erforderlich)
- ✅ **Physische Post** / Besuche
- ✅ **Partner-Vermittlung** (Lieferanten, Gastro-Verbände, Bank-Relationship-Manager)
- ✅ **Content-Marketing / SEO** (organische Suche führt zum Scan-Formular = Opt-In)
- ✅ **Paid Ads** (Nutzer klickt eigenständig → scan.couvert.ai = Opt-In)

### 3.3 Dokumentierte Sanktionen (zur Einordnung)

Strafbefehl eines Schweizer Gerichts gegen Spam-Versender nach Art. 3 lit. o
i.V.m. Art. 23 UWG — die Durchsetzung ist real. Bei systematischem Verstoss
drohen:
- Unterlassungsklage + Schadenersatz (zivilrechtlich)
- Strafbefehl/Busse (strafrechtlich)
- Reputationsschaden in der Gastro-Community (geschäftlich)

---

## 4. Ablauf-Empfehlung vor Launch

| # | Schritt | Zeitaufwand | Wer |
|---|---|---|---|
| 1 | Schweizer IT-/Werberechtskanzlei kontaktieren | 1 Woche | MV |
| 2 | Impressum + DSE Erstentwurf (aus Template) | 2 Tage | MV |
| 3 | Kanzlei-Review der Entwürfe + AGB-Template | 1–2 Wochen | Kanzlei |
| 4 | Einarbeitung Rückmeldungen | 2 Tage | MV |
| 5 | VVT intern aufsetzen | 1 Tag | MV |
| 6 | AVVs mit Auftragsbearbeitern abschliessen | parallel, 2–3 Wochen | MV + Anbieter |
| 7 | Final-Freigabe durch Kanzlei | 1 Woche | Kanzlei |
| **Total** | | **~5–6 Wochen** | |

**Empfehlung:** Kanzlei-Kontakt jetzt starten, damit der juristische Pfad
parallel zur technischen Entwicklung läuft und nicht zum Launch-Bottleneck wird.

---

## 5. Budget-Schätzung Rechtskosten

| Posten | Geschätzt |
|---|---|
| Kanzlei-Initial-Mandat (Review + Templates) | CHF 3'000–6'000 |
| Laufende Beratung pro Jahr | CHF 1'500–3'000 |
| **Total Jahr 1** | **~CHF 4'500–9'000** |

Tragbar im Verhältnis zu CHF 4'500 Unit-Economics und dem Risikoprofil.

---

## 6. Kanzlei-Anfragen — Empfohlene Ansprechpartner

*(Nicht abschliessend, zur Orientierung — MV wählt selbst.)*

- **Haerting Rechtsanwälte** (Zürich) — sichtbar in CH-IT-/Werberecht, eigene
  Fachbeiträge zum Thema
- **VISCHER** (Zürich, Basel) — starke Digital-/Tech-Praxis
- **MLL Legal** (Zürich) — IT-/Datenschutz-Publikationen
- **Steiger Legal** (Zürich) — sehr aktiv in Marketing-Compliance

---

## 7. Status-Tracking

| Item | Status | Next Step | Due |
|---|---|---|---|
| Kanzlei-Kontakt | ☐ Open | MV wählt Kanzlei | Woche 1 |
| Impressum-Entwurf | ☐ Open | MV, nach Template | Woche 2 |
| DSE-Entwurf | ☐ Open | MV, nach Template | Woche 2 |
| AGB-Entwurf | ☐ Open | Kanzlei | Woche 3 |
| Scan-Form Legal-Copy | ☐ Open | MV, Kanzlei-Review | Woche 3 |
| VVT | ☐ Open | MV | Woche 3 |
| AVVs (alle Provider) | ☐ Open | MV | Woche 2–4 |
| Launch-Freigabe | ☐ Open | Kanzlei | Woche 6 |

---

*Ende Compliance Checklist.*
