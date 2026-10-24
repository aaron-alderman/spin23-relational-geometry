import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(readFileSync(new URL("evidence/data/fixed-index-defect-information-audit-v1.json", root), "utf8"));

assert.equal(evidence.protocol, "fixed-index-defect-information-audit/1");
assert.equal(evidence.target, "OT-015");
assert.equal(evidence.audit.samplesChecked, 6);
assert.deepEqual(evidence.audit.zeroModeCounts, [1]);
assert.deepEqual(evidence.audit.signedChiralIndices, [1]);
assert.ok(evidence.audit.minimumNonzeroGap > 0.1);
assert.ok(evidence.audit.maximumKernelResidual < 1e-12);
assert.ok(evidence.audit.centreResidueRatio > 2);
assert.ok(evidence.audit.maximumGaugeIntensityDifference < 1e-12);
assert.equal(evidence.audit.indexAndGapPreserved, true);
assert.equal(evidence.audit.residueNotTopologicallyFixed, true);
assert.equal(evidence.audit.rawPhaseNotGaugeInvariant, true);
assert.equal(evidence.audit.chiralSupportPreserved, true);
assert.equal(evidence.decision.minimalChiralChainSuppliesNewBeyondIndexInvariant, false);
assert.equal(evidence.decision.fullOt015Closure, false);
assert.equal(evidence.decision.newPhysicsEvidence, false);

console.log(JSON.stringify({
  result: "pass",
  samples: evidence.audit.samplesChecked,
  minimumGap: evidence.audit.minimumNonzeroGap,
  centreResidueRange: evidence.audit.centreResidueRange,
  centreResidueRatio: evidence.audit.centreResidueRatio,
  boundary: "minimal chiral defect carries no robust continuous datum beyond its signed index",
}, null, 2));
