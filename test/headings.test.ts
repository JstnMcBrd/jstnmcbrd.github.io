import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { readDistFile } from "./dist.ts";

/** Heading levels in document order, e.g. `[1, 2, 3, 3]`. */
function headingLevels(html: string): number[] {
  return [...html.matchAll(/<h([1-6])[\s>]/g)].map((match) => Number(match[1]));
}

describe("homepage heading structure", () => {
  const levels = headingLevels(readDistFile("index.html"));

  it("starts with exactly one H1", () => {
    assert.equal(levels.filter((level) => level === 1).length, 1);
    assert.equal(levels[0], 1);
  });

  it("is not flat — it nests below the H1", () => {
    assert.ok(Math.max(...levels) >= 3, `deepest heading was H${Math.max(...levels)}`);
  });

  it("never skips a level", () => {
    for (const [index, level] of levels.entries()) {
      const previous = levels[index - 1];
      if (previous !== undefined) {
        assert.ok(level <= previous + 1, `H${previous} is followed by H${level}`);
      }
    }
  });

  it("gives every project its own heading", () => {
    const html = readDistFile("index.html");
    const projectHeadings = [...html.matchAll(/<h3[^>]*>([^<]+)<\/h3>/g)].length;
    const projectCards = [...html.matchAll(/<article[\s>]/g)].length;
    assert.equal(projectHeadings, projectCards);
    assert.ok(projectCards > 0);
  });
});
