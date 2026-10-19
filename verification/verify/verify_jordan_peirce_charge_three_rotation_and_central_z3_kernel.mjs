import assert from 'node:assert/strict';

const q = [-2, 1, 1];
const charges = q.map((qi) => q.map((qj) => qi - qj));
assert.deepEqual(charges, [
  [0, -3, -3],
  [3, 0, 0],
  [3, 0, 0],
]);

// At t=2pi/3 the fundamental action is omega I, while conjugation on
// Hermitian matrices is the identity.
const t = 2 * Math.PI / 3;
const phases = q.map((x) => [Math.cos(x * t), Math.sin(x * t)]);
for (let i = 1; i < phases.length; i += 1) {
  assert(Math.abs(phases[i][0] - phases[0][0]) < 1e-10);
  assert(Math.abs(phases[i][1] - phases[0][1]) < 1e-10);
}
for (let i = 0; i < 3; i += 1) {
  for (let j = 0; j < 3; j += 1) {
    const relative = (q[i] - q[j]) * t;
    assert(Math.abs(Math.cos(relative) - 1) < 1e-10);
    assert(Math.abs(Math.sin(relative)) < 1e-10);
  }
}

// For a real diagonal family generator W, complex conjugation sends
// exp(itX) to exp(-itX), so the standard inner-style product cancels.
for (const qi of q) {
  const plus = [Math.cos(qi * 0.37), Math.sin(qi * 0.37)];
  const minus = [Math.cos(qi * 0.37), -Math.sin(qi * 0.37)];
  const product = [
    plus[0] * minus[0] - plus[1] * minus[1],
    plus[0] * minus[1] + plus[1] * minus[0],
  ];
  assert(Math.abs(product[0] - 1) < 1e-10);
  assert(Math.abs(product[1]) < 1e-10);
}

console.log(JSON.stringify({
  generator: 'X = diag(-2,1,1)',
  jordanDerivation: 'delta_X(A) = i[X,A]',
  matrixUnitCharges: charges,
  crossPeirceCharges: [-3, 3],
  residualFundamentalAction: 'exp(2pi i X/3) = omega I_3',
  residualJordanAction: 'A -> omega I A omega^-1 I = A',
  standardCommutantInnerLift: 'W J W J^-1 = 1 when J W J^-1 = W^-1',
  conclusion: 'Jordan conjugation derives the charge-three relational rotation but quotients out the residual central Z3; a faithful fermion/module central lift is required.',
}, null, 2));
