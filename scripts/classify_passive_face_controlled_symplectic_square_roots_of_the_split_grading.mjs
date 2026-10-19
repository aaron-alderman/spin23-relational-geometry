import assert from 'node:assert/strict';

const tol = 1e-12;
const same = (A, B) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < tol));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (r, A) => A.map((row) => row.map((x) => r * x));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const product = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const kron = (A, B) => A.flatMap((rowA) => B.map((rowB) => rowA.flatMap((a) => rowB.map((b) => a * b))));
const inverse2 = ([[a, b], [c, d]]) => {
  const det = a * d - b * c;
  return [[d / det, -b / det], [-c / det, a / det]];
};

const I = [[1, 0], [0, 1]];
const D = [[1, 0], [0, -1]];
const J = [[0, 1], [-1, 0]];
const P = scale(0.5, add(I, D));
const Q = scale(0.5, add(I, scale(-1, D)));
const target = kron(I, D);
const rotation = (theta) => add(scale(Math.cos(theta), I), scale(Math.sin(theta), J));
const controlled = (theta) => add(kron(I, P), kron(rotation(theta), Q));

for (const theta of [Math.PI / 2, 3 * Math.PI / 2, -Math.PI / 2]) {
  assert.ok(same(product(controlled(theta), controlled(theta)), target));
}
for (const theta of [0, Math.PI / 4, Math.PI, 2 * Math.PI]) {
  assert.ok(!same(product(controlled(theta), controlled(theta)), target));
}

// Dropping orthogonality leaves a continuous squeezed family of symplectic roots.
const lambda = 2;
const g = [[lambda, 0], [0, 1 / lambda]];
const squeezedJ = product(product(g, J), inverse2(g));
assert.ok(same(product(squeezedJ, squeezedJ), scale(-1, I)));
assert.ok(!same(product(transpose(squeezedJ), squeezedJ), I));
const squeezedControlled = add(kron(I, P), kron(squeezedJ, Q));
assert.ok(same(product(squeezedControlled, squeezedControlled), target));

console.log(JSON.stringify({
  protocol: 'passive-face-controlled-square-root-classification/1',
  squareCondition: 'S(theta)^2=I tensor D',
  passiveSolutions: 'theta=pi/2 mod pi',
  minimalPositiveAngle: 'pi/2',
  orientationBranches: ['+J on e_-', '-J on e_-'],
  durationOrFrequencyFixedSeparately: false,
  nonorthogonalContinuousCounterfamily: 'diag(lambda,lambda^-1) J diag(lambda^-1,lambda)',
  passed: true,
}, null, 2));
