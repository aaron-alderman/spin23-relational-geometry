import assert from "node:assert/strict";
import fs from "node:fs";

const record=JSON.parse(fs.readFileSync(new URL("../../evidence/data/rdg-maxwell-hodge-dynamics-v1.json",import.meta.url),"utf8"));
assert.equal(record.schemaVersion,"rdg-maxwell-hodge-dynamics-v1");
assert.ok(record.uniformMedium.hamiltonianSkewResidual<1e-12);
assert.ok(record.uniformMedium.constraintGeneratorResidual<1e-12);
assert.equal(record.uniformMedium.selectorMetricCommutatorRank,0);
assert.equal(record.uniformMedium.selectorDynamicsCommutatorRank,0);
assert.ok(record.uniformMedium.cayleyStep.energyResidual<1e-10);
assert.ok(record.uniformMedium.cayleyStep.constraintResidual<1e-10);
assert.ok(record.translationBreakingMedium.hamiltonianSkewResidual<1e-12);
assert.ok(record.translationBreakingMedium.constraintGeneratorResidual<1e-12);
assert.ok(record.translationBreakingMedium.selectorMetricCommutatorRank>0);
assert.ok(record.translationBreakingMedium.selectorDynamicsCommutatorRank>0);
assert.ok(record.translationBreakingMedium.admittedToDefectExchangeRank>0);
assert.ok(record.translationBreakingMedium.admittedToDefectWitnessMaxAbs>0);
assert.match(record.verdict,/inhomogeneous constitutive law reopens the channel/);

console.log(JSON.stringify({
  status:"PASS",
  uniform:"selector, constitutive metric and Maxwell generator commute",
  conserved:"Cayley step preserves energy and both Gauss records",
  contrast:"positive material contrast preserves full physics but couples admitted and defect sectors",
  implication:"Q-sector detection is not sufficient evidence of new physics",
}));

