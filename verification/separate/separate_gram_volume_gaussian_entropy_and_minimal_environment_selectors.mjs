import assert from 'node:assert/strict';

const tol = 1e-10;
const close = (a, b, t = tol) => Math.abs(a - b) < t;

// Generic unequal-transfer Gram disk in coordinates delta=s-c.
const A = 0.37;
const B = 0.61;
const radius2 = A * B;
const determinant = (dx, dy) => radius2 - dx * dx - dy * dy;
assert.ok(close(determinant(0, 0), radius2));
for (const [dx, dy] of [[0.1, 0], [0, 0.2], [0.12, -0.17]]) {
  assert.ok(determinant(dx, dy) < determinant(0, 0));
}
assert.ok(close(determinant(Math.sqrt(radius2), 0), 0));

// Conditional Gaussian entropy differs from log(det) only by a constant.
const gaussianEntropyOffsetFree = (dx, dy) => 0.5 * Math.log(determinant(dx, dy));
assert.ok(gaussianEntropyOffsetFree(0, 0) > gaussianEntropyOffsetFree(0.1, 0));

// Purity of rho=G/3 depends on |s|, not on |s-c|. Its minimizer is the
// point of the disk closest to the origin, generally not the centre.
const closestDiskPointToOrigin = (cAbs, radius) => cAbs <= radius ? 0 : cAbs - radius;
assert.ok(close(closestDiskPointToOrigin(0.25, 0.75), 0));
assert.ok(close(closestDiskPointToOrigin(0.9, 0.2), 0.7));

// Explicit von Neumann entropy counterexample: f0=f1=r real.
// Eigenvalues of G are 1-s and 1+s/2 +- sqrt(s^2/4+2r^2).
const entropySymmetricGram = (r, s) => {
  const d = Math.sqrt(s * s / 4 + 2 * r * r);
  const eigenvalues = [1 - s, 1 + s / 2 + d, 1 + s / 2 - d];
  return -eigenvalues.reduce((sum, x) => sum + (x > 0 ? (x / 3) * Math.log(x / 3) : 0), 0);
};
const r = 0.5;
const center = r * r;
const competitor = 0.14;
assert.ok(entropySymmetricGram(r, competitor) > entropySymmetricGram(r, center) + 1e-3);

// At the physical tuned silver checkpoint omega=1, the origin lies in the
// overlap disk, so quadratic entropy selects s=0 rather than the nonzero centre.
const gammaN = 1 + Math.SQRT2;
const gammaT = Math.SQRT2 - 1;
const ell = Math.asinh(1);
const modulus2 = (omega, gamma) => {
  const a = gamma * Math.exp(-ell);
  const b = gamma * Math.exp(ell);
  return ((omega * omega + a * a) / (omega * omega + b * b)) ** 2;
};
const pn = modulus2(1, gammaN);
const pt = modulus2(1, gammaT);
assert.ok(pn + pt < 1); // equivalent to |c| <= R
assert.ok(pn * pt > 0); // the Gram centre is nonzero

console.log(JSON.stringify({
  protocol: 'gram-selector-separation/1',
  gramCentreSelectedBy: [
    'residual orthogonality',
    'maximum Gram determinant',
    'maximum conditional Gaussian residual entropy at fixed variances',
  ],
  notSelectedBy: [
    'minimum Stinespring dimension',
    'minimum normalized-Gram purity in general',
    'maximum normalized-Gram von Neumann entropy in general',
  ],
  minimumDimensionLocus: 'Gram-disk boundary',
  quadraticEntropySelector: 'disk point closest to zero',
  physicalCheckpointOriginInsideDisk: true,
  passed: true,
}, null, 2));
