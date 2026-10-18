'use client';

import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { Draggable } from 'gsap/Draggable';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap, useGSAP } from '@/lib/gsap';
import { useT } from '@/i18n/ui';

gsap.registerPlugin(Draggable, ScrollTrigger);

export type Moment = { src: string; alt: string; tag: string; title: string; text: string };

/** Degrees the ring turns per pixel dragged. */
const DRAG = 0.22;

/**
 * Photos from the school year standing in a ring in 3D. Drag or flick the ring to spin it (it
 * settles on the nearest photo), click a photo to bring it forward, or step with the arrows and
 * the arrow keys. The caption below follows whichever photo faces the viewer.
 */
export function MomentRing({ moments }: { moments: Moment[] }) {
  const root = useRef<HTMLDivElement>(null);
  const t = useT();
  const count = moments.length;
  const step = 360 / count;
  const angle = useRef({ value: 0 });
  const [active, setActive] = useState(0);
  const goTo = useRef<(index: number) => void>(() => {});

  useGSAP(
    (_, contextSafe) => {
      const el = root.current!;
      const ring = el.querySelector<HTMLElement>('.mr-ring')!;
      const stage = el.querySelector<HTMLElement>('.mr-stage')!;
      const proxy = el.querySelector<HTMLElement>('.mr-proxy')!;
      const cards = gsap.utils.toArray<HTMLElement>('.mr-card', el);
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const render = () => {
        const a = angle.current.value;
        if (!Number.isFinite(a)) return;
        gsap.set(ring, { rotationY: a });
        cards.forEach((card, i) => {
          // how far this photo has turned from facing the viewer: 0 (front) to 180 (back)
          const d = (((i * step + a) % 360) + 360) % 360;
          const off = d > 180 ? 360 - d : d;
          card.style.setProperty('--facing', (1 - off / 180).toFixed(3));
        });
        setActive(((Math.round(-a / step) % count) + count) % count);
      };

      goTo.current = contextSafe!((index: number) => {
        // take the short way round to the photo
        let target = -index * step;
        const current = angle.current.value;
        target += Math.round((current - target) / 360) * 360;
        gsap.to(angle.current, {
          value: target,
          duration: reduce ? 0 : 0.9,
          ease: 'power3.out',
          overwrite: true,
          onUpdate: render,
        });
      });

      // dragging turns the ring directly; on release it coasts on with the flick's speed and
      // settles on the nearest photo
      let startAngle = 0;
      let startX = 0;
      let lastX = 0;
      let lastT = 0;
      let speed = 0;
      const follow = () => {
        const now = performance.now();
        if (now > lastT) speed = speed * 0.5 + ((drag.x - lastX) / (now - lastT)) * 0.5;
        lastX = drag.x;
        lastT = now;
        angle.current.value = startAngle + (drag.x - startX) * DRAG;
        render();
      };
      const [drag] = Draggable.create(proxy, {
        type: 'x',
        trigger: stage,
        onPress() {
          gsap.killTweensOf(angle.current);
          startAngle = angle.current.value;
          startX = lastX = drag.x;
          lastT = performance.now();
          speed = 0;
          stage.classList.add('is-grabbing');
        },
        onDrag: follow,
        onRelease() {
          stage.classList.remove('is-grabbing');
          // a stale speed (the pointer paused before letting go) does not count
          const coast = performance.now() - lastT < 80 && !reduce ? speed * DRAG * 300 : 0;
          const index = Math.round(-(angle.current.value + coast) / step);
          gsap.to(angle.current, {
            value: -index * step,
            duration: reduce ? 0 : 0.9,
            ease: 'power3.out',
            overwrite: true,
            onUpdate: render,
          });
        },
        onClick(e: PointerEvent) {
          const card = (e.target as HTMLElement).closest<HTMLElement>('[data-index]');
          if (card) goTo.current(Number(card.dataset.index));
        },
      });

      if (reduce) {
        render();
      } else {
        // the ring spins into place the first time it scrolls into view
        angle.current.value = 200;
        render();
        gsap
          .timeline({ scrollTrigger: { trigger: stage, start: 'top 80%', once: true } })
          .from(stage.querySelector('.mr-orbit'), {
            rotationX: 40,
            y: 80,
            opacity: 0,
            duration: 1.4,
            ease: 'power3.out',
          })
          .to(angle.current, { value: 0, duration: 2, ease: 'expo.out', onUpdate: render }, 0);
      }

      return () => drag.kill();
    },
    { scope: root, dependencies: [count] },
  );

  const step1 = (delta: number) => goTo.current((active + delta + count) % count);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') step1(1);
    else if (e.key === 'ArrowLeft') step1(-1);
    else return;
    e.preventDefault();
  };

  const moment = moments[active] ?? moments[0];

  return (
    <div ref={root} className="moment-ring" style={{ '--count': count } as CSSProperties}>
      <div
        className="mr-stage"
        role="group"
        aria-roledescription="carousel"
        aria-label={t('Moments from the school year')}
        tabIndex={0}
        onKeyDown={onKey}
      >
        <div className="mr-orbit">
          <div className="mr-ring">
            {moments.map((m, i) => (
              <div
                key={m.src}
                className={i === active ? 'mr-card is-active' : 'mr-card'}
                data-index={i}
                style={{ '--i': i } as CSSProperties}
                aria-hidden={i !== active}
              >
                <img src={m.src} alt={m.alt} draggable={false} />
                <span className="mr-card-tag">{m.tag}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mr-floor" aria-hidden="true" />
        <div className="mr-proxy" aria-hidden="true" />
      </div>
      <div className="mr-caption">
        <button type="button" className="mr-arrow" onClick={() => step1(-1)} aria-label={t('Previous photo')}>
          ←
        </button>
        <div key={active} className="mr-text" aria-live="polite">
          <span className="mr-count">
            {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')} · {moment.tag}
          </span>
          <h3>{moment.title}</h3>
          <p>{moment.text}</p>
        </div>
        <button type="button" className="mr-arrow" onClick={() => step1(1)} aria-label={t('Next photo')}>
          →
        </button>
      </div>
      <p className="mr-hint" aria-hidden="true">
        {t('Drag to spin · click a photo')}
      </p>
    </div>
  );
}
