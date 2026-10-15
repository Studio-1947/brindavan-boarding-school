import HomeOptionTwoPage, { metadata as english } from '@/app/index-2/page';
import { localizeMetadata, localizeTree } from '@/i18n/localize';

export const generateMetadata = () => localizeMetadata(english, 'ne');

export default async function Page() {
  return localizeTree(<HomeOptionTwoPage />, 'ne');
}
