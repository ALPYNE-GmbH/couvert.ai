# SEO Notes — Indexing-Audit 2026-04-30

Stand: 2026-04-30 · Branch `audit/seo-indexing-2026-04-30`

Dieser Audit dokumentiert die technische SEO-Baseline der `couvert.ai`-Site und behebt die in Google Search Console gemeldeten Indexierungsprobleme. Komplementär zur strategischen Lieferpipeline in `SEO_CHECKLIST.md`.

## 1. Audit-Scope

| Bereich | Status |
|---|---|
| Domain-Konsistenz | ✓ alle canonicals auf `https://couvert.ai/...`, kein www-/http-Drift |
| Canonical pro Public-Page | ✓ alle 12 Public-Pages haben canonical |
| Title + Meta-Description | ✓ alle Public-Pages haben individuelle Title + Meta |
| OG-Tags (og:url) | ✓ alle Public-Pages |
| Twitter-Card | ✓ alle Public-Pages (`summary`) |
| Hreflang | ⚠ nur DE/EN-Mirror-Pages haben hreflang (index, beispiel-report) — DE-only-Pages haben keine, was OK ist solange keine EN-Variante existiert |
| Sitemap-Vollständigkeit | ✓ 12 URLs, alle wichtigen Public-Pages |
| robots.txt | ✓ vorhanden + Sitemap-Reference |
| noindex auf Public-Pages | ✓ keine Public-Page hat versehentlich noindex |
| Internal Links | ✓ keine kaputten relativen hrefs zu .html-Dateien |
| Favicon | ✓ `/favicon.svg` existiert |

## 2. Hauptbefund: "Indexed though blocked by robots.txt"

Google Search Console meldet diese Warnung typischerweise dann, wenn eine URL über interne Links auf der Site **entdeckbar** ist, aber per `robots.txt` **nicht crawlbar**. Google nimmt die URL dann ohne Snippet in den Index auf, ohne die Inhalte zu lesen.

Vor dem Fix war das auf `couvert.ai` der Fall für:

- **`/cockpit/`** — als „Cockpit live durchklicken" auf der Hero verlinkt (`docs/index.html:501`) sowie 4× als sol-inline-Link, plus Hauptlink in der EN-Hero. Page hatte bereits `<meta name="robots" content="noindex">`, aber `robots.txt` blockte das Crawling, sodass Google das `noindex` nie sah.
- **`/mockups/product-{reviews,shift,report,competitor}.html`** — sowohl als sichtbare „Mehr sehen"-Anker als auch als `iframe src` in den Solutions-Sticky-Sektionen verlinkt. Ohne eigenes `noindex`, durch `robots.txt` blockiert.
- **`/mockups/_archive/*.html`** — nicht aktiv verlinkt, aber im selben blockierten Verzeichnis (Belt-and-Suspenders-Risk falls Hero-Refactor künftig auf `_archive` zugreift).

## 3. Fix-Strategie (angewendet)

**Pages, die public verlinkt sind**, erhalten ihr eigenes `<meta name="robots" content="noindex,nofollow">` und werden aus dem `robots.txt`-Disallow entfernt. So:

- Google darf die Page crawlen.
- Google liest das `noindex` aus dem HTML.
- Google entfernt die Page (oder lässt sie gar nicht erst rein) — ohne Warnung in Search Console.

**Pages, die NICHT public verlinkt sind**, bleiben in `robots.txt` blockiert (defense-in-depth):

| Page | Verlinkt? | Strategie |
|---|---|---|
| `/cockpit/` | ja (Hero + Sticky-Links) | noindex meta vorhanden, aus `robots.txt` entfernt |
| `/mockups/product-*.html` (4) | ja (iframes + anchors) | noindex meta hinzugefügt, aus `robots.txt` entfernt |
| `/mockups/_archive/*.html` (10) | nein | noindex meta hinzugefügt (defensiv), aus `robots.txt` entfernt |
| `/archive/v1.html` | nein | noindex meta hinzugefügt (defensiv), bleibt in `robots.txt`-Disallow |
| `/scan-options.html` | nein | noindex meta vorhanden, bleibt in `robots.txt`-Disallow |
| `/design/` | nein (nur .md-Files) | bleibt in `robots.txt`-Disallow |

