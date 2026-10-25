import assert from "node:assert/strict";
import fs from "node:fs";

const load = (relativePath) => JSON.parse(fs.readFileSync(new URL(relativePath, import.meta.url), "utf8"));
const gate = load("../../evidence/data/moonshine-baby-monster-genus-two-source-gate-v1.json");
const free = load("../../evidence/data/moonshine-relation-defect-free-majorana-multiplier-v1.json");
const joined = load("../../evidence/data/moonshine-joined-bridge-map-v1.json");
const arf = load("../../evidence/data/moonshine-arf-fourier-baby-monster-reconstruction-v1.json");

assert.equal(Number(gate.established.babyMonsterCentralCharge.split("/")[0]) / 2, 23.5);
assert.equal(Number(gate.established.freeMajoranaCentralCharge.split("/")[0]) / 2, 0.5);
assert.equal(23.5 + 0.5, gate.established.sumCentralCharge);
assert.deepEqual(gate.established.evenAlgebraModules, ["VB0", "VB1", "VBT"]);
assert.equal(gate.established.twistedModule, "VBT");
assert.deepEqual(gate.established.fusionRing, {
  VB1xVB1: "VB0",
  VB1xVBT: "VBT",
  VBTxVBT: "VB0+VB1",
});

assert.equal(gate.minimalConstructionPacket.length, 6);
assert(gate.minimalConstructionPacket.some((entry) => entry.includes("torus one-point")));
assert(gate.minimalConstructionPacket.some((entry) => entry.includes("K=S^2 R^-11")));
assert(gate.minimalConstructionPacket.some((entry) => entry.includes("separating-degeneration")));

assert.deepEqual(gate.freeInput.cycleType, free.reducedCycleData.cycleType);
assert.deepEqual(gate.freeInput.etaNormalizedThreeCycleHolonomies, ["1", "1", "1"]);
assert.equal(gate.freeInput.fixedOddOddEigenvalue, "-1");
assert.equal(gate.freeInput.determinant, free.etaNormalizedCycleData.determinant);
assert.equal(gate.comparisonRule.full2AHolonomies[3], "-betaFixed");

assert.equal(gate.sourceStatus.generalFermionicGenusTwoSewingFormalism, true);
assert.equal(gate.sourceStatus.explicitFreeFermionGenusTwoVector, true);
assert.equal(gate.sourceStatus.explicitBabyMonsterGenusTwoSpinVector, false);
assert.equal(gate.sourceStatus.explicitOrder23TwinedBabyMonsterGenusTwoSpinVector, false);
assert.equal(gate.alternativeReconstruction.monsterInputs, arf.reconstruction.bosonicInputs);
assert.equal(gate.alternativeReconstruction.oddZeroTests, arf.reconstruction.oddZeroTests);
assert.equal(gate.alternativeReconstruction.evenBabyMonsterOutputs, arf.reconstruction.evenBabyMonsterOutputs);
assert.equal(gate.alternativeReconstruction.kMultiplierKnown, true);
assert.equal(gate.alternativeReconstruction.inputKnown, false);
assert(joined.generalizedMoonshineTarget.requiredComparisons["46C_46D"].includes("Baby Monster"));

console.log(JSON.stringify({
  establishedModules: gate.established.evenAlgebraModules,
  fusionRing: gate.established.fusionRing,
  freeHolonomies: gate.freeInput,
  requiredSourceObjects: gate.minimalConstructionPacket,
  order23TwinedBabyMonsterGenusTwoVectorKnown:
    gate.sourceStatus.explicitOrder23TwinedBabyMonsterGenusTwoSpinVector,
}, null, 2));
console.log("PASS verify_moonshine_baby_monster_genus_two_source_gate");
