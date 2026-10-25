import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const lane = "corpus/programmes/frontier-physics-targets";
const read = rel => JSON.parse(fs.readFileSync(path.join(root, rel), "utf8"));
const source = read(`${lane}/frontier_experiment_atlas_v1.json`);
const programmes = read(`${lane}/frontier_experiment_programmes_v2.json`);
const overrides = read(`${lane}/frontier_experiment_programme_overrides_v2.json`);
const failures = [];
const same = (left, right) => JSON.stringify(left) === JSON.stringify(right);

if (programmes.schema !== "frontier.experiment-programmes/2") failures.push("programme schema mismatch");
if (overrides.schema !== "frontier.experiment-programme-overrides/2") failures.push("override schema mismatch");
if (programmes.sourceRef !== `${lane}/frontier_experiment_atlas_v1.json`) failures.push("source reference mismatch");
if (programmes.overrideRef !== `${lane}/frontier_experiment_programme_overrides_v2.json`) failures.push("override reference mismatch");
if (programmes.programmes.length !== source.experiments.length) failures.push("source coverage drift");

const sourceMap = new Map(source.experiments.map(record => [record.id, record]));
const programmeMap = new Map(programmes.programmes.map(record => [record.id, record]));
const overrideMap = new Map(overrides.overrides.map(record => [record.id, record]));
if (sourceMap.size !== source.experiments.length) failures.push("duplicate source experiment id");
if (programmeMap.size !== programmes.programmes.length) failures.push("duplicate programme id");
if (overrideMap.size !== overrides.overrides.length) failures.push("duplicate override id");

const direct = {
  hypothesis: "hypothesis",
  strongest_conventional_null: "nullValue",
  carrier_and_preparation: "platform",
  controlled_variables: "intervention",
  observables: "record",
  calibration_and_reference_channels: "controls"
};
const authoredFields = programmes.migration?.requiresNewJudgment ?? [];

for (const experiment of source.experiments) {
  const programme = programmeMap.get(experiment.id);
  if (!programme) {
    failures.push(`${experiment.id}: missing programme`);
    continue;
  }
  if (programme.sourceExperimentId !== experiment.id) failures.push(`${experiment.id}: source id drift`);
  for (const [target, origin] of Object.entries(direct)) {
    if (!same(programme[target], experiment[origin])) failures.push(`${experiment.id}: direct migration drift in ${target}`);
  }
  if (!same(programme.blind_or_preregistered_analysis_rule, { analysis: experiment.analysis, stoppingRule: experiment.stopRule })) failures.push(`${experiment.id}: analysis migration drift`);
  if (!same(programme.bridge_go_no_go, { go: experiment.success, noGo: experiment.stopRule, conventionalNull: experiment.nullValue })) failures.push(`${experiment.id}: bridge gate migration drift`);
  const outcome = programme.positive_null_ambiguous_outcome_branches;
  if (outcome?.positive !== experiment.success || outcome?.null !== experiment.nullValue || typeof outcome?.ambiguous !== "string" || !outcome.ambiguous.trim()) failures.push(`${experiment.id}: outcome migration drift`);

  const authored = overrideMap.get(experiment.id);
  if (authored) {
    const expectedPreserved = Object.keys(authored).filter(key => !["id", "programmeEvidenceRefs"].includes(key));
    if (!same(programme.authoredOverridesPreserved, expectedPreserved)) failures.push(`${experiment.id}: override field ledger drift`);
    for (const field of expectedPreserved) {
      if (!authoredFields.includes(field)) failures.push(`${experiment.id}: override targets undeclared field ${field}`);
      if (!same(programme[field], authored[field])) failures.push(`${experiment.id}: authored override drift in ${field}`);
    }
    if (!same(programme.programmeEvidenceRefs, authored.programmeEvidenceRefs)) failures.push(`${experiment.id}: evidence reference drift`);
    if (!Array.isArray(authored.programmeEvidenceRefs) || authored.programmeEvidenceRefs.length === 0) failures.push(`${experiment.id}: authored override has no evidence references`);
    for (const ref of authored.programmeEvidenceRefs ?? []) {
      if (!fs.existsSync(path.join(root, ref))) failures.push(`${experiment.id}: missing evidence reference ${ref}`);
    }
  }
}

for (const id of overrideMap.keys()) if (!sourceMap.has(id)) failures.push(`${id}: override has no source experiment`);

if (failures.length) {
  console.error(JSON.stringify({ result: "fail", failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  result: "pass",
  sourceExperiments: source.experiments.length,
  generatedProgrammes: programmes.programmes.length,
  authoredProgrammes: overrides.overrides.length,
  authoredFieldsPerCompleteProgramme: authoredFields.length,
  evidenceReferencesVerified: overrides.overrides.reduce((sum, record) => sum + record.programmeEvidenceRefs.length, 0)
}, null, 2));
