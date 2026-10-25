import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const write = process.argv.includes('--write');
const censusPath = 'corpus/programmes/frontier-physics-targets/full_corpus_gate_census_v1.json';
const candidatePath = 'corpus/programmes/frontier-physics-targets/physics_math_adjacency_candidates_v1.json';
const overridePath = 'corpus/programmes/frontier-physics-targets/physics_math_object_adjacency_overrides_v1.json';
const outJson = 'corpus/programmes/frontier-physics-targets/physics_math_object_expansion_v1.json';
const outMd = 'corpus/programmes/frontier-physics-targets/physics_math_object_expansion_v1.md';

const read = p => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));
const census = read(censusPath);
const candidates = read(candidatePath);
const overrides = read(overridePath);
const overrideByPath = new Map(overrides.objects.map(x => [x.path, x]));
const candidateByTopic = new Map();
for (const c of candidates.candidates) {
  if (!candidateByTopic.has(c.topicId)) candidateByTopic.set(c.topicId, new Map());
  candidateByTopic.get(c.topicId).set(c.family, c);
}

const excludedDispositions = new Set(['navigation', 'evidence_record', 'separate_programme', 'delegated_audit']);
const records = [];
const clusters = new Map();
let inScopeObjects = 0;
let excludedObjects = 0;
let unmappedReviewRequired = 0;
let objectFamilyCells = 0;
let inheritedUnique = 0;
let conflictReviewRequired = 0;
let overrideResolved = 0;
let multiDispositionFamilyJoins = 0;
let routingReviewRequired = 0;

for (const source of census.records) {
  const override = overrideByPath.get(source.path);
  const topics = [...new Set(override?.topicIds ?? source.topicIds ?? [])].sort();
  let scopeStatus;
  let scopeReason;
  if (override?.scopeStatus) {
    scopeStatus = override.scopeStatus;
    scopeReason = override.scopeReason;
  } else if (source.separateOwnerRef || source.corpusClass === 'evidence' || source.corpusClass === 'navigation' || excludedDispositions.has(source.disposition)) {
    scopeStatus = 'excluded_typed';
    scopeReason = source.separateOwnerRef
      ? `The census routes this object to the separately governed ${source.separateDomain} programme at ${source.separateOwnerRef}.`
      : source.corpusClass === 'evidence'
      ? 'Evidence artifacts support claims but are not themselves scientific claim objects; provenance is governed by the evidence spine.'
      : source.corpusClass === 'navigation'
        ? 'Navigation artifacts route claims but are not scientific claim objects.'
        : `Census disposition ${source.disposition} is governed by its named navigation, evidence, separate-programme or dedicated-audit authority.`;
  } else if (topics.length) {
    scopeStatus = 'in_scope';
    scopeReason = 'The corpus census explicitly maps this object to one or more normalized frontier topics.';
  } else {
    scopeStatus = 'review_required_unmapped';
    scopeReason = 'No explicit topic mapping or typed exclusion currently justifies adjacency inheritance.';
  }

  const claimFamilyClusterIds = [];
  const localExceptions = [];
  let routingStatus = 'not_applicable';
  if (scopeStatus === 'in_scope') {
    inScopeObjects += 1;
    const maxMappingScore = Math.max(0, ...Object.values(source.mappingScores ?? {}));
    routingStatus = override?.routingStatus ?? (maxMappingScore >= 12 ? 'strong_title_route' : 'review_required_weak_route');
    if (routingStatus === 'review_required_weak_route') routingReviewRequired += 1;
    const joinedByFamily = new Map();
    for (const topicId of topics) for (const c of candidateByTopic.get(topicId)?.values() ?? []) {
      if (!joinedByFamily.has(c.family)) joinedByFamily.set(c.family, new Set());
      joinedByFamily.get(c.family).add(c.disposition);
      const claimKey = `${topicId}:${c.family}`;
      const authored = override?.claims?.[claimKey];
      let disposition = c.disposition;
      if (authored) {
        disposition = authored.disposition;
        localExceptions.push({ claimKey, disposition, reason: authored.reason, reopeningTrigger: authored.reopeningTrigger, evidenceRefs: authored.evidenceRefs ?? [] });
        overrideResolved += 1;
      } else {
        inheritedUnique += 1;
      }
      objectFamilyCells += 1;
      const clusterKey = JSON.stringify({ topicId, family: c.family, disposition, sourceCandidateId: c.id });
      const keyHash = crypto.createHash('sha256').update(clusterKey).digest('hex').slice(0, 16);
      const clusterId = `CFC-${keyHash}`;
      claimFamilyClusterIds.push(clusterId);
      const cluster = clusters.get(clusterId) ?? { id: clusterId, topicId, family: c.family, disposition, sourceCandidateId: c.id, sourceEvidenceRefs: c.evidenceRefs, objectCount: 0, examplePaths: [] };
      cluster.objectCount += 1;
      if (cluster.examplePaths.length < 5) cluster.examplePaths.push(source.path);
      clusters.set(cluster.id, cluster);
    }
    multiDispositionFamilyJoins += [...joinedByFamily.values()].filter(s => s.size > 1).length;
  } else if (scopeStatus === 'excluded_typed') {
    excludedObjects += 1;
  } else {
    unmappedReviewRequired += 1;
  }
  records.push({
    path: source.path,
    sha256: source.sha256,
    title: source.title,
    corpusClass: source.corpusClass,
    claimId: source.claimId,
    censusDisposition: source.disposition,
    stateSignal: source.stateSignal,
    domains: source.domains ?? (source.domain ? [source.domain] : []),
    topicIds: topics,
    scopeStatus,
    scopeReason,
    scopeAuthorityRef: source.separateOwnerRef ?? source.auditRef ?? null,
    routingStatus,
    routingReason: override?.routingReason ?? null,
    routingEvidenceRefs: override?.routingEvidenceRefs ?? [],
    claimFamilyClusterIds,
    localExceptions
  });
}

