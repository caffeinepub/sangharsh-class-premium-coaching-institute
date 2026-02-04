# Specification

## Summary
**Goal:** Provide an offline-capable static export of the current marketing homepage and a UI button to download the full website source code as a ZIP.

**Planned changes:**
- Generate a static, offline-ready export of the current single-page marketing site with the exact package structure: `index.html`, `css/style.css`, `js/script.js`, `assets/images/`.
- Ensure the exported HTML/CSS/JS matches the live React homepage content, sections, text, layout, and key interactions (navigation scroll links, WhatsApp action) without relying on external CDN dependencies.
- Add a visible homepage button labeled exactly **"Download Website Code"** that downloads the ZIP containing the static export structure.
- Serve the ZIP as a static frontend asset with a stable filename and appropriate download behavior (no backend calls, no auth required).

**User-visible outcome:** Visitors can click **"Download Website Code"** to download a ZIP of the complete current website source that works offline when unzipped and opened via `index.html`.
