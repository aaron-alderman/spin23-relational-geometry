import assert from 'node:assert/strict';

const tol = 1e-10;
const close = (a, b) => Math.abs(a - b) < tol;
const C = (re, im = 0) => ({ re, im });
const mul = (x, y) => C(x.re * y.re - x.im * y.im, x.re * y.im + x.im * y.re);
const conj = (x) => C(x.re, -x.im);
const pow = (x, n) => { let y = C(1); for (let k = 0; k < n; k += 1) y = mul(y, x); return y; };
const eq = (x, y) => close(x.re, y.re) && close(x.im, y.im);
const scale = (s, x) => C(s * x.re, s * x.im);

const spinor = (theta, phi, gauge = 0) => [
  scale(Math.cos(theta / 2), C(Math.cos(gauge - phi / 2), Math.sin(gauge - phi / 2))),
  scale(Math.sin(theta / 2), C(Math.cos(gauge + phi / 2), Math.sin(gauge + phi / 2))),
];
const hopfW = ([a, b]) => scale(2, mul(b, conj(a)));
const orientation = (s) => pow(hopfW(s), 3);
const potential = (theta, phi, kappa = 1) => -kappa * pow(hopfW(spinor(theta, phi)), 6).re;

for (let n = 0; n < 19; n += 1) {
  const theta = Math.PI * n / 18;
  const phi = 0.37 + 2 * Math.PI * n / 19;
  const base = spinor(theta, phi, 0);
  const gauged = spinor(theta, phi, 0.731);
  assert.ok(eq(hopfW(base), hopfW(gauged)));
  const w = hopfW(base);
  assert.ok(eq(w, C(Math.sin(theta) * Math.cos(phi), Math.sin(theta) * Math.sin(phi))));
  assert.ok(close(potential(theta, phi), -(Math.sin(theta) ** 6) * Math.cos(6 * phi)));
}

for (let n = 0; n < 6; n += 1) {
  const phi = n * Math.PI / 3;
  assert.ok(close(potential(Math.PI / 2, phi), -1));
  assert.ok(close(potential(Math.PI / 2, phi + Math.PI / 6, -1), -1));
}
assert.ok(close(orientation(spinor(0, 1.2)).re, 0));
assert.ok(close(orientation(spinor(Math.PI, 2.4)).re, 0));

const h = 1e-4;
const second = (f0, fp, fm) => (fp - 2 * f0 + fm) / (h * h);
const v0 = potential(Math.PI / 2, 0);
const thetaCurvature = second(v0, potential(Math.PI / 2 + h, 0), potential(Math.PI / 2 - h, 0));
const phiCurvature = second(v0, potential(Math.PI / 2, h), potential(Math.PI / 2, -h));
assert.ok(close(thetaCurvature, 6) || Math.abs(thetaCurvature - 6) < 1e-5);
assert.ok(Math.abs(phiCurvature - 36) < 1e-5);

console.log(JSON.stringify({
  protocol: 'global-bicubic-hopf-orientation-sixfold-potential/1',
  base: 'CP1 = S2',
  globalCoordinate: 'w=2 b conjugate(a)=sin(theta) exp(i phi)',
  orientationAmplitude: 'D=w^3=sin(theta)^3 exp(i3phi)',
  potential: 'V=-kappa Re(w^6)=-kappa sin(theta)^6 cos(6phi)',
  positiveMinima: 'theta=pi/2, phi=n pi/3',
  negativeMinima: 'theta=pi/2, phi=(n+1/2) pi/3',
  unitKappaHessian: { theta: thetaCurvature, phi: phiCurvature },
  forcedZeros: ['north pole', 'south pole'],
  remainingGate: 'identify w^3 equivariantly with the oriented exceptional determinant and derive its coefficient',
  passed: true,
}, null, 2));
