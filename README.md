# <img src="public/favicon.svg" width="28" height="28">&nbsp; jstnmcbrd.github.io

Personal portfolio site built with [Astro](https://astro.build) v6, Tailwind CSS v4, and deployed to GitHub Pages.

## Stack

- **Astro v6** — static site generation
- **Tailwind CSS v4** — via `@tailwindcss/vite` plugin (no config file)
- **astro-icon** — SVG icons from the `simple-icons` set

## Development

```bash
npm run dev       # Start dev server
npm run build     # Build to `dist`
npm run preview   # Preview the production build locally
npm run check     # Type-check all Astro/TS files
npm run lint      # Lint with oxlint
npm run lint:fix  # Auto-fix lint issues with oxlint
npm run fmt       # Format all files with oxfmt
```

## Content

Projects are defined as Markdown files in `src/content/projects/`. Each file requires `title`, `description`, and `date` fields; `links` and `tags` are optional.
