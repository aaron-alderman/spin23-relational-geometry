import assert from 'node:assert/strict';

// A_SM = C + H + M_3(C), F_2 = C + C, tensor products over R.
// Per family point: C (x)_R C = C + C; H (x)_R C = M_2(C);
// M_3(C) (x)_R C = M_3(C) + M_3(C).
const perFamilyPoint = [
  ['C', 1, 2],
  ['M2C', 2, 1],
  ['M3C', 3, 2],
];
const familyPoints = 2;
const decomposition = perFamilyPoint.map(([name, n, multiplicity]) => ({
  name, n, multiplicity: multiplicity * familyPoints,
}));

const complexCharacters = decomposition.filter(({ n }) => n === 1)
  .reduce((sum, { multiplicity }) => sum + multiplicity, 0);
const realAlgebraDimension = decomposition.reduce(
  (sum, { n, multiplicity }) => sum + 2 * n * n * multiplicity, 0,
);
const unitaryLieDimension = decomposition.reduce(
  (sum, { n, multiplicity }) => sum + n * n * multiplicity, 0,
);

assert.equal(complexCharacters, 4);
assert.equal(realAlgebraDimension, 96);
assert.equal(unitaryLieDimension, 48);
assert.deepEqual(decomposition, [
  { name: 'C', n: 1, multiplicity: 4 },
  { name: 'M2C', n: 2, multiplicity: 2 },
  { name: 'M3C', n: 3, multiplicity: 4 },
]);

// The 1+2 determinant-one representation has primitive weights (-2,+1).
const selectedMultiplicity = 1;
const complementMultiplicity = 2;
const selectedWeight = -complementMultiplicity;
const complementWeight = selectedMultiplicity;
const crossBlockCharge = complementWeight - selectedWeight;
assert.equal(selectedMultiplicity * selectedWeight
  + complementMultiplicity * complementWeight, 0);
assert.equal(crossBlockCharge, 3);

console.log(JSON.stringify({
  algebra: 'A_SM tensor_R (C + C)',
  decomposition: 'C^4 + M_2(C)^2 + M_3(C)^4',
  complexCharacters,
  realAlgebraDimension,
  fullUnitaryLieDimension: unitaryLieDimension,
  familyWeights: [selectedWeight, complementWeight],
  crossBlockCharge,
  conclusion: [
    'The two-point tensor product has exactly four complex characters and can carry an internal pair plus a family label.',
    'As a faithful full coordinate algebra it complexifies/duplicates the weak and colour factors.',
    'A physical finite triple therefore needs a principled restriction, quotient, normalizer, or different realization.',
  ],
}, null, 2));
