import assert from 'node:assert/strict';

const tol = 1e-12;
const same = (A, B) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < tol));
const product = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const det2 = ([[a, b], [c, d]]) => a * d - b * c;
const scale = (r, A) => A.map((row) => row.map((x) => r * x));

const I = [[1, 0], [0, 1]];
const K = [[1, 0], [0, -1]];
const J = [[0, 1], [-1, 0]];
const rotation = (theta) => [[Math.cos(theta), Math.sin(theta)], [-Math.sin(theta), Math.cos(theta)]];
const Psi = [[2, 1], [1, 3]];
const Q = product(transpose(Psi), Psi);
const eta = det2(Psi) / Math.sqrt(det2(Q));
assert.ok(Math.abs(eta - 1) < tol);

for (const theta of [0.2, 1.1, 2.7]) {
  const R = rotation(theta);
  const transformed = product(R, Psi);
  assert.ok(same(product(transpose(transformed), transformed), Q));
  assert.equal(Math.sign(det2(transformed)), Math.sign(det2(Psi)));
  assert.ok(same(product(product(R, J), transpose(R)), J));
}

const reflected = product(K, Psi);
assert.ok(same(product(transpose(reflected), reflected), Q));
assert.equal(Math.sign(det2(reflected)), -Math.sign(det2(Psi)));
assert.ok(same(product(product(K, J), transpose(K)), scale(-1, J)));

// The straight left-reflection interpolation is an explicit witness of the
// forced rank-one wall.
const left = (t) => [[1, 0], [0, 1 - 2 * t]];
const midpoint = product(left(0.5), Psi);
assert.ok(Math.abs(det2(midpoint)) < tol);
const midpointQ = product(transpose(midpoint), midpoint);
assert.ok(Math.abs(det2(midpointQ)) < tol);
assert.equal(det2(Q), det2(Psi) ** 2);

console.log(JSON.stringify({
  protocol: 'oriented-gram-root-double-cover/1',
  fullGramFiber: 'O(2)',
  JPreservingGaugeFiber: 'SO(2)',
  normalizedOrientation: 'eta=det(Psi)/sqrt(det Q)=+/-1',
  reflection: 'preserves Q, reverses eta and J',
  sheetChangeRequires: 'det(Psi)=det(Q)=0 rank-one wall',
  localizedModeDerived: false,
  passed: true,
}, null, 2));
