import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import {
  loadMathematicalGroupCatalogue,
  loadMathematicalGroupExternalObjects,
  loadMathematicalGroupExternalObjectScan
} from "../../scripts/query-mathematical-group-catalogue.mjs";

const root = process.cwd();
const registerPath = path.join(root, "corpus/programmes/mathematical-group-atlas/mathematical_group_external_candidate_adjudications_v1.json");
const adjudications = JSON.parse(fs.readFileSync(registerPath, "utf8"));
const catalogue = loadMathematicalGroupCatalogue(root);
const externalObjects = loadMathematicalGroupExternalObjects(root);
const scan = loadMathematicalGroupExternalObjectScan(root);

assert.equal(adjudications.schema, "mathematical-group-external-candidate-adjudications/1");
assert.match(adjudications.authority, /not_independent_mathematical_proof/);
const objectIds = new Set(externalObjects.objects.map((object) => object.id));
const groupIds = new Set(catalogue.groups.map((group) => group.id));
const groupRelationshipIds = new Set(catalogue.relationships.map((relation) => relation.id));
const externalRelationIds = new Set(externalObjects.relations.map((relation) => relation.id));
const evidenceIds = new Set(scan.relationshipCandidates.map((candidate) => candidate.id));
const dispositions = new Set(adjudications.dispositionVocabulary);
const ids = new Set();

const signatureKey = (signature) => `${[...signature.objectIds].sort().join("|")}::${[...signature.groupIds].sort().join("|")}::${[...signature.predicates].sort().join("|")}::${signature.polarity}`;
const clusters = new Map(scan.relationshipClusters.map((cluster) => [signatureKey(cluster), cluster]));

for (const record of adjudications.adjudications) {
  assert.ok(!ids.has(record.id), `duplicate adjudication ${record.id}`);
  ids.add(record.id);
  assert.ok(dispositions.has(record.disposition), `${record.id}: unknown disposition`);
  assert.ok(record.assessment, `${record.id}: missing assessment`);
  for (const objectId of record.signature.objectIds) assert.ok(objectIds.has(objectId), `${record.id}: unknown object ${objectId}`);
  for (const groupId of record.signature.groupIds) assert.ok(groupIds.has(groupId), `${record.id}: unknown group ${groupId}`);
  for (const relationId of record.groupRelationshipIds) assert.ok(groupRelationshipIds.has(relationId), `${record.id}: unknown group relation ${relationId}`);
  for (const relationId of record.externalRelationIds) assert.ok(externalRelationIds.has(relationId), `${record.id}: unknown external relation ${relationId}`);
  const cluster = clusters.get(signatureKey(record.signature));
  assert.ok(cluster, `${record.id}: signature absent from current scan`);
  assert.equal(cluster.id, record.observedClusterId, `${record.id}: stale cluster ID`);
  for (const evidenceId of record.reviewedEvidenceIds) {
    assert.ok(evidenceIds.has(evidenceId), `${record.id}: unknown evidence ${evidenceId}`);
    assert.ok(cluster.evidenceIds.includes(evidenceId), `${record.id}: evidence outside cluster`);
  }
}

console.log(`Mathematical group external candidate adjudications: PASS records=${ids.size}; dispositions=${new Set(adjudications.adjudications.map((record) => record.disposition)).size}`);
