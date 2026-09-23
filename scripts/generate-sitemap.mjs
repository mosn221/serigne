// -----------------------------------------------------------------------------
// STATIC SITEMAP GENERATOR
//
// Discovers public static Astro/Markdown routes directly from src/pages.
// The result is written to dist/sitemap.xml after astro build, keeping generated
// output out of the tracked source tree.
//
// EN/FR alternates are emitted only when the mirrored route actually exists.
// Dynamic routes are intentionally skipped because this site currently ships only
// static public pages.
// -----------------------------------------------------------------------------

import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pagesDir = path.join(rootDir, 'src', 'pages');
const outputFile = path.join(rootDir, 'dist', 'sitemap.xml');
const site = 'https://m221.tech';

const pageExtensions = new Set(['.astro', '.md', '.mdx']);
const excludedFiles = new Set(['404', '500']);

// Recursive route discovery. API folders, hidden files, error pages and dynamic
// bracket routes are intentionally excluded from the public sitemap.
async function walk(dir, prefix = '') {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const relative = path.posix.join(prefix, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'api') continue;
      files.push(...await walk(path.join(dir, entry.name), relative));
      continue;
    }

    const ext = path.extname(entry.name);
    if (!pageExtensions.has(ext)) continue;
    if (relative.includes('[') || relative.includes(']')) continue;

    const stem = path.basename(entry.name, ext);
    if (excludedFiles.has(stem) || stem.startsWith('_')) continue;
    files.push(relative);
  }

  return files;
}

// Convert Astro file-system routes into canonical trailing-slash public paths.
function routeFromFile(relative) {
  let route = relative.replace(/\\/g, '/').replace(/\.(astro|md|mdx)$/, '');
  route = route.replace(/\/index$/, '');
  if (route === 'index') route = '';
  return route ? `/${route.replace(/^\/+|\/+$/g, '')}/` : '/';
}

// Route names are simple today, but escaping keeps the generator safe if future paths
// contain XML-sensitive characters.
function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function absolute(route) {
  return `${site}${route}`;
}

function englishRoute(route) {
  if (route === '/fr/') return '/';
  if (route.startsWith('/fr/')) return route.replace(/^\/fr/, '');
  return route;
}

function frenchRoute(route) {
  if (route === '/') return '/fr/';
  if (route.startsWith('/fr/')) return route;
  return `/fr${route}`;
}

// De-duplicate and order routes for deterministic output (useful in reviews/diffs).
const routes = [...new Set((await walk(pagesDir)).map(routeFromFile))]
  .sort((a, b) => {
    if (a === '/') return -1;
    if (b === '/') return 1;
    if (a === '/fr/') return -1;
    if (b === '/fr/') return 1;
    return a.localeCompare(b);
  });

// Build hreflang pairs from actual discovered routes rather than assuming every page
// has a translation.
const routeSet = new Set(routes);
const rows = routes.map((route) => {
  const en = englishRoute(route);
  const fr = frenchRoute(route);
  const enExists = routeSet.has(en);
  const frExists = routeSet.has(fr);
  const xDefault = enExists ? en : route;

  const alternates = [
    enExists ? `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(absolute(en))}" />` : null,
    frExists ? `    <xhtml:link rel="alternate" hreflang="fr" href="${escapeXml(absolute(fr))}" />` : null,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(absolute(xDefault))}" />`
  ].filter(Boolean).join('\n');

  return `  <url>
    <loc>${escapeXml(absolute(route))}</loc>
${alternates}
  </url>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${rows.join('\n')}
</urlset>
`;

await mkdir(path.dirname(outputFile), { recursive: true });
await writeFile(outputFile, xml, 'utf8');
console.log(`Generated sitemap.xml with ${routes.length} public static routes.`);
