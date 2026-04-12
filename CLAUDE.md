# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Keep `CLAUDE.md` and `README.md` up-to-date whenever you modify the project.

## Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Build to dist/
npm run preview   # Preview the production build locally
npm run check     # Type-check all Astro/TS files via astro check
```

No test runner or linter is configured.

## Architecture

This is a personal portfolio site built with [Astro](https://astro.build) v6, Tailwind CSS v4 (via `@tailwindcss/vite`), and `astro-icon` for SVG icons from the `simple-icons` set.

**Content layer** — Projects are defined as Markdown files in `src/content/projects/`. The schema is in [src/content.config.ts](src/content.config.ts): each file requires `title`, `description`, and `date`; `url`, `repo`, and `tags` are optional. The index page queries this collection via `getCollection('projects')` and sorts by date descending.

**Layout** — `BaseLayout.astro` wraps every page with a `<Header>`, `<Footer>`, and a centered `max-w-2xl` main column. Pages pass optional `title` and `description` props for `<head>` metadata.

**Icons** — `astro-icon` is configured in `astro.config.ts` to include only the four `simple-icons` used in the footer (`github`, `linkedin`, `x`, `gamejolt`). Adding a new icon requires adding its slug to the `include` list there.

**Styling** — Tailwind v4 is wired in as a Vite plugin; there is no `tailwind.config.*` file. Global base styles live in `src/styles/global.css`.
