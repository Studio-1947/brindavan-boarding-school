'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { SCHOOL_PHONE, SCHOOL_PHONE_DISPLAY } from '@/lib/contact';
import { useT } from '@/i18n/ui';

const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
  </svg>
);

/** A round phone button in the header. It opens a small card with the school's number and a Call button. */
export function CallButton() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      trigger.current?.focus();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={root} className={`call-pop${open ? ' is-open' : ''}`}>
      <button
        ref={trigger}
        type="button"
        className="call-circle"
        aria-label={t('Call the school')}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <PhoneIcon />
      </button>
      <div id={panelId} className="call-panel" role="dialog" aria-label={t('Call the school')} hidden={!open}>
        <p className="call-panel-label">{t('Talk to the school')}</p>
        <p className="call-panel-number">{SCHOOL_PHONE_DISPLAY}</p>
        <a className="call-panel-btn" href={`tel:${SCHOOL_PHONE}`} onClick={() => setOpen(false)}>
          <PhoneIcon />
          {t('Call now')}
        </a>
      </div>
    </div>
  );
}
