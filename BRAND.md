# M221Tech brand assets

Canonical brand assets live in `public/assets/img/`.

| Asset | Role | Current use |
| --- | --- | --- |
| `m221tech-wordmark.svg` | Primary wordmark on dark surfaces | Header, footer |
| `m221tech-wordmark-on-light.svg` | Wordmark on light surfaces | Reserved light-surface variant |
| `m221tech-mark.svg` | Standalone signature M on dark surfaces | JSON-LD, compact brand surfaces |
| `m221tech-mark-on-light.svg` | Standalone mark on light surfaces | Reserved light-surface variant |
| `favicon-16x16.png` / `favicon-32x32.png` | Raster favicon fallbacks | Generated at build |
| `apple-touch-icon.png` | 180×180 touch icon | Generated at build |
| `m221tech-mark-512.png` | 512×512 raster mark | Generated at build |
| `m221tech-social-card.png` | 1200×630 social card | Open Graph / Twitter; generated at build |
| `m221tech-about-avatar.webp` | About illustration/avatar | Home About section |

## Final M geometry

The cyan stroke is not an arrow and is not laid over the logo as decoration. It is the actual rising oblique branch of the M.

- both top corners of the M terminate on the same horizontal line;
- the cyan branch finishes exactly at the upper-right corner of the M;
- it never rises above the opposite summit;
- there is no arrowhead, glow, shadow, gradient or baseline in the canonical logo;
- `221` stays cyan;
- `Tech` remains lighter and visually secondary.

## Usage

Use the horizontal wordmark whenever the full name has enough room. Use the standalone M for compact identity surfaces. The `on-light` variants are for light backgrounds only.

The dark `m221tech-mark-on-light.svg` variant is used as the SVG favicon for better visibility on light browser chrome. Raster assets are derived from the same canonical M geometry by `scripts/generate-brand-assets.mjs` during the build so favicon fallbacks, touch icon, 512 mark and social card cannot drift from the vector mark.
