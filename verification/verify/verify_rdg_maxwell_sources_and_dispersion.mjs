import assert from "node:assert/strict";
import fs from "node:fs";

const record=JSON.parse(fs.readFileSync(new URL("../../evidence/data/rdg-maxwell-sources-dispersion-v1.json",import.meta.url),"utf8"));
assert.equal(record.schemaVersion,"rdg-maxwell-sources-dispersion-v1");
assert.equal(record.sourceContinuity.translationSelectorContinuityCommutatorRank,0);
assert.equal(record.sourceContinuity.translationSelectorContinuityResidual,0);
assert.ok(record.sourceContinuity.untypedComponentSelectorContinuityCommutatorRank>0);
assert.ok(record.sourceContinuity.untypedComponentSelectorContinuityResidual>0);
assert.ok(record.homogeneousLossless.energyGeneratorResidual<1e-12);
assert.equal(record.homogeneousLossless.selectorMetricCommutatorRank,0);
assert.equal(record.homogeneousLossless.selectorDynamicsCommutatorRank,0);
assert.ok(record.resonantContrast.energyGeneratorResidual<1e-12);
assert.ok(record.resonantContrast.selectorMetricCommutatorRank>0);
assert.ok(record.resonantContrast.selectorDynamicsCommutatorRank>0);
assert.ok(record.homogeneousDamping.dissipationIdentityResidual<1e-12);
assert.equal(record.homogeneousDamping.selectorDynamicsCommutatorRank,0);
assert.match(record.verdict,/source-chain gate/);

console.log(JSON.stringify({
  status:"PASS",
  sources:"translation selector preserves continuity; component selector does not",
  memory:"Lorentz material oscillator carries lag and resonance explicitly",
  homogeneous:"lossless enlarged dynamics closes under the selector",
  contrast:"resonance contrast mixes sectors while preserving full energy",
  damping:"selector-compatible loss exposes the missing bath carrier",
}));

