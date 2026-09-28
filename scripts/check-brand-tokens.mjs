import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('..', import.meta.url));
const stylesDir = path.join(rootDir, 'src', 'styles');

const forbiddenCoreColors = new Map([
  ['#0B1020', '--m221-bg'],
  ['#070C17', '--m221-bg-deep'],
  ['#0F1729', '--m221-panel'],
  ['#F5F7FA', '--m221-text'],
  ['#DCE5EF', '--m221-text-soft'],
  ['#AEB6C2', '--m221-muted'],
  ['#7F8CA0', '--m221-muted-nav'],
  ['#566378', '--m221-muted-dim'],
  ['#46556C', '--m221-muted-faint'],
  ['#00BFD6', '--m221-data-start'],
  ['#3FE6A8', '--m221-data-end'],
  ['#FFC300', '--m221-accent-yellow']
]);

const allowedQuotedFontFamilies = new Set([
  'Space Grotesk',
  'IBM Plex Mono',
  'Segoe UI'
]);

const files = (await readdir(stylesDir))
  .filter((name) => name.endsWith('.css') && name !== 'brand.css')
  .sort();

const errors = [];

for (const file of files) {
  const content = await readFile(path.join(stylesDir, file), 'utf8');

  for (const [hex, token] of forbiddenCoreColors) {
    const pattern = new RegExp(hex.replace('#', '\\#'), 'gi');
    if (pattern.test(content)) {
      errors.push(`${file}: use var(${token}) instead of raw ${hex}.`);
    }
  }

  for (const match of content.matchAll(/font(?:-family)?\s*:[^;{}]*?['"]([^'"]+)['"]/gi)) {
    const family = match[1];
    if (!allowedQuotedFontFamilies.has(family)) {
      errors.push(`${file}: unexpected font family "${family}".`);
    }
  }
}

if (errors.length) {
  console.error('M221Tech brand token check failed:\n');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`M221Tech brand token check passed across ${files.length} stylesheets.`);
