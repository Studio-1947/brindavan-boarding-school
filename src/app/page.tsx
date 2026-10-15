import type { Metadata } from 'next';
import Link from 'next/link';
import { CountUp } from '@/components/CountUp';
import { FaqSection } from '@/components/FaqSection';
import { SpotlightGrid } from '@/components/SpotlightGrid';
import { SwooshArrow } from '@/components/icons';
import { Marquee } from '@/components/Marquee';
import { ValueCards } from '@/components/ValueCards';
import { VisionMotto } from '@/components/VisionMotto';
import { VoiceReel } from '@/components/VoiceReel';
import { WarpText, type WarpTextOptions } from '@/components/WarpText';
import { WelcomeParallax } from '@/components/WelcomeParallax';

/* Photos that pop in around the motto, in the order they appear. */
const VISION_PHOTOS = [
  '/assets/hero/hero-6.webp',
  '/assets/hero/hero-2.webp',
  '/assets/about/staff.webp',
  '/assets/hero/hero-4.webp',
  '/assets/hero/hero-7.webp',
  '/assets/hero/hero-1.webp',
];

const OUTCOMES = [
  {
    value: 98,
    suffix: '%',
    label: 'ICSE Class 10 pass rate',
    icon: (
      <>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5" />
        <path d="m9 14 2 2 4-4" />
      </>
    ),
  },
  {
    value: 96,
    suffix: '%',
    label: 'ISC Class 12 pass rate',
    icon: (
      <>
        <path d="M12 4 2 9l10 5 10-5-10-5Z" />
        <path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />
        <path d="M22 9v6" />
      </>
    ),
  },
  {
    value: 64,
    suffix: '',
    label: 'Students scoring 90% and above',
    icon: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3l-5.5 2.9 1-6.2L3 9.6l6.2-.9z" />,
  },
  {
    value: 27,
    suffix: '',
    label: 'Inter-school competition wins',
    icon: (
      <>
        <path d="M8 4h8v5a4 4 0 0 1-8 0z" />
        <path d="M8 6H5a3 3 0 0 0 3 4" />
        <path d="M16 6h3a3 3 0 0 1-3 4" />
        <path d="M12 13v4" />
        <path d="M8.5 20h7l-.8-3H9.3z" />
      </>
    ),
  },
];

export const metadata: Metadata = {
  title: 'Brindavan Boarding School | Learning in the hills of Mirik',
  description:
    'Discover Brindavan Boarding School in Seeyok Fatak, Mirik. Explore academics, boarding, school life and information for prospective families.',
  openGraph: {
    title: 'Brindavan Boarding School | Mirik',
    description: 'Rooted in the hills. Ready for the world. Discover learning and boarding in Mirik.',
    type: 'website',
  },
};

const leadWarp: WarpTextOptions = {
  text: 'Education is about who\na child becomes, as much\nas what they learn.',
  color: '#193de8',
  fontSize: 'clamp(58px, 7.2vw, 108px)',
  fontFamily: "'Manrope', Arial, sans-serif",
  fontWeight: 650,
  letterSpacing: '-0.03em',
  lineHeight: 1.15,
  warpStrength: 0.06,
  warpScale: 1.6,
  speed: 0.45,
  pointerInfluence: 0.4,
  pointerStrength: 0.32,
  refraction: 0.014,
  ripple: true,
  highlightLine: 2,
  highlightText: 'what they learn.',
  align: 'left',
};

