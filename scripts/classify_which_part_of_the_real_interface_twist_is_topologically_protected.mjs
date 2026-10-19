import assert from 'node:assert/strict';

const pi = Math.PI;
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const tr = A => A[0].map((_, j) => A.map(row => row[j]));
const det = A => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const trace = A => A[0][0] + A[1][1];
const rot = theta => [[Math.cos(theta), -Math.sin(theta)], [Math.sin(theta), Math.cos(theta)]];
const D = [[1, 0], [0, -1]];
const interfaceTwist = theta => mm(rot(theta), D);
const normal = alpha => [Math.cos(alpha), Math.sin(alpha)];
const reflection = v => [[1 - 2 * v[0] ** 2, -2 * v[0] * v[1]], [-2 * v[0] * v[1], 1 - 2 * v[1] ** 2]];
const mv = (A, v) => A.map(row => row.reduce((s, x, j) => s + x * v[j], 0));
const approx = (a, b, eps = 1e-11) => Math.abs(a - b) < eps;
const I = [[1, 0], [0, 1]];

// Every R(theta)D is an orthogonal orientation-reversing interface, and theta
// supplies a continuous path through the entire reflection component.
for (const theta of [0, 0.17, 0.8, 1.9, 2.7]) {
  const T = interfaceTwist(theta);
  const orthogonality = mm(tr(T), T);
  assert.ok(orthogonality.every((row, i) => row.every((x, j) => approx(x, I[i][j]))));
  assert.ok(approx(det(T), -1));
}

const alpha = pi / 3;
const Rplus = reflection(normal(alpha));
const cycle = theta => {
  const T = interfaceTwist(theta);
  const Rtwisted = reflection(mv(T, normal(alpha)));
  return mm(Rtwisted, Rplus);
};

const C0 = cycle(0);
assert.ok(mm(mm(C0, C0), C0).every((row, i) => row.every((x, j) => approx(x, I[i][j]))));
assert.ok(approx(trace(C0), -1));

// A small deformation remains in det=-1 but destroys exact order three.
const epsilon = 0.11;
const Ce = cycle(epsilon);
assert.ok(approx(det(interfaceTwist(epsilon)), -1));
assert.ok(!approx(trace(Ce), -1));
assert.ok(!mm(mm(Ce, Ce), Ce).every((row, i) => row.every((x, j) => approx(x, I[i][j]))));

// Analytic trace law for the product of the two Householder reflections.
for (const theta of [0, epsilon, 0.4]) {
  assert.ok(approx(trace(cycle(theta)), 2 * Math.cos(2 * (theta - 2 * alpha))));
}

console.log(JSON.stringify({
  protocol: 'topological-classification-of-real-interface-twist/1',
  orthogonalComponents: {
    invariant: 'determinant sign in pi_0(O(2)) = Z2',
    orientationReversingFamily: 'T(theta) = Rot(theta) D',
    verdict: 'the component is protected but the reflection axis theta is continuous',
  },
  coxeterAngle: {
    mediatorNormalAngle: 'alpha = pi/3',
    traceLaw: 'tr C(theta) = 2 cos(2(theta - 2 alpha))',
    exactAtThetaZero: trace(C0),
    deformedAtTheta011: trace(Ce),
    verdict: 'C^3=I is not protected by determinant parity alone; theta must be symmetry- or algebra-pinned',
  },
  consequence: 'Topology can protect orientation reversal, but h*chi, a discrete defect symmetry, or arithmetic lattice data must fix the axis required for exact A2 monodromy.',
  passed: true,
}, null, 2));
