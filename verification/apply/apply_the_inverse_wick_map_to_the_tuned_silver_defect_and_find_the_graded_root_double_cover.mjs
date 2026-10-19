import assert from 'node:assert/strict';

const tol = 1e-9;
const close = (a, b, t = tol) => Math.abs(a - b) < t;
const g = 1 + Math.SQRT2;
const q = g ** 4;

// At ell=asinh(1): normal (a_n^2,b_n^2)=(1,q),
// tangent (a_t^2,b_t^2)=(1/q,1).
const mod2N = (w) => ((w * w + 1) / (w * w + q)) ** 2;
const mod2T = (w) => ((w * w + 1 / q) / (w * w + 1)) ** 2;
const A = (w) => 1 - mod2N(w);
const B = (w) => 1 - mod2T(w);
const split = (w) => A(w) - B(w); // = |f_t|^2-|f_n|^2

assert.ok(close(split(0), 0));
for (const w of [0.01, 0.1, 0.5, 1, 4, 20]) assert.ok(split(w) > 0);

// Exact factorization with x=w^2, u=|f_t|, v=|f_n|.
const factorizedSplit = (w) => {
  const x = w * w;
  const u = (x + 1 / q) / (x + 1);
  const v = (x + 1) / (x + q);
  const uMinusV = x * (q + 1 / q - 2) / ((x + 1) * (x + q));
  return uMinusV * (u + v);
};
for (const w of [0, 0.1, 1, 4]) assert.ok(close(split(w), factorizedSplit(w)));

// Quadratic zero and its exact leading coefficient.
const leading = 2 * (q - 1) ** 2 / q ** 3;
// Use a tolerance that includes the explicit O(w^2) correction after division
// by w^2; the largest sample has a ~2.21e-5 truncation remainder.
for (const w of [1e-3, 2e-3, 5e-3]) assert.ok(close(split(w) / (w * w), leading, 3e-5));

const p = (w) => 0.5 * Math.sqrt(A(w) + B(w));
const rUnsigned = (w) => 0.5 * Math.sqrt(Math.max(0, split(w)));
const rSigned = (w) => Math.sign(w) * rUnsigned(w);

for (const w of [0.1, 0.5, 1, 4]) {
  assert.ok(close(p(-w), p(w)));
  assert.ok(close(rUnsigned(-w), rUnsigned(w)));
  assert.ok(close(rSigned(-w), -rSigned(w)));
  // Inverse Wick recovery of diag(A,B).
  const detC = p(w) ** 2 - rSigned(w) ** 2;
  const recoveredA = 2 * detC + 4 * rSigned(w) ** 2;
  const recoveredB = 2 * detC;
  assert.ok(close(recoveredA, A(w)));
  assert.ok(close(recoveredB, B(w)));
}

// The unsigned root has a cusp; the signed root has matching derivatives.
const h = 1e-6;
const unsignedRight = (rUnsigned(h) - rUnsigned(0)) / h;
const unsignedLeft = (rUnsigned(0) - rUnsigned(-h)) / h;
const signedRight = (rSigned(h) - rSigned(0)) / h;
const signedLeft = (rSigned(0) - rSigned(-h)) / h;
assert.ok(unsignedRight > 0 && unsignedLeft < 0);
assert.ok(close(signedRight, signedLeft, 1e-5));

console.log(JSON.stringify({
  protocol: 'tuned-silver-inverse-wick-root-double-cover/1',
  tunedLoss: 'asinh(1)',
  defectOrdering: 'A_n>A_t for every nonzero real frequency',
  degeneracy: 'A_n=A_t only at omega=0 on the finite real axis',
  splittingOrder: 'A_n-A_t ~ [2(q-1)^2/q^3] omega^2',
  evenRoot: 'continuous with |omega| cusp',
  analyticRealAxisRoot: 'signed odd coherence r(-omega)=-r(omega)',
  sewing: 'C(-omega)=D C(omega) D',
  targetCovariance: 'even and smooth',
  upperHalfPlaneSpectralFactorDerived: false,
  passed: true,
}, null, 2));
