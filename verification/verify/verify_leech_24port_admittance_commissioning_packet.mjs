import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-24port-admittance-commissioning-packet-v1.json", import.meta.url), "utf8"
));
const factor = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-pareto-transformer-factor-audit-v1.json", import.meta.url), "utf8"
));
const tolerance = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-transformer-correlated-tolerance-v1.json", import.meta.url), "utf8"
));
assert.equal(record.schemaVersion, "leech-24port-admittance-commissioning-packet-v1");
assert.ok(record.target.basis.includes(String(factor.selectedCircuitBasis.trialZeroBased)));
assert.equal(tolerance.decision.robustModelConditionalTarget.includes("0.0015"), true);

const schedule = record.schedule;
assert.equal(schedule.singlePortConfigurations,
  schedule.frequenciesInUnitsOfCommissioningCenter.length
    * schedule.singlePortComplexDriveConfigurationsPerFrequency);
assert.equal(schedule.heldOutConfigurations,
  schedule.frequenciesInUnitsOfCommissioningCenter.length
    * schedule.heldOutRademacherMultiportDrivesPerFrequency);
assert.equal(schedule.totalConfigurations,
  schedule.singlePortConfigurations + schedule.heldOutConfigurations);
assert.equal(schedule.totalComplexAcquisitions,
  schedule.totalConfigurations * schedule.repeatsPerConfiguration);
assert.equal(schedule.independentSymmetricMatrixEntries,
  schedule.ports * (schedule.ports + 1) / 2);
assert.equal(schedule.offDiagonalReciprocityPairs,
  schedule.ports * (schedule.ports - 1) / 2);

const frequencies = schedule.frequenciesInUnitsOfCommissioningCenter;
assert.equal(frequencies.length, 7);
for (let i = 1; i < frequencies.length; i += 1) {
  assert.ok(Math.abs(frequencies[i] / frequencies[i - 1] - 10 ** 0.25) < 2e-15);
}
assert.equal(frequencies[4], 1);

const gates = new Map(record.proposedPassGates.map((gate) => [gate.id, gate]));
assert.equal(gates.size, record.proposedPassGates.length);
assert.deepEqual([...gates.keys()], [
  "fixture", "reciprocity", "passivity", "loss", "dispersion",
  "positive-definite", "inverse-metric", "held-out-drive"
]);
assert.ok(gates.get("inverse-metric").pass.includes("0.01"));
assert.ok(gates.get("inverse-metric").pass.includes("95 percent upper limit"));
assert.ok(gates.get("held-out-drive").metric.includes("84 held-out"));
assert.ok(record.reconstruction.covariance.includes("full real-imaginary"));
assert.ok(record.reconstruction.heldOutPrediction.includes("without refitting"));
assert.equal(record.epistemicBoundary.gateStatus, "pre-Gate-A hardware commissioning");
for (const forbidden of ["bulk gap", "24 chiral edge modes", "Monster defects", "Griess closure"]) {
  assert.ok(record.epistemicBoundary.passDoesNotClaim.includes(forbidden));
}

console.log(JSON.stringify({
  status: "PASS",
  ports: schedule.ports,
  frequencies: frequencies.length,
  singlePortConfigurations: schedule.singlePortConfigurations,
  heldOutConfigurations: schedule.heldOutConfigurations,
  totalComplexAcquisitions: schedule.totalComplexAcquisitions,
  independentSymmetricEntries: schedule.independentSymmetricMatrixEntries,
  passGates: [...gates.keys()],
  claimAfterPass: record.epistemicBoundary.passClaims,
  doesNotClaim: record.epistemicBoundary.passDoesNotClaim,
  boundary: record.boundary
}));
