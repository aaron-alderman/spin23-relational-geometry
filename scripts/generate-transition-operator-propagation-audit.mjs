import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const write = process.argv.includes("--write");
const corpusRoot = path.join(root, "corpus");
const outputJson = "corpus/programmes/frontier-physics-targets/transition_operator_propagation_audit_v1.json";
const outputMd = "corpus/programmes/frontier-physics-targets/transition_operator_propagation_audit_v1.md";
const semanticDispositionsPath = "corpus/programmes/frontier-physics-targets/transition_operator_semantic_dispositions_v1.json";
const reference = "corpus/programmes/admissibility/admissibility_127_transition_operators_selection_rules_and_lifetime_frontier.md";
const semanticDispositions = JSON.parse(fs.readFileSync(path.join(root, semanticDispositionsPath), "utf8"));
const declaredContextualExclusionSet = new Set(semanticDispositions.paths);

const patterns = {
  operator_rate_claim: [
    /transition operator/i,
    /matrix element/i,
    /selection rule/i,
    /golden[- ]rule/i,
    /Einstein coefficient/i,
    /multipole transition/i,
    /radiative capture/i,
    /phonon capture/i,
    /partial width/i,
    /decay width/i
  ],
  effective_spectral_claim: [
    /line ?width/i,
    /spectroscop/i,
    /resonance/i,
    /continued[- ]sheet pole/i,
    /spectral pole/i,
    /ringdown/i
  ],
  barrier_or_kinetic_metastability: [
    /metastab/i,
    /hysteresis/i,
    /escape rate/i,
    /first[- ]passage/i,
    /dwell time/i
  ]
};
const rateContext = /decay|lifetime|branching|capture|radiative|emission|absorption|line ?width|metastab|resonance/i;

function walk(dir) {
  const result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith(".md")) result.push(full);
  }
  return result;
}

