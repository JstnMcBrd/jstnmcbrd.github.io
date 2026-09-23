# AGENTS.md

Guidance for AI coding agents in this repository.

When you change the project, update `AGENTS.md` and `README.md` to match.

## Commands

```bash
npm run dev       # Start the dev server at localhost:4321
npm run build     # Build to dist/
npm run preview   # Serve the production build
npm run check     # Type-check with astro check
npm run lint      # Lint with oxlint
npm run fmt       # Format with oxfmt (writes in place)
```

After you edit files, run `npm run fmt`, `npm run lint`, and `npm run check`.

## Architecture

A personal portfolio site built with [Astro](https://astro.build), Tailwind CSS, and `unplugin-icons`.

- **Content** — Each project is a Markdown file in `src/content/projects/`. The schema is in [src/content.config.ts](src/content.config.ts). The index page lists the projects by date, newest first.
- **Layout** — `BaseLayout.astro` wraps every page in a header, a footer, and a centered `max-w-2xl` column. Pages can pass `title` and `description` props for `<head>` metadata.
- **Icons** — Icons come from the `simple-icons` and `lucide` sets. Import each icon as a component from `~icons/<collection>/<icon>` and render it as `<GithubIcon class="w-4 h-4" />`. The build includes only imported icons.
- **Styling** — Tailwind runs as a Vite plugin, so there is no `tailwind.config.*` file. Global base styles are in `src/styles/global.css`.
- **Contrast** — Text colors must meet WCAG AA (4.5:1). The muted link color is below 3:1 against body text, so links in body text also need a non-color cue. Use a heavier font weight for this cue, not an underline.
- **TypeScript** — One [tsconfig.json](tsconfig.json) covers the browser files in `src` and the Node `*.config.ts` files in the root. All files share browser and Node types, as Astro recommends. TypeScript cannot catch a Node global in a browser file or a browser global in a Node file, so check for this yourself.
