import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-clock-locking-gap-scaling-v1.json", import.meta.url),
  "utf8"
));
const cutoff = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-wrap-free-rotor-cutoff-ladder-v1.json", import.meta.url),
  "utf8"
));
assert.equal(record.schemaVersion, "leech-clock-locking-gap-scaling-v1");
assert.equal(record.unitTargetGapLadder.length, cutoff.cutoffLadder.length);

const relativeTolerance = 1e-12;
const close = (actual, expected, label) => {
  const scale = Math.max(1, Math.abs(expected));
  assert.ok(Math.abs(actual - expected) <= relativeTolerance * scale, label);
};

let previousAsymptoticError = Infinity;
for (let i = 0; i < record.unitTargetGapLadder.length; i += 1) {
  const rung = record.unitTargetGapLadder[i];
  const cutoffRung = cutoff.cutoffLadder[i];
  assert.equal(rung.N, cutoffRung.positionCutoffN);
  assert.equal(rung.p, cutoffRung.minimumPrimeDimension);
  const gap = 2 * Math.sin(Math.PI / rung.p) ** 2;
  const coupling = 1 / gap;
  close(rung.unitCouplingGap, gap, "unit-coupling gap");
  close(rung.couplingPerUnitGap, coupling, "unit-gap coupling");
  const scaledCoupling = coupling / (rung.p ** 2);
  const asymptoticError = Math.abs(scaledCoupling - 1 / (2 * Math.PI ** 2));
  assert.ok(asymptoticError < previousAsymptoticError, "asymptotic convergence");
  assert.ok(asymptoticError < 1e-8, "quadratic asymptotic error");
  previousAsymptoticError = asymptoticError;
}

const first = record.unitTargetGapLadder[0].couplingPerUnitGap;
const last = record.unitTargetGapLadder.at(-1).couplingPerUnitGap;
close(record.dynamicRange.couplingRatioN64ToN1, last / first, "dynamic range");
close(record.dynamicRange.asymptoticCouplingOverPSquared, 1 / (2 * Math.PI ** 2), "asymptotic coefficient");

const betaGap = record.thermalCommissioning.exactIndependentPenaltyBetaGap;
const channels = record.thermalCommissioning.channels;
const failureTarget = record.thermalCommissioning.maximumAnyChannelUnlockedProbability;
const relativePartition = (p, beta) => {
  const denominator = 2 * Math.sin(Math.PI / p) ** 2;
  let sum = 0;
  for (let k = 0; k < p; k += 1) {
    const relativeEnergy = 2 * Math.sin(Math.PI * k / p) ** 2 / denominator;
    sum += Math.exp(-beta * relativeEnergy);
  }
  return sum;
};
for (const rung of record.unitTargetGapLadder) {
  const z = relativePartition(rung.p, betaGap);
  const failure = 1 - (1 / z) ** channels;
  assert.ok(failure <= failureTarget + 2e-12, "thermal failure exceeds target");
  const zLowerBeta = relativePartition(rung.p, betaGap - 1e-6);
  const lowerBetaFailure = 1 - (1 / zLowerBeta) ** channels;
  assert.ok(lowerBetaFailure > failureTarget, "stored beta-gap is not threshold-tight");
}

const boltzmann = 1.380649e-23;
const planck = 6.62607015e-34;
const temperatureKelvin = 0.010;
const frequencyGHz = betaGap * boltzmann * temperatureKelvin / planck / 1e9;
close(
  record.thermalCommissioning.minimumGapFrequencyGHzAt10mK,
  frequencyGHz,
  "10 mK frequency"
);

console.log(JSON.stringify({
  status: "PASS",
  firstSafeClockDimension: record.unitTargetGapLadder[0].p,
  firstUnitGapCoupling: first,
  finalUnitGapCoupling: last,
  dynamicRangeRatio: record.dynamicRange.couplingRatioN64ToN1,
  exactBetaGapForOnePercent: betaGap,
  minimumGapFrequencyGHzAt10mK: frequencyGHz,
  boundary: record.boundary
}));
