'use client';

import { useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap, useGSAP } from '@/lib/gsap';

gsap.registerPlugin(ScrollTrigger);

export type Stage = {
  /** Short caption shown on the progress rail. */
  label: string;
  title: string;
  photo: string;
  link: { href: string; text: string };
};

/** How much wider the stage in focus is than the other two. */
const FOCUS_GROW = 2.4;
/** Pixels of scrolling spent travelling from one stage to the next. */
const SCROLL_PER_STAGE = 650;

/**
 * The school's stages as a journey. On wide screens the row pins while the page scrolls:
 * a progress rail fills and each stage's photo opens up in turn. Smaller screens, and
 * visitors who prefer reduced motion, get the plain cards.
 */
export function StageJourney({ stages }: { stages: Stage[] }) {
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const last = stages.length - 1;

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const cards = gsap.utils.toArray<HTMLElement>('.photo-card', el);
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1001px) and (prefers-reduced-motion: no-preference)', () => {
        el.classList.add('is-scrolly');
        gsap.set(cards, { flexGrow: (i) => (i === 0 ? FOCUS_GROW : 1) });

        // Cards rise in once as the row first comes into view.
        gsap.from(cards, {
          opacity: 0,
          y: 48,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });

        // One unit of timeline per step between stages, tied to the scroll position.
        const journey = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: el,
            start: 'center center',
            end: `+=${last * SCROLL_PER_STAGE}`,
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            onUpdate: (self) => setActive(Math.round(self.progress * last)),
          },
        });
        journey.to('.stage-rail-fill', { scaleX: 1, duration: last }, 0);
        journey.to('.stage-rail-marker', { left: '100%', duration: last }, 0);
        for (let i = 0; i < last; i++) {
          journey.to(cards[i], { flexGrow: 1, duration: 1, ease: 'power1.inOut' }, i);
          journey.to(cards[i + 1], { flexGrow: FOCUS_GROW, duration: 1, ease: 'power1.inOut' }, i);
        }
        trigger.current = journey.scrollTrigger ?? null;

        // Web fonts change heights further up the page; measure again once they are in.
        document.fonts?.ready.then(() => ScrollTrigger.refresh());

        // Pinning makes the page longer, which strands a visitor who arrived at a #link further
        // down (the "All teachers" link lands on #faculty). Put them back on their target.
        const target = document.getElementById(window.location.hash.slice(1));
        if (target) {
          requestAnimationFrame(() =>
            requestAnimationFrame(() => target.scrollIntoView({ behavior: 'instant' })),
          );
        }

        return () => {
          trigger.current = null;
          el.classList.remove('is-scrolly');
          setActive(0);
        };
      });

      mm.add('(max-width: 1000px) and (prefers-reduced-motion: no-preference)', () => {
        cards.forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          });
        });
      });
    },
    { scope: root, dependencies: [last] },
  );

  // Rail steps and cards jump the page to their stage (only while the scroll scene is running).
  const goTo = (index: number) => {
    const st = trigger.current;
    if (!st || last === 0) return;
    window.scrollTo({ top: st.start + ((st.end - st.start) * index) / last, behavior: 'smooth' });
  };

  return (
    <div ref={root} className="stage-journey">
      <div className="stage-rail">
        <span className="stage-rail-track">
          <span className="stage-rail-fill" />
          <span className="stage-rail-marker" />
        </span>
        <ol>
          {stages.map((stage, i) => (
            <li key={stage.title} className={i <= active ? 'is-reached' : undefined}>
              <button type="button" aria-current={i === active ? 'step' : undefined} onClick={() => goTo(i)}>
                <span className="stage-rail-dot" />
                <span className="stage-rail-label">
                  {String(i + 1).padStart(2, '0')} · {stage.label}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className="academic-grid">
        {stages.map((stage, i) => (
          <article
            key={stage.title}
            className={i === active ? 'photo-card is-active' : 'photo-card'}
            style={{ '--photo': `url('${stage.photo}')` } as CSSProperties}
            onClick={() => goTo(i)}
          >
            <h3>{stage.title}</h3>
            <Link href={stage.link.href}>{stage.link.text}</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
