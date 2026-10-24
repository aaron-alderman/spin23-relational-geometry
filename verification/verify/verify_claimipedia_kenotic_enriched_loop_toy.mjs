import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const path = "corpus/programmes/frontier/wave-7/claimipedia_kenotic_enriched_loop_toy_v1.json";
const ledger = JSON.parse(readFileSync(new URL(path, root), "utf8"));

const rank = matrix => {
  const a = matrix.map(row => row.map(Number));
  let pivotRow = 0;
  for (let col = 0; col < a[0].length && pivotRow < a.length; col += 1) {
    const pivot = a.findIndex((row, index) => index >= pivotRow && row[col] !== 0);
    if (pivot < 0) continue;
    [a[pivotRow], a[pivot]] = [a[pivot], a[pivotRow]];
    const scale = a[pivotRow][col];
    a[pivotRow] = a[pivotRow].map(value => value / scale);
    for (let index = 0; index < a.length; index += 1) {
      if (index === pivotRow) continue;
      const factor = a[index][col];
      a[index] = a[index].map((value, j) => value - factor * a[pivotRow][j]);
    }
    pivotRow += 1;
  }
  return pivotRow;
};

const normalizedSolutions = ({ g12, g23, g31 }) => {
  const signs = [-1, 1];
  return signs.flatMap(s1 => signs.flatMap(s2 => signs.map(s3 => [s1, s2, s3])))
    .filter(([s1, s2, s3]) => s2 === g12 * s1 && s3 === g23 * s2 && s1 === g31 * s3);
};

const gaugeTransforms = transitions => {
  const signs = [-1, 1];
  return signs.flatMap(e1 => signs.flatMap(e2 => signs.map(e3 => ({
    g12: e2 * transitions.g12 * e1,
    g23: e3 * transitions.g23 * e2,
    g31: e1 * transitions.g31 * e3,
  }))));
};

assert.equal(ledger.cover.tripleOverlap, false);
assert.equal(ledger.cover.pairwiseOverlaps.length, 3);

for (const control of ledger.controls) {
  const { g12, g23, g31 } = control.transitions;
  const holonomy = g31 * g23 * g12;
  const differential = [
    [-g12, 1, 0],
    [0, -g23, 1],
    [1, 0, -g31],
  ];
  const matrixRank = rank(differential);
  const h0 = 3 - matrixRank;
  const h1 = 3 - matrixRank;
  assert.equal(holonomy, control.holonomy, `${control.id} holonomy`);
  assert.equal(matrixRank, control.transitionMatrixRankOverQ, `${control.id} rank`);
  assert.equal(h0, control.cohomologyDimensionsOverQ.H0, `${control.id} H0`);
  assert.equal(h1, control.cohomologyDimensionsOverQ.H1, `${control.id} H1`);
  assert.equal(normalizedSolutions(control.transitions).length, control.normalizedGlobalSections, `${control.id} normalized sections`);
  for (const transformed of gaugeTransforms(control.transitions)) {
    assert.equal(transformed.g31 * transformed.g23 * transformed.g12, holonomy, `${control.id} gauge invariant`);
  }
}

const untwisted = ledger.controls.find(control => control.id === "untwisted");
const twisted = ledger.controls.find(control => control.id === "twisted");
assert.equal(untwisted.holonomy, 1);
assert.equal(twisted.holonomy, -1);
assert.equal(twisted.normalizedGlobalSections, 0);
assert.match(ledger.status, /proposed conditional witness/);

console.log(JSON.stringify({
  status: "PASS",
  nerve: ledger.cover.nerve,
  beta1: ledger.cover.bettiNumbers.beta1,
  untwisted: { holonomy: untwisted.holonomy, ...untwisted.cohomologyDimensionsOverQ },
  twisted: { holonomy: twisted.holonomy, ...twisted.cohomologyDimensionsOverQ },
  invariant: ledger.gaugeInvariant,
  boundary: "reopening template only; no transition sign is extracted from Claimipedia",
}));
