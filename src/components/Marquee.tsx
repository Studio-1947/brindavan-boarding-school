'use client';

import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

type MarqueeProps = {
  className?: string;
  /** Seconds for one full loop. */
  duration: number;
  /** Start and end offsets as a percentage of the track width. The content is duplicated, so 50 is one set. */
  from: number;
  to: number;
  children: ReactNode;
};

export function Marquee({ className, duration, from, to, children }: MarqueeProps) {
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(track.current, { xPercent: from }, { xPercent: to, duration, ease: 'none', repeat: -1 });
      });
    },
    { dependencies: [duration, from, to] },
  );

  return (
    <div ref={track} className={className}>
      {children}
    </div>
  );
}
