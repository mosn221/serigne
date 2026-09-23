// -----------------------------------------------------------------------------
// EDITORIAL BRAND ASSET PIPELINE
//
// The symbol is intentionally name-independent. Text such as "Galsen Facts" belongs
// to editorial layouts and metadata, never inside the canonical mark.
// -----------------------------------------------------------------------------

import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const rootDir = fileURLToPath(new URL('..', import.meta.url));
const assetDir = path.join(rootDir, 'public', 'assets', 'galsen-facts');
await mkdir(assetDir, { recursive: true });

const asset = (name) => path.join(assetDir, name);
const [markSvg, tileSvg, socialSvg] = await Promise.all([
  readFile(asset('mark.svg')),
  readFile(asset('mark-tile.svg')),
  readFile(asset('social-base.svg'))
]);

async function render(input, name, width, height = width) {
  await sharp(input, { density: 384 })
    .resize({ width, height, fit: 'contain' })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(asset(name));
}

await render(markSvg, 'mark-256.png', 256);
await render(markSvg, 'mark-512.png', 512);
await render(markSvg, 'mark-1024.png', 1024);

await render(tileSvg, 'icon-180.png', 180);
await render(tileSvg, 'icon-192.png', 192);
await render(tileSvg, 'icon-512.png', 512);
await render(tileSvg, 'icon-maskable-512.png', 512);
await render(tileSvg, 'avatar-512.png', 512);

await render(socialSvg, 'social-base.png', 1200, 630);

console.log('Generated editorial brand assets: marks, icons, avatar and social base.');
