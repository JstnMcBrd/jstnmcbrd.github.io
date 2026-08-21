import externalLink from "~icons/lucide/external-link?raw";
import astro from "~icons/simple-icons/astro?raw";
import gamejolt from "~icons/simple-icons/gamejolt?raw";
import github from "~icons/simple-icons/github?raw";
import huggingface from "~icons/simple-icons/huggingface?raw";
import linkedin from "~icons/simple-icons/linkedin?raw";
import npm from "~icons/simple-icons/npm?raw";
import tailwindcss from "~icons/simple-icons/tailwindcss?raw";
import typescript from "~icons/simple-icons/typescript?raw";
import x from "~icons/simple-icons/x?raw";

/**
 * Every icon the site uses, as raw SVG markup.
 *
 * Icons are imported with `?raw` rather than as components so each one can be
 * emitted once into the sprite in `IconSprite.astro` and referenced by `<use>`.
 * Rendering them as components inlined the same paths on every occurrence —
 * the GitHub mark alone appeared nine times on the homepage.
 *
 * Add an icon here and it becomes available to `<Icon name="..." />`.
 */
export const ICON_SOURCES = {
  astro,
  "external-link": externalLink,
  gamejolt,
  github,
  huggingface,
  linkedin,
  npm,
  tailwindcss,
  typescript,
  x,
  // Hand-drawn, so it has no icon-set equivalent to import.
  heart:
    '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
} as const;

export type IconName = keyof typeof ICON_SOURCES;

/** DOM id of the `<symbol>` for an icon, shared by the sprite and `<use>`. */
export function iconId(name: IconName): string {
  return `icon-${name}`;
}

export interface IconSymbol {
  id: string;
  viewBox: string;
  body: string;
}

/** Split raw `<svg>` markup into the pieces a `<symbol>` needs. */
export function toSymbol(name: IconName, source: string): IconSymbol {
  const viewBox = /viewBox="([^"]+)"/.exec(source)?.[1];
  if (!viewBox) {
    throw new Error(`icon "${name}" has no viewBox`);
  }
  const body = source.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
  return { id: iconId(name), viewBox, body };
}

export const ICON_SYMBOLS: IconSymbol[] = Object.entries(ICON_SOURCES).map(([name, source]) =>
  toSymbol(name as IconName, source),
);
