import assert from "node:assert/strict";

const n = 6;
const zero = () => Array.from({ length: n }, () => Array(n).fill(0));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const sub = (A, B) => A.map((row, i) => row.map((x, j) => x - B[i][j]));
const scale = (a, A) => A.map(row => row.map(x => a * x));
const mul = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const outer = v => v.map(x => v.map(y => x * y));
const norm2 = v => Math.sqrt(v.reduce((s, x) => s + x * x, 0));
const normalize = v => { const d = norm2(v); return v.map(x => x / d); };

const K = zero();
[0, 1, 3, 4].forEach(i => { K[i][i] = 1; });
const S = zero();
for (let i = 0; i < 3; i += 1) { S[i][i + 3] = 1; S[i + 3][i] = 1; }
const Z = zero();
for (let i = 0; i < 3; i += 1) { Z[i][i] = 1; Z[i + 3][i + 3] = -1; }
const conjugateBy = (U, A) => mul(mul(U, A), transpose(U));
const dephase = (A, coherence) => add(scale((1 + coherence) / 2, A), scale((1 - coherence) / 2, conjugateBy(Z, A)));
const exchange = (A, bias) => add(scale((1 + bias) / 2, A), scale((1 - bias) / 2, conjugateBy(S, A)));
const ideal = rho => exchange(dephase(mul(mul(K, rho), K), 0), 0);
const approximate = (rho, coherence, bias) => exchange(dephase(rho, coherence), bias);

function jacobiEigenvalues(A, tolerance = 1e-13, maxIterations = 10000) {
  const M = A.map(row => [...row]);
  for (let iter = 0; iter < maxIterations; iter += 1) {
    let p = 0; let q = 1; let best = 0;
    for (let i = 0; i < n; i += 1) for (let j = i + 1; j < n; j += 1) {
      if (Math.abs(M[i][j]) > best) { best = Math.abs(M[i][j]); p = i; q = j; }
    }
    if (best < tolerance) return M.map((row, i) => row[i]);
    const theta = 0.5 * Math.atan2(2 * M[p][q], M[q][q] - M[p][p]);
    const c = Math.cos(theta); const s = Math.sin(theta);
    for (let k = 0; k < n; k += 1) if (k !== p && k !== q) {
      const mkp = M[k][p]; const mkq = M[k][q];
      M[k][p] = M[p][k] = c * mkp - s * mkq;
      M[k][q] = M[q][k] = s * mkp + c * mkq;
    }
    const app = M[p][p]; const aqq = M[q][q]; const apq = M[p][q];
    M[p][p] = c * c * app - 2 * s * c * apq + s * s * aqq;
    M[q][q] = s * s * app + 2 * s * c * apq + c * c * aqq;
    M[p][q] = M[q][p] = 0;
  }
  throw new Error("Jacobi iteration did not converge");
}
const traceNormSymmetric = A => jacobiEigenvalues(A).reduce((s, x) => s + Math.abs(x), 0);

const selected = normalize([0.6, -0.2, 0, 0.5, 0.4, 0]);
const leaked = normalize([0, 0, 0.8, 0, 0, -0.6]);
const coupling = 0.7;
const energy = 1.2;
const coherence = 0.08;
const exchangeBias = 0.05;
const gaps = [5, 10, 20, 40, 80, 160];

const checks = gaps.map(gap => {
  const amplitudeBound = coupling / (gap - energy);
  const leakage = Math.min(0.49, amplitudeBound ** 2);
  const state = selected.map((x, i) => Math.sqrt(1 - leakage) * x + Math.sqrt(leakage) * leaked[i]);
  const rho = outer(state);
  const actualError = traceNormSymmetric(sub(approximate(rho, coherence, exchangeBias), ideal(rho)));
  const gentleBound = 2 * Math.sqrt(leakage);
  const totalBound = gentleBound + Math.abs(coherence) + Math.abs(exchangeBias);
  assert.ok(actualError <= totalBound + 1e-10);
  return { gap, leakage, actualTraceNormError: actualError, gentleLeakageBound: gentleBound, totalBound };
});

for (let i = 1; i < checks.length; i += 1) assert.ok(checks[i].actualTraceNormError <= checks[i - 1].actualTraceNormError + 1e-10);

console.log(JSON.stringify({
  protocol: "finite-gap-exchange-superselection-error-budget/1",
  model: "doubled topology C^2 tensor three-face carrier C^3",
  heavyAmplitudeBound: "sqrt(ell) <= ||w||/(Delta-E)",
  selectorParameters: { coupling, energy, residualTopologyCoherence: coherence, exchangeTwirlBias: exchangeBias },
  traceNormBound: "||Phi_approx(rho)-Phi_ideal(rho)||_1 <= 2 sqrt(ell) + |c| + |epsilon|",
  checks,
  observableBound: "For ||O||_infinity<=1, the expectation-value error is at most the displayed trace-norm bound.",
  asymptoticFloor: Math.abs(coherence) + Math.abs(exchangeBias),
  interpretation: "Increasing the heavy gap removes Peirce leakage but cannot remove topology-coherence or exchange-calibration errors; those form an independent floor.",
  physicalBoundary: "The leakage estimate assumes an isolated low-energy eigenstate away from the heavy pole; continua and radiative mixing require resolvent or spectral-projector bounds.",
  passed: true
}, null, 2));
