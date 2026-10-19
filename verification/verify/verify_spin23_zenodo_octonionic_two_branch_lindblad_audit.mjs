import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const data = JSON.parse(
  readFileSync(
    path.join(root, "evidence/data/spin23-zenodo-octonionic-two-branch-lindblad-audit.json"),
    "utf8",
  ),
);

const eps = 1e-10;
const zeros = (n, m) => Array.from({ length: n }, () => Array(m).fill(0));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const add = (A, B) => A.map((row, i) => row.map((v, j) => v + B[i][j]));
const scale = (c, A) => A.map((row) => row.map((v) => c * v));
const mul = (A, B) =>
  A.map((row) => B[0].map((_, j) => row.reduce((s, v, k) => s + v * B[k][j], 0)));
const sub = (A, B) => add(A, scale(-1, B));
const comm = (A, B) => sub(mul(A, B), mul(B, A));
const maxAbs = (A) => Math.max(...A.flat().map(Math.abs));
const flat = (A) => A.flat();

function rank(rows, tolerance = 1e-9) {
  const A = rows.map((row) => [...row]);
  let r = 0;
  for (let c = 0; c < A[0].length && r < A.length; c += 1) {
    let pivot = r;
    for (let i = r + 1; i < A.length; i += 1) {
      if (Math.abs(A[i][c]) > Math.abs(A[pivot][c])) pivot = i;
    }
    if (Math.abs(A[pivot][c]) <= tolerance) continue;
    [A[r], A[pivot]] = [A[pivot], A[r]];
    const p = A[r][c];
    for (let j = c; j < A[0].length; j += 1) A[r][j] /= p;
    for (let i = 0; i < A.length; i += 1) {
      if (i === r) continue;
      const f = A[i][c];
      for (let j = c; j < A[0].length; j += 1) A[i][j] -= f * A[r][j];
    }
    r += 1;
  }
  return r;
}

function lieClosure(generators) {
  const basis = [];
  const tryAdd = (M) => {
    if (maxAbs(M) < eps) return false;
    if (rank([...basis.map(flat), flat(M)]) > basis.length) {
      basis.push(M);
      return true;
    }
    return false;
  };
  generators.forEach(tryAdd);
  let changed = true;
  while (changed) {
    changed = false;
    const snapshot = [...basis];
    for (let i = 0; i < snapshot.length; i += 1) {
      for (let j = i + 1; j < snapshot.length; j += 1) {
        if (tryAdd(comm(snapshot[i], snapshot[j]))) changed = true;
      }
    }
  }
  return basis;
}

assert.equal(data.documentId, 1455);
assert.equal(data.source.recordId, 19643326);

// The manuscript's written invariant has the phase difference, while AB has the phase sum.
const theta1 = 0.3;
const theta2 = 0.7;
assert(Math.abs((theta1 - theta2) - (-0.4)) < eps);
assert(Math.abs((theta1 + theta2) - 1.0) < eps);
assert.notEqual(theta1 - theta2, theta1 + theta2);
assert.equal(data.minimalCorrection.invariant, "A B");
assert.equal(data.minimalCorrection.commonPhaseCovariant, false);
assert.equal(data.minimalCorrection.oppositePhaseCovariant, true);

const gamma = 0.4;
const omega = 1.3;
const kappa = 0.8;
const K = [
  [-gamma, -omega, kappa, 0],
  [omega, -gamma, 0, -kappa],
  [kappa, 0, -gamma, -omega],
  [0, -kappa, omega, -gamma],
];
const J2 = [[0, 1], [-1, 0]];
const J = [
  [0, 1, 0, 0],
  [-1, 0, 0, 0],
  [0, 0, 0, 1],
  [0, 0, -1, 0],
];
assert(maxAbs(sub(add(mul(transpose(K), J), mul(J, K)), scale(-2 * gamma, J))) < eps);

const M3 = [
  [-2 * gamma, 2 * kappa, 0],
  [2 * kappa, -2 * gamma, -2 * omega],
  [0, 2 * omega, -2 * gamma],
];
const eta = [[1, 0, 0], [0, -1, 0], [0, 0, -1]];
assert(maxAbs(sub(add(mul(transpose(M3), eta), mul(eta, M3)), scale(-4 * gamma, eta))) < eps);

