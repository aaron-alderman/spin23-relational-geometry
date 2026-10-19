import assert from 'node:assert/strict';

const charges = {
  Q: 1 / 6,
  uc: -2 / 3,
  dc: 1 / 3,
  L: -1 / 2,
  ec: 1,
};

const close = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;
const phase = x => ({ re: Math.cos(x), im: Math.sin(x) });
const same = (a, b) => close(a.re, b.re) && close(a.im, b.im);
const conjugate = a => ({ re: a.re, im: -a.im });
const theta = 0.731;

for (const [name, y] of Object.entries(charges)) {
  const sourcePhase = phase(y * theta);
  const afterAntilinear = conjugate(sourcePhase); // J rho_y
  const sameChargeTarget = phase(y * theta);       // rho_y J
  assert.equal(same(afterAntilinear, sameChargeTarget), false, `${name} unexpectedly admits same-charge antiunitary equivariance`);

  const conjugateTarget = phase(-y * theta);       // rho_{-y} J
  assert.equal(same(afterAntilinear, conjugateTarget), true);

  const invertedGroupTarget = phase(y * (-theta)); // rho_y(alpha(theta)) J
  assert.equal(same(afterAntilinear, invertedGroupTarget), true);
}

assert(Object.values(charges).every(y => y !== 0));
console.log('Exchange/CAR gauge-equivariance certificate: PASS');
console.log('same-charge antiunitary: obstructed; conjugate Nambu or gauge inversion: valid');

