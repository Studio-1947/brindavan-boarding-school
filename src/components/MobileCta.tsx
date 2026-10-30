'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { localizeHref } from '@/i18n/lang';
import { useLang, useT } from '@/i18n/ui';
import { usePathname } from 'next/navigation';

/** Sticky "Book a visit / Admissions" bar revealed after scrolling on the homepage. */
export function MobileCta() {
  const pathname = usePathname();
  const lang = useLang();
  const t = useT();
  const [isVisible, setIsVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > 0);

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const updateFooterVisibility = () => setIsFooterVisible(footer.getBoundingClientRect().top <= window.innerHeight);

    updateFooterVisibility();
    window.addEventListener('scroll', updateFooterVisibility, { passive: true });
    window.addEventListener('resize', updateFooterVisibility);
    return () => {
      window.removeEventListener('scroll', updateFooterVisibility);
      window.removeEventListener('resize', updateFooterVisibility);
    };
  }, []);

  if (pathname !== '/' && pathname !== '/ne') return null;
  const shouldShow = isVisible && !isFooterVisible;
  return (
    <div
      className={`mobile-cta${shouldShow ? ' is-visible' : ''}${isFooterVisible ? ' is-footer-visible' : ''}`}
      role="navigation"
      aria-label={t('Quick actions')}
      aria-hidden={!shouldShow}
    >
      <Link className="mcta mcta-primary" href={localizeHref('/visit', lang)}>
        {t('Book a visit')}
      </Link>
      <Link className="mcta mcta-ghost" href={localizeHref('/admissions', lang)}>
        {t('Admissions')}
      </Link>
    </div>
  );
}
