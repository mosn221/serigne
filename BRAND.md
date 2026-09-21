# M221Tech brand assets

Canonical brand assets live in `public/assets/img/`.

| Asset | Role | Current use |
| --- | --- | --- |
| `m221tech-wordmark.svg` | Primary data-ribbon wordmark on dark surfaces | Header, footer |
| `m221tech-wordmark-on-light.svg` | Wordmark on light surfaces | Light-surface variant |
| `m221tech-mark.svg` | Standalone data-ribbon M on dark surfaces | JSON-LD, compact brand surfaces |
| `m221tech-mark-on-light.svg` | Standalone mark on light surfaces | Favicon / light-surface variant |
| `favicon-16x16.png` / `favicon-32x32.png` | Raster favicon fallbacks | Generated at build |
| `apple-touch-icon.png` | 180×180 touch icon | Generated at build |
| `m221tech-mark-512.png` | 512×512 raster mark | Generated at build |
| `m221tech-social-card.png` | 1200×630 social card | Open Graph / Twitter; generated at build |
| `m221tech-about-avatar.webp` | About illustration/avatar | Home About section |

## Canonical identity — Data Ribbons

The approved M221Tech mark is the **data-ribbon M**.

It keeps a strong off-white M structure on dark surfaces and turns the right side into three rising cyan/teal ribbons. The ribbons are part of the letter itself: they represent structured information moving through a system, not a separate growth arrow.

Core principles:

- the left structure stays strong, simple and immediately readable as an M;
- three parallel rising ribbons form the data/product side of the mark;
- the lower ribbon resolves into the right leg of the M;
- the mark suggests layers, pipeline, comparison and structured data;
- there is no arrowhead, glow or gaming/esports treatment;
- the canonical dark-surface data range runs from `#00BFD6` to `#3FE6A8`;
- the light-surface data range runs from `#007C91` to `#00A67E`;
- the neutral dark background is `#0B1020`;
- the light body is `#F4F7FA`;
- `221` uses the data accent and `Tech` remains lighter and visually secondary.

A restrained linear gradient is allowed **inside the data ribbons only**. It must never become a glow, shadow or decorative neon effect.

## Usage

Use the horizontal wordmark whenever the full name has enough room. Use the standalone data-ribbon M for compact identity surfaces, favicons, avatars and metadata.

The `on-light` variants are for light backgrounds only. The darker `m221tech-mark-on-light.svg` remains the SVG favicon so the mark stays visible on light browser chrome.

Raster assets are derived from the same canonical geometry by `scripts/generate-brand-assets.mjs` during the build. Favicon fallbacks, touch icon, 512 mark and social card therefore stay synchronized with the vector identity.
