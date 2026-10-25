import assert from "node:assert/strict";
import fs from "node:fs";

const evidencePath = new URL(
  "../../evidence/data/xxz23-monster-defect-protocol-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
assert.equal(evidence.schemaVersion, "xxz23-monster-defect-protocol-v1");

const N = evidence.N;
const tolerance = 1e-12;
const near = (a, b) => Math.abs(a - b) < tolerance;
assert.equal(N, 23);
assert.ok(near(evidence.anisotropy, Math.cos(Math.PI / N)));
assert.equal(evidence.minimumPeriodicCommensurateSites, 2 * N);
assert.ok(near(evidence.continuumRadiusSquared, N / 2));
assert.ok(near(evidence.continuumRadius, Math.sqrt(N / 2)));

const rootSum = (charge) => {
  let re = 0;
  let im = 0;
  for (let k = 0; k < N; k += 1) {
    re += Math.cos((2 * Math.PI * charge * k) / N);
    im += Math.sin((2 * Math.PI * charge * k) / N);
  }
  return { re, im };
};
const sectorResponse = Array.from({ length: N }, (_, charge) => {
  const sum = rootSum(charge);
  assert.ok(Math.abs(sum.im) < 1e-12);
  return Math.abs(sum.re) < 1e-12 ? 0 : Math.round(sum.re);
});
assert.deepEqual(sectorResponse, evidence.w0Predictions.normalizedSectorResponse);

const w1 = evidence.w1Predictions;
assert.ok(near(w1.entryMagnitude, 1 / Math.sqrt(N)));
assert.ok(near(w1.adjacentPlaquettePhaseRadians, -2 * Math.PI / N));
assert.equal(w1.adjacentPlaquettes, (N - 1) ** 2);
assert.ok(near(w1.unsafePhaseErrorRadians, Math.PI / N));
assert.ok(near(w1.preregisteredPhaseMarginRadians, Math.PI / (2 * N)));

const planning = evidence.planningShotBound;
assert.equal(planning.components, 2 * w1.adjacentPlaquettes);
const requiredShots = Math.ceil(
  Math.log((2 * planning.components) / planning.familywiseAlpha)
    / (2 * planning.euclideanTolerance ** 2),
);
assert.equal(requiredShots, planning.shotsPerComponent);
assert.equal(planning.totalComponentShots, planning.components * requiredShots);
assert.ok(planning.excludes.length >= 4);
assert.ok(evidence.mandatoryControls.length >= 5);

console.log(JSON.stringify({
  status: "PASS",
  N,
  qAngleRadians: Math.PI / N,
  anisotropy: evidence.anisotropy,
  minimumPeriodicSites: evidence.minimumPeriodicCommensurateSites,
  continuumRadius: evidence.continuumRadius,
  sectorResponse,
  adjacentPlaquettePhaseRadians: w1.adjacentPlaquettePhaseRadians,
  entryMagnitude: w1.entryMagnitude,
  planningShotsPerComponent: requiredShots,
  planningTotalComponentShots: planning.totalComponentShots,
  verdict: evidence.verdict
}));
