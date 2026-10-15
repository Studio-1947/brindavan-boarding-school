import VisitPage, { metadata as english } from '@/app/visit/page';
import { localizeMetadata, localizeTree } from '@/i18n/localize';

export const generateMetadata = () => localizeMetadata(english, 'ne');

export default async function Page() {
  return localizeTree(<VisitPage />, 'ne');
}
