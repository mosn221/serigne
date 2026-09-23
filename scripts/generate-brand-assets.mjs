// -----------------------------------------------------------------------------
// BRAND ASSET BUILD PIPELINE
//
// Canonical inputs are the SVG assets committed in public/assets/img/.
// This script creates every raster derivative used by browsers, devices, social
// previews and structured data. It runs before every production Astro build.
//
// Keep geometry/colors in the source SVGs; do not hand-edit generated PNG/WebP/ICO
// files. Re-running this script is the single source of truth for raster output.
// -----------------------------------------------------------------------------

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

// Resolve paths from this module instead of process.cwd() so the script behaves the
// same locally, in CI and on Netlify.
const rootDir = fileURLToPath(new URL('..', import.meta.url));
const outDir = path.join(rootDir, 'public', 'assets', 'img');
await mkdir(outDir, { recursive: true });

const asset = (name) => path.join(outDir, name);
const [markSvg, markOnLightSvg, lockupSvg, lockupOnLightSvg, faviconSvg] = await Promise.all([
  readFile(asset('m221tech-mark.svg')),
  readFile(asset('m221tech-mark-on-light.svg')),
  readFile(asset('m221tech-wordmark.svg')),
  readFile(asset('m221tech-wordmark-on-light.svg')),
  readFile(asset('favicon.svg'))
]);

// Generic SVG -> raster helper. High input density preserves vector edge quality
// before resizing to the exact output width.
async function renderSvg(input, name, width, format = 'png', options = {}) {
  let pipeline = sharp(input, { density: 384 }).resize({ width });
  if (format === 'webp') {
    pipeline = pipeline.webp({ quality: options.quality ?? 94, lossless: options.lossless ?? true });
  } else {
    pipeline = pipeline.png({ compressionLevel: 9, adaptiveFiltering: true });
  }
  await pipeline.toFile(asset(name));
}

// Square surfaces need a safe dark field around the standalone M mark. This is used
// for maskable/PWA and square social contexts where a horizontal lockup would crop.
async function brandedSquare(name, size, markWidth, format = 'png') {
  const mark = await sharp(markSvg, { density: 384 })
    .resize({ width: markWidth })
    .png()
    .toBuffer();

  let pipeline = sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: '#0B1020'
    }
  }).composite([{ input: mark, gravity: 'center' }]);

  if (format === 'webp') {
    pipeline = pipeline.webp({ quality: 94 });
  } else {
    pipeline = pipeline.png({ compressionLevel: 9, adaptiveFiltering: true });
  }

  await pipeline.toFile(asset(name));
}

// Open Graph/Twitter card: use the full horizontal lockup because this is a
// brand-forward surface with enough horizontal space.
async function socialCard() {
  const lockup = await sharp(lockupSvg, { density: 384 })
    .resize({ width: 980 })
    .png()
    .toBuffer();

  const base = sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: '#0B1020'
    }
  }).composite([{ input: lockup, gravity: 'center' }]);

  await base.clone().png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(asset('m221tech-social-card.png'));
  await base.clone().webp({ quality: 94 }).toFile(asset('m221tech-social-card.webp'));
}

const faviconSizes = [16, 32, 48];
const faviconBuffers = [];

for (const size of faviconSizes) {
  const buffer = await sharp(faviconSvg, { density: 384 })
    .resize({ width: size, height: size })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
  faviconBuffers.push(buffer);
  await writeFile(asset(`favicon-${size}x${size}.png`), buffer);
}

// ICO is assembled manually from the generated PNG buffers so no extra dependency is
// needed just for the legacy browser fallback.
function buildIco(buffers, sizes) {
  const header = Buffer.alloc(6 + buffers.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(buffers.length, 4);

  let offset = header.length;
  buffers.forEach((buffer, index) => {
    const size = sizes[index];
    const base = 6 + index * 16;
    header.writeUInt8(size === 256 ? 0 : size, base);
    header.writeUInt8(size === 256 ? 0 : size, base + 1);
    header.writeUInt8(0, base + 2);
    header.writeUInt8(0, base + 3);
    header.writeUInt16LE(1, base + 4);
    header.writeUInt16LE(32, base + 6);
    header.writeUInt32LE(buffer.length, base + 8);
    header.writeUInt32LE(offset, base + 12);
    offset += buffer.length;
  });

  return Buffer.concat([header, ...buffers]);
}

await writeFile(path.join(rootDir, 'public', 'favicon.ico'), buildIco(faviconBuffers, faviconSizes));

await renderSvg(faviconSvg, 'apple-touch-icon.png', 180);
await renderSvg(faviconSvg, 'icon-192.png', 192);
await renderSvg(faviconSvg, 'icon-512.png', 512);

await renderSvg(markSvg, 'm221tech-mark-256.png', 256);
await renderSvg(markSvg, 'm221tech-mark-512.png', 512);
await renderSvg(markSvg, 'm221tech-mark-1024.png', 1024);

await renderSvg(lockupSvg, 'm221tech-lockup.png', 1400);
await renderSvg(lockupSvg, 'm221tech-lockup.webp', 1400, 'webp');
await renderSvg(lockupOnLightSvg, 'm221tech-lockup-on-light.png', 1400);
await renderSvg(lockupOnLightSvg, 'm221tech-lockup-on-light.webp', 1400, 'webp');

await brandedSquare('icon-maskable-512.png', 512, 350);
await brandedSquare('m221tech-social-square.png', 1200, 660);
await brandedSquare('m221tech-social-square.webp', 1200, 660, 'webp');

await socialCard();

console.log('Generated M221Tech brand kit: favicons, app icons, raster lockups and social assets.');
