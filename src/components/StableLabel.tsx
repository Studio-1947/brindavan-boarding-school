'use client';

import type { ReactNode } from 'react';
import { translate, useLang } from '@/i18n/ui';

/** A UI label that keeps the same size in English and Nepali: both versions sit in the same spot
    and the other language's one is hidden, so the label is always as wide as the longer of the two
    and switching language doesn't move the things around it. An icon passed as `after` travels with
    each version of the text, so the visible text and its icon stay together as one centred group. */
export function StableLabel({ text, after }: { text: string; after?: ReactNode }) {
  const lang = useLang();
  const other = lang === 'ne' ? 'en' : 'ne';
  return (
    <span className="stable-label">
      <span lang={lang}>
        {translate(text, lang)}
        {after}
      </span>
      <span lang={other} aria-hidden="true">
        {translate(text, other)}
        {after}
      </span>
    </span>
  );
}
