import type { Metadata } from 'next';
import Link from 'next/link';
import { FacultyGrid } from '@/components/FacultyGrid';
import { LearningShowcase, type LearningItem } from '@/components/LearningShowcase';
import { StageJourney, type Stage } from '@/components/StageJourney';
import { staff } from '@/data/staff';

const stages: Stage[] = [
  {
    label: 'THE FOUNDATIONS',
    title: 'Primary years',
    photo: '/assets/hero/hero-7.webp',
    link: { href: '/admissions', text: 'Discuss entry-level admission' },
  },
  {
    label: 'GROWING IN CONFIDENCE',
    title: 'Middle & secondary',
    photo: '/assets/classrooms/secondary.webp',
    link: { href: '/admissions', text: 'Ask about classes & subjects' },
  },
  {
    label: 'THE NEXT CHAPTER',
    title: 'Senior secondary',
    photo: '/assets/classrooms/senior.webp',
    link: { href: '/admissions', text: 'Enquire about ISC options' },
  },
];

const learning: LearningItem[] = [
  {
    label: 'Timetabled subjects',
    text: 'Classes follow a timetabled structure across core subjects.',
    photo: '/assets/classrooms/class5.webp',
    alt: 'A teacher standing at the front of a full classroom, taking a lesson',
    focus: '15% center',
  },
  {
    label: 'Regular assessment',
    text: 'Homework, class tests and project work run throughout the year, with periodic tests and terminal examinations tracking progress. The ICSE and ISC examinations become the culmination of ongoing assessment rather than a single high-stakes moment.',
    photo: '/assets/classrooms/class6.webp',
    alt: 'Students at their desks with notebooks open, listening closely in class',
  },
  {
    label: 'Individual support',
    text: 'Teachers work with students individually where extra support or stretch is needed.',
    photo: '/assets/hero/hero-5.webp',
    alt: 'Young students at their desks, each working on their own drawing',
  },
];

export const metadata: Metadata = {
  title: 'Academics | Brindavan Boarding School',
  description:
    'The academic pathway at Brindavan Boarding School, Mirik: primary years through to the ICSE and ISC stages.',
  openGraph: {
    title: 'Academics at Brindavan Boarding School',
    description: 'Primary years through to the ISC pathway: the academic journey at Brindavan.',
    type: 'website',
  },
};

export default function AcademicsPage() {
  return (
    <main id="main">
      <section className="section page-intro page-intro--photo">
        <div className="page-intro-copy">
          <Link className="text-link" href="/" prefetch={false}>
            <span className="back-arrow">←</span> Back to home
          </Link>
          <p className="eyebrow">THE LEARNING JOURNEY</p>
          <h1>
            Room to discover.
            <br />
            Confidence to
            <br />
            <em>go further.</em>
          </h1>
          <p className="lead">
            From a child’s first years of reading and numbers through to the ISC pathway, Brindavan’s academic
            journey is built in stages: each one preparing students for the next.
          </p>
        </div>
        <figure className="page-intro-photo">
          <img
            src="/assets/outdoor/openarea.webp"
            width="1100"
            height="825"
            alt="Brindavan Boarding School students lined up by class on the open assembly ground, with the Mirik hills behind"
          />
        </figure>
      </section>
      <div className="facts">
        <div>
          <span>01 / BOARD</span>
          <strong>ICSE &amp; ISC*</strong>
        </div>
        <div>
          <span>02 / SCHOOL CODE</span>
          <strong>WB353*</strong>
        </div>
        <div>
          <span>03 / MEDIUM</span>
          <strong>English*</strong>
        </div>
        <div>
          <span>04 / STAGES</span>
          <strong className="nowrap-fact">Primary → Senior secondary</strong>
        </div>
      </div>
      <section className="section academics">
        <div className="section-heading">
          <div>
            <p className="eyebrow">STAGE BY STAGE</p>
            <h2>
              Three stages.
              <br />
              One <em>continuous journey.</em>
            </h2>
          </div>
          <p>Each stage builds on the last, so that skills learned early carry through to the ISC years.</p>
        </div>
        <StageJourney stages={stages} />
        <p className="footnote">
          *ICSE/ISC affiliation, school code and medium of instruction are described in public listings.
          Confirm current affiliation, available classes, subject combinations and entry requirements directly
          with the school.
        </p>
      </section>
      <section className="section faculty" id="faculty" aria-labelledby="faculty-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">OUR TEAM</p>
            <h2 id="faculty-title">
              The people who
              <br />
              <em>teach here.</em>
            </h2>
          </div>
          <p>
            Twenty-six teaching staff across the subject timetable, alongside the boarding and support teams
            who keep the school running day to day.
          </p>
        </div>
        <h3 className="faculty-group">Science stream</h3>
        <FacultyGrid members={staff.science} linked />
        <h3 className="faculty-group">Commerce &amp; Arts stream</h3>
        <FacultyGrid members={staff.commerceArts} linked />
        <h3 className="faculty-group">Primary &amp; other teaching staff</h3>
        <FacultyGrid members={staff.otherTeaching} linked />
        <h3 className="faculty-group">Boarding &amp; hostel team</h3>
        <FacultyGrid members={staff.boarding} />
        <h3 className="faculty-group">Support staff</h3>
        <FacultyGrid members={staff.support} />
      </section>
      <section className="section learning">
        <div className="section-heading">
          <div>
            <p className="eyebrow">HOW LEARNING HAPPENS</p>
            <h2>
              Classroom teaching
              <br />
              &amp; <em>assessment.</em>
            </h2>
          </div>
          <p>Structured teaching, regular assessment, steady progress.</p>
        </div>
        <LearningShowcase items={learning} />
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
            <h3>Study &amp; independence</h3>
            <p>How study time works alongside boarding routines.</p>
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
            <h3>Clubs &amp; activities</h3>
            <p>Where learning continues outside the classroom.</p>
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
            <h3>Ask about a subject or class</h3>
            <p>Start a conversation about your child’s next step.</p>
            <em>Explore admissions</em>
          </Link>
        </div>
      </section>
    </main>
  );
}
