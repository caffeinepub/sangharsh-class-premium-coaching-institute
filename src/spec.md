# Specification

## Summary
**Goal:** Add a dedicated “About Sangharsh Classes” page at /about with exact provided content and SEO metadata, while removing the About content from the homepage to avoid duplication.

**Planned changes:**
- Create a new /about route/page and render the user-provided About content only on this page.
- Remove the About content/section from the homepage so it is not visible on / and not duplicated across routes.
- On /about, set a single H1 exactly to: "About Sangharsh Classes".
- On /about, set SEO metadata exactly: title tag "About Sangharsh Classes | SSC, Railway & Banking Coaching in Muzaffarpur" and meta description "Learn about Sangharsh Classes, a trusted SSC, Railway and Banking coaching institute in Muzaffarpur with experienced faculty and proven results."
- Update frontend/public/sitemap.xml to include an /about URL entry while keeping the existing homepage entry unchanged.
- Update static export generation so homepage output does not embed About-only content and an About page HTML output is generated with the required H1/SEO and verbatim body content.
- Ensure /about contains no system/debug/AI/platform branding text in UI or static export output.

**User-visible outcome:** Visitors can navigate to /about to read the About Sangharsh Classes content with correct page title/description, while the homepage no longer displays that About section.
