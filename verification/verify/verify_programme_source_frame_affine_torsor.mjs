import assert from "node:assert/strict";

const d = [6, 3, 3, 2, 1, 1];
const lambda = [5, 5, 1, 1, 1, 0];
const q = [1, -1, -1, -3, 3, 3];
const dot = (x, y) => x.reduce((s, xi, i) => s + d[i] * xi * y[i], 0);
const combine = (a, x, b, y) => x.map((xi, i) => a * xi + b * y[i]);
const gram = (x, y) => [[dot(x, x), dot(x, y)], [dot(x, y), dot(y, y)]];
const det2 = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];

const G = gram(lambda, q);
assert.deepEqual(G, [[231, 9], [9, 48]]);
assert.equal(det2(G), 11007);

// Yukawa violations for sector charges (Q,u,d,L,e,nu) with zero Higgs charge.
const violation = (x) => [x[0] + x[1], x[0] + x[2], x[3] + x[4], x[3] + x[5]];
assert.deepEqual(violation(lambda), [10, 6, 2, 1]);
assert.deepEqual(violation(q), [0, 0, 0, 0]);

for (const [a, b] of [[1, 7], [2, -3], [-1, 0.25], [0.5, -9]]) {
  const shifted = combine(a, lambda, b, q);
  const Gshifted = gram(shifted, q);
  assert.ok(Math.abs(det2(Gshifted) - a * a * det2(G)) < 1e-8);
  assert.deepEqual(violation(shifted), violation(lambda).map((v) => a * v));
}

const bStar = -dot(lambda, q) / dot(q, q);
assert.equal(bStar, -3 / 16);
const lambdaPerp = combine(1, lambda, bStar, q);
assert.ok(Math.abs(dot(lambdaPerp, q)) < 1e-12);
assert.equal(dot(lambdaPerp, lambdaPerp), 3669 / 16);
assert.equal(dot(lambdaPerp, lambdaPerp), det2(G) / dot(q, q));

console.log("PASS programme source-frame affine torsor");
console.log("  incidence and B-L span a positive two-dimensional source plane");
console.log("  Ward-compatible source frames form a scale-times-shear affine family");
console.log("  Gram determinant is shear invariant and scales quadratically with units");
console.log("  UV Gram orthogonalization fixes b=-3/16 only relative to that metric");
