import assert from "node:assert/strict";

const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (s, A) => A.map((row) => row.map((x) => s * x));
const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const equal = (A, B) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < 1e-12));
const nonzero = (A) => A.some((row) => row.some((x) => Math.abs(x) > 1e-12));

const gamma = [[1, 0], [0, -1]];
const A = [[0, 1], [2, 0]];
const B = [[0, 3], [5, 0]];
const C = [[0, 7], [11, 0]];

const isOdd = (X) => equal(add(mul(gamma, X), mul(X, gamma)), [[0, 0], [0, 0]]);
const isEven = (X) => equal(mul(gamma, X), mul(X, gamma));
const jordanBinary = (X, Z) => scale(0.5, add(mul(X, Z), mul(Z, X)));
const jordanTriple = (X, Y, Z) => scale(0.5, add(mul(mul(X, transpose(Y)), Z), mul(mul(Z, transpose(Y)), X)));

assert.ok([A, B, C].every(isOdd));

const binary = jordanBinary(A, C);
const triple = jordanTriple(A, B, C);
assert.ok(nonzero(binary));
assert.ok(nonzero(triple));
assert.ok(isEven(binary));
assert.ok(isOdd(triple));

const degree = {
  binary: (1 + 1) % 2,
  triple: (1 + 1 + 1) % 2,
};
assert.deepEqual(degree, { binary: 0, triple: 1 });

const triangleHolonomy = (edgeDegree) => (3 * edgeDegree) % 2;
assert.equal(triangleHolonomy(degree.binary), 0);
assert.equal(triangleHolonomy(degree.triple), 1);

const result = {
  protocol: "Jordan-binary-even-triple-odd-Mobius-filter/1",
  grading: "gamma=diag(+1,-1)",
  inputs: "three nonzero grading-odd relation operators",
  verified: {
    binaryJordanProduct: "nonzero and grading-even",
    JordanTripleProduct: "nonzero and grading-odd",
    binaryTriangleHolonomy: 0,
    tripleTriangleHolonomy: 1,
  },
  conditionalBranchMap: {
    evenBinaryComposition: "sheet-preserving transport; C3 disjoint-union C3",
    oddTripleRecursion: "sheet-switching transport; connected C6",
  },
  theorem:
    "In a Z2-graded operator system, the binary Jordan product of two odd relations is even, while the Jordan triple product of three odd relations is odd. If this degree is the sheet-transport cocycle on the three-cycle, binary composition selects trivial holonomy and triple recursion selects Mobius holonomy.",
  boundary:
    "The parity theorem is exact; identifying these operator degrees with the physical P-I-N edge lifts still requires the represented finite one-form and junk calculus.",
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
