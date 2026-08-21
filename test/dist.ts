import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/** Root of the built site. Tests run against `dist/`, so `npm run build` must come first. */
export const distDir = join(dirname(dirname(fileURLToPath(import.meta.url))), "dist");

/** The canonical origin the site is deployed to, mirroring `site` in `astro.config.ts`. */
export const siteOrigin = "https://jstnmcbrd.github.io";

export function readDistFile(relativePath: string): string {
  try {
    return readFileSync(join(distDir, relativePath), "utf8");
  } catch {
    throw new Error(`dist/${relativePath} is missing — run \`npm run build\` first`);
  }
}
