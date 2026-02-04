# Specification

## Summary
**Goal:** Fix missing/incorrect favicon and ensure Google can detect the site logo by serving favicon files from the domain root, adding correct `<head>` tags, and providing minimal structured data.

**Planned changes:**
- Add favicon assets generated from the existing Sangharsh Classes logo to `frontend/public/` so they are published at `/favicon.png` and optionally `/favicon.ico`.
- Update `frontend/index.html` `<head>` to include favicon `<link>` tags (at minimum PNG; ICO if shipped).
- Add minimal JSON-LD structured data in `frontend/index.html` for Organization (or equivalent) referencing an absolute logo URL on `https://sangharshclasses.in/`.
- Update hosting/routing config to ensure `/favicon.png` (and `/favicon.ico` if present) are excluded from SPA fallback rewrites and are served with appropriate content-type and non-excessive caching rules.
- Redeploy and verify in production that favicon URLs return HTTP 200 with image/icon content and the site renders unchanged.

**User-visible outcome:** The site shows the correct favicon (including in search/browser tabs), and `/favicon.png` (and `/favicon.ico` if provided) reliably load from `https://sangharshclasses.in/` without being rewritten to the SPA.
