import assert from 'node:assert/strict';

// Columns are integer-normalized (y=6Y, X=B-2Y-3L_i).
// Rows are the electroweak Higgs and the singlet flavon.
const Q = [[3, -1], [0, 3]];
const det = Q[0][0] * Q[1][1] - Q[0][1] * Q[1][0];
const entries = Q.flat().map(Math.abs);
const gcd = (a, b) => b === 0 ? Math.abs(a) : gcd(b, a % b);
const d1 = entries.reduce((g, x) => gcd(g, x), 0);
const d2 = Math.abs(det) / d1;
assert.equal(det, 9);
assert.equal(d1, 1);
assert.equal(d2, 9);

// Smith invariants (1,9): the raw Abelian vacuum stabilizer is Z9.
const smith = [d1, d2];
assert.deepEqual(smith, [1, 9]);

// The order-nine lift has a cube in the colour centre.  Quotienting the
// gauge subgroup leaves order three on gauge equivalence classes.
const liftOrder = 9;
const gaugedCubeOrder = 3;
const physicalQuotientOrder = liftOrder / gaugedCubeOrder;
assert.equal(physicalQuotientOrder, 3);

console.log(JSON.stringify({
  chargeBasis: ['y=6Y', 'X=B-2Y-3L_i'],
  vacuumChargeMatrix: Q,
  smithInvariants: smith,
  rawFieldwiseRemnant: 'Z9',
  cubeOfLift: 'SU(3)_C centre / connected gauge transformation',
  physicalSplitComponentAfterSMGaugeQuotient: 'Z3',
  correction: 'Level-three BF can describe the gauged split quotient component, not the unquotiented Abelian Higgs lattice by itself.',
}, null, 2));
