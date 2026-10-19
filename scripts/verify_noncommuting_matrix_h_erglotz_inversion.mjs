import assert from "node:assert/strict";

// Original response:
// F(z)=z I + R_- /(-1-z) + R_+ /(1-z),
// R_-=[[1,0],[0,0]], R_+=[[1,1],[1,1]].
// The residues are positive rank one and do not commute.
const Rminus = [[1, 0], [0, 0]];
const Rplus = [[1, 1], [1, 1]];
const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const sub = (A, B) => A.map((row, i) => row.map((x, j) => x - B[i][j]));
const maxAbs = (A) => Math.max(...A.flat().map(Math.abs));
assert(maxAbs(sub(mul(Rminus, Rplus), mul(Rplus, Rminus))) > 0);

const Q = (z) => z ** 4 - 4 * z ** 2 - z + 1;
const Qprime = (z) => 4 * z ** 3 - 8 * z - 1;
const bisect = (lo, hi) => {
  let a = lo, b = hi, fa = Q(a);
  assert(fa * Q(b) < 0);
  for (let k = 0; k < 100; k += 1) {
    const m = (a + b) / 2;
    const fm = Q(m);
    if (fa * fm <= 0) b = m;
    else { a = m; fa = fm; }
  }
  return (a + b) / 2;
};
const roots = [[-2, -1], [-1, 0], [0, 0.5], [2, 3]].map(([a, b]) => bisect(a, b));
assert(roots.every((r) => Math.abs(Q(r)) < 1e-12));

const N = (z) => [[3 * z - z ** 3, z + 1], [z + 1, 1 + 2 * z - z ** 3]];
const adj = (A) => [[A[1][1], -A[0][1]], [-A[1][0], A[0][0]]];
const det2 = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const residues = roots.map((r) => {
  const A = adj(N(r)).map((row) => row.map((x) => -x / Qprime(r)));
  const trace = A[0][0] + A[1][1];
  const determinant = det2(A);
  assert(trace > 0);
  assert(Math.abs(determinant) < 1e-9);
  assert(A[0][0] >= -1e-10 && A[1][1] >= -1e-10);
  return { pole: r, residue: A, trace, determinant };
});

// The closed-form dual is H(z)=adj N(z)/Q(z). Its determinant is
// (z^2-1)/Q(z), so the original poles +/-1 become rank-loss zeros of H.
const dualDeterminant = (z) => (z * z - 1) / Q(z);
assert(Math.abs(dualDeterminant(1)) < 1e-12);
assert(Math.abs(dualDeterminant(-1)) < 1e-12);

// Verify the sum of dual residue matrices is I, as required by H(z)~-I/z.
const residueSum = residues.reduce((S, { residue: R }) => S.map((row, i) => row.map((x, j) => x + R[i][j])), [[0, 0], [0, 0]]);
assert(maxAbs(sub(residueSum, [[1, 0], [0, 1]])) < 1e-9);

console.log(JSON.stringify({
  protocol: "noncommuting-matrix-herglotz-inversion/1",
  original: {
    response: "F(z)=z I+R_- /(-1-z)+R_+ /(1-z)",
    poles: [-1, 1],
    residues: [Rminus, Rplus],
    residuesNoncommute: true,
    uv: "F(z)~z I",
  },
  determinantNumeratorAfterCancellation: "Q(z)=z^4-4z^2-z+1",
  dual: {
    response: "H(z)=-F(z)^-1=adj N(z)/Q(z)",
    polesAndPositiveRankOneResidues: residues,
    determinantZerosAtOriginalPoles: [-1, 1],
    sumOfResidues: residueSum,
    uv: "H(z)~-I/z",
  },
  conclusion: "Inverting a genuinely noncommuting two-source Herglotz response converts two original rank-one poles plus UV slope into four real positive rank-one dual poles. Original poles become determinant zeros, and dual eigenchannels are new mixtures. The full fractional action is concretely spectrum generating.",
  passed: true,
}, null, 2));
