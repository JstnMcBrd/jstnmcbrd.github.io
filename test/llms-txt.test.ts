import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { readDistFile, siteOrigin } from "./dist.ts";

const txt = readDistFile("llms.txt");
const lines = txt.split("\n");

/** Index of the first H2, i.e. the end of the free-form section. */
const firstH2 = lines.findIndex((line) => line.startsWith("## "));

describe("llms.txt structure (llmstxt.org)", () => {
  it("opens with an H1 naming the site", () => {
    assert.equal(lines[0], "# Justin McBride");
  });

  it("follows the H1 with a blockquote summary", () => {
    assert.match(lines[2] ?? "", /^> \S/);
  });

  it("uses no headings other than H1 and H2", () => {
    for (const line of lines) {
      if (line.startsWith("#")) {
        assert.match(line, /^#{1,2} /, line);
      }
    }
  });

  it("keeps the free-form section heading-free", () => {
    const freeform = lines.slice(1, firstH2 === -1 ? undefined : firstH2);
    assert.ok(!freeform.some((line) => line.startsWith("#")), "heading in free-form section");
  });

  it("makes every H2 section a list of links", () => {
    const sections = txt.split(/^## .+$/m).slice(1);
    assert.ok(sections.length > 0);
    for (const section of sections) {
      const entries = section.split("\n").filter((line) => line.trim() !== "");
      assert.ok(entries.length > 0);
      for (const entry of entries) {
        assert.match(entry, /^- \[[^\]]+\]\(https?:\/\/[^)]+\)/, entry);
      }
    }
  });
});

describe("llms.txt guidance", () => {
  it("says when to use the site and when not to", () => {
    assert.match(txt, /When to use this site:/);
    assert.match(txt, /When not to use this site:/);
  });

  it("states plainly that there is no API or MCP server", () => {
    const whenNot = txt.slice(txt.indexOf("When not to use this site:"));
    for (const term of ["API", "developer portal", "webhook", "MCP server"]) {
      assert.ok(whenNot.includes(term), `missing: ${term}`);
    }
  });

  it("points at the other machine-readable entry points", () => {
    for (const path of ["/sitemap.xml", "/robots.txt"]) {
      assert.ok(txt.includes(`${siteOrigin}${path}`), path);
    }
  });
});

describe("llms.txt content", () => {
  it("lists every project the homepage lists", () => {
    const html = readDistFile("index.html");
    const titles = [...html.matchAll(/<h3[^>]*>([^<]+)<\/h3>/g)].map((match) => match[1]);
    assert.ok(titles.length > 0);
    for (const title of titles) {
      assert.ok(txt.includes(`[${title}]`), `${title} is missing from llms.txt`);
    }
  });

  it("lists every profile the header links to", () => {
    const html = readDistFile("index.html");
    const section = txt.slice(txt.indexOf("## Profiles") + 1).split("\n## ")[0] ?? "";
    const profiles = section
      .split("\n")
      .flatMap((line) => [...line.matchAll(/\((https?:\/\/[^)]+)\)/g)].map((match) => match[1]));
    assert.ok(profiles.length > 0);
    for (const href of profiles) {
      assert.match(html, new RegExp(`href="${href}"`), href);
    }
  });
});
