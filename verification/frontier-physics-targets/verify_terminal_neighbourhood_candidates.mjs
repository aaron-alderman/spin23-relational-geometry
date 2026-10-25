import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const lane = "corpus/programmes/frontier-physics-targets";
const read = rel => JSON.parse(fs.readFileSync(path.join(root, rel), "utf8"));
const register = read(`${lane}/terminal_neighbourhood_candidates_v1.json`);
const criteria = read(`${lane}/corpus_completion_exit_criteria_v1.json`);
const topics = read(`${lane}/open_topics_register_v1.json`);
const reviews = read(`${lane}/terminal_neighbourhood_reviews_v1.json`);
const failures = [];
if (register.schema !== "frontier.terminal-neighbourhood-candidates/1") failures.push("schema mismatch");
const terminal = topics.topics.filter(topic => ["closed", "blocked"].includes(topic.status));
const expected = terminal.flatMap(topic => criteria.terminalNeighbourhoodMoves.map(move => `${topic.id}:${move}`)).sort();
const actual = register.candidates.map(candidate => candidate.id).sort();
if (JSON.stringify(expected) !== JSON.stringify(actual)) failures.push("terminal neighbourhood universe drifted");
const ids = new Set();
const candidateMap = new Map(register.candidates.map(candidate => [candidate.id, candidate]));
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
const terminalIds = new Set(terminal.map(topic => topic.id));
const reviewedTopicIds = new Set();
for (const topicReview of reviews.topics ?? []) {
  if (reviewedTopicIds.has(topicReview.topicId)) failures.push(`${topicReview.topicId}: duplicate authored topic review`);
  reviewedTopicIds.add(topicReview.topicId);
  if (!terminalIds.has(topicReview.topicId)) failures.push(`${topicReview.topicId}: authored review is not terminal`);
  if (!topicReview.reviewer || !topicReview.evidenceRefs?.length || !topicReview.inheritedConsequences?.length) failures.push(`${topicReview.topicId}: incomplete authored topic metadata`);
  for (const ref of topicReview.evidenceRefs ?? []) if (!fs.existsSync(path.join(root, ref))) failures.push(`${topicReview.topicId}: missing authored evidence ${ref}`);
  for (const move of criteria.terminalNeighbourhoodMoves) {
    const authored = topicReview.moves?.[move];
    if (!authored) {
      failures.push(`${topicReview.topicId}: missing authored move ${move}`);
      continue;
    }
    const candidate = candidateMap.get(`${topicReview.topicId}:${move}`);
    if (candidate?.workflowStatus !== "reviewed" || candidate?.result !== authored.result || candidate?.finding !== authored.finding || candidate?.minimalReopeningDatum !== authored.minimalReopeningDatum) failures.push(`${topicReview.topicId}:${move}: authored review drift`);
  }
  for (const move of Object.keys(topicReview.moves ?? {})) if (!criteria.terminalNeighbourhoodMoves.includes(move)) failures.push(`${topicReview.topicId}: unknown authored move ${move}`);
}
const reviewed = register.candidates.filter(candidate => candidate.workflowStatus === "reviewed").length;
const complete = reviewed === register.candidates.length && register.candidates.length > 0;
if (register.summary.candidates !== register.candidates.length || register.summary.reviewed !== reviewed || register.summary.exit02Passed !== complete) failures.push("summary drift");
if (criteria.gates.find(gate => gate.id === "EXIT-02")?.status !== (complete ? "passed" : "open")) failures.push("EXIT-02 contract status drift");
if (failures.length) {
  console.error(JSON.stringify({ result: "fail", failures }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ result: "pass", structuralIntegrity: true, terminalTopics: terminal.length, authoredTopicReviews: reviewedTopicIds.size, candidates: register.candidates.length, reviewed, unreviewed: register.candidates.length - reviewed, exit02Passed: complete }, null, 2));
