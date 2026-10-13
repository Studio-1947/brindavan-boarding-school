'use client';

import { useRef, type PointerEvent, type ReactNode } from 'react';
import { inView } from 'motion';
import { CustomEase, gsap, useGSAP } from '@/lib/gsap';

export function ValueCards({ children }: { children: ReactNode }) {
  const grid = useRef<HTMLDivElement>(null);

  // Cards rise in one after another the first time each scrolls into view.
  useGSAP(
    (_, contextSafe) => {
      const cards = gsap.utils.toArray<HTMLElement>('.value-card', grid.current);
      if (!cards.length || !('IntersectionObserver' in window)) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // The CSS timing functions the cards have always used: `ease` and cubic-bezier(.2,.7,.2,1).
      const fade = CustomEase.create('value-card-fade', '0.25,0.1,0.25,1');
      const rise = CustomEase.create('value-card-rise', '0.2,0.7,0.2,1');

      // is-pending switches the CSS transitions off so they do not fight the tween.
      cards.forEach((card) => card.classList.add('is-pending'));
      gsap.set(cards, { opacity: 0, y: 48 });

      const stops = cards.map((card, i) =>
        inView(
          card,
          contextSafe!(() => {
            const delay = i * 0.12;
            gsap.to(card, { opacity: 1, duration: 0.9, delay, ease: fade });
            gsap.to(card, {
              y: 0,
              duration: 0.9,
              delay,
              ease: rise,
              onComplete: () => {
                // Hand the card back to the stylesheet. Reading offsetWidth commits the cleared
                // styles first, so switching the hover transitions back on animates nothing.
                gsap.set(card, { clearProps: 'opacity,transform' });
                void card.offsetWidth;
                card.classList.replace('is-pending', 'is-in');
              },
            });
          }),
          { amount: 0.2 },
        ),
      );

      return () => {
        stops.forEach((stop) => stop());
        cards.forEach((card) => card.classList.remove('is-pending'));
      };
    },
    { scope: grid },
  );

  // Feeds the cursor position to the hover glow (--mx / --my in the stylesheet).
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>('.value-card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <div ref={grid} className="value-cards" onPointerMove={onPointerMove}>
      {children}
    </div>
  );
}
