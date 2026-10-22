#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-torsion-model-discrepancy-priority-v1.json",
  import.meta.url,
), "utf8"));
const sha256 = bytes => createHash("sha256").update(bytes).digest("hex");
const close = (actual, expected, tolerance = 1e-12) => {
  assert.ok(Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(actual), Math.abs(expected)), `${actual} != ${expected}`);
};

for (const source of evidence.sources) {
  const bytes = await readFile(new URL("../../" + source.path, import.meta.url));
  assert.equal(sha256(bytes), source.sha256, `${source.path} drift`);
}

const geometry = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-torsion-empirical-geometry-extraction-v1.json",
  import.meta.url,
), "utf8"));
const approximation = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-torsion-published-geometry-approximation-v1.json",
  import.meta.url,
), "utf8"));
const seven = approximation.response.find(row => row.forceRangeMillimetres === 7);
const term = id => evidence.reportedOneSigmaTerms.find(item => item.id === id);
const scenario = id => evidence.declaredScenarioTerms.find(item => item.id === id);

const sourceSpin = geometry.modelDisclosure.netSourceSpinsSigma / geometry.modelDisclosure.netSourceSpins;
const acResponse = 0.06 / 0.84;
const mu = evidence.target.centerDistanceOverRange;
const distance = (3 + mu ** 2 / (mu + 1)) * (
  evidence.target.centerDistanceSigmaMillimetres / evidence.target.centerDistanceMillimetres
);
const sensorWeighting = seven.uniformCellMeanFactor - 1;
const coreVolume = seven.sourceCoreToPoint - 1;
const projection = 1 - Math.cos(2 * Math.PI / 180);
const quadrature = Math.hypot(sourceSpin, acResponse, distance);

close(term("net-source-spin-normalization").fractionalResponseSigma, sourceSpin);
close(term("ac-response-ratio").fractionalResponseSigma, acResponse);
close(term("center-distance").fractionalResponseSigma, distance);
close(scenario("sensor-response-weighting").fractionalResponseShift, sensorWeighting);
close(scenario("smco5-core-volume").fractionalResponseShift, coreVolume);
close(scenario("two-degree-projection-only").fractionalResponseShift, projection);
close(evidence.derived.reportedThreeTermQuadratureFraction, quadrature);
close(evidence.derived.publishedGeometryCombinedPointShift, seven.combinedToPoint - 1);
close(evidence.derived.geometryCorrectedCouplingScaleShift, 1 / seven.combinedToPoint - 1);

assert.equal(evidence.derived.dominantReportedTerm, "net-source-spin-normalization");
assert.equal(evidence.derived.dominantGeometryScenario, "sensor-response-weighting");
assert.ok(sensorWeighting > 0.05);
assert.ok(coreVolume < 0.005);
assert.equal(evidence.falsificationUse.currentDecision.includes("fails"), true);
assert.deepEqual(evidence.priority.map(item => item.rank), [1, 2, 3, 4, 5]);
assert.ok(Object.values(evidence.authority).every(value => value === false));

console.log("Spin(2,3) torsion model-discrepancy priority: PASS");
console.log(`  reported-term ranking: source spin ${(100*sourceSpin).toFixed(2)}%; AC response ${(100*acResponse).toFixed(2)}%; distance ${(100*distance).toFixed(2)}%`);
console.log(`  geometry scenarios: sensor weighting ${(100*sensorWeighting).toFixed(2)}%; core volume ${(100*coreVolume).toFixed(2)}%`);
console.log("  five-percent point-geometry robustness gate: FAIL (informative falsification)");
