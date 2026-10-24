import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(readFileSync(new URL("evidence/data/relation-jordan-involution-lift-audit-v1.json", root), "utf8"));
assert.equal(evidence.protocol, "relation-jordan-involution-lift-audit/1");
assert.equal(evidence.packet, "AZ-112");
assert.equal(evidence.target, "OT-026");
assert.equal(evidence.carrier.nodes, 15);
assert.equal(evidence.carrier.retainedEdges, 17);
assert.equal(evidence.carrier.generatedAlgebraDimension, 35);
assert.equal(evidence.typedReversalSearch.permutationsChecked, 24);
assert.equal(evidence.typedReversalSearch.maximumMatchedEdges, 2);
assert.equal(evidence.allGeneratorTransposesInternal, false);
for (const audit of Object.values(evidence.transposeMembership)) {
  assert.equal(audit.inGeneratedAlgebra, false);
  assert.equal(audit.rankIncreaseWhenAdjoined, 1);
}
assert.equal(evidence.decision.ordinaryTransposeLiftsToFullRelationAlgebra, false);
assert.equal(evidence.decision.globalTypedEdgeReversalExists, false);
assert.equal(evidence.decision.localJordanFaceRemainsExact, true);
assert.equal(evidence.decision.ot026ClosureConditionMet, false);
assert.equal(evidence.decision.newPhysicsEvidence, false);
console.log(JSON.stringify({ result: "pass", nextGate: evidence.nextGate }, null, 2));
