'use client';

import { useRef, type PointerEvent, type ReactNode } from 'react';

type SpotlightGridProps = {
  className?: string;
  children: ReactNode;
};

/**
 * A list whose cards light up around the pointer. The glow is shared across the grid, so it spills
 * over the borders of neighbouring cards as the cursor moves between them.
 */
export function SpotlightGrid({ className, children }: SpotlightGridProps) {
  const root = useRef<HTMLUListElement>(null);

  const track = (e: PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== 'mouse' || !root.current) return;
    for (const card of root.current.children as HTMLCollectionOf<HTMLElement>) {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    }
  };

  return (
    <ul ref={root} className={className} onPointerMove={track}>
      {children}
    </ul>
  );
}
