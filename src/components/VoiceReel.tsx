'use client';

import Link from 'next/link';
import { useRef, useState, type CSSProperties } from 'react';
import { SwooshArrow } from '@/components/icons';
import { localizeHref } from '@/i18n/lang';
import { useLang, useT } from '@/i18n/ui';

type Voice = {
  slug: string;
  name: string;
  role: 'Student' | 'Teacher';
  /** Class for students, subject for teachers. Falls back to the role when unknown. */
  detail?: string;
  /** Frame shape: square (1:1, the edited films), upright phone footage (9:16) or landscape (16:9). */
  shape: 'square' | 'portrait' | 'landscape';
  /** File name in public/assets/voices. Defaults to the legacy MP4 named after the slug. */
  video?: string;
  /** Seconds. */
  duration: number;
  /** True when there is a <slug>.en.vtt. The edited films have no captions. */
  captions?: boolean;
};

/* Footage lives in public/assets/voices. The newly supplied films use WebM; Chandana Ghimire's
   testimonial remains on its edited MP4 because no replacement was supplied. Card images use <slug>.webp. */
const VOICES: Voice[] = [
  {
    slug: 'shradha-tamang',
    name: 'Shradha Tamang',
    role: 'Student',
    detail: 'Class 12',
    shape: 'square',
    video: 'shradha-tamang.webm',
    duration: 67,
  },
  {
    slug: 'anirudh-gupta',
    name: 'Anirudh Gupta',
    role: 'Student',
    detail: 'Class 6',
    shape: 'square',
    video: 'anirudh-gupta.webm',
    duration: 18,
  },
  {
    slug: 'saikriti-chettri',
    name: 'Miss Saikriti Chettri',
    role: 'Teacher',
    detail: 'English Teacher',
    shape: 'square',
    video: 'saikriti-chettri.webm',
    duration: 74,
  },
  {
    slug: 'jaikumari',
    name: 'Jaikumari',
    role: 'Student',
    detail: 'Class 12',
    shape: 'square',
    video: 'jaikumari.webm',
    duration: 26,
  },
  {
    slug: 'shourya-pradhan',
    name: 'Shourya Pradhan',
    role: 'Student',
    detail: 'Class 12',
    shape: 'square',
    video: 'shourya-pradhan.webm',
    duration: 43,
  },
  {
    slug: 'sanjok-pradhan',
    name: 'Mr Sanjok Pradhan',
    role: 'Teacher',
    detail: 'Biology Teacher',
    shape: 'square',
    video: 'sanjok-pradhan.webm',
    duration: 78,
  },
  {
    slug: 'chandana-ghimire',
    name: 'Miss Chandana Ghimire',
    role: 'Teacher',
    detail: 'Economics & Geography Teacher',
    shape: 'square',
    duration: 60,
  },
  // TODO(school data): class not supplied yet.
  {
    slug: 'nim-dolma-dukpa',
    name: 'Nim Dolma Dukpa',
    role: 'Student',
    shape: 'landscape',
    video: 'nim-dolma-dukpa.webm',
    duration: 39,
  },
  {
    slug: 'sungnima-subba',
    name: 'Sungnima Subba',
    role: 'Student',
    detail: 'Class 11',
    shape: 'square',
    video: 'sungnima-subba.webm',
    duration: 33,
  },
  {
    slug: 'yuden-lama',
    name: 'Yuden Lama',
    role: 'Student',
    detail: 'Class 7',
    shape: 'square',
    video: 'yuden-lama.webm',
    duration: 29,
  },
  // TODO(school data): the footage folder only says "Northeast Student" - add the student's name and class.
  {
    slug: 'northeast-student',
    name: 'Student from the Northeast',
    role: 'Student',
    shape: 'square',
    video: 'northeast-student.webm',
    duration: 19,
  },
];

const minutes = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
const prefersMotion = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const videoSrc = (voice: Voice) => `/assets/voices/${voice.video ?? `${voice.slug}.mp4`}`;

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z"
      fill="currentColor"
    />
  </svg>
);

