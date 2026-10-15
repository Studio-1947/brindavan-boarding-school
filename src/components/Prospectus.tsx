'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';
import { useT } from '@/i18n/ui';

const ProspectusContext = createContext<() => void>(() => {});

/** Returns a function that opens the "Get the Prospectus" dialog. */
export const useProspectus = () => useContext(ProspectusContext);

export function ProspectusProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useT();
  const form = useRef<HTMLFormElement>(null);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    form.current?.querySelector('input')?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const whatsapp = String(data.get('whatsapp') ?? '').trim();
    const message = `Hi, I would like to request the school prospectus.\nName: ${name}\nMy WhatsApp number: ${whatsapp}`;
    // TODO(contact): placeholder. Replace 910000000000 with the school's real WhatsApp number.
    const url = `https://wa.me/910000000000?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
    e.currentTarget.reset();
    close();
  };

  return (
    <ProspectusContext.Provider value={open}>
      {children}
      <div
        className="modal-overlay"
        id="prospectus-modal"
        hidden={!isOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="modal-box" role="dialog" aria-modal="true" aria-labelledby="prospectus-title">
          <button type="button" className="modal-close" aria-label={t('Close')} onClick={close}>
            ×
          </button>
          <h3 id="prospectus-title">{t('Get the Prospectus')}</h3>
          <p>{t('Share your details and we will send you the prospectus on WhatsApp.')}</p>
          <form id="prospectus-form" ref={form} onSubmit={onSubmit}>
            <label>
              {t('Full name')}
              <input type="text" name="name" required />
            </label>
            <label>
              {t('WhatsApp number')}
              <input type="tel" name="whatsapp" required placeholder="+91 XXXXX XXXXX" />
            </label>
            <button type="submit" className="button">
              {t('Send request')}
            </button>
          </form>
        </div>
      </div>
    </ProspectusContext.Provider>
  );
}

export function ProspectusButton({ className, children }: { className?: string; children: ReactNode }) {
  const open = useProspectus();
  return (
    <button type="button" className={className} onClick={open}>
      {children}
    </button>
  );
}