## 4. Single Source of Truth

Die Domain-Konfiguration ist eindeutig:

- **Canonical Origin:** `https://couvert.ai/` (kein `www`)
- **CNAME:** `couvert.ai` (siehe `docs/CNAME`)
- **Sprach-Varianten:** `https://couvert.ai/` (DE, x-default) und `https://couvert.ai/en/` (EN), bidirektional via `<link rel="alternate" hreflang="...">`
- **Sitemap:** `https://couvert.ai/sitemap.xml`

Es gibt **keine** alternativen Domains (kein `www.couvert.ai`, kein `*.vercel.app` als Public-Origin), die Google kennen würde — daher kein Domain-Konsolidierungs-Aufwand.

## 5. Bekannte offene Punkte (nicht blockierend)

| Item | Severity | Aktion |
|---|---|---|
| `og:image` fehlt auf allen Pages | P1 | 1200×630 PNG erstellen, in HTML-Heads referenzieren — siehe `SEO_CHECKLIST.md` §6 |
| `twitter:image` fehlt | P1 | siehe oben (Twitter teilt og:image als Fallback) |
| Hreflang-Tags auf DE-only-Pages | P3 | erst nach EN-Mirror-Build relevant |
| `archive/v1.html` strukturierte Daten zeigen alte „Couvert GmbH" | P2 | historische Page, blockiert + noindex — irrelevant für Index, aber Brand-Drift in JSON-LD bleibt bestehen |

## 6. Nächste Schritte (Search Console)

Nach Push und Deploy:

1. **`robots.txt` validieren** in Search Console → „Einstellungen" → „robots.txt-Bericht"
2. **`sitemap.xml` re-submitten** — `lastmod` ist auf 2026-04-30 für `preise.html`, andere unverändert
3. **URL-Prüfung** für die zuvor blockierten Pfade:
   - `https://couvert.ai/cockpit/` → erwartet: „URL ist nicht bei Google" + „noindex erkannt"
   - `https://couvert.ai/mockups/product-reviews.html` → erwartet: dasselbe
4. **„Indexierung beantragen"** für die gewünschten Public-Pages, falls sie noch nicht erfasst sind:
   - `https://couvert.ai/`
   - `https://couvert.ai/en/`
   - `https://couvert.ai/preise.html`
   - `https://couvert.ai/team.html`
   - `https://couvert.ai/methodik.html`
   - `https://couvert.ai/ablauf.html`
   - `https://couvert.ai/fallbeispiel.html`
   - `https://couvert.ai/geschichte.html`
   - `https://couvert.ai/beispiel-report/`
   - `https://couvert.ai/en/example-report/`
5. **2 Wochen warten**, dann Search Console → „Seiten" → Verteilung prüfen. Die „Indexed though blocked by robots.txt"-Kategorie sollte auf 0 fallen.

## 7. Audit-Trail

| File | Änderung |
|---|---|
| `docs/mockups/_archive/*.html` (10 files) | `<meta name="robots" content="noindex,nofollow">` ergänzt |
| `docs/mockups/product-{competitor,report,reviews,shift}.html` (4 files) | dito |
| `docs/archive/v1.html` | dito |
| `docs/robots.txt` | `Disallow: /cockpit/` und `Disallow: /mockups/` entfernt; Header-Kommentar mit Begründung ergänzt |
| `docs/SEO_NOTES.md` | dieses Dokument |

`docs/SEO_CHECKLIST.md` bleibt unverändert (deckt die strategische Search-Console-Setup-Pipeline ab, ergänzt sich mit diesem File).
