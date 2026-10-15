'use client';

import { useRef, type ReactNode } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap, useGSAP } from '@/lib/gsap';

gsap.registerPlugin(ScrollTrigger);

/** Height of the fixed site header, which the photos above the motto must clear. */
const HEADER = 80;

/**
 * The school motto set in giant type. While it scrolls past, the photos inside the lines open up
 * and the photos around them pop in one after another, drifting at their own speeds. On wide
 * screens the stage pins in place for the length of the sequence.
 */
export function VisionMotto({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = root.current;
    if (!el) return;
    const pills = gsap.utils.toArray<HTMLElement>('.vm-pill', el);
    const floats = gsap.utils.toArray<HTMLElement>('.vm-float', el);

    // Size the photos to the room actually left around the motto: a column either side of the
    // widest line, and a band above (below the fixed header) and below the text. Measured from the
    // text itself, counting each line photo at its full open width even while it is still closed.
    const layout = () => {
      if (window.innerWidth <= 800) return;
      const stage = el.getBoundingClientRect();
      const height = Math.min(stage.height, window.innerHeight);
      let left = Infinity;
      let right = -Infinity;
      let top = Infinity;
      let bottom = -Infinity;
      el.querySelectorAll<HTMLElement>('.vm-line, .vm-eyebrow').forEach((node) => {
        const range = document.createRange();
        range.selectNodeContents(node);
        const r = range.getBoundingClientRect();
        const pill = node.querySelector<HTMLElement>('.vm-pill');
        const missing = pill ? parseFloat(getComputedStyle(node).fontSize) * 1.7 - pill.offsetWidth : 0;
        left = Math.min(left, r.left - missing / 2 - stage.left);
        right = Math.max(right, r.right + missing / 2 - stage.left);
        top = Math.min(top, r.top - stage.top);
        bottom = Math.max(bottom, r.bottom - stage.top);
      });
      const edge = stage.width * 0.02;
      const gap = 28;
      const side = Math.max(0, Math.min(left - edge - gap, stage.width - right - edge - gap, height * 0.42));
      el.style.setProperty('--side', `${side}px`);
      el.style.setProperty('--inner', `${edge + side + gap * 1.5}px`);
      el.style.setProperty('--band-top', `${Math.max(0, top - HEADER - 10 - 20)}px`);
      el.style.setProperty('--band-bottom', `${Math.max(0, height - bottom - 20 - gap)}px`);
    };
    const onResize = () => {
      layout();
      ScrollTrigger.refresh();
    };
    layout();
    // Manrope is wider than the fallback font, so measure again once it has loaded.
    document.fonts.ready.then(onResize);
    window.addEventListener('resize', onResize);

    const build = (scrollTrigger: ScrollTrigger.Vars) => {
      const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger });
      tl.from(pills, { width: 0, duration: 0.35, stagger: 0.45, ease: 'power2.out' }, 0)
        .from(
          floats,
          {
            scale: 0.2,
            autoAlpha: 0,
            rotate: (i) => (i % 2 ? 10 : -10),
            duration: 0.22,
            stagger: 0.12,
            ease: 'back.out(1.8)',
          },
          0.05,
        )
        // photos below the motto drift down and away from it; the ones above barely rise, so the
        // header never hides them
        .to(floats, { yPercent: (i) => (i === 2 || i === 3 || i === 5 ? 12 : -4), duration: 1 }, 0);
    };

    const mm = gsap.matchMedia();
    mm.add('(min-width: 801px) and (prefers-reduced-motion: no-preference)', () =>
      build({ trigger: el, start: 'top top', end: '+=160%', pin: true, scrub: 0.8 }),
    );
    mm.add('(max-width: 800px) and (prefers-reduced-motion: no-preference)', () =>
      build({ trigger: el, start: 'top 75%', end: 'bottom 35%', scrub: 0.8 }),
    );
    return () => window.removeEventListener('resize', onResize);
  });

  return (
    <div ref={root} className="vm-stage">
      {children}
    </div>
  );
}
