import assert from "node:assert/strict";

const zeros = (m, n) => Array.from({ length: m }, () => Array(n).fill(0));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (c, A) => A.map((row) => row.map((x) => c * x));
const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const commutator = (A, B) => add(mul(A, B), scale(-1, mul(B, A)));
const maxAbs = (A) => Math.max(...A.flat().map(Math.abs));
const blockGenerator = (A, B) => [
  [A[0][0], A[0][1], B[0][0], B[0][1]],
  [A[1][0], A[1][1], B[1][0], B[1][1]],
  [0, 0, -A[0][0], -A[1][0]],
  [0, 0, -A[0][1], -A[1][1]],
];
const J = [
  [0, 0, 1, 0],
  [0, 0, 0, 1],
  [-1, 0, 0, 0],
  [0, -1, 0, 0],
];

const D = blockGenerator([[1, 0], [0, 0]], [[0, 0], [0, 0]]);
const N = blockGenerator([[0, 1], [0, 0]], [[0, 0], [0, 0]]);
const U = blockGenerator([[0, 0], [0, 0]], [[1, 0], [0, 0]]);
const V = blockGenerator([[0, 0], [0, 0]], [[0, 1], [1, 0]]);
const basis = { D, N, U, V };
for (const X of Object.values(basis)) {
  assert(maxAbs(add(mul(transpose(X), J), mul(J, X))) < 1e-12);
}
const zero4 = zeros(4, 4);
const check = (X, Y, expected) => assert(maxAbs(add(commutator(X, Y), scale(-1, expected))) < 1e-12);
check(D, N, N);
check(D, U, scale(2, U));
check(D, V, V);
check(N, V, scale(2, U));
check(N, U, zero4);
check(U, V, zero4);

console.log(JSON.stringify({
  protocol: "ward-compatible-connection-is-dilation-semidirect-heisenberg/1",
  basisMeaning: {
    D: "incidence-source dilation",
    N: "B-L-to-incidence upper source shear",
    U: "incidence/incidence contact translation",
    V: "incidence/B-L contact translation",
  },
  nonzeroBrackets: {
    "[D,N]": "N",
    "[D,U]": "2U",
    "[D,V]": "V",
    "[N,V]": "2U",
  },
  structure: "R D semidirect h_3(N,V,U), with U central in the Heisenberg nilradical",
  derivedSeries: [
    "g",
    "span{N,U,V}",
    "span{U}",
    "0",
  ],
  connection: "omega=a D+b N+u U+v V",
  curvatureComponents: {
    D: "F_D=da",
    N: "F_N=db+a wedge b",
    V: "F_V=dv+a wedge v",
    U: "F_U=du+2 a wedge u+2 b wedge v",
  },
  wardBoundary: "Any curvature component outside span{D,N,U,V}, especially a lower special-conformal C-wing component, violates fixed B-L Ward normalization or moves between differently normalized theories.",
  passed: true,
}, null, 2));
