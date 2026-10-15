// Builds the site with reporting on and lists English text on the Nepali pages that has no
// translation yet. Names, codes and abbreviations that stay in English are filtered out below.
import { execSync } from 'node:child_process';
import { existsSync, readFileSync, rmSync } from 'node:fs';

const KEEP_IN_ENGLISH =
  /^(Miss|Mr|Mrs|Sister|Sri) |^(round|none|ICSE|Excel|PS|AR|TB|B\.Ed\.|B\.Sc\.|B\.A\.|M\.A\.|D\.El\.Ed\.|WB353\*|VI–XII|VI–X|http:\/\/www\.w3\.org\/2000\/svg)$/;

rmSync('.i18n-missing.txt', { force: true });
execSync('npx next build', { stdio: 'ignore', env: { ...process.env, I18N_REPORT: '1' } });
const lines = existsSync('.i18n-missing.txt') ? readFileSync('.i18n-missing.txt', 'utf8').split('\n') : [];
rmSync('.i18n-missing.txt', { force: true });
const missing = [...new Set(lines.filter(Boolean))]
  .filter((l) => l.startsWith('"'))
  .map((l) => JSON.parse(l))
  .filter((s) => !KEEP_IN_ENGLISH.test(s));
console.log(missing.length ? missing.join('\n') : 'All page text has a Nepali translation.');
