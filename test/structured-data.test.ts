import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { readDistFile, siteOrigin } from "./dist.ts";

function parseJsonLd(html: string): unknown[] {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (match) => JSON.parse(match[1] ?? "") as unknown,
  );
}

describe("homepage JSON-LD", () => {
  const blocks = parseJsonLd(readDistFile("index.html"));

  it("publishes exactly one block, and it parses", () => {
    assert.equal(blocks.length, 1);
  });

  it("identifies the site owner as a Person", () => {
    const person = blocks[0] as Record<string, unknown>;
    assert.equal(person["@context"], "https://schema.org");
    assert.equal(person["@type"], "Person");
    assert.equal(person["name"], "Justin McBride");
    assert.equal(person["url"], `${siteOrigin}/`);
    assert.equal(typeof person["description"], "string");
  });

  it("links every profile the header links to", () => {
    const person = blocks[0] as Record<string, unknown>;
    const sameAs = person["sameAs"] as string[];
    const html = readDistFile("index.html");
    assert.ok(sameAs.length > 0);
    for (const profileUrl of sameAs) {
      assert.match(html, new RegExp(`href="${profileUrl}"`), profileUrl);
    }
  });
});

describe("404 JSON-LD", () => {
  it("makes no identity claims", () => {
    assert.equal(parseJsonLd(readDistFile("404.html")).length, 0);
  });
});
