'use client';

import { useRef, type ReactNode } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap, useGSAP } from '@/lib/gsap';

gsap.registerPlugin(ScrollTrigger);

/**
 * The welcome illustration split into two layers: the hill landscape stays put while the students
 * rise up from below and settle into place on the wall over a short stretch of scrolling.
 */
export function WelcomeParallax({ children }: { children?: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const people = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const el = root.current;
      if (!el) return;
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: el, start: 'top 50%', end: 'top -25%', scrub: 0.6 },
      });
      tl.fromTo(people.current, { yPercent: 16 }, { yPercent: 0, duration: 1 }, 0)
        .fromTo(el.querySelector('.welcome-bg'), { scale: 1.08 }, { scale: 1, duration: 1 }, 0)
        .fromTo(
          el.querySelector('.welcome-overlay')?.children ?? [],
          { y: 40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.12, duration: 0.45 },
          0,
        );
    });
  });

  return (
    <div ref={root} className="about-illustration">
      {children}
      <img
        className="welcome-bg"
        src="/assets/welcome-bg.webp"
        width="2400"
        height="1397"
        loading="lazy"
        alt="Illustrated Mirik hills with Brindavan Boarding School among the pines"
      />
      <img
        ref={people}
        className="welcome-people"
        src="/assets/welcome-people.webp"
        width="2400"
        height="1397"
        loading="lazy"
        alt="Illustrated Brindavan students celebrating with trophies and books beside their teacher"
      />
    </div>
  );
}