const Chevron = ({ flip }: { flip?: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
    <path
      d="m15 5-7 7 7 7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Starts a tile's silent preview, loading the film only the first time it is needed. */
function startPreview(video: HTMLVideoElement | null) {
  if (!video || !prefersMotion()) return;
  if (!video.src) video.src = video.dataset.src ?? '';
  video.play().catch(() => {});
}

/** One slideshow row: its voices repeated so each half of the track is wider than any screen, then
    the track doubled so sliding it by half loops without a seam. Copies are hidden from assistive
    tech and keyboard focus; the first set stays reachable. */
function VoiceRow({
  items,
  reverse,
  onOpen,
}: {
  items: { voice: Voice; index: number }[];
  reverse?: boolean;
  onOpen: (index: number) => void;
}) {
  const t = useT();
  const half = [...items, ...items];
  const track = [...half, ...half];
  return (
    <div className={`voices-row${reverse ? ' is-reverse' : ''}`}>
      <ul className="voices-track" style={{ '--voices-count': half.length } as CSSProperties}>
        {track.map(({ voice: v, index }, n) => {
          const copy = n >= items.length;
          return (
            <li key={`${v.slug}-${n}`} aria-hidden={copy || undefined}>
              <button
                type="button"
                className="voice-card"
                tabIndex={copy ? -1 : undefined}
                onClick={() => onOpen(index)}
                onPointerEnter={(e) => {
                  if (e.pointerType === 'mouse') startPreview(e.currentTarget.querySelector('video'));
                }}
                onPointerLeave={(e) => e.currentTarget.querySelector('video')?.pause()}
              >
                <img src={`/assets/voices/${v.slug}.webp`} width="640" height="800" loading="lazy" alt="" />
                <video
                  className="voice-preview"
                  data-src={videoSrc(v)}
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-hidden="true"
                  tabIndex={-1}
                />
                <span className="voice-play">
                  <PlayIcon />
                </span>
                <span className="voice-meta">
                  <span className="voice-name">{t(v.name)}</span>
                  <span className="voice-role">
                    {t(v.detail ?? v.role)} · {minutes(v.duration)}
                  </span>
                </span>
                <span className="sr-only">{t('Play video')}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * Video testimonials as two slideshow rows drifting in opposite directions. A row pauses while it
 * is hovered or holds keyboard focus, and both pause while a film is open. Any card opens its film,
 * with sound, in a dialog. An invitation to visit follows the rows.
 */
export function VoiceReel() {
  const t = useT();
  const lang = useLang();
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const current = active === null ? null : VOICES[active];

  const all = VOICES.map((voice, index) => ({ voice, index }));
  const rows = [all.filter((_, i) => i % 2 === 0), all.filter((_, i) => i % 2 === 1)];

  const open = (i: number) => {
    setActive(i);
    dialog.current?.showModal();
  };
  const step = (dir: 1 | -1) =>
    setActive((i) => (i === null ? i : (i + dir + VOICES.length) % VOICES.length));

  return (
    <div className={`voices${current ? ' is-playing' : ''}`}>
      <VoiceRow items={rows[0]} onOpen={open} />
      <VoiceRow items={rows[1]} reverse onOpen={open} />

      <Link className="voices-cta" href={localizeHref('/visit', lang)}>
        <span className="voices-cta-copy">
          <span className="voices-cta-title">{t('Hear it in person.')}</span>
          <span className="voices-cta-text">{t('Visit the campus and meet our students and teachers.')}</span>
        </span>
        <span className="voices-cta-link">
          {t('Plan your visit')}
          <SwooshArrow />
        </span>
      </Link>

      <dialog
        ref={dialog}
        className="voice-dialog"
        aria-label={current ? t(current.name) : undefined}
        onClose={() => setActive(null)}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      >
        {current && (
          <div className={`voice-stage is-${current.shape}`}>
            <video
              key={current.slug}
              src={videoSrc(current)}
              controls
              autoPlay
              playsInline
              preload="metadata"
            >
              {current.captions && (
                <track
                  kind="captions"
                  src={`/assets/voices/${current.slug}.en.vtt`}
                  srcLang="en"
                  label="English"
                  default
                />
              )}
            </video>
            <div className="voice-caption">
              <span className="voice-name">{t(current.name)}</span>
              <span className="voice-role">{t(current.detail ?? current.role)}</span>
            </div>
            <div className="voice-dialog-nav">
              <button type="button" onClick={() => step(-1)} aria-label={t('Previous')}>
                <Chevron />
              </button>
              <button type="button" onClick={() => step(1)} aria-label={t('Next')}>
                <Chevron flip />
              </button>
            </div>
          </div>
        )}
        <button type="button" className="voice-close" onClick={() => dialog.current?.close()}>
          {t('Close ×')}
        </button>
      </dialog>
    </div>
  );
}
