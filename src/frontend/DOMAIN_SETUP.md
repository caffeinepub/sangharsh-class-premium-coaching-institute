# Custom Domain Setup Guide

This guide provides step-by-step instructions for configuring the custom domain `sangharshclasses.in` with your Caffeine-hosted application.

## Overview

- **Primary Domain (Canonical):** `https://sangharshclasses.in/`
- **WWW Subdomain:** `https://www.sangharshclasses.in/`
- **Caffeine Subdomain:** `https://sangharsh-classes-coaching-9ew.caffeine.xyz/`

**Canonical Host Strategy:** All traffic should be served from or redirected to `https://sangharshclasses.in/` (apex domain without www) with proper SEO canonicalization.

**Redirect Behavior:**
- `www.sangharshclasses.in` → 301 redirect to `https://sangharshclasses.in/`
- `sangharsh-classes-coaching-9ew.caffeine.xyz` → 301 redirect to `https://sangharshclasses.in/`
- All redirects preserve path and query string (e.g., `/about?x=1` → `/about?x=1`)

## Prerequisites

- Access to your domain registrar (Hostinger) DNS settings
- Access to Caffeine project dashboard
- Deployment must use `frontend/dist/` as the publish directory (NOT source files)
- `.ic-assets.json` must be present in `frontend/` directory for proper asset serving

## Step 1: Configure DNS Records in Hostinger

Log in to your Hostinger account and navigate to the DNS Zone Editor for `sangharshclasses.in`.

### Required DNS Records

Add the following DNS records:

#### A Record (Apex Domain)

**Type:** A  
**Name:** `@` (or leave blank for apex domain)  
**Value:** `[IP address provided by Caffeine]`  
**TTL:** 3600 (or default)

*Note: Get the exact IP address from your Caffeine project dashboard under "Custom Domain" settings.*

#### CNAME Record (WWW Subdomain)

**Type:** CNAME  
**Name:** `www`  
**Value:** `sangharsh-classes-coaching-9ew.caffeine.xyz.` (note the trailing dot)  
**TTL:** 3600 (or default)

*Alternative: If Caffeine provides a specific CNAME target for www, use that instead.*

#### TXT Record (Domain Verification - Optional)

If Caffeine requires domain verification via TXT record:

**Type:** TXT  
**Name:** `@` (or as specified by Caffeine)  
**Value:** `[verification string provided by Caffeine]`  
**TTL:** 3600

### DNS Propagation

- DNS changes can take up to 48 hours to propagate globally
- Use `nslookup sangharshclasses.in` or `dig sangharshclasses.in` to verify DNS resolution
- Test from multiple locations using online DNS checkers (e.g., whatsmydns.net)

## Step 2: Configure Custom Domain in Caffeine Dashboard

