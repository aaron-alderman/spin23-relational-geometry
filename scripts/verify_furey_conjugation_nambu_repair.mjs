import assert from 'node:assert/strict';

const up = [
  { degree: 0, dim: 1, color: '1', q: 0 },
  { degree: 1, dim: 3, color: '3bar', q: 1 / 3 },
  { degree: 2, dim: 3, color: '3', q: 2 / 3 },
  { degree: 3, dim: 1, color: '1', q: 1 },
];
const colorConjugate = r => r === '3' ? '3bar' : r === '3bar' ? '3' : r;
const conjugateIdeal = xs => xs.map(x => ({
  degree: x.degree,
  dim: x.dim,
  color: colorConjugate(x.color),
  q: -x.q,
}));
const down = conjugateIdeal(up);
assert.deepEqual(conjugateIdeal(down), up);
assert.equal(up.reduce((s, x) => s + x.dim, 0), 8);
assert.equal(down.reduce((s, x) => s + x.dim, 0), 8);

// Lorentz conjugation reverses Weyl chirality and is involutive.
const lorentzConjugate = chirality => chirality === 'L' ? 'R' : 'L';
assert.equal(lorentzConjugate('L'), 'R');
assert.equal(lorentzConjugate(lorentzConjugate('L')), 'L');

// Neutral label exchange is independent of gauge/Lorentz conjugation.
const neutralSwap = label => label === 'O1' ? 'R0' : label === 'R0' ? 'O1' : label;
const state = { chirality: 'L', color: '3', q: 1 / 6, neutral: 'O1' };
const gamma = x => ({
  chirality: lorentzConjugate(x.chirality),
  color: colorConjugate(x.color),
  q: -x.q,
  neutral: neutralSwap(x.neutral),
});
const image = gamma(state);
assert.deepEqual(image, { chirality: 'R', color: '3bar', q: -1 / 6, neutral: 'R0' });
assert.deepEqual(gamma(image), state);

console.log('Furey conjugation/Nambu repair certificate: PASS');
console.log('complex conjugation reverses gauge charge and Lorentz chirality; neutral swap is independent');

