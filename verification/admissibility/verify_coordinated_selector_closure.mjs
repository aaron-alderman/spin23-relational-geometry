#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const data = JSON.parse(fs.readFileSync(path.join(root, "evidence/data/admissibility-coordinated-selector-closure-v1.json"), "utf8"));
const document = fs.readFileSync(path.join(root, "corpus/programmes/admissibility/admissibility_57_coordinated_selector_closure_and_physical_provenance_boundary.md"), "utf8");
const near = (a, b, tolerance = 1e-12) => Math.abs(a - b) <= tolerance;

assert.equal(data.schema, "admissibility.coordinated-selector-closure/1");
assert.equal(data.id, "AZ-057");
assert.deepEqual(data.scope, ["OT-001", "OT-002", "OT-003", "OT-004", "OT-005"]);
assert.ok(data.holonomy.adiabaticRatio < 0.02);
assert.equal(data.holonomy.projectorClosureError, 0);
assert.ok(near(data.holonomy.forwardGeometricAngle, Math.PI / 2));
assert.ok(near(data.holonomy.reverseGeometricAngle, -Math.PI / 2));

const bundles = data.detectorEquivalence.bundles;
assert.equal(bundles.forwardNormalizedEndpoint.equivalenceClasses.length, 1);
assert.equal(bundles.addReverseComplexTomography.equivalenceClasses.length, 2);
assert.equal(bundles.addProcessSingularValues.equivalenceClasses.length, 3);
assert.equal(bundles.forwardNormalizedEndpoint.worstPairInformation, 0);
assert.equal(bundles.addReverseComplexTomography.worstPairInformation, 0);
assert.ok(bundles.addProcessSingularValues.worstPairInformation > 25);

const selector = data.independentSelector;
assert.equal(selector.yWasFitFromSelectedState, false);
assert.equal(selector.tangentMultiplierOff, 1);
assert.ok(near(selector.tangentMultiplierOn, 1 / 3));
for (let index = 0; index < selector.initialAngles.length; index += 1) {
  assert.ok(near(selector.yOffAngles[index], selector.initialAngles[index]));
  assert.ok(selector.yOnAngles[index] < selector.initialAngles[index]);
}

const instrument = data.instrument;
assert.ok(near(instrument.outcomes.reduce((sum, outcome) => sum + outcome.probability, 0), 1));
assert.ok(near(instrument.unconditionalMeasurement.p0, instrument.inputState.p0));
assert.ok(near(instrument.unconditionalMeasurement.p1, instrument.inputState.p1));
assert.ok(near(instrument.unconditionalMeasurement.coherence, instrument.inputState.coherence * instrument.expectedCoherenceMultiplier));
assert.ok(instrument.outcomes[0].conditioned.p0 > instrument.inputState.p0);
assert.ok(instrument.outcomes[1].conditioned.p0 < instrument.inputState.p0);
assert.ok(near(instrument.monitoredAfterSelectorPopulation, 0.8 + (1 / 3) * (0.7 - 0.8)));

const thermodynamics = data.matchedThermodynamicImplementations;
const {equilibrium, driven, monitored} = thermodynamics;
for (const implementation of [equilibrium, driven, monitored]) {
  assert.ok(near(implementation.fixedPopulation, thermodynamics.sharedCoarseMap.fixedPopulation));
  assert.ok(near(implementation.contraction, thermodynamics.sharedCoarseMap.contraction));
  assert.ok(near(implementation.observationTime, thermodynamics.sharedCoarseMap.observationTime));
}
assert.equal(equilibrium.stationaryEntropyProductionRate, 0);
assert.ok(near(driven.totalForwardRate, 4));
assert.ok(near(driven.totalReverseRate, 1));
assert.ok(near(driven.channelCurrents.reduce((sum, current) => sum + current, 0), 0));
assert.ok(driven.stationaryEntropyProductionRate > 1);
assert.ok(monitored.minimumResetWorkPerRecordedCycleInKBT > 0);

assert.equal(data.firewalls.physicalCarrierChosen, false);
assert.equal(data.firewalls.materialScaleSet, false);
assert.equal(data.firewalls.completeDetectorHardwareCostComputed, false);
assert.equal(data.firewalls.spin23OrE8Derivation, false);

for (const phrase of [
  "one generative graph",
  "Detector-equivalence closure",
  "Conditioned and unconditional dynamics",
  "Matched-contraction thermodynamic collision",
  "CLOSED_FOR_DECLARED_LOCAL_FAMILY",
  "No additional abstract selector is warranted",
]) assert.ok(document.includes(phrase), `missing document phrase: ${phrase}`);

console.log("PASS coordinated OT-001--005 selector closure and physical-provenance firewalls");
console.log(JSON.stringify({detectorClasses: [1, 2, 3], selectorMultiplier: selector.tangentMultiplierOn, equilibriumEpr: equilibrium.stationaryEntropyProductionRate, drivenEpr: driven.stationaryEntropyProductionRate, resetKBT: monitored.minimumResetWorkPerRecordedCycleInKBT}));
