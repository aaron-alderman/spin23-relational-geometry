import assert from 'node:assert/strict';

// Infinitesimal diagonal centre of U(1) x U(2):
// X = diag(a,b,b).  Tr X = a + 2b = 0.
const primitive = { a: -2, b: 1 };
assert.equal(primitive.a + 2 * primitive.b, 0);
assert.equal(primitive.b - primitive.a, 3);

// General integral solutions are multiples of (-2,1).
for (let b = -20; b <= 20; b += 1) {
  const a = -2 * b;
  assert.equal(a + 2 * b, 0);
  assert.equal(b - a, 3 * b);
}

const dimensions = {
  U3: 9,
  rankOneStabilizer_U1xU2: 1 + 4,
  determinantOneStabilizer_SU2xU1_modZ2: 4,
  centerOfStabilizer_U1xU1: 2,
  determinantOneCenter: 1,
};
assert.deepEqual(dimensions, {
  U3: 9,
  rankOneStabilizer_U1xU2: 5,
  determinantOneStabilizer_SU2xU1_modZ2: 4,
  centerOfStabilizer_U1xU1: 2,
  determinantOneCenter: 1,
});

console.log(JSON.stringify({
  familySpace: 'C P + Q C^3 with ranks (1,2)',
  fullRankSplitStabilizer: 'U(1) x U(2)',
  determinantOneFullStabilizer: 'S(U(1) x U(2)) ~= U(2)',
  blockScalarCenter: 'U(1) x U(1)',
  determinantOneCenter: 'diag(exp(-2it), exp(it), exp(it))',
  primitiveGenerator: 'I - 3P = diag(-2,1,1)',
  crossPeirceCharge: 3,
  dimensions,
  conclusion: 'The unique primitive charge-three U(1) is the determinant-one centre of the rank-split stabilizer, not the full stabilizer.',
}, null, 2));
