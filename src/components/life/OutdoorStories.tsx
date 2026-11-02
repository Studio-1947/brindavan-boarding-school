'use client';

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react';
import { useT } from '@/i18n/ui';

export type StoryPhoto = { src: string; alt: string };
export type Story = {
  id: string;
  tag: string;
  title: string;
  facts: { value: string; label: string }[];
  paragraphs: string[];
  photos: StoryPhoto[];
};

/** Milliseconds each photo stays up while the slideshow plays. */
const SLIDE_MS = 5200;

/** Each photo has a small copy beside it for thumbnails: excursion-1.webp has excursion-1-thumb.webp. */
const thumb = (src: string) => src.replace(/\.webp$/, '-thumb.webp');

/**
 * Activity stories told like phone "stories": pick a story from the tabs, and its photos play
 * through on a stage with a segmented progress bar. Tap or click the left/right of the photo,
 * swipe, use the arrow keys or the filmstrip to move between photos. The slideshow pauses while
 * the pointer or keyboard focus is on the player, when it is off screen, and for reduced motion.
 */
export function OutdoorStories({ stories }: { stories: Story[] }) {
  const t = useT();
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const [active, setActive] = useState(0);
  const [photo, setPhoto] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hold, setHold] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  const story = stories[active];
  const count = story.photos.length;
  const playing = !userPaused && !hold && inView && !reduced;

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener('change', sync);
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(root.current!);
    return () => {
      query.removeEventListener('change', sync);
      io.disconnect();
    };
  }, []);

  // On phones the tabs scroll sideways: bring the chosen one into view without moving the page.
  useEffect(() => {
    const tabs = root.current?.querySelector<HTMLElement>('.os-tabs');
    const tab = tabs?.children[active] as HTMLElement | undefined;
    if (tabs && tab && tabs.scrollWidth > tabs.clientWidth) {
      const pad = parseFloat(getComputedStyle(tabs).paddingLeft) || 0;
      tabs.scrollTo({ left: tab.offsetLeft - tabs.offsetLeft - pad, behavior: 'smooth' });
    }
  }, [active]);

  const openStory = (index: number) => {
    setActive((index + stories.length) % stories.length);
    setPhoto(0);
  };
  const showPhoto = (index: number) => setPhoto((index + count) % count);

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const targets: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowDown: active + 1,
      ArrowLeft: active - 1,
      ArrowUp: active - 1,
      Home: 0,
      End: stories.length - 1,
    };
    if (!(e.key in targets)) return;
    e.preventDefault();
    const next = (targets[e.key] + stories.length) % stories.length;
    openStory(next);
    root.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  const onStageKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') showPhoto(photo + 1);
    else if (e.key === 'ArrowLeft') showPhoto(photo - 1);
    else return;
    e.preventDefault();
  };

  // A gentle tilt toward the pointer on mouse devices.
  const onStageMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || reduced) return;
    const box = stage.current!.getBoundingClientRect();
    stage.current!.style.setProperty('--ry', `${(((e.clientX - box.left) / box.width - 0.5) * 6).toFixed(2)}deg`);
    stage.current!.style.setProperty('--rx', `${(((e.clientY - box.top) / box.height - 0.5) * -5).toFixed(2)}deg`);
  };
  const onStageLeave = () => {
    stage.current?.style.setProperty('--rx', '0deg');
    stage.current?.style.setProperty('--ry', '0deg');
  };

  const onSwipeStart = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') swipe.current = { x: e.clientX, y: e.clientY };
  };
  const onSwipeEnd = (e: PointerEvent<HTMLDivElement>) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(e.clientY - start.y)) showPhoto(photo + (dx < 0 ? 1 : -1));
  };

  // Load photos near the current one; keep the rest out of the page until needed.
  const near = (i: number) => {
    const d = Math.abs(i - photo);
    return d <= 1 || d === count - 1;
  };

  return (
    <div
      ref={root}
      className="os"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHold(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setHold(false)}
      onFocus={(e) => e.target.matches(':focus-visible') && setHold(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHold(false)}
    >
      <div className="os-tabs" role="tablist" aria-label={t('Outdoor activity stories')}>
        {stories.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            id={`os-tab-${s.id}`}
            aria-selected={i === active}
            aria-controls="os-panel"
            tabIndex={i === active ? 0 : -1}
            className={`os-tab${i === active ? ' is-active' : ''}`}
            onClick={() => openStory(i)}
            onKeyDown={onTabKey}
          >
            <img className="os-tab-thumb" src={thumb(s.photos[0].src)} alt="" />
            <span className="os-tab-text">
              <span className="os-tab-tag">
                <b>{String(i + 1).padStart(2, '0')}</b> {s.tag}
              </span>
              <span className="os-tab-title">{s.title}</span>
            </span>
            <span className="os-tab-bar" aria-hidden="true">
              <i style={{ transform: `scaleX(${i === active ? (photo + 1) / s.photos.length : 0})` }} />
            </span>
          </button>
        ))}
      </div>

      <div className="os-body" id="os-panel" role="tabpanel" aria-labelledby={`os-tab-${story.id}`}>
        <div className="os-media">
          <div
            ref={stage}
            className={`os-stage${playing ? ' is-playing' : ''}`}
            role="group"
            aria-roledescription={t('slideshow')}
            aria-label={story.title}
            tabIndex={0}
            onKeyDown={onStageKey}
            onPointerMove={onStageMove}
            onPointerLeave={onStageLeave}
            onPointerDown={onSwipeStart}
            onPointerUp={onSwipeEnd}
            onPointerCancel={() => (swipe.current = null)}
          >
            <div className="os-frames" key={story.id}>
              {story.photos.map((p, i) =>
                near(i) ? (
                  <figure key={p.src} className={`os-frame${i === photo ? ' is-active' : ''}`} aria-hidden={i !== photo}>
                    <img className="os-frame-fill" src={thumb(p.src)} alt="" />
                    <img className="os-frame-img" src={p.src} alt={p.alt} />
                  </figure>
                ) : null,
              )}
            </div>

            <div className="os-segments" aria-hidden="true">
              {story.photos.map((p, i) => (
                <span key={p.src} className={i < photo ? 'is-done' : i === photo ? 'is-current' : undefined}>
                  {i === photo && (
                    <i
                      key={`${story.id}-${photo}`}
                      style={{ animationDuration: `${SLIDE_MS}ms` }}
                      onAnimationEnd={() => showPhoto(photo + 1)}
                    />
                  )}
                </span>
              ))}
            </div>

            <span className="os-chip">{story.tag}</span>

            <div className="os-stage-top">
              <button
                type="button"
                className="os-play"
                onClick={() => setUserPaused((v) => !v)}
                aria-pressed={userPaused}
                aria-label={userPaused ? t('Play slideshow') : t('Pause slideshow')}
              >
                {userPaused || reduced ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
                  </svg>
                )}
              </button>
            </div>

            <button
              type="button"
              className="os-zone os-zone--prev"
              onClick={() => showPhoto(photo - 1)}
              aria-label={t('Previous photo')}
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              className="os-zone os-zone--next"
              onClick={() => showPhoto(photo + 1)}
              aria-label={t('Next photo')}
            >
              <span aria-hidden="true">→</span>
            </button>

            <p className="os-count" aria-live="polite">
              <b>{String(photo + 1).padStart(2, '0')}</b> / {String(count).padStart(2, '0')}
            </p>
          </div>

          <div className="os-strip" key={story.id}>
            {story.photos.map((p, i) => (
              <button
                key={p.src}
                type="button"
                className={`os-thumb${i === photo ? ' is-active' : ''}`}
                style={{ '--i': i } as CSSProperties}
                onClick={() => showPhoto(i)}
                aria-label={`${t('Photo')} ${i + 1} / ${count}`}
                aria-current={i === photo}
              >
                <img src={thumb(p.src)} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <article className="os-copy" key={story.id}>
          <span className="os-copy-tag">{story.tag}</span>
          <h3>{story.title}</h3>
          <dl className="os-facts">
            {story.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="os-text">
            {story.paragraphs.map((text) => (
              <p key={text.slice(0, 32)}>{text}</p>
            ))}
          </div>
          <button type="button" className="button os-next" onClick={() => openStory(active + 1)}>
            <span className="os-next-label">
              <small>{t('Next story')}</small>
              {stories[(active + 1) % stories.length].title}
            </span>
            <span className="os-next-arrow" aria-hidden="true">
              →
            </span>
          </button>
        </article>
      </div>
    </div>
  );
}
