'use client';

import { useRef, type CSSProperties, type ReactNode } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { gsap, useGSAP } from '@/lib/gsap';

gsap.registerPlugin(ScrollTrigger, SplitText);

export type HeroPhoto = { src: string; alt: string; tag: string };

/**
 * Where each print floats in the scene: depth toward the viewer (px), turn and tilt (deg), and
 * which way it drifts (px) as the hero scrolls away. Layout on the stage is set in CSS.
 */
const POSES = [
  { z: 0, rotationY: -10, rotation: -2, dx: -40, dy: -30 },
  { z: 140, rotationY: 16, rotation: 4, dx: 120, dy: -110 },
  { z: 90, rotationY: -20, rotation: -6, dx: -150, dy: 90 },
  { z: 200, rotationY: 12, rotation: 3, dx: 130, dy: 120 },
];

const restingTransform = ({ z, rotationY, rotation }: (typeof POSES)[number]) =>
  `translateZ(${z}px) rotateY(${rotationY}deg) rotate(${rotation}deg)`;

/**
 * Beyond-class opening. The headline rises in word by word while photo prints fly in through
 * 3D space. The cluster leans toward the pointer and drifts apart as the page scrolls on.
 */
export function LifeHero({ photos, children }: { photos: HeroPhoto[]; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.lh-card', root.current);
      cards.forEach((card, i) => {
        const { z, rotationY, rotation } = POSES[i % POSES.length];
        gsap.set(card, { z, rotationY, rotation });
      });
      // the orbit rings lie tilted back in the scene (CSS holds the same tilt for first paint)
      gsap.set('.lh-orbit--a', { xPercent: -50, yPercent: -50, rotationX: 72, rotationY: -8 });
      gsap.set('.lh-orbit--b', { xPercent: -50, yPercent: -50, rotationX: 62, rotationY: 24 });

      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // no clipping mask: a mask cuts off descenders
        const split = SplitText.create('.lh-title', { type: 'words' });
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('.lh-copy > :not(h1)', { opacity: 0, y: 18, duration: 0.7, stagger: 0.08 })
          .from(split.words, { opacity: 0, yPercent: 70, rotationX: -50, duration: 1, stagger: 0.06 }, 0.1)
          .from(
            cards,
            {
              opacity: 0,
              z: -900,
              rotationX: -35,
              duration: 1.5,
              stagger: 0.12,
              ease: 'expo.out',
            },
            0.25,
          )
          .from('.lh-tag', { opacity: 0, scale: 0.4, duration: 0.6, stagger: 0.1, ease: 'back.out(2)' }, 1.1);

        gsap.to('.lh-orbit--a', { rotationZ: '+=360', duration: 48, ease: 'none', repeat: -1 });
        gsap.to('.lh-orbit--b', { rotationZ: '-=360', duration: 30, ease: 'none', repeat: -1 });

        // as the hero leaves, the cluster turns away and the prints drift apart
        const leave = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.8 };
        gsap.to('.lh-scene', { rotationY: -18, rotationX: 14, z: -160, ease: 'none', scrollTrigger: leave });
        // drift is tuned for a desktop-sized stage; a phone stage gets a proportionally smaller one
        const reach = () =>
          window.innerWidth > 900
            ? 1
            : Math.min(1, (root.current?.querySelector('.lh-stage')?.clientWidth ?? 900) / 900);
        cards.forEach((card, i) => {
          const { dx, dy } = POSES[i % POSES.length];
          gsap.to(card, {
            x: () => dx * reach(),
            y: () => dy * reach(),
            ease: 'none',
            scrollTrigger: { ...leave, invalidateOnRefresh: true },
          });
        });
      });

      // the whole cluster leans toward a mouse pointer
      mm.add('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)', () => {
        const el = root.current!;
        const rotX = gsap.quickTo('.lh-tilt', 'rotationX', { duration: 0.9, ease: 'power3.out' });
        const rotY = gsap.quickTo('.lh-tilt', 'rotationY', { duration: 0.9, ease: 'power3.out' });
        const move = (e: PointerEvent) => {
          const box = el.getBoundingClientRect();
          rotY(((e.clientX - box.left) / box.width - 0.5) * 22);
          rotX(((e.clientY - box.top) / box.height - 0.5) * -16);
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
    <div ref={root} className="life-hero">
      <section className="section page-intro lh-intro">
        <div className="lh-copy">{children}</div>
        <div className="lh-stage">
          <div className="lh-tilt">
            <div className="lh-scene">
              <span className="lh-orbit lh-orbit--a" aria-hidden="true">
                <i />
              </span>
              <span className="lh-orbit lh-orbit--b" aria-hidden="true">
                <i />
              </span>
              {photos.map((photo, i) => (
                <figure
                  key={photo.src}
                  className="lh-card"
                  style={{ transform: restingTransform(POSES[i % POSES.length]) } as CSSProperties}
                >
                  <img src={photo.src} alt={photo.alt} />
                  <figcaption className="lh-tag">{photo.tag}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
