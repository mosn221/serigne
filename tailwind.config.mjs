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
      // On réutilise exactement les couleurs déjà définies dans
      // legacy.css (variables CSS :root) pour que tout nouveau composant
      // Tailwind reste visuellement cohérent avec le reste du site.
      colors: {
        bg: '#0B1020',       // fond général (bleu nuit très sombre)
        card: '#121A2E',     // fond des cartes/blocs
        primary: '#0088CC',  // bleu principal (boutons, liens actifs)
        cyan: '#1DE9FF',     // accent cyan (hover, highlights)
        accent: '#FFC300',   // jaune/or (badges, eyebrow, accents)
        muted: '#AEB6C2'     // gris clair (texte secondaire)
      },
      fontFamily: {
        // Même logique que le CSS existant : Inter pour le texte courant,
        // Montserrat pour les titres.
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif']
      }
    }
  },

  plugins: []
};
