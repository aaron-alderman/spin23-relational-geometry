import assert from 'node:assert/strict';

const tol = 1e-8;
const close = (a, b, t = tol) => Math.abs(a - b) < t;
const determinant = (theta, s) => (1 - s ** 2) * Math.sin(theta) ** 2 / 4;
const coherentCoordinateMagnitude = (theta, s) => s * Math.sin(theta);
const normalizedBarrier = (theta, mu = 1) => -mu * Math.log(Math.sin(theta) ** 2);
const potential = (theta, phi, s, mu = 1, kappa = 1) =>
  normalizedBarrier(theta, mu) - kappa * s ** 6 * Math.sin(theta) ** 6 * Math.cos(6 * phi);

for (const s of [0, 0.2, 0.5, 0.9, 1]) {
  for (let n = 0; n <= 20; n += 1) {
    const theta = Math.PI * n / 20;
    const p = Math.cos(theta / 2) ** 2;
    const q = Math.sin(theta / 2) ** 2;
    const offAbs2 = s ** 2 * p * q;
    assert.ok(close(p * q - offAbs2, determinant(theta, s)));
    assert.ok(determinant(theta, s) >= -tol);
  }
}

const s = 0.63;
const mu = 1.9;
const kappa = 2.1;
for (let n = 0; n < 6; n += 1) {
  const phi = n * Math.PI / 3;
  assert.ok(close(potential(Math.PI / 2, phi, s, mu, kappa), -kappa * s ** 6));
}
assert.equal(coherentCoordinateMagnitude(Math.PI / 2, 0), 0);
assert.equal(determinant(Math.PI / 2, 1), 0);
assert.ok(coherentCoordinateMagnitude(Math.PI / 2, s) > 0);
assert.ok(determinant(Math.PI / 2, s) > 0);

const h = 1e-4;
const v0 = potential(Math.PI / 2, 0, s, mu, kappa);
const second = (vp, vm) => (vp - 2 * v0 + vm) / (h * h);
const thetaCurvature = second(
  potential(Math.PI / 2 + h, 0, s, mu, kappa),
  potential(Math.PI / 2 - h, 0, s, mu, kappa),
);
const phiCurvature = second(
  potential(Math.PI / 2, h, s, mu, kappa),
  potential(Math.PI / 2, -h, s, mu, kappa),
);
assert.ok(Math.abs(thetaCurvature - (2 * mu + 6 * kappa * s ** 6)) < 2e-5);
assert.ok(Math.abs(phiCurvature - 36 * kappa * s ** 6) < 2e-5);

for (const x of [0, 0.1, 0.5, 0.9, 1]) {
  const k0sq = (1 + x) / 2;
  const k1sq = (1 - x) / 2;
  assert.ok(close(k0sq + k1sq, 1));
  assert.ok(close(k0sq - k1sq, x));
  assert.ok(k0sq >= 0 && k1sq >= 0);
}

console.log(JSON.stringify({
  protocol: 'partial-face-dephasing-jordan-barrier-hopf-cubic/1',
  channel: 'E_s(P)=((1+s)/2)P+((1-s)/2)DPD, D=diag(1,-1)',
  reducedMatrix: 'rho_s=[[|a|^2,s a conjugate(b)],[s b conjugate(a),|b|^2]]',
  determinant: '(1-s^2)|a|^2|b|^2',
  coherentCoordinate: 'w_s=2s b conjugate(a)',
  compatibilityWindow: '0<s<1',
  endpoints: { s0: 'phase erased', s1: 'determinant barrier unavailable' },
  sample: { s, mu, kappa, thetaCurvature, phiCurvature },
  remainingGate: 'derive the channel strength and the sixth-order interaction from one microscopic Furey/environment coupling',
  passed: true,
}, null, 2));
