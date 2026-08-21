import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { readDistFile } from "./dist.ts";

// GitHub Pages serves `404.html` with a real HTTP 404 status for unknown paths,
// so the file existing at the root of `dist/` is what makes the status correct.
describe("404 page", () => {
  const html = readDistFile("404.html");

  it("has a single H1", () => {
    const h1s = html.match(/<h1[\s>]/g) ?? [];
    assert.equal(h1s.length, 1);
  });

  it("tells agents where to look next", () => {
    for (const href of ["/", "/sitemap.xml", "/llms.txt"]) {
      assert.match(html, new RegExp(`href="${href.replaceAll("/", "\\/")}"`));
    }
  });

  it("is not indexable", () => {
    assert.match(html, /<meta name="robots" content="noindex">/);
  });

  it("carries enough prose for an agent to recover", () => {
    const text = html
      .replace(/<script[\s\S]*?<\/script>/g, "")
      .replace(/<style[\s\S]*?<\/style>/g, "")
      .replace(/<[^>]+>/g, " ");
    assert.ok(text.trim().length > 200, `only ${text.trim().length} chars of text`);
  });
});
