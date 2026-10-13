import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Beyond the Classroom | Brindavan Boarding School',
  description: 'Clubs, sport, culture and community life at Brindavan Boarding School in Mirik.',
  openGraph: {
    title: 'Beyond the Classroom at Brindavan Boarding School',
    description: 'Participation, culture and community: school life outside the timetable.',
    type: 'website',
  },
};

export default function LifePage() {
  return (
    <main id="main">
      <section className="section page-intro">
        <Link className="text-link" href="/" prefetch={false}>
          <span className="back-arrow">←</span> Back to home
        </Link>
        <p className="eyebrow">BEYOND THE CLASSROOM</p>
        <h1>
          More ways to
          <br />
          <em>find yourself.</em>
        </h1>
        <p className="lead">
          School life at Brindavan extends past the timetable: into performances, sport, celebrations and the
          everyday life of a hill-town community.
        </p>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">WHAT HAPPENS OUTSIDE CLASS</p>
            <h2>
              Participation,
              <br />
              culture &amp;
              <br />
              <em>community.</em>
            </h2>
          </div>
          <a
            className="text-link"
            href="https://www.facebook.com/p/Brindavan-boarding-school-61574700620509/"
            target="_blank"
            rel="noopener"
          >
            School updates
          </a>
        </div>
        <div className="life-grid">
          <article>
            <div className="life-art orange-art">
              <span>
                MOVE.
                <br />
                TOGETHER.
              </span>
              <b>01</b>
            </div>
            <h3>Participation &amp; teamwork</h3>
            <p>
              School performances bring students together. Local coverage features Brindavan’s Independence
              Day drill preparations: a glimpse of the discipline and teamwork built through group activities.
            </p>
            <a
              className="text-link"
              href="https://www.facebook.com/VoiceofMirikHillnews/videos/brindavan-boarding-schoolmirik/1489502018490808/"
              target="_blank"
              rel="noopener"
            >
              View community coverage
            </a>
          </article>
          <article>
            <div className="life-art blue-art">
              <span>
                EXPRESS.
                <br />
                CONNECT.
              </span>
              <b>02</b>
            </div>
            <h3>Culture &amp; community</h3>
            <p>
              The school’s social updates show glimpses of student participation, festival celebrations and
              shared moments of school life through the year.
            </p>
            <a
              className="text-link"
              href="https://www.facebook.com/p/Brindavan-boarding-school-61574700620509/"
              target="_blank"
              rel="noopener"
            >
              Explore school updates
            </a>
          </article>
          <article>
            <div className="life-art light-art">
              <span>
                LOOK UP.
                <br />
                DREAM BIG.
              </span>
              <b>03</b>
            </div>
            <h3>A wider horizon</h3>
            <p>
              The Darjeeling hills offer a distinctive setting for childhood: tea gardens, mountain views and
              a close-knit local community just outside the classroom door.
            </p>
            <Link className="text-link" href="/visit">
              Discover our setting
            </Link>
          </article>
        </div>
      </section>
      <section className="section academics">
        <div className="section-heading">
          <div>
            <p className="eyebrow">TYPICAL ACTIVITIES</p>
            <h2>
              What students
              <br />
              get involved
              <br />
              <em>in.</em>
            </h2>
          </div>
          <p>
            Public coverage and school updates point to a mix of the following: confirm current offerings with
            the school.
          </p>
        </div>
        <div className="academic-grid">
          <article>
            <span className="card-number">01</span>
            <span className="stage">SPORT &amp; DRILL</span>
            <h3>Physical activity</h3>
            <p>
              Parade and drill practice, seen in Independence Day coverage, alongside general sport and
              physical education.
            </p>
          </article>
          <article>
            <span className="card-number">02</span>
            <span className="stage">ARTS &amp; CULTURE</span>
            <h3>Performance &amp; celebration</h3>
            <p>School events and festival celebrations that bring the student community together.</p>
          </article>
          <article className="blue-card">
            <span className="card-number">03</span>
            <span className="stage">COMMUNITY</span>
            <h3>Local engagement</h3>
            <p>A school life connected to Mirik’s own community and seasonal rhythms.</p>
          </article>
        </div>
        <p className="footnote">
          Specific clubs, teams and the activity calendar should be confirmed directly with the school.
        </p>
      </section>
      <section className="section pt-0">
        <div className="quick-links">
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
            <h3>Life after the school day</h3>
            <p>How activities fit around boarding routines.</p>
            <em>Explore boarding life</em>
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
            <h3>See it for yourself</h3>
            <p>Ask about the current activity calendar on a visit.</p>
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
            <h3>Ask about activities</h3>
            <p>Start the conversation about student life.</p>
            <em>Explore admissions</em>
          </Link>
        </div>
      </section>
    </main>
  );
}
