import type { Metadata } from 'next';
import Link from 'next/link';
import { FaqSection } from '@/components/FaqSection';
import { SwooshArrow } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Admissions | Brindavan Boarding School',
  description:
    'How to begin the admission process at Brindavan Boarding School, Mirik: steps, FAQs and how to get in touch.',
  openGraph: {
    title: 'Admissions at Brindavan Boarding School',
    description: 'Let’s begin with a conversation: how admission works at Brindavan.',
    type: 'website',
  },
};

export default function AdmissionsPage() {
  return (
    <main id="main">
      <section className="section page-intro">
        <Link className="text-link" href="/" prefetch={false}>
          <span className="back-arrow">←</span> Back to home
        </Link>
        <p className="eyebrow">FOR YOUR CHILD’S NEXT CHAPTER</p>
        <h1>
          Let’s begin with
          <br />
          <em>a conversation.</em>
        </h1>
        <p className="lead">
          Get to know the school before making your decision. This page outlines the general steps for
          enquiring about a place at Brindavan. The school confirms all final details directly.
        </p>
      </section>
      <section className="section admissions">
        <div>
          <p className="eyebrow">HOW TO START</p>
          <h2>
            Three steps
            <br />
            to a<br />
            <em>decision.</em>
          </h2>
          <p>
            Admission dates, seats and fees must be confirmed with the school. This website does not collect
            applications.
          </p>
          <a
            className="button"
            href="https://www.facebook.com/p/Brindavan-boarding-school-61574700620509/"
            target="_blank"
            rel="noopener"
          >
            Contact via school page{' '}
            <span>
              <SwooshArrow />
            </span>
          </a>
          <p className="footnote">
            Use the school’s official contact channels for the current admission calendar, fee structure and
            eligibility criteria.
          </p>
        </div>
        <ol className="steps">
          <li>
            <span>01</span>
            <div>
              <h3>Start with your questions</h3>
              <p>
                Share your child’s age, current class, and whether you are considering day scholar or boarding
                admission.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Get to know the school</h3>
              <p>
                Arrange a visit directly: see the campus, meet staff, and discuss academics, boarding and your
                child’s specific needs.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Confirm the next steps</h3>
              <p>
                Request the current fee structure, document checklist, eligibility criteria and application
                process directly from the admissions team.
              </p>
            </div>
          </li>
        </ol>
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
              Reach the school through its official social page, or plan an in-person visit to Seeyok Fatak,
              Mirik to speak with the admissions team directly.
            </p>
          </details>
        </div>
      </FaqSection>
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
            <h3>Which stage is right?</h3>
            <p>See the primary, secondary and senior secondary stages.</p>
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
            <h3>Considering boarding?</h3>
            <p>What to know and ask before deciding.</p>
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
            <h3>Plan your visit</h3>
            <p>Location, map and how to reach the school.</p>
            <em>Plan your visit</em>
          </Link>
        </div>
      </section>
    </main>
  );
}
