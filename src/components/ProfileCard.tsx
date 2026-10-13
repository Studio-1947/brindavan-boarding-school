'use client';

import { useEffect, useRef } from 'react';
import type { StaffMember } from '@/data/staff';
import { setupProfileCard } from '@/lib/profile-card';

/** Staff portrait card that tilts and catches the light under the pointer. */
export function ProfileCard({ member }: { member: StaffMember }) {
  const card = useRef<HTMLLIElement>(null);
  const { name, title, photo } = member;

  useEffect(() => {
    const root = card.current;
    if (!root) return;
    if (!('IntersectionObserver' in window)) return setupProfileCard(root);

    // Only wire the card up once it is near the viewport - the faculty grid has 30 of them.
    let teardown = () => {};
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        teardown = setupProfileCard(root);
      },
      { rootMargin: '200px' },
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      teardown();
    };
  }, []);

  return (
    <li
      ref={card}
      className="profile-card"
      data-theme="light"
      data-intro="false"
      data-backdrop={photo ? undefined : 'ink'}
    >
      <div className="profile-card__body">
        <div className="profile-card__tile">
          {photo ? (
            <img
              className="profile-card__photo"
              src={photo.src}
              alt={name}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              draggable={false}
            />
          ) : (
            <span className="profile-card__photo--empty">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="8.5" r="3.8" />
                <path d="M4.5 20.5c0-4.1 3.4-7 7.5-7s7.5 2.9 7.5 7" />
              </svg>
            </span>
          )}
          <span className="profile-card__scrim" />
          <div className="profile-card__info">
            <h3 className="profile-card__name">{name}</h3>
            <p className="profile-card__title">{title}</p>
          </div>
          <span className="profile-card__tile-rim" />
        </div>
        <span className="profile-card__shade" />
        <span className="profile-card__rim" />
      </div>
    </li>
  );
}
