import type { Metadata } from 'next';
import Link from 'next/link';
import { Marquee } from '@/components/Marquee';
import { LifeHero, type HeroPhoto } from '@/components/life/LifeHero';
import { LifeThreads } from '@/components/life/LifeThreads';
import { MomentRing, type Moment } from '@/components/life/MomentRing';
import { TiltCards } from '@/components/life/TiltCards';

export const metadata: Metadata = {
  title: 'Beyond the Classroom | Brindavan Boarding School',
  description: 'Clubs, sport, culture and community life at Brindavan Boarding School in Mirik.',
  openGraph: {
    title: 'Beyond the Classroom at Brindavan Boarding School',
    description: 'Participation, culture and community: school life outside the timetable.',
    type: 'website',
  },
};

const heroPhotos: HeroPhoto[] = [
  {
    src: '/assets/outdoor/openarea.webp',
    alt: 'The whole school lined up for morning assembly in the courtyard, with house banners on the wall behind',
    tag: 'Morning assembly',
  },
  {
    src: '/assets/outdoor/football2.jpeg',
    alt: 'Two inter-house teams in yellow and blue jerseys holding up their trophies, medals and certificates',
    tag: 'Inter-house sport',
  },
  {
    src: '/assets/hero/hero-2.webp',
    alt: 'Young students holding up paper plates decorated with craft flowers',
    tag: 'Art & craft',
  },
  {
    src: '/assets/hero/hero-3.webp',
    alt: 'Students gathered in the courtyard beside a table of trophies, medals and prize books',
    tag: 'Prize day',
  },
];

// Captions describe only what each photo shows; confirm activity details with the school.
const moments: Moment[] = [
  {
    src: '/assets/hero/hero-9.webp',
    alt: 'Senior girls with medals and certificates standing beside a trophy, with two teachers',
    tag: 'RECOGNITION',
    title: 'Celebrating effort',
    text: 'Medals, certificates and trophies mark what students achieve through the year, in and out of class.',
  },
  {
    src: '/assets/hero/hero-7.webp',
    alt: 'Young students holding up colourful ink-blot prints in their classroom',
    tag: 'ART & CRAFT',
    title: 'Ink-blot prints',
    text: 'Younger classes get hands-on with paint and paper, folding colour into prints to hold up and share.',
  },
  {
    src: '/assets/hero/hero-8.webp',
    alt: 'A guest with folded hands being welcomed with ceremonial scarves',
    tag: 'TRADITION',
    title: 'Welcoming guests',
    text: 'Visitors to the school are greeted in the way of the hills: with ceremonial scarves and folded hands.',
  },
  {
    src: '/assets/hero/hero-5.webp',
    alt: 'Students bent over their desks drawing and colouring with crayons',
    tag: 'CREATIVE WORK',
    title: 'Drawing together',
    text: 'Drawing and colouring sessions give every student the chance to make something of their own.',
  },
  {
    src: '/assets/hero/hero-4.webp',
    alt: 'Two students in school blazers standing with a guest who wears a ceremonial scarf',
    tag: 'STUDENT VOICE',
    title: 'Hosting the day',
    text: 'Students stand alongside staff at school events, meeting and thanking the guests who join them.',
  },
  {
    src: '/assets/boarding/courtyard-night.webp',
    alt: 'The school courtyard at night under a starry sky, with the classroom windows lit',
    tag: 'AFTER HOURS',
    title: 'Evenings on campus',
    text: 'When the day ends the courtyard goes quiet, and boarders settle into their evening routines.',
  },
];

const activities = [
  'Sport',
  'Assembly',
  'Art & craft',
  'Prize day',
  'Celebrations',
  'Community',
  'The hills',
];

