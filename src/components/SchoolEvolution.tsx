'use client';

import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap, useGSAP } from '@/lib/gsap';

gsap.registerPlugin(ScrollTrigger);

type Moment = { year: number; photo: string; alt: string };
export type EvolutionChapter = { eyebrow: string; title: string; text: string };

type SchoolEvolutionProps = {
  then: Moment;
  now: Moment;
  /** Text cards that scroll past the photo, one per screen of scrolling. */
  chapters: EvolutionChapter[];
};

/**
 * Then-and-now story told by scrolling. The photo stays fixed on screen while the text
 * chapters scroll over it: the old photo grows from a small print, the new photo wipes
 * across it as the year counts up, and the frame opens out to fill the screen.
 * Without the scroll scene (reduced motion) the two photos and the text simply stack.
 */
export function SchoolEvolution({ then, now, chapters }: SchoolEvolutionProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      // short screens (phones held sideways) get the static layout: a pinned scene would leave no room
      mm.add('(prefers-reduced-motion: no-preference) and (min-height: 520px)', () => {
        el.classList.add('is-scrolly');
        const year = el.querySelector<HTMLElement>('.evolution-year');
        const count = { value: then.year };

        gsap.set('.evolution-frame', { scale: 0.58, rotate: -3, borderRadius: 28 });
        gsap.set('.evolution-now', { clipPath: 'inset(0% 100% 0% 0%)' });
        gsap.set('.evolution-now img', { scale: 1.12 });
        gsap.set('.evolution-divider', { left: '0%', opacity: 0 });

        // The whole block is the scroll distance; the stage inside it is position: sticky.
        const story = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
        });
        story
          // 1. the old print comes forward
          .to('.evolution-frame', { scale: 0.82, rotate: -1, duration: 3 }, 0)
          // 2. today's campus wipes across it while the year counts up
          .to('.evolution-divider', { opacity: 1, duration: 0.2 }, 3)
          .to('.evolution-now', { clipPath: 'inset(0% 0% 0% 0%)', duration: 4 }, 3)
          .to('.evolution-divider', { left: '100%', duration: 4 }, 3)
          .to('.evolution-frame', { scale: 0.92, rotate: 0, duration: 4 }, 3)
          .to(
            count,
            {
              value: now.year,
              duration: 4,
              onUpdate: () => {
                if (year) year.textContent = String(Math.round(count.value));
              },
            },
            3,
          )
          .to('.evolution-divider', { opacity: 0, duration: 0.2 }, 6.8)
          // 3. the frame opens out to fill the screen
          .to('.evolution-frame', { scale: 1, borderRadius: 0, duration: 3 }, 7)
          .to('.evolution-now img', { scale: 1, duration: 3 }, 7);

        // Each text card fades up as its chapter arrives and away as it leaves.
        gsap.utils.toArray<HTMLElement>('.evolution-card', el).forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 70 },
            {
              opacity: 1,
              y: 0,
              ease: 'power2.out',
              scrollTrigger: { trigger: card, start: 'top 92%', end: 'top 55%', scrub: 0.4 },
            },
          );
        });

        document.fonts?.ready.then(() => ScrollTrigger.refresh());

        return () => {
          el.classList.remove('is-scrolly');
          if (year) year.textContent = String(then.year);
        };
      });
    },
    { scope: root, dependencies: [then.year, now.year] },
  );

  return (
    <div ref={root} className="evolution">
      <div className="evolution-stage">
        <div className="evolution-frame">
          <figure className="evolution-then">
            <img src={then.photo} alt={then.alt} />
            <figcaption>{then.year}</figcaption>
          </figure>
          <figure className="evolution-now">
            <img src={now.photo} alt={now.alt} />
            <figcaption>{now.year}</figcaption>
          </figure>
          <span className="evolution-divider" aria-hidden="true" />
          <span className="evolution-year" aria-hidden="true">
            {then.year}
          </span>
        </div>
      </div>
      <div className="evolution-chapters">
        {chapters.map((chapter) => (
          <section key={chapter.title} className="evolution-chapter">
            <div className="evolution-card">
              <p className="eyebrow">{chapter.eyebrow}</p>
              <h3>{chapter.title}</h3>
              <p>{chapter.text}</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
