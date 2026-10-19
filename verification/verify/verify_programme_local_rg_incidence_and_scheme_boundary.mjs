import assert from "node:assert/strict";

const V = [
  [1, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, -1],
  [0, 0, 0, 1, 1, 0, -1],
  [0, 0, 0, 1, 0, 1, 1],
];
const D = [6, 3, 3, 2, 1, 1, 1];
const W = [3, 0.0018, 0.0001, 1e-24];
const Y = [1, -4, 2, -3, 6, 0, 3];
const B = [1, -1, -1, 0, 0, 0, 0];
const L = [0, 0, 0, 1, -1, -1, 0];

const eye = (n) => Array.from({ length: n }, (_, i) =>
  Array.from({ length: n }, (_, j) => Number(i === j)));
const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const mul = (A, B) => A.map((r) => transpose(B).map((c) =>
  r.reduce((s, x, i) => s + x * c[i], 0)));
const mv = (A, x) => A.map((r) => r.reduce((s, a, i) => s + a * x[i], 0));
const sub = (A, B) => A.map((r, i) => r.map((x, j) => x - B[i][j]));
const maxAbs = (x) => Math.max(...x.flat(Infinity).map(Math.abs));
const tr = (A) => A.reduce((s, r, i) => s + r[i], 0);

function inverse(A) {
  const n = A.length;
  const M = A.map((r, i) => [...r, ...eye(n)[i]]);
  for (let j = 0; j < n; j++) {
    let p = j;
    for (let i = j + 1; i < n; i++) if (Math.abs(M[i][j]) > Math.abs(M[p][j])) p = i;
    assert(Math.abs(M[p][j]) > 1e-12);
    [M[j], M[p]] = [M[p], M[j]];
    const q = M[j][j];
    M[j] = M[j].map((x) => x / q);
    for (let i = 0; i < n; i++) if (i !== j) {
      const f = M[i][j];
      M[i] = M[i].map((x, k) => x - f * M[j][k]);
    }
  }
  return M.map((r) => r.slice(n));
}

// Local-RG/Yukawa-incidence representative: K = D^{-1} V^T W V.
const K = Array.from({ length: 7 }, (_, i) => Array.from({ length: 7 }, (_, j) =>
  V.reduce((s, row, a) => s + row[i] * W[a] * row[j] / D[i], 0)));
for (const n of [Y, B, L]) assert(maxAbs(mv(V, n)) < 1e-12 && maxAbs(mv(K, n)) < 1e-12);

// [Y,B,L] span the protected kernel; the four transposed incidence rows span
// a complementary broken-source space.
const C = transpose([Y, B, L, ...V]);
const Cinv = inverse(C);
assert(maxAbs(sub(mul(C, Cinv), eye(7))) < 1e-10);

// A finite, constant change of coordinates that is exactly the identity on
// the protected kernel but shears the broken quotient.
const T = eye(7);
T[3][4] = 0.7;
T[5][6] = -0.4;
const S = mul(mul(C, T), Cinv);
const Sinv = inverse(S);
for (const n of [Y, B, L]) assert(maxAbs(mv(S, n).map((x, i) => x - n[i])) < 1e-10);
const Kconstant = mul(mul(S, K), Sinv);
assert(Math.abs(tr(Kconstant) - tr(K)) < 1e-10);
assert(Math.abs(tr(mul(Kconstant, Kconstant)) - tr(mul(K, K))) < 1e-10);
assert(maxAbs(sub(Kconstant, K)) > 1e-4);

// Along a running trajectory, a coupling-dependent basis S(g(mu)) contributes
// -(dS/dlog(mu))S^{-1}.  At the comparison point take S=I and choose its
// logarithmic derivative to act only on the broken quotient.
const Ablock = Array.from({ length: 7 }, () => Array(7).fill(0));
Ablock[3][3] = 0.05;
Ablock[4][4] = -0.01;
Ablock[3][5] = 0.02;
const A = mul(mul(C, Ablock), Cinv);
for (const n of [Y, B, L]) assert(maxAbs(mv(A, n)) < 1e-10);
const Krunning = sub(K, A);
for (const n of [Y, B, L]) assert(maxAbs(mv(Krunning, n)) < 1e-10);
assert(Math.abs((tr(Krunning) - tr(K)) + 0.04) < 1e-10);

console.log("PASS local-RG incidence and scheme boundary");
console.log("spurion_charge_rank=4; protected_kernel=span(Y,B,L)");
console.log(`constant_broken_basis_change_norm=${maxAbs(sub(Kconstant, K))}`);
console.log("constant_change_preserves_spectrum_invariants=true");
console.log(`running_basis_change_trace_shift=${tr(Krunning) - tr(K)}`);
console.log("scheme_stable_content=incidence_factorization,protected_kernel,broken_rank");
console.log("noncanonical_without_renormalization_condition=broken_eigenframe_along_flow");