export default function LifePage() {
  return (
    <main id="main">
      <LifeHero photos={heroPhotos}>
        <Link className="text-link" href="/" prefetch={false}>
          <span className="back-arrow">←</span> Back to home
        </Link>
        <p className="eyebrow">BEYOND THE CLASSROOM</p>
        <h1 className="lh-title">
          More ways to
          <br />
          <em>find yourself.</em>
        </h1>
        <p className="lead">
          School life at Brindavan extends past the timetable: into performances, sport, celebrations and the
          everyday life of a hill-town community.
        </p>
        <p className="lh-cue">
          <span aria-hidden="true" /> Scroll to explore
        </p>
      </LifeHero>

      <div className="life-band" aria-hidden="true">
        <div className="life-marquee">
          <Marquee className="life-marquee-track" duration={30} from={0} to={-50}>
            {[0, 1].map((copy) =>
              activities.map((word) => (
                <span key={`${copy}-${word}`}>
                  {word}
                  <i>✦</i>
                </span>
              )),
            )}
          </Marquee>
        </div>
      </div>

      <LifeThreads
        heading={
          <>
            <p className="eyebrow">WHAT HAPPENS OUTSIDE CLASS</p>
            <h2>
              Participation,
              <br />
              culture &amp;
              <br />
              <em>community.</em>
            </h2>
            <p className="lt-lede">Three threads that run through school life once the bell has gone.</p>
            <a
              className="text-link"
              href="https://www.facebook.com/p/Brindavan-boarding-school-61574700620509/"
              target="_blank"
              rel="noopener"
            >
              School updates
            </a>
          </>
        }
      >
        <article className="lt-panel lt-panel--orange">
          <figure className="lt-photo">
            <img
              src="/assets/outdoor/football.jpeg"
              alt="An inter-house team in orange and yellow jerseys with medals, certificates and a trophy"
              loading="lazy"
            />
            <span className="lt-motto">
              MOVE.
              <br />
              TOGETHER.
            </span>
            <b className="lt-num">01</b>
          </figure>
          <div className="lt-body">
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
          </div>
        </article>
        <article className="lt-panel lt-panel--blue">
          <figure className="lt-photo">
            <img
              src="/assets/about/auditorium.webp"
              alt="Students filling the school auditorium for an event, with teachers seated at the front"
              loading="lazy"
            />
            <span className="lt-motto">
              EXPRESS.
              <br />
              CONNECT.
            </span>
            <b className="lt-num">02</b>
          </figure>
          <div className="lt-body">
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
          </div>
        </article>
        <article className="lt-panel lt-panel--light">
          <figure className="lt-photo">
            <img
              src="/assets/about/mirik.webp"
              alt="Tea gardens rolling over the hills around Mirik, with a winding road"
              loading="lazy"
            />
            <span className="lt-motto">
              LOOK UP.
              <br />
              DREAM BIG.
            </span>
            <b className="lt-num">03</b>
          </figure>
          <div className="lt-body">
            <h3>A wider horizon</h3>
            <p>
              The Darjeeling hills offer a distinctive setting for childhood: tea gardens, mountain views and
              a close-knit local community just outside the classroom door.
            </p>
            <Link className="text-link" href="/visit">
              Discover our setting
            </Link>
          </div>
        </article>
      </LifeThreads>

      <section className="section life-moments">
        <div className="section-heading">
          <div>
            <p className="eyebrow">MOMENTS FROM THE YEAR</p>
            <h2>
              Turn through
              <br />
              a year of
              <br />
              <em>moments.</em>
            </h2>
          </div>
          <p>
            Photographs from school life outside lessons. Drag the ring, click a photo or use the arrows to
            step through them.
          </p>
        </div>
        <MomentRing moments={moments} />
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
        <TiltCards>
          <article className="tilt-card">
            <figure className="tilt-photo">
              <img
                src="/assets/boarding/courtyard-blocks.webp"
                alt="Students playing football in the courtyard between the blue school blocks"
                loading="lazy"
              />
              <span className="card-number">01</span>
            </figure>
            <div className="tilt-body">
              <span className="stage">SPORT &amp; DRILL</span>
              <h3>Physical activity</h3>
              <p>
                Parade and drill practice, seen in Independence Day coverage, alongside general sport and
                physical education.
              </p>
            </div>
          </article>
          <article className="tilt-card">
            <figure className="tilt-photo">
              <img
                src="/assets/hero/hero-6.webp"
                alt="A teacher wearing ceremonial scarves stands with a young student holding a Teacher’s Day gift"
                loading="lazy"
              />
              <span className="card-number">02</span>
            </figure>
            <div className="tilt-body">
              <span className="stage">ARTS &amp; CULTURE</span>
              <h3>Performance &amp; celebration</h3>
              <p>School events and festival celebrations that bring the student community together.</p>
            </div>
          </article>
          <article className="tilt-card is-blue">
            <figure className="tilt-photo">
              <img
                src="/assets/about/staff.webp"
                alt="School staff, many in traditional dress, gathered in front of the school crest"
                loading="lazy"
              />
              <span className="card-number">03</span>
            </figure>
            <div className="tilt-body">
              <span className="stage">COMMUNITY</span>
              <h3>Local engagement</h3>
              <p>A school life connected to Mirik’s own community and seasonal rhythms.</p>
            </div>
          </article>
        </TiltCards>
        <p className="footnote">
          Specific clubs, teams and the activity calendar should be confirmed directly with the school.
        </p>
      </section>

      <section className="section pt-0 life-links">
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
