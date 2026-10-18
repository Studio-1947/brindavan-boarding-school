'use client';

import { useRef, type CSSProperties } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap, useGSAP } from '@/lib/gsap';

gsap.registerPlugin(ScrollTrigger);

export type FanPhoto = { src: string; alt: string; caption: string };

/** Fanned-out pose for the photo `offset` places from the middle of the row. */
const pose = (offset: number, spread: number) => ({
  x: offset * spread,
  y: offset * offset * 16,
  z: -Math.abs(offset) * 60,
  rotation: offset * 6,
  rotationY: offset * -10,
});

/**
 * Photos of the campus held in a stack that fans out into an arc as it scrolls into view.
 * Hovering or focusing a print lifts it out of the fan toward the viewer.
 */
export function ArrivalFan({ photos }: { photos: FanPhoto[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.af-card', root.current);
      const middle = (cards.length - 1) / 2;
      const spread = () => Math.min(window.innerWidth * 0.17, 250);

      const fanned = () => cards.forEach((card, i) => gsap.set(card, pose(i - middle, spread())));

      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // stacked in the middle, then dealt out into the arc as the page scrolls
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { x: 0, y: 40, z: -i * 30, rotation: (i - middle) * 3, rotationY: 0 },
            {
              ...pose(i - middle, 1),
              x: () => (i - middle) * spread(),
              ease: 'power2.out',
              scrollTrigger: {
                trigger: root.current,
                start: 'top 85%',
                end: 'center 55%',
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            },
          );
        });
      });
      mm.add('(prefers-reduced-motion: reduce)', () => {
        fanned();
        window.addEventListener('resize', fanned);
        return () => window.removeEventListener('resize', fanned);
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="arrival-fan">
      <div className="af-stage">
        {photos.map((photo, i) => (
          <figure
            key={photo.src}
            className="af-card"
            tabIndex={0}
            style={{ zIndex: 10 - Math.round(Math.abs(i - (photos.length - 1) / 2)) } as CSSProperties}
          >
            <span className="af-lift">
              <img src={photo.src} alt={photo.alt} loading="lazy" draggable={false} />
              <figcaption>{photo.caption}</figcaption>
            </span>
          </figure>
        ))}
      </div>
    </div>
  );
}
