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

## Static public files

Files that must be copied directly to the deployed site live in `public/`:

- `robots.txt`
- `sitemap.xml`
- `_redirects`
- Google site verification

Non-production Netlify builds are marked `noindex,nofollow` from `Layout.astro` using Netlify's build context.

## Current structure

```text
src/
  layouts/Layout.astro
  components/Header.astro
  components/Footer.astro
  components/DataDashboard.astro
  data/dashboard-demo.json
  pages/index.astro
  styles/global.css
  styles/legacy.css
  scripts/site.js
public/
  robots.txt
  sitemap.xml
  _redirects
  google7965e3e4cffc7ddf.html
```

The current homepage is legacy content and is being progressively replaced by the new M221Tech product-studio experience on `staging`.
