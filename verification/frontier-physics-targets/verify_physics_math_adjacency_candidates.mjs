import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const lane = "corpus/programmes/frontier-physics-targets";
const read = rel => JSON.parse(fs.readFileSync(path.join(root, rel), "utf8"));
const register = read(`${lane}/physics_math_adjacency_candidates_v1.json`);
const criteria = read(`${lane}/corpus_completion_exit_criteria_v1.json`);
const topics = read(`${lane}/open_topics_register_v1.json`);
const detectors = read(`${lane}/detector_frontier_register_v1.json`);
const terminal = read(`${lane}/terminal_neighbourhood_candidates_v1.json`);
const crosswalk = read(`${lane}/adjacency_terminal_review_crosswalk_v1.json`);
const failures = [];

if (register.schema !== "frontier.physics-math-adjacency-candidates/1") failures.push("schema mismatch");
const familySet = new Set(criteria.requiredAdjacencyFamilies);
const dispositionSet = new Set(criteria.requiredAdjacencyDispositions);
const topicMap = new Map(topics.topics.map(topic => [topic.id, topic]));
const areaSet = new Set(detectors.frontierAreas.map(area => area.id));
const ids = new Set();
const terminalMap = new Map(terminal.candidates.map(candidate => [candidate.id, candidate]));
if (crosswalk.schema !== "frontier.adjacency-terminal-crosswalk/1") failures.push("terminal crosswalk schema mismatch");
for (const family of criteria.requiredAdjacencyFamilies) {
  const move = crosswalk.familyToMove?.[family];
  if (!criteria.terminalNeighbourhoodMoves.includes(move)) failures.push(`${family}: missing or invalid terminal move crosswalk`);
}
for (const result of terminal.allowedResults ?? []) if (!dispositionSet.has(crosswalk.resultToDisposition?.[result])) failures.push(`${result}: missing or invalid disposition crosswalk`);
for (const [area, record] of Object.entries(register.areaFamilyMatrix ?? {})) {
  if (!areaSet.has(area)) failures.push(`unknown area ${area}`);
  if (!Array.isArray(record.families) || !record.families.length) failures.push(`${area}: no adjacency families`);
  for (const family of record.families ?? []) if (!familySet.has(family)) failures.push(`${area}: unknown family ${family}`);
}
for (const area of areaSet) if (!register.areaFamilyMatrix?.[area]) failures.push(`missing area matrix entry ${area}`);

for (const candidate of register.candidates ?? []) {
  if (ids.has(candidate.id)) failures.push(`duplicate ${candidate.id}`);
  ids.add(candidate.id);
  const topic = topicMap.get(candidate.topicId);
  if (!topic) failures.push(`${candidate.id}: unknown topic`);
  if (!familySet.has(candidate.family)) failures.push(`${candidate.id}: unknown family`);
  const expectedAreas = (topic?.frontierAreaIds ?? []).filter(area => register.areaFamilyMatrix?.[area]?.families.includes(candidate.family));
  const actualAreas = (candidate.applicabilityBasis ?? []).map(item => item.frontierAreaId);
  if (JSON.stringify(expectedAreas) !== JSON.stringify(actualAreas)) failures.push(`${candidate.id}: applicability basis drift`);
  if (!expectedAreas.length) failures.push(`${candidate.id}: no applicability basis`);
  if (candidate.disposition !== null && !dispositionSet.has(candidate.disposition)) failures.push(`${candidate.id}: invalid disposition`);
  if (candidate.workflowStatus === "dispositioned") {
    if (!candidate.disposition || !candidate.reason || !candidate.reopeningTrigger || !candidate.evidenceRefs?.length || !candidate.implications?.length) failures.push(`${candidate.id}: incomplete disposition receipt`);
    for (const ref of candidate.evidenceRefs ?? []) if (!fs.existsSync(path.join(root, ref))) failures.push(`${candidate.id}: missing evidence ${ref}`);
  }
  if (candidate.derivationRef === `${lane}/adjacency_terminal_review_crosswalk_v1.json`) {
    const move = crosswalk.familyToMove[candidate.family];
    const source = terminalMap.get(`${candidate.topicId}:${move}`);
    if (!source || source.workflowStatus !== "reviewed") failures.push(`${candidate.id}: missing reviewed terminal source`);
    if (candidate.sourceReviewId !== source?.id) failures.push(`${candidate.id}: terminal source id drift`);
    if (candidate.disposition !== crosswalk.resultToDisposition[source?.result]) failures.push(`${candidate.id}: derived disposition drift`);
    if (JSON.stringify(candidate.evidenceRefs) !== JSON.stringify(source?.evidenceRefs)) failures.push(`${candidate.id}: derived evidence drift`);
    if (candidate.reopeningTrigger !== source?.minimalReopeningDatum) failures.push(`${candidate.id}: derived reopening trigger drift`);
    if (JSON.stringify(candidate.implications) !== JSON.stringify(source?.inheritedConsequences)) failures.push(`${candidate.id}: derived implications drift`);
    if (JSON.stringify(candidate.preservedStructure) !== JSON.stringify(crosswalk.preservedStructure) || JSON.stringify(candidate.lostStructure) !== JSON.stringify(crosswalk.lostStructure)) failures.push(`${candidate.id}: derived structure ledger drift`);
  }
}

for (const topic of topics.topics) {
  const expected = [...new Set(topic.frontierAreaIds.flatMap(area => register.areaFamilyMatrix?.[area]?.families ?? []))];
  const actual = register.candidates.filter(candidate => candidate.topicId === topic.id).map(candidate => candidate.family);
  if (expected.length !== actual.length || expected.some(family => !actual.includes(family))) failures.push(`${topic.id}: candidate coverage drift`);
}

const dispositioned = register.candidates.filter(candidate => candidate.workflowStatus === "dispositioned").length;
const complete = dispositioned === register.candidates.length && register.candidates.length > 0;
if (register.summary.candidates !== register.candidates.length) failures.push("candidate count drift");
if (register.summary.dispositioned !== dispositioned) failures.push("dispositioned count drift");
if (register.summary.exit01Passed !== complete) failures.push("EXIT-01 flag drift");

if (failures.length) {
  console.error(JSON.stringify({ result: "fail", failures }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ result: "pass", structuralIntegrity: true, topics: topics.topics.length, areas: areaSet.size, families: familySet.size, candidates: register.candidates.length, dispositioned, unreviewed: register.candidates.length - dispositioned, exit01Passed: complete }, null, 2));
