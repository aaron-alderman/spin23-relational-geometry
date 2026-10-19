import assert from 'node:assert/strict';

const close = (x, y, tol = 1e-8) => Math.abs(x - y) < tol;
const q = (1 + Math.SQRT2) ** 4;
const a = Math.sqrt(q);

const A = (w) => 1 - ((w * w + 1) / (w * w + q)) ** 2;
const B = (w) => 1 - ((w * w + 1 / q) / (w * w + 1)) ** 2;

// Exact tuned dilation duality.
for (const w of [0, 0.1, 0.5, 1, 3, 10]) assert.ok(close(B(w), A(a * w), 2e-12));

// Inverse-Fourier profile of A, up to the standard transform convention.
const inverseA = (t) => Math.exp(-a * Math.abs(t)) * (
  (q - 1) / a - ((q - 1) ** 2 / (4 * a ** 3)) * (1 + a * Math.abs(t))
);
const crossingA = (3 * q + 1) / (a * (q - 1));
assert.ok(inverseA(0) > 0);
assert.ok(close(inverseA(crossingA), 0, 2e-12));
assert.ok(inverseA(2 * crossingA) < 0);

// Odd rational internal kernels with half the external pole scale.
const b = a / 2;
const phi0 = (nu) => nu / (nu * nu + b * b);
const phi1 = (nu) => nu / (nu * nu + b * b) ** 2;
const C00 = (w) => Math.PI * a / (w * w + a * a);
const C01 = (w) => Math.PI * (a * a - w * w) / (a * (w * w + a * a) ** 2);

// Numerical convolution check on the compactified real line nu=tan(theta).
const integrateReal = (fn, n = 40000) => {
  assert.equal(n % 2, 0);
  const lo = -Math.PI / 2 + 1e-8;
  const hi = Math.PI / 2 - 1e-8;
  const h = (hi - lo) / n;
  const mapped = (theta) => {
    const nu = Math.tan(theta);
    return fn(nu) / Math.cos(theta) ** 2;
  };
  let sum = mapped(lo) + mapped(hi);
  for (let i = 1; i < n; i += 1) sum += (i % 2 ? 4 : 2) * mapped(lo + i * h);
  return sum * h / 3;
};
for (const w of [0, 0.5, 2]) {
  const c00 = integrateReal((nu) => phi0(nu) * phi0(nu + w));
  const c01 = integrateReal((nu) => phi0(nu) * phi1(nu + w));
  assert.ok(close(c00, C00(w), 2e-7));
  assert.ok(close(c01, C01(w), 2e-7));
}

const d = q - 1;
const alpha = d * (3 * q + 1) / (2 * Math.PI * a ** 3);
const beta = -(d ** 2) / (2 * Math.PI * a);
const reconstructedA = (w) => alpha * C00(w) + beta * C01(w);
for (const w of [0, 0.1, 0.5, 1, 3, 10]) assert.ok(close(reconstructedA(w), A(w), 2e-12));

// Writing the cross term symmetrically gives coefficient metric
// [[alpha,beta/2],[beta/2,0]], which necessarily has negative determinant.
const metricDet = -((beta / 2) ** 2);
assert.ok(alpha > 0 && beta < 0 && metricDet < 0);

console.log(JSON.stringify({
  protocol: 'tuned-defect-signed-odd-frequency-convolution/1',
  dilationIdentity: 'B(omega)=A(sqrt(q) omega)',
  scalarPositiveAutocorrelation: false,
  reason: 'inverse-time prototype changes sign once',
  exactOddKernels: 'nu/(nu^2+b^2) and nu/(nu^2+b^2)^2 with b=sqrt(q)/2',
  signedTwoKernelFactorization: true,
  coefficientMetricSignature: '(1,1)',
  microscopicFermionLoopDerived: false,
  passed: true,
}, null, 2));
