'use client';

import { useRef, useState, type ReactNode } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { gsap, useGSAP } from '@/lib/gsap';
import { useT } from '@/i18n/ui';

gsap.registerPlugin(ScrollTrigger, SplitText);

export type Photo = { src: string; alt: string };
export type Credit = { text: string; href: string };

/**
 * Visit opening: a picture postcard from Mirik held in 3D, with a second print tucked behind
 * it. The card leans toward the pointer and turns over (click, tap or Enter) to show the school
 * gate and its address. The photo drifts and the card tips back as the page scrolls on.
 */
export function VisitHero({
  children,
  front,
  back,
  behind,
  greeting,
  stamp,
  title,
  place,
  credits,
}: {
  children: ReactNode;
  front: Photo;
  back: Photo;
  behind: Photo;
  greeting: string;
  stamp: string;
  title: string;
  place: string;
  credits: Credit[];
}) {
  const root = useRef<HTMLDivElement>(null);
  const t = useT();
  const [flipped, setFlipped] = useState(false);

  useGSAP(
    () => {
      const el = root.current!;
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const split = SplitText.create('.vh-title', { type: 'words' });
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('.vh-copy > :not(h1)', { opacity: 0, y: 18, duration: 0.7, stagger: 0.08 })
          .from(split.words, { opacity: 0, yPercent: 70, rotationX: -50, duration: 1, stagger: 0.06 }, 0.1)
          .from('.vh-behind', { opacity: 0, x: -80, rotation: -18, duration: 1.2 }, 0.3)
          .from(
            '.vh-enter',
            { opacity: 0, z: -600, rotationY: -70, rotationX: 20, duration: 1.6, ease: 'expo.out' },
            0.35,
          )
          .from('.vh-stamp, .vh-greeting, .vh-hint', { opacity: 0, y: 20, stagger: 0.1, duration: 0.6 }, 1.2);

        // as the page scrolls on, the card tips back and the photo drifts inside it
        const leave = { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.8 };
        gsap.to('.vh-turn', { rotationX: 10, rotationZ: -3, y: 50, ease: 'none', scrollTrigger: leave });
        gsap.fromTo(
          '.vh-front img',
          { scale: 1.08 },
          { scale: 1.25, yPercent: 5, ease: 'none', scrollTrigger: leave },
        );
        gsap.to('.vh-behind', { rotation: -16, x: -60, y: 90, ease: 'none', scrollTrigger: leave });
      });

      mm.add('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)', () => {
        const rotX = gsap.quickTo('.vh-tilt', 'rotationX', { duration: 0.8, ease: 'power3.out' });
        const rotY = gsap.quickTo('.vh-tilt', 'rotationY', { duration: 0.8, ease: 'power3.out' });
        const move = (e: PointerEvent) => {
          const box = el.getBoundingClientRect();
          const x = (e.clientX - box.left) / box.width;
          rotY((x - 0.5) * 22);
          rotX(((e.clientY - box.top) / box.height - 0.5) * -16);
          el.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`);
        };
        const reset = () => {
          rotX(0);
          rotY(0);
        };
        el.addEventListener('pointermove', move);
        el.addEventListener('pointerleave', reset);
        return () => {
          el.removeEventListener('pointermove', move);
          el.removeEventListener('pointerleave', reset);
        };
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="visit-hero">
      <section className="section page-intro vh-intro">
        <div className="vh-copy">{children}</div>
        <div className="vh-view">
          <div className="vh-tilt">
            <figure className="vh-behind">
              <img src={behind.src} alt={behind.alt} />
            </figure>
            <div className="vh-turn">
              <span className="vh-enter">
                <button
                  type="button"
                  className={flipped ? 'vh-card is-flipped' : 'vh-card'}
                  aria-pressed={flipped}
                  aria-label={t('Turn the postcard over')}
                  onClick={() => setFlipped((f) => !f)}
                >
                  <span className="vh-face vh-front">
                    <img src={front.src} alt={front.alt} />
                    <span className="vh-stamp">{stamp}</span>
                    <span className="vh-greeting">{greeting}</span>
                    <span className="vh-hint">{t('Turn over ↻')}</span>
                  </span>
                  <span className="vh-face vh-back">
                    <img src={back.src} alt={back.alt} />
                    <span className="vh-address">
                      <b>{title}</b>
                      <small>{place}</small>
                    </span>
                    <span className="vh-postmark" aria-hidden="true">
                      734214
                    </span>
                  </span>
                </button>
              </span>
            </div>
          </div>
          <p className="vh-credits">
            {t('Photos:')}{' '}
            {credits.map((credit, i) => (
              <span key={credit.href}>
                {i > 0 && ' · '}
                <a href={credit.href} target="_blank" rel="noopener">
                  {credit.text}
                </a>
              </span>
            ))}
          </p>
        </div>
      </section>
    </div>
  );
}
