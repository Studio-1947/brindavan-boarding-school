'use client';

import { useRef, type ReactNode } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { gsap, useGSAP } from '@/lib/gsap';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

type DrawOnViewProps = {
  className?: string;
  children: ReactNode;
};

/**
 * The first time this block scrolls into view, its direct children rise in one after another
 * and the line icons inside them (any svg marked data-draw) draw themselves stroke by stroke.
 */
export function DrawOnView({ className, children }: DrawOnViewProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 80%', once: true } });
        tl.from(el.children, { opacity: 0, y: 46, duration: 0.8, stagger: 0.15, ease: 'power3.out' }).from(
          el.querySelectorAll('svg[data-draw] :is(path, circle, line, rect, polyline)'),
          { drawSVG: 0, duration: 1.3, stagger: 0.07, ease: 'power2.inOut' },
          0.25,
        );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
