// astro.config.mjs
// -----------------------------------------------------------------------
// Fichier de configuration principal du projet Astro.
// C'est ici qu'on déclare : le mode de génération du site (statique ou
// serveur), les "intégrations" (plugins officiels Astro), et des options
// globales comme l'URL canonique du site (utile pour le SEO / sitemap).
// -----------------------------------------------------------------------

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // URL finale du site en production. Astro s'en sert pour générer les
  // URLs canoniques (<link rel="canonical">) et les balises Open Graph.
  site: 'https://m221.tech',

  integrations: [
    tailwind({
      // applyBaseStyles: false → on désactive les styles "reset" par défaut
      // de Tailwind, car on a déjà notre propre feuille de style existante
      // (legacy.css) qui gère déjà la remise à zéro des styles de base.
      // Si on laissait Tailwind faire son reset, ça pourrait entrer en
      // conflit avec les styles déjà validés du site actuel.
      applyBaseStyles: false
    })
  ],

  // output: 'static' → Astro génère un site 100% statique (HTML/CSS/JS
  // purs) au moment du build. Aucun serveur Node.js n'est nécessaire pour
  // servir le site ensuite : c'est ce qui permet de déployer sur Netlify
  // en mode "fichiers statiques", sans backend.
  output: 'static'
});
