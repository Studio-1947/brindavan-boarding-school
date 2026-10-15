'use client';

import { useRef, useState, type CSSProperties } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { gsap, useGSAP } from '@/lib/gsap';
import { useT } from '@/i18n/ui';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export type DayPhase = { label: string; title: string; text: string };

/*
 * The scene is the real courtyard photo with its sky cut out (courtyard-foreground.webp,
 * transparent where the sky was). Behind it sits a painted sky with the sun, moon and stars;
 * over it sit a colour wash and, for the night, the same view photographed after dark. Every layer shares the photo's 1800x1350
 * coordinate box, so positions below are in that box (or in % of it).
 */
const PHOTO = '/assets/boarding/courtyard-foreground.webp';

/** Look of the scene at each part of the day. tint multiplies the photo; tintA is its strength. */
const LOOKS = [
  // morning
  {
    skyTop: '#8fb0e0',
    skyBot: '#ffc89a',
    tint: '#ffb684',
    tintA: 0.35,
    bright: 0.92,
    sat: 1.05,
    night: 0,
    haze: 0.3,
  },
  // school day
  {
    skyTop: '#4f9bf0',
    skyBot: '#d6ecff',
    tint: '#ffffff',
    tintA: 0,
    bright: 1.04,
    sat: 1.12,
    night: 0,
    haze: 0,
  },
  // afternoon
  {
    skyTop: '#5b94e2',
    skyBot: '#ffe0a3',
    tint: '#ffd38c',
    tintA: 0.3,
    bright: 1,
    sat: 1.12,
    night: 0,
    haze: 0.22,
  },
  // evening
  {
    skyTop: '#2f3478',
    skyBot: '#ff8458',
    tint: '#8a66c4',
    tintA: 0.55,
    bright: 0.6,
    sat: 0.85,
    night: 0.3,
    haze: 0.35,
  },
  // night
  {
    skyTop: '#030920',
    skyBot: '#17245a',
    tint: '#2b3b8f',
    tintA: 0.78,
    bright: 0.36,
    sat: 0.6,
    night: 1,
    haze: 0,
  },
];
const toVars = (l: (typeof LOOKS)[number]) => ({
  '--sky-top': l.skyTop,
  '--sky-bot': l.skyBot,
  '--tint': l.tint,
  '--tint-a': l.tintA,
  '--fg-bright': l.bright,
  '--fg-sat': l.sat,
  '--night': l.night,
  '--haze': l.haze,
});

// fixed, so the server and the browser draw the same stars; all in the sky band of the photo
const STARS = Array.from({ length: 70 }, (_, i) => {
  const r = (n: number) => (((Math.sin(i * 91.7 + n * 12.9) * 43758.5453) % 1) + 1) % 1;
  // rounded so the server and the browser print identical numbers
  return {
    x: Math.round(r(1) * 1800),
    y: Math.round(r(2) * 330),
    size: Math.round((1 + r(3) * 2.2) * 10) / 10,
    delay: Math.round(r(4) * 40) / 10,
  };
});

/**
 * "A typical day" told by scrolling, on the real photo of the school: the scene stays on
 * screen while the sun rises behind the building, crosses the sky and sets behind the
 * pines, the light warms and fades, the windows light up and the stars come out. A card
 * describes each part of the day as it passes. Without the scroll scene (reduced motion)
 * the photo shows daytime and the parts of the day are listed underneath.
 */
