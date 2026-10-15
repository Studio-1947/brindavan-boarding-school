import type { Metadata } from 'next';
import TeacherPage from '@/app/faculty/[slug]/page';
import { profiles } from '@/data/profiles';
import { staffSlug, teachers } from '@/data/staff';
import { localizeTree, translate } from '@/i18n/localize';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => teachers.map((member) => ({ slug: staffSlug(member) }));

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const member = teachers.find((m) => staffSlug(m) === slug);
  if (!member) return {};
  const subjects = profiles[staffSlug(member)]?.subjects;
  const subject = subjects === null ? undefined : translate(subjects ?? member.title, 'ne');
  const school = translate('Brindavan Boarding School', 'ne');
  const description = subject
    ? `${member.name} ${school}, मिरिकमा ${subject} पढाउनुहुन्छ।`
    : `${member.name} ${school}, मिरिकका शिक्षक हुनुहुन्छ।`;
  return {
    title: `${member.name} | ${school}`,
    description,
    openGraph: { title: subject ? `${member.name}, ${subject}` : member.name, description, type: 'profile' },
  };
}

export default async function Page(props: Params) {
  return localizeTree(<TeacherPage {...props} />, 'ne');
}
