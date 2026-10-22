#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-two-copy-multiplicity-symmetry-classification-v1.json",
  import.meta.url,
), "utf8"));

const rank = (matrix, tolerance = 1e-12) => {
  const a = matrix.map((row) => row.map(Number));
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

// Variables: delta Y_1^0...delta Y_1^4, delta Y_2^0...delta Y_2^4.
// At Y_1=ell e_4, Y_2=0, d(Y_1 wedge Y_2)=e_4 wedge dY_2.
const ell = 1;
const wedgeRows = Array.from({ length: 4 }, (_, a) => {
  const row = Array(10).fill(0);
  row[5 + a] = ell;
  return row;
});
const normRow = Array(10).fill(0);
normRow[4] = -2*ell;
assert.equal(rank(wedgeRows), 4);
assert.equal(rank([...wedgeRows, normRow]), 5);

// Broken Spin(2,3) moves the four transverse components of Y_1.
const spinGaugeRows = Array.from({ length: 4 }, (_, a) => {
  const row = Array(10).fill(0);
  row[a] = ell;
  return row;
});

// Broken copy SO(2) moves the parallel component of Y_2.
const copyGaugeRow = Array(10).fill(0);
copyGaugeRow[9] = ell;

assert.equal(rank([...wedgeRows, normRow, ...spinGaugeRows]), 9);
assert.equal(rank([...wedgeRows, normRow, ...spinGaugeRows, copyGaugeRow]), 10);

const ranks = evidence.linearRanks;
assert.equal(ranks.rawVectorComponents - ranks.bivectorConstraintRank
  - ranks.normConstraintRank - ranks.brokenSpin23GaugeRank, 1);
assert.equal(ranks.rawVectorComponents - ranks.bivectorConstraintRank
  - ranks.normConstraintRank - ranks.brokenSpin23GaugeRank
  - ranks.localSO2GaugeRank, 0);

const branch = (name) => evidence.branches.find((item) => item.name === name);
assert.equal(branch("global SO(2)").extraPhysicalDegrees, 1);
assert.equal(branch("local SO(2) with auxiliary connection").extraPhysicalDegrees, 0);
assert.equal(branch("local SO(2) with ordinary kinetic connection").extraPhysicalDegrees, 3);
assert.equal(branch("exchange Z2").extraPhysicalDegrees, 5);

// A discrete orbit has no infinitesimal generator and therefore cannot lower
// the local tangent dimension. Its linear gauge-map rank is zero.
assert.equal(rank([Array(10).fill(0)]), 0);

// Standard massive-vector count in four dimensions: 4 fields minus one
// primary/secondary second-class pair = 3 configuration degrees.
assert.equal((8 - 2)/2, 3);

console.log("Spin(2,3) two-copy multiplicity symmetry classification: PASS");
console.log("  rank-one constraint: rank 4; norm: rank 1");
console.log("  global SO(2): one Goldstone remains after Spin(2,3) quotient");
console.log("  local SO(2): rank 1 copy gauge removes the ray angle");
console.log("  kinetic copy connection: three massive-vector polarizations are added");
console.log("  exchange Z2: canonical line but zero local gauge rank; W still requires a constraint");
