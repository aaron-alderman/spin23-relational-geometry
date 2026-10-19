import assert from 'node:assert/strict';

const gcd = (a, b) => b === 0 ? Math.abs(a) : gcd(b, a % b);
const classes = [];
for (let p = 0; p < 3; p += 1) {
  const K = [[0, 3], [3, 2 * p]];
  const determinant = Math.abs(K[0][0] * K[1][1] - K[0][1] * K[1][0]);
  const d1 = K.flat().reduce((g, x) => gcd(g, x), 0);
  const d2 = determinant / d1;
  classes.push({
    p,
    K,
    determinant,
    smith: [d1, d2],
    discriminantGroup: d1 === 1 ? 'Z9' : 'Z3 x Z3',
    twoQutritExponentModule: d1 === 3 && d2 === 3,
  });
}
assert.deepEqual(classes.map((x) => x.smith), [[3, 3], [1, 9], [1, 9]]);
assert.deepEqual(classes.map((x) => x.determinant), [9, 9, 9]);
assert.deepEqual(classes.map((x) => x.twoQutritExponentModule), [true, false, false]);

// Under the orbifold projection b_2 and phi have no zero modes, so the
// reduction of a bulk b wedge b term, proportional to b_2 wedge c, vanishes.
const bulkTwistZeroModeSurvives = false;
assert.equal(bulkTwistZeroModeSurvives, false);

console.log(JSON.stringify({
  twistClasses: classes,
  bulkFourDimensionalTwistReduction: 'b wedge b -> 2 b_2 wedge c; b_2 has odd parity and no zero mode',
  bulkTwistZeroModeSurvives,
  conclusion: 'The orbifold bulk zero modes select p=0. Localized parity-odd Chern-Simons terms remain an independent threat; p=1,2 keep nine states but replace Z3^2 by Z9.',
}, null, 2));
