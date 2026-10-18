'use client';

import { useRef, type ReactNode } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap, useGSAP } from '@/lib/gsap';

gsap.registerPlugin(ScrollTrigger);

/**
 * A row of photo cards (the `.tilt-card` children) that rise up out of the page when they scroll
 * into view and, under a mouse, tip toward the pointer with a light sheen following it.
 */
export function TiltCards({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.tilt-card', root.current);
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(cards, {
          opacity: 0,
          y: 90,
          rotationX: -30,
          transformPerspective: 1100,
          transformOrigin: '50% 100%',
          duration: 1.1,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 82%', once: true },
        });
      });

      mm.add('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)', () => {
        const offs = cards.map((card) => {
          const rotX = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3.out' });
          const rotY = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3.out' });
          gsap.set(card, { transformPerspective: 1100 });
          const move = (e: PointerEvent) => {
            const box = card.getBoundingClientRect();
            const x = (e.clientX - box.left) / box.width;
            const y = (e.clientY - box.top) / box.height;
            rotY((x - 0.5) * 16);
            rotX((y - 0.5) * -12);
            card.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`);
            card.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`);
          };
          const leave = () => {
            rotX(0);
            rotY(0);
          };
          card.addEventListener('pointermove', move);
          card.addEventListener('pointerleave', leave);
          return () => {
            card.removeEventListener('pointermove', move);
            card.removeEventListener('pointerleave', leave);
          };
        });
        return () => offs.forEach((off) => off());
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="tilt-grid">
      {children}
    </div>
  );
}
