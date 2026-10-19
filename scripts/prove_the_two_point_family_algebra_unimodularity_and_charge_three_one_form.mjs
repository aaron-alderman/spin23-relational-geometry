import assert from "node:assert/strict";

const mm = (A, B) =>
  A.map((row) =>
    B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)),
  );
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const sub = (A, B) => add(A, B.map((row) => row.map((x) => -x)));
const scale = (a, A) => A.map((row) => row.map((x) => a * x));
const eq = (A, B, eps = 1e-12) =>
  A.every((row, i) =>
    row.every((x, j) => Math.abs(x - B[i][j]) < eps),
  );
const eye = (n) =>
  Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => Number(i === j)),
  );

const P = [
  [1, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
const Q = sub(eye(3), P);
assert.ok(eq(mm(P, P), P));
assert.ok(eq(mm(Q, Q), Q));
assert.ok(eq(mm(P, Q), scale(0, eye(3))));
assert.ok(eq(add(P, Q), eye(3)));

// The primitive determinant-one generator on a 1+2 representation.
const X = add(scale(-2, P), Q);
assert.deepEqual(X, [
  [-2, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
]);
assert.equal(X[0][0] + X[1][1] + X[2][2], 0);
assert.ok(eq(X, sub(eye(3), scale(3, P))));

// A generic nonzero exceptional-to-pair finite-Dirac edge.
const K = [
  [0, 2, -1],
  [0, 0, 0],
  [0, 0, 0],
];
assert.ok(eq(K, mm(mm(P, K), Q)));
const Kdagger = K[0].map((_, j) => K.map((row) => row[j]));
assert.ok(eq(Kdagger, mm(mm(Q, Kdagger), P)));

const commutator = (A, B) => sub(mm(A, B), mm(B, A));
assert.ok(eq(commutator(X, K), scale(-3, K)));
assert.ok(eq(commutator(X, Kdagger), scale(3, Kdagger)));

// Directly verify the represented commutator formula for b=cP+dQ.
const D = add(K, Kdagger);
const c = 5;
const d = -2;
const piB = add(scale(c, P), scale(d, Q));
const expected = add(scale(d - c, K), scale(c - d, Kdagger));
assert.ok(eq(commutator(D, piB), expected));

// Cycling the rank-one idempotent gives the three A2 vertices.
const projectors = [0, 1, 2].map((k) =>
  Array.from({ length: 3 }, (_, i) =>
    Array.from({ length: 3 }, (_, j) => Number(i === k && j === k)),
  ),
);
const vertices = projectors.map((Pk) => sub(eye(3), scale(3, Pk)));
const trace = (A) => A.reduce((sum, row, i) => sum + row[i], 0);
const gram = vertices.map((A) => vertices.map((B) => trace(mm(A, B))));
assert.deepEqual(gram, [
  [6, -3, -3],
  [-3, 6, -3],
  [-3, -3, 6],
]);

const result = {
  protocol: "two-point-family-algebra-unimodularity-and-charge-three-one-form/1",
  familyAlgebra: "C direct-sum C",
  representation: "pi(z,w)=zP_alpha+w(I-P_alpha)",
  minimality:
    "A one-dimensional unital algebra acts scalarly; two central idempotents are minimal for a 1+2 split.",
  determinantConstraint: "a+2b=0",
  primitiveGenerator: X,
  generatorFormula: "X_family = I - 3 P_alpha",
  offBlockCharges: {
    "P D Q": -3,
    "Q D P": 3,
  },
  representedCommutatorVerified: true,
  familyOrbitGram: gram,
  theorem:
    "The determinant-one subgroup of the minimal two-point family algebra produces the A2 vertex, and any nonzero off-block Dirac edge produces a charge-three one-form direction.",
  boundary:
    "A complete real Standard-Model/Pati-Salam finite-triple embedding, junk quotient, scalar multiplicity and potential remain unproved.",
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
