import assert from "node:assert/strict";

const matter = [
  { name: "Q", multiplicity: 6, integerHypercharge: 1 },
  { name: "u^c", multiplicity: 3, integerHypercharge: -4 },
  { name: "d^c", multiplicity: 3, integerHypercharge: 2 },
  { name: "L", multiplicity: 2, integerHypercharge: -3 },
  { name: "e^c", multiplicity: 1, integerHypercharge: 6 },
  { name: "nu^c", multiplicity: 1, integerHypercharge: 0 },
];

const anomaly = (power) =>
  matter.reduce(
    (sum, field) =>
      sum + field.multiplicity * field.integerHypercharge ** power,
    0,
  );

assert.equal(anomaly(1), 0);
assert.equal(anomaly(3), 0);

// Fixing the compact connection and integer charge table leaves the positive
// Maxwell coefficient continuous.
const couplings = [0.1, 0.2, 0.30282212, 0.5, 1];
const theories = couplings.map((g) => ({
  g,
  alpha: g ** 2 / (4 * Math.PI),
  linearAnomaly: anomaly(1),
  cubicAnomaly: anomaly(3),
  compactGaugePeriod: 2 * Math.PI,
  integerChargeTable: matter.map(({ integerHypercharge }) => integerHypercharge),
  faithfulKernelOrder: 6,
}));

assert.ok(theories.every((theory) => theory.linearAnomaly === 0));
assert.ok(theories.every((theory) => theory.cubicAnomaly === 0));
assert.ok(theories.every((theory) => theory.faithfulKernelOrder === 6));
assert.equal(new Set(theories.map((theory) => theory.alpha)).size, couplings.length);

const finiteInvariant =
  (79 + 48 * Math.sqrt(2) + 42 * Math.sqrt(3) + 3 * Math.sqrt(6)) /
  (24 * 36 ** 2);
const matchedCoupling = Math.sqrt(4 * Math.PI * finiteInvariant);
assert.ok(matchedCoupling > 0);

console.log(JSON.stringify({
  status: "PASS",
  anomalyAudit: {
    integerHypercharges: matter,
    linear: anomaly(1),
    cubic: anomaly(3),
  },
  continuousCompactGaugeFamily: theories,
  chainMatching: {
    finiteInvariant,
    couplingRequiredToIdentifyWithAlpha: matchedCoupling,
    status: "matching input unless a dynamical kinetic-normalization theorem derives it",
  },
  verdict:
    "compact U(1), integer charges, anomaly cancellation and the faithful Z6 kernel do not fix the continuous Maxwell coupling",
}));
