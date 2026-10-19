import assert from 'node:assert/strict';

const rho = 1 + Math.sqrt(2);
const gNormal = rho * rho;
const gTangent = 1 / gNormal;

const betaWithoutCommonSinh = (z, g, c) => g * (z + g * c) / (z * z - 2 * g * z + g * g * c * c);

// Polynomial coefficients, ascending, for 3 beta(gA)-beta(gB) after clearing positive denominators.
function criterionPolynomial(gA, gB, c) {
  const convolve = (x, y) => {
    const out = Array(x.length + y.length - 1).fill(0);
    x.forEach((a, i) => y.forEach((b, j) => { out[i + j] += a * b; }));
    return out;
  };
  const add = (x, y, scale = 1) => Array(Math.max(x.length, y.length)).fill(0).map((_, i) => (x[i] ?? 0) + scale * (y[i] ?? 0));
  const numeratorA = [gA * gA * c, gA];
  const numeratorB = [gB * gB * c, gB];
  const denominatorA = [gA * gA * c * c, -2 * gA, 1];
  const denominatorB = [gB * gB * c * c, -2 * gB, 1];
  return add(convolve(numeratorA, denominatorB).map(x => 3 * x), convolve(numeratorB, denominatorA), -1);
}

const evaluate = (coefficients, z) => coefficients.reduceRight((sum, coefficient) => sum * z + coefficient, 0);

function minimumOnPositiveAxis(coefficients) {
  const [a0, a1, a2, a3] = coefficients;
  const candidates = [0];
  const discriminant = 4 * a2 * a2 - 12 * a3 * a1;
  if (discriminant >= 0) {
    const root = Math.sqrt(discriminant);
    for (const z of [(-2 * a2 - root) / (6 * a3), (-2 * a2 + root) / (6 * a3)]) if (z > 0) candidates.push(z);
  }
  return candidates.map(z => ({ z, value: evaluate(coefficients, z) })).sort((x, y) => x.value - y.value)[0];
}

function normalEvenMinimum(ell) {
  const c = Math.cosh(2 * ell);
  return minimumOnPositiveAxis(criterionPolynomial(gNormal, gTangent, c));
}

let lower = 0.4;
let upper = 0.55;
assert.ok(normalEvenMinimum(lower).value < 0);
assert.ok(normalEvenMinimum(upper).value > 0);
for (let iteration = 0; iteration < 100; iteration += 1) {
  const middle = (lower + upper) / 2;
  if (normalEvenMinimum(middle).value >= 0) upper = middle; else lower = middle;
}
const ellStar = (lower + upper) / 2;
const thresholdMinimum = normalEvenMinimum(ellStar);
assert.ok(Math.abs(thresholdMinimum.value) < 1e-11);
assert.ok(Math.abs(ellStar - 0.47791764147617055) < 1e-12);

for (const ell of [0.01, 0.1, 0.3, ellStar - 1e-6]) assert.ok(normalEvenMinimum(ell).value < 0);
for (const ell of [ellStar + 1e-6, 0.6, 1, 2]) assert.ok(normalEvenMinimum(ell).value > 0);

const tangentEvenAsymptoticRatio = 3 * gTangent / gNormal;
assert.ok(tangentEvenAsymptoticRatio < 1);

const cStar = Math.cosh(2 * ellStar);
const ratioAtContact = 3 * betaWithoutCommonSinh(thresholdMinimum.z, gNormal, cStar) / betaWithoutCommonSinh(thresholdMinimum.z, gTangent, cStar);
assert.ok(Math.abs(ratioAtContact - 1) < 1e-10);

console.log(JSON.stringify({
  protocol: 'silver-loss-jordan-barrier-inequality/1',
  silverSquaredScales: { normal: gNormal, tangent: gTangent, product: gNormal * gTangent },
  criterion: '3 beta_even(z) > beta_odd(z) for every z=(omega/omega0)^2 >= 0',
  tangentEvenNoGo: `lim_{z->infinity} 3 beta_t/beta_n = ${tangentEvenAsymptoticRatio} < 1`,
  normalEvenThreshold: { ellStar, attenuationExpMinusEll: Math.exp(-ellStar), contactZ: thresholdMinimum.z, cosh2Ell: cStar },
  belowThreshold: 'The normal-even cubic chart fails on an intermediate frequency band near the tangent pole.',
  aboveThreshold: 'The cleared cubic sign polynomial is positive on the nonnegative axis.',
  method: 'Clear positive denominators to a cubic polynomial; evaluate its endpoint and all positive derivative critical points; bisect the unique double-contact threshold.',
  boundary: 'This tests the diagonal rank-three cubic barrier only. Failure does not exclude other Jordan algebras, other Peirce embeddings, or multiple charts.',
  passed: true
}, null, 2));
