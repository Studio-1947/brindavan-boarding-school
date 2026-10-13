import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Brindavan Boarding School | Mirik',
  description:
    'The story, setting and values behind Brindavan Boarding School in Seeyok Fatak, Mirik, Darjeeling.',
  openGraph: {
    title: 'About Brindavan Boarding School',
    description: 'Rooted in the hills of Mirik: the story and values behind the school.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <main id="main">
      <section className="section page-intro">
        <Link className="text-link" href="/" prefetch={false}>
          <span className="back-arrow">←</span> Back to home
        </Link>
        <p className="eyebrow">OUR SCHOOL</p>
        <h1>
          A school built on
          <br />
          curiosity, character
          <br />
          <em>and community.</em>
        </h1>
        <p className="lead">
          Brindavan Boarding School sits at Seeyok Fatak in Mirik, part of the Darjeeling hills’ close-knit
          educational community. Public listings describe it as a co-educational boarding school following the
          ICSE and ISC pathway, and this page brings together what is publicly known about its story, setting
          and outlook.
        </p>
      </section>
      <div className="facts">
        <div>
          <span>01 / FOUNDED</span>
          <strong>Est. 2005*</strong>
        </div>
        <div>
          <span>02 / LOCATION</span>
          <strong>Seeyok Fatak, Mirik</strong>
        </div>
        <div>
          <span>03 / STRUCTURE</span>
          <strong>Co-educational, boarding</strong>
        </div>
        <div>
          <span>04 / CURRICULUM</span>
          <strong>ICSE &amp; ISC (WB353)*</strong>
        </div>
      </div>
      <section className="section about">
        <div>
          <p className="eyebrow">OUR STORY</p>
          <h2>
            Rooted in the
            <br />
            hills of
            <br />
            <em>Mirik.</em>
          </h2>
        </div>
        <div className="about-copy">
          <p className="lead">A school shaped by its setting.</p>
          <p>
            Mirik is a small hill town in the Darjeeling district of West Bengal, known for its tea gardens,
            orange orchards and Sumendu Lake. Brindavan Boarding School was established there to give children
            of the region, and boarding families from further afield, an education that pairs a structured
            academic pathway with the everyday rhythms of hill-town life.
          </p>
          <p>
            The school’s crest carries the motto “Love All, Serve All” alongside a torch, an open book and the
            year 2005, reflecting the values the school asks its students to carry: knowledge, service and
            community.
          </p>
          <Link className="text-link" href="/academics">
            See how this shapes the curriculum{' '}
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
          </Link>
        </div>
      </section>
      <section className="section academics">
        <div className="section-heading">
          <div>
            <p className="eyebrow">WHAT WE VALUE</p>
            <h2>
              The ideas behind
              <br />a Brindavan <em>education.</em>
            </h2>
          </div>
          <p>Three threads run through school life, from the classroom to the boarding house.</p>
        </div>
        <div className="academic-grid">
          <article>
            <span className="card-number">01</span>
            <span className="stage">CURIOSITY</span>
            <h3>A love of learning</h3>
            <p>
              Encouraging students to ask questions, explore ideas beyond the textbook and take ownership of
              how they learn.
            </p>
          </article>
          <article>
            <span className="card-number">02</span>
            <span className="stage">CHARACTER</span>
            <h3>Discipline &amp; integrity</h3>
            <p>
              Boarding life asks for responsibility early: for one’s time, belongings, relationships and
              choices.
            </p>
          </article>
          <article className="blue-card">
            <span className="card-number">03</span>
            <span className="stage">COMMUNITY</span>
            <h3>Love all, serve all</h3>
            <p>
              The school motto, taken from the crest, frames community life: care for peers, staff and the
              wider Mirik community.
            </p>
          </article>
        </div>
        <p className="footnote">
          *Establishment year and CISCE affiliation details (school code WB353) are drawn from public listings
          and the school crest. Please confirm current accreditation directly with the school.
        </p>
      </section>
      <section className="section page-intro">
        <p className="eyebrow">EXPLORE MORE</p>
        <h2>
          Continue
          <br />
          exploring <em>Brindavan.</em>
        </h2>
      </section>
      <section className="section pt-0">
        <div className="quick-links">
          <Link href="/academics">
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
              <path d="M4 5.5C4 4.7 4.7 4 5.5 4H12v16H5.5C4.7 20 4 19.3 4 18.5v-13Z" />
              <path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H12v16h6.5c.8 0 1.5-.7 1.5-1.5v-13Z" />
            </svg>
            <span>ACADEMICS</span>
            <h3>The learning journey</h3>
            <p>Primary years through to the ISC pathway.</p>
            <em>
              Explore academics{' '}
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
            </em>
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
            <h3>Life in the boarding house</h3>
            <p>Daily routines, care and community.</p>
            <em>
              Explore boarding life{' '}
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
            </em>
          </Link>
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
            <h3>Start the conversation</h3>
            <p>How to begin the admission process.</p>
            <em>
              Explore admissions{' '}
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
            </em>
          </Link>
        </div>
      </section>
    </main>
  );
}
