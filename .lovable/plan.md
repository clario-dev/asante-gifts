## Objectif

Transformer BestGiftHunt en SPA statique déployable sur GitHub Pages, et recentrer le positionnement sur l'Afrique (Cotonou + Dakar, prix en FCFA uniquement).

---

## Partie 1 — SPA statique pour GitHub Pages

Le projet actuel utilise **TanStack Start + Cloudflare Worker (SSR)**, incompatible avec GitHub Pages (statique uniquement). On crée un build SPA parallèle sans toucher au SSR existant (qui reste utilisable pour Lovable hosting).

### Fichiers à créer

1. **`index.html`** (racine) — point d'entrée HTML pour Vite SPA, avec `<script type="module" src="/src/main.spa.tsx">`, meta tags FR, favicon, lien polices Google Fonts.

2. **`src/main.spa.tsx`** — bootstrap client-only :
   - `createRouter` TanStack Router avec `history: createHashHistory()` (évite besoin de 404.html mais on en ajoute un quand même)
   - Ou `createBrowserHistory()` + `404.html` fallback (meilleure UX, URLs propres)
   - Monte `<RouterProvider>` dans `#root`
   - Wrappe avec `QueryClientProvider`, `I18nBoot`, `<Toaster>`

3. **`vite.spa.config.ts`** — config Vite *plain* (sans `@lovable.dev/vite-tanstack-config` ni SSR) :
   - Plugin `@tanstack/router-plugin/vite` pour routing fichier
   - Plugin React, Tailwind, tsconfig-paths
   - `base: '/'` (repo `username.github.io`)
   - `build.outDir: 'dist-spa'`

4. **`public/404.html`** — copie de `index.html` (fallback SPA pour deep links GitHub Pages).

5. **`.github/workflows/deploy.yml`** — GitHub Actions :
   - Checkout, setup Bun, `bun install`
   - `bun run build:spa`
   - Copie `dist-spa/index.html` → `dist-spa/404.html`
   - Déploie via `actions/deploy-pages@v4`

6. **`package.json`** — ajouter scripts :
   - `"build:spa": "vite build --config vite.spa.config.ts"`
   - `"preview:spa": "vite preview --config vite.spa.config.ts"`

### Adaptations code

- **`src/routes/index.tsx`** : remplacer la détection SSR (`req.headers`) par détection 100% client (localStorage + `navigator.language`).
- **`src/routes/$lang.tsx`** : déjà compatible client (useEffect).
- **Aucune route ne doit utiliser `loader` server-side** — vérifié, c'est déjà le cas.

### Limites assumées

- Plus de SSR → SEO légèrement dégradé (acceptable pour MVP marketplace)
- Détection langue côté client uniquement (flash possible de la mauvaise langue avant redirect)
- Le SSR Lovable (`src/server.ts`, `wrangler.jsonc`) reste en place mais n'est pas utilisé par GitHub Pages

---

## Partie 2 — Recentrage Afrique (Cotonou + Dakar, FCFA only)

### Devise — XOF uniquement

- **`src/stores/currency.ts`** : simplifier le type `Currency = "XOF"` uniquement, supprimer EUR/USD et la logique de conversion/détection.
- **`src/components/site/Footer.tsx`** : supprimer le sélecteur de devises (garder juste le label "FCFA").
- **`formatPrice`** : toujours afficher en FCFA.

### Contenu localisé Afrique

- **`src/i18n/locales/fr.json` & `en.json`** :
  - Hero subtitle : insister sur "fabriqué à Cotonou & Dakar"
  - Footer tagline : "Basés à Cotonou & Dakar"
  - Newsletter / Why : mentionner livraison Afrique de l'Ouest
  - Témoignages : déjà africains (Abidjan, Dakar) — remplacer "Paris" par une ville africaine (Lomé ou Bamako)
  - Why us : "Livraison express Afrique (Bénin, Sénégal, Côte d'Ivoire, Togo...)"
- **`src/components/site/Footer.tsx`** : ajouter bloc adresses "Cotonou, Bénin · Dakar, Sénégal"
- **Navbar** : conserver le toggle FR/EN (utile pour anglophones africains : Ghana, Nigeria)

---

## Livraison

Workflow GitHub Actions clé en main, build SPA fonctionnel localement (`bun run build:spa && bun run preview:spa`), site sur `username.github.io` après push sur `main`.