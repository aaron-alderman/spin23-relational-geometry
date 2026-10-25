import assert from "node:assert/strict";
import fs from "node:fs";

const evidencePath = new URL(
  "../../evidence/data/leech-monster-condensation-interface-toy-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
assert.equal(evidence.schemaVersion, "leech-monster-condensation-interface-toy-v1");

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const close = (a, b, tolerance = 1e-12) =>
  Math.abs(a.re - b.re) < tolerance && Math.abs(a.im - b.im) < tolerance;
const matrix = (rows) => rows.map((row) => row.map((value) =>
  typeof value === "number" ? C(value) : value));
const identity = (n) => Array.from({ length: n }, (_, i) =>
  Array.from({ length: n }, (_, j) => C(i === j ? 1 : 0)));
const matrixAdd = (a, b) => a.map((row, i) => row.map((value, j) => add(value, b[i][j])));
const matrixScale = (a, scalar) => a.map((row) => row.map((value) => mul(value, scalar)));
const matrixMul = (a, b) => a.map((row) => b[0].map((_, j) =>
  row.reduce((sum, value, k) => add(sum, mul(value, b[k][j])), C(0))));
const dagger = (a) => a[0].map((_, i) => a.map((row) => conj(row[i])));
const matrixClose = (a, b, tolerance = 1e-12) =>
  a.every((row, i) => row.every((value, j) => close(value, b[i][j], tolerance)));
const kron = (a, b) => a.flatMap((aRow) =>
  b.map((bRow) => aRow.flatMap((aValue) => bRow.map((bValue) => mul(aValue, bValue)))));

const I = matrix([[1, 0], [0, 1]]);
const X = matrix([[0, 1], [1, 0]]);
const Y = matrix([[0, C(0, -1)], [C(0, 1), 0]]);
const Z = matrix([[1, 0], [0, -1]]);
const gammas = [
  kron(X, I),
  kron(Y, I),
  kron(Z, X),
  kron(Z, Y),
];
for (let i = 0; i < gammas.length; i += 1) {
  assert.ok(matrixClose(matrixMul(gammas[i], gammas[i]), identity(4)));
  for (let j = i + 1; j < gammas.length; j += 1) {
    const anticommutator = matrixAdd(
      matrixMul(gammas[i], gammas[j]),
      matrixMul(gammas[j], gammas[i]),
    );
    assert.ok(matrixClose(anticommutator, matrixScale(identity(4), C(0))));
  }
}

const braids = [0, 1, 2].map((i) =>
  matrixScale(
    matrixAdd(identity(4), matrixMul(gammas[i], gammas[i + 1])),
    C(1 / Math.sqrt(2)),
  ));
for (const braid of braids) assert.ok(matrixClose(matrixMul(dagger(braid), braid), identity(4)));
assert.ok(matrixClose(
  matrixMul(matrixMul(braids[0], braids[1]), braids[0]),
  matrixMul(matrixMul(braids[1], braids[0]), braids[1]),
));
assert.equal(matrixClose(matrixMul(braids[0], braids[1]), matrixMul(braids[1], braids[0])), false);

// All braid generators preserve total fermion parity Z tensor Z.
const parity = kron(Z, Z);
for (const braid of braids) {
  assert.ok(matrixClose(matrixMul(braid, parity), matrixMul(parity, braid)));
}
const evenBasisIndices = [0, 3];
const restrict = (operator) => evenBasisIndices.map((i) =>
  evenBasisIndices.map((j) => operator[i][j]));
const restrictedBraids = braids.map(restrict);
for (const braid of restrictedBraids) assert.ok(matrixClose(matrixMul(dagger(braid), braid), identity(2)));

for (const row of evidence.fusionSpaceScaling) {
  assert.equal(row.twists % 2, 0);
  assert.equal(row.fixedTotalParityDimension, 2 ** (row.twists / 2 - 1));
}
assert.ok(Math.abs(evidence.toyCarrier.junctionQuantumDimension - Math.sqrt(2)) < 1e-15);
assert.ok(evidence.promotionBoundary.notProvedByToy.includes("V-natural"));

console.log(JSON.stringify({
  status: "PASS",
  majoranas: gammas.length,
  braidGenerators: braids.length,
  fixedParityFusionDimension: evenBasisIndices.length,
  adjacentBraidsCommute: matrixClose(matrixMul(braids[0], braids[1]), matrixMul(braids[1], braids[0])),
  braidRelation: true,
  fusionSpaceScaling: evidence.fusionSpaceScaling,
  promotionBoundary: evidence.promotionBoundary,
}));
