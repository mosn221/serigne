# M221Tech brand system

Canonical assets live in `public/assets/img/`.

The approved full brand identity is the horizontal **M + 221Tech** lockup. For the website chrome, the preferred signature is the more compact **M221** lockup. The standalone **data-ribbon M** remains the compact mark for favicons, avatars and constrained spaces.

## Source assets

| Asset | Role | Use |
| --- | --- | --- |
| `m221tech-wordmark.svg` | Full M221Tech lockup on dark surfaces | Social cards, presentations, external brand use |
| `m221tech-wordmark-on-light.svg` | Full M221Tech lockup on light surfaces | External brand use on light backgrounds |
| `m221-site-lockup.svg` | Compact M221 site signature | Header and footer |
| `m221-site-lockup-on-light.svg` | Compact M221 site signature on light | Reserved light-surface site use |
| `m221tech-mark.svg` | Standalone mark on dark surfaces | Compact identity, avatars, app/social marks |
| `m221tech-mark-on-light.svg` | Standalone mark on light surfaces | Compact identity on light backgrounds |
| `favicon.svg` | Branded dark-square favicon source | Browser favicon |
| `safari-pinned-tab.svg` | Monochrome Safari pinned-tab mark | Safari pinned tabs |

## Generated raster assets

Run:

```bash
npm run brand:generate
```

The build also runs this automatically before Astro.

| Asset | Size / format | Use |
| --- | --- | --- |
| `favicon.ico` | Multi-size ICO (16/32/48) | Legacy browser / shortcut fallback |
| `favicon-16x16.png` | 16×16 PNG | Browser fallback |
| `favicon-32x32.png` | 32×32 PNG | Browser fallback |
| `favicon-48x48.png` | 48×48 PNG | High-density browser fallback |
| `apple-touch-icon.png` | 180×180 PNG | iOS home screen |
| `icon-192.png` | 192×192 PNG | Web app manifest |
| `icon-512.png` | 512×512 PNG | Web app manifest |
| `icon-maskable-512.png` | 512×512 PNG | Maskable PWA icon |
| `m221tech-mark-256.png` | 256×256 transparent PNG | Compact raster mark |
| `m221tech-mark-512.png` | 512×512 transparent PNG | Structured data / organization logo |
| `m221tech-mark-1024.png` | 1024×1024 transparent PNG | High-resolution raster mark |
| `m221tech-lockup.png` | 1400px-wide transparent PNG | General raster lockup |
| `m221tech-lockup.webp` | 1400px-wide transparent WebP | Modern web raster lockup |
| `m221tech-lockup-on-light.png` | 1400px-wide transparent PNG | Light-surface raster lockup |
| `m221tech-lockup-on-light.webp` | 1400px-wide transparent WebP | Light-surface modern raster lockup |
| `m221tech-social-card.png` | 1200×630 PNG | Open Graph / Twitter large card |
| `m221tech-social-card.webp` | 1200×630 WebP | Reusable modern social asset |
| `m221tech-social-square.png` | 1200×1200 PNG | Social/avatar square |
| `m221tech-social-square.webp` | 1200×1200 WebP | Modern square social asset |

## Visual rules

- The left M structure is off-white / silver.
- The right side is formed by three rising cyan-to-teal data ribbons.
- `221` uses the same data accent family.
- `Tech` is neutral light on dark surfaces and dark neutral on light surfaces.
- Canonical dark background: `#0B1020`.
- Canonical data range: `#00BFD6` → `#3FE6A8`.
- Light-surface data range: `#007C91` → `#00A67E`.
- Gradients are restrained and belong inside the data elements only.
- No glow, neon halo, arrowhead, gaming treatment or decorative shadow.

## Usage hierarchy

1. **Website chrome:** compact M221 lockup.
2. **Full brand logo:** horizontal M + 221Tech lockup for external and brand-forward use.
3. **Compact mark:** standalone M for favicons, avatars and constrained spaces.
4. **Social preview:** 1200×630 full M221Tech lockup card.
5. **Square social / profile:** 1200×1200 standalone mark.
6. **PWA / device icons:** dark-square compact mark.

Do not recreate the logo manually in page markup. Use the canonical assets or the generated derivatives so the identity stays consistent.
