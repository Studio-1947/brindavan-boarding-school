'use client';

import { useRef, type PointerEvent } from 'react';
import { useT } from '@/i18n/ui';

/**
 * A framed certificate that leans toward the pointer. Clicking it opens the certificate
 * full size in a dialog, so the handwriting can be read.
 */
export function CertificateFrame({ src, alt }: { src: string; alt: string }) {
  const t = useT();
  const frame = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const lean = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== 'mouse' || !frame.current) return;
    const box = frame.current.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width - 0.5;
    const y = (e.clientY - box.top) / box.height - 0.5;
    frame.current.style.setProperty('--ry', `${(x * 12).toFixed(2)}deg`);
    frame.current.style.setProperty('--rx', `${(-y * 12).toFixed(2)}deg`);
    frame.current.style.setProperty('--gx', `${((x + 0.5) * 100).toFixed(1)}%`);
    frame.current.style.setProperty('--gy', `${((y + 0.5) * 100).toFixed(1)}%`);
  };

  const settle = () => {
    frame.current?.style.removeProperty('--ry');
    frame.current?.style.removeProperty('--rx');
  };

  return (
    <>
      <div className="cert-stage">
        <button
          ref={frame}
          type="button"
          className="cert-frame"
          aria-haspopup="dialog"
          aria-label={t('View the certificate full size')}
          onPointerMove={lean}
          onPointerLeave={settle}
          onClick={() => dialog.current?.showModal()}
        >
          <img src={src} alt={alt} loading="lazy" />
          <span className="cert-glare" aria-hidden="true" />
        </button>
        <p className="cert-hint" aria-hidden="true">
          {t('Tap to read it ↗')}
        </p>
      </div>
      <dialog
        ref={dialog}
        className="cert-dialog"
        aria-label={alt}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      >
        <img src={src} alt={alt} />
        <button type="button" className="voice-close" onClick={() => dialog.current?.close()}>
          {t('Close ×')}
        </button>
      </dialog>
    </>
  );
}
