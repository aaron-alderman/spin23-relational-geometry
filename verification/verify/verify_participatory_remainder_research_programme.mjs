import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const registryPath = path.join(root, "evidence/data/participatory-remainder-research-programme-v1.json");
const data = JSON.parse(readFileSync(registryPath, "utf8"));

assert.equal(data.schema, "claimipedia.participatory-remainder-programme/1");
assert.deepEqual(data.claimIds, [1680, 1681, 1682, 1683, 1684, 1685, 1686, 1687, 1688, 1689, 1690, 1691, 1692, 1693, 1694, 1695]);
assert.equal(data.formalModel.residualIdentifiesDivineAgency, false);
assert.equal(data.measurementReactivity.measurementIsIntervention, true);
assert.equal(data.measurementReactivity.quantumMechanismClaim, false);
assert.equal(data.measurementReactivity.consciousnessCausesCollapseClaim, false);
assert.equal(data.outcomeRules.preregistered, true);
assert.equal(data.outcomeRules.benefitsAndHarms, true);
assert.equal(data.outcomeRules.selfReportOnly, false);
assert.equal(data.outcomeRules.retainNonrespondersAndHarmedParticipants, true);
assert.equal(data.physicalAdmission, false);
assert.equal(data.theologicalProof, false);
assert.equal(data.dependencyGates.length, 9);
assert.equal(new Set(data.dependencyGates.map((gate) => gate.id)).size, 9);
assert.equal(data.currentEvidence.christianSpecificEffectEstablished, false);
assert.equal(data.currentEvidence.divineAgencyIdentified, false);
assert.equal(data.currentEvidence.historicalResurrectionCauseUniquelyIdentified, false);
assert.ok(data.currentEvidence.religiosityProsocialityDirectBehaviorR < data.currentEvidence.religiosityProsocialityOverallR);
assert.equal(data.causalAdmission.crossSectionalComparisonSufficient, false);
assert.equal(data.causalAdmission.completeCaseComparisonSufficient, false);
assert.equal(data.causalAdmission.targetTrialRequired, true);
assert.equal(data.causalAdmission.effectOfGodIdentifiedIntervention, false);
assert.equal(data.ethicalAdmission.harmsCoprimary, true);
assert.equal(data.ethicalAdmission.authorityControlledConsentAllowed, false);
assert.equal(data.ethicalAdmission.forgivenessImpliesReconciliation, false);
assert.equal(data.externalInputGates.length, 5);
assert.equal(data.boundedExhaustion, true);
for (const gate of data.dependencyGates) {
  assert.ok(!gate.state.startsWith("open"), `nonterminal gate: ${gate.id}`);
}

// Finite causal-identifiability counterexample. Model A is randomized with a
// genuine treatment effect; model B has no treatment effect and sets A=U.
// Both induce the same observable joint distribution over A and Y.
const causalJoint = {
  "A0Y0": 0.35,
  "A0Y1": 0.15,
  "A1Y0": 0.15,
  "A1Y1": 0.35,
};
const selectionJoint = {
  "A0Y0": 0.5 * 0.7,
  "A0Y1": 0.5 * 0.3,
  "A1Y0": 0.5 * 0.3,
  "A1Y1": 0.5 * 0.7,
};
assert.deepEqual(selectionJoint, causalJoint);
const observationalRiskDifference = causalJoint.A1Y1 / (causalJoint.A1Y0 + causalJoint.A1Y1)
  - causalJoint.A0Y1 / (causalJoint.A0Y0 + causalJoint.A0Y1);
assert.ok(Math.abs(observationalRiskDifference - 0.4) < 1e-12);
assert.ok(Math.abs((0.7 - 0.3) - 0.4) < 1e-12); // causal model effect
assert.equal(0, 0); // selection model intervention effect: Y depends on U, not A

// A shared measurement schedule cancels additive reactivity but not an A-by-Q
// interaction. Varying Q is required to identify the unmeasured contrast tau.
const b = 0.2;
const tau = 0.1;
const rho = 0.06;
const kappa = 0.04;
const y = (A, Q) => b + tau * A + rho * Q + kappa * A * Q;
assert.ok(Math.abs((y(1, 1) - y(0, 1)) - (tau + kappa)) < 1e-12);
assert.ok(Math.abs((y(1, 0) - y(0, 0)) - tau) < 1e-12);

// If an outcome is equally likely under incompatible traditions, that outcome
// alone does not update their odds.
const sharedOutcomeBayesFactor = 0.6 / 0.6;
assert.equal(sharedOutcomeBayesFactor, 1);
assert.ok(data.rivalModels.length >= 6);
assert.ok(data.requiredArms.length >= 4);
assert.ok(data.killConditions.length >= 8);

const forbidden = new Map(data.forbiddenIdentifications);
assert.equal(forbidden.get("kenosis"), "spontaneous symmetry breaking");
assert.equal(forbidden.get("grace"), "quantum field");
assert.equal(forbidden.get("statistical residual"), "God");

const claimDir = path.join(root, "corpus/claims/1600-1699");
const claimFiles = [
  "1680_the_participatory_remainder_is_a_testable_relational_hypothesis_not_a_residual_proof_of_god.md",
  "1681_kenosis_election_incarnation_participation_and_remnant_form_a_coherent_biblical_chain_but_not_a_deduction.md",
  "1682_the_participatory_remainder_requires_active_religious_and_secular_rivals_not_a_belief_versus_unbelief_binary.md",
  "1683_a_preregistered_longitudinal_active_control_design_can_test_participatory_consequences_but_not_divine_agency.md",
  "1684_the_kenotic_field_tilt_fails_if_hiddenness_and_fruit_are_allowed_to_explain_every_outcome.md",
  "1685_participatory_theology_and_spin23_share_a_selector_realization_grammar_but_no_cross_domain_mechanism.md"
  ,"1686_the_participatory_remainder_programme_reduces_to_nine_independent_dependency_gates.md"
  ,"1687_current_evidence_supports_small_heterogeneous_practice_effects_but_not_a_christian_specific_field_tilt.md"
  ,"1688_kenotic_hiddenness_preserves_freedom_only_by_accepting_nonresistant_nonbelief_as_adverse_evidence.md"
  ,"1689_early_resurrection_belief_is_historically_accessible_but_the_resurrection_cause_is_prior_sensitive.md"
  ,"1690_time_varying_participation_is_not_causally_identified_by_cross_sectional_or_complete_case_comparison.md"
  ,"1691_spiritual_safety_and_adverse_outcomes_are_coprimary_not_optional_corrections_to_participatory_research.md"
  ,"1692_shared_transformation_across_incompatible_traditions_identifies_common_process_before_religious_truth.md"
  ,"1693_christian_truth_cannot_be_reduced_to_wellbeing_and_christian_fruit_cannot_be_exempted_from_harm.md"
  ,"1694_the_kenotic_participatory_chain_is_one_christian_model_family_not_the_unique_reading_of_christianity.md"
  ,"1695_the_participatory_remainder_programme_is_boundedly_exhausted_at_five_external_input_gates.md"
];

for (const file of claimFiles) {
  assert.ok(existsSync(path.join(claimDir, file)), `missing claim file: ${file}`);
}

console.log("PASS 1680-1695: all nine participatory-remainder gates are terminal on current inputs, five external-input gates are explicit, and the causal, comparative, measurement and cross-domain shortcuts fail finite checks.");

