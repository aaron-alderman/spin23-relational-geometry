import assert from 'node:assert/strict';

const tol = 1e-7;
const close = (a, b, t = tol) => Math.abs(a - b) < t;
const determinant = (theta) => 0.25 * Math.sin(theta) ** 2;
const barrier = (theta, mu = 1) => -mu * Math.log(4 * determinant(theta));
const potential = (theta, phi, mu = 1, kappa = 1) =>
  barrier(theta, mu) - kappa * Math.sin(theta) ** 6 * Math.cos(6 * phi);

for (let n = 0; n < 6; n += 1) {
  assert.ok(close(potential(Math.PI / 2, n * Math.PI / 3, 2.3, 1.7), -1.7));
}
for (const theta of [1e-2, 1e-4, 1e-6]) {
  assert.ok(barrier(theta, 1) > 0);
}
assert.ok(barrier(1e-6, 1) > barrier(1e-4, 1));
assert.ok(barrier(Math.PI - 1e-6, 1) > barrier(Math.PI - 1e-4, 1));

const mu = 2.3;
const kappa = 1.7;
const h = 1e-4;
const v0 = potential(Math.PI / 2, 0, mu, kappa);
const second = (vp, vm) => (vp - 2 * v0 + vm) / (h * h);
const thetaCurvature = second(
  potential(Math.PI / 2 + h, 0, mu, kappa),
  potential(Math.PI / 2 - h, 0, mu, kappa),
);
const phiCurvature = second(
  potential(Math.PI / 2, h, mu, kappa),
  potential(Math.PI / 2, -h, mu, kappa),
);
assert.ok(Math.abs(thetaCurvature - (2 * mu + 6 * kappa)) < 2e-5);
assert.ok(Math.abs(phiCurvature - 36 * kappa) < 2e-5);

// The coherent rank-one projector has determinant zero for every normalized spinor.
for (let n = 0; n <= 20; n += 1) {
  const theta = Math.PI * n / 20;
  const aa = Math.cos(theta / 2) ** 2;
  const bb = Math.sin(theta / 2) ** 2;
  const offAbs2 = aa * bb;
  assert.ok(close(aa * bb - offAbs2, 0));
}

console.log(JSON.stringify({
  protocol: 'face-population-jordan-barrier-plus-hopf-cubic/1',
  populationJordanElement: 'R=diag(|a|^2,|b|^2)',
  determinant: 'det R=|a|^2|b|^2=sin(theta)^2/4',
  barrier: '-mu log(4 det R)',
  combinedPotential: '-mu log(sin(theta)^2)-kappa sin(theta)^6 cos(6phi)',
  positiveMinima: 'theta=pi/2, phi=n pi/3',
  hessian: { theta: thetaCurvature, phi: phiCurvature },
  expectedHessian: { theta: 2 * mu + 6 * kappa, phi: 36 * kappa },
  coherentProjectorDeterminant: 0,
  assumption: 'a face-dephased population Jordan element is physically available',
  passed: true,
}, null, 2));
