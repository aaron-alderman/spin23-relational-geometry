import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = process.cwd();
const registerPath = "corpus/programmes/mathematical-group-atlas/mathematical_group_external_object_register_v1.json";
const groupScanPath = "corpus/programmes/mathematical-group-atlas/mathematical_group_corpus_scan_v1.json";
const outputPath = "corpus/programmes/mathematical-group-atlas/mathematical_group_external_object_corpus_scan_v1.json";
const scanRoots = ["corpus/claims", "corpus/programmes", "verification", "evidence/data"];
const extensions = new Set([".md", ".json", ".mjs", ".js", ".py", ".txt", ".yaml", ".yml"]);
const maximumFileBytes = 20_000_000;
const excludedPrefixes = ["corpus/programmes/mathematical-group-atlas/"];
const progressEnabled = process.env.MATHEMATICAL_GROUP_SCAN_PROGRESS === "1";

const register = JSON.parse(fs.readFileSync(path.join(root, registerPath), "utf8"));
const groupScan = JSON.parse(fs.readFileSync(path.join(root, groupScanPath), "utf8"));

function walk(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    else if (extensions.has(path.extname(entry.name).toLowerCase())) files.push(absolute);
  }
  return files;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function aliasMatcher(alias) {
  const escaped = escapeRegex(alias).replace(/\\\s+/g, "\\s+");
  const prefix = /^[A-Za-z0-9]/.test(alias) ? "(?<![A-Za-z0-9_])" : "";
  const suffix = /[A-Za-z0-9]$/.test(alias) ? "(?![A-Za-z0-9_])" : "";
  return new RegExp(`${prefix}${escaped}${suffix}`, "i");
}

const aliasEntries = register.objects.flatMap((object) => (object.scanAliases ?? []).map((alias) => ({
  objectId: object.id,
  objectKind: object.kind,
  alias,
  matcher: aliasMatcher(alias)
}))).sort((left, right) => right.alias.length - left.alias.length || left.objectId.localeCompare(right.objectId));

const anchorIndex = new Map();
for (const entry of aliasEntries) {
  const anchor = (entry.alias.toLowerCase().match(/[a-z0-9]+/g) ?? []).sort((left, right) => right.length - left.length)[0];
  if (!anchor) continue;
  const values = anchorIndex.get(anchor) ?? [];
  values.push(entry);
  anchorIndex.set(anchor, values);
}
const anchorPattern = new RegExp(`\\b(?:${[...anchorIndex.keys()].sort((left, right) => right.length - left.length).map(escapeRegex).join("|")})\\b`, "i");

