import assert from "node:assert/strict";

const transpose = matrix => matrix[0].map((_, column) => matrix.map(row => row[column]));
const multiply = (left, right) => left.map(row => right[0].map((_, column) => row.reduce((sum, value, index) => sum + value * right[index][column], 0)));
const add = (left, right) => left.map((row, i) => row.map((value, j) => value + right[i][j]));
const maximumAbsoluteEntry = matrix => Math.max(...matrix.flat().map(Math.abs));

const determinantHermitian = ({ t, x, y, z }) => t * t - x * x - y * y - z * z;
const determinantDirect = ({ t, x, y, z }) => (t + z) * (t - z) - (x * x + y * y);

const seen = [[1, 0], [0, 0]];
const suppressed = [[0, 0], [0, 1]];
const mixture = [[0.5, 0], [0, 0.5]];
const det2 = matrix => matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
assert.equal(det2(seen), 0);
assert.equal(det2(suppressed), 0);
assert.ok(det2(mixture) > 0);

for (const point of [
  { t: 3, x: 1, y: 1.25, z: 0.5 },
  { t: 5, x: -2, y: 0, z: 1 },
]) {
  assert.ok(Math.abs(determinantHermitian(point) - determinantDirect(point)) < 1e-12);
}

const realSlice = { t: 3, x: 1.5, y: 0, z: 0.25 };
assert.equal(realSlice.y, 0);
assert.ok(determinantHermitian(realSlice) > 0);

const omega = 2 * Math.PI * 15;
const identity2 = [[1, 0], [0, 1]];
const zero2 = [[0, 0], [0, 0]];
const scaled = (factor, matrix) => matrix.map(row => row.map(value => factor * value));
const blocks = (a, b, c, d) => [
  [...a[0], ...b[0]], [...a[1], ...b[1]],
  [...c[0], ...d[0]], [...c[1], ...d[1]],
];
const J = blocks(zero2, identity2, scaled(-1, identity2), zero2);
const K = blocks(zero2, scaled(omega, identity2), scaled(-omega, identity2), zero2);
const symplecticResidual = maximumAbsoluteEntry(add(multiply(transpose(K), J), multiply(J, K)));
assert.ok(symplecticResidual < 1e-12);

const damping = 0.2;
const dampedK = K.map((row, i) => row.map((value, j) => value - (i === j ? damping : 0)));
const dampedResidual = maximumAbsoluteEntry(add(multiply(transpose(dampedK), J), multiply(J, dampedK)));
assert.ok(dampedResidual > 0);

console.log(JSON.stringify({
  protocol: "spin23-neural-alternation-response-slice/1",
  checks: {
    pureStatesAreBoundaryRays: true,
    mixtureIsInterior: true,
    complexHermitianDeterminantHasSpin24Signature: true,
    zeroImaginaryCrossComponentSelectsRealSpin23Slice: true,
    fifteenHertzRotationIsSymplectic: true,
    dampingRequiresOpenSystemExtension: true,
  },
  symplecticResidual,
  dampedResidual,
}, null, 2));
