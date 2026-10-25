import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const lane = "corpus/programmes/frontier-physics-targets";
const criteriaPath = `${lane}/corpus_completion_exit_criteria_v1.json`;
const atlasPath = `${lane}/frontier_experiment_atlas_v1.json`;
const outputPath = `${lane}/experiment_exit_audit_v1.json`;
const markdownPath = `${lane}/experiment_exit_audit_v1.md`;
const read = rel => JSON.parse(fs.readFileSync(path.join(root, rel), "utf8"));
const criteria = read(criteriaPath);
const atlas = read(atlasPath);

const records = atlas.experiments.map(experiment => {
  const fields = Object.fromEntries(criteria.experimentRequiredFields.map(field => [field, {
    status: Object.hasOwn(experiment, field) && experiment[field] !== null && experiment[field] !== "" ? "explicit" : "missing_explicit_field",
    sourceField: Object.hasOwn(experiment, field) ? field : null
  }]));
  const explicit = Object.values(fields).filter(record => record.status === "explicit").length;
  return {
    experimentId: experiment.id,
    title: experiment.title,
    mode: experiment.mode,
    readiness: experiment.readiness,
    topicIds: experiment.topicIds,
    detectorIds: experiment.detectorIds,
    fields,
    explicitFields: explicit,
    missingFields: criteria.experimentRequiredFields.length - explicit,
    threeDecisionLayersExplicit: criteria.experimentDecisionLayers.every(layer => Object.hasOwn(experiment, layer)),
    exitReady: explicit === criteria.experimentRequiredFields.length
  };
});
const missingByField = Object.fromEntries(criteria.experimentRequiredFields.map(field => [field, records.filter(record => record.fields[field].status !== "explicit").length]));
const totalRequiredCells = records.length * criteria.experimentRequiredFields.length;
const explicitCells = records.reduce((sum, record) => sum + record.explicitFields, 0);
const output = {
  schema: "frontier.experiment-exit-audit/1",
  date: new Date().toISOString().slice(0, 10),
  authority: "Strict explicit-field audit for EXIT-03. Semantically suggestive legacy text is not silently promoted into a conventional null, transfer function, covariance model, sensitivity calculation or go/no-go decision.",
  criteriaRef: criteriaPath,
  atlasRef: atlasPath,
  summary: {
    experiments: records.length,
    requiredFieldsPerExperiment: criteria.experimentRequiredFields.length,
    totalRequiredCells,
    explicitCells,
    missingCells: totalRequiredCells - explicitCells,
    exitReadyExperiments: records.filter(record => record.exitReady).length,
    experimentsMissingWork: records.filter(record => !record.exitReady).length,
    threeDecisionLayersExplicit: records.filter(record => record.threeDecisionLayersExplicit).length,
    missingByField,
    exit03Passed: records.every(record => record.exitReady)
  },
  records
};
const markdown = `# Experiment exit audit v1\n\n` +
  `**Generated:** ${output.date}  \n**Status:** ${output.summary.missingCells} explicit programme cells remain missing across ${output.summary.experiments} experiments  \n**Machine authority:** [experiment exit audit](experiment_exit_audit_v1.json)\n\n` +
  `The existing atlas establishes one controlled experiment per frontier area, complete topic/detector crosswalks, interventions, records, controls and stop rules. EXIT-03 is stricter. It refuses to infer a strongest conventional null, detector transfer function, covariance model, sensitivity calculation, replication rule or physics decision from nearby prose. Those items must be explicit because they determine what a result can actually mean.\n\n` +
  `| Required field | Experiments missing an explicit value |\n|---|---:|\n${Object.entries(missingByField).map(([field, count]) => `| ${field.replaceAll("_", " ")} | ${count} |`).join("\n")}\n\n` +
  `No experiment is EXIT-03-ready until all required fields and the build, bridge and physics decisions are explicit. The v1 atlas remains valid as a design atlas; this audit measures the work needed to turn it into a decision-complete experimental programme.\n\n` +
  `## Reproduction\n\n~~~powershell\nnode scripts/generate-experiment-exit-audit.mjs --write\nnode verification/frontier-physics-targets/verify_experiment_exit_audit.mjs\n~~~\n`;
if (!process.argv.includes("--write")) {
  console.log(JSON.stringify(output.summary, null, 2));
  process.exit(0);
}
fs.writeFileSync(path.join(root, outputPath), `${JSON.stringify(output, null, 2)}\n`);
fs.writeFileSync(path.join(root, markdownPath), markdown);
console.log(JSON.stringify({ result: "pass", outputs: [outputPath, markdownPath], summary: output.summary }, null, 2));
