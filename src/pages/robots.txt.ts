import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    throw new Error("`site` must be set in astro.config.ts to build robots.txt");
  }

  const body = `# Everything here is public and safe to crawl.
User-agent: *
Allow: /

Sitemap: ${new URL("/sitemap.xml", site).href}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
