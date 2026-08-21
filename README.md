# <img src="public/favicon.svg" width="28" height="28" alt="" aria-hidden="true">&nbsp; jstnmcbrd.github.io

Personal portfolio site built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com), and deployed to GitHub Pages.

## Stack

- **Astro** — static site generation
- **Tailwind CSS** — via `@tailwindcss/vite` plugin (no config file)
- **unplugin-icons** — SVG icons from the `simple-icons` and `lucide` sets, emitted once as a sprite

## For agents

The site publishes [`/llms.txt`](https://jstnmcbrd.github.io/llms.txt) (what this site is and is not useful for), [`/sitemap.xml`](https://jstnmcbrd.github.io/sitemap.xml), [`/robots.txt`](https://jstnmcbrd.github.io/robots.txt), and `Person` JSON-LD on the homepage. Every page is server-rendered HTML that needs no JavaScript to read.

## Contributing

See [`AGENTS.md`](AGENTS.md) for codebase guidance, architecture notes, and workflow instructions for AI coding agents.
