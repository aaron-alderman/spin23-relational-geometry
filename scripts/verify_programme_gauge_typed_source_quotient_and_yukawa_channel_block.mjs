import assert from "node:assert/strict";

const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const mv = (A, x) => A.map((r) => dot(r, x));
const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const rank = (input, eps = 1e-10) => {
  const A = input.map((r) => r.slice());
  let k = 0;
  for (let j = 0; j < A[0].length && k < A.length; j++) {
    let p = k;
    for (let i = k + 1; i < A.length; i++) if (Math.abs(A[i][j]) > Math.abs(A[p][j])) p = i;
    if (Math.abs(A[p][j]) < eps) continue;
    [A[k], A[p]] = [A[p], A[k]];
    const q = A[k][j];
    for (let c = j; c < A[0].length; c++) A[k][c] /= q;
    for (let i = 0; i < A.length; i++) if (i !== k) {
      const f = A[i][j];
      for (let c = j; c < A[0].length; c++) A[i][c] -= f * A[k][c];
    }
    k++;
  }
  return k;
};
const close = (a, b, eps = 1e-10) => Math.abs(a - b) < eps;

// Fifteen-state gauge-active basis (Q,u^c,d^c,L,e^c,H).  The additional
// hypercharge EOM representative is redundant with the hypercharge row.
const V15 = [
  [1, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, -1],
  [0, 0, 0, 1, 1, -1],
];
const D15inv = [1 / 6, 1 / 3, 1 / 3, 1 / 2, 1, 1];
const Y15 = [1, -4, 2, -3, 6, 3];
assert.equal(rank(V15), 3);
assert.deepEqual(mv(V15, Y15), [0, 0, 0]);

const channelMetric = (V, Dinv) => V.map((ri) => V.map((rj) =>
  ri.reduce((s, x, k) => s + x * Dinv[k] * rj[k], 0)));
const M15 = channelMetric(V15, D15inv);
const expectedM15 = [
  [3 / 2, -5 / 6, -1],
  [-5 / 6, 3 / 2, 1],
  [-1, 1, 5 / 2],
];
for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) assert(close(M15[i][j], expectedM15[i][j]));
// Exact eigenvectors/eigenvalues: (u+d), and two vectors in span(u-d,e).
assert(mv(M15, [1, 1, 0]).every((x, i) => close(x, (2 / 3) * [1, 1, 0][i])));
assert(close(rank(M15), 3));
assert(close(
  M15[0][0] + M15[1][1] + M15[2][2],
  2 / 3 + 1 + 23 / 6,
));

// Completed Dirac-neutrino phase basis (Q,u^c,d^c,L,e^c,nu^c,H).
const V = [
  [1, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, -1],
  [0, 0, 0, 1, 1, 0, -1],
  [0, 0, 0, 1, 0, 1, 1],
];
const Dinv = [1 / 6, 1 / 3, 1 / 3, 1 / 2, 1, 1, 1];
const Y = [1, -4, 2, -3, 6, 0, 3];
const B = [1, -1, -1, 0, 0, 0, 0];
const L = [0, 0, 0, 1, -1, -1, 0];
const BL3 = B.map((x, i) => x - 3 * L[i]);
for (const x of [Y, B, L]) assert.deepEqual(mv(V, x), [0, 0, 0, 0]);
assert.equal(rank(V), 4);

const M = channelMetric(V, Dinv);
const expectedM = [
  [3 / 2, -5 / 6, -1, 1],
  [-5 / 6, 3 / 2, 1, -1],
  [-1, 1, 5 / 2, -1 / 2],
  [1, -1, -1 / 2, 5 / 2],
];
for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) assert(close(M[i][j], expectedM[i][j]));
assert.equal(rank(M), 4);
// In the parity basis, eigenvalues are 2/3, 2, and (8 +/- sqrt(37))/3.
const expectedTrace = 2 / 3 + 2 + (8 + Math.sqrt(37)) / 3 + (8 - Math.sqrt(37)) / 3;
assert(close(M.reduce((s, r, i) => s + r[i], 0), expectedTrace));
assert(mv(M, [1, 1, 0, 0]).every((x, i) => close(x, (2 / 3) * [1, 1, 0, 0][i])));
assert(mv(M, [0, 0, 1, 1]).every((x, i) => close(x, 2 * [0, 0, 1, 1][i])));

