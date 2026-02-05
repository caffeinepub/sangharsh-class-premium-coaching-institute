# Deployment Verification Checklist

Use this checklist before and after each deployment to prevent blank-screen regressions.

## Pre-Deploy Checks

### 1. Clean Build Validation
- [ ] Delete existing `dist/` folder: `rm -rf frontend/dist`
- [ ] Run clean build: `cd frontend && npm run build`
- [ ] **CRITICAL:** Verify build completes without errors or warnings
- [ ] **CRITICAL:** Check build logs for "[Static Export] ✓ Complete" message
- [ ] **CRITICAL:** Check build logs for "[Build Verification] ✓" messages (no errors)
- [ ] **CRITICAL:** Confirm `frontend/dist/index.html` exists at the root of `dist/`
- [ ] **CRITICAL:** Confirm `frontend/dist/assets/` folder exists with hashed JS/CSS files
- [ ] **CRITICAL:** Confirm `frontend/dist/website-code.zip` exists and is not empty
- [ ] Open `dist/index.html` in a text editor and verify:
  - Script tags reference `./assets/[name]-[hash].js` (NOT `/src/main.tsx`)
  - Link tags reference `./assets/[name]-[hash].css`
  - No references to source files (`/src/`)

### 2. Build Error Diagnosis
If build fails, check the error output carefully:
- [ ] **ZIP Generation Errors:** Look for "[Static Export]" prefixed error messages
  - "Output stream error" or "Archiver error" indicates file system or permission issues
  - "ZIP file was not created" or "ZIP file is empty" indicates archiver failure
  - Solution: Clear `dist/` folder and retry; check disk space and permissions
- [ ] **Asset Copy Errors:** Look for "Asset not found" warnings
  - Indicates missing files in `frontend/public/assets/`
  - Solution: Verify all required assets exist in public folder
- [ ] **Build Verification Errors:** Look for "[Build Verification] ❌" messages
  - "dist/index.html appears to be source file" indicates Vite config issue
  - "Missing required files" indicates public folder files not copied
  - Solution: Check `vite.config.ts` base path and public folder contents

### 3. Publish Directory Configuration
- [ ] **CRITICAL:** Verify `.ic-assets.json` exists in `frontend/` directory
- [ ] **CRITICAL:** Verify hosting/deployment configuration publishes ONLY `frontend/dist/`
- [ ] Confirm `index.html` will be served from the root of the published output (not nested)
- [ ] Verify no source folders (`frontend/src/`, `frontend/public/`, etc.) are deployed
- [ ] Check that static files from `frontend/public/` are copied into `dist/` during build:
  - `dist/404.html`
  - `dist/sitemap.xml`
  - `dist/robots.txt`
  - `dist/_redirects`
  - `dist/_headers`
  - `dist/google53082ab74af04c28.html`
  - `dist/favicon.png`
  - `dist/favicon.ico`
  - `dist/website-code.zip`

### 4. Repository Audit (Remove Broken Config)
- [ ] Verify NO deployment config files point to wrong output directory (e.g., `build/` for CRA)
- [ ] Confirm `.ic-assets.json` is the authoritative config for IC deployments
- [ ] Check that no config attempts to publish source directories instead of `dist/`
- [ ] Remove or disable any conflicting deployment settings

