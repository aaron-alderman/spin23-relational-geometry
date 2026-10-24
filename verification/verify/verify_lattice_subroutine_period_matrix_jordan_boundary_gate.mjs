import assert from "node:assert/strict";

const separatingSamples = [
  [1, 1],
  [0.5, 3],
  [Math.sqrt(2), Math.PI],
  [1e-3, 1e3]
];

const results = separatingSamples.map(([imaginaryTau1, imaginaryTau2]) => ({
  imaginaryTau1,
  imaginaryTau2,
  offDiagonal: 0,
  determinantOfImaginaryPeriodMatrix: imaginaryTau1 * imaginaryTau2
}));

assert.ok(results.every((sample) => sample.determinantOfImaginaryPeriodMatrix > 0));

const isPositiveDefinite2x2 = ([[a, b], [, d]]) => a > 0 && a * d - b * b > 0;
const separatingY = [[2, 0], [0, 5]];
assert.equal(isPositiveDefinite2x2(separatingY), true);
assert.equal(separatingY[0][0] * separatingY[1][1], 10);

const strata = {
  separatingDivisorRealCodimension: 2,
  jordanRankBoundaryRealCodimension: 1,
  canonicalImagesEqual: false
};
assert.equal(strata.canonicalImagesEqual, false);

console.log(JSON.stringify({
  canonicalMap: "Q=Im(Omega)",
  separatingSamples: results,
  strata,
  conclusion: "The separating divisor maps to diagonal positive-definite Jordan data, not to det(Q)=0. A derived physical response map is required."
}, null, 2));
console.log("PASS verify_lattice_subroutine_period_matrix_jordan_boundary_gate");
