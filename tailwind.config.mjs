// tailwind.config.mjs
// -----------------------------------------------------------------------
// Configuration de Tailwind CSS. Tailwind génère des classes utilitaires
// (ex: "flex", "gap-4", "text-cyan") à la volée, uniquement pour celles
// réellement utilisées dans le code (voir "content" ci-dessous).
//
// Important : ce fichier ne remplace PAS le design existant du site
// (src/styles/legacy.css). Il vient en complément, pour les NOUVEAUX
// composants qu'on construit (comme le dashboard Chart.js) sans avoir à
// écrire du CSS custom à chaque fois.
// -----------------------------------------------------------------------

/** @type {import('tailwindcss').Config} */
export default {
  // "content" indique à Tailwind où chercher les classes utilisées, pour
  // ne générer QUE le CSS nécessaire (fichier final très léger).
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],

  theme: {
    extend: {
      // Tokens de marque M221Tech partagés avec le CSS du site.
      colors: {
        bg: '#0B1020',       // fond général (bleu nuit très sombre)
        card: '#121A2E',     // fond des cartes/blocs
        primary: '#00BFD6',  // cyan principal M221Tech
        cyan: '#3FE6A8',     // accent mint M221Tech
        accent: '#FFC300',   // jaune/or (badges, eyebrow, accents)
        muted: '#AEB6C2'     // gris clair (texte secondaire)
      },
      fontFamily: {
        // Typographies de marque du site.
        sans: ['Space Grotesk', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        data: ['IBM Plex Mono', 'monospace']
      }
    }
  },

  plugins: []
};
