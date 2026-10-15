/* Languages the site is published in. English lives at the existing URLs (/about);
   Nepali mirrors every page under /ne (/ne/about). */

export type Lang = 'en' | 'ne';

export const langFromPath = (pathname: string | null): Lang =>
  pathname === '/ne' || pathname?.startsWith('/ne/') ? 'ne' : 'en';

/** The same page in the given language: '/about' <-> '/ne/about'. Assets and #links are left alone. */
export function localizeHref(href: string, lang: Lang): string {
  if (!href.startsWith('/') || href.startsWith('/assets') || href.startsWith('/_next')) return href;
  const bare = href === '/ne' ? '/' : href.startsWith('/ne/') ? href.slice(3) || '/' : href;
  if (lang === 'en') return bare;
  return bare === '/' ? '/ne' : `/ne${bare}`;
}
