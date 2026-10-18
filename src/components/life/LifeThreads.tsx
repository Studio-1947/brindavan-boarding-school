'use client';

import { useRef, type ReactNode } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap, useGSAP } from '@/lib/gsap';

gsap.registerPlugin(ScrollTrigger);

/**
 * The three threads of life outside class as a horizontal gallery. On wide screens the section
 * pins and the panels travel sideways as the page scrolls, each swinging in like a door with its
 * photo drifting inside the frame. Narrow or short screens get a plain vertical stack.
 */
export function LifeThreads({ heading, children }: { heading: ReactNode; children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const track = el.querySelector<HTMLElement>('.lt-track')!;
      const panels = gsap.utils.toArray<HTMLElement>('.lt-panel', el);
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 901px) and (min-height: 560px)', () => {
        const header = document.querySelector('header')?.offsetHeight ?? 80;
        const distance = () => track.scrollWidth - el.clientWidth;
        const setProgress = gsap.quickSetter('.lt-progress span', 'scaleX');
        setProgress(0);

        const travel = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: `top ${header}px`,
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => setProgress(self.progress),
          },
        });

        panels.forEach((panel) => {
          const inView = { containerAnimation: travel, trigger: panel, scrub: true };
          gsap.fromTo(
            panel,
            { rotationY: -28, scale: 0.86, transformPerspective: 1600, transformOrigin: '0% 50%' },
            {
              rotationY: 0,
              scale: 1,
              ease: 'power2.out',
              scrollTrigger: { ...inView, start: 'left right', end: 'left 35%' },
            },
          );
          gsap.fromTo(
            panel.querySelector('.lt-photo img'),
            { xPercent: -9 },
            {
              xPercent: 9,
              ease: 'none',
              scrollTrigger: { ...inView, start: 'left right', end: 'right left' },
            },
          );
          gsap.from(panel.querySelectorAll('.lt-motto, .lt-body > *'), {
            opacity: 0,
            y: 40,
            stagger: 0.08,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              containerAnimation: travel,
              trigger: panel,
              start: 'left 70%',
              toggleActions: 'play none none reverse',
            },
          });
        });
      });

      mm.add(
        '(prefers-reduced-motion: no-preference) and (max-width: 900px), (prefers-reduced-motion: no-preference) and (max-height: 559px)',
        () => {
          panels.forEach((panel) => {
            gsap.from(panel, {
              opacity: 0,
              y: 60,
              rotationX: -12,
              transformPerspective: 1200,
              transformOrigin: '50% 100%',
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: { trigger: panel, start: 'top 85%', once: true },
            });
          });
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="life-threads">
      <div className="lt-track">
        <div className="lt-intro">{heading}</div>
        {children}
      </div>
      <div className="lt-progress" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
