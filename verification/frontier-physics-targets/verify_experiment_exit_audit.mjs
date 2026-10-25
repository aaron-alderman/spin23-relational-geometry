import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const lane = "corpus/programmes/frontier-physics-targets";
const read = rel => JSON.parse(fs.readFileSync(path.join(root, rel), "utf8"));
const audit = read(`${lane}/experiment_exit_audit_v1.json`);
const criteria = read(`${lane}/corpus_completion_exit_criteria_v1.json`);
const atlas = read(`${lane}/frontier_experiment_programmes_v2.json`);
const experiments = atlas.programmes;
const failures = [];
if (audit.schema !== "frontier.experiment-exit-audit/1") failures.push("schema mismatch");
if (audit.records.length !== experiments.length) failures.push("experiment coverage drift");
const atlasMap = new Map(experiments.map(experiment => [experiment.id, experiment]));
for (const record of audit.records) {
  const experiment = atlasMap.get(record.experimentId);
  if (!experiment) failures.push(`unknown experiment ${record.experimentId}`);
  for (const field of criteria.experimentRequiredFields) {
    const explicit = Object.hasOwn(experiment ?? {}, field) && experiment[field] !== null && experiment[field] !== "";
    const expected = explicit ? "explicit" : "missing_explicit_field";
    if (record.fields?.[field]?.status !== expected) failures.push(`${record.experimentId}: ${field} audit drift`);
  }
}
const total = experiments.length * criteria.experimentRequiredFields.length;
const explicit = audit.records.reduce((sum, record) => sum + record.explicitFields, 0);
const ready = audit.records.filter(record => record.exitReady).length;
const decisionReady = audit.records.filter(record => record.threeDecisionLayersExplicit).length;
if (audit.summary.totalRequiredCells !== total || audit.summary.explicitCells !== explicit || audit.summary.missingCells !== total - explicit || audit.summary.exitReadyExperiments !== ready) failures.push("summary drift");
if (audit.summary.threeDecisionLayersExplicit !== decisionReady) failures.push("decision-layer summary drift");
if (audit.summary.exit03Passed !== (ready === experiments.length && decisionReady === experiments.length)) failures.push("EXIT-03 flag drift");
if (failures.length) {
  console.error(JSON.stringify({ result: "fail", failures }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ result: "pass", structuralIntegrity: true, experiments: experiments.length, requiredFields: criteria.experimentRequiredFields.length, explicitCells: explicit, missingCells: total - explicit, exitReadyExperiments: ready, exit03Passed: audit.summary.exit03Passed }, null, 2));
