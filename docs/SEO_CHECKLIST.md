# SEO Checklist — couvert.ai

Stand: 2026-04-22

Infrastruktur ist live. Was jetzt noch manuell passieren muss:

## 1. Google Search Console — Ownership verifizieren

URL: https://search.google.com/search-console

**Option A — DNS TXT-Record (empfohlen, bleibt dauerhaft):**
1. In Search Console → "Property hinzufügen" → "Domain" → `couvert.ai`
2. Google zeigt TXT-Record wie `google-site-verification=xxxxx`
3. TXT-Record beim Domain-Registrar (Cloudflare/Namecheap/etc.) hinterlegen
4. In Search Console "Verifizieren" klicken
5. Vorteil: erfasst `www.couvert.ai`, `couvert.ai`, `en.couvert.ai` etc. in einem Rutsch

**Option B — HTML-Meta-Tag (schneller, nur für `couvert.ai` Pfad-Prefix):**
1. In Search Console → "Property hinzufügen" → "URL-Prefix" → `https://couvert.ai/`
2. Google gibt Meta-Tag-String wie `<meta name="google-site-verification" content="xxxxx">`
3. Tag in `docs/index.html` zwischen `<head>` einfügen, commit + push
4. In Search Console "Verifizieren"

## 2. Sitemap einreichen

Nach Verifizierung:
1. Search Console → "Sitemaps"
2. Eingeben: `sitemap.xml` → "Senden"
3. Wiederholen für EN-Property falls separat eingerichtet

## 3. Indexing anfordern

Für die wichtigsten Seiten manuell Indexierung anstossen:
1. Search Console → "URL-Prüfung" → URL eingeben
2. Wenn "URL ist nicht bei Google": "Indexierung beantragen"

Priorisierte URLs:
- `https://couvert.ai/`
- `https://couvert.ai/en/`
- `https://couvert.ai/beispiel-report/`
- `https://couvert.ai/en/example-report/`
- `https://couvert.ai/fallbeispiel.html`
- `https://couvert.ai/team.html`
- `https://couvert.ai/methodik.html`

## 4. Bing Webmaster Tools (optional, 5 Min)

URL: https://www.bing.com/webmasters
- Property mit Google-Verifizierung importieren → spart DNS/Meta-Tag
- Sitemap submitten (gleiche URL)

## 5. Was ist bereits auf der Seite?

- `robots.txt` — erlaubt alles ausser `/cockpit/`, `/archive/`, `/mockups/`, `/design/`, referenziert sitemap
- `sitemap.xml` — 11 URLs mit lastmod + hreflang-Annotationen für mehrsprachige Seiten
- JSON-LD Organization-Schema auf allen öffentlichen Seiten
- Canonical + hreflang auf DE/EN-Homepages und beispiel-report/example-report
- OG/Twitter-Meta auf allen öffentlichen Seiten
- `/cockpit/` hat `noindex` (interner Klick-Dummy)
- `.nojekyll` vorhanden (GitHub Pages serviert `_`-Dateien korrekt)

## 6. Offene Punkte (später)

- **OG-Image** — aktuell kein og:image gesetzt. Für bessere Link-Previews: 1200×630 PNG erstellen, als `docs/og-image.png` ablegen, in allen HTML-Heads referenzieren. Nicht blocking.
- **Favicon-Varianten** — aktuell nur SVG. Apple-Touch-Icon (180px PNG), Android (192/512px) würden Homescreen-Adds schöner machen. Nicht SEO-kritisch.
- **DE-Subpages ohne EN-Mirror** — `/ablauf`, `/methodik`, `/team`, `/fallbeispiel`, `/geschichte` sind DE-only. Sobald EN-Versionen existieren, hreflang-Tags bidirektional ergänzen.
- **Structured Data erweitern** — FAQ-Schema auf `/ablauf.html` (FAQ-Section), Article-Schema auf `/methodik.html` wäre für Rich Results möglich. Erst nach echten Traffic-Daten entscheiden.
- **Analytics** — aktuell bewusst keine. Wenn Plausible/Umami (cookieless) oder GA4 (mit Consent) dazukommen: `cookie-consent.js`-Infrastruktur steht bereits.

## 7. Monitoring

- Nach 2-3 Wochen in Search Console unter "Seiten" prüfen: wie viele URLs sind indexiert?
- "Leistung"-Report: welche Queries bringen Impressions? Optimierung-Loops daraus ableiten.
