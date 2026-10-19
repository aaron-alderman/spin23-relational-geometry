import assert from 'node:assert/strict';

// Reflection y -> -y.  Choose r*a=+a and r*b=-b as differential forms.
// dy itself is odd.
const parity = {
  a_mu: +1,
  a_y: -1,
  b_munu: -1,
  b_muy: +1,
  lambda: +1,
  Lambda_mu: -1,
  Lambda_y: +1,
};

const zeroModes = Object.fromEntries(
  Object.entries(parity)
    .filter(([name]) => ['a_mu', 'a_y', 'b_munu', 'b_muy'].includes(name))
    .map(([name, sign]) => [name, sign === 1]),
);
assert.deepEqual(zeroModes, {
  a_mu: true,
  a_y: false,
  b_munu: false,
  b_muy: true,
});

// Both reduced terms are parity even at the KK level, but only c da has
// even-even zero modes.
const cDaParity = parity.b_muy * parity.a_mu;
const bDphiParity = parity.b_munu * parity.a_y;
assert.equal(cDaParity, +1);
assert.equal(bDphiParity, +1);
assert.equal(zeroModes.b_muy && zeroModes.a_mu, true);
assert.equal(zeroModes.b_munu && zeroModes.a_y, false);

// Odd tangential one-form gauge parameter vanishes at orbifold fixed points,
// killing the boundary variation Lambda|_boundary wedge da.
assert.equal(parity.Lambda_mu, -1);

const level = 3;
const kMatrix = [[0, level], [level, 0]];
const determinant = Math.abs(kMatrix[0][0] * kMatrix[1][1] - kMatrix[0][1] * kMatrix[1][0]);
assert.equal(determinant, 9);

console.log(JSON.stringify({
  orbifold: 'S1/Z2 with y -> -y',
  differentialFormParity: { a: 'even', b: 'odd' },
  componentParity: parity,
  retainedZeroModes: ['a_mu', 'c_mu = b_mu_y'],
  projectedZeroModes: ['phi = a_y', 'b_mu_nu'],
  reducedTopologicalAction: '3/(2pi) integral c wedge da',
  removedZeroModeAction: '3/(2pi) integral b_2 wedge d phi',
  boundaryGaugeVariation: 'vanishes because tangential Lambda_mu is odd at fixed points',
  torusGroundStates: determinant,
}, null, 2));
