import type { Metadata } from 'next';
import Link from 'next/link';
import { CountUp } from '@/components/CountUp';
import { FaqSection } from '@/components/FaqSection';
import { SwooshArrow } from '@/components/icons';
import { Marquee } from '@/components/Marquee';

export const metadata: Metadata = {
  title: 'Brindavan Boarding School | Homepage Option 2',
  description:
    'Discover Brindavan Boarding School in Seeyok Fatak, Mirik. Explore academics, boarding, school life and information for prospective families.',
  openGraph: {
    title: 'Brindavan Boarding School | Mirik',
    description: 'Rooted in the hills. Ready for the world. Discover learning and boarding in Mirik.',
    type: 'website',
  },
};

export default function HomeOptionTwoPage() {
  return (
    <main id="main">
      <section className="hero hero-illustrated">
        <img
          className="hero-illustration"
          src="/assets/hero-illustration.webp"
          alt="Illustrated Brindavan Boarding School students celebrating with trophies and books in the Mirik hills"
        />
        <div className="hero-illustrated-copy">
          <h1>
            Rooted in the hills.
            <br />
            Ready for <em>the world.</em>
          </h1>
          <p className="intro">
            A place to learn, belong and become, shaped by knowledge, character and community in the hills of
            Mirik.
          </p>
          <div className="award-marquee" aria-label="Awards and achievements">
            <Marquee className="award-track" duration={28} from={-50} to={0}>
              <span className="award-pill">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M8 4h8v4a4 4 0 0 1-8 0V4Z" />
                  <path d="M8 5H5a2 2 0 0 0 0 4h1.5M16 5h3a2 2 0 0 1 0 4h-1.5" />
                  <path d="M12 12v4M9 20h6M10 16h4v4h-4v-4Z" />
                </svg>
                Scholarship Excellence Award
              </span>
              <span className="award-pill">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M8 4h8v4a4 4 0 0 1-8 0V4Z" />
                  <path d="M8 5H5a2 2 0 0 0 0 4h1.5M16 5h3a2 2 0 0 1 0 4h-1.5" />
                  <path d="M12 12v4M9 20h6M10 16h4v4h-4v-4Z" />
                </svg>
                Academic Merit Award
              </span>
              <span className="award-pill">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M8 4h8v4a4 4 0 0 1-8 0V4Z" />
                  <path d="M8 5H5a2 2 0 0 0 0 4h1.5M16 5h3a2 2 0 0 1 0 4h-1.5" />
                  <path d="M12 12v4M9 20h6M10 16h4v4h-4v-4Z" />
                </svg>
                Best Discipline Award
              </span>
              <span className="award-pill">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M8 4h8v4a4 4 0 0 1-8 0V4Z" />
                  <path d="M8 5H5a2 2 0 0 0 0 4h1.5M16 5h3a2 2 0 0 1 0 4h-1.5" />
                  <path d="M12 12v4M9 20h6M10 16h4v4h-4v-4Z" />
                </svg>
                Outstanding Sports Achievement
              </span>
              <span className="award-pill">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M8 4h8v4a4 4 0 0 1-8 0V4Z" />
                  <path d="M8 5H5a2 2 0 0 0 0 4h1.5M16 5h3a2 2 0 0 1 0 4h-1.5" />
                  <path d="M12 12v4M9 20h6M10 16h4v4h-4v-4Z" />
                </svg>
                Cultural Excellence Award
              </span>
              <span className="award-pill">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M8 4h8v4a4 4 0 0 1-8 0V4Z" />
                  <path d="M8 5H5a2 2 0 0 0 0 4h1.5M16 5h3a2 2 0 0 1 0 4h-1.5" />
                  <path d="M12 12v4M9 20h6M10 16h4v4h-4v-4Z" />
                </svg>
                Scholarship Excellence Award
              </span>
              <span className="award-pill">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M8 4h8v4a4 4 0 0 1-8 0V4Z" />
                  <path d="M8 5H5a2 2 0 0 0 0 4h1.5M16 5h3a2 2 0 0 1 0 4h-1.5" />
                  <path d="M12 12v4M9 20h6M10 16h4v4h-4v-4Z" />
                </svg>
                Academic Merit Award
              </span>
              <span className="award-pill">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M8 4h8v4a4 4 0 0 1-8 0V4Z" />
                  <path d="M8 5H5a2 2 0 0 0 0 4h1.5M16 5h3a2 2 0 0 1 0 4h-1.5" />
                  <path d="M12 12v4M9 20h6M10 16h4v4h-4v-4Z" />
                </svg>
                Best Discipline Award
              </span>
              <span className="award-pill">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M8 4h8v4a4 4 0 0 1-8 0V4Z" />
                  <path d="M8 5H5a2 2 0 0 0 0 4h1.5M16 5h3a2 2 0 0 1 0 4h-1.5" />
                  <path d="M12 12v4M9 20h6M10 16h4v4h-4v-4Z" />
                </svg>
                Outstanding Sports Achievement
              </span>
              <span className="award-pill">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M8 4h8v4a4 4 0 0 1-8 0V4Z" />
                  <path d="M8 5H5a2 2 0 0 0 0 4h1.5M16 5h3a2 2 0 0 1 0 4h-1.5" />
                  <path d="M12 12v4M9 20h6M10 16h4v4h-4v-4Z" />
                </svg>
                Cultural Excellence Award
              </span>
            </Marquee>
          </div>
          <div className="actions">
            <Link className="button" href="/about">
              Discover Brindavan{' '}
              <span>
                <SwooshArrow />
              </span>
            </Link>
            <Link className="button is-outline" href="/visit">
              Find our school{' '}
              <span>
                <SwooshArrow />
              </span>
            </Link>
          </div>
        </div>
      </section>
      <div className="facts">
        <div>
          <span>01 / OUR STUDENTS</span>
          <strong className="stat-count">
            <CountUp className="count-up" target={1214}>
              0
            </CountUp>
          </strong>
        </div>
        <div>
          <span>02 / OUR SETTING</span>
          <strong>Mirik, Darjeeling</strong>
        </div>
        <div>
          <span>03 / LEARNING TOGETHER</span>
          <strong>Co-educational</strong>
        </div>
        <div>
          <span>04 / OUR COMMUNITY</span>
          <strong>Boarding school</strong>
        </div>
        <div>
          <span>05 / ACADEMIC PATHWAY</span>
          <strong>ICSE &amp; ISC*</strong>
        </div>
      </div>
      <section className="section about" id="about">
        <div>
          <p className="eyebrow">WELCOME TO BRINDAVAN</p>
          <h2>
            Big dreams.
            <br />A meaningful
            <br />
            <em>beginning.</em>
          </h2>
        </div>
        <div className="about-copy">
          <p className="lead">Education is about who a child becomes, as much as what they learn.</p>
          <p>
            Situated at Seeyok Fatak in Mirik, Brindavan Boarding School is part of the Darjeeling hills’
            educational community. Public school listings describe a co-educational boarding school with an
            ICSE and ISC academic pathway.
          </p>
          <p>
            For families exploring education in the hills, the school brings together classroom learning and
            the experience of growing within a school community.
          </p>
          <Link className="text-link" href="/about">
            Read our full story{' '}
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
          <div className="values">
            <span>Curiosity</span>
            <span>Character</span>
            <span>Community</span>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">EXPLORE THE SCHOOL</p>
            <h2>
              Everything you
              <br />
              need to <em>know.</em>
            </h2>
          </div>
          <p>Six pages covering academics, boarding, school life, admissions and how to find us.</p>
        </div>
        <div className="quick-links">
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
            <h3>About Brindavan</h3>
            <p>The story, setting and values behind the school.</p>
            <em>Learn more</em>
          </Link>
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
            <em>Explore academics</em>
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
            <em>Explore boarding life</em>
          </Link>
          <Link href="/life">
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
              <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.8 6.8 19.1l1-5.8L3.5 9.2l5.9-.9L12 3Z" />
            </svg>
            <span>BEYOND CLASS</span>
            <h3>School life outside class</h3>
            <p>Clubs, sport, culture and community.</p>
            <em>Explore beyond class</em>
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
            <h3>Start a conversation</h3>
            <p>How to begin the admission process.</p>
            <em>Explore admissions</em>
          </Link>
          <Link href="/visit">
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
              <path d="M12 21s7-7.2 7-12A7 7 0 0 0 5 9c0 4.8 7 12 7 12Z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <span>VISIT</span>
            <h3>Find us in Mirik</h3>
            <p>Location, map and how to reach the school.</p>
            <em>Plan your visit</em>
          </Link>
        </div>
      </section>
      <FaqSection className="section faq">
        <div>
          <p className="eyebrow">A LITTLE MORE CLARITY</p>
          <h2>
            Parents ask.
            <br />
            <em>We understand.</em>
          </h2>
        </div>
        <div>
          <details name="faq" open>
            <summary>Where is the school located?</summary>
            <p>
              The school is listed at Seeyok Fatak, Mirik, Darjeeling, West Bengal, India, PIN 734214. Visit
              the <Link href="/visit">Visit page</Link> to plan your route and confirm the entrance before
              travelling.
            </p>
          </details>
          <details name="faq">
            <summary>Which board does the school follow?</summary>
            <p>
              Public listings identify ICSE and ISC, with CISCE school code WB353. Please confirm the current
              affiliation and class-specific availability directly with the school.
            </p>
          </details>
          <details name="faq">
            <summary>Is boarding available?</summary>
            <p>
              The school is listed as a co-educational boarding school. See the{' '}
              <Link href="/boarding">Boarding Life page</Link> and ask the school about current residential
              availability, age requirements, facilities and charges.
            </p>
          </details>
          <details name="faq">
            <summary>What are the fees and admission dates?</summary>
            <p>
              A reliable current fee schedule and admission calendar were not available in the public sources
              reviewed. Request the latest written fee breakdown and admission dates directly from the school.
            </p>
          </details>
          <details name="faq">
            <summary>What should we bring for an admission visit?</summary>
            <p>
              Ask the school for its official checklist first. It may be useful to have your child’s recent
              school reports and basic age and class details ready for the discussion.
            </p>
          </details>
          <details name="faq">
            <summary>Who do we contact to apply?</summary>
            <p>
              Reach the school through its official social page, or visit the{' '}
              <Link href="/admissions">Admissions page</Link> for the full step-by-step process.
            </p>
          </details>
        </div>
      </FaqSection>
    </main>
  );
}
