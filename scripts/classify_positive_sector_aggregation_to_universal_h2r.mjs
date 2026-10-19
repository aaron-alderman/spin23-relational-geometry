import assert from "node:assert/strict";

const sectors = [
  { name: "Q", dimension: 6, phase: [1, 0] },
  { name: "uc", dimension: 3, phase: [0, 1] },
  { name: "dc", dimension: 3, phase: [-1, 0] },
  { name: "L", dimension: 2, phase: [0, -1] },
  { name: "ec", dimension: 1, phase: [1, 0] },
];
assert.equal(sectors.reduce((sum, sector) => sum + sector.dimension, 0), 15);

const aggregate = (weights) => {
  assert.equal(weights.length, sectors.length);
  assert(weights.every((weight) => weight >= 0));
  const sum = weights.reduce((a, b) => a + b, 0);
  assert(Math.abs(sum - 1) < 1e-12);
  const re = weights.reduce((value, weight, i) => value + weight * sectors[i].phase[0], 0);
  const im = weights.reduce((value, weight, i) => value + weight * sectors[i].phase[1], 0);
  return { diagonal: 1, re, im, determinant: 1 - re * re - im * im };
};

const dimensionWeights = sectors.map((sector) => sector.dimension / 15);
const uniformSectorWeights = sectors.map(() => 1 / 5);
const leptonOnlyWeights = sectors.map((sector) => Number(sector.name === "L"));
const dimensionTrace = aggregate(dimensionWeights);
const uniformSectorAverage = aggregate(uniformSectorWeights);
const leptonOnly = aggregate(leptonOnlyWeights);
assert(Math.abs(dimensionTrace.re - 4 / 15) < 1e-12);
assert(Math.abs(dimensionTrace.im - 1 / 15) < 1e-12);
assert(Math.abs(dimensionTrace.determinant - 208 / 225) < 1e-12);
assert(Math.abs(uniformSectorAverage.re - 1 / 5) < 1e-12);
assert.equal(uniformSectorAverage.im, 0);
assert(Math.abs(uniformSectorAverage.determinant - 24 / 25) < 1e-12);
assert.equal(leptonOnly.determinant, 0);

// The center of the exact gauge commutant is C^5. Positive unital scalar
// functionals on C^5 are exactly probability weights, whose extreme points
// are evaluation on one sector.
const simplexDimension = sectors.length - 1;
const extremeMaps = sectors.map((sector, selected) => ({
  sector: sector.name,
  weights: sectors.map((unused, i) => Number(i === selected)),
}));
assert.equal(extremeMaps.length, 5);
assert(extremeMaps.every((map) => map.weights.reduce((a, b) => a + b, 0) === 1));

console.log(JSON.stringify({
  protocol: "positive-sector-aggregation-to-universal-h2r/1",
  sectorCenter: "C^5",
  positiveUnitalAggregationSpace: "four-simplex Delta_4",
  simplexDimension,
  extremeMaps,
  canonicalFullModuleTraceCandidate: {
    weights: dimensionWeights,
    rationale: "normalized partial trace over the fifteen-dimensional matter Hilbert space",
    output: dimensionTrace,
  },
  alternativeGaugeInvariantMaps: {
    uniformSectorAverage: { weights: uniformSectorWeights, output: uniformSectorAverage },
    leptonOnly: { weights: leptonOnlyWeights, output: leptonOnly },
  },
  phaseAlignmentResult: "No alignment is needed to remain in the population-normal J_z real form: every complex relationship coefficient is an allowed H2(R) coordinate, and positive convex sums remain in the cone.",
  uniquenessResult: "Gauge symmetry and positivity do not select one sector aggregation. The normalized full-module trace is canonical only after choosing equal per-state source normalization.",
  physicalGate: "Derive the sector weights from the source coupling, spectral measure, stress tensor, or a stated operational trace; do not call the dimension-weighted trace a prediction without that derivation.",
  passed: true,
}, null, 2));
