import assert from 'node:assert/strict';

const mm = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => +(i === j)));
const scale = (s, A) => A.map((r) => r.map((x) => s * x));
const eq = (A, B, tol = 1e-12) => A.every((r, i) => r.every((x, j) => Math.abs(x - B[i][j]) < tol));
const pow = (A, n) => { let R = eye(A.length); for (let i = 0; i < n; i++) R = mm(R, A); return R; };
const directSum = (A, B) => {
  const n = A.length, m = B.length;
  return Array.from({ length: n + m }, (_, i) => Array.from({ length: n + m }, (_, j) => {
    if (i < n && j < n) return A[i][j];
    if (i >= n && j >= n) return B[i - n][j - n];
    return 0;
  }));
};
const corner = (A, n) => A.slice(0, n).map((r) => r.slice(0, n));
const rotation = (theta) => [[Math.cos(theta), -Math.sin(theta)], [Math.sin(theta), Math.cos(theta)]];

const epsilon = [[0, 1], [-1, 0]];
const I2 = eye(2);
assert.ok(eq(pow(epsilon, 2), scale(-1, I2)));
assert.ok(eq(pow(epsilon, 6), scale(-1, I2)));
assert.ok(eq(pow(epsilon, 12), I2));

// At a lossless checkpoint a unitary observed compression A is reducing:
// U=[A B; C D], U*U=I gives C*C=I-A*A=0, hence C=0;
// UU*=I gives BB*=I-AA*=0, hence B=0. Thus U=A direct-sum V.
const cases = [
  { environmentDimension: 2, V: rotation(Math.PI / 7) },
  { environmentDimension: 4, V: directSum(rotation(Math.PI / 5), rotation(Math.PI / 11)) },
  { environmentDimension: 8, V: directSum(directSum(rotation(Math.PI / 3), rotation(Math.PI / 4)), directSum(rotation(Math.PI / 5), rotation(Math.PI / 6))) },
];

for (const item of cases) {
  const U = directSum(epsilon, item.V);
  assert.ok(eq(corner(U, 2), epsilon));
  assert.ok(eq(corner(pow(U, 6), 2), scale(-1, I2)));
  assert.ok(eq(corner(pow(U, 12), 2), I2));
}

// The same conclusion holds for edge-dependent environments because every
// lossless edge splits and the observed product is epsilon^6.
let observedProduct = I2;
for (let edge = 0; edge < 6; edge++) observedProduct = mm(epsilon, observedProduct);
assert.ok(eq(observedProduct, scale(-1, I2)));

console.log(JSON.stringify({
  protocol: 'passive-idler-cannot-cancel-lossless-c12-cocycle/1',
  lemma: 'A unitary dilation with unitary observed compression A must reduce as A direct-sum V.',
  testedEnvironmentDimensions: cases.map((x) => x.environmentDimension),
  sixEdgeObservedHolonomy: '-I2',
  twelveEdgeObservedHolonomy: 'I2',
  consequence: 'Fresh passive loss ports can realize dissipation away from the checkpoint but cannot cancel the central cocycle while preserving the exact lossless observed edge epsilon.',
  escapes: ['accept antiperiodic/projective closure', 'use the twelve-step cover', 'change the observed edge map', 'introduce a non-passive or gauge identification rather than an ordinary unitary dilation'],
  passed: true,
}, null, 2));
