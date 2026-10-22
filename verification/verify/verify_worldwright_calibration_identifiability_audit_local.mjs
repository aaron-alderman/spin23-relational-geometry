#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const audit = JSON.parse(await readFile(new URL(
  "../../evidence/data/worldwright-calibration-identifiability-audit-local-v1.json",
  import.meta.url,
), "utf8"));

assert.equal(audit.schema, "worldwright.calibration-identifiability-audit.local/1");
assert.equal(audit.retainedFrame.events, 248);
assert.equal(audit.retainedFrame.reportReferenceCoverage, 0.947581);
assert.equal(audit.retainedFrame.existingOrStrongCrossSourceIdentityCoverage, 0.322581);
assert.equal(audit.retainedFrame.positiveControlWrongRate, 0.111111);
assert.equal(audit.mechanismIdentifiability.length, 6);
assert.ok(audit.mechanismIdentifiability.every(item => item.observedRequired === 0 && item.identifiableNow === false));
assert.deepEqual(audit.calibrationGates.map(item => item.id), ["G0-source-linkage", "G1-time-integrity", "G2-baseline", "G3-outcome", "G4-overlap", "G5-negative-control", "G6-transport", "G7-replay"]);
assert.equal(audit.calibrationGates.find(item => item.id === "G0-source-linkage").state, "failed");
assert.equal(audit.calibrationGates.find(item => item.id === "G7-replay").state, "metadata-only-pass");
assert.equal(audit.conclusions.causalMechanismsAudited, 6);
assert.equal(audit.conclusions.causalMechanismsIdentifiableNow, 0);
assert.equal(audit.conclusions.perfectCrosswalkWouldOpenCausalEstimation, false);
assert.equal(audit.conclusions.aggregateWeightsStatisticallyIdentifiable, false);
assert.deepEqual(audit.nextActions.map(item => item.rank), [1, 2, 3]);
assert.ok(Object.values(audit.authority).every(value => value === false));

console.log("Worldwright calibration identifiability audit: PASS");
console.log("  248-event discovery frame; 6 causal mechanisms audited; 0 currently identifiable");
console.log("  a perfect event crosswalk alone remains insufficient for causal calibration");
