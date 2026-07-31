import { VALID_SLUGS, bcp47ToSlug } from '@f5-sales-demo/i18n-core';

const ECOSYSTEM_HOST = 'f5-sales-demo.github.io';

export const langToSlug = bcp47ToSlug;

export function localizeEcosystemHref(
  href: string,
  localeSlug: string,
  ecosystemHost: string = ECOSYSTEM_HOST,
): string {
  if (!localeSlug || !VALID_SLUGS.has(localeSlug)) return href;

  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return href;
  }

  if (url.hostname !== ecosystemHost) return href;

  const segments = url.pathname.split('/').filter(Boolean);
  if (segments.length === 0) return href;

  // Already localized — leave it alone. Read the segment into a local so this
  // compiles under noUncheckedIndexedAccess, which the repo adopted after this
  // module was deleted; the `length >= 2` guard already made the index safe.
  const existingSlug = segments.length >= 2 ? segments[1] : undefined;
  if (existingSlug && VALID_SLUGS.has(existingSlug)) {
    return href;
  }

  segments.splice(1, 0, localeSlug);
  url.pathname = '/' + segments.join('/') + '/';

  return url.toString();
}
