// -----------------------------------------------------------------------------
// ASTRO BUILD CONFIGURATION
//
// The site is fully static and deployed by Netlify. The canonical site URL and
// trailing-slash policy are shared assumptions with Layout.astro and the sitemap
// generator, so change them together if the public URL strategy ever changes.
// -----------------------------------------------------------------------------

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://m221.tech',
  trailingSlash: 'always',

  integrations: [
    tailwind({
      // M221Tech owns its authored base/reset layers. Enabling Tailwind preflight
      // here would reintroduce a second reset and make CSS ownership ambiguous.
      applyBaseStyles: false
    })
  ],

  // Fully static output for Netlify.
  output: 'static'
});
