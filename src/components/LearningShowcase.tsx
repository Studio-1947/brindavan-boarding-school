'use client';

import { useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap, useGSAP } from '@/lib/gsap';

gsap.registerPlugin(ScrollTrigger);

export type LearningItem = {
  label: string;
  text: string;
  photo: string;
  alt: string;
  /** Which part of the photo to keep when it is cropped to the frame, e.g. 'left center'. Defaults to the middle. */
  focus?: string;
};

/** Seconds each item stays up before the next one takes over. */
const DWELL = 7;

/**
 * A list of points beside a photo. Picking a point opens its text and swaps the photo.
 * While the block is on screen it also steps through the points by itself, with a
 * progress line on the open one; hovering or focusing inside it holds the current point.
 */
export function LearningShowcase({ items }: { items: LearningItem[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const timer = useRef<gsap.core.Tween | null>(null);
  const onScreen = useRef(false);
  const held = useRef(false);

  const syncTimer = () => {
    if (!timer.current) return;
    if (onScreen.current && !held.current) timer.current.play();
    else timer.current.pause();
  };
  const hold = (value: boolean) => {
    held.current = value;
    syncTimer();
  };

  // List and photo rise in once when the block first scrolls into view.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.learning-list, .learning-photos', {
          opacity: 0,
          y: 44,
          duration: 0.9,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 82%', once: true },
        });
      });
    },
    { scope: root },
  );

  // The progress line on the open item doubles as the auto-advance timer.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        timer.current = gsap.fromTo(
          '.learning-item.is-active .learning-progress',
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: DWELL,
            ease: 'none',
            paused: true,
            onComplete: () => setActive((i) => (i + 1) % items.length),
          },
        );
        const visibility = ScrollTrigger.create({
          trigger: root.current,
          start: 'top 85%',
          end: 'bottom 15%',
          onToggle: (self) => {
            onScreen.current = self.isActive;
            syncTimer();
          },
        });
        onScreen.current = visibility.isActive;
        syncTimer();
        return () => {
          timer.current = null;
        };
      });
    },
    { scope: root, dependencies: [active, items.length], revertOnUpdate: true },
  );

  return (
    <div
      ref={root}
      className="learning-showcase"
      onMouseEnter={() => hold(true)}
      onMouseLeave={() => hold(false)}
      onFocus={() => hold(true)}
      onBlur={() => hold(false)}
    >
      <ol className="learning-list">
        {items.map((item, i) => (
          <li key={item.label} className={i === active ? 'learning-item is-active' : 'learning-item'}>
            <span className="learning-progress" />
            <button
              type="button"
              aria-expanded={i === active}
              aria-controls={`learning-panel-${i}`}
              onClick={() => setActive(i)}
            >
              <span className="learning-num">{String(i + 1).padStart(2, '0')}</span>
              {item.label}
            </button>
            <div className="learning-panel" id={`learning-panel-${i}`}>
              <p>{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="learning-photos">
        {items.map((item, i) => (
          <img
            key={item.photo}
            className={i === active ? 'is-active' : undefined}
            src={item.photo}
            alt={item.alt}
            style={item.focus ? { objectPosition: item.focus } : undefined}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}
