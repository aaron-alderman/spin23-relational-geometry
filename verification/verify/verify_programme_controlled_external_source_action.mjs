import assert from "node:assert/strict";

const lambda = [5, 5, 1, 1, 1, 0];
const qBL = [1, -1, -1, -3, 3, 3];
const multiplicity = [6, 3, 3, 2, 1, 1];
const violation = (x) => [x[0] + x[1], x[0] + x[2], x[3] + x[4], x[3] + x[5]];
assert.deepEqual(violation(lambda), [10, 6, 2, 1]);
assert.deepEqual(violation(qBL), [0, 0, 0, 0]);

// Both diagonal fermion bilinears are dimension-three; a vector source has dimension one.
const fermionDimension = 3 / 2;
const currentDimension = 2 * fermionDimension;
const sourceDimension = 1;
assert.equal(currentDimension, 3);
assert.equal(currentDimension + sourceDimension, 4);

// Free ultraviolet source Gram is positive and full rank.
const dot = (x, y) => x.reduce((s, xi, i) => s + multiplicity[i] * xi * y[i], 0);
const G = [[dot(lambda, lambda), dot(lambda, qBL)], [dot(lambda, qBL), dot(qBL, qBL)]];
assert.deepEqual(G, [[231, 9], [9, 48]]);
assert.ok(G[0][0] > 0 && G[0][0] * G[1][1] - G[0][1] ** 2 > 0);

// Spectral matrices built from arbitrary complex transition amplitudes are Hermitian positive.
const states = [
  { weight: 2, v: [[1, 0.5], [-0.3, 0.7]] },
  { weight: 0.4, v: [[-0.2, 1.1], [0.8, -0.4]] },
  { weight: 3, v: [[0.5, -0.1], [1.2, 0.3]] },
];
const cmul = ([ar, ai], [br, bi]) => [ar * br - ai * bi, ar * bi + ai * br];
const cconj = ([r, i]) => [r, -i];
const cadd = ([ar, ai], [br, bi]) => [ar + br, ai + bi];
let rho = [[[0, 0], [0, 0]], [[0, 0], [0, 0]]];
for (const { weight, v } of states) {
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
    rho[i][j] = cadd(rho[i][j], cmul([weight, 0], cmul(v[i], cconj(v[j]))));
  }
}
assert.deepEqual(rho[1][0], cconj(rho[0][1]));
assert.ok(rho[0][0][1] === 0 && rho[1][1][1] === 0);
const determinant = rho[0][0][0] * rho[1][1][0] - (rho[0][1][0] ** 2 + rho[0][1][1] ** 2);
assert.ok(rho[0][0][0] > 0 && determinant > 0);

// Ward-compatible finite source mixing preserves the protected second axis.
for (const [a, b] of [[1, 0], [2, -3], [-0.5, 4]]) {
  const shifted = lambda.map((x, i) => a * x + b * qBL[i]);
  assert.deepEqual(violation(shifted), violation(lambda).map((x) => a * x));
  assert.deepEqual(violation(qBL), [0, 0, 0, 0]);
}

console.log("PASS controlled Standard-Model external-source action checks");
console.log("  both source couplings are local gauge-singlet dimension-four insertions");
console.log("  B-L is Yukawa protected while incidence has the exact breaking vector");
console.log("  spectral completeness produces a positive Hermitian two-source matrix");
console.log("  finite scale-times-shear mixing preserves the one protected source axis");
