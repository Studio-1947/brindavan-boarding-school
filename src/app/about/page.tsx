import type { Metadata } from 'next';
import Link from 'next/link';
import { JourneyTimeline, type Milestone } from '@/components/JourneyTimeline';
import { PhotoDeck, type DeckPhoto } from '@/components/PhotoDeck';
import { Reveal } from '@/components/Reveal';
import { SchoolEvolution, type EvolutionChapter } from '@/components/SchoolEvolution';

const milestones: Milestone[] = [
  {
    year: '2005',
    title: 'The school opens',
    text: 'Founded by Mrs. Prava Chettri and Mr. Sudhir Subba in a six-room wooden building at Seeyok Fatak, Mirik.',
  },
  {
    year: '2010',
    title: 'The first ICSE batch',
    text: 'Even before receiving its own affiliation, the first batch of BBS students appeared for the ICSE examination through Cambridge English School, with every student securing the first position.',
  },
  {
    year: '2014',
    title: 'NOC received',
    text: 'The school received its NOC from Salt Lake, Kolkata.',
  },
  {
    year: '2015',
    title: 'CISCE affiliation',
    text: 'BBS was affiliated to the CISCE.',
  },
  {
    year: '2017',
    title: '100% in the first ICSE under BBS',
    text: 'The first batch of students appeared for the ICSE examination under BBS, achieving a remarkable 100% result.',
  },
  {
    year: '2020–21',
    title: 'ISC affiliation',
    text: 'During the challenging years of the pandemic, BBS continued to look towards the future and was granted affiliation for the ISC level.',
  },
  {
    year: '2025',
    title: 'A 100% record',
    text: 'The school has maintained a 100% ICSE result every year since 2017, with BBS students repeatedly achieving top positions in the Mirik Valley.',
  },
];

const schoolPhotos: DeckPhoto[] = [
  {
    src: '/assets/about/courtyard.webp',
    alt: 'Students playing in the paved courtyard between the blue classroom blocks',
    caption: 'The courtyard between the classroom blocks',
  },
  {
    src: '/assets/about/staff.webp',
    alt: 'The school staff standing together in front of the main building',
    caption: 'The staff, in front of the main building',
  },
  {
    src: '/assets/about/auditorium.webp',
    alt: 'Students seated in rows filling the school auditorium',
    caption: 'A full auditorium',
  },
  {
    src: '/assets/about/alumni-wall.webp',
    alt: 'Framed batch photographs covering a corridor wall',
    caption: 'Batch photographs on the alumni wall',
  },
];

