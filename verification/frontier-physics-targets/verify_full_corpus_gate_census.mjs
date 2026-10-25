import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = process.cwd();
const censusPath = "corpus/programmes/frontier-physics-targets/full_corpus_gate_census_v1.json";
const censusMdPath = "corpus/programmes/frontier-physics-targets/full_corpus_gate_census_v1.md";
const census = JSON.parse(fs.readFileSync(path.join(root, censusPath), "utf8"));
const topics = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/frontier-physics-targets/open_topics_register_v1.json"), "utf8"));
const topicIds = new Set(topics.topics.map((topic) => topic.id));
const posix = (value) => value.split(path.sep).join("/");
const excluded = new Set([
  censusPath,
  censusMdPath,
  "corpus/EVIDENCE_SPINE.md",
  "corpus/FRONT_DOOR.md",
  "corpus/registers/spin23_corpus_manifest.json",
  "corpus/registers/corpus_evidence_spine.json",
  "corpus/registers/corpus_front_door.json",
  "corpus/programmes/frontier-physics-targets/physics_math_object_expansion_v1.json",
  "corpus/programmes/frontier-physics-targets/physics_math_object_expansion_v1.md",
  "corpus/programmes/frontier-physics-targets/physics_math_object_adjacency_overrides_v1.json",
  "corpus/programmes/frontier-physics-targets/theory_bridge_audit_v1.json",
  "corpus/programmes/frontier-physics-targets/theory_bridge_audit_v1.md",
  "corpus/programmes/frontier-physics-targets/literature_frontier_search_register_v1.json",
  "corpus/programmes/frontier-physics-targets/literature_frontier_search_register_v1.md",
  "corpus/programmes/frontier-physics-targets/claim_implication_defeat_graph_v1.json",
  "corpus/programmes/frontier-physics-targets/claim_implication_defeat_graph_v1.md",
  "corpus/programmes/frontier-physics-targets/standalone_narrative_audit_v1.json",
  "corpus/programmes/frontier-physics-targets/standalone_narrative_audit_v1.md",
  "corpus/programmes/frontier-physics-targets/documentation_linking_retrieval_gate_v1.json",
  "corpus/programmes/frontier-physics-targets/documentation_linking_retrieval_gate_v1.md",
  "corpus/programmes/frontier-physics-targets/adversarial_release_audit_v1.json",
  "corpus/programmes/frontier-physics-targets/adversarial_release_audit_v1.md",
  "corpus/programmes/frontier-physics-targets/corpus_saturation_release_certificate_v1.json",
  "corpus/programmes/frontier-physics-targets/corpus_saturation_release_certificate_v1.md",
]);
const pattern = new RegExp(census.pattern, "i");
const statusPattern = new RegExp(census.statusPattern, "im");
const failures = [];

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const full = path.join(dir, entry.name);
  return entry.isDirectory() ? walk(full) : [full];
});

