import assert from "node:assert/strict";

const sectors = ["Q", "u^c", "d^c", "L", "e^c", "nu^c"];
const dimensions = [6, 3, 3, 2, 1, 1];
const charges3BL = [1, -1, -1, -3, 3, 3];
const weights = charges3BL.map((q, i) => dimensions[i] * q * q);
assert.deepEqual(weights, [6, 3, 3, 18, 9, 9]);
assert.equal(weights.reduce((a, b) => a + b, 0), 48);

// Equal-population face ray R(theta).  A positive weighted sum has diagonal
// W and off-diagonal C=sum w exp(i theta).
const aggregate = (phases) => {
  const W = weights.reduce((a, b) => a + b, 0);
  const C = phases.reduce((z, theta, i) => ({
    re: z.re + weights[i] * Math.cos(theta),
    im: z.im + weights[i] * Math.sin(theta),
  }), { re: 0, im: 0 });
  return { W, C, determinant: W * W - C.re * C.re - C.im * C.im };
};

const universalPhase = aggregate(sectors.map(() => 0));
assert.equal(universalPhase.determinant, 0);

// Charge signs cannot matter in a diagonal current-current spectral density.
const absoluteChargeWeights = charges3BL.map((q, i) => dimensions[i] * Math.abs(q) ** 2);
assert.deepEqual(absoluteChargeWeights, weights);

// Full rank can occur if sector face phases differ, but the phase input is
// independent information not selected by B-L charge or anomaly cancellation.
const splitPhases = aggregate([0, 0, 0, Math.PI / 2, Math.PI / 2, Math.PI / 2]);
assert(splitPhases.determinant > 0);

// Global phase rotation leaves rank unchanged.
const alpha = 0.731;
const rotated = aggregate([0, 0, 0, Math.PI / 2, Math.PI / 2, Math.PI / 2].map((x) => x + alpha));
assert(Math.abs(rotated.determinant - splitPhases.determinant) < 1e-10);

console.log(JSON.stringify({
  protocol: "bl-aggregation-cannot-create-face-rank/1",
  sectors,
  integerCharges3BL: charges3BL,
  chargeSquaredDimensionWeights: weights,
  normalizedWeights: weights.map((w) => w / 48),
  universalExchangePhase: universalPhase,
  sectorSplitPhaseWitness: splitPhases,
  exactStatements: {
    currentChargeSignsDisappearFromDiagonalPositiveResidues: true,
    universalFaceRayRemainsRankOneAfterBLAggregation: true,
    noncollinearSectorRaysCanGiveFullRank: true,
    BLChargesDoNotDetermineThoseRays: true,
  },
  conclusion: "B-L derives sector weights but cannot manufacture topology-face rank or phase diversity. It can aggregate an independently supplied family of face kernels; it cannot by itself generate the missing second face direction.",
  passed: true,
}, null, 2));
