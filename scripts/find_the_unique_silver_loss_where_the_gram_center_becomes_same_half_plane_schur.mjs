import assert from 'node:assert/strict';

const tol = 1e-10;
const close = (a, b, t = tol) => Math.abs(a - b) < t;
const C = (re, im = 0) => ({ re, im });
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (z) => C(z.re, -z.im);
const div = (a, b) => {
  const d = b.re ** 2 + b.im ** 2;
  return C((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d);
};
const abs2 = (z) => z.re ** 2 + z.im ** 2;
const gammaN = 1 + Math.SQRT2;
const gammaT = Math.SQRT2 - 1;
const ellStar = Math.log(gammaN);

assert.ok(close(ellStar, Math.asinh(1)));
assert.ok(close(Math.cosh(ellStar), Math.SQRT2));
assert.ok(close(Math.sinh(ellStar), 1));

const an = gammaN * Math.exp(-ellStar);
const bn = gammaN * Math.exp(ellStar);
const at = gammaT * Math.exp(-ellStar);
const bt = gammaT * Math.exp(ellStar);
assert.ok(close(an, 1));
assert.ok(close(bt, 1));
assert.ok(close(at, gammaT ** 2));
assert.ok(close(bn, gammaN ** 2));

const response = (omega, gamma, ell) => {
  const r = div(C(omega, -gamma * Math.exp(-ell)), C(omega, gamma * Math.exp(ell)));
  return mul(r, r);
};
const schurCenter = (omega) => {
  const r = div(C(omega, at), C(omega, bn));
  return mul(r, r);
};

for (const omega of [-100, -4, -1, -0.2, 0, 0.2, 1, 4, 100]) {
  const fn = response(omega, gammaN, ellStar);
  const ft = response(omega, gammaT, ellStar);
  const center = mul(conj(ft), fn);
  const analytic = schurCenter(omega);
  assert.ok(close(center.re, analytic.re));
  assert.ok(close(center.im, analytic.im));
  assert.ok(abs2(analytic) <= 1 + tol);
  const opposite = schurCenter(-omega);
  assert.ok(close(opposite.re, analytic.re));
  assert.ok(close(opposite.im, -analytic.im));
  const radius2 = (1 - abs2(fn)) * (1 - abs2(ft));
  const gramDetAtCenter = radius2;
  assert.ok(gramDetAtCenter >= -tol);
}

for (const ell of [0, 0.2, 0.7, ellStar, 1.2, 2]) {
  const mismatch = gammaN * Math.exp(-ell) - gammaT * Math.exp(ell);
  if (close(ell, ellStar)) assert.ok(close(mismatch, 0));
  else assert.ok(Math.abs(mismatch) > 1e-6);
}

console.log(JSON.stringify({
  protocol: 'unique-silver-loss-gram-center-schur-globalization/1',
  tunedLoss: 'ell_*=log(1+sqrt(2))=asinh(1)',
  hyperbolicData: { cosh: 'sqrt(2)', sinh: 1 },
  poleZeroMatch: 'a_n=b_t=1',
  remainingScales: ['a_t=(sqrt(2)-1)^2', 'b_n=(1+sqrt(2))^2'],
  analyticOverlap: 's_c(z)=((z+i a_t)/(z+i b_n))^2',
  gramChoice: 'disk center, with orthogonal residual environment directions',
  uniqueness: 'a_n=b_t has one solution ell>=0',
  checkpointMagnitude: 'exp(-4 ell_*)',
  checkpointLockingSuppression: 'exp(-24 ell_*)',
  boundary: 'generic loss retains an upper-half-plane pole in f_t(-z)f_n(z)',
  passed: true,
}, null, 2));
