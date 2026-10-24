import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
const root = resolve(import.meta.dirname, "../..");
const neighbour = JSON.parse(await readFile(resolve(root, "evidence/data/zenodo-eis-one-point-latent-state-predictor-v1.json"), "utf8"));
const physical = JSON.parse(await readFile(resolve(root, "evidence/data/zenodo-eis-one-point-physical-anchor-v1.json"), "utf8"));
assert.equal(neighbour.protocol, "zenodo-eis-one-point-latent-state-predictor/1");
assert.equal(physical.protocol, "zenodo-eis-one-point-physical-anchor/1");
assert.equal(neighbour.preregistration.targetEvaluationValuesUsedForPrediction, false);
assert.equal(physical.preregistration.targetEvaluationValuesUsedForPrediction, false);
assert.equal(neighbour.population.passedCells, 53);
assert.equal(neighbour.population.failedCells, 1);
assert.equal(neighbour.population.worstMedianCell, "ID07");
assert.ok(neighbour.population.worstCellMedianRelativeError > 0.05);
assert.equal(physical.population.passedCells, 36);
assert.equal(physical.population.passiveCells, 54);
assert.equal(physical.decision.twoCoordinateCellStateSufficientUnderFrozenThresholds, false);
for (const result of [neighbour, physical]) {
  assert.equal(result.decision.measurementCovarianceEstablished, false);
  assert.equal(result.decision.generatedDynamicsEstablished, false);
  assert.equal(result.decision.newPhysicsEvidence, false);
}
console.log(JSON.stringify({ result: "pass", neighbourPass: "53/54", neighbourFailure: "ID07", physicalAnchorPass: "36/54", boundary: "one high-frequency complex calibration record is informative but insufficient for population-wide latent-state transport" }, null, 2));
