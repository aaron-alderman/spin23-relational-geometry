import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import {
  loadMathematicalGroupCatalogue,
  loadMathematicalGroupCorpusScan,
  loadMathematicalGroupExternalObjects
} from "../../scripts/query-mathematical-group-catalogue.mjs";

const root = process.cwd();
const registerPath = path.join(root, "corpus/programmes/mathematical-group-atlas/mathematical_group_candidate_adjudications_v1.json");
const register = JSON.parse(fs.readFileSync(registerPath, "utf8"));
const catalogue = loadMathematicalGroupCatalogue(root);
const scan = loadMathematicalGroupCorpusScan(root);
const externalObjects = loadMathematicalGroupExternalObjects(root);

assert.equal(register.schema, "mathematical-group-candidate-adjudications/1");
assert.match(register.authority, /not_independent_mathematical_proof/);
const groupIds = new Set(catalogue.groups.map((group) => group.id));
const relationshipIds = new Set(catalogue.relationships.map((relation) => relation.id));
const externalRelationIds = new Set(externalObjects.relations.map((relation) => relation.id));
const candidateIds = new Set(scan.relationshipCandidates.map((candidate) => candidate.id));
const dispositions = new Set(register.dispositionVocabulary);
const ids = new Set();
const allAdjudicationIds = new Set(register.adjudications.map((record) => record.id));
assert.equal(allAdjudicationIds.size, register.adjudications.length, "adjudication ids unique");

const signatureKey = (signature) => `${[...signature.groupIds].sort().join("|")}::${[...signature.predicates].sort().join("|")}::${signature.polarity}`;
const clusterBySignature = new Map(scan.relationshipClusters.map((cluster) => [signatureKey(cluster), cluster]));

for (const record of register.adjudications) {
  assert.ok(!ids.has(record.id), `duplicate adjudication ${record.id}`);
  ids.add(record.id);
  assert.ok(dispositions.has(record.disposition), `${record.id}: unknown disposition`);
  assert.ok(record.assessment, `${record.id}: missing assessment`);
  for (const groupId of record.signature.groupIds) assert.ok(groupIds.has(groupId), `${record.id}: unknown group ${groupId}`);
  for (const relationId of record.relationshipIds) assert.ok(relationshipIds.has(relationId), `${record.id}: unknown relationship ${relationId}`);
  for (const relationId of record.externalRelationIds ?? []) assert.ok(externalRelationIds.has(relationId), `${record.id}: unknown external relationship ${relationId}`);
  for (const evidenceId of record.reviewedEvidenceIds) assert.ok(candidateIds.has(evidenceId), `${record.id}: unknown evidence ${evidenceId}`);
  if (record.disposition === "superseded_by_resolution") {
    assert.ok(Array.isArray(record.supersededBy) && record.supersededBy.length > 0, `${record.id}: superseded record needs successors`);
    assert.ok(record.supersessionReason, `${record.id}: superseded record needs a reason`);
    for (const successorId of record.supersededBy) {
      assert.notEqual(successorId, record.id, `${record.id}: cannot supersede itself`);
      assert.ok(allAdjudicationIds.has(successorId), `${record.id}: unknown successor ${successorId}`);
    }
    continue;
  }
  const cluster = clusterBySignature.get(signatureKey(record.signature));
  assert.ok(cluster, `${record.id}: signature absent from current scan`);
  assert.equal(cluster.id, record.observedClusterId, `${record.id}: stale observed cluster ID`);
  for (const evidenceId of record.reviewedEvidenceIds) {
    assert.ok(cluster.evidenceIds.includes(evidenceId), `${record.id}: evidence outside signature cluster`);
  }
}

console.log(`Mathematical group candidate adjudications: PASS records=${register.adjudications.length}; dispositions=${new Set(register.adjudications.map((record) => record.disposition)).size}`);
