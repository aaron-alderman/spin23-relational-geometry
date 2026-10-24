#!/usr/bin/env node

import assert from "node:assert/strict";

const c = 2;
const lambda = 3;
const v = 1.4;
const delta = Math.sqrt((2 * c) / (lambda * v * v));

const b = (x) => v * Math.tanh(x / delta);
const bPrime = (x) => (v / delta) / Math.cosh(x / delta) ** 2;
const bSecond = (x) => (-2 * v / (delta * delta)) * Math.tanh(x / delta) / Math.cosh(x / delta) ** 2;

for (const x of [-4 * delta, -delta, -0.2 * delta, 0, 0.2 * delta, delta, 4 * delta]) {
  const eulerLagrangeResidual = c * bSecond(x) - lambda * b(x) * (b(x) ** 2 - v ** 2);
  assert.ok(Math.abs(eulerLagrangeResidual) < 1e-11, `kink equation failed at x=${x}`);
}

const analyticTension = (2 * Math.sqrt(2) / 3) * v ** 3 * Math.sqrt(c * lambda);
const extent = 12 * delta;
const intervals = 200000;
const dx = (2 * extent) / intervals;
let numericalTension = 0;
for (let i = 0; i <= intervals; i += 1) {
  const x = -extent + i * dx;
  const density = (c / 2) * bPrime(x) ** 2 + (lambda / 4) * (b(x) ** 2 - v ** 2) ** 2;
  const weight = i === 0 || i === intervals ? 0.5 : 1;
  numericalTension += weight * density * dx;
}
assert.ok(Math.abs(numericalTension - analyticTension) / analyticTension < 1e-10);

const restrictedGap = (x) => 2 * Math.abs(b(x));
assert.ok(restrictedGap(0) < 1e-14, "the one-mass wall must close the gap at its core");
assert.ok(restrictedGap(5 * delta) > 0.99 * 2 * v);

const secondMass = 0.23;
const enlargedGap = (x) => 2 * Math.hypot(secondMass, b(x));
assert.ok(enlargedGap(0) >= 2 * secondMass);
assert.ok([-5, -1, 0, 1, 5].every((u) => enlargedGap(u * delta) > 0));

const barrierDensity = (lambda / 4) * v ** 4;
assert.ok(barrierDensity > 0);

console.log(JSON.stringify({
  result: "pass",
  wall: { thickness: delta, analyticTension, numericalTension, barrierDensity },
  topologyGate: {
    restrictedFamilyGapAtCore: restrictedGap(0),
    enlargedFamilyGapAtCore: enlargedGap(0),
    conclusion: "topological distinction depends on the admitted interpolation space",
  },
}, null, 2));