export function DayCycle({ phases }: { phases: DayPhase[] }) {
  const root = useRef<HTMLDivElement>(null);
  const t = useT();
  const [active, setActive] = useState(0);
  const last = phases.length - 1;

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      // short screens (phones held sideways) get the static layout: a pinned scene would leave no room
      mm.add('(prefers-reduced-motion: no-preference) and (min-height: 520px)', () => {
        el.classList.add('is-scrolly');
        const frame = el.querySelector('.dc-frame');
        gsap.set(frame, toVars(LOOKS[0]));

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
            onUpdate: (self) => setActive(Math.min(last, Math.floor(self.progress * (last + 1)))),
          },
        });
        LOOKS.slice(1).forEach((look, i) => tl.to(frame, { ...toVars(look), duration: 1 }, i));
        // the sun climbs from behind the building, crosses the sky and sets behind the pines
        tl.to(
          '.dc-sun',
          {
            motionPath: { path: '#dc-sun-path', align: '#dc-sun-path', alignOrigin: [0.5, 0.5] },
            duration: 3.4,
          },
          0,
        )
          .fromTo('.dc-moon', { y: 260, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 3)
          .fromTo('.dc-stars', { opacity: 0 }, { opacity: 1, duration: 0.8 }, 3.1)
          .to('.dc-sun-core', { fill: '#ff8a3d', duration: 0.8 }, 2.2)
          .to('.dc-birds', { opacity: 0, duration: 0.5 }, 2.6);

        document.fonts?.ready.then(() => ScrollTrigger.refresh());
        return () => {
          el.classList.remove('is-scrolly');
          setActive(0);
        };
      });
    },
    { scope: root, dependencies: [last] },
  );

  return (
    <div ref={root} className="daycycle" style={{ '--phases': phases.length } as CSSProperties}>
      <div className="dc-stage">
        <div className="dc-frame" style={toVars(LOOKS[1]) as CSSProperties}>
          <svg className="dc-sky" viewBox="0 0 1800 1350" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="dc-sky-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" style={{ stopColor: 'var(--sky-top)' }} />
                <stop offset="0.45" style={{ stopColor: 'var(--sky-bot)' }} />
              </linearGradient>
              <radialGradient id="dc-sun-glow">
                <stop offset="0" stopColor="#ffe08a" stopOpacity="0.95" />
                <stop offset="1" stopColor="#ffe08a" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="1800" height="1350" fill="url(#dc-sky-fill)" />
            <g className="dc-stars" opacity="0">
              {STARS.map((s, i) => (
                <circle key={i} cx={s.x} cy={s.y} r={s.size} style={{ animationDelay: `${s.delay}s` }} />
              ))}
            </g>
            <path id="dc-sun-path" d="M 150 420 Q 820 -240 1490 470" fill="none" />
            <g className="dc-sun" transform="translate(150 420)">
              <circle r="170" fill="url(#dc-sun-glow)" />
              <circle className="dc-sun-core" r="56" fill="#ffd25a" />
            </g>
            <g className="dc-moon" opacity="0">
              <circle cx="1480" cy="120" r="50" fill="#f4f1e1" />
              <circle cx="1502" cy="106" r="45" style={{ fill: 'var(--sky-top)' }} />
            </g>
            <g className="dc-birds" fill="none" strokeWidth="4" strokeLinecap="round">
              <path d="M760 150 q12 -13 24 0 q12 -13 24 0" />
              <path d="M820 115 q10 -11 20 0 q10 -11 20 0" />
              <path d="M870 165 q9 -10 18 0 q9 -10 18 0" />
            </g>
          </svg>
          <img
            className="dc-photo"
            src={PHOTO}
            width="1800"
            height="1350"
            alt={t(
              'The Brindavan courtyard and blue school building, with boarders playing in house colours',
            )}
          />
          <span className="dc-tint" aria-hidden="true" />
          <span className="dc-haze" aria-hidden="true" />
          {/* the same view photographed at night: fades in through the evening and takes over at night */}
          <img
            className="dc-night"
            src="/assets/boarding/courtyard-night.webp"
            width="1800"
            height="1350"
            alt=""
            loading="lazy"
          />
        </div>
        <ol className="dc-phases">
          {phases.map((phase, i) => (
            <li key={phase.title} className={i === active ? 'is-active' : undefined}>
              <p className="dc-phase-label">
                {String(i + 1).padStart(2, '0')} · {phase.label}
              </p>
              <h3>{phase.title}</h3>
              <p>{phase.text}</p>
            </li>
          ))}
        </ol>
        <ol className="dc-rail" aria-hidden="true">
          {phases.map((phase, i) => (
            <li key={phase.title} className={i <= active ? 'is-reached' : undefined}>
              <span>{phase.label}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
