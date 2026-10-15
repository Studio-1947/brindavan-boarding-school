'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { gsap, useGSAP } from '@/lib/gsap';
import { localizeHref } from '@/i18n/lang';
import { useLang, useT } from '@/i18n/ui';

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Boarding page opening: the headline rises in word by word,
 * then a wide courtyard photo opens out of a rounded window as the page scrolls.
 */
export function BoardingHero() {
  const root = useRef<HTMLDivElement>(null);
  const lang = useLang();
  const t = useT();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // no clipping mask: a mask cuts off descenders such as the g in Belonging
        const split = SplitText.create('.bh-title', { type: 'words' });
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('.bh-kicker > *', { opacity: 0, y: 16, duration: 0.6, stagger: 0.08 })
          .from(split.words, { opacity: 0, yPercent: 60, duration: 0.9, stagger: 0.06 }, 0.15)
          .from('.bh-lead', { opacity: 0, y: 24, duration: 0.8 }, 0.55)
          .from('.bh-bird', { opacity: 0, scale: 0, transformOrigin: '50% 50%', stagger: 0.12 }, 1.2);

        // the photo window opens to full width as it scrolls up the screen
        gsap.fromTo(
          '.bh-photo',
          { clipPath: 'inset(6% 12% 6% 12% round 40px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 0px)',
            ease: 'none',
            scrollTrigger: { trigger: '.bh-photo', start: 'top 92%', end: 'top 15%', scrub: 0.6 },
          },
        );
        gsap.fromTo(
          '.bh-photo img',
          { scale: 1.25, yPercent: -6 },
          {
            scale: 1,
            yPercent: 6,
            ease: 'none',
            scrollTrigger: { trigger: '.bh-photo', start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
        gsap.from('.bh-chip', {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'back.out(1.6)',
          scrollTrigger: { trigger: '.bh-photo', start: 'top 45%', once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="boarding-hero">
      <section className="section page-intro bh-intro">
        <svg className="bh-birds" viewBox="0 0 160 80" aria-hidden="true">
          <path className="bh-bird" d="M10 40 q8 -9 16 0 q8 -9 16 0" />
          <path className="bh-bird" d="M60 20 q6 -7 12 0 q6 -7 12 0" />
          <path className="bh-bird" d="M100 48 q5 -6 10 0 q5 -6 10 0" />
        </svg>
        <div className="bh-kicker">
          <Link className="text-link" href={localizeHref('/', lang)} prefetch={false}>
            <span className="back-arrow">←</span> {t('Back to home')}
          </Link>
          <p className="eyebrow">{t('A COMMUNITY TO CALL YOUR OWN')}</p>
        </div>
        <h1 className="bh-title">
          {t('School is a chapter.')}
          <br />
          {t('Belonging is')}
          <br />
          <em>{t('for life.')}</em>
        </h1>
        <p className="lead bh-lead">
          {t(
            'Choosing a boarding school is a personal decision. This page walks through what boarding life at Brindavan generally involves, so a visit can focus on the specific details that matter to your family.',
          )}
        </p>
      </section>
      <figure className="bh-photo">
        <img
          src="/assets/boarding/courtyard-blocks.webp"
          width="1800"
          height="1013"
          alt={t('Boarders playing football in the courtyard between the blue classroom blocks')}
        />
        <figcaption className="bh-chip">
          <span aria-hidden="true">●</span> {t('The courtyard, between classes')}
        </figcaption>
      </figure>
    </div>
  );
}
