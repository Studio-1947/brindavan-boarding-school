'use client';

import { useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

export type DeckPhoto = { src: string; alt: string; caption: string };

/** Resting position of a card by how deep it sits in the pile (0 is the top card). */
const POSES = [
  { x: 0, y: 0, rotate: -1.5, scale: 1 },
  { x: 18, y: -14, rotate: 3, scale: 0.97 },
  { x: -16, y: -26, rotate: -4, scale: 0.94 },
  { x: 10, y: -38, rotate: 5, scale: 0.91 },
];

/**
 * A pile of photo prints. Clicking the top one flicks it aside and tucks it at the
 * back, bringing the next photo and its caption forward.
 */
export function PhotoDeck({ photos }: { photos: DeckPhoto[] }) {
  const root = useRef<HTMLDivElement>(null);
  // order[0] is the photo on top
  const [order, setOrder] = useState(() => photos.map((_, i) => i));
  const leaving = useRef<number | null>(null);
  const settled = useRef(false);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.photo-deck-card', root.current);
      const instant = !settled.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      order.forEach((photo, depth) => {
        const card = cards[photo];
        const pose = POSES[Math.min(depth, POSES.length - 1)];
        const zIndex = photos.length - depth;
        if (instant) {
          gsap.set(card, { ...pose, xPercent: 0, zIndex });
        } else if (photo === leaving.current) {
          // flick the old top card out to the side, then slide it in underneath the pile
          gsap
            .timeline()
            .set(card, { zIndex: photos.length + 1 })
            .to(card, { xPercent: 108, rotate: 14, duration: 0.3, ease: 'power2.in' })
            .set(card, { zIndex })
            .to(card, { ...pose, xPercent: 0, duration: 0.55, ease: 'power3.out' });
        } else {
          gsap.set(card, { zIndex });
          gsap.to(card, { ...pose, duration: 0.6, delay: 0.12, ease: 'power3.out' });
        }
      });

      settled.current = true;
      leaving.current = null;
    },
    { scope: root, dependencies: [order] },
  );

  const next = () => {
    leaving.current = order[0];
    setOrder((current) => [...current.slice(1), current[0]]);
  };

  const top = order[0];

  return (
    <div ref={root} className="photo-deck">
      <div className="photo-deck-stack">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            className="photo-deck-card"
            onClick={next}
            tabIndex={i === top ? 0 : -1}
            aria-label="Show the next photo"
          >
            <img src={photo.src} alt={photo.alt} />
          </button>
        ))}
      </div>
      <div className="photo-deck-foot">
        <p aria-live="polite">{photos[top].caption}</p>
        <button type="button" onClick={next}>
          {top + 1} / {photos.length} · Next →
        </button>
      </div>
    </div>
  );
}
