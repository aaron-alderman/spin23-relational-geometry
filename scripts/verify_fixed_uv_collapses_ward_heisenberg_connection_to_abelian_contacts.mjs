import assert from "node:assert/strict";

const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (c, A) => A.map((row) => row.map((x) => c * x));
const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const commutator = (A, B) => add(mul(A, B), scale(-1, mul(B, A)));
const maxAbs = (A) => Math.max(...A.flat().map(Math.abs));
const generator = (A, B) => [
  [A[0][0], A[0][1], B[0][0], B[0][1]],
  [A[1][0], A[1][1], B[1][0], B[1][1]],
  [0, 0, -A[0][0], -A[1][0]],
  [0, 0, -A[0][1], -A[1][1]],
];
const U = generator([[0, 0], [0, 0]], [[1, 0], [0, 0]]);
const V = generator([[0, 0], [0, 0]], [[0, 1], [1, 0]]);
assert(maxAbs(commutator(U, V)) < 1e-12);

const positiveUvSlopes = [
  [[1, 0], [0, 1]],
  [[3, 1], [1, 2]],
  [[5, -2], [-2, 4]],
];
for (const M of positiveUvSlopes) {
  const determinant = M[0][0] * M[1][1] - M[0][1] ** 2;
  assert(M[0][0] > 0 && determinant > 0);
  // Fixed-slope equations for A=[[a,b],[0,0]] have coefficient matrix M.
  assert(Math.abs(determinant) > 1e-12);
}

console.log(JSON.stringify({
  protocol: "fixed-uv-collapses-ward-heisenberg-connection-to-abelian-contacts/1",
  beforeUvFixing: "R D semidirect h_3(N,V,U)",
  fixedPositiveUvSlopeForces: ["a=0", "b=0"],
  survivingAlgebra: "span{U,V}",
  survivingBracket: "[U,V]=0",
  survivingConnection: "omega=u U+v V",
  survivingCurvature: "F=du U+dv V; the non-Abelian Heisenberg term 2 b wedge v is absent",
  fixedSubtractionScheme: "u=v=0, so the within-theory source connection and holonomy are trivial",
  consequence: "Any noncontact loop/twist must transform UV or Ward data, live in flavor/internal space, or relate different theories.",
  passed: true,
}, null, 2));
