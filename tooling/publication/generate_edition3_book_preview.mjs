#!/usr/bin/env node

import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { basename, join, relative, resolve, sep } from "node:path";

const root = resolve(process.cwd());
const bookRoot = join(root, "book", "edition-3");
const chaptersRoot = join(bookRoot, "chapters");
const detailsRoot = join(bookRoot, "details");
const readingKeyRoot = join(bookRoot, "reading-key");
const siteRoot = join(root, "docs", "edition-3");
const siteDetailsRoot = join(siteRoot, "details");
const siteReadingKeyRoot = join(siteRoot, "reading-key");
const assetsRoot = join(siteRoot, "assets");
const katexSourceRoot = join(root, "tooling", "publication", "vendor", "katex");
const katexSiteRoot = join(siteRoot, "vendor", "katex");
const esc = value => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const sha256 = value => createHash("sha256").update(value).digest("hex");
const posix = value => value.split(sep).join("/");
const anchorId = value => String(value).normalize("NFKD").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/gu, "");
const typeset = value => String(value)
  .replaceAll("H2(R)", "H₂(ℝ)")
  .replaceAll("H₂(R)", "H₂(ℝ)")
  .replaceAll("J3(O)", "J₃(𝕆)")
  .replaceAll("J₃(O)", "J₃(𝕆)")
  .replaceAll("sp(4,R)", "𝔰𝔭(4,ℝ)")
  .replaceAll("sp(2,R)", "𝔰𝔭(2,ℝ)")
  .replaceAll("Sp(4,R)", "Sp(4,ℝ)")
  .replaceAll("Spin0(2,3)", "Spin₀(2,3)")
  .replaceAll("spin(2,3)", "𝔰𝔭𝔦𝔫(2,3)")
  .replace(/\bE6\b/gu, "E₆")
  .replace(/\bE7\b/gu, "E₇")
  .replace(/\bE8\b/gu, "E₈")
  .replace(/\bZ2\b/gu, "ℤ₂")
  .replace(/\bZ3\b/gu, "ℤ₃")
  .replace(/\bZ6\b/gu, "ℤ₆")
  .replace(/\bZ9\b/gu, "ℤ₉")
  .replace(/\bCP1\b/gu, "ℂP¹")
  .replace(/\bS1\b/gu, "S₁")
  .replaceAll("sigma_z", "σ_z");

const mathReplacements = [
  ["su(3)c⊕su(2)L⊕u(1)Y", String.raw`\mathfrak{su}(3)_c\oplus\mathfrak{su}(2)_L\oplus\mathfrak{u}(1)_Y`],
  ["𝔰𝔭(4,ℝ)", String.raw`\mathfrak{sp}(4,\mathbb R)`],
  ["𝔰𝔭(2,ℝ)", String.raw`\mathfrak{sp}(2,\mathbb R)`],
  ["𝔰𝔭𝔦𝔫(2,3)", String.raw`\mathfrak{spin}(2,3)`],
  ["Spin₀(2,3)", String.raw`\mathrm{Spin}_0(2,3)`],
  ["Sp(4,ℝ)", String.raw`\mathrm{Sp}(4,\mathbb R)`],
  ["H₂(ℝ)", String.raw`H_2(\mathbb R)`],
  ["J₃(𝕆)", String.raw`J_3(\mathbb O)`],
  ["ℂP¹", String.raw`\mathbb{CP}^{1}`],
  ["E₆", String.raw`E_6`],
  ["E₇", String.raw`E_7`],
  ["E₈", String.raw`E_8`],
  ["ℤ₂", String.raw`\mathbb Z_2`],
  ["ℤ₃", String.raw`\mathbb Z_3`],
  ["ℤ₆", String.raw`\mathbb Z_6`],
  ["ℤ₉", String.raw`\mathbb Z_9`],
  ["σ_z", String.raw`\sigma_z`],
];

const mathHtml = value => {
  let output = esc(typeset(value));
  for (const [text, tex] of mathReplacements) output = output.replaceAll(text, String.raw`\(${tex}\)`);
  return output;
};
const claimPath = name => {
  if (name.startsWith("corpus/")) return name;
  const match = /^(\d+)_.*\.md$/iu.exec(name);
  if (!match) throw new Error(`Not a numbered corpus document: ${name}`);
  const first = Math.floor(Number(match[1]) / 100) * 100;
  const bucket = `${String(first).padStart(4, "0")}-${String(first + 99).padStart(4, "0")}`;
  return `corpus/claims/${bucket}/${name}`;
};

const findings = [
  ["E3-F01", "established-in-model", "The Jordan/TKK route reaches the Spin(2,3) hinge", "For the declared four-real-dimensional carrier, Jordan translations, grading and a correctly typed continuous Furey channel rotation close the ten-dimensional real Lie algebra sp(4,R), hence Spin₀(2,3).", "This is a finite-dimensional model theorem, not evidence that nature selects the carrier or its interpretation.", ["1058_a_three_generator_jordan_furey_recursion_closes_all_of_sp4_but_requires_the_furey_channel_rotation_as_a_continuous_flow.md", "1059_the_linear_furey_product_FCp_exponentiates_exactly_to_the_missing_continuous_sp4_channel_rotation_but_its_action_term_is_open.md", "47_global_group_isomorphism_sp4r_spin023.md"]],
  ["E3-F02", "established-in-model", "A concrete lower-rank Jordan entry point exists", "The Gaussian residual selector is represented by the H₂(R) logarithmic barrier and its Peirce–Schur recursion. Its conformal/TKK algebra supplies an explicit local rung into sp(4,R).", "H₂(R) is not the exceptional Albert algebra; the later J₃(O), E₆ and E₈ continuation remains a separate bridge.", ["1023_the_gaussian_gram_selector_is_the_h2r_jordan_logdet_barrier_and_a_peirce_slice_of_the_rank_three_cubic.md", "986_the_diagonal_cubic_barrier_is_flat_in_log_coordinates_and_cannot_generate_the_carrier_shear_without_tkk_prolongation.md", "202_peirce_schur_triple_recursion_to_spin23.md"]],
  ["E3-F03", "established-in-model", "The odd-cycle intuition has a projective double-cover realization", "The three-relation cycle supports an odd-loop obstruction, a connected six-cycle cover and a coherent central-sign lift. Nested six- and twelve-step transports make the twist and return data explicit.", "Central −I holonomy is not automatically chirality, a spacetime braid, a Pfaffian reversal or a generation count.", ["994_the_three_placement_triangle_has_a_z2_sideband_frustration_and_requires_path_dependence_or_a_double_cover.md", "995_the_unique_connected_double_cover_of_the_placement_triangle_is_the_six_cycle_with_sideband_as_deck_parity.md", "996_the_graded_sideband_antiunitary_lifts_the_six_cycle_to_a_nested_c12_to_c6_to_c3_transport.md", "1128_three_is_the_minimal_Mobius_gear_cycle_and_the_third_relation_of_the_typed_twin_wheels.md"]],
  ["E3-F04", "closed-identification", "The central sign is not the missing orientation datum", "The canonical projective lift returns the carrier frame by −I while preserving determinant orientation. The direct identification of Wilson-loop sign with response-Pfaffian sheet therefore fails.", "A separate reflection, oriented area or other odd datum could still supply a typed orientation bridge.", ["1066_the_Wilson_pi_flux_is_the_nontrivial_RP1_line_holonomy_but_its_canonical_frame_lift_is_central_minus_I_not_a_Pfaffian_sheet_flip.md", "1046_the_oriented_area_is_exactly_the_pfaffian_line_of_the_response_root_but_its_microscopic_weak_higgs_identification_remains_open.md", "1047_fixing_the_phase_symplectic_orientation_reduces_the_gram_root_gauge_to_SO2_and_turns_the_pfaffian_sign_into_a_rank_one_separated_Z2_sheet.md"]],
  ["E3-F05", "constructed-conditional", "The Furey channel rotation participates in exact sp(4) closure", "On the declared response carrier, the continuous Furey product rotation supplies the generator that enlarges the compact-turn/split-dilation subalgebra to sp(4,R).", "The response operator is an effective typed construction, not a microscopic Standard-Model Hamiltonian or a theorem about Furey's complete programme.", ["1059_the_linear_furey_product_FCp_exponentiates_exactly_to_the_missing_continuous_sp4_channel_rotation_but_its_action_term_is_open.md", "1060_a_positive_first_order_response_pulse_generates_the_full_furey_channel_flow_without_bulk_degeneracy_but_needs_microscopic_charge_completion.md", "69_furey_weak_jordan_ladder_spin23.md"]],
  ["E3-F06", "established-obstruction", "One S₁ mediator cannot realize the desired pure Furey pulse", "The common mediator producing the two crossed Standard-Model operators also produces a third Wilson edge. One copy is rank-obstructed; common-orientation positive copies do not remove it.", "A split-copy involution, source-incidence rule, boundary realization or physical reading of the closed triangle remains possible only with additional structure.", ["1061_the_minimal_sm_field_completion_of_the_furey_channel_pulse_is_a_pair_of_dimension_six_S1_exchange_operators_with_an_underived_relative_phase.md", "1062_one_S1_mediator_cannot_generate_a_pure_FCp_pulse_but_two_orthogonal_copies_realize_the_exact_oriented_star.md", "1074_positive_Spin10_Clebsch_preserving_copies_can_never_remove_the_third_edge_but_a_twisted_two_copy_involution_can.md"]],
  ["E3-F07", "established-obstruction", "Proton safety is a source-selection problem", "The complete unified triplet contains the desired leptoquark arms together with four-quark and proton-decay channels. B−L and matter parity do not isolate the safe subset.", "This excludes the naive complete-multiplet reading, not every Pati–Salam, finite-geometry or multi-mediator completion.", ["1075_the_unified_vector_triplet_gives_two_FCp_arms_one_safe_extra_and_three_proton_decay_channels_all_with_BminusL_zero.md", "1076_the_proton_safe_current_projector_exists_only_after_breaking_the_pati_salam_colour_lepton_roots.md", "1078_no_minimal_family_universal_anomaly_free_U1_can_protect_the_proton_safe_S1_source_mask.md"]],
  ["E3-F08", "constructed-conditional", "Pati–Salam finite geometry supplies a concrete source split", "The retained Model C reconstruction separates leptoquark and diquark sources and reproduces opposite crossed coefficients; rank-one vacuum geometry protects selected mixing channels through the audited orders.", "Broken-phase counterterms, global anomalies and the third-edge burden remain open.", ["1079_NCG_Pati_Salam_Model_C_realizes_the_safe_source_split_but_its_minimal_left_right_pair_still_closes_the_Wilson_triangle.md", "1084_the_minimal_spectral_graph_has_an_all_orders_rank_one_bridge_normal_form_that_forbids_holomorphic_cross_six_mixing.md", "1085_the_rank_one_spectral_zero_is_the_unbroken_colour_lepton_reflection_Ward_sector_but_three_generation_weak_instantons_make_it_nonperturbatively_anomalous.md"]],
  ["E3-F09", "established-boundary", "The simplest continuous and binary protections fail", "Family-universal anomaly-free U(1) charges reduce to familiar directions and cannot distinguish the safe mask. A universal internal Z₂ is weak-anomalous for an odd family count, while connected flavor removes the two-family sign exit.", "Larger cyclic, flavor-dependent, non-Abelian, inflow and finite-geometry mechanisms remain live.", ["1078_no_minimal_family_universal_anomaly_free_U1_can_protect_the_proton_safe_S1_source_mask.md", "1086_for_an_odd_number_of_families_any_universal_Z2_that_splits_leptoquark_from_diquark_triplets_has_the_same_mod_two_weak_anomaly.md", "1087_connected_CKM_and_PMNS_Yukawa_graphs_force_any_exact_diagonal_family_Z2_back_to_the_universal_anomalous_class.md"]],
  ["E3-F10", "constructed-conditional", "Baryon triality is the first surviving cyclic protection", "The first family-universal cyclic witness appears at Z₉; quotienting its gauge cube leaves baryon triality. Three families cancel the audited low-energy residues.", "The full Pati–Salam bordism class, heavy-threshold descent and exact finite-spectral-triple normalizer remain open.", ["1088_Z9_is_the_minimal_family_universal_cyclic_lift_that_protects_triplet_companion_mixing_and_its_three_family_quotient_is_baryon_triality.md", "1089_the_Z9_quark_number_lift_factors_exactly_into_a_chiral_module_phase_times_Pati_Salam_BminusL_and_its_gauge_quotient_is_baryon_triality.md", "1092_the_Z9_extension_not_its_naive_mod3_reduction_realizes_baryon_triality_and_matches_the_Dai_Freed_mod9_anomaly.md", "1094_the_Majorana_vacuum_stabilizer_is_the_Z6_quotiented_standard_model_times_a_split_baryon_triality_with_the_Z9_lift_cubing_to_colour_centre.md"]],
  ["E3-F11", "conditional", "The exceptional continuation remains a separate bridge", "The local H₂(R)/TKK result strengthens the route into Spin(2,3), but does not derive J₃(O), E₆, E₈, Golay, Leech or Monster structure.", "Shared dimensions, labels and visual resemblance are not carrier maps; each continuation needs an explicit map, invariant and observable.", ["33_octonions_leech_lattice_jordan_branch.md", "40_grand_synthesis_spin23_pole.md", "1217_leech_pair_gram_geometry_reaches_spin23_but_needs_an_orientation_twist_and_affine_theta_shift.md"]],
  ["E3-F12", "open-physical", "Mathematical closure is not physical closure", "The programme contains reproducible algebraic closure and microscopic candidates, but no selected action, vacuum, measure, recovered Standard-Model spectrum or target-blind prediction follows from closure alone.", "This is the principal firewall against presenting the programme as a completed theory of nature.", ["30_research_frontier.md", "49_multi_branch_research_registry.md", "1203_terminal_reflexive_closure_audit_conditional_eft_closure_and_sharp_indeterminacy_of_absolute_flavour_selection.md"]],
].map(([id, status, title, statement, boundary, sources]) => ({ id, status, title, statement, boundary, sources: sources.map(claimPath) }));

findings.push(...[
  ["E3-F13", "constructed-conditional", "Charge-three Higgsing has a precise topological limit", "With the declared normalization, a compact charge-three Abelian Higgs sector reduces in the strict infrared to level-three BF theory. A gapped unit-charge reader may retain sector memory without becoming a topological degree of freedom.", "The charge-three phase does not create the required wall: its apparent vacua are gauge-equivalent. A separate defect origin and orientation history are required.", ["1233_charge_three_abelian_higgs_reduces_conditionally_to_level_three_bf_and_a_gapped_unit_charge_reader_can_coexist_only_as_non_topological_memory.md"]],
  ["E3-F14", "constructed-conditional", "A neutral kink supplies the minimal reader wall", "Adding one neutral Z2 order parameter produces an explicit kink and localizes one even, gapped, charge-one bosonic mode without mirror doubling.", "This is a minimal completion, not a derivation from the original action. Compact boundary conditions and the physical origin of the neutral field remain external.", ["1292_a_neutral_z2_kink_is_the_minimal_defect_origin_and_one_even_charge_one_boson_localizes_without_mirror_doubling.md"]],
  ["E3-F15", "established-boundary", "Healthy bosonic poles do not settle the chiral fold", "A frozen tree-level benchmark has positive kinetic eigenvalues, nonnegative masses and positive residues for every defined bosonic sector.", "Reflection exchanges four-dimensional chirality. The undoubled chiral Standard Model has no declared same-representation partner, self-adjoint fold domain or boundary BRST cohomology.", ["1290_s_v1_contains_a_fully_healthy_quadratic_benchmark_but_one_completion_cannot_discharge_the_global_a4_gate.md", "1451_the_maximal_a4_action_freezes_all_bulk_poles_but_the_chiral_fold_has_no_declared_physical_state_domain.md"]],
  ["E3-F16", "internally-exhausted", "The selector is missing a physical phase reference", "Endpoint-blind Standard-Model data cannot supply the exchange-odd portal needed to choose one non-fixed orientation. CP, CPT, Z3, boundary normal, index and known flavour data do not canonically fix the remaining phase circle.", "A physical charge-minus-two complex reference and a local lock to the charged carrier would reopen the problem; merely renaming an existing phase does not.", ["1395_no_declared_cp_boundary_z3_flavor_or_index_datum_fixes_the_a5_sterile_phase_reference.md"]],
  ["E3-F17", "established-boundary", "The canonical completion carries index three, but its minimal 6D parent is anomalous", "The selected-projector completion canonically induces O(3) on CP1, and the twisted Dirac operator has index three for every spectator Standard-Model representation.", "The simplest same-six-dimensional-chirality local parent has irreducible gravitational, gauge and global SU(2) anomalies. A vectorlike repair returns mirror zero modes.", ["1397_the_completion_cp1_canonically_inherits_o3_and_index_three_but_no_current_action_makes_it_the_fermion_family_dirac_space.md", "1450_the_o3_twisted_cp1_operator_has_exactly_three_universal_chiral_zero_modes_but_its_minimal_local_six_dimensional_parent_is_anomalous.md"]],
  ["E3-F18", "internally-exhausted", "The traceless spectral threshold survives stress improvement", "Within the displayed scalar improvement family, the traceless stress vertex and its pair-production threshold are independent of the curvature coupling xi.", "The full trace-mixed third response direction is not universal and can be tuned away. Curved microscopic matching and an operational port definition are still needed.", ["1393_the_full_scalar_stress_preserves_a_traceless_holonomy_threshold_but_not_a_scheme_invariant_third_matrix_direction.md", "1396_no_current_principle_predicts_the_reader_curvature_coupling_so_only_the_traceless_threshold_is_scheme_robust.md"]],
  ["E3-F19", "simulation-ready", "A calibrated pole-and-band experiment can be specified", "The A11 packet includes finite-volume, disorder, sector-confusion, calibration and statistical-power gates. Its synthetic fixture has an effective resolution floor near 0.630 MHz and resolves an injected 1 MHz shift.", "Sensitivity is not a predicted signal. The programme still lacks a microscopic sector shift, spectral residue and physical port operator.", ["1452_the_scheme_invariant_a11_experiment_is_a_calibrated_spectral_pole_and_band_contrast_with_a_device_prediction_gate.md"]],
  ["E3-F20", "established-no-go", "The softened QWZ curve is not the response of its stated Lindbladian", "The published scalar-broadening quadrature and doubled cusp reproduce, but the stated unital L=sigma_z dynamics generically drive each momentum sector to I/2. Exact stationary Kubo forcing therefore vanishes.", "The curve remains a phenomenological template. A non-unital bath, reservoir or finite-time preparation would define a different model and must be solved independently.", ["1454_the_zenodo_chern_quadrature_reproduces_but_is_not_the_exact_sigma_z_lindblad_hall_response.md"]],
  ["E3-F21", "corrected-conditional", "The two-branch flow has an exact open-bosonic realization", "After replacing the incorrect A-bar-B invariant by AB and common-phase symmetry by opposite-phase U(1), the two-branch flow closes on an SO(2,1) cone and is reproduced exactly by a two-mode squeezing Hamiltonian with completely positive loss.", "Its Lie closure is sp(2,R), not sp(4,R), and the octonionic bracket-to-bosonic-operator map remains assumed.", ["1455_the_corrected_octonionic_two_branch_flow_has_an_exact_cp_lindblad_completion_and_a_three_coordinate_lorentz_cone_but_not_full_spin23.md"]],
  ["E3-F22", "terminal-current-input", "Seven gates now have explicit stopping and reopening rules", "A5 and A7 are internally exhausted; A2 and A9 are conditionally constructed; A4, A6 and A11 are externally open. No whole gate is globally failed.", "Physical admission remains false. Exhaustion means that recombining the same inputs is no longer frontier work, not that every possible completion is impossible.", ["1453_genuine_exhaustion_leaves_no_untyped_internal_work_but_seven_named_external_or_conditional_frontiers.md", "1456_the_two_zenodo_preprints_strengthen_response_controls_but_do_not_change_the_terminal_gate_partition.md"]],
  ["E3-F23", "established-boundary", "The local gravity route has one healthy critical torsion sector but no closed quantum parent", "The reopened mass-gap and action programme isolates a healthy classical/EFT zero-minus torsion sector and a complete quadratic shell, while the local quantum flow leaves the critical surface through a Weyl-square term.", "Positive enlarged completions remain possible, but they import new functional, metric, vacuum or matching data and do not select the axial portal.", ["1624_the_reopened_mass_gap_action_and_shared_scale_programme_reaches_five_irreducible_gates.md"]],
  ["E3-F24", "terminal-current-input", "Every finite connection-parent escape now ends at new model construction", "Ordinary Lorentz super-Yang--Mills is kinetically indefinite; self-duality requires complex reality constraints; nonlinear Lorentz realization gives a massive rotation-vector triplet rather than the target pseudoscalar.", "This is operational exhaustion under current inputs, not a theorem against future models. Reopening requires a complete action, vacuum, constraint solution, positive spectrum and normalized fermion matching.", ["1788_all_finite_escapes_from_the_minimal_connection_parent_now_end_at_new_model_construction.md"]],
].map(([id, status, title, statement, boundary, sources]) => ({ id, status, title, statement, boundary, sources: sources.map(claimPath) })));

findings.push({
  id: "E3-F25",
  status: "established-in-model",
  title: "The mixed admissibility interface is an A8 transfer lattice",
  statement: "For the declared 16-node, 27-relation quotient-scar graph, the constructive and guardrail incidence images intersect on the zero-sum integral lattice of a nine-node mixed core, hence A8 with determinant nine.",
  boundary: "The lattice is a corpus-derived transfer coordinate. It is not a physical A8 symmetry, octonion carrier, Leech lattice or exceptional-algebra identification; laboratory meaning requires an explicit cross-carrier map.",
  sources: [
    "corpus/programmes/frontier/wave-7/frontier_wave7_39_mixed_interface_resolution.md",
    "corpus/programmes/frontier/wave-7/frontier_wave7_44_refinement_stability_of_the_mixed_interface.md",
  ],
});

findings.push({
  id: "E3-F26",
  status: "internally-exhausted",
  title: "The pinned Claimipedia operator layers contain sl2 plus sl3, not sp4",
  statement: "The full relationship-path algebra contributes sl2, the reciprocal programme core contributes exact A2/sl3, and the evidence and provenance layers contribute no further semisimple Lie factor.",
  boundary: "This is an exhaustive result for the fixed captured schema, not a physical symmetry claim. Reopening requires a new evidence-bound cross-operator on one shared carrier satisfying the C2 Cartan, Serre and nondegenerate symplectic-form tests.",
  sources: [
    "corpus/programmes/frontier/wave-7/frontier_wave7_39_programme_a2_double_centralizer_and_c2_no_go.md",
    "corpus/programmes/frontier/wave-7/frontier_wave7_40_claimipedia_operator_exhaustion_and_sp4_gate.md",
  ],
});

