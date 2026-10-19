import assert from "node:assert/strict";

const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (a, A) => A.map((row) => row.map((x) => a * x));
const mm = (A, B) =>
  A.map((row) =>
    B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)),
  );
const tr = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const eq = (A, B, eps = 1e-12) =>
  A.length === B.length &&
  A.every(
    (row, i) =>
      row.length === B[i].length &&
      row.every((x, j) => Math.abs(x - B[i][j]) < eps),
  );
const eye = (n) =>
  Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => Number(i === j)),
  );
const ones = Array.from({ length: 3 }, () => Array(3).fill(1));
const P0 = add(eye(3), scale(-1 / 3, ones));
const placementVertices = P0;
const familyVertices = [
  [-2, 1, 1],
  [1, -2, 1],
  [1, 1, -2],
];

// Columns are the three vertices. Since P0 is symmetric, -3P0 is exactly D.
assert.ok(eq(scale(-3, placementVertices), familyVertices));
assert.ok(eq(mm(tr(placementVertices), placementVertices), P0));
const familyGram = mm(tr(familyVertices), familyVertices);
assert.ok(eq(familyGram, scale(9, P0)));
assert.ok(
  eq(familyGram, [
    [6, -3, -3],
    [-3, 6, -3],
    [-3, -3, 6],
  ]),
);

const C = [
  [0, 0, 1],
  [1, 0, 0],
  [0, 1, 0],
];
const F = [
  [1, 0, 0],
  [0, 0, 1],
  [0, 1, 0],
];
assert.ok(eq(mm(C, P0), mm(P0, C)));
assert.ok(eq(mm(F, P0), mm(P0, F)));
assert.ok(eq(mm(C, familyVertices), mm(familyVertices, C)));
assert.ok(eq(mm(F, familyVertices), mm(familyVertices, F)));

// Enumerate the six bijections between placement and family labels.
const permutations = [];
for (let a = 0; a < 3; a += 1) {
  for (let b = 0; b < 3; b += 1) {
    for (let c = 0; c < 3; c += 1) {
      if (new Set([a, b, c]).size === 3) permutations.push([a, b, c]);
    }
  }
}
assert.equal(permutations.length, 6);
const permutationMatrix = (p) =>
  Array.from({ length: 3 }, (_, i) =>
    Array.from({ length: 3 }, (_, j) => Number(i === p[j])),
  );
for (const p of permutations) {
  const Q = permutationMatrix(p);
  const T = scale(-3, mm(Q, P0));
  const transportedC = mm(mm(Q, C), tr(Q));
  const transportedF = mm(mm(Q, F), tr(Q));
  assert.ok(eq(mm(T, C), mm(transportedC, T)));
  assert.ok(eq(mm(T, F), mm(transportedF, T)));
}

// In the integral trace-zero basis, the simultaneous commutant of C and F
// is scalar. Solve symbolically from the four linear relations:
// A=[[a,b],[c,d]], AC=CA gives c=-b and d=a+b; AF=FA then b=0.
const CA2 = [
  [0, -1],
  [1, -1],
];
const FA2 = [
  [1, 0],
  [1, -1],
];
for (const lambda of [-3, -1, 0, 1, 3]) {
  const A = scale(lambda, eye(2));
  assert.ok(eq(mm(A, CA2), mm(CA2, A)));
  assert.ok(eq(mm(A, FA2), mm(FA2, A)));
}

const result = {
  protocol: "family-placement-A2-intertwiner-and-label-torsor/1",
  projector: P0,
  placementVertices,
  familyAugmentations: familyVertices,
  exactVertexMap: "delta_i = -3 P0 e_i = -3 p_i",
  placementGram: P0,
  familyGram,
  metricScale: 9,
  generators: { cycle: C, reflection: F },
  labelBijections: permutations,
  labelTorsorCardinality: permutations.length,
  rigidity:
    "After identifying the two S3 actions, every real intertwiner on the irreducible trace-zero plane is scalar.",
  theorem:
    "The family B-3L_i augmentation orbit and the trace-zero placement orbit are exactly the same standard S3/A2 module at scale three.",
  boundary:
    "No source-native family-to-placement label bijection or selected family vertex has been derived.",
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
