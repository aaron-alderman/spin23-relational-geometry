#!/usr/bin/env node

import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join, normalize, relative, resolve, sep } from "node:path";

const root = resolve(process.cwd());
const argValue = name => {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
};
const siteOnly = process.argv.includes("--site-only");
const bookRoot = join(root, "book", "edition-3");
const chaptersRoot = join(bookRoot, "chapters");
const detailsRoot = join(bookRoot, "details");
const readingKeyRoot = join(bookRoot, "reading-key");
const siteRoot = resolve(root, argValue("--site-root") || join("docs", "edition-3"));
const siteIndexRoot = dirname(siteRoot);
const siteDetailsRoot = join(siteRoot, "details");
const siteReadingKeyRoot = join(siteRoot, "reading-key");
const siteArticlesRoot = join(siteRoot, "articles");
const assetsRoot = join(siteRoot, "assets");
const katexSourceRoot = join(root, "tooling", "publication", "vendor", "katex");
const katexSiteRoot = join(siteRoot, "vendor", "katex");
const publicationAssetsRoot = join(root, "tooling", "publication", "assets");
const googleSiteVerificationToken = "9WwsoUYrUkaJiln-l2ByjjyKOs7jVuMGIJp3rrdjFPA";
const publicSiteBase = "https://aaron-alderman.github.io/spin23-relational-geometry/";
const publicEditionBase = `${publicSiteBase}edition-3/`;
const socialImageUrl = `${publicEditionBase}assets/relational-geometry-hero.png`;
const socialImageAlt = "Relational geometry represented by two linked faces, a central hinge, compass, ruler and M\u00f6bius ribbon";
const socialDescription = "A glass-box research corpus tracing relational geometry, admissibility, Spin(2,3), physical interfaces, exact results, obstructions and open experimental gates.";
const articleSlugs = new Set([
  "01-the-revised-spine",
  "02-one-carrier-two-faces-three-relations",
  "03-projective-loop",
  "04-furey-interface",
  "05-standard-model-seam",
  "06-proton-safety",
  "07-exceptional-horizon",
]);
const signatureArticleSource = "docs/papers/typed_object_signatures_physics_epistemics_programming_article.md";
const signatureArticle = {
  slug: "typed-object-signatures",
  title: "What Physics, Knowledge, and Programs Share—and What They Do Not",
  kicker: "Typed signatures, dimensional firewalls, and trustworthy translation",
  source: signatureArticleSource,
  label: "Featured cross-domain article",
  note: "A concise reader edition of the complete circulation paper.",
  completeSource: "docs/papers/typed_object_signatures_physics_epistemics_programming_draft.md",
};
const sourceArticles = [
  {
    slug: "conversational-contact",
    title: "From ‘this sounds stupid’ to an inspectable structure",
    kicker: "How felt mismatch becomes a testable map of conversational contact",
    source: "corpus/programmes/epistemology/frontier_epistemology_06_from_felt_wrong_to_legible_structure.md",
    label: "Epistemology article",
  },
  {
    slug: "pagerank-selection-finesse",
    title: "PageRank, Perron selection and the finesse trade-off",
    kicker: "A selector can guarantee one answer by erasing structure",
    source: "corpus/programmes/frontier-physics-targets/page_rank_perron_selector_bridge_v1.md",
    label: "Methods article",
  },
  {
    slug: "measurement-creates-branches",
    title: "Measurement creates branches, not unique unconditional selection",
    kicker: "Why a record labels a branch without choosing one state for the ensemble",
    source: "corpus/programmes/admissibility/admissibility_38_measurement_creates_branches_not_unique_unconditional_selection.md",
    label: "Measurement article",
  },
  {
    slug: "local-information-global-identification",
    title: "Local information is not global identification",
    kicker: "A locally full-rank detector can remain globally two-to-one",
    source: "corpus/programmes/admissibility/admissibility_107_global_nonlinear_detector_injectivity.md",
    label: "Admissibility article",
  },
  {
    slug: "two-mode-phase",
    title: "A two-mode coupling phase is not an intrinsic seam",
    kicker: "The smallest gauge-invariant phase needs a closed three-mode loop",
    source: "corpus/programmes/lattice-subroutine-gravity/two-mode-phase-gauge-gate.md",
    label: "Physics article",
  },
];
const standaloneArticles = [signatureArticle, ...sourceArticles];
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
const displayHeading = value => {
  const rendered = typeset(value);
  return rendered ? rendered[0].toUpperCase() + rendered.slice(1) : rendered;
};
const isIntegratedFormerHotSection = (chapter, heading) => chapter.slug === "08-admissibility-frontier" && /^[a-z]/u.test(heading);

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

