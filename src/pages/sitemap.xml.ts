import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

/**
 * Page files, discovered at build time so a newly added page appears in the
 * sitemap without anyone remembering to list it here.
 */
const pageFiles = Object.keys(import.meta.glob("./**/*.astro"));

/** Pages that exist but should never be advertised as indexable URLs. */
const EXCLUDED = new Set(["/404"]);

function toRoute(pageFile: string): string {
  const path = pageFile.replace(/^\.\//, "/").replace(/\.astro$/, "");
  return path.replace(/\/index$/, "/");
}

function escapeXml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function isIndexable(route: string): boolean {
  // Dynamic routes need params this generic pass cannot supply.
  return !route.includes("[") && !EXCLUDED.has(route);
}

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error("`site` must be set in astro.config.ts to build a sitemap");
  }

  // The newest project is the most recent time the homepage's content changed.
  const projects = await getCollection("projects");
  const lastmod = projects
    .map((project) => project.data.date)
    .reduce((newest, date) => (date > newest ? date : newest), new Date(0))
    .toISOString()
    .slice(0, 10);

  const routes = pageFiles.map(toRoute).filter(isIndexable).sort();

  const urls = routes
    .map((route) => {
      const loc = escapeXml(new URL(route, site).href);
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
