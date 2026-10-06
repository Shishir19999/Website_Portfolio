# Website Portfolio

Personal portfolio site built with React 19, Vite 8, Bootstrap / React-Bootstrap, AOS animations, Typed.js and particles.js.

Live: https://Shishir19999.github.io/Website_Portfolio

## Editing content

- `src/components/data/hero.json`, `projects.json`, `skills.json` - hero image, project cards and skill icons
- `public/assets/` - images referenced from the JSON files (resolved against the Vite `base`)
- `src/pdf/Shishir_Sharma_CV.pdf` - CV linked by the "Download CV" button (imported, so Vite hashes and bundles it)

## Scripts

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build into dist/
npm run preview   # serve the production build
npm run lint
npm run deploy    # build and publish dist/ to GitHub Pages (gh-pages)
```

`vite.config.js` sets `base: "/Website_Portfolio/"` for GitHub Pages, so the dev server runs at http://localhost:5173/Website_Portfolio/.

## Tooling (updated 2026-10-06)

React 19.3, Vite 8, @vitejs/plugin-react 6, ESLint 9 (flat config). Requires Node ^20.19 or >=22.12.
