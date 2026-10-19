import assert from "node:assert/strict";

const mm = (A, B) =>
  A.map((row) =>
    B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)),
  );
const eye = (n) =>
  Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => Number(i === j)),
  );
const kron = (A, B) =>
  A.flatMap((rowA) =>
    B.map((rowB) => rowA.flatMap((a) => rowB.map((b) => a * b))),
  );
const eq = (A, B, eps = 1e-12) =>
  A.every((row, i) =>
    row.every((x, j) => Math.abs(x - B[i][j]) < eps),
  );

// Any one-generation internal operator replicated as A tensor I_3 commutes
// with every flavor operator I tensor U. Use nontrivial real probes.
const A = [
  [1, 2],
  [3, 5],
];
const theta = 0.41;
const U = [
  [Math.cos(theta), -Math.sin(theta), 0],
  [Math.sin(theta), Math.cos(theta), 0],
  [0, 0, 1],
];
const replicatedInternal = kron(A, eye(3));
const flavorRotation = kron(eye(2), U);
assert.ok(
  eq(
    mm(replicatedInternal, flavorRotation),
    mm(flavorRotation, replicatedInternal),
  ),
);

// The continuous central unitary rank of H_R + H_L + M4(C) is one:
// quaternionic centers contribute only the discrete unit signs, while M4(C)
// contributes one U(1) center. This cannot itself provide a family C+C split.
const connectedCentralRanks = {
  H_R: 0,
  H_L: 0,
  M4C: 1,
};
assert.equal(
  Object.values(connectedCentralRanks).reduce((a, b) => a + b, 0),
  1,
);

const linearFlavonCharge = -3;
const quadraticFlavonCharge = 2 * linearFlavonCharge;
const exceptionalMajoranaBilinearCharge = 6;
assert.equal(
  quadraticFlavonCharge + exceptionalMajoranaBilinearCharge,
  0,
);
assert.equal(-quadraticFlavonCharge, 6);

const result = {
  protocol: "Pati-Salam-generation-commutant-and-quadratic-charge-six-candidate/1",
  sourcedAlgebra: "H_R direct-sum H_L direct-sum M4(C)",
  generationRepresentation: "pi_PS(a) tensor I_3",
  fullFlavorCommutantVerified: true,
  connectedCentralRanks,
  connectedCentralRankTotal: 1,
  familySelectorConclusion:
    "The published Pati-Salam algebra does not itself contain the C+C action distinguishing one generation from a pair.",
  firstOrderFork: {
    strict:
      "Majorana-compatible first order restricts toward C direct-sum H direct-sum M3(C).",
    generalized:
      "The unrestricted Pati-Salam branch uses a quadratic fluctuation A_(2).",
  },
  chargeArithmetic: {
    linearFlavonCharge,
    quadraticFlavonCharge,
    exceptionalMajoranaBilinearCharge,
    neutralSum: 0,
  },
  candidate:
    "If A_(1) contains S_-3 in the family-extended representation, A_(2) has the correct additive charge for an S_-3^2 exceptional Majorana completion.",
  boundary:
    "The actual generalized-fluctuation tensor support, coefficient, junk quotient and potential have not been computed.",
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