// Every broken lift D^{-1}V^T z is automatically orthogonal in the free
// current metric to the complete Yukawa kernel, including hypercharge.  Hence
// quotienting the hypercharge EOM direction leaves M unchanged.
for (const kernelVector of [Y, B, L]) {
  for (const row of V) assert(close(dot(row, kernelVector), 0));
}

// Linear anomaly rows in the same declared normalization.
const A3 = [2, 1, 1, 0, 0, 0, 0];
const A2 = [3, 0, 0, 1, 0, 0, 0];
const AY2 = [6, 48, 12, 18, 36, 0, 0];
const Agrav = [6, 3, 3, 2, 1, 1, 0];
const linearCombination = (coeffs, rows) => rows[0].map((_, j) =>
  coeffs.reduce((s, c, i) => s + c * rows[i][j], 0));
assert.deepEqual(A3, linearCombination([1, 1, 0, 0], V));
assert.deepEqual(AY2, linearCombination([48, 12, 36, 0, -18], [...V, A2]));
assert.deepEqual(Agrav, linearCombination([3, 3, 1, 1], V));
const T = [...V, A2];
assert.equal(rank(T), 5);
for (const x of [Y, BL3]) assert(T.every((row) => close(dot(row, x), 0)));

// Incidence images in the exact five-coordinate contact/EOM quotient.
const lambdaD = [5, 5, 1, 1, 1, 0, 0];
const lambdaM = [5, 5, 1, 1, 3, 0, 0];
const image = (x) => [...mv(V, x), dot(A2, x)];
assert.deepEqual(image(lambdaD), [10, 6, 2, 1, 16]);
assert.deepEqual(image(lambdaM), [10, 6, 4, 1, 16]);
for (const x of [lambdaD, lambdaM]) {
  const z = image(x);
  // Common incidence relation: equal declared SU(3)^2 and SU(2)^2 anomaly
  // coefficients, A2 = A3 = v_u + v_d.  It is invariant under Y and B-L shear.
  assert.equal(z[4], z[0] + z[1]);
}
for (const k of [Y, BL3]) assert.deepEqual(image(k), [0, 0, 0, 0, 0]);

// Neither incidence breaking vector is an eigenvector of the exact shared-field
// channel metric; thus no multiplicative noncontact Yukawa block survives.
for (const v of [[10, 6, 2, 1], [10, 6, 4, 1]]) {
  const w = mv(M, v);
  const ratios = w.map((x, i) => x / v[i]);
  assert(ratios.some((x) => !close(x, ratios[0])));
}

console.log("PASS gauge-typed source quotient and Yukawa channel block");
console.log("fifteen_state_basis=(five fermion phases,H,hypercharge-EOM); charged_channel_eigenvalues=(2/3,1,23/6)");
console.log("completed_phase_basis=(six fermion phases,H); hypercharge-EOM quotient dimension=6");
console.log("completed_yukawa_channel_metric=" + JSON.stringify(M));
console.log("completed_channel_eigenvalues=(2/3,2,(8-sqrt(37))/3,(8+sqrt(37))/3)");
console.log("combined_Yukawa_plus_anomaly_rank=5; kernel=span(6Y,3(B-L))");
console.log("independent_anomaly_coordinate=2SU(2)^2-X; other_linear_anomalies_reduce_to Yukawa rows plus it");
console.log("incidence_images=dedup(10,6,2,1;16),multiplicity(10,6,4,1;16)");
console.log("common_non_generic_relation=A2=A3=v_u+v_d; not_a_Yukawa_channel_eigenray=true");

