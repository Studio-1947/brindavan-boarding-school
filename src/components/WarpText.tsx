'use client';

import { useEffect, useRef } from 'react';
import type { WarpTextOptions } from '@/lib/warp-text';

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

  useEffect(() => {
    let dispose = () => {};
    let cancelled = false;
    // Loaded on demand so the WebGL code stays out of the main bundle.
    import('@/lib/warp-text').then(({ initWarpText }) => {
      if (!cancelled) dispose = initWarpText(container.current, options);
    });
    return () => {
      cancelled = true;
      dispose();
    };
  }, [options]);

  return <div ref={container} className={className} role="img" aria-label={label} />;
}
