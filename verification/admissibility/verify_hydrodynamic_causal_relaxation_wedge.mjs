import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(readFileSync(new URL("evidence/data/hydrodynamic-causal-relaxation-wedge-v1.json", root), "utf8"));

assert.equal(evidence.protocol, "hydrodynamic-causal-relaxation-wedge/1");
assert.equal(evidence.target, "OT-016");
assert.equal(evidence.parent, "AZ-102");
assert.equal(evidence.audit.samplesChecked, 10);
assert.ok(evidence.audit.shearFrontSpeed < 1);
assert.ok(evidence.audit.soundFrontSpeed < 1);
assert.ok(evidence.audit.maximumGrowthRateRealPart < 0);
assert.ok(evidence.audit.maximumPolynomialResidual < 1e-8);
assert.ok(evidence.audit.lowKShearRecoveryError < 1e-4);
assert.ok(evidence.audit.lowKSoundSpeedRecoveryError < 1e-4);
assert.ok(evidence.audit.lowKSoundAttenuationRecoveryError < 1e-4);
assert.equal(evidence.audit.shearCausalityPassed, true);
assert.equal(evidence.audit.soundCausalityPassed, true);
assert.equal(evidence.audit.sampledStabilityPassed, true);
assert.equal(evidence.audit.analyticSoundStabilityPassed, true);
assert.equal(evidence.decision.finiteCausalStableRelaxationWedgeExhibited, true);
assert.equal(evidence.decision.uniqueRelaxationCompletionDerived, false);
assert.equal(evidence.decision.stochasticKmsCompletionOfAuxiliaryModesEstablished, false);
assert.equal(evidence.decision.fullOt016Closure, false);
assert.equal(evidence.decision.newPhysicsEvidence, false);

console.log(JSON.stringify({
  result: "pass",
  samples: evidence.audit.samplesChecked,
  shearFrontSpeed: evidence.audit.shearFrontSpeed,
  soundFrontSpeed: evidence.audit.soundFrontSpeed,
  maximumGrowthRateRealPart: evidence.audit.maximumGrowthRateRealPart,
  boundary: "a causal stable relaxation wedge exists; selection, stochastic auxiliary completion and microscopic matching remain open",
}, null, 2));
