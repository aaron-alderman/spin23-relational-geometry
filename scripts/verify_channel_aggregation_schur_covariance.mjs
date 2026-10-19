#!/usr/bin/env node

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const add2 = (a, b) => a.map((x, i) => x + b[i]);
const scale2 = (s, a) => a.map(x => s * x);
const outer = a => [[a[0] * a[0], a[0] * a[1]], [a[1] * a[0], a[1] * a[1]]];
const addM = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
const scaleM = (s, A) => A.map(r => r.map(x => s * x));
const subM = (A, B) => A.map((r, i) => r.map((x, j) => x - B[i][j]));
const det2 = A => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const psd2 = A => A[0][0] >= -1e-12 && A[1][1] >= -1e-12 && det2(A) >= -1e-12;
const closeM = (A, B, eps = 1e-10) => A.every((r, i) => r.every((x, j) => Math.abs(x - B[i][j]) < eps));

// Each channel has a two-component boundary coupling x_f and a positive
// scalar interior pivot c_f. The Schur discrepancy is the weighted covariance
// of r_f=x_f/c_f with weights beta_f=w_f c_f.
const w = [3, 3, 1, 1];
const c = [2, 1, 4, 3];
const x = [[2, 0], [0, 1], [4, 4], [3, -3]];

let C = 0;
let X = [0, 0];
let sumLocalQuadratic = [[0, 0], [0, 0]];
for (let f = 0; f < w.length; f++) {
  C += w[f] * c[f];
  X = add2(X, scale2(w[f], x[f]));
  sumLocalQuadratic = addM(sumLocalQuadratic, scaleM(w[f] / c[f], outer(x[f])));
}
const aggregateQuadratic = scaleM(1 / C, outer(X));
const discrepancy = subM(sumLocalQuadratic, aggregateQuadratic);
assert(psd2(discrepancy), "Schur aggregation discrepancy must be positive semidefinite");
assert(det2(discrepancy) > 1e-8, "generic example should have strictly positive covariance determinant");

// Direct covariance representation.
const mean = scale2(1 / C, X);
let covariance = [[0, 0], [0, 0]];
for (let f = 0; f < w.length; f++) {
  const ratio = scale2(1 / c[f], x[f]);
  const delta = add2(ratio, scale2(-1, mean));
  covariance = addM(covariance, scaleM(w[f] * c[f], outer(delta)));
}
assert(closeM(discrepancy, covariance), "covariance identity failed");

// Equality case: all x_f/c_f are the same vector.
const commonRatio = [2, -1];
const alignedX = c.map(cf => scale2(cf, commonRatio));
let alignedC = 0;
let alignedTotalX = [0, 0];
let alignedLocal = [[0, 0], [0, 0]];
for (let f = 0; f < w.length; f++) {
  alignedC += w[f] * c[f];
  alignedTotalX = add2(alignedTotalX, scale2(w[f], alignedX[f]));
  alignedLocal = addM(alignedLocal, scaleM(w[f] / c[f], outer(alignedX[f])));
}
const alignedAggregate = scaleM(1 / alignedC, outer(alignedTotalX));
assert(closeM(alignedLocal, alignedAggregate), "common-ratio equality condition failed");

console.log("Channel aggregation/Schur covariance certificate: PASS");
console.log(`generic_discrepancy_psd=true; det=${det2(discrepancy).toFixed(6)}; covariance_identity=true`);
console.log("aggregation_commutes_with_scalar_interior_schur_if_common_ratio=true; generic_commutation=false");
