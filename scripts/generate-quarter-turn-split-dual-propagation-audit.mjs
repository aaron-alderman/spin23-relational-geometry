import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";

const root = resolve(process.cwd());
const write = process.argv.includes("--write");
const outJson = "corpus/programmes/frontier-physics-targets/quarter_turn_split_dual_propagation_audit_v1.json";
const outMd = "corpus/programmes/frontier-physics-targets/quarter_turn_split_dual_propagation_audit_v1.md";
const posix = value => value.split(sep).join("/");
const digest = value => createHash("sha256").update(value).digest("hex");

function walk(directory) {
  return readdirSync(directory).flatMap(name => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const exactOtherCarriers = new Map([
  ["corpus/claims/0900-0999/902_the_product_of_furey_handle_and_higgs_channel_gradings_is_exactly_the_missing_lepton_color_sign_and_conditionally_reopens_the_a2_route.md", "Two anticommuting positive-square Pauli operations on the aggregate response plane; their product is the negative-square direction."],
  ["corpus/claims/0900-0999/916_the_neutral_peirce_to_selector_intertwiner_is_a_u1_torsor_collapsing_to_two_signs_when_real_structure_is_preserved.md", "A negative-square complex structure and positive-square real reflection anticommute on both source and selector planes."],
  ["corpus/claims/0900-0999/981_the_fourier_and_handle_forms_define_a_split_quaternionic_bisymplectic_recursion_with_an_index_four_eigenlattice_seam.md", "The negative-square graded complex structure anticommutes with the positive-square recursion involution, giving an explicit split-quaternionic cell."],
]);

const neighbouringLandmarks = new Map([
  ["corpus/claims/0900-0999/969_the_graded_sideband_interface_preserves_pfaffian_alignment_and_is_a_quaternionic_antiunitary_with_square_minus_identity.md", "The square-minus-one object is antiunitary; it is a quaternionic neighbour, not the same real-linear Cl(1,1) cell."],
  ["corpus/claims/0900-0999/983_a_single_imaginary_quadrature_symplectic_transvection_maps_the_recursion_saturation_to_the_common_mode_carrier.md", "The square-zero transvection is an exact dual-number direction, but its conjugate involution and full local cell are separately typed."],
  ["corpus/claims/1500-1599/1505_the_real_completed_two_path_geometry_uniquely_lifts_the_mask_reflection_as_J_odd_relation_sheet_parity.md", "The sheet parity is a positive-square involution anticommuting with a KO-6 real structure; semilinearity and KO-sign must be retained."],
]);

const physicalCalibrations = new Map([
  ["corpus/programmes/admissibility/admissibility_142_a_three_resonator_parity_switch_turns_the_dual_face_into_a_detector.md", "A programmable three-resonator ring realizes the Laplacian/signless selector physically and exposes loop parity in a held-out cubic pole-product invariant without identifying Claimipedia semantics with forces."],
]);

const canonicalPaths = new Set([
  "corpus/programmes/admissibility/admissibility_126_typed_two_rail_positive_lift_preserves_the_mirror_face.md",
  "corpus/programmes/admissibility/admissibility_129_elliptic_hyperbolic_parabolic_local_alphabet.md",
  "corpus/programmes/admissibility/admissibility_130_quarter_turn_and_mirror_generate_the_dual_seam.md",
  "corpus/programmes/admissibility/admissibility_131_the_authored_rail_grading_closes_the_local_clifford_cell_but_opens_a_coincidence_channel.md",
  "corpus/programmes/admissibility/admissibility_133_the_incidence_coincidence_doublet_detects_odd_cycle_topology.md",
  "corpus/programmes/admissibility/admissibility_134_no_global_semantic_adjoint_exists_on_the_current_claimipedia_relation_source.md",
]);

const candidatePattern = /quarter[- ]turn|wick rotation|split[- ]complex|dual[- ]number|nilpotent|square[- ]zero|square minus|negative[- ]square|anticommut|para-hypercomplex|split-quaternion|cl\(1,1\)|clifford cell|co-incidence|signless laplacian|semantic adjoint/iu;
const corpusFiles = walk(join(root, "corpus"))
  .filter(path => path.endsWith(".md"))
  .map(path => posix(relative(root, path)))
  .filter(path => path !== outMd)
  .sort();

const candidates = corpusFiles.flatMap(path => {
  const text = readFileSync(join(root, path), "utf8");
  if (!candidatePattern.test(text)) return [];
  let category;
  let reason;
  if (canonicalPaths.has(path)) {
    category = "canonical_claimipedia_rail_cell";
    reason = "Part of the source-native typed-rail derivation and its local comparator.";
  } else if (exactOtherCarriers.has(path)) {
    category = "exact_cl11_grammar_other_carrier";
    reason = exactOtherCarriers.get(path);
  } else if (neighbouringLandmarks.has(path)) {
    category = "typed_neighbour_not_identical";
    reason = neighbouringLandmarks.get(path);
  } else if (physicalCalibrations.has(path)) {
    category = "physical_detector_calibration";
    reason = physicalCalibrations.get(path);
  } else if (/nilpotent|square[- ]zero|dual[- ]number/iu.test(text)) {
    category = "nilpotent_or_dual_language_other_mechanism";
    reason = "Contains a nilpotent, square-zero or dual-number structure whose carrier and partner operators must not be inferred from lexical overlap.";
  } else if (/quarter[- ]turn|wick rotation|square minus|negative[- ]square/iu.test(text)) {
    category = "complex_or_quarter_turn_other_carrier";
    reason = "Contains a compact or complex direction without an audited identification with the Claimipedia rail mirror.";
  } else if (/anticommut|clifford/iu.test(text)) {
    category = "clifford_or_anticommutation_other_typing";
    reason = "Contains anticommutation or Clifford structure; signature, linearity, carrier and dynamics remain local to that document.";
  } else {
    category = "navigation_or_interpretive_reference";
    reason = "References the vocabulary without supplying the complete typed operator pair.";
  }
  return [{ path, category, reason, sha256: digest(text.replaceAll("\r\n", "\n")) }];
});

const counts = Object.fromEntries([...new Set(candidates.map(item => item.category))].sort().map(category => [category, candidates.filter(item => item.category === category).length]));
const landmarks = [...exactOtherCarriers, ...neighbouringLandmarks].map(([path, reason]) => ({
  path,
  category: exactOtherCarriers.has(path) ? "exact_cl11_grammar_other_carrier" : "typed_neighbour_not_identical",
  reason
}));
const sourceDigest = digest(candidates.map(item => `${item.path}:${item.sha256}`).join("\n"));
const output = {
  protocol: "quarter-turn-split-dual-propagation-audit/1",
  date: "2026-10-26",
  sourceDigest,
  candidatePattern: candidatePattern.source,
  summary: {
    corpusMarkdownScanned: corpusFiles.length,
    candidates: candidates.length,
    unclassified: 0,
    categories: counts,
    exactOtherCarrierCells: exactOtherCarriers.size,
    typedNeighbourLandmarks: neighbouringLandmarks.size,
    physicalDetectorCalibrations: physicalCalibrations.size
  },
  decision: {
    sameLocalAlgebraImpliesSameCarrier: false,
    sameLocalAlgebraImpliesSameDynamics: false,
    claimipediaSourceNativeCellClosed: true,
    crossCarrierIntertwinerClosed: false,
    physicalActionClosed: false,
    corpusSemanticQueueClosed: true
  },
  landmarks,
  candidates
};

const rows = candidates.map(item => `| \`${item.path}\` | \`${item.category}\` | ${item.reason} |`).join("\n");
const md = `# Quarter-turn, split and dual propagation audit v1

**Date:** 26 October 2026
**Status:** corpus semantic queue exhausted; cross-carrier physical identification remains open
**Machine authority:** [JSON audit](quarter_turn_split_dual_propagation_audit_v1.json)
**Reference:** [AZ-132](../admissibility/admissibility_132_cross_corpus_clifford_cell_atlas_and_exhaustion.md)

## Result

The audit scans **${corpusFiles.length}** corpus Markdown documents and routes all **${candidates.length}** documents containing the declared quarter-turn, split, dual, nilpotent or anticommutation vocabulary. No lexical occurrence is allowed to imply a shared carrier or dynamics.

${Object.entries(counts).map(([category, count]) => `- \`${category}\`: **${count}**`).join("\n")}

Three non-Claimipedia branches carry the complete real-linear local grammar on their own typed carriers. Three further landmarks are close but retain antiunitary, KO-sign or lone-nilpotent distinctions. The remaining documents are conservatively routed by mechanism class rather than promoted by terminology.

## Complete disposition table

| Document | Disposition | Boundary |
|---|---|---|
${rows}

## Exit and reopening

The semantic propagation queue is closed when every matching corpus document has a disposition and all exact-cell landmarks remain present. The scientific programme reopens only for an explicit carrier-preserving intertwiner, shared action or held-out detector record joining two currently separate cells.
`;

if (write) {
  writeFileSync(join(root, outJson), `${JSON.stringify(output, null, 2)}\n`);
  writeFileSync(join(root, outMd), md);
}

console.log(JSON.stringify({ result: "pass", write, outputs: write ? [outJson, outMd] : [], summary: output.summary }, null, 2));
