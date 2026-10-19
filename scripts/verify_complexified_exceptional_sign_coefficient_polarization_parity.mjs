const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const C = (re, im = 0) => ({ re, im });
const add = (x, y) => C(x.re + y.re, x.im + y.im);
const sub = (x, y) => C(x.re - y.re, x.im - y.im);
const mul = (x, y) => C(x.re * y.re - x.im * y.im, x.re * y.im + x.im * y.re);
const scale = (a, x) => C(a * x.re, a * x.im);
const conj = (x) => C(x.re, -x.im);
const abs = (x) => Math.hypot(x.re, x.im);
const det3 = (A) => add(
  sub(mul(A[0][0], sub(mul(A[1][1], A[2][2]), mul(A[1][2], A[2][1]))), mul(A[0][1], sub(mul(A[1][0], A[2][2]), mul(A[1][2], A[2][0])))),
  mul(A[0][2], sub(mul(A[1][0], A[2][1]), mul(A[1][1], A[2][0]))),
);
const matAdd = (...As) => As[0].map((row, i) => row.map((_, j) => As.reduce((q, A) => add(q, A[i][j]), C(0))));
const matScale = (a, A) => A.map((row) => row.map((x) => scale(a, x)));
const pointAdd = (...Ps) => Ps[0].map((_, i) => matAdd(...Ps.map((P) => P[i])));
const pointScale = (a, P) => P.map((A) => matScale(a, A));
const polarizedDet = (A, B, D) => {
  const total = det3(matAdd(A, B, D));
  const pairAB = det3(matAdd(A, B));
  const pairAD = det3(matAdd(A, D));
  const pairBD = det3(matAdd(B, D));
  return scale(1 / 6, add(sub(sub(sub(total, pairAB), pairAD), pairBD), add(add(det3(A), det3(B)), det3(D))));
};
const coefficient = ([Z1, Z2, Z3]) => {
  const D112 = polarizedDet(Z1, Z1, Z2);
  const D113 = polarizedDet(Z1, Z1, Z3);
  const D122 = polarizedDet(Z1, Z2, Z2);
  const D133 = polarizedDet(Z1, Z3, Z3);
  const D223 = polarizedDet(Z2, Z2, Z3);
  const D233 = polarizedDet(Z2, Z3, Z3);
  return scale(1 / 2, add(add(add(scale(-1, D112), D113), add(D122, scale(-1, D133))), add(scale(-1, D223), D233)));
};
const polarizeCoefficient = (P, Q, R) => scale(1 / 6, add(
  sub(sub(sub(coefficient(pointAdd(P, Q, R)), coefficient(pointAdd(P, Q))), coefficient(pointAdd(P, R))), coefficient(pointAdd(Q, R))),
  add(add(coefficient(P), coefficient(Q)), coefficient(R)),
));
const realSymmetric = (a, b, c, d, e, f) => [
  [C(a), C(b), C(c)],
  [C(b), C(d), C(e)],
  [C(c), C(e), C(f)],
];

const X = [
  realSymmetric(1, 2, 0, -1, 1, 3),
  realSymmetric(0, 1, -2, 2, 1, -1),
  realSymmetric(3, -1, 1, 0, 2, 1),
];
const Y = [
  realSymmetric(0, 1, 2, 1, -1, 0),
  realSymmetric(2, 0, 1, -2, 1, 1),
  realSymmetric(-1, 2, 0, 1, 0, 2),
];
const iY = Y.map((A) => A.map((row) => row.map((x) => mul(C(0, 1), x))));
const Z = pointAdd(X, iY);
const cZ = coefficient(Z);

const TXXX = polarizeCoefficient(X, X, X);
const TXYY = polarizeCoefficient(X, Y, Y);
const TXXY = polarizeCoefficient(X, X, Y);
const TYYY = polarizeCoefficient(Y, Y, Y);
const predicted = C(
  TXXX.re - 3 * TXYY.re,
  3 * TXXY.re - TYYY.re,
);
assert(abs(sub(cZ, predicted)) < 1e-9, "complexified cubic polarization formula mismatch");

const Zbar = pointAdd(X, pointScale(-1, iY));
assert(abs(sub(coefficient(Zbar), conj(cZ))) < 1e-9, "antiunitary Y reversal must conjugate the coefficient");

const swap12 = ([A, B, D]) => [B, A, D];
assert(abs(add(coefficient(swap12(Z)), cZ)) < 1e-9, "sheet transposition must reverse both coefficient quadratures");
assert(Math.abs(TXXX.im) < 1e-10 && Math.abs(TXYY.im) < 1e-10 && Math.abs(TXXY.im) < 1e-10 && Math.abs(TYYY.im) < 1e-10, "real polarized components must remain real");
assert(Math.abs(cZ.im) > 1e-6, "checkpoint complexification must supply a nonzero imaginary quadrature");

console.log("Complexified exceptional sign-coefficient polarization certificate: PASS");
console.log("Re(c)=TXXX-3*T XYY; Im(c)=3*T XXY-TYYY");
console.log("Y_to_minusY_conjugates_c=true; sheet_transposition_negates_both_quadratures=true");
console.log("imaginary_quadrature_requires_odd_number_of_complexified_Y_insertions=true");
