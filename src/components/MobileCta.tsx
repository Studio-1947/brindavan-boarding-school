'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/** Sticky "Book a visit / Admissions" bar shown on phones, on the homepage only. */
export function MobileCta() {
  if (usePathname() !== '/') return null;
  return (
    <div className="mobile-cta" role="navigation" aria-label="Quick actions">
      <Link className="mcta mcta-primary" href="/visit">
        Book a visit
      </Link>
      <Link className="mcta mcta-ghost" href="/admissions">
        Admissions
      </Link>
    </div>
  );
}