const predicatePatterns = [
  ["representation", /\brepresentation\b|\bmodule\b|\bweights?\b/i],
  ["homogeneous_space", /homogeneous space|coset space|flag carrier/i],
  ["quotient_space", /\bquotient\b|\bcosets?\b|homogeneous space/i],
  ["lie_algebra", /Lie algebra|\\mathfrak\s*\{?(?:sp|so|su|sl|gl|e|f|g)/i],
  ["root_system", /root system|Dynkin|Cartan matrix/i],
  ["action", /\bacts? on\b|\baction\b|orbit|transitive/i],
  ["stabilizer", /\bstabilizer\b|isotropy/i],
  ["branching", /\bbranch(?:es|ing)?\b|\brestrict(?:s|ion)?\b|decomposes/i],
  ["isomorphism", /isomorph|\\cong|\\simeq|≅|~=|≃/i]
];
const predicatePrefilter = new RegExp(predicatePatterns.map(([, pattern]) => `(?:${pattern.source})`).join("|"), "i");

const groupIdsByLocation = new Map();
for (const record of groupScan.exactMentionEvidence) {
  for (const evidence of record.evidence) {
    const key = `${evidence.path}:${evidence.line}`;
    const ids = groupIdsByLocation.get(key) ?? new Set();
    ids.add(record.groupId);
    groupIdsByLocation.set(key, ids);
  }
}

const files = scanRoots.flatMap((relative) => walk(path.join(root, relative))).sort();
const excludedFiles = [];
const skippedLargeFiles = [];
const mentionEvidence = new Map();
const documentDependencies = new Map();
const relationshipCandidates = [];
let filesScanned = 0;
let bytesScanned = 0;

for (const absolute of files) {
  const relativePath = path.relative(root, absolute).replaceAll("\\", "/");
  if (excludedPrefixes.some((prefix) => relativePath.startsWith(prefix))) {
    excludedFiles.push({ path: relativePath, reason: "self_generated_atlas_exclusion" });
    continue;
  }
  const stats = fs.statSync(absolute);
  if (stats.size > maximumFileBytes) {
    skippedLargeFiles.push({ path: relativePath, bytes: stats.size, reason: "exceeds_maximum_file_bytes" });
    continue;
  }
  if (progressEnabled && filesScanned % 100 === 0) console.error(`external-scan-progress files=${filesScanned} path=${relativePath}`);
  const lines = fs.readFileSync(absolute, "utf8").split(/\r?\n/);
  filesScanned += 1;
  bytesScanned += stats.size;
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    // JSON and source-code strings commonly double literal backslashes. Scan a
    // one-level-unescaped view as well as retaining the original line for the
    // evidence excerpt, so a mathematical alias has one stable spelling.
    const searchableLine = line.replaceAll("\\\\", "\\");
    if (!anchorPattern.test(searchableLine)) continue;
    const tokens = new Set(searchableLine.toLowerCase().match(/[a-z0-9]+/g) ?? []);
    const candidates = new Set();
    for (const token of tokens) for (const entry of anchorIndex.get(token) ?? []) candidates.add(entry);
    const found = new Map();
    for (const entry of candidates) {
      const match = searchableLine.match(entry.matcher);
      if (!match || found.has(entry.objectId)) continue;
      found.set(entry.objectId, { objectId: entry.objectId, objectKind: entry.objectKind, matchedAlias: match[0], declaredAlias: entry.alias });
    }
    if (!found.size) continue;
    const locationKey = `${relativePath}:${index + 1}`;
    const groupIds = [...(groupIdsByLocation.get(locationKey) ?? [])].sort();
    const predicates = predicatePrefilter.test(searchableLine)
      ? predicatePatterns.filter(([, pattern]) => pattern.test(searchableLine)).map(([name]) => name)
      : [];
    for (const match of found.values()) {
      const evidence = mentionEvidence.get(match.objectId) ?? [];
      evidence.push({ path: relativePath, line: index + 1, matchedAlias: match.matchedAlias, declaredAlias: match.declaredAlias });
      mentionEvidence.set(match.objectId, evidence);
    }
    const dependency = documentDependencies.get(relativePath) ?? { path: relativePath, objectIds: new Set(), groupIds: new Set(), candidateIds: [] };
    for (const objectId of found.keys()) dependency.objectIds.add(objectId);
    for (const groupId of groupIds) dependency.groupIds.add(groupId);
    documentDependencies.set(relativePath, dependency);
    if (!groupIds.length && !predicates.length) continue;
    const polarity = /\b(?:not|no|cannot|does not|fails? to|without)\b/i.test(line) ? "negative_or_qualified" : "positive_or_descriptive";
    const confidence = groupIds.length && predicates.length ? "high" : (groupIds.length || predicates.length ? "medium" : "low");
    const digest = crypto.createHash("sha256").update(`${relativePath}:${index + 1}:${line}`).digest("hex").slice(0, 16);
    const candidate = {
      id: `external-scan:${digest}`,
      path: relativePath,
      line: index + 1,
      objectMatches: [...found.values()].sort((left, right) => left.objectId.localeCompare(right.objectId)),
      groupIds,
      predicates,
      polarity,
      confidence,
      status: "candidate_unreviewed",
      excerpt: line.trim().replace(/\s+/g, " ").slice(0, 600)
    };
    relationshipCandidates.push(candidate);
    dependency.candidateIds.push(candidate.id);
  }
}

