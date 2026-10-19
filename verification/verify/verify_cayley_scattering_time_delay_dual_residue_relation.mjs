import assert from "node:assert/strict";

const Qpoly = (z) => z ** 4 - 4 * z ** 2 - z + 1;
const bisect = (lo, hi) => {
  let a = lo, b = hi, fa = Qpoly(a);
  for (let k = 0; k < 100; k += 1) {
    const m = (a + b) / 2, fm = Qpoly(m);
    if (fa * fm <= 0) b = m;
    else { a = m; fa = fm; }
  }
  return (a + b) / 2;
};
const roots = [[-2, -1], [-1, 0], [0, 0.5], [2, 3]].map(([a, b]) => bisect(a, b));
const Rm = [[1, 0], [0, 0]], Rp = [[1, 1], [1, 1]];
const addR = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scaleR = (c, A) => A.map((row) => row.map((x) => c * x));
const F = (z) => addR(scaleR(z, [[1, 0], [0, 1]]), addR(scaleR(1 / (-1 - z), Rm), scaleR(1 / (1 - z), Rp)));
const Fp = (z) => addR([[1, 0], [0, 1]], addR(scaleR(1 / (-1 - z) ** 2, Rm), scaleR(1 / (1 - z) ** 2, Rp)));
const dotR = (x, A, y) => x.reduce((s, xi, i) => s + xi * A[i].reduce((t, a, j) => t + a * y[j], 0), 0);

const c = (re, im = 0) => ({ re, im });
const cadd = (a, b) => c(a.re + b.re, a.im + b.im);
const cmul = (a, b) => c(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const cscale = (x, a) => c(x * a.re, x * a.im);
const cconj = (a) => c(a.re, -a.im);
const cdiv = (a, b) => {
  const d = b.re * b.re + b.im * b.im;
  return c((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d);
};
const toC = (A) => A.map((row) => row.map((x) => c(x)));
const madd = (A, B) => A.map((row, i) => row.map((x, j) => cadd(x, B[i][j])));
const mmul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => cadd(s, cmul(x, B[k][j])), c(0))));
const mdag = (A) => A[0].map((_, j) => A.map((row) => cconj(row[j])));
const minv2 = (A) => {
  const d = cadd(cmul(A[0][0], A[1][1]), cscale(-1, cmul(A[0][1], A[1][0])));
  return [[cdiv(A[1][1], d), cscale(-1, cdiv(A[0][1], d))], [cscale(-1, cdiv(A[1][0], d)), cdiv(A[0][0], d)]];
};
const I = [[c(1), c(0)], [c(0), c(1)]];
const maxErr = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.hypot(x.re - B[i][j].re, x.im - B[i][j].im))));
const expectation = (v, A) => v.reduce((s, vi, i) => A[i].reduce((t, a, j) => cadd(t, cscale(vi * v[j], a)), s), c(0));

const checks = roots.map((r) => {
  const Fr = F(r), Fpr = Fp(r);
  let v = [-Fr[0][1], Fr[0][0]];
  const n = Math.hypot(...v); v = v.map((x) => x / n);
  const slope = dotR(v, Fpr, v);
  const Fc = toC(Fr), Fpc = toC(Fpr);
  const Fminus = madd(Fc, [[c(0, -1), c(0)], [c(0), c(0, -1)]]);
  const Fplus = madd(Fc, [[c(0, 1), c(0)], [c(0), c(0, 1)]]);
  const S = mmul(Fminus, minv2(Fplus));
  assert(maxErr(mmul(mdag(S), S), I) < 1e-9);
  // Q_WS=2(F-iI)^-1 F' (F+iI)^-1 = 2 R^dag F' R.
  const R = minv2(Fplus);
  const Qws = mmul(mdag(R), mmul(Fpc, R)).map((row) => row.map((x) => cscale(2, x)));
  assert(maxErr(Qws, mdag(Qws)) < 1e-9);
  const delay = expectation(v, Qws);
  assert(Math.abs(delay.im) < 1e-9);
  assert(Math.abs(delay.re - 2 * slope) < 1e-8);
  const dualWeight = 1 / slope;
  assert(Math.abs(delay.re * dualWeight - 2) < 1e-8);
  return { responseZero: r, nullChannel: v, responseSlope: slope, cayleyWignerSmithDelay: delay.re, dualPoleWeight: dualWeight, product: delay.re * dualWeight };
});

console.log(JSON.stringify({
  protocol: "cayley-scattering-time-delay-dual-residue/1",
  cayleyScatteringMatrix: "S(E)=(F(E)-iI)(F(E)+iI)^-1",
  wignerSmithMatrix: "Q_WS=-i S^dagger dS/dE=2(F-iI)^-1 F'(F+iI)^-1 >=0",
  zeroChannelRelations: "tau_v=2 v^T F'(r)v; w_dual=1/[v^T F'(r)v]; tau_v*w_dual=2",
  checks,
  interpretation: "Within the canonical Cayley scattering realization, a strong dual pole corresponds to a small positive delay in the zero channel, and a weak dual pole to a large delay. Residue and delay are reciprocal, not identical.",
  physicalCaveat: "The Cayley S is mathematically unitary. Identifying it with an experimental Standard-Model S-matrix still requires channel, flux and on-shell normalization.",
  passed: true,
}, null, 2));
