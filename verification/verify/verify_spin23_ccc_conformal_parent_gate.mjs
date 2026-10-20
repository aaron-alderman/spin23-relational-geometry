#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-ccc-conformal-parent-gate.json",
  import.meta.url,
), "utf8"));

const soDimension = (p, q) => ((p + q) * (p + q - 1)) / 2;
for (const group of Object.values(evidence.groups)) {
  const [p, q] = group.orthogonalSignature;
  assert.equal(soDimension(p, q), group.lieAlgebraDimension);
}
assert.equal(evidence.groups.spin23.lieAlgebraDimension - evidence.groups.spin13.lieAlgebraDimension, 4);
assert.equal(evidence.groups.spin24.lieAlgebraDimension, 15);
assert.equal(evidence.ccc.crossoverDimension, 3);
assert.equal(evidence.ccc.spin23AloneSufficient, false);
assert.equal(evidence.ccc.requiredOpenData.length, 5);

// Standard block inclusion so(2,3) -> so(2,4) adds one orthogonal coordinate;
// the dimension gap records the five additional generators.
assert.equal(evidence.groups.spin24.lieAlgebraDimension - evidence.groups.spin23.lieAlgebraDimension, 5);

console.log("spin23 CCC conformal-parent gate verification: PASS");
console.log("  dim so(2,3)=10, dim so(1,3)=6, AdS coset dimension=4");
console.log("  dim so(2,4)=15: the 3+1 conformal parent is strictly larger");
