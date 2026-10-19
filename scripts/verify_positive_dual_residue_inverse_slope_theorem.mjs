import assert from "node:assert/strict";

const Rminus = [[1, 0], [0, 0]];
const Rplus = [[1, 1], [1, 1]];
const Q = (z) => z ** 4 - 4 * z ** 2 - z + 1;
const Qprime = (z) => 4 * z ** 3 - 8 * z - 1;
const bisect = (lo, hi) => {
  let a = lo, b = hi, fa = Q(a);
  for (let k = 0; k < 100; k += 1) {
    const m = (a + b) / 2, fm = Q(m);
    if (fa * fm <= 0) b = m;
    else { a = m; fa = fm; }
  }
  return (a + b) / 2;
};
const roots = [[-2, -1], [-1, 0], [0, 0.5], [2, 3]].map(([a, b]) => bisect(a, b));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (c, A) => A.map((row) => row.map((x) => c * x));
const outer = (v) => v.map((x) => v.map((y) => x * y));
const maxAbs = (A) => Math.max(...A.flat().map(Math.abs));
const sub = (A, B) => A.map((row, i) => row.map((x, j) => x - B[i][j]));
const dot = (x, A, y) => x.reduce((s, xi, i) => s + xi * A[i].reduce((t, aij, j) => t + aij * y[j], 0), 0);
const F = (z) => add(scale(z, [[1, 0], [0, 1]]), add(scale(1 / (-1 - z), Rminus), scale(1 / (1 - z), Rplus)));
const Fprime = (z) => add([[1, 0], [0, 1]], add(scale(1 / (-1 - z) ** 2, Rminus), scale(1 / (1 - z) ** 2, Rplus)));
const N = (z) => [[3 * z - z ** 3, z + 1], [z + 1, 1 + 2 * z - z ** 3]];
const adj = (A) => [[A[1][1], -A[0][1]], [-A[1][0], A[0][0]]];

const checks = roots.map((r) => {
  const A = F(r);
  let v = [-A[0][1], A[0][0]];
  const norm = Math.hypot(...v);
  v = v.map((x) => x / norm);
  assert(Math.max(Math.abs(A[0][0] * v[0] + A[0][1] * v[1]), Math.abs(A[1][0] * v[0] + A[1][1] * v[1])) < 1e-8);
  const slope = dot(v, Fprime(r), v);
  assert(slope > 0);
  const predictedResidue = scale(1 / slope, outer(v));
  const exactResidue = scale(-1 / Qprime(r), adj(N(r)));
  assert(maxAbs(sub(predictedResidue, exactResidue)) < 1e-8);
  return { zero: r, normalizedNullVector: v, positiveEigenvalueSlope: slope, inverseSlope: 1 / slope, residue: exactResidue };
});

console.log(JSON.stringify({
  protocol: "positive-dual-residue-inverse-slope-theorem/1",
  theorem: "If F(r)v=0 is a simple real zero of a differentiable matrix Herglotz response and v^T F'(r)v>0, then -F(z)^-1 has residue R=vv^T/[v^T F'(r)v] in the convention R/(r-z), hence R is positive rank one.",
  monotonicity: "F'(x)=M+sum_j R_j/(s_j-x)^2 is positive definite between original poles when M>0 and R_j>=0",
  checks,
  interpretation: "Dual spectral weight is the inverse slope of the vanishing response eigenvalue. Sharper zero crossings carry smaller residues; flatter crossings carry larger collective-mode weight.",
  limitation: "This is a response-slope theorem. Calling the slope an Eisenbud-Wigner time delay requires a unitary scattering matrix and phase-shift dictionary not yet supplied.",
  passed: true,
}, null, 2));
