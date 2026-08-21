# AGENTS.md

This file provides guidance to AI coding agents working with code in this repository.

Keep `AGENTS.md` and `README.md` up-to-date whenever you modify the project.

## Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Build to dist/
npm run preview   # Preview the production build locally
npm run check     # Type-check all Astro/TS files via astro check
npm run lint      # Lint with oxlint
npm run fmt       # Format all files with oxfmt (writes in place)
```

**After editing files, always run `npm run fmt`, `npm run lint`, and `npm run check`.**

## Architecture

This is a personal portfolio site built with [Astro](https://astro.build), Tailwind CSS (via `@tailwindcss/vite`), and `unplugin-icons` for SVG icons from the `simple-icons` and `lucide` sets.

**Content layer** — Projects are defined as Markdown files in `src/content/projects/`. The schema is in [src/content.config.ts](src/content.config.ts): each file requires `title`, `description`, and `date`; `links` and `tags` are optional. The index page queries this collection via `getCollection('projects')` and sorts by date descending.

**Layout** — `BaseLayout.astro` wraps every page with a `<Header>`, `<Footer>`, and a centered `max-w-2xl` main column. Pages pass optional `title` and `description` props for `<head>` metadata.

**Icons** — `unplugin-icons` is wired in as a Vite plugin in `astro.config.ts`, but icons are imported as raw SVG (`~icons/<collection>/<icon>?raw`) in [src/icons.ts](src/icons.ts) rather than as components. `IconSprite.astro` emits each one once as a `<symbol>` at the end of `<body>`, and `<Icon name="github" class="w-4 h-4" />` references it with `<use>`. Rendering icons as components inlined the same path data on every occurrence — the GitHub mark alone appeared nine times on the homepage.

To add an icon, add a `?raw` import to `ICON_SOURCES` in `src/icons.ts`; `IconName` and the sprite pick it up automatically. Sizing classes are required at every call site, because a `<use>` reference has no intrinsic size.

**Styling** — Tailwind is wired in as a Vite plugin; there is no `tailwind.config.*` file. Global base styles live in `src/styles/global.css`.

**TypeScript** — A single [tsconfig.json](tsconfig.json) covers everything — browser files in `src` and Node `*.config.ts` files in root. Browser and `node` types are shared for all files, matching Astro's own convention. Take care to not use Node-specific globals in browser files or browser-specific globals in Node files, because TypeScript will not catch it.
