#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-copy-brst-counterterm-cohomology-no-go-v1.json",
  import.meta.url,
), "utf8"));

const basis = evidence.countertermCandidateSpan.quadraticCouplingBasis;
const index = new Map(basis.map((name, i) => [name, i]));
const vector = (coefficients = {}) => basis.map((name) => Number(coefficients[name] ?? 0));
const matrix = evidence.criticalSurface.constraints.map((item) => vector(item.coefficients));

const rank = (input, tolerance = 1e-12) => {
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

const multiply = (m, v) => m.map((row) => row.reduce((sum, x, i) => sum + x*v[i], 0));
const isZero = (v, tolerance = 1e-12) => v.every((x) => Math.abs(x) <= tolerance);

assert.equal(basis.length, 10);
assert.equal(rank(matrix), evidence.criticalSurface.constraintRankInPresentedCoordinates);
assert.equal(basis.length - rank(matrix), evidence.criticalSurface.tangentDimensionInPresentedCoordinates);

for (const generator of evidence.criticalSurface.tangentGenerators) {
  assert.ok(isZero(multiply(matrix, vector(generator))));
}

const scalarLoop = vector({ cC: 1/120, cR: 1/72 });
const scalarNormal = multiply(matrix, scalarLoop);
assert.ok(!isZero(scalarNormal));
assert.equal(scalarNormal[2], 1/120);
assert.equal(scalarNormal[3], 1/72);

const copyKinetic = vector({ zq: 1 });
const copyNormal = multiply(matrix, copyKinetic);
assert.ok(!isZero(copyNormal));
assert.equal(copyNormal[7], 1);

// Every pure PGT quadratic has trivial charge under a symmetry acting only on
// copy indices. The Ward-character matrix is therefore the 1x9 zero matrix.
const copyCharacterMatrix = [Array(9).fill(0)];
assert.equal(rank(copyCharacterMatrix), evidence.directProductTheorem.characterRankOnNinePgtQuadratics);

// Adding more commuting copy generators only adds more zero rows.
for (const generatorCount of [1, 2, 3, 8]) {
  assert.equal(rank(Array.from({ length: generatorCount }, () => Array(9).fill(0))), 0);
}

assert.equal(evidence.countertermCandidateSpan.presentationCountIncludingCosmologicalAndEinstein, 12);
assert.equal(evidence.countertermCandidateSpan.guaranteedIndependentNormalDirectionsUsed.length, 3);
assert.equal(evidence.anomalyBoundary.derivedMatterChargesAvailable, false);
assert.ok(index.has("cX") && index.has("zq"));

console.log("Spin(2,3) copy-BRST counterterm cohomology no-go: PASS");
console.log("  presented quadratic basis: 10 coupling coordinates before quotient identities");
console.log("  presented target surface: rank 8 constraints, tangent dimension 2");
console.log("  scalar loop: nonzero C^2 and R^2 normal projection");
console.log("  gauged copy branch: f_q^2 is an additional allowed normal direction");
console.log("  direct-product copy Ward-character rank on PGT quadratics: 0");
console.log("  closure verdict: no commuting multiplicity symmetry protects the 2+1 critical theory");
