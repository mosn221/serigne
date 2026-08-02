# M221Tech — Site (Astro)

## Installation locale

```bash
npm install
npm run dev
```

Le site tourne alors sur http://localhost:4321

## Build de production

```bash
npm run build
npm run preview   # pour vérifier le résultat avant déploiement
```

## Déploiement sur Netlify

1. Connecter le repo GitHub à Netlify
2. Build command : `npm run build` (déjà pré-rempli via `netlify.toml`)
3. Publish directory : `dist` (déjà pré-rempli via `netlify.toml`)
4. Chaque push sur la branche principale redéploie automatiquement

## ⚠️ Important — à faire avant la mise en ligne

Ce projet a été écrit sans pouvoir être buildé/testé en local (pas d'accès réseau
côté génération). Avant de déployer :

- [ ] Lancer `npm install` puis `npm run dev` et vérifier visuellement chaque section
- [ ] Vérifier que les polices, favicons et images se chargent bien (chemins `/assets/...`)
- [ ] **Les pages projets (`/projets/lekkantu`, `/projets/sunugoal`, `/projets/kurel`)
      ne sont pas encore migrées** — seul le contenu de `index.html` a été fourni au
      départ. Il faut uploader `lekkantu.html`, `sunugoal.html`, `kurel.html` (et leur CSS
      associé s'il diffère) pour compléter la migration à l'identique.
- [ ] Remplacer le dataset de démo (`src/data/dashboard-demo.json`) par un export réel
      du projet Lekkantu pour que le dashboard reflète de vraies données
- [ ] Créer `public/mentions-legales.html` ou une page Astro équivalente (référencée dans le footer)

## Structure

```
src/
  layouts/Layout.astro       → structure HTML commune (head, header, footer)
  components/Header.astro    → navigation
  components/Footer.astro    → pied de page
  components/DataDashboard.astro → graphique Chart.js en démo live
  data/dashboard-demo.json   → données du dashboard (à remplacer)
  pages/index.astro          → page d'accueil
  styles/global.css          → Tailwind + design system existant (legacy.css)
  scripts/site.js            → JS interactif du site (menu, onglets, compteurs, scroll)
```
