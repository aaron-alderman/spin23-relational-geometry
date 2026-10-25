import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-edge-chiral-dispersion-preregistration-v1.json", import.meta.url),
  "utf8"
));
assert.equal(record.schemaVersion, "leech-edge-chiral-dispersion-preregistration-v1");

const target = record.universalTargets;
assert.equal(target.chiralCentralChargePerBoundaryMagnitude, 24);
assert.equal(target.weightOneCurrentCount, 24);
assert.equal(target.weightOneLatticeRootCount, 0);
assert.equal(target.minimumLatticeNorm, 4);
assert.equal(target.minimumVectorMultiplicity, 196560);
assert.equal(target.weightTwoOscillatorCount, 24 + 24 * 25 / 2);
assert.equal(target.weightTwoTotalCount, target.weightTwoOscillatorCount + target.minimumVectorMultiplicity);
assert.equal(target.weightTwoTotalCount, 196884);
assert.equal(target.torusGroundStateDegeneracy, 1);

const boltzmann = 1.380649e-23;
const planck = 6.62607015e-34;
const thermalSlope = target.chiralCentralChargePerBoundaryMagnitude
  * Math.PI ** 2 * boltzmann ** 2 / (3 * planck);
assert.ok(Math.abs(thermalSlope - target.thermalHallSlopeMagnitudeWPerK2) < 1e-25);

const finite = record.dimensionlessFiniteSizeTargets;
assert.equal(finite.firstCurrentFrequencyTimesLOverV, 1);
assert.equal(finite.firstLatticePrimaryFrequencyTimesLOverV, target.minimumLatticeNorm / 2);
assert.equal(
  finite.casimirEnergyOverHFirstCurrentFrequency,
  -target.chiralCentralChargePerBoundaryMagnitude / 24
);

const benchmark = record.benchmark;
assert.equal(benchmark.circumferencesM.length, record.protocol.sizes);
for (let i = 0; i < benchmark.circumferencesM.length; i += 1) {
  const firstMHz = benchmark.velocityMPerS / benchmark.circumferencesM[i] / 1e6;
  assert.equal(firstMHz, benchmark.firstCurrentFrequenciesMHz[i]);
  assert.equal(2 * firstMHz, benchmark.firstLatticePrimaryFrequenciesMHz[i]);
  assert.equal(-firstMHz, benchmark.casimirFrequenciesMHz[i]);
}

const chirality = record.spatialChirality;
assert.equal(chirality.leftBoundary.modes, 24);
assert.equal(chirality.rightBoundary.modes, 24);
assert.equal(chirality.leftBoundary.velocitySign, -chirality.rightBoundary.velocitySign);
assert.equal(chirality.leftBoundary.thermalHallSign, chirality.leftBoundary.velocitySign);
assert.equal(chirality.rightBoundary.thermalHallSign, chirality.rightBoundary.velocitySign);
assert.equal(chirality.periodicStripBoundaryModes, 0);

assert.equal(record.impostorRejections.length, 5);
assert.equal(record.protocol.notYetMonster, true);
assert.ok(record.boundary.includes("not experimental observations"));

console.log(JSON.stringify({
  status: "PASS",
  stage: record.stage,
  cMagnitudePerEdge: target.chiralCentralChargePerBoundaryMagnitude,
  weightOneCount: target.weightOneCurrentCount,
  weightTwoCount: target.weightTwoTotalCount,
  thermalHallSlopeMagnitudeWPerK2: thermalSlope,
  benchmarkFirstCurrentMHz: benchmark.firstCurrentFrequenciesMHz,
  periodicControlEdgeModes: chirality.periodicStripBoundaryModes,
  impostorsRejected: record.impostorRejections.length,
  boundary: record.boundary
}));
