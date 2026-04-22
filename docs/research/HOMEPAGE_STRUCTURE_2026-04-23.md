# Homepage-Struktur — Research-Review

**Projekt:** couvert.ai
**Datum:** 2026-04-23
**Scope:** Dramaturgie, Hero-Pattern, Trust-Stack, CTA-Strategie, Mobile-Adaption
**Methode:** Literatur-Review (Nielsen Norman Group, Baymard, Unbounce, CXL-nahe Quellen, Instapage, Mouseflow, SaaS-Hero), abgeglichen mit Couvert-Spezifika (Premium, Pre-Launch, keine Testimonials, hoher ACV).

---

## Executive Summary — Top 5 Empfehlungen (priorisiert)

1. **Hero muss „Outcome in ≤ 8 Wörtern" + genau EINEN primären CTA liefern.** Unbounce 2024 und mehrere CRO-Quellen zeigen: Single-Goal-Landingpages konvertieren ~13.5 % vs. ~10.5 % bei Multi-CTA. Für Couvert: „Scan durchführen" als primär, „PDF-Beispiel lesen" und „Cockpit live sehen" als **sekundäre** Text-Links unterhalb — nicht als gleichwertige Buttons.
2. **Trust-Stripe UNTER Hero beibehalten, aber mit einem einzigen High-Credibility-Signal in der Hero selbst ergänzen** (z. B. „Schweizer Hosting · nDSG · Claude" als dünne Zeile direkt unter der Subline). Trust-Blocks in der Nähe von CTAs heben Conversion laut mehreren Quellen um 15–42 %.
3. **PAS-Dramaturgie strenger durchziehen:** Problem (CHF 390k-Hebel) gehört VOR die Solution-Section, nicht als dekorativer Teaser. Dan-Kennedy-/Copyhackers-Konsens: Problem + Agitation *direkt* nach Hero, erst dann Solution.
4. **Dossier-Exzerpt (Proof) VOR den Agent-Cards-Grid ziehen.** „Proof before Pitch" ist der robustere Pattern für skeptische Käufer ohne Testimonials. Ein konkretes PDF-Beispiel ersetzt fehlende Case-Studies in der Pre-Launch-Phase teilweise.
5. **Sticky-Chapter-Layout für Solutions beibehalten**, aber mit Chapter-Progress-Indicator. Research zu Long-Scroll-Completion: sichtbarer Endpunkt erhöht Scroll-Completion messbar; ohne Indikator brechen 50 %+ mid-section ab.

---

## Ideale Sektions-Reihenfolge

Empfohlene Reihenfolge gegenüber dem Status quo. Bewegungen sind **fett**.

| # | Sektion | Funktion | Begründung |
|---|---|---|---|
| 1 | Hero (Tagline + Subline + 1 primärer CTA + Cockpit-Visual) | Value-Prop in ≤ 5 s | NN/G: 57 % der Viewing-Time ist above-the-fold; 10–20 s Verweildauer wenn kein klarer Grund zu bleiben. |
| 2 | **Mini-Trust-Stripe (1-Zeile)** | Sofortige Legitimation | Baymard-Prinzip: Trust in Sichtweite des CTA. Kurz, nicht die ganze 4-Signale-Leiste. |
| 3 | **Problem + Agitation (CHF 390k-Hebel, erweitert)** | Emotionaler Hook, Skepsis brechen | PAS-Framework (Kennedy, Copyhackers). Der Hebel ist nicht Teaser, sondern *das* argumentative Fundament. |
| 4 | **Intelligence-Dossier-Exzerpt (Proof-Block)** | „Zeig, nicht erzähl" | Proof-before-Pitch; ersetzt teilweise fehlende Testimonials. Konkretes Artefakt senkt wahrgenommenes Risiko. |
| 5 | Solutions-Section (4 Teams, Sticky-Chapter) | Das eigentliche „Was" | Erst jetzt Katalog-Mode. Sticky-Chapter nur wenn Progress-Indicator vorhanden. |
| 6 | Agent-Cards-Grid (12 Agents) | Detail-/Scope-Demonstration | Kommt NACH der Sticky-Section, als „Full Picture" — nicht davor, sonst kognitive Überladung. |
| 7 | **Voll ausgebautes Trust-Signal-Panel** (Hosting, nDSG, Anthropic, Kündbarkeit, ggf. Partner) | Final-Objection-Handling | Baymard: „Guarantee"-Signal vor Commit erhöht Conversion 10–30 %. |
| 8 | Mockup-Gallery | Sekundärer Proof | Visueller Reinforcer, nicht Kernargument. |
| 9 | Methodik/Ablauf-Links | Self-Qualification für ernsthafte Leser | Sekundärseiten, nicht Homepage-Kern. |
| 10 | Final-CTA mit Wiederholung des primären Ziels | Closing | Single-CTA-Prinzip — *gleicher* Haupt-CTA wie oben, neue Formulierung erlaubt. |

**Anti-Pattern, den das vermeidet:** Die aktuelle Reihenfolge (Teaser-Problem → Solutions → Dossier → Grid → Mockups) bietet zu früh den „Was-Katalog" ohne emotionale Dringlichkeit. Für ein 4–6-stelliges ACV ist das zu schnell „Pitch".

---

## Hero-Patterns — Evidenz

**Text-dominant vs. Visual-dominant für „Platform/System"-Produkte:**
- Mouseflow- und Alf-Design-Auswertungen: Hero performt am besten mit **kurzem Headline (< 44 Zeichen, ≤ 8 Wörter)**, Outcome-Fokus, einem primären CTA und einem Produkt-Visual, das sofort begreifbar ist (Screenshot > Illustration).
- „Das System, das handelt statt meldet." — 42 Zeichen, passt. ✓
- Cockpit-Mockup rechts ist das richtige Format für Platform-Produkte (Qualtrics, Lattice, Linear machen es genauso). Illustration wäre Downgrade.

**CTA-Anzahl im Hero:**
- Unbounce/SaaS-Hero: Ein primärer CTA = 13.5 %, Multi-CTA = 10.5 % Median-Conversion auf Landing-Pages. Delta ist aber teils durch Intent-Matching erklärt, nicht nur CTA-Zahl selbst.
- Für Couvert konkret: **ein Button** („Scan durchführen"), darunter **zwei Text-Links** (unterlinig, kleiner) als Escape-Hatches. Das ist der HubSpot/Qualtrics-Pattern.

**Social Proof above the fold:**
- Mehrere Quellen: EIN hochglaubwürdiges Signal unter der Headline ist optimal (Sterne-Rating, Nutzer-Zahl, Kunden-Zitat) — nicht mehr, sonst konkurriert es mit der Headline.
- Couvert hat in der Pre-Launch-Phase **keine Nutzer-Testimonials**. Ersatzpatterns: (a) „Entwickelt auf Anthropic Claude" + „Hosting in der Schweiz" als Mini-Trust-Zeile, (b) ein Zitat/Zahl aus dem Dossier-Excerpt („Scan eines CHF-5-Mio-Betriebs identifiziert Ø CHF 390k Hebel"), (c) später: Logo einer Pilot-Gastronomie.

**Tagline-Länge:**
- NN/G 28 %-Regel: User lesen max. ~28 % der Wörter auf einer Seite, auf Homepage eher 20 %. Kurz > Lang.
- Subline max. 2 Zeilen auf Desktop, 3 auf Mobile.

---

## Trust-Stack Timing

Ohne Testimonials und ohne Case-Study ist die Reihenfolge der Trust-Signale *besonders* kritisch. Empfohlener Stack:

1. **Hero-Stripe (mini):** 3–4 Icon-Signale, 1 Zeile. Nicht die volle Leiste. Zweck: „OK, das ist legitim, ich scrolle weiter."
2. **Benchmark-Zahl (CHF 390k):** Nicht Trust im engen Sinne, aber Legitimations-Anker — „Es gibt ein echtes, quantifiziertes Problem." Gehört in die Problem-Section (Position 3).
3. **Dossier-Exzerpt als „Beweis-durch-Artefakt":** Position 4. Substitut für Case-Study.
4. **Methodik-Hinweis in Sichtweite** („Wie wir messen" — kurze Zeile, Link auf /methodik.html): erhöht Seriosität bei skeptischen Schweizer Käufern; Baymard: Guarantee/Transparency-Signale −> +10–30 % Conversion.
5. **Voll ausgebautes Trust-Panel (Pos. 7):** Hosting, nDSG, Anthropic, Monatlich kündbar — mit Erklärzeile pro Punkt, nicht nur Icons.
6. **Testimonials/Case-Studies:** fehlen aktuell. Priorität: sobald 1–2 Pilotbetriebe im Teaser-MVP sind, diese VOR Pos. 7 einfügen. Bis dahin explizit als Pre-Launch kommunizieren statt leere Logo-Leiste.

---

## Sticky-Chapter vs. Standard-Scroll (Solutions 4 Teams)

**Kurzantwort: Sticky-Chapter ist vertretbar, aber nur mit Indicator.**

- Pro Sticky: Bei 4 Teams × 3–4 Agents droht Ermüdung. Sticky hält Orientierung. Logrocket/UXPin-Reviews: „Fixed long scrolling" hält Scroll-Depth signifikant höher als reiner Standard-Scroll, wenn Content kohärent (was hier der Fall ist).
- Contra Sticky: Mobile-Fallstricke (Viewport-Höhe, iOS-Safari-Bars). Mobile muss auf Standard-Scroll mit Chapter-Headern degradieren.
- Conversion-Rate-Experts-Studie (zitiert in mehreren Quellen): Sticky-CTA allein bringt +25 % auf sehr langen Pages; Hotjar-Scroll-Map-Daten bestätigen, dass ohne visuellen „Endpunkt" 30–50 % der Mid-Page-User abbrechen.

**Empfehlung Couvert:** Sticky behalten auf Desktop. Ergänzen: (a) 4-Dots-Progress oben links der Sticky-Column, (b) hart codierte Exit-Grenze („Scrollen bei Team 4 endet automatisch, Seite scrollt normal weiter"). Auf Mobile: Sticky deaktivieren, stattdessen farbcodierte Chapter-Header beim Standard-Scroll.

---

## PDF-Excerpt: Over-the-Fold oder weiter unten?

Forschung zum Pattern „Proof before Pitch" (Copyhackers, SaaS-Hero, Flockler):

- Über-der-Kante schießt über das Ziel hinaus — der Hero muss Value-Prop + CTA dominieren, nicht ein PDF-Artefakt.
- **Richtig: 2.–3. Scroll-Screen, direkt nach Problem/Agitation.** Der User hat Pain-Point verstanden, jetzt zeigst du „So sieht die Antwort aus". Das ist der stärkste psychologische Zeitpunkt.
- Format: 4–5 Seiten als horizontal scrollbare Karte oder ein dominantes „Lead-Spread" + Link „Vollen Report lesen (PDF, 24 Seiten)". Letzterer Pattern (Anchor + Teaser) dominiert bei McKinsey, Stripe Press, Linear-Changelog-Posts.

---

## CTA-Strategie

**Single-CTA-Prinzip mit Mechanismus-Variation:**
Forschungs-Konsens (SharpAhead, Act-On, HubSpot): Eine *Kernaktion*, aber mehrere *Mechanismen* sie auszulösen ist OK. Drei unterschiedliche Primary-CTAs auf der Homepage verwässern.

**Konkreter Vorschlag für Couvert:**

| Position | CTA | Typ |
|---|---|---|
| Hero (Button) | „Scan für meinen Betrieb starten" | **Primary** |
| Hero (Text-Links) | „Beispiel-Report ansehen" · „Live-Cockpit-Tour" | Sekundär / Escape |
| Nach Problem-Section | „Scan für meinen Betrieb starten" | Primary-Repeat |
| Nach Dossier-Exzerpt | „Meinen eigenen Report anfordern" | Primary-Variante (gleiche Landing) |
| Final-CTA | „Scan starten · 15 Min · unverbindlich" | Primary mit Risk-Reducer |

**„Demo-Dummy" als Zwischenstufe:** In High-ACV-B2B-SaaS (Qualtrics, Lattice, Gong) ist der Pattern „Interactive Demo / Tour ohne Sales-Kontakt" dokumentiert in Growthspree-/Apexure-Analysen als conversionstark, weil er die Self-Qualification-Phase auflöst bevor der Rep angerufen wird. Für Couvert als Pre-Launch-Brand besonders relevant — das „Cockpit live sehen" ist genau dieser Pattern. Als sekundärer CTA im Hero sinnvoll.

**CTA-Copy:** „Value-driven" schlägt generisch stark (Mouseflow: +202 % bei Formulierungen wie „Book Demo: See 2x ROI in 30 Days"). Keine reine „Jetzt starten"-Platitüde.

---

## Mobile-Adaption

Unbounce 2024: **79 % der SaaS-Landing-Page-Visits auf Mobile.** Mobile ist nicht Zweit-Viewport, sondern Primär-Viewport.

| Element | Desktop | Mobile |
|---|---|---|
| Hero-Höhe | 100 vh OK | **max. 85 vh** — sonst wird Subline/CTA abgeschnitten |
| Mockup | Rechts neben Text | **UNTER dem Text**, nicht Hintergrund |
| Primary-CTA | Einmal im Hero | Einmal im Hero **+ Sticky-Bottom-CTA ab Scroll 200 px** |
| Trust-Stripe | 4 Signale horizontal | 2×2-Grid oder horizontal scrollbar |
| Sticky-Chapter | Aktiv | **Deaktiviert**, ersetzt durch Standard-Scroll mit Chapter-Header |
| Dossier-Excerpt | 4–5 Seiten horizontal | 1 Lead-Spread + „Vollen Report lesen"-Link |
| Agent-Grid 12 | 4×3 | 2×6 oder 1×12 mit Kategorie-Header |
| Copy-Länge | OK | Sublines um ~30 % kürzen |

**Weitere Daten:** 1 Sekunde Ladeverzögerung = −20 % Conversion (mehrfach in CRO-Quellen). Mockup-SVG/WebP statt PNG, Lazy-Load unterhalb des Hero.

---

## Konkrete Handlungsempfehlungen für Couvert

### Jetzt ändern (vor nächstem Release)

1. **Hero-CTA-Hierarchie:** Von 3 gleichrangigen Buttons auf 1 Button + 2 Text-Links umstellen. Niedriges Risiko, hoher Effekt.
2. **Problem-Section aufwerten:** Aus dem CHF-390k-Teaser eine vollwertige Problem+Agitation-Sektion machen (1 Headline, 2–3 kurze Bullets mit konkreten Verlust-Kategorien: No-Show-Kosten, Menu-Margin-Drift, Review-Recovery-Fenster, Schicht-Overstaffing). Vor Solutions platzieren.
3. **Dossier-Exzerpt vor Agent-Grid ziehen** — aktuelle Reihenfolge schwächt den Proof.
4. **Mobile-Sticky-Chapter deaktivieren**, stattdessen Chapter-Header. Schnell gewonnen.
5. **Mini-Trust-Stripe im Hero** (1 Zeile, 3 Signale) einfügen; volles Trust-Panel bleibt unten.

### Später testen (A/B oder nach ersten Piloten)

6. **„Cockpit live sehen" als Interactive-Demo** mit echten Sample-Daten (nicht nur statischer Screenshot) — Qualtrics-/Gong-Pattern.
7. **Chapter-Progress-Indicator** in Sticky-Solutions-Section (4 Dots).
8. **„Methodik"-Kurz-Link direkt unter Dossier-Exzerpt** („Wie wir messen →") — messen, ob Trust-Kurve spürbar hebt.
9. **Pilot-Logo-Leiste** einführen, sobald 2–3 Betriebe im Teaser-MVP sind. Ersetzt die fehlende Social-Proof-Lücke.
10. **Value-driven-CTA-Copy-Test:** „Scan starten" vs. „Meinen CHF-Hebel finden" vs. „Blindflug beenden". Erstere ist safe, Letztere on-brand.

### Nicht tun

- **Keine Testimonial-Mock-Ups** oder Fake-Logos. Skeptische CH-Gastronomen riechen das sofort; Brand-Schaden > Conversion-Gain.
- **Keine Exit-Popups oder Countdown-Timer** — passt nicht zum Premium-Beratungs-Positioning.
- **Keine Newsletter-Primary-CTA** — verwässert Single-Goal-Prinzip.

---

## Konvertierungs-Dramaturgie Couvert-spezifisch

Das wahrscheinlichste Gewinner-Narrativ für den Käufertyp „CH-Gastro-Inhaber, 40–60, CHF 3–10 Mio. Umsatz, skeptisch, preissensibel auf Sichtkosten aber offen für ROI-Argumente":

1. **Hook:** Emotionale Provokation („handelt statt meldet") — 2 s.
2. **Legitimieren:** Drei Mini-Trust-Signale — „OK, ernstzunehmend" — 3 s.
3. **Schmerz zeigen:** CHF 390k — „Ich bin also gemeint" — 10 s.
4. **Beweis:** Echtes Dossier-Exzerpt — „Die Leute produzieren was Konkretes" — 30 s.
5. **Lösung:** 4 Teams mit Agents (Sticky-Chapter) — „Scope ist klar" — 60 s.
6. **Finale Trust-Befestigung:** Hosting/nDSG/Anthropic/Kündbar — „Keine versteckten Haken" — 20 s.
7. **Einstieg mit niedrigem Commitment:** „Scan für meinen Betrieb" (15 Min, kostenlos) — nicht „Demo buchen" als Primary, weil CH-Käufer Calendly-Hürde hassen.

Dieser Pfad ist länger als der Median-B2B-Pfad, ist aber für diesen ACV und diese Zielgruppe gerechtfertigt. Scroll-Completion messen; ab < 30 % Dossier-Reach ist die Vorher-Section zu dicht.

---

## Quellen

- Unbounce Conversion Benchmark Report 2024 — *41k Landing-Pages, 464M Visitors; SaaS-Median 3.8 %, 79 % Mobile-Anteil; Copy auf 5.–7.-Klasse-Niveau konvertiert 12.9 % vs. 2.1 % Professional-Level.* https://unbounce.com/conversion-benchmark-report/
- Unbounce SaaS-Conversion-Rate-Seite — *Median-Benchmarks nach SaaS-Subkategorie.* https://unbounce.com/conversion-benchmark-report/saas-conversion-rate/
- Nielsen Norman Group: „F-Shaped Pattern of Reading on the Web" — *User lesen im Mittel 20–28 % der Wörter; F-Pattern entsteht bei unstrukturiertem Text.* https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/
- Nielsen Norman Group: „Text Scanning Patterns — Eyetracking Evidence" — *Commitment-Pattern bei hoher Motivation; Scanning bei niedriger.* https://www.nngroup.com/articles/text-scanning-patterns-eyetracking/
- Baymard Institute — *Trust-Signal-Research, Guarantee-Effekt +10–30 % Conversion, Payment-Security-Concerns −18 % Abandonment.* https://baymard.com/ · https://baymard.com/blog/ways-to-instill-trust
- SaaS-Hero „Data-Driven B2B SaaS Landing Page CTA Best Practices" — *Single-CTA 13.5 % vs. Multi-CTA 10.5 %; Primary above-the-fold +20–30 %; CTA-Copy-Value-driven +202 %.* https://www.saashero.net/design/b2b-saas-landing-cta-practices/
- Conversion Rate Experts „Scrolling Tips" — *Sticky-CTA +25 % auf langen Sales-Pages.* https://conversion-rate-experts.com/scrolling-tips/
- Hotjar Scroll-Maps — *Drop-off-Messung Mid-Page.* https://www.hotjar.com/heatmaps/scroll-maps/
- Mouseflow „CTAs for SaaS" — *Value-driven-Copy-Effekte.* https://mouseflow.com/blog/ctas-for-saas/
- SharpAhead „B2B Landing Page CTA" — *Single-CTA-Prinzip bei dedicated Landing-Pages.* https://sharpahead.com/blog/landing-pages-for-b2b-cta
- Act-On „How Many CTAs" — *Single CALL, multiple MECHANISMS.* https://act-on.com/learn/blog/how-many-ctas-should-i-use/
- Alf Design Group „SaaS Hero Section Best Practices" — *Headline ≤ 8 Wörter / 44 Zeichen.* https://www.alfdesigngroup.com/post/saas-hero-section-best-practices
- Flow Agency „B2B SaaS Landing Page Best Practices" — *Struktur-Konventionen 2025.* https://www.flow-agency.com/blog/b2b-saas-landing-page-best-practices/
- Instapage „9 B2B Landing Page Lessons" — *2025→2026 Shifts.* https://instapage.com/blog/b2b-landing-page-best-practices
- SaaS-Hero „Trust Signals" — *G2/Capterra, SOC 2, GDPR, ROI-Metriken als Top-Trust-Elemente B2B SaaS.* https://www.saashero.net/design/landing-page-design-trust-signals/
- Landingrabbit / SaaSFunnelLab / Copyhackers-Zitat-Kette zu **PAS-Framework** — *Dan Kennedy: „reliable copywriting formula for sales"; Problem direkt nach Hero.* https://landingrabbit.com/blog/pas-formula · https://www.saasfunnellab.com/essay/pas-copywriting-framework/
- Mailerlite / Flockler zu Social-Proof-Placement — *„Proof before Pitch"; 1 High-Credibility-Signal im Hero ausreichend.* https://flockler.com/blog/how-to-use-social-proof-on-landing-pages · https://www.mailerlite.com/blog/social-proof-examples-for-landing-pages
- Growthspree „B2B SaaS Landing Page Benchmarks 2026" — *Self-serve 4–10 % vs. Demo-Request 1.5–4 %; High-Touch-Combined 5–7 %.* https://www.growthspreeofficial.com/blogs/b2b-saas-landing-page-best-practices-demo-conversion-2026
- UXPin „4 Types of Scrolling Patterns" · LogRocket „Creative Scrolling Patterns" — *Fixed Long Scrolling / Sticky-Chapter-Rationale.* https://www.uxpin.com/studio/blog/4-types-creative-website-scrolling-patterns/ · https://blog.logrocket.com/ux-design/creative-scrolling-patterns-ux/

**Caveat:** Einzelne Prozent-Angaben (z. B. „+25 % Sticky-CTA", „+34 % Trust-Badge") stammen aus Sekundärliteratur ohne zugängliche Rohdaten. Richtung ist konsistent über mehrere Quellen, absolute Werte sind mit Vorsicht zu lesen. Für Couvert gilt: Eigene A/B-Messung sobald Traffic > ~500 Sessions/Woche aussagekräftig wird.
