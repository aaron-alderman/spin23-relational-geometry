import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const lane = "corpus/programmes/frontier-physics-targets";
const sourcePath = `${lane}/frontier_experiment_atlas_v1.json`;
const outputPath = `${lane}/frontier_experiment_programmes_v2.json`;
const overridePath = `${lane}/frontier_experiment_programme_overrides_v2.json`;
const read = rel => JSON.parse(fs.readFileSync(path.join(root, rel), "utf8"));
const source = read(sourcePath);
const overrides = fs.existsSync(path.join(root, overridePath)) ? read(overridePath) : { overrides: [] };
const overrideMap = new Map(overrides.overrides.map(record => [record.id, record]));
const existing = fs.existsSync(path.join(root, outputPath)) ? read(outputPath) : null;
const prior = new Map((existing?.programmes ?? []).map(programme => [programme.id, programme]));

const programmes = source.experiments.map(experiment => {
  const previous = prior.get(experiment.id) ?? {};
  const authored = overrideMap.get(experiment.id) ?? {};
  return {
    id: experiment.id,
    sourceExperimentId: experiment.id,
    frontierAreaId: experiment.frontierAreaId,
    topicIds: experiment.topicIds,
    detectorIds: experiment.detectorIds,
    title: experiment.title,
    mode: experiment.mode,
    readiness: experiment.readiness,
    estimate: experiment.estimate,
    hypothesis: experiment.hypothesis,
    strongest_conventional_null: experiment.nullValue,
    carrier_and_preparation: experiment.platform,
    controlled_variables: experiment.intervention,
    observables: experiment.record,
    detector_transfer_function: authored.detector_transfer_function ?? previous.detector_transfer_function ?? null,
    calibration_and_reference_channels: experiment.controls,
    nuisance_and_covariance_model: authored.nuisance_and_covariance_model ?? previous.nuisance_and_covariance_model ?? null,
    predicted_signal_scale: authored.predicted_signal_scale ?? previous.predicted_signal_scale ?? null,
    power_or_sensitivity_calculation: authored.power_or_sensitivity_calculation ?? previous.power_or_sensitivity_calculation ?? null,
    blind_or_preregistered_analysis_rule: {
      analysis: experiment.analysis,
      stoppingRule: experiment.stopRule
    },
    build_go_no_go: authored.build_go_no_go ?? previous.build_go_no_go ?? null,
    bridge_go_no_go: {
      go: experiment.success,
      noGo: experiment.stopRule,
      conventionalNull: experiment.nullValue
    },
    physics_go_no_go: authored.physics_go_no_go ?? previous.physics_go_no_go ?? null,
    positive_null_ambiguous_outcome_branches: {
      positive: experiment.success,
      null: experiment.nullValue,
      ambiguous: "Hold every scientific promotion, repeat the calibration and declared controls, and report the unresolved likelihood or equivalence class rather than selecting a preferred mechanism."
    },
    replication_rule: authored.replication_rule ?? previous.replication_rule ?? null,
    data_metadata_and_code_release_contract: authored.data_metadata_and_code_release_contract ?? previous.data_metadata_and_code_release_contract ?? null,
    claim_status_propagation: authored.claim_status_propagation ?? previous.claim_status_propagation ?? null,
    programmeEvidenceRefs: authored.programmeEvidenceRefs ?? previous.programmeEvidenceRefs ?? [],
    precedents: experiment.precedents ?? [],
    authoredOverridesPreserved: Object.keys(authored).filter(key => !["id", "programmeEvidenceRefs"].includes(key))
  };
});

const output = {
  schema: "frontier.experiment-programmes/2",
  date: new Date().toISOString().slice(0, 10),
  authority: "EXIT-03 programme surface. Direct v1 fields are migrated without changing their scientific meaning; null v2 fields require new experiment-specific judgment and cannot be filled by generic prose.",
  sourceRef: sourcePath,
  overrideRef: overridePath,
  migration: {
    direct: {
      hypothesis: "hypothesis",
      strongest_conventional_null: "nullValue",
      carrier_and_preparation: "platform",
      controlled_variables: "intervention",
      observables: "record",
      calibration_and_reference_channels: "controls"
    },
    structured: {
      blind_or_preregistered_analysis_rule: ["analysis", "stopRule"],
      bridge_go_no_go: ["success", "stopRule", "nullValue"],
      positive_null_ambiguous_outcome_branches: ["success", "nullValue", "explicit hold branch"]
    },
    requiresNewJudgment: [
      "detector_transfer_function",
      "nuisance_and_covariance_model",
      "predicted_signal_scale",
      "power_or_sensitivity_calculation",
      "build_go_no_go",
      "physics_go_no_go",
      "replication_rule",
      "data_metadata_and_code_release_contract",
      "claim_status_propagation"
    ]
  },
  programmes
};
if (!process.argv.includes("--write")) {
  console.log(JSON.stringify({ programmes: programmes.length, fieldsRequiringNewJudgment: output.migration.requiresNewJudgment.length }, null, 2));
  process.exit(0);
}
fs.writeFileSync(path.join(root, outputPath), `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ result: "pass", output: outputPath, programmes: programmes.length, fieldsRequiringNewJudgment: output.migration.requiresNewJudgment.length }, null, 2));
