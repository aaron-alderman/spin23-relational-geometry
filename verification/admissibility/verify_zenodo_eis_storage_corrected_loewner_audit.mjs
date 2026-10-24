import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const data = JSON.parse(readFileSync(resolve(root, "evidence/data/zenodo-eis-storage-corrected-loewner-audit-v1.json"), "utf8"));

assert.equal(data.protocol, "zenodo-eis-storage-corrected-loewner-audit/1");
assert.equal(data.source.cells, 54);
assert.equal(data.population.rawPassedCells, 0);
assert.equal(data.population.rawFailedCells, 54);
assert.equal(data.population.correctedPassedCells, 54);
assert.equal(data.population.correctedFailedCells, 0);
assert.ok(data.population.minimumRawEigenvalue < 0);
assert.ok(data.population.minimumCorrectedEigenvalue > 0);
assert.ok(data.cells.every(cell => !cell.rawPasses && cell.correctedPasses));
assert.equal(data.decision.storageCorrectionMaterialToClassification, true);
assert.equal(data.decision.fittedRelaxationFamilyCertifiedPopulationWide, true);
assert.equal(data.decision.independentMeasuredDerivativeTestEstablished, false);
assert.equal(data.decision.measurementCovarianceEstablished, false);
assert.equal(data.decision.novelFundamentalInequalityEstablished, false);
assert.equal(data.decision.newPhysicsEvidence, false);

console.log(JSON.stringify({
  result: "pass",
  cells: 54,
  raw: "0/54",
  storageCorrected: "54/54",
  minimumCorrectedEigenvalue: data.population.minimumCorrectedEigenvalue,
  boundary: "fitted-model certificate only; independent measured slopes and covariance remain open"
}, null, 2));
