// Runs after `next build`.
// The browser prefetches page data from URLs like /about/__next.about.__PAGE__.txt, but the
// static export writes that file as /about/__next.about/__PAGE__.txt. A plain static host
// cannot map one onto the other, so each nested file is also copied to the flat name.
import { copyFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const OUT = 'out';
let copied = 0;

const flatten = (dir, target, prefix) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const name = `${prefix}.${entry.name}`;
    if (entry.isDirectory()) flatten(join(dir, entry.name), target, name);
    else {
      copyFileSync(join(dir, entry.name), join(target, name));
      copied++;
    }
  }
};

const visit = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === '_next' || entry.name === 'assets') continue;
    const path = join(dir, entry.name);
    if (entry.name.startsWith('__next.')) flatten(path, dir, entry.name);
    else visit(path);
  }
};

if (existsSync(OUT)) visit(OUT);
console.log(`flatten-export: copied ${copied} prefetch file(s)`);
