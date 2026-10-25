import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const target = 'corpus/programmes/frontier-physics-targets/physics_math_object_expansion_v1.json';
const x = JSON.parse(fs.readFileSync(path.join(root, target), 'utf8'));
const criteria = JSON.parse(fs.readFileSync(path.join(root, 'corpus/programmes/frontier-physics-targets/corpus_completion_exit_criteria_v1.json'), 'utf8'));
const census = JSON.parse(fs.readFileSync(path.join(root, 'corpus/programmes/frontier-physics-targets/full_corpus_gate_census_v1.json'), 'utf8'));
const allowed = new Set(criteria.requiredAdjacencyDispositions);
const failures = [];
const sourceByPath = new Map(census.records.map(r => [r.path, r]));
const clusterById = new Map(x.claimFamilyClusters.map(c => [c.id, c]));
const observedClusterCounts = new Map();
if (clusterById.size !== x.claimFamilyClusters.length) failures.push('duplicate claim-family cluster id');
for (const c of x.claimFamilyClusters) if (!allowed.has(c.disposition) || !c.topicId || !c.family || !c.sourceCandidateId) failures.push(`${c.id}: invalid claim-family cluster`);
if (x.records.length !== census.records.length) failures.push('inventory count differs from census');
if (new Set(x.records.map(r => r.path)).size !== x.records.length) failures.push('duplicate object path');
for (const r of x.records) {
  const source = sourceByPath.get(r.path);
  if (!source) { failures.push(`${r.path}: missing census source`); continue; }
  const abs = path.join(root, r.path);
  if (!fs.existsSync(abs)) { failures.push(`${r.path}: missing object`); continue; }
  const hash = crypto.createHash('sha256').update(fs.readFileSync(abs)).digest('hex');
  if (hash !== r.sha256 || hash !== source.sha256) failures.push(`${r.path}: stale hash`);
  if (r.scopeStatus === 'in_scope' && !r.topicIds.length) failures.push(`${r.path}: in scope without topic`);
  if (r.scopeStatus === 'excluded_typed' && r.censusDisposition === 'delegated_audit' && !r.scopeAuthorityRef) failures.push(`${r.path}: delegated audit lacks authority ref`);
  if (r.scopeStatus === 'excluded_typed' && source.separateOwnerRef && r.scopeAuthorityRef !== source.separateOwnerRef) failures.push(`${r.path}: separate programme authority mismatch`);
  if (r.scopeAuthorityRef && !fs.existsSync(path.join(root, r.scopeAuthorityRef))) failures.push(`${r.path}: missing scope authority ${r.scopeAuthorityRef}`);
  if (r.scopeStatus === 'in_scope' && !['strong_title_route', 'review_required_weak_route', 'reviewed_route'].includes(r.routingStatus)) failures.push(`${r.path}: invalid routing status`);
  if (r.routingStatus === 'reviewed_route' && (!r.routingReason || !r.routingEvidenceRefs.length)) failures.push(`${r.path}: reviewed route lacks evidence`);
  for (const ref of r.routingEvidenceRefs ?? []) if (!fs.existsSync(path.join(root, ref))) failures.push(`${r.path}: missing routing evidence ${ref}`);
  if (r.scopeStatus === 'review_required_unmapped' && r.claimFamilyClusterIds.length) failures.push(`${r.path}: unmapped object has inherited claims`);
  if (new Set(r.claimFamilyClusterIds).size !== r.claimFamilyClusterIds.length) failures.push(`${r.path}: duplicate claim-family reference`);
  for (const id of r.claimFamilyClusterIds) {
    if (!clusterById.has(id)) failures.push(`${r.path}: unknown claim-family cluster ${id}`);
    observedClusterCounts.set(id, (observedClusterCounts.get(id) ?? 0) + 1);
  }
  for (const c of r.localExceptions) {
    if (!allowed.has(c.disposition) || !c.claimKey || !c.reason || !c.reopeningTrigger || !c.evidenceRefs.length) failures.push(`${r.path}:${c.claimKey}: incomplete override`);
    for (const ref of c.evidenceRefs ?? []) if (!fs.existsSync(path.join(root, ref))) failures.push(`${r.path}:${c.claimKey}: missing evidence ${ref}`);
  }
}
for (const c of x.claimFamilyClusters) {
  if (c.objectCount !== (observedClusterCounts.get(c.id) ?? 0)) failures.push(`${c.id}: objectCount mismatch`);
  for (const p of c.examplePaths ?? []) if (!sourceByPath.has(p)) failures.push(`${c.id}: unknown example path ${p}`);
}
const sum = x.records.reduce((a,r) => {
  if (r.scopeStatus === 'in_scope') a.inScopeObjects += 1;
  else if (r.scopeStatus === 'excluded_typed') a.excludedObjects += 1;
  else if (r.scopeStatus === 'review_required_unmapped') a.unmappedReviewRequired += 1;
  if (r.routingStatus === 'review_required_weak_route') a.routingReviewRequired += 1;
  a.objectFamilyCells += r.claimFamilyClusterIds.length;
  a.overrideResolved += r.localExceptions.length;
  a.inheritedUnique += r.claimFamilyClusterIds.length - r.localExceptions.length;
  const joins = new Map();
  for (const id of r.claimFamilyClusterIds) {
    const c = clusterById.get(id);
    if (!c) continue;
    if (!joins.has(c.family)) joins.set(c.family, new Set());
    joins.get(c.family).add(c.disposition);
  }
  a.multiDispositionFamilyJoins += [...joins.values()].filter(s => s.size > 1).length;
  return a;
}, { inScopeObjects:0, excludedObjects:0, unmappedReviewRequired:0, objectFamilyCells:0, inheritedUnique:0, conflictReviewRequired:0, overrideResolved:0, multiDispositionFamilyJoins:0, routingReviewRequired:0 });
for (const [k,v] of Object.entries(sum)) if (x.summary[k] !== v) failures.push(`summary mismatch ${k}`);
if (x.summary.objectLayerComplete !== (sum.unmappedReviewRequired === 0 && sum.conflictReviewRequired === 0 && sum.routingReviewRequired === 0)) failures.push('objectLayerComplete mismatch');
console.log(JSON.stringify({ result: failures.length ? 'fail' : 'pass', target, summary: x.summary, failures }, null, 2));
if (failures.length) process.exit(1);
