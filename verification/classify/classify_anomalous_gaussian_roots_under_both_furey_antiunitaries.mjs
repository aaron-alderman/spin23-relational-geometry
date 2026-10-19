import assert from 'node:assert/strict';

const tol = 1e-9;
const close = (a, b, t = tol) => Math.abs(a - b) < t;
const sameRealMatrix = (A, B) => A.every((row, i) => row.every((x, j) => close(x, B[i][j])));

// Simultaneously XK- and epsilon-K-invariant commuting Gaussian root:
// C=pI, S=sI+i v sigma_z.  Wick covariance of (J_x,J_y).
const anomalousWickMap = (p, s, v) => [
  [2 * p * p + 2 * (s * s - v * v), -4 * s * v],
  [-4 * s * v, 2 * p * p - 2 * (s * s - v * v)],
];

const anomalousRoot = (M) => {
  const mean = (M[0][0] + M[1][1]) / 2;
  const alpha = (M[0][0] - M[1][1]) / 2;
  const beta = M[0][1];
  const p = Math.sqrt(Math.max(0, mean / 2));
  // (s+i v)^2=(alpha-i beta)/2.
  const squareMagnitude = Math.hypot(alpha, beta) / 2;
  const rootMagnitude = Math.sqrt(squareMagnitude);
  const phase = Math.atan2(-beta, alpha) / 2;
  return { p, s: rootMagnitude * Math.cos(phase), v: rootMagnitude * Math.sin(phase) };
};

for (const M of [
  [[0.9, 0.2], [0.2, 0.5]],
  [[1.2, -0.3], [-0.3, 0.8]],
  [[0.4, 0], [0, 1.1]],
  [[0.7, 0], [0, 0.7]],
]) {
  const root = anomalousRoot(M);
  assert.ok(root.p ** 2 >= root.s ** 2 + root.v ** 2 - tol);
  assert.ok(sameRealMatrix(anomalousWickMap(root.p, root.s, root.v), M));
  assert.ok(sameRealMatrix(
    anomalousWickMap(root.p, root.s, root.v),
    anomalousWickMap(root.p, -root.s, -root.v),
  ));
}

// Rank boundary agrees with saturation of the augmented covariance.
const boundaryRoot = anomalousRoot([[1, 0.3], [0.3, 0.09]]);
assert.ok(close(boundaryRoot.p ** 2, boundaryRoot.s ** 2 + boundaryRoot.v ** 2));

// Minimal complex 2x2 helpers for the antiunitary fixed-point checks.
const z = (re, im = 0) => ({ re, im });
const add = (a, b) => z(a.re + b.re, a.im + b.im);
const mul = (a, b) => z(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => z(a.re, -a.im);
const mat = (...rows) => rows;
const mm = (A, B) => A.map((row, i) => B[0].map((_, j) => row.reduce(
  (sum, _, k) => add(sum, mul(A[i][k], B[k][j])), z(0),
)));
const tr = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const star = (A) => A.map((row) => row.map(conj));
const dagger = (A) => tr(star(A));
const same = (A, B) => A.every((row, i) => row.every(
  (a, j) => close(a.re, B[i][j].re) && close(a.im, B[i][j].im),
));

const I = mat([z(1), z(0)], [z(0), z(1)]);
const X = mat([z(0), z(1)], [z(1), z(0)]);
const Z = mat([z(1), z(0)], [z(0), z(-1)]);
const eps = mat([z(0), z(1)], [z(-1), z(0)]);
const scale = (a, A) => A.map((row) => row.map((x) => mul(a, x)));
const plus = (A, B) => A.map((row, i) => row.map((x, j) => add(x, B[i][j])));
const antiC = (U, C) => mm(mm(U, tr(C)), dagger(U));
const antiS = (U, S) => mm(mm(U, star(S)), tr(U));

const p0 = 1.2, s0 = 0.4, v0 = -0.3;
const C0 = scale(z(p0), I);
const S0 = plus(scale(z(s0), I), scale(z(0, v0), Z));
for (const U of [X, eps]) {
  assert.ok(same(antiC(U, C0), C0));
  assert.ok(same(antiS(U, S0), S0));
}

// CAR pairing is antisymmetric, S_f=Delta epsilon.  XK requires
// Delta=-conj(Delta), whereas epsilon-K requires Delta=conj(Delta), so their
// simultaneous fixed space is zero.
const SfImaginary = scale(z(0, 1), eps);
const SfReal = scale(z(1), eps);
assert.ok(same(antiS(X, SfImaginary), SfImaginary));
assert.ok(!same(antiS(eps, SfImaginary), SfImaginary));
assert.ok(same(antiS(eps, SfReal), SfReal));
assert.ok(!same(antiS(X, SfReal), SfReal));

// The tuned diagonal target fixes p^2=(A+B)/4 even in this anomalous root,
// so the p~1/|omega| ultraviolet obstruction remains.
const q = (1 + Math.SQRT2) ** 4;
const A = (w) => 1 - ((w * w + 1) / (w * w + q)) ** 2;
const B = (w) => 1 - ((w * w + 1 / q) / (w * w + 1)) ** 2;
const P = 0.5 * Math.sqrt(2 * (q - 1) + 2 * (1 - 1 / q));
for (const w of [1e3, 3e3, 1e4]) {
  const root = anomalousRoot([[A(w), 0], [0, B(w)]]);
  assert.ok(close(w * root.p, P, 2e-3));
}

console.log(JSON.stringify({
  protocol: 'anomalous-gaussian-two-antiunitary-root/1',
  commutingRoot: 'C=pI, S=sI+i v sigma_z',
  antiunitaryStatus: 'fixed by both XK and epsilon K',
  targetCone: 'all Sym_2(R)_+',
  genericFiber: '(s,v) and (-s,-v)',
  ultravioletRepair: false,
  carPairing: 'simultaneous fixed space is zero',
  gaugeWarning: 'nonzero S carries twice the ordinary U(1) phase',
  passed: true,
}, null, 2));
