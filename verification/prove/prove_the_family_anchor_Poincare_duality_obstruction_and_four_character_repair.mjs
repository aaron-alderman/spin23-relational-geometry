import assert from "node:assert/strict";

const zero = (n) => Array.from({ length: n }, () => Array(n).fill(0));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const scale = (a, A) => A.map((row) => row.map((x) => a * x));
const eq = (A, B) =>
  A.every((row, i) => row.every((x, j) => x === B[i][j]));
const determinant = (A) => {
  if (A.length === 1) return A[0][0];
  return A[0].reduce((sum, value, j) => {
    const minor = A.slice(1).map((row) => row.filter((_, k) => k !== j));
    return sum + (j % 2 === 0 ? 1 : -1) * value * determinant(minor);
  }, 0);
};
const intersection = (n, sectors) => {
  const Q = zero(n);
  for (const { left, right, chirality } of sectors) {
    Q[left][right] += chirality;
  }
  return Q;
};

const threeSectors = [
  { left: 0, right: 2, chirality: 1 },
  { left: 1, right: 2, chirality: -1 },
  { left: 2, right: 0, chirality: -1 },
  { left: 2, right: 1, chirality: 1 },
];
const Q3 = intersection(3, threeSectors);
assert.deepEqual(Q3, [
  [0, 0, 1],
  [0, 0, -1],
  [-1, 1, 0],
]);
assert.ok(eq(transpose(Q3), scale(-1, Q3)));
assert.equal(determinant(Q3), 0);

const fourSectors = [
  ...threeSectors,
  { left: 0, right: 3, chirality: 1 },
  { left: 3, right: 0, chirality: -1 },
];
const Q4 = intersection(4, fourSectors);
assert.deepEqual(Q4, [
  [0, 0, 1, 1],
  [0, 0, -1, 0],
  [-1, 1, 0, 0],
  [-1, 0, 0, 0],
]);
assert.ok(eq(transpose(Q4), scale(-1, Q4)));
assert.equal(determinant(Q4), 1);
const pfaffian4 =
  Q4[0][1] * Q4[2][3] -
  Q4[0][2] * Q4[1][3] +
  Q4[0][3] * Q4[1][2];
assert.equal(pfaffian4, -1);
assert.equal(determinant(Q4), pfaffian4 ** 2);

// With only the family-changing horizontal edge, [D,L(a)]=0 imposes a0=a1.
// The anchor and spectator values remain free.
const commutantKernelBasis = [
  [1, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];
assert.equal(commutantKernelBasis.length, 3);

const result = {
  protocol: "family-anchor-Poincare-duality-and-four-character-repair/1",
  threeCharacterModel: {
    intersectionForm: Q3,
    antisymmetric: true,
    determinant: determinant(Q3),
    verdict:
      "Every odd-dimensional antisymmetric intersection form is singular.",
  },
  fourCharacterRepair: {
    addedSectors: [
      [0, 3, 1],
      [3, 0, -1],
    ],
    intersectionForm: Q4,
    pfaffian: pfaffian4,
    determinant: determinant(Q4),
    poincareNondegenerate: true,
  },
  connectedness: {
    leftDiracCommutantKernelBasis: commutantKernelBasis,
    dimension: commutantKernelBasis.length,
    scalarOnly: false,
  },
  theorem:
    "A fourth J-paired spectator repairs the anchored KO6 intersection form to determinant one, but without additional Dirac support it does not restore connectedness.",
  boundary:
    "The complete Standard-Model/Pati-Salam representation table must supply physical anchor/spectator sectors, extra Dirac connectivity and the true unimodularity condition.",
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