const result = {
  schema: 'frontier.physics-math-object-expansion/1',
  date: '2026-10-25',
  scope: 'Every object in the full-corpus gate census. Each explicit object-to-topic mapping expands into object × topic × applicable-family claim cells. Unmapped scientific objects remain a review queue; navigation, raw evidence, separate programmes and programme files governed by dedicated gate audits are excluded with typed reasons.',
  method: 'No scientific disposition is inferred from keywords. Each object-topic-family claim inherits exactly one disposition from its normalized topic candidate. An object may legitimately contain several claims with different dispositions for the same relation family; these are retained rather than averaged into a false conflict. The 518 source claim-family clusters are stored once and object records reference their IDs, preserving object hashes without duplicating evidence payloads.',
  inputs: [censusPath, candidatePath, overridePath],
  summary: {
    inventoryObjects: records.length,
    inScopeObjects,
    excludedObjects,
    unmappedReviewRequired,
    objectFamilyCells,
    inheritedUnique,
    conflictReviewRequired,
    overrideResolved,
    multiDispositionFamilyJoins,
    routingReviewRequired,
    claimFamilyClusters: clusters.size,
    topicLayerComplete: candidates.summary.unreviewed === 0,
    objectLayerComplete: unmappedReviewRequired === 0 && conflictReviewRequired === 0 && routingReviewRequired === 0
  },
  claimFamilyClusters: [...clusters.values()].sort((a,b) => a.id.localeCompare(b.id)),
  records
};

const md = `# Physics–mathematics claim-family and object expansion\n\n**Date:** ${result.date}  \n**Status:** ${result.summary.objectLayerComplete ? 'complete' : 'open'}\n\nThis is the adversarial expansion below the normalized topic register. It does not treat topic completion as proof that every local corpus object has been admitted, excluded or correctly mapped.\n\n## Census\n\n| Measure | Count |\n|---|---:|\n| Inventory objects | ${result.summary.inventoryObjects} |\n| Explicitly mapped in-scope objects | ${result.summary.inScopeObjects} |\n| Typed exclusions | ${result.summary.excludedObjects} |\n| Unmapped scientific objects requiring scope review | ${result.summary.unmappedReviewRequired} |\n| Weak semantic routes requiring independent review | ${result.summary.routingReviewRequired} |\n| Object × topic × applicable-family cells | ${result.summary.objectFamilyCells} |\n| Unique inherited claim cells | ${result.summary.inheritedUnique} |\n| Authored local-exception resolutions | ${result.summary.overrideResolved} |\n| Objects with multiple topic-specific dispositions for one family | ${result.summary.multiDispositionFamilyJoins} |\n| Deduplicated claim-family clusters | ${result.summary.claimFamilyClusters} |\n\n## Reading the result\n\nEach inherited cell is one object-to-topic claim family with exactly one disposition. If an object maps to several topics, those claims remain distinct: an operation can be established on one carrier and obstructed on another without contradiction. The multi-disposition count is therefore a join diagnostic, not an error. A title match is accepted as a strong route; a lead/context-only semantic route remains an explicit review queue. Unmapped scientific objects are not declared irrelevant merely because they lack frontier vocabulary. Typed exclusions remain in the inventory with their reason. The JSON register retains every object hash, source candidate and claim-family cluster.\n\n## Current decision\n\nThe topic layer is ${result.summary.topicLayerComplete ? 'complete' : 'open'}. The object layer is ${result.summary.objectLayerComplete ? 'complete' : 'open'} because ${result.summary.unmappedReviewRequired} objects lack a route and ${result.summary.routingReviewRequired} mapped objects still have weak semantic routes requiring independent review.\n`;

const jsonText = JSON.stringify(result, null, 2) + '\n';
function emit(target, content) {
  const abs = path.join(root, target);
  if (write) fs.writeFileSync(abs, content);
  else if (!fs.existsSync(abs) || fs.readFileSync(abs, 'utf8') !== content) throw new Error(`${target} is stale; run with --write`);
}
emit(outJson, jsonText);
emit(outMd, md);
console.log(JSON.stringify({ result: 'pass', outputs: [outJson, outMd], summary: result.summary }, null, 2));
