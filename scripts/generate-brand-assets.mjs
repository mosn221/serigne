import { mkdir, readFile } from 'node:fs/promises';
import sharp from 'sharp';

const outDir = new URL('../public/assets/img/', import.meta.url);
await mkdir(outDir, { recursive: true });

const asset = (name) => new URL(name, outDir);
const [markSvg, markOnLightSvg, lockupSvg, lockupOnLightSvg, faviconSvg] = await Promise.all([
  readFile(asset('m221tech-mark.svg')),
  readFile(asset('m221tech-mark-on-light.svg')),
  readFile(asset('m221tech-wordmark.svg')),
  readFile(asset('m221tech-wordmark-on-light.svg')),
  readFile(asset('favicon.svg'))
]);

async function renderSvg(input, name, width, format = 'png', options = {}) {
  let pipeline = sharp(input, { density: 384 }).resize({ width });
  if (format === 'webp') {
    pipeline = pipeline.webp({ quality: options.quality ?? 94, lossless: options.lossless ?? true });
  } else {
    pipeline = pipeline.png({ compressionLevel: 9, adaptiveFiltering: true });
  }
  await pipeline.toFile(asset(name));
}

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

for (const size of [16, 32, 48]) {
  await renderSvg(faviconSvg, `favicon-${size}x${size}.png`, size);
}

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
