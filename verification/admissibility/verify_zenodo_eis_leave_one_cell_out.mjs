import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const evidence = JSON.parse(await readFile(resolve(root, "evidence/data/zenodo-eis-leave-one-cell-out-v1.json"), "utf8"));

assert.equal(evidence.protocol, "zenodo-eis-leave-one-cell-out/1");
assert.equal(evidence.cells.length, 54);
assert.equal(evidence.protocolBoundary.targetCellImpedanceUsedForParameters, false);
assert.equal(evidence.protocolBoundary.donorFitsPerTarget, 53);
assert.equal(evidence.protocolBoundary.aggregation, "coordinatewise median");
assert.equal(evidence.population.passedCells, 53);
assert.equal(evidence.population.failedCells, 1);
assert.equal(evidence.population.worstMedianCell, "ID07");
assert.equal(evidence.population.worstMaximumCell, "ID07");
assert.ok(evidence.population.worstCellMedianRelativeError > evidence.protocolBoundary.thresholds.heldOutMedianRelativeErrorMaximum);
assert.ok(evidence.population.worstCellMaximumRelativeError < evidence.protocolBoundary.thresholds.heldOutMaximumRelativeErrorMaximum);
assert.equal(evidence.cells.filter(cell => !cell.passed).length, 1);
assert.equal(evidence.cells.find(cell => !cell.passed)?.id, "ID07");
assert.ok(evidence.cells.every(cell => cell.donorCells === 53 && cell.heldOut.count === 15));
assert.equal(evidence.decision.allUnseenCellsPassWithoutRecalibration, false);
assert.equal(evidence.decision.sharedPopulationParameterPredictorEstablished, false);
assert.equal(evidence.decision.cellSpecificDynamicsDerived, false);
assert.equal(evidence.decision.measurementCovarianceEstablished, false);
assert.equal(evidence.decision.detectorLikelihoodClosed, false);
assert.equal(evidence.decision.newPhysicsEvidence, false);

console.log(JSON.stringify({
  result: "pass",
  cells: 54,
  passedCells: evidence.population.passedCells,
  failedCell: "ID07",
  medianCellMedianError: evidence.population.medianCellMedianRelativeError,
  worstCellMedianError: evidence.population.worstCellMedianRelativeError,
  boundary: "one shared median parameter vector is nearly population-wide but fails the predeclared all-cell gate; heterogeneity, covariance and dynamics remain open",
}, null, 2));
