import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { readDistFile, siteOrigin } from "./dist.ts";

describe("homepage metadata", () => {
  const html = readDistFile("index.html");

  it("declares a language", () => {
    assert.match(html, /<html lang="en"/);
  });

  it("has a canonical URL on the deployed origin", () => {
    const canonical = /<link rel="canonical" href="([^"]+)">/.exec(html)?.[1];
    assert.equal(canonical, `${siteOrigin}/`);
  });

  it("has og:type and the Open Graph basics", () => {
    for (const property of ["og:type", "og:site_name", "og:title", "og:description", "og:url"]) {
      assert.match(html, new RegExp(`<meta property="${property}" content="[^"]+">`), property);
    }
  });
});

describe("404 metadata", () => {
  const html = readDistFile("404.html");

  // `404.html` answers every unknown path, so a canonical built from its own
  // path would point somewhere the visitor never asked for.
  it("claims no canonical URL", () => {
    assert.doesNotMatch(html, /rel="canonical"/);
    assert.doesNotMatch(html, /property="og:url"/);
  });
});
