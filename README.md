# Vite + React + Web Awesome (SPA)

Production-ready starter: **Vite + React 19 + TypeScript + Web Awesome + React Router**, with dynamic theming (light/dark/auto + custom palettes) persisted to localStorage.

## Stack
- ⚡ **Vite 6** — fast dev/build
- ⚛️ **React 19** — native custom-element support, no wrappers needed for Web Awesome
- 🎨 **Web Awesome** — Shoelace's successor, framework-agnostic web components
- 🧭 **React Router 7** (library mode, SPA)
- 🌗 **Dynamic theming** via CSS custom properties

## Setup

```bash
pnpm install        # or: npm install / yarn install
pnpm dev            # start dev server (http://localhost:5173)
pnpm build          # production build to dist/
pnpm preview        # preview the production build locally
```

## Deploy (free hosting)

This is a static SPA — `pnpm build` outputs to `dist/`. Drop it on any of these:

### Cloudflare Pages (recommended)
1. Push to GitHub.
2. cloudflare.com → Pages → Connect Git → pick repo.
3. Build command: `pnpm build` · Output: `dist`
4. Add a `_redirects` file in `public/` with:
   ```
   /*  /index.html  200
   ```
   (Already included.) This makes client-side routes work.

### Vercel
Add a `vercel.json` at the project root:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```


## Notes
- `setBasePath('/assets')` in `main.tsx` tells Web Awesome where its asset files (icons, etc.) live. The Vite plugin `vite-plugin-static-copy` copies them from `node_modules` into `dist/assets` at build time.
- React 19 handles property-vs-attribute on custom elements correctly, so you can pass objects/arrays as props without `ref` workarounds.
