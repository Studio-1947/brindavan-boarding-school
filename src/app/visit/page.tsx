import type { Metadata } from 'next';
import Link from 'next/link';
import { SwooshArrow } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Visit & Location | Brindavan Boarding School',
  description: 'How to find and reach Brindavan Boarding School at Seeyok Fatak, Mirik, Darjeeling.',
  openGraph: {
    title: 'Visit Brindavan Boarding School',
    description: 'Your journey begins in Mirik: location and how to get here.',
    type: 'website',
  },
};

export default function VisitPage() {
  return (
    <main id="main">
      <section className="section page-intro">
        <Link className="text-link" href="/" prefetch={false}>
          <span className="back-arrow">←</span> Back to home
        </Link>
        <p className="eyebrow">COME A LITTLE CLOSER</p>
        <h1>
          Your journey
          <br />
          begins in
          <br />
          <em>Mirik.</em>
        </h1>
        <p className="lead">
          Brindavan Boarding School sits at Seeyok Fatak, in the hill town of Mirik, Darjeeling district, West
          Bengal.
        </p>
      </section>
      <section className="visit">
        <div>
          <p className="eyebrow">FIND US</p>
          <h2>
            Rooted in
            <br />
            the hills of
            <br />
            <em>Mirik.</em>
          </h2>
          <address>
            Brindavan Boarding School
            <br />
            Seeyok Fatak, Mirik
            <br />
            Darjeeling, West Bengal · 734214
          </address>
          <a
            className="button orange"
            href="https://www.google.com/maps/search/?api=1&amp;query=Brindavan+Boarding+School+Seeyok+Fatak+Mirik"
            target="_blank"
            rel="noopener"
          >
            Open in Google Maps{' '}
            <span>
              <SwooshArrow />
            </span>
          </a>
        </div>
        <div className="location-type">
          <span>INDIA / WEST BENGAL</span>
          <strong>
            MIRIK
            <span>
              <svg
                className="icon-arrow"
                width="13"
                height="13"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M4 10L10 4M10 4H5M10 4V9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </strong>
          <p>
            Rooted in the hills.
            <br />
            Connected to a world of possibility.
          </p>
        </div>
      </section>
      <section className="section academics">
        <div className="section-heading">
          <div>
            <p className="eyebrow">GETTING HERE</p>
            <h2>
              Reaching
              <br />
              Mirik &amp;
              <br />
              <em>Seeyok Fatak.</em>
            </h2>
          </div>
          <p>
            Mirik is in the Darjeeling hills of West Bengal, reachable from the region’s main gateway towns.
          </p>
        </div>
        <div className="academic-grid">
          <article>
            <span className="card-number">01</span>
            <span className="stage">NEAREST AIRPORT</span>
            <h3>Bagdogra Airport</h3>
            <p>
              The nearest major airport, with onward road travel of roughly 2–3 hours to Mirik depending on
              traffic and route.
            </p>
          </article>
          <article>
            <span className="card-number">02</span>
            <span className="stage">NEAREST RAILWAY</span>
            <h3>New Jalpaiguri (NJP)</h3>
            <p>The main railhead for the region, similarly connected to Mirik by road.</p>
          </article>
          <article className="blue-card">
            <span className="card-number">03</span>
            <span className="stage">BY ROAD</span>
            <h3>From Darjeeling or Siliguri</h3>
            <p>
              Mirik is connected by hill roads to both Darjeeling town and Siliguri: confirm current travel
              times and routes before your visit.
            </p>
          </article>
        </div>
        <p className="footnote">
          Travel times vary with road and weather conditions in the hills. Confirm the best route with the
          school ahead of an admission visit.
        </p>
      </section>
      <section className="section pt-0">
        <div className="quick-links">
          <Link href="/admissions">
            <svg
              className="qlink-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
              <path d="M14 3v4h4" />
              <path d="M9 13h6M9 17h6M9 9h2" />
            </svg>
            <span>ADMISSIONS</span>
            <h3>Before you visit</h3>
            <p>What to prepare for an admission visit.</p>
            <em>Explore admissions</em>
          </Link>
          <Link href="/boarding">
            <svg
              className="qlink-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7" />
              <path d="M3 15h18" />
              <path d="M7 11V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" />
              <path d="M3 18v2M21 18v2" />
            </svg>
            <span>BOARDING LIFE</span>
            <h3>What to ask on-site</h3>
            <p>Questions worth raising when you visit.</p>
            <em>Explore boarding life</em>
          </Link>
          <Link href="/about">
            <svg
              className="qlink-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3 2 8l10 5 10-5-10-5Z" />
              <path d="M6 10.5V16c0 1.6 2.7 3 6 3s6-1.4 6-3v-5.5" />
              <path d="M22 8v6" />
            </svg>
            <span>OUR SCHOOL</span>
            <h3>Learn more first</h3>
            <p>The story and values behind Brindavan.</p>
            <em>About the school</em>
          </Link>
        </div>
      </section>
    </main>
  );
}
