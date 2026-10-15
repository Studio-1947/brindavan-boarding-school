'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { SwooshArrow } from '@/components/icons';
import { localizeHref } from '@/i18n/lang';
import { useLang, useT } from '@/i18n/ui';

type Voice = {
  slug: string;
  name: string;
  role: 'Student' | 'Teacher';
  /** Class for students, subject for teachers. Falls back to the role when unknown. */
  detail?: string;
  /** Filmed upright on a phone (9:16) rather than landscape (16:9). */
  portrait: boolean;
  /** Seconds. */
  duration: number;
  /** Shown as the large tile that opens the grid. Only one voice should have this. */
  featured?: boolean;
  /** False when there is no <slug>.en.vtt yet. */
  captions?: boolean;
};

/* Footage lives in public/assets/voices: <slug>.mp4 (all of a person's clips joined, 720p H.264,
   audio cleaned up), <slug>.en.vtt (English captions, machine-made from the audio and translated
   where the speaker uses Nepali or Hindi) and <slug>.webp (poster cropped from their portrait photo).
   The original footage is kept out of the site in raw-footage/ (gitignored). */
const VOICES: Voice[] = [
  {
    slug: 'shradha-tamang',
    name: 'Shradha Tamang',
    role: 'Student',
    detail: 'Class 12',
    portrait: true,
    duration: 100,
    featured: true,
  },
  {
    slug: 'anirudh-gupta',
    name: 'Anirudh Gupta',
    role: 'Student',
    detail: 'Class 6',
    portrait: true,
    duration: 48,
  },
  {
    slug: 'saikriti-chettri',
    name: 'Saikriti Chettri',
    role: 'Teacher',
    detail: 'English Teacher',
    portrait: true,
    duration: 82,
  },
  { slug: 'jaikumari', name: 'Jaikumari', role: 'Student', detail: 'Class 12', portrait: true, duration: 30 },
  {
    slug: 'shourya-pradhan',
    name: 'Shourya Pradhan',
    role: 'Student',
    detail: 'Class 12',
    portrait: false,
    duration: 39,
  },
  {
    slug: 'sanjok-pradhan',
    name: 'Sanjok Pradhan',
    role: 'Teacher',
    detail: 'Biology Teacher',
    portrait: false,
    duration: 166,
  },
  { slug: 'khadka', name: 'Khadka', role: 'Student', detail: 'Class 6', portrait: true, duration: 49 },
  {
    slug: 'chandana-ghimire',
    name: 'Chandana Ghimire',
    role: 'Teacher',
    detail: 'Economics & Geography Teacher',
    portrait: true,
    duration: 72,
  },
  // TODO(school data): class not supplied yet.
  { slug: 'nim-dolma-dukpa', name: 'Nim Dolma Dukpa', role: 'Student', portrait: false, duration: 92 },
  {
    slug: 'sungnima-subba',
    name: 'Sungnima Subba',
    role: 'Student',
    detail: 'Class 11',
    portrait: false,
    duration: 40,
  },
  {
    slug: 'yuden-lama',
    name: 'Yuden Lama',
    role: 'Student',
    detail: 'Class 7',
    portrait: true,
    duration: 51,
  },
  // TODO(school data): the footage folder only says "Northeast Student" - add the student's name and class.
  {
    slug: 'northeast-student',
    name: 'Student from the Northeast',
    role: 'Student',
    portrait: false,
    duration: 42,
    // Spoken in Garo, which speech recognition does not support: needs a human translation.
    captions: false,
  },
];

const minutes = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
const prefersMotion = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

/**
 * Video testimonials as an editorial grid: one featured story with a silent preview running, the
 * other voices as tiles that preview on hover, and an invitation to visit closing the grid. Any tile
 * opens its film, with sound and captions, in a dialog.
 */
export function VoiceReel() {
  const t = useT();
  const lang = useLang();
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const featured = useRef<HTMLVideoElement>(null);
  const current = active === null ? null : VOICES[active];

  // The featured preview plays only while it is on screen.
  useEffect(() => {
    const video = featured.current;
    if (!video) return;
    const io = new IntersectionObserver(([entry]) =>
      entry.isIntersecting ? startPreview(video) : video.pause(),
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const open = (i: number) => {
    featured.current?.pause();
    setActive(i);
    dialog.current?.showModal();
  };
  const step = (dir: 1 | -1) =>
    setActive((i) => (i === null ? i : (i + dir + VOICES.length) % VOICES.length));

  return (
    <div className="voices">
      <ul className="voices-grid">
        {VOICES.map((v, i) => (
          <li key={v.slug} className={v.featured ? 'is-featured' : undefined}>
            <button
              type="button"
              className="voice-card"
              onClick={() => open(i)}
              onPointerEnter={(e) => {
                if (!v.featured && e.pointerType === 'mouse')
                  startPreview(e.currentTarget.querySelector('video'));
              }}
              onPointerLeave={(e) => {
                if (!v.featured) e.currentTarget.querySelector('video')?.pause();
              }}
            >
              <img src={`/assets/voices/${v.slug}.webp`} width="640" height="800" loading="lazy" alt="" />
              <video
                ref={v.featured ? featured : undefined}
                className="voice-preview"
                data-src={`/assets/voices/${v.slug}.mp4`}
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
                {v.featured && <span className="voice-tag">{t('Featured story')}</span>}
                <span className="voice-name">{t(v.name)}</span>
                <span className="voice-role">
                  {t(v.detail ?? v.role)} · {minutes(v.duration)}
                </span>
              </span>
              <span className="sr-only">{t('Play video')}</span>
            </button>
          </li>
        ))}
        <li className="voices-cta">
          <Link href={localizeHref('/visit', lang)}>
            <span className="voices-cta-title">{t('Hear it in person.')}</span>
            <span className="voices-cta-text">
              {t('Visit the campus and meet our students and teachers.')}
            </span>
            <span className="voices-cta-link">
              {t('Plan your visit')}
              <SwooshArrow />
            </span>
          </Link>
        </li>
      </ul>

      <dialog
        ref={dialog}
        className="voice-dialog"
        aria-label={current ? t(current.name) : undefined}
        onClose={() => setActive(null)}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      >
        {current && (
          <div className={`voice-stage${current.portrait ? ' is-portrait' : ''}`}>
            <video
              key={current.slug}
              src={`/assets/voices/${current.slug}.mp4`}
              poster={`/assets/voices/${current.slug}.webp`}
              controls
              autoPlay
              playsInline
              preload="metadata"
            >
              {current.captions !== false && (
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
