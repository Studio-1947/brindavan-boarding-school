'use client';

import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap, useGSAP } from '@/lib/gsap';

gsap.registerPlugin(ScrollTrigger);

type RoadStoryProps = {
  src: string;
  alt: string;
  caption: string;
  /** Length of the road in kilometres. */
  km: number;
  from: string;
  to: string;
};

/** The road as it runs through the photo, in the photo's own pixels (1280 × 960). */
const ROAD =
  'M1290 935 C1180 880 1060 810 900 735 C780 680 690 665 620 640 C540 610 470 570 420 530 C380 500 335 495 330 470 C328 455 340 448 348 442';

/**
 * The road photo with a line that follows the road as the reader scrolls, and a meter below it
 * that counts the distance from one end to the other. Without motion it shows the whole road.
 */
export function RoadStory({ src, alt, caption, km, from, to }: RoadStoryProps) {
  const root = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const walker = useRef<SVGGElement>(null);
  const reading = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      const line = path.current;
      if (!el || !line) return;
      const length = line.getTotalLength();

      const show = (p: number) => {
        el.style.setProperty('--p', p.toFixed(4));
        const point = line.getPointAtLength(p * length);
        walker.current?.setAttribute('transform', `translate(${point.x} ${point.y})`);
        if (reading.current) reading.current.textContent = (p * km).toFixed(2);
      };

      show(1);
      // The scene holds still while the reader scrolls, and lets go only once the road is complete.
      // Wide screens hold the whole section; on phones the copy sits above, so only the photo and meter hold.
      const pinScene = (target: HTMLElement) => {
        show(0);
        const header = document.querySelector('header')?.offsetHeight ?? 80;
        const progress = { p: 0 };
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: target,
            start: `center ${header + (window.innerHeight - header) / 2}px`,
            end: () => `+=${Math.round(window.innerHeight * 1.3)}`,
            pin: true,
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        });
        tl.to(progress, { p: 1, duration: 1, ease: 'none', onUpdate: () => show(progress.p) })
          // a short hold at 1.50 km, so the full bar is seen before the page moves on
          .to({}, { duration: 0.15 });
        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
          show(1);
        };
      };

      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 901px) and (min-height: 560px)', () =>
        pinScene(el.closest('section') ?? el),
      );
      mm.add('(prefers-reduced-motion: no-preference) and (max-width: 900px) and (min-height: 520px)', () =>
        pinScene(el),
      );
    },
    { scope: root, dependencies: [km] },
  );

  return (
    <div ref={root} className="road-story">
      <figure className="road-photo">
        <img src={src} alt={alt} loading="lazy" />
        <svg viewBox="0 0 1280 960" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path className="road-trace-shadow" d={ROAD} pathLength={1} />
          <path ref={path} className="road-trace" d={ROAD} pathLength={1} />
          <g ref={walker} className="road-walker" transform="translate(348 442)">
            <circle r="24" />
            <circle r="11" />
          </g>
        </svg>
        <figcaption>{caption}</figcaption>
      </figure>
      <div className="road-meter">
        <div className="road-meter-ends">
          <span>{from}</span>
          <p className="road-meter-read">
            <strong ref={reading}>{km.toFixed(2)}</strong> km
          </p>
          <span>{to}</span>
        </div>
        <div className="road-meter-track" aria-hidden="true">
          <span className="road-meter-fill" />
          <span className="road-meter-dot" />
        </div>
        <ol className="road-meter-ticks" aria-hidden="true">
          {Array.from({ length: Math.floor(km * 2) + 1 }, (_, i) => i / 2).map((tick) => (
            <li key={tick} style={{ left: `${(tick / km) * 100}%` }}>
              {tick.toFixed(1)}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
