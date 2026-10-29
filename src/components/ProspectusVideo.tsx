'use client';

import { useRef, useState, type ReactNode } from 'react';
import { useT } from '@/i18n/ui';

/** A button that plays the prospectus film in a dialog. The video only loads once it is opened,
    and closing the dialog removes it, which stops playback. */
export function ProspectusVideoButton({ className, children }: { className?: string; children: ReactNode }) {
  const t = useT();
  const dialog = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={className}
        aria-haspopup="dialog"
        onClick={() => {
          setIsOpen(true);
          dialog.current?.showModal();
        }}
      >
        {children}
      </button>
      <dialog
        ref={dialog}
        className="voice-dialog"
        aria-label={t('Prospectus film')}
        onClose={() => setIsOpen(false)}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      >
        {isOpen && (
          <div className="voice-stage is-landscape">
            <video
              src="/assets/prospectus.mp4"
              poster="/assets/prospectus.webp"
              controls
              autoPlay
              playsInline
              preload="metadata"
            />
          </div>
        )}
        <button type="button" className="voice-close" onClick={() => dialog.current?.close()}>
          {t('Close ×')}
        </button>
      </dialog>
    </>
  );
}
