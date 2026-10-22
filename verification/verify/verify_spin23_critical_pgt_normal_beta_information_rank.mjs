#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-critical-pgt-normal-beta-information-rank-v1.json",
  import.meta.url,
), "utf8"));

const fraction = (value) => {
  if (typeof value === "number") return value;
  const [n, d] = value.split("/").map(Number);
  return n/d;
};
const vectors = evidence.unconditionalKnownVectors.map((entry) =>
  entry.components.map(fraction));

const rank = (input, tolerance = 1e-14) => {
  const a = input.map((row) => row.slice());
  let r = 0;
  for (let c = 0; c < (a[0]?.length ?? 0) && r < a.length; c += 1) {
    let p = r;
    for (let i = r + 1; i < a.length; i += 1) {
      if (Math.abs(a[i][c]) > Math.abs(a[p][c])) p = i;
    }
    if (Math.abs(a[p][c]) <= tolerance) continue;
    [a[r], a[p]] = [a[p], a[r]];
    const scale = a[r][c];
    for (let j = c; j < a[r].length; j += 1) a[r][j] /= scale;
    for (let i = 0; i < a.length; i += 1) {
      if (i === r) continue;
      const f = a[i][c];
      for (let j = c; j < a[i].length; j += 1) a[i][j] -= f*a[r][j];
    }
    r += 1;
  }
  return r;
};

assert.equal(evidence.normalBasis.length, evidence.displayedNormalDimension);
assert.equal(rank(vectors), evidence.knownInformationRank);
assert.equal(
  evidence.displayedNormalDimension - evidence.knownInformationRank,
  evidence.unresolvedDisplayedDimension,
);
assert.equal(vectors[0][2], 1/120);
assert.equal(vectors[1][3], 1/72);

// The known data cannot distinguish arbitrary changes in the six unresolved
// coordinates: each corresponding standard basis vector lies in the kernel
// of the known two-row observation map.
const knownCoordinates = new Set([2, 3]);
const unresolved = Array.from(
  { length: evidence.displayedNormalDimension },
  (_, i) => i,
).filter((i) => !knownCoordinates.has(i));
assert.equal(unresolved.length, 6);
for (const i of unresolved) {
  const column = vectors.map((row) => row[i]);
  assert.ok(column.every((value) => value === 0));
}

assert.equal(evidence.fixedSurfaceBranches.length, 4);
assert.equal(evidence.requiredCalculation.length, 9);
assert.match(evidence.operatorClosureWarning.publishedSimplerPgtResult, /DTDT/);

console.log("Spin(2,3) critical-PGT normal-beta information rank: PASS");
console.log("  displayed normal dimension: 8");
console.log("  unconditional known-data rank: 2 (C^2 and minimal-scalar R^2)");
console.log("  unresolved displayed dimension: 6");
console.log("  operator warning: the exact closure shell may be larger than eight");
console.log("  irreducible missing object: full gauge-fixed critical-PGT one-loop divergent functional");
