import assert from 'node:assert/strict';

const tol = 1e-10;
const close = (a, b) => Math.abs(a - b) < tol;
const C = (re, im = 0) => ({ re, im });
const mul = (x, y) => C(x.re * y.re - x.im * y.im, x.re * y.im + x.im * y.re);
const conj = (x) => C(x.re, -x.im);
const pow = (x, n) => { let y = C(1); for (let k = 0; k < n; k += 1) y = mul(y, x); return y; };
const eq = (x, y) => close(x.re, y.re) && close(x.im, y.im);
const expi = (x) => C(Math.cos(x), Math.sin(x));
const frame = (phi) => {
  const s = 1 / Math.sqrt(2);
  return [C(s * Math.cos(-phi / 2), s * Math.sin(-phi / 2)), C(s * Math.cos(phi / 2), s * Math.sin(phi / 2))];
};

const cubicWeights = [];
for (let p = 0; p <= 3; p += 1) cubicWeights.push((3 - 2 * p) / 2);
assert.deepEqual(cubicWeights, [1.5, 0.5, -0.5, -1.5]);
assert.ok(!cubicWeights.includes(3));

for (let n = 0; n < 24; n += 1) {
  const phi = (2 * Math.PI * n) / 24;
  const [a, b] = frame(phi);
  const ratio = mul(b, conj(a)); // |a|^2 exp(i phi), globally polynomial but radially scaled
  const bicubic = mul(pow(b, 3), pow(conj(a), 3));
  const expectedRatio = { re: 0.5 * Math.cos(phi), im: 0.5 * Math.sin(phi) };
  const expectedBicubic = { re: 0.125 * Math.cos(3 * phi), im: 0.125 * Math.sin(3 * phi) };
  assert.ok(eq(ratio, expectedRatio));
  assert.ok(eq(bicubic, expectedBicubic));

  const [ad, bd] = frame(phi + Math.PI);
  const deckBicubic = mul(pow(bd, 3), pow(conj(ad), 3));
  assert.ok(eq(deckBicubic, C(-bicubic.re, -bicubic.im)));

  const square = pow(bicubic, 2);
  assert.ok(close(square.re, Math.cos(6 * phi) / 64));
}

const projectiveCoordinate = 'z=b/a=exp(i phi) on the a-nonzero chart';
const polynomialRepresentative = 'b^3 conjugate(a)^3 = exp(i3phi)/8 on the normalized Hopf root';

console.log(JSON.stringify({
  protocol: 'oriented-exceptional-cubic-vs-half-phase-hopf-root/1',
  holomorphicCubicFrameWeights: cubicWeights,
  phaseWeightThreePresentInPrimitiveCubic: false,
  projectiveCoordinate,
  polynomialRepresentative,
  representativeDegreeInFrameCoefficients: 6,
  deckCharacter: -1,
  squareHarmonic: 6,
  squareDegreeInFrameCoefficients: 12,
  existingCandidate: 'oriented exceptional complement determinant det Z',
  remainingGate: 'construct an equivariant map from the Furey Hopf root or its projective ratio into the exceptional complement field Z',
  passed: true,
}, null, 2));
