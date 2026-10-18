'use client';

import { useRef, useState, type ReactNode } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { gsap, useGSAP } from '@/lib/gsap';
import { useT } from '@/i18n/ui';

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * The "find us" band. The big place name flips up letter by letter in 3D when it scrolls into
 * view, and the photo of the gate tips toward a mouse pointer.
 */
export function VisitFind({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const split = SplitText.create('.vf-place', { type: 'chars' });
        gsap
          .timeline({ scrollTrigger: { trigger: el, start: 'top 70%', once: true } })
          .from(split.chars, {
            rotationX: -100,
            yPercent: 40,
            opacity: 0,
            transformOrigin: '50% 100% -20px',
            duration: 1.1,
            stagger: 0.07,
            ease: 'back.out(1.7)',
          })
          .from('.vf-card', { rotationY: -35, x: 80, opacity: 0, duration: 1.2, ease: 'power3.out' }, 0.1)
          .from('.vf-copy > *', { opacity: 0, y: 24, duration: 0.7, stagger: 0.07, ease: 'power3.out' }, 0.2);
      });

      mm.add('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)', () => {
        const card = el.querySelector<HTMLElement>('.vf-card');
        if (!card) return;
        gsap.set(card, { transformPerspective: 1000 });
        const rotX = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3.out' });
        const rotY = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3.out' });
        const move = (e: PointerEvent) => {
          const box = card.getBoundingClientRect();
          rotY(((e.clientX - box.left) / box.width - 0.5) * 18);
          rotX(((e.clientY - box.top) / box.height - 0.5) * -14);
        };
        const leave = () => {
          rotX(0);
          rotY(0);
        };
        card.addEventListener('pointermove', move);
        card.addEventListener('pointerleave', leave);
        return () => {
          card.removeEventListener('pointermove', move);
          card.removeEventListener('pointerleave', leave);
        };
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="visit visit-find">
      {children}
    </section>
  );
}

/** Copies the school's postal address, for pasting into a maps or taxi app. */
export function CopyAddress({ clipboard }: { clipboard: string }) {
  const t = useT();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(clipboard);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button type="button" className={copied ? 'vf-copy-btn is-copied' : 'vf-copy-btn'} onClick={copy}>
      <span aria-live="polite">{copied ? t('Address copied ✓') : t('Copy address')}</span>
    </button>
  );
}
