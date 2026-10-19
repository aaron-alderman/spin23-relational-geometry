import assert from "node:assert/strict";

const kron = (A, B) => {
  const rows = A.length * B.length;
  const cols = A[0].length * B[0].length;
  const out = Array.from({ length: rows }, () => Array(cols).fill(0));
  for (let i = 0; i < A.length; i += 1)
    for (let j = 0; j < A[0].length; j += 1)
      for (let k = 0; k < B.length; k += 1)
        for (let l = 0; l < B[0].length; l += 1)
          out[i * B.length + k][j * B[0].length + l] = A[i][j] * B[k][l];
  return out;
};

const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const sub = (A, B) => A.map((row, i) => row.map((x, j) => x - B[i][j]));
const zero = (A) => A.every((row) => row.every((x) => x === 0));
const comm = (A, B) => sub(mul(A, B), mul(B, A));
const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
const diag = (v) => v.map((x, i) => v.map((_, j) => (i === j ? x : 0)));

// H = C^2_left tensor C^2_right tensor C^3_family.
const a = [[1, 2], [3, 4]];
const bT = [[0, 1], [1, 0]];
const f = diag([1, 2, 4]);
const K = [[0, 1, 0], [1, 0, 1], [0, 1, 0]];

const L = kron(kron(a, eye(2)), eye(3));
const R = kron(kron(eye(2), bT), eye(3));
const F = kron(kron(eye(2), eye(2)), f);
const D = kron(kron(eye(2), eye(2)), K);

assert.ok(zero(comm(L, R)));
assert.ok(zero(comm(L, F)));
assert.ok(zero(comm(R, F)));
assert.ok(!zero(comm(D, F)));

const result = {
  protocol: "nested-commutant-family-wheel/1",
  carrier: "H_ij tensor C^3_family",
  actions: {
    leftInternal: "L(a)=a tensor I tensor I_3",
    rightInternal: "R(b)=I tensor b^T tensor I_3",
    familyCommutant: "F(f)=I tensor I tensor diag(f_P,f_I,f_N)",
    familySensitiveDirac: "D=I tensor I tensor K",
  },
  checks: {
    orderZeroInternal: "[L(a),R(b)]=0",
    familyPreservesLeftSlot: "[F(f),L(a)]=0",
    familyPreservesRightSlot: "[F(f),R(b)]=0",
    familyOneFormCanBeNonzero: "[D,F(f)]!=0",
  },
  theorem: "A represented family algebra in the multiplicity commutant supplies an independent third relational datum without consuming either internal bimodule support slot.",
  boundary: "If the family action is promoted to the coordinate algebra, the tensor-product character and gauge analysis returns. If it remains auxiliary, a generalized spectral/Jordan axiom system is required.",
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
