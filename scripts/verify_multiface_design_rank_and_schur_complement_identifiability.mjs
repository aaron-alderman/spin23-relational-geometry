import assert from "node:assert/strict";

const baseInformation = 0.12982650378676153;

function fisher(rows, exposures) {
  const p = rows[0].length;
  const out = Array.from({ length: p }, () => Array(p).fill(0));
  for (let m = 0; m < rows.length; m += 1) {
    for (let i = 0; i < p; i += 1) {
      for (let j = 0; j < p; j += 1) {
        out[i][j] += baseInformation * exposures[m] * rows[m][i] * rows[m][j];
      }
    }
  }
  return out;
}

function inverse2(A) {
  const det = A[0][0] * A[1][1] - A[0][1] * A[1][0];
  return {
    det,
    value: [[A[1][1] / det, -A[0][1] / det], [-A[1][0] / det, A[0][0] / det]]
  };
}

function efficientInfo(F) {
  const raw = F[0][0];
  const v = [F[0][1], F[0][2]];
  const G = [[F[1][1], F[1][2]], [F[2][1], F[2][2]]];
  const inv = inverse2(G);
  const projected = v[0] * (inv.value[0][0] * v[0] + inv.value[0][1] * v[1]) +
    v[1] * (inv.value[1][0] * v[0] + inv.value[1][1] * v[1]);
  return { raw, nuisanceDeterminant: inv.det, efficient: raw - projected };
}

function det3(A) {
  return A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) -
    A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) +
    A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);
}

const rows = [
  [1, 1, 1],
  [1, -1, 1],
  [1, 0, -2]
];
const balancedFisher = fisher(rows, [1, 1, 1]);
const balanced = efficientInfo(balancedFisher);
const imbalancedFisher = fisher(rows, [3, 1, 0.4]);
const imbalanced = efficientInfo(imbalancedFisher);
const twoFaceFisher = fisher(rows.slice(0, 2), [1, 1]);
const twoFaceDeterminant = det3(twoFaceFisher);

assert.ok(Math.abs(balancedFisher[0][1]) < 1e-14);
assert.ok(Math.abs(balancedFisher[0][2]) < 1e-14);
assert.ok(Math.abs(balanced.efficient - 3 * baseInformation) < 1e-14);
assert.ok(det3(balancedFisher) > 0);
assert.ok(imbalanced.efficient > 0 && imbalanced.efficient < imbalanced.raw);
assert.ok(Math.abs(twoFaceDeterminant) < 1e-14);

console.log(JSON.stringify({
  protocol: "multiface-design-rank-and-schur/1",
  coefficientRows: rows,
  parameterOrder: ["CP", "nuisance_1", "nuisance_2"],
  balanced: {
    fisher: balancedFisher,
    determinant: det3(balancedFisher),
    ...balanced,
    retainedFraction: balanced.efficient / balanced.raw
  },
  imbalanced: {
    exposures: [3, 1, 0.4],
    fisher: imbalancedFisher,
    determinant: det3(imbalancedFisher),
    ...imbalanced,
    retainedFraction: imbalanced.efficient / imbalanced.raw
  },
  twoFaceDeterminant,
  theorem: "For common shape g and coefficient matrix A=[c N], F=I_g A^T W A. CP is identifiable after profiling exactly when c is not in col(N) under positive-exposure restriction; I_eff=I_g c^T W(I-P_N^W)c.",
  minimumFaceBoundary: "With k independent nuisance columns spanning the active face space, at least k+1 suitably oriented faces are required for a nonzero nuisance-orthogonal CP direction.",
  physicalBoundary: "Score shapes need not share one g in reality; then A is an operator into the direct sum of channel Hilbert spaces and the same range criterion replaces finite matrix rank.",
  passed: true
}, null, 2));
