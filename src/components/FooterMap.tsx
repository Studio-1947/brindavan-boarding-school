'use client';

import { useT } from '@/i18n/ui';

const PLACE = 'Brindavan+Boarding+School+Seeyok+Fatak+Mirik';

/**
 * A quiet line-drawn map for the footer: hill contours, winding roads and a pin for the school.
 * It is an illustration, not a survey; the whole card links to Google Maps for real directions.
 * Drawn inline, so it costs no third-party request on every page.
 */
export function FooterMap() {
  const t = useT();
  return (
    <a
      className="footer-map"
      href={`https://www.google.com/maps/search/?api=1&query=${PLACE}`}
      target="_blank"
      rel="noopener"
    >
      <svg
        className="footer-map-art"
        viewBox="0 0 320 220"
        fill="none"
        role="img"
        aria-label={t('Map showing Brindavan Boarding School, Seeyok Fatak, Mirik')}
      >
        <g className="fm-contours">
          <path d="M-10 58c38-22 70-30 104-18s52 34 92 30 66-34 144-28" />
          <path d="M-10 82c44-24 80-26 110-12s56 36 98 32 70-30 132-24" />
          <path d="M-10 168c40-10 66-34 104-30s62 30 100 26 64-30 136-24" />
          <path d="M-10 192c44-12 74-30 108-26s60 26 98 22 70-26 134-20" />
          <path d="M214 120c0-20 18-32 40-30s34 18 30 34-22 26-42 24-28-12-28-28Z" />
          <path d="M228 122c0-11 10-18 23-17s20 10 18 19-13 15-25 14-16-7-16-16Z" />
          <path d="M36 118c4-14 22-20 36-14s16 22 4 28-44 2-40-14Z" />
        </g>
        <g className="fm-roads">
          <path
            className="fm-main"
            d="M-10 140c30-4 46-24 74-26s40 22 70 20 36-34 66-36 42 18 62 12 38-26 68-28"
          />
          <path d="M134 134c4 26-8 46-2 90" />
          <path d="M200 112c-10-26-4-56 16-80s18-40 14-46" />
          <path d="M64 114c-6-20-26-34-30-60" />
          <path d="M270 98c6 26 26 40 60 46" />
        </g>
        <g className="fm-pin" transform="translate(166 116)">
          <circle className="fm-pulse" r="15" />
          <circle className="fm-ring" r="7" />
          <circle className="fm-dot" r="3" />
        </g>
        <text className="fm-label" x="180" y="104">
          {t('Brindavan Boarding School')}
        </text>
        <text className="fm-sub" x="180" y="118">
          {t('Seeyok Fatak, Mirik')}
        </text>
      </svg>
      <span className="footer-map-link">
        {t('Open in Google Maps')}
        <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M4 10L10 4M10 4H5M10 4V9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  );
}
