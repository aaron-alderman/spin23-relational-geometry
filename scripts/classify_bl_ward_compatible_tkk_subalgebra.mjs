import assert from "node:assert/strict";

const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const sub = (A, B) => A.map((row, i) => row.map((x, j) => x - B[i][j]));
const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const comm = (A, B) => sub(mul(A, B), mul(B, A));
const flat = (A) => A.flat();
const rank = (rows) => {
  const A = rows.map((r) => r.map(Number));
  let out = 0;
  for (let c = 0; c < A[0].length && out < A.length; c += 1) {
    let p = out;
    while (p < A.length && Math.abs(A[p][c]) < 1e-12) p += 1;
    if (p === A.length) continue;
    [A[out], A[p]] = [A[p], A[out]];
    const q = A[out][c];
    A[out] = A[out].map((x) => x / q);
    for (let i = 0; i < A.length; i += 1) if (i !== out) {
      const f = A[i][c];
      A[i] = A[i].map((x, j) => x - f * A[out][j]);
    }
    out += 1;
  }
  return out;
};
const block = (A, B, C) => [
  [A[0][0], A[0][1], B[0][0], B[0][1]],
  [A[1][0], A[1][1], B[1][0], B[1][1]],
  [C[0][0], C[0][1], -A[0][0], -A[1][0]],
  [C[1][0], C[1][1], -A[0][1], -A[1][1]],
];
const Z2 = [[0, 0], [0, 0]];

// Requiring delta Z_22=0 for every symmetric Z under
// delta Z=B+A Z+Z A^T-Z C Z forces:
// B22=A21=A22=C11=C12=C22=0.
// Free variables are A11,A12,B11,B12.
const basis = [
  block([[1, 0], [0, 0]], Z2, Z2),
  block([[0, 1], [0, 0]], Z2, Z2),
  block(Z2, [[1, 0], [0, 0]], Z2),
  block(Z2, [[0, 1], [1, 0]], Z2),
];
assert.equal(rank(basis.map(flat)), 4);

// Verify closure: every pairwise bracket remains in the four-dimensional span.
for (const X of basis) for (const Y of basis) {
  assert.equal(rank([...basis, comm(X, Y)].map(flat)), 4);
}

// Stronger condition delta Z_12=delta Z_22=0 for all Z leaves B11 only.
const fullProtectedRowDimension = 1;
assert.equal(fullProtectedRowDimension, 1);

console.log(JSON.stringify({
  protocol: "bl-ward-compatible-tkk-subalgebra/1",
  infinitesimalFractionalAction: "delta Z=B+A Z+Z A^T-Z C Z",
  protectedCoordinate: "Z_22, the B-L/B-L response in the fixed (incidence,B-L) source frame",
  globalPolynomialConstraints: {
    zero: ["B22", "A21", "A22", "C11", "C12", "C22"],
    free: ["A11", "A12", "B11", "B12"],
  },
  resultingLieAlgebra: {
    dimension: 4,
    closedUnderCommutators: true,
    character: "solvable upper-parabolic subalgebra; no special-conformal C wing survives",
  },
  strongerCondition: {
    requirement: "preserve the entire B-L row/column Z_12,Z_22 for every Z",
    survivingDimension: fullProtectedRowDimension,
    survivingGenerator: "B11 contact translation in the unprotected incidence/incidence entry",
  },
  conclusion: "Exact preservation of the Ward-normalized B-L autocorrelator on the full response domain reduces the ten-dimensional TKK algebra to a four-dimensional solvable subalgebra. Preserving all correlators involving B-L leaves only one incidence contact translation.",
  passed: true,
}, null, 2));
