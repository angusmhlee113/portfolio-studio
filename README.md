# Angus portfolio — Next.js

A Next.js App Router and TypeScript conversion of the Studio Concept portfolio. Includes the walking SVG avatar, click-to-wave, pointer tilt, three themes, project dialogs, and reduced-motion support.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000.

## Production

```sh
npm run build
npm start
```

Builds export static files to `out/`. `npm start` previews those files locally. The existing Sites sample remains a separate deployment.

## Edit

- `components/Portfolio.tsx`: page content, project artwork, theme controls and reduced-motion support.
- `components/Studio.tsx`: SVG studio and avatar, greeting and pointer interaction.
- `components/useWalker.ts`: walking route, limb animation, animation lifecycle cleanup.
- `components/DetailDialog.tsx`: accessible native modal and focus handling.
- `lib/content.ts`: sample project descriptions and contact placeholder.
- `app/globals.css`: responsive layout, themes, animation and focus styles.
- `app/layout.tsx`: page title and description.

The avatar is animated SVG, not a WebGL model. Project descriptions, biography, and contact action are illustrative placeholders. Google Fonts load in the browser; fallback fonts work offline. No API keys, database, or environment variables are required.

`npm run typecheck` checks TypeScript. Reduced motion pauses walking and disables CSS animation; mouse clicks do not show the avatar focus ring, while keyboard navigation does.

## GitHub Pages — angusmhlee113.github.io

Publish this directory's contents at the root of the `angusmhlee113/angusmhlee113.github.io` repository, on branch `main`. In the repository Settings → Pages, select **GitHub Actions** as the build and deployment source. The included `.github/workflows/deploy.yml` builds and deploys on every push to `main`, or manually from the Actions tab.

The intended address is https://angusmhlee113.github.io/. No repository base path or custom domain is needed. GitHub Pages serves the `out/` artifact; it does not run a Next.js server. The current portfolio uses browser-side interactions and works with static export.

For a new, empty repository:

```sh
git init -b main
git add .
git commit -m "Add Next.js portfolio"
git remote add origin https://github.com/angusmhlee113/angusmhlee113.github.io.git
git push -u origin main
```

If the repository already contains files, clone it first and merge this project's source into it rather than overwriting its history.
