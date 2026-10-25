import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
const boundary = read("corpus/programmes/frontier-physics-targets/residual_frontier_exhaustion_boundary_v1.json");
const register = read("corpus/programmes/frontier-physics-targets/open_topics_register_v1.json");
const failures = [];
if (boundary.schema !== "frontier.residual-exhaustion-boundary/1") failures.push("schema mismatch");
const closed = register.topics.filter(topic => topic.status === "closed").map(topic => topic.id).sort();
const nonclosed = register.topics.filter(topic => topic.status !== "closed").map(topic => topic.id).sort();
const classified = boundary.groups.flatMap(group => group.topicIds);
const unique = [...new Set(classified)].sort();
if (unique.length !== classified.length) failures.push("a nonclosed topic is classified more than once");
if (JSON.stringify(unique) !== JSON.stringify(nonclosed)) failures.push("classification does not exactly cover the maintained nonclosed register");
if (boundary.corpusReadyFiniteTopicIds.length !== 0) failures.push("corpus-ready set must be empty at this boundary");
const counts = boundary.declaredCounts;
if (counts.closed !== closed.length || counts.nonclosed !== nonclosed.length) failures.push("declared closed/nonclosed counts drifted");
for (const group of boundary.groups) {
  const key = ({
    physical_experiment_or_calibrated_hardware: "physicalExperimentOrCalibratedHardware",
    compute_scale_or_unreleased_source: "computeScaleOrUnreleasedSource",
    model_action_or_cross_grade_construction: "modelActionOrCrossGradeConstruction",
    blocked_open_problem: "blockedOpenProblem",
    continuing_governance: "continuingGovernance"
  })[group.id];
  if (!key || counts[key] !== group.topicIds.length) failures.push(`count mismatch for ${group.id}`);
}
if (failures.length) {
  console.error(JSON.stringify({ result: "fail", failures }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ result: "pass", closed: closed.length, nonclosed: nonclosed.length, groups: Object.fromEntries(boundary.groups.map(group => [group.id, group.topicIds.length])), corpusReadyFinite: 0 }, null, 2));
