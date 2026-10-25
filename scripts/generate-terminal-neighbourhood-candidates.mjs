import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const lane = "corpus/programmes/frontier-physics-targets";
const criteriaPath = `${lane}/corpus_completion_exit_criteria_v1.json`;
const topicsPath = `${lane}/open_topics_register_v1.json`;
const outputPath = `${lane}/terminal_neighbourhood_candidates_v1.json`;
const markdownPath = `${lane}/terminal_neighbourhood_candidates_v1.md`;
const read = rel => JSON.parse(fs.readFileSync(path.join(root, rel), "utf8"));
const criteria = read(criteriaPath);
const topics = read(topicsPath);
const existing = fs.existsSync(path.join(root, outputPath)) ? read(outputPath) : null;
const prior = new Map((existing?.candidates ?? []).map(candidate => [candidate.id, candidate]));
const terminalTopics = topics.topics.filter(topic => ["closed", "blocked"].includes(topic.status));

const candidates = terminalTopics.flatMap(topic => criteria.terminalNeighbourhoodMoves.map(move => {
  const id = `${topic.id}:${move}`;
  const previous = prior.get(id);
  return {
    id,
    topicId: topic.id,
    topicLabel: topic.label,
    topicStatusAtGeneration: topic.status,
    closureEvidence: topic.closureEvidence ?? topic.progressEvidence ?? null,
    move,
    workflowStatus: previous?.workflowStatus ?? "unreviewed",
    result: previous?.result ?? null,
    evidenceRefs: previous?.evidenceRefs ?? [],
    finding: previous?.finding ?? null,
    inheritedConsequences: previous?.inheritedConsequences ?? [],
    minimalReopeningDatum: previous?.minimalReopeningDatum ?? null,
    reviewer: previous?.reviewer ?? null
  };
}));
const reviewed = candidates.filter(candidate => candidate.workflowStatus === "reviewed").length;
const output = {
  schema: "frontier.terminal-neighbourhood-candidates/1",
  date: new Date().toISOString().slice(0, 10),
  authority: "EXIT-02 review queue. A closed or blocked topic is not neighbourhood-exhausted merely because its original closure or blocker is valid.",
  criteriaRef: criteriaPath,
  sourceRef: topicsPath,
  allowedResults: ["reopens_branch", "does_not_reopen", "new_child_topic", "requires_external_datum", "not_applicable_with_reason"],
  summary: {
    terminalTopics: terminalTopics.length,
    closedTopics: terminalTopics.filter(topic => topic.status === "closed").length,
    blockedTopics: terminalTopics.filter(topic => topic.status === "blocked").length,
    movesPerTopic: criteria.terminalNeighbourhoodMoves.length,
    candidates: candidates.length,
    reviewed,
    unreviewed: candidates.length - reviewed,
    exit02Passed: reviewed === candidates.length && candidates.length > 0
  },
  candidates
};
const markdown = `# Terminal-neighbourhood candidates v1\n\n` +
  `**Generated:** ${output.date}  \n**Status:** ${output.summary.unreviewed} of ${output.summary.candidates} neighbourhood checks remain unreviewed  \n**Machine authority:** [terminal-neighbourhood register](terminal_neighbourhood_candidates_v1.json)\n\n` +
  `EXIT-02 applies eight reopening moves to every topic currently marked closed or blocked. The present queue contains **${output.summary.terminalTopics} terminal topics** (${output.summary.closedTopics} closed and ${output.summary.blockedTopics} blocked) and **${output.summary.candidates} checks**. A closure proof remains valid while a nearby variant becomes a new child topic; the point is to prevent “this route failed” from silently becoming “the neighbourhood is exhausted.”\n\n` +
  `A reviewed cell must retain evidence, a finding, inherited consequences and the minimal reopening datum. “Not applicable” requires a reason. New terminal topics enter the matrix automatically on regeneration, while completed reviews are preserved by stable identifier.\n\n` +
  `## Reproduction\n\n~~~powershell\nnode scripts/generate-terminal-neighbourhood-candidates.mjs --write\nnode verification/frontier-physics-targets/verify_terminal_neighbourhood_candidates.mjs\n~~~\n`;
if (!process.argv.includes("--write")) {
  console.log(JSON.stringify(output.summary, null, 2));
  process.exit(0);
}
fs.writeFileSync(path.join(root, outputPath), `${JSON.stringify(output, null, 2)}\n`);
fs.writeFileSync(path.join(root, markdownPath), markdown);
console.log(JSON.stringify({ result: "pass", outputs: [outputPath, markdownPath], summary: output.summary }, null, 2));
