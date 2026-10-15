'use client';

import { useRef, useState, type ReactNode } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap, useGSAP } from '@/lib/gsap';
import { useT } from '@/i18n/ui';

gsap.registerPlugin(ScrollTrigger);

export type FlipCard = { topic: string; title: string; text: string; icon: ReactNode };

/**
 * Cards that turn over to show the questions to ask. They flip on hover with a mouse and on
 * tap or Enter otherwise; the back stays readable to screen readers either way.
 */
export function FlipCards({ cards }: { cards: FlipCard[] }) {
  const root = useRef<HTMLDivElement>(null);
  const t = useT();
  const [flipped, setFlipped] = useState<boolean[]>(() => cards.map(() => false));

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.flip-card', {
          opacity: 0,
          y: 60,
          rotateX: -18,
          transformOrigin: '50% 100%',
          duration: 0.9,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 82%', once: true },
        });
      });
    },
    { scope: root },
  );

  const toggle = (i: number) => setFlipped((f) => f.map((v, j) => (j === i ? !v : v)));

  return (
    <div ref={root} className="flip-cards">
      {cards.map((card, i) => (
        <button
          key={card.title}
          type="button"
          className={flipped[i] ? 'flip-card is-flipped' : 'flip-card'}
          aria-pressed={flipped[i]}
          onClick={() => toggle(i)}
        >
          <span className="flip-inner">
            <span className="flip-face flip-front">
              <span className="flip-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="flip-icon">{card.icon}</span>
              <span className="flip-topic">{card.topic}</span>
              <span className="flip-title">{card.title}</span>
              <span className="flip-hint">{t('What to ask ↻')}</span>
            </span>
            <span className="flip-face flip-back">
              <span className="flip-topic">{card.topic}</span>
              <span className="flip-text">{card.text}</span>
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