if (census.schema !== "frontier.full-corpus-gate-census/1") failures.push(`unexpected schema ${census.schema}`);
const narrative = ["corpus", "evidence"].flatMap((directory) => walk(path.join(root, directory))).filter((file) => /\.(md|json)$/i.test(file) && !excluded.has(posix(path.relative(root, file))));
const matched = narrative.filter((file) => {
  const text = fs.readFileSync(file, "utf8");
  return pattern.test(text) || statusPattern.test(text);
}).map((file) => posix(path.relative(root, file))).sort();
const matchedSet = new Set(matched);
const narrativePaths = narrative.map((file) => posix(path.relative(root, file))).sort();
const records = new Map();
for (const record of census.records) {
  if (records.has(record.path)) failures.push(`duplicate record ${record.path}`);
  records.set(record.path, record);
  const abs = path.join(root, record.path);
  if (!fs.existsSync(abs)) {
    failures.push(`missing source ${record.path}`);
    continue;
  }
  const digest = crypto.createHash("sha256").update(fs.readFileSync(abs)).digest("hex");
  if (digest !== record.sha256) failures.push(`stale hash ${record.path}`);
  if (record.disposition === "unresolved") failures.push(`unresolved record ${record.path}`);
  if (record.disposition === "no_declared_gate" && matchedSet.has(record.path)) failures.push(`matched file classified no_declared_gate ${record.path}`);
  if (record.disposition !== "no_declared_gate" && !matchedSet.has(record.path)) failures.push(`unmatched file classified as a gate ${record.path}`);
  if (record.disposition === "mapped") {
    if (!record.topicIds?.length) failures.push(`mapped record has no topics ${record.path}`);
    for (const id of record.topicIds ?? []) if (!topicIds.has(id)) failures.push(`unknown topic ${id} in ${record.path}`);
    if (!record.mappingBasis) failures.push(`mapped record has no mapping basis ${record.path}`);
  }
  if (record.disposition === "evidence_record") {
    for (const id of record.topicIds ?? []) if (!topicIds.has(id)) failures.push(`unknown evidence topic ${id} in ${record.path}`);
    for (const owner of record.ownerRefs ?? []) if (!fs.existsSync(path.join(root, owner))) failures.push(`missing evidence owner ${owner} in ${record.path}`);
    if (!(record.topicIds?.length || record.ownerRefs?.length)) failures.push(`evidence record has neither topic nor corpus owner ${record.path}`);
  }
  if (record.corpusClass === "evidence") {
    for (const owner of record.ownerRefs ?? []) if (!fs.existsSync(path.join(root, owner))) failures.push(`missing evidence owner ${owner} in ${record.path}`);
    if (/\/publication-manifest-v\d+\.json$/i.test(record.path) && !record.ownerRefs?.length) failures.push(`publication manifest has no retained owner ${record.path}`);
  }
  if (record.disposition === "delegated_audit" && (!record.auditRef || !fs.existsSync(path.join(root, record.auditRef)))) failures.push(`missing audit owner for ${record.path}`);
  if (["navigation", "separate_programme"].includes(record.disposition) && (!record.ownerRef || !fs.existsSync(path.join(root, record.ownerRef)))) failures.push(`missing ownerRef for ${record.path}`);
  if (record.disposition !== "no_declared_gate" && !record.gatePhrases?.length) failures.push(`record has no matched phrase or status ${record.path}`);
}

for (const rel of narrativePaths) if (!records.has(rel)) failures.push(`narrative file absent from census ${rel}`);
for (const rel of records.keys()) if (!narrativePaths.includes(rel)) failures.push(`census record absent from narrative scope ${rel}`);
if (census.summary.scannedNarrativeFiles !== narrative.length) failures.push(`scanned count ${census.summary.scannedNarrativeFiles} != ${narrative.length}`);
if (census.summary.inventoriedFiles !== narrative.length) failures.push(`inventory count ${census.summary.inventoriedFiles} != ${narrative.length}`);
if (census.summary.matchedFiles !== matched.length) failures.push(`matched count ${census.summary.matchedFiles} != ${matched.length}`);
if (census.summary.unresolved !== 0) failures.push(`summary unresolved=${census.summary.unresolved}`);

if (failures.length) {
  console.error(JSON.stringify({ result: "fail", narrativeFiles: narrative.length, matchedFiles: matched.length, failures }, null, 2));
  process.exit(1);
}

const dispositions = Object.fromEntries([...census.records.reduce((map, record) => map.set(record.disposition, (map.get(record.disposition) ?? 0) + 1), new Map())].sort());
console.log(JSON.stringify({ result: "pass", narrativeFiles: narrative.length, inventoriedFiles: records.size, matchedFiles: matched.length, matchingClaims: census.summary.matchedClaims, claimsWithoutDeclaredGate: census.summary.claimsWithoutDeclaredGate, evidenceFiles: census.summary.evidenceFiles, matchedEvidenceFiles: census.summary.matchedEvidenceFiles, dispositions, unresolved: 0, hashesCurrent: true, topicReferencesValid: true }, null, 2));
