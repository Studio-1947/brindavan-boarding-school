import type { Metadata } from 'next';
import Link from 'next/link';
import { SwooshArrow } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Sitemap | Brindavan Boarding School',
  description: 'Explore every section of the Brindavan Boarding School website from one clear directory.',
};

const GROUPS = [
  {
    number: '01',
    title: 'School',
    description: 'Start with the school, its setting and the values that shape daily life.',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About us', href: '/about' },
      { label: 'Impact', href: '/impact' },
    ],
  },
  {
    number: '02',
    title: 'Learning',
    description: 'Explore the academic journey, classrooms and teaching community.',
    links: [{ label: 'Academics', href: '/academics' }],
  },
  {
    number: '03',
    title: 'Admissions & Visits',
    description: 'Find the information families need before starting a conversation or campus visit.',
    links: [
      { label: 'Admission', href: '/admissions' },
      { label: 'Visit the School', href: '/visit' },
    ],
  },
  {
    number: '04',
    title: 'Student Life',
    description: 'Discover boarding, activities, culture and the wider student experience.',
    links: [
      { label: 'Boarding life', href: '/boarding' },
      { label: 'Beyond Classrooms', href: '/life' },
    ],
  },
];

export default function SitemapPage() {
  return (
    <main id="main">
      <section className="section page-intro sitemap-intro">
        <Link className="text-link" href="/" prefetch={false}>
          <span className="back-arrow">←</span> Back to home
        </Link>
        <p className="eyebrow">FIND YOUR WAY</p>
        <h1>
          Everything at
          <br />
          Brindavan, in <em>one place.</em>
        </h1>
        <p className="lead">
          Use this directory to move quickly through school information, academics, admissions and student
          life.
        </p>
      </section>

      <section className="section sitemap-section" aria-label="Website directory">
        <div className="sitemap-grid">
          {GROUPS.map((group) => (
            <article className="sitemap-card" key={group.number}>
              <div className="sitemap-card-heading">
                <span>{group.number}</span>
                <div>
                  <h2>{group.title}</h2>
                  <p>{group.description}</p>
                </div>
              </div>
              <nav aria-label={group.title}>
                {group.links.map((link) => (
                  <Link href={link.href} key={link.href}>
                    {link.label}
                    <SwooshArrow />
                  </Link>
                ))}
              </nav>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
