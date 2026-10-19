import assert from "node:assert/strict";

const mod = (x, n) => ((x % n) + n) % n;
const fields = ["Q", "uc", "dc", "L", "ec", "nuc"];

// All vectors use three times the physical generator, avoiding fractions.
const threeB = [1, -1, -1, 0, 0, 0];
const sixY = [1, -4, 2, -3, 6, 0];
const threeXNormal = threeB.map((q, i) => q - sixY[i]);
assert.deepEqual(threeXNormal, [0, 3, -3, 3, -6, 0]);

const leptonNumber = [0, 0, 0, 1, -1, -1];
const exceptionalThreeX = threeXNormal.map(
  (q, i) => q - 9 * leptonNumber[i],
);
assert.deepEqual(exceptionalThreeX, [0, 3, -3, -6, 3, 9]);

const normalX = threeXNormal.map((q) => q / 3);
const exceptionalX = exceptionalThreeX.map((q) => q / 3);
assert.deepEqual(normalX, [0, 1, -1, 1, -2, 0]);
assert.deepEqual(exceptionalX, [0, 1, -1, -2, 1, 3]);
assert.deepEqual(
  normalX.map((q) => mod(q, 3)),
  exceptionalX.map((q) => mod(q, 3)),
);

const deltas = [
  [-2, 1, 1],
  [1, -2, 1],
  [1, 1, -2],
];
assert.deepEqual(
  deltas.reduce(
    (sum, row) => sum.map((x, i) => x + row[i]),
    [0, 0, 0],
  ),
  [0, 0, 0],
);

const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const gram = deltas.map((a) => deltas.map((b) => dot(a, b)));
assert.deepEqual(gram, [
  [6, -3, -3],
  [-3, 6, -3],
  [-3, -3, 6],
]);

// Characteristic polynomial is lambda(lambda-9)^2.
const trace = gram[0][0] + gram[1][1] + gram[2][2];
const traceSquare = gram
  .flatMap((row, i) => row.map((x, j) => x * gram[j][i]))
  .reduce((a, b) => a + b, 0);
const pairEigenSum = (trace ** 2 - traceSquare) / 2;
const determinant =
  gram[0][0] * (gram[1][1] * gram[2][2] - gram[1][2] * gram[2][1]) -
  gram[0][1] * (gram[1][0] * gram[2][2] - gram[1][2] * gram[2][0]) +
  gram[0][2] * (gram[1][0] * gram[2][1] - gram[1][1] * gram[2][0]);
assert.equal(trace, 18);
assert.equal(pairEigenSum, 81);
assert.equal(determinant, 0);

// The three minimal witnesses are exactly the three B-2Y-3L_i choices.
const witnesses = deltas.map((_, exceptionalFamily) =>
  Array.from({ length: 3 }, (_, family) =>
    family === exceptionalFamily ? exceptionalX : normalX,
  ),
);
assert.equal(witnesses.length, 3);
for (const witness of witnesses) {
  assert.equal(
    witness.filter((row) => row === exceptionalX).length,
    1,
  );
  assert.equal(witness.filter((row) => row === normalX).length, 2);
}

const result = {
  protocol: "B-minus-3Li-identification-and-A2-family-orbit/1",
  identity: "X_i = B - 2Y - 3L_i",
  quotientDirection: "[X_i] = [B - 3L_i] modulo gauged hypercharge",
  fields,
  normalFamilyCharges: normalX,
  exceptionalFamilyCharges: exceptionalX,
  commonBaryonTrialityResidues: normalX.map((q) => mod(q, 3)),
  familyOrbit: {
    centroid: "B - L - 2Y",
    deviations: deltas,
    sum: [0, 0, 0],
    gram,
    spectrum: [9, 9, 0],
    interpretation: "scaled A2 weight orbit under S3 family permutations",
  },
  minimizers: witnesses,
  theorem:
    "The three minimal continuous lifts are precisely the hypercharge-dressed B-3L_i generators. Their traceless family parts form an equilateral A2 orbit around the family-universal B-L-2Y centroid.",
  boundary:
    "A generation-blind finite algebra commutes with U(3)_F and cannot select one orbit vertex; a family-sensitive spurion, algebra extension, monodromy or boundary mechanism is required.",
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
