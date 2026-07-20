# couvert.ai (LEGACY / ARCHIV seit 2026-07-20)

**Dieses Repo serviert die Domain couvert.ai NICHT mehr.**

- Die Domain couvert.ai wird von **Lovable** gehostet (Custom Domain, DNS
  185.158.133.1). Quelle der Live-Site ist das Repo **couvert-lovable**;
  deployen kann ausschliesslich Max per Publish-Klick im Lovable-Editor.
- MV-Entscheid 2026-07-20 (Weg A): Lovable-Hosting bestaetigt,
  `lovable_export_to_static_hosting` (Option B) verworfen. Kanonisch:
  `couvert-platform/docs/context/couvert-company-brain.yaml` v7,
  `runtime_source_of_truth.marketing_surface`.
- Der GitHub-Pages-Build aus `docs/` laeuft technisch weiter, ist aber ohne
  DNS-Eintrag nicht oeffentlich erreichbar. Letzter inhaltlicher Stand:
  `e5ff99c` (Sprint S9, Landing auf Snapshot-Einstieg) - als Historie behalten.
- KEINE neuen Inhalts-Aenderungen in diesem Repo ohne expliziten MV-Entscheid;
  Landing-Arbeit passiert in couvert-lovable.

Serving-Pfad-Regel (verbindlich): Vor jedem publish-nahen Sprint den
Serving-Pfad LIVE verifizieren (`dig couvert.ai` + `curl` auf Shell/Assets),
nie aus einer Registry uebernehmen.
