'use client';

import Link from 'next/link';
import { localizeHref } from '@/i18n/lang';
import { useLang, useT } from '@/i18n/ui';
import { usePathname } from 'next/navigation';

/** Sticky "Book a visit / Admissions" bar shown on phones, on the homepage only. */
export function MobileCta() {
  const pathname = usePathname();
  const lang = useLang();
  const t = useT();
  if (pathname !== '/' && pathname !== '/ne') return null;
  return (
    <div className="mobile-cta" role="navigation" aria-label={t('Quick actions')}>
      <Link className="mcta mcta-primary" href={localizeHref('/visit', lang)}>
        {t('Book a visit')}
      </Link>
      <Link className="mcta mcta-ghost" href={localizeHref('/admissions', lang)}>
        {t('Admissions')}
      </Link>
    </div>
  );
}
