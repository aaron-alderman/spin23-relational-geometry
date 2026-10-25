import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-adversarial-psd-parasitic-bound-v1.json", import.meta.url), "utf8"
));
const search = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-integral-hardware-basis-search-v1.json", import.meta.url), "utf8"
));
assert.equal(record.schemaVersion, "leech-adversarial-psd-parasitic-bound-v1");
const kappa = record.matrix.conditionNumber;
assert.equal(kappa, 953.0317686668852);
assert.ok(kappa > search.winner.conditionNumber);
assert.ok(Math.abs(record.matrix.maximumEigenvalue / record.matrix.minimumEigenvalue - kappa) < 2e-9);

const errorBudget = 0.01;
const staticLimit = errorBudget / (kappa * (1 - errorBudget));
assert.ok(Math.abs(staticLimit - record.theorem.onePercentStaticStrengthLimit) < 2e-18);
assert.ok(Math.abs(staticLimit * 1e6 - record.theorem.onePercentStaticStrengthLimitPpm) < 2e-12);
const bound = (eta) => kappa * eta / (1 + kappa * eta);
assert.ok(Math.abs(bound(staticLimit) - errorBudget) < 2e-16);

const frequencies = record.seriesRlcPacketCorrection.frequenciesOverCenter;
const Q = record.seriesRlcPacketCorrection.qualityFactor;
for (const pole of record.seriesRlcPacketCorrection.poles) {
  const amplification = frequencies.map((frequency) => {
    const x = frequency / pole.poleFrequencyOverCenter;
    const real = 1 - x ** 2;
    const imaginary = x / Q;
    return real / (real ** 2 + imaginary ** 2);
  });
  const mean = amplification.reduce((sum, value) => sum + value, 0) / amplification.length;
  const maximum = Math.max(...amplification);
  assert.ok(Math.abs(mean - pole.meanExtractedCapacitanceAmplification) < 2e-15);
  assert.ok(Math.abs(maximum - pole.maximumInBandAmplification) < 2e-15);
  assert.ok(Math.abs(staticLimit / mean - pole.jointFitAdversarialLowFrequencyLimit) < 2e-18);
  assert.ok(Math.abs(staticLimit / maximum - pole.everyFrequencyAdversarialLowFrequencyLimit) < 2e-18);
}
const jointWorst = Math.min(...record.seriesRlcPacketCorrection.poles
  .map((pole) => pole.jointFitAdversarialLowFrequencyLimit));
const frequencyWorst = Math.min(...record.seriesRlcPacketCorrection.poles
  .map((pole) => pole.everyFrequencyAdversarialLowFrequencyLimit));
assert.ok(8e-6 < jointWorst);
assert.ok(3.9e-6 < frequencyWorst);
assert.ok(record.theorem.tightness.includes("minimum-eigenvalue eigenvector"));
assert.ok(record.boundary.includes("positive-semidefinite"));

console.log(JSON.stringify({
  status: "PASS",
  conditionNumber: kappa,
  exactStaticOnePercentLimitPpm: staticLimit * 1e6,
  jointFitWorstPoleLimitPpm: jointWorst * 1e6,
  everyFrequencyWorstPoleLimitPpm: frequencyWorst * 1e6,
  roundedJointPacketTargetPpm: 8,
  roundedEveryFrequencyTargetPpm: 3.9,
  coversMultiplePsdModes: true,
  saturatedBySoftModeRankOneParasitic: true,
  epistemicStatus: record.epistemicStatus,
  boundary: record.boundary
}));
