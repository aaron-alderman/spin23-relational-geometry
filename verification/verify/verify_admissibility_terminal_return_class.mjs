import assert from "node:assert/strict";
import fs from "node:fs";

const data = name => JSON.parse(fs.readFileSync(new URL("../../evidence/data/" + name, import.meta.url), "utf8"));
const terminal = data("admissibility-terminal-return-class-v1.json");
const selector = data("admissibility-coordinated-selector-closure-v1.json");
const a2 = data("admissibility-distributed-a2-shape-v1.json");
const monster = data("monster-typed-self-description-gate-v1.json");
const maxwell = data("maxwell-vector-potential-reconstruction-gate-v1.json");

assert.equal(terminal.schemaVersion, "admissibility-terminal-return-class-v1");

const F = ([stage, r]) => [(stage + 1) % 3, r / 3];
const iterate = (state, n) => Array.from({length:n}).reduce(F, state);
for (const stage of [0,1,2]) {
  const start = [stage, 1];
  assert.notDeepEqual(F(start), start);
  const returned = iterate(start, 3);
  assert.equal(returned[0], stage);
  assert.ok(Math.abs(returned[1] - 1/27) < 1e-15);
}
for (const stage of [0,1,2]) {
  const orbit = [stage, 0];
  assert.deepEqual(iterate(orbit, 3), orbit);
  assert.notDeepEqual(F(orbit), orbit);
}
assert.equal(terminal.finiteToy.oneStepFixedPoints, 0);
assert.equal(terminal.finiteToy.returnDepth, 3);

const therm = selector.matchedThermodynamicImplementations;
for (const implementation of [therm.equilibrium, therm.driven, therm.monitored]) {
  assert.equal(implementation.fixedPopulation, therm.sharedCoarseMap.fixedPopulation);
  assert.equal(implementation.contraction, therm.sharedCoarseMap.contraction);
  assert.equal(implementation.observationTime, therm.sharedCoarseMap.observationTime);
}
assert.equal(therm.equilibrium.stationaryEntropyProductionRate, 0);
assert.ok(therm.driven.stationaryEntropyProductionRate > 1);
assert.ok(therm.monitored.minimumResetWorkPerRecordedCycleInKBT > 0);

assert.equal(a2.verdict.common_representation_shape_established, true);
assert.equal(a2.verdict.physical_label_identification_established, false);
assert.equal(monster.knownCorpusCollision.injective, false);
assert.match(maxwell.typedReconstruction.verdict, /cannot reconstruct/);
assert.match(terminal.strongestCurrentVerdict, /stable reconstructible return class/);

console.log(JSON.stringify({
  status: "PASS",
  terminal: terminal.terminalObject.name,
  toy: {oneStepFixedPoints:0, returnDepth:3, transverseMultiplier:"1/27", attractor:"stable three-cycle"},
  fixedPointCollision: {
    sharedPopulation: therm.sharedCoarseMap.fixedPopulation,
    sharedContraction: therm.sharedCoarseMap.contraction,
    equilibriumEntropyRate: therm.equilibrium.stationaryEntropyProductionRate,
    drivenEntropyRate: therm.driven.stationaryEntropyProductionRate,
    monitoredResetWorkKBT: therm.monitored.minimumResetWorkPerRecordedCycleInKBT
  },
  quotientWarnings: ["A2 labels unselected", "23A/23B scalar collision", "curl loses gauge and flat data"]
}));
