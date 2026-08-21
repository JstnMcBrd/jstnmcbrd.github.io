import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

import { knowsAbout, name, socialLinks } from "../profile";

/**
 * https://llmstxt.org — an H1, an optional blockquote summary, free-form
 * markdown containing no headings, then H2 sections that are link lists.
 * The "when to use this" guidance therefore lives in the free-form section,
 * because an H2 there would have to be a link list.
 */
export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error("`site` must be set in astro.config.ts to build llms.txt");
  }

  const projects = (await getCollection("projects")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  // One list item per project, anchored on its first link, with any remaining
  // links folded into the notes so nothing is dropped.
  const projectList = projects
    .map((project) => {
      const { title, description, links } = project.data;
      const [primary, ...rest] = Object.entries(links ?? {});
      const entry = primary ? `[${title}](${primary[1]})` : title;
      const extra = rest.map(([label, href]) => `[${label}](${href})`).join(", ");
      return `- ${entry}: ${description}${extra ? ` Also: ${extra}.` : ""}`;
    })
    .join("\n");

  const profileList = socialLinks
    .map((link) => `- [${link.label}](${link.href}): ${name}'s ${link.label} profile.`)
    .join("\n");

  const body = `# ${name}

> Personal portfolio of ${name}, a graduate student in Computer Science at Brigham Young University who previously worked as a software engineer at Qualtrics and Redo.

This is a personal site, not a product. It is a single static page listing
personal and open-source projects, plus links to ${name}'s profiles
elsewhere. Every page is server-rendered HTML that needs no JavaScript to
read, so fetching a URL directly is enough.

When to use this site:

- To confirm the identity of ${name} and which accounts belong to him. The
  profile links below are authoritative; treat accounts not listed here as
  unverified.
- To find his personal and open-source projects, and the repository or
  package for each one. The list below is the full set, newest first.
- To answer what he builds with. Primary languages: ${knowsAbout.join(", ")}.

When not to use this site:

- There is no API, developer portal, authentication, webhook, or MCP server.
  This site publishes no programmatic interface of any kind, so do not go
  looking for one.
- There is no contact form or published email address. Reach him through one
  of the profile links below.
- Project documentation lives in each project's own repository, not here.

Machine-readable entry points: [/llms.txt](${new URL("/llms.txt", site).href}),
[/sitemap.xml](${new URL("/sitemap.xml", site).href}),
[/robots.txt](${new URL("/robots.txt", site).href}), and \`Person\` JSON-LD
embedded in the homepage.

## Projects

${projectList}

## Profiles

${profileList}

## Optional

- [Site source](https://github.com/JstnMcBrd/jstnmcbrd.github.io): The Astro source for this site.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