export default function HomePage() {
  return (
    <main id="main">
      <section className="hero hero-showcase">
        <div className="hero-card">
          <h1>
            Rooted in the hills.
            <br />
            Ready for <em>the world.</em>
          </h1>
          <p className="intro">
            A place to learn, belong and become, shaped by knowledge, character and community in the hills of
            Mirik.
          </p>
          <div className="pill-marquee" aria-label="Awards and recognitions">
            <Marquee className="pill-track" duration={24} from={0} to={-50}>
              <span className="pill-badge">
                <i />
                Scholarship Excellence
              </span>
              <span className="pill-badge">
                <i />
                Award Academic
              </span>
              <span className="pill-badge">
                <i />
                Best Discipline
              </span>
              <span className="pill-badge">
                <i />
                Sports Achievement
              </span>
              <span className="pill-badge">
                <i />
                Cultural Excellence
              </span>
              <span className="pill-badge">
                <i />
                Community Service
              </span>
              <span className="pill-badge">
                <i />
                Outstanding Mentor
              </span>
              <span className="pill-badge">
                <i />
                Innovation in Teaching
              </span>
              <span className="pill-badge">
                <i />
                Scholarship Excellence
              </span>
              <span className="pill-badge">
                <i />
                Award Academic
              </span>
              <span className="pill-badge">
                <i />
                Best Discipline
              </span>
              <span className="pill-badge">
                <i />
                Sports Achievement
              </span>
              <span className="pill-badge">
                <i />
                Cultural Excellence
              </span>
              <span className="pill-badge">
                <i />
                Community Service
              </span>
              <span className="pill-badge">
                <i />
                Outstanding Mentor
              </span>
              <span className="pill-badge">
                <i />
                Innovation in Teaching
              </span>
            </Marquee>
          </div>
          <div className="pill-actions">
            <Link className="pill-btn" href="/visit">
              Visit us{' '}
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M8 7V3M16 7V3M3.5 10.5h17M4 6.5h16a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7.5a1 1 0 0 1 1-1Z" />
              </svg>
            </Link>
            <Link className="pill-btn pill-btn-outline" href="/admissions">
              Admission{' '}
              <span>
                <SwooshArrow />
              </span>
            </Link>
          </div>
        </div>
        <div className="hero-strip">
          <div>
            <span>
              <span className="lbl-l">Ongoing Students</span>
              <span className="lbl-s">Students</span>
            </span>
            <strong>1243</strong>
          </div>
          <div>
            <span>Board</span>
            <strong>ICSE</strong>
          </div>
          <div>
            <span>
              <span className="lbl-l">Student Teacher Ratio</span>
              <span className="lbl-s">Ratio</span>
            </span>
            <strong>~29:1</strong>
          </div>
          <div>
            <span>
              <span className="lbl-l">Accommodation</span>
              <span className="lbl-s">Stay</span>
            </span>
            <strong>
              <span className="lbl-l">Boarding School</span>
              <span className="lbl-s">Boarding</span>
            </strong>
          </div>
          <div>
            <span>
              <span className="lbl-l">Location</span>
              <span className="lbl-s">Place</span>
            </span>
            <strong>Mirik</strong>
          </div>
        </div>
        <div className="hero-visual">
          <div className="slide active">
            <img
              src="/assets/hero/hero-5.webp"
              width="1600"
              height="750"
              fetchPriority="high"
              alt="Brindavan Boarding School students drawing and colouring together in class"
            />
          </div>
          <div className="image-bottom">
            <span className="hero-caption">
              Learning by doing.
              <br />
              <strong>Everyday life in class.</strong>
            </span>
          </div>
        </div>
      </section>
      <section className="section about about-single" id="about">
        <div className="about-text">
          <div className="about-copy">
            <WarpText
              className="lead lead-warp"
              label="Education is about who a child becomes, as much as what they learn."
              options={leadWarp}
            />
            <div className="about-intro">
              <p>
                Situated at Seeyok Fatak in Mirik, Brindavan Boarding School is part of the Darjeeling hills’
                educational community. Public school listings describe a co-educational boarding school with
                an ICSE and ISC academic pathway.
              </p>
              <p>
                For families exploring education in the hills, the school brings together classroom learning
                and the experience of growing within a school community.
              </p>
            </div>
            <div className="values-block">
              <div className="values-head">
                <div>
                  <p className="eyebrow">WHAT WE NURTURE</p>
                  <h2>Three things we hope every child carries with them.</h2>
                </div>
                <Link className="text-link" href="/about">
                  Know more about our school{' '}
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
              <ValueCards>
                <article className="value-card value-c1">
                  <svg
                    className="value-card-mark"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="6.5" />
                    <path d="M20 20l-4.35-4.35" />
                  </svg>
                  <div className="value-card-top">
                    <span className="value-card-icon">
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
                        <circle cx="11" cy="11" r="6.5" />
                        <path d="M20 20l-4.35-4.35" />
                      </svg>
                    </span>
                    <span className="value-card-num">01</span>
                  </div>
                  <div className="value-card-body">
                    <h3>Curiosity</h3>
                    <p>
                      Learning begins with a question. We want children to ask why, look closely at the world
                      around them and keep following an idea until it makes sense.
                    </p>
                    <ul>
                      <li>Asking why</li>
                      <li>Looking closely</li>
                      <li>Trying again</li>
                    </ul>
                  </div>
                </article>
                <article className="value-card value-c2">
                  <svg
                    className="value-card-mark"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 20.5s-7.6-4.7-9.6-9.4C.9 7.3 3.2 4 6.8 4c2.1 0 3.7 1.1 5.2 3 1.5-1.9 3.1-3 5.2-3 3.6 0 5.9 3.3 4.4 7.1-2 4.7-9.6 9.4-9.6 9.4Z" />
                  </svg>
                  <div className="value-card-top">
                    <span className="value-card-icon">
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
                        <path d="M12 20.5s-7.6-4.7-9.6-9.4C.9 7.3 3.2 4 6.8 4c2.1 0 3.7 1.1 5.2 3 1.5-1.9 3.1-3 5.2-3 3.6 0 5.9 3.3 4.4 7.1-2 4.7-9.6 9.4-9.6 9.4Z" />
                      </svg>
                    </span>
                    <span className="value-card-num">02</span>
                  </div>
                  <div className="value-card-body">
                    <h3>Character</h3>
                    <p>
                      Who a child becomes matters as much as what they know. Honesty, responsibility and
                      kindness are practised every day, in small moments as much as big ones.
                    </p>
                    <ul>
                      <li>Honesty</li>
                      <li>Responsibility</li>
                      <li>Kindness</li>
                    </ul>
                  </div>
                </article>
                <article className="value-card value-c3">
                  <svg
                    className="value-card-mark"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="8" cy="8" r="3" />
                    <circle cx="17" cy="9" r="2.5" />
                    <path d="M2.5 20c0-3.6 2.5-6 5.5-6s5.5 2.4 5.5 6" />
                    <path d="M14.5 14.3c2.4.3 4 2.4 4 5.7" />
                  </svg>
                  <div className="value-card-top">
                    <span className="value-card-icon">
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
                        <circle cx="8" cy="8" r="3" />
                        <circle cx="17" cy="9" r="2.5" />
                        <path d="M2.5 20c0-3.6 2.5-6 5.5-6s5.5 2.4 5.5 6" />
                        <path d="M14.5 14.3c2.4.3 4 2.4 4 5.7" />
                      </svg>
                    </span>
                    <span className="value-card-num">03</span>
                  </div>
                  <div className="value-card-body">
                    <h3>Community</h3>
                    <p>
                      Growing up within a school community means learning to live alongside others: sharing
                      space, looking out for one another and finding a place to belong.
                    </p>
                    <ul>
                      <li>Sharing</li>
                      <li>Caring</li>
                      <li>Belonging</li>
                    </ul>
                  </div>
                </article>
              </ValueCards>
            </div>
          </div>
        </div>
      </section>
      <section className="section explore-school" id="explore-school">
        <WelcomeParallax>
          <div className="welcome-overlay">
            <p className="welcome-eyebrow">WELCOME TO BRINDAVAN</p>
            <h2 className="welcome-title">
              Big dreams.
              <br />A meaningful
              <br />
              beginning.
            </h2>
          </div>
        </WelcomeParallax>
        <div className="explore-school-body">
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
        </div>
      </section>
      {/* TODO(school data): figures below are illustrative. Replace with the school's verified results before launch. */}
      <section className="section outcomes" aria-labelledby="outcomes-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">RESULTS AND OUTCOMES</p>
            <h2 id="outcomes-title">
              Proof, not <em>promises.</em>
            </h2>
          </div>
          <p>
            Board results, competition wins and where our students go next — updated after every academic
            year.
          </p>
        </div>
        <SpotlightGrid className="outcome-grid">
          {OUTCOMES.map(({ value, suffix, label, icon }) => (
            <li key={label}>
              <svg
                className="outcome-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {icon}
              </svg>
              <strong>
                <CountUp target={value}>{value}</CountUp>
                {suffix && <em>{suffix}</em>}
              </strong>
              <span className="outcome-label">{label}</span>
            </li>
          ))}
        </SpotlightGrid>
      </section>
      {/* Admissions journey: steps mirror admissions.html. NOTE: no interview/interaction step is shown because the school's actual process is not documented - add one here once confirmed. */}
      <section className="section journey" id="admissions-journey" aria-labelledby="journey-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ADMISSIONS 2026–27</p>
            <h2 id="journey-title">
              Join <em>Brindavan Boarding School.</em>
            </h2>
          </div>
        </div>
        <ol className="journey-steps">
          <li>
            <h3>Enquire</h3>
            <p>
              Tell us your child’s age, current class, and whether you are considering day scholar or boarding
              admission.
            </p>
          </li>
          <li>
            <h3>Visit</h3>
            <p>
              See the campus in Mirik, meet the staff, and discuss academics, boarding and your child’s needs.
            </p>
          </li>
          <li>
            <h3>Apply</h3>
            <p>
              Request the application form, current fee structure, document checklist and eligibility
              criteria.
            </p>
          </li>
          <li>
            <h3>Confirm</h3>
            <p>
              The admissions team confirms the next steps, key dates and your child’s place at the school.
            </p>
          </li>
        </ol>
        <div className="journey-foot">
          <Link className="button small" href="/visit">
            Enquire now for Admission{' '}
            <span>
              <SwooshArrow />
            </span>
          </Link>
          <Link className="text-link" href="/admissions">
            Know our Admission Process in Detail{' '}
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
      {/* TODO(school data): quotes and names below are illustrative. Replace with real testimonials, collected with written consent, before launch. */}
      <section className="section testimonials" aria-labelledby="tst-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">IN THEIR WORDS</p>
            <h2 id="tst-title">
              Voices of <em>Brindavan.</em>
            </h2>
          </div>
          <p>Students and teachers, on camera, about learning, boarding and growing up in Mirik.</p>
        </div>
        <VoiceReel />
      </section>
      <VisionMotto>
        <p className="vm-eyebrow">A vision rooted in the school’s own motto</p>
        <blockquote className="vm-motto">
          <span className="vm-line">
            Love <img className="vm-pill" src="/assets/hero/hero-5.webp" alt="" /> All,
          </span>
          <span className="vm-line">
            Serve <img className="vm-pill" src="/assets/hero/hero-9.webp" alt="" /> All.
          </span>
        </blockquote>
        {VISION_PHOTOS.map((src, i) => (
          <img key={src} className={`vm-float vm-f${i + 1}`} src={src} alt="" loading="lazy" />
        ))}
      </VisionMotto>
      <section className="section vision">
        <div className="vision-copy">
          <p>
            Brindavan Boarding School aims to nurture confident, capable young people who carry curiosity,
            character and a spirit of service into whatever they choose to do next.
          </p>
          <p>
            The vision extends beyond examination results — to building a community where students learn to
            think for themselves, care for others, and stay connected to the hills that shaped them.
          </p>
        </div>
        <ol className="vision-pillars">
          <li>
            <span>01</span>Confidence
          </li>
          <li>
            <span>02</span>Integrity
          </li>
          <li>
            <span>03</span>Service
          </li>
        </ol>
      </section>
      {/* TODO(school data): welcome text below is illustrative and signed by role only. Replace with the principal's own words, name and photo before launch. */}
      <section className="section principal" aria-labelledby="pr-title">
        <div className="principal-card">
          <div className="principal-photo">
            <img
              src="/assets/sudhir-subba.webp"
              width="960"
              height="1200"
              loading="lazy"
              alt="Mr Sudhir Subba, Founder and Director of Brindavan Boarding School, at his desk"
            />
          </div>
          <div className="principal-copy">
            <p className="eyebrow">FROM THE FOUNDER &amp; DIRECTOR</p>
            <h2 id="pr-title">
              A word of <em>welcome.</em>
            </h2>
            <p>
              A school in the hills carries a particular responsibility: children are here to learn, but they
              are also growing up in our care. We try to send every child home more curious, more capable and
              kinder than the year before.
            </p>
            <p className="principal-name">
              Founder &amp; Director<em>Brindavan Boarding School</em>
            </p>
            <Link className="text-link" href="/about">
              Read the full message{' '}
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
        </div>
      </section>
      <FaqSection className="section faq" id="faq">
        <div>
          <p className="eyebrow">A LITTLE MORE CLARITY</p>
          <h2>
            Parents ask.
            <br />
            <em>We understand.</em>
          </h2>
          <figure className="faq-photo">
            <img
              src="/assets/gate.webp"
              width="1000"
              height="750"
              loading="lazy"
              alt="Entrance gate of Brindavan Boarding School with the school crest on the blue front wall"
            />
          </figure>
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
