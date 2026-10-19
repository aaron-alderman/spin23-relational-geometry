import assert from 'node:assert/strict';

const close = (x, y, tol = 1e-9) => Math.abs(x - y) < tol;
const c = (re, im = 0) => ({ re, im });
const add = (x, y) => c(x.re + y.re, x.im + y.im);
const sub = (x, y) => c(x.re - y.re, x.im - y.im);
const mul = (x, y) => c(x.re * y.re - x.im * y.im, x.re * y.im + x.im * y.re);
const div = (x, y) => {
  const d = y.re * y.re + y.im * y.im;
  return c((x.re * y.re + x.im * y.im) / d, (x.im * y.re - x.re * y.im) / d);
};
const scale = (r, x) => c(r * x.re, r * x.im);
const sameC = (x, y, tol = 1e-9) => close(x.re, y.re, tol) && close(x.im, y.im, tol);

const q = (1 + Math.SQRT2) ** 4;
const a = Math.sqrt(q);
const b = a / 2;
const R0 = (w) => div(c(1), c(w, b));
const A0 = (w) => div(c(1), c(w, -b));
const R1 = (w) => mul(R0(w), R0(w));
const A1 = (w) => mul(A0(w), A0(w));
const phi0 = (w) => w / (w * w + b * b);
const phi1 = (w) => w / (w * w + b * b) ** 2;

for (const w of [-3, -0.4, 0, 0.7, 5]) {
  assert.ok(sameC(scale(0.5, add(R0(w), A0(w))), c(phi0(w)), 2e-12));
  const split1 = div(sub(A1(w), R1(w)), c(0, 4 * b));
  assert.ok(sameC(split1, c(phi1(w)), 2e-12));
}

// Mixed retarded/advanced simple-pole loops.  Same-half-plane loops vanish by
// contour closure; the two mixed residues reconstruct C00 exactly.
const IRA = (W) => div(c(0, 2 * Math.PI), c(-W, 2 * b));
const IAR = (W) => div(c(0, -2 * Math.PI), c(-W, -2 * b));
const C00 = (W) => 2 * Math.PI * b / (W * W + 4 * b * b);
for (const W of [0, 0.3, 2, 9]) {
  const mixed = scale(0.25, add(IRA(W), IAR(W)));
  assert.ok(sameC(mixed, c(C00(W)), 2e-12));
}

// The signed convolution metric is exactly congruent to D=diag(1,-1).
const d = q - 1;
const alpha = d * (3 * q + 1) / (2 * Math.PI * a ** 3);
const beta = -(d ** 2) / (2 * Math.PI * a);
const off = beta / 2;
const L = [
  [Math.sqrt(alpha), off / Math.sqrt(alpha)],
  [0, Math.abs(off) / Math.sqrt(alpha)],
];
const D = [[1, 0], [0, -1]];
const transpose = (M) => M[0].map((_, j) => M.map((row) => row[j]));
const product = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const G = product(product(transpose(L), D), L);
assert.ok(close(G[0][0], alpha, 2e-12));
assert.ok(close(G[0][1], off, 2e-12));
assert.ok(close(G[1][0], off, 2e-12));
assert.ok(close(G[1][1], 0, 2e-12));

const C01 = (W) => Math.PI * (a * a - W * W) / (a * (W * W + a * a) ** 2);
const target = (W) => 1 - ((W * W + 1) / (W * W + q)) ** 2;
for (const W of [0, 0.4, 1, 4]) {
  assert.ok(close(alpha * C00(W) + beta * C01(W), target(W), 2e-12));
}

console.log(JSON.stringify({
  protocol: 'odd-convolution-ra-and-furey-grading/1',
  causalPieces: 'R_k has lower-half-plane pole; A_k is its boundary conjugate',
  sameHalfPlaneLoops: 0,
  survivingSectors: 'RA and AR',
  coefficientMetric: 'G=L^T diag(1,-1) L',
  gradingMatch: 'congruent to established h-chi grading D',
  microscopicVertexDerived: false,
  passed: true,
}, null, 2));
