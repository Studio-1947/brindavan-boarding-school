'use client';

import { useRef, type ReactNode } from 'react';
import { inView } from 'motion';
import { gsap, useGSAP } from '@/lib/gsap';

type CountUpProps = {
  target: number;
  className?: string;
  children?: ReactNode;
};

/** Counts from 0 to `target` the first time the number is at least half on screen. */
export function CountUp({ target, className, children }: CountUpProps) {
  const el = useRef<HTMLSpanElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const node = el.current;
      if (!node) return;
      const progress = { value: 0 };
      return inView(
        node,
        contextSafe!(() => {
          gsap.to(progress, {
            value: 1,
            duration: 1.4,
            ease: 'power2.out',
            onUpdate: () => {
              node.textContent = Math.round(progress.value * target).toLocaleString();
            },
          });
        }),
        { amount: 0.5 },
      );
    },
    { dependencies: [target] },
  );

  return (
    <span ref={el} className={className} data-target={target}>
      {children}
    </span>
  );
}
