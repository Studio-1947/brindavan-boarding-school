'use client';

import { useEffect, useRef } from 'react';
import type { WarpTextOptions } from '@/lib/warp-text';
import { useLang } from '@/i18n/ui';

export type { WarpTextOptions };

type WarpTextProps = {
  className?: string;
  /** Read out by screen readers in place of the canvas. */
  label: string;
  options: Partial<WarpTextOptions>;
};

/** Headline drawn on a WebGL canvas that ripples on its own and bends around the cursor. */
export function WarpText({ className, label, options }: WarpTextProps) {
  const container = useRef<HTMLDivElement>(null);
  const lang = useLang();

  useEffect(() => {
    let dispose = () => {};
    let cancelled = false;
    // Devanagari needs its own font, no letter spacing (it would split the joined letters) and taller lines.
    const settings =
      lang === 'ne'
        ? { ...options, fontFamily: "'Mukta', Arial, sans-serif", letterSpacing: '0px', lineHeight: 1.4 }
        : options;
    // Loaded on demand so the WebGL code stays out of the main bundle.
    import('@/lib/warp-text').then(({ initWarpText }) => {
      if (!cancelled) dispose = initWarpText(container.current, settings);
    });
    return () => {
      cancelled = true;
      dispose();
    };
  }, [options, lang]);

  return <div ref={container} className={className} role="img" aria-label={label} />;
}
