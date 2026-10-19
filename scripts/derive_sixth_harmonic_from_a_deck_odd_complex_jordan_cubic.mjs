import assert from 'node:assert/strict';

const tol = 1e-10;
const close = (a, b) => Math.abs(a - b) < tol;
const cexp = (theta) => ({ re: Math.cos(theta), im: Math.sin(theta) });
const mul = (a, b) => ({ re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re });
const scale = (s, z) => ({ re: s * z.re, im: s * z.im });
const eq = (a, b) => close(a.re, b.re) && close(a.im, b.im);
const cubic = (phi, rho = 1) => scale(rho ** 3, cexp(3 * phi));

for (let n = 0; n < 24; n += 1) {
  const phi = (2 * Math.PI * n) / 24;
  const c = cubic(phi, 1.7);
  assert.ok(eq(cubic(phi + (2 * Math.PI) / 3, 1.7), c));
  assert.ok(eq(cubic(phi + Math.PI, 1.7), scale(-1, c)));
  assert.ok(eq(cubic(-phi, 1.7), { re: c.re, im: -c.im }));
  const c2 = mul(c, c);
  assert.ok(close(c2.re, 1.7 ** 6 * Math.cos(6 * phi)));
  assert.ok(close(mul(c, { re: c.re, im: -c.im }).re, 1.7 ** 6));
}

const angularMonomials = [];
for (let p = 0; p <= 6; p += 1) {
  for (let q = 0; q <= 6; q += 1) {
    if (p + q === 0) continue;
    const weight = p - q;
    const degree = p + q;
    const placementEven = weight % 3 === 0;
    const deckEven = degree % 2 === 0;
    if (placementEven && deckEven && weight !== 0) angularMonomials.push({ p, q, degree, weight });
  }
}

const minimumAngularDegree = Math.min(...angularMonomials.map((x) => x.degree));
assert.equal(minimumAngularDegree, 6);
assert.ok(angularMonomials.some((x) => x.p === 6 && x.q === 0));
assert.ok(angularMonomials.some((x) => x.p === 0 && x.q === 6));

console.log(JSON.stringify({
  protocol: 'deck-odd-complex-jordan-cubic-sixth-harmonic/1',
  rootPhase: 'z(phi)=rho exp(i phi)',
  cubicPhase: 'N(z(phi))=rho^3 exp(i 3 phi) N(z0)',
  placementActionOnCubic: '+1',
  deckActionOnCubic: '-1',
  realActionOnCubic: 'complex conjugation',
  forbiddenTerm: 'Re N',
  constantTerm: '|N|^2',
  minimalAngularTerm: 'Re(N^2)=|N0|^2 rho^6 cos(6 phi), after fixing the reference phase',
  minimumAngularPolynomialDegree: minimumAngularDegree,
  boundary: 'A real Jordan determinant alone has no U(1) phase; a complexified or orientation-sensitive cubic amplitude is required.',
  passed: true,
}, null, 2));
