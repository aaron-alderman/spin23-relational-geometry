const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const C = (re, im = 0) => ({ re, im });
const add = (x, y) => C(x.re + y.re, x.im + y.im);
const mul = (x, y) => C(x.re * y.re - x.im * y.im, x.re * y.im + x.im * y.re);
const conj = (x) => C(x.re, -x.im);
const scale = (a, x) => C(a * x.re, a * x.im);
const abs = (x) => Math.hypot(x.re, x.im);
const phase = (x) => C(Math.cos(x), Math.sin(x));
const matMul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((q, x, k) => add(q, mul(x, B[k][j])), C(0))));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const dagger = (A) => A[0].map((_, j) => A.map((row) => conj(row[j])));
const diagonal = (xs) => xs.map((x, i) => xs.map((_, j) => C(i === j ? x : 0)));

const triangle = (F) => mul(
  mul(mul(F[0][1], F[1][2]), F[2][0]),
  mul(mul(conj(F[0][0]), conj(F[1][1])), conj(F[2][2])),
).im;

const rotation12 = (theta) => {
  const c = Math.cos(theta); const s = Math.sin(theta);
  return [[C(c), C(s), C(0)], [C(-s), C(c), C(0)], [C(0), C(0), C(1)]];
};
const rotation23 = (theta) => {
  const c = Math.cos(theta); const s = Math.sin(theta);
  return [[C(1), C(0), C(0)], [C(0), C(c), C(s)], [C(0), C(-s), C(c)]];
};
const rotation13 = (theta, delta) => {
  const c = Math.cos(theta); const s = Math.sin(theta);
  return [
    [C(c), C(0), scale(s, phase(-delta))],
    [C(0), C(1), C(0)],
    [scale(-s, phase(delta)), C(0), C(c)],
  ];
};
const MajoranaColumns = diagonal([1, 1, 1]);
MajoranaColumns[1][1] = phase(0.41 / 2);
MajoranaColumns[2][2] = phase(-0.87 / 2);
const U = matMul(
  matMul(matMul(rotation23(0.72), rotation13(0.19, 1.13)), rotation12(0.58)),
  MajoranaColumns,
);
const masses = [1, 2.3, 4.1];

const Mstar = matMul(matMul(U, diagonal(masses)), transpose(U));
const M = Mstar.map((row) => row.map(conj));
const IM = triangle(M);
assert(Math.abs(IM) > 1e-6, "checkpoint Majorana triangle must be nonzero");
assert(Math.abs(triangle(Mstar) + IM) < 1e-9, "complex conjugate mass kernel must reverse the triangle");

const kernel = (Q) => {
  const weights = masses.map((m) => -m / (Q * Q + m * m));
  return matMul(matMul(U, diagonal(weights)), transpose(U));
};
const rescaledKernel = (Q) => kernel(Q).map((row) => row.map((x) => scale(-Q * Q, x)));

const G10 = rescaledKernel(10);
const G100 = rescaledKernel(100);
const error10 = Math.abs(triangle(G10) + IM);
const error100 = Math.abs(triangle(G100) + IM);
assert(error100 < error10 / 50, "deep-Euclidean triangle must converge quadratically to the mass invariant");

// Charged-lepton row rephasings cancel from the closed six-amplitude loop.
const theta = [0.29, -0.43, 0.71];
const F = kernel(7);
const Frephased = F.map((row, a) => row.map((x, b) => mul(phase(theta[a] + theta[b]), x)));
assert(Math.abs(triangle(Frephased) - triangle(F)) < 1e-12, "LNV triangle must be charged-flavor rephasing invariant");

const Fcp = F.map((row) => row.map(conj));
assert(Math.abs(triangle(Fcp) + triangle(F)) < 1e-12, "CP-conjugate kernel must reverse the triangle orientation");

// Individual channel probabilities cannot retain the orientation sign.
for (let a = 0; a < 3; a += 1) {
  for (let b = 0; b < 3; b += 1) {
    assert(Math.abs(abs(F[a][b]) ** 2 - abs(Fcp[a][b]) ** 2) < 1e-12, "single-channel rates must be CP even");
  }
}

console.log("LNV Majorana-exchange triangle-kernel certificate: PASS");
console.log("F_ab(-Q^2)=sum_i U_ai U_bi m_i/(-Q^2-m_i^2)");
console.log("Q^12*I_F_to_-I_M_with_relative_O(m^2/Q^2)=true");
console.log("closed_triangle_rephasing_invariant=true; single_channel_rates_orientation_blind=true");
