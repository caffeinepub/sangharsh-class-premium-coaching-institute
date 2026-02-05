# Specification

## Summary
**Goal:** Generate/overwrite a valid XML sitemap for sangharshclasses.in using only existing frontend routes.

**Planned changes:**
- Create/overwrite `frontend/public/sitemap.xml` in valid sitemap protocol XML format.
- Populate the sitemap with absolute `<loc>` URLs rooted at `https://sangharshclasses.in` for existing frontend pages/routes only (no invented routes and no `#` fragments).

**User-visible outcome:** The site has a publicly accessible sitemap at `https://sangharshclasses.in/sitemap.xml`.
