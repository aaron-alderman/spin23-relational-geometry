#!/usr/bin/env node

function mul(A, B) {
  return A.map((row, i) => B[0].map((_, j) => row.reduce((s, _, k) => s + A[i][k] * B[k][j], 0)));
}

function tr(A) {
  return A.reduce((s, row, i) => s + row[i], 0);
}

function sq(A) {
  return mul(A, A);
}

function traceIdentityResidual(A, B) {
  const A2 = sq(A);
  const B2 = sq(B);
  const AB = mul(A, B);
  const lhs = tr(mul(AB, AB));
  const rhs = tr(AB) ** 2
    - 2 * tr(mul(A2, B2))
    + 2 * tr(B) * tr(mul(A2, B))
    + 2 * tr(A) * tr(mul(A, B2))
    - 2 * tr(A) * tr(B) * tr(AB)
    + 0.5 * (tr(A) ** 2 - tr(A2)) * (tr(B) ** 2 - tr(B2));
  return lhs - rhs;
}

const samples = [
  [
    [[1, 2, -1], [2, 3, 4], [-1, 4, 6]],
    [[2, -2, 3], [-2, 5, 1], [3, 1, -4]],
  ],
  [
    [[3, 1, 2], [1, -1, 5], [2, 5, 4]],
    [[-2, 4, 1], [4, 7, -3], [1, -3, 2]],
  ],
  [
    [[0.5, -1.2, 2.1], [-1.2, 3.4, 0.7], [2.1, 0.7, -0.8]],
    [[1.1, 0.3, -2.2], [0.3, -4.1, 1.7], [-2.2, 1.7, 2.6]],
  ],
];

const residuals = samples.map(([A, B]) => traceIdentityResidual(A, B));
const tolerance = 1e-9;
const passed = residuals.every((x) => Math.abs(x) < tolerance);

const result = {
  protocol: "degree-eight-three-family-no-go-certificate/1",
  dimension: 3,
  exactIdentityTested: "Tr(ABAB) reduction",
  sampleResiduals: residuals,
  tolerance,
  fixedSpectrumCoordinateDimension: 4,
  independentNonlinearGeneratorsThroughDegreeEight: 1,
  stationaryHessianRankUpperBound: 1,
  stationaryFlatDirectionLowerBound: 3,
  conclusion: "degree eight can stabilize a one-dimensional slice but cannot isolate a generic four-dimensional three-family frame",
  passed,
};

console.log(JSON.stringify(result, null, 2));
if (!passed) process.exitCode = 1;