const schoolThen = {
  year: 2005,
  photo: '/assets/history/school-2005.webp',
  alt: 'Brindavan Boarding School in 2005–06: low single-storey buildings with tin roofs behind a dirt yard, beside a Seeyok tea estate sign',
};
const schoolNow = {
  year: 2026,
  photo: '/assets/history/school-2026.webp',
  alt: 'Brindavan Boarding School in 2026: long blue classroom blocks with the school name across the front, beside a paved courtyard',
};
const evolutionChapters: EvolutionChapter[] = [
  {
    eyebrow: '2005',
    title: 'Where it began',
    text: 'A small wooden structure with just six rooms at Seeyok Fatak, built on ₹1,60,000 collected with the help of near and dear ones, beside the tea gardens.',
  },
  {
    eyebrow: '2005 – 2026',
    title: 'Built up, block by block',
    text: 'Over twenty-one years the school grew on the same ground: multi-storey classroom blocks and a paved courtyard where the dirt yard used to be.',
  },
  {
    eyebrow: '2026',
    title: 'The campus today',
    text: 'Several classroom blocks stand around the courtyard, which doubles as the assembly ground and games court.',
  },
];

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
      <section className="section page-intro page-intro--photo">
        <Reveal className="page-intro-copy">
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
            educational community. Public listings describe it as a co-educational boarding school following
            the ICSE and ISC pathway, and this page brings together what is publicly known about its story,
            setting and outlook.
          </p>
        </Reveal>
        <PhotoDeck photos={schoolPhotos} />
      </section>
      <Reveal className="facts" stagger={0.12}>
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
      </Reveal>
      <section className="section founders" aria-labelledby="founders-title">
        <figure className="founders-photo">
          <img
            src="/assets/about/founders.webp"
            width="541"
            height="812"
            loading="lazy"
            alt="Mrs. Prava Chettri and Mr. Sudhir Subba, founders of Brindavan Boarding School"
          />
          <figcaption>
            <strong> Mr. Sudhir Subba &amp; Mrs. Prava Chettri</strong>
            Founders, 2005
          </figcaption>
        </figure>
        <Reveal className="founders-copy">
          <p className="eyebrow">OUR FOUNDERS</p>
          <h2 id="founders-title">
            A journey of love, service
            <br />
            and <em>education.</em>
          </h2>
          <p className="founders-lead">
            Every great institution begins with a dream. Some dreams begin with wealth and resources; others
            begin with nothing but faith, determination, and a desire to make a difference.
          </p>
          <p>
            BBS Brindavan Boarding School began its journey in 2005, founded by Mrs. Prava Chettri and Mr.
            Sudhir Subba, with a simple yet powerful vision: to provide quality education to children,
            especially those from underprivileged communities, and to create an environment where every child
            could learn, grow, and dream without limitations.
          </p>
        </Reveal>
      </section>

      <section className="section founders-story" aria-label="How the school began">
        <Reveal className="story-chapters">
          <article>
            <span className="story-num">01</span>
            <h3>Six rooms and a little faith</h3>
            <p>
              The beginning was far from easy. There was no substantial financial support or capital in hand,
              only ₹1,60,000 collected with the help of near and dear ones. With that modest beginning, a
              small wooden structure with just six rooms was built at Seeyok Fatak, Mirik, nestled amidst the
              green tea gardens and pine forests along the India–Nepal border.
            </p>
          </article>
          <article>
            <span className="story-num">02</span>
            <h3>A name found in a bhajan</h3>
            <p>
              Even the name of the school carries a story of faith. Finding the right name was not easy. Then,
              one Thursday, while singing the regular bhajans of Bhagwan Sri Sathya Sai Baba, the word
              “Brindavan” appeared in the fifth bhajan, associated with Lord Krishna. The word felt deeply
              spiritual and captivating, and in that moment, the name Brindavan was chosen.
            </p>
          </article>
          <article>
            <span className="story-num">03</span>
            <h3>A purpose, not just a name</h3>
            <p>But the heart of BBS was not simply its name, it was its purpose.</p>
            <p>
              The founders that had witnessed children from underprivileged areas travelling long distances to
              Mirik every day in search of education. Many students also came from across the Nepal border,
              where difficult road conditions made their journey even harder. This strengthened the founders’
              resolve to make education accessible at a nominal fee and to ensure that circumstances would
              never become a barrier to a child’s education.
            </p>
          </article>
        </Reveal>

        <Reveal className="story-motto">
          <p className="story-motto-kicker">And so, BBS embraced its guiding philosophy:</p>
          <blockquote>
            Love All,
            <br />
            <em>Serve All.</em>
          </blockquote>
          <p>
            For BBS, these words were never meant to be merely a motto written on a wall. They became a way of
            life.
          </p>
          <p>
            When the road became a difficulty for students travelling from nearby areas, cement was provided
            by the school and support came from others as well, helping create a small road for the children.
            Every challenge became an opportunity to serve, and every obstacle became another reason to
            persevere.
          </p>
        </Reveal>

        <div className="story-journey">
          <div className="story-journey-head">
            <p className="eyebrow">THE JOURNEY</p>
            <h2>
              Faith and
              <br />
              <em>determination.</em>
            </h2>
            <p>The journey continued with faith and determination.</p>
          </div>
          <JourneyTimeline milestones={milestones} />
        </div>

        <Reveal className="story-today">
          <div>
            <p className="eyebrow">BBS TODAY</p>
            <h2>
              From six rooms to a
              <br />
              <em>thriving school.</em>
            </h2>
            <figure className="story-today-photo">
              <img
                src="/assets/outdoor/footer.webp"
                width="1600"
                height="900"
                loading="lazy"
                alt="Brindavan Boarding School today: Block 1 and Block 2 around the paved courtyard, with boarders playing basketball"
              />
              <figcaption>The campus today: Block 1 and Block 2 around the courtyard.</figcaption>
            </figure>
          </div>
          <div className="story-today-copy">
            <p>
              Today, the small six-room wooden structure has grown into a strong and thriving institution. BBS
              now provides education to students from India and Nepal, with boarders coming from Siliguri, the
              North-East, Kolkata, Delhi, and beyond. The school has also opened its doors to children from
              underprivileged backgrounds by providing free education to deserving students, keeping alive the
              very purpose with which the institution began.
            </p>
            <p>
              Academics remain at the heart of BBS, but education here goes far beyond examination results.
              The school strives for excellence in sports, co-curricular activities, discipline, and
              character-building, supported by highly qualified teaching faculty and dedicated staff.
            </p>
            <p>
              Situated at approximately 4,905 feet above sea level, amidst tea gardens and pine forests, BBS
              offers its students the privilege of growing up in a peaceful, pollution-free environment
              surrounded by fresh mountain air.
            </p>
          </div>
        </Reveal>
      </section>
      <section className="section evolution-intro">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THEN AND NOW</p>
            <h2>
              One hillside,
              <br />
              <em>twenty-one years.</em>
            </h2>
          </div>
          <p>Scroll to watch the school grow from its 2005 building into the campus it is today.</p>
        </div>
      </section>
      <SchoolEvolution then={schoolThen} now={schoolNow} chapters={evolutionChapters} />
      {/* Facts and figures below are translated from the Nepali newspaper report in the photo. */}
      <section className="section press" aria-labelledby="press-title">
        <Reveal className="press-copy">
          <p className="eyebrow">IN THE NEWS · 2015</p>
          <h2 id="press-title">
            The day the ICSE
            <br />
            <em>said yes.</em>
          </h2>
          <p>
            A framed clipping still hangs at the school. Its headline reads “ICSE recognition for Brindavan
            Boarding School”, and the report, datelined Mirik, 24 December, tells how the school at Seeyok
            Fatak won affiliation from the council in New Delhi, soon after receiving its permanent NOC in May
            2014.
          </p>
          <p>
            Principal Sudhir Subba told the paper the school had opened with 145 children, to bring quality
            education to the villages around Mirik, and that Classes 11 and 12 were the next goal.
          </p>
          <ul className="press-facts">
            <li>
              <strong>145 → 550</strong>
              <span>students, from opening day to the day of the report</span>
            </li>
            <li>
              <strong>20 + 7</strong>
              <span>teachers and non-teaching staff at the time</span>
            </li>
            <li>
              <strong>9 years</strong>
              <span>from founding to board affiliation</span>
            </li>
          </ul>
        </Reveal>
        <figure className="press-clipping">
          <a href="/assets/about/icse-clipping-2015.webp" target="_blank" rel="noopener">
            <img
              src="/assets/about/icse-clipping-2015.webp"
              width="1400"
              height="1120"
              loading="lazy"
              alt="Nepali-language newspaper clipping headlined ‘ICSE recognition for Brindavan Boarding School’, with a photograph of students in the school yard"
            />
          </a>
          <figcaption>The original report, in Nepali. Click to read it full size.</figcaption>
        </figure>
      </section>
      <section className="section about story">
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