const exactObjectMentionEvidence = [...mentionEvidence.entries()].map(([objectId, evidence]) => ({ objectId, evidence }))
  .sort((left, right) => left.objectId.localeCompare(right.objectId));
const objectMentions = exactObjectMentionEvidence.map((record) => ({
  objectId: record.objectId,
  files: new Set(record.evidence.map((entry) => entry.path)).size,
  matchingLines: record.evidence.length
})).sort((left, right) => right.matchingLines - left.matchingLines || left.objectId.localeCompare(right.objectId));
const documents = [...documentDependencies.values()].map((record) => ({
  path: record.path,
  objectIds: [...record.objectIds].sort(),
  groupIds: [...record.groupIds].sort(),
  candidateIds: record.candidateIds
})).sort((left, right) => left.path.localeCompare(right.path));

const clusterMap = new Map();
for (const candidate of relationshipCandidates) {
  const objectIds = candidate.objectMatches.map((match) => match.objectId).sort();
  const key = `${objectIds.join("|")}::${candidate.groupIds.join("|")}::${[...candidate.predicates].sort().join("|")}::${candidate.polarity}`;
  const cluster = clusterMap.get(key) ?? {
    id: `external-cluster:${crypto.createHash("sha256").update(key).digest("hex").slice(0, 16)}`,
    objectIds,
    groupIds: candidate.groupIds,
    predicates: [...candidate.predicates].sort(),
    polarity: candidate.polarity,
    evidenceIds: [],
    paths: new Set(),
    confidenceCounts: { high: 0, medium: 0, low: 0 },
    status: "candidate_cluster_unreviewed"
  };
  cluster.evidenceIds.push(candidate.id);
  cluster.paths.add(candidate.path);
  cluster.confidenceCounts[candidate.confidence] += 1;
  clusterMap.set(key, cluster);
}
const relationshipClusters = [...clusterMap.values()].map((cluster) => ({ ...cluster, paths: [...cluster.paths].sort() }))
  .sort((left, right) => right.evidenceIds.length - left.evidenceIds.length || left.id.localeCompare(right.id));

const output = {
  schema: "mathematical-group-external-object-corpus-scan/1",
  basis: {
    externalObjectRegisterDate: register.date,
    groupScanAlgorithmVersion: groupScan.basis.algorithmVersion,
    algorithmVersion: "3"
  },
  authority: "deterministic_external_object_candidate_extraction_not_promoted_mathematical_claims",
  externalObjectRegister: registerPath,
  groupScan: groupScanPath,
  scanConfig: { roots: scanRoots, extensions: [...extensions], maximumFileBytes, excludedPrefixes },
  coverage: {
    filesDiscovered: files.length,
    filesScanned,
    bytesScanned,
    excludedFiles,
    skippedLargeFiles,
    skippedMeaning: "explicit_coverage_gap_not_negative_evidence"
  },
  statistics: {
    externalObjectsMentioned: objectMentions.length,
    exactMentionEvidence: exactObjectMentionEvidence.reduce((sum, record) => sum + record.evidence.length, 0),
    relationshipCandidates: relationshipCandidates.length,
    highConfidenceCandidates: relationshipCandidates.filter((candidate) => candidate.confidence === "high").length,
    relationshipClusters: relationshipClusters.length,
    documentsWithDependencies: documents.length
  },
  objectMentions,
  exactObjectMentionEvidence,
  documentDependencies: documents,
  relationshipClusters,
  relationshipCandidates
};

fs.writeFileSync(path.join(root, outputPath), `${JSON.stringify(output, null, 2)}\n`);
console.log(`Mathematical group external-object scan: objects=${objectMentions.length}; mentions=${output.statistics.exactMentionEvidence}; candidates=${relationshipCandidates.length}; clusters=${relationshipClusters.length}`);
