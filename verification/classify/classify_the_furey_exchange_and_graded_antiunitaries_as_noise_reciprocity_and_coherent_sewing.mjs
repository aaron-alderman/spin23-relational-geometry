import assert from 'node:assert/strict';

const tol = 1e-10;
const close = (a, b, t = tol) => Math.abs(a - b) < t;
const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (a, s) => C(a.re * s, a.im * s);
const dagger = (M) => M[0].map((_, j) => M.map((row) => conj(row[j])));
const matMul = (A, B) => A.map((row, i) => B[0].map((_, j) => row.reduce((s, _, k) => add(s, mul(A[i][k], B[k][j])), C(0))));
const matConj = (A) => A.map((row) => row.map(conj));
const antiAction = (U, H) => matMul(matMul(U, matConj(H)), dagger(U));
const sameMatrix = (A, B) => A.every((row, i) => row.every((z, j) => close(z.re, B[i][j].re) && close(z.im, B[i][j].im)));

const I = [[C(1), C(0)], [C(0), C(1)]];
const X = [[C(0), C(1)], [C(1), C(0)]];
const Y = [[C(0), C(0, -1)], [C(0, 1), C(0)]];
const Z = [[C(1), C(0)], [C(0), C(-1)]];
const eps = [[C(0), C(1)], [C(-1), C(0)]]; // D X = i sigma_y

// Theta=XK fixes a three-dimensional Hermitian real form.
for (const H of [I, X, Y]) assert.ok(sameMatrix(antiAction(X, H), H));
assert.ok(!sameMatrix(antiAction(X, Z), Z));

// Gamma=eps K is Kramers/quaternionic: only the scalar Hermitian basis survives.
assert.ok(sameMatrix(antiAction(eps, I), I));
for (const H of [X, Y, Z]) assert.ok(!sameMatrix(antiAction(eps, H), H));

// Squares of antiunitaries are U bar(U).
assert.ok(sameMatrix(matMul(X, matConj(X)), I));
const minusI = I.map((row) => row.map((z) => scale(z, -1)));
assert.ok(sameMatrix(matMul(eps, matConj(eps)), minusI));

// Their ordered products differ by sign and recover the grading.
const thetaGamma = matMul(X, eps);
const gammaTheta = matMul(eps, X);
assert.ok(sameMatrix(thetaGamma, [[C(-1), C(0)], [C(0), C(1)]])); // -D
assert.ok(sameMatrix(gammaTheta, Z)); // D

// Takagi factor for X: X=V V^T, so Theta becomes ordinary conjugation.
const q = 1 / Math.sqrt(2);
const V = [[C(q), C(0, q)], [C(q), C(0, -q)]];
const transpose = (M) => M[0].map((_, j) => M.map((row) => row[j]));
assert.ok(sameMatrix(matMul(V, transpose(V)), X));
assert.ok(sameMatrix(matMul(matMul(dagger(V), X), matConj(V)), I));

console.log(JSON.stringify({
  protocol: 'furey-two-antiunitary-noise-coherence-classification/1',
  noiseCandidate: 'Theta=F_C K -> X K, Theta^2=+1',
  thetaFixedHermitianCone: 'span_R{I,sigma_x,sigma_y} ~= H_2(R)',
  coherentSewing: 'Gamma=F_C p K -> epsilon K, Gamma^2=-1',
  gammaFixedHermitianCone: 'R I only',
  relativeProduct: 'Theta Gamma=-D, Gamma Theta=D',
  sameOperatorCanServeBothRoles: false,
  microscopicThetaSymmetryDerived: false,
  passed: true,
}, null, 2));
