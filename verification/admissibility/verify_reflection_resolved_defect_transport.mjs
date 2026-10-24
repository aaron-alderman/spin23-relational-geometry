import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(readFileSync(new URL("evidence/data/reflection-resolved-defect-transport-v1.json", root), "utf8"));

assert.equal(evidence.protocol, "reflection-resolved-defect-transport/1");
assert.equal(evidence.target, "OT-015");
assert.equal(evidence.parent, "AZ-105");
assert.equal(evidence.audit.samplesChecked, 6);
assert.equal(evidence.audit.parityBranchesChecked, 12);
assert.ok(evidence.audit.minimumSymmetricGap > 0.5);
assert.ok(evidence.audit.maximumReflectionCommutatorResidual < 1e-12);
assert.ok(evidence.audit.maximumSpatialParityResidual < 1e-12);
assert.ok(evidence.audit.minimumMatchingPortWeight > 1 - 1e-12);
assert.ok(evidence.audit.maximumForbiddenPortWeight < 1e-12);
assert.ok(evidence.audit.minimumBrokenSymmetryLeakage > 0);
assert.equal(evidence.audit.reflectionSymmetryExact, true);
assert.equal(evidence.audit.mirrorSelectionExact, true);
assert.equal(evidence.audit.sameIndexDifferentMirrorRepresentations, true);
assert.equal(evidence.audit.symmetryBreakingOpensForbiddenPort, true);
assert.equal(evidence.decision.fullOt015DeclaredConstructionClosed, true);
assert.equal(evidence.decision.naturalMaterialRealizationEstablished, false);
assert.equal(evidence.decision.newPhysicsEvidence, false);

console.log(JSON.stringify({
  result: "pass",
  symmetricProfiles: evidence.audit.samplesChecked,
  parityBranches: evidence.audit.parityBranchesChecked,
  minimumGap: evidence.audit.minimumSymmetricGap,
  maximumForbiddenWeight: evidence.audit.maximumForbiddenPortWeight,
  brokenSymmetryLeakageRange: [evidence.audit.minimumBrokenSymmetryLeakage, evidence.audit.maximumBrokenSymmetryLeakage],
  boundary: "finite reflection-resolved beyond-index construction closed; material realization remains open",
}, null, 2));