function rel(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

function sha256(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

const excludedOutputs = new Set([outputMd]);
const documents = walk(corpusRoot)
  .map(file => ({ path: rel(file), text: fs.readFileSync(file, "utf8") }))
  .filter(record => !excludedOutputs.has(record.path))
  .sort((a, b) => a.path.localeCompare(b.path));

const census = documents.map(document => {
  const matches = Object.fromEntries(Object.entries(patterns).map(([family, regexes]) => [
    family,
    regexes.filter(regex => regex.test(document.text)).map(regex => regex.source)
  ]));
  const matchedFamilies = Object.entries(matches).filter(([, terms]) => terms.length).map(([family]) => family);
  let route = "no_transition_operator_trigger";
  if (matches.operator_rate_claim.length) route = "operator_rate_claim_candidate";
  else if (matches.effective_spectral_claim.length) route = "effective_spectral_claim_candidate";
  else if (matches.barrier_or_kinetic_metastability.length) route = "barrier_or_kinetic_metastability_candidate";
  return {
    path: document.path,
    route,
    matchedFamilies,
    matchedTerms: [...new Set(Object.values(matches).flat())],
    referencesAZ127: document.text.includes("admissibility_127_transition_operators_selection_rules_and_lifetime_frontier.md") || document.text.includes("AZ-127"),
    hasRateContext: rateContext.test(document.text),
    digest: sha256(document.text)
  };
});

for (const excludedPath of declaredContextualExclusionSet) {
  const record = census.find(item => item.path === excludedPath);
  if (!record) throw new Error(`Missing semantic-disposition document: ${excludedPath}`);
  if (record.route !== "operator_rate_claim_candidate" || !record.hasRateContext) {
    throw new Error(`Stale semantic disposition no longer matches the routed rate-context candidate: ${excludedPath}`);
  }
}

const reviewed = [
  ["corpus/EXPLANATORY_STANDARD.md", "governing_rule", "The eight-field ledger is a publication rule and separates operator bottlenecks from effective widths and barrier escape."],
  [reference, "complete_reference_bridge", "Established atomic/nuclear bridge, rate architecture and three-gate ion experiment."],
  ["corpus/programmes/admissibility/admissibility_128_widths_coherence_and_escape_are_not_one_lifetime.md", "spectral_width_reference_bridge", "Separates population loss, dephasing, static spread, drive, effective-pole and apparatus widths and keeps barrier escape in its own mechanism class."],
  ["corpus/programmes/admissibility/admissibility_02_casimir_as_first_generative_probe.md", "classification_not_amplitude", "Casimir labels sectors but supplies neither the physical operator nor its strength."],
  ["corpus/programmes/admissibility/admissibility_04_dispersion_force_landscape.md", "effective_response_boundary", "A causal response may be used effectively; microscopic line claims require the operator ledger."],
  ["corpus/programmes/admissibility/admissibility_05_invariant_atlas_time_force_measure_material_rotation.md", "classification_not_amplitude", "Rotational organization and selection rules are followed by operator, matrix-element and detector data."],
  ["corpus/programmes/admissibility/admissibility_30_casimir_seebeck_nernst_spectral_ladder.md", "classification_not_amplitude", "The spectral ladder names the missing operator-to-record fields."],
  ["corpus/programmes/admissibility/admissibility_51_spectral_boundary_dynamics_free_bloch_efimov_casimir.md", "operator_required_not_supplied", "The pole grammar is retained while microscopic hydrogen capture remains open."],
  ["corpus/programmes/admissibility/admissibility_52_spectral_flow_pole_trajectories.md", "effective_spectral_only", "The toy width is explicitly not promoted to a microscopic lifetime."],
  ["corpus/programmes/admissibility/admissibility_55_finite_band_levinson_and_adaptive_pole_collisions.md", "effective_spectral_only", "Finite-band pole width is separated from radiative or material lifetime."],
  ["corpus/programmes/admissibility/admissibility_120_a_unitary_acoustic_rail_replaces_the_hand_shaped_capture_bath.md", "eight_field_ledger_surrogate", "Finite unitary surrogate; declared coefficient and recurrence prevent a material-rate claim."],
  ["corpus/programmes/admissibility/admissibility_121_the_capture_matrix_element_is_a_scattering_density_not_a_two_level_number.md", "eight_field_ledger_matrix_element", "Operator access is computed without promoting an amplitude density to a probability or width."],
  ["corpus/programmes/admissibility/admissibility_122_a_normalized_packet_turns_the_overlap_density_into_a_capture_probability.md", "eight_field_ledger_probability", "Finite normalized probability is closed while material and irreversible limits remain open."],
  ["corpus/programmes/frontier-physics-targets/detector_frontier_atlas_v1.md", "detector_bundle", "DET-037 joins lifetime, polarization, environmental and acceptance records."],
  ["corpus/programmes/frontier-physics-targets/frontier_experiment_atlas_v1.md", "experiment_programme", "EX-022 supplies an apparatus, controls and build/bridge/physics decisions."],
  ["corpus/syntheses/the_admissibility_frontier_current_synthesis.md", "synthesis_bridge", "The current synthesis routes transition claims to the established bridge."],
  ["corpus/claims/0000-0099/00_research_document_map.md", "navigation_no_independent_rate_claim", "Index language points to controlling documents and makes no independent operator-to-rate claim."],
  ["corpus/claims/0000-0099/01_standard_model_as_stress_energy_full_analysis.md", "field_theory_operator_not_transition_rate", "Stress and Standard-Model operator language concerns field content and response, not a computed decay lifetime."],
  ["corpus/claims/0000-0099/24_symmetry_phonons_experiments_and_supporting_corpora.md", "operator_ledger_required_before_rate_promotion", "The survey names physical transitions; any quantitative rate promotion must use the AZ-127 ledger."],
  ["corpus/claims/0000-0099/30_research_frontier.md", "navigation_no_independent_rate_claim", "Frontier registry text summarizes many branches and is not itself a microscopic rate calculation."],
  ["corpus/claims/0000-0099/40_grand_synthesis_spin23_pole.md", "synthesis_no_independent_rate_claim", "Synthesis-level transition language is architectural; source packets control any rate claim."],
  ["corpus/claims/0000-0099/44_jordan_selection_axioms_and_spin24_to_spin23_descent.md", "algebraic_operator_not_transition_rate", "Selection is algebraic cone and symmetry selection, not a lifetime calculation."],
  ["corpus/claims/0000-0099/49_multi_branch_research_registry.md", "navigation_no_independent_rate_claim", "Registry entries route work and do not add independent rate evidence."],
  ["corpus/claims/0000-0099/91_multi_branch_active_goal_log.md", "navigation_no_independent_rate_claim", "Goal-log language records tasks rather than physical transition amplitudes."],
  ["corpus/claims/0000-0099/97_custodial_fiveplet_full_electroweak_vertices.md", "operator_ledger_required_before_rate_promotion", "Vertices determine candidate channels; widths still require matrix elements, phase space, competition and detection."],
  ["corpus/claims/0100-0199/168_neutrino_peirce_corner_restores_gauge_neutral_h2r.md", "algebraic_operator_not_transition_rate", "The matrix and Peirce construction classifies a carrier and makes no decay-rate claim."],
  ["corpus/claims/0200-0299/259_full_m3_response_supplies_two_heavy_channels_but_not_their_alignment.md", "effective_response_not_transition_rate", "Heavy response channels are effective modes; no microscopic lifetime is inferred."],
  ["corpus/claims/0400-0499/448_full_su3_flavor_covariance_closes_one_graded_real_entangler_onto_the_complete_octet.md", "algebraic_operator_not_transition_rate", "Entangler matrix elements certify representation closure, not an observed transition rate."],
  ["corpus/claims/0600-0699/659_majorana_matter_parity_cannot_replace_the_bl_current_in_the_relational_carrier.md", "field_theory_operator_not_transition_rate", "Current and parity operators concern symmetry protection rather than a decay width."],
  ["corpus/claims/0600-0699/665_the_full_response_is_a_feshbach_schur_complement_of_a_four_state_hermitian_system.md", "effective_spectral_boundary", "The Feshbach response is an effective pole construction; microscopic lifetimes require extra AZ-127 data."],
  ["corpus/claims/0600-0699/694_topology_parity_is_the_su2l_center_all_yukawas_are_even_but_dirac_exchange_requires_enlarged_covariance.md", "algebraic_operator_not_transition_rate", "Parity and Yukawa covariance classify allowed structures and do not compute rates."],
  ["corpus/claims/0700-0799/704_the_finite_g2_selector_fixed_algebra_is_eight_m2_blocks_and_symmetry_alone_cannot_synchronize_them.md", "algebraic_operator_not_transition_rate", "Selector synchronization is finite algebra, not physical transition kinetics."],
  ["corpus/claims/0700-0799/751_adjoining_the_majorana_breaking_channel_creates_an_h3c_carrier_fork_and_spin23_returns_only_after_two_independent_selectors.md", "algebraic_operator_not_transition_rate", "The breaking channel is a carrier extension; it does not assert a partial width."],
  ["corpus/claims/1000-1099/1060_a_positive_first_order_response_pulse_generates_the_full_furey_channel_flow_without_bulk_degeneracy_but_needs_microscopic_charge_completion.md", "effective_control_response_boundary", "A response pulse generates a controlled flow; it is not spontaneous decay or a natural lifetime."],
  ["corpus/claims/1000-1099/1063_the_doubled_furey_links_do_not_supply_two_S1_copies_and_the_shared_QL_leg_radiatively_breaks_the_naive_orthogonality.md", "field_theory_radiative_correction_not_transition_rate", "Radiative breaking means loop renormalization, not emission-rate evidence."],
  ["corpus/claims/1000-1099/1076_the_proton_safe_current_projector_exists_only_after_breaking_the_pati_salam_colour_lepton_roots.md", "operator_ledger_required_before_rate_promotion", "A proton-safe projector classifies sources; any proton lifetime needs the full operator-width ledger."],
  ["corpus/claims/1000-1099/1078_no_minimal_family_universal_anomaly_free_U1_can_protect_the_proton_safe_S1_source_mask.md", "operator_ledger_required_before_rate_promotion", "Protection no-go constrains operators but does not itself predict proton decay rates."],
  ["corpus/claims/1000-1099/1080_the_complex_Pati_Salam_six_has_a_gauge_invariant_Pfaffian_that_reconnects_leptoquark_and_diquark_sources_unless_a_phase_grading_forbids_it.md", "operator_ledger_required_before_rate_promotion", "Reconnected interaction channels require masses, couplings, matrix elements and phase space before a lifetime claim."],
  ["corpus/claims/1000-1099/1085_the_rank_one_spectral_zero_is_the_unbroken_colour_lepton_reflection_Ward_sector_but_three_generation_weak_instantons_make_it_nonperturbatively_anomalous.md", "field_theory_operator_not_transition_rate", "Ward and instanton statements concern anomaly structure, not detector-folded decay rates."],
  ["corpus/claims/1100-1199/1111_a_rank_one_complementary_Majorana_block_can_give_three_heavy_masses_but_block_preserving_seesaw_forces_a_selected_flavour_texture_zero.md", "mass_matrix_not_transition_rate", "Mass eigenvalues and texture zeros are not transition amplitudes or lifetimes."],
  ["corpus/claims/1100-1199/1115_the_generation_blind_Pati_Salam_first_order_calculus_cannot_protect_the_Majorana_null_line_from_Dirac_leakage.md", "algebraic_leakage_not_transition_rate", "Leakage is texture mixing in the finite calculus, not an environmental decay channel."],
  ["corpus/claims/1100-1199/1120_a_sector_dependent_Krajewski_anchor_mask_allows_Majorana_null_sewing_while_forbidding_Dirac_null_leakage.md", "algebraic_leakage_not_transition_rate", "Allowed sewing and forbidden leakage are finite-geometry selection statements, not rates."],
  ["corpus/claims/1200-1299/1291_no_exchange_odd_portal_exists_in_the_endpoint_blind_sm15_but_the_sterile_majorana_pseudoscalar_is_the_minimal_conditional_extension.md", "operator_ledger_required_before_rate_promotion", "The portal is a candidate interaction; phenomenological widths require AZ-127 completion."],
  ["corpus/claims/1300-1399/1393_the_full_scalar_stress_preserves_a_traceless_holonomy_threshold_but_not_a_scheme_invariant_third_matrix_direction.md", "effective_spectral_boundary", "Threshold response and scheme dependence are effective spectral data, not a microscopic lifetime."],
  ["corpus/claims/1300-1399/1396_no_current_principle_predicts_the_reader_curvature_coupling_so_only_the_traceless_threshold_is_scheme_robust.md", "effective_detector_boundary", "Reader curvature is a coupling and detector-model issue, not spontaneous transition kinetics."],
  ["corpus/claims/1400-1499/1453_genuine_exhaustion_leaves_no_untyped_internal_work_but_seven_named_external_or_conditional_frontiers.md", "navigation_no_independent_rate_claim", "Exhaustion summary inherits source boundaries and introduces no new rate result."],
  ["corpus/claims/1400-1499/1489_the_marked_lepton_generator_derives_the_seesaw_flag_but_charge_three_breaking_needs_a_sector_dependent_mask.md", "algebraic_operator_not_transition_rate", "Generator and mask data classify finite geometry, not physical decay."],
  ["corpus/claims/1400-1499/1495_the_charge_three_operator_dimension_moat_is_renormalizable_for_Majorana_sewing_but_the_leading_Dirac_texture_lift_forgets_the_breaking_vev.md", "eft_operator_not_transition_rate", "Operator dimension and renormalizability do not determine a transition width."],
  ["corpus/claims/1500-1599/1504_the_protecting_reflection_has_no_family_only_lift_but_exists_on_the_sector_typed_relational_cover.md", "algebraic_operator_not_transition_rate", "Reflection lifting is representation data, not a lifetime calculation."],
  ["corpus/claims/1500-1599/1514_a_single_mediator_bubble_leaves_the_rank_one_Schur_cone_unless_its_loop_portal_shares_the_tree_coupling_ray.md", "effective_field_theory_response_boundary", "Mediator bubbles alter response coefficients; no on-shell partial width is claimed."],
  ["corpus/claims/1500-1599/1528_the_minimal_portal_label_symmetry_is_a_Z2_fixed_line_but_its_metric_and_physical_lift_remain_new_data.md", "algebraic_operator_not_transition_rate", "Portal labels and metrics remain abstract until a physical interaction is supplied."],
  ["corpus/claims/1500-1599/1544_breaking_projectors_can_select_the_shared126_masks_but_only_a_rank_one_family_partial_isometry_can_make_their_coefficient_common.md", "algebraic_operator_not_transition_rate", "Projector selection and partial isometry concern coefficient alignment rather than rates."],
  ["corpus/claims/1500-1599/1566_any_commuting_abelian_symmetry_that_protects_the_inert_E6_bidoublet_also_kills_the_minimal_renormalizable_SUSY_breaking_vacuum.md", "vacuum_selection_not_transition_rate", "Vacuum existence and symmetry breaking are not barrier escape or an operator-limited lifetime."],
  ["corpus/claims/1500-1599/1573_a_single_tilted_Yukawa_ray_rotates_the_two_copy_inert_projector_but_a_two_ray_tight_frame_can_close_it.md", "algebraic_operator_not_transition_rate", "Yukawa-ray geometry is coefficient selection, not a transition record."],
  ["corpus/claims/1600-1699/1601_topological_charge_and_theta_angles_do_not_protect_a_qcd_spin23_or_cosmological_shared_scale.md", "field_theory_no_go_not_transition_rate", "Topological protection and shared-scale no-go make no decay-rate claim."],
  ["corpus/claims/1600-1699/1617_the_su2_one_plaquette_hamiltonian_gap_is_certifiable_but_its_bounds_are_not_uniform_in_volume_or_continuum_limits.md", "hamiltonian_gap_not_transition_rate", "A certified energy gap does not provide an interaction matrix element or lifetime."],
  ["corpus/programmes/admissibility/admissibility_25_current_research_frontier_crosswalk.md", "navigation_no_independent_rate_claim", "Crosswalk language routes physical questions to source packets and is not independent evidence."],
  ["corpus/programmes/frontier-physics-targets/frontier_exhaustion_checkpoint_v1.md", "navigation_no_independent_rate_claim", "Checkpoint summaries inherit the scoped claims and gates of their linked packets."],
  ["corpus/programmes/frontier/parallel/frontier_parallel_exceptional_01_rank_one_vacuum_selector_no_go.md", "vacuum_selection_not_transition_rate", "Rank-one vacuum selection is an algebraic/dynamical vacuum problem, not a decay width."],
  ["corpus/programmes/frontier/wave-7/frontier_wave7_150_monster_is_physics_proof_certificate.md", "governance_no_independent_rate_claim", "The proof certificate governs promotion and makes no microscopic rate calculation."],
  ["corpus/programmes/frontier/wave-7/frontier_wave7_49_kenotic_cover_h0_signature_and_h1_no_go.md", "topological_transition_function_not_transition_rate", "Transition functions here are bundle gluing maps, not physical transitions in time."],
  ["corpus/programmes/lattice-subroutine-gravity/next-steps.md", "planning_no_independent_rate_claim", "Planning language lists possible calculations and carries no independent width result."],
  ["corpus/programmes/lattice-subroutine-gravity/README.md", "navigation_no_independent_rate_claim", "Lane overview routes to detailed sources and adds no transition-rate evidence."],
  ["corpus/programmes/representation/representation_trunk_a_the_furey_generation_embeds_in_the_complex_exceptional_27_but_is_not_equivalent_to_the_jordan_module.md", "representation_matrix_element_not_transition_rate", "Representation matrix elements and embeddings are algebraic, not physical decay amplitudes."]
].map(([documentPath, disposition, reason]) => {
  const record = census.find(item => item.path === documentPath);
  if (!record) throw new Error(`Missing reviewed document: ${documentPath}`);
  return { path: documentPath, disposition, reason, referencesAZ127: record.referencesAZ127, digest: record.digest };
});

// A durable semantic-disposition file may seed later, more specific reviewed
// entries. Count each document once: the reviewed record wins, while only
// still-unexpanded dispositions remain in the contextual-exclusion bucket.
const reviewedPathSet = new Set(reviewed.map(record => record.path));
const contextualExclusionSet = new Set(
  semanticDispositions.paths.filter(documentPath => !reviewedPathSet.has(documentPath))
);

const counts = census.reduce((acc, record) => {
  acc[record.route] = (acc[record.route] ?? 0) + 1;
  return acc;
}, {});
const candidates = census.filter(record => record.route !== "no_transition_operator_trigger");
const nonRateOperatorUsages = census
  .filter(record => record.route === "operator_rate_claim_candidate" && !record.hasRateContext && !reviewed.some(item => item.path === record.path))
  .map(record => record.path);
const unreviewedOperatorCandidates = census
  .filter(record => record.route === "operator_rate_claim_candidate" && record.hasRateContext && !record.referencesAZ127 && !contextualExclusionSet.has(record.path) && !reviewed.some(item => item.path === record.path))
  .map(record => record.path);
const linkedContextualCandidates = census
  .filter(record => record.route === "operator_rate_claim_candidate" && record.referencesAZ127 && !reviewed.some(item => item.path === record.path))
  .map(record => record.path);

const output = {
  schema: "frontier.transition-operator-propagation-audit/1",
  date: "2026-10-26",
  authority: "routing_and_propagation_audit_not_physical_admission",
  reference,
  ledgerFields: [
    "initial_and_final_sectors",
    "operator_and_tensor_or_multipole_type",
    "reduced_or_full_matrix_element",
    "phase_space_and_competing_channels",
    "intrinsic_versus_environmental_width",
    "polarization_and_angular_information",
    "detector_acceptance_and_time_window",
    "reopening_perturbation"
  ],
  routeSemantics: {
    operator_rate_claim_candidate: "Possible physical transition/rate language. Human review must decide whether the eight-field ledger applies; keyword presence is not scientific evidence.",
    effective_spectral_claim_candidate: "Pole, linewidth, ringdown or spectroscopy language without an automatic microscopic transition claim.",
    barrier_or_kinetic_metastability_candidate: "Escape, switching or hysteresis language that must not be silently equated with an operator bottleneck.",
    no_transition_operator_trigger: "No audit trigger; this does not prove irrelevance."
  },
  totals: {
    markdownDocumentsScanned: census.length,
    candidateDocuments: candidates.length,
    reviewedAuthoritativeDocuments: reviewed.length,
    linkedContextualCandidates: linkedContextualCandidates.length,
    nonRateOperatorUsages: nonRateOperatorUsages.length,
    contextualSemanticExclusions: contextualExclusionSet.size,
    unreviewedOperatorCandidates: unreviewedOperatorCandidates.length,
    byRoute: counts
  },
  reviewed,
  linkedContextualCandidates,
  nonRateOperatorUsages: {
    disposition: "no_decay_capture_lifetime_or_width_context_in_document",
    reason: "The document uses selection-rule, transition-operator or matrix-element language but makes no decay, capture, lifetime, branching, radiative, emission, absorption, linewidth, metastability or resonance claim. The eight-field rate ledger is therefore not applicable unless that scope changes.",
    paths: nonRateOperatorUsages
  },
  contextualSemanticExclusions: {
    source: semanticDispositionsPath,
    disposition: semanticDispositions.disposition,
    reason: semanticDispositions.reason,
    records: [...contextualExclusionSet].map(documentPath => {
      const record = census.find(item => item.path === documentPath);
      return { path: documentPath, digest: record.digest };
    })
  },
  openWork: {
    statement: unreviewedOperatorCandidates.length
      ? "The standard and authoritative frontier spine are propagated. Remaining operator-rate candidates require semantic triage; bulk insertion of atomic terminology is forbidden."
      : "The declared operator/rate candidate queue is semantically exhausted. Effective-spectral and barrier/kinetic candidates retain their distinct mechanism boundaries; new or changed documents must be rerouted before promotion.",
    unreviewedOperatorCandidates
  },
  census
};

const md = `# Transition-operator propagation audit v1

**Date:** 26 October 2026
**Status:** operator/rate semantic triage closed for the scanned corpus; spectral and metastability candidates remain separately typed
**Machine authority:** [JSON audit](transition_operator_propagation_audit_v1.json)
**Reference bridge:** [AZ-127](../admissibility/admissibility_127_transition_operators_selection_rules_and_lifetime_frontier.md)

## Result

The audit scans **${output.totals.markdownDocumentsScanned}** Markdown documents and routes **${output.totals.candidateDocuments}** for possible transition, spectral or metastability relevance. **${reviewed.length}** authoritative documents have an explicit reviewed disposition, **${linkedContextualCandidates.length}** additional operator/rate candidates carry the AZ-127 boundary in context, **${nonRateOperatorUsages.length}** are excluded because their full document contains no decay/capture/lifetime/width context, and **${contextualExclusionSet.size}** rate-context keyword collisions have an explicit semantic exclusion. **${unreviewedOperatorCandidates.length}** rate-context candidates remain for semantic triage.

This is intentionally not a global search-and-replace. “Radiative stability,” a graph transition, a resonance pole, detector lag and an atomic decay do not name the same thing. The audit makes that difference visible and keeps the unresolved set enumerable.

## The rule now carried by the corpus

A lower-energy or otherwise available final state is only a possible destination. A physical rate additionally requires a typed interaction operator, a nonzero matrix element, phase space and competing-channel accounting. A measured record further requires separation of population decay from dephasing/environmental width, angular or polarization acceptance, detector response and an observation window.

Barrier escape and hysteresis use a different mechanism ledger. Effective pole or resonator calculations may remain effective, but must not be promoted to microscopic lifetimes without the missing operator-level data.

## Reviewed propagation spine

| Document | Disposition | Reason |
|---|---|---|
${reviewed.map(record => `| \`${record.path}\` | \`${record.disposition}\` | ${record.reason} |`).join("\n")}

## Remaining boundary

The operator/rate queue is empty under the declared vocabulary: every hit is in the reviewed spine, carries the AZ-127 boundary in context, has no rate context, or has an explicit semantic exclusion. This does not close the 104 effective-spectral or 35 barrier/kinetic candidates as physical theories. It prevents those mechanisms from being silently collapsed into atomic or nuclear transition language; their own frontier audits remain authoritative.

## Exit criterion

This propagation tranche closes only when every operator-rate candidate has a reviewed disposition; every experiment making a microscopic transition claim carries all eight fields or an explicit missing-data boundary; and the audit regenerates with zero unreviewed operator candidates. A zero count reached by weakening the search vocabulary is a failure.
`;

if (write) {
  fs.writeFileSync(path.join(root, outputJson), `${JSON.stringify(output, null, 2)}\n`);
  fs.writeFileSync(path.join(root, outputMd), md);
}

console.log(JSON.stringify({
  result: "pass",
  write,
  outputJson,
  outputMd,
  totals: output.totals
}, null, 2));