### 5. Local Production Preview
- [ ] Serve the built `dist/` folder locally: `npx serve frontend/dist`
- [ ] Open in browser (typically http://localhost:3000)
- [ ] **CRITICAL:** Verify homepage renders completely (not blank white screen)
- [ ] Check browser DevTools Console:
  - No uncaught exceptions
  - No "Failed to load module" errors
  - Runtime diagnostics logs appear
  - SEO guard initialization log appears
- [ ] Check Network tab:
  - All JS bundles load successfully (200 status, NOT 404)
  - All CSS bundles load successfully (200 status, NOT 404)
  - No MIME type errors
  - Assets load from `./assets/` paths

### 6. SPA Fallback Test (Local)
- [ ] While serving `dist/`, navigate directly to a non-root path (e.g., `http://localhost:3000/about`)
- [ ] Verify the app loads (not a 404 or blank page)
- [ ] Check that `404.html` redirects to root and the app handles the route

### 7. Code Quality
- [ ] No `console.error` or uncaught exceptions in Console
- [ ] Error boundary is in place (check `App.tsx` wraps content with `AppErrorBoundary`)
- [ ] Runtime diagnostics are enabled (check `runtimeDiagnostics.ts` logs appear)
- [ ] SEO guards are initialized (check `seoGuards.ts` logs appear)

## Post-Deploy Checks

### 8. Production Site Verification (Anonymous User)
- [ ] Navigate to production URL (canister or custom domain)
- [ ] **CRITICAL:** Homepage renders (NOT blank white screen)
- [ ] Verify all sections visible: Header, Hero, About, Faculty, Courses, Contact, Footer
- [ ] WhatsApp floating button appears
- [ ] Browser Console shows no uncaught errors
- [ ] **CRITICAL:** Network tab audit:
  - Main JS entry bundle loads (200 status, NOT 404)
  - CSS bundle loads (200 status, NOT 404)
  - All assets load successfully
  - No "Failed to fetch" or CORS errors

### 9. Hard Refresh Test
- [ ] Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- [ ] Reload page
- [ ] Verify homepage still renders correctly (not blank)
- [ ] Check Console and Network tabs again (should be clean)

### 10. Deep Link / SPA Fallback Test (Production)
- [ ] Navigate directly to a non-root path (e.g., `https://yourdomain.com/about`)
- [ ] Verify the app loads (not a 404 or blank page)
- [ ] Check Console for any routing errors
- [ ] Verify `404.html` fallback is working correctly

### 11. Custom Domain Test
- [ ] Navigate to `https://sangharshclasses.in/`
- [ ] Verify homepage renders identically to canister URL
- [ ] Check Console and Network tabs (should match canister behavior)
- [ ] Test deep link on custom domain
- [ ] Verify HTTPS is working (padlock icon in browser)
- [ ] Check SSL certificate is valid

### 12. WWW Subdomain Test
- [ ] Navigate to `https://www.sangharshclasses.in/`
- [ ] **CRITICAL:** Verify it returns HTTP 301 redirect to `https://sangharshclasses.in/`
- [ ] Test with curl: `curl -I https://www.sangharshclasses.in/`
- [ ] Verify `Location:` header points to `https://sangharshclasses.in/`
- [ ] Test deep path: `https://www.sangharshclasses.in/test?x=1`
- [ ] Verify it redirects to `https://sangharshclasses.in/test?x=1` (path and query preserved)

### 13. Caffeine Subdomain Redirect Test
- [ ] Navigate to `https://sangharsh-classes-coaching-9ew.caffeine.xyz/`
- [ ] **CRITICAL:** Verify it returns HTTP 301 redirect to `https://sangharshclasses.in/`
- [ ] Test with curl: `curl -I https://sangharsh-classes-coaching-9ew.caffeine.xyz/`
- [ ] Verify `Location:` header points to `https://sangharshclasses.in/`
- [ ] Test deep path: `https://sangharsh-classes-coaching-9ew.caffeine.xyz/test?x=1`
- [ ] Verify it redirects to `https://sangharshclasses.in/test?x=1` (path and query preserved)
- [ ] Confirm no redirect loops occur

### 14. Canonical URL and SEO Tags Verification
- [ ] Visit `https://sangharshclasses.in/` in browser
- [ ] Right-click and select "View Page Source"
- [ ] **CRITICAL:** Verify `<link rel="canonical" href="https://sangharshclasses.in/" />` is present
- [ ] **CRITICAL:** Verify `<meta property="og:url" content="https://sangharshclasses.in/" />` is present
- [ ] **CRITICAL:** Verify NO `<meta name="robots" content="noindex, nofollow">` tag is present
- [ ] Verify NO references to `sangharsh-classes-coaching-9ew.caffeine.xyz` in canonical or og:url tags
- [ ] Check browser Console for SEO guard log: "Running on custom domain - indexing allowed"

### 15. Caffeine Subdomain SEO Guard Test (if accessible without redirect)
- [ ] If Caffeine subdomain is accessible (before redirect is configured), visit it
- [ ] Right-click and select "View Page Source"
- [ ] Verify `<meta name="robots" content="noindex, nofollow" />` is present
- [ ] Verify `<link rel="canonical" href="https://sangharshclasses.in/" />` points to custom domain
- [ ] Verify `<meta property="og:url" content="https://sangharshclasses.in/" />` points to custom domain
- [ ] Check browser Console for SEO guard log: "Running on Caffeine subdomain - noindex applied"

### 16. Authentication Flow (Logged-In User)
- [ ] Click Login/Connect button
- [ ] Complete Internet Identity authentication
- [ ] Verify app still renders after login (no crash or blank screen)
- [ ] Check Console for any auth-related errors

### 17. Missing Token Test (Logged-In Without Admin Token)
- [ ] Log in without `caffeineAdminToken` in URL hash
- [ ] Verify homepage still renders (public UI not blocked)
- [ ] Check Console: should see "[useActor] Skipping access control initialization (no token)"
- [ ] No crash or blank screen

### 18. Mobile Verification
- [ ] Open production site on mobile device (or DevTools mobile emulation)
- [ ] Verify responsive layout works
- [ ] Check Console for mobile-specific errors
- [ ] Test navigation and interactions

### 19. Sitemap & Robots.txt Verification
- [ ] **CRITICAL:** Verify `frontend/dist/sitemap.xml` exists after build
- [ ] **CRITICAL:** Verify `frontend/dist/robots.txt` exists after build
- [ ] Navigate to `https://sangharshclasses.in/sitemap.xml` in production
- [ ] **CRITICAL:** Verify sitemap returns HTTP 200 (NOT 404 or 3xx redirect)
- [ ] **CRITICAL:** Verify response body is raw XML (starts with `<?xml version="1.0"`)
- [ ] Verify response does NOT contain HTML markers (`<!DOCTYPE html>`, `<html>`)
- [ ] Check HTTP headers using browser DevTools Network tab or `curl -I`:
  - `Content-Type: application/xml` (or `application/xml; charset=utf-8`)
  - NOT `Content-Type: text/html`
- [ ] Verify all `<loc>` entries use only `https://sangharshclasses.in/` (no caffeine.xyz references)
- [ ] Navigate to `https://sangharshclasses.in/robots.txt` in production
- [ ] **CRITICAL:** Verify robots.txt returns HTTP 200 with plain text content
- [ ] Verify robots.txt contains `Sitemap: https://sangharshclasses.in/sitemap.xml`
- [ ] Verify NO references to `caffeine.xyz` in robots.txt
- [ ] Test in Google Search Console:
  - Submit sitemap URL
  - Verify no "Incorrect HTTP header content-type" errors
  - Confirm sitemap is successfully fetched and parsed

### 20. SEO Title & Meta Description Verification
- [ ] **CRITICAL:** View live homepage HTML source (right-click → View Page Source)
- [ ] Verify `<title>` tag exactly equals: `Sangharsh Classes | Sangharsh Classes Muzaffarpur`
- [ ] Verify NO occurrences of "Premium Coaching Institute" in the HTML source
- [ ] Verify `<meta name="description">` tag exists with non-empty content
- [ ] Verify `<meta name="title">` tag contains: `Sangharsh Classes | Sangharsh Classes Muzaffarpur`
- [ ] Verify `<meta property="og:title">` tag contains: `Sangharsh Classes | Sangharsh Classes Muzaffarpur`
- [ ] **Google Search Console Re-crawl:**
  - Navigate to Google Search Console (https://search.google.com/search-console)
  - Use URL Inspection tool for `https://sangharshclasses.in/`
  - Click "Request Indexing" to trigger immediate re-crawl
  - Note: Verification file already exists at `frontend/public/google53082ab74af04c28.html`
  - Wait 24-48 hours for Google to update search results with new title

### 21. Favicon Verification
- [ ] **CRITICAL:** Verify `frontend/dist/favicon.png` exists after build
- [ ] **CRITICAL:** Verify `frontend/dist/favicon.ico` exists after build
- [ ] Navigate to `https://sangharshclasses.in/favicon.png` in production
- [ ] **CRITICAL:** Verify favicon.png returns HTTP 200 with image content (NOT HTML)
- [ ] Verify response does NOT contain HTML markers (`<!DOCTYPE html>`, `<html>`)
- [ ] Check HTTP headers using browser DevTools Network tab or `curl -I`:
  - `Content-Type: image/png`
  - NOT `Content-Type: text/html`
- [ ] Navigate to `https://sangharshclasses.in/favicon.ico` in production
- [ ] **CRITICAL:** Verify favicon.ico returns HTTP 200 with icon/image content (NOT HTML)
- [ ] Check HTTP headers:
  - `Content-Type: image/x-icon` (or `image/vnd.microsoft.icon`)
  - NOT `Content-Type: text/html`
- [ ] View page source and verify favicon link tags are present:
  - `<link rel="icon" href="/favicon.ico" type="image/x-icon" />`
  - `<link rel="icon" href="/favicon.png" type="image/png" />`
- [ ] Verify JSON-LD structured data includes logo URL:
  - Check for `"logo": "https://sangharshclasses.in/favicon.png"` in Organization schema
- [ ] Check browser tab shows favicon icon (may need to clear cache)
- [ ] Test in incognito/private browsing mode to verify favicon loads without cache
- [ ] **Google Search Console:**
  - Use URL Inspection tool for `https://sangharshclasses.in/`
  - Click "Request Indexing" to trigger re-crawl with new favicon/logo
  - Wait 1-2 weeks for Google to update search results with logo

### 22. Google Search Console Verification File Test
- [ ] Navigate to `https://sangharshclasses.in/google53082ab74af04c28.html` in production
- [ ] **CRITICAL:** Verify file returns HTTP 200 with text content (NOT HTML redirect)
- [ ] Verify response contains: `google-site-verification: google53082ab74af04c28.html`
- [ ] Verify response does NOT contain HTML markers (`<!DOCTYPE html>`, `<html>`)
- [ ] Check HTTP headers:
  - `Content-Type: text/html` or `text/plain` (both acceptable)
  - NOT a redirect (3xx status)
- [ ] Test Google Search Console verification:
  - Go to [Google Search Console](https://search.google.com/search-console)
  - Add property for `https://sangharshclasses.in`
  - Select "HTML file" verification method
  - Click "Verify" - should succeed

### 23. Website Code Download Test
- [ ] Navigate to `https://sangharshclasses.in/website-code.zip` in production
- [ ] **CRITICAL:** Verify file downloads successfully (NOT 404 or HTML)
- [ ] Check HTTP headers:
  - `Content-Type: application/zip`
  - `Content-Disposition: attachment; filename="sangharsh-classes-website.zip"`
- [ ] Verify downloaded ZIP file is not empty (check file size > 0)
- [ ] Extract ZIP and verify it contains:
  - `index.html` (static version)
  - `css/style.css`
  - `js/script.js`
  - `assets/images/` folder with images
- [ ] Open extracted `index.html` in browser and verify it displays correctly

### 24. Domain Setup Documentation Cross-Reference
- [ ] Review `DOMAIN_SETUP.md` for complete DNS and redirect configuration
- [ ] Verify all DNS records are configured as documented
- [ ] Confirm redirect behavior matches documented canonical host strategy:
  - Apex domain (`sangharshclasses.in`) is the canonical host
  - WWW subdomain redirects to apex with 301
  - Caffeine subdomain redirects to apex with 301
  - All redirects preserve path and query string
- [ ] Verify SEO canonicalization is working as documented

## Clean Redeploy Procedure

When deployment fails or you need to redeploy from scratch:

### 25. Clear Deployment Cache and Rebuild
- [ ] Delete local build artifacts: `rm -rf frontend/dist`
- [ ] Clear any deployment platform cache (if applicable)
- [ ] Run fresh production build: `cd frontend && npm run build`
- [ ] **CRITICAL:** Check build output for success messages:
  - "[Static Export] ✓ Complete"
  - "[Build Verification] ✓ dist/index.html contains hashed asset references"
  - "[Build Verification] ✓ All required static files present in dist/"
- [ ] Verify `dist/` folder contains:
  - `index.html` at root
  - `assets/` folder with hashed JS/CSS files
  - All static files from `public/` (404.html, sitemap.xml, robots.txt, favicon.png, favicon.ico, google53082ab74af04c28.html, etc.)
  - `website-code.zip` (non-empty)
- [ ] Deploy ONLY the `frontend/dist/` folder contents
- [ ] Verify deployment publishes `dist/` as the web root (not nested)

### 26. Troubleshooting Build Errors
If the build fails with TypeScript or Vite errors:
- [ ] Check Console output for specific error messages
- [ ] Look for "[Static Export]" or "[Build Verification]" prefixed errors
- [ ] Verify all imports are correct and files exist
- [ ] Check for TypeScript type errors: `cd frontend && npm run typescript-check`
- [ ] Ensure all dependencies are installed: `cd frontend && npm install`
- [ ] Clear node_modules and reinstall if needed: `rm -rf node_modules && npm install`
- [ ] Check that `vite.config.ts` is valid and not corrupted
- [ ] Verify `base: './'` is at top level of Vite config (not nested in build object)
- [ ] If ZIP generation fails:
  - Check disk space: `df -h`
  - Check write permissions: `ls -la frontend/dist/`
  - Try manual ZIP creation: `cd frontend/dist && zip -r test.zip static-export/`

## Rollback Criteria

If any of the following occur, **IMMEDIATELY ROLL BACK**:
- Blank white screen on production
- Uncaught exceptions in Console on initial load
- Main JS/CSS assets fail to load (404 errors)
- Homepage sections fail to render
- Hard refresh breaks the site
- Deep links result in 404 or blank pages
- Sitemap.xml returns HTML instead of XML
- Sitemap.xml returns 404 or wrong Content-Type
- Favicon files return HTML instead of image content
- Favicon files return 404
- Google verification file returns HTML redirect instead of verification content
- Website-code.zip returns 404 or HTML
- Custom domain redirect loops
- Caffeine subdomain does not redirect to custom domain
- WWW subdomain does not redirect to apex domain

## Common Issues & Fixes

### Blank White Screen
- **Cause:** Wrong publish directory or `base` config in `vite.config.ts`
- **Fix:** Ensure `base: './'` is at top level of Vite config (NOT inside `build` object)
- **Fix:** Verify publish directory is `frontend/dist` (not `frontend/` or repo root)
- **Fix:** Check `.ic-assets.json` exists and is properly configured

### 404 for JS/CSS Assets
- **Cause:** Incorrect asset paths in built `index.html`
- **Fix:** Check `base` config in `vite.config.ts` is at top level
- **Fix:** Verify `dist/index.html` references `./assets/` paths (not absolute `/assets/`)
- **Fix:** Ensure `emptyOutDir: true` in Vite config to prevent stale files

### Deep Links Show 404
- **Cause:** Missing SPA fallback configuration
- **Fix:** Ensure `frontend/public/404.html` exists and is deployed
- **Fix:** Configure hosting to serve `404.html` for missing routes
- **Fix:** Verify `.ic-assets.json` doesn't block 404.html

### Source Files Deployed Instead of Build
- **Cause:** Wrong publish directory
- **Fix:** Set publish directory to `frontend/dist` (not `frontend/`)
- **Fix:** Verify `dist/index.html` contains hashed asset references (not `/src/main.tsx`)
- **Fix:** Check `.ic-assets.json` configuration

### Build Fails During ZIP Generation
- **Cause:** Race condition in archive stream handling or file system issues
- **Fix:** The updated `vite.config.ts` now properly awaits stream completion
- **Fix:** Check disk space and write permissions
- **Fix:** Clear `dist/` folder and retry: `rm -rf frontend/dist && npm run build`
- **Fix:** If persistent, check for antivirus or file locking issues

### ZIP File Empty or Corrupted
- **Cause:** Archive finalized before stream finished writing
- **Fix:** The updated `vite.config.ts` now waits for output stream 'close' event
- **Fix:** Verify build logs show "[Static Export] ZIP created successfully: X bytes"
- **Fix:** Check that `dist/website-code.zip` exists and has size > 0

### Sitemap Returns HTML Instead of XML
- **Cause:** SPA fallback redirecting sitemap.xml to index.html
- **Fix:** Ensure `404.html` excludes `/sitemap.xml` from redirect logic
- **Fix:** Add `_redirects` file to explicitly serve sitemap.xml as static file
- **Fix:** Add `_headers` file to set `Content-Type: application/xml` for sitemap.xml
- **Fix:** Verify `.ic-assets.json` has correct Content-Type for sitemap.xml

### Sitemap Shows "Incorrect HTTP header content-type" in Google Search Console
- **Cause:** Server serving sitemap.xml with `text/html` Content-Type
- **Fix:** Add `_headers` file in `frontend/public/` with XML Content-Type directive
- **Fix:** Verify `.ic-assets.json` has correct headers for sitemap.xml
- **Fix:** If hosting doesn't support headers, configure Content-Type in hosting settings

### Favicon Returns HTML Instead of Image
- **Cause:** SPA fallback redirecting favicon files to index.html
- **Fix:** Ensure `404.html` excludes `/favicon.png` and `/favicon.ico` from redirect logic
- **Fix:** Add `_redirects` file to explicitly exclude favicon files
- **Fix:** Add `_headers` file to set correct Content-Type for favicon files
- **Fix:** Verify `.ic-assets.json` has correct Content-Type for favicon.png and favicon.ico
- **Fix:** Check that favicon files exist in `frontend/public/` and are copied to `dist/` during build

### Favicon Not Showing in Browser Tab
- **Cause:** Browser cache or incorrect favicon path
- **Fix:** Clear browser cache and hard refresh (Ctrl+Shift+R)
- **Fix:** Test in incognito/private browsing mode
- **Fix:** Verify favicon link tags in `<head>` section of index.html
- **Fix:** Check Network tab to confirm favicon files load with HTTP 200
- **Fix:** Ensure favicon files are at domain root (not in subdirectory)

### Logo Not Appearing in Google Search Results
- **Cause:** Google hasn't crawled the updated site or structured data is missing
- **Fix:** Verify JSON-LD structured data includes logo URL in Organization schema
- **Fix:** Request indexing in Google Search Console
- **Fix:** Ensure favicon files are accessible at root domain (https://sangharshclasses.in/favicon.png)
- **Fix:** Wait 1-2 weeks for Google to re-crawl and update search results
- **Fix:** Verify og:image meta tag includes logo URL

### Google Verification File Returns HTML
- **Cause:** SPA fallback redirecting verification file to index.html
- **Fix:** Ensure `404.html` excludes `/google53082ab74af04c28.html` from redirect logic
- **Fix:** Verify file exists in `frontend/public/` and is copied to `dist/` during build
- **Fix:** Check that file contains correct verification content (not empty)
- **Fix:** Add `_redirects` file to explicitly serve verification file as static file

### Custom Domain Not Resolving
- **Cause:** DNS records not configured or not propagated
- **Fix:** Verify DNS records in Hostinger (see DOMAIN_SETUP.md)
- **Fix:** Wait for DNS propagation (up to 48 hours)
- **Fix:** Clear browser and DNS cache

### Caffeine Subdomain Not Redirecting
- **Cause:** Redirect rule not configured in Caffeine dashboard
- **Fix:** Configure 301 redirect in Caffeine project settings (see DOMAIN_SETUP.md)
- **Fix:** Ensure path and query string preservation is enabled
- **Fix:** Clear browser cache and test in incognito mode

### WWW Subdomain Not Redirecting
- **Cause:** Redirect rule not configured or DNS not pointing correctly
- **Fix:** Configure 301 redirect from www to apex (see DOMAIN_SETUP.md)
- **Fix:** Verify CNAME record for www subdomain points to correct target
- **Fix:** Clear browser cache and test with curl

### SEO Tags Showing Wrong Domain
- **Cause:** SEO guards not initialized or cached HTML
- **Fix:** Verify SEO guard initialization in browser Console
- **Fix:** Clear browser cache and hard refresh
- **Fix:** Verify latest deployment includes seoGuards.ts updates

### Deployment Error: "Failed to deploy to production"
- **Cause:** Missing `.ic-assets.json` configuration file or build artifacts
- **Fix:** Create `.ic-assets.json` in `frontend/` directory
- **Fix:** Ensure file contains valid JSON with proper asset configuration
- **Fix:** Clear deployment cache and redeploy from scratch
- **Fix:** Verify `dist/` folder exists and contains all required files before deployment
- **Fix:** Check build logs for "[Static Export]" and "[Build Verification]" errors

### Actor Initialization Crash (Missing Admin Token)
- **Cause:** `_initializeAccessControlWithSecret` called without token, causing trap
- **Fix:** Verify `useActor.ts` only calls initialization when `caffeineAdminToken` is present
- **Fix:** Wrap initialization in try/catch to handle failures gracefully
- **Fix:** Check Console for "[useActor] Skipping access control initialization (no token)" message
- **Fix:** Ensure public pages render even when initialization fails

## Notes
- Keep this checklist updated as new critical features are added
- Document any deployment-specific configuration (environment variables, build flags, etc.)
- If a regression occurs, add a new checklist item to prevent it in the future
- Always test locally with `npx serve dist` before deploying to production
- For Internet Computer deployments, `.ic-assets.json` is REQUIRED to configure asset serving
- Refer to `DOMAIN_SETUP.md` for detailed custom domain configuration instructions
- Favicon files must be placed in `frontend/public/` to be copied to `dist/` during build
- Google may take 1-2 weeks to update search results with new logo/favicon after re-crawling
- Google Search Console verification file must be accessible as a static file (not redirected)
- All static files (sitemap, robots.txt, favicon, verification file) must be excluded from SPA fallback
- The static export ZIP generation now properly awaits stream completion to prevent race conditions
- Build verification checks are now integrated into the build process for early error detection
