import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const ledger = JSON.parse(
  readFileSync(resolve(root, "evidence/data/admissibility-cyclic-tile-composition-v1.json"), "utf8"),
);

const { I, C, K } = ledger.basis;
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const multiply = (A, B) => {
  const BT = transpose(B);
  return A.map((row) => BT.map((column) => row.reduce((sum, x, k) => sum + x * column[k], 0)));
};
const add = (...matrices) => matrices[0].map((row, i) =>
  row.map((_, j) => matrices.reduce((sum, matrix) => sum + matrix[i][j], 0)));
const scale = (s, A) => A.map((row) => row.map((x) => {
  const value = s * x;
  return Object.is(value, -0) ? 0 : value;
}));
const close = (A, B, tolerance = 1e-10) =>
  A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < tolerance));
const tile = (a, b, c) => add(scale(a, I), scale(b, C), scale(c, K));

assert.ok(close(multiply(C, C), scale(3, C)));
assert.ok(close(multiply(K, K), scale(-1, C)));
assert.ok(close(multiply(C, K), scale(3, K)));
assert.ok(close(multiply(K, C), scale(3, K)));

const productCoefficients = ([a, b, c], [d, e, f]) => [
  a * d,
  a * e + b * d + 3 * b * e - c * f,
  a * f + c * d + 3 * b * f + 3 * c * e,
];

const tests = [
  [[2, 3, 5], [7, 11, 13]],
  [[1, -2, 0.5], [-3, 4, -1]],
  [[0, 1, 1], [2, 0, -3]],
  [[5, 0, 0], [0, 2, 0]],
];

for (const [left, right] of tests) {
  const expected = productCoefficients(left, right);
  assert.ok(close(multiply(tile(...left), tile(...right)), tile(...expected)));

  const [a, b, c] = left;
  const [d, e, f] = right;
  const r1 = a;
  const z1 = { re: a + 3 * b, im: Math.sqrt(3) * c };
  const r2 = d;
  const z2 = { re: d + 3 * e, im: Math.sqrt(3) * f };
  const [pa, pb, pc] = expected;
  const zp = { re: pa + 3 * pb, im: Math.sqrt(3) * pc };
  assert.ok(Math.abs(pa - r1 * r2) < 1e-10);
  assert.ok(Math.abs(zp.re - (z1.re * z2.re - z1.im * z2.im)) < 1e-10);
  assert.ok(Math.abs(zp.im - (z1.re * z2.im + z1.im * z2.re)) < 1e-10);
}

for (const [a, b, c] of [[2, 1, 3], [1, -0.2, -4], [0, 2, 1]]) {
  assert.ok(close(transpose(tile(a, b, c)), tile(a, b, -c)));
}

const determinant3 = (A) =>
  A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1])
  - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0])
  + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);

for (const [a, b, c] of [[2, 1, 3], [1, -0.2, -4], [0, 2, 1], [7, -1.5, 0.5]]) {
  const expected = a * ((a + 3 * b) ** 2 + 3 * c ** 2);
  assert.ok(Math.abs(determinant3(tile(a, b, c)) - expected) < 1e-9);
}

const vectors = [[1, 2, 3], [-2, 5, 1], [Math.PI, -1, 0.25]];
for (const x of vectors) {
  const Kx = K.map((row) => row.reduce((sum, entry, i) => sum + entry * x[i], 0));
  const quadratic = x.reduce((sum, entry, i) => sum + entry * Kx[i], 0);
  assert.ok(Math.abs(quadratic) < 1e-10);
}

assert.equal(ledger.boundary.aligned_composition_derived, true);
assert.equal(ledger.boundary.cross_carrier_alignment_derived, false);
assert.equal(ledger.boundary.hysteresis_derived, false);
assert.equal(ledger.boundary.e8_closure_derived, false);

console.log(JSON.stringify({
  status: "PASS",
  algebra: "R[C3] ~= R direct-sum C",
  relations: ["C^2=3C", "K^2=-C", "CK=KC=3K"],
  productTests: tests.length,
  determinantTests: 4,
  transposeIsRelationalConjugation: true,
  alignedComposition: "CLOSED",
  crossCarrierGluing: "OPEN"
}));

