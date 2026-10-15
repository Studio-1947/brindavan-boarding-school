'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { langFromPath, localizeHref } from '@/i18n/lang';

/** Switches between the English and Nepali versions of the current page. */
export function LangToggle({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname() || '/';
  const lang = langFromPath(pathname);
  const other = lang === 'ne' ? 'en' : 'ne';

  // keep <html lang> in step with the page, for screen readers and browser translation prompts
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <Link
      className="lang-toggle"
      href={localizeHref(pathname, other)}
      hrefLang={other}
      lang={other}
      onClick={onNavigate}
      aria-label={
        other === 'ne' ? 'नेपालीमा पढ्नुहोस् (Read in Nepali)' : 'Read in English (अंग्रेजीमा पढ्नुहोस्)'
      }
    >
      <span className={lang === 'en' ? 'is-current' : undefined}>EN</span>
      <span className={lang === 'ne' ? 'is-current' : undefined}>नेपाली</span>
    </Link>
  );
}
