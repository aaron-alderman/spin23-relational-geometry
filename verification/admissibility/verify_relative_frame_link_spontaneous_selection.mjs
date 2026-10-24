import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const certificate = JSON.parse(readFileSync(resolve(root, "evidence/data/admissibility-relative-frame-link-v1.json"), "utf8"));

const permutations = (items) => items.length === 1
  ? [items]
  : items.flatMap((item, index) => permutations(items.filter((_, i) => i !== index)).map((tail) => [item, ...tail]));
const perms = permutations([0, 1, 2]);
const matrix = (p) => Array.from({ length: 3 }, (_, i) => Array.from({ length: 3 }, (_, j) => Number(p[i] === j)));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const multiply = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((sum, value, k) => sum + value * B[k][j], 0)));
const equal = (A, B) => A.every((row, i) => row.every((value, j) => value === B[i][j]));
const det3 = (A) =>
  A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1])
  - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0])
  + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);
const potential = (X, kappa = 1) => {
  const wells = X.flat().reduce((sum, x) => sum + x * x * (1 - x) * (1 - x), 0);
  const rows = X.reduce((sum, row) => sum + (row.reduce((a, b) => a + b, 0) - 1) ** 2, 0);
  const cols = transpose(X).reduce((sum, col) => sum + (col.reduce((a, b) => a + b, 0) - 1) ** 2, 0);
  return wells + kappa * (rows + cols);
};

const vacua = perms.map(matrix);
assert.equal(vacua.length, 6);
assert.equal(new Set(vacua.map(JSON.stringify)).size, 6);
for (const X of vacua) assert.equal(potential(X), 0);

const binaryMatrices = Array.from({ length: 2 ** 9 }, (_, mask) =>
  Array.from({ length: 3 }, (_, i) => Array.from({ length: 3 }, (_, j) => (mask >> (3 * i + j)) & 1))
);
const binaryZeros = binaryMatrices.filter((X) => potential(X) === 0);
assert.equal(binaryZeros.length, 6);
for (const X of binaryZeros) assert.ok(vacua.some((P) => equal(X, P)));

const X0 = vacua[0];
const group = vacua;
const orbit = [];
let stabilizerOrder = 0;
for (const left of group) {
  for (const right of group) {
    const image = multiply(multiply(left, X0), transpose(right));
    orbit.push(image);
    if (equal(image, X0)) stabilizerOrder += 1;
  }
}
assert.equal(new Set(orbit.map(JSON.stringify)).size, 6);
assert.equal(stabilizerOrder, 6);
assert.equal(group.length ** 2 / stabilizerOrder, 6);

const even = vacua.filter((X) => det3(X) === 1);
const odd = vacua.filter((X) => det3(X) === -1);
const based = vacua.filter((X) => X[0][0] === 1);
const framed = vacua.filter((X) => det3(X) === 1 && X[0][0] === 1);
assert.deepEqual([even.length, odd.length, based.length, framed.length], [3, 3, 2, 1]);

assert.equal(certificate.protocol, "admissibility-relative-frame-link/1");
assert.equal(certificate.symmetry.vacuumOrbitSize, vacua.length);
assert.equal(certificate.symmetry.vacuumStabilizerOrder, stabilizerOrder);
assert.deepEqual(
  [certificate.vacua.evenOrientation, certificate.vacua.oddOrientation, certificate.vacua.fixedBasepoint, certificate.vacua.evenOrientationAndFixedBasepoint],
  [even.length, odd.length, based.length, framed.length]
);
assert.equal(certificate.interpretation.physicalAdmission, false);

console.log(JSON.stringify({
  status: "PASS",
  parentSymmetryOrder: 36,
  isolatedVacua: vacua.length,
  stabilizerOrder,
  breakingPattern: certificate.symmetry.breakingPattern,
  spontaneousRelativeFrames: true,
  physicalLinkSource: "OPEN"
}));