1. Log in to your Caffeine project dashboard
2. Navigate to **Settings** → **Custom Domain**
3. Add `sangharshclasses.in` as your primary custom domain
4. Add `www.sangharshclasses.in` as an additional domain (if supported)
5. Enable **HTTPS/SSL** (should be automatic via Let's Encrypt)
6. Save changes and wait for SSL certificate provisioning (usually 5-15 minutes)

## Step 3: Configure 301 Redirects

### WWW to Apex Redirect

Configure a 301 redirect from `www.sangharshclasses.in` to `https://sangharshclasses.in/`:

**In Caffeine Dashboard:**
- Navigate to **Settings** → **Redirects** (or equivalent section)
- Add redirect rule:
  - **Source:** `www.sangharshclasses.in/*`
  - **Destination:** `https://sangharshclasses.in/$1`
  - **Type:** 301 (Permanent)
  - **Preserve Path:** Yes
  - **Preserve Query String:** Yes

**Alternative (if Caffeine doesn't support redirect rules):**
- Configure the redirect at your DNS provider (Hostinger) if they offer redirect services
- Or use a CDN/proxy service (e.g., Cloudflare) to handle redirects

### Caffeine Subdomain to Custom Domain Redirect

Configure a 301 redirect from the Caffeine subdomain to your custom domain:

**In Caffeine Dashboard:**
- Navigate to **Settings** → **Redirects**
- Add redirect rule:
  - **Source:** `sangharsh-classes-coaching-9ew.caffeine.xyz/*`
  - **Destination:** `https://sangharshclasses.in/$1`
  - **Type:** 301 (Permanent)
  - **Preserve Path:** Yes
  - **Preserve Query String:** Yes

**Important:** This redirect is critical for SEO to prevent duplicate content penalties.

## Step 4: Verify SEO Canonicalization

The application includes runtime SEO guards that automatically handle canonicalization:

### On Custom Domain (`sangharshclasses.in`)
- **Canonical URL:** `https://sangharshclasses.in/`
- **Robots Meta:** No noindex tag (indexing allowed)
- **og:url:** `https://sangharshclasses.in/`

### On Caffeine Subdomain (if accessible before redirect)
- **Canonical URL:** `https://sangharshclasses.in/` (points to custom domain)
- **Robots Meta:** `<meta name="robots" content="noindex, nofollow">`
- **og:url:** `https://sangharshclasses.in/` (points to custom domain)

### Verification Steps

1. **Test Apex Domain:**
   ```bash
   curl -I https://sangharshclasses.in/
   ```
   - Should return HTTP 200
   - View page source and verify canonical tag points to `https://sangharshclasses.in/`

2. **Test WWW Subdomain:**
   ```bash
   curl -I https://www.sangharshclasses.in/
   ```
   - Should return HTTP 301 with `Location: https://sangharshclasses.in/`

3. **Test Caffeine Subdomain:**
   ```bash
   curl -I https://sangharsh-classes-coaching-9ew.caffeine.xyz/
   ```
   - Should return HTTP 301 with `Location: https://sangharshclasses.in/`

4. **Test Path Preservation:**
   ```bash
   curl -I https://www.sangharshclasses.in/test?x=1
   ```
   - Should redirect to `https://sangharshclasses.in/test?x=1`

5. **Browser Verification:**
   - Visit `https://sangharshclasses.in/` in browser
   - Right-click → View Page Source
   - Verify canonical link: `<link rel="canonical" href="https://sangharshclasses.in/" />`
   - Verify NO noindex meta tag is present
   - Check browser Console for SEO guard log: "Running on custom domain - indexing allowed"

## Step 5: Update Deployment Configuration

Ensure your deployment configuration is correct:

### Required Files in `frontend/` Directory

- **`.ic-assets.json`** - Asset canister configuration (REQUIRED for IC deployments)
- **`public/404.html`** - SPA fallback for client-side routing
- **`public/_redirects`** - Static file exclusions for hosting
- **`public/_headers`** - Content-Type headers for static files
- **`public/sitemap.xml`** - XML sitemap with custom domain URLs
- **`public/robots.txt`** - Robots.txt with custom domain sitemap reference

### Verify Build Output

After running `npm run build`, verify `frontend/dist/` contains:

- `index.html` at root
- `assets/` folder with hashed JS/CSS files
- All static files from `public/` (404.html, sitemap.xml, robots.txt, favicon.png, favicon.ico, google53082ab74af04c28.html)

### Publish Directory

**CRITICAL:** Deploy ONLY the `frontend/dist/` folder contents as the web root.

## Step 6: Google Search Console Verification

1. **Add Property:**
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Add `https://sangharshclasses.in` as a new property

2. **Verify Ownership:**
   - The verification file `google53082ab74af04c28.html` is already deployed
   - Select "HTML file" verification method
   - Google will check for the file at `https://sangharshclasses.in/google53082ab74af04c28.html`
   - Click "Verify"

3. **Submit Sitemap:**
   - Navigate to **Sitemaps** section
   - Submit sitemap URL: `https://sangharshclasses.in/sitemap.xml`
   - Verify no errors (should show "Success" status)

4. **Request Indexing:**
   - Use URL Inspection tool for `https://sangharshclasses.in/`
   - Click "Request Indexing" to trigger immediate crawl
   - Wait 24-48 hours for Google to update search results

## Step 7: Test and Monitor

### Immediate Tests (After DNS Propagation)

- [ ] Apex domain resolves: `https://sangharshclasses.in/`
- [ ] WWW redirects to apex: `https://www.sangharshclasses.in/` → `https://sangharshclasses.in/`
- [ ] Caffeine subdomain redirects: `https://sangharsh-classes-coaching-9ew.caffeine.xyz/` → `https://sangharshclasses.in/`
- [ ] HTTPS works (padlock icon in browser)
- [ ] SSL certificate is valid (no warnings)
- [ ] Homepage renders correctly on custom domain
- [ ] All assets load (check Network tab)
- [ ] Canonical tags point to custom domain
- [ ] No noindex tag on custom domain
- [ ] Sitemap accessible: `https://sangharshclasses.in/sitemap.xml`
- [ ] Robots.txt accessible: `https://sangharshclasses.in/robots.txt`
- [ ] Favicon loads: `https://sangharshclasses.in/favicon.png`
- [ ] Google verification file accessible: `https://sangharshclasses.in/google53082ab74af04c28.html`

### Ongoing Monitoring

- Monitor Google Search Console for crawl errors
- Check for duplicate content issues
- Verify search results show custom domain (not Caffeine subdomain)
- Monitor SSL certificate expiration and renewal

## Troubleshooting

### DNS Not Resolving

**Symptoms:** Domain doesn't load, "DNS_PROBE_FINISHED_NXDOMAIN" error

**Solutions:**
- Verify DNS records are correct in Hostinger
- Wait for DNS propagation (up to 48 hours)
- Clear local DNS cache: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)
- Test with online DNS checker (whatsmydns.net)

### SSL Certificate Error

**Symptoms:** "Your connection is not private" warning

**Solutions:**
- Wait for SSL certificate provisioning (5-15 minutes after DNS propagation)
- Verify domain is correctly configured in Caffeine dashboard
- Check that DNS points to correct IP/CNAME
- Contact Caffeine support if issue persists

### Redirect Not Working

**Symptoms:** WWW or Caffeine subdomain doesn't redirect

**Solutions:**
- Verify redirect rules are configured in Caffeine dashboard
- Clear browser cache and test in incognito mode
- Test with curl to see actual HTTP response
- Check that DNS records are correct
- Wait for DNS propagation if recently changed

### Redirect Loop

**Symptoms:** Browser shows "Too many redirects" error

**Solutions:**
- Check for conflicting redirect rules
- Verify canonical domain is set correctly
- Ensure SEO guards are not causing conflicts
- Clear browser cache and cookies
- Test with curl to trace redirect chain

### Sitemap or Robots.txt Returns HTML

**Symptoms:** Static files return HTML instead of expected content

**Solutions:**
- Verify `404.html` excludes static files from SPA fallback
- Check `_redirects` file explicitly serves static files
- Verify `.ic-assets.json` has correct Content-Type headers
- Ensure files exist in `frontend/dist/` after build

### Favicon Not Loading

**Symptoms:** Favicon returns HTML or 404

**Solutions:**
- Verify `404.html` excludes `/favicon.png` and `/favicon.ico`
- Check `_headers` and `.ic-assets.json` have correct Content-Type
- Ensure favicon files exist in `frontend/public/` and are copied to `dist/`
- Clear browser cache and test in incognito mode

### Google Search Console Verification Fails

**Symptoms:** "Verification file not found" error

**Solutions:**
- Verify `google53082ab74af04c28.html` exists in `frontend/dist/`
- Check file is accessible at `https://sangharshclasses.in/google53082ab74af04c28.html`
- Ensure file is not redirected by SPA fallback (excluded in `404.html`)
- Verify file contains correct verification content
- Wait a few minutes and retry verification

## Additional Resources

- [Caffeine Documentation](https://caffeine.ai/docs)
- [Google Search Console Help](https://support.google.com/webmasters)
- [DNS Propagation Checker](https://www.whatsmydns.net/)
- [SSL Certificate Checker](https://www.sslshopper.com/ssl-checker.html)

## Support

If you encounter issues not covered in this guide:
- Check the `DEPLOYMENT_CHECKLIST.md` for deployment-specific troubleshooting
- Contact Caffeine support for platform-specific issues
- Contact Hostinger support for DNS-related issues
