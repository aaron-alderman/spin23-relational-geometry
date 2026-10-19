import assert from "node:assert/strict";

const labels = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
];

const firstOrderCoefficient = (x, y, a, b) => {
  const [i, j] = x;
  const [k, l] = y;
  return (a[k] - a[i]) * (b[l] - b[j]);
};

const allowedForAll = (x, y) => {
  const probes = [
    [[0, 1], [0, 1]],
    [[1, -2], [3, 5]],
    [[2, 7], [-1, 4]],
  ];
  return probes.every(
    ([a, b]) => Math.abs(firstOrderCoefficient(x, y, a, b)) < 1e-12,
  );
};

const classified = [];
for (const x of labels) {
  for (const y of labels) {
    if (x === y) continue;
    const criterion = x[0] === y[0] || x[1] === y[1];
    assert.equal(allowedForAll(x, y), criterion);
    classified.push({ x, y, allowed: criterion });
  }
}

const J = ([i, j]) => [j, i];
const horizontal = {
  x: [0, 0],
  y: [1, 0],
};
const verticalConjugate = {
  x: J(horizontal.x),
  y: J(horizontal.y),
};
assert.equal(allowedForAll(horizontal.x, horizontal.y), true);
assert.equal(
  allowedForAll(verticalConjugate.x, verticalConjugate.y),
  true,
);
assert.deepEqual(verticalConjugate, {
  x: [0, 0],
  y: [0, 1],
});

const diagonalShortcut = {
  x: [0, 0],
  y: [1, 1],
};
assert.equal(allowedForAll(diagonalShortcut.x, diagonalShortcut.y), false);
assert.notEqual(
  firstOrderCoefficient(
    diagonalShortcut.x,
    diagonalShortcut.y,
    [0, 1],
    [0, 1],
  ),
  0,
);

const q = [-2, 1];
const stateCharge = ([i, j]) => q[i] - q[j];
const edgeCharge = (edge) =>
  stateCharge(edge.y) - stateCharge(edge.x);
assert.equal(edgeCharge(horizontal), 3);
assert.equal(edgeCharge(verticalConjugate), -3);

const allowedCount = classified.filter((edge) => edge.allowed).length;
const forbiddenCount = classified.length - allowedCount;
assert.equal(allowedCount, 8);
assert.equal(forbiddenCount, 4);

const result = {
  protocol: "charge-three-family-edge-first-order-real-pair/1",
  firstOrderRule:
    "An edge (i,j)->(k,l) is allowed for all algebra elements iff i=k or j=l.",
  edgeCensus: {
    directedNontrivialEdges: classified.length,
    allowedHorizontalOrVertical: allowedCount,
    forbiddenDiagonal: forbiddenCount,
  },
  horizontalChargeThreeEdge: {
    ...horizontal,
    charge: edgeCharge(horizontal),
  },
  realStructureImage: {
    ...verticalConjugate,
    charge: edgeCharge(verticalConjugate),
  },
  forbiddenDiagonalShortcut: diagonalShortcut,
  theorem:
    "The charge-three family-changing edge is first-order compatible precisely when it shares its opposite-algebra label; J supplies the vertical conjugate edge.",
  boundary:
    "KO signs, grading, full fermion multiplicities, physical unimodularity, junk quotient and scalar potential remain unproved.",
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
