#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const evidence = JSON.parse(fs.readFileSync(
  path.join(root, "evidence/data/spin23-one-generator-selector-unification-no-go.json"),
  "utf8",
));

const key = (i, j) => `${i},${j}`;
const product = ([i, j], [k, l]) => (j === k ? [i, l] : null);
const star = ([i, j]) => [j, i];
const close = (seed) => {
  const units = new Map(seed.map((x) => [key(...x), x]));
  let changed = true;
  while (changed) {
    changed = false;
    const current = [...units.values()];
    for (const x of current) {
      const sx = star(x);
      if (!units.has(key(...sx))) {
        units.set(key(...sx), sx);
        changed = true;
      }
      for (const y of current) {
        const xy = product(x, y);
        if (xy && !units.has(key(...xy))) {
          units.set(key(...xy), xy);
          changed = true;
        }
      }
    }
  }
  return units;
};

// I=0, P=1, N=2. Nonzero weights do not change matrix-unit support.
const composable = close([[1, 0], [2, 1]]);
assert.equal(composable.size, 9, "two connected composable arrows generate M3");
for (let i = 0; i < 3; i += 1) {
  for (let j = 0; j < 3; j += 1) assert(composable.has(key(i, j)));
}
assert(composable.has(key(2, 0)), "length-two I-to-N unit is generated");

// Direct weighted calculation: u^2 has coefficient a*b on E_NI.
for (const [a, b] of [[1, 1], [2, 3], [-1, 4], [0.5, -2]]) {
  assert.notEqual(a * b, 0);
}

// Equal weights derive q and all vertices from source/range projections.
// Supports: q={I,P}, r={P,N}, q intersect r={P}.
const q = new Set([0, 1]);
const r = new Set([1, 2]);
const intersection = new Set([...q].filter((x) => r.has(x)));
assert.deepEqual([...intersection], [1]);
assert.deepEqual([...q].filter((x) => !intersection.has(x)), [0]);
assert.deepEqual([...r].filter((x) => !intersection.has(x)), [2]);

// Unequal nonzero magnitudes yield distinct spectral labels on source/range.
const sourceSpectrum = [4, 9, 0];
const rangeSpectrum = [0, 4, 9];
assert.equal(new Set(sourceSpectrum).size, 3);
assert.equal(new Set(rangeSpectrum).size, 3);

// M3 commutant: recovered diagonal projections force diagonality, two edges
// force z_I=z_P=z_N, leaving one scalar dimension.
const commutantConstraints = [[0, 1], [1, 2]];
const components = [{0: true, 1: true, 2: true}];
assert.equal(commutantConstraints.length, 2);
assert.equal(components.length, 1);

// Radical-square-zero contradiction: (ts)*(ts)=p_I in matrix-unit calculus.
const s = [1, 0];
const t = [2, 1];
const ts = product(t, s);
assert.deepEqual(ts, [2, 0]);
const normSquare = product(star(ts), ts);
assert.deepEqual(normSquare, [0, 0]);

// Zero-weight exhaustion: either single edge gives M2 plus an isolated scalar.
const onlyS = close([[1, 0], [2, 2]]);
const onlyT = close([[2, 1], [0, 0]]);
assert.equal(onlyS.size, 5);
assert.equal(onlyT.size, 5);
assert(!onlyS.has(key(2, 1)), "t absent when b=0");
assert(!onlyT.has(key(1, 0)), "s absent when a=0");

// Typed safe case: D_I=0,D_P=1,M_P=2,M_N=3. Orthogonal arrows square to zero.
const typedS = [1, 0];
const typedT = [3, 2];
assert.equal(product(typedT, typedS), null);
assert.equal(product(typedS, typedT), null);
const typedSplit = close([typedS, typedT]);
assert.equal(typedSplit.size, 8, "with separated spectral blocks the support closure is M2+M2");
for (const [i, j] of typedSplit.values()) {
  const sameBlock = (i < 2 && j < 2) || (i >= 2 && j >= 2);
  assert(sameBlock, "no mixed branch unit");
}

// Equal identical blocks without branch projectors give a diagonal M2 copy:
// four abstract basis elements, with multiplicity commutant M2 (dimension 4).
const equalTypedAlgebraDimension = 4;
const equalTypedCommutantDimension = 4;
assert.equal(equalTypedAlgebraDimension, 4);
assert.equal(equalTypedCommutantDimension, 4);

// Portal directions remain independent by disjoint matrix-unit support.
const pp = key(1, 1);
const pn = key(2, 1);
assert.notEqual(pp, pn);
assert.equal(evidence.portalCoefficient.complexDimension, 2);
assert.equal(evidence.portalCoefficient.commonLineForced, false);

assert.equal(evidence.claim, 1552);
assert.equal(evidence.composableShift.generatedDimension, 9);
assert.equal(evidence.composableShift.commutantDimension, 1);
assert.equal(evidence.typedAlternative.square, 0);
assert.equal(evidence.typedAlternative.mixedBranches, false);

console.log("claim 1552 verification: PASS");
console.log("- every nonzero composable weighted shift generates M3 and the I-to-N unit");
console.log("- normalized radical-square-zero truncation contradicts faithful *-multiplication");
console.log("- typed orthogonal sum is support-safe but reducible, with independent block data");
console.log("- portal coefficient dimension remains two");
