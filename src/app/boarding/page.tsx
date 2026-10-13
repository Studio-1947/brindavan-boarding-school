import type { Metadata } from 'next';
import Link from 'next/link';
import { SwooshArrow } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Boarding Life | Brindavan Boarding School',
  description:
    'What to know about boarding life at Brindavan Boarding School in Mirik: daily routine, care and settling in.',
  openGraph: {
    title: 'Boarding Life at Brindavan Boarding School',
    description: 'Everyday life, care and independence: boarding at Brindavan.',
    type: 'website',
  },
};

export default function BoardingPage() {
  return (
    <main id="main">
      <section className="section page-intro">
        <Link className="text-link" href="/" prefetch={false}>
          <span className="back-arrow">←</span> Back to home
        </Link>
        <p className="eyebrow">A COMMUNITY TO CALL YOUR OWN</p>
        <h1>
          School is a chapter.
          <br />
          Belonging is
          <br />
          <em>for life.</em>
        </h1>
        <p className="lead">
          Choosing a boarding school is a personal decision. This page walks through what boarding life at
          Brindavan generally involves, so a visit can focus on the specific details that matter to your
          family.
        </p>
      </section>
      <section className="boarding section">
        <div className="boarding-title">
          <p className="eyebrow">A TYPICAL DAY</p>
          <h2>
            Structure,
            <br />
            with room to
            <br />
            <em>breathe.</em>
          </h2>
          <p>
            Boarding routines balance study, meals, activities and rest, with supervision built into each part
            of the day: from wake-up to lights-out.
          </p>
          <Link className="button orange" href="/visit">
            Plan your visit{' '}
            <span>
              <SwooshArrow />
            </span>
          </Link>
        </div>
        <div className="boarding-list">
          <p className="eyebrow">WHAT TO EXPLORE ON YOUR VISIT</p>
          <article>
            <span>01</span>
            <div>
              <h3>Everyday life</h3>
              <p>
                Talk through accommodation, meals, daily routines and how new boarders settle in during their
                first weeks.
              </p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>Care &amp; communication</h3>
              <p>
                Meet the boarding team and ask about supervision, medical support, and how families stay in
                touch with their child.
              </p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>Study &amp; independence</h3>
              <p>
                Discuss prep/study time, personal responsibility for belongings and routines, and the balance
                between structure and downtime.
              </p>
            </div>
          </article>
        </div>
      </section>
      <section className="section academics">
        <div className="section-heading">
          <div>
            <p className="eyebrow">WHAT TO ASK ABOUT</p>
            <h2>
              Questions worth
              <br />
              raising on a<br />
              <em>visit.</em>
            </h2>
          </div>
          <p>Every family’s priorities differ: these are common starting points.</p>
        </div>
        <div className="academic-grid">
          <article>
            <span className="card-number">01</span>
            <span className="stage">DAILY LIFE</span>
            <h3>Meals &amp; routine</h3>
            <p>
              Ask about meal arrangements, dietary accommodations, wake and lights-out times, and how weekends
              and holidays are structured.
            </p>
          </article>
          <article>
            <span className="card-number">02</span>
            <span className="stage">WELLBEING</span>
            <h3>Health &amp; safety</h3>
            <p>
              Ask about on-site or nearby medical support, how illness is handled, and the supervision ratio
              for younger boarders.
            </p>
          </article>
          <article className="blue-card">
            <span className="card-number">03</span>
            <span className="stage">SETTLING IN</span>
            <h3>New boarders</h3>
            <p>
              Ask how the school supports a child’s first term: orientation, buddy systems, and how
              homesickness is handled.
            </p>
          </article>
        </div>
        <p className="footnote">
          Boarding facilities, capacity, age requirements and charges should be confirmed directly with the
          school. They are not collected or guaranteed by this website.
        </p>
      </section>
      <section className="section pt-0">
        <div className="quick-links">
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
            <h3>Life outside study time</h3>
            <p>Clubs, sport and community activities for boarders.</p>
            <em>Explore beyond class</em>
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
            <h3>Plan a visit</h3>
            <p>See the boarding house and ask your questions in person.</p>
            <em>Plan your visit</em>
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
            <h3>Ask about boarding</h3>
            <p>Start the conversation about a boarding place.</p>
            <em>Explore admissions</em>
          </Link>
        </div>
      </section>
    </main>
  );
}
