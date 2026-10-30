'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { SwooshArrow } from './icons';
import { CallButton } from './CallButton';
import { ProspectusVideoButton } from './ProspectusVideo';
import { LangToggle } from './LangToggle';
import { StableLabel } from './StableLabel';
import { localizeHref } from '@/i18n/lang';
import { useLang, useT } from '@/i18n/ui';

const NAV_LINKS = [
  { href: '/about', label: 'About us' },
  { href: '/academics', label: 'Academics' },
  { href: '/boarding', label: 'Boarding life' },
  { href: '/impact', label: 'Impact' },
  { href: '/life', label: 'Beyond Classrooms' },
  { href: '/visit', label: 'Visit' },
];

const onScroll = (notify: () => void) => {
  window.addEventListener('scroll', notify, { passive: true });
  return () => window.removeEventListener('scroll', notify);
};

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const lang = useLang();
  const t = useT();
  const menuButton = useRef<HTMLButtonElement>(null);
  // Give the persistent navigation a clear, quiet state once the page moves.
  const scrolled = useSyncExternalStore(
    onScroll,
    () => window.scrollY > 12,
    () => false,
  );

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setMenuOpen(false);
      menuButton.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    // lang on the header itself, so Nepali labels get their typeface in the same paint as the new text
    <header lang={lang} className={scrolled ? 'is-scrolled' : undefined}>
      {/* Links to the homepage skip prefetching: it would download the 170 kB hero photo on every page. */}
      <Link
        className="brand"
        href={localizeHref('/', lang)}
        prefetch={false}
        aria-label={t('Brindavan Boarding School home')}
      >
        <img className="logo" src="/assets/logo.png" alt={t('Brindavan Boarding School crest')} />
        <span className="brand-name">
          <StableLabel text="Brindavan" />
          <StableLabel text="Boarding School" />
        </span>
      </Link>
      <LangToggle onNavigate={() => setMenuOpen(false)} />
      <CallButton />
      <button
        ref={menuButton}
        className="menu"
        aria-label={t(menuOpen ? 'Close navigation' : 'Open navigation')}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="menu-text">
          <StableLabel text={menuOpen ? 'Close ×' : 'Menu ☰'} />
        </span>
        {/* phones show only the icon, to leave room for the call button */}
        <span className="menu-icon" aria-hidden="true">
          {menuOpen ? '×' : '☰'}
        </span>
      </button>
      <nav aria-label={t('Main navigation')} className={menuOpen ? 'open' : undefined}>
        {NAV_LINKS.map(({ href, label }) => (
          <Link key={href} href={localizeHref(href, lang)} onClick={closeMenu}>
            <StableLabel text={label} />
          </Link>
        ))}
        <ProspectusVideoButton className="button is-outline small">
          <StableLabel
            text="Prospectus"
            after={
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3v12" />
                <path d="M7 10l5 5 5-5" />
                <path d="M5 19h14" />
              </svg>
            }
          />
        </ProspectusVideoButton>
        <Link className="button small" href={localizeHref('/admissions', lang)} onClick={closeMenu}>
          <StableLabel
            text="Admission"
            after={
              <span>
                <SwooshArrow />
              </span>
            }
          />
        </Link>
      </nav>
    </header>
  );
}
