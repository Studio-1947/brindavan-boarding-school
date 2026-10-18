'use client';

import { useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap, useGSAP } from '@/lib/gsap';

gsap.registerPlugin(ScrollTrigger);

export type RouteStop = {
  label: string;
  tag: string;
  title: string;
  text: string;
  src: string;
  alt: string;
  /** Photographer and licence, for photos that are not the school's own. */
  credit?: { text: string; href: string };
};

/** Where in each transition (0 to 1) the next stop counts as reached. */
const REACHED = 0.5;

/**
 * The journey to Seeyok Fatak as a sequence of photographs. On wide screens the section pins:
 * scrolling wipes each stop's photo up over the last while the previous one sinks back, and a
 * route track along the bottom fills in stop by stop. Elsewhere each card carries its own photo.
 */
export function VisitRoute({
  heading,
  stops,
  note,
}: {
  heading: ReactNode;
  stops: RouteStop[];
  note: string;
}) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const el = root.current!;
      const shots = gsap.utils.toArray<HTMLElement>('.vr-shot', el);
      const legs = shots.length - 1;
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 901px) and (min-height: 600px)', () => {
        const header = document.querySelector('header')?.offsetHeight ?? 80;
        el.classList.add('is-pinned');

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: el,
            start: `top ${header}px`,
            end: `+=${legs * 90}%`,
            pin: true,
            scrub: 0.7,
            onUpdate: (self) => {
              const leg = self.progress * legs;
              setActive(Math.min(legs, Math.floor(leg + 1 - REACHED)));
            },
          },
        });

        // each photo drifts slowly the whole way through, so a held stop never looks frozen
        shots.forEach((shot) =>
          tl.fromTo(shot.querySelector('img'), { scale: 1.18 }, { scale: 1.04, duration: legs }, 0),
        );
        tl.fromTo('.vr-track-fill', { scaleX: 0 }, { scaleX: 1, duration: legs }, 0);

        shots.slice(1).forEach((shot, i) => {
          const prev = shots[i];
          tl.fromTo(
            shot,
            { clipPath: 'inset(100% 0% 0% 0% round 28px 0px 28px 28px)' },
            { clipPath: 'inset(0% 0% 0% 0% round 28px 0px 28px 28px)', duration: 0.7, ease: 'power2.inOut' },
            i + 0.15,
          )
            .fromTo(
              shot.querySelector('.vr-shot-chip'),
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.3 },
              i + 0.55,
            )
            .to(
              prev,
              { scale: 0.9, rotationX: 10, filter: 'brightness(0.55)', duration: 0.7, ease: 'power2.inOut' },
              i + 0.15,
            );
        });

        return () => el.classList.remove('is-pinned');
      });

      mm.add(
        '(prefers-reduced-motion: no-preference) and (max-width: 900px), (prefers-reduced-motion: no-preference) and (max-height: 599px)',
        () => {
          gsap.utils.toArray<HTMLElement>('.vr-card', el).forEach((card) => {
            gsap.from(card, {
              opacity: 0,
              y: 50,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 85%', once: true },
            });
          });
        },
      );
    },
    { scope: root, dependencies: [stops.length] },
  );

  return (
    <section ref={root} className="section academics visit-route">
      <div className="vr-side">
        <div className="vr-heading">{heading}</div>
        <ol className="vr-cards">
          {stops.map((stop, i) => (
            <li
              key={stop.title}
              className={['vr-card', i === active && 'is-active', i < active && 'is-past']
                .filter(Boolean)
                .join(' ')}
              aria-current={i === active ? 'step' : undefined}
            >
              <figure className="vr-card-photo">
                <img src={stop.src} alt={stop.alt} loading="lazy" />
                {stop.credit && (
                  <a className="vr-credit" href={stop.credit.href} target="_blank" rel="noopener">
                    {stop.credit.text}
                  </a>
                )}
              </figure>
              <span className="card-number">{String(i + 1).padStart(2, '0')}</span>
              <span className="stage">{stop.tag}</span>
              <h3>{stop.title}</h3>
              <p>{stop.text}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="vr-view">
        <div className="vr-viewport">
          {stops.map((stop, i) => (
            <figure key={stop.src} className="vr-shot" style={{ zIndex: i + 1 } as CSSProperties}>
              <img src={stop.src} alt={stop.alt} />
              <span className="vr-shot-chip">
                <b>{String(i + 1).padStart(2, '0')}</b> {stop.title}
              </span>
              {stop.credit && (
                <a className="vr-credit" href={stop.credit.href} target="_blank" rel="noopener">
                  {stop.credit.text}
                </a>
              )}
            </figure>
          ))}
          <div className="vr-track" style={{ '--n': stops.length } as CSSProperties} aria-hidden="true">
            <span className="vr-track-line">
              <span className="vr-track-fill" />
            </span>
            <ol>
              {stops.map((stop, i) => (
                <li key={stop.label} className={i <= active ? 'is-reached' : undefined}>
                  <i />
                  <span>{stop.label}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <p className="vr-note">{note}</p>
      </div>
    </section>
  );
}
