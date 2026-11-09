/**
 * @file legacyUrlService.ts moves the addresses the site used to have to the
 * ones it has now, before the router reads the address.
 * @module legacyUrlService
 */

/** The base path of the site until 2026-11-09, when it moved to the domain root. */
const OLD_BASE = "/portfolio";

/**
 * Where an address under the old base path lives now (/portfolio/contact goes
 * to /contact), or null for an address that is already current.
 */
export const legacyBasePathTarget = (
  pathname: string,
  search: string,
  hash: string
): string | null => {
  if (pathname !== OLD_BASE && !pathname.startsWith(`${OLD_BASE}/`)) {
    return null;
  }
  return (
    import.meta.env.BASE_URL +
    pathname.slice(OLD_BASE.length + 1) +
    search +
    hash
  );
};

/**
 * The site answered under /portfolio/ until 2026-11-09. The build keeps a
 * redirect page for each old page (see vite.config.ts); any other old address,
 * a PDF of experiences/ for instance, finds no file and gets 404.html, which
 * loads this app. It leaves for the same path at the root. Returns true when
 * the page is leaving, so that the app is not rendered for nothing.
 */
export const redirectLegacyBasePath = () => {
  const { pathname, search, hash } = window.location;
  const target = legacyBasePathTarget(pathname, search, hash);
  if (target === null) {
    return false;
  }
  window.location.replace(target);
  return true;
};

/**
 * The site used to route with the URL hash (/#/contact). A link shared at the
 * time is moved to the matching path (/contact) before the router reads the
 * address, so it still opens the right page.
 */
export const redirectLegacyHashUrl = () => {
  const { hash } = window.location;
  if (hash.startsWith("#/")) {
    window.history.replaceState(
      null,
      "",
      import.meta.env.BASE_URL + hash.slice(2)
    );
  }
};
