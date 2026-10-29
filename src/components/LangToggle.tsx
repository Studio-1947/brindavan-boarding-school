'use client';

import { useLayoutEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { langFromPath, localizeHref } from '@/i18n/lang';

/* Both language versions of a page share the same structure, so the reader's place is kept as
   the path (child positions from <main>) to the element at the top of the screen, plus how far down
   the screen it sits. The texts differ in length, so a plain pixel offset would drift. */
type Place = { path: number[]; top: number; ratio: number };
let pending: Place | null = null;

// GSAP wraps pinned sections in a .pin-spacer a moment after the page renders; skip over those
// wrappers so a path means the same thing before and after they appear.
function kids(el: Element): Element[] {
  return Array.from(el.children).flatMap((c) => (c.classList.contains('pin-spacer') ? kids(c) : [c]));
}
function parentOf(el: Element): Element | null {
  let p = el.parentElement;
  while (p?.classList.contains('pin-spacer')) p = p.parentElement;
  return p;
}
// a pinned section is measured by its spacer, which stays in the page flow while the section is held still
function rectOf(el: Element) {
  const spacer = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el;
  return spacer.getBoundingClientRect();
}
// moving elements (scroll reveals, pinned panels) don't make reliable anchors
function isSteady(el: Element) {
  const cs = getComputedStyle(el);
  return cs.transform === 'none' && cs.position !== 'fixed' && cs.position !== 'sticky';
}

function rememberPlace(): Place {
  const main = document.getElementById('main');
  const headerBottom = document.querySelector('header')?.getBoundingClientRect().bottom ?? 0;
  const maxScroll = document.documentElement.scrollHeight - innerHeight;
  const ratio = maxScroll > 0 ? scrollY / maxScroll : 0;
  let hit: Element | undefined = main
    ? kids(main).find((c) => rectOf(c).bottom > headerBottom)
    : undefined;
  // narrow a big block down to the smallest steady element at the top of the screen, for a closer match
  while (hit && isSteady(hit)) {
    const child: Element | undefined = kids(hit).find((c) => {
      const r = c.getBoundingClientRect();
      return r.height > 0 && r.bottom > headerBottom;
    });
    if (!child || !isSteady(child)) break;
    hit = child;
  }
  const path: number[] = [];
  for (let el = hit; el && el !== main; ) {
    const parent = parentOf(el);
    if (!parent) break;
    path.unshift(kids(parent).indexOf(el));
    el = parent;
  }
  return { path, top: hit ? rectOf(hit).top : 0, ratio };
}

function findTarget(path: number[]) {
  const main = document.getElementById('main');
  let el: Element | null = main;
  for (const i of path) {
    const next: Element | undefined = el ? kids(el)[i] : undefined;
    if (!next) break;
    el = next;
  }
  return el === main ? null : el;
}

function restorePlace({ path, top, ratio }: Place) {
  const jump = () => {
    const el = findTarget(path);
    const y = el
      ? rectOf(el).top + scrollY - top
      : ratio * (document.documentElement.scrollHeight - innerHeight);
    if (Math.abs(y - scrollY) > 1) window.scrollTo({ top: y, behavior: 'instant' });
  };
  jump();
  // the new page keeps settling for a moment (pinned sections, images, fonts), so hold the place
  // until then, unless the reader starts scrolling themselves
  let frame = 0;
  const until = performance.now() + 1500;
  const stop = () => {
    cancelAnimationFrame(frame);
    for (const type of ['wheel', 'touchstart', 'keydown', 'pointerdown'])
      removeEventListener(type, stop);
  };
  for (const type of ['wheel', 'touchstart', 'keydown', 'pointerdown'])
    addEventListener(type, stop, { passive: true });
  const tick = () => {
    jump();
    if (performance.now() < until) frame = requestAnimationFrame(tick);
    else stop();
  };
  frame = requestAnimationFrame(tick);
}

/** Switches between the English and Nepali versions of the current page, keeping the reader's place. */
export function LangToggle({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname() || '/';
  const lang = langFromPath(pathname);
  const other = lang === 'ne' ? 'en' : 'ne';

  // keep <html lang> in step with the page, for screen readers and browser translation prompts;
  // a layout effect so the page never paints with the old language's typography
  useLayoutEffect(() => {
    document.documentElement.lang = lang;
    if (pending) {
      restorePlace(pending);
      pending = null;
    }
  }, [lang]);

  return (
    <Link
      className="lang-toggle"
      href={localizeHref(pathname, other)}
      hrefLang={other}
      scroll={false}
      onClick={() => {
        pending = rememberPlace();
        onNavigate?.();
      }}
      aria-label={
        other === 'ne' ? 'नेपालीमा पढ्नुहोस् (Read in Nepali)' : 'Read in English (अंग्रेजीमा पढ्नुहोस्)'
      }
    >
      <span lang="en" className={lang === 'en' ? 'is-current' : undefined}>
        EN
      </span>
      <span lang="ne" className={lang === 'ne' ? 'is-current' : undefined}>
        नेपाली
      </span>
    </Link>
  );
}
