import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const lane = "corpus/programmes/frontier-physics-targets";
const read = rel => JSON.parse(fs.readFileSync(path.join(root, rel), "utf8"));
const register = read(`${lane}/terminal_neighbourhood_candidates_v1.json`);
const criteria = read(`${lane}/corpus_completion_exit_criteria_v1.json`);
const topics = read(`${lane}/open_topics_register_v1.json`);
const failures = [];
if (register.schema !== "frontier.terminal-neighbourhood-candidates/1") failures.push("schema mismatch");
const terminal = topics.topics.filter(topic => ["closed", "blocked"].includes(topic.status));
const expected = terminal.flatMap(topic => criteria.terminalNeighbourhoodMoves.map(move => `${topic.id}:${move}`)).sort();
const actual = register.candidates.map(candidate => candidate.id).sort();
if (JSON.stringify(expected) !== JSON.stringify(actual)) failures.push("terminal neighbourhood universe drifted");
const ids = new Set();
for (const candidate of register.candidates) {
  if (ids.has(candidate.id)) failures.push(`duplicate ${candidate.id}`);
  ids.add(candidate.id);
  if (!criteria.terminalNeighbourhoodMoves.includes(candidate.move)) failures.push(`${candidate.id}: unknown move`);
  if (candidate.workflowStatus === "reviewed") {
    if (!register.allowedResults.includes(candidate.result)) failures.push(`${candidate.id}: invalid result`);
    if (!candidate.finding || !candidate.minimalReopeningDatum || !candidate.inheritedConsequences?.length || !candidate.evidenceRefs?.length) failures.push(`${candidate.id}: incomplete review receipt`);
    for (const ref of candidate.evidenceRefs ?? []) if (!fs.existsSync(path.join(root, ref))) failures.push(`${candidate.id}: missing evidence ${ref}`);
  }
}
const reviewed = register.candidates.filter(candidate => candidate.workflowStatus === "reviewed").length;
const complete = reviewed === register.candidates.length && register.candidates.length > 0;
if (register.summary.candidates !== register.candidates.length || register.summary.reviewed !== reviewed || register.summary.exit02Passed !== complete) failures.push("summary drift");
if (failures.length) {
  console.error(JSON.stringify({ result: "fail", failures }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ result: "pass", structuralIntegrity: true, terminalTopics: terminal.length, candidates: register.candidates.length, reviewed, unreviewed: register.candidates.length - reviewed, exit02Passed: complete }, null, 2));
