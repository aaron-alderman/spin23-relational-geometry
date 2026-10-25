import assert from "node:assert/strict";
import fs from "node:fs";

const evidencePath = new URL(
  "../../evidence/data/monster-edge-operator-tomography-dictionary-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
assert.equal(evidence.schemaVersion, "monster-edge-operator-tomography-dictionary-v1");

const add = (A, B) => A.map((row, i) => row.map((value, j) => value + B[i][j]));
const scale = (A, scalar) => A.map((row) => row.map((value) => scalar * value));
const multiply = (A, B) => A.map((row) => B[0].map((_, j) =>
  row.reduce((sum, value, k) => sum + value * B[k][j], 0)));
const jordan = (A, B) => scale(add(multiply(A, B), multiply(B, A)), 0.5);
const trace = (A) => A.reduce((sum, row, i) => sum + row[i], 0);
const inner = (A, B) => trace(multiply(A, B));
const matrixClose = (A, B, tolerance = 1e-12) =>
  A.every((row, i) => row.every((value, j) => Math.abs(value - B[i][j]) < tolerance));

const basis = [
  [[1, 0], [0, 0]],
  [[0, 0], [0, 1]],
  [[0, 1], [1, 0]],
];
const gram = basis.map((A) => basis.map((B) => inner(A, B)));
assert.deepEqual(gram, [[1, 0, 0], [0, 1, 0], [0, 0, 2]]);
const gramInverse = [[1, 0, 0], [0, 1, 0], [0, 0, 0.5]];

const cubic = Array.from({ length: 3 }, (_, i) =>
  Array.from({ length: 3 }, (_, j) =>
    Array.from({ length: 3 }, (_, k) => inner(jordan(basis[i], basis[j]), basis[k]))));
for (let i = 0; i < 3; i += 1) {
  for (let j = 0; j < 3; j += 1) {
    for (let k = 0; k < 3; k += 1) {
      assert.equal(cubic[i][j][k], cubic[j][i][k]);
      assert.equal(cubic[i][j][k], cubic[i][k][j]);
    }
  }
}

for (let i = 0; i < 3; i += 1) {
  for (let j = 0; j < 3; j += 1) {
    const coefficients = Array.from({ length: 3 }, (_, output) =>
      cubic[i][j].reduce((sum, value, k) => sum + value * gramInverse[k][output], 0));
    const reconstructed = basis.reduce((sum, B, index) => add(sum, scale(B, coefficients[index])), [[0, 0], [0, 0]]);
    assert.ok(matrixClose(reconstructed, jordan(basis[i], basis[j])));
  }
}

const samples = [
  [[[1, 2], [2, 5]], [[3, -1], [-1, 2]]],
  [[[2, 0.5], [0.5, -1]], [[0, 4], [4, 1]]],
  [[[-2, 3], [3, 7]], [[5, 2], [2, -4]]],
];
for (const [x, y] of samples) {
  const xSquared = jordan(x, x);
  assert.ok(matrixClose(
    jordan(jordan(xSquared, y), x),
    jordan(xSquared, jordan(y, x)),
  ));
}

const tomography = evidence.h2JordanTomography;
assert.equal(tomography.independentTwoPointCoefficients, 3 * 4 / 2);
assert.equal(tomography.independentSymmetricThreePointCoefficients, 3 * 4 * 5 / 6);
assert.equal(
  tomography.totalIndependentCorrelators,
  tomography.independentTwoPointCoefficients + tomography.independentSymmetricThreePointCoefficients,
);
assert.ok(evidence.exceptionalAtlasProtocol.e8NonMeaning.includes("no weight-one E8 currents"));
assert.ok(evidence.scope.open.includes("Spin(2,3)"));

console.log(JSON.stringify({
  status: "PASS",
  gram,
  cubic,
  independentCorrelators: tomography.totalIndependentCorrelators,
  jordanIdentitySamples: samples.length,
  physicalDictionaryEntries: evidence.physicalDictionary.length,
  promotionGates: evidence.promotionGates,
  scope: evidence.scope,
}));
