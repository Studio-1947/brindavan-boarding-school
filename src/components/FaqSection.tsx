'use client';

import { useEffect, useRef, type ComponentProps } from 'react';

/** A section whose <details> items behave as an accordion: opening one closes the others. */
export function FaqSection({ children, ...props }: ComponentProps<'section'>) {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = Array.from(section.current?.querySelectorAll('details') ?? []);
    const onToggle = (e: Event) => {
      const item = e.currentTarget as HTMLDetailsElement;
      if (!item.open) return;
      items.forEach((other) => {
        if (other !== item) other.open = false;
      });
    };
    items.forEach((item) => item.addEventListener('toggle', onToggle));
    return () => items.forEach((item) => item.removeEventListener('toggle', onToggle));
  }, []);

  return (
    <section ref={section} {...props}>
      {children}
    </section>
  );
}