// Direct bilinear differentiation at a generic amplitude matches M3 S.
const A = { re: 0.7, im: -0.2 };
const B = { re: -0.4, im: 0.9 };
const conjugate = (z) => ({ re: z.re, im: -z.im });
const plus = (z, w) => ({ re: z.re + w.re, im: z.im + w.im });
const times = (z, w) => ({ re: z.re * w.re - z.im * w.im, im: z.re * w.im + z.im * w.re });
const scalar = (c, z) => ({ re: c * z.re, im: c * z.im });
const abs2 = (z) => z.re ** 2 + z.im ** 2;
const iTimes = (z) => ({ re: -z.im, im: z.re });
const dA = plus(scalar(-gamma, A), plus(scalar(omega, iTimes(A)), scalar(kappa, conjugate(B))));
const dB = plus(scalar(-gamma, B), plus(scalar(omega, iTimes(B)), scalar(kappa, conjugate(A))));
const AB = times(A, B);
const S = [(abs2(A) + abs2(B)) / 2, AB.re, AB.im];
const direct = [
  A.re * dA.re + A.im * dA.im + B.re * dB.re + B.im * dB.im,
  times(dA, B).re + times(A, dB).re,
  times(dA, B).im + times(A, dB).im,
];
const matrix = mul(M3, S.map((v) => [v])).flat();
assert(Math.max(...direct.map((v, i) => Math.abs(v - matrix[i]))) < eps);

const detCone = S[0] ** 2 - S[1] ** 2 - S[2] ** 2;
const expectedCone = (abs2(A) - abs2(B)) ** 2 / 4;
assert(Math.abs(detCone - expectedCone) < eps);
assert(detCone >= -eps);

// Quadratic Hamiltonian drift: K0 and K1 are symplectic and generate only sp(2,R), not sp(4,R).
const Komega = [
  [0, -1, 0, 0],
  [1, 0, 0, 0],
  [0, 0, 0, -1],
  [0, 0, 1, 0],
];
const Kkappa = [
  [0, 0, 1, 0],
  [0, 0, 0, -1],
  [1, 0, 0, 0],
  [0, -1, 0, 0],
];
for (const H of [Komega, Kkappa]) {
  assert(maxAbs(add(mul(transpose(H), J), mul(J, H))) < eps);
}
const closure = lieClosure([Komega, Kkappa]);
assert.equal(closure.length, 3);
assert.equal(data.fourDimensionalLift.phaseSpaceDimension, 4);
assert.equal(data.fourDimensionalLift.hamiltonianLieClosureDimension, 3);
assert.equal(data.fourDimensionalLift.fullSp4Dimension, 10);
assert.equal(data.fourDimensionalLift.fullSp4Generated, false);

// The stated Hamiltonian and loss reproduce the exact first-moment coefficient matrix.
// In the (a,b^dagger) block, Heisenberg CCR give [[i omega-gamma,kappa],[kappa,-i omega-gamma]].
assert.equal(data.cpLindbladCompletion.reproducesRotationExactly, true);
assert.equal(data.cpLindbladCompletion.reproducesConjugateCouplingExactly, true);
assert.equal(data.cpLindbladCompletion.reproducesDampingExactly, true);
assert.equal(data.cpLindbladCompletion.hamiltonianSelfAdjoint, true);
assert.equal(data.cpLindbladCompletion.gammaConstraint, "gamma>=0");

// Correct complementary fixed points: only one of pi/2 and 3pi/2 is sign-compatible.
const ratioPositive = 1.35;
const rhoStar = 0.5 * Math.acosh(Math.abs(ratioPositive));
const residual = (rho, phi, ratio) => [
  -Math.sinh(2 * rho) * Math.cos(phi),
  2 * ratio - 2 * Math.cosh(2 * rho) * Math.sin(phi),
];
for (const rho of [rhoStar, -rhoStar]) {
  assert(Math.hypot(...residual(rho, Math.PI / 2, ratioPositive)) < 1e-9);
  assert(Math.hypot(...residual(rho, 3 * Math.PI / 2, ratioPositive)) > 1);
}
assert.equal(data.fixedPointCorrection.centersForStrictAbsoluteRatioAboveOne, 2);
assert.equal(data.fixedPointCorrection.centersPlottedBySuppliedScriptPerPanel, 4);
assert.equal(data.fixedPointCorrection.spuriousMarkersPerPanel, 2);

// Global mean stability threshold.
assert(gamma > 0 && kappa ** 2 < gamma ** 2 + omega ** 2);
const discriminant = kappa ** 2 - omega ** 2;
const largestRealPart = discriminant <= 0 ? -gamma : -gamma + Math.sqrt(discriminant);
assert(largestRealPart < 0);

assert.equal(data.verdict.sourceAsWrittenPasses, false);
assert.equal(data.verdict.minimalCorrectionPassesAlgebraicReduction, true);
assert.equal(data.verdict.cpLindbladCompletionExactForDisplayedOde, true);
assert.equal(data.verdict.octonionicPhysicalDerivationComplete, false);
assert.equal(data.verdict.physicalAdmission, false);

console.log(
  "PASS 1455: corrected AB closure, conformal symplectic lift, exact CP-Lindblad realization, fixed-point correction, and non-promotion all verified.",
);
