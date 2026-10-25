import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const auditPath = "corpus/programmes/frontier-physics-targets/transition_operator_propagation_audit_v1.json";
const audit = JSON.parse(fs.readFileSync(path.join(root, auditPath), "utf8"));

assert.equal(audit.schema, "frontier.transition-operator-propagation-audit/1");
assert.equal(audit.ledgerFields.length, 8);
assert.ok(audit.totals.markdownDocumentsScanned > 1000, "full corpus Markdown scan is unexpectedly small");
assert.equal(audit.census.length, audit.totals.markdownDocumentsScanned);
assert.equal(new Set(audit.census.map(record => record.path)).size, audit.census.length);
assert.equal(audit.reviewed.length, audit.totals.reviewedAuthoritativeDocuments);

const requiredReviewed = new Map([
  ["corpus/EXPLANATORY_STANDARD.md", "governing_rule"],
  ["corpus/programmes/admissibility/admissibility_127_transition_operators_selection_rules_and_lifetime_frontier.md", "complete_reference_bridge"],
  ["corpus/programmes/admissibility/admissibility_120_a_unitary_acoustic_rail_replaces_the_hand_shaped_capture_bath.md", "eight_field_ledger_surrogate"],
  ["corpus/programmes/admissibility/admissibility_121_the_capture_matrix_element_is_a_scattering_density_not_a_two_level_number.md", "eight_field_ledger_matrix_element"],
  ["corpus/programmes/admissibility/admissibility_122_a_normalized_packet_turns_the_overlap_density_into_a_capture_probability.md", "eight_field_ledger_probability"],
  ["corpus/programmes/frontier-physics-targets/detector_frontier_atlas_v1.md", "detector_bundle"],
  ["corpus/programmes/frontier-physics-targets/frontier_experiment_atlas_v1.md", "experiment_programme"]
]);

for (const [documentPath, disposition] of requiredReviewed) {
  const record = audit.reviewed.find(item => item.path === documentPath);
  assert.ok(record, `missing reviewed propagation record: ${documentPath}`);
  assert.equal(record.disposition, disposition);
  assert.equal(fs.existsSync(path.join(root, documentPath)), true);
}

for (const documentPath of [
  "corpus/EXPLANATORY_STANDARD.md",
  "corpus/programmes/admissibility/admissibility_120_a_unitary_acoustic_rail_replaces_the_hand_shaped_capture_bath.md",
  "corpus/programmes/admissibility/admissibility_121_the_capture_matrix_element_is_a_scattering_density_not_a_two_level_number.md",
  "corpus/programmes/admissibility/admissibility_122_a_normalized_packet_turns_the_overlap_density_into_a_capture_probability.md",
  "corpus/programmes/frontier-physics-targets/detector_frontier_atlas_v1.md",
  "corpus/programmes/frontier-physics-targets/frontier_experiment_atlas_v1.md"
]) {
  const text = fs.readFileSync(path.join(root, documentPath), "utf8");
  assert.ok(text.includes("AZ-127") || text.includes("admissibility_127_transition_operators_selection_rules_and_lifetime_frontier.md"), `missing AZ-127 propagation link: ${documentPath}`);
}

const detectorRegister = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/frontier-physics-targets/detector_frontier_register_v1.json"), "utf8"));
assert.ok(detectorRegister.detectors.some(detector => detector.id === "DET-037"));

const experimentAtlas = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/frontier-physics-targets/frontier_experiment_atlas_v1.json"), "utf8"));
assert.ok(experimentAtlas.experiments.some(experiment => experiment.id === "EX-022" && experiment.topicIds.includes("OT-036")));

const programmes = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/frontier-physics-targets/frontier_experiment_programmes_v2.json"), "utf8"));
const ex022 = programmes.programmes.find(programme => programme.id === "EX-022");
assert.ok(ex022, "generated v2 programme missing EX-022");
for (const field of [
  "detector_transfer_function",
  "nuisance_and_covariance_model",
  "predicted_signal_scale",
  "power_or_sensitivity_calculation",
  "build_go_no_go",
  "physics_go_no_go",
  "replication_rule",
  "data_metadata_and_code_release_contract",
  "claim_status_propagation"
]) assert.ok(ex022[field], `EX-022 missing ${field}`);

assert.equal(audit.openWork.unreviewedOperatorCandidates.length, audit.totals.unreviewedOperatorCandidates);
assert.ok(audit.totals.unreviewedOperatorCandidates > 0, "audit must not falsely claim semantic exhaustion in this tranche");

console.log(JSON.stringify({
  result: "pass",
  audit: auditPath,
  scanned: audit.totals.markdownDocumentsScanned,
  reviewed: audit.totals.reviewedAuthoritativeDocuments,
  remainingSemanticTriage: audit.totals.unreviewedOperatorCandidates
}, null, 2));
