import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { readDistFile } from "./dist.ts";

const pages = ["index.html", "404.html"];

describe("icon sprite", () => {
  for (const page of pages) {
    describe(page, () => {
      const html = readDistFile(page);
      const symbolIds = [...html.matchAll(/<symbol id="([^"]+)"/g)].map((match) => match[1]);
      const usedIds = [...html.matchAll(/<use href="#([^"]+)"/g)].map((match) => match[1]);

      it("defines each icon exactly once", () => {
        assert.deepEqual([...new Set(symbolIds)], symbolIds);
        assert.ok(symbolIds.length > 0);
      });

      it("resolves every <use> to a symbol on the page", () => {
        assert.ok(usedIds.length > 0);
        for (const id of usedIds) {
          assert.ok(symbolIds.includes(id), `no <symbol id="${id}">`);
        }
      });

      it("gives every symbol a viewBox", () => {
        const symbols = [...html.matchAll(/<symbol [^>]*>/g)].map((match) => match[0]);
        for (const symbol of symbols) {
          assert.match(symbol, /viewBox="[\d\s.-]+"/, symbol);
        }
      });

      it("hides the sprite without relying on the stylesheet", () => {
        assert.match(html, /<svg xmlns="[^"]+" style="display: none" aria-hidden="true">/);
      });

      it("sizes every icon reference, since <use> has no intrinsic size", () => {
        const references = [...html.matchAll(/<svg class="([^"]*)"[^>]*><use /g)].map(
          (match) => match[1],
        );
        assert.equal(references.length, usedIds.length);
        for (const className of references) {
          assert.match(className ?? "", /\bw-\d/, className);
          assert.match(className ?? "", /\bh-\d/, className);
        }
      });
    });
  }
});

describe("icon accessibility", () => {
  const html = readDistFile("index.html");

  it("marks decorative icons aria-hidden", () => {
    // Every icon sits inside a link that already carries its own aria-label.
    assert.match(html, /<svg class="w-4 h-4" aria-hidden="true"><use /);
  });

  it("keeps the labelled heart announced rather than hidden", () => {
    const heart = /<svg class="w-4 h-4"[^>]*><use href="#icon-heart">/.exec(html)?.[0] ?? "";
    assert.match(heart, /role="img"/);
    assert.match(heart, /aria-label="Love"/);
    assert.doesNotMatch(heart, /aria-hidden/);
  });
});

describe("markup weight", () => {
  it("keeps readable text above 5% of the homepage HTML", () => {
    const html = readDistFile("index.html");
    const text = html
      .replace(/<script[\s\S]*?<\/script>/g, "")
      .replace(/<style[\s\S]*?<\/style>/g, "")
      .replace(/<svg[\s\S]*?<\/svg>/g, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const ratio = text.length / html.length;
    assert.ok(ratio > 0.05, `content efficiency is ${(ratio * 100).toFixed(2)}%`);
  });
});
