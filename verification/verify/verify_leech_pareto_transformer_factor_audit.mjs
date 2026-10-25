import assert from "node:assert/strict";
import fs from "node:fs";
import {spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-pareto-transformer-factor-audit-v1.json", import.meta.url), "utf8"
));
const frontier = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-hardware-basis-pareto-frontier-v1.json", import.meta.url), "utf8"
));
assert.equal(record.schemaVersion, "leech-pareto-transformer-factor-audit-v1");

const executable = fileURLToPath(new URL("../../scripts/analyze-leech-pareto-transformers.mjs", import.meta.url));
const run = spawnSync(process.execPath, [executable], {encoding: "utf8", windowsHide: true});
assert.equal(run.status, 0, run.stderr);
const reproduced = JSON.parse(run.stdout);
assert.equal(reproduced.schemaVersion, "leech-pareto-transformer-analysis-run-v1");

const recordedById = new Map(record.candidates.map((candidate) => [candidate.id, candidate]));
const frontierById = new Map(frontier.sub1000EngineeringShortlist.map((candidate) => [candidate.id, candidate]));
for (const result of reproduced.results) {
  const candidate = recordedById.get(result.id);
  assert.ok(candidate);
  assert.equal(result.positiveDiagonalCapacitances, true);
  assert.equal(result.diagonalDynamicRange, candidate.diagonalCapacitanceDynamicRange);
  assert.equal(result.nonzeroTransformerRatios, candidate.nonzeroTransformerRatios);
  assert.equal(result.distinctSignedTransformerRatios, candidate.distinctSignedTransformerRatios);
  assert.equal(result.maximumAbsoluteTransformerRatio, candidate.maximumAbsoluteTransformerRatio);
  assert.equal(result.maximumRatioNumeratorMagnitude, candidate.maximumRatioNumeratorMagnitude);
  assert.equal(result.maximumRatioDenominator, candidate.maximumRatioDenominator);
  assert.equal(candidate.conditionNumber, frontierById.get(result.id).conditionNumber);
}

const selected = record.selectedCircuitBasis;
const selectedCandidate = recordedById.get(selected.id);
const selectedRun = reproduced.results.find((result) => result.id === selected.id);
assert.deepEqual(selected.diagonalCapacitances, selectedRun.diagonalCapacitances);
assert.equal(selectedCandidate.nonzeroTransformerRatios,
  Math.min(...record.candidates.map((candidate) => candidate.nonzeroTransformerRatios)));
assert.equal(selectedCandidate.distinctSignedTransformerRatios,
  Math.min(...record.candidates.map((candidate) => candidate.distinctSignedTransformerRatios)));
assert.equal(selectedCandidate.maximumRatioNumeratorMagnitude,
  Math.min(...record.candidates.map((candidate) => candidate.maximumRatioNumeratorMagnitude)));
assert.equal(selectedCandidate.maximumRatioDenominator,
  Math.min(...record.candidates.map((candidate) => candidate.maximumRatioDenominator)));

const precision = recordedById.get("precision-first");
assert.ok(Math.abs(selected.conditionPenaltyAgainstPrecisionFirst
  - selectedCandidate.conditionNumber / precision.conditionNumber) < 2e-15);
assert.ok(Math.abs(selected.nonzeroRatioReductionAgainstPrecisionFirst
  - (1 - selectedCandidate.nonzeroTransformerRatios / precision.nonzeroTransformerRatios)) < 2e-15);
assert.ok(Math.abs(selected.distinctRatioReductionAgainstPrecisionFirst
  - (1 - selectedCandidate.distinctSignedTransformerRatios / precision.distinctSignedTransformerRatios)) < 2e-15);
assert.ok(record.proxyCorrection.finding.includes("is not"));
assert.ok(record.boundary.includes("ideal lossless multiport-transformer abstraction"));

console.log(JSON.stringify({
  status: "PASS",
  factorsReconstructed: reproduced.results.length,
  selectedCircuitBasis: selected.id,
  selectedCondition: selectedCandidate.conditionNumber,
  selectedNonzeroRatios: selectedCandidate.nonzeroTransformerRatios,
  selectedDistinctRatios: selectedCandidate.distinctSignedTransformerRatios,
  commonDynamicRange: selectedCandidate.diagonalCapacitanceDynamicRange,
  commonMaximumAbsoluteRatio: selectedCandidate.maximumAbsoluteTransformerRatio,
  proxyCorrected: record.proxyCorrection.finding,
  boundary: record.boundary
}));
