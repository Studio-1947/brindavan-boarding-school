import type { Metadata } from 'next';
import Link from 'next/link';
import { BoardingHero } from '@/components/boarding/BoardingHero';
import { DayCycle, type DayPhase } from '@/components/boarding/DayCycle';
import { FlipCards, type FlipCard } from '@/components/boarding/FlipCards';
import { DrawOnView } from '@/components/DrawOnView';
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

// TODO(school data): a general outline with no times. Confirm the actual routine with the school.
const day: DayPhase[] = [
  {
    label: 'MORNING',
    title: 'Wake-up & breakfast',
    text: 'Boarders get ready for the day and eat together, with house staff on hand from the first bell.',
  },
  {
    label: 'SCHOOL DAY',
    title: 'Classes',
    text: 'Lessons follow the timetable, with boarders and day scholars learning side by side.',
  },
  {
    label: 'AFTERNOON',
    title: 'Activities & play',
    text: 'Sport, clubs and time outdoors in the courtyard once lessons are done.',
  },
  {
    label: 'EVENING',
    title: 'Study & dinner',
    text: 'Supervised study time for homework and revision, followed by the evening meal.',
  },
  {
    label: 'NIGHT',
    title: 'Lights-out',
    text: 'Time to wind down before lights-out, with boarding staff on duty through the night.',
  },
];

/** Line icons on this page draw themselves in (see DrawOnView). */
const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  'data-draw': true,
};

const questions: FlipCard[] = [
  {
    topic: 'DAILY LIFE',
    title: 'Meals & routine',
    text: 'Ask about meal arrangements, dietary accommodations, wake and lights-out times, and how weekends and holidays are structured.',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="13" r="7" />
        <path d="M12 9v4l2.5 2" />
        <path d="M9 3h6" />
      </svg>
    ),
  },
  {
    topic: 'WELLBEING',
    title: 'Health & safety',
    text: 'Ask about on-site or nearby medical support, how illness is handled, and the supervision ratio for younger boarders.',
    icon: (
      <svg {...iconProps}>
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" />
        <path d="M12 9v6M9 12h6" />
      </svg>
    ),
  },
  {
    topic: 'SETTLING IN',
    title: 'New boarders',
    text: 'Ask how the school supports a child’s first term: orientation, buddy systems, and how homesickness is handled.',
    icon: (
      <svg {...iconProps}>
        <circle cx="8" cy="8" r="3" />
        <circle cx="16.5" cy="9" r="2.5" />
        <path d="M2.5 20c0-3.6 2.5-6 5.5-6s5.5 2.4 5.5 6" />
        <path d="M14.5 14.3c2.4.3 4 2.4 4 5.7" />
      </svg>
    ),
  },
];

export default function BoardingPage() {
  return (
    <main id="main">
      <BoardingHero />
      <section className="section dc-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A TYPICAL DAY</p>
            <h2>
              Structure,
              <br />
              with room to <em>breathe.</em>
            </h2>
          </div>
          <p>
            Boarding routines balance study, meals, activities and rest, with supervision built into each part
            of the day: from wake-up to lights-out. Scroll through a day.
          </p>
        </div>
      </section>
      <DayCycle phases={day} />
      <section className="section explore-visit">
        <div className="section-heading">
          <div>
            <p className="eyebrow">WHAT TO EXPLORE ON YOUR VISIT</p>
            <h2>
              See it for
              <br />
              <em>yourself.</em>
            </h2>
          </div>
          <Link className="button orange" href="/visit">
            Plan your visit{' '}
            <span>
              <SwooshArrow />
            </span>
          </Link>
        </div>
        <DrawOnView className="explore-cards">
          <article>
            <svg {...iconProps}>
              <path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7" />
              <path d="M3 15h18" />
              <path d="M7 11V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" />
              <path d="M3 18v2M21 18v2" />
            </svg>
            <span className="explore-num">01</span>
            <h3>Everyday life</h3>
            <p>
              Talk through accommodation, meals, daily routines and how new boarders settle in during their
              first weeks.
            </p>
          </article>
          <article>
            <svg {...iconProps}>
              <path d="M12 20s-6.5-4-8.5-8C1.8 8.6 3.5 5 7 5c2 0 3.4 1.2 5 3 1.6-1.8 3-3 5-3 3.5 0 5.2 3.6 3.5 7-2 4-8.5 8-8.5 8Z" />
            </svg>
            <span className="explore-num">02</span>
            <h3>Care &amp; communication</h3>
            <p>
              Meet the boarding team and ask about supervision, medical support, and how families stay in
              touch with their child.
            </p>
          </article>
          <article>
            <svg {...iconProps}>
              <path d="M4 5.5C4 4.7 4.7 4 5.5 4H12v16H5.5C4.7 20 4 19.3 4 18.5v-13Z" />
              <path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H12v16h6.5c.8 0 1.5-.7 1.5-1.5v-13Z" />
            </svg>
            <span className="explore-num">03</span>
            <h3>Study &amp; independence</h3>
            <p>
              Discuss prep/study time, personal responsibility for belongings and routines, and the balance
              between structure and downtime.
            </p>
          </article>
        </DrawOnView>
      </section>
      <section className="section academics boarding-questions">
        <div className="section-heading">
          <div>
            <p className="eyebrow">WHAT TO ASK ABOUT</p>
            <h2>
              Questions worth
              <br />
              raising on a <em>visit.</em>
            </h2>
          </div>
          <p>
            Every family’s priorities differ: these are common starting points. Turn a card over to see what
            to ask.
          </p>
        </div>
        <FlipCards cards={questions} />
        <p className="footnote">
          Boarding facilities, capacity, age requirements and charges should be confirmed directly with the
          school. They are not collected or guaranteed by this website.
        </p>
      </section>
    </main>
  );
}
