import assert from "node:assert/strict";

const mm = (A, B) =>
  A.map((row) =>
    B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)),
  );
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (a, A) => A.map((row) => row.map((x) => a * x));
const eq = (A, B, eps = 1e-12) =>
  A.every((row, i) =>
    row.every((x, j) => Math.abs(x - B[i][j]) < eps),
  );
const eye = (n) =>
  Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => Number(i === j)),
  );
const diag = (xs) => xs.map((x, i) => xs.map((_, j) => (i === j ? x : 0)));
const comm = (A, B) => add(mm(A, B), scale(-1, mm(B, A)));

const S = [
  [0, 0, 1, 0],
  [0, 0, 0, 1],
  [1, 0, 0, 0],
  [0, 1, 0, 0],
];
const gamma = diag([1, -1, -1, 1]);
const D = [
  [0, 2, 0, 0],
  [2, 0, 0, 0],
  [0, 0, 0, 2],
  [0, 0, 2, 0],
];

assert.ok(eq(mm(S, S), eye(4)));
assert.ok(eq(mm(mm(S, D), S), D));
assert.ok(eq(mm(mm(S, gamma), S), scale(-1, gamma)));
assert.ok(eq(add(mm(D, gamma), mm(gamma, D)), scale(0, eye(4))));

const verifyRepresentation = (leftLabels, rightLabels, values) => {
  const L = diag(leftLabels.map((i) => values[i]));
  const R = diag(rightLabels.map((j) => values[j]));
  assert.ok(eq(comm(L, R), scale(0, eye(4))));
  return { L, R };
};

const verifyFirstOrder = (leftLabels, rightLabels) => {
  const a = [2, -1, 5];
  const b = [7, 3, -2];
  const L = diag(leftLabels.map((i) => a[i]));
  const R = diag(rightLabels.map((j) => b[j]));
  assert.ok(eq(comm(comm(D, L), R), scale(0, eye(4))));
};

const twoPointLeft = [0, 1, 0, 0];
const twoPointRight = [0, 0, 0, 1];
verifyRepresentation(twoPointLeft, twoPointRight, [2, 5]);
verifyFirstOrder(twoPointLeft, twoPointRight);
assert.deepEqual(
  [twoPointLeft[0], twoPointRight[0]],
  [twoPointLeft[2], twoPointRight[2]],
);
assert.equal(gamma[0][0], -gamma[2][2]);
const twoPointOrientable = false;

const anchorLeft = [0, 1, 2, 2];
const anchorRight = [2, 2, 0, 1];
verifyRepresentation(anchorLeft, anchorRight, [2, 5, 11]);
verifyFirstOrder(anchorLeft, anchorRight);
const pairs = anchorLeft.map(
  (i, n) => String(i) + "," + String(anchorRight[n]),
);
assert.equal(new Set(pairs).size, 4);

const cycleCoefficients = new Map([
  ["0,2", 1],
  ["1,2", -1],
  ["2,0", -1],
  ["2,1", 1],
]);
const representedCycle = diag(
  pairs.map((pair) => cycleCoefficients.get(pair) ?? 0),
);
assert.ok(eq(representedCycle, gamma));

const q = [-2, 1, 0];
const stateCharge = (i, j) => q[i] - q[j];
const horizontalCharge =
  stateCharge(anchorLeft[1], anchorRight[1]) -
  stateCharge(anchorLeft[0], anchorRight[0]);
const verticalCharge =
  stateCharge(anchorLeft[3], anchorRight[3]) -
  stateCharge(anchorLeft[2], anchorRight[2]);
assert.equal(horizontalCharge, 3);
assert.equal(verticalCharge, -3);

const result = {
  protocol: "two-point-KO6-orientability-obstruction-and-anchor-repair/1",
  KO6Signs: {
    J2: 1,
    JD: "+",
    Jgamma: "-",
  },
  twoPointQuartet: {
    labels: twoPointLeft.map((i, n) => [i, twoPointRight[n]]),
    orderZero: true,
    firstOrder: true,
    oddDirac: true,
    orientable: twoPointOrientable,
    obstruction:
      "The repeated self-conjugate (0,0) sector has opposite grading on its two copies, while every represented zero-cycle is constant on that label.",
  },
  anchoredQuartet: {
    labels: anchorLeft.map((i, n) => [i, anchorRight[n]]),
    orderZero: true,
    firstOrder: true,
    oddDirac: true,
    orientable: true,
    orientingCycle:
      "+e0 tensor es^o - e1 tensor es^o - es tensor e0^o + es tensor e1^o",
    horizontalCharge,
    verticalCharge,
  },
  theorem:
    "The pure two-point KO6 quartet fails orientability, while one distinct anchor character yields an explicit orientable real-even first-order completion without changing the charge-three edge.",
  boundary:
    "Physical embedding, Poincare duality, full unimodularity, junk quotient and scalar dynamics remain open.",
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
