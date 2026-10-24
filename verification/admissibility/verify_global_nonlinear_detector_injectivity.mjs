import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(readFileSync(new URL("evidence/data/global-nonlinear-detector-injectivity-v1.json", root), "utf8"));

assert.equal(evidence.protocol, "global-nonlinear-detector-injectivity/1");
assert.equal(evidence.packet, "AZ-107");
assert.equal(evidence.target, "OT-034");
assert.equal(evidence.parent, "AZ-057");
assert.ok(evidence.adversarialAudit.pointsChecked > 30000);
assert.ok(evidence.adversarialAudit.minimumPowerOnlyLocalGramEigenvalue > 0);
assert.equal(evidence.adversarialAudit.maximumPowerAliasResidual, 0);
assert.ok(evidence.adversarialAudit.minimumCoherentAliasSeparation > 0.7);
assert.ok(evidence.adversarialAudit.maximumAnalyticInversionResidual < 1e-12);
assert.equal(evidence.analyticResult.localRankDoesNotRemoveGlobalQuotient, true);
assert.equal(evidence.decision.powerOnlyFamilyGloballyInjective, false);
assert.equal(evidence.decision.powerOnlyResidualQuotientCharacterized, true);
assert.equal(evidence.decision.finiteAugmentedBundleGloballyInjectiveOnDeclaredCompactFamily, true);
assert.equal(evidence.decision.ot034DeclaredClosureCriterionMet, true);
assert.equal(evidence.decision.universalNonlinearIdentifiabilityTheorem, false);
assert.equal(evidence.decision.physicalCarrierMeasured, false);
assert.equal(evidence.decision.newPhysicsEvidence, false);

console.log(JSON.stringify({
  result: "pass",
  pointsChecked: evidence.adversarialAudit.pointsChecked,
  minimumLocalGramEigenvalue: evidence.adversarialAudit.minimumPowerOnlyLocalGramEigenvalue,
  powerAliasResidual: evidence.adversarialAudit.maximumPowerAliasResidual,
  minimumCoherentSeparation: evidence.adversarialAudit.minimumCoherentAliasSeparation,
  boundary: "declared compact nonlinear history family closed; physical and universal extensions remain open",
}, null, 2));
