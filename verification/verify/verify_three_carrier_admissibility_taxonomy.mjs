import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path) => JSON.parse(fs.readFileSync(path, "utf8"));

const taxonomy = read("corpus/registers/three_carrier_admissibility_taxonomy_v1.json");
const science = read("corpus/programmes/quotient-scars/quotient_scar_register_v1.json");
const claimSource = read("corpus/programmes/frontier/wave-7/claimipedia_relationship_operator_source_v1.json");
const claimAlgebra = read("corpus/programmes/frontier/wave-7/claimipedia_relationship_operator_algebra_v1.json");
const closedCarrier = read("corpus/programmes/frontier/wave-7/claimipedia_spin_temple_closed_carrier_v1.json");
const sourcery = read("integrations/sourcery/mcp-admission/scientific-derivation-composer/scientific-derivation-process.json");

const S = taxonomy.carriers.scienceProgramme;
assert.equal(science.entries.length, S.nodeCount);
assert.equal(science.relations.length, S.arrowCount);

const typeCounts = Object.fromEntries(science.relationTypes.map((type) => [type, 0]));
for (const relation of science.relations) typeCounts[relation.type] += 1;
assert.deepEqual(typeCounts, S.typeCounts);

const constructiveIds = science.relations
  .filter((relation) => ["extends_to", "instantiates"].includes(relation.type))
  .map((relation) => relation.id)
  .sort();
const registeredConstructiveIds = S.constructiveTwelve.map((item) => item[1]).sort();
assert.deepEqual(registeredConstructiveIds, constructiveIds);
assert.equal(new Set(registeredConstructiveIds).size, 12);

const guardrailIds = science.relations
  .filter((relation) => !["extends_to", "instantiates"].includes(relation.type))
  .map((relation) => relation.id)
  .sort();
const registeredGuardrailIds = S.guardrailFifteen.map((item) => item[1]).sort();
assert.deepEqual(registeredGuardrailIds, guardrailIds);
assert.equal(new Set(registeredGuardrailIds).size, 15);

const parent = new Map(science.entries.map((entry) => [entry.id, entry.id]));
const find = (node) => {
  let current = node;
  while (parent.get(current) !== current) {
    parent.set(current, parent.get(parent.get(current)));
    current = parent.get(current);
  }
  return current;
};
const join = (left, right) => {
  const a = find(left);
  const b = find(right);
  if (a === b) return false;
  parent.set(a, b);
  return true;
};
const tree = [];
const chords = [];
for (const relation of [...science.relations].sort((a, b) => a.id.localeCompare(b.id))) {
  (join(relation.from, relation.to) ? tree : chords).push(relation.id);
}
assert.deepEqual(tree, S.qrOrderedFundamentalBasis.treeEdgeIds);
assert.deepEqual(chords, S.qrOrderedFundamentalBasis.chordIds);
assert.equal(tree.length, 15);
assert.equal(chords.length, 12);
assert.deepEqual(S.carrierSeparationCocircuit, ["QR-002", "QR-004", "QR-013"]);

const C = taxonomy.carriers.claimipedia;
const claimNodes = new Set(claimSource.edges.flatMap((edge) => edge.slice(0, 2)));
assert.equal(claimNodes.size, C.claimCarrierNodeCount);
assert.equal(claimSource.relationshipCount, C.relationshipRecordCount);
assert.equal(new Set(claimSource.edges.map((edge) => JSON.stringify(edge))).size, C.distinctTypedEdgeCount);
assert.deepEqual(claimAlgebra.relationTypeCounts, C.relationQuartetCounts);
assert.equal(claimAlgebra.generatedAlgebra.unitalDimension, C.capturedClaimRelationAlgebra.unitalDimension);
assert.equal(claimAlgebra.generatedAlgebra.centerDimension, C.capturedClaimRelationAlgebra.centerDimension);
assert.equal(claimAlgebra.generatedAlgebra.commutatorSubspaceDimension, C.capturedClaimRelationAlgebra.commutatorDimension);
assert.equal(closedCarrier.operatorAlgebra.jacobsonRadicalDimension, C.spinTempleContextClosure.directedHistoryRadicalDimension);
assert.equal(closedCarrier.interpretation.spin23Established, false);

const R = taxonomy.carriers.sourcery;
assert.equal(sourcery.protocol, R.protocol);
assert.deepEqual(R.workbenchPanes, ["query", "candidatePaths", "assumptionLossLedger", "rejectionReceipt"]);
assert.deepEqual(R.authority, {proposalOnly: true, entails: false, empiricalAuthority: false, applicationAdmission: false});

console.log(JSON.stringify({
  status: "PASS",
  science: {nodes: S.nodeCount, arrows: S.arrowCount, constructive: 12, guardrails: 15, cycles: chords.length, cuts: tree.length},
  claimipedia: {nodes: C.claimCarrierNodeCount, relationships: C.relationshipRecordCount, algebraDimension: C.capturedClaimRelationAlgebra.unitalDimension},
  sourcery: {protocol: R.protocol, namedStructures: R.namedStructures.length}
}));
