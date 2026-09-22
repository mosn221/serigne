import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://m221.tech',
  trailingSlash: 'always',

  integrations: [
    tailwind({
      // M221Tech owns its reset/base layer; avoid a second Tailwind reset.
      applyBaseStyles: false
    })
  ],

  // Fully static output for Netlify.
  output: 'static'
});
