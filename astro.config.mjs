// -----------------------------------------------------------------------------
// ASTRO BUILD CONFIGURATION
//
// The site is fully static and deployed by Netlify. The canonical site URL and
// trailing-slash policy are shared assumptions with Layout.astro and the sitemap
// generator, so change them together if the public URL strategy ever changes.
// -----------------------------------------------------------------------------

import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://m221.tech',
  trailingSlash: 'always',

  // M221Tech uses authored CSS only. Tailwind was removed because no page/component
  // used utility classes, which keeps the dependency surface and build pipeline lean.
  integrations: [],

  // Fully static output for Netlify.
  output: 'static'
});
