// -----------------------------------------------------------------------------
// LEKKANTU BRAND ASSET PIPELINE
//
// Canonical source copied byte-for-byte from mosn221/lekkantu:
// static/img/logo-final-lekkantu.png @ a06694eb3a9f4a86ee2eab05b8c2d44ee98f9c39.
// Do not redraw the mark in M221Tech.
// -----------------------------------------------------------------------------

import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const rootDir = fileURLToPath(new URL('..', import.meta.url));
const outDir = path.join(rootDir, 'public', 'assets', 'lekkantu');
await mkdir(outDir, { recursive: true });
const asset = (name) => path.join(outDir, name);
const master = await readFile(asset('mark-master.png'));

async function render(name, size) {
  await sharp(master)
    .resize({ width: size, height: size, fit: 'cover' })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(asset(name));
}

await render('mark-256.png', 256);
await render('mark-512.png', 512);
await render('icon-180.png', 180);
await render('icon-192.png', 192);
await render('icon-512.png', 512);
await render('avatar-512.png', 512);

const tile = await sharp(master)
  .resize({ width: 300, height: 300, fit: 'cover' })
  .png()
  .toBuffer();

const overlay = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <circle cx="1030" cy="80" r="280" fill="#0A5E57" opacity=".12"/>
  <circle cx="1140" cy="570" r="260" fill="#FFC300" opacity=".08"/>
  <path d="M72 546H1128" stroke="#FFFFFF" stroke-opacity=".08"/>
  <path d="M72 546H290" stroke="#00BFA6" stroke-width="5"/>
  <path d="M290 546H508" stroke="#FFC300" stroke-width="5"/>
</svg>`);

await sharp({
  create: { width:1200, height:630, channels:4, background:'#0B1020' }
})
  .composite([
    { input: overlay, top:0, left:0 },
    { input: tile, top:150, left:72 }
  ])
  .png({ compressionLevel:9, adaptiveFiltering:true })
  .toFile(asset('social-base.png'));

console.log('Generated Lekkantu brand assets from the canonical product-repository master.');
