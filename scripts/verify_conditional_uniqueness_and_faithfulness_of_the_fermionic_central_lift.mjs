import assert from 'node:assert/strict';

const exceptional = [0, 1, -1, -2, 1, 3];
const ordinary = [0, 1, -1, 1, -2, 0];
const all = [...exceptional, ...ordinary, ...ordinary];
const gcd = (a, b) => b === 0 ? Math.abs(a) : gcd(b, a % b);
const latticeGcd = all.reduce((g, x) => gcd(g, x), 0);
assert.equal(latticeGcd, 1);

const mod3 = (x) => ((x % 3) + 3) % 3;
assert.deepEqual(exceptional.map(mod3), [0, 1, 2, 1, 1, 0]);
assert.deepEqual(ordinary.map(mod3), [0, 1, 2, 1, 1, 0]);

const familyAugmentations = [
  [-2, 1, 1],
  [1, -2, 1],
  [1, 1, -2],
];
assert.deepEqual(
  familyAugmentations.reduce((sum, row) => sum.map((x, i) => x + row[i]), [0, 0, 0]),
  [0, 0, 0],
);

console.log(JSON.stringify({
  primitiveChargeLatticeGcd: latticeGcd,
  faithfulCompactU1: true,
  commonResidualMatterResidues: exceptional.map(mod3),
  familyChoices: 3,
  conditionalUniqueness: 'For a chosen exceptional family and the one-Higgs minimality contract, X=B-2Y-3L_i is unique up to hypercharge basis shifts, overall sign, and family permutation.',
  notDerived: ['choice of family projector', 'promotion of the commutant action to a local gauge field', 'gauge coupling and kinetic mixing', 'flavon potential'],
}, null, 2));
