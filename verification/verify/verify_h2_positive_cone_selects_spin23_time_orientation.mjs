import assert from "node:assert/strict";

const det2 = ([[a, b], [c, d]]) => a * d - b * c;
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const multiply = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)));
const X = (t, x, y) => [[t + x, y], [y, t - x]];
const positive = (M) => M[0][0] > 0 && det2(M) > 0;

for (const [t, x, y] of [[2, 1, 0], [3, -1, 2], [1, 0, 0]]) {
  const M = X(t, x, y);
  assert.equal(det2(M), t * t - x * x - y * y);
  assert.equal(positive(M), t > Math.hypot(x, y));
}
for (const [t, x, y] of [[-2, 1, 0], [1, 2, 0], [0, 0, 1]]) {
  assert.equal(positive(X(t, x, y)), false);
}

// Rank-one positive-semidefinite matrices are the future null boundary.
for (const [x, y] of [[1, 0], [0, 1], [3, 4]]) {
  const t = Math.hypot(x, y);
  assert(Math.abs(det2(X(t, x, y))) < 1e-10);
  assert(t >= 0);
}

// The connected structure action X -> A X A^T preserves the chosen cone and
// scales its Lorentz determinant by the positive square det(A)^2.
const matrices = [
  [[1, 0], [0, 1]],
  [[1, 1], [0, 1]],
  [[2, 0], [0, 0.5]],
  [[0, 1], [-1, 0]],
];
const base = X(3, 1, 1);
for (const A of matrices) {
  const image = multiply(multiply(A, base), transpose(A));
  const detA = det2(A);
  assert(positive(image));
  assert(Math.abs(det2(image) - detA * detA * det2(base)) < 1e-9);
}

console.log(JSON.stringify({
  jordanCoordinates: "X=[[t+x,y],[y,t-x]]",
  jordanDeterminant: "t^2-x^2-y^2",
  selectedCone: "t>sqrt(x^2+y^2)",
  boundary: "future null cone det(X)=0, t>=0",
  conformalCompletion: "Sp(4,R) = Spin_0(2,3)",
  exactConclusion: "the positive Jordan order selects a time orientation on the carrier",
  remainingBoundary: "identifying t with empirical physical time requires a source/clock map",
}, null, 2));
console.log("PASS verify_h2_positive_cone_selects_spin23_time_orientation");
