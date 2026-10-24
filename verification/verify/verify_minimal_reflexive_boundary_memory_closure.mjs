#!/usr/bin/env node

import assert from "node:assert/strict";

const tol = 1e-12;

function eigenvalues2([[a, b], [c, d]]) {
  const trace = a + d;
  const determinant = a * d - b * c;
  const discriminant = trace * trace - 4 * determinant;
  assert.ok(discriminant >= -tol, "certificate expects real eigenvalues");
  const root = Math.sqrt(Math.max(0, discriminant));
  return [(trace + root) / 2, (trace - root) / 2];
}

function affineStep(matrix, forcing, [x, y]) {
  return [
    matrix[0][0] * x + matrix[0][1] * y + forcing[0],
    matrix[1][0] * x + matrix[1][1] * y + forcing[1],
  ];
}

function projector([x, y]) {
  const norm2 = x * x + y * y;
  return [[x * x / norm2, x * y / norm2], [x * y / norm2, y * y / norm2]];
}

function maxMatrixDifference(a, b) {
  return Math.max(...a.flatMap((row, i) => row.map((value, j) => Math.abs(value - b[i][j]))));
}

const r = 1 / 3;
const mu = 1 / 4;
const nu = 1 / 2;

const unanchored = [[r, 1 - r], [mu, 1 - mu]];
const unanchoredEigenvalues = eigenvalues2(unanchored).sort((a, b) => b - a);
assert.ok(Math.abs(unanchoredEigenvalues[0] - 1) < tol);
assert.ok(Math.abs(unanchoredEigenvalues[1] - (r - mu)) < tol);
assert.deepEqual(
  affineStep(unanchored, [0, 0], [1, 1]),
  [1, 1],
  "the common rotation/displacement must remain neutral",
);
assert.ok(Math.abs(r - mu) < 1, "the relative rail must contract");

const anchored = [[r, 1 - r], [mu, 1 - mu - nu]];
const anchoredEigenvalues = eigenvalues2(anchored);
assert.ok(anchoredEigenvalues.every((value) => Math.abs(value) < 1));

const boundary = 0.37;
const fixedPoint = [boundary, boundary];
const forcing = [0, nu * boundary];
const fixedPointImage = affineStep(anchored, forcing, fixedPoint);
assert.ok(Math.max(...fixedPointImage.map((value, i) => Math.abs(value - fixedPoint[i]))) < tol);

for (const initial of [[-2, 3], [10, -4], [0, 0], [1, 1]]) {
  let state = initial;
  for (let step = 0; step < 100; step += 1) state = affineStep(anchored, forcing, state);
  assert.ok(Math.max(...state.map((value) => Math.abs(value - boundary))) < 1e-12);
}

const p = projector([3, -4]);
const minusP = projector([-3, 4]);
assert.ok(maxMatrixDifference(p, minusP) < tol, "a projector cannot retain the sign of its lift");

const kappa = 2;
const eta = 3;
const unanchoredHessianDeterminant = kappa * kappa - kappa * kappa;
const anchoredHessianDeterminant = kappa * (kappa + eta) - kappa * kappa;
assert.equal(unanchoredHessianDeterminant, 0);
assert.equal(anchoredHessianDeterminant, kappa * eta);
assert.ok(anchoredHessianDeterminant > 0);

console.log(JSON.stringify({
  result: "pass",
  unanchoredEigenvalues,
  anchoredEigenvalues,
  fixedPoint,
  interpretation: {
    twoRails: "relative closure with a neutral common symmetry mode",
    boundaryMemory: "contracts the common mode when it is independent state information",
    orientedLift: "not reconstructible from a director projector",
  },
}, null, 2));

