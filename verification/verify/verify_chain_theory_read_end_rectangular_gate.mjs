import assert from "node:assert/strict";

const EPS = 1e-12;
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const multiply = (A, B) =>
  A.map((row) =>
    B[0].map((_, j) => row.reduce((sum, value, k) => sum + value * B[k][j], 0)),
  );
const subtract = (A, B) =>
  A.map((row, i) => row.map((value, j) => value - B[i][j]));
const maxAbs = (A) => Math.max(...A.flat().map(Math.abs));
const identity = (n) =>
  Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => Number(i === j)),
  );

// The corpus checkpoint channel E:C^2 -> C^3.  Its adjoint K=E^T has the
// direction of the proposed qutrit-end read C^3 -> C^2.
const E = [
  [3 / 5, 5 / 13],
  [4 / 5, 0],
  [0, 12 / 13],
];
const K = transpose(E);
const kernelVector = [[12], [-9], [-5]];
const gram = multiply(K, transpose(K));

assert.ok(maxAbs(multiply(K, kernelVector)) < EPS);
assert.ok(maxAbs(subtract(gram, [[1, 3 / 13], [3 / 13, 1]])) < EPS);

// For [[1,c],[c,1]], the normalized sum/difference eigenvectors diagonalize
// the Gram matrix.  Whitening is unique positive normalization on its range.
const c = 3 / 13;
const lambdaPlus = 1 + c;
const lambdaMinus = 1 - c;
const invSqrtPlus = 1 / Math.sqrt(lambdaPlus);
const invSqrtMinus = 1 / Math.sqrt(lambdaMinus);
const gramInverseSquareRoot = [
  [(invSqrtPlus + invSqrtMinus) / 2, (invSqrtPlus - invSqrtMinus) / 2],
  [(invSqrtPlus - invSqrtMinus) / 2, (invSqrtPlus + invSqrtMinus) / 2],
];
const flattenedRead = multiply(gramInverseSquareRoot, K);
const flattenedGram = multiply(flattenedRead, transpose(flattenedRead));

assert.ok(maxAbs(subtract(flattenedGram, identity(2))) < EPS);
assert.ok(maxAbs(multiply(flattenedRead, kernelVector)) < EPS);

console.log(JSON.stringify({
  status: "PASS",
  corpusChannel: {
    direction: "K=E^T:C^3->C^2",
    rank: 2,
    kernelDimension: 1,
    kernelRepresentative: [12, -9, -5],
    rangeGram: gram,
    squaredSingularValues: [lambdaPlus, lambdaMinus],
    determinant: lambdaPlus * lambdaMinus,
  },
  targetComparison: {
    exactMatches: [
      "larger-to-smaller C^3->C^2 direction",
      "rank two",
      "one-dimensional invisible qutrit direction",
    ],
    obstruction:
      "the corpus checkpoint is not a partial isometry because its two nonzero singular values are unequal",
    repair:
      "positive Gram whitening produces a coisometry with the same kernel",
    repairedRangeGram: flattenedGram,
    remainingPhysicalInput:
      "derive the whitening metric and identify the kernel ray with the target unbroken direction",
  },
}));
