'use client';

import { useRef, useState, type FocusEvent, type KeyboardEvent } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

export type AwardItem = {
  id: string;
  title: string;
  description: string;
  src: string;
};

type AwardShowcaseProps = {
  ariaLabel: string;
  eyebrow: string;
  items: AwardItem[];
  duration?: number;
};

export function AwardShowcase({ ariaLabel, eyebrow, items, duration = 50 }: AwardShowcaseProps) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const animation = useRef<gsap.core.Tween | null>(null);
  const rateTween = useRef<gsap.core.Tween | null>(null);
  const playback = useRef({ value: 1 });
  const [activeId, setActiveId] = useState<string | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        animation.current = gsap.fromTo(
          track.current,
          { xPercent: 0 },
          { xPercent: -50, duration, ease: 'none', repeat: -1 },
        );
        animation.current.timeScale(playback.current.value);
      });

      return () => {
        rateTween.current?.kill();
        animation.current = null;
        mm.revert();
      };
    },
    { dependencies: [duration] },
  );

  const easeToRate = (value: number) => {
    rateTween.current?.kill();
    rateTween.current = gsap.to(playback.current, {
      value,
      duration: value === 0 ? 0.45 : 0.8,
      ease: 'power2.out',
      overwrite: true,
      onUpdate: () => animation.current?.timeScale(playback.current.value),
    });
  };

  const show = (id: string) => {
    setActiveId(id);
    easeToRate(0);
  };

  const hide = () => {
    setActiveId(null);
    easeToRate(1);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) hide();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      hide();
      (document.activeElement as HTMLElement | null)?.blur();
    }
  };

  const active = items.find((item) => item.id === activeId) ?? null;

  const renderItems = (copy: 'primary' | 'duplicate') =>
    items.map((item) => (
      <button
        className="pill-badge"
        type="button"
        key={`${copy}-${item.id}`}
        tabIndex={copy === 'duplicate' ? -1 : 0}
        aria-describedby={activeId === item.id ? 'award-preview' : undefined}
        onMouseEnter={() => show(item.id)}
        onFocus={() => show(item.id)}
        onClick={() => show(item.id)}
      >
        <i aria-hidden="true" />
        {item.title}
      </button>
    ));

  return (
    <div
      ref={root}
      className="award-showcase"
      onMouseLeave={() => {
        if (!root.current?.contains(document.activeElement)) hide();
      }}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <div className="pill-marquee" aria-label={ariaLabel}>
        <div ref={track} className="pill-track">
          <div className="pill-loop">{renderItems('primary')}</div>
          <div className="pill-loop" aria-hidden="true">
            {renderItems('duplicate')}
          </div>
        </div>
      </div>

      {active && (
        <div className="award-preview" id="award-preview" role="tooltip" key={active.id}>
          <img src={active.src} alt="" />
          <div>
            <span>{eyebrow}</span>
            <strong>{active.title}</strong>
            <p>{active.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
