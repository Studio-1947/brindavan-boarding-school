'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { SwooshArrow } from './icons';
import { ProspectusButton } from './Prospectus';

const NAV_LINKS = [
  { href: '/about', label: 'About the School' },
  { href: '/academics', label: 'Academics' },
  { href: '/boarding', label: 'Boarding life' },
  { href: '/life', label: 'Beyond class' },
  { href: '/visit', label: 'Visit' },
];

const onScroll = (notify: () => void) => {
  window.addEventListener('scroll', notify, { passive: true });
  return () => window.removeEventListener('scroll', notify);
};

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
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
    <header className={scrolled ? 'is-scrolled' : undefined}>
      {/* Links to the homepage skip prefetching: it would download the 170 kB hero photo on every page. */}
      <Link className="brand" href="/" prefetch={false} aria-label="Brindavan Boarding School home">
        <img className="logo" src="/assets/logo.png" alt="Brindavan Boarding School crest" />
        <span className="brand-name">
          Brindavan<span>Boarding School</span>
        </span>
      </Link>
      <button
        ref={menuButton}
        className="menu"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? 'Close ×' : 'Menu ☰'}
      </button>
      <nav aria-label="Main navigation" className={menuOpen ? 'open' : undefined}>
        {NAV_LINKS.map(({ href, label }) => (
          <Link key={href} href={href} onClick={closeMenu}>
            {label}
          </Link>
        ))}
        <ProspectusButton className="button is-outline small">
          Prospectus &apos;26{' '}
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
        </ProspectusButton>
        <Link className="button small" href="/admissions" onClick={closeMenu}>
          Admissions{' '}
          <span>
            <SwooshArrow />
          </span>
        </Link>
      </nav>
    </header>
  );
}
