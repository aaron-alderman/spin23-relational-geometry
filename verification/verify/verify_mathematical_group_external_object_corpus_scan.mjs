import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import {
  loadMathematicalGroupCatalogue,
  loadMathematicalGroupCorpusScan,
  loadMathematicalGroupExternalObjects
} from "../../scripts/query-mathematical-group-catalogue.mjs";

const root = process.cwd();
const scanPath = path.join(root, "corpus/programmes/mathematical-group-atlas/mathematical_group_external_object_corpus_scan_v1.json");
const scan = JSON.parse(fs.readFileSync(scanPath, "utf8"));
const catalogue = loadMathematicalGroupCatalogue(root);
const groupScan = loadMathematicalGroupCorpusScan(root);
const register = loadMathematicalGroupExternalObjects(root);

assert.equal(scan.schema, "mathematical-group-external-object-corpus-scan/1");
assert.equal(scan.basis.externalObjectRegisterDate, register.date);
assert.equal(scan.basis.groupScanAlgorithmVersion, groupScan.basis.algorithmVersion);
assert.equal(scan.basis.algorithmVersion, "3");
assert.match(scan.authority, /not_promoted_mathematical_claims/);
assert.equal(scan.coverage.filesDiscovered, scan.coverage.filesScanned + scan.coverage.excludedFiles.length + scan.coverage.skippedLargeFiles.length);

const objectIds = new Set(register.objects.map((object) => object.id));
const groupIds = new Set(catalogue.groups.map((group) => group.id));
const candidateIds = new Set();
const evidenceLocations = new Set();
const lines = new Map();
const linesFor = (relativePath) => {
  if (!lines.has(relativePath)) lines.set(relativePath, fs.readFileSync(path.join(root, relativePath), "utf8").split(/\r?\n/));
  return lines.get(relativePath);
};
let mentionCount = 0;
for (const record of scan.exactObjectMentionEvidence) {
  assert.ok(objectIds.has(record.objectId), `unknown external object ${record.objectId}`);
  for (const evidence of record.evidence) {
    mentionCount += 1;
    const sourceLines = linesFor(evidence.path);
    assert.ok(evidence.line >= 1 && evidence.line <= sourceLines.length, `${evidence.path}:${evidence.line} invalid`);
    assert.ok(evidence.matchedAlias && evidence.declaredAlias, `${evidence.path}:${evidence.line} missing alias evidence`);
    evidenceLocations.add(`${evidence.path}:${evidence.line}:${record.objectId}`);
  }
}
assert.equal(mentionCount, scan.statistics.exactMentionEvidence);

for (const candidate of scan.relationshipCandidates) {
  assert.ok(!candidateIds.has(candidate.id), `duplicate candidate ${candidate.id}`);
  candidateIds.add(candidate.id);
  assert.ok(["high", "medium", "low"].includes(candidate.confidence), `${candidate.id}: invalid confidence`);
  assert.ok(["positive_or_descriptive", "negative_or_qualified"].includes(candidate.polarity), `${candidate.id}: invalid polarity`);
  assert.equal(candidate.status, "candidate_unreviewed");
  assert.ok(candidate.objectMatches.length > 0, `${candidate.id}: no objects`);
  assert.ok(candidate.groupIds.length > 0 || candidate.predicates.length > 0, `${candidate.id}: bare mention must not enter relationship queue`);
  for (const match of candidate.objectMatches) {
    assert.ok(objectIds.has(match.objectId), `${candidate.id}: unknown object ${match.objectId}`);
    assert.ok(evidenceLocations.has(`${candidate.path}:${candidate.line}:${match.objectId}`), `${candidate.id}: object mention not indexed`);
  }
  for (const groupId of candidate.groupIds) assert.ok(groupIds.has(groupId), `${candidate.id}: unknown group ${groupId}`);
}
assert.equal(candidateIds.size, scan.statistics.relationshipCandidates);

const clustered = new Set();
for (const cluster of scan.relationshipClusters) {
  for (const objectId of cluster.objectIds) assert.ok(objectIds.has(objectId), `${cluster.id}: unknown object ${objectId}`);
  for (const groupId of cluster.groupIds) assert.ok(groupIds.has(groupId), `${cluster.id}: unknown group ${groupId}`);
  for (const evidenceId of cluster.evidenceIds) {
    assert.ok(candidateIds.has(evidenceId), `${cluster.id}: unknown evidence ${evidenceId}`);
    assert.ok(!clustered.has(evidenceId), `${evidenceId}: multiply clustered`);
    clustered.add(evidenceId);
  }
}
assert.equal(clustered.size, candidateIds.size);
assert.equal(scan.relationshipClusters.length, scan.statistics.relationshipClusters);

for (const document of scan.documentDependencies) {
  linesFor(document.path);
  for (const objectId of document.objectIds) assert.ok(objectIds.has(objectId), `${document.path}: unknown object ${objectId}`);
  for (const groupId of document.groupIds) assert.ok(groupIds.has(groupId), `${document.path}: unknown group ${groupId}`);
  for (const candidateId of document.candidateIds) assert.ok(candidateIds.has(candidateId), `${document.path}: unknown candidate ${candidateId}`);
}
assert.equal(scan.documentDependencies.length, scan.statistics.documentsWithDependencies);

console.log(`Mathematical group external-object corpus scan: PASS files=${scan.coverage.filesScanned}; objects=${scan.statistics.externalObjectsMentioned}; mentions=${mentionCount}; candidates=${candidateIds.size}; clusters=${scan.relationshipClusters.length}`);
