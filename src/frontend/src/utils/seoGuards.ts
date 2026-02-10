/**
 * Runtime SEO guards to prevent indexing of non-canonical domains
 * and ensure proper canonical URL enforcement.
 */

const CANONICAL_DOMAIN = 'sangharshclasses.in';
const CAFFEINE_SUBDOMAIN = 'sangharsh-classes-coaching-9ew.caffeine.xyz';

/**
 * Detects if the current hostname is the Caffeine subdomain
 */
function isCaffeineSubdomain(): boolean {
  return window.location.hostname === CAFFEINE_SUBDOMAIN;
}

/**
 * Ensures robots meta tag exists with noindex/nofollow on non-canonical domains
 */
function ensureRobotsNoIndex(): void {
  let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
  
  if (!robotsMeta) {
    robotsMeta = document.createElement('meta');
    robotsMeta.name = 'robots';
    document.head.appendChild(robotsMeta);
  }
  
  robotsMeta.content = 'noindex, nofollow';
}

/**
 * Removes robots noindex meta tag (for canonical domain)
 */
function removeRobotsNoIndex(): void {
  const robotsMeta = document.querySelector('meta[name="robots"]');
  if (robotsMeta) {
    robotsMeta.remove();
  }
}

/**
 * Ensures canonical link points to the custom domain
 */
function ensureCanonicalUrl(): void {
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }
  
  const currentPath = window.location.pathname;
  const currentSearch = window.location.search;
  canonicalLink.href = `https://${CANONICAL_DOMAIN}${currentPath}${currentSearch}`;
}

/**
 * Ensures og:url meta tag points to the custom domain
 */
function ensureOgUrl(): void {
  let ogUrlMeta = document.querySelector('meta[property="og:url"]') as HTMLMetaElement;
  
  if (!ogUrlMeta) {
    ogUrlMeta = document.createElement('meta');
    ogUrlMeta.setAttribute('property', 'og:url');
    document.head.appendChild(ogUrlMeta);
  }
  
  const currentPath = window.location.pathname;
  const currentSearch = window.location.search;
  ogUrlMeta.content = `https://${CANONICAL_DOMAIN}${currentPath}${currentSearch}`;
}

/**
 * Main SEO guard function to be called on app initialization
 */
export function initializeSeoGuards(): void {
  if (isCaffeineSubdomain()) {
    ensureRobotsNoIndex();
    ensureCanonicalUrl();
    ensureOgUrl();
  } else {
    removeRobotsNoIndex();
    ensureCanonicalUrl();
    ensureOgUrl();
  }
}
