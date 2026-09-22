# M221Tech — Site (Astro)

This repository powers the main M221Tech website.

## Local development

```bash
npm install
npm run dev
```

The site runs at `http://localhost:4321`.

## Production build

```bash
npm run build
npm run preview
```

## Deployment

- Production branch: `main`
- Development/refactor branch: `staging`
- Netlify build command: `npm run build`
- Publish directory: `dist`
- Production domain: `https://m221.tech`

Do not merge `staging` into `main` or deploy production changes without explicit approval.

## SEO and public files

- `robots.txt`, `_redirects` and verification files live in `public/`.
- `sitemap.xml` is regenerated automatically from public static Astro routes with `npm run seo:generate` and on every production build.
- Non-production Netlify builds are marked `noindex,nofollow,noarchive` from `Layout.astro`.
- Canonical URLs, hreflang, Open Graph, Twitter metadata and structured data are centralized in `src/layouts/Layout.astro`.

## Current structure

The site is bilingual (EN/FR) and organized around the M221Tech brand plus independent project pages. Shared metadata and document structure live in `src/layouts/Layout.astro`; header/footer markup lives in shared components.

`src/styles/chrome.css` is the canonical source for site chrome: header geometry, desktop/mobile navigation, local section navigation, home spine, focus states, footer and their shared breakpoints. Do not add new late-stage chrome override files; update `chrome.css` instead. Project-specific CSS is loaded from the relevant page when possible.

Brand derivatives are generated with `npm run brand:generate`; SEO route discovery is generated with `npm run seo:generate`.
