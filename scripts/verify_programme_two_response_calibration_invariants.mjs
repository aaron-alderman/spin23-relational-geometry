import assert from "node:assert/strict";

const mul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const tr = (A) => A[0][0] + A[1][1];
const det = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const transpose = (A) => [[A[0][0], A[1][0]], [A[0][1], A[1][1]]];
const inv = (A) => {
  const d = det(A);
  return [[A[1][1] / d, -A[0][1] / d], [-A[1][0] / d, A[0][0] / d]];
};
const add = (A, B, s = 1) => A.map((r, i) => r.map((x, j) => x + s * B[i][j]));
const close = (a, b, eps = 1e-10) => Math.abs(a - b) <= eps * (1 + Math.abs(a) + Math.abs(b));
const cong = (M, R) => mul(mul(M, R), transpose(M));
const invariants = (R0, R1) => {
  const X = mul(inv(R0), R1);
  return [tr(X), det(X)];
};

const R0 = [[3.0, 0.7], [0.7, 1.5]];
const R1 = [[1.8, -0.2], [-0.2, 2.4]];
const R2 = [[2.2, 0.9], [0.9, 2.8]];
const calibrations = [
  [[2, -0.4], [0, 0.7]],
  [[0.5, 1.3], [-0.2, 1.1]],
  [[-1, 0.3], [0.4, 1.7]],
];

for (const R of [R0, R1, R2]) assert(R[0][0] > 0 && det(R) > 0);
const base = invariants(R0, R1);
for (const M of calibrations) {
  assert(!close(det(M), 0));
  const got = invariants(cong(M, R0), cong(M, R1));
  assert(close(got[0], base[0]));
  assert(close(got[1], base[1]));
}

// Direct 2x2 positive square root/inverse square root via spectral formula.
function sqrtSPD(A) {
  const s = Math.sqrt(det(A));
  const denom = Math.sqrt(tr(A) + 2 * s);
  return [[(A[0][0] + s) / denom, A[0][1] / denom], [A[1][0] / denom, (A[1][1] + s) / denom]];
}
const root0 = sqrtSPD(R0);
const invRoot0 = inv(root0);
assert(close(mul(root0, root0)[0][0], R0[0][0]));
const A = mul(mul(invRoot0, R1), invRoot0);
const B = mul(mul(invRoot0, R2), invRoot0);
const comm = add(mul(A, B), mul(B, A), -1);
const noncommutativity = -0.5 * tr(mul(comm, comm));
assert(noncommutativity >= -1e-12);

// Reflection preserves the magnitude and reverses the sole off-diagonal
// antisymmetric component, demonstrating the remaining orientation bit.
const reflection = [[1, 0], [0, -1]];
const Ar = cong(reflection, A);
const Br = cong(reflection, B);
const commR = add(mul(Ar, Br), mul(Br, Ar), -1);
const noncommutativityR = -0.5 * tr(mul(commR, commR));
assert(close(noncommutativityR, noncommutativity));
assert(close(commR[0][1], -comm[0][1]));

console.log("PASS two-response calibration invariants");
console.log(`I1=${base[0].toFixed(12)}`);
console.log(`I2=${base[1].toFixed(12)}`);
console.log(`three_response_noncommutativity=${noncommutativity.toFixed(12)}`);
console.log("orientation_sign_from_unoriented_tomography=false");
