import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (a, s) => C(a.re * s, a.im * s);
const near = (a, b, eps = 1e-10) => Math.abs(a.re - b.re) < eps && Math.abs(a.im - b.im) < eps;
const det2 = (A) => sub(mul(A[0][0], A[1][1]), mul(A[0][1], A[1][0]));
const det3 = (A) => {
  const p = (i, j, k) => mul(A[0][i], mul(A[1][j], A[2][k]));
  let out = C(0);
  out = add(out, p(0, 1, 2)); out = add(out, p(1, 2, 0)); out = add(out, p(2, 0, 1));
  out = sub(out, p(2, 1, 0)); out = sub(out, p(1, 0, 2)); out = sub(out, p(0, 2, 1));
  return out;
};
const adj2 = (A) => [[A[1][1], scale(A[0][1], -1)], [scale(A[1][0], -1), A[0][0]]];
const quadratic = (w, B) => {
  let s = C(0);
  for (let i = 0; i < 2; i += 1) for (let j = 0; j < 2; j += 1) s = add(s, mul(conj(w[i]), mul(B[i][j], w[j])));
  return s;
};
const build = (A, w, c) => [
  [A[0][0], A[0][1], w[0]],
  [A[1][0], A[1][1], w[1]],
  [conj(w[0]), conj(w[1]), C(c)]
];

const A = [
  [C(2.2), C(0.7, 0.9)],
  [C(0.7, -0.9), C(1.6)]
];
const w = [C(0.4, -0.2), C(-0.3, 0.5)];
const c = 3.7;
const detA = det2(A);
const linkTerm = quadratic(w, adj2(A));
const exact = sub(scale(detA, c), linkTerm);
assert(near(det3(build(A, w, c)), exact));
assert(Math.abs(exact.im) < 1e-10);

// Directional residue along the discarded idempotent e_33.
const Azero = build(A, [C(0), C(0)], 0);
for (const t of [0.1, 0.7, 2.4]) {
  const At = build(A, [C(0), C(0)], t);
  const derivative = scale(sub(det3(At), det3(Azero)), 1 / t);
  assert(near(derivative, detA));
}

// Heavy-face normalized cubic and inverse-gap defect.
const gaps = [5, 10, 20, 40, 80];
const convergence = gaps.map((Delta) => {
  const normalized = scale(det3(build(A, w, Delta)), 1 / Delta);
  const defect = sub(normalized, detA);
  const predicted = scale(linkTerm, -1 / Delta);
  assert(near(defect, predicted));
  return { Delta, normalized: normalized.re, defect: defect.re, scaledDefect: Delta * defect.re };
});
for (let i = 1; i < convergence.length; i += 1) assert(Math.abs(convergence[i].defect) < Math.abs(convergence[i - 1].defect));

// Real-slice determinant defect inside H_2(C).
const Areal = [
  [A[0][0], C(A[0][1].re)],
  [C(A[1][0].re), A[1][1]]
];
const detReal = det2(Areal);
const imaginaryRelationshipSquared = A[0][1].im ** 2;
assert(Math.abs((detReal.re - detA.re) - imaginaryRelationshipSquared) < 1e-12);

// Lorentz-coordinate forms for H_2(C) and its H_2(R) slice.
const t = 2.4, x = 0.6, y = -0.8, z = 0.5;
const lorentzA = [[C(t + z), C(x, y)], [C(x, -y), C(t - z)]];
assert(Math.abs(det2(lorentzA).re - (t * t - x * x - y * y - z * z)) < 1e-12);
const lorentzReal = [[C(t + z), C(x)], [C(x), C(t - z)]];
assert(Math.abs(det2(lorentzReal).re - (t * t - x * x - z * z)) < 1e-12);

console.log(JSON.stringify({
  protocol: "jordan-cubic-peirce-residue-descends-to-h2-determinant/1",
  blockIdentity: "det([[A,w],[w^dagger,c]])=c det(A)-w^dagger adj(A) w",
  polarizedResidue: "D_{e33} det on the embedded rank-two corner equals det(A)",
  heavyFaceLimit: "det(X_Delta)/Delta=det(A)-w^dagger adj(A)w/Delta",
  convergence,
  realSliceDefect: "det(Re_slice A)-det(A)=(Im A12)^2",
  h2cQuadraticSignature: "(1,3)",
  h2rQuadraticSignature: "(1,2)",
  interpretation: "the rank-three cubic descends by polarization to the rank-two Lorentz determinant; topology realification then removes one spacelike coordinate but does not preserve determinant",
  passed: true
}, null, 2));
