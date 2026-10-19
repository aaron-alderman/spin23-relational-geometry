import assert from 'node:assert/strict';

const close = (x, y, tol = 1e-10) => Math.abs(x - y) < tol;
const ell = Math.asinh(1);
const a = Math.exp(2 * ell);
const q = a * a;
const b = a / 2;
const d = q - 1;
const alpha = d * (3 * q + 1) / (2 * Math.PI * a ** 3);
const beta = -(d ** 2) / (2 * Math.PI * a);

const phi0 = (nu, scale) => nu / (nu * nu + scale * scale);
const phi1 = (nu, scale) => nu / (nu * nu + scale * scale) ** 2;

// chi1=b^2 phi1 is minus one half the logarithmic-scale derivative of phi0.
for (const nu of [0.2, 1, 4]) {
  const h = 1e-6;
  const derivativeLog = (
    phi0(nu, b * Math.exp(h)) - phi0(nu, b * Math.exp(-h))
  ) / (2 * h);
  assert.ok(close(b * b * phi1(nu, b), -0.5 * derivativeLog, 2e-8));
}

// In the dimension-matched basis (phi0,chi1), the off-diagonal ratio is one
// tuned dimensionless number rho.
const rho = -beta / (2 * b * b * alpha);
assert.ok(rho > 0 && rho < 1);
assert.ok(close(rho, 2 * (q - 1) / (3 * q + 1)));
assert.ok(close(rho, (6 * Math.SQRT2 - 4) / 7));
const t = Math.tanh(2 * ell);
assert.ok(close(rho, 2 * t / (2 + t)));

const G = [[alpha, -alpha * rho], [-alpha * rho, 0]];
const D = [[1, 0], [0, -1]];
const N = [[1, -1], [0, 1]];
const S = [[1, 0], [0, rho]];
const scalar = Math.sqrt(alpha);
const product = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)));
const transpose = (M) => M[0].map((_, j) => M.map((row) => row[j]));
const scaleMatrix = (r, M) => M.map((row) => row.map((x) => r * x));
const L = scaleMatrix(scalar, product(N, S));
const reconstructed = product(product(transpose(L), D), L);
for (let i = 0; i < 2; i += 1) for (let j = 0; j < 2; j += 1) {
  assert.ok(close(reconstructed[i][j], G[i][j], 2e-12));
}

// N is the unit unipotent shear; all nontrivial continuous data is in alpha
// and rho, both already fixed by the tuned loss after basis normalization.
assert.ok(close(N[0][0], 1) && close(N[1][1], 1));
assert.ok(close(N[0][1], -1) && close(N[1][0], 0));

console.log(JSON.stringify({
  protocol: 'convolution-residue-unit-shear-tuned-scale/1',
  canonicalSecondKernel: 'chi1=b^2 phi1=-(1/2) d_{log b} phi0',
  normalizedMetric: 'alpha [[1,-rho],[-rho,0]]',
  rho: '(6 sqrt(2)-4)/7 = 2 tanh(2 ell*)/(2+tanh(2 ell*))',
  residueFactor: 'L=sqrt(alpha) N_- diag(1,rho)',
  unitShear: 'N_-=[[1,-1],[0,1]]',
  newContinuousFitParameter: false,
  typedTkkIdentificationDerived: false,
  passed: true,
}, null, 2));
