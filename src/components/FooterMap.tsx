'use client';

import { useEffect, useRef, useState } from 'react';

const PLACE = 'Brindavan+Boarding+School+Seeyok+Fatak+Mirik';

/**
 * Live Google Maps preview for the footer (Google's keyless embed).
 * The map is heavy and the footer is on every page, so the iframe is only
 * created once the footer is about to scroll into view.
 */
export function FooterMap() {
  const box = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        setShow(true);
      },
      { rootMargin: '300px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={box} className="footer-map">
      <div className="footer-map-frame">
        {show && (
          <iframe
            title="Map showing Brindavan Boarding School, Seeyok Fatak, Mirik"
            src={`https://www.google.com/maps?q=${PLACE}&z=15&output=embed`}
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        )}
      </div>
      <a href={`https://www.google.com/maps/search/?api=1&query=${PLACE}`} target="_blank" rel="noopener">
        Open in Google Maps
      </a>
    </div>
  );
}
