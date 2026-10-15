import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { profiles } from '@/data/profiles';
import { staffSlug, teachers, type StaffMember } from '@/data/staff';

type Params = { params: Promise<{ slug: string }> };

// One static page per teacher; any other /faculty/... address is a 404.
export const dynamicParams = false;
export const generateStaticParams = () => teachers.map((member) => ({ slug: staffSlug(member) }));

const findTeacher = (slug: string) => teachers.find((member) => staffSlug(member) === slug);

/** What the teacher teaches, or undefined when no subject is on record (the card then shows a role). */
const subjectsOf = (member: StaffMember) => {
  const subjects = profiles[staffSlug(member)]?.subjects;
  return subjects === null ? undefined : (subjects ?? member.title);
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const member = findTeacher((await params).slug);
  if (!member) return {};
  const subjects = subjectsOf(member);
  const description = subjects
    ? `${member.name} teaches ${subjects} at Brindavan Boarding School, Mirik.`
    : `${member.name} is a teacher at Brindavan Boarding School, Mirik.`;
  return {
    title: `${member.name} | Brindavan Boarding School`,
    description,
    openGraph: {
      title: subjects ? `${member.name}, ${subjects}` : member.name,
      description,
      type: 'profile',
    },
  };
}

function DetailList({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <section className="rounded-card border border-line bg-white p-7 text-center">
      <h2 className="mb-4 text-[19px] tracking-[-0.025em]">{title}</h2>
      <ul className="m-0 list-none p-0">
        {items.map((item) => (
          <li
            key={item}
            className="border-t border-line py-3 text-[15px] leading-[1.6] text-muted first:border-t-0"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function TeacherPage({ params }: Params) {
  const member = findTeacher((await params).slug);
  if (!member) notFound();
  const profile = profiles[staffSlug(member)] ?? {};
  const subjects = subjectsOf(member);
  const facts = [
    ['Subject', subjects],
    ['Classes', profile.classes],
    ['At Brindavan since', profile.joined],
    ['Languages', profile.languages?.join(', ')],
  ].filter((fact): fact is [string, string] => Boolean(fact[1]));
  const hasDetails = Boolean(
    profile.focus || profile.qualifications || profile.experience || profile.strengths,
  );

  return (
    <main id="main">
      <section className="section page-intro grid items-start gap-[clamp(28px,4vw,70px)] min-[801px]:grid-cols-[minmax(0,360px)_1fr]">
        <div className="aspect-[4/5] overflow-hidden rounded-card bg-[linear-gradient(180deg,#24355f_0%,#142039_100%)] max-[800px]:max-w-[360px]">
          {member.photo ? (
            <img
              className="block h-full w-full object-cover"
              src={member.photo.src}
              width={member.photo.width}
              height={member.photo.height}
              alt={member.name}
            />
          ) : (
            <span className="grid h-full place-items-center text-white/30">
              <svg
                className="w-[42%]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="8.5" r="3.8" />
                <path d="M4.5 20.5c0-4.1 3.4-7 7.5-7s7.5 2.9 7.5 7" />
              </svg>
            </span>
          )}
        </div>
        <div>
          <Link className="text-link" href="/academics#faculty">
            <span className="back-arrow">←</span> All teachers
          </Link>
          <p className="eyebrow text-blue">{(subjects ?? 'Teaching staff').toUpperCase()}</p>
          <h1>{member.name}</h1>
          {profile.role && <p className="lead">{profile.role}</p>}
          <dl className="mt-7 mb-0 flex flex-wrap gap-x-10 gap-y-5 border-t border-line pt-6">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt className="mb-1.5 text-[11px] tracking-[0.12em] text-muted uppercase">{label}</dt>
                <dd className="m-0 text-[17px] font-[550]">{value}</dd>
              </div>
            ))}
          </dl>
          {profile.about && (
            <p className="mt-7 mb-0 max-w-[62ch] text-(length:--body) leading-[1.75] text-muted">
              {profile.about}
            </p>
          )}
          {profile.philosophy && (
            <blockquote className="mx-0 mt-7 mb-0 max-w-[30ch] border-l-[3px] border-orange pl-5 font-display text-[clamp(20px,1.9vw,28px)] leading-[1.25] font-semibold tracking-[-0.03em]">
              “{profile.philosophy}”
            </blockquote>
          )}
          {!profile.about && !hasDetails && (
            <p className="mt-7 mb-0 max-w-[62ch] text-(length:--body) leading-[1.75] text-muted">
              A fuller profile for {member.name} will be added soon.
            </p>
          )}
        </div>
      </section>
      {hasDetails && (
        <section className="section grid items-start gap-5 min-[801px]:grid-cols-2">
          <DetailList title="Qualifications" items={profile.qualifications} />
          <DetailList title="Teaching experience" items={profile.experience} />
          <DetailList title="In the classroom and beyond" items={profile.focus} />
          {profile.strengths && (
            <section className="rounded-card border border-line bg-white p-7 text-center">
              <h2 className="mb-4 text-[19px] tracking-[-0.025em]">Strengths</h2>
              <ul className="m-0 flex list-none flex-wrap justify-center gap-2 p-0">
                {profile.strengths.map((item) => (
                  <li key={item} className="rounded-full border border-line px-3.5 py-1.5 text-[13px]">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </section>
      )}
    </main>
  );
}