const frontiers = [
  ["A2", "external-input", "Derive the defect rather than insert it", "What microscopic action creates the neutral wall, its orientation and a globally compatible compact domain?", "One UV model produces the interface, BF parity and localized reader spectrum with no hand-selected history.", "Do not keep manipulating gauge-equivalent charge-three phases as though they were disconnected vacua.", [findings[12].sources[0], findings[13].sources[0]]],
  ["A4", "stop-everything", "Define the chiral physical-state domain", "What Lorentz- and gauge-compatible fermion domain replaces the bosonic reflection fold?", "A self-adjoint operator, lower bound, BRST cohomology and positive residues are computed on the same declared domain.", "A positive bosonic benchmark does not establish unitarity of the chiral theory.", [findings[14].sources[1]]],
  ["A5", "external-input", "Supply a physical phase reference", "What measured or history-bearing charge-minus-two datum chooses the sterile phase axis and locks it locally to the charged carrier?", "A gauge-complete local operator selects the whole orientation without target-dependent convention.", "Searches among already-audited symmetric data are exhausted.", [findings[15].sources[0]]],
  ["A6", "stop-everything", "Make index three anomaly-free and mirror-free", "Can a local or spectral real structure retain three complete chiral families while cancelling the full higher-dimensional anomaly polynomial?", "The construction supplies sterile pairing, cancels local and global anomalies and has no independent mirror kernel.", "The integer three and O(3) bundle are not by themselves a physical family derivation.", [findings[16].sources[1]]],
  ["A7", "external-input", "Match the stress operator in curved microscopic theory", "Which renormalization condition fixes improvement, contact terms, displacement operators and the common physical probe?", "One completed action predicts the renormalized stress vertex and port map at a stated scale.", "The full third matrix direction must remain secondary while its improvement dependence is unfixed.", [findings[17].sources[1]]],
  ["A9", "highest", "Predict a causal interacting spectrum", "What microscopic Hamiltonian predicts the sector-dependent pole, residue, linewidth and band support?", "A causal positive spectral density survives disorder, calibration and held-out sector labels with the port fixed in advance.", "A static covariance, scalar linewidth or phenomenological curve is not an interacting response derivation.", [findings[18].sources[0], findings[19].sources[0]]],
  ["A11", "highest", "Turn sensitivity into a physical test", "What device model predicts an absolute signal before data are unblinded, and can a protected Z3 sector actually be prepared?", "A powered experiment tests a preregistered effect size with independently verified sector algebra and scaling.", "Three settings of a continuous U(1) control are not protected Z3 sectors.", [findings[18].sources[0]]],
  ["GRAPH", "external-input", "Derive the missing anisotropies", "Can an action generate the addressed controls that enlarge the natural sp(2,R) response symmetry to all ten generators of sp(4,R)?", "Orientation and anisotropy arise dynamically and ten-generator closure survives loss, disorder and refinement.", "A four-real carrier or conformally symplectic flow alone is not full Spin(2,3).", [findings[20].sources[0], "corpus/claims/1200-1299/1282_the_graph_to_spin23_lane_is_internally_exhausted_at_conditional_response_symmetry_not_spacetime.md"]],
  ["TORSION-UV", "highest", "Construct the protected torsion parent", "Which complete microscopic theory contains a nondegenerate vacuum, a positive independent zero-minus connection pole and a protected normalized axial-current coupling?", "One action passes the reality, constraint, spectrum, radiative-protection and threshold-matching gates without importing the answer as a free coefficient.", "Another symmetry label, projector or quadratic parameter scan cannot replace the missing model.", [findings[23].sources[0]]],
].map(([id, priority, title, question, advance, stop, sources]) => ({ id, priority, title, question, advance, stop, sources: sources.map(claimPath) }));

frontiers.push({
  id: "MIXED-INTERFACE",
  priority: "highest",
  title: "Realize one mixed-interface return on a calibrated carrier",
  question: "Can one platform co-realize the wall-response return or supply the missing orientation datum in the selection-memory-holonomy return?",
  advance: "A preregistered detector records the predicted invariant, nuisance model and return law on held-out data without refitting the bridge coefficient.",
  stop: "The abstract A8 transfer lattice is not a laboratory conservation law or physical symmetry without an explicit carrier map.",
  sources: [
    "corpus/programmes/frontier/wave-7/frontier_wave7_41_two_cross_carrier_vertical_slices.md",
    "corpus/programmes/frontier/wave-7/frontier_wave7_42_instrumented_admissibility_atlas.md",
  ],
});

const archetypes = [
  ["scout", "✦", "Scout", "opens a plausible new route or searches beyond the present ingredients"],
  ["cartographer", "⌖", "Cartographer", "maps territory, distinctions, dependencies and interfaces"],
  ["auditor", "⌕", "Auditor", "checks assumptions, certificates, counterexamples and stopping rules"],
  ["builder", "⚒", "Builder", "constructs a model, mechanism, calculation, protocol or intervention"],
  ["witness", "◉", "Witness", "retains observation, preparation history, stakes and situated evidence"],
  ["steward", "▤", "Steward", "preserves provenance, memory, status and continuity"],
  ["translator", "⇄", "Translator", "moves a structure between mathematical, physical or ordinary languages"],
  ["integrator", "⊕", "Integrator", "joins several typed results while letting the weakest edge set the claim"],
].map(([key, icon, name, description]) => ({ key, icon, name, description }));

const archetypeByKey = Object.fromEntries(archetypes.map(item => [item.key, item]));

const taxonomy = {
  established: { icon: "✓", label: "Established", description: "Follows from declared assumptions and has an inspectable certificate." },
  conditional: { icon: "◇", label: "Conditional", description: "Works after a named field, coefficient, boundary condition or control is supplied." },
  external: { icon: "↗", label: "Externally open", description: "Needs an ingredient, calculation or observation not contained in the current corpus." },
  exhausted: { icon: "■", label: "Internally exhausted", description: "Rearranging the present ingredients no longer addresses the missing datum." },
  obstruction: { icon: "⊘", label: "Obstruction / no-go", description: "A stated candidate class or identification has been ruled out under explicit assumptions." },
  experiment: { icon: "⌁", label: "Experiment / protocol", description: "Defines a measurement, sensitivity calculation or empirical decision rule." },
  interpretive: { icon: "◎", label: "Interpretive map", description: "Organizes thought or workflow but is not evidence for a physical claim." },
  governance: { icon: "▦", label: "Ledger / governance", description: "Preserves provenance, status, stopping rules and navigation." },
};

const statusTaxonomy = status => {
  if (["established-in-model"].includes(status)) return "established";
  if (["constructed-conditional", "conditional", "corrected-conditional"].includes(status)) return "conditional";
  if (["open-physical"].includes(status)) return "external";
  if (["internally-exhausted"].includes(status)) return "exhausted";
  if (["closed-identification", "established-obstruction", "established-boundary", "established-no-go"].includes(status)) return "obstruction";
  if (["simulation-ready"].includes(status)) return "experiment";
  return "governance";
};

const chapterTaxonomy = {
  "00-front-matter": "governance",
  "01-the-revised-spine": "established",
  "02-one-carrier-two-faces-three-relations": "established",
  "03-projective-loop": "obstruction",
  "04-furey-interface": "conditional",
  "05-standard-model-seam": "external",
  "06-proton-safety": "conditional",
  "07-exceptional-horizon": "interpretive",
  "08-admissibility-frontier": "interpretive",
  "08-result-ledger": "governance",
  "09-research-frontier": "external",
  "10-provenance-and-reading-map": "governance",
  "11-concept-atlas": "interpretive",
  "12-optional-endpoints-and-readings": "interpretive",
};

const sectionTaxonomy = {
  "Scope and method": "governance",
  "The authority boundary": "governance",
  "A book of layers": "interpretive",
  "Four labels used throughout": "governance",
  "The route through the book": "governance",
  "What closes": "established",
  "Begin with a measuring frame": "established",
  "From elimination to symmetry": "established",
  "Why ten generators are a real gate": "established",
  "What remains open": "external",
  "Algebra is not yet spacetime": "external",
  "The smallest relational closure": "established",
  "Jordan recursion": "established",
  "Why two is comparison and three is consistency": "interpretive",
  "Faces and the off-diagonal channel": "established",
  "Three relations do not select an orientation": "obstruction",
  "The graph result": "conditional",
  "The exact result": "established",
  "The reversal": "obstruction",
  "A familiar twisted-loop picture": "interpretive",
  "Central sign versus handedness": "obstruction",
  "From topology to a defect": "conditional",
  "Why Furey enters": "conditional",
  "What a representation does": "interpretive",
  "The exact participation result": "established",
  "Why it is not yet unification": "external",
  "The selector problem": "exhausted",
  "The attractive construction": "conditional",
  "The uncomfortable edge": "obstruction",
  "What c, L and Y mean": "established",
  "Fit capacity versus derivation": "obstruction",
  "The chiral fold obstruction": "external",
  "Three generations and the index": "conditional",
  "Complete multiplets are not automatically safe": "obstruction",
  "The surviving route": "conditional",
  "Why a multiplet brings unwanted companions": "obstruction",
  "From continuous charges to triality": "conditional",
  "The current action and its limits": "external",
  "What the local result changes": "established",
  "What it does not collapse": "obstruction",
  "E8 as a crystal rather than a slogan": "interpretive",
  "Jordan freedom and the need for selectors": "interpretive",
  "The corrected octonionic two-branch model": "conditional",
  "Where the exceptional programme actually stands": "external",
  "The structure between Jordan and Lie": "interpretive",
  "Dynamics inside the admissible region": "conditional",
  "Detectors draw the practical boundary": "experiment",
  "Filled, bounded and unfilled territory": "governance",
  "What is genuinely within reach": "external",
  "The shift": "interpretive",
  "Why Jordan and Lie must be balanced": "established",
  "Dynamics moves the boundary": "conditional",
  "The third term is the mediator": "interpretive",
  "The finesse technology pathway": "experiment",
  "Hot off the press — the oriented seam becomes an experiment": "conditional",
  "Hot off the press — the mixed interface has an exact shape": "established",
  "Hot off the press — the missing middle has a type": "conditional",
  "Kenotic confidence": "governance",
  "Why add this layer": "interpretive",
  "The unit is an episode": "interpretive",
  "The programme's observed arc": "interpretive",
  "How to challenge a claim": "governance",
  "A compact vocabulary": "governance",
  "Practical hope ends in work": "external",
  "Desired endpoints are aims": "interpretive",
  "Mythic arcs are pictures": "interpretive",
  "Theology under a declared assumption": "interpretive",
};

const chapterArchetype = {
  "00-front-matter": "steward",
  "01-the-revised-spine": "integrator",
  "02-one-carrier-two-faces-three-relations": "cartographer",
  "03-projective-loop": "auditor",
  "04-furey-interface": "translator",
  "05-standard-model-seam": "auditor",
  "06-proton-safety": "builder",
  "07-exceptional-horizon": "cartographer",
  "08-admissibility-frontier": "integrator",
  "08-result-ledger": "steward",
  "09-research-frontier": "scout",
  "10-provenance-and-reading-map": "steward",
  "11-concept-atlas": "cartographer",
  "12-optional-endpoints-and-readings": "translator",
};

const sectionArchetype = {
  "A book of layers": "translator",
  "Four labels used throughout": "steward",
  "The route through the book": "cartographer",
  "What closes": "integrator",
  "From elimination to symmetry": "translator",
  "Why ten generators are a real gate": "auditor",
  "What remains open": "scout",
  "Algebra is not yet spacetime": "auditor",
  "Why two is comparison and three is consistency": "translator",
  "Three relations do not select an orientation": "auditor",
  "The graph result": "builder",
  "Practical hope ends in work": "builder",
  "Desired endpoints are aims": "scout",
  "Mythic arcs are pictures": "translator",
  "Theology under a declared assumption": "translator",
  "The reversal": "auditor",
  "Central sign versus handedness": "auditor",
  "From topology to a defect": "builder",
  "The exact participation result": "integrator",
  "Why it is not yet unification": "auditor",
  "The selector problem": "witness",
  "Fit capacity versus derivation": "auditor",
  "The chiral fold obstruction": "auditor",
  "Three generations and the index": "builder",
  "The surviving route": "builder",
  "The current action and its limits": "auditor",
  "E8 as a crystal rather than a slogan": "cartographer",
  "Jordan freedom and the need for selectors": "auditor",
  "The corrected octonionic two-branch model": "builder",
  "Where the exceptional programme actually stands": "cartographer",
  "The shift": "cartographer",
  "Why Jordan and Lie must be balanced": "integrator",
  "Dynamics moves the boundary": "builder",
  "The third term is the mediator": "translator",
  "The finesse technology pathway": "builder",
  "Hot off the press — the oriented seam becomes an experiment": "builder",
  "Hot off the press — the mixed interface has an exact shape": "integrator",
  "Hot off the press — the missing middle has a type": "integrator",
  "How to challenge a claim": "auditor",
  "A compact vocabulary": "translator",
};

const statusArchetype = status => {
  const taxon = statusTaxonomy(status);
  if (["established", "obstruction", "exhausted"].includes(taxon)) return "auditor";
  if (["conditional", "experiment"].includes(taxon)) return "builder";
  if (taxon === "external") return "scout";
  return "steward";
};

const frontierArchetype = id => ({ A2: "builder", A4: "builder", A5: "witness", A6: "builder", A7: "translator", A9: "builder", A11: "builder", GRAPH: "builder", "TORSION-UV": "builder", "MIXED-INTERFACE": "builder" })[id];

const frontierTaxonomy = id => {
  if (["A5", "A7"].includes(id)) return "exhausted";
  if (["A2", "A9", "GRAPH", "MIXED-INTERFACE"].includes(id)) return "conditional";
  return "external";
};

const taxonomyMarkdown = (key, context = "Section status") => {
  const item = taxonomy[key];
  if (!item) throw new Error(`Unknown taxonomy key: ${key}`);
  return `> **${context} — [${item.icon} ${item.label}](../reading-key/status-${key}.md)** — ${item.description}\n\n`;
};

const taxonomyBadgeHtml = (key, prefix = "") => {
  const item = taxonomy[key];
  if (!item) throw new Error(`Unknown taxonomy key: ${key}`);
  return `<a class="taxonomy-badge tax-${key}" href="${prefix}reading-key/status-${key}.html" title="Open the ${esc(item.label)} index page"><span class="tax-icon" aria-hidden="true">${item.icon}</span><span>${esc(item.label)}</span></a>`;
};

const taxonomyLegendMarkdown = () => `## How to read the icons

The first four marks report the epistemic state of a claim or gate. The next four describe the kind of work a passage is doing. Every icon travels with words: colour and symbol are never the only carriers of meaning.

| Mark | Meaning | Use |
|---|---|---|
${Object.entries(taxonomy).map(([key, item]) => `| **[${item.icon} ${item.label}](../reading-key/status-${key}.md)** | ${item.description} | ${["established", "conditional", "external", "exhausted"].includes(key) ? "Core epistemic state" : "Companion content marker"} |`).join("\n")}

`;

const taxonomyLegendHtml = () => `<section class="taxonomy-legend" aria-labelledby="taxonomy-title"><p class="kicker">Visual reading key</p><h2 id="taxonomy-title">How to read the icons</h2><p class="lede">The first four marks report the epistemic state of a claim or gate. The next four describe the kind of work a passage is doing. Every icon travels with words: colour and symbol are never the only carriers of meaning.</p><div class="taxonomy-grid">${Object.entries(taxonomy).map(([key, item]) => `<article class="taxonomy-card tax-${key}">${taxonomyBadgeHtml(key)}<p>${esc(item.description)}</p><small>${["established", "conditional", "external", "exhausted"].includes(key) ? "Core epistemic state" : "Companion content marker"}</small></article>`).join("")}</div></section>`;

const archetypeMarkdown = (key, context = "Research move") => {
  const item = archetypeByKey[key];
  if (!item) throw new Error(`Unknown archetype key: ${key}`);
  return `> **${context} — [${item.icon} ${item.name}](../reading-key/move-${key}.md)** — ${item.description}.\n\n`;
};

const archetypeBadgeHtml = (key, prefix = "") => {
  const item = archetypeByKey[key];
  if (!item) throw new Error(`Unknown archetype key: ${key}`);
  return `<a class="archetype-badge role-${key}" href="${prefix}reading-key/move-${key}.html" title="Open the ${esc(item.name)} index page"><span class="role-icon" aria-hidden="true">${item.icon}</span><span>${esc(item.name)}</span></a>`;
};

const archetypeLegendMarkdown = () => `## How to read the research-move icons

These marks do not classify people. They tell you what the nearby passage is doing, and therefore how to read or challenge it.

| Mark | Research move | Read it as |
|---|---|---|
${archetypes.map(item => `| **[${item.icon} ${item.name}](../reading-key/move-${item.key}.md)** | ${item.description}. | A temporary function of this passage, not a personality type. |`).join("\n")}

`;

const archetypeLegendHtml = () => `<section class="archetype-legend" aria-labelledby="archetype-title"><p class="kicker">Research-move key</p><h2 id="archetype-title">What is this passage doing?</h2><p class="lede">These marks do not classify people. They identify the temporary function of the nearby passage, so the reader knows whether to explore it, inspect it, reproduce it or use it as a map.</p><div class="taxonomy-grid">${archetypes.map(item => `<article class="taxonomy-card role-${item.key}">${archetypeBadgeHtml(item.key)}<p>${esc(item.description)}.</p><small>Function of the passage—not a personality type</small></article>`).join("")}</div></section>`;

const chapterSkeletons = [
  { slug: "00-front-matter", title: "Front matter", kicker: "How to read this volume", sections: [["Scope and method", ["This book asks how positive composition, typed carriers, transformation, dynamics and observation can be held in one research architecture without being declared identical. It begins from ordinary measuring ideas, states each mathematical object and then follows only the bridges for which a map or explicit test is available.", "The labels established, conditional, obstruction and open are part of the result. A beautiful chain of mathematics is not converted into a physical theory by typography or narrative momentum."]], ["The authority boundary", ["This volume reports calculations and constructions internal to declared models. It is not empirical confirmation, peer review, or a derivation of the Standard Model. Every strong sentence carries a nearby statement of what it does not establish."]]] },
  { slug: "01-the-revised-spine", title: "The revised spine", kicker: "One exact Jordan-to-Lie completion", equation: "response data → H₂(R) → Peirce–Schur triple → TKK generators → sp(4,R) ≅ spin(2,3)", sections: [["What closes", ["The programme no longer reaches Spin(2,3) only from a top-down list of low-rank coincidences. Positive two-face response data supplies H₂(R); Schur elimination becomes a Jordan-triple operation; Tits–Kantor–Koecher prolongation supplies the graded generators; and the resulting ten-dimensional real Lie algebra is sp(4,R).", "The global low-rank isomorphism then identifies Sp(4,R) with Spin₀(2,3). This is the firm mathematical middle rung."]], ["What remains open", ["The derivation is conditional on the carrier and generator typing. Nature has not yet selected the action, state, vacuum, quantum measure or observed quantity that would make this algebra the dynamical symmetry of a physical system."]]] },
  { slug: "02-one-carrier-two-faces-three-relations", title: "One carrier, two faces, three relations", kicker: "Why three is meaningful", sections: [["The smallest relational closure", ["Two faces define a comparison, but a third relation is the first place where local pairwise consistency can fail around a loop. This is why the gear intuition becomes mathematically meaningful at three: not because the universe is literally geared, but because an odd cycle detects a return defect invisible on a single edge.", "The same grammar appears in two-port response matrices, Peirce off-diagonal spaces, placement triangles and three-edge Wilson data. What is shared is a typed relational pattern, not an identity of physical mechanisms."]], ["Jordan recursion", ["For block-positive response matrices, eliminating an interior degree of freedom produces a Schur complement. Written in Jordan language, the correction is a triple operation. Repeated elimination therefore supplies a concrete meaning for Jordan-triple recursion: local consistency under composition."]]] },
  { slug: "03-projective-loop", title: "The projective loop", kicker: "Möbius intuition, double covers and central sign", sections: [["The exact result", ["An odd three-relation cycle can fail to return on the base configuration while closing on a connected double cover. The placement triangle lifts to a six-cycle, and coherent transport can require twelve steps before every marked datum returns.", "This is the mathematically disciplined form of the twisted odd-gear intuition: the obstruction lives in projective lifting and holonomy."]], ["The reversal", ["The central return −I preserves determinant orientation. It therefore cannot simply be renamed chirality or identified with a Pfaffian-sheet reversal. The negative result is productive: it tells the programme that orientation needs an independently odd datum."]]] },
  { slug: "04-furey-interface", title: "The Furey interface", kicker: "A real operator bridge with a hard boundary", sections: [["Why Furey enters", ["Furey's division-algebra programme provides chiral ideals, particle representations, ladder operations and a Jordan hierarchy. In the present carrier, a continuous Furey product rotation acts as the missing channel generator needed for full sp(4,R) closure.", "This is stronger than analogy: it is an explicit operator participation in a declared finite-dimensional model."]], ["Why it is not yet unification", ["The operator remains effective. Its microscopic origin, charge completion and relationship to the full division-algebra construction are not derived. The result says that a Furey-shaped channel flow can close the algebra—not that Furey's programme has derived spacetime or that Spin(2,3) has derived the Standard Model."]]] },
  { slug: "05-standard-model-seam", title: "The Standard-Model seam", kicker: "Mediator completion and the third edge", sections: [["The attractive construction", ["The minimal Standard-Model field completion points toward dimension-six S₁ exchange operators. They reproduce the two desired crossed arms with the required relative structure."]], ["The uncomfortable edge", ["The same mediator generically closes a triangle and generates a third Wilson edge. One copy is rank-obstructed; copies preserving the same positive Clebsch orientation do not cancel it. A pure star must therefore be derived by a new incidence rule, involution or boundary mechanism—or abandoned."]]] },
  { slug: "06-proton-safety", title: "Proton safety, Pati–Salam and triality", kicker: "Selection is the physics", sections: [["Complete multiplets are not automatically safe", ["Unified representations carry wanted and unwanted channels together. The proton-safe projector exists only after reducing the colour–lepton symmetry that made the complete multiplet attractive in the first place."]], ["The surviving route", ["A finite Pati–Salam reconstruction supplies a concrete source split, while an all-orders rank-one normal form protects part of it. The simplest U(1) and universal Z₂ protections fail. The first surviving family-universal cyclic witness is a Z₉ lift whose faithful low-energy quotient is baryon triality.", "This is a live conditional route, not closure: global anomalies, heavy thresholds, the full finite triple and the third edge remain decisive gates."]]] },
  { slug: "07-exceptional-horizon", title: "The exceptional horizon", kicker: "Jordan, Leech and Monster without overclaim", sections: [["What the local result changes", ["The H₂(R) construction makes the Spin(2,3) middle rung concrete. It clarifies how response geometry, causal positivity and relational composition can meet."]], ["What it does not collapse", ["J₃(O), E₆, E₈, the Golay code, the Leech lattice, Conway symmetry and moonshine remain distinct structures with distinct jobs. The Leech pair-Gram construction reaches H₂(R) and genus-two symplectic geometry, but needs an orientation twist and affine theta shift. No group-name chain substitutes for a carrier-preserving map."]]] },
  { slug: "08-admissibility-frontier", title: "The admissibility frontier", kicker: "New physics by finesse", sections: [["The shift", ["The next route to new physics may begin not with higher energy but with greater finesse: preserving phase, delay, boundary order, memory, orientation and cross-channel relation that ordinary measurements average away. The programme therefore begins where candidate mechanisms become observationally equivalent and asks which erased distinction would separate them.", "This is a change of protagonist. Spin₀(2,3) and the larger symmetry landscape no longer lead the story. The admission–dynamics–detection loop does, because it determines which mathematical differences can become physical records."]], ["Why Jordan and Lie must be balanced", ["Jordan structure delimits what can coexist and compose as positive states, responses and observables. Lie structure describes how those admitted objects transform and circulate. Jordan has explanatory priority; Lie has dynamical necessity; neither can supply the carrier, selector and detector alone.", "Spin₀(2,3) is an exact conformal completion of one declared rank-two Jordan response cone. It is therefore a recovered symmetry of an admitted geometry, not the prior container of physics."]], ["Dynamics moves the boundary", ["Bound states, boundary bands, resonances and free continua are joined by spectral flow, capture, decay and memory. Dynamics is tested by what it preserves, which context selects a history and which record survives finite detection—not only by whether an equation of motion can be written.", "This turns Casimir response, thermoelectric transport, holonomy, hysteresis, metastability and scattering delay into complementary probes of a changing admissibility boundary."]], ["The third term is the mediator", ["A boundary, selector, environment, memory kernel or detector orientation can mediate the relation between nominal endpoints. Ternary structure makes this context-dependence explicit: changing the middle term can change the admissible relation without changing the endpoints.", "The scientific question behind retained identity or ‘soul’ is whether a measurable invariant survives transformation, descent and observation. This does not declare a soul to be a field or particle."]], ["The finesse technology pathway", ["The practical sequence is to find a mechanism collision, identify the erased distinction, build a detector or reversal that retains it and replicate any residual on an independent carrier. Phase-sensitive controls, nonlinear correlators, boundary-order probes, memory-aware inference and same-material response closure are the immediate tools.", "Each experiment has two valuable outcomes: improved theory or technology if established physics closes the record, and a disciplined anomaly path if a preregistered residual survives nuisance models, reversals and cross-carrier replication. Only the latter sequence can promote the result toward new physics."]], ["Hot off the press — the oriented seam becomes an experiment", ["**Provisional integration note — 24 October 2026.** This result arrived after the chapter's main story was stabilized. It is included as a visible integration queue, not as settled narrative; once the mathematics, terminology and experimental interpretation firm, its pieces should be redistributed into the Jordan–Lie, detector and research-frontier sections.", "The exact result is narrower and more useful than a group-name correspondence. Monster 2A fermionization leaves the ten even genus-two spin sectors after the six odd sectors are killed by Majorana zero modes, while the nine-dimensional sum-zero seam carries a nontrivial orientation sign. But the additive fermionic sum is not the multiplicative Igusa product, the relevant Pfaffian objects live over different bases, and the canonical positive period matrix remains inside the Jordan cone at a separating surface rather than reaching its rank boundary.", "Those obstructions identify the detector. A phase-blind positive response sees the complex sewing parameter only through its magnitude; an isolated two-mode coupling phase can be removed by a basis change. The smallest intrinsic carrier is therefore a three-mode loop: its resonance spectrum identifies opposite loop orientations, while coherent directional transfer distinguishes them. This is now a realistic controlled experiment and an engineering result; it becomes a new-physics test only when a modular or Monster calculation predicts the loop record without fitting it to the device."]], ["Kenotic confidence", ["AI can map dispersed results, optimize separating interventions and maintain the evidence ledger, but it cannot award physical truth. Kenotic confidence means stating the route positively while allowing the experiment, the rival model and the independent reproducer to remain genuinely capable of changing the conclusion."]]] },
  { slug: "08-result-ledger", title: "Result and reversal ledger", kicker: "Twenty-six retained findings", kind: "findings" },
  { slug: "09-research-frontier", title: "Research frontier", kicker: "Legacy action gates, the graph lane and the current torsion-parent boundary", kind: "frontiers" },
  { slug: "10-provenance-and-reading-map", title: "Provenance and reading map", kicker: "How to audit the book", kind: "provenance" },
  { slug: "11-concept-atlas", title: "Concept atlas", kicker: "The programme as a navigable typed graph", kind: "concept-map" },
  { slug: "12-optional-endpoints-and-readings", title: "Optional endpoints and larger readings", kicker: "Practical hope first; speculation, myth and theology afterwards", sections: [["Practical hope ends in work", ["Hope becomes scientific when it says where to look and what useful work can return. A projector experiment may improve geometric control; a same-film response pipeline may improve force prediction; a null polarized-force search may tighten effective-field-theory bounds. The ordinary outcome must be worth having before any anomaly appears.", "The same work may expose new physics only through a predeclared residual that survives calibration, nuisance models, reversals and competing mechanisms. Unexplained noise is not promoted by desire. The point is a two-outcome design: theoretical or engineering improvement under established physics, and a disciplined discovery route if the established account fails."]], ["Desired endpoints are aims", ["The programme may desire a theory of joint realizability, a physical carrier dictionary, a derived selector, protected cross-response relations and a detector able to separate shared shape from shared mechanism. These aims orient work without becoming predictions.", "Desire does not make an endpoint true, while kenotic caution does not require pretending the programme has no direction. Each desired endpoint must be paired with a closure condition and a result that remains useful if the endpoint is not reached."]], ["Three roles are not three maxima", ["Security, selfhood and kenosis become less paradoxical when they are typed as different mathematical roles: a viability boundary, an invariant carried through change and an outward flow. They are not three rival scalar objectives. The practical question is which trajectories preserve enough capacity and identity for something real to keep passing outward.", "This picture does not solve moral tragedy or derive an ethic from mathematics. It shows where a decision actually crosses a declared boundary, destroys an identity-bearing relation or spends future capacity. Values still choose among admissible paths; the feasible region does not choose its own objective."]], ["Mythic arcs are pictures", ["Chaos becoming an inhabitable order, a traveller crossing a typed gate, a labyrinth retaining a thread, death opening into renewal and reconciliation without erasure can picture aspects of admission, transport, memory, closure and reopening. They are ways of seeing the human meaning of a pattern, not mechanisms in a physical model.", "These pictures are a menu. Remove or substitute them and the scientific claim must remain unchanged. If a theorem or experiment depends on the mythic picture, the picture contains an unstated premise and has exceeded its authority."]], ["Theology under a declared assumption", ["Assume explicitly that God exists; for the specific kenotic reading also assume that God is unsurpassable in knowledge, power and goodness, that creation is genuinely other and intelligible, and that divine power ordinarily serves rather than needlessly replaces creaturely causation. Under those assumptions, the admissibility story can picture creation as a hospitable lawful region in which distinct beings, causes, histories and records genuinely matter.", "An explicitly Christian continuation reads incarnation as entry into creaturely conditions, the cross as non-dominating power sharing their cost, and resurrection as restoration without erasure. This is positive theological analysis from declared premises, not an inference from Jordan/TKK mathematics, an anomaly or a gap in physics; no theological conclusion flows backward as evidence for a scientific claim."]]] },
];

