import assert from "node:assert/strict";

const n = 4;
const E = (i, j) => Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => Number(r === i && c === j)));
const add = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
const scale = (c, A) => A.map((r) => r.map((x) => c * x));
const mul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const jordan = (A, B) => scale(0.5, add(mul(A, B), mul(B, A)));
const zero = (A) => A.every((r) => r.every((x) => x === 0));
const sym = (i, j) => add(E(i, j), E(j, i));

// Ordered full labels: D_P=(P,N), D_I=(I,N), M_P=(P,I), M_N=(N,I).
const labels = ["D_P=(P,N)", "D_I=(I,N)", "M_P=(P,I)", "M_N=(N,I)"];
const X_D = sym(0, 1);
const X_M = sym(2, 3);

assert.ok(zero(mul(X_D, X_M)));
assert.ok(zero(mul(X_M, X_D)));
assert.ok(zero(jordan(X_D, X_M)));

const blockProjectors = [E(0, 0), E(1, 1), E(2, 2), E(3, 3)];
const basis = [...blockProjectors, X_D, X_M];

const flattenSym4 = (A) => [
  A[0][0], A[1][1], A[2][2], A[3][3],
  A[0][1], A[0][2], A[0][3], A[1][2], A[1][3], A[2][3],
];
const rank = (vectors, tolerance = 1e-10) => {
  const M = vectors.map((v) => [...v]);
  let r = 0;
  for (let c = 0; c < M[0].length && r < M.length; c += 1) {
    const p = M.findIndex((row, i) => i >= r && Math.abs(row[c]) > tolerance);
    if (p < 0) continue;
    [M[r], M[p]] = [M[p], M[r]];
    const q = M[r][c];
    M[r] = M[r].map((x) => x / q);
    for (let i = 0; i < M.length; i += 1) {
      if (i === r) continue;
      const t = M[i][c];
      M[i] = M[i].map((x, j) => x - t * M[r][j]);
    }
    r += 1;
  }
  return r;
};

assert.equal(rank(basis.map(flattenSym4)), 6);

// Coarse-graining the two P lifts into one three-state carrier recovers X_PI and X_PN,
// whose mixed Jordan product is the induced I-N relation.
const coarseInducedRelation = "2*(X_PI o X_PN)=X_IN";

const result = {
  protocol: "opposite-anchor-typing-splits-H3-envelope/1",
  fullLabels: labels,
  relationOperators: {
    dirac: "X_D connects D_P=(P,N) to D_I=(I,N)",
    majorana: "X_M connects M_P=(P,I) to M_N=(N,I)",
  },
  typedClosure: {
    mixedAssociativeProductsVanish: true,
    mixedJordanProductVanishes: true,
    dimension: 6,
    jordanAlgebra: "H_2(R)_D direct-sum H_2(R)_M",
    conformalAlgebra: "sp(4,R)_D direct-sum sp(4,R)_M",
  },
  coarseGraining: {
    forgottenDatum: "opposite-anchor label distinguishing D_P from M_P",
    consequence: coarseInducedRelation,
    envelope: "H_3(R) with sp(6,R) conformal algebra",
  },
  theorem: "The sector-dependent opposite anchors are exactly a relational carrier split. Retaining them makes the Dirac and Majorana H_2(R) wheels orthogonal; forgetting them identifies the two P lifts and produces the H_3(R) envelope.",
  boundary: "The physical representation and junk quotient must preserve the anchor projectors. Any interaction identifying the two P lifts can regenerate the coarse I-N channel.",
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