findings.push({
  id: "E3-F27",
  status: "constructed-conditional",
  title: "Causal hydrodynamic relaxation admits positive stationary Gaussian fluctuations",
  statement: "The AZ-103 subluminal relaxation wedge admits positive stationary covariances and positive-semidefinite auxiliary noise satisfying the Lyapunov fluctuation–dissipation identity and explicit Onsager–Casimir reciprocity across the declared momentum scan.",
  boundary: "This is an effective classical Gaussian construction, not a unique physical noise model or a proof of exact quantum-frequency or nonlinear dynamical KMS. Stress Ward identities, contacts, physical normalization and microscopic matching remain open.",
  sources: [
    "corpus/programmes/admissibility/admissibility_103_causal_stable_hydrodynamic_relaxation_wedge.md",
    "corpus/programmes/admissibility/admissibility_104_relaxation_auxiliary_gaussian_kms_completion.md",
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

frontiers.splice(frontiers.findIndex(item => item.id === "A11"), 0, {
  id: "HYDRO-RELAX",
  priority: "highest",
  title: "Match the causal stochastic carrier",
  question: "Which microscopic theory or measurement fixes the relaxation spectrum, physical noise normalization and nonlinear couplings of the causal hydrodynamic auxiliaries?",
  advance: "One source-native stress-response functional reproduces the causal poles, positive covariance and Onsager–Casimir parities while passing exact quantum-frequency and nonlinear dynamical KMS, Ward, contact and entropy gates.",
  stop: "Another positive Gaussian covariance or phenomenological relaxation pole does not select the carrier or close KMS.",
  sources: [
    "corpus/programmes/admissibility/admissibility_103_causal_stable_hydrodynamic_relaxation_wedge.md",
    "corpus/programmes/admissibility/admissibility_104_relaxation_auxiliary_gaussian_kms_completion.md",
  ],
});

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
  external: { icon: "↗", label: "Externally open", description: "Needs an ingredient, calculation or observation not yet supplied by the declared model or evidence." },
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
  "Three local motion types": "established",
  "Transition operators make the boundary measurable": "established",
  "A seam changes the menu of continuations": "conditional",
  "Observers, horizons and outgoing channels": "conditional",
  "the mirror face exists before the quotient": "established",
  "memory depends on the detector scale": "established",
  "The third term is the mediator": "interpretive",
  "The finesse technology pathway": "experiment",
  "the oriented seam becomes an experiment": "conditional",
  "the mixed interface has an exact shape": "established",
  "the missing middle has a type": "conditional",
  "the reachable frontier has a cost shape": "governance",
  "the logical frontier is two controls, not one group name": "conditional",
  "the shared path is not yet a shared algebra": "obstruction",
  "the phase target is relative, not absolute": "conditional",
  "the Casimir bridge has a frequency window": "experiment",
  "the four-mode bench is ready to build": "experiment",
  "the Lean fold now has a finite provenance gate": "governance",
  "the selector chip has a design wedge": "experiment",
  "three hybrid modes are one short": "obstruction",
  "selection is a channel, not a filter": "obstruction",
  "make the proposed cause move": "experiment",
  "a loop and its outcome are different objects": "obstruction",
  "the first new inequality is not new": "obstruction",
  "two currents require three calculations": "external",
  "the microscopic source quotient has five coordinates": "obstruction",
  "the two-current window has a resolution ceiling": "conditional",
  "the high-energy window survives running": "conditional",
  "the detector has two different jobs": "experiment",
  "the spanning tree is not yet one experiment": "external",
  "two edges identify; three edges audit": "experiment",
  "the third edge tests the whole triangle": "experiment",
  "name the coordinates before reading the signs": "obstruction",
  "the weak record hides one direction": "conditional",
  "more energies do not add a coordinate": "obstruction",
  "three generations add flavor, not another anomaly": "conditional",
  "change the record, not just the energy": "experiment",
  "ask for the likelihood, not the plot": "obstruction",
  "a term is not a detector row": "obstruction",
  "the public model has one control too few": "obstruction",
  "more detail cannot restore an erased coordinate": "obstruction",
  "the missing coordinate depends on the declared slice": "conditional",
  "the second gauge detector needs a phase reference": "experiment",
  "an odd resonance moment retains the sign": "experiment",
  "the operator does not choose its boundary": "external",
  "the two rails share a plane, not a group": "conditional",
  "the hydrodynamic cone has poles": "conditional",
  "the screened field is not the whole carrier": "conditional",
  "capture does not need a sink": "conditional",
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
  "Three local motion types": "translator",
  "Transition operators make the boundary measurable": "integrator",
  "A seam changes the menu of continuations": "integrator",
  "Observers, horizons and outgoing channels": "integrator",
  "the mirror face exists before the quotient": "builder",
  "memory depends on the detector scale": "builder",
  "The third term is the mediator": "translator",
  "The finesse technology pathway": "builder",
  "the oriented seam becomes an experiment": "builder",
  "the mixed interface has an exact shape": "integrator",
  "the missing middle has a type": "integrator",
  "the reachable frontier has a cost shape": "auditor",
  "the logical frontier is two controls, not one group name": "auditor",
  "the shared path is not yet a shared algebra": "auditor",
  "the phase target is relative, not absolute": "auditor",
  "the Casimir bridge has a frequency window": "builder",
  "the four-mode bench is ready to build": "builder",
  "the Lean fold now has a finite provenance gate": "auditor",
  "the selector chip has a design wedge": "builder",
  "three hybrid modes are one short": "auditor",
  "selection is a channel, not a filter": "auditor",
  "make the proposed cause move": "builder",
  "a loop and its outcome are different objects": "auditor",
  "the first new inequality is not new": "auditor",
  "two currents require three calculations": "cartographer",
  "the microscopic source quotient has five coordinates": "auditor",
  "the two-current window has a resolution ceiling": "integrator",
  "the high-energy window survives running": "builder",
  "the detector has two different jobs": "builder",
  "the spanning tree is not yet one experiment": "scout",
  "two edges identify; three edges audit": "builder",
  "the third edge tests the whole triangle": "builder",
  "name the coordinates before reading the signs": "auditor",
  "the weak record hides one direction": "translator",
  "more energies do not add a coordinate": "auditor",
  "three generations add flavor, not another anomaly": "translator",
  "change the record, not just the energy": "builder",
  "ask for the likelihood, not the plot": "auditor",
  "a term is not a detector row": "auditor",
  "the public model has one control too few": "auditor",
  "more detail cannot restore an erased coordinate": "auditor",
  "the missing coordinate depends on the declared slice": "translator",
  "the second gauge detector needs a phase reference": "builder",
  "an odd resonance moment retains the sign": "builder",
  "the operator does not choose its boundary": "translator",
  "the two rails share a plane, not a group": "auditor",
  "the hydrodynamic cone has poles": "builder",
  "the screened field is not the whole carrier": "translator",
  "capture does not need a sink": "builder",
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

const frontierArchetype = id => ({ A2: "builder", A4: "builder", A5: "witness", A6: "builder", A7: "translator", A9: "builder", "HYDRO-RELAX": "builder", A11: "builder", GRAPH: "builder", "TORSION-UV": "builder", "MIXED-INTERFACE": "builder" })[id];

const frontierTaxonomy = id => {
  if (["A5", "A7"].includes(id)) return "exhausted";
  if (["A2", "A9", "HYDRO-RELAX", "GRAPH", "MIXED-INTERFACE"].includes(id)) return "conditional";
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
  { slug: "01-the-revised-spine", title: "The Jordan–Lie hinge", kicker: "One exact response-to-symmetry completion", equation: "response data → H₂(R) → Peirce–Schur triple → TKK generators → sp(4,R) ≅ spin(2,3)", sections: [["What closes", ["The route to Spin(2,3) begins with positive two-face response data rather than a top-down list of low-rank coincidences. Positive two-face response data supplies H₂(R); Schur elimination becomes a Jordan-triple operation; Tits–Kantor–Koecher prolongation supplies the graded generators; and the resulting ten-dimensional real Lie algebra is sp(4,R).", "The global low-rank isomorphism then identifies Sp(4,R) with Spin₀(2,3). This is the firm mathematical middle rung."]], ["What remains open", ["The derivation is conditional on the carrier and generator typing. Nature has not yet selected the action, state, vacuum, quantum measure or observed quantity that would make this algebra the dynamical symmetry of a physical system."]]] },
  { slug: "02-one-carrier-two-faces-three-relations", title: "One carrier, two faces, three relations", kicker: "Why three is meaningful", sections: [["The smallest relational closure", ["Two faces define a comparison, but a third relation is the first place where local pairwise consistency can fail around a loop. This is why the gear intuition becomes mathematically meaningful at three: not because the universe is literally geared, but because an odd cycle detects a return defect invisible on a single edge.", "The same grammar appears in two-port response matrices, Peirce off-diagonal spaces, placement triangles and three-edge Wilson data. What is shared is a typed relational pattern, not an identity of physical mechanisms."]], ["Jordan recursion", ["For block-positive response matrices, eliminating an interior degree of freedom produces a Schur complement. Written in Jordan language, the correction is a triple operation. Repeated elimination therefore supplies a concrete meaning for Jordan-triple recursion: local consistency under composition."]]] },
  { slug: "03-projective-loop", title: "The projective loop", kicker: "Möbius intuition, double covers and central sign", sections: [["The exact result", ["An odd three-relation cycle can fail to return on the base configuration while closing on a connected double cover. The placement triangle lifts to a six-cycle, and coherent transport can require twelve steps before every marked datum returns.", "This is the mathematically disciplined form of the twisted odd-gear intuition: the obstruction lives in projective lifting and holonomy."]], ["The reversal", ["The central return −I preserves determinant orientation. It therefore cannot simply be renamed chirality or identified with a Pfaffian-sheet reversal. The negative result is productive: it tells the programme that orientation needs an independently odd datum."]]] },
  { slug: "04-furey-interface", title: "The Furey interface", kicker: "A real operator bridge with a hard boundary", sections: [["Why Furey enters", ["Furey's division-algebra programme provides chiral ideals, particle representations, ladder operations and a Jordan hierarchy. In the present carrier, a continuous Furey product rotation acts as the missing channel generator needed for full sp(4,R) closure.", "This is stronger than analogy: it is an explicit operator participation in a declared finite-dimensional model."]], ["Why it is not yet unification", ["The operator remains effective. Its microscopic origin, charge completion and relationship to the full division-algebra construction are not derived. The result says that a Furey-shaped channel flow can close the algebra—not that Furey's programme has derived spacetime or that Spin(2,3) has derived the Standard Model."]]] },
  { slug: "05-standard-model-seam", title: "The Standard-Model seam", kicker: "Mediator completion and the third edge", sections: [["The attractive construction", ["The minimal Standard-Model field completion points toward dimension-six S₁ exchange operators. They reproduce the two desired crossed arms with the required relative structure."]], ["The uncomfortable edge", ["The same mediator generically closes a triangle and generates a third Wilson edge. One copy is rank-obstructed; copies preserving the same positive Clebsch orientation do not cancel it. A pure star must therefore be derived by a new incidence rule, involution or boundary mechanism—or abandoned."]]] },
  { slug: "06-proton-safety", title: "Proton safety, Pati–Salam and triality", kicker: "Selection is the physics", sections: [["Complete multiplets are not automatically safe", ["Unified representations carry wanted and unwanted channels together. The proton-safe projector exists only after reducing the colour–lepton symmetry that made the complete multiplet attractive in the first place."]], ["The surviving route", ["A finite Pati–Salam reconstruction supplies a concrete source split, while an all-orders rank-one normal form protects part of it. The simplest U(1) and universal Z₂ protections fail. The first surviving family-universal cyclic witness is a Z₉ lift whose faithful low-energy quotient is baryon triality.", "This is a live conditional route, not closure: global anomalies, heavy thresholds, the full finite triple and the third edge remain decisive gates."]]] },
  { slug: "07-exceptional-horizon", title: "The exceptional horizon", kicker: "Jordan, Leech and Monster without overclaim", sections: [["What the local result changes", ["The H₂(R) construction makes the Spin(2,3) middle rung concrete. It clarifies how response geometry, causal positivity and relational composition can meet."]], ["What it does not collapse", ["J₃(O), E₆, E₈, the Golay code, the Leech lattice, Conway symmetry and moonshine remain distinct structures with distinct jobs. The Leech pair-Gram construction reaches H₂(R) and genus-two symplectic geometry, but needs an orientation twist and affine theta shift. No group-name chain substitutes for a carrier-preserving map."]]] },
  { slug: "08-admissibility-frontier", title: "The admissibility frontier", kicker: "New physics by finesse", sections: [["The shift", ["The next route to new physics may begin not with higher energy but with greater finesse: preserving phase, delay, boundary order, memory, orientation and cross-channel relation that ordinary measurements average away. The programme therefore begins where candidate mechanisms become observationally equivalent and asks which erased distinction would separate them.", "The protagonist is the admission–dynamics–detection loop, not Spin₀(2,3) or a larger symmetry landscape, because it determines which mathematical differences can become physical records."]], ["Why Jordan and Lie must be balanced", ["Jordan structure delimits what can coexist and compose as positive states, responses and observables. Lie structure describes how those admitted objects transform and circulate. Jordan has explanatory priority; Lie has dynamical necessity; neither can supply the carrier, selector and detector alone.", "Spin₀(2,3) is an exact conformal completion of one declared rank-two Jordan response cone. It is therefore a recovered symmetry of an admitted geometry, not the prior container of physics."]], ["Dynamics moves the boundary", ["Bound states, boundary bands, resonances and free continua are joined by spectral flow, capture, decay and memory. Dynamics is tested by what it preserves, which context selects a history and which record survives finite detection—not only by whether an equation of motion can be written.", "This turns Casimir response, thermoelectric transport, holonomy, hysteresis, metastability and scattering delay into complementary probes of a changing admissibility boundary."]], ["Three local motion types", ["On one real two-dimensional symplectic carrier, a generator squaring to minus one produces complex rotation, one squaring to plus one produces split-complex boost or squeeze, and a square-zero generator produces dual-number shear. The invariant form admits all three; it does not choose among them.", "The rail-swap mirror is therefore subtler than a second Wick rotation. Applied discretely it is anti-symplectic, but the same matrix satisfies the infinitesimal symplectic condition and its exponential is a connected hyperbolic flow. Signed trace curvature separates the three branches when a short-time intensity record would make them all look linear."]], ["Transition operators make the boundary measurable", ["A lower-energy state is only a possible destination. A physical interaction operator must connect the initial and final sectors; its tensor type fixes the angular and polarization grammar, its reduced matrix element and phase space fix the partial width, and competing widths become a lifetime and detector record.", "Metastable helium is the clean calibration: energy permits decay while parity and spin close the leading electric-dipole route. Nuclear gamma and beta decays preserve the source-to-record architecture but use different multipole or weak operators. Symmetry classifies possible maps; it does not supply their strength or make them happen.", "The practical test prepares one metastable ion, opens a calibrated electric-dipole disposal path and asks one operator model to predict intensity, detuning, angular, helicity, lifetime and line-shape records together. Agreement improves weak-channel control; only a replicated residual outside known multipoles, environment, dephasing and detector effects becomes a new-physics lead.", "A measured width still need not be that population lifetime. Pure dephasing, quasistatic frequency spread, power broadening, an effective continuum pole and the apparatus kernel can make similar lines. The next test therefore joins dark survival, Ramsey, echo, drive and resolution sweeps and propagates their independently measured contributions into the spectrum without refitting each line."]], ["A seam changes the menu of continuations", ["A seam in the local motion algebra is not another name for a decay operator. It changes the kind of continuation available to a mode; a decay channel still needs its own coupling and destination. Full dynamics can remain invertible while the parent-mode projection has no practical return, because the continuation is carried by other modes. This makes a conditional W/Z conjecture precise without promoting it: a proposed elliptic/separating mixture may alter continuation geometry, while any additional pathway must be independently derived and must predict more than the known total width. Without an outgoing channel, seam crossing may become a candidate local closure point only after reflection, trapping, mode conversion, state-space extension and unobserved records are excluded."]], ["Observers, horizons and outgoing channels", ["This section marks a live integration boundary. An accelerated detector closes over a field state, worldline, switching and transition record; its thermal detailed-balance ratio does not mean the global Minkowski vacuum has changed.", "Hawking radiation needs a geometry, quantum state, mode continuation, greybody scattering and detector. Kerr further separates the horizon, ergosurface, light ring and superradiant threshold. Their mixed-generator shape is suggestive, but no source-derived map identifies them with the local Spin(2,3) cell.", "Nuclear isomers, shape coexistence, fission and compound resonances are the near-term hostile controls. They let one vary parent structure, channel coupling and detector record separately. Success first earns better theory engineering; only a replicated residual outside established nuclear, gravitational and detector models earns a new-physics claim.", "The five lanes share a source–evolution–channel–detector composition but differ in which block can be controlled. Thorium-229 is the fastest nested-closure test; generic nuclear reactions are the harshest vocabulary test; Unruh is the cleanest detector regression; Kerr is the strongest multi-record fundamental falsifier; Hawking is the deepest state–geometry–record endpoint. No lane yet supplies a source-derived Jordan/Lie physical bridge."]], ["The third term is the mediator", ["A boundary, selector, environment, memory kernel or detector orientation can mediate the relation between nominal endpoints. Ternary structure makes this context-dependence explicit: changing the middle term can change the admissible relation without changing the endpoints.", "The scientific question behind retained identity or ‘soul’ is whether a measurable invariant survives transformation, descent and observation. This does not declare a soul to be a field or particle."]], ["The finesse technology pathway", ["The practical sequence is to find a mechanism collision, identify the erased distinction, build a detector or reversal that retains it and replicate any residual on an independent carrier. Phase-sensitive controls, nonlinear correlators, boundary-order probes, memory-aware inference and same-material response closure are the immediate tools.", "Each experiment has two valuable outcomes: improved theory or technology if established physics closes the record, and a disciplined anomaly path if a preregistered residual survives nuisance models, reversals and cross-carrier replication. Only the latter sequence can promote the result toward new physics."]], ["the oriented seam becomes an experiment", ["The claim is kept as a bounded integration surface: its mathematics, terminology and experimental interpretation stand or fail on the reasons given here, without requiring the reader to know the order in which they were found.", "The exact result is narrower and more useful than a group-name correspondence. Monster 2A fermionization leaves the ten even genus-two spin sectors after the six odd sectors are killed by Majorana zero modes, while the nine-dimensional sum-zero seam carries a nontrivial orientation sign. But the additive fermionic sum is not the multiplicative Igusa product, the relevant Pfaffian objects live over different bases, and the canonical positive period matrix remains inside the Jordan cone at a separating surface rather than reaching its rank boundary.", "Those obstructions identify the detector. A phase-blind positive response sees the complex sewing parameter only through its magnitude; an isolated two-mode coupling phase can be removed by a basis change. The smallest intrinsic carrier is therefore a three-mode loop: its resonance spectrum identifies opposite loop orientations, while coherent directional transfer distinguishes them. This is now a realistic controlled experiment and an engineering result; it becomes a new-physics test only when a modular or Monster calculation predicts the loop record without fitting it to the device."]], ["Kenotic confidence", ["AI can map dispersed results, optimize separating interventions and maintain the evidence ledger, but it cannot award physical truth. Kenotic confidence means stating the route positively while allowing the experiment, the rival model and the independent reproducer to remain genuinely capable of changing the conclusion."]]] },
  { slug: "08-result-ledger", title: "Result and reversal ledger", kicker: "Twenty-seven retained findings", kind: "findings" },
  { slug: "09-research-frontier", title: "Research frontier", kicker: "Legacy action gates, the graph lane and the current torsion-parent boundary", kind: "frontiers" },
  { slug: "10-provenance-and-reading-map", title: "Provenance and reading map", kicker: "How to audit the book", kind: "provenance" },
  { slug: "11-concept-atlas", title: "Concept atlas", kicker: "The programme as a navigable typed graph", kind: "concept-map" },
  { slug: "12-optional-endpoints-and-readings", title: "Optional endpoints and larger readings", kicker: "Practical hope first; speculation, myth and theology afterwards", sections: [["Practical hope ends in work", ["Hope becomes scientific when it says where to look and what useful work can return. A projector experiment may improve geometric control; a same-film response pipeline may improve force prediction; a null polarized-force search may tighten effective-field-theory bounds. The ordinary outcome must be worth having before any anomaly appears.", "The same work may expose new physics only through a predeclared residual that survives calibration, nuisance models, reversals and competing mechanisms. Unexplained noise is not promoted by desire. The point is a two-outcome design: theoretical or engineering improvement under established physics, and a disciplined discovery route if the established account fails."]], ["Desired endpoints are aims", ["The programme may desire a theory of joint realizability, a physical carrier dictionary, a derived selector, protected cross-response relations and a detector able to separate shared shape from shared mechanism. These aims orient work without becoming predictions.", "Desire does not make an endpoint true, while kenotic caution does not require pretending the programme has no direction. Each desired endpoint must be paired with a closure condition and a result that remains useful if the endpoint is not reached."]], ["Three roles are not three maxima", ["Security, selfhood and kenosis become less paradoxical when they are typed as different mathematical roles: a viability boundary, an invariant carried through change and an outward flow. They are not three rival scalar objectives. The practical question is which trajectories preserve enough capacity and identity for something real to keep passing outward.", "This picture does not solve moral tragedy or derive an ethic from mathematics. It shows where a decision actually crosses a declared boundary, destroys an identity-bearing relation or spends future capacity. Values still choose among admissible paths; the feasible region does not choose its own objective."]], ["Mythic arcs are pictures", ["Chaos becoming an inhabitable order, a traveller crossing a typed gate, a labyrinth retaining a thread, death opening into renewal and reconciliation without erasure can picture aspects of admission, transport, memory, closure and reopening. They are ways of seeing the human meaning of a pattern, not mechanisms in a physical model.", "These pictures are a menu. Remove or substitute them and the scientific claim must remain unchanged. If a theorem or experiment depends on the mythic picture, the picture contains an unstated premise and has exceeded its authority."]], ["Theology under a declared assumption", ["Assume explicitly that God exists; for the specific kenotic reading also assume that God is unsurpassable in knowledge, power and goodness, that creation is genuinely other and intelligible, and that divine power ordinarily serves rather than needlessly replaces creaturely causation. Under those assumptions, the admissibility story can picture creation as a hospitable lawful region in which distinct beings, causes, histories and records genuinely matter.", "An explicitly Christian continuation reads incarnation as entry into creaturely conditions, the cross as non-dominating power sharing their cost, and resurrection as restoration without erasure. This is positive theological analysis from declared premises, not an inference from Jordan/TKK mathematics, an anomaly or a gap in physics; no theological conclusion flows backward as evidence for a scientific claim."]]] },
];

const localMotionSection = chapterSkeletons
  .find(chapter => chapter.slug === "08-admissibility-frontier")
  .sections.find(([heading]) => heading === "Three local motion types");
localMotionSection[1].push("The quarter-turn and mirror do more than name two endpoints. When they anticommute on the same typed plane they generate Cl(1,1), equivalently the full real two-by-two matrix algebra. Their equal and opposite mixtures are two square-zero directed rungs: the dual-number branch is therefore the null seam between compact rotation and noncompact squeeze, not an unrelated third metaphor. The traceless closure is the local Spin(2,1) algebra; lifting it to the corpus's Spin(2,3) architecture still requires a source-native carrier, action and held-out record.");
localMotionSection[1].push("The live Claimipedia carrier now supplies that local cell without fitting: authored source and target roles define a grading that anticommutes with rail exchange, and their product is the negative-square quarter-turn. Its null mixtures are canonical within-fibre rail transfers. The crucial refusal is equally exact: the quarter-turn exchanges signed incidence with unsigned co-incidence rather than preserving the original response, and the scalar rail quotient erases it. Three other certified corpus carriers repeat the same Cl(1,1) grammar, but no cross-carrier intertwiner, shared action or detector record yet makes them one physical operator.");
localMotionSection[1].push("The two rail responses nevertheless have a sharp quotient signature: incidence becomes the ordinary Laplacian of rank thirty-three, while co-incidence becomes the signless Laplacian of rank thirty-five. The two-rank difference counts the two graph components containing odd cycles. This topology does not supply the missing path adjoint. Exhausting all twenty-four permutations and ten involutions of the four authored relation types reverses only the two-record Spin–Temple cell and leaves forty-one records unmatched, so the whole-source star route is closed until new reverse semantics or an independently tested contravariant map is supplied.");
localMotionSection[1].push("The carrier–selector–detector reading now has a minimal physical calibration. Three resonator amplitudes are the carrier, programmable equal-or-opposite coupling parity is the selector, and the product around the closed triangle is the triality detector. Reversing that loop parity leaves the trace and quadratic spectral moment unchanged but shifts the determinant—the product of the three squared pole frequencies—by exactly four times the product of the three calibrated coupling magnitudes. Agreement validates an engineered instance under ordinary mechanics; only a residual surviving shared-parameter response fitting, gauge controls, scaling and cross-carrier replication enters the new-physics lane.");

// This provisional section is intentionally updated as the live result firms.
// Keep the main chapter stable while making the newest detector reassignment explicit.
const admissibilityHotSection = chapterSkeletons
  .find(chapter => chapter.slug === "08-admissibility-frontier")
  .sections.find(([heading]) => heading === "the oriented seam becomes an experiment");
admissibilityHotSection[1][2] = "Those obstructions now assign two detectors rather than one. The binary Igusa character embeds only as loop holonomy zero or pi; both values are reciprocal and make the three-mode directional odd channel vanish, so that sign belongs in a referenced interferometer. The full spin-sector vector retains more: under a first-handle modular T transformation, four free-Majorana sectors acquire an eighth-root phase even though it cancels in the determinant. This supplies a conditional no-fit three-mode target of plus or minus pi over four. The complete Baby-Monster multiplier and the physical modular-to-control-loop map remain capable of cancelling it, so the result is a sharpened experiment rather than a new-physics prediction.";

const admissibilitySections = chapterSkeletons
  .find(chapter => chapter.slug === "08-admissibility-frontier")
  .sections;
const orientedSeamIndex = admissibilitySections
  .findIndex(([heading]) => heading === "the oriented seam becomes an experiment");
admissibilitySections.splice(orientedSeamIndex + 1, 0, [
  "the mixed interface has an exact shape",
  [
    "The 27 typed relations divide into twelve constructive moves and fifteen guardrails. Their incidence images overlap on nine jointly reachable structures with one zero-sum condition. The resulting integral interface is the A8 root lattice: eight adjacent transfers running from detector and holonomy through memory, wall, response, overlap, selection and provenance.",
    "With the equal-weight vertex pairing the interface is positive definite, has determinant nine and discriminant group Z9. It carries a natural permutation-invariant cubic, but the product obtained by projecting coordinate multiplication back to the zero-sum space is not Jordan. The result is therefore a definite transfer lattice, not an octonion, Leech, E6 or E8 identification and not a physical A8 symmetry.",
    "The shape now terminates in decisions. The wall-response return gives one bounded three-step proposal with a positive Hessian and contractive update; the selection-memory-holonomy return is refused at the missing orientation lift. All twelve constructive arrows, fifteen guardrails and twelve return cycles have detector, nuisance, falsifier and reopening fields. Redundant routes, internal guardrails, edge subdivision and evidence-only enrichment preserve A8; a genuine new bridge expands it predictably to A9.",
    "The same typed discipline prevents a false cross-carrier closure. Exhausting the pinned Claimipedia relationship, programme, evidence and provenance operators yields semisimple Lie content sl2 plus sl3, not sp4. The knowledge graph does not secretly reproduce the physics symmetry; a new evidence-bound cross-operator on one shared carrier is the exact reopening datum.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 2, 0, [
  "a lost sign becomes a detector",
  [
    "The newest cross-carrier bridge is deliberately small. A proposed three-overlap sign loop in Claimipedia would be classified by a binary return product, but the present knowledge graph does not contain the required overlaps or transition signs. The science programme already contains the same detector shape on a different carrier: a response projector returns while its coherently marked two-frame comes back through the central transport -I2.",
    "The exact map sends central endpoint transports +I2 and -I2 to binary signs +1 and -1. It preserves composition, and a second traversal squares the negative return to +I2. Projector-only detection erases the sign, while determinant also misses it because det(-I2)=+1. A successful measurement therefore needs projector closure plus coherently referenced endpoint-frame tomography and a one-loop/two-loop parity control.",
    "This result reuses the EX-006 photonic, microwave or acoustic detector packet, but corrects its discriminator: a central -I2 return is reversal-even, unlike a generic reversal-odd non-Abelian holonomy. An engineered success validates the detector architecture. New physics requires a source-native prediction, nuisance survival and replication; the physical result cannot manufacture Claimipedia's missing authored overlaps.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 3, 0, [
  "the missing middle has a type",
  [
    "The natural three-branch kenotic cover does not contain a hidden loop: before removing its junction the cover is a filled triangle, and afterwards it is three disconnected pieces. Its exact residue is therefore a two-dimensional reduced H0 cut signature, not a nonzero H1 winding class. A genuine sign holonomy still requires three independently evidenced pairwise overlaps and authored transition rules that the present graph does not contain.",
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

admissibilitySections.splice(orientedSeamIndex + 4, 0, [
  "detector folding has an exact AM/FM boundary",
  [
    "In the calibrated small-index linear-response model, the carrier and both coherent sidebands reconstruct mixed amplitude and frequency modulation across 972 held-out settings, with a clock-origin-invariant sideband product fixing the difference of their squared depths. The same calculation proves an exact limit: line powers alone are identical for equal-index AM and FM after any linear time-invariant detector fold, while one sideband, sideband-excluding bandwidth and ringdown alone also lose the required relation. This closes the declared benchmark and makes its coherent three-line record the ordinary-physics nuisance baseline for the next G2 long/short-root response test; nonlinear, time-varying, large-index and genuinely hysteretic extensions remain open.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 5, 0, [
  "the G2 scar moves upstream",
  [
    "The D4/Z3 fold really does carry a threefold weight, but after canonical normalization its complete damped two-channel transfer is exactly an ordinary coupled-oscillator response; coherent phase and sideband records remove AM/FM blindness without identifying a G2 origin. The surviving experiment must retain the quotient map: a four-resonator D4 star driven through its symmetric central port has two accessible modes, while unequal addressed detunings of the three outer resonators raise the accessible Krylov rank to four and removal restores rank two. This closes the two-channel root-scar claim by no-go and relocates the positive target to a controlled dark-mode release; fundamental G2 interpretation would still require a source-native triality carrier.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 6, 0, [
  "the missing form was already latent",
  [
    "The signature-(2,3) form used by the rectangular Spin(2,3) closure can now be derived, up to scale, from selector data that predates that closure: a symplectic form and its uniquely compatible positive metric define a complex structure, whose action on primitive two-forms splits five real directions into two and three with opposite wedge-pairing signs. This is a real anti-retrofit advance, but it does not identify those abstract sectors with physical ports. The native positive adjoint still admits two completions: one closes to compact SO(5), the other to noncompact SO(2,3). Worse, the unbroken selector has no invariant map from its two-sector to its three-sector. The remaining experiment and theory target is therefore one independently calibrated common-carrier map that reproduces a selector operation at the ports, treats the observed cross-channel as symmetry breaking, and fixes the noncompact reverse-channel phase.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 7, 0, [
  "the reachable frontier has a cost shape",
  [
    "The nearest eleven target families now carry separate existence, preparation, sampling, detection and independent-verification costs. Most proposed records are polynomial after a small carrier has been prepared, but that does not make the whole frontier easy: the two-current many-body calculation remains exponential through its Hilbert-space dimension, unrestricted logical tomography remains exponential in logical-qubit count, matched-film yield is empirical, continuum and bootstrap convergence remain unbounded, and the exact quotient-scar result is constant-size rather than a scaling theorem. This changes where to look. Sparse system identification, restricted witnesses, differential measurements and common-sample estimators are genuine theoretical-engineering opportunities; hidden Hilbert dimension, unrestricted tomography and unproved limit convergence are stop signs. Complexity is not promoted to a new fundamental law here. It is part of the practical admissibility boundary because a mathematically allowed distinction does not become physical evidence until it can be prepared, retained and independently checked.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 8, 0, [
  "the logical frontier is two controls, not one group name",
  [
    "The two-qutrit code now has an exact control boundary. Source-visible charge-word self-shears plus the optional puncture swap close to order 18; adding the source-labelled compiled mutual shear reaches 54; admitting local Fourier changes without the mutual shear reaches the order-1,152 imprimitive subgroup; and only admitting both reaches all 51,840 elements of Sp(4,F3). The coupled word is real mathematics, but it does not yet explain why one physical carrier executes it, and a Fourier or Legendre change of polarization is not automatically dynamics. The next work is therefore not a search for the group. It is to build one carrier with independently calibrated mutual and polarization-changing controls, record leakage, and predict held-out allowed and forbidden gate words with restricted stabilizer witnesses. Success would be a source-restricted logical laboratory; failure would leave the exact code/Jordan match as compatibility rather than a physical law.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 9, 0, [
  "the shared path is not yet a shared algebra",
  [
    "Claimipedia and Sourcery now have a direct extraction test rather than a verbal resemblance. The pinned Claimipedia capture contains 43 directed relationship records on 38 claim nodes, but zero records carry the exact endpoint signatures, dimensions, declared changes, assumptions, irreversible losses, evidence references, analogy status and authority required for admission as a Sourcery scientific transformation. What is genuinely shared is an ordered directed path skeleton. The four Claimipedia relations say how claims bear on one another; they do not determine a scientific operation or its assumption-loss-evidence valuation.",
    "That no-go remains exact, but the positive side has moved. Four separately authored D02 research paths now pass the active Sourcery v1 protocol: fixed-support local reasoning, operator-range classification, rank-change approach-arc dispatch and boundary-measure dispatch. Their sixteen named steps preserve assumptions, irreversible losses, evidence and proposal-only authority. Fourteen deliberately overstrong queries return no candidates, while fifteen invalid rules remain in rejection receipts. This is not a contradiction: the 43 records are epistemic relations, whereas the admitted D02 edges were authored as scientific operations. A real reason-preserving workflow bridge now exists without pretending that every relation is an operator.",
    "The primary local-theorem path now passes the stricter common-algebra-2 contract. Its four steps retain eleven assumptions, four losses and eight evidence references, and malformed dimension metadata kills the path. The SI zero vector belongs to the proposal-and-review record, not to the response matrix represented inside it. The active v1 host cannot accept the dimension-bearing shape, so a named compatibility projection erases that metadata and records the loss; the unprojected source graph receives a separate v2 receipt.",
    "The result now extends to all four D02 families. Sixteen positive steps pass common-algebra-2; fourteen overstrong queries remain empty; fifteen invalid rules remain rejected; and every family fails closed when a dimension rule is removed or a delta is corrupted. Record-level dimensional migration is closed. This is theoretical engineering, not yet a shared physical algebra: no quantity-level response units, Jordan product, physical action or detector prediction has been extracted. The next datum is finite: expose the actual units on one Schur-response step and predict a withheld product identity, operator composition or calibrated record. Only a source-specific residue surviving those controls would reopen the new-physics reading.",
    "That first quantity-level datum now exists in a deliberately ordinary setting. A calibrated passive RC network carries siemens through the local Schur step; applying a declared voltage changes the output to amperes; and an independent Kirchhoff solve recovers the computationally held-out current. Corrupting the voltage dimension or removing the probe kills the path. This closes one physical operator witness, not the programme: no Jordan product, generating action or independently measured detector record follows. The next look-here target is a source-native admittance dataset or the positive-operator-measure path. New physics enters only if a measured residue survives frozen conventional, parasitic and uncertainty models.",
    "The positive-measure branch now closes at scalar rank one. The same RC network supplies a positive relaxation atom with units of siemens per second; evaluating it at the held-out frequency recovers the Schur correction in siemens, while the coupling sign is correctly lost in the positive quotient. A negative atom and an incorrect dimension delta are refused. This shows that the reasoning seam can carry both a physical response operator and its spectral measure. It does not reconstruct an unrestricted operator-valued measure, generate a Jordan product or predict laboratory data. Those remaining gates require new source information, not another wrapper.",
    "A first source-native measurement now enters. A checksum-identified Zenodo impedance spectrum for one NMC811 cell is split before fitting; a nonnegative passive circuit family trained on 29 frequencies predicts fifteen held-out complex values with 0.462% median and 3.575% maximum relative error. The result closes one measured-response bridge and makes the conventional baseline stronger. It does not close detector likelihood because the source file has no pointwise uncertainty, and it does not establish cross-cell generalization or dynamics. The next honest test is the same frozen protocol across the other 53 cells.",
    "That population test now passes all 54 cells without changing the basis, split or thresholds. The median cell has 0.576% median held-out error; the worst cellwise median is 0.713%, and the worst cellwise maximum is 3.914%. This is strong evidence that the modest residuals belong inside an ordinary passive model class. Each cell was still fitted separately, so one shared population law and detector covariance remain open. The next test must predict an unseen cell without per-cell recalibration.",
    "The stronger test is a revealing near-miss. For each target cell, one parameter vector is formed from the coordinatewise median of the other 53 cells, without reading any target impedance. It predicts 53 of 54 unseen cells inside the frozen limits; only ID07 fails, with 5.575% median error against the declared 5% ceiling while remaining well inside the 20% maximum-error limit. A common passive shape therefore spans almost the whole population, but one localized heterogeneity blocks the universal-law claim. The next look-here target is a preregistered hierarchical predictive distribution using independent cell metadata or a declared minimal calibration record, plus replicate and fixture covariance. That is a practical theoretical-engineering frontier. Neither the near-universality nor the exception is yet dynamics, a detector likelihood or new physics.",
    "The simplest predictive envelope also exposes a trap. At each held-out frequency, the componentwise minimum and maximum of the other 53 cells cover exactly 52 of 54 scalar ranks: the apparent 96.296% coverage is forced because the global minimum and maximum must exclude themselves. It is not validation of a population law. The real datum is relational across frequency. ID07 is above the donor real-part range at all fifteen evaluation points, ID52 is repeatedly extreme in the imaginary part, and only 42 cells keep every complex point inside. A useful population model must carry a latent cell state coherently through the spectrum. The next experiment is nested prediction from one predeclared calibration record or independent metadata, with simultaneous spectral coverage and replicate covariance—not wider pointwise bars.",
    "One fixed 10 kHz complex calibration record then tests the smallest latent-state bridge. A neighbour count chosen entirely inside the other 53 cells lets their passive parameters predict 53 of 54 untouched spectra; ID07 improves but remains outside at 5.250% median error. A more literal physical reading—use the point to solve only series resistance and inductance while keeping donor-median relaxation weights—passes just 36 of 54. One point therefore carries real state information, but the state is not only an offset and slope. The next look-here experiment uses a second, separated calibration frequency that can see relaxation or diffusion, while keeping all evaluation rows untouched.",
    "That second view closes the point-prediction gate. Donor-only nested validation pairs the fixed 10 kHz record with approximately 2.82 Hz for 51 of 54 targets; two alternatives choose nearby low-frequency scales. All 54 cells then pass on fifteen untouched frequencies. The median cellwise median error is 0.674%, the worst median is 3.261%, and the worst maximum is 5.503%. The practical result is a two-tone population-state protocol: one point locates the high-frequency port and one locates relaxation or diffusion. It remains a within-batch point predictor, not simultaneous uncertainty, fixture covariance, external replication, dynamics or new physics.",
    "The final adaptive freedom can also be removed. Fix 10 kHz and 2.8219349 Hz for every target, fix three nearest donors, and keep the passive basis unchanged: all 54 cells still pass. The median cellwise median error remains 0.674%, the worst median improves to 2.290%, and the worst maximum remains 5.503%. This is a reproducible within-batch two-tone point-prediction rule, and therefore a concrete theoretical-engineering gain. It still does not provide simultaneous uncertainty, fixture covariance, external-batch transfer, dynamics or new physics.",
    "The whole predicted spectrum can now be scored as one object. With the two tones and three-neighbour rule still frozen, a donor-only threshold on the maximum error across all fifteen untouched frequencies covers 49 of 54 cells at nominal 90% and 52 of 54 at nominal 95%. ID07 and ID12 remain outside the 95% region. This is a useful internal error radius, not a prospective guarantee: the nested donor fits overlap, the low tone was learned from this batch, and no independent batch or fixture covariance is present. The look-here experiment is now exact—freeze the protocol on newly acquired cells, separate calibration from testing, repeat selected cells across fixtures, and do not retune on the two challenge cases.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 10, 0, [
  "the phase target is relative, not absolute",
  [
    "The free-Majorana part of the Monster 2A route now has exact reduced T1 and S1 actions on all ten even genus-two spin sectors. The earlier exp(i*pi/4) fixed-sector phase was genuine but not yet an intrinsic device flux: a common anomaly-line convention can shift every phase assigned to one generator. What survives is relational. Under T1, a fixed-sector phase squared divided by a two-cycle product is exactly i. Under S1, the odd--odd fixed sector divided by an even--even fixed sector is also i. Both comparisons survive sector rephasing and a common generator phase.",
    "The detector consequence is concrete. One ring programmed to pi/4 is an emulator, not a source-bound prediction. A faithful test needs two coherently referenced sectors, or a fixed channel and a two-cycle channel, driven by the same calibrated control so the common phase cancels. This narrows the theoretical-engineering opportunity to relative-sector interferometry. A complete Monster or new-physics claim still requires genus-two fermionic Baby-Monster amplitudes, their anomaly line and a no-refit physical control map; gravity additionally requires a local action or controlled continuum.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 11, 0, [
  "the Casimir bridge has a frequency window",
  [
    "The same-film Casimir proposal now has a quantitative spectral boundary. A separation d weights imaginary frequencies around the ordinary-frequency scale c/(4*pi*d). The published complex Co2MnGa Hall response from 0.2 to 1.5 THz therefore maps mainly to separations near 119 to 16 micrometres. A practical 0.1 to 1 micrometre force experiment instead calls for off-diagonal response around 24 to 239 THz, or 0.099 to 0.987 eV—15.9 to 159 times above the published Hall ceiling.",
    "Broadband longitudinal optical data already cross that energy range, but they do not supply the missing complex Hall tensor, and measurements from different specimens, stacks and histories cannot be joined as though they were one causal material record. At 300 K the first nonzero Matsubara frequency is about 6.25 THz, also above the present Hall band. A large DC or THz Hall angle consequently does not establish a resolvable boundary-force differential.",
    "The nearest work is now spectroscopy, not force metrology: measure complex diagonal and off-diagonal conductivity on one batch or specimen in both magnetic states from DC through at least 0.1 to 1 eV, fit one passive causal posterior with covariance, and freeze its continuation to imaginary frequency. Only if the predicted parallel-minus-antiparallel force or torque exceeds optical-tail, patch, roughness, magnetic, drift and separation uncertainties should a no-refit force experiment advance. A null remains useful material and metrology engineering; a residual becomes a new-physics lead only after that complete conventional closure fails.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 12, 0, [
  "the four-mode bench is ready to build",
  [
    "The quotient-scar carrier is now specified in engineering units. A 100 MHz hub resonator couples at 2 MHz to three individually driven and read outer resonators with 0.1 MHz linewidth. Exact cyclic symmetry gives a rank-two hub record because only the bright outer sum couples; two contrast modes remain dark but are directly visible through the individual ports. A centred resolved detuning then releases all four poles and raises the same hub record to rank four.",
    "The detector logic now has two independent residues. Along a weak centred detuning ladder, the correction left by eliminating the outer modes begins quadratically because the first moment cancels. In the resolved setting, exchanging two physical outer ports reverses an ordered contrast cubic while leaving the unordered quadratic and product data unchanged. Across 5,000 frozen component-tolerance draws, every device retains more than twelve linewidths of minimum pole separation, more than four percent hub visibility and the preregistered rank-conditioning margin.",
    "This is a construction decision rather than an invitation to redesign the algebra. Building and blindly running the exact, weak, resolved and port-exchange settings would establish useful hidden-mode and detector-loss metrology in ordinary coupled resonators. It would not prove a natural D4, G2 or triality mechanism, because the network was intentionally programmed to realize that grammar. A fundamental claim still requires a source-native carrier that predicts the same record without being built from the answer.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 13, 0, [
  "the Lean fold now has a finite provenance gate",
  [
    "The public images behind the reported Monster-address census name the missing implementation artifacts: three `RequestProject/Ogg/DeclFold*.lean` files, the generated `fold/decls.json`, the `fold_certify` command and the worked declaration `HeckeFold.card_address`. This turns a vague request for “the code” into a finite reproduction bundle.",
    "The bundle has not been located in the audited public surfaces. None of the named paths occurs across 49 public branch tips of the related repository or the author’s 134 public gists. The posted totals—1,979 declarations, 908 addresses, 789 unclamped folds and 13 certificates—therefore remain reported counts. The existing synthetic adaptive-depth result proves something useful about its 32,766 generated chains, but it is not a substitute for the missing source-native environment.",
    "The reason is practical. A little difference in imported root module, declaration selection, metadata removal, DAG sharing, reduction policy or transparency can change which cells are occupied and which declarations collide. The next useful act is not to imitate the infographic. It is to obtain the named files, data and pinned Lean/Lake environment, regenerate the census from a clean checkout, compile the 13 certificates with their axiom dependencies, and then measure which distinctions the fold retains or loses. Only after that does the proposed Hecke reading face its own separate operator-law test.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 14, 0, [
  "the selector chip has a design wedge",
  [
    "The integrated-photonic carrier now has a finite coupled-mode design window. The strict two-percent adiabatic budget requires coupling–length product at least 207.7968; an illustrative 20 per millimetre, 12 mm schedule passes the adiabatic, accumulated splitting, accumulated differential-loss, dark-retention and nonunitarity tests when the unmeasured residual ratios are each assumed to be one part in ten thousand. Those assumptions are design targets, not properties inferred from published matrix fidelity or insertion loss.",
    "The almost-same device is not yet the same experiment. The exact latitude schedule uses signed effective couplings, whereas passive gap-controlled evanescent couplings are ordinarily nonnegative. A fabrication-native route must therefore add calibrated phase sections, cascade returned half-angle modules, or replace the latitude by a positive-octant or braiding path and rerun the full-wave tolerance calculation. Reversal also needs an external phase reference: within an isolated two-dimensional dark space the two quarter-turn senses differ by a central sign that phase-blind process fidelity quotients away.",
    "Selection must remain a separate intervention. A passive anisotropic section strong enough to attract one dark direction is itself splitting or differential loss, so leaving it active during the holonomy stage can counterfeit choice by ordinary mode filtering. The next useful build has a neutral holonomy stage, reference port, independently calibrated and switchable Y stage, and Y-off/Y-on multi-input tomography. Passing would be theoretical engineering; new physics would still require a source-native reason for nature to choose that carrier and selector.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 15, 0, [
  "three hybrid modes are one short",
  [
    "The reported YIG photon–magnon–phonon device is a genuine triple-strong-coupling system, but its rotating-frame matrix is an irreducible three-node chain. With both couplings nonzero that Jacobi matrix has simple eigenvalues and only one dark direction. Three hybrid species are therefore not the same object as one bright direction plus a protected two-dimensional dark space.",
    "The strongest near-doublet reading also fails the present reference budget. Using the 13.26 MHz resonant polariton separation as the remote gap, the three reported polaromechanical pair splittings exceed the AZ-027 relative-splitting limit by factors 1.92, 3.38 and 16.12; the weakest pair is not resolved from its reported polariton linewidth. Reducing the pump coupling does not manufacture the missing protected plane or its three-component control loop.",
    "The positive target is now structurally definite: one central mode coupled to three independently controlled outer modes has spectrum plus/minus the coupling norm and a two-dimensional zero eigenspace. A second cavity mode, mechanical sideband or magnon mode could supply the missing outer partner, but no such tripod, closed loop, dark-space tomography or independent selector is present in the reported experiment. This selects the next architecture; it does not infer new physics from hybridization.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 16, 0, [
  "selection is a channel, not a filter",
  [
    "The acoustic repeated-return proposal contained a type error. A lossless coherent pressure-transfer matrix preserves projective distance and cannot attract distinct preparations. A fixed passive matrix can attract after normalization, but the contraction is then completely controlled by unequal singular values: it is ordinary attenuation or gain filtering, not an additional selection mechanism.",
    "The exact one-third selector map acts affinely on a density matrix or ensemble covariance. It can be built by indexed acoustic shots: route the returned field with probability one third, inject the independently calibrated Y preparation with probability two thirds, retain the branch labels and reconstruct the covariance. Every traceless covariance perturbation then contracts by exactly one third. Individual coherent shots do not contract; only the ensemble does.",
    "A passive filter adjusted to the same local angular slope has singular-value log ratio log three and transmits the orthogonal input with only one ninth of its power. Unnormalized power plus coherence- and population-direction tomography separates it from affine replacement. Single-trajectory attraction requires declared feedback or a nonlinear reservoir with a work, latency, reset and noise ledger. The acoustic platform remains valuable because it can make the distinction among transport, admitted mixing and discarded information experimentally explicit.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 17, 0, [
  "make the proposed cause move",
  [
    "Thermal Hall response is an output port, not a mechanism label. Magnon–phonon Berry curvature and intrinsic many-body magnon skew scattering can both produce a field-odd transverse heat current. The earlier spectroscopy, linewidth and disorder bundle was not minimal: the collision mechanism is itself disorder-free, so clean-limit persistence cannot certify band geometry, and linewidth constrains both stories.",
    "Two sharper coordinates are now specified. First, freeze the relevant one-particle gap from same-specimen spectroscopy and fit the low-temperature occupation order while profiling amplitude and power-law nuisances. A leading hybrid-band term has one-particle activation, whereas the derived collision term has doubled activation. Second, move the phonon crossing with isotope, strain or another lattice-native control, measure the direct magnetic-spectrum shift, and ask whether the Hall feature follows the remaining avoided-crossing motion. Ideal hybrid and collision endpoints occupy approximately (one, one) and (two, zero) in activation-order and crossing-tracking coordinates.",
    "The useful experiment is therefore not simply a more precise Hall trace. It is a joint, held-out mixture test in which the alleged cause is made to move and its rival is allowed to remain present. Intermediate or unstable coordinates mean mixture, crossover or unresolved detector equivalence—not permission to choose the preferred story. This is where the corpus says to look; no existing material is assigned from the local calculation alone.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 18, 0, [
  "a loop and its outcome are different objects",
  [
    "An exceptional-point loop carries two records that a dramatic endpoint image can hide. The instantaneous spectrum has a braid: in the declared two-mode model its discriminant winds once, the square root changes sign and the eigenstate sheets exchange after one circuit in either orientation. The driven state has a history: gain, loss, loop rate and nonadiabatic jumps decide which component remains visible.",
    "Direct evolution makes the difference quantitative. A period-one loop retains a plus-population difference of about 0.681 between the two inputs. By period sixteen, both clockwise inputs reach the plus endpoint with population about 0.996626 while both counterclockwise inputs reach the minus endpoint by the same amount. At period sixty-four the initial-state difference vanishes at recorded precision and the direction-selected population exceeds 0.9998. Slower evolution strengthens selection here; it does not recover the naive symmetric sheet permutation.",
    "The experiment must therefore pair complex eigenvalue and biorthogonal left/right tomography with both initial states, both orientations, a rate ladder and unnormalized gain/loss. An EP-excluding loop with matched imaginary-spectrum exposure tests whether chirality belongs to winding or to the propagator. A useful asymmetric switch may be entirely real engineering while still being the wrong evidence for a topological or spontaneous-selection claim.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 19, 0, [
  "the first new inequality is not new",
  [
    "Three response channels expose a genuine pairwise-to-global gap. Each normalized two-port block can be positive while the joint three-port response is impossible. For equal real correlation the pairwise interval minus one to one tightens globally to minus one half to one. For equal magnitude three fifths, the gauge-invariant phase around the triangle must satisfy cosine Phi at least five twenty-sevenths, giving an exact saturating phase boundary.",
    "This looks like contextual admissibility doing additional work, but the novelty audit fails. The triangle inequality is exactly the determinant condition in the ordinary positive-semidefinite principal-minor test. Pairwise positivity was merely an incomplete conventional envelope. The result is useful global consistency and a detector warning, but it is neither a new law nor a restriction beyond standard full-matrix positivity.",
    "The frontier therefore moves outward. A successful inequality must start with the complete positive causal family and then constrain compatibility across frequencies, common environmental dilations, independently calibrated detector contexts or regulator limits. It must exhibit a conventional point that passes all standard tests and is excluded only by the declared contextual premise. Anything weaker is a rediscovery, however suggestive its language.",
    "The first cross-frequency test now makes that lesson concrete. One positive relaxation spectrum forces the divided differences and slopes at several frequencies to form a positive Loewner kernel. A conventional passive response made from one relaxation branch plus a small inductive term stays positive and decreasing yet violates every two-frequency kernel minor; naming and subtracting the inductive storage restores the kernel exactly. This is useful model discrimination—do these records share the declared relaxation carrier?—but it is standard Stieltjes–Loewner theory, not a new fundamental law. The next look-here test needs measured covariance and then a premise not equivalent to choosing a narrower conventional carrier class.",
    "Storage typing changes the verdict on the real impedance lane. At 1 kHz, 3.162 kHz and 10 kHz, the complete fitted impedance fails the relaxation-only Loewner test for all 54 cells. Remove the series inductance already present in the frozen model and all 54 pass, with a positive smallest corrected eigenvalue. This dramatic reversal is not new physics and not independent validation—the nonnegative basis imposed the shared relaxation measure, while the source lacks measured slopes and repeat covariance. It is a practical detector design: report raw and storage-corrected kernels together, vary fixture inductance, and ask whether only the raw verdict moves.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 20, 0, [
  "two currents require three calculations",
  [
    "The incidence and B minus L source plane has two labels, but its quantum-field-theory frontier is not one two-by-two matrix calculation. The work separates into ultraviolet composite-operator closure and running, broken-phase spectral and contact matching across thresholds, and a finite-temperature tensor problem with KMS and approximate-charge relaxation.",
    "The literature supplies the architecture but not the answer. Ward identities protect the Dirac B minus L row; general mixing theory says the nonconserved incidence insertion may still rescale, shear by the protected current and mix with closure sectors. Published ALP running is a useful cross-check for the broken incidence direction, but exact B minus L is derivative-null there, so the ALP route cannot realize the full two-port vector response. A Majorana mass removes the protected row and begins a separate branch.",
    "The census makes the work finite, and whole-corpus reconciliation sharpens it further: existing source-native calculations already determine the scheme-insensitive quotient and show that the broken sector has more than one channel. The next section states that no-go. The remaining task is not to assume a closed two-by-two block, but to find whether the full response develops an operational low-rank window before thermal continuation.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 21, 0, [
  "the microscopic source quotient has five coordinates",
  [
    "After hypercharge, equation-of-motion and contact redundancies are removed, the completed Standard-Model source quotient has five physical coordinates: four Yukawa violations and one independent weak-anomaly coordinate. Completed B minus L is the unique remaining null direction. This exact result was already present in the corpus but had not been carried into the frontier register.",
    "The leading noncontact Yukawa metric is positive and has four distinct eigenvalues. Neither retained incidence vector is one of its eigenrays. Exact incidence/B minus L two-current closure therefore fails: the protected current is real, but its broken complement contains several independently propagating channels. Rotating coordinates cannot repair that failure because it would merely rename the sources.",
    "The rank-two Jordan cone remains exact for any pair of ports that an experiment actually isolates. The missing reason is now operational rather than algebraic: compute the energy-dependent five-channel response and look for one stable broken singular direction separated from the others across a declared window. A spectral gap would justify a two-port reduced model and guide detector design; its absence would rule out that reduction while leaving the wider admissibility method intact.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 22, 0, [
  "the two-current window has a resolution ceiling",
  [
    "The five-coordinate response now has a first energy-and-resolution map. In the inherited broken-phase threshold model, the bottom-dominated region from 10 to 300 GeV retains a second generalized mode at roughly seven to eleven percent. It is not one broken port even for a detector that resolves only percent-level structure. Above the top threshold, the Yukawa-only second mode falls below one part in a thousand and an effective one-port description reopens.",
    "The weak-anomaly cut sets the sharper ceiling. Its leading vacuum normalization is fixed by the perturbative topological-density spectral function. On the exact five-coordinate source metric and with the declared illustrative weak-coupling inputs, the second mode is 0.1217 percent of the first. The high-energy broken response is therefore rank one at one-percent resolution but rank two at one-per-mille resolution. Top dominance is not a tolerance-free conservation law.",
    "The result does not yet certify a physical energy window. Running couplings, broken-phase electroweak cuts, hadronic matching, interference and detector covariance must preserve the gap across preregistered and held-out energies. If they do, protected B minus L plus one top-dominated port becomes a justified reduced model and a piece of theoretical engineering. If they do not, the two-current reduction closes while the five-coordinate response remains the honest object.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 23, 0, [
  "the high-energy window survives running",
  [
    "The high-energy reopening is not confined to one illustrative point. A declared one-loop third-family run from 400 GeV to 100 TeV keeps the second mode between 0.1315 and 0.1637 percent of the first. The leading orientation changes by less than two parts in a million in overlap.",
    "The sampled window therefore remains one broken port at one-percent resolution and two broken ports at one-per-mille resolution. Ordinary running does not rapidly rotate the response out of its top-dominated direction. The resolution ceiling, rather than scale instability, is the immediate limitation.",
    "This remains a diagnostic, not a precision Standard-Model prediction. Broken-phase electroweak matching, higher-order uncertainty, detector covariance and a real interference-sensitive observable are still required. The practical invitation is exact: look above top production, attempt the percent-level reduced model, and use per-mille sensitivity as the stress test that should reveal the second microscopic direction.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 24, 0, [
  "the detector has two different jobs",
  [
    "Certifying a useful one-percent reduced response and detecting the predicted per-mille second mode are different experiments. Across the sampled high-energy window, a three-sigma one-percent certificate permits about 0.279 percent combined one-sigma error. A three-sigma detection of the second mode requires less than 438 parts per million; equal theory and detector budgets receive about 310 parts per million each.",
    "Orientation is part of the measurement. A few degrees of analyser error can leak as much leading response as the entire second mode, and keeping that leakage below ten percent requires roughly seven-tenths of a degree alignment. A scalar sensitivity number is therefore not an adequate detector description; the apparatus must reconstruct the response direction and its covariance.",
    "There is a second, independent information gate. Rates on the up, bottom and weak-anomaly amplitudes leave two relative-sign choices after a global convention. One interference term fixes only one. Testing the signed relation therefore requires two coherent phase links that connect all three amplitudes. The ideal contrasts are large; the open task is to find source-matched common processes and carry their electroweak and detector covariance without fitting the answer afterward.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 25, 0, [
  "the spanning tree is not yet one experiment",
  [
    "Primary calculations now suggest common-final-state processes for both phase links. Leptonic heavy-meson decay contains an explicit quark-line interference term and gives a low-energy template for the up-type/bottom edge. Associated top, W and ALP production contains top-like and weak-gauge emission diagrams in one final state and gives the high-energy topology for the up-type/weak edge.",
    "Neither link is yet admitted. The heavy-meson result must be recomputed for the Bc two-coefficient source convention and covariance. The tW plus ALP analysis generates one nonzero coefficient at a time, so it does not retain the signed top/weak cross term. Shared sensitivity is not the same thing as measured interference.",
    "The two candidates also live on opposite sides of the electroweak threshold. Their coefficient names form a graph, but their phases form one experimental record only if a declared operator basis, running, threshold matching and correlated nuisance model transport the sign between them. The next task is therefore two quadratic differential response polynomials and one common matching ledger; a vanished or nuisance-collinear cross term kills the corresponding edge.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 26, 0, [
  "two edges identify; three edges audit",
  [
    "The candidate phase links now have a finite extraction protocol. A signed nine-setting grid separates the baseline, possible linear response, both self-responses and the cross-response in every differential bin. Three leftover contrasts test whether the quadratic description itself survives. The cross-response must also remain inside the ordinary positivity bound set by the two self-responses.",
    "Two admitted links do one job: after the process templates and one overall convention are fixed, they recover the two relative signs among the up-type, bottom and weak amplitudes. A third link does a different job. The product of the three edge signs is unchanged when any node convention is reversed, so the completed triangle is the first internal audit of whether the sign really survived the journey between scales.",
    "This does not supply the missing physics. The heavy-meson coefficients, top/weak collider interference, third bottom/weak process and signed electroweak matching matrix remain uncomputed. It does make the invitation buildable: publish the signed response table and covariance, require positivity and held-out prediction, then let the third edge decide whether the joined graph is physical structure or only coordinated naming.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 27, 0, [
  "the third edge tests the whole triangle",
  [
    "A published broken-phase W-associated axion calculation already retains independent top and bottom couplings with mixed terms. This moves the candidate up–down phase edge into the same broad electroweak process family as the top-like and weak-gauge emission topologies. It does not yet supply a three-coupling calculation, but it removes the assumption that sign identification must begin by joining a collider process to a heavy-meson decay.",
    "The complete three-source protocol has 27 signed settings. Nineteen settings—one origin, six axes and twelve pair corners—recover the ten coefficients of a symmetric quadratic response and leave nine pair-plane closure tests. The eight corners where all three sources are nonzero are held out. They ask whether the fitted pairwise story predicts genuinely joint records without adding a three-way term after seeing the answer.",
    "A completed triangle is also more than three acceptable pairs. Joint positivity requires the determinant of the full three-by-three response to be nonnegative; pairwise bounds can all pass while that global condition fails. Node-sign conventions transport the kernel without changing either its determinant or the product of the three edge signs. The look-here instruction is therefore exact: calculate one gauge-complete top–bottom–weak amplitude, run the 27 settings on common phase-space points and let closure, held-out prediction, determinant positivity and detector folding decide whether the triangle exists. Bc decay remains an independent low-energy validation arm.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 28, 0, [
  "name the coordinates before reading the signs",
  [
    "The triangle has two different kinds of content. Positivity, rank and determinant sign describe whether the joint response exists independently of an invertible change of source coordinates. The signs assigned to particular edges describe that response only after those coordinates have been named and held fixed.",
    "An exact counterexample makes the boundary visible. A unit-determinant shear of the synthetic positive response preserves its determinant at 288 and preserves positivity, yet reverses the product of its three edge signs. The cycle product is therefore invariant under independent sign reversals of already named nodes, but not under a general effective-field-theory basis transformation that mixes them.",
    "This matters before combining the ALP papers: the chiral rotations used to define the top and bottom fermion coefficients also shift anomalous gauge couplings. The next deliverable is one signed operator dictionary—including anomaly normalization, running, threshold matching and covariance—followed by the 27-setting response in that basis. Rank and positivity come first; edge signs become physical statements only inside the declared dictionary.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 29, 0, [
  "the weak record hides one direction",
  [
    "The signed tree-level dictionary is now explicit in one standard ALP normalization. On the corpus's zero-Higgs-current representative, the measured fermion coefficients satisfy \\(c_t=-v_u\\) and \\(c_b=-v_d\\), while the weak bosonic coefficient after the anomaly trade is \\(\\widetilde c_{WW}=c_{WW}-a_2/2\\). The minus signs and factor of two are therefore fixed rather than inferred from matching labels.",
    "The result exposes a scope boundary. The five-coordinate quotient is the quotient of phase-current sources. A general ALP effective theory also allows an independent direct weak-boson operator. A W-associated record by itself sees only \\(c_{WW}-a_2/2\\), so shifting \\((a_2,c_{WW})\\) by \\((2\\lambda,\\lambda)\\) leaves that record unchanged. Calling it a measurement of \\(a_2\\) would silently impose the current-only hypothesis.",
    "There are now two clean experiments rather than one blurred one. Set \\(c_{WW}=0\\) and test whether weak emission is inherited from the current anomaly; or retain the direct coefficient as a sixth coordinate and add a record that separates it. The next work is running, electroweak matching, covariance and the 27-setting amplitude in the chosen model. Agreement would provide a justified reduced theory. Failure repaired by the sixth coordinate would locate the edge of the current-source description; a residual beyond the complete model is where new physics should be sought.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 30, 0, [
  "more energies do not add a coordinate",
  [
    "The current-only hypothesis survives the published running order. In the derivative basis the direct weak coefficient \\(c_{WW}\\) is scale independent, while \\(\\widetilde c_{WW}\\) changes because the fermion-current anomaly changes. If \\(c_{WW}=0\\) in the ultraviolet, then \\(\\widetilde c_{WW}(\\mu)=-a_2(\\mu)/2\\) remains true along the flow.",
    "This does not make the hidden coordinate observable. The shift \\((a_2,c_{WW})\\mapsto(a_2+2\\lambda,c_{WW}+\\lambda)\\) leaves \\(\\widetilde c_{WW}\\) unchanged at every scale in the analytic approximation. Repeating the same weak measurement at more energies changes its value but not the information it retains. The record still folds two source directions into one.",
    "A different record is required—one that couples to the direct bosonic operator and the current anomaly in different combinations. Crossing the electroweak threshold does not provide the same weak node at lower energy because the W field has been integrated out; low-energy Bc information is separately matched validation. The look-here instruction is therefore to add operator diversity, not merely an energy scan.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 31, 0, [
  "three generations add flavor, not another anomaly",
  [
    "The one-generation dictionary lifts to five Hermitian three-by-three current matrices. Their 45 real coordinates split into five family singlets and forty traceless flavor directions. The corpus's five-coordinate quotient is the family-universal source slice; it should not be described as the complete general flavor-matrix ALP theory.",
    "CKM transport changes the entries seen in the down-quark mass basis but preserves trace and norm. The weak anomaly sees only \\(A_2=\\operatorname{Tr}(3\\mathbf c_Q+\\mathbf c_L)\\), a rank-one record on the 45-dimensional current space. Traceless flavor perturbations can therefore change fermion records while remaining invisible to the weak bosonic coefficient. More families add flavor structure, not another weak-anomaly coordinate.",
    "The calculation also corrects an inherited name: the displayed null vector \\((1,1,1,-3)\\) is the restricted projection of completed \\(B-L\\), not baryon number alone. A family-universal generation-summed anomaly is three times its per-family normalization. The next bridge must freeze that normalization and use flavor-sensitive records instead of asking one bosonic detector to reconstruct the forty directions it necessarily discards.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 32, 0, [
  "change the record, not just the energy",
  [
    "One term in the published finite weak matching points toward a different record: the flavor-changing down-sector expression contains an explicit contribution proportional to unprimed \\(c_{WW}\\), whereas the weak bosonic record measures \\(c_{WW}-A_2/2\\). Taken by itself, that term gives an independent formal row. It is a candidate mechanism, not yet the coefficient of a complete observable.",
    "The source-complete MFV expression in the same paper changes the conclusion. After running, matching and basis conversion are assembled, its \\((A_2,c_{WW})\\) dependence is again proportional to \\((-1/2,1)\\). The determinant with the weak row is exactly zero, so the old displacement \\((2,1)\\) remains invisible. Belle and Belle II therefore constrain and cross-check the common EFT direction in this scope; they do not open a sixth coordinate.",
    "The buildable next experiment starts one level earlier, with a gauge-complete differential W-associated amplitude. Compute every diagram in one convention, verify Ward identities, fold the result through the 27-setting programme and detector response, and ask whether any retained kinematic shape has a non-collinear \\((A_2,c_{WW})\\) derivative. If it does, flavor data become a held-out cross-scale test. If it does not, this process family closes the route rather than merely failing to measure it well.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 33, 0, [
  "ask for the likelihood, not the plot",
  [
    "The Belle/Belle II search supplies a real detector record: four exclusive B-decay modes, declared mass windows, 711 inverse femtobarns, an unbinned diphoton-mass fit, lifetime-dependent acceptance and a published one-coupling limit. It establishes where the flavor-changing arm touches experiment. It does not by itself preserve the distinctions needed for a joint \\((A_2,c_{WW})\\) inference.",
    "An exact public recast requires six machine-readable objects: each mode's mass grid and profile likelihood, efficiency versus mass and lifetime, the correlated nuisance model, the background and resolution response, and the map from production and decay parameters to accepted yield. No such complete packet was found on the official publication, paper and HEPData search surfaces inspected on 25 October 2026. This is a public-availability boundary, not a claim that the collaboration lacks the information.",
    "Digitizing published curves can orient the search but cannot reconstruct an unbinned likelihood or its covariance. The release packet remains valuable for a faithful recast and a cross-scale validation of the common EFT direction, but the source-complete MFV kernel shows that it cannot open the sixth coordinate in this declared scope. That requires a different, complete observable whose \\((A_2,c_{WW})\\) derivative is demonstrably non-collinear before detector profiling begins.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 34, 0, [
  "a term is not a detector row",
  [
    "This correction separates three objects that can look alike in an equation: an individual matching term, the source-complete coefficient after all contributions are combined, and the detector record after decays, acceptance and nuisance profiling. Independence of the first does not prove independence of the second or third.",
    "For the published MFV numerical kernel at the stated scale, the flavor row on \\((A_2,c_{WW})\\) is \\(0.019(-0.0057)(-1/2,1)\\). It is a scalar multiple of the weak row \\((-1/2,1)\\); their determinant vanishes and both annihilate \\((2,1)\\). The isolated \\(c_{WW}\\) term remains a correct piece of the matching calculation, but other pieces restore the quotient in the complete expression.",
    "The implication is constructive. Flavor searches remain real detectors and valuable consistency tests, while the frontier moves to observables that retain more of the amplitude: angular, energy, polarization or interference information in a gauge-complete W-associated calculation. The practical question is no longer whether a named process mentions \\(c_{WW}\\), but whether its complete, measurable shape responds in a direction the existing record erases.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 35, 0, [
  "the public model has one control too few",
  [
    "The official linear ALP UFO reaches the right process family, but not the full intervention space. It exposes one `CaPhi` control for the Higgs-current direction and one `CWtil` control for direct weak-boson emission. After the known masses are stripped away, the same `CaPhi` makes the top and bottom couplings equal in magnitude and opposite in sign.",
    "This means the available file can move only on the plane \((c_t,c_b,c_{WW})=(x,-x,y)\). Nine of the twenty-seven signed settings lie on that plane. A general three-source quadratic response has six coefficients, while this slice retains only three combinations. Seeing top, bottom and weak vertices in the model is therefore not the same as being able to move their causes independently.",
    "The result is hopeful because the missing work is now sharply bounded. Export one nonredundant gauge-invariant model with independent third-generation currents and \(c_{WW}\), carry the anomaly shifts into the gauge coefficients, generate every completing vertex and pass Ward tests before running the factorial design. A new-physics claim begins only after that complete model, the held-out corners and detector folding fail together; until then this is model engineering, not an anomaly.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 36, 0, [
  "more detail cannot restore an erased coordinate",
  [
    "The hoped-for differential escape from the weak-source quotient is now closed at the declared dimension-five order. The exact source map is \\(v_u,v_d,a_2,c_{WW}\\) \\mapsto (c_t,c_b,\\widetilde c_{WW})=(-v_u,-v_d,c_{WW}-a_2/2\\). It annihilates the displacement \\(0,0,2,1\\) before a phase-space point, polarization or detector has been chosen.",
    "That ordering matters. Every angular, energy and polarization Jacobian of the same process factors through those three amplitude coordinates, so it kills the same displacement point by point. A linear detector fold can discard more information but cannot recreate this lost coordinate. The quadratic response says the same thing: pulling a three-coordinate kernel back to the four source coordinates leaves the exact null direction intact.",
    "The result redirects rather than ends the experiment. An independent top, bottom and weak model is still needed to run the twenty-seven settings and audit the three-coordinate amplitude triangle. But separating the current anomaly from a direct weak operator now requires a genuinely current-sensitive record, an explicit ultraviolet restriction such as \\(c_{WW}=0\\), higher-dimensional structure or a new state. More detail of the same measurement is engineering improvement; a different retained distinction is the frontier.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 37, 0, [
  "the missing coordinate depends on the declared slice",
  [
    "Restoring the full gauge dictionary changes the coordinate count. The five current coordinates plus the three direct gauge labels do not give eight independently observable dimension-five directions. They map to seven physical coefficients and forget the exact redistribution \\(\\Delta A_2,\\Delta c_{WW},\\Delta c_{BB}\\) = \\(2,1,-1\\). The missing direction is a change of representation, not a hidden detector target.",
    "A second gauge record can still do useful work on a declared slice. If \\(c_{BB}=0\\), the weak row \\((-1/2,1)\\) and the hypercharge row \\((1/2,0)\\) have nonzero determinant on \\(A_2,c_{WW}\\). A neutral-gauge measurement can then separate them after the measured fermion differences are removed. If \\(c_{BB}\\) is free, the two records retain the full \\(2,1,-1\\) null and no dimension-five experiment can assign all three origin labels separately.",
    "The look-here instruction is therefore conditional and buildable: finish the charged top–bottom–weak amplitude triangle; then choose an ALP mass window, declare the direct-operator slice and calculate a complete neutral-gauge likelihood through electroweak rotation, decays, acceptance and nuisance profiling. The unrestricted theory should instead be fit in seven basis-invariant coordinates. A residual becomes a new-physics lead only if it requires a direction outside that physical map.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 38, 0, [
  "the second gauge detector needs a phase reference",
  [
    "The conditional detector now has a physical form. After known loop and threshold contributions are carried, charged weak production reads \\(R_W=c_{WW}-A_2/2\\), while the neutral photon amplitude reads \\(R_{\\gamma\\gamma}=c_{WW}+c_{BB}\\). On the declared \\(c_{BB}=0\\) slice these two amplitudes invert exactly to \\(c_{WW}=R_{\\gamma\\gamma}\\) and \\(A_2=2(R_{\\gamma\\gamma}-R_W)\\).",
    "Two event counts are not yet those two amplitudes. Production and decay rates retain squared magnitudes, leaving two relative-sign branches after a common reversal is removed. A diphoton branching fraction also depends on the total ALP width. The minimal successful detector therefore needs calibrated interference, a coherent phase reference or a third signed response, together with the complete width and acceptance model.",
    "The realistic experiment is now finite: choose a mass window, freeze the source-complete \\(c_{BB}=0\\) model, run the charged factorial settings and a signed photon or photon–Z reference scan, and profile lifetime, resolution and correlated backgrounds. Passing gives a justified reduced theory and a new detector capability. Releasing \\(c_{BB}\\) restores the exact null; a new-physics claim requires a replicated residual outside the complete seven-coordinate likelihood.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 39, 0, [
  "an odd resonance moment retains the sign",
  [
    "The missing phase reference can be supplied by a calibrated continuum with the same quantum numbers. Near a narrow diphoton pole, write the amplitude as \\(B+S/(x+i\\gamma)\\), where \\(x=m_{\\gamma\\gamma}^2-m_a^2\\). The above-minus-below bin difference is \\(4BSx/(x^2+\\gamma^2)\\): the leading continuum square and signal square cancel, while the sign of the resonant residue remains.",
    "An ordinary symmetric resonance count integrates this real interference away. Weighting events by the sign of \\(x\\) instead gives a nonzero odd moment proportional to \\(BS\\), and reversing the signed source reverses the moment. Applied across the twenty-seven charged-source settings, this can connect the photon amplitude to the already signed top–bottom–weak triangle rather than treating a diphoton branching fraction as an unrelated magnitude.",
    "The statistic is exact only in the local analytic model. A real likelihood must carry complex continuum helicities, absorptive phases, all open widths, symmetric-resolution suppression, acceptance asymmetry and background-slope leakage constrained by sidebands. The next step is therefore one declared final-state calculation and detector convolution. Passing would be a practical signed-coupling measurement; only a replicated residual outside the complete seven-coordinate model would point toward new physics.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 40, 0, [
  "the operator does not choose its boundary",
  [
    "Four new papers make one distinction unusually concrete: a bulk action or spectral operator can be held fixed while different boundary conditions, real slices or operator domains produce different physical theories. One abelian Chern--Simons carrier supports twenty-two code boundaries; a symmetry-selective flux on the fuzzy sphere turns a monodromy choice into fractional transverse spin and defect OPE data; and the Hitchin/Perelman construction explicitly leaves the physical eigenfunction domain unchosen.",
    "The reason is that an equation says which motions are available, while a domain says which states and motions are admitted. The lattice-fermion example adds the translation warning: exact microscopic Onsager structure can appear as a larger infrared symmetry in a different representation, but locality, compactness and gauging do not all survive unchanged. The Narain handlebody coefficient gives the positivity warning: it is zero for two pairs and negative from three onward, so an exact linear expansion need not be a positive physical ensemble.",
    "This opens a finite look-here experiment rather than a universal identification. The authors promise the energies, matrix elements and fit code upon publication; until that bundle appears, the table is an audit fixture rather than an independent reproduction. Then freeze one fuzzy-sphere bulk coupling; run untwisted, pi-twisted and symmetry-breaking controls; refine the sphere size; and predict held-out fractional-spin levels and OPE coefficients without retuning the bulk. Success would improve boundary engineering and defect spectroscopy. A new-physics claim begins only if a replicated selector-specific residue survives the complete bulk, boundary, regulator and detector model. None of these papers by itself identifies its system with the corpus's Jordan, Spin(2,3), exceptional or Standard-Model candidates.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 41, 0, [
  "the two rails share a plane, not a group",
  [
    "The Monster Lie algebra's Lorentzian grading lattice \\(II_{1,1}\\) sits exactly inside the rank-two Jordan carrier as the diagonal matrices \\(\\operatorname{diag}(m,n)\\). The determinant becomes \\(mn\\), and the Weyl exchange swaps the two primitive diagonal directions. This is a shared kinematic plane, not a Monster action on the full cone and not a map from the finite Monster group to \\(\\operatorname{Spin}_0(2,3)\\).",
    "The Rule-60 calculation makes the same boundary operational. On the eleven-dimensional image of \\(T=1+\\sigma\\) in the cyclic Golay code, \\(T^{89}=\\sigma^2\\), while \\(T\\) has order \\(2047=23\\cdot89\\). Because 89 does not divide the Monster order, Rule 60 itself cannot be a Monster element. The genuine finite symmetry is the order-23 shift \\(\\sigma\\); Rule 60 remains a group-algebra update with an order-89 residue the proposed symmetry does not retain.",
    "The scalar \\(\\sigma\\) bridge now closes exactly. Its fixed Leech lattice has Gram matrix \\(\\left(\\begin{smallmatrix}4&1\\\\1&6\\end{smallmatrix}\\right)\\) and determinant 23, and its normalized theta/eta trace is the common 23A/23B McKay--Thompson series. The quadratic-residue and nonresidue rails have Gaussian periods in \\(\\mathbb Q(\\sqrt{-23})\\), and reduction on the two Golay factors contracts them to the conjugate ideals \\(\\left(2,\\alpha\\right)\\) and \\(\\left(2,\\alpha+1\\right)\\): the finite-field-to-oriented-ideal-to-lattice-to-trace compiler is literal once a primitive root is declared. The inverse ideals have the same scalar theta series, so this record provably forgets orientation. A September 2026 preprint supplies a self-orbifold 23AB channel with 529 sectors, the \\(U(23)\\) discriminant form, an embedded \\(P(23)\\) parafermion algebra and a duality defect exchanging twist and charge. Its quarter-turn and fifth-power orientation exchange generate \\(\\mathrm{Dic}_{11}\\), an exact order-44 instruction set on sector labels. Projectivizing removes its central sign and leaves \\(D_{11}\\) acting with a two-axis orbit and a 22-direction mixed orbit. The finite action embeds in \\(Sp(4,23)\\cong Spin(5,23)\\), but finite reduction retains no real signature, cone or time orientation. Ordinary genus-one charge projection still collapses the twenty-two nonzero charges. A separate conditional construction predicts twelve defect lines governed by \\(\\Gamma_1(25)\\); \\(X_1(25)\\) also has genus twelve, uniquely in the odd Monster-prime survey. The identity plus eleven inverse-paired generator orientations gives a third, differently typed twelve. No bijection among these counts has been derived. The full scalar commuting-insertion search is now also closed: \\(C_{\\mathbb M}(g)\\cong C_{23}\\times S_4\\), its five insertion classes reduce to cyclic products of orders 23, 46, 46, 69 and 92, and every corresponding A/B McKay--Thompson pair is equal. The projective escape closes too: the order-24 Monster anomaly transgresses trivially along the order-23 twist, so the action is linearisable and those five class traces determine the full graded \\(S_4\\) module. The look-here calculation is therefore to identify the corpus cycle with an oriented generator, construct cross-grade VOA/defect composition, and sew it at genus two with the required metaplectic multiplier. A useful result would improve code, defect and modular engineering. A physical claim additionally requires the missing off-diagonal response, a dynamics and a detector record; the shared plane and chiral defect alone supply none of them.",
    "The modular calculation now goes further. Fricke invariance gives the mixed branches as \\(T_{23}((\\tau+r)/23)\\), and Fourier projection filters coefficients by \\(n\\equiv ab\\pmod{23}\\), reconstructing all 529 module characters as 25 scalar types. Volpato's inversion yields positive seeds for the twelve even-\\(l\\) commutant characters, and exact phase bookkeeping gives \\(Z^{\\mathcal N}_{23}/\\sqrt{23}=q^{-1}+2+2446q+115834q^2+2446684q^3+33295322q^4+\\cdots\\). Fifth-power exchange preserves \\(ab\\), so this scalar defect trace is orientation-blind. The complete \\(C_{23}\\times S_4\\) insertion census now rules out every additional scalar one-insertion trace. The look-here calculation must instead retain a vector-valued/projective \\(S_4\\) action, a relation among several insertions, or sew at genus two; another scalar trace cannot name 23A versus 23B.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 42, 0, [
  "the hydrodynamic cone has poles",
  [
    "The hydrodynamic rank witness now has a full effective response rather than three positive shapes. The tensor term is local at first derivative order, the shear channel has a diffusive pole, and the sound channel has two attenuated propagating poles. At the declared point every pole is retarded, every residue is nonzero and the assembled two-port spectral matrix is positive definite.",
    "A common-temperature KMS multiplier produces the noise matrix without changing rank. An invertible port change acts by congruence and preserves rank, while a real analytic contact changes the dispersive part without changing the spectral matrix. The extra direction is therefore not created by port names or an ordinary real contact term, and Ward/KMS structure does not force the effective cone onto one ray.",
    "The remaining word is effective. Port congruence is not a hydrodynamic frame transformation: the latter must be performed inside one source-generating functional and leave source derivatives, poles and residues invariant. Microscopic or measured matching is also absent. The look-here calculation is now precise—derive that functional, change frame explicitly and ask which response directions survive before making any symmetry or new-physics claim.",
    "That first frame test now closes at Gaussian order. Put shear and sound inside one quadratic source functional and mix the two internal fields by a nontrivial invertible matrix, transforming both their inverse kernel and their source coupling. The complete source Hessian agrees at four complex frequencies to better than one part in ten trillion; its pole set and residues are therefore unchanged. Internal coordinate names cannot create the channel. Derivative-dependent Ward-complete frame changes and microscopic matching remain the exact boundary.",
    "The first local derivative test now closes too. A triangular determinant-one change of the internal fields includes both a time derivative and a spatial Laplacian, has a finite polynomial inverse and acts with opposite momentum on the two legs of the source bilinear. Transforming both couplings and the kernel leaves the full Gaussian response unchanged across five frequency samples to within one part in one hundred trillion. Physical poles, residues, the spectral matrix and its common-temperature KMS image survive. The open boundary is no longer generic derivative-coordinate choice; it is the nonlinear Ward-complete Schwinger–Keldysh improvement and contact structure plus microscopic matching.",
    "The thermal doubling test now closes at the same Gaussian order. Retarded response, advanced response and equilibrium noise are placed in one Schwinger–Keldysh kernel, and the local derivative frame is applied to both doubled fields and their source couplings. The noise remains positive, fluctuation–dissipation remains exact to numerical precision and the complete doubled source record is unchanged. This is good news with a sharp limit: equilibrium fluctuations do not erase the multichannel direction, but the next claim must survive nonlinear dynamical KMS, stress Ward identities, entropy and validity control, improvement/contact classification and microscopic or measured matching.",
    "The first nonlinear audit identifies what that next claim must carry. A unit-volume nonlinear change of two equilibrium variables turns constant noise into state-dependent noise and induces an additional drift. Carrying both effects preserves zero equilibrium current; changing only the deterministic equation manufactures a false irreversible current. The hydrodynamic implication is concrete: nonlinear response fields, noise, measure terms and stochastic prescription must transform together. This finite-dimensional result is a guardrail, not yet the derivative-ordered stress-Ward-complete fluid action.",
    "Causality supplies a further boundary. The inherited diffusion and wave-damping laws are long-wavelength expansions and have no global finite-speed interpretation. Adding one relaxing shear flux and one relaxing viscous stress produces a stable subluminal parameter wedge and recovers the original poles at low momentum. This shows that the response can live inside a causal completion; it does not tell us which completion nature uses. The physical relaxation spectrum, noise normalization and microscopic carrier must still be derived or measured.",
    "Conditionally, those relaxation variables admit positive stationary Gaussian fluctuations. Noise acts only on the relaxing flux and stress, while conservation carries their fluctuations into the observed hydrodynamic variables. The resulting covariance is positive, satisfies fluctuation–dissipation and passes an explicit Onsager–Casimir parity audit throughout the causal momentum scan. The evidence ladder is now effective infrared poles → causal auxiliary completion → positive stationary Gaussian FDT and reciprocity. Exact quantum-frequency and nonlinear dynamical KMS, the stress Ward and contact structure, physical noise normalization and source-native relaxation data remain open.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 43, 0, [
  "the screened field is not the whole carrier",
  [
    "The long-range energy-current problem has a conventional local completion when matter and finite-speed electromagnetic fields are retained together. Matter gains the work density \\(\\mathbf j\\cdot\\mathbf E\\); field energy loses the same amount through Poynting continuity. Their sum therefore has a local finite-\\(q\\) current without assigning every Coulomb bond to one endpoint. A finite Fourier certificate closes this identity and its ordinary potential-gauge invariance.",
    "That does not make every microscopic energy current identical. Moving a bounded divergence between local energy densities changes the current by a total time derivative. It leaves regular dc Green--Kubo transport unchanged, but it can change finite-frequency records; singular infrared polarization is exactly where the regularity premise may fail. ‘Gauge’ therefore names a controlled equivalence, not permission to ignore the order of limits.",
    "Screening reveals the missing thing. In the minimal local scalar completion of a static kernel \\(1/(q^2+\\kappa^2)\\), the electric-gradient share of mode energy is \\(q^2/(q^2+\\kappa^2)\\), while the non-gradient screening sector holds \\(\\kappa^2/(q^2+\\kappa^2)\\). At \\(q\\ll\\kappa\\), adding Maxwell \\(E^2\\) alone omits almost all the energy in that completion. A physical model must identify the sector represented by the \\(\\kappa\\) term and give it dynamics, energy and flux; the fractions are not asserted for every microscopic screening theory. The look-here calculation is now concrete: build matched finite-speed and explicit-screening completions of the projected lattice model, integrate them out to recover the same Ewald kernel, and compare total KMS transport under one order of size, wavevector, screening, frequency and light-speed limits. Agreement gives a robust engineered heat-current definition; disagreement before matching diagnoses a missing carrier, not new physics.",
  ],
]);

admissibilitySections.splice(orientedSeamIndex + 44, 0, [
  "capture does not need a sink",
  [
    "The spectral-flow bath can now be replaced by a recognizable acoustic carrier. A harmonic rail fixes the phonon band and dispersion; a local bond-strain transition fixes the relative mode weights and automatically removes the translational zero mode. With a declared transition matrix element, complete unitary evolution transfers 0.99662 of the population to bound matter plus phonons before recurrence while conserving norm and total energy within five parts in one hundred billion.",
    "The phase ledger matters as much as the population. Backward evolution of the complete final state reconstructs the initial excited state, showing that the apparent capture is coherent redistribution, not a concealed absorber. The finite-temperature upward/downward factors also reproduce the exact Boltzmann ratio. A source-shaped unitary environment can therefore produce a long capture window without a Markov sink or a freely drawn spectral envelope.",
    "The graph part of the missing source has now been computed and correctly normalized. The lower AZ-055 pole, an incoming energy-space packet, all eight complex bond-modulation overlaps and a finite acoustic rail evolve under one Hermitian Hamiltonian. For the declared common bond derivative \\(D=0.2\\), the 96-bin/240-site calculation gives a capture probability of \\(1.0892761\\times10^{-3}\\) and a conditional emitted-phonon energy of 1.2182162; the preceding refinement changes the probability by only 0.258%. Norm, energy and backward phase recovery close below \\(1.4\\times10^{-9}\\). The modest sub-percent result is more informative than the earlier strong two-level benchmark because continuum normalization is no longer being mistaken for a discrete coefficient. The look-here calculation has now narrowed to a named material or engineered device: measure bond-resolved \\(dt/du\\), masses and springs, then test thermal and multiphonon convergence. Success could improve phonon-assisted state preparation and boundary capture engineering; failure would locate the missing disposal channel precisely.",
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

const admissibilityChapter = chapterSkeletons.find(chapter => chapter.slug === "08-admissibility-frontier");
const dynamicsSectionIndex = admissibilityChapter.sections.findIndex(([heading]) => heading === "Dynamics moves the boundary");
admissibilityChapter.sections.splice(dynamicsSectionIndex + 1, 0, ["memory depends on the detector scale", [
  "A six-cell passive thermal or RC carrier now supplies the physical three-scale construction that the abstract descent calculus lacked. Fixed detector regions average six cell readings to three and then two, with no fitted interscale basis. Across three held-out conductance substitutions, nonnegative temperatures and the uniform mode survive, and direct compression agrees with staged compression. This closes AZ-099's finite OT-019 construction, not a universal coarse-graining theorem.",
  "The stronger question is whether a detector-hidden difference stays hidden after motion. Balanced wiring and a held-out change confined within detector regions descend exactly. A mild asymmetric edge makes a hidden fine difference visible to the three-region detector, but the two-region detector identifies it again. A stronger asymmetry survives into the coarsest record. Memory is therefore not a property of the carrier alone: it belongs to a carrier, dynamics and detector scale together.",
  "The exact two-stage defect identity and five-step telescoping bound say how much history a memoryless reduced model omits. The practical look-here target is a six-node network: prepare two fine voltage or temperature patterns with the same reported averages, substitute declared edges and measure whether later coarse records split at the predicted scale. Success improves reduced-model engineering; a preregistered residual beyond component and readout covariance would indicate missing dynamics. Neither outcome by itself establishes Spin(2,3) or new physics."
]]);

const memorySectionIndex = admissibilityChapter.sections.findIndex(([heading]) => heading === "memory depends on the detector scale");
admissibilityChapter.sections.splice(memorySectionIndex + 1, 0, ["a zero mode does not fix its detector weight", [
  "A minimal chiral wall was deformed through six profiles while its one zero mode, signed index and nonzero gap were held fixed. The centre-port residue nevertheless changed by more than a factor of three, and localization changed with it. A protected pole therefore does not supply a protected detector weight.",
  "Raw zero-mode phase also fails: a unitary site gauge changes it without changing the spectrum or any intensity. Sublattice support remains exact, but in this carrier it is simply the signed chiral index written as a detector statement. Counting it again as information beyond the index would duplicate the same protection.",
  "The practical implication is a no-go and a new target. The minimal SSH or Jackiw–Rebbi wall cannot close the beyond-index frontier. A reopening must add an independently protected crystalline representation, projective label, multichannel scattering eigenphase or non-Abelian datum, then hold the signed index fixed while trying to scramble that extra record."
]]);

const zeroModeSectionIndex = admissibilityChapter.sections.findIndex(([heading]) => heading === "a zero mode does not fix its detector weight");
admissibilityChapter.sections.splice(zeroModeSectionIndex + 1, 0, ["a defect can carry a second label", [
  "The beyond-index question closes only after an independent crystalline datum is added. Two reflection-symmetric wall carriers can have the same spectrum, one zero mode and the same signed chiral index while their defect orbitals have opposite mirror parity relative to a calibrated reference.",
  "Coherent mirror-even and mirror-odd ports distinguish the two branches exactly throughout six symmetry-preserving wall deformations. Deliberately changing one bond without its reflected partner keeps the zero mode and index but opens the forbidden port. The extra label is therefore protected by reflection and read through a selection rule, rather than inferred from localization or a raw wavefunction phase.",
  "This is a constructive but kenotic closure. The chiral topology did not generate the mirror label; the carrier supplied an orbital representation and the apparatus supplied a reference. The immediate engineering target is an isospectral pair of domain-wall channels with opposite calibrated parity. Material realization is open, and a residual beyond fabrication covariance would first indicate missing couplings rather than new physics."
]]);

const reflectionSectionIndex = admissibilityChapter.sections.findIndex(([heading]) => heading === "a defect can carry a second label");
admissibilityChapter.sections.splice(reflectionSectionIndex + 1, 0, ["local rank is not global identity", [
  "A compact history-dependent model now makes the difference between nearby distinguishability and whole-family identification exact. A pulse drives a latent amplitude, memory carries part of it into later steps, and a calibrated power detector squares the result. Its local information matrix has full rank across 34,782 audited points, yet positive and negative control couplings produce identical power records.",
  "The collision is structural, not numerical. Gain calibration and three pulse histories recover the memory coefficient and coupling magnitude, but power has forgotten the coupling's orientation. The honest power-only answer is therefore a two-point sign quotient. One coherent amplitude measurement relative to a calibrated phase reference retains the missing relation and makes the five-record bundle globally injective on the declared compact family.",
  "This closes one finite detector-design question, not nonlinear identification in general. The look-here experiment is a resonator or oscillator driven by the same preregistered histories while phase-reference drift, gain, saturation and model discrepancy are varied through measured covariances. A failure should first reopen the carrier or detector model. Only a stable residue across independently calibrated platforms would point beyond theoretical engineering toward new dynamics."
]]);

const globalIdentitySectionIndex = admissibilityChapter.sections.findIndex(([heading]) => heading === "local rank is not global identity");
admissibilityChapter.sections.splice(globalIdentitySectionIndex + 1, 0, ["the quotient does not choose the operator", [
  "Three D4-shaped objects now expose a sharp translation boundary. The root intersection form, star diffusion generator and coherent hopping matrix all permit the same cyclic permutation of three outer coordinates. They nevertheless have different spectra and kernels.",
  "The quotient consistently retains a two-dimensional fixed sector and removes two contrast directions, but the operator induced on that sector depends on which carrier was present before quotienting. A dark resonator mode is not thereby a defect-localized state, and the conserved Markov zero mode is not a singularity index. Shared action is weaker than shared carrier and weaker again than shared dynamics.",
  "OT-046 therefore needs a physical noun before another spectral calculation: one spatial or geometric operator family, its deformation coordinate, boundary conditions, quotient pushforward and stable index or pole record. Supplying that package could yield useful defect engineering. Without it, a D4 diagram cannot support a new-physics inference."
]]);

const quotientOperatorSectionIndex = admissibilityChapter.sections.findIndex(([heading]) => heading === "the quotient does not choose the operator");
admissibilityChapter.sections.splice(quotientOperatorSectionIndex + 1, 0, ["one action reaches the four detector ports", [
  "The engineered four-resonator bench now has one generative object rather than a Hamiltonian, damping rule and detector map placed side by side. A Gaussian doubled action produces the retarded operator, driven amplitudes, dissipated power, positive fluctuation kernel and all four calibrated complex port records.",
  "The same action covers both the exact quotient setting and the resolved outer-detuning intervention. Across 98 frequency and setting cases, its equation residual and injected-versus-dissipated power residual remain below numerical tolerance. This is the positive control OT-027 lacked: operator, amplitude, loss and record can belong to one causal model.",
  "The boundary remains decisive. The D4-shaped couplings were programmed into the apparatus, so the action does not explain why a natural carrier or a Claimipedia relation should realize them. The next look-here target is a source-native relation-to-hardware dictionary with a held-out detector consequence; building the bench tests action-to-record engineering, not fundamental D4 physics."
]]);

const actionRecordSectionIndex = admissibilityChapter.sections.findIndex(([heading]) => heading === "one action reaches the four detector ports");
admissibilityChapter.sections.splice(actionRecordSectionIndex + 1, 0, ["the relation emulator is ready to build", [
  "The relation-emulator register was behind its own evidence. The sixteen modes, twenty-four directed links, disabled seams, QR-003 wall control and minimum detector schedule have already been chosen and independently verified. OT-024 is therefore active laboratory work rather than an unfilled design gate.",
  "The detector needs nine path channels, fourteen triangle channels and one direct wall channel. Its response basis is unimodular, the visible singular gap is about 0.455, reciprocal leakage opens the wall channel with slope four, and thirty-three unused nonzero composition records remain for precision and withheld validation. QR-001, not the wall, is the equal-noise statistical bottleneck.",
  "The next work is concrete: build the directed network, measure complex covariance, redesign the redundant schedule without opening held-out records, and execute the wall-null test blind. Passing validates a programmed operatorization protocol. It does not identify the sixteen modes with fundamental sectors; that requires a carrier whose amplitudes were not chosen to reproduce the graph."
]]);

const relationEmulatorSectionIndex = admissibilityChapter.sections.findIndex(([heading]) => heading === "the relation emulator is ready to build");
admissibilityChapter.sections.splice(relationEmulatorSectionIndex + 1, 0, ["the graph has a Jordan face, but does not choose its cone", [
  "The Claimipedia relation algebra contains more Jordan structure than the earlier gate language allowed. Removing its directed-path radical leaves a reversible two-state matrix block. Transpose exchanges the two reverse arrows, and its fixed three-coordinate space is exactly the rank-two Jordan algebra of symmetric two-by-two matrices.",
  "The gain is exact and the loss is visible. Symmetrized relation composition supplies the Jordan product, while determinant and matrix rank come from the same block. But thirty dimensions of one-way history have been discarded, the two relation labels are folded into one off-diagonal coordinate, and at this quotient stage positive-semidefinite order is supplied by the real matrix representation rather than forced by the authored path algebra.",
  "The later two-rail construction answers the narrower positivity question: the graph admits a source-native positive carrier before quotienting. It does not yet say why this particular Jordan face should be selected or what it predicts. The live gate is therefore compositional and semantic—derive a star operation, transport path memory and recover one held-out composition or observable. Until then the face is a faithful mathematical view of the relation system, not evidence that nature uses it."
]]);

const jordanFaceSectionIndex = admissibilityChapter.sections.findIndex(([heading]) => heading === "the graph has a Jordan face, but does not choose its cone");
admissibilityChapter.sections.splice(jordanFaceSectionIndex + 1, 0, ["the local reversal stops at the path memory", [
  "The obvious attempt to promote the local Jordan face back to the whole relation graph fails exactly. None of the four aggregate relation operators remains inside the 35-dimensional algebra when transposed.",
  "The same obstruction is visible without algebra. Reversing every edge while trying all twenty-four permutations of the four relation labels recovers at most two of seventeen records: the Spin–Temple pair itself. The surrounding reasons are directed histories, not unrecorded reverse processes.",
  "This tells us where to look. A full bridge needs a source-native dagger or order, a provenance-bearing nonlocal reversal, or a prediction that selects one candidate. The local symmetric response remains exact, but it cannot erase path memory and then claim that the erased graph selected the cone."
]]);

const localReversalSectionIndex = admissibilityChapter.sections.findIndex(([heading]) => heading === "the local reversal stops at the path memory");
admissibilityChapter.sections.splice(localReversalSectionIndex + 1, 0, ["the mirror face exists before the quotient", [
  "There is nevertheless a source-native positive object before the radical quotient. Put every authored relation on two rails—source and target—and keep the four relation types as separate channels. Each record u→v of type t contributes the rank-one positive atom (|v,T,t〉−|u,S,t〉)(〈v,T,t|−〈u,S,t|). Their sum is a positive-semidefinite Gram kernel on a 38×2×4=304 dimensional carrier, and its source-to-target blocks reconstruct the directed typed records.",
  "The audited snapshot has 43 records, 41 distinct typed edge atoms and lift rank 41. Swapping the two rails carries the kernel of the graph to the kernel of the arrow-reversed graph even when no reverse records were authored. This mirror is an involution: it squares to +1. It is neither the missing path-algebra dagger nor the symplectic quarter-turn that squares to −1.",
  "Collapsing rails and relation types gives the ordinary support Laplacian of rank 33. The rank drop 41→33 is an eight-direction quotient scar, so the scalar graph face can now state exactly what it forgot. The next gate is to add compositional transport and a semantic star, then predict a held-out relation or measurement. The free positive lift is a carrier construction, not yet a physical law."
]]);

const chapterExpansions = {
  "00-front-matter": [
    ["A book of layers", ["A ruler can tell you the length of a table without telling you why the table exists. A compass can preserve a direction without choosing which direction should count as north. Much of this programme has the same layered character. It contains exact measuring structures, conditional mechanisms and proposed physical interpretations. The reader should not flatten those layers into one claim.", "Each chapter therefore moves in the same order: ordinary picture, defined object, exact result, and authority boundary. A term such as symplectic is introduced only after the familiar idea it formalizes: preserving oriented area in a phase-space plane. A term such as chirality is introduced only after the familiar idea: left- and right-handed patterns cannot always be superposed by rotation."]],
    ["Four labels used throughout", ["Established means that a calculation follows from its written assumptions and has an executable or inspectable certificate. Conditional means that a construction works after a named field, coefficient, boundary condition or control is supplied. Externally open means that the missing ingredient is not yet supplied by the declared model or evidence. Internally exhausted means that further rearrangement of the same ingredients no longer addresses the missing datum.", "None of these labels means true of nature. Even an exact theorem can describe the wrong physical system. Conversely, a blocked physical programme can contain useful mathematics, simulation tools and experimentally transferable methods."]],
    ["The route through the book", ["The admissibility frontier comes first because it identifies the changed route to discovery: recover distinctions that ordinary measurements erase, then trace their admission, dynamics and detection. The following chapters build one exact Jordan-to-Lie rank-two hinge from response measurements and relational loops before asking whether it can carry Standard-Model matter, safe interactions or exceptional structure. The result ledger records positive findings and reversals; the research frontier ends in controlled experiments and explicit reopening conditions rather than in a larger symmetry slogan."]],
    ["Things before names", ["Begin with the preparation, response table, path, boundary, update or detector record before introducing the algebraic name that compresses it. Show what can be done to the thing and what remains unchanged. Technical language then becomes earned precision rather than an entrance fee.", "For example, two coupled readouts and their nonnegative response come before H₂(ℝ); eliminating a hidden component comes before the Schur complement and Jordan triple; transport around a loop and a changed return come before holonomy."]],
    ["Every bridge carries a reason", ["Two technical nouns placed beside one another do not explain their relationship. Every material bridge must say why the things are alike, why they differ, what produces the difference, whether its mathematical and physical parts are open or closed, what follows, what does not follow and which calculation or observation would decide the remainder.", "The compact grammar is because—but—therefore—still open. An unlabeled arrow, shared name, repeated number or similar diagram is a prompt to investigate, not a completed bridge."]],
    ["Pictures and speculation are optional", ["Landscape, grammar, network, workshop, ecological, mythic and theological pictures may be offered after the reason-bearing core. They form a menu, not a ladder of belief: a reader may use the theorem or experiment while rejecting every optional interpretation.", "A picture must pass deletion and substitution tests. Removing it or replacing it with another picture must leave the typed objects, reason, status, implication and test unchanged; otherwise it carries a hidden premise."]],
  ],
  "01-the-revised-spine": [
    ["Begin with a measuring frame", ["Imagine recording two coupled signals: two voltages, two oscillator amplitudes or two stress readouts. Their self-responses and cross-response form a symmetric two-by-two table. Requiring every real combination of the signals to have nonnegative power makes that table positive. This positive cone is the everyday entrance to H2(R), the Jordan algebra of real symmetric two-by-two matrices.", "The Jordan product X∘Y=(XY+YX)/2 keeps the result symmetric even when ordinary matrix multiplication does not. It is useful when the object of interest is a state or response cone rather than an ordered sequence of operations."]],
    ["From elimination to symmetry", ["When an internal degree of freedom is removed from a coupled quadratic system, the effective response is a Schur complement. Repeating that operation produces the same triple combination that appears in Jordan theory. The Tits–Kantor–Koecher construction then packages translations, linear transformations and their opposites into a graded Lie algebra.", "For the declared carrier, the closure is ten-dimensional sp(4,R). This algebra preserves a nondegenerate oriented-area form on four real phase-space coordinates. A standard low-rank isomorphism identifies its connected group with Spin0(2,3), the double cover of the identity component of SO(2,3)."]],
    ["Why ten generators are a real gate", ["Four real coordinates do not automatically imply sp(4,R). A pair of ordinary oscillators can explore only a three-generator squeezing/rotation subalgebra. Reaching ten requires independently available anisotropies and shears. Generator rank is therefore a kill test: if commutators close at three, the model is a lower-rank control, not hidden full Spin(2,3)."]],
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
  "08-admissibility-frontier": ["corpus/syntheses/the_admissibility_frontier_current_synthesis.md", "corpus/programmes/admissibility/admissibility_07_zone_known_unknown_frontiers.md", "corpus/programmes/admissibility/admissibility_25_current_research_frontier_crosswalk.md", "corpus/programmes/admissibility/admissibility_58_casimir_spectral_coverage_and_distance_gate.md", "corpus/programmes/admissibility/admissibility_59_four_mode_quotient_scar_bench_and_tolerance_closure.md", "corpus/programmes/admissibility/admissibility_60_monster_lean_fold_provenance_and_reproduction_gate.md", "corpus/programmes/frontier-physics-targets/frontier_experiment_atlas_v1.md", "corpus/programmes/lattice-subroutine-gravity/monster-fermionization-bridge.md", "corpus/programmes/lattice-subroutine-gravity/period-matrix-jordan-boundary-gate.md", "corpus/programmes/lattice-subroutine-gravity/three-mode-loop-seam-preflight.md", "corpus/programmes/lattice-subroutine-gravity/modular-sign-detector-reassignment.md", "corpus/programmes/lattice-subroutine-gravity/metaplectic-phase-candidate.md", "corpus/programmes/lattice-subroutine-gravity/metaplectic-t1-s1-boundary.md", "corpus/programmes/frontier/wave-7/frontier_wave7_73_relative_metaplectic_phase_boundary.md", "corpus/programmes/frontier/wave-7/frontier_wave7_107_boundary_domain_admissibility_bridge.md", "corpus/programmes/frontier/wave-7/frontier_wave7_39_mixed_interface_resolution.md", "corpus/programmes/frontier/wave-7/frontier_wave7_39_programme_a2_double_centralizer_and_c2_no_go.md", "corpus/programmes/frontier/wave-7/frontier_wave7_40_claimipedia_operator_exhaustion_and_sp4_gate.md", "corpus/programmes/frontier/wave-7/frontier_wave7_41_two_cross_carrier_vertical_slices.md", "corpus/programmes/frontier/wave-7/frontier_wave7_42_instrumented_admissibility_atlas.md", "corpus/programmes/frontier/wave-7/frontier_wave7_43_sourcery_ale_algebra.md", "corpus/programmes/frontier/wave-7/frontier_wave7_44_refinement_stability_of_the_mixed_interface.md", "corpus/programmes/frontier/wave-7/frontier_wave7_47_kenotic_enriched_loop_reopening_template.md", "corpus/programmes/frontier/wave-7/frontier_wave7_48_sign_holonomy_physical_detector_bridge.md", "corpus/programmes/frontier/wave-7/frontier_wave7_49_kenotic_cover_h0_signature_and_h1_no_go.md", "corpus/programmes/frontier/wave-7/frontier_wave7_50_a1_a2_parabolic_kenotic_envelope.md", "corpus/programmes/frontier/wave-7/frontier_wave7_51_three_port_wick_kenosis_bridge.md", "corpus/programmes/frontier/wave-7/frontier_wave7_52_rectangular_mediator_candidate_audit.md", "1004_the_weighted_furey_root_is_a_flat_horizontal_double_cover_of_its_projector_circle_with_central_minus_identity_holonomy.md", "997_a_local_conservative_real_interface_network_realizes_the_nested_c12_transport_as_antiperiodic_six_cycle_holonomy.md"],
  "08-result-ledger": ["1398_final_wave_red_team_audit_finds_two_substantive_errors_and_preserves_four_independent_stopping_boundaries.md"],
  "09-research-frontier": ["1453_genuine_exhaustion_leaves_no_untyped_internal_work_but_seven_named_external_or_conditional_frontiers.md", "1456_the_two_zenodo_preprints_strengthen_response_controls_but_do_not_change_the_terminal_gate_partition.md", "1624_the_reopened_mass_gap_action_and_shared_scale_programme_reaches_five_irreducible_gates.md", "1788_all_finite_escapes_from_the_minimal_connection_parent_now_end_at_new_model_construction.md"],
  "10-provenance-and-reading-map": ["00_research_document_map.md", "30_research_frontier.md", "40_grand_synthesis_spin23_pole.md", "49_multi_branch_research_registry.md", "91_multi_branch_active_goal_log.md"],
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
  "corpus/programmes/frontier/wave-7/frontier_wave7_65_drive_to_record_am_fm_benchmark.md",
  "corpus/programmes/frontier/wave-7/frontier_wave7_66_selector_induced_signature23_form.md",
  "corpus/programmes/frontier/wave-7/frontier_wave7_67_q_transport_and_reverse_channel_fork.md",
  "corpus/programmes/frontier/wave-7/frontier_wave7_68_selector_split_fingerprint_and_channel_breaking_gate.md",
  "corpus/programmes/frontier/wave-7/frontier_wave7_69_q_provenance_terminal_synthesis.md",
  "corpus/programmes/frontier/wave-7/frontier_wave7_70_g2_response_folding_no_go.md",
  "corpus/programmes/frontier/wave-7/frontier_wave7_71_source_restricted_logical_generator_boundary.md",
  "corpus/programmes/frontier-physics-targets/frontier_complexity_cards_v1.md",
);

// The Lean-fold packet supports only its hot-off-the-press section. Keeping it
// out of the chapter-wide list prevents it from appearing as evidence for older,
// unrelated claims; sectionEvidence below supplies the narrow provenance links.
chapterSources["08-admissibility-frontier"] = chapterSources["08-admissibility-frontier"].filter(
  source => source !== "corpus/programmes/admissibility/admissibility_60_monster_lean_fold_provenance_and_reproduction_gate.md",
);
chapterSources["08-admissibility-frontier"].push(
  "corpus/programmes/admissibility/admissibility_99_three_scale_passive_diffusion_pushforward.md",
  "corpus/programmes/admissibility/admissibility_100_local_derivative_hydrodynamic_frame_invariance.md",
  "corpus/programmes/admissibility/admissibility_101_gaussian_schwinger_keldysh_kms_completion.md",
  "corpus/programmes/admissibility/admissibility_102_nonlinear_stochastic_frame_and_noise_induced_drift.md",
  "corpus/programmes/admissibility/admissibility_103_causal_stable_hydrodynamic_relaxation_wedge.md",
  "corpus/programmes/admissibility/admissibility_104_relaxation_auxiliary_gaussian_kms_completion.md",
  "corpus/programmes/admissibility/admissibility_105_fixed_index_defect_information_no_go.md",
  "corpus/programmes/admissibility/admissibility_106_reflection_resolved_defect_transport.md",
  "corpus/programmes/admissibility/admissibility_107_global_nonlinear_detector_injectivity.md",
  "corpus/programmes/admissibility/admissibility_108_d4_shared_action_operator_boundary.md",
  "corpus/programmes/admissibility/admissibility_109_four_mode_sk_action_to_record.md",
  "corpus/programmes/admissibility/admissibility_110_relation_emulator_readiness_reconciliation.md",
  "corpus/programmes/admissibility/admissibility_119_the_field_closes_continuity_but_screening_needs_its_own_carrier.md",
  "corpus/programmes/admissibility/admissibility_120_a_unitary_acoustic_rail_replaces_the_hand_shaped_capture_bath.md",
  "corpus/programmes/admissibility/admissibility_121_the_capture_matrix_element_is_a_scattering_density_not_a_two_level_number.md",
  "corpus/programmes/admissibility/admissibility_122_a_normalized_packet_turns_the_overlap_density_into_a_capture_probability.md",
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
  "Three local motion types": [
    "corpus/programmes/admissibility/admissibility_129_elliptic_hyperbolic_parabolic_local_alphabet.md",
    "corpus/programmes/admissibility/admissibility_130_quarter_turn_and_mirror_generate_the_dual_seam.md",
    "corpus/programmes/admissibility/admissibility_131_the_authored_rail_grading_closes_the_local_clifford_cell_but_opens_a_coincidence_channel.md",
    "corpus/programmes/admissibility/admissibility_132_cross_corpus_clifford_cell_atlas_and_exhaustion.md",
    "corpus/programmes/admissibility/admissibility_133_the_incidence_coincidence_doublet_detects_odd_cycle_topology.md",
    "corpus/programmes/admissibility/admissibility_134_no_global_semantic_adjoint_exists_on_the_current_claimipedia_relation_source.md",
    "corpus/programmes/admissibility/admissibility_142_a_three_resonator_parity_switch_turns_the_dual_face_into_a_detector.md",
    "corpus/programmes/admissibility/admissibility_123_locally_invariant_carrier_and_mirror_face_spine.md",
    "corpus/programmes/admissibility/admissibility_126_typed_two_rail_positive_lift_preserves_the_mirror_face.md",
  ],
  "Transition operators make the boundary measurable": [
    "corpus/programmes/admissibility/admissibility_127_transition_operators_selection_rules_and_lifetime_frontier.md",
    "corpus/programmes/admissibility/admissibility_128_widths_coherence_and_escape_are_not_one_lifetime.md",
    "corpus/programmes/admissibility/admissibility_06_dynamic_response_geometry_detection_metastability.md",
    "corpus/programmes/frontier-physics-targets/frontier_experiment_atlas_v1.md",
    "corpus/programmes/frontier-physics-targets/transition_operator_propagation_audit_v1.md",
  ],
  "A seam changes the menu of continuations": [
    "corpus/programmes/admissibility/admissibility_135_a_seam_changes_continuations_but_does_not_by_itself_trigger_decay.md",
    "corpus/programmes/admissibility/admissibility_127_transition_operators_selection_rules_and_lifetime_frontier.md",
    "corpus/programmes/admissibility/admissibility_129_elliptic_hyperbolic_parabolic_local_alphabet.md",
    "corpus/programmes/admissibility/admissibility_130_quarter_turn_and_mirror_generate_the_dual_seam.md"
  ],
  "Observers, horizons and outgoing channels": [
    "corpus/programmes/admissibility/admissibility_136_acceleration_changes_detector_closure_not_the_global_vacuum.md",
    "corpus/programmes/admissibility/admissibility_137_hawking_flux_requires_state_horizon_channel_and_detector.md",
    "corpus/programmes/admissibility/admissibility_138_kerr_separates_horizon_ergosurface_and_superradiant_channel.md",
    "corpus/programmes/admissibility/admissibility_139_nuclear_open_systems_calibrate_seam_channel_and_record.md",
    "corpus/programmes/admissibility/admissibility_140_observer_horizon_channel_atlas_and_exhaustion.md",
    "corpus/programmes/admissibility/admissibility_141_observer_horizon_and_nuclear_priority_for_next_insight.md",
    "corpus/programmes/admissibility/admissibility_143_th229_shared_parent_host_channel_factorization_programme.md",
    "corpus/programmes/admissibility/admissibility_144_kerr_multirecord_public_data_consistency_programme.md",
    "corpus/programmes/admissibility/admissibility_145_where_the_next_insight_can_enter.md",
    "corpus/programmes/frontier-physics-targets/observer_horizon_nuclear_literature_review_v1.md"
  ],
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
  "the Lean fold now has a finite provenance gate": ["corpus/programmes/admissibility/admissibility_60_monster_lean_fold_provenance_and_reproduction_gate.md", "corpus/programmes/frontier/wave-7/frontier_wave7_30_kernel_closure_and_expression_tree_reachability_sieve.md", "corpus/programmes/frontier/wave-7/frontier_wave7_35_adaptive_depth_census_and_detector_cost_curve.md"],
  "the selector chip has a design wedge": ["corpus/programmes/admissibility/admissibility_61_photonic_selector_chip_coupled_mode_preflight.md", "corpus/programmes/admissibility/admissibility_27_robustness_window_for_projective_return_coherent_holonomy_and_selection.md", "corpus/programmes/admissibility/admissibility_28_platform_triage_for_the_quarter_turn_contraction_experiment.md"],
  "three hybrid modes are one short": ["corpus/programmes/admissibility/admissibility_62_yig_three_mode_no_go_and_four_mode_tripod_gate.md", "corpus/programmes/admissibility/admissibility_33_hybrid_bosonic_carrier_and_adversarial_thermal_hall_frontier.md"],
  "selection is a channel, not a filter": ["corpus/programmes/admissibility/admissibility_63_acoustic_selector_channel_type_and_passive_no_go.md", "corpus/programmes/admissibility/admissibility_26_three_mode_quarter_turn_and_two_datum_contraction.md", "corpus/programmes/admissibility/admissibility_33_hybrid_bosonic_carrier_and_adversarial_thermal_hall_frontier.md"],
  "make the proposed cause move": ["corpus/programmes/admissibility/admissibility_64_thermal_hall_activation_and_moving_crossing_discriminator.md", "corpus/programmes/admissibility/admissibility_33_hybrid_bosonic_carrier_and_adversarial_thermal_hall_frontier.md", "corpus/programmes/admissibility/admissibility_35_adversarial_detector_equivalence_atlas.md"],
  "a loop and its outcome are different objects": ["corpus/programmes/admissibility/admissibility_65_exceptional_loop_topology_and_dynamic_selection.md", "corpus/programmes/admissibility/admissibility_35_adversarial_detector_equivalence_atlas.md", "corpus/programmes/admissibility/admissibility_33_hybrid_bosonic_carrier_and_adversarial_thermal_hall_frontier.md"],
  "the first new inequality is not new": ["corpus/programmes/admissibility/admissibility_96_population_storage_corrected_loewner_certificate.md", "corpus/programmes/admissibility/admissibility_95_cross_frequency_shared_measure_bound.md", "corpus/programmes/admissibility/admissibility_66_contextual_triangle_bound_reduces_to_standard_positivity.md", "corpus/programmes/admissibility/admissibility_08_finite_contextual_casimir_experiment.md", "corpus/programmes/frontier-physics-targets/frontier_physics_target_assessments_v1.md"],
  "two currents require three calculations": ["corpus/programmes/admissibility/admissibility_67_two_current_source_and_scheme_census.md", "corpus/programmes/closure/programme_closure_03_a_controlled_standard_model_external_source_action_exists_but_does_not_fix_the_frame.md", "corpus/programmes/closure/programme_closure_04_vacuum_locality_closes_the_two_current_spectral_measure_on_h2r_but_not_the_thermal_response.md"],
  "the microscopic source quotient has five coordinates": ["corpus/programmes/admissibility/admissibility_68_five_coordinate_source_quotient_and_two_current_no_go.md", "corpus/programmes/lane-expansion/programme_lane_expansion_33_the_action_derived_two_current_block_removes_bl_shear_but_not_the_incidence_normalisation_fork.md", "corpus/programmes/lane-expansion/programme_lane_expansion_35_the_gauge_typed_source_quotient_has_one_anomaly_coordinate_and_no_incidence_eigenray.md"],
  "the two-current window has a resolution ceiling": ["corpus/programmes/admissibility/admissibility_69_threshold_spectrum_and_resolution_ceiling.md", "corpus/programmes/admissibility/admissibility_68_five_coordinate_source_quotient_and_two_current_no_go.md", "corpus/programmes/lane-expansion/programme_lane_expansion_20_the_broken_current_anchor_is_a_threshold_staircase_not_a_universal_axis.md"],
  "the high-energy window survives running": ["corpus/programmes/admissibility/admissibility_70_running_high_energy_rank_window.md", "corpus/programmes/admissibility/admissibility_69_threshold_spectrum_and_resolution_ceiling.md", "corpus/programmes/lane-expansion/programme_lane_expansion_19_absorptive_yukawa_spectroscopy_supplies_a_physical_broken_current_anchor.md"],
  "the detector has two different jobs": ["corpus/programmes/admissibility/admissibility_71_observable_resolution_and_phase_connectivity_gate.md", "corpus/programmes/admissibility/admissibility_70_running_high_energy_rank_window.md", "corpus/programmes/lane-expansion/programme_lane_expansion_37_the_five_coordinate_observable_map_needs_bottom_weak_and_neutrino_compasses.md"],
  "the spanning tree is not yet one experiment": ["corpus/programmes/admissibility/admissibility_72_candidate_phase_edges_and_scale_bridge.md", "corpus/programmes/admissibility/admissibility_71_observable_resolution_and_phase_connectivity_gate.md", "corpus/programmes/lane-expansion/programme_lane_expansion_37_the_five_coordinate_observable_map_needs_bottom_weak_and_neutrino_compasses.md"],
  "two edges identify; three edges audit": ["corpus/programmes/admissibility/admissibility_73_signed_edge_extraction_and_cycle_audit.md", "corpus/programmes/admissibility/admissibility_72_candidate_phase_edges_and_scale_bridge.md", "corpus/programmes/admissibility/admissibility_71_observable_resolution_and_phase_connectivity_gate.md"],
  "the third edge tests the whole triangle": ["corpus/programmes/admissibility/admissibility_74_one_family_triangle_and_global_positivity_gate.md", "corpus/programmes/admissibility/admissibility_73_signed_edge_extraction_and_cycle_audit.md", "corpus/programmes/admissibility/admissibility_66_contextual_triangle_bound_reduces_to_standard_positivity.md"],
  "name the coordinates before reading the signs": ["corpus/programmes/admissibility/admissibility_75_operator_basis_covariance_and_cycle_boundary.md", "corpus/programmes/admissibility/admissibility_74_one_family_triangle_and_global_positivity_gate.md", "corpus/programmes/admissibility/admissibility_68_five_coordinate_source_quotient_and_two_current_no_go.md"],
  "the weak record hides one direction": ["corpus/programmes/admissibility/admissibility_76_alp_current_anomaly_quotient_and_sixth_coordinate_boundary.md", "corpus/programmes/admissibility/admissibility_75_operator_basis_covariance_and_cycle_boundary.md", "corpus/programmes/admissibility/admissibility_68_five_coordinate_source_quotient_and_two_current_no_go.md"],
  "more energies do not add a coordinate": ["corpus/programmes/admissibility/admissibility_77_current_only_rg_stability_and_scale_sweep_no_go.md", "corpus/programmes/admissibility/admissibility_76_alp_current_anomaly_quotient_and_sixth_coordinate_boundary.md", "corpus/programmes/admissibility/admissibility_70_running_high_energy_rank_window.md"],
  "three generations add flavor, not another anomaly": ["corpus/programmes/admissibility/admissibility_78_three_generation_singlet_flavor_split_and_bl_correction.md", "corpus/programmes/admissibility/admissibility_76_alp_current_anomaly_quotient_and_sixth_coordinate_boundary.md", "corpus/programmes/lane-expansion/programme_lane_expansion_35_the_gauge_typed_source_quotient_has_one_anomaly_coordinate_and_no_incidence_eigenray.md"],
  "change the record, not just the energy": ["corpus/programmes/admissibility/admissibility_79_flavor_changing_second_record_for_the_sixth_coordinate.md", "corpus/programmes/admissibility/admissibility_77_current_only_rg_stability_and_scale_sweep_no_go.md", "corpus/programmes/admissibility/admissibility_78_three_generation_singlet_flavor_split_and_bl_correction.md"],
  "ask for the likelihood, not the plot": ["corpus/programmes/admissibility/admissibility_80_belle_public_likelihood_release_gate.md", "corpus/programmes/admissibility/admissibility_79_flavor_changing_second_record_for_the_sixth_coordinate.md", "corpus/programmes/frontier-physics-targets/detector_frontier_atlas_v1.md"],
  "a term is not a detector row": ["corpus/programmes/admissibility/admissibility_81_source_complete_fcnc_kernel_restores_the_weak_quotient.md", "corpus/programmes/admissibility/admissibility_79_flavor_changing_second_record_for_the_sixth_coordinate.md", "corpus/programmes/admissibility/admissibility_74_one_family_triangle_and_global_positivity_gate.md"],
  "the public model has one control too few": ["corpus/programmes/admissibility/admissibility_113_the_public_alp_ufo_is_a_two_control_slice_not_the_three_source_test.md", "corpus/programmes/admissibility/admissibility_74_one_family_triangle_and_global_positivity_gate.md", "corpus/programmes/admissibility/admissibility_75_operator_basis_covariance_and_cycle_boundary.md"],
  "more detail cannot restore an erased coordinate": ["corpus/programmes/admissibility/admissibility_114_more_detail_of_the_same_w_associated_process_cannot_open_the_sixth_coordinate.md", "corpus/programmes/admissibility/admissibility_76_alp_current_anomaly_quotient_and_sixth_coordinate_boundary.md", "corpus/programmes/admissibility/admissibility_77_current_only_rg_stability_and_scale_sweep_no_go.md"],
  "the missing coordinate depends on the declared slice": ["corpus/programmes/admissibility/admissibility_115_the_full_gauge_dictionary_turns_the_sixth_coordinate_into_a_declared_slice.md", "corpus/programmes/admissibility/admissibility_76_alp_current_anomaly_quotient_and_sixth_coordinate_boundary.md", "corpus/programmes/admissibility/admissibility_114_more_detail_of_the_same_w_associated_process_cannot_open_the_sixth_coordinate.md"],
  "the second gauge detector needs a phase reference": ["corpus/programmes/admissibility/admissibility_116_the_minimal_second_gauge_detector_needs_a_phase_reference.md", "corpus/programmes/admissibility/admissibility_115_the_full_gauge_dictionary_turns_the_sixth_coordinate_into_a_declared_slice.md", "corpus/programmes/admissibility/admissibility_74_one_family_triangle_and_global_positivity_gate.md"],
  "an odd resonance moment retains the sign": ["corpus/programmes/admissibility/admissibility_117_an_odd_resonance_moment_can_supply_the_missing_sign.md", "corpus/programmes/admissibility/admissibility_116_the_minimal_second_gauge_detector_needs_a_phase_reference.md", "corpus/programmes/admissibility/admissibility_74_one_family_triangle_and_global_positivity_gate.md"],
  "the operator does not choose its boundary": ["corpus/programmes/frontier/wave-7/frontier_wave7_107_boundary_domain_admissibility_bridge.md", "corpus/programmes/frontier-physics-targets/open_topics_v1.md", "corpus/programmes/frontier-physics-targets/frontier_exhaustion_checkpoint_v1.md"],
  "the two rails share a plane, not a group": ["corpus/programmes/moonshine-program-lattice/README.md", "corpus/programmes/frontier-physics-targets/open_topics_v1.md", "corpus/programmes/frontier-physics-targets/frontier_exhaustion_checkpoint_v1.md"],
  "the hydrodynamic cone has poles": ["corpus/programmes/admissibility/admissibility_104_relaxation_auxiliary_gaussian_kms_completion.md", "corpus/programmes/admissibility/admissibility_103_causal_stable_hydrodynamic_relaxation_wedge.md", "corpus/programmes/admissibility/admissibility_102_nonlinear_stochastic_frame_and_noise_induced_drift.md", "corpus/programmes/admissibility/admissibility_101_gaussian_schwinger_keldysh_kms_completion.md", "corpus/programmes/admissibility/admissibility_100_local_derivative_hydrodynamic_frame_invariance.md", "corpus/programmes/admissibility/admissibility_98_gaussian_hydrodynamic_source_frame_invariance.md", "corpus/programmes/admissibility/admissibility_97_hydrodynamic_pole_residue_response_ledger.md", "corpus/claims/0200-0299/212_hydrodynamic_stress_map_can_have_local_rank_three.md", "corpus/claims/0200-0299/213_fixed_temperature_kms_herglotz_schur_sewing.md"],
  "the screened field is not the whole carrier": ["corpus/programmes/admissibility/admissibility_119_the_field_closes_continuity_but_screening_needs_its_own_carrier.md", "corpus/programmes/admissibility/admissibility_44_finite_q_energy_continuity_kernel_and_gauge_boundary.md", "corpus/programmes/admissibility/admissibility_46_screened_finite_q_order_of_limits_ladder.md"],
  "capture does not need a sink": ["corpus/programmes/admissibility/admissibility_122_a_normalized_packet_turns_the_overlap_density_into_a_capture_probability.md", "corpus/programmes/admissibility/admissibility_121_the_capture_matrix_element_is_a_scattering_density_not_a_two_level_number.md", "corpus/programmes/admissibility/admissibility_120_a_unitary_acoustic_rail_replaces_the_hand_shaped_capture_bath.md", "corpus/programmes/admissibility/admissibility_55_finite_band_levinson_and_adaptive_pole_collisions.md"],
  "memory depends on the detector scale": ["corpus/programmes/admissibility/admissibility_99_three_scale_passive_diffusion_pushforward.md", "corpus/programmes/admissibility/admissibility_56_certificate_preserving_descent_and_commuting_square_atlas.md", "corpus/claims/0200-0299/201_recursive_schur_jordan_descent_and_functorial_sewing.md"],
  "a zero mode does not fix its detector weight": ["corpus/programmes/admissibility/admissibility_105_fixed_index_defect_information_no_go.md", "corpus/programmes/admissibility/admissibility_55_finite_band_levinson_and_adaptive_pole_collisions.md"],
  "a defect can carry a second label": ["corpus/programmes/admissibility/admissibility_106_reflection_resolved_defect_transport.md", "corpus/programmes/admissibility/admissibility_105_fixed_index_defect_information_no_go.md"],
  "local rank is not global identity": ["corpus/programmes/admissibility/admissibility_107_global_nonlinear_detector_injectivity.md", "corpus/programmes/admissibility/admissibility_57_coordinated_selector_closure_and_physical_provenance_boundary.md"],
  "the quotient does not choose the operator": ["corpus/programmes/admissibility/admissibility_108_d4_shared_action_operator_boundary.md", "corpus/programmes/frontier/wave-7/frontier_wave7_70_g2_response_folding_no_go.md"],
  "one action reaches the four detector ports": ["corpus/programmes/admissibility/admissibility_109_four_mode_sk_action_to_record.md", "corpus/programmes/admissibility/admissibility_59_four_mode_quotient_scar_bench_and_tolerance_closure.md", "corpus/programmes/admissibility/admissibility_101_gaussian_schwinger_keldysh_kms_completion.md"],
  "the relation emulator is ready to build": ["corpus/programmes/admissibility/admissibility_110_relation_emulator_readiness_reconciliation.md", "corpus/programmes/frontier/wave-7/frontier_wave7_25_directed_relation_emulator_robustness_and_acceptance_protocol.md", "corpus/programmes/frontier/wave-7/frontier_wave7_27_reconstruction_noise_geometry_and_redundant_witnesses.md"],
  "the graph has a Jordan face, but does not choose its cone": ["corpus/programmes/admissibility/admissibility_111_relation_quotient_jordan_face_and_positive_order_boundary.md", "corpus/programmes/frontier/wave-7/frontier_wave7_38_radical_quotient_and_c2_exhaustion.md", "corpus/programmes/admissibility/admissibility_86_positive_spectral_atom_and_measure_evaluation_witness.md"],
  "the local reversal stops at the path memory": ["corpus/programmes/admissibility/admissibility_112_the_jordan_face_involution_does_not_lift_through_path_memory.md", "corpus/programmes/admissibility/admissibility_111_relation_quotient_jordan_face_and_positive_order_boundary.md", "corpus/programmes/frontier/wave-7/frontier_wave7_38_radical_quotient_and_c2_exhaustion.md"],
  "the mirror face exists before the quotient": ["corpus/programmes/admissibility/admissibility_124_relation_face_compiler_from_adjacency_to_jordan_holonomy.md", "corpus/programmes/admissibility/admissibility_125_claimipedia_support_native_order_and_semantic_boundary.md", "corpus/programmes/admissibility/admissibility_126_typed_two_rail_positive_lift_preserves_the_mirror_face.md"],
  "the shared path is not yet a shared algebra": ["corpus/programmes/admissibility/admissibility_94_internal_whole_spectrum_coverage_boundary.md", "corpus/programmes/admissibility/admissibility_93_frozen_two_tone_within_batch_protocol.md", "corpus/programmes/admissibility/admissibility_92_two_point_population_state_bridge.md", "corpus/programmes/admissibility/admissibility_91_one_point_latent_state_boundary.md", "corpus/programmes/admissibility/admissibility_90_pointwise_population_envelope_rank_identity_and_cell_level_boundary.md", "corpus/programmes/admissibility/admissibility_89_unseen_cell_shared_parameter_near_miss.md", "corpus/programmes/admissibility/admissibility_88_population_wide_passive_impedance_baseline.md", "corpus/programmes/admissibility/admissibility_87_source_native_measured_impedance_held_out_prediction.md", "corpus/programmes/admissibility/admissibility_86_positive_spectral_atom_and_measure_evaluation_witness.md", "corpus/programmes/admissibility/admissibility_85_physical_admittance_operator_and_held_out_current_witness.md", "corpus/programmes/admissibility/admissibility_84_all_d02_families_pass_common_algebra2_record_layer.md", "corpus/programmes/admissibility/admissibility_83_first_common_algebra2_path_and_legacy_dimension_projection.md", "corpus/programmes/admissibility/admissibility_82_claimipedia_source_native_paths_pass_live_sourcery_but_dimension_and_operator_gates_remain.md", "corpus/programmes/frontier/wave-7/frontier_wave7_72_claimipedia_sourcery_typed_extraction_no_go.md"],
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

const filesBelow = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const path = join(directory, entry.name);
  return entry.isDirectory() ? filesBelow(path) : [path];
});
const naturalCompare = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
const librarySources = filesBelow(join(root, "corpus"))
  .filter(file => extname(file).toLowerCase() === ".md")
  .map(file => posix(relative(root, file)))
  .sort(naturalCompare);
const librarySourceSet = new Set(librarySources);
const editionSourceSet = new Set(allSources);
const markdownBySource = new Map(librarySources.map(source => [source, readFileSync(join(root, source), "utf8").replace(/\r\n?/gu, "\n")]));
const titleBySource = new Map(librarySources.map(source => {
  const markdown = markdownBySource.get(source);
  return [source, (/^#\s+(.+)$/mu.exec(markdown) || [null, basename(source, ".md")])[1]];
}));
const libraryDirectorySet = new Set();
for (const source of librarySources) {
  let directory = posix(dirname(source));
  while (directory !== "." && directory) {
    libraryDirectorySet.add(directory);
    directory = posix(dirname(directory));
  }
}
const libraryDirectories = [...libraryDirectorySet].sort((a, b) => a.split("/").length - b.split("/").length || naturalCompare(a, b));
const directoryAncestors = directory => {
  const parts = directory.split("/").filter(Boolean);
  return parts.map((_, index) => parts.slice(0, index + 1).join("/"));
};
const directoryLabel = directory => basename(directory).replace(/[-_]+/gu, " ").replace(/\b\p{L}/gu, letter => letter.toUpperCase());
const directSourcesByDirectory = new Map(libraryDirectories.map(directory => [directory, librarySources.filter(source => posix(dirname(source)) === directory)]));
const childDirectoriesByDirectory = new Map(libraryDirectories.map(directory => [directory, libraryDirectories.filter(candidate => posix(dirname(candidate)) === directory)]));
const descendantCount = directory => librarySources.filter(source => source.startsWith(`${directory}/`)).length;
const repositoryUrl = "https://github.com/aaron-alderman/spin23-relational-geometry";
const buildRevision = process.env.GITHUB_SHA || "local-working-tree";
const encodePath = value => posix(value).split("/").map(part => [".", ".."].includes(part) ? part : encodeURIComponent(part)).join("/");
const sourceOutputPath = source => {
  const outputSource = basename(source).toLowerCase() === "index.md" ? `${source.slice(0, -3)}-document.html` : source.replace(/\.md$/u, ".html");
  return join(siteRoot, "library", outputSource);
};
const directoryOutputPath = directory => join(siteRoot, "library", directory, "index.html");
const legacySourceOutputPath = source => join(siteRoot, "sources", source.replace(/\.md$/u, ".html"));
const sourcePageHref = (fromFile, source) => encodePath(relative(dirname(fromFile), sourceOutputPath(source)));
const directoryPageHref = (fromFile, directory) => encodePath(relative(dirname(fromFile), directoryOutputPath(directory)));
const githubBlobUrl = source => `${repositoryUrl}/blob/${encodeURIComponent(buildRevision === "local-working-tree" ? "main" : buildRevision)}/${encodePath(source)}`;
const githubRawUrl = source => `https://raw.githubusercontent.com/aaron-alderman/spin23-relational-geometry/${encodeURIComponent(buildRevision === "local-working-tree" ? "main" : buildRevision)}/${encodePath(source)}`;

const resolveMarkdownTarget = (source, target, fromFile = sourceOutputPath(source)) => {
  if (/^(?:[a-z]+:|#)/iu.test(target)) return target;
  const [pathPart, fragment = ""] = target.split("#", 2);
  const candidate = posix(normalize(join(dirname(source), pathPart))).replace(/^\.\//u, "");
  if (librarySourceSet.has(candidate)) return `${sourcePageHref(fromFile, candidate)}${fragment ? `#${encodeURIComponent(fragment)}` : ""}`;
  if (candidate.endsWith(".md")) return `${githubBlobUrl(candidate)}${fragment ? `#${encodeURIComponent(fragment)}` : ""}`;
  return githubBlobUrl(candidate);
};

const corpusLinksFrom = source => {
  const links = new Set();
  for (const match of markdownBySource.get(source).matchAll(/(?<!!)\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/gu)) {
    const target = match[1].replace(/^<|>$/gu, "");
    if (/^(?:[a-z]+:|#)/iu.test(target)) continue;
    const pathPart = target.split(/[?#]/u, 1)[0];
    let decoded = pathPart;
    try { decoded = decodeURIComponent(pathPart); } catch { /* Retain malformed source text for faithful fallback. */ }
    const candidate = posix(normalize(join(dirname(source), decoded))).replace(/^\.\//u, "");
    if (librarySourceSet.has(candidate)) links.add(candidate);
  }
  return [...links].sort(naturalCompare);
};
const outgoingBySource = new Map(librarySources.map(source => [source, corpusLinksFrom(source)]));
const incomingBySource = new Map(librarySources.map(source => [source, []]));
for (const [source, targets] of outgoingBySource) for (const target of targets) incomingBySource.get(target).push(source);
for (const incoming of incomingBySource.values()) incoming.sort(naturalCompare);

const graphNeighbours = new Map(librarySources.map(source => [source, new Set(outgoingBySource.get(source))]));
for (const [source, targets] of outgoingBySource) for (const target of targets) graphNeighbours.get(target).add(source);
const routeParent = new Map();
const routeRoot = new Map();
const routeQueue = allSources.filter(source => librarySourceSet.has(source));
for (const source of routeQueue) routeRoot.set(source, source);
for (let index = 0; index < routeQueue.length; index += 1) {
  const source = routeQueue[index];
  for (const neighbour of [...graphNeighbours.get(source)].sort(naturalCompare)) {
    if (routeRoot.has(neighbour)) continue;
    routeRoot.set(neighbour, routeRoot.get(source));
    routeParent.set(neighbour, source);
    routeQueue.push(neighbour);
  }
}
const editionRouteFor = source => {
  if (editionSourceSet.has(source)) return [source];
  if (!routeRoot.has(source)) return [];
  const route = [source];
  while (routeParent.has(route[route.length - 1])) route.push(routeParent.get(route[route.length - 1]));
  return route.reverse();
};

const inlineMarkdown = (value, source, fromFile = sourceOutputPath(source)) => {
  const code = [];
  let output = esc(value).replace(/`([^`]+)`/gu, (_, body) => `\u0000${code.push(`<code>${body}</code>`) - 1}\u0000`);
  output = output.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/gu, (_, alt, target) => {
    const rawTarget = target.replaceAll("&amp;", "&");
    const href = /^(?:https?:|data:)/iu.test(rawTarget) ? rawTarget : githubRawUrl(posix(normalize(join(dirname(source), rawTarget))));
    return `\u0000${code.push(`<img src="${esc(href)}" alt="${alt}">`) - 1}\u0000`;
  });
  output = output.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/gu, (_, label, target) => `\u0000${code.push(`<a href="${esc(resolveMarkdownTarget(source, target.replaceAll("&amp;", "&"), fromFile))}">${label}</a>`) - 1}\u0000`);
  output = output.replace(/\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]|\$\$[\s\S]*?\$\$|(?<!\$)\$(?!\$)[^$\n]+\$(?!\$)/gu, math => `\u0000${code.push(math) - 1}\u0000`);
  output = output.replace(/\*\*([^*]+)\*\*/gu, "<strong>$1</strong>").replace(/__([^_]+)__/gu, "<strong>$1</strong>");
  output = output.replace(/(?<!\*)\*([^*]+)\*(?!\*)/gu, "<em>$1</em>").replace(/(?<!_)_([^_]+)_(?!_)/gu, "<em>$1</em>");
  return output.replace(/\u0000(\d+)\u0000/gu, (_, index) => code[Number(index)]);
};

const splitMarkdownTableRow = line => {
  let value = line.trim();
  if (value.startsWith("|")) value = value.slice(1);
  if (value.endsWith("|") && !value.endsWith("\\|")) value = value.slice(0, -1);
  const cells = [];
  let cell = "";
  let escaped = false;
  let inCode = false;
  let inMath = false;
  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    const next = value[index + 1];
    if (character === "\\" && ["(", "["].includes(next)) { cell += character + next; inMath = true; index += 1; continue; }
    if (character === "\\" && [")", "]"].includes(next)) { cell += character + next; inMath = false; index += 1; continue; }
    if (character === "$" && !inCode) { cell += character; inMath = !inMath; continue; }
    if (escaped) { cell += character; escaped = false; continue; }
    if (character === "\\") { cell += character; escaped = true; continue; }
    if (character === "`") { cell += character; inCode = !inCode; continue; }
    if (character === "|" && !inCode && !inMath) { cells.push(cell.trim()); cell = ""; continue; }
    cell += character;
  }
  cells.push(cell.trim());
  return cells;
};
const tableSeparator = line => {
  if (!line.includes("|")) return null;
  const cells = splitMarkdownTableRow(line);
  return cells.length > 1 && cells.every(cell => /^:?-{3,}:?$/u.test(cell)) ? cells : null;
};
const tableAlignment = separator => separator.startsWith(":") && separator.endsWith(":") ? "center" : separator.endsWith(":") ? "right" : separator.startsWith(":") ? "left" : null;

const renderMarkdown = (markdown, source, fromFile = sourceOutputPath(source)) => {
  const lines = markdown.replace(/\r\n?/gu, "\n").split("\n");
  const displayMathStack = [];
  for (let index = 0; index < lines.length; index += 1) {
    if (/^\s*\\\[\s*$/u.test(lines[index])) displayMathStack.push(index);
    else if (/^\s*\\\]\s*$/u.test(lines[index]) && displayMathStack.length) displayMathStack.pop();
  }
  const unmatchedDisplayMathOpeners = new Set(displayMathStack);
  const blocks = [];
  let paragraph = [];
  let listType = null;
  let listItems = [];
  let quote = [];
  let fence = null;
  let fenceMarker = null;
  let fenceLines = [];
  let displayMathDelimiter = null;
  let displayMathLines = [];
  let recoverDisplayMath = false;
  const flushParagraph = () => { if (paragraph.length) blocks.push(`<p>${inlineMarkdown(paragraph.join(" "), source, fromFile)}</p>`); paragraph = []; };
  const flushList = () => { if (listType) blocks.push(`<${listType}>${listItems.map(item => `<li>${inlineMarkdown(item, source, fromFile)}</li>`).join("")}</${listType}>`); listType = null; listItems = []; };
  const flushQuote = () => { if (quote.length) blocks.push(`<blockquote>${renderMarkdown(quote.join("\n"), source, fromFile)}</blockquote>`); quote = []; };
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex];
    if (displayMathDelimiter) {
      if (line.trim() === displayMathDelimiter) {
        displayMathLines.push(line);
        blocks.push(`<div class="display-math">${esc(displayMathLines.join("\n"))}</div>`);
        displayMathDelimiter = null;
        displayMathLines = [];
        recoverDisplayMath = false;
        continue;
      }
      const beginsNewBlock = /^(?:#{1,6}\s+|>|\s*[-*+]\s+|\s*\d+[.)]\s+)/u.test(line) || (line.includes("|") && lineIndex + 1 < lines.length && tableSeparator(lines[lineIndex + 1]));
      if (recoverDisplayMath && (!line.trim() || beginsNewBlock)) {
        displayMathLines.push(displayMathDelimiter);
        blocks.push(`<div class="display-math recovered-math">${esc(displayMathLines.join("\n"))}</div>`);
        displayMathDelimiter = null;
        displayMathLines = [];
        recoverDisplayMath = false;
        if (!line.trim()) continue;
      } else {
        displayMathLines.push(line);
        continue;
      }
    }
    const fenceMatch = /^(~~~|```)\s*([^\s]*)/u.exec(line);
    if (fence) {
      if (fenceMatch && fenceMatch[1] === fenceMarker) { blocks.push(`<pre><code${fence ? ` class="language-${esc(fence)}"` : ""}>${esc(fenceLines.join("\n"))}</code></pre>`); fence = null; fenceMarker = null; fenceLines = []; }
      else fenceLines.push(line);
      continue;
    }
    if (fenceMatch) { flushParagraph(); flushList(); flushQuote(); fenceMarker = fenceMatch[1]; fence = fenceMatch[2] || "text"; continue; }
    if (/^\s*\\\[\s*$/u.test(line) || /^\s*\$\$\s*$/u.test(line)) {
      flushParagraph(); flushList(); flushQuote();
      displayMathDelimiter = line.includes("\\[") ? "\\]" : "$$";
      displayMathLines = [line];
      recoverDisplayMath = unmatchedDisplayMathOpeners.has(lineIndex);
      continue;
    }
    const heading = /^(#{1,6})\s+(.+)$/u.exec(line);
    const unordered = /^\s*[-*+]\s+(.+)$/u.exec(line);
    const ordered = /^\s*\d+[.)]\s+(.+)$/u.exec(line);
    if (heading) { flushParagraph(); flushList(); flushQuote(); blocks.push(`<h${heading[1].length} id="${anchorId(heading[2])}">${inlineMarkdown(heading[2], source, fromFile)}</h${heading[1].length}>`); continue; }
    const separators = lineIndex + 1 < lines.length ? tableSeparator(lines[lineIndex + 1]) : null;
    if (separators && line.includes("|")) {
      flushParagraph(); flushList(); flushQuote();
      const headers = splitMarkdownTableRow(line);
      const alignments = separators.map(tableAlignment);
      const rows = [];
      lineIndex += 2;
      while (lineIndex < lines.length && lines[lineIndex].trim() && lines[lineIndex].includes("|")) {
        const cells = splitMarkdownTableRow(lines[lineIndex]);
        if (cells.length < 2) break;
        rows.push(cells);
        lineIndex += 1;
      }
      lineIndex -= 1;
      const cellHtml = (tag, value, index) => `<${tag}${alignments[index] ? ` style="text-align:${alignments[index]}"` : ""}>${inlineMarkdown(value || "", source, fromFile)}</${tag}>`;
      blocks.push(`<table><thead><tr>${headers.map((value, index) => cellHtml("th", value, index)).join("")}</tr></thead><tbody>${rows.map(row => `<tr>${headers.map((_, index) => cellHtml("td", row[index], index)).join("")}</tr>`).join("")}</tbody></table>`);
      continue;
    }
    if (/^\s*(?:---+|___+|\*\*\*+)\s*$/u.test(line)) { flushParagraph(); flushList(); flushQuote(); blocks.push("<hr>"); continue; }
    if (/^>\s?/u.test(line)) { flushParagraph(); flushList(); quote.push(line.replace(/^>\s?/u, "")); continue; }
    if (unordered || ordered) {
      flushParagraph(); flushQuote();
      const nextType = unordered ? "ul" : "ol";
      if (listType && listType !== nextType) flushList();
      listType = nextType; listItems.push((unordered || ordered)[1]); continue;
    }
    if (!line.trim()) { flushParagraph(); flushList(); flushQuote(); continue; }
    flushList(); flushQuote(); paragraph.push(line.trim());
  }
  if (fence) blocks.push(`<pre><code class="language-${esc(fence)}">${esc(fenceLines.join("\n"))}</code></pre>`);
  if (displayMathDelimiter) blocks.push(`<div class="display-math${recoverDisplayMath ? " recovered-math" : ""}">${esc([...displayMathLines, displayMathDelimiter].join("\n"))}</div>`);
  flushParagraph(); flushList(); flushQuote();
  return blocks.join("\n");
};

const plainMathTitle = value => String(value)
  .replace(/\\[()[\]]/gu, "")
  .replace(/\\(?:mathbb|mathfrak|mathcal|mathrm|operatorname)\s*\{([^{}]*)\}/gu, "$1")
  .replace(/\\(?:mathbb|mathfrak|mathcal|mathrm|operatorname)\s*([A-Za-z])/gu, "$1")
  .replace(/\\times\b/gu, "×")
  .replace(/\\oplus\b/gu, "⊕")
  .replace(/\\cong\b/gu, "≅")
  .replace(/\\pm\b/gu, "±")
  .replace(/\\[,;:! ]/gu, " ")
  .replace(/_\{([^{}]*)\}/gu, "_$1")
  .replace(/\\([A-Za-z]+)/gu, "$1")
  .replaceAll("\\", "")
  .replace(/\b(?:mathbb|mathfrak|mathcal|operatorname)\s*/gu, "")
  .replace(/\bmathbb\s+Z\b/gu, "ℤ")
  .replace(/\bmathbb\s+R\b/gu, "ℝ")
  .replace(/[{}$]/gu, "")
  .replace(/_([0-9]+)/gu, (_, digits) => digits.replaceAll("0", "₀").replaceAll("1", "₁").replaceAll("2", "₂").replaceAll("3", "₃").replaceAll("4", "₄").replaceAll("5", "₅").replaceAll("6", "₆").replaceAll("7", "₇").replaceAll("8", "₈").replaceAll("9", "₉"));

const libraryLink = (fromFile, source, label = titleBySource.get(source)) => `<a href="${sourcePageHref(fromFile, source)}">${esc(plainMathTitle(label))}</a>`;
const sourceReaderHtml = source => {
  const markdown = markdownBySource.get(source);
  const digest = sha256(markdown);
  const title = titleBySource.get(source);
  const output = sourceOutputPath(source);
  const prefix = encodePath(relative(dirname(output), siteRoot)) + "/";
  const libraryHomeHref = encodePath(relative(dirname(output), join(siteRoot, "library", "index.html")));
  const siblings = librarySources.filter(candidate => dirname(candidate) === dirname(source));
  const siblingIndex = siblings.indexOf(source);
  const previous = siblingIndex > 0 ? siblings[siblingIndex - 1] : null;
  const next = siblingIndex < siblings.length - 1 ? siblings[siblingIndex + 1] : null;
  const incoming = incomingBySource.get(source);
  const outgoing = outgoingBySource.get(source);
  const route = editionRouteFor(source);
  const breadcrumb = `${directoryAncestors(posix(dirname(source))).map(directory => `<a href="${directoryPageHref(output, directory)}">${esc(directoryLabel(directory))}</a>`).join("<i>›</i>")}<i>›</i><span>${esc(plainMathTitle(title))}</span>`;
  const routeExplanation = editionSourceSet.has(source)
    ? `<p><strong>Why this page is here:</strong> Edition 3 cites this document directly.</p>`
    : route.length
      ? `<p><strong>Why this page is here:</strong> the shortest known corpus-link route from an Edition 3 source is:</p><ol>${route.map(item => `<li>${libraryLink(output, item)}</li>`).join("")}</ol>`
      : `<p><strong>Why this page is here:</strong> it belongs to the wider canonical corpus. No explicit Markdown-link route from an Edition 3 citation was found; enter it through hierarchy or search.</p>`;
  const backlinkList = incoming.length ? `<ul>${incoming.map(item => `<li>${libraryLink(output, item)}<small>${esc(item)}</small></li>`).join("")}</ul>` : "<p>No explicit inbound Markdown links were found.</p>";
  const outgoingList = outgoing.length ? `<ul>${outgoing.map(item => `<li>${libraryLink(output, item)}<small>${esc(item)}</small></li>`).join("")}</ul>` : "<p>No explicit outgoing corpus links were found.</p>";
  const body = `<header class="mast detail-mast"><a href="${prefix}index.html">Admissibility frontier · Edition 3</a><nav><a href="${libraryHomeHref}">Corpus library</a> · <a href="${esc(githubBlobUrl(source))}">Canonical source</a></nav></header><nav class="library-breadcrumb"><a href="${libraryHomeHref}">Corpus library</a><i>›</i>${breadcrumb}</nav><header class="hero source-reader-hero"><p class="kicker">Compiled corpus reading projection · ${editionSourceSet.has(source) ? "Edition 3 cited source" : "Wider corpus"}</p><h1>${inlineMarkdown(title, source)}</h1><aside class="boundary"><strong>Authority boundary.</strong> This page is generated from canonical Markdown during publication. It is not an editable or authoritative copy.</aside></header><section class="source-provenance"><dl><dt>Canonical path</dt><dd><code>${esc(source)}</code></dd><dt>Source SHA-256</dt><dd><code>${digest}</code></dd><dt>Build revision</dt><dd><code>${esc(buildRevision)}</code></dd><dt>Corpus links</dt><dd>${incoming.length} inbound · ${outgoing.length} outbound</dd></dl><p><a href="${esc(githubBlobUrl(source))}">History and editing →</a> · <a href="${esc(githubRawUrl(source))}">Raw Markdown →</a></p></section><section class="library-route"><h2>Route into this page</h2>${routeExplanation}</section><article class="source-document">${renderMarkdown(markdown, source)}</article><section class="library-relations"><div><p class="kicker">Referenced by</p><h2>Inbound corpus links</h2>${backlinkList}</div><div><p class="kicker">Continues toward</p><h2>Outgoing corpus links</h2>${outgoingList}</div></section><nav class="page-turn">${previous ? libraryLink(output, previous, `← ${basename(previous, ".md")}`) : `<a href="${libraryHomeHref}">← Corpus library</a>`}${next ? libraryLink(output, next, `${basename(next, ".md")} →`) : `<a href="${esc(githubBlobUrl(source))}">Canonical source →</a>`}</nav>`;
  return htmlDoc(plainMathTitle(title), body, prefix, false, posix(relative(siteRoot, output)));
};

const mdLink = source => `[${basename(source)}](${posix(relative(chaptersRoot, join(root, source)))})`;
const sourceListMd = sources => sources.map(source => `- ${mdLink(source)}`).join("\n");
const sourceListHtml = (sources, fromFile = join(siteRoot, "chapter.html")) => `<ul class="sources">${sources.map(source => `<li><a href="${sourcePageHref(fromFile, source)}">${esc(basename(source))}</a></li>`).join("")}</ul>`;
const detailFileLinkMd = file => `[${basename(file)}](${posix(relative(detailsRoot, join(root, file)))})`;
const detailFileListMd = files => files.map(file => `- ${detailFileLinkMd(file)}`).join("\n");
const detailFileListHtml = files => `<ul class="sources">${files.map(file => `<li><a href="${githubBlobUrl(file)}">${esc(basename(file))}</a></li>`).join("")}</ul>`;
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
    const legacyAnchor = isIntegratedFormerHotSection(chapter, heading) ? `<a id="hot-off-the-press-${anchorId(heading)}"></a>\n` : "";
    body += `${legacyAnchor}<a id="${anchorId(heading)}"></a>\n## ${displayHeading(heading)}\n\n${sectionTaxonomy[heading] ? taxonomyMarkdown(sectionTaxonomy[heading]) : ""}${archetypeMarkdown(researchMove)}${claims}`;
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
const evidenceCss = `.evidence-link{border-color:var(--gold);border-left-color:var(--gold)}.claim-unit+.claim-unit{margin-top:36px;padding-top:28px;border-top:1px dashed var(--line)}.claim-hero h1{max-width:960px}.claim-anatomy{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px;margin-top:28px}.claim-anatomy article{padding:20px;border:1px solid var(--line);border-top:5px solid var(--teal);background:var(--panel)}.claim-anatomy h3{margin-top:0}.claim-source-map{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:12px;padding:0;list-style:none}.claim-source-map li{display:grid;gap:9px;padding:18px;border:1px solid var(--line);background:var(--panel)}.claim-source-map strong{font:700 .9rem/1.4 var(--sans)}.claim-source-map a{font:800 .72rem/1.3 var(--sans);letter-spacing:.04em;text-transform:uppercase}.compact-proof{margin:18px 0;padding:13px 16px}.source-reader-hero h1{font-size:clamp(2.6rem,6vw,5.2rem)}.source-provenance dl{display:grid;grid-template-columns:max-content minmax(0,1fr);gap:8px 18px;font:14px/1.5 var(--sans)}.source-provenance dt{font-weight:800}.source-provenance dd{margin:0;overflow-wrap:anywhere}.source-document{padding:50px 0}.source-document h1{font-size:clamp(2.4rem,5vw,4.5rem)}.source-document h2{margin-top:1.5em}.source-document pre{overflow:auto;padding:20px;background:#172321;color:#f6f0e6;font:14px/1.55 var(--mono)}.source-document code{overflow-wrap:anywhere}.source-document img{max-width:100%;height:auto}.source-document blockquote{margin:24px 0;padding:2px 20px;border-left:5px solid var(--gold);background:var(--panel)}.library-breadcrumb{display:flex;flex-wrap:wrap;gap:.45rem;padding:20px 0 0;color:var(--muted);font:700 .72rem/1.5 var(--sans);overflow-wrap:anywhere}.library-breadcrumb i{font-style:normal;color:var(--line)}.library-route{padding:32px 0}.library-route ol{font:14px/1.6 var(--mono)}.library-relations{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:28px}.library-relations>div{min-width:0}.library-relations ul,.library-results{padding:0;list-style:none}.library-relations li,.library-results li{display:grid;gap:.2rem;padding:12px 0;border-top:1px solid var(--line)}.library-relations small,.library-results small{color:var(--muted);font:12px/1.4 var(--mono);overflow-wrap:anywhere}.library-search{width:100%;padding:15px;border:1px solid var(--line);background:var(--panel);color:var(--ink);font:18px var(--sans)}.library-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px}.library-stat{display:block;padding:18px;border:1px solid var(--line);background:var(--panel);color:var(--ink);text-decoration:none}.library-stat:hover{border-color:var(--teal)}.library-stat strong{display:block;font:700 2rem/1 var(--serif)}.library-stat span{font:700 .7rem/1.4 var(--sans);text-transform:uppercase;letter-spacing:.05em}`;
const directoryCss = `.directory-grid{grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))}.directory-card{display:flex;min-width:0;min-height:230px;flex-direction:column;align-items:flex-start}.directory-card h3{margin:.35rem 0 .55rem;font-size:clamp(1.35rem,2.2vw,1.7rem)}.directory-path{max-width:100%;margin:.15rem 0 1.2rem;color:var(--muted)}.directory-path code{font:700 .74rem/1.4 var(--mono);overflow-wrap:anywhere}.directory-open{margin-top:auto;font:800 .7rem/1.3 var(--sans);letter-spacing:.055em;text-transform:uppercase}.directory-canonical{display:grid;grid-template-columns:max-content minmax(0,1fr);gap:.7rem 1rem;align-items:baseline;margin:1.25rem 0 2rem;color:var(--muted);font:700 .72rem/1.45 var(--sans);letter-spacing:.045em;text-transform:uppercase}.directory-canonical code{min-width:0;color:var(--ink);font:.82rem/1.45 var(--mono);letter-spacing:0;text-transform:none;overflow-wrap:anywhere}@media(max-width:650px){.directory-grid{grid-template-columns:1fr}.directory-card{min-height:190px}.directory-canonical{grid-template-columns:1fr;gap:.25rem}.library-breadcrumb{gap:.35rem;font-size:.67rem}}`;
const articleCss = `.article-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:18px}.article-card{display:flex;flex-direction:column;min-height:300px;padding:25px;border:1px solid var(--line);border-top:6px solid var(--teal);background:var(--panel)}.article-card h2{font-size:clamp(1.7rem,3vw,2.35rem)}.article-card .lede{font-size:1.05rem}.article-actions,.share-bar{display:flex;align-items:center;flex-wrap:wrap;gap:9px;margin-top:auto;font:800 .68rem/1.3 var(--sans);letter-spacing:.055em;text-transform:uppercase}.article-actions a,.share-bar a{display:inline-block;padding:.55rem .72rem;border:1px solid var(--line);background:var(--paper);text-decoration:none}.article-actions a:first-child,.share-bar a:first-of-type{border-color:var(--teal);background:var(--teal);color:white}.share-bar{margin:24px 0 0;padding-top:18px;border-top:1px solid var(--line)}.share-bar strong{margin-right:4px;color:var(--muted)}.article-note{font:.82rem/1.5 var(--sans);color:var(--muted)}@media(max-width:650px){.article-card{min-height:0}.share-bar{align-items:flex-start;flex-direction:column}}`;
const mast = `<header class="mast"><a href="index.html">Admissibility frontier · Edition 3</a><nav><a href="articles/index.html">Articles</a> · <a href="reading-key.html">Reading key</a> · <a href="08-result-ledger.html">Findings</a> · <a href="09-research-frontier.html">Frontier</a> · <a href="../concept-map/index.html">Concept atlas</a></nav></header>`;
const mathHead = (prefix = "") => `<link rel="stylesheet" href="${prefix}vendor/katex/katex.min.css"><script defer src="${prefix}vendor/katex/katex.min.js"></script><script defer src="${prefix}vendor/katex/contrib/auto-render.min.js"></script><script defer src="${prefix}math-render.js"></script>`;
const publicPageUrl = pagePath => `${publicEditionBase}${encodeURI(pagePath).replace(/^\/+|index\.html$/gu, "")}`;
const jsonLd = value => `<script type="application/ld+json">${JSON.stringify(value).replaceAll("<", "\\u003c")}</script>`;
const documentHead = (title, pagePath, description = socialDescription, options = {}) => {
  const canonicalUrl = publicPageUrl(pagePath);
  const pageType = options.type || "website";
  const structuredData = options.structuredData ? jsonLd(options.structuredData) : "";
  return `<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#eee7dc"><meta name="google-site-verification" content="${googleSiteVerificationToken}"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${esc(canonicalUrl)}"><meta property="og:type" content="${pageType}"><meta property="og:site_name" content="The Admissibility Frontier"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${esc(canonicalUrl)}"><meta property="og:image" content="${socialImageUrl}"><meta property="og:image:width" content="1536"><meta property="og:image:height" content="1024"><meta property="og:image:alt" content="${esc(socialImageAlt)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${socialImageUrl}"><meta name="twitter:image:alt" content="${esc(socialImageAlt)}">${structuredData}`;
};
const verificationHead = `<meta name="google-site-verification" content="${googleSiteVerificationToken}">`;
const htmlDoc = (title, body, prefix = "", includeMast = true, pagePath = prefix === "../" ? "library/index.html" : "index.html", description = socialDescription, options = {}) => {
  const fullTitle = `${title} · Admissibility Frontier Edition 3`;
  return `<!doctype html><html lang="en"><head>${documentHead(fullTitle, pagePath, description, options)}${mathHead(prefix)}<link rel="stylesheet" href="${prefix}book.css"></head><body><main>${includeMast ? mast : ""}${body}<footer>Edition 3.2 admissibility preview · 24 October 2026 · Citation set ${sourceDigest.slice(0, 12)} · Admission is not endorsement.</footer></main></body></html>`;
};

const articleChapters = chapters.filter(chapter => articleSlugs.has(chapter.slug));
const articleDescription = chapter => `${typeset(chapter.kicker)}. A short, evidence-linked article from The Admissibility Frontier.`;
const articleStructuredData = chapter => {
  const url = publicPageUrl(`${chapter.slug}.html`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: typeset(chapter.title),
    description: articleDescription(chapter),
    image: [socialImageUrl],
    inLanguage: "en",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: { "@type": "Book", name: "The Admissibility Frontier", url: publicPageUrl("index.html") },
  };
};
const standaloneArticleStructuredData = article => {
  const url = publicPageUrl(`articles/${article.slug}.html`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.kicker,
    image: [socialImageUrl],
    inLanguage: "en",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: { "@type": "CreativeWork", name: "Spin(2,3) Relational Geometry", url: publicSiteBase },
  };
};
const socialShareLinks = (chapter, prefix = "") => {
  const pagePath = chapter.source ? `articles/${chapter.slug}.html` : `${chapter.slug}.html`;
  const url = publicPageUrl(pagePath);
  const text = `${typeset(chapter.title)} — ${typeset(chapter.kicker)}`;
  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  const blueskyHref = `https://bsky.app/intent/compose?text=${encodeURIComponent(`${text}\n${url}`)}`;
  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  return `<div class="share-bar"><strong>Share this article</strong><a href="${esc(xHref)}" target="_blank" rel="noopener noreferrer">Post on X</a><a href="${esc(blueskyHref)}" target="_blank" rel="noopener noreferrer">Bluesky</a><a href="${esc(linkedInHref)}" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="${prefix}articles/index.html">More articles</a></div>`;
};
const articleCardHtml = chapter => {
  const url = publicPageUrl(`${chapter.slug}.html`);
  const text = `${typeset(chapter.title)} — ${typeset(chapter.kicker)}`;
  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  const blueskyHref = `https://bsky.app/intent/compose?text=${encodeURIComponent(`${text}\n${url}`)}`;
  return `<article class="article-card"><p class="kicker">Short article</p><h2><a href="../${chapter.slug}.html">${mathHtml(chapter.title)}</a></h2><p class="lede">${mathHtml(chapter.kicker)}.</p><div class="chapter-taxonomy">${taxonomyBadgeHtml(chapterTaxonomy[chapter.slug], "../")}${archetypeBadgeHtml(chapterArchetype[chapter.slug], "../")}</div><div class="article-actions"><a href="../${chapter.slug}.html">Read article →</a><a href="${esc(xHref)}" target="_blank" rel="noopener noreferrer">Post on X</a><a href="${esc(blueskyHref)}" target="_blank" rel="noopener noreferrer">Bluesky</a></div></article>`;
};
const standaloneArticleCardHtml = article => {
  const url = publicPageUrl(`articles/${article.slug}.html`);
  const text = `${article.title} — ${article.kicker}`;
  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  const blueskyHref = `https://bsky.app/intent/compose?text=${encodeURIComponent(`${text}\n${url}`)}`;
  const note = article.note || "A generated reader view of the canonical corpus source.";
  return `<article class="article-card"><p class="kicker">${esc(article.label || "Corpus article")}</p><h2><a href="${article.slug}.html">${esc(article.title)}</a></h2><p class="lede">${esc(article.kicker)}.</p><p class="article-note">${esc(note)}</p><div class="article-actions"><a href="${article.slug}.html">Read article →</a><a href="${esc(xHref)}" target="_blank" rel="noopener noreferrer">Post on X</a><a href="${esc(blueskyHref)}" target="_blank" rel="noopener noreferrer">Bluesky</a></div></article>`;
};
const articlesIndexHtml = () => {
  const body = `<header class="mast"><a href="../index.html">Admissibility frontier · Edition 3</a><nav><a href="index.html" aria-current="page">Articles</a> · <a href="../reading-key.html">Reading key</a> · <a href="../library/index.html">Corpus library</a></nav></header><header class="hero"><p class="kicker">Short, shareable routes into the corpus</p><h1>Articles</h1><p class="lede">Thirteen focused essays introduce typed translation, conversational contact, mathematical selection, measurement, physical interfaces and hard boundaries of the programme. Each is designed to stand on its own in a social link while retaining a route to its evidence and complete source.</p><aside class="boundary"><strong>Glass-box publication.</strong> These are generated reader views rather than detached summaries. Canonical corpus documents, the complete circulation paper and Edition chapters remain controlling sources.</aside></header><section><div class="article-grid">${standaloneArticles.map(standaloneArticleCardHtml).join("")}${articleChapters.map(articleCardHtml).join("")}</div></section><p class="article-note">Social links open the platform composer with a title, thesis and canonical URL. Nothing is posted without the reader’s action.</p><nav class="page-turn"><a href="../index.html">← Edition contents</a><a href="typed-object-signatures.html">Begin with typed signatures →</a></nav>`;
  return htmlDoc("Articles", body, "../", false, "articles/index.html", "Short, shareable and evidence-linked articles from The Admissibility Frontier.");
};
const standaloneArticleHtml = article => {
  if (!existsSync(join(root, article.source))) throw new Error(`Missing standalone article source: ${article.source}`);
  const markdown = readFileSync(join(root, article.source), "utf8");
  const firstSection = markdown.search(/^## /mu);
  const bodyMarkdown = article === signatureArticle
    ? markdown.replace(/^# [^\n]+\n+_[^\n]+_\n+/u, "")
    : firstSection >= 0 ? markdown.slice(firstSection) : markdown.replace(/^# [^\n]+\n+/u, "");
  const sourceHref = githubBlobUrl(article.completeSource || article.source);
  const sourceLabel = article.completeSource ? "Complete circulation paper" : "Canonical research source";
  const provenance = article.completeSource
    ? "This concise reader edition preserves a route to the complete circulation paper."
    : `This page is generated from <code>${esc(article.source)}</code>. The canonical source controls; publication does not create a second editorial authority.`;
  const output = join(siteArticlesRoot, `${article.slug}.html`);
  const body = `<header class="mast"><a href="../index.html">Admissibility frontier · Edition 3</a><nav><a href="index.html">Articles</a> · <a href="../library/index.html">Corpus library</a></nav></header><header class="hero"><p class="kicker">${esc(article.label || "Corpus article")}</p><h1>${esc(article.title)}</h1><p class="lede">${esc(article.kicker)}.</p><aside class="boundary"><strong>Source boundary.</strong> ${provenance}</aside>${socialShareLinks(article, "../")}</header><article class="source-document article-body">${renderMarkdown(bodyMarkdown, article.source, output)}</article><nav class="page-turn"><a href="index.html">← All articles</a><a href="${esc(sourceHref)}">${sourceLabel} →</a></nav>`;
  return htmlDoc(article.title, body, "../", false, `articles/${article.slug}.html`, article.kicker, { type: "article", structuredData: standaloneArticleStructuredData(article) });
};

const directoryIndexHtml = directory => {
  const output = directoryOutputPath(directory);
  const prefix = encodePath(relative(dirname(output), siteRoot)) + "/";
  const libraryHomeHref = encodePath(relative(dirname(output), join(siteRoot, "library", "index.html")));
  const ancestors = directoryAncestors(directory);
  const breadcrumb = ancestors.map((ancestor, index) => index === ancestors.length - 1
    ? `<span>${esc(directoryLabel(ancestor))}</span>`
    : `<a href="${directoryPageHref(output, ancestor)}">${esc(directoryLabel(ancestor))}</a>`).join("<i>›</i>");
  const children = childDirectoriesByDirectory.get(directory) || [];
  const documents = directSourcesByDirectory.get(directory) || [];
  const childCards = children.length
    ? `<div class="grid directory-grid">${children.map(child => { const count = descendantCount(child); return `<article class="track directory-card"><p class="kicker">Directory · ${count.toLocaleString("en")} ${count === 1 ? "document" : "documents"}</p><h3><a href="${directoryPageHref(output, child)}">${esc(directoryLabel(child))}</a></h3><p class="directory-path"><code>${esc(basename(child))}/</code></p><a class="directory-open" href="${directoryPageHref(output, child)}">Open directory →</a></article>`; }).join("")}</div>`
    : "<p>No child directories.</p>";
  const documentList = documents.length
    ? `<ul class="library-results">${documents.map(source => `<li>${libraryLink(output, source)}<small>${esc(source)} · ${editionSourceSet.has(source) ? "Edition 3 citation" : "wider corpus"}</small></li>`).join("")}</ul>`
    : "<p>No documents live directly at this level.</p>";
  const parent = posix(dirname(directory));
  const parentHref = parent === "." ? libraryHomeHref : directoryPageHref(output, parent);
  const parentLabel = parent === "." ? "Corpus library" : directoryLabel(parent);
  const body = `<header class="mast detail-mast"><a href="${prefix}index.html">Admissibility frontier · Edition 3</a><nav><a href="${libraryHomeHref}">Corpus library</a></nav></header><nav class="library-breadcrumb"><a href="${libraryHomeHref}">Corpus library</a><i>›</i>${breadcrumb}</nav><header class="hero"><p class="kicker">Corpus directory · generated navigation index</p><h1>${esc(directoryLabel(directory))}</h1><p class="lede">${descendantCount(directory).toLocaleString("en")} canonical documents. Use this page to descend through the authored corpus hierarchy rather than jumping by filename.</p><p class="directory-canonical"><span>Canonical directory</span><code>${esc(directory)}/</code></p><aside class="boundary"><strong>Authority boundary.</strong> This index is generated from repository structure. Its documents remain canonical Markdown; directory placement supplies navigation, not scientific status.</aside></header><section><p class="kicker">One level deeper</p><h2>Subdirectories</h2>${childCards}</section><section><p class="kicker">At this level</p><h2>Documents</h2>${documentList}</section><nav class="page-turn"><a href="${parentHref}">← ${esc(parentLabel)}</a><a href="${libraryHomeHref}">Search the whole corpus →</a></nav>`;
  return htmlDoc(directoryLabel(directory), body, prefix, false, posix(relative(siteRoot, output)));
};

function readingKeyHtml() {
  const statusEntries = Object.entries(taxonomy).map(([key, item]) => `<a class="reading-entry tax-${key}" href="reading-key/status-${key}.html"><span class="taxonomy-badge tax-${key}"><span class="tax-icon" aria-hidden="true">${item.icon}</span><span>${esc(item.label)}</span></span><h2>${esc(item.label)}</h2><p>${esc(item.description)}</p><strong>Open ${usagesFor("taxonomy", key).length} indexed uses →</strong></a>`).join("");
  const moveEntries = archetypes.map(item => `<a class="reading-entry role-${item.key}" href="reading-key/move-${item.key}.html"><span class="archetype-badge role-${item.key}"><span class="role-icon" aria-hidden="true">${item.icon}</span><span>${esc(item.name)}</span></span><h2>${esc(item.name)}</h2><p>${esc(item.description)}.</p><strong>Open ${usagesFor("archetype", item.key).length} indexed uses →</strong></a>`).join("");
  return htmlDoc("Reading-key index", `<header class="hero"><p class="kicker">Universal visual grammar</p><h1>Reading-key index</h1><p class="lede">This is the front door, not the whole glossary. Every status and every research move now has its own page containing its definition, reading rule and complete backlink index.</p></header><section><h2>Claim-status pages</h2><p class="lede">Status reports how far a claim has been established and where its boundary lies.</p><div class="reading-index">${statusEntries}</div></section><section><h2>Research-move pages</h2><p class="lede">Research moves describe what a passage is doing. They are temporary functions, not types of people.</p><div class="reading-index">${moveEntries}</div></section><nav class="page-turn"><a href="index.html">← Book contents</a><a href="00-front-matter.html">Start reading →</a></nav>`, "", true, "reading-key.html");
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
  const fullTitle = `${name} · Reading key · Admissibility Frontier Edition 3`;
  return `<!doctype html><html lang="en"><head>${documentHead(fullTitle, `reading-key/${isStatus ? "status" : "move"}-${key}.html`)}${mathHead("../")}<link rel="stylesheet" href="../book.css"></head><body><main>${mastDetail}${body}<footer>Edition 3.2 admissibility preview · reading-key index · Citation set ${sourceDigest.slice(0, 12)} · Admission is not endorsement.</footer></main></body></html>`;
}

function chapterHtml(chapter, index) {
  const previous = index > 0 ? chapters[index - 1] : null;
  const next = index < chapters.length - 1 ? chapters[index + 1] : null;
  const chapterTaxon = taxonomy[chapterTaxonomy[chapter.slug]];
  const chapterRole = archetypeByKey[chapterArchetype[chapter.slug]];
  const isArticle = articleSlugs.has(chapter.slug);
  let body = `<header class="hero"><p class="kicker">${isArticle ? "Short article · " : ""}${mathHtml(chapter.kicker)}</p><h1>${mathHtml(chapter.title)}</h1><div class="chapter-taxonomy">${taxonomyBadgeHtml(chapterTaxonomy[chapter.slug])}${archetypeBadgeHtml(chapterArchetype[chapter.slug])}<p><strong>Status:</strong> ${esc(chapterTaxon.description)} <strong>Function:</strong> ${esc(chapterRole.description)}.</p></div>${chapter.equation ? `<div class="equation">${mathHtml(chapter.equation)}</div>` : ""}${isArticle ? socialShareLinks(chapter) : ""}</header>`;
  body += visualHtml(chapter);
  if (chapter.slug === "00-front-matter") body += `${taxonomyLegendHtml()}${archetypeLegendHtml()}`;
  for (const [heading, paragraphs] of chapter.sections || []) {
    const researchMove = sectionArchetype[heading] || chapterArchetype[chapter.slug];
    const legacyAnchor = isIntegratedFormerHotSection(chapter, heading) ? `<span id="hot-off-the-press-${anchorId(heading)}"></span>` : "";
    body += `${legacyAnchor}<section id="${anchorId(heading)}"><div class="section-taxonomy">${sectionTaxonomy[heading] ? taxonomyBadgeHtml(sectionTaxonomy[heading]) : ""}${archetypeBadgeHtml(researchMove)}</div><h2>${mathHtml(displayHeading(heading))}</h2>${paragraphs.map((paragraph, claimIndex) => `<div class="claim-unit"><p class="lede">${mathHtml(paragraph)}</p>${proofCtaHtml(chapter.slug, heading, claimIndex)}</div>`).join("")}</section>`;
    body += visualHtml(chapter, heading);
  }
  if (chapter.kind === "findings") body += `<section>${findings.map(finding => `<article class="finding" id="${finding.id}"><div><code>${finding.id}</code>${taxonomyBadgeHtml(statusTaxonomy(finding.status))}${archetypeBadgeHtml(statusArchetype(finding.status))}<p class="detail-status">Detailed: ${esc(finding.status)}</p></div><div><h3>${mathHtml(finding.title)}</h3><p>${mathHtml(finding.statement)}</p><p><strong>Boundary.</strong> ${mathHtml(finding.boundary)}</p>${sourceListHtml(finding.sources)}</div></article>`).join("")}</section>`;
  if (chapter.kind === "frontiers") body += `<section><div class="grid">${frontiers.map(track => `<article class="track ${track.priority === "stop-everything" ? "stop" : ""}" id="${track.id}"><p class="status">${track.id}</p>${taxonomyBadgeHtml(frontierTaxonomy(track.id))}${archetypeBadgeHtml(frontierArchetype(track.id))}<p class="detail-status">Priority: ${esc(track.priority)}</p><h3>${mathHtml(track.title)}</h3><p><strong>Question.</strong> ${mathHtml(track.question)}</p><p><strong>Advance when.</strong> ${mathHtml(track.advance)}</p><p><strong>Stop or downgrade when.</strong> ${mathHtml(track.stop)}</p>${sourceListHtml(track.sources)}</article>`).join("")}</div></section>`;
  if (chapter.kind === "provenance") body += `<section><h2>One book, inspectable sources</h2><p class="lede">This preview cites ${allSources.length} controlling documents from ${numberedCount} numbered research documents. Citation-set digest: <code>${sourceDigest}</code>.</p><div class="grid"><article class="track"><h3>Controlling maps</h3>${sourceListHtml([claimPath("00_research_document_map.md"), claimPath("30_research_frontier.md"), claimPath("40_grand_synthesis_spin23_pole.md"), claimPath("49_multi_branch_research_registry.md"), claimPath("91_multi_branch_active_goal_log.md")])}</article><article class="track stop"><h3>Interpretation rule</h3><p>The book is a reading layer. If it conflicts with a cited document, executable certificate or the corpus manifest, the controlling source wins. Presence and coherence do not establish physical truth.</p></article></div></section>`;
  if (chapter.kind === "concept-map") body += `<section><h2>One graph, typed connections</h2><p class="lede">The atlas separates the established mathematical spine from physical realization, projective topology, obstructions and the exceptional horizon. Select any node to see its status, connections and controlling evidence.</p><p><a class="boundary" href="../concept-map/index.html"><strong>Open the interactive concept atlas →</strong></a></p></section><section><h2>The non-negotiable reading rule</h2><p class="lede">A path inherits its weakest edge. Dotted analogy and unresolved dependency never become derivation by proximity to the Spin(2,3) hinge.</p></section>`;
  if (chapter.sources?.length) body += `<section class="chapter-sources"><h2>Chapter sources</h2>${sourceListHtml(chapter.sources)}</section>`;
  body += `<nav class="page-turn"><a href="${previous ? `${previous.slug}.html` : "index.html"}">← ${esc(typeset(previous ? previous.title : "Cover"))}</a>${next ? `<a href="${next.slug}.html">${esc(typeset(next.title))} →</a>` : ""}</nav>`;
  return htmlDoc(typeset(chapter.title), body, "", true, `${chapter.slug}.html`, isArticle ? articleDescription(chapter) : socialDescription, isArticle ? { type: "article", structuredData: articleStructuredData(chapter) } : {});
}

function proofDetailHtml(detail) {
  const assumptions = detail.assumptions.map(([name, value]) => `<tr><th>${mathHtml(name)}</th><td>${mathHtml(value)}</td></tr>`).join("");
  const steps = detail.steps.map(step => `<li>${mathHtml(step)}</li>`).join("");
  const ablations = detail.ablations ? `<section><h2>Necessity check</h2><table><thead><tr><th>Input set</th><th>Closure dimension</th><th>Reading</th></tr></thead><tbody>${detail.ablations.map(row => `<tr><td>${mathHtml(row[0])}</td><td>${esc(row[1])}</td><td>${mathHtml(row[2])}</td></tr>`).join("")}</tbody></table></section>` : "";
  const continuation = detail.continuation ? `<section><h2>The source flow reaches the channel generator</h2><p class="lede">${mathHtml(detail.continuation)}</p></section>` : "";
  const mastDetail = `<header class="mast detail-mast"><a href="../index.html">Admissibility frontier · Edition 3</a><nav><a href="../reading-key.html">Reading key</a> · <a href="../04-furey-interface.html#${detail.backAnchor}">Furey interface</a> · <a href="../10-provenance-and-reading-map.html">Provenance</a></nav></header>`;
  const body = `<header class="hero"><p class="kicker">${mathHtml(detail.kicker)}</p><h1>${mathHtml(detail.title)}</h1><div class="chapter-taxonomy">${taxonomyBadgeHtml(detail.taxonomy, "../")}${archetypeBadgeHtml(detail.archetype, "../")}<p>This page exposes the assumptions, proof chain, certificate files and authority boundary behind the chapter claim.</p></div></header><section><h2>Claim under audit</h2><p class="claim-box">${mathHtml(detail.claim)}</p><h3>Start with the picture</h3><p class="lede">${mathHtml(detail.ordinary)}</p></section><section><h2>Objects and assumptions</h2><table><tbody>${assumptions}</tbody></table></section><section><h2>Certificate chain</h2><ol class="proof-steps">${steps}</ol></section>${ablations}${continuation}<aside class="boundary"><strong>Authority boundary.</strong> ${mathHtml(detail.boundary)}</aside><section><div class="grid"><article class="track"><h2>Executable and inspectable certificates</h2>${detailFileListHtml(detail.certificates)}</article><article class="track"><h2>Controlling research documents</h2>${sourceListHtml(detail.sources, join(siteDetailsRoot, `${detail.slug}.html`))}</article></div></section><nav class="page-turn"><a href="../04-furey-interface.html#${detail.backAnchor}">← Return to the chapter</a><a href="../index.html">Book contents →</a></nav>`;
  const fullTitle = `${typeset(detail.title)} · Admissibility Frontier Edition 3`;
  return `<!doctype html><html lang="en"><head>${documentHead(fullTitle, `details/${detail.slug}.html`)}${mathHead("../")}<link rel="stylesheet" href="../book.css"></head><body><main>${mastDetail}${body}<footer>Edition 3.2 admissibility preview · proof/detail page · Citation set ${sourceDigest.slice(0, 12)} · Admission is not endorsement.</footer></main></body></html>`;
}

function claimDetailHtml(detail) {
  const position = claimDetails.indexOf(detail);
  const previous = position > 0 ? claimDetails[position - 1] : null;
  const next = position < claimDetails.length - 1 ? claimDetails[position + 1] : null;
  const specialized = detail.specialized ? `<section><h2>Deeper certificate</h2><a class="proof-link compact-proof" href="${detail.specialized[0]}.html"><span><b>Calculation or obstruction</b><small>${esc(detail.specialized[1])}</small></span><i>Open certificate →</i></a><p>This specialized page exposes the underlying calculation or obstruction in more detail.</p></section>` : "";
  const sourceCards = detail.sources.map(source => `<li><strong>${mathHtml(sourceDisplayName(source))}</strong><a href="${sourcePageHref(join(siteDetailsRoot, `${detail.slug}.html`), source)}">Open controlling document →</a></li>`).join("");
  const mastDetail = `<header class="mast detail-mast"><a href="../index.html">Admissibility frontier · Edition 3</a><nav><a href="../reading-key.html">Reading key</a> · <a href="../${detail.chapter.slug}.html#${anchorId(detail.heading)}">${mathHtml(detail.chapter.title)}</a> · <a href="../10-provenance-and-reading-map.html">Provenance</a></nav></header>`;
  const body = `<header class="hero claim-hero"><p class="kicker">Expanded claim page · assertion ${detail.claimIndex + 1} of ${detail.claimCount}</p><h1>${mathHtml(detail.heading)}</h1><div class="chapter-taxonomy">${taxonomyBadgeHtml(detail.taxonomy, "../")}${archetypeBadgeHtml(detail.archetype, "../")}<p>${esc(taxonomy[detail.taxonomy].description)} ${esc(archetypeByKey[detail.archetype].description)}.</p></div></header><section><p class="kicker">Exact assertion</p><blockquote class="claim-box">${mathHtml(detail.claim)}</blockquote></section><section><h2>What this commits us to</h2><p class="lede">${esc(claimCommitment(detail.taxonomy))}</p><h2>Logical anatomy</h2><div class="claim-anatomy"><article><h3>Scope</h3><p>Chapter “${mathHtml(detail.chapter.title)}”, section “${mathHtml(detail.heading)}”. This is assertion ${detail.claimIndex + 1} of ${detail.claimCount} in that section.</p></article><article><h3>Evidence posture</h3><p>${esc(evidenceReading(detail.taxonomy))}</p></article><article><h3>Research move</h3><p>${esc(archetypeByKey[detail.archetype].description)}.</p></article></div></section><section><h2>Verification route</h2><ol class="proof-steps"><li>Recover the declared objects and assumptions from the controlling documents.</li><li>Check the calculation, construction, obstruction or stopping rule on those same objects.</li><li>Compare the source conclusion with the exact assertion above; do not strengthen its verbs or enlarge its domain.</li><li>Apply the status rule and retain every named external dependency.</li></ol></section><section><h2>What would move or defeat this claim</h2><p class="lede">${esc(claimChallenge(detail.taxonomy))}</p></section>${specialized}<section><p class="kicker">Source map</p><h2>Controlling documents</h2><ul class="claim-source-map">${sourceCards}</ul><aside class="boundary"><strong>Authority boundary.</strong> This page is an automatically generated reading and audit layer. The cited research documents and executable certificates remain authoritative.</aside></section><nav class="page-turn">${previous ? `<a href="${previous.slug}.html">← Previous claim</a>` : `<a href="../${detail.chapter.slug}.html#${anchorId(detail.heading)}">← Chapter</a>`}<a href="../${detail.chapter.slug}.html#${anchorId(detail.heading)}">Return to assertion</a>${next ? `<a href="${next.slug}.html">Next claim →</a>` : `<a href="../index.html">Contents →</a>`}</nav>`;
  const fullTitle = `${typeset(detail.heading)} · Claim page · Admissibility Frontier Edition 3`;
  return `<!doctype html><html lang="en"><head>${documentHead(fullTitle, `details/${detail.slug}.html`)}${mathHead("../")}<link rel="stylesheet" href="../book.css"></head><body><main>${mastDetail}${body}<footer>Edition 3.2 admissibility preview · generated claim page · Citation set ${sourceDigest.slice(0, 12)} · Admission is not endorsement.</footer></main></body></html>`;
}

if (!siteOnly) {
  mkdirSync(bookRoot, { recursive: true });
  rmSync(chaptersRoot, { recursive: true, force: true });
  rmSync(detailsRoot, { recursive: true, force: true });
  rmSync(readingKeyRoot, { recursive: true, force: true });
  mkdirSync(chaptersRoot, { recursive: true });
  mkdirSync(detailsRoot, { recursive: true });
  mkdirSync(readingKeyRoot, { recursive: true });
}
rmSync(siteRoot, { recursive: true, force: true });
mkdirSync(siteRoot, { recursive: true });
mkdirSync(siteDetailsRoot, { recursive: true });
mkdirSync(siteReadingKeyRoot, { recursive: true });
mkdirSync(siteArticlesRoot, { recursive: true });
mkdirSync(assetsRoot, { recursive: true });
if (!existsSync(katexSourceRoot)) throw new Error(`Missing vendored KaTeX distribution: ${katexSourceRoot}`);
if (!existsSync(publicationAssetsRoot)) throw new Error(`Missing publication assets: ${publicationAssetsRoot}`);
mkdirSync(join(siteRoot, "vendor"), { recursive: true });
cpSync(katexSourceRoot, katexSiteRoot, { recursive: true, force: true });
cpSync(publicationAssetsRoot, assetsRoot, { recursive: true, force: true });
writeFileSync(join(siteRoot, "math-render.js"), `document.addEventListener("DOMContentLoaded",()=>{if(typeof renderMathInElement!=="function")return;renderMathInElement(document.body,{delimiters:[{left:"\\\\(",right:"\\\\)",display:false},{left:"\\\\[",right:"\\\\]",display:true}],ignoredTags:["script","noscript","style","textarea","pre","code"],throwOnError:false,strict:false,trust:false});});\n`);
for (const [name, source] of Object.entries(svgAssets)) writeFileSync(join(assetsRoot, name), `${typeset(source)}\n`);
const tocMd = chapters.map((chapter, index) => {
  const item = taxonomy[chapterTaxonomy[chapter.slug]];
  const role = archetypeByKey[chapterArchetype[chapter.slug]];
  return `${index + 1}. [${typeset(chapter.title)}](chapters/${chapter.slug}.md) — **[${item.icon} ${item.label}](reading-key/status-${chapterTaxonomy[chapter.slug]}.md)** · **[${role.icon} ${role.name}](reading-key/move-${chapterArchetype[chapter.slug]}.md)** · ${typeset(chapter.kicker)}`;
}).join("\n");
const coverMd = `# The admissibility frontier\n\n## New physics by preserving distinctions\n\n**Edition 3.2 admissibility preview · 24 October 2026**\n\n![Relational geometry represented by two linked faces, a central hinge, compass, ruler and Möbius ribbon](../../tooling/publication/assets/relational-geometry-hero.png)\n\nThe next route to new physics may begin not with higher energy but with greater finesse: preserving phase, delay, boundary order, memory, orientation and cross-channel relation that ordinary measurements erase. This book follows that experimental problem backward into mathematics. Jordan structure delimits what can coexist and compose; Lie structure describes how the admitted domain moves; dynamics and detectors determine which distinctions survive as records. Spin₀(2,3) is one exact recovered completion in that passage, not its protagonist.\n\n> **Authority boundary.** This edition reports exact calculations, bounded constructions, conditional physical bridges and closed branches. It is not empirical confirmation, peer review or a derivation of the Standard Model. The strong claim that admissibility is ontologically prior to physics remains a research proposal; the finesse pathway and its typed tests are the practical result established here.\n\n## Contents\n\n${tocMd}\n\n## Other reading surfaces\n\n- [Read the canonical reading contract](../../corpus/READING_CONTRACT.md)\n- [Read the admissibility synthesis](../../corpus/syntheses/the_admissibility_frontier_current_synthesis.md)\n- [Browse the status and research-move index](reading-key.md)\n- [Open the live paged HTML edition](https://aaron-alderman.github.io/spin23-relational-geometry/)\n- [Open the interactive concept atlas](../../docs/concept-map/index.html)\n- Compile the paged HTML artifact with **node tooling/publication/generate_edition3_book_preview.mjs --site-only --site-root .build/pages/edition-3**\n- [Return to the repository front door](../../README.md)\n- [Inspect the complete corpus manifest](../../corpus/registers/spin23_corpus_manifest.json)\n\nCitation-set digest: \`${sourceDigest}\`\n`;
if (!siteOnly) {
  writeFileSync(join(bookRoot, "README.md"), coverMd.replace("not its protagonist", "not the premise or centre of the programme"));
  writeFileSync(join(bookRoot, "reading-key.md"), readingKeyMarkdown());
  Object.keys(taxonomy).forEach(key => writeFileSync(join(readingKeyRoot, `status-${key}.md`), readingKeyDetailMarkdown("taxonomy", key)));
  archetypes.forEach(item => writeFileSync(join(readingKeyRoot, `move-${item.key}.md`), readingKeyDetailMarkdown("archetype", item.key)));
  chapters.forEach((chapter, index) => writeFileSync(join(chaptersRoot, `${chapter.slug}.md`), chapterMarkdown(chapter, index)));
  proofDetails.forEach(detail => writeFileSync(join(detailsRoot, `${detail.slug}.md`), proofDetailMarkdown(detail)));
  claimDetails.forEach(detail => writeFileSync(join(detailsRoot, `${detail.slug}.md`), claimDetailMarkdown(detail)));
  claimDetails.filter(detail => isIntegratedFormerHotSection(detail.chapter, detail.heading)).forEach(detail => {
    const legacySlug = detail.slug.replace("08-admissibility-frontier-", "08-admissibility-frontier-hot-off-the-press-");
    writeFileSync(join(detailsRoot, `${legacySlug}.md`), `# Integrated section\n\nThis provisional-history URL is retained as a compatibility alias. The result now appears in the book's subject order.\n\n[Open the integrated claim page](${detail.slug}.md)\n`);
  });
}

const contentsHtml = chapters.map((chapter, index) => `<div class="contents-row"><span class="chapter-number">${String(index + 1).padStart(2, "0")}</span><span class="contents-copy"><a class="chapter-title" href="${chapter.slug}.html"><strong>${mathHtml(chapter.title)}</strong></a>${taxonomyBadgeHtml(chapterTaxonomy[chapter.slug])}${archetypeBadgeHtml(chapterArchetype[chapter.slug])}</span><a class="read-link" href="${chapter.slug}.html">Read →</a></div>`).join("");
const coverHtml = htmlDoc("The admissibility frontier", `<header class="hero"><p class="kicker">Volume II · Edition 3.2 admissibility preview</p><h1>The admissibility frontier<br><em>New physics by preserving distinctions</em></h1><p class="lede">The next frontier may require more finesse, not only more energy. Preserve the phase, delay, boundary order, memory and cross-channel relation that ordinary measurements erase; then ask whether the recovered record closes under established physics or exposes a reproducible residual.</p><aside class="boundary"><strong>Authority boundary.</strong> This volume is not empirical confirmation, peer review or a derivation of the Standard Model. Admissibility is an executable research method here; its stronger ontological status remains open.</aside><img class="hero-art" src="assets/relational-geometry-hero.png" alt="Relational geometry represented by two linked faces, a central hinge, compass, ruler and Möbius ribbon"></header><section><p class="kicker">A lighter way in</p><h2>Thirteen short articles</h2><p class="lede">Shareable essays introduce typed translation, conversational contact, mathematical selection, the programme’s exact hinge, physical interfaces and strongest obstructions without detaching them from their evidence.</p><p><a class="proof-link" href="articles/index.html"><span><b>Browse the articles</b><small>Standalone social previews · direct X and Bluesky sharing · sources intact</small></span><i>Read →</i></a></p></section><section class="contents"><p class="kicker">Fourteen substantial reader chapters + interactive atlas</p><h2>Choose a chapter</h2>${contentsHtml}</section><section><p class="kicker">Beyond the volume</p><h2>Follow the research all the way down</h2><p class="lede">The complete corpus is compiled into a searchable library with explicit backlinks, neighbouring documents and visible routes from this Edition into deep programme waves.</p><p><a class="proof-link" href="library/index.html"><span><b>Open the complete corpus library</b><small>${librarySources.length.toLocaleString("en")} canonical Markdown documents · one generated journey</small></span><i>Explore →</i></a></p></section><nav class="page-turn"><span></span><a href="00-front-matter.html">Begin the volume →</a></nav>`);
writeFileSync(join(siteRoot, "book.css"), `${css}${proofCss}${contentsFixCss}${evidenceCss}${directoryCss}${articleCss}`);
writeFileSync(join(siteRoot, "index.html"), coverHtml);
writeFileSync(join(siteArticlesRoot, "index.html"), articlesIndexHtml());
standaloneArticles.forEach(article => writeFileSync(join(siteArticlesRoot, `${article.slug}.html`), standaloneArticleHtml(article)));
writeFileSync(join(siteRoot, "reading-key.html"), readingKeyHtml());
Object.keys(taxonomy).forEach(key => writeFileSync(join(siteReadingKeyRoot, `status-${key}.html`), readingKeyDetailHtml("taxonomy", key)));
archetypes.forEach(item => writeFileSync(join(siteReadingKeyRoot, `move-${item.key}.html`), readingKeyDetailHtml("archetype", item.key)));
chapters.forEach((chapter, index) => writeFileSync(join(siteRoot, `${chapter.slug}.html`), chapterHtml(chapter, index)));
proofDetails.forEach(detail => writeFileSync(join(siteDetailsRoot, `${detail.slug}.html`), proofDetailHtml(detail)));
claimDetails.forEach(detail => writeFileSync(join(siteDetailsRoot, `${detail.slug}.html`), claimDetailHtml(detail)));
claimDetails.filter(detail => isIntegratedFormerHotSection(detail.chapter, detail.heading)).forEach(detail => {
  const legacySlug = detail.slug.replace("08-admissibility-frontier-", "08-admissibility-frontier-hot-off-the-press-");
  writeFileSync(join(siteDetailsRoot, `${legacySlug}.html`), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${verificationHead}<meta http-equiv="refresh" content="0; url=${detail.slug}.html"><link rel="canonical" href="${detail.slug}.html"><title>Integrated section</title></head><body><p>This result has been integrated into the book's subject order. <a href="${detail.slug}.html">Open the current claim page</a>.</p></body></html>`);
});
const sourceManifest = librarySources.map(source => {
  const markdown = markdownBySource.get(source);
  const output = sourceOutputPath(source);
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, sourceReaderHtml(source));
  return {
    source,
    output: posix(relative(siteRoot, output)),
    sha256: sha256(markdown),
    title: plainMathTitle(titleBySource.get(source)),
    editionCited: editionSourceSet.has(source),
    inboundCount: incomingBySource.get(source).length,
    outboundCount: outgoingBySource.get(source).length,
  };
});
const directoryManifest = libraryDirectories.map(directory => {
  const output = directoryOutputPath(directory);
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, directoryIndexHtml(directory));
  return {
    directory,
    title: directoryLabel(directory),
    output: posix(relative(siteRoot, output)),
    documentCount: descendantCount(directory),
    directDocumentCount: (directSourcesByDirectory.get(directory) || []).length,
    childDirectoryCount: (childDirectoriesByDirectory.get(directory) || []).length,
  };
});
for (const source of allSources) {
  const legacyOutput = legacySourceOutputPath(source);
  const canonicalOutput = sourceOutputPath(source);
  const target = encodePath(relative(dirname(legacyOutput), canonicalOutput));
  mkdirSync(dirname(legacyOutput), { recursive: true });
  writeFileSync(legacyOutput, `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${verificationHead}<meta http-equiv="refresh" content="0; url=${esc(target)}"><link rel="canonical" href="${esc(target)}"><title>Corpus library redirect</title></head><body><p>This source reader moved into the full corpus library. <a href="${esc(target)}">Open the canonical compiled page</a>.</p></body></html>`);
}
const directorySearchIndex = directoryManifest.map(item => ({ kind: "directory", source: `${item.directory}/`, title: item.title, href: item.output.replace(/^library\//u, ""), documentCount: item.documentCount }));
const documentSearchIndex = sourceManifest.map(item => ({ kind: "document", source: item.source, title: item.title, href: item.output.replace(/^library\//u, ""), editionCited: item.editionCited, inboundCount: item.inboundCount, outboundCount: item.outboundCount }));
const searchIndex = [...directorySearchIndex, ...documentSearchIndex];
const libraryIndexPath = join(siteRoot, "library", "index.html");
const libraryStats = (childDirectoriesByDirectory.get("corpus") || []).map(directory => `<a class="library-stat" href="${encodePath(posix(relative(join(siteRoot, "library"), directoryOutputPath(directory))))}"><strong>${descendantCount(directory).toLocaleString("en")}</strong><span>${esc(directoryLabel(directory))}</span></a>`).join("");
const searchDescription = item => item.kind === "directory" ? `Directory · ${item.documentCount} documents` : `${item.editionCited ? "Edition 3 citation" : "wider corpus"} · ${item.inboundCount} in / ${item.outboundCount} out`;
const initialLibraryResults = searchIndex.slice(0, 80).map(item => `<li><a href="${encodePath(item.href)}">${esc(item.title)}</a><small>${esc(item.source)} · ${searchDescription(item)}</small></li>`).join("");
const libraryIndexHtml = htmlDoc("Corpus library", `<header class="mast"><a href="../index.html">Admissibility frontier · Edition 3</a><nav><a href="../index.html">Book</a></nav></header><header class="hero"><p class="kicker">Generated from canonical Markdown · ${librarySources.length.toLocaleString("en")} documents</p><h1>Corpus library</h1><p class="lede">The complete research corpus as a navigable reading layer. Search titles and paths, follow explicit links and backlinks, or move through neighbouring documents. Markdown remains the sole source of truth.</p><aside class="boundary"><strong>Authority boundary.</strong> Every page below is rebuilt from <code>corpus/**/*.md</code>. Edit the Markdown, never the compiled HTML.</aside></header><section><h2>Shape of the corpus</h2><div class="library-stats">${libraryStats}</div></section><section><p class="kicker">Path and title search</p><h2>Find a directory or document</h2><input id="library-search" class="library-search" type="search" placeholder="Try monster, triality, admissibility, wave-7…" autocomplete="off"><p id="library-count">Showing the first ${Math.min(80, searchIndex.length)} of ${searchIndex.length.toLocaleString("en")} indexed entries.</p><ul id="library-results" class="library-results">${initialLibraryResults}</ul></section><nav class="page-turn"><a href="../index.html">← Edition contents</a><a href="manifest.json">Library manifest →</a></nav><script>const indexUrl="search-index.json";const input=document.querySelector("#library-search");const list=document.querySelector("#library-results");const count=document.querySelector("#library-count");const escapeHtml=value=>String(value).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");let documents=[];const render=()=>{const query=input.value.trim().toLowerCase();const words=query.split(/\\s+/).filter(Boolean);const matches=documents.filter(item=>words.every(word=>(item.title+" "+item.source).toLowerCase().includes(word))).slice(0,200);list.innerHTML=matches.map(item=>"<li><a href=\""+encodeURI(item.href)+"\">"+escapeHtml(item.title)+"</a><small>"+escapeHtml(item.source)+" · "+(item.kind==="directory"?"Directory · "+item.documentCount+" documents":(item.editionCited?"Edition 3 citation":"wider corpus")+" · "+item.inboundCount+" in / "+item.outboundCount+" out")+"</small></li>").join("");count.textContent="Showing "+matches.length+(query?" matching":" of "+documents.length)+" indexed entries"+(matches.length===200?" (first 200)":"")+".";};fetch(indexUrl).then(response=>response.json()).then(data=>{documents=data.documents;input.addEventListener("input",render);});</script>`, "../", false);
mkdirSync(join(siteRoot, "library"), { recursive: true });
writeFileSync(libraryIndexPath, libraryIndexHtml);
writeFileSync(join(siteRoot, "library", "search-index.json"), `${JSON.stringify({ schema: "spin23-edition3-corpus-search/v1", documents: searchIndex })}\n`);
writeFileSync(join(siteRoot, "library", "manifest.json"), `${JSON.stringify({ schema: "spin23-edition3-corpus-library/v1", buildRevision, citationDigest: sourceDigest, documentCount: sourceManifest.length, directoryCount: directoryManifest.length, editionCitationCount: allSources.length, directories: directoryManifest, documents: sourceManifest }, null, 2)}\n`);
mkdirSync(join(siteRoot, "sources"), { recursive: true });
writeFileSync(join(siteRoot, "sources", "manifest.json"), `${JSON.stringify({ schema: "spin23-edition3-source-readers/v2", buildRevision, citationDigest: sourceDigest, libraryManifest: "../library/manifest.json", sources: sourceManifest.filter(item => item.editionCited).map(item => ({ ...item, legacyOutput: posix(relative(siteRoot, legacySourceOutputPath(item.source))) })) }, null, 2)}\n`);
mkdirSync(siteIndexRoot, { recursive: true });
writeFileSync(join(siteIndexRoot, "index.html"), `<!doctype html><html lang="en"><head>${documentHead("The Admissibility Frontier · Edition 3", "index.html", "New physics by preserving distinctions: an inspectable research corpus connecting relational geometry, admissibility, Spin(2,3), exact results, obstructions and open experimental gates.")}<meta http-equiv="refresh" content="0; url=edition-3/index.html"></head><body><p><a href="edition-3/index.html">Open the Edition 3 book preview</a></p></body></html>`);

const publicationAuthority = {
  role: "canonical-publication-source",
  repository: "https://github.com/aaron-alderman/spin23-relational-geometry",
  sourcePath: "book/edition-3/book.json",
  generatorPath: "tooling/publication/generate_edition3_book_preview.mjs",
  mirrorPolicy: "Claimipedia and other reading surfaces may add presentation metadata, but must preserve these generated scientific fields and citation digest.",
  authoritativeFields: ["schema", "edition", "generatedAt", "numberedCorpusDocuments", "citationCount", "citationDigest", "taxonomy", "archetypes", "chapters", "proofDetails", "claimDetails", "findings", "frontiers"],
};

const metadata = { schema: "spin23-edition3-book/v1", edition: "3.2 admissibility preview", generatedAt: "2026-10-25T00:00:00.000Z", publicationAuthority, numberedCorpusDocuments: numberedCount, citationCount: allSources.length, citationDigest: sourceDigest, taxonomy, archetypes, chapters: chapters.map((chapter, index) => ({ number: index + 1, slug: chapter.slug, title: typeset(chapter.title), taxonomy: chapterTaxonomy[chapter.slug], archetype: chapterArchetype[chapter.slug], sourceCount: chapter.sources.length, sources: chapter.sources })), proofDetails: proofDetails.map(detail => ({ slug: detail.slug, title: typeset(detail.title), taxonomy: detail.taxonomy, archetype: detail.archetype, certificates: detail.certificates, sources: detail.sources })), claimDetails: claimDetails.map(detail => ({ slug: detail.slug, chapter: detail.chapter.slug, heading: typeset(detail.heading), claim: typeset(detail.claim), claimIndex: detail.claimIndex, taxonomy: detail.taxonomy, archetype: detail.archetype, sources: detail.sources })), findings: findings.map(finding => ({ ...finding, title: typeset(finding.title), statement: typeset(finding.statement), boundary: typeset(finding.boundary), taxonomy: statusTaxonomy(finding.status), archetype: statusArchetype(finding.status) })), frontiers: frontiers.map(frontier => ({ ...frontier, title: typeset(frontier.title), question: typeset(frontier.question), advance: typeset(frontier.advance), stop: typeset(frontier.stop), taxonomy: frontierTaxonomy(frontier.id), archetype: frontierArchetype(frontier.id) })) };
if (!siteOnly) writeFileSync(join(bookRoot, "book.json"), `${JSON.stringify(metadata, null, 2)}\n`);
console.log(JSON.stringify({ bookRoot: relative(root, bookRoot), siteRoot: relative(root, siteRoot), chapters: chapters.length, claims: claimDetails.length, findings: findings.length, frontiers: frontiers.length, citations: allSources.length, libraryDocuments: librarySources.length, digest: sourceDigest }, null, 2));
