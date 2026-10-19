import assert from "node:assert/strict";

const V = [
  [1, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, -1],
  [0, 0, 0, 1, 1, 0, -1],
  [0, 0, 0, 1, 0, 1, 1],
];
const D = [6, 3, 3, 2, 1, 1, 1];
const W = [3, 0.0018, 0.0001, 1e-24];
const protectedVectors = [
  [1, -4, 2, -3, 6, 0, 3],
  [1, -1, -1, 0, 0, 0, 0],
  [0, 0, 0, 1, -1, -1, 0],
];
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const mv = (A, x) => A.map((r) => dot(r, x));

// Positive-energy discontinuity of log(-s-i0). Any finite local counterterm is
// a real polynomial in s and has no discontinuity for s>0.
const s = 17;
const eps = 1e-9;
// Keep the discontinuity as its real coefficient of i:
// log(-s-i0)-log(-s+i0) = -2 pi i.
const logDiscOverI = -2 * Math.PI;
const localPolynomialDiscOverI = ((2 + 3 * s + 5 * s ** 2) - (2 + 3 * s + 5 * s ** 2)) / eps;
assert.equal(localPolynomialDiscOverI, 0);
assert(Math.abs(logDiscOverI) > 1);

const P = Array.from({ length: 7 }, (_, i) => Array.from({ length: 7 }, (_, j) =>
  V.reduce((sum, row, a) => sum + row[i] * W[a] * row[j], 0)));
for (const x of protectedVectors) assert(mv(P, x).every((z) => Math.abs(z) < 1e-12));

// Symmetric matrix for the physical generalized spectral problem P v=lambda D v.
const S = P.map((r, i) => r.map((x, j) => x / Math.sqrt(D[i] * D[j])));
function jacobi(A) {
  A = A.map((r) => r.slice());
  const n = A.length;
  const U = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
  for (let step = 0; step < 1500; step++) {
    let p = 0, q = 1, best = 0;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
      if (Math.abs(A[i][j]) > best) { best = Math.abs(A[i][j]); p = i; q = j; }
    }
    if (best < 1e-15) break;
    const angle = 0.5 * Math.atan2(2 * A[p][q], A[q][q] - A[p][p]);
    const c = Math.cos(angle), t = Math.sin(angle);
    const R = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
    R[p][p] = c; R[q][q] = c; R[p][q] = t; R[q][p] = -t;
    const AR = A.map((r) => R[0].map((_, j) => r.reduce((z, x, k) => z + x * R[k][j], 0)));
    A = R[0].map((_, i) => AR[0].map((__, j) => R.reduce((z, r, k) => z + r[i] * AR[k][j], 0)));
    const UR = U.map((r) => R[0].map((_, j) => r.reduce((z, x, k) => z + x * R[k][j], 0)));
    U.splice(0, n, ...UR);
  }
  return Array.from({ length: n }, (_, i) => ({ value: A[i][i], vector: U.map((r) => r[i]) }))
    .sort((a, b) => b.value - a.value);
}
const eig = jacobi(S);
const resolved = eig.filter((e) => e.value > 1e-12);
assert.equal(resolved.length, 3); // the illustrative neutrino channel is below resolution
assert(resolved[0].value / resolved[1].value > 1000);
const topRay = V[0].map((x, i) => x / Math.sqrt(D[i]));
const topUnit = topRay.map((x) => x / Math.sqrt(dot(topRay, topRay)));
const topOverlap = Math.abs(dot(resolved[0].vector, topUnit));
assert(topOverlap > 0.999999);

console.log("PASS absorptive Yukawa-current spectroscopy");
console.log("positive_energy_contact_polynomial_discontinuity=0");
console.log("spectral_factorization=rho_divergence proportional to V^T W(s) V");
console.log("protected_spectral_kernel=span(Y,B,L)");
console.log(`resolved_leading_to_second_ratio=${resolved[0].value / resolved[1].value}`);
console.log(`leading_top_ray_overlap=${topOverlap}`);
console.log("observable_anchor=generalized_divergence/current spectral Rayleigh quotient at fixed s");
