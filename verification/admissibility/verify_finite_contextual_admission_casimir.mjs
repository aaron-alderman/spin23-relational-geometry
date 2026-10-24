import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const ledger = JSON.parse(
  readFileSync(resolve(root, "evidence/data/admissibility-finite-contextual-casimir-v1.json"), "utf8"),
);

const uniform = [
  [0, 1, 1],
  [1, 0, 1],
  [1, 1, 0],
];
const oriented = [
  [0, 1, 0],
  [0, 0, 1],
  [1, 0, 0],
];
const weighted = [
  [0, 1, 3],
  [1, 0, 2],
  [3, 2, 0],
];
const mark = [1, 0, 0];
const identity = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];
const ones = [
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
];

function permutations(values) {
  if (values.length === 0) return [[]];
  return values.flatMap((value, index) =>
    permutations(values.filter((_, candidate) => candidate !== index)).map((tail) => [value, ...tail]),
  );
}

function key(permutation) {
  return permutation.join("");
}

function preservesMatrix(matrix, permutation) {
  return matrix.every((row, i) =>
    row.every((value, j) => value === matrix[permutation[i]][permutation[j]]),
  );
}

function preservesVector(vector, permutation) {
  return vector.every((value, i) => value === vector[permutation[i]]);
}

function permutationMatrix(permutation) {
  return permutation.map((image) => [0, 1, 2].map((column) => Number(column === image)));
}

function transpose(matrix) {
  return matrix[0].map((_, column) => matrix.map((row) => row[column]));
}

function add(...matrices) {
  return matrices[0].map((row, i) => row.map((_, j) => matrices.reduce((sum, matrix) => sum + matrix[i][j], 0)));
}

function subtract(left, right) {
  return left.map((row, i) => row.map((value, j) => value - right[i][j]));
}

function scale(value, matrix) {
  return matrix.map((row) =>
    row.map((entry) => {
      const product = value * entry;
      return Object.is(product, -0) ? 0 : product;
    }),
  );
}

function multiply(left, right) {
  const rightT = transpose(right);
  return left.map((row) => rightT.map((column) => row.reduce((sum, value, i) => sum + value * column[i], 0)));
}

function multiplyVector(matrix, vector) {
  return matrix.map((row) => row.reduce((sum, value, i) => sum + value * vector[i], 0));
}

function conjugate(matrix, permutation) {
  const P = permutationMatrix(permutation);
  return multiply(multiply(P, matrix), transpose(P));
}

function laplacian(adjacency) {
  return adjacency.map((row, i) =>
    row.map((value, j) => (i === j ? row.reduce((sum, entry) => sum + entry, 0) : -value)),
  );
}

function determinant2(matrix) {
  return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
}

function trace(matrix) {
  return matrix.reduce((sum, row, i) => sum + row[i], 0);
}

const allPermutations = permutations([0, 1, 2]);
const uniformAutomorphisms = allPermutations.filter((p) => preservesMatrix(uniform, p));
const orientedAutomorphisms = allPermutations.filter((p) => preservesMatrix(oriented, p));
const markedAutomorphisms = uniformAutomorphisms.filter((p) => preservesVector(mark, p));
const weightedAutomorphisms = allPermutations.filter((p) => preservesMatrix(weighted, p));

assert.deepEqual(uniformAutomorphisms.map(key).sort(), ledger.uniform.automorphisms.slice().sort());
assert.deepEqual(orientedAutomorphisms.map(key).sort(), ledger.oriented.automorphisms.slice().sort());
assert.deepEqual(markedAutomorphisms.map(key).sort(), ledger.marked.automorphisms.slice().sort());
assert.deepEqual(weightedAutomorphisms.map(key).sort(), ledger.weighted.automorphisms.slice().sort());

const transpositions = uniformAutomorphisms.filter((p) => {
  const fixed = p.filter((value, i) => value === i).length;
  return fixed === 1;
});
const classSum = add(...transpositions.map(permutationMatrix));
assert.deepEqual(classSum, ones);
assert.deepEqual(classSum, ledger.uniform.transposition_class_sum);

const casimir = subtract(scale(3, identity), classSum);
assert.deepEqual(casimir, ledger.uniform.casimir_like_operator);
assert.deepEqual(multiplyVector(casimir, [1, 1, 1]), [0, 0, 0]);
assert.deepEqual(multiplyVector(casimir, [1, -1, 0]), [3, -3, 0]);
assert.deepEqual(multiplyVector(casimir, [1, 0, -1]), [3, 0, -3]);
for (const permutation of uniformAutomorphisms) {
  assert.deepEqual(conjugate(casimir, permutation), casimir);
}

const orientationOdd = subtract(oriented, transpose(oriented));
assert.deepEqual(orientationOdd, ledger.oriented.orientation_odd_operator);
assert.deepEqual(multiply(orientationOdd, orientationOdd), ledger.oriented.orientation_odd_square);
assert.deepEqual(multiply(orientationOdd, orientationOdd), subtract(ones, scale(3, identity)));
assert.deepEqual(multiplyVector(orientationOdd, [1, 1, 1]), [0, 0, 0]);
for (const permutation of orientedAutomorphisms) {
  assert.deepEqual(conjugate(orientationOdd, permutation), orientationOdd);
}
for (const permutation of transpositions) {
  assert.deepEqual(conjugate(orientationOdd, permutation), scale(-1, orientationOdd));
}

const weightedLaplacian = laplacian(weighted);
assert.deepEqual(weightedLaplacian, ledger.weighted.laplacian);
assert.equal(trace(weightedLaplacian), ledger.weighted.laplacian_trace);
assert.deepEqual(multiplyVector(weightedLaplacian, [1, 1, 1]), [0, 0, 0]);
const cofactor = determinant2([
  [weightedLaplacian[0][0], weightedLaplacian[0][1]],
  [weightedLaplacian[1][0], weightedLaplacian[1][1]],
]);
assert.equal(cofactor, ledger.weighted.cofactor);
assert.equal(3 * cofactor, 33);

assert.equal(ledger.verdict.finite_symmetry_reconstructed, true);
assert.equal(ledger.verdict.casimir_like_invariant_reconstructed, true);
assert.equal(ledger.verdict.orientation_derived_from_unoriented_data, false);
assert.equal(ledger.verdict.physical_state_space_derived, false);
assert.equal(ledger.verdict.physical_prediction_derived, false);

console.log(
  JSON.stringify({
    status: "PASS",
    automorphism_orders: {
      uniform: uniformAutomorphisms.length,
      oriented: orientedAutomorphisms.length,
      marked: markedAutomorphisms.length,
      weighted: weightedAutomorphisms.length,
    },
    uniform_sector_eigenvalues: ledger.uniform.sector_eigenvalues,
    weighted_sector_eigenvalues_exact: ledger.weighted.sector_eigenvalues_exact,
    orientation_reflection_test: "PASS",
  }),
);
