import assert from 'node:assert/strict';

const tol = 1e-10;
const close = (a, b, t = tol) => Math.abs(a - b) < t;

const gammaN = 1 + Math.SQRT2;
const gammaT = Math.SQRT2 - 1;
const ellStar = Math.asinh(1);

assert.ok(close(gammaN * gammaT, 1));
assert.ok(close(gammaN ** 2 + gammaT ** 2, 6));
assert.ok(close(ellStar, Math.log(gammaN)));

const rates = (gamma, ell) => ({
  observed: gamma * Math.cosh(ell),
  environment: gamma * Math.sinh(ell),
  zero: gamma * Math.exp(-ell),
  pole: gamma * Math.exp(ell),
});

const normal = rates(gammaN, ellStar);
const tangent = rates(gammaT, ellStar);

assert.ok(close(normal.observed / normal.environment, Math.SQRT2));
assert.ok(close(tangent.observed / tangent.environment, Math.SQRT2));
assert.ok(close(normal.zero, 1));
assert.ok(close(tangent.pole, 1));

// Natural uncoupled positive quadratic rate costs do not select ell_*.
const rateEnergy = (ell) => 6 * Math.cosh(2 * ell);
const rateEnergyPrime = (ell) => 12 * Math.sinh(2 * ell);
const environmentCost = (ell) => 6 * Math.sinh(ell) ** 2;
const environmentCostPrime = (ell) => 6 * Math.sinh(2 * ell);
assert.ok(rateEnergyPrime(ellStar) > 0);
assert.ok(environmentCostPrime(ellStar) > 0);
assert.ok(rateEnergy(0) < rateEnergy(ellStar));
assert.ok(environmentCost(0) < environmentCost(ellStar));

// The Lorentzian rate invariant is flat in ell and therefore selects nothing.
for (const ell of [0, 0.2, ellStar, 1.4, 3]) {
  const n = rates(gammaN, ell);
  const t = rates(gammaT, ell);
  assert.ok(close(n.observed ** 2 - n.environment ** 2, gammaN ** 2));
  assert.ok(close(t.observed ** 2 - t.environment ** 2, gammaT ** 2));
}

// The pole-zero mismatch is the exact analytic obstruction found in document 1018.
const mismatch = (ell) => gammaN * Math.exp(-ell) - gammaT * Math.exp(ell);
const mismatchPrime = (ell) => -gammaN * Math.exp(-ell) - gammaT * Math.exp(ell);
const causalDefect = (ell) => mismatch(ell) ** 2;
const causalDefectPrime = (ell) => 2 * mismatch(ell) * mismatchPrime(ell);

assert.ok(close(mismatch(ellStar), 0));
assert.ok(close(causalDefect(ellStar), 0));
assert.ok(close(causalDefectPrime(ellStar), 0));
assert.ok(close(2 * mismatchPrime(ellStar) ** 2, 8));

for (const ell of [0, 0.1, 0.4, 0.8, 1.2, 2]) {
  if (!close(ell, ellStar)) assert.ok(causalDefect(ell) > 0);
}

// Equivalently the logarithmic obstruction is a strictly convex square.
const logMismatch = (ell) => Math.log(gammaN * Math.exp(-ell) / (gammaT * Math.exp(ell)));
assert.ok(close(logMismatch(ellStar), 0));
assert.ok(close(logMismatch(0), 2 * ellStar));

console.log(JSON.stringify({
  protocol: 'silver-loss-selection-audit/1',
  tunedLoss: 'ell_*=asinh(1)=log(1+sqrt(2))',
  tunedRates: {
    commonRatio: 'kappa_obs/kappa_env=sqrt(2)',
    crossChannelSeam: 'kappa_obs,n-kappa_env,n = kappa_obs,t+kappa_env,t = 1',
  },
  existingStructures: {
    positiveRateParametrization: 'kinematic; no potential supplied',
    diagonalJordanBarrier: 'flat in logarithmic coordinates',
    silverReactanceAction: 'selects k=1, not ell',
    uncoupledQuadraticRateCost: 'minimized at ell=0',
    rateLorentzInvariant: 'independent of ell',
  },
  conditionalSelector: 'Gram-disk centre plus one-chart causality',
  causalDefect: '(gamma_n exp(-ell)-gamma_t exp(ell))^2',
  curvatureAtMinimum: 8,
  dynamicallyDerived: false,
  passed: true,
}, null, 2));
