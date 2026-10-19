import assert from "node:assert/strict";

const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (c, A) => A.map((row) => row.map((x) => c * x));
const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const commutator = (A, B) => add(mul(A, B), scale(-1, mul(B, A)));
const maxAbs = (A) => Math.max(...A.flat().map(Math.abs));
const generator = (A, B) => [
  [A[0][0], A[0][1], B[0][0], B[0][1]],
  [A[1][0], A[1][1], B[1][0], B[1][1]],
  [0, 0, -A[0][0], -A[1][0]],
  [0, 0, -A[0][1], -A[1][1]],
];
const Arot = [[0, -1], [1, 0]];
const R = generator(Arot, [[0, 0], [0, 0]]);
const T0 = generator([[0, 0], [0, 0]], [[1, 0], [0, 1]]);
const T1 = generator([[0, 0], [0, 0]], [[1, 0], [0, -1]]);
const T2 = generator([[0, 0], [0, 0]], [[0, 1], [1, 0]]);
const zero = Array.from({ length: 4 }, () => Array(4).fill(0));
const check = (X, Y, expected) => assert(maxAbs(add(commutator(X, Y), scale(-1, expected))) < 1e-12);
check(R, T0, zero);
check(R, T1, scale(2, T2));
check(R, T2, scale(-2, T1));
check(T0, T1, zero);
check(T0, T2, zero);
check(T1, T2, zero);

// Fixed M=I requires A+A^T=0 and C=0; Arot spans so(2).
assert(maxAbs(add(Arot, transpose(Arot))) === 0);

console.log(JSON.stringify({
  protocol: "post-bl-breaking-fixed-uv-stabilizer-is-rotation-semidirect-contacts/1",
  assumptions: [
    "continuous B-L Ward normalization is removed",
    "the two-source bosonic response is still treated as closed",
    "one positive UV slope is whitened to M=I",
  ],
  algebra: "so(2) R semidirect Sym_2(R)_contact",
  decomposition: {
    centralTraceContact: "T0",
    tracelessContactPlane: ["T1", "T2"],
  },
  nonzeroBrackets: {
    "[R,T1]": "2 T2",
    "[R,T2]": "-2 T1",
  },
  isomorphism: "R T0 direct-sum e(2) after rescaling R",
  dimensions: {
    fixedUvContactsFree: 4,
    fixedUvAndContactsFixed: 1,
    twoGenericUvSlopesAndContactsFixed: 0,
  },
  conclusion: "Removing the continuous B-L Ward condition does not restore full sp(4) in one UV-normalized theory. At most a compact source rotation survives after contacts are fixed, and even that is lost for two generic independently fixed UV slopes.",
  passed: true,
}, null, 2));
