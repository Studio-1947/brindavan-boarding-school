'use client';

import { useRef, type ReactNode } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap, useGSAP } from '@/lib/gsap';

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  className?: string;
  /** Seconds between one child starting and the next. */
  stagger?: number;
  children: ReactNode;
};

/** A div whose direct children fade up one after another the first time it scrolls into view. */
export function Reveal({ className, stagger = 0.09, children }: RevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (!root.current) return;
        gsap.from(root.current.children, {
          opacity: 0,
          y: 28,
          duration: 0.8,
          ease: 'power3.out',
          stagger,
          scrollTrigger: { trigger: root.current, start: 'top 90%', once: true },
        });
      });
    },
    { dependencies: [stagger] },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