// This provisional section is intentionally updated as the live result firms.
// Keep the main chapter stable while making the newest detector reassignment explicit.
const admissibilityHotSection = chapterSkeletons
  .find(chapter => chapter.slug === "08-admissibility-frontier")
  .sections.find(([heading]) => heading === "Hot off the press — the oriented seam becomes an experiment");
admissibilityHotSection[1][2] = "Those obstructions now assign two detectors rather than one. The binary Igusa character embeds only as loop holonomy zero or pi; both values are reciprocal and make the three-mode directional odd channel vanish, so that sign belongs in a referenced interferometer. The full spin-sector vector retains more: under a first-handle modular T transformation, four free-Majorana sectors acquire an eighth-root phase even though it cancels in the determinant. This supplies a conditional no-fit three-mode target of plus or minus pi over four. The complete Baby-Monster multiplier and the physical modular-to-control-loop map remain capable of cancelling it, so the result is a sharpened experiment rather than a new-physics prediction.";

const admissibilitySections = chapterSkeletons
  .find(chapter => chapter.slug === "08-admissibility-frontier")
  .sections;
const orientedSeamIndex = admissibilitySections
  .findIndex(([heading]) => heading === "Hot off the press — the oriented seam becomes an experiment");
admissibilitySections.splice(orientedSeamIndex + 1, 0, [
  "Hot off the press — the mixed interface has an exact shape",
  [
    "The 27 typed relations divide into twelve constructive moves and fifteen guardrails. Their incidence images overlap on nine jointly reachable structures with one zero-sum condition. The resulting integral interface is the A8 root lattice: eight adjacent transfers running from detector and holonomy through memory, wall, response, overlap, selection and provenance.",
    "With the equal-weight vertex pairing the interface is positive definite, has determinant nine and discriminant group Z9. It carries a natural permutation-invariant cubic, but the product obtained by projecting coordinate multiplication back to the zero-sum space is not Jordan. The result is therefore a definite transfer lattice, not an octonion, Leech, E6 or E8 identification and not a physical A8 symmetry.",
    "The shape now terminates in decisions. The wall-response return gives one bounded three-step proposal with a positive Hessian and contractive update; the selection-memory-holonomy return is refused at the missing orientation lift. All twelve constructive arrows, fifteen guardrails and twelve return cycles have detector, nuisance, falsifier and reopening fields. Redundant routes, internal guardrails, edge subdivision and evidence-only enrichment preserve A8; a genuine new bridge expands it predictably to A9.",
    "The same typed discipline prevents a false cross-carrier closure. Exhausting the pinned Claimipedia relationship, programme, evidence and provenance operators yields semisimple Lie content sl2 plus sl3, not sp4. The knowledge graph does not secretly reproduce the physics symmetry; a new evidence-bound cross-operator on one shared carrier is the exact reopening datum.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 2, 0, [
  "Hot off the press — a lost sign becomes a detector",
  [
    "The newest cross-carrier bridge is deliberately small. A proposed three-overlap sign loop in Claimipedia would be classified by a binary return product, but the present knowledge graph does not contain the required overlaps or transition signs. The science programme already contains the same detector shape on a different carrier: a response projector returns while its coherently marked two-frame comes back through the central transport -I2.",
    "The exact map sends central endpoint transports +I2 and -I2 to binary signs +1 and -1. It preserves composition, and a second traversal squares the negative return to +I2. Projector-only detection erases the sign, while determinant also misses it because det(-I2)=+1. A successful measurement therefore needs projector closure plus coherently referenced endpoint-frame tomography and a one-loop/two-loop parity control.",
    "This result reuses the EX-006 photonic, microwave or acoustic detector packet, but corrects its discriminator: a central -I2 return is reversal-even, unlike a generic reversal-odd non-Abelian holonomy. An engineered success validates the detector architecture. New physics requires a source-native prediction, nuisance survival and replication; the physical result cannot manufacture Claimipedia's missing authored overlaps.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 3, 0, [
  "Hot off the press — the missing middle has a type",
  [
    "**Provisional integration note — 24 October 2026.** The natural three-branch kenotic cover does not contain a hidden loop: before removing its junction the cover is a filled triangle, and afterwards it is three disconnected pieces. Its exact residue is therefore a two-dimensional reduced H0 cut signature, not a nonzero H1 winding class. A genuine sign holonomy still requires three independently evidenced pairwise overlaps and authored transition rules that the present graph does not contain.",
    "The nearest algebraic replacement for a missing common symmetry is a typed one-way passage. A two-state carrier and a three-state carrier with a rectangular mediator form the (2,3) parabolic subalgebra of sl5: the internal sl2 and sl3 transformations remain distinct, while a six-dimensional off-diagonal module carries information between them without becoming an invertible symmetry. Freely adding the reverse block closes to all of sl5, not sp4. This rules out obtaining the science programme's C2 hinge merely by reversing the relation.",
    "The corpus already contains a rank-two partial-sewing map from two channels into a three-dimensional environment. Under the standard sl2 plus sl3 action, that one map is cyclic: its orbit spans the full six-dimensional bifundamental module. The missing result is now narrower and more physical. The two port spaces have not been identified with the particular captured Claimipedia carriers, and no independent dynamics or boundary datum selects the observed map from its continuous orbit. A separate positive three-port model shows how locally real faces, a globally complex loop and Schur elimination can leave phase-bearing memory. The next test is the source-bearing carrier-identification square, selector provenance and a phase-sensitive retained-path measurement—not another dimension match.",
    "The balance among admission, transport and selection is exact in this local model. Under the full complex endpoint group every rank-two rectangular map belongs to one open orbit, so Lie motion alone cannot distinguish the observed channel. Retaining the positive metric makes the two eigenvalues of the Gram matrix E-dagger E invariant under admissible unitary frame changes. Dynamics or boundary data must still select one metric-positive point. Lie supplies the available motion, positivity supplies observable distinctions and dynamics must supply realization.",
    "Admissibility still does not choose its own objective. On the same Gram disk, full-environment volume selects the centre, nearest-origin objectives select zero when it is allowed, and minimum implementation dimension selects a boundary circle. The correct order is variables, feasible region, correctly typed objective, then selected point or attractor. A cone can be prior to a particular action without secretly determining that action.",
    "The selected-point classes are experimentally separable. Phase-referenced L, R, L+R and L+iR preparations reconstruct two compressed transfers and their complex coherence. The normalized distance from the Gram-disk centre is zero for full-environment volume, one on the minimum-rank boundary and 25/256 for the nearest-origin point in the exact checkpoint. A violation of the disk rejects the shared-environment architecture; an intermediate nonspecial point rejects these pure point selectors. Physical port identification and a platform noise model remain open.",
    "The rectangular channel now has an exact global home. Its graph is a moving two-plane in Gr(2,5), the opposite big cell of the same parabolic whose one-way radical appeared locally. Rank loss of the rectangular map lies inside this chart; loss of transversality lies on the Pluecker chart boundary. This globalizes the carrier geometry without identifying any Grassmannian plane with a physical vacuum.",
    "A second type correction limits the detector claim. The determinant of the full three-ray environment Gram matrix is maximized at the causal centre, while the determinant of the two conditioned channel columns is maximized at the origin when that point is admissible. The latter then collides with the nearest-origin entropy selector: endpoint tomography measures the selected point but cannot identify which of those principles selected it. That distinction requires an independently predicted path, intervention or thermodynamic record.",
    "The two selector points occupy different symmetry strata. The isotropic channel keeps a diagonal rotation, while the causal-centre checkpoint has unequal singular values and no connected stabilizer in the real locking model. A minimal unspurioned quartic selects isotropy or stays flat in anisotropy; an isolated unequal pair requires a sourced axis or reflection datum. The causal construction therefore cannot inherit the old locking symmetry for free.",
    "There is now an exact conditional route from the five-dimensional A4 envelope back to the Spin(2,3) hinge. A signature-(2,3) form pairs each forward rectangular channel with its adjoint reverse, and the six paired cross directions generate all ten directions of so(2,3), isomorphic to sp(4,R). The price is exact: the captured sl2+sl3+gl1 diagonal structure reduces to so2+so3, and a full sl3 cannot survive in the five-dimensional orthogonal algebra. The missing physical result is a derivation of the indefinite form and adjoint rule, not another group-name match.",
    "Representation type makes the remaining endpoint bridge small but not canonical. After choosing actions, the three-carrier identification retains two equivariant scales, four normalized real sign choices and six labelings; the two-carrier identification is unique only up to a phase. One provenance-bearing observable or authored record must fix those labels, bases and relative phases before the indefinite form and adjoint pairing can become a physical construction.",
    "The selector fork also admits an exact reduced dynamics. A convex competition selects every point between the causal centre and isotropic endpoint, while first-order relaxation predicts a frequency-dependent lag loop rather than true hysteresis. Every nonzero constant mixture inherits the centre's causal pole obstruction, leaving the silver value as the unique nonzero same-chart repair. This completes the abstract six-part channel programme; further progress requires source-derived coefficients and metric data or physical measurement.",
  ],
]);

const optionalTheologySection = chapterSkeletons
  .find(chapter => chapter.slug === "12-optional-endpoints-and-readings")
  .sections.find(([heading]) => heading === "Theology under a declared assumption");
optionalTheologySection[1].push("The pinned Claimipedia graph offers one bounded picture of presence without domination. Its principal kenosis node supports three undirected cycle classes and is an articulation, yet the authored arrows flow through it without directed return. Under the chapter's declared theological premises this may picture a load-bearing junction that does not force every relation to circulate around itself. The exact result remains graph topology: the node is present, not a puncture. The natural three-branch cover also has a filled triangular nerve and vanishing constant-coefficient H1, so matching scalar data glue uniquely. The smallest exact reopening template replaces that cover with three distinct pairwise overlaps and transition signs: product +1 permits a global nonzero marker, while product -1 returns it reversed. This is proposed new data, not an extraction; the current graph supplies neither the overlap loop nor its transitions, and no divine referent follows from either construction.");

// The interpretive contract precedes every group-centred construction. Slugs retain
// their stable historical identifiers; reading order expresses explanatory priority.
const readingOrder = ["00-front-matter", "08-admissibility-frontier", "01-the-revised-spine"];
chapterSkeletons.sort((a, b) => {
  const ai = readingOrder.indexOf(a.slug);
  const bi = readingOrder.indexOf(b.slug);
  if (ai >= 0 || bi >= 0) return (ai >= 0 ? ai : readingOrder.length) - (bi >= 0 ? bi : readingOrder.length);
  return 0;
});

const chapterExpansions = {
  "00-front-matter": [
    ["A book of layers", ["A ruler can tell you the length of a table without telling you why the table exists. A compass can preserve a direction without choosing which direction should count as north. Much of this programme has the same layered character. It contains exact measuring structures, conditional mechanisms and proposed physical interpretations. The reader should not flatten those layers into one claim.", "Each chapter therefore moves in the same order: ordinary picture, defined object, exact result, and authority boundary. A term such as symplectic is introduced only after the familiar idea it formalizes: preserving oriented area in a phase-space plane. A term such as chirality is introduced only after the familiar idea: left- and right-handed patterns cannot always be superposed by rotation."]],
    ["Four labels used throughout", ["Established means that a calculation follows from its written assumptions and has an executable or inspectable certificate. Conditional means that a construction works after a named field, coefficient, boundary condition or control is supplied. Externally open means that the missing ingredient is not contained in the current corpus. Internally exhausted means that further rearrangement of the same ingredients no longer addresses the missing datum.", "None of these labels means true of nature. Even an exact theorem can describe the wrong physical system. Conversely, a blocked physical programme can contain useful mathematics, simulation tools and experimentally transferable methods."]],
    ["The route through the book", ["The admissibility frontier comes first because it identifies the changed route to discovery: recover distinctions that ordinary measurements erase, then trace their admission, dynamics and detection. The following chapters build one exact Jordan-to-Lie rank-two hinge from response measurements and relational loops before asking whether it can carry Standard-Model matter, safe interactions or exceptional structure. The result ledger records positive findings and reversals; the research frontier ends in controlled experiments and explicit reopening conditions rather than in a larger symmetry slogan."]],
    ["Things before names", ["Begin with the preparation, response table, path, boundary, update or detector record before introducing the algebraic name that compresses it. Show what can be done to the thing and what remains unchanged. Technical language then becomes earned precision rather than an entrance fee.", "For example, two coupled readouts and their nonnegative response come before H₂(ℝ); eliminating a hidden component comes before the Schur complement and Jordan triple; transport around a loop and a changed return come before holonomy."]],
    ["Every bridge carries a reason", ["Two technical nouns placed beside one another do not explain their relationship. Every material bridge must say why the things are alike, why they differ, what produces the difference, whether its mathematical and physical parts are open or closed, what follows, what does not follow and which calculation or observation would decide the remainder.", "The compact grammar is because—but—therefore—still open. An unlabeled arrow, shared name, repeated number or similar diagram is a prompt to investigate, not a completed bridge."]],
    ["Pictures and speculation are optional", ["Landscape, grammar, network, workshop, ecological, mythic and theological pictures may be offered after the reason-bearing core. They form a menu, not a ladder of belief: a reader may use the theorem or experiment while rejecting every optional interpretation.", "A picture must pass deletion and substitution tests. Removing it or replacing it with another picture must leave the typed objects, reason, status, implication and test unchanged; otherwise it carries a hidden premise."]],
  ],
  "01-the-revised-spine": [
    ["Begin with a measuring frame", ["Imagine recording two coupled signals: two voltages, two oscillator amplitudes or two stress readouts. Their self-responses and cross-response form a symmetric two-by-two table. Requiring every real combination of the signals to have nonnegative power makes that table positive. This positive cone is the everyday entrance to H2(R), the Jordan algebra of real symmetric two-by-two matrices.", "The Jordan product X∘Y=(XY+YX)/2 keeps the result symmetric even when ordinary matrix multiplication does not. It is useful when the object of interest is a state or response cone rather than an ordered sequence of operations."]],
    ["From elimination to symmetry", ["When an internal degree of freedom is removed from a coupled quadratic system, the effective response is a Schur complement. Repeating that operation produces the same triple combination that appears in Jordan theory. The Tits–Kantor–Koecher construction then packages translations, linear transformations and their opposites into a graded Lie algebra.", "For the declared carrier, the closure is ten-dimensional sp(4,R). This algebra preserves a nondegenerate oriented-area form on four real phase-space coordinates. A standard low-rank isomorphism identifies its connected group with Spin0(2,3), the double cover of the identity component of SO(2,3)."]],
    ["Why ten generators are a real gate", ["Four real coordinates do not automatically imply sp(4,R). A pair of ordinary oscillators can explore only a three-generator squeezing/rotation subalgebra. Reaching ten requires independently available anisotropies and shears. The corpus therefore treats generator rank as a kill test: if commutators close at three, the model is a lower-rank control, not hidden full Spin(2,3)."]],
    ["Algebra is not yet spacetime", ["A symmetry can act on response coordinates without acting on physical events. Calling the response cone spacetime would require a Lorentzian state space, causal localization, a physical inner product and a map to measured rods and clocks. The current result establishes an exact algebraic hinge and deliberately stops before that interpretation."]],
  ],
  "02-one-carrier-two-faces-three-relations": [
    ["Why two is comparison and three is consistency", ["Two rulers can disagree, but the disagreement is only pairwise. Add a third ruler and one may compare 1 with 2, 2 with 3, and 3 back with 1. The final comparison can fail to return to the starting convention. Three is therefore the smallest cycle that can store a relational defect.", "This is the grounded meaning of the programme's recurring three. It is not a numerological claim that every appearance of three has one cause. The number can count edges of a minimal loop, components of a response cone, families, or a bundle degree; a valid bridge must say which object is being counted and which map preserves the count."]],
    ["Faces and the off-diagonal channel", ["A two-by-two response has two diagonal entries—its faces—and one off-diagonal channel connecting them. Positivity constrains the channel by the two faces, just as the diagonal length of a rectangle is constrained by its sides. Peirce decomposition is the algebraic name for separating those diagonal and connecting pieces.", "The Schur complement then describes what the outside observer sees after an internal face is hidden. This makes the recursion operational: eliminate, update the response, and ask which structure survives."]],
    ["Three relations do not select an orientation", ["A triangle can be traversed clockwise or anticlockwise. The unoriented graph does not choose between them. This simple fact reappears at the selector gate: symmetric endpoint data cannot select a non-fixed orientation. A boundary normal, historical preparation, complex phase reference or other odd datum must be physically supplied and locally coupled."]],
    ["The graph result", ["A scaled cycle graph canonically isolates a real first-harmonic plane under refinement, but leaves an O(2) basis ambiguity. Symmetric controls generate only the common-oscillator sp(2,R). Three addressed anisotropies can generate full sp(4,R), but the addresses are control data, not consequences of the cycle. The graph lane therefore reaches conditional response symmetry, not emergent spacetime."]],
  ],
  "03-projective-loop": [
    ["A familiar twisted-loop picture", ["Write an arrow on a strip of paper, give the strip a half twist, and join the ends. After one circuit the arrow returns reversed; after two it returns fully. A projective double cover records this without pretending that the paper moved through an extra physical dimension.", "The programme's three-placement loop behaves similarly. Local transitions can be consistent while their product returns a central sign. Lifting the triangle to a six-cycle makes the sign bookkeeping single-valued, and a twelve-step marked transport can return every decoration."]],
    ["Central sign versus handedness", ["Multiplying every vector by minus one changes its sign but preserves the orientation of an even-dimensional frame. Handedness instead changes under a reflection with negative determinant. This is why a central -I holonomy cannot simply be called chirality.", "The distinction is not pedantry. A physical selector must couple to something that actually changes under the proposed exchange. If the candidate datum is even, no amount of suggestive language makes it an orientation source."]],
    ["From topology to a defect", ["A topological label can remember how a loop was prepared, but a localized laboratory mode also needs a place to live. The charge-three Higgs sector has a precise level-three BF limit, yet its apparent phase vacua are gauge copies and cannot make a domain wall. Adding a neutral Z2 field supplies an explicit kink and one localized even bosonic reader.", "This cleanly separates memory from hardware: BF theory carries the sector label; the gapped reader carries non-topological dynamics; and the wall's origin remains an external microscopic question."]],
  ],
  "04-furey-interface": [
    ["What a representation does", ["A representation is a way for an abstract symmetry to act on a concrete list of states. The familiar example is rotating an arrow by multiplying its coordinate vector by a matrix. Furey's division-algebra constructions similarly organize particle-like states and ladder operations using complex numbers, quaternions and octonions.", "The present programme does not claim that the names of those algebras make the particles inevitable. It asks the narrower question: can a specifically typed Furey-shaped channel act on the response carrier and close the missing generators?"]],
    ["The exact participation result", ["The answer is yes inside the declared finite model. A continuous Furey product rotation, combined with the Jordan translations and grading operations, generates all ten directions of sp(4,R). The word continuous matters: a discrete relabelling does not supply the infinitesimal generator needed for Lie closure."]],
    ["The selector problem", ["The algebra admits paired matter constructions related by conjugation. Symmetric endpoint-blind data cannot choose one member of the pair. Audits of CP, CPT, residual Z3, boundary orientation, Yukawa phases, a sterile Majorana term and the index-three construction leave a continuous phase circle unfixed.", "The smallest named remedy is a physical complex reference with charge minus two, together with a local portal that locks it to the charged carrier. Until that reference is derived or measured, the matter selection is a conditional decision rule rather than an outcome of the theory."]],
  ],
  "05-standard-model-seam": [
    ["What c, L and Y mean", ["In the Standard-Model algebra su(3)c⊕su(2)L⊕u(1)Y, c labels colour, the three-way charge carried by quarks; L labels the weak interaction acting on left-handed doublets; and Y is hypercharge, the bookkeeping quantity which combines with weak isospin to give electric charge. These labels are directions in an internal measuring system, not ordinary colours, locations or heights.", "The direct-sum sign means that these symmetry instructions coexist. It does not say that a larger group has already explained why nature chose them or why matter occupies its observed chiral representations."]],
    ["Fit capacity versus derivation", ["A sufficiently flexible effective action can reproduce Standard-Model masses and mixing parameters. That demonstrates compatibility, much as an adjustable curve can pass through many points. It does not predict the points. The current decoupling limit has ample flavour capacity, so its success is a consistency witness rather than a derivation."]],
    ["The chiral fold obstruction", ["A mirror turns a left glove into a right glove. Likewise, spatial reflection exchanges left- and right-handed Weyl spinors. The bosonic fold can have healthy masses and residues while the fermionic theory remains undefined, because the undoubled chiral Standard Model does not supply the same-representation partner required by the reflection.", "The next valid object is therefore not another positive bosonic spectrum. It is a declared fermion boundary domain—bag, APS/inflow, vectorlike or another explicit construction—followed by self-adjointness, gauge consistency and BRST cohomology on that same domain."]],
    ["Three generations and the index", ["An index is a robust signed count of zero modes, rather like counting unmatched left-moving and right-moving lanes after paired lanes cancel. The selected-projector completion canonically pulls back the anticanonical line on CP1 to O(3), giving Dirac index three for every spectator Standard-Model multiplet.", "That is the programme's strongest typed bridge to three families. Its minimal local six-dimensional realization is nevertheless anomalous, and the obvious vectorlike repair restores mirror families. The bundle explains a count; it does not yet provide an acceptable parent theory."]],
  ],
  "06-proton-safety": [
    ["Why a multiplet brings unwanted companions", ["Buying a complete toolkit gives both the tool you wanted and the tools packed beside it. Unified gauge multiplets behave similarly: symmetry relates desired leptoquark interactions to diquark partners capable of destabilizing the proton. The problem is not merely finding a useful mediator but explaining why its dangerous companions are absent or ineffective."]],
    ["From continuous charges to triality", ["The simplest family-universal extra U(1) charges collapse to familiar combinations and do not isolate the safe source. A universal binary sign also fails for three families because of a weak anomaly. The first surviving cyclic construction is a Z9 lift whose observable gauge quotient is baryon triality.", "A quotient here is like identifying clock readings that differ by a full turn: the larger bookkeeping group retains information needed for anomaly cancellation even when the low-energy observer sees only three classes."]],
    ["The current action and its limits", ["The typed candidate action now separates BF memory, defect, reader, bosonic bulk, fermion capacity and response terms. A frozen point is healthy in all defined local bosonic sectors. Its classical stress tensor is also known term by term, with the pure BF term carrying no metric stress.", "The remaining gaps are not a vague request for more elegance. They are a microscopic wall origin, a chiral fermion domain, a phase reference, an anomaly-free family operator, curved stress matching, an interacting spectrum and a device-specific signal."]],
  ],
  "07-exceptional-horizon": [
    ["E8 as a crystal rather than a slogan", ["A crystal can be described by its rotations, translations, vibration modes and reciprocal lattice. None of those descriptions alone is the crystal, yet each reveals a real aspect. The charitable E8 reading is similar: exceptional groups may organize compatible slices of one structure without every subgroup being a literal fundamental force.", "This avoids two opposite mistakes. One is to assume that embedding the Standard Model in a larger Lie group automatically derives chirality, generations and dynamics. The other is to dismiss exceptional structure because a particular Lie-algebra enlargement fails phenomenologically."]],
    ["Jordan freedom and the need for selectors", ["Jordan algebras organize observables and positive state cones particularly well. Their strength is also their danger: many embeddings, real forms and idempotent choices are available. Without a selector, the theory can describe a landscape of possible measuring frames without choosing the one realized.", "Lie and Jordan methods are therefore not competing religions. Lie algebra controls infinitesimal symmetry; Jordan structure controls compatible observables and positivity. Both can be epistemically incomplete even if an underlying exceptional object is real."]],
    ["The corrected octonionic two-branch model", ["The audited two-branch flow illustrates the discipline required. Its manuscript used the wrong invariant and phase symmetry, overcounted fixed points and treated instantaneous regions as persistent basins. After correction, the equations admit an exact two-mode squeezing Hamiltonian and completely positive loss model.", "The resulting three bilinears form an SO(2,1) cone, while the four-real amplitude flow is conformally symplectic. Its Lie closure remains three-dimensional sp(2,R), not ten-dimensional sp(4,R). This is a useful open-system model and lower-rank control—not a derivation of fundamental Spin(2,3)."]],
    ["Where the exceptional programme actually stands", ["H2(R), J3(O), E6, E7, E8, lattice constructions and moonshine occupy adjacent but non-identical levels. A legitimate continuation must specify a carrier map, preserve a stated invariant and end in an observable or a no-go test. Shared numbers and nested group names are clues for investigation, not evidence by themselves."]],
  ],
  "10-provenance-and-reading-map": [
    ["How to challenge a claim", ["Start with the claim's boundary sentence, then open its controlling source and executable verifier. Check whether the mathematical object is the same on both sides of every arrow: the same field space, symmetry action, domain and normalization. Many attractive false bridges change one of those silently.", "For a physical claim, also ask what prepared the state, what the measuring port couples to, which limits are taken and whether the quoted response belongs to the stated dynamics. The QWZ audit is the model example: the numerical quadrature was correct, but the stationary state of the written bath made the claimed response vanish."]],
  ],
  "11-concept-atlas": [
    ["A compact vocabulary", ["Carrier: the concrete space on which transformations act. Selector: a physical rule that chooses one option from a symmetric family. Domain: the boundary and regularity conditions that make an operator well defined. Residue: the strength with which a mode appears in a response. Anomaly: an obstruction that appears when a classical symmetry is required to survive quantization.", "These words name different jobs. A carrier does not select itself; a positive spectrum does not define a boundary domain; an index does not cancel an anomaly; and an experimental sensitivity does not predict a residue."]],
  ],
};

const chapterSources = {
  "00-front-matter": ["1453_genuine_exhaustion_leaves_no_untyped_internal_work_but_seven_named_external_or_conditional_frontiers.md", "1788_all_finite_escapes_from_the_minimal_connection_parent_now_end_at_new_model_construction.md"],
  "01-the-revised-spine": ["1023_the_gaussian_gram_selector_is_the_h2r_jordan_logdet_barrier_and_a_peirce_slice_of_the_rank_three_cubic.md", "1058_a_three_generator_jordan_furey_recursion_closes_all_of_sp4_but_requires_the_furey_channel_rotation_as_a_continuous_flow.md", "1282_the_graph_to_spin23_lane_is_internally_exhausted_at_conditional_response_symmetry_not_spacetime.md"],
  "02-one-carrier-two-faces-three-relations": ["202_peirce_schur_triple_recursion_to_spin23.md", "1280_a_cycle_graph_selects_a_refinement_stable_real_two_mode_plane_but_not_its_orientation.md", "1281_full_sp4_closure_requires_addressed_anisotropy_which_is_control_data_not_cycle_symmetry.md"],
  "03-projective-loop": ["994_the_three_placement_triangle_has_a_z2_sideband_frustration_and_requires_path_dependence_or_a_double_cover.md", "1233_charge_three_abelian_higgs_reduces_conditionally_to_level_three_bf_and_a_gapped_unit_charge_reader_can_coexist_only_as_non_topological_memory.md", "1292_a_neutral_z2_kink_is_the_minimal_defect_origin_and_one_even_charge_one_boson_localizes_without_mirror_doubling.md"],
  "04-furey-interface": ["69_furey_weak_jordan_ladder_spin23.md", "1058_a_three_generator_jordan_furey_recursion_closes_all_of_sp4_but_requires_the_furey_channel_rotation_as_a_continuous_flow.md", "1059_the_linear_furey_product_FCp_exponentiates_exactly_to_the_missing_continuous_sp4_channel_rotation_but_its_action_term_is_open.md", "1060_a_positive_first_order_response_pulse_generates_the_full_furey_channel_flow_without_bulk_degeneracy_but_needs_microscopic_charge_completion.md", "1395_no_declared_cp_boundary_z3_flavor_or_index_datum_fixes_the_a5_sterile_phase_reference.md"],
  "05-standard-model-seam": ["1390_a_decoupling_limit_can_fit_the_standard_model_but_a6_first_fails_at_the_unconstructed_chiral_fermion_operator.md", "1450_the_o3_twisted_cp1_operator_has_exactly_three_universal_chiral_zero_modes_but_its_minimal_local_six_dimensional_parent_is_anomalous.md", "1451_the_maximal_a4_action_freezes_all_bulk_poles_but_the_chiral_fold_has_no_declared_physical_state_domain.md"],
  "06-proton-safety": ["1079_NCG_Pati_Salam_Model_C_realizes_the_safe_source_split_but_its_minimal_left_right_pair_still_closes_the_Wilson_triangle.md", "1092_the_Z9_extension_not_its_naive_mod3_reduction_realizes_baryon_triality_and_matches_the_Dai_Freed_mod9_anomaly.md", "1199_minimal_typed_closure_action_v1_separates_the_derived_bf_sector_from_the_still_spurionic_flavour_response.md"],
  "07-exceptional-horizon": ["33_octonions_leech_lattice_jordan_branch.md", "1455_the_corrected_octonionic_two_branch_flow_has_an_exact_cp_lindblad_completion_and_a_three_coordinate_lorentz_cone_but_not_full_spin23.md"],
  "08-admissibility-frontier": ["corpus/syntheses/the_admissibility_frontier_current_synthesis.md", "corpus/programmes/admissibility/admissibility_07_zone_known_unknown_frontiers.md", "corpus/programmes/admissibility/admissibility_25_current_research_frontier_crosswalk.md", "corpus/programmes/frontier-physics-targets/frontier_experiment_atlas_v1.md", "corpus/programmes/lattice-subroutine-gravity/monster-fermionization-bridge.md", "corpus/programmes/lattice-subroutine-gravity/period-matrix-jordan-boundary-gate.md", "corpus/programmes/lattice-subroutine-gravity/three-mode-loop-seam-preflight.md", "corpus/programmes/lattice-subroutine-gravity/modular-sign-detector-reassignment.md", "corpus/programmes/lattice-subroutine-gravity/metaplectic-phase-candidate.md", "corpus/programmes/frontier/wave-7/frontier_wave7_39_mixed_interface_resolution.md", "corpus/programmes/frontier/wave-7/frontier_wave7_39_programme_a2_double_centralizer_and_c2_no_go.md", "corpus/programmes/frontier/wave-7/frontier_wave7_40_claimipedia_operator_exhaustion_and_sp4_gate.md", "corpus/programmes/frontier/wave-7/frontier_wave7_41_two_cross_carrier_vertical_slices.md", "corpus/programmes/frontier/wave-7/frontier_wave7_42_instrumented_admissibility_atlas.md", "corpus/programmes/frontier/wave-7/frontier_wave7_43_sourcery_ale_algebra.md", "corpus/programmes/frontier/wave-7/frontier_wave7_44_refinement_stability_of_the_mixed_interface.md", "corpus/programmes/frontier/wave-7/frontier_wave7_47_kenotic_enriched_loop_reopening_template.md", "corpus/programmes/frontier/wave-7/frontier_wave7_48_sign_holonomy_physical_detector_bridge.md", "corpus/programmes/frontier/wave-7/frontier_wave7_49_kenotic_cover_h0_signature_and_h1_no_go.md", "corpus/programmes/frontier/wave-7/frontier_wave7_50_a1_a2_parabolic_kenotic_envelope.md", "corpus/programmes/frontier/wave-7/frontier_wave7_51_three_port_wick_kenosis_bridge.md", "corpus/programmes/frontier/wave-7/frontier_wave7_52_rectangular_mediator_candidate_audit.md", "1004_the_weighted_furey_root_is_a_flat_horizontal_double_cover_of_its_projector_circle_with_central_minus_identity_holonomy.md", "997_a_local_conservative_real_interface_network_realizes_the_nested_c12_transport_as_antiperiodic_six_cycle_holonomy.md"],
  "08-result-ledger": ["1398_final_wave_red_team_audit_finds_two_substantive_errors_and_preserves_four_independent_stopping_boundaries.md"],
  "09-research-frontier": ["1453_genuine_exhaustion_leaves_no_untyped_internal_work_but_seven_named_external_or_conditional_frontiers.md", "1456_the_two_zenodo_preprints_strengthen_response_controls_but_do_not_change_the_terminal_gate_partition.md", "1624_the_reopened_mass_gap_action_and_shared_scale_programme_reaches_five_irreducible_gates.md", "1788_all_finite_escapes_from_the_minimal_connection_parent_now_end_at_new_model_construction.md"],
  "10-provenance-and-reading-map": ["00_research_document_map.md", "30_research_frontier.md", "49_multi_branch_research_registry.md"],
  "11-concept-atlas": ["40_grand_synthesis_spin23_pole.md"],
  "12-optional-endpoints-and-readings": ["corpus/syntheses/admissibility_optional_endpoints_mythic_and_theological_readings.md", "corpus/syntheses/kenotic_governance_tri_omni_theism_and_a_lawful_world.md", "corpus/programmes/orientation/orientation_architecture.md", "corpus/programmes/frontier/wave-7/frontier_wave7_45_kenotic_pole_topology_audit.md", "corpus/programmes/frontier/wave-7/frontier_wave7_46_kenotic_cover_gluing_no_go.md", "corpus/programmes/frontier/wave-7/frontier_wave7_47_kenotic_enriched_loop_reopening_template.md", "corpus/programmes/frontier/wave-7/frontier_wave7_57_security_selfhood_and_kenosis_as_three_mathematical_roles.md", "corpus/EXPLANATORY_STANDARD.md"],
};

chapterSources["08-admissibility-frontier"].splice(-2, 0,
  "corpus/programmes/frontier/wave-7/frontier_wave7_53_bifundamental_retyping_and_selection_gate.md",
  "corpus/programmes/frontier/wave-7/frontier_wave7_54_metric_selection_on_the_bifundamental_open_orbit.md",
  "corpus/programmes/frontier/wave-7/frontier_wave7_55_channel_selector_atlas_and_entropy_guardrail.md",
  "corpus/programmes/frontier/wave-7/frontier_wave7_56_gram_disk_selector_discriminator.md",
  "corpus/programmes/frontier/wave-7/frontier_wave7_58_grassmannian_globalization_of_the_kenotic_channel.md",
  "corpus/programmes/frontier/wave-7/frontier_wave7_59_two_gram_selector_collision.md",
  "corpus/programmes/frontier/wave-7/frontier_wave7_60_bifundamental_stabilizers_and_quartic_selection.md",
  "corpus/programmes/frontier/wave-7/frontier_wave7_61_spin23_as_an_involutive_reduction_of_the_a4_envelope.md",
  "corpus/programmes/frontier/wave-7/frontier_wave7_62_endpoint_identification_hom_spaces.md",
  "corpus/programmes/frontier/wave-7/frontier_wave7_63_gram_disk_dynamics_and_causal_globalization.md",
  "corpus/programmes/frontier/wave-7/frontier_wave7_64_grassmannian_spin23_channel_terminal_synthesis.md",
);

const chapters = chapterSkeletons.map(chapter => ({
  ...chapter,
  sections: [...(chapter.sections || []), ...(chapterExpansions[chapter.slug] || [])],
  sources: (chapterSources[chapter.slug] || []).map(claimPath),
}));

const proofDetails = [
  {
    slug: "furey-participation-proof",
    title: "Furey participation: closure certificate",
    kicker: "The typed calculation behind the ten-generator claim",
    taxonomy: "established",
    archetype: "auditor",
    claim: String.raw`On the declared four-real-dimensional response carrier, the three typed generators \(\mathcal A\), \(\mathcal H\) and \(\mathcal C\) generate all of \(\mathfrak{sp}(4,\mathbb R)\). The Furey-shaped source product exponentiates to \(\mathcal C\) on the aggregate channel.`,
    ordinary: "Think of three control knobs acting on the same two-channel instrument. One turns phase, one stretches the two channels in opposite ways, and one continuously mixes the channels. The certificate checks that switching these controls in different orders produces ten independent motions—the full set allowed by the declared symplectic carrier.",
    assumptions: [
      ["Carrier", String.raw`\(\mathbb R^2_{\mathrm{phase}}\otimes\mathbb R^2_{\mathrm{channel}}\), with every generator written in the same ordered basis.`],
      ["Preserved form", String.raw`\(\Omega=J\otimes I\), where \(J\) is the two-dimensional quarter-turn matrix.`],
      ["Typed generators", String.raw`\(\mathcal A=J\otimes e_-\), \(\mathcal H=K\otimes D\) and \(\mathcal C=I\otimes\varepsilon\), with \(e_-=(I-D)/2\).`],
      ["Meaning of closure", String.raw`Real linear span after repeated matrix commutators \([X,Y]=XY-YX\).`],
    ],
    steps: [
      String.raw`Commuting \(\mathcal C\) with \(\mathcal A\) supplies \(J\otimes X\); commuting once more supplies \(J\otimes D\). Combining \(J\otimes D\) with \(\mathcal A\) supplies \(J\otimes I\).`,
      String.raw`Commuting \(\mathcal C\) with \(\mathcal H\) supplies \(K\otimes X\).`,
      String.raw`The phase turn \(J\otimes I\) rotates \(K\) into \(X\), supplying \(X\otimes D\) and \(X\otimes X\).`,
      String.raw`Further commutators supply \(K\otimes I\) and \(X\otimes I\). Together with the original terms, these form \(I\otimes\varepsilon\) plus \(\{J,X,K\}\otimes\{I,X,D\}\).`,
      String.raw`Those ten matrices are linearly independent and preserve \(\Omega\). Since \(\dim\mathfrak{sp}(4,\mathbb R)=10\), the generated algebra is exactly \(\mathfrak{sp}(4,\mathbb R)\).`,
    ],
    ablations: [
      [String.raw`Remove \(\mathcal A\)`, "3", "The Jordan translation is necessary."],
      [String.raw`Remove \(\mathcal H\)`, "4", "The split dilation is necessary."],
      [String.raw`Remove \(\mathcal C\)`, "4", "The continuous channel rotation is necessary."],
      ["Keep all three", "10", String.raw`Full \(\mathfrak{sp}(4,\mathbb R)\) closure.`],
    ],
    continuation: String.raw`For the source-space product \(G_{\mathrm{src}}=F_Cp\), the certificate checks \(G_{\mathrm{src}}^{\mathsf T}=-G_{\mathrm{src}}\) and \(G_{\mathrm{src}}^2=-I\), hence \(\exp(tG_{\mathrm{src}})=\cos(t)I+\sin(t)G_{\mathrm{src}}\). The aggregate map \(A\) obeys \(AG_{\mathrm{src}}=\varepsilon A\), so \(A\exp(tG_{\mathrm{src}})=\exp(t\varepsilon)A\). Realification is precisely the channel generator \(\mathcal C\).`,
    boundary: "This proves an algebraic participation result on the stated carrier. It does not derive the source product from a local microscopic action; establish gauge, Lorentz or canonical-anticommutation consistency; select a vacuum; recover the Standard Model; or show that nature realizes this carrier.",
    certificates: [
      "verification/generate/generate_full_sp4_from_turn_split_dilation_and_channel_rotation.mjs",
      "verification/exponentiate/exponentiate_the_furey_response_product_into_the_sp4_channel_flow.mjs",
      "verification/verify/verify-furey-weak-jordan-ladder.mjs",
    ],
    sources: [
      "1058_a_three_generator_jordan_furey_recursion_closes_all_of_sp4_but_requires_the_furey_channel_rotation_as_a_continuous_flow.md",
      "1059_the_linear_furey_product_FCp_exponentiates_exactly_to_the_missing_continuous_sp4_channel_rotation_but_its_action_term_is_open.md",
      "1060_a_positive_first_order_response_pulse_generates_the_full_furey_channel_flow_without_bulk_degeneracy_but_needs_microscopic_charge_completion.md",
      "69_furey_weak_jordan_ladder_spin23.md",
    ].map(claimPath),
    backAnchor: "the-exact-participation-result",
  },
  {
    slug: "furey-selector-obstruction",
    title: "Furey interface: selector obstruction",
    kicker: "Why the remaining phase cannot be chosen from the declared data",
    taxonomy: "exhausted",
    archetype: "auditor",
    claim: "Within the declared endpoint-blind data, no CP, CPT, boundary, residual ℤ₃, flavour or index datum canonically selects the sterile phase reference. A new charge-minus-two reference is the minimal typed reopening datum.",
    ordinary: "A perfectly round compass dial does not point north until something outside the dial supplies a north reference. Here the rephasing circle plays the role of the dial: every candidate already in the model moves with, or is blind to, the phase one is trying to choose.",
    assumptions: [
      ["Symmetry", String.raw`A sterile Weyl field may be rephased \(N\mapsto e^{i\alpha}N\).`],
      ["Charged pair", String.raw`The bilinear \(NN\) transforms as \(NN\mapsto e^{2i\alpha}NN\).`],
      ["Target variable", String.raw`A proposed pair phase \(\beta\) therefore shifts as \(\beta\mapsto\beta+2\alpha\).`],
      ["Admissible selector", "It must be built from declared physical data and transform equivariantly; a coordinate convention is not a measurement."],
    ],
    steps: [
      String.raw`Any candidate made only from rephasing-invariant data is unchanged when \(\alpha\) changes.`,
      String.raw`A selected phase \(\beta\) must change by \(2\alpha\) under the same transformation.`,
      "An invariant input therefore cannot define an equivariant point on this phase circle. The mismatch is structural, not a failure to search a longer list of invariant combinations.",
      String.raw`Introducing \(R_2\) with \(R_2\mapsto e^{-2i\alpha}R_2\) makes \(R_2NN\) invariant and defines \(\beta_R=-\arg(R_2)\pmod{\pi}\). This is a valid typed remedy only when \(R_2\) is physically prepared, measured or dynamically derived and locally coupled.`,
    ],
    boundary: "The certificate exhausts the named selector candidates under the declared symmetry action. It is not a theorem that no larger theory can select the phase. The branch reopens if a physical complex reference, its transformation law and a local locking portal are supplied.",
    certificates: [
      "verification/verify/verify_a5_phase_reference_exhaustion.mjs",
      "evidence/data/a5-phase-reference-exhaustion.json",
    ],
    sources: ["1395_no_declared_cp_boundary_z3_flavor_or_index_datum_fixes_the_a5_sterile_phase_reference.md"].map(claimPath),
    backAnchor: "the-selector-problem",
  },
];

const proofLinkBySection = new Map([
  ["04-furey-interface|Why Furey enters", ["furey-participation-proof", "Inspect the typed closure and executable certificates"]],
  ["04-furey-interface|The exact participation result", ["furey-participation-proof", "Inspect the typed closure and executable certificates"]],
  ["04-furey-interface|Why it is not yet unification", ["furey-participation-proof", "See exactly what the certificate does—and does not—establish"]],
  ["04-furey-interface|The selector problem", ["furey-selector-obstruction", "Inspect the symmetry argument, reopening datum and evidence"]],
]);

const sectionEvidenceOverrides = {
  "What closes": ["1058_a_three_generator_jordan_furey_recursion_closes_all_of_sp4_but_requires_the_furey_channel_rotation_as_a_continuous_flow.md", "1059_the_linear_furey_product_FCp_exponentiates_exactly_to_the_missing_continuous_sp4_channel_rotation_but_its_action_term_is_open.md", "47_global_group_isomorphism_sp4r_spin023.md", "202_peirce_schur_triple_recursion_to_spin23.md"],
  "What remains open": ["1282_the_graph_to_spin23_lane_is_internally_exhausted_at_conditional_response_symmetry_not_spacetime.md", "1453_genuine_exhaustion_leaves_no_untyped_internal_work_but_seven_named_external_or_conditional_frontiers.md"],
  "Begin with a measuring frame": ["1023_the_gaussian_gram_selector_is_the_h2r_jordan_logdet_barrier_and_a_peirce_slice_of_the_rank_three_cubic.md", "202_peirce_schur_triple_recursion_to_spin23.md"],
  "From elimination to symmetry": ["202_peirce_schur_triple_recursion_to_spin23.md", "1023_the_gaussian_gram_selector_is_the_h2r_jordan_logdet_barrier_and_a_peirce_slice_of_the_rank_three_cubic.md"],
  "Why ten generators are a real gate": ["1058_a_three_generator_jordan_furey_recursion_closes_all_of_sp4_but_requires_the_furey_channel_rotation_as_a_continuous_flow.md", "1281_full_sp4_closure_requires_addressed_anisotropy_which_is_control_data_not_cycle_symmetry.md"],
  "Algebra is not yet spacetime": ["1282_the_graph_to_spin23_lane_is_internally_exhausted_at_conditional_response_symmetry_not_spacetime.md", "1453_genuine_exhaustion_leaves_no_untyped_internal_work_but_seven_named_external_or_conditional_frontiers.md"],
  "The smallest relational closure": ["994_the_three_placement_triangle_has_a_z2_sideband_frustration_and_requires_path_dependence_or_a_double_cover.md", "1280_a_cycle_graph_selects_a_refinement_stable_real_two_mode_plane_but_not_its_orientation.md"],
  "Jordan recursion": ["202_peirce_schur_triple_recursion_to_spin23.md"],
  "Why two is comparison and three is consistency": ["994_the_three_placement_triangle_has_a_z2_sideband_frustration_and_requires_path_dependence_or_a_double_cover.md", "1128_three_is_the_minimal_Mobius_gear_cycle_and_the_third_relation_of_the_typed_twin_wheels.md"],
  "Faces and the off-diagonal channel": ["202_peirce_schur_triple_recursion_to_spin23.md", "1023_the_gaussian_gram_selector_is_the_h2r_jordan_logdet_barrier_and_a_peirce_slice_of_the_rank_three_cubic.md"],
  "Three relations do not select an orientation": ["1280_a_cycle_graph_selects_a_refinement_stable_real_two_mode_plane_but_not_its_orientation.md"],
  "The graph result": ["1281_full_sp4_closure_requires_addressed_anisotropy_which_is_control_data_not_cycle_symmetry.md", "1282_the_graph_to_spin23_lane_is_internally_exhausted_at_conditional_response_symmetry_not_spacetime.md"],
  "The exact result": ["994_the_three_placement_triangle_has_a_z2_sideband_frustration_and_requires_path_dependence_or_a_double_cover.md", "995_the_unique_connected_double_cover_of_the_placement_triangle_is_the_six_cycle_with_sideband_as_deck_parity.md", "996_the_graded_sideband_antiunitary_lifts_the_six_cycle_to_a_nested_c12_to_c6_to_c3_transport.md"],
  "The reversal": ["1066_the_Wilson_pi_flux_is_the_nontrivial_RP1_line_holonomy_but_its_canonical_frame_lift_is_central_minus_I_not_a_Pfaffian_sheet_flip.md", "1046_the_oriented_area_is_exactly_the_pfaffian_line_of_the_response_root_but_its_microscopic_weak_higgs_identification_remains_open.md"],
  "A familiar twisted-loop picture": ["994_the_three_placement_triangle_has_a_z2_sideband_frustration_and_requires_path_dependence_or_a_double_cover.md", "995_the_unique_connected_double_cover_of_the_placement_triangle_is_the_six_cycle_with_sideband_as_deck_parity.md", "996_the_graded_sideband_antiunitary_lifts_the_six_cycle_to_a_nested_c12_to_c6_to_c3_transport.md"],
  "Central sign versus handedness": ["1066_the_Wilson_pi_flux_is_the_nontrivial_RP1_line_holonomy_but_its_canonical_frame_lift_is_central_minus_I_not_a_Pfaffian_sheet_flip.md", "1047_fixing_the_phase_symplectic_orientation_reduces_the_gram_root_gauge_to_SO2_and_turns_the_pfaffian_sign_into_a_rank_one_separated_Z2_sheet.md"],
  "From topology to a defect": ["1233_charge_three_abelian_higgs_reduces_conditionally_to_level_three_bf_and_a_gapped_unit_charge_reader_can_coexist_only_as_non_topological_memory.md", "1292_a_neutral_z2_kink_is_the_minimal_defect_origin_and_one_even_charge_one_boson_localizes_without_mirror_doubling.md"],
  "The attractive construction": ["1061_the_minimal_sm_field_completion_of_the_furey_channel_pulse_is_a_pair_of_dimension_six_S1_exchange_operators_with_an_underived_relative_phase.md"],
  "The uncomfortable edge": ["1062_one_S1_mediator_cannot_generate_a_pure_FCp_pulse_but_two_orthogonal_copies_realize_the_exact_oriented_star.md", "1074_positive_Spin10_Clebsch_preserving_copies_can_never_remove_the_third_edge_but_a_twisted_two_copy_involution_can.md"],
  "What c, L and Y mean": ["1390_a_decoupling_limit_can_fit_the_standard_model_but_a6_first_fails_at_the_unconstructed_chiral_fermion_operator.md"],
  "Fit capacity versus derivation": ["1390_a_decoupling_limit_can_fit_the_standard_model_but_a6_first_fails_at_the_unconstructed_chiral_fermion_operator.md"],
  "The chiral fold obstruction": ["1451_the_maximal_a4_action_freezes_all_bulk_poles_but_the_chiral_fold_has_no_declared_physical_state_domain.md"],
  "Three generations and the index": ["1397_the_completion_cp1_canonically_inherits_o3_and_index_three_but_no_current_action_makes_it_the_fermion_family_dirac_space.md", "1450_the_o3_twisted_cp1_operator_has_exactly_three_universal_chiral_zero_modes_but_its_minimal_local_six_dimensional_parent_is_anomalous.md"],
  "Complete multiplets are not automatically safe": ["1075_the_unified_vector_triplet_gives_two_FCp_arms_one_safe_extra_and_three_proton_decay_channels_all_with_BminusL_zero.md", "1076_the_proton_safe_current_projector_exists_only_after_breaking_the_pati_salam_colour_lepton_roots.md"],
  "The surviving route": ["1079_NCG_Pati_Salam_Model_C_realizes_the_safe_source_split_but_its_minimal_left_right_pair_still_closes_the_Wilson_triangle.md", "1084_the_minimal_spectral_graph_has_an_all_orders_rank_one_bridge_normal_form_that_forbids_holomorphic_cross_six_mixing.md", "1092_the_Z9_extension_not_its_naive_mod3_reduction_realizes_baryon_triality_and_matches_the_Dai_Freed_mod9_anomaly.md"],
  "Why a multiplet brings unwanted companions": ["1075_the_unified_vector_triplet_gives_two_FCp_arms_one_safe_extra_and_three_proton_decay_channels_all_with_BminusL_zero.md"],
  "From continuous charges to triality": ["1078_no_minimal_family_universal_anomaly_free_U1_can_protect_the_proton_safe_S1_source_mask.md", "1086_for_an_odd_number_of_families_any_universal_Z2_that_splits_leptoquark_from_diquark_triplets_has_the_same_mod_two_weak_anomaly.md", "1087_connected_CKM_and_PMNS_Yukawa_graphs_force_any_exact_diagonal_family_Z2_back_to_the_universal_anomalous_class.md", "1088_Z9_is_the_minimal_family_universal_cyclic_lift_that_protects_triplet_companion_mixing_and_its_three_family_quotient_is_baryon_triality.md", "1092_the_Z9_extension_not_its_naive_mod3_reduction_realizes_baryon_triality_and_matches_the_Dai_Freed_mod9_anomaly.md"],
  "The current action and its limits": ["1199_minimal_typed_closure_action_v1_separates_the_derived_bf_sector_from_the_still_spurionic_flavour_response.md", "1079_NCG_Pati_Salam_Model_C_realizes_the_safe_source_split_but_its_minimal_left_right_pair_still_closes_the_Wilson_triangle.md"],
  "What the local result changes": ["1023_the_gaussian_gram_selector_is_the_h2r_jordan_logdet_barrier_and_a_peirce_slice_of_the_rank_three_cubic.md", "202_peirce_schur_triple_recursion_to_spin23.md"],
  "What it does not collapse": ["33_octonions_leech_lattice_jordan_branch.md", "40_grand_synthesis_spin23_pole.md", "1217_leech_pair_gram_geometry_reaches_spin23_but_needs_an_orientation_twist_and_affine_theta_shift.md"],
  "E8 as a crystal rather than a slogan": ["33_octonions_leech_lattice_jordan_branch.md", "40_grand_synthesis_spin23_pole.md"],
  "Jordan freedom and the need for selectors": ["33_octonions_leech_lattice_jordan_branch.md", "1023_the_gaussian_gram_selector_is_the_h2r_jordan_logdet_barrier_and_a_peirce_slice_of_the_rank_three_cubic.md"],
  "The corrected octonionic two-branch model": ["1455_the_corrected_octonionic_two_branch_flow_has_an_exact_cp_lindblad_completion_and_a_three_coordinate_lorentz_cone_but_not_full_spin23.md"],
  "Where the exceptional programme actually stands": ["40_grand_synthesis_spin23_pole.md", "1217_leech_pair_gram_geometry_reaches_spin23_but_needs_an_orientation_twist_and_affine_theta_shift.md", "1455_the_corrected_octonionic_two_branch_flow_has_an_exact_cp_lindblad_completion_and_a_three_coordinate_lorentz_cone_but_not_full_spin23.md"],
};

const evidenceReading = key => ({
  established: "Audit the declared carrier, assumptions and certificate. The result is exact only within that written scope.",
  conditional: "Identify the named external input and verify that the construction follows after it is supplied.",
  external: "The cited documents locate the boundary; they do not contain the missing physical ingredient.",
  exhausted: "The cited audit records which present candidates were checked and the precise datum required to reopen the branch.",
  obstruction: "Check the assumptions defining the ruled-out candidate class; the no-go does not automatically extend beyond that class.",
  experiment: "Separate predicted signal from sensitivity, calibration and decision protocol.",
  interpretive: "Treat the passage as organization or analogy unless a cited carrier-preserving map is supplied.",
  governance: "Use this passage to inspect provenance, scope and stopping rules rather than as independent physical evidence.",
})[key];

const claimDetails = chapters.flatMap((chapter, chapterIndex) => (chapter.sections || []).flatMap(([heading, paragraphs], sectionIndex) => {
  const specialized = proofLinkBySection.get(`${chapter.slug}|${heading}`);
  const sources = (sectionEvidenceOverrides[heading] || chapter.sources).map(source => source.startsWith("corpus/") ? source : claimPath(source));
  const taxonomyKey = sectionTaxonomy[heading] || chapterTaxonomy[chapter.slug];
  const archetypeKey = sectionArchetype[heading] || chapterArchetype[chapter.slug];
  return paragraphs.map((claim, claimIndex) => ({
    slug: `${chapter.slug}-${anchorId(heading)}-claim-${claimIndex + 1}`,
    chapter,
    chapterIndex,
    heading,
    sectionIndex,
    claim,
    claimIndex,
    claimCount: paragraphs.length,
    sources,
    taxonomy: taxonomyKey,
    archetype: archetypeKey,
    specialized,
  }));
}));

const claimsBySection = new Map();
for (const detail of claimDetails) {
  const key = `${detail.chapter.slug}|${detail.heading}`;
  if (!claimsBySection.has(key)) claimsBySection.set(key, []);
  claimsBySection.get(key).push(detail);
}

const readingKeyUsages = () => {
  const usages = [];
  for (const chapter of chapters) {
    usages.push({ label: `Chapter · ${typeset(chapter.title)}`, taxonomy: chapterTaxonomy[chapter.slug], archetype: chapterArchetype[chapter.slug], html: `${chapter.slug}.html`, markdown: `chapters/${chapter.slug}.md` });
    for (const [heading] of chapter.sections || []) usages.push({ label: `${typeset(chapter.title)} · ${typeset(heading)}`, taxonomy: sectionTaxonomy[heading] || null, archetype: sectionArchetype[heading] || chapterArchetype[chapter.slug], html: `${chapter.slug}.html#${anchorId(heading)}`, markdown: `chapters/${chapter.slug}.md#${anchorId(heading)}` });
  }
  for (const finding of findings) usages.push({ label: `${finding.id} · ${typeset(finding.title)}`, taxonomy: statusTaxonomy(finding.status), archetype: statusArchetype(finding.status), html: `08-result-ledger.html#${finding.id}`, markdown: `chapters/08-result-ledger.md#${finding.id}` });
  for (const frontier of frontiers) usages.push({ label: `${frontier.id} · ${typeset(frontier.title)}`, taxonomy: frontierTaxonomy(frontier.id), archetype: frontierArchetype(frontier.id), html: `09-research-frontier.html#${frontier.id}`, markdown: `chapters/09-research-frontier.md#${frontier.id}` });
  for (const detail of proofDetails) usages.push({ label: `Proof · ${typeset(detail.title)}`, taxonomy: detail.taxonomy, archetype: detail.archetype, html: `details/${detail.slug}.html`, markdown: `details/${detail.slug}.md` });
  for (const detail of claimDetails) usages.push({ label: `Claim · ${typeset(detail.chapter.title)} · ${typeset(detail.heading)} (${detail.claimIndex + 1})`, taxonomy: detail.taxonomy, archetype: detail.archetype, html: `details/${detail.slug}.html`, markdown: `details/${detail.slug}.md` });
  return usages;
};

const readingUsages = readingKeyUsages();
const usagesFor = (field, key) => readingUsages.filter(usage => usage[field] === key);

const chapterVisuals = {
  "00-front-matter": [{ file: "research-archetypes-workshop.png", alt: "Eight collaborators performing complementary research functions around an unfinished map", caption: "A research programme is a relay of functions, not a single heroic viewpoint." }],
  "01-the-revised-spine": [{ file: "spin23-spine.svg", alt: "Infographic tracing coupled measurements through a positive response cone and Jordan-TKK closure to Spin(2,3), with a firewall before physical spacetime", caption: "The exact mathematical spine and the physical firewall." }],
  "02-one-carrier-two-faces-three-relations": [{ file: "one-two-three.svg", alt: "Infographic showing one carrier, two faces and the first closed consistency loop at three relations", caption: "One holds, two compare, three can fail to close." }],
  "03-projective-loop": [
    { file: "projective-lift.svg", afterSection: "The exact result", alt: "Three-stage diagram showing a frustrated triangle, its connected six-cycle double cover, and a twelve-step marked return", caption: "The base triangle stores the obstruction; the six-cycle makes sheet parity single-valued; the twelve-step marked lift returns every decoration." },
    { file: "mobius-return.svg", afterSection: "A familiar twisted-loop picture", alt: "Schematic showing an arrow reversed after one circuit of a half-twisted strip and restored after two circuits", caption: "A half-twist needs two circuits to return both position and arrow orientation." },
    { file: "central-sign-orientation.svg", afterSection: "Central sign versus handedness", alt: "Comparison of central minus identity with positive determinant and a reflection with negative determinant", caption: "Central sign reversal and orientation reversal are different operations: det(−I₂)=+1, while a reflection has determinant −1." },
    { file: "topology-defect-reader.svg", afterSection: "From topology to a defect", alt: "Layered diagram separating topological sector memory, a neutral kink wall, and a localized reader mode", caption: "Memory, wall and reader are three different jobs; the latter two require additional physical structure." },
  ],
  "05-standard-model-seam": [{ file: "standard-model-seam.svg", alt: "Layered diagram separating Standard Model fit, chiral domain, family index and anomaly cancellation", caption: "Compatibility, chirality, family count and anomaly cancellation are separate gates." }],
  "09-research-frontier": [{ file: "terminal-gates.svg", alt: "Terminal gate map grouping A5 and A7 as internally exhausted, A2 and A9 as conditionally constructed, and A4 A6 A11 as externally open", caption: "The terminal partition says where new information must enter." }],
};

const svgAssets = {
  "spin23-spine.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 520" role="img" aria-labelledby="t d"><title id="t">The Spin(2,3) mathematical spine</title><desc id="d">Coupled measurements form a positive response cone, Jordan recursion and TKK closure, followed by a firewall before physical spacetime.</desc><rect width="1200" height="520" fill="#f6f0e6"/><g font-family="Segoe UI,Arial" fill="#172321"><text x="60" y="65" font-size="25" font-weight="700">FROM MEASUREMENT TO THE HINGE</text><text x="60" y="98" font-size="17" fill="#5c655f">Every arrow preserves a declared object; the final dashed arrow remains unproved.</text></g><g stroke="#1f6866" stroke-width="5" fill="none"><path d="M180 270H340M460 270H620M740 270H900"/><path d="M1020 270H1110" stroke="#ad4d34" stroke-dasharray="12 12"/></g><g font-family="Segoe UI,Arial" text-anchor="middle"><g><rect x="60" y="180" width="240" height="180" rx="20" fill="#fffaf1" stroke="#b8aea0"/><text x="180" y="225" font-size="20" font-weight="700" fill="#172321">Coupled signals</text><text x="180" y="260" font-size="16" fill="#5c655f">two self-responses</text><text x="180" y="285" font-size="16" fill="#5c655f">one cross-response</text><circle cx="145" cy="320" r="17" fill="#ad4d34"/><circle cx="215" cy="320" r="17" fill="#1f6866"/><path d="M162 320H198" stroke="#9b6d20" stroke-width="8"/></g><g><rect x="340" y="180" width="240" height="180" rx="20" fill="#fffaf1" stroke="#b8aea0"/><text x="460" y="225" font-size="20" font-weight="700" fill="#172321">H₂(R) positive cone</text><text x="460" y="260" font-size="16" fill="#5c655f">symmetric 2 × 2 responses</text><path d="M410 330L460 245 510 330Z" fill="#1f6866" opacity=".22" stroke="#1f6866" stroke-width="4"/></g><g><rect x="620" y="180" width="240" height="180" rx="20" fill="#fffaf1" stroke="#b8aea0"/><text x="740" y="225" font-size="20" font-weight="700" fill="#172321">Jordan triple + TKK</text><text x="740" y="260" font-size="16" fill="#5c655f">eliminate · update · prolong</text><path d="M690 315q50-80 100 0M690 315q50 55 100 0" fill="none" stroke="#ad4d34" stroke-width="5"/></g><g><rect x="900" y="180" width="240" height="180" rx="20" fill="#fffaf1" stroke="#1f6866" stroke-width="4"/><text x="1020" y="225" font-size="20" font-weight="700" fill="#172321">sp(4,R) ≅ spin(2,3)</text><text x="1020" y="260" font-size="16" fill="#5c655f">ten generators</text><text x="1020" y="288" font-size="16" fill="#5c655f">exact model theorem</text><circle cx="1020" cy="325" r="26" fill="none" stroke="#9b6d20" stroke-width="6"/><path d="M994 325H1046M1020 299V351" stroke="#9b6d20" stroke-width="4"/></g></g><rect x="1090" y="120" width="70" height="300" fill="#ad4d34" opacity=".1"/><text x="1125" y="450" text-anchor="middle" font-family="Segoe UI,Arial" font-size="15" fill="#ad4d34">PHYSICAL FIREWALL</text></svg>`,
  "one-two-three.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 520" role="img" aria-labelledby="t d"><title id="t">One, two and three relational roles</title><desc id="d">One carrier supports a state, two faces permit comparison, and three relations form the first consistency loop.</desc><rect width="1200" height="520" fill="#f6f0e6"/><g font-family="Segoe UI,Arial" text-anchor="middle"><text x="600" y="58" font-size="25" font-weight="700" fill="#172321">ONE HOLDS · TWO COMPARE · THREE TEST CLOSURE</text><g transform="translate(80 130)"><circle cx="150" cy="150" r="100" fill="#ad4d34" opacity=".18" stroke="#ad4d34" stroke-width="5"/><text x="150" y="145" font-size="62" fill="#ad4d34">1</text><text x="150" y="190" font-size="18" fill="#172321">carrier</text><text x="150" y="225" font-size="15" fill="#5c655f">a place for state</text></g><g transform="translate(390 130)"><circle cx="95" cy="150" r="65" fill="#1f6866" opacity=".18" stroke="#1f6866" stroke-width="5"/><circle cx="205" cy="150" r="65" fill="#1f6866" opacity=".18" stroke="#1f6866" stroke-width="5"/><path d="M160 150H140" stroke="#9b6d20" stroke-width="9"/><text x="150" y="285" font-size="18" fill="#172321">two faces compare</text><text x="150" y="315" font-size="15" fill="#5c655f">one cross-channel</text></g><g transform="translate(760 105)"><path d="M150 35L35 245H265Z" fill="#9b6d20" opacity=".12" stroke="#9b6d20" stroke-width="6"/><circle cx="150" cy="35" r="28" fill="#fffaf1" stroke="#172321" stroke-width="4"/><circle cx="35" cy="245" r="28" fill="#fffaf1" stroke="#172321" stroke-width="4"/><circle cx="265" cy="245" r="28" fill="#fffaf1" stroke="#172321" stroke-width="4"/><path d="M145 70L65 215M70 245H230M235 215L155 70" stroke="#1f6866" stroke-width="5" marker-end="url(#a)"/><defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3 0 6Z" fill="#1f6866"/></marker></defs><text x="150" y="315" font-size="18" fill="#172321">first closed loop</text><text x="150" y="345" font-size="15" fill="#5c655f">return may carry a defect</text></g></g></svg>`,
  "projective-lift.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 620" role="img" aria-labelledby="t d"><title id="t">From a frustrated triangle to its marked double lift</title><desc id="d">A three-cycle with nontrivial return sign lifts to a connected six-cycle; retaining every mark can require a twelve-step return.</desc><defs><marker id="pa" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4 0 8Z" fill="#1f6866"/></marker></defs><rect width="1200" height="620" fill="#f6f0e6"/><g font-family="Segoe UI,Arial"><text x="55" y="55" font-size="25" font-weight="700" fill="#172321">ONE OBSTRUCTION · THREE LEVELS OF BOOKKEEPING</text><text x="55" y="88" font-size="17" fill="#5c655f">The cover changes how return data are recorded; it does not manufacture chirality.</text><g transform="translate(45 125)"><rect width="350" height="430" rx="18" fill="#fffaf1" stroke="#b8aea0"/><text x="24" y="42" font-size="18" font-weight="700" fill="#ad4d34">1 · BASE CYCLE C₃</text><path d="M175 90L65 285H285Z" fill="#ad4d34" opacity=".08" stroke="#172321" stroke-width="4"/><path d="M170 105L82 265M92 285H258M268 263L183 108" fill="none" stroke="#1f6866" stroke-width="5" marker-end="url(#pa)"/><g fill="#fffaf1" stroke="#172321" stroke-width="4"><circle cx="175" cy="90" r="24"/><circle cx="65" cy="285" r="24"/><circle cx="285" cy="285" r="24"/></g><g text-anchor="middle" font-size="16" font-weight="700" fill="#172321"><text x="175" y="96">1</text><text x="65" y="291">2</text><text x="285" y="291">3</text></g><g text-anchor="middle" font-size="16" fill="#9b6d20"><text x="105" y="185">+</text><text x="175" y="312">+</text><text x="245" y="185">−</text></g><text x="175" y="365" text-anchor="middle" font-size="21" font-weight="700" fill="#ad4d34">loop return = −I</text><text x="175" y="397" text-anchor="middle" font-size="15" fill="#5c655f">pairwise rules are local;</text><text x="175" y="419" text-anchor="middle" font-size="15" fill="#5c655f">the closed product stores the defect</text></g><g transform="translate(425 125)"><rect width="350" height="430" rx="18" fill="#fffaf1" stroke="#b8aea0"/><text x="24" y="42" font-size="18" font-weight="700" fill="#9b6d20">2 · CONNECTED DOUBLE COVER C₆</text><path d="M175 80L270 135 270 245 175 300 80 245 80 135Z" fill="#9b6d20" opacity=".08" stroke="#172321" stroke-width="4"/><g fill="#fffaf1" stroke-width="4"><circle cx="175" cy="80" r="22" stroke="#1f6866"/><circle cx="270" cy="135" r="22" stroke="#ad4d34"/><circle cx="270" cy="245" r="22" stroke="#1f6866"/><circle cx="175" cy="300" r="22" stroke="#ad4d34"/><circle cx="80" cy="245" r="22" stroke="#1f6866"/><circle cx="80" cy="135" r="22" stroke="#ad4d34"/></g><g text-anchor="middle" font-size="15" font-weight="700" fill="#172321"><text x="175" y="86">1+</text><text x="270" y="141">2−</text><text x="270" y="251">3+</text><text x="175" y="306">1−</text><text x="80" y="251">2+</text><text x="80" y="141">3−</text></g><text x="175" y="365" text-anchor="middle" font-size="21" font-weight="700" fill="#9b6d20">sheet parity is explicit</text><text x="175" y="397" text-anchor="middle" font-size="15" fill="#5c655f">one turn exchanges sheets;</text><text x="175" y="419" text-anchor="middle" font-size="15" fill="#5c655f">two turns close the lifted position</text></g><g transform="translate(805 125)"><rect width="350" height="430" rx="18" fill="#fffaf1" stroke="#b8aea0"/><text x="24" y="30" font-size="18" font-weight="700" fill="#1f6866">3 · MARKED RETURN C₁₂</text><circle cx="175" cy="190" r="113" fill="#1f6866" opacity=".06" stroke="#172321" stroke-width="4"/><g fill="#fffaf1" stroke="#1f6866" stroke-width="3"><circle cx="175" cy="77" r="13"/><circle cx="232" cy="92" r="13"/><circle cx="273" cy="133" r="13"/><circle cx="288" cy="190" r="13"/><circle cx="273" cy="247" r="13"/><circle cx="232" cy="288" r="13"/><circle cx="175" cy="303" r="13"/><circle cx="118" cy="288" r="13"/><circle cx="77" cy="247" r="13"/><circle cx="62" cy="190" r="13"/><circle cx="77" cy="133" r="13"/><circle cx="118" cy="92" r="13"/></g><g text-anchor="middle" font-size="11" font-weight="700" fill="#172321"><text x="175" y="81">0</text><text x="232" y="96">1</text><text x="273" y="137">2</text><text x="288" y="194">3</text><text x="273" y="251">4</text><text x="232" y="292">5</text><text x="175" y="307">6</text><text x="118" y="292">7</text><text x="77" y="251">8</text><text x="62" y="194">9</text><text x="77" y="137">10</text><text x="118" y="96">11</text></g><path d="M175 55A135 135 0 1 1 160 56" fill="none" stroke="#ad4d34" stroke-width="4" marker-end="url(#pa)"/><text x="175" y="365" text-anchor="middle" font-size="21" font-weight="700" fill="#1f6866">all marks return</text><text x="175" y="397" text-anchor="middle" font-size="15" fill="#5c655f">position, sheet and decoration</text><text x="175" y="419" text-anchor="middle" font-size="15" fill="#5c655f">can require twelve transport steps</text></g></g></svg>`,
  "mobius-return.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 520" role="img" aria-labelledby="t d"><title id="t">One and two circuits of a half-twisted loop</title><desc id="d">An oriented marker reverses after one circuit of a half-twisted track and returns after two circuits.</desc><defs><marker id="ma" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4 0 8Z" fill="#ad4d34"/></marker></defs><rect width="1200" height="520" fill="#f6f0e6"/><g font-family="Segoe UI,Arial"><text x="60" y="58" font-size="25" font-weight="700" fill="#172321">A HALF-TWIST CHANGES THE RETURN RULE</text><text x="60" y="91" font-size="17" fill="#5c655f">The strip is an analogy for projective bookkeeping, not an extra physical dimension.</text><g transform="translate(60 135)"><path d="M70 130C70 20 420 20 420 130S70 240 70 130" fill="none" stroke="#d8c9b7" stroke-width="48"/><path d="M70 130C70 20 420 20 420 130S70 240 70 130" fill="none" stroke="#172321" stroke-width="3"/><path d="M225 55L270 205M270 55L225 205" stroke="#9b6d20" stroke-width="8" opacity=".75"/><path d="M93 100C155 28 335 28 397 100" fill="none" stroke="#ad4d34" stroke-width="5" marker-end="url(#ma)"/><path d="M95 130V75M88 84L95 75 102 84" fill="none" stroke="#1f6866" stroke-width="6"/><path d="M397 130V185M390 176L397 185 404 176" fill="none" stroke="#ad4d34" stroke-width="6"/><text x="245" y="280" text-anchor="middle" font-size="23" font-weight="700" fill="#ad4d34">one circuit: ↑ becomes ↓</text><text x="245" y="310" text-anchor="middle" font-size="15" fill="#5c655f">same base position, opposite marked orientation</text></g><g transform="translate(650 135)"><path d="M70 130C70 20 420 20 420 130S70 240 70 130" fill="none" stroke="#d8c9b7" stroke-width="48"/><path d="M70 130C70 20 420 20 420 130S70 240 70 130" fill="none" stroke="#172321" stroke-width="3"/><path d="M225 55L270 205M270 55L225 205" stroke="#9b6d20" stroke-width="8" opacity=".75"/><path d="M92 92C170 8 365 45 405 120C440 190 275 248 125 205C45 182 45 96 93 72" fill="none" stroke="#1f6866" stroke-width="5" marker-end="url(#ma)"/><path d="M95 130V75M88 84L95 75 102 84" fill="none" stroke="#1f6866" stroke-width="6"/><path d="M397 130V75M390 84L397 75 404 84" fill="none" stroke="#1f6866" stroke-width="6"/><text x="245" y="280" text-anchor="middle" font-size="23" font-weight="700" fill="#1f6866">two circuits: ↑ returns to ↑</text><text x="245" y="310" text-anchor="middle" font-size="15" fill="#5c655f">the complete marked state closes</text></g></g></svg>`,
  "central-sign-orientation.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 560" role="img" aria-labelledby="t d"><title id="t">Central sign is not orientation reversal</title><desc id="d">Minus identity reverses both basis vectors and preserves oriented area, whereas a reflection reverses one basis vector and flips oriented area.</desc><rect width="1200" height="560" fill="#f6f0e6"/><g font-family="Segoe UI,Arial"><text x="60" y="58" font-size="25" font-weight="700" fill="#172321">TWO OPERATIONS THAT LOOK SIMILAR—BUT ARE NOT</text><text x="60" y="92" font-size="17" fill="#5c655f">Orientation follows the determinant, not the number of minus signs in a label.</text><g transform="translate(55 130)"><rect width="520" height="370" rx="18" fill="#fffaf1" stroke="#b8aea0"/><text x="28" y="42" font-size="19" font-weight="700" fill="#1f6866">CENTRAL SIGN: −I₂</text><path d="M150 230V105M150 230H275" stroke="#1f6866" stroke-width="7"/><path d="M150 230V335M150 230H45" stroke="#ad4d34" stroke-width="7"/><g font-size="16" font-weight="700"><text x="160" y="100" fill="#1f6866">e₂</text><text x="280" y="248" fill="#1f6866">e₁</text><text x="35" y="248" fill="#ad4d34">−e₁</text><text x="165" y="325" fill="#ad4d34">−e₂</text></g><text x="350" y="125" font-size="30" fill="#172321">[−1  0]</text><text x="350" y="162" font-size="30" fill="#172321">[ 0 −1]</text><text x="350" y="225" font-size="23" font-weight="700" fill="#1f6866">det = +1</text><text x="350" y="270" font-size="17" fill="#172321">two axis reversals</text><text x="350" y="300" font-size="17" fill="#172321">preserve e₁∧e₂</text><text x="260" y="345" text-anchor="middle" font-size="19" font-weight="700" fill="#1f6866">orientation preserved</text></g><g transform="translate(625 130)"><rect width="520" height="370" rx="18" fill="#fffaf1" stroke="#b8aea0"/><text x="28" y="42" font-size="19" font-weight="700" fill="#ad4d34">REFLECTION: R</text><path d="M150 230V105M150 230H275" stroke="#1f6866" stroke-width="7"/><path d="M150 230H45" stroke="#ad4d34" stroke-width="7"/><g font-size="16" font-weight="700"><text x="160" y="100" fill="#1f6866">e₂</text><text x="280" y="248" fill="#1f6866">e₁</text><text x="35" y="248" fill="#ad4d34">−e₁</text></g><text x="350" y="125" font-size="30" fill="#172321">[−1  0]</text><text x="350" y="162" font-size="30" fill="#172321">[ 0  +1]</text><text x="350" y="225" font-size="23" font-weight="700" fill="#ad4d34">det = −1</text><text x="350" y="270" font-size="17" fill="#172321">one axis reversal</text><text x="350" y="300" font-size="17" fill="#172321">flips e₁∧e₂</text><text x="260" y="345" text-anchor="middle" font-size="19" font-weight="700" fill="#ad4d34">orientation reversed</text></g></g></svg>`,
  "topology-defect-reader.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 570" role="img" aria-labelledby="t d"><title id="t">Topological memory, defect wall and localized reader</title><desc id="d">Three separate layers show level-three sector memory, an added neutral Z2 kink, and an even localized reader profile.</desc><defs><marker id="ta" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4 0 8Z" fill="#5c655f"/></marker></defs><rect width="1200" height="570" fill="#f6f0e6"/><g font-family="Segoe UI,Arial"><text x="58" y="58" font-size="25" font-weight="700" fill="#172321">MEMORY IS NOT A WALL; A WALL IS NOT A READER</text><text x="58" y="91" font-size="17" fill="#5c655f">Each layer has a different physical job and a different admission burden.</text><g transform="translate(55 135)"><rect width="315" height="350" rx="18" fill="#fffaf1" stroke="#b8aea0"/><text x="24" y="40" font-size="18" font-weight="700" fill="#9b6d20">1 · TOPOLOGICAL MEMORY</text><g transform="translate(158 155)" fill="none" stroke="#9b6d20" stroke-width="10"><circle r="82"/><circle r="52"/><circle r="22"/></g><g text-anchor="middle" font-size="15" font-weight="700" fill="#172321"><text x="158" y="82">sector 0</text><text x="158" y="158">sector 1</text><text x="158" y="230">sector 2</text></g><text x="158" y="285" text-anchor="middle" font-size="21" font-weight="700" fill="#9b6d20">level-three BF label</text><text x="158" y="316" text-anchor="middle" font-size="15" fill="#5c655f">remembers a sector</text><text x="158" y="338" text-anchor="middle" font-size="15" fill="#ad4d34">does not create a wall</text></g><path d="M385 310H425" stroke="#5c655f" stroke-width="4" marker-end="url(#ta)"/><text x="405" y="292" text-anchor="middle" font-size="13" fill="#5c655f">add field</text><g transform="translate(445 135)"><rect width="315" height="350" rx="18" fill="#fffaf1" stroke="#b8aea0"/><text x="24" y="40" font-size="18" font-weight="700" fill="#ad4d34">2 · NEUTRAL ℤ₂ KINK</text><path d="M35 180H280M158 70V290" stroke="#b8aea0" stroke-width="2"/><path d="M42 255C90 255 115 250 135 215C155 180 160 110 180 85C200 62 235 60 275 60" fill="none" stroke="#ad4d34" stroke-width="7"/><line x1="158" y1="65" x2="158" y2="275" stroke="#ad4d34" stroke-width="3" stroke-dasharray="7 7"/><text x="64" y="235" font-size="17" fill="#172321">−v</text><text x="248" y="82" font-size="17" fill="#172321">+v</text><text x="158" y="310" text-anchor="middle" font-size="21" font-weight="700" fill="#ad4d34">physical interface</text><text x="158" y="338" text-anchor="middle" font-size="15" fill="#5c655f">requires a separate neutral field</text></g><path d="M775 310H815" stroke="#5c655f" stroke-width="4" marker-end="url(#ta)"/><text x="795" y="292" text-anchor="middle" font-size="13" fill="#5c655f">localize</text><g transform="translate(835 135)"><rect width="315" height="350" rx="18" fill="#fffaf1" stroke="#b8aea0"/><text x="24" y="40" font-size="18" font-weight="700" fill="#1f6866">3 · GAPPED READER</text><path d="M35 230H280M158 70V270" stroke="#b8aea0" stroke-width="2"/><path d="M42 229C95 228 120 216 138 150C146 120 151 92 158 82C165 92 170 120 178 150C196 216 221 228 274 229" fill="#1f6866" opacity=".16" stroke="#1f6866" stroke-width="6"/><path d="M120 232Q158 270 196 232" fill="none" stroke="#9b6d20" stroke-width="4"/><text x="158" y="310" text-anchor="middle" font-size="21" font-weight="700" fill="#1f6866">one even localized mode</text><text x="158" y="338" text-anchor="middle" font-size="15" fill="#5c655f">dynamics live on the wall</text></g></g></svg>`,
  "standard-model-seam.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" role="img" aria-labelledby="t d"><title id="t">Four distinct Standard Model gates</title><desc id="d">A staircase separates parameter fitting, healthy poles, a chiral domain, index three and anomaly cancellation.</desc><rect width="1200" height="600" fill="#f6f0e6"/><g font-family="Segoe UI,Arial"><text x="70" y="65" font-size="25" font-weight="700" fill="#172321">A FIT IS NOT YET A DERIVATION</text><text x="70" y="98" font-size="17" fill="#5c655f">Each higher step needs a new kind of evidence.</text><g transform="translate(80 150)"><path d="M0 360H210V280H420V200H630V120H840V40H1040" fill="none" stroke="#172321" stroke-width="7"/><g font-size="18" font-weight="700" fill="#172321"><text x="105" y="330" text-anchor="middle">Fit SM parameters</text><text x="315" y="250" text-anchor="middle">Healthy poles</text><text x="525" y="170" text-anchor="middle">Chiral domain</text><text x="735" y="90" text-anchor="middle">Index three</text><text x="940" y="20" text-anchor="middle">Anomaly-free parent</text></g><g font-size="15" fill="#5c655f"><text x="105" y="385" text-anchor="middle">capacity</text><text x="315" y="305" text-anchor="middle">local benchmark</text><text x="525" y="225" text-anchor="middle">currently missing</text><text x="735" y="145" text-anchor="middle">constructed</text><text x="940" y="65" text-anchor="middle">currently missing</text></g><circle cx="525" cy="200" r="16" fill="#ad4d34"/><circle cx="940" cy="40" r="16" fill="#ad4d34"/><circle cx="735" cy="120" r="16" fill="#1f6866"/></g></g></svg>`,
  "terminal-gates.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 650" role="img" aria-labelledby="t d"><title id="t">Terminal research gate partition</title><desc id="d">A5 and A7 are internally exhausted, A2 and A9 are conditionally constructed, A4 A6 and A11 are externally open, and the graph lane is a separate conditional response route.</desc><rect width="1200" height="650" fill="#f6f0e6"/><g font-family="Segoe UI,Arial"><text x="70" y="60" font-size="25" font-weight="700" fill="#172321">WHERE NEW INFORMATION MUST ENTER</text><text x="70" y="94" font-size="17" fill="#5c655f">No whole gate has globally failed. Physical admission remains false.</text><g transform="translate(70 140)"><rect width="320" height="360" rx="24" fill="#ad4d34" opacity=".12" stroke="#ad4d34" stroke-width="4"/><text x="30" y="48" font-size="19" font-weight="700" fill="#ad4d34">INTERNALLY EXHAUSTED</text><text x="30" y="92" font-size="30" font-weight="700" fill="#172321">A5 · Selector</text><text x="30" y="126" font-size="15" fill="#5c655f">needs a physical phase reference</text><text x="30" y="190" font-size="30" font-weight="700" fill="#172321">A7 · Stress</text><text x="30" y="224" font-size="15" fill="#5c655f">needs curved microscopic matching</text><text x="30" y="304" font-size="16" fill="#172321">Do not recombine the same inputs.</text></g><g transform="translate(440 140)"><rect width="320" height="360" rx="24" fill="#9b6d20" opacity=".12" stroke="#9b6d20" stroke-width="4"/><text x="30" y="48" font-size="19" font-weight="700" fill="#9b6d20">CONDITIONALLY BUILT</text><text x="30" y="92" font-size="30" font-weight="700" fill="#172321">A2 · Defect</text><text x="30" y="126" font-size="15" fill="#5c655f">neutral wall + localized reader</text><text x="30" y="190" font-size="30" font-weight="700" fill="#172321">A9 · Response</text><text x="30" y="224" font-size="15" fill="#5c655f">positive toy spectrum + fit protocol</text><text x="30" y="304" font-size="16" fill="#172321">Named external inputs remain.</text></g><g transform="translate(810 140)"><rect width="320" height="360" rx="24" fill="#1f6866" opacity=".12" stroke="#1f6866" stroke-width="4"/><text x="30" y="48" font-size="19" font-weight="700" fill="#1f6866">EXTERNALLY OPEN</text><text x="30" y="92" font-size="30" font-weight="700" fill="#172321">A4 · States</text><text x="30" y="150" font-size="30" font-weight="700" fill="#172321">A6 · Families</text><text x="30" y="208" font-size="30" font-weight="700" fill="#172321">A11 · Experiment</text><text x="30" y="260" font-size="15" fill="#5c655f">domain · anomaly-free parent · signal</text><text x="30" y="304" font-size="16" fill="#172321">New physics or data could reopen them.</text></g></g><rect x="250" y="555" width="700" height="55" rx="27" fill="#172321"/><text x="600" y="590" text-anchor="middle" font-family="Segoe UI,Arial" font-size="18" fill="#f6f0e6">GRAPH LANE: conditional response symmetry — not spacetime</text></svg>`,
};

const allSources = [...new Set([...findings, ...frontiers, ...chapters, ...proofDetails, ...claimDetails].flatMap(item => item.sources || []))].sort();
const missing = allSources.filter(source => !existsSync(join(root, source)));
if (missing.length) throw new Error(`Missing book citations:\n${missing.join("\n")}`);
const missingCertificates = proofDetails.flatMap(detail => detail.certificates).filter(file => !existsSync(join(root, file)));
if (missingCertificates.length) throw new Error(`Missing proof certificates:\n${missingCertificates.join("\n")}`);

const corpusManifest = JSON.parse(readFileSync(join(root, "corpus", "registers", "spin23_corpus_manifest.json"), "utf8"));
const numberedCount = corpusManifest.summary.numberedDocumentCount;
// Hash canonical text so generated provenance is reproducible across Git
// checkouts that use different native line endings (for example Windows and Linux).
const sourceDigest = sha256(allSources.map(source => {
  const canonicalText = readFileSync(join(root, source), "utf8").replace(/\r\n?/g, "\n");
  return `${source}\0${sha256(canonicalText)}`;
}).join("\n"));

const mdLink = source => `[${basename(source)}](${posix(relative(chaptersRoot, join(root, source)))})`;
const sourceListMd = sources => sources.map(source => `- ${mdLink(source)}`).join("\n");
const sourceListHtml = sources => `<ul class="sources">${sources.map(source => `<li><a href="../../${encodeURI(source)}">${esc(basename(source))}</a></li>`).join("")}</ul>`;
const detailFileLinkMd = file => `[${basename(file)}](${posix(relative(detailsRoot, join(root, file)))})`;
const detailFileListMd = files => files.map(file => `- ${detailFileLinkMd(file)}`).join("\n");
const detailFileListHtml = files => `<ul class="sources">${files.map(file => `<li><a href="../../../${encodeURI(file)}">${esc(basename(file))}</a></li>`).join("")}</ul>`;
const claimDetail = (chapterSlug, heading, claimIndex) => (claimsBySection.get(`${chapterSlug}|${heading}`) || [])[claimIndex];
const proofCtaMarkdown = (chapterSlug, heading, claimIndex) => {
  const detail = claimDetail(chapterSlug, heading, claimIndex);
  return detail ? `> **Expanded claim page →** [Inspect the claim’s scope, logic, verification route, boundary and sources](../details/${detail.slug}.md)\n\n` : "";
};
const proofCtaHtml = (chapterSlug, heading, claimIndex) => {
  const detail = claimDetail(chapterSlug, heading, claimIndex);
  return detail ? `<a class="proof-link evidence-link" href="details/${detail.slug}.html"><span><b>Expanded claim page</b><small>Scope · logical anatomy · verification route · boundary · sources</small></span><i>Open claim →</i></a>` : "";
};
const visualsAt = (chapter, afterSection = null) => (chapterVisuals[chapter.slug] || []).filter(visual => (visual.afterSection || null) === afterSection);
const visualMarkdown = (chapter, afterSection = null) => visualsAt(chapter, afterSection).map(visual => `![${visual.alt}](../../../docs/edition-3/assets/${visual.file})\n\n_${visual.caption}_\n`).join("\n");
const visualHtml = (chapter, afterSection = null) => visualsAt(chapter, afterSection).map(visual => `<figure><img src="assets/${encodeURI(visual.file)}" alt="${esc(visual.alt)}"><figcaption>${esc(visual.caption)}</figcaption></figure>`).join("");

function chapterMarkdown(chapter, index) {
  const previous = index > 0 ? chapters[index - 1] : null;
  const next = index < chapters.length - 1 ? chapters[index + 1] : null;
  let body = `# ${typeset(chapter.title)}\n\n_${typeset(chapter.kicker)}_\n\n${taxonomyMarkdown(chapterTaxonomy[chapter.slug], "Chapter status")}${archetypeMarkdown(chapterArchetype[chapter.slug], "Chapter function")}`;
  if (chapter.equation) body += `> ${typeset(chapter.equation)}\n\n`;
  body += visualMarkdown(chapter);
  if (chapter.slug === "00-front-matter") body += `${taxonomyLegendMarkdown()}${archetypeLegendMarkdown()}`;
  for (const [heading, paragraphs] of chapter.sections || []) {
    const researchMove = sectionArchetype[heading] || chapterArchetype[chapter.slug];
    const claims = paragraphs.map((paragraph, claimIndex) => `${typeset(paragraph)}\n\n${proofCtaMarkdown(chapter.slug, heading, claimIndex)}`).join("");
    body += `<a id="${anchorId(heading)}"></a>\n## ${typeset(heading)}\n\n${sectionTaxonomy[heading] ? taxonomyMarkdown(sectionTaxonomy[heading]) : ""}${archetypeMarkdown(researchMove)}${claims}`;
    body += visualMarkdown(chapter, heading);
  }
  if (chapter.kind === "findings") for (const finding of findings) body += `<a id="${finding.id}"></a>\n## ${finding.id} · ${typeset(finding.title)}\n\n${taxonomyMarkdown(statusTaxonomy(finding.status), "Ledger reading")}${archetypeMarkdown(statusArchetype(finding.status))}**Detailed status:** \`${finding.status}\`\n\n${typeset(finding.statement)}\n\n**Boundary:** ${typeset(finding.boundary)}\n\n${sourceListMd(finding.sources)}\n\n`;
  if (chapter.kind === "frontiers") for (const track of frontiers) body += `<a id="${track.id}"></a>\n## ${track.id} · ${typeset(track.title)}\n\n${taxonomyMarkdown(frontierTaxonomy(track.id), "Gate state")}${archetypeMarkdown(frontierArchetype(track.id), "Needed move")}**Priority:** \`${track.priority}\`\n\n**Question:** ${typeset(track.question)}\n\n**Advance when:** ${typeset(track.advance)}\n\n**Stop or downgrade when:** ${typeset(track.stop)}\n\n${sourceListMd(track.sources)}\n\n`;
  if (chapter.kind === "provenance") body += `This preview cites ${allSources.length} controlling corpus documents from a repository containing ${numberedCount} numbered research documents at generation time. The citation-set digest is \`${sourceDigest}\`.\n\n## Controlling maps\n\n${sourceListMd([claimPath("00_research_document_map.md"), claimPath("30_research_frontier.md"), claimPath("40_grand_synthesis_spin23_pole.md"), claimPath("49_multi_branch_research_registry.md"), claimPath("91_multi_branch_active_goal_log.md")])}\n- [Corpus manifest](../../../corpus/registers/spin23_corpus_manifest.json)\n\n## Interpretation rule\n\nThe generated book is a reading layer. If it conflicts with a cited research document, executable certificate or the current manifest, the controlling source wins. File presence and narrative coherence do not establish physical truth.\n\n`;
  if (chapter.kind === "concept-map") body += `The interactive atlas renders the programme as a three-dimensional typed graph. Its central chain is the established mathematical spine; physical realization, projective topology and the exceptional horizon remain spatially and epistemically distinct.\n\n- [Open the interactive concept atlas](../../../docs/concept-map/index.html)\n- [Inspect the canonical graph data](../../../corpus/concept-map/graph.json)\n- [Use the compact Mermaid fallback](../../../corpus/concept-map/README.md)\n\n## Epistemic rule\n\nA path inherits its weakest edge status. In particular, an analogy does not become a derivation because it sits near an established node.\n\n`;
  if (chapter.sources?.length) body += `## Chapter sources\n\n${sourceListMd(chapter.sources)}\n\n`;
  body += `---\n\n[← ${previous ? previous.title : "Edition 3 cover"}](${previous ? `${previous.slug}.md` : "../README.md"}) · [Contents](../README.md)${next ? ` · [${next.title} →](${next.slug}.md)` : ""}\n`;
  return body;
}

function proofDetailMarkdown(detail) {
  const assumptionRows = detail.assumptions.map(([name, value]) => `| ${name} | ${value} |`).join("\n");
  const steps = detail.steps.map((step, index) => `${index + 1}. ${step}`).join("\n");
  const ablations = detail.ablations ? `## Necessity check\n\n| Input set | Closure dimension | Reading |\n|---|---:|---|\n${detail.ablations.map(row => `| ${row.join(" | ")} |`).join("\n")}\n\n` : "";
  const continuation = detail.continuation ? `## The source flow reaches the channel generator\n\n${detail.continuation}\n\n` : "";
  return `# ${detail.title}\n\n_${detail.kicker}_\n\n${taxonomyMarkdown(detail.taxonomy, "Claim status")}${archetypeMarkdown(detail.archetype, "Proof function")}> **Claim under audit.** ${detail.claim}\n\n## Start with the picture\n\n${detail.ordinary}\n\n## Objects and assumptions\n\n| Item | Declared meaning |\n|---|---|\n${assumptionRows}\n\n## Certificate chain\n\n${steps}\n\n${ablations}${continuation}> **Authority boundary.** ${detail.boundary}\n\n## Executable and inspectable certificates\n\n${detailFileListMd(detail.certificates)}\n\n## Controlling research documents\n\n${detailFileListMd(detail.sources)}\n\n---\n\n[← Return to the chapter](../chapters/04-furey-interface.md#${detail.backAnchor}) · [Book contents](../README.md)\n`;
}

const claimCommitment = key => ({
  established: "The stated conclusion follows inside the declared model. Reusing it elsewhere requires carrying the same object definitions, assumptions and typing.",
  conditional: "The construction is admitted only after the named additional input is supplied. The page records the dependency instead of hiding it inside the conclusion.",
  external: "The corpus identifies the missing datum but does not currently contain it. This assertion is a boundary marker, not a disguised derivation.",
  exhausted: "The named internal candidates have been tested without supplying the missing datum. Progress requires a genuinely new input rather than another relabelling of the same data.",
  obstruction: "A specified candidate class fails under explicit assumptions. The conclusion does not automatically extend to mechanisms outside that class.",
  experiment: "The claim concerns a protocol, sensitivity or decision rule. It must be kept separate from a prediction that a nonzero signal exists.",
  interpretive: "The claim supplies a map or analogy. It becomes a derivation only after an explicit carrier-preserving map and invariant are given.",
  governance: "The claim organizes provenance, scope or stopping rules. It governs how evidence is read rather than adding independent physical evidence.",
})[key];

const claimChallenge = key => ({
  established: "Locate a mismatched definition, an omitted assumption, a failed certificate step or a counterexample on the declared carrier.",
  conditional: "Show that the named input is inconsistent, insufficient, unavailable, or fails to imply the claimed construction.",
  external: "Supply the missing datum with a physical definition and demonstrate that it connects locally to the existing construction.",
  exhausted: "Introduce a new covariant datum outside the audited candidate set, then show exactly how it reopens the stopped inference.",
  obstruction: "Break one of the no-go assumptions in a controlled construction, or show that the alleged obstruction does not follow within its stated class.",
  experiment: "Specify the apparatus, calibration, null distribution, preregistered threshold and independently predicted effect size.",
  interpretive: "Provide an explicit map that preserves the claimed structure, then identify an observable consequence that the analogy alone did not supply.",
  governance: "Find a provenance mismatch, stale status, broken link or stronger source that changes the ledger entry.",
})[key];

const sourceDisplayName = source => typeset(basename(source).replace(/\.md$/iu, "").replace(/^\d+_/u, "").replaceAll("_", " "));

function claimDetailMarkdown(detail) {
  const position = claimDetails.indexOf(detail);
  const previous = position > 0 ? claimDetails[position - 1] : null;
  const next = position < claimDetails.length - 1 ? claimDetails[position + 1] : null;
  const specialized = detail.specialized ? `## Deeper certificate\n\n[${detail.specialized[1]}](${detail.specialized[0]}.md)\n\nThis specialized page exposes the calculation or obstruction in more detail.\n\n` : "";
  return `# ${typeset(detail.heading)} — assertion ${detail.claimIndex + 1}\n\n_Expanded claim page · ${typeset(detail.chapter.title)}_\n\n${taxonomyMarkdown(detail.taxonomy, "Claim status")}${archetypeMarkdown(detail.archetype, "Research function")}## Exact assertion\n\n> ${typeset(detail.claim)}\n\n## What this commits us to\n\n${claimCommitment(detail.taxonomy)}\n\n## Logical anatomy\n\n- **Scope:** chapter “${typeset(detail.chapter.title)}”, section “${typeset(detail.heading)}”.\n- **Unit of argument:** assertion ${detail.claimIndex + 1} of ${detail.claimCount} in this section.\n- **Evidence posture:** ${evidenceReading(detail.taxonomy)}\n- **Research move:** ${archetypeByKey[detail.archetype].description}.\n\n## Verification route\n\n1. Read the controlling documents below and recover their declared objects and assumptions.\n2. Check the calculation, construction, obstruction or stopping rule on those same objects.\n3. Compare the source conclusion with the exact assertion above; do not strengthen its verbs or enlarge its domain.\n4. Apply the status rule and retain every named external dependency.\n\n## What would move or defeat this claim\n\n${claimChallenge(detail.taxonomy)}\n\n${specialized}## Controlling documents\n\n${detail.sources.map(source => `- **${sourceDisplayName(source)}** — ${detailFileLinkMd(source)}`).join("\n")}\n\n> **Authority boundary.** This page is an automatically generated reading and audit layer. The cited research documents and executable certificates remain authoritative.\n\n---\n\n[Return to the assertion in the chapter](../chapters/${detail.chapter.slug}.md#${anchorId(detail.heading)}) · [Book contents](../README.md)${previous ? ` · [← Previous claim](${previous.slug}.md)` : ""}${next ? ` · [Next claim →](${next.slug}.md)` : ""}\n`;
}

function readingKeyMarkdown() {
  const statusLinks = Object.entries(taxonomy).map(([key, item]) => `- **[${item.icon} ${item.label}](reading-key/status-${key}.md)** — ${item.description}`).join("\n");
  const moveLinks = archetypes.map(item => `- **[${item.icon} ${item.name}](reading-key/move-${item.key}.md)** — ${item.description}.`).join("\n");
  return `# Reading-key index\n\n_A front door to one page per status and one page per research move._\n\nThe two badge families answer different questions. A **status** asks how far a claim has been established. A **research move** asks what the passage is doing—mapping, building, auditing, translating or another temporary function. Neither badge is evidence by itself; open its dedicated page to see the definition, reading rule and every current use.\n\n## Claim-status pages\n\n${statusLinks}\n\n## Research-move pages\n\n${moveLinks}\n\n---\n\n[← Book contents](README.md) · [Start reading](chapters/00-front-matter.md)\n`;
}

function readingKeyDetailMarkdown(kind, key) {
  const isStatus = kind === "taxonomy";
  const item = isStatus ? taxonomy[key] : archetypeByKey[key];
  const name = isStatus ? item.label : item.name;
  const description = `${item.description}${isStatus ? "" : ". This describes the work performed by a passage, not a personality type."}`;
  const links = usagesFor(kind, key).map(usage => `- [${usage.label}](../${usage.markdown})`).join("\n");
  return `# ${item.icon} ${name}\n\n_${isStatus ? "Claim-status page" : "Research-move page"}_\n\n${description}\n\n## How to read it\n\n${isStatus ? "Treat this label as a scope boundary. It tells you what kind of support exists and what still cannot be inferred; it does not replace the linked evidence." : "Treat this mark as a verb. It names the work the passage is doing and therefore the kind of question a reader should ask of it."}\n\n## Every current use\n\n${links || "- No current uses."}\n\n---\n\n[← All reading-key pages](../reading-key.md) · [Book contents](../README.md)\n`;
}

const css = `:root{--paper:#eee7dc;--ink:#18201f;--muted:#626963;--line:#b8aea0;--panel:#faf7f0;--oxide:#ad4d34;--teal:#1f6866;--gold:#9b6d20;--serif:"Iowan Old Style",Baskerville,"Times New Roman",serif;--sans:Aptos,"Segoe UI",Arial,sans-serif;--mono:"Cascadia Mono",Consolas,monospace}*{box-sizing:border-box}html{background:var(--paper);scrollbar-color:#8d887f transparent}body{margin:0;color:var(--ink);font:19px/1.72 var(--serif)}a{color:var(--teal);text-underline-offset:.16em}main{max-width:1080px;margin:auto;padding:0 28px 80px}.mast{padding:23px 0;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;gap:18px;font:700 .72rem var(--sans);letter-spacing:.12em;text-transform:uppercase}.hero{padding:76px 0 52px;border-bottom:1px solid var(--line)}.hero-art{width:100%;max-height:540px;object-fit:cover;margin:34px 0 0;border-radius:2px}.kicker,.status{font:700 .72rem/1.3 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--oxide)}h1{font-size:clamp(3rem,7vw,6.5rem);line-height:.92;margin:.22em 0}h1 em{color:var(--oxide);font-weight:400}h2{font-size:clamp(2rem,4vw,3.25rem);line-height:1.05;margin:.25em 0 .55em}h3{font-size:1.55rem;line-height:1.15}.lede{max-width:850px;font-size:1.2rem}.boundary{padding:18px 20px;border-left:5px solid var(--gold);background:var(--panel);font-family:var(--sans)}section{padding:50px 0;border-bottom:1px solid var(--line)}section p{max-width:850px}.equation{font:600 clamp(1rem,2.4vw,1.55rem)/1.55 var(--mono);background:var(--panel);border:1px solid var(--line);padding:24px;overflow:auto}figure{margin:42px 0}figure img{display:block;width:100%;height:auto}figcaption{margin-top:10px;color:var(--muted);font:italic .9rem/1.5 var(--serif)}table{width:100%;border-collapse:collapse;margin:26px 0;font:16px/1.5 var(--sans)}th,td{text-align:left;vertical-align:top;padding:12px;border-bottom:1px solid var(--line)}th{color:var(--oxide);font-size:13px;letter-spacing:.04em;text-transform:uppercase}.taxonomy-badge,.archetype-badge{--tax-color:var(--muted);display:inline-flex;align-items:center;gap:.48rem;width:max-content;max-width:100%;padding:.36rem .68rem;border:1px solid var(--tax-color);border-radius:999px;background:color-mix(in srgb,var(--tax-color) 9%,var(--panel));color:var(--tax-color);font:800 .72rem/1.15 var(--sans);letter-spacing:.045em;text-transform:uppercase}.tax-icon,.role-icon{display:inline-grid;place-items:center;min-width:1.15rem;font:900 1rem/1 var(--sans)}.tax-established{--tax-color:#17634c}.tax-conditional{--tax-color:#8a6415}.tax-external{--tax-color:#9d482f}.tax-exhausted{--tax-color:#65437d}.tax-obstruction{--tax-color:#9b2f37}.tax-experiment{--tax-color:#176b7d}.tax-interpretive{--tax-color:#526b36}.tax-governance{--tax-color:#505d62}.role-scout{--tax-color:#8b5c13}.role-cartographer{--tax-color:#395f77}.role-auditor{--tax-color:#8b3540}.role-builder{--tax-color:#176b67}.role-witness{--tax-color:#684d8d}.role-steward{--tax-color:#56633b}.role-translator{--tax-color:#8a4f2d}.role-integrator{--tax-color:#345388}.chapter-taxonomy{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:18px 0 4px}.chapter-taxonomy p{flex-basis:100%;margin:0;color:var(--muted);font:.9rem/1.4 var(--sans)}.section-taxonomy{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:0 0 16px}.taxonomy-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px}.taxonomy-card{--tax-color:var(--muted);padding:18px;border:1px solid color-mix(in srgb,var(--tax-color) 45%,var(--line));border-top:5px solid var(--tax-color);background:var(--panel)}.taxonomy-card p{margin:.8rem 0 .35rem;font:1rem/1.45 var(--sans)}.taxonomy-card small{color:var(--muted);font:700 .68rem/1.3 var(--sans);letter-spacing:.06em;text-transform:uppercase}.finding,.track{display:grid;grid-template-columns:150px 1fr;gap:22px;padding:28px 0;border-top:1px solid var(--line)}.finding code{color:var(--oxide)}.finding .taxonomy-badge,.finding .archetype-badge,.track .taxonomy-badge,.track .archetype-badge{margin:.45rem 0 .1rem}.detail-status{color:var(--muted);font:600 .68rem/1.35 var(--mono);overflow-wrap:anywhere}.sources{font:.8rem/1.5 var(--mono);overflow-wrap:anywhere}.chapter-sources{background:var(--panel);padding:24px;border-left:5px solid var(--gold)}.track{display:block;background:var(--panel);border:1px solid var(--line);border-left:5px solid var(--teal);padding:22px}.track.stop{border-left-color:var(--oxide)}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:17px}.contents a{display:grid;grid-template-columns:45px minmax(0,1fr) auto;gap:15px;padding:14px 0;border-top:1px solid var(--line);text-decoration:none;align-items:center}.contents a>.chapter-number{font-family:var(--mono);color:var(--oxide)}.contents-copy{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.contents-copy strong{color:var(--ink);flex-basis:100%}.contents .taxonomy-badge,.contents .archetype-badge{font-size:.61rem;padding:.27rem .48rem}.page-turn{display:flex;justify-content:space-between;gap:20px;padding:34px 0;font-family:var(--sans)}footer{padding:30px 0;color:var(--muted);font-family:var(--sans)}@media(max-width:650px){main{padding:0 18px 60px}.mast{flex-direction:column}.finding{grid-template-columns:1fr}.contents a{grid-template-columns:35px 1fr}.contents a>i{display:none}table{font-size:14px}th,td{padding:8px}}`;
const proofCss = `.taxonomy-badge,.archetype-badge{text-decoration:none}.taxonomy-badge:hover,.archetype-badge:hover{filter:brightness(.82);box-shadow:0 0 0 2px color-mix(in srgb,var(--tax-color) 18%,transparent)}.proof-link{display:flex;justify-content:space-between;align-items:center;gap:24px;max-width:850px;margin:28px 0 4px;padding:18px 20px;border:1px solid var(--teal);border-left:6px solid var(--teal);background:var(--panel);text-decoration:none;font-family:var(--sans)}.proof-link span{display:grid;gap:2px}.proof-link b{color:var(--ink);font-size:.85rem;letter-spacing:.08em;text-transform:uppercase}.proof-link small{color:var(--muted);font-size:.92rem}.proof-link i{white-space:nowrap;font-style:normal;font-weight:700}.claim-box{padding:24px;border:1px solid var(--line);border-left:6px solid var(--teal);background:var(--panel);font:1.15rem/1.6 var(--serif)}.proof-steps{max-width:850px;padding-left:1.5rem}.proof-steps li{padding:.45rem 0}.detail-mast a{font-size:.68rem}.reading-index{display:grid;grid-template-columns:repeat(auto-fit,minmax(310px,1fr));gap:18px;align-items:start}.reading-entry{display:block;padding:22px;border:1px solid var(--line);border-top:5px solid var(--tax-color,var(--teal));background:var(--panel);color:var(--ink);text-decoration:none;transition:transform .15s ease,box-shadow .15s ease}.reading-entry:hover{transform:translateY(-2px);box-shadow:0 7px 18px rgb(24 32 31 / .10)}.reading-entry h2{font-size:1.65rem}.reading-entry>strong{color:var(--teal);font:800 .75rem/1.3 var(--sans);letter-spacing:.04em;text-transform:uppercase}.usage-links{max-height:320px;overflow:auto;padding-right:8px;font:.83rem/1.45 var(--sans)}.usage-links li{padding:.25rem 0}.full-usage-links{max-height:none;columns:2;column-gap:34px}.full-usage-links li{break-inside:avoid;padding:.4rem 0}.contents-row{display:grid;grid-template-columns:45px minmax(0,1fr) auto;gap:15px;padding:14px 0;border-top:1px solid var(--line);align-items:center}.contents-row>.chapter-number{font-family:var(--mono);color:var(--oxide)}.chapter-title,.read-link{text-decoration:none}.chapter-title strong{color:var(--ink)}.read-link{font-family:var(--sans)}@media(max-width:650px){.proof-link{align-items:flex-start;flex-direction:column;gap:10px}.proof-link i{white-space:normal}.full-usage-links{columns:1}.contents-row{grid-template-columns:35px 1fr}.read-link{display:none}}`;

const contentsFixCss = `.contents .taxonomy-badge,.contents .archetype-badge{display:inline-flex}.contents .chapter-title,.contents .read-link{display:inline;padding:0;border:0}`;
const evidenceCss = `.evidence-link{border-color:var(--gold);border-left-color:var(--gold)}.claim-unit+.claim-unit{margin-top:36px;padding-top:28px;border-top:1px dashed var(--line)}.claim-hero h1{max-width:960px}.claim-anatomy{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px;margin-top:28px}.claim-anatomy article{padding:20px;border:1px solid var(--line);border-top:5px solid var(--teal);background:var(--panel)}.claim-anatomy h3{margin-top:0}.claim-source-map{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:12px;padding:0;list-style:none}.claim-source-map li{display:grid;gap:9px;padding:18px;border:1px solid var(--line);background:var(--panel)}.claim-source-map strong{font:700 .9rem/1.4 var(--sans)}.claim-source-map a{font:800 .72rem/1.3 var(--sans);letter-spacing:.04em;text-transform:uppercase}.compact-proof{margin:18px 0;padding:13px 16px}`;
const mast = `<header class="mast"><a href="index.html">Admissibility frontier · Edition 3</a><nav><a href="reading-key.html">Reading key</a> · <a href="08-result-ledger.html">Findings</a> · <a href="09-research-frontier.html">Frontier</a> · <a href="../concept-map/index.html">Concept atlas</a></nav></header>`;
const mathHead = (prefix = "") => `<link rel="stylesheet" href="${prefix}vendor/katex/katex.min.css"><script defer src="${prefix}vendor/katex/katex.min.js"></script><script defer src="${prefix}vendor/katex/contrib/auto-render.min.js"></script><script defer src="${prefix}math-render.js"></script>`;
const htmlDoc = (title, body) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#eee7dc"><title>${esc(title)} · Admissibility Frontier Edition 3</title>${mathHead()}<link rel="stylesheet" href="book.css"></head><body><main>${mast}${body}<footer>Edition 3.2 admissibility preview · 24 October 2026 · Citation set ${sourceDigest.slice(0, 12)} · Admission is not endorsement.</footer></main></body></html>`;

function readingKeyHtml() {
  const statusEntries = Object.entries(taxonomy).map(([key, item]) => `<a class="reading-entry tax-${key}" href="reading-key/status-${key}.html"><span class="taxonomy-badge tax-${key}"><span class="tax-icon" aria-hidden="true">${item.icon}</span><span>${esc(item.label)}</span></span><h2>${esc(item.label)}</h2><p>${esc(item.description)}</p><strong>Open ${usagesFor("taxonomy", key).length} indexed uses →</strong></a>`).join("");
  const moveEntries = archetypes.map(item => `<a class="reading-entry role-${item.key}" href="reading-key/move-${item.key}.html"><span class="archetype-badge role-${item.key}"><span class="role-icon" aria-hidden="true">${item.icon}</span><span>${esc(item.name)}</span></span><h2>${esc(item.name)}</h2><p>${esc(item.description)}.</p><strong>Open ${usagesFor("archetype", item.key).length} indexed uses →</strong></a>`).join("");
  return htmlDoc("Reading-key index", `<header class="hero"><p class="kicker">Universal visual grammar</p><h1>Reading-key index</h1><p class="lede">This is the front door, not the whole glossary. Every status and every research move now has its own page containing its definition, reading rule and complete backlink index.</p></header><section><h2>Claim-status pages</h2><p class="lede">Status reports how far a claim has been established and where its boundary lies.</p><div class="reading-index">${statusEntries}</div></section><section><h2>Research-move pages</h2><p class="lede">Research moves describe what a passage is doing. They are temporary functions, not types of people.</p><div class="reading-index">${moveEntries}</div></section><nav class="page-turn"><a href="index.html">← Book contents</a><a href="00-front-matter.html">Start reading →</a></nav>`);
}

function readingKeyDetailHtml(kind, key) {
  const isStatus = kind === "taxonomy";
  const item = isStatus ? taxonomy[key] : archetypeByKey[key];
  const name = isStatus ? item.label : item.name;
  const uses = usagesFor(kind, key);
  const badge = isStatus
    ? `<span class="taxonomy-badge tax-${key}"><span class="tax-icon" aria-hidden="true">${item.icon}</span><span>${esc(name)}</span></span>`
    : `<span class="archetype-badge role-${key}"><span class="role-icon" aria-hidden="true">${item.icon}</span><span>${esc(name)}</span></span>`;
  const usageLinks = uses.map(usage => `<li><a href="../${encodeURI(usage.html)}">${esc(usage.label)}</a></li>`).join("") || "<li>No current uses.</li>";
  const mastDetail = `<header class="mast detail-mast"><a href="../index.html">Admissibility frontier · Edition 3</a><nav><a href="../reading-key.html">All reading-key pages</a> · <a href="../08-result-ledger.html">Findings</a> · <a href="../09-research-frontier.html">Frontier</a></nav></header>`;
  const body = `<header class="hero"><p class="kicker">${isStatus ? "Claim status" : "Research move"}</p><h1>${esc(name)}</h1><div class="chapter-taxonomy">${badge}<p>${esc(item.description)}${isStatus ? "" : ". This describes the work performed by a passage, not a personality type."}</p></div></header><section><h2>How to read it</h2><p class="lede">${isStatus ? "Treat this label as a scope boundary. It tells you what kind of support exists and what still cannot be inferred; it does not replace the linked evidence." : "Treat this mark as a verb. It names the work the passage is doing and therefore the kind of question a reader should ask of it."}</p></section><section><p class="kicker">${uses.length} indexed uses</p><h2>Every current use</h2><ul class="usage-links full-usage-links">${usageLinks}</ul></section><nav class="page-turn"><a href="../reading-key.html">← All reading-key pages</a><a href="../index.html">Book contents →</a></nav>`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#eee7dc"><title>${esc(name)} · Reading key · Admissibility Frontier Edition 3</title>${mathHead("../")}<link rel="stylesheet" href="../book.css"></head><body><main>${mastDetail}${body}<footer>Edition 3.2 admissibility preview · reading-key index · Citation set ${sourceDigest.slice(0, 12)} · Admission is not endorsement.</footer></main></body></html>`;
}

function chapterHtml(chapter, index) {
  const previous = index > 0 ? chapters[index - 1] : null;
  const next = index < chapters.length - 1 ? chapters[index + 1] : null;
  const chapterTaxon = taxonomy[chapterTaxonomy[chapter.slug]];
  const chapterRole = archetypeByKey[chapterArchetype[chapter.slug]];
  let body = `<header class="hero"><p class="kicker">${mathHtml(chapter.kicker)}</p><h1>${mathHtml(chapter.title)}</h1><div class="chapter-taxonomy">${taxonomyBadgeHtml(chapterTaxonomy[chapter.slug])}${archetypeBadgeHtml(chapterArchetype[chapter.slug])}<p><strong>Status:</strong> ${esc(chapterTaxon.description)} <strong>Function:</strong> ${esc(chapterRole.description)}.</p></div>${chapter.equation ? `<div class="equation">${mathHtml(chapter.equation)}</div>` : ""}</header>`;
  body += visualHtml(chapter);
  if (chapter.slug === "00-front-matter") body += `${taxonomyLegendHtml()}${archetypeLegendHtml()}`;
  for (const [heading, paragraphs] of chapter.sections || []) {
    const researchMove = sectionArchetype[heading] || chapterArchetype[chapter.slug];
    body += `<section id="${anchorId(heading)}"><div class="section-taxonomy">${sectionTaxonomy[heading] ? taxonomyBadgeHtml(sectionTaxonomy[heading]) : ""}${archetypeBadgeHtml(researchMove)}</div><h2>${mathHtml(heading)}</h2>${paragraphs.map((paragraph, claimIndex) => `<div class="claim-unit"><p class="lede">${mathHtml(paragraph)}</p>${proofCtaHtml(chapter.slug, heading, claimIndex)}</div>`).join("")}</section>`;
    body += visualHtml(chapter, heading);
  }
  if (chapter.kind === "findings") body += `<section>${findings.map(finding => `<article class="finding" id="${finding.id}"><div><code>${finding.id}</code>${taxonomyBadgeHtml(statusTaxonomy(finding.status))}${archetypeBadgeHtml(statusArchetype(finding.status))}<p class="detail-status">Detailed: ${esc(finding.status)}</p></div><div><h3>${mathHtml(finding.title)}</h3><p>${mathHtml(finding.statement)}</p><p><strong>Boundary.</strong> ${mathHtml(finding.boundary)}</p>${sourceListHtml(finding.sources)}</div></article>`).join("")}</section>`;
  if (chapter.kind === "frontiers") body += `<section><div class="grid">${frontiers.map(track => `<article class="track ${track.priority === "stop-everything" ? "stop" : ""}" id="${track.id}"><p class="status">${track.id}</p>${taxonomyBadgeHtml(frontierTaxonomy(track.id))}${archetypeBadgeHtml(frontierArchetype(track.id))}<p class="detail-status">Priority: ${esc(track.priority)}</p><h3>${mathHtml(track.title)}</h3><p><strong>Question.</strong> ${mathHtml(track.question)}</p><p><strong>Advance when.</strong> ${mathHtml(track.advance)}</p><p><strong>Stop or downgrade when.</strong> ${mathHtml(track.stop)}</p>${sourceListHtml(track.sources)}</article>`).join("")}</div></section>`;
  if (chapter.kind === "provenance") body += `<section><h2>One book, inspectable sources</h2><p class="lede">This preview cites ${allSources.length} controlling documents from ${numberedCount} numbered research documents. Citation-set digest: <code>${sourceDigest}</code>.</p><div class="grid"><article class="track"><h3>Controlling maps</h3>${sourceListHtml([claimPath("00_research_document_map.md"), claimPath("30_research_frontier.md"), claimPath("40_grand_synthesis_spin23_pole.md"), claimPath("49_multi_branch_research_registry.md"), claimPath("91_multi_branch_active_goal_log.md")])}</article><article class="track stop"><h3>Interpretation rule</h3><p>The book is a reading layer. If it conflicts with a cited document, executable certificate or the corpus manifest, the controlling source wins. Presence and coherence do not establish physical truth.</p></article></div></section>`;
  if (chapter.kind === "concept-map") body += `<section><h2>One graph, typed connections</h2><p class="lede">The atlas separates the established mathematical spine from physical realization, projective topology, obstructions and the exceptional horizon. Select any node to see its status, connections and controlling evidence.</p><p><a class="boundary" href="../concept-map/index.html"><strong>Open the interactive concept atlas →</strong></a></p></section><section><h2>The non-negotiable reading rule</h2><p class="lede">A path inherits its weakest edge. Dotted analogy and unresolved dependency never become derivation by proximity to the Spin(2,3) hinge.</p></section>`;
  if (chapter.sources?.length) body += `<section class="chapter-sources"><h2>Chapter sources</h2>${sourceListHtml(chapter.sources)}</section>`;
  body += `<nav class="page-turn"><a href="${previous ? `${previous.slug}.html` : "index.html"}">← ${esc(typeset(previous ? previous.title : "Cover"))}</a>${next ? `<a href="${next.slug}.html">${esc(typeset(next.title))} →</a>` : ""}</nav>`;
  return htmlDoc(typeset(chapter.title), body);
}

function proofDetailHtml(detail) {
  const assumptions = detail.assumptions.map(([name, value]) => `<tr><th>${mathHtml(name)}</th><td>${mathHtml(value)}</td></tr>`).join("");
  const steps = detail.steps.map(step => `<li>${mathHtml(step)}</li>`).join("");
  const ablations = detail.ablations ? `<section><h2>Necessity check</h2><table><thead><tr><th>Input set</th><th>Closure dimension</th><th>Reading</th></tr></thead><tbody>${detail.ablations.map(row => `<tr><td>${mathHtml(row[0])}</td><td>${esc(row[1])}</td><td>${mathHtml(row[2])}</td></tr>`).join("")}</tbody></table></section>` : "";
  const continuation = detail.continuation ? `<section><h2>The source flow reaches the channel generator</h2><p class="lede">${mathHtml(detail.continuation)}</p></section>` : "";
  const mastDetail = `<header class="mast detail-mast"><a href="../index.html">Admissibility frontier · Edition 3</a><nav><a href="../reading-key.html">Reading key</a> · <a href="../04-furey-interface.html#${detail.backAnchor}">Furey interface</a> · <a href="../10-provenance-and-reading-map.html">Provenance</a></nav></header>`;
  const body = `<header class="hero"><p class="kicker">${mathHtml(detail.kicker)}</p><h1>${mathHtml(detail.title)}</h1><div class="chapter-taxonomy">${taxonomyBadgeHtml(detail.taxonomy, "../")}${archetypeBadgeHtml(detail.archetype, "../")}<p>This page exposes the assumptions, proof chain, certificate files and authority boundary behind the chapter claim.</p></div></header><section><h2>Claim under audit</h2><p class="claim-box">${mathHtml(detail.claim)}</p><h3>Start with the picture</h3><p class="lede">${mathHtml(detail.ordinary)}</p></section><section><h2>Objects and assumptions</h2><table><tbody>${assumptions}</tbody></table></section><section><h2>Certificate chain</h2><ol class="proof-steps">${steps}</ol></section>${ablations}${continuation}<aside class="boundary"><strong>Authority boundary.</strong> ${mathHtml(detail.boundary)}</aside><section><div class="grid"><article class="track"><h2>Executable and inspectable certificates</h2>${detailFileListHtml(detail.certificates)}</article><article class="track"><h2>Controlling research documents</h2>${detailFileListHtml(detail.sources)}</article></div></section><nav class="page-turn"><a href="../04-furey-interface.html#${detail.backAnchor}">← Return to the chapter</a><a href="../index.html">Book contents →</a></nav>`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#eee7dc"><title>${esc(typeset(detail.title))} · Admissibility Frontier Edition 3</title>${mathHead("../")}<link rel="stylesheet" href="../book.css"></head><body><main>${mastDetail}${body}<footer>Edition 3.2 admissibility preview · proof/detail page · Citation set ${sourceDigest.slice(0, 12)} · Admission is not endorsement.</footer></main></body></html>`;
}

function claimDetailHtml(detail) {
  const position = claimDetails.indexOf(detail);
  const previous = position > 0 ? claimDetails[position - 1] : null;
  const next = position < claimDetails.length - 1 ? claimDetails[position + 1] : null;
  const specialized = detail.specialized ? `<section><h2>Deeper certificate</h2><a class="proof-link compact-proof" href="${detail.specialized[0]}.html"><span><b>Calculation or obstruction</b><small>${esc(detail.specialized[1])}</small></span><i>Open certificate →</i></a><p>This specialized page exposes the underlying calculation or obstruction in more detail.</p></section>` : "";
  const sourceCards = detail.sources.map(source => `<li><strong>${mathHtml(sourceDisplayName(source))}</strong><a href="../../../${encodeURI(source)}">Open controlling document →</a></li>`).join("");
  const mastDetail = `<header class="mast detail-mast"><a href="../index.html">Admissibility frontier · Edition 3</a><nav><a href="../reading-key.html">Reading key</a> · <a href="../${detail.chapter.slug}.html#${anchorId(detail.heading)}">${mathHtml(detail.chapter.title)}</a> · <a href="../10-provenance-and-reading-map.html">Provenance</a></nav></header>`;
  const body = `<header class="hero claim-hero"><p class="kicker">Expanded claim page · assertion ${detail.claimIndex + 1} of ${detail.claimCount}</p><h1>${mathHtml(detail.heading)}</h1><div class="chapter-taxonomy">${taxonomyBadgeHtml(detail.taxonomy, "../")}${archetypeBadgeHtml(detail.archetype, "../")}<p>${esc(taxonomy[detail.taxonomy].description)} ${esc(archetypeByKey[detail.archetype].description)}.</p></div></header><section><p class="kicker">Exact assertion</p><blockquote class="claim-box">${mathHtml(detail.claim)}</blockquote></section><section><h2>What this commits us to</h2><p class="lede">${esc(claimCommitment(detail.taxonomy))}</p><h2>Logical anatomy</h2><div class="claim-anatomy"><article><h3>Scope</h3><p>Chapter “${mathHtml(detail.chapter.title)}”, section “${mathHtml(detail.heading)}”. This is assertion ${detail.claimIndex + 1} of ${detail.claimCount} in that section.</p></article><article><h3>Evidence posture</h3><p>${esc(evidenceReading(detail.taxonomy))}</p></article><article><h3>Research move</h3><p>${esc(archetypeByKey[detail.archetype].description)}.</p></article></div></section><section><h2>Verification route</h2><ol class="proof-steps"><li>Recover the declared objects and assumptions from the controlling documents.</li><li>Check the calculation, construction, obstruction or stopping rule on those same objects.</li><li>Compare the source conclusion with the exact assertion above; do not strengthen its verbs or enlarge its domain.</li><li>Apply the status rule and retain every named external dependency.</li></ol></section><section><h2>What would move or defeat this claim</h2><p class="lede">${esc(claimChallenge(detail.taxonomy))}</p></section>${specialized}<section><p class="kicker">Source map</p><h2>Controlling documents</h2><ul class="claim-source-map">${sourceCards}</ul><aside class="boundary"><strong>Authority boundary.</strong> This page is an automatically generated reading and audit layer. The cited research documents and executable certificates remain authoritative.</aside></section><nav class="page-turn">${previous ? `<a href="${previous.slug}.html">← Previous claim</a>` : `<a href="../${detail.chapter.slug}.html#${anchorId(detail.heading)}">← Chapter</a>`}<a href="../${detail.chapter.slug}.html#${anchorId(detail.heading)}">Return to assertion</a>${next ? `<a href="${next.slug}.html">Next claim →</a>` : `<a href="../index.html">Contents →</a>`}</nav>`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#eee7dc"><title>${esc(typeset(detail.heading))} · Claim page · Admissibility Frontier Edition 3</title>${mathHead("../")}<link rel="stylesheet" href="../book.css"></head><body><main>${mastDetail}${body}<footer>Edition 3.2 admissibility preview · generated claim page · Citation set ${sourceDigest.slice(0, 12)} · Admission is not endorsement.</footer></main></body></html>`;
}

mkdirSync(bookRoot, { recursive: true });
rmSync(chaptersRoot, { recursive: true, force: true });
rmSync(detailsRoot, { recursive: true, force: true });
rmSync(readingKeyRoot, { recursive: true, force: true });
rmSync(siteDetailsRoot, { recursive: true, force: true });
rmSync(siteReadingKeyRoot, { recursive: true, force: true });
mkdirSync(chaptersRoot, { recursive: true });
mkdirSync(detailsRoot, { recursive: true });
mkdirSync(readingKeyRoot, { recursive: true });
mkdirSync(siteRoot, { recursive: true });
mkdirSync(siteDetailsRoot, { recursive: true });
mkdirSync(siteReadingKeyRoot, { recursive: true });
mkdirSync(assetsRoot, { recursive: true });
if (!existsSync(katexSourceRoot)) throw new Error(`Missing vendored KaTeX distribution: ${katexSourceRoot}`);
mkdirSync(join(siteRoot, "vendor"), { recursive: true });
cpSync(katexSourceRoot, katexSiteRoot, { recursive: true, force: true });
writeFileSync(join(siteRoot, "math-render.js"), `document.addEventListener("DOMContentLoaded",()=>{if(typeof renderMathInElement!=="function")return;renderMathInElement(document.body,{delimiters:[{left:"\\\\(",right:"\\\\)",display:false},{left:"\\\\[",right:"\\\\]",display:true}],ignoredTags:["script","noscript","style","textarea","pre","code"],throwOnError:false,strict:false,trust:false});});\n`);
for (const [name, source] of Object.entries(svgAssets)) writeFileSync(join(assetsRoot, name), `${typeset(source)}\n`);
const tocMd = chapters.map((chapter, index) => {
  const item = taxonomy[chapterTaxonomy[chapter.slug]];
  const role = archetypeByKey[chapterArchetype[chapter.slug]];
  return `${index + 1}. [${typeset(chapter.title)}](chapters/${chapter.slug}.md) — **[${item.icon} ${item.label}](reading-key/status-${chapterTaxonomy[chapter.slug]}.md)** · **[${role.icon} ${role.name}](reading-key/move-${chapterArchetype[chapter.slug]}.md)** · ${typeset(chapter.kicker)}`;
}).join("\n");
const coverMd = `# The admissibility frontier\n\n## New physics by preserving distinctions\n\n**Edition 3.2 admissibility preview · 24 October 2026**\n\n![Relational geometry represented by two linked faces, a central hinge, compass, ruler and Möbius ribbon](../../docs/edition-3/assets/relational-geometry-hero.png)\n\nThe next route to new physics may begin not with higher energy but with greater finesse: preserving phase, delay, boundary order, memory, orientation and cross-channel relation that ordinary measurements erase. This book follows that experimental problem backward into mathematics. Jordan structure delimits what can coexist and compose; Lie structure describes how the admitted domain moves; dynamics and detectors determine which distinctions survive as records. Spin₀(2,3) is one exact recovered completion in that passage, not its protagonist.\n\n> **Authority boundary.** This edition reports exact calculations, bounded constructions, conditional physical bridges and closed branches. It is not empirical confirmation, peer review or a derivation of the Standard Model. The strong claim that admissibility is ontologically prior to physics remains a research proposal; the finesse pathway and its typed tests are the practical result established here.\n\n## Contents\n\n${tocMd}\n\n## Other reading surfaces\n\n- [Read the canonical reading contract](../../corpus/READING_CONTRACT.md)\n- [Read the admissibility synthesis](../../corpus/syntheses/the_admissibility_frontier_current_synthesis.md)\n- [Browse the status and research-move index](reading-key.md)\n- [Open the live paged HTML edition](https://aaron-alderman.github.io/spin23-relational-geometry/)\n- [Open the interactive concept atlas](../../docs/concept-map/index.html)\n- [Inspect the paged HTML source](../../docs/edition-3/index.html)\n- [Return to the repository front door](../../README.md)\n- [Inspect the complete corpus manifest](../../corpus/registers/spin23_corpus_manifest.json)\n\nCitation-set digest: \`${sourceDigest}\`\n`;
writeFileSync(join(bookRoot, "README.md"), coverMd);
writeFileSync(join(bookRoot, "reading-key.md"), readingKeyMarkdown());
Object.keys(taxonomy).forEach(key => writeFileSync(join(readingKeyRoot, `status-${key}.md`), readingKeyDetailMarkdown("taxonomy", key)));
archetypes.forEach(item => writeFileSync(join(readingKeyRoot, `move-${item.key}.md`), readingKeyDetailMarkdown("archetype", item.key)));
chapters.forEach((chapter, index) => writeFileSync(join(chaptersRoot, `${chapter.slug}.md`), chapterMarkdown(chapter, index)));
proofDetails.forEach(detail => writeFileSync(join(detailsRoot, `${detail.slug}.md`), proofDetailMarkdown(detail)));
claimDetails.forEach(detail => writeFileSync(join(detailsRoot, `${detail.slug}.md`), claimDetailMarkdown(detail)));

const contentsHtml = chapters.map((chapter, index) => `<div class="contents-row"><span class="chapter-number">${String(index + 1).padStart(2, "0")}</span><span class="contents-copy"><a class="chapter-title" href="${chapter.slug}.html"><strong>${mathHtml(chapter.title)}</strong></a>${taxonomyBadgeHtml(chapterTaxonomy[chapter.slug])}${archetypeBadgeHtml(chapterArchetype[chapter.slug])}</span><a class="read-link" href="${chapter.slug}.html">Read →</a></div>`).join("");
const coverHtml = htmlDoc("The admissibility frontier", `<header class="hero"><p class="kicker">Volume II · Edition 3.2 admissibility preview</p><h1>The admissibility frontier<br><em>New physics by preserving distinctions</em></h1><p class="lede">The next frontier may require more finesse, not only more energy. Preserve the phase, delay, boundary order, memory and cross-channel relation that ordinary measurements erase; then ask whether the recovered record closes under established physics or exposes a reproducible residual.</p><aside class="boundary"><strong>Authority boundary.</strong> This volume is not empirical confirmation, peer review or a derivation of the Standard Model. Admissibility is an executable research method here; its stronger ontological status remains open.</aside><img class="hero-art" src="assets/relational-geometry-hero.png" alt="Relational geometry represented by two linked faces, a central hinge, compass, ruler and Möbius ribbon"></header><section class="contents"><p class="kicker">Fourteen substantial reader chapters + interactive atlas</p><h2>Choose a chapter</h2>${contentsHtml}</section><nav class="page-turn"><span></span><a href="00-front-matter.html">Begin the volume →</a></nav>`);
writeFileSync(join(siteRoot, "book.css"), `${css}${proofCss}${contentsFixCss}${evidenceCss}`);
writeFileSync(join(siteRoot, "index.html"), coverHtml);
writeFileSync(join(siteRoot, "reading-key.html"), readingKeyHtml());
Object.keys(taxonomy).forEach(key => writeFileSync(join(siteReadingKeyRoot, `status-${key}.html`), readingKeyDetailHtml("taxonomy", key)));
archetypes.forEach(item => writeFileSync(join(siteReadingKeyRoot, `move-${item.key}.html`), readingKeyDetailHtml("archetype", item.key)));
chapters.forEach((chapter, index) => writeFileSync(join(siteRoot, `${chapter.slug}.html`), chapterHtml(chapter, index)));
proofDetails.forEach(detail => writeFileSync(join(siteDetailsRoot, `${detail.slug}.html`), proofDetailHtml(detail)));
claimDetails.forEach(detail => writeFileSync(join(siteDetailsRoot, `${detail.slug}.html`), claimDetailHtml(detail)));
writeFileSync(join(root, "docs", "index.html"), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0; url=edition-3/index.html"><title>The Admissibility Frontier · Edition 3</title></head><body><p><a href="edition-3/index.html">Open the Edition 3 book preview</a></p></body></html>`);

const publicationAuthority = {
  role: "canonical-publication-source",
  repository: "https://github.com/aaron-alderman/spin23-relational-geometry",
  sourcePath: "book/edition-3/book.json",
  generatorPath: "tooling/publication/generate_edition3_book_preview.mjs",
  mirrorPolicy: "Claimipedia and other reading surfaces may add presentation metadata, but must preserve these generated scientific fields and citation digest.",
  authoritativeFields: ["schema", "edition", "generatedAt", "numberedCorpusDocuments", "citationCount", "citationDigest", "taxonomy", "archetypes", "chapters", "proofDetails", "claimDetails", "findings", "frontiers"],
};

const metadata = { schema: "spin23-edition3-book/v1", edition: "3.2 admissibility preview", generatedAt: "2026-10-24T00:00:00.000Z", publicationAuthority, numberedCorpusDocuments: numberedCount, citationCount: allSources.length, citationDigest: sourceDigest, taxonomy, archetypes, chapters: chapters.map((chapter, index) => ({ number: index + 1, slug: chapter.slug, title: typeset(chapter.title), taxonomy: chapterTaxonomy[chapter.slug], archetype: chapterArchetype[chapter.slug], sourceCount: chapter.sources.length, sources: chapter.sources })), proofDetails: proofDetails.map(detail => ({ slug: detail.slug, title: typeset(detail.title), taxonomy: detail.taxonomy, archetype: detail.archetype, certificates: detail.certificates, sources: detail.sources })), claimDetails: claimDetails.map(detail => ({ slug: detail.slug, chapter: detail.chapter.slug, heading: typeset(detail.heading), claim: typeset(detail.claim), claimIndex: detail.claimIndex, taxonomy: detail.taxonomy, archetype: detail.archetype, sources: detail.sources })), findings: findings.map(finding => ({ ...finding, title: typeset(finding.title), statement: typeset(finding.statement), boundary: typeset(finding.boundary), taxonomy: statusTaxonomy(finding.status), archetype: statusArchetype(finding.status) })), frontiers: frontiers.map(frontier => ({ ...frontier, title: typeset(frontier.title), question: typeset(frontier.question), advance: typeset(frontier.advance), stop: typeset(frontier.stop), taxonomy: frontierTaxonomy(frontier.id), archetype: frontierArchetype(frontier.id) })) };
writeFileSync(join(bookRoot, "book.json"), `${JSON.stringify(metadata, null, 2)}\n`);
console.log(JSON.stringify({ bookRoot: relative(root, bookRoot), siteRoot: relative(root, siteRoot), chapters: chapters.length, claims: claimDetails.length, findings: findings.length, frontiers: frontiers.length, citations: allSources.length, digest: sourceDigest }, null, 2));
