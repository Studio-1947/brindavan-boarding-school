'use client';

import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap, useGSAP } from '@/lib/gsap';

gsap.registerPlugin(ScrollTrigger);

export type Milestone = { year: string; title: string; text: string };

/** Vertical timeline: the line fills as the page scrolls and each milestone lights up as it is reached. */
export function JourneyTimeline({ milestones }: { milestones: Milestone[] }) {
  const root = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.jt-fill',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'bottom 60%', scrub: 0.5 },
          },
        );
        gsap.utils.toArray<HTMLElement>('.jt-item', root.current).forEach((item) => {
          gsap.from(item.querySelector('.jt-body'), {
            opacity: 0,
            x: 40,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 78%', once: true },
          });
          ScrollTrigger.create({
            trigger: item,
            start: 'top 65%',
            onToggle: (self) => item.classList.toggle('is-reached', self.isActive || self.progress === 1),
            end: 'max',
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <ol ref={root} className="journey-timeline">
      <span className="jt-line" aria-hidden="true">
        <span className="jt-fill" />
      </span>
      {milestones.map((m) => (
        <li key={m.year} className="jt-item">
          <span className="jt-dot" aria-hidden="true" />
          <div className="jt-body">
            <span className="jt-year">{m.year}</span>
            <h3>{m.title}</h3>
            <p>{m.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
