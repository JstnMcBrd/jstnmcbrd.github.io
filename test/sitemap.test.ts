import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { readDistFile, siteOrigin } from "./dist.ts";

describe("sitemap.xml", () => {
  const xml = readDistFile("sitemap.xml");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

  it("is a well-formed urlset", () => {
    assert.match(xml, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
    assert.match(xml, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
    assert.match(xml, /<\/urlset>\s*$/);
  });

  it("lists the homepage on the deployed origin", () => {
    assert.ok(locs.includes(`${siteOrigin}/`), locs.join(", "));
  });

  it("lists only absolute URLs on the deployed origin", () => {
    for (const loc of locs) {
      assert.ok(loc?.startsWith(`${siteOrigin}/`), `${loc} is not on ${siteOrigin}`);
    }
  });

  it("excludes the 404 page", () => {
    assert.ok(!locs.some((loc) => loc?.includes("/404")), locs.join(", "));
  });

  it("gives every URL a lastmod date", () => {
    const lastmods = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1]);
    assert.equal(lastmods.length, locs.length);
    for (const lastmod of lastmods) {
      assert.match(lastmod ?? "", /^\d{4}-\d{2}-\d{2}$/);
    }
  });
});

describe("robots.txt", () => {
  const txt = readDistFile("robots.txt");

  it("allows crawling", () => {
    assert.match(txt, /User-agent: \*/);
    assert.match(txt, /Allow: \//);
  });

  it("points at the sitemap", () => {
    assert.match(txt, new RegExp(`Sitemap: ${siteOrigin}/sitemap\\.xml`));
  });
});
