import assert from "node:assert/strict";

const mm = (A, B) =>
  A.map((row) =>
    B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)),
  );
const add = (A, B) =>
  A.map((row, i) => row.map((x, j) => x + B[i][j]));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const flatten = (A) => A.flat();
const inner = (A, B) =>
  flatten(A).reduce((sum, x, i) => sum + x * flatten(B)[i], 0);
const nonzero = (A) => flatten(A).some((x) => x !== 0);

const rank = (rows, eps = 1e-10) => {
  const A = rows.map((row) => [...row]);
  let r = 0;
  for (let c = 0; c < A[0].length && r < A.length; c += 1) {
    let pivot = r;
    while (pivot < A.length && Math.abs(A[pivot][c]) < eps) pivot += 1;
    if (pivot === A.length) continue;
    [A[r], A[pivot]] = [A[pivot], A[r]];
    const scale = A[r][c];
    for (let j = c; j < A[r].length; j += 1) A[r][j] /= scale;
    for (let i = 0; i < A.length; i += 1) {
      if (i === r) continue;
      const factor = A[i][c];
      for (let j = c; j < A[i].length; j += 1) {
        A[i][j] -= factor * A[r][j];
      }
    }
    r += 1;
  }
  return r;
};

const P = [
  [1, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
const Q = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];
const K = [
  [1, 2, 3],
  [2, 4, 5],
  [3, 5, 6],
];

const PKP = mm(mm(P, K), P);
const PKQ = mm(mm(P, K), Q);
const QKP = mm(mm(Q, K), P);
const QKQ = mm(mm(Q, K), Q);

for (const block of [PKP, PKQ, QKP, QKQ]) assert(nonzero(block));
assert.deepEqual(transpose(PKQ), QKP);
assert.deepEqual(transpose(PKP), PKP);
assert.deepEqual(transpose(QKQ), QKQ);

const directed = [PKP, PKQ, QKP, QKQ];
for (let i = 0; i < directed.length; i += 1) {
  for (let j = 0; j < directed.length; j += 1) {
    if (i !== j) assert.equal(inner(directed[i], directed[j]), 0);
  }
}
assert.equal(rank(directed.map(flatten)), 4);

const crossSelfAdjoint = add(PKQ, QKP);
const selfAdjointDirections = [PKP, crossSelfAdjoint, QKQ];
assert.equal(rank(selfAdjointDirections.map(flatten)), 3);

console.log(
  JSON.stringify(
    {
      protocol: "naive-tensor-family-extension-three-Delta-directions/1",
      familyProjectors: { P, Q },
      genericSymmetricMajoranaCoefficient: K,
      directedBlocks: {
        PKP,
        PKQ,
        QKP,
        QKQ,
      },
      directedSpanDimension: 4,
      realityRelations: {
        PKQ_transpose_equals_QKP: true,
        PKP_selfAdjoint: true,
        QKQ_selfAdjoint: true,
      },
      selfAdjointDirections: [
        "PKP (selected neutral)",
        "PKQ + QKP (charged cross pair)",
        "QKQ (complement neutral)",
      ],
      selfAdjointSpanDimension: 3,
      desiredTwoFaceDimension: 2,
      obstruction:
        "The tensor-product family idempotents independently isolate the two neutral diagonal blocks.",
      escape:
        "Use a normalizer/linking construction, a proved junk relation, or a controlled dynamical decoupling to identify/remove the neutral difference.",
      passed: true,
    },
    null,
    2,
  ),
);
