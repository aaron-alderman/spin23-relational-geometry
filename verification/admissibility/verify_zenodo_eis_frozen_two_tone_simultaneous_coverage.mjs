import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const evidence = JSON.parse(await readFile(resolve(root, "evidence/data/zenodo-eis-frozen-two-tone-simultaneous-coverage-v1.json"), "utf8"));

assert.equal(evidence.protocol, "zenodo-eis-frozen-two-tone-simultaneous-coverage/1");
assert.deepEqual(evidence.frozenProtocol.calibrationFrequenciesHz, [10000, 2.82193493843079]);
assert.equal(evidence.frozenProtocol.neighbourCount, 3);
assert.equal(evidence.frozenProtocol.evaluationFrequenciesPerCell, 15);
assert.equal(evidence.frozenProtocol.targetResidualUsedForItsThreshold, false);
assert.equal(evidence.population.coveredCellsAt90, 49);
assert.equal(evidence.population.coveredCellsAt95, 52);
assert.deepEqual(evidence.population.failuresAt95, ["ID07", "ID12"]);
assert.ok(evidence.population.coverageFractionAt90 >= 0.9);
assert.ok(evidence.population.coverageFractionAt95 >= 0.95);
assert.equal(evidence.decision.internalWholeSpectrumCoverageAudited, true);
assert.equal(evidence.decision.allCellsCoveredAt95, false);
assert.equal(evidence.decision.nominal95CoverageMetEmpirically, true);
assert.equal(evidence.decision.distributionFreeProspectiveCoverageEstablished, false);
assert.equal(evidence.decision.externalBatchReplicationEstablished, false);
assert.equal(evidence.decision.measurementCovarianceEstablished, false);
assert.equal(evidence.decision.detectorLikelihoodClosed, false);
assert.equal(evidence.decision.generatedDynamicsEstablished, false);
assert.equal(evidence.decision.newPhysicsEvidence, false);

console.log(JSON.stringify({
  result: "pass",
  cells: evidence.cells.length,
  coveredAt90: evidence.population.coveredCellsAt90,
  coveredAt95: evidence.population.coveredCellsAt95,
  failuresAt95: evidence.population.failuresAt95,
  boundary: "nominal internal whole-spectrum coverage met; prospective and external coverage remain open"
}, null, 2));
