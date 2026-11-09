'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
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
    slug: 'juhi-kumari',
    name: 'Juhi Kumari',
    role: 'Student',
    detail: 'Class 12',
    shape: 'square',
    video: 'juhi-kumari.webm',
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
  // TODO(school data): class not supplied yet. Files keep the original "northeast-student" names.
  {
    slug: 'northeast-student',
    name: 'Aditi Rai',
    role: 'Student',
    shape: 'square',
    video: 'northeast-student.webm',
    duration: 19,
  },
];

const videoSrc = (voice: Voice) => `/assets/voices/${voice.video ?? `${voice.slug}.mp4`}`;
const poster = (voice: Voice) => `/assets/voices/${voice.slug}.webp`;
const clock = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
const pad = (n: number) => String(n).padStart(2, '0');

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

/**
 * Video testimonials as a spotlight and a roster. Every voice is always visible in the roster grid;
 * choosing one plays its film, with sound, in the spotlight beside it. The last roster tile invites
 * families to visit, so the section needs no separate call-to-action band.
 */
export function VoiceReel() {
  const t = useT();
  const lang = useLang();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const current = VOICES[active];
  const label = (v: Voice) => `${t(v.name)}, ${t(v.detail ?? v.role)}`;

  const play = (i: number) => {
    setActive(i);
    setPlaying(true);
    // on stacked layouts the spotlight sits above the roster; bring it back into view
    stage.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  };
  const step = (dir: 1 | -1) => setActive((i) => (i + dir + VOICES.length) % VOICES.length);

  return (
    <div className="voices">
      <div ref={stage} className={`voice-spotlight${playing ? ' is-playing' : ''}`}>
        {playing ? (
          <video
            key={current.slug}
            className="voice-spotlight-media"
            src={videoSrc(current)}
            poster={poster(current)}
            aria-label={label(current)}
            controls
            autoPlay
            playsInline
            preload="metadata"
            onEnded={() => setPlaying(false)}
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
        ) : (
          <button
            type="button"
            className="voice-spotlight-cover"
            onClick={() => setPlaying(true)}
            aria-label={`${t('Play video')}: ${label(current)}`}
          >
            <img key={current.slug} className="voice-spotlight-media" src={poster(current)} alt="" />
            <span className="voice-spotlight-play">
              <PlayIcon />
            </span>
            <span className="voice-spotlight-meta" aria-hidden="true">
              <span className="voice-spotlight-name">{t(current.name)}</span>
              <span className="voice-spotlight-role">
                {t(current.detail ?? current.role)}
                <span className="voice-spotlight-dot" />
                {clock(current.duration)}
              </span>
            </span>
          </button>
        )}

        <div className="voice-spotlight-bar">
          <span className="voice-spotlight-count" aria-hidden="true">
            {pad(active + 1)} <span>/ {pad(VOICES.length)}</span>
          </span>
          <span className="voice-spotlight-nav">
            <button type="button" onClick={() => step(-1)} aria-label={t('Previous')}>
              <Chevron />
            </button>
            <button type="button" onClick={() => step(1)} aria-label={t('Next')}>
              <Chevron flip />
            </button>
          </span>
        </div>
      </div>

      <ul className="voice-roster">
        {VOICES.map((v, i) => {
          const isActive = i === active;
          return (
            <li key={v.slug}>
              <button
                type="button"
                className={`voice-tile${isActive ? ' is-active' : ''}${isActive && playing ? ' is-playing' : ''}`}
                aria-current={isActive || undefined}
                aria-label={`${t('Play video')}: ${label(v)}`}
                onClick={() => play(i)}
              >
                <img src={poster(v)} width="640" height="800" loading="lazy" alt="" />
                <span className="voice-tile-badge" aria-hidden="true">
                  {isActive && playing ? (
                    <span className="voice-eq">
                      <i />
                      <i />
                      <i />
                    </span>
                  ) : (
                    <PlayIcon />
                  )}
                </span>
                <span className="voice-tile-meta" aria-hidden="true">
                  <span className="voice-tile-name">{t(v.name)}</span>
                  <span className="voice-tile-role">{t(v.detail ?? v.role)}</span>
                </span>
              </button>
            </li>
          );
        })}
        <li className="voice-roster-cta">
          <Link className="voices-cta" href={localizeHref('/visit', lang)}>
            <span className="voices-cta-title">{t('Hear it in person.')}</span>
            <span className="voices-cta-link">
              {t('Plan your visit')}
              <SwooshArrow />
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
