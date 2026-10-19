import assert from 'node:assert/strict';

const rootForSeparation = (ell) => {
  const f = (y) => Math.log(y) + ell * Math.sqrt(1 - y * y);
  let lo = Number.MIN_VALUE;
  let hi = 1 - 1e-14;
  assert.ok(f(lo) < 0);
  assert.ok(f(hi) > 0);
  for (let i = 0; i < 240; i += 1) {
    const mid = (lo + hi) / 2;
    if (f(mid) > 0) hi = mid;
    else lo = mid;
  }
  return (lo + hi) / 2;
};

const samples = [0.1, 0.5, 1, 2, 3, 5, 8].map((ell) => {
  const y = rootForSeparation(ell);
  const kappaOverM = Math.sqrt(1 - y * y);
  const projected = Math.exp(-ell);
  const leadingCorrected = projected + (ell / 2) * Math.exp(-3 * ell);
  assert.ok(Math.abs(y - Math.exp(-ell * kappaOverM)) < 2e-15);
  assert.ok(y > projected);
  return {
    ell,
    exactEnergyOverMass: y,
    kappaOverMass: kappaOverM,
    projectedEnergyOverMass: projected,
    exactOverProjected: y / projected,
    leadingCorrected,
  };
});

assert.ok(Math.abs(samples.at(-1).exactEnergyOverMass - samples.at(-1).leadingCorrected) < 2e-9);

console.log(JSON.stringify({
  protocol: 'exact-piecewise-pfaffian-kink-antikink-spectrum/1',
  matchingCondition: 'kappa^2 cosh(kappa L) = (m0^2+E^2) sinh(kappa L)',
  equivalentEnergyEquation: '|E| = m0 exp(-L sqrt(m0^2-E^2))',
  physicalRoot: '0<|E|/m0<1; the formal |E|/m0=1 endpoint is not normalizable',
  projectedLargeSeparationTerm: '|E|/m0 ~ exp(-m0 L)',
  firstCorrection: '|E|/m0 = exp(-ell) + (ell/2) exp(-3 ell) + O(ell^2 exp(-5 ell))',
  samples,
  passed: true,
}, null, 2));
