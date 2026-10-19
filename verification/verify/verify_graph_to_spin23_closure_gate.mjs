import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const atlas = JSON.parse(readFileSync(new URL("../../evidence/data/graph-to-spin23-source-atlas.json", import.meta.url), "utf8"));
const transpose = matrix => matrix[0].map((_, column) => matrix.map(row => row[column]));
const multiply = (left, right) => left.map(row => right[0].map((_, column) => row.reduce((sum, value, index) => sum + value * right[index][column], 0)));
const add = (left, right) => left.map((row, i) => row.map((value, j) => value + right[i][j]));
const scale = (factor, matrix) => matrix.map(row => row.map(value => factor * value));
const maxAbs = matrix => Math.max(...matrix.flat().map(Math.abs));
const blocks = (a, b, c, d) => [[...a[0], ...b[0]], [...a[1], ...b[1]], [...c[0], ...d[0]], [...c[1], ...d[1]]];
const zero2 = [[0, 0], [0, 0]];
const identity2 = [[1, 0], [0, 1]];
const J = blocks(zero2, identity2, scale(-1, identity2), zero2);

assert.equal(atlas.sources.length, 32);
assert.equal(new Set(atlas.sources.map(source => source.id)).size, 32);
assert.equal(atlas.sources.some(source => source.directSpin23Derivation), false);
for (const [lane, count] of Object.entries(atlas.lanes)) {
  assert.equal(atlas.sources.filter(source => source.lane === lane).length, count);
}

// Oriented triangle: the graph Dirac square separates vertex and edge Laplacians.
const incidence = [[-1, 0, 1], [1, -1, 0], [0, 1, -1]];
const graphDirac = [
  [0, 0, 0, ...incidence[0]], [0, 0, 0, ...incidence[1]], [0, 0, 0, ...incidence[2]],
  [...transpose(incidence)[0], 0, 0, 0], [...transpose(incidence)[1], 0, 0, 0], [...transpose(incidence)[2], 0, 0, 0],
];
const graphDiracSquare = multiply(graphDirac, graphDirac);
const offDiagonalResidual = Math.max(
  ...graphDiracSquare.slice(0, 3).flatMap(row => row.slice(3).map(Math.abs)),
  ...graphDiracSquare.slice(3).flatMap(row => row.slice(0, 3).map(Math.abs)),
);
assert.equal(offDiagonalResidual, 0);

const E = (i, j) => [[0, 0], [0, 0]].map((row, r) => row.map((_, c) => Number(r === i && c === j)));
const symmetric = [E(0, 0), E(1, 1), [[0, 1], [1, 0]]];
const generators = [];
for (let i = 0; i < 2; i += 1) for (let j = 0; j < 2; j += 1) {
  const A = E(i, j);
  generators.push(blocks(A, zero2, zero2, scale(-1, transpose(A))));
}
for (const B of symmetric) generators.push(blocks(zero2, B, zero2, zero2));
for (const C of symmetric) generators.push(blocks(zero2, zero2, C, zero2));

const symplecticResidual = generator => maxAbs(add(multiply(transpose(generator), J), multiply(J, generator)));
assert.equal(generators.length, 10);
assert.equal(Math.max(...generators.map(symplecticResidual)), 0);

const rank = rows => {
  const matrix = rows.map(row => [...row]);
  let pivotRow = 0;
  for (let column = 0; column < matrix[0].length && pivotRow < matrix.length; column += 1) {
    const pivot = matrix.findIndex((row, index) => index >= pivotRow && Math.abs(row[column]) > 1e-12);
    if (pivot < 0) continue;
    [matrix[pivotRow], matrix[pivot]] = [matrix[pivot], matrix[pivotRow]];
    const value = matrix[pivotRow][column];
    matrix[pivotRow] = matrix[pivotRow].map(entry => entry / value);
    for (let row = 0; row < matrix.length; row += 1) if (row !== pivotRow) {
      const factor = matrix[row][column];
      matrix[row] = matrix[row].map((entry, index) => entry - factor * matrix[pivotRow][index]);
    }
    pivotRow += 1;
  }
  return pivotRow;
};
const generatorRank = rank(generators.map(generator => generator.flat()));
assert.equal(generatorRank, 10);

const response = [[2, 0.5], [0.5, 1]];
const determinant = response[0][0] * response[1][1] - response[0][1] ** 2;
const [t, x, z] = [1.5, 0.5, 0.5];
assert.equal(determinant, t * t - x * x - z * z);
assert.ok(determinant > 0);

console.log(JSON.stringify({
  protocol: "graph-to-spin23-closure-gate/1",
  passed: true,
  sourceCount: atlas.sources.length,
  directSpin23Derivations: 0,
  graphDiracSquareOffDiagonalResidual: offDiagonalResidual,
  selectedRealTwoModeConeDeterminant: determinant,
  sp4GeneratorCount: generators.length,
  sp4GeneratorRank: generatorRank,
  maximumSymplecticResidual: Math.max(...generators.map(symplecticResidual)),
  conclusion: "The ten-dimensional sp(4,R) carrier is exact after real two-mode selection; the source packet does not derive that selection or its physical action.",
}, null, 2));
