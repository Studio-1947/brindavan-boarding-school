/* English -> Nepali dictionaries for page content, merged from one file per area of the site.
   `ne`: single pieces of text, keyed by the English exactly as it appears (surrounding spaces ignored).
   `phrases`: sentences broken up by line breaks, highlights or links; see localize.ts.
   Run `npm run i18n:check` to list any English text on the Nepali pages that has no translation. */

import { about, aboutPhrases } from './about';
import { home, homePhrases } from './home';
import { pagePhrases, pages } from './pages';
import { staff } from './staff';

export const ne: Record<string, string> = { ...staff, ...home, ...about, ...pages };
export const phrases: Record<string, string> = { ...homePhrases, ...aboutPhrases, ...pagePhrases };
