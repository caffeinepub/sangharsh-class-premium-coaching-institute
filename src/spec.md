# Specification

## Summary
**Goal:** Ensure `/sitemap.xml` is a valid static XML file in production and is served with the correct XML content-type (not `text/html` or SPA fallback HTML).

**Planned changes:**
- Create/replace `frontend/public/sitemap.xml` with a valid, non-empty XML sitemap so it is emitted as `dist/sitemap.xml` on build.
- Update SPA fallback / hosting rewrite behavior so `/sitemap.xml` is excluded from rewrites and is served directly as a static asset with HTTP 200 (no redirect, no fallback HTML).
- Ensure `/sitemap.xml` is served with `Content-Type: application/xml` (or equivalent XML MIME type) in production.
- Populate `frontend/public/robots.txt` to reference `https://<production-origin>/sitemap.xml` and ensure it is emitted as `dist/robots.txt`.
- Add deployment verification steps in `frontend/DEPLOYMENT_CHECKLIST.md` to confirm `dist/sitemap.xml` exists and `/sitemap.xml` returns raw XML with HTTP 200 and the correct `Content-Type`.

**User-visible outcome:** Visiting `https://<production-origin>/sitemap.xml` returns raw XML with the correct `Content-Type`, and search engines can reliably discover it via `robots.txt` without being served the SPA HTML.
