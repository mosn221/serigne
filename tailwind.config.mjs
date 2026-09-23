// tailwind.config.mjs
// -----------------------------------------------------------------------
// Configuration de Tailwind CSS. Tailwind génère des classes utilitaires
// (ex: "flex", "gap-4", "text-cyan") à la volée, uniquement pour celles
// réellement utilisées dans le code (voir "content" ci-dessous).
//
// Tailwind reste une couche utilitaire légère. Le design partagé est porté
// par les feuilles CSS du site, avec chrome.css comme source canonique pour
// le header, les navigations et le footer.
// -----------------------------------------------------------------------

/** @type {import('tailwindcss').Config} */
export default {
  // "content" indique à Tailwind où chercher les classes utilisées, pour
  // ne générer QUE le CSS nécessaire (fichier final très léger).
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],

  theme: {
    extend: {
      // Convenience aliases only. Canonical visual decisions still live in the
      // authored CSS/BRAND.md; these values let future utility-based components
      // reuse the same palette without inventing close-but-different colors.
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
