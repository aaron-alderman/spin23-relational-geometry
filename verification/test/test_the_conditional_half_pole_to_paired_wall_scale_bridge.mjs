import assert from 'node:assert/strict';

const rootY = (ell) => {
  const f = (y) => Math.log(y) + ell * Math.sqrt(1 - y * y);
  let lo = Number.MIN_VALUE;
  let hi = 1 - 1e-14;
  for (let i = 0; i < 240; i += 1) {
    const mid = (lo + hi) / 2;
    if (f(mid) > 0) hi = mid;
    else lo = mid;
  }
  return (lo + hi) / 2;
};

const silver = 1 + Math.SQRT2;
const b1 = 1 / 2;
const b2 = silver ** 2 / 2;
assert.ok(Math.abs(b2 / b1 - (3 + 2 * Math.SQRT2)) < 1e-14);

const energy = (b, edgeLength) => b * rootY(2 * edgeLength * b);
const difference = (a) => energy(b2, a) - energy(b1, a);

assert.ok(difference(1e-4) > 0);
assert.ok(difference(4) < 0);

let lo = 1e-4;
let hi = 4;
for (let i = 0; i < 220; i += 1) {
  const mid = (lo + hi) / 2;
  if (difference(mid) > 0) lo = mid;
  else hi = mid;
}
const crossingEdgeLength = (lo + hi) / 2;
const unitEdge = {
  edgeLength: 1,
  ell1: 2 * b1,
  ell2: 2 * b2,
  energy1: energy(b1, 1),
  energy2: energy(b2, 1),
};

assert.ok(unitEdge.energy2 < unitEdge.energy1);
assert.ok(Math.abs(difference(crossingEdgeLength)) < 2e-15);

console.log(JSON.stringify({
  protocol: 'conditional-half-pole-to-paired-wall-scale-bridge/1',
  assumptions: [
    'c=1 converts the internal frequency scale to an inverse spatial length',
    'the two-edge graph separation is L=2a for one physical edge length a',
    'each pole scale b_i is used as a separate wall mass m_i',
  ],
  poleScales: { b1, b2, ratio: b2 / b1 },
  dimensionlessSeparations: 'ell_i=2 a b_i',
  exactEnergies: 'E_i=b_i y(2 a b_i), y=exp[-ell sqrt(1-y^2)]',
  crossingEdgeLength,
  ordering: {
    belowCrossing: 'E2>E1',
    aboveCrossing: 'E2<E1',
  },
  unitEdgeIllustrationOnly: unitEdge,
  parameterFreePrediction: false,
  passed: true,
}, null, 2));
