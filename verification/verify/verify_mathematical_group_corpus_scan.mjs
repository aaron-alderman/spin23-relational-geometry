import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import {
  loadMathematicalGroupCatalogue,
  loadMathematicalGroupCorpusScan
} from "../../scripts/query-mathematical-group-catalogue.mjs";

const root = process.cwd();
const catalogue = loadMathematicalGroupCatalogue(root);
const scan = loadMathematicalGroupCorpusScan(root);
const ambiguityRegister = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/mathematical-group-atlas/mathematical_group_token_ambiguity_register_v1.json"), "utf8"));

assert.equal(scan.schema, "mathematical-group-corpus-scan/1");
assert.equal(scan.basis.catalogueDate, catalogue.date);
assert.equal(scan.basis.algorithmVersion, "17");
assert.equal(scan.basis.ambiguityRegisterDate, ambiguityRegister.date);
assert.match(scan.authority, /candidate_extraction_not_promoted/);
assert.ok(fs.existsSync(path.join(root, scan.catalogue)), "catalogue source must exist");
assert.equal(
  scan.coverage.filesDiscovered,
  scan.coverage.filesScanned + scan.coverage.skippedLargeFiles.length + scan.coverage.excludedFiles.length
);
assert.match(scan.coverage.skippedMeaning, /not_negative_evidence/);

const groupIds = new Set(catalogue.groups.map((group) => group.id));
const mentionedGroupIds = new Set(scan.groupMentions.map((mention) => mention.groupId));
for (const productId of ["grp:SU2xU1", "grp:SU3xU1", "grp:SU3xSU2", "grp:SO3xSO2", "grp:U1xU2"]) {
  assert.ok(mentionedGroupIds.has(productId), `algorithm 7 must resolve whitespace-flexible explicit product alias ${productId}`);
}
const candidateById = new Map();
const fileLines = new Map();
const linesFor = (relativePath) => {
  if (!fileLines.has(relativePath)) {
    const absolute = path.join(root, relativePath);
    assert.ok(fs.existsSync(absolute), `missing evidence file ${relativePath}`);
    fileLines.set(relativePath, fs.readFileSync(absolute, "utf8").split(/\r?\n/));
  }
  return fileLines.get(relativePath);
};
const assertLocation = (record, excerptRequired = true) => {
  const lines = linesFor(record.path);
  assert.ok(Number.isInteger(record.line) && record.line >= 1 && record.line <= lines.length, `${record.path}:${record.line} invalid line`);
  if (excerptRequired) assert.ok(record.excerpt && typeof record.excerpt === "string", `${record.path}:${record.line} missing excerpt`);
};

for (const skipped of scan.coverage.skippedLargeFiles) {
  const absolute = path.join(root, skipped.path);
  assert.ok(fs.existsSync(absolute), `missing skipped file ${skipped.path}`);
  assert.ok(fs.statSync(absolute).size > scan.scanConfig.maximumFileBytes, `${skipped.path} should exceed size ceiling`);
}

let exactMentionCount = 0;
for (const record of scan.exactMentionEvidence) {
  assert.ok(groupIds.has(record.groupId), `unknown mention group ${record.groupId}`);
  for (const evidence of record.evidence) {
    exactMentionCount += 1;
    assertLocation(evidence, false);
    assert.ok(evidence.matchedAlias, `${evidence.path}:${evidence.line} missing alias`);
    assert.ok(!scan.scanConfig.excludedPrefixes.some((prefix) => evidence.path.startsWith(prefix)), `${evidence.path} violates exclusion`);
  }
}
assert.equal(exactMentionCount, scan.statistics.exactMentionEvidence);
const mentionEvidenceFor = (groupId, relativePath, line) => scan.exactMentionEvidence
  .find((record) => record.groupId === groupId)?.evidence
  .find((evidence) => evidence.path === relativePath && evidence.line === line);

for (const candidate of scan.relationshipCandidates) {
  assert.ok(!candidateById.has(candidate.id), `duplicate candidate ${candidate.id}`);
  candidateById.set(candidate.id, candidate);
  assertLocation(candidate);
  assert.ok(["high", "medium", "low"].includes(candidate.confidence), `${candidate.id}: confidence`);
  assert.ok(["positive_or_descriptive", "negative_or_qualified"].includes(candidate.polarity), `${candidate.id}: polarity`);
  assert.equal(candidate.status, "candidate_unreviewed");
  assert.ok(candidate.predicates.length > 0, `${candidate.id}: no predicate`);
  for (const resolved of candidate.resolvedGroups) assert.ok(groupIds.has(resolved.groupId), `${candidate.id}: unknown group ${resolved.groupId}`);
}
assert.equal(candidateById.size, scan.statistics.relationshipCandidates);
assert.equal(
  scan.relationshipCandidates.filter((candidate) => candidate.confidence === "high").length,
  scan.statistics.highConfidenceCandidates
);

const finiteSpinAdjacency = scan.relationshipCandidates.find((candidate) => candidate.path === "evidence/data/moonshine-program-lattice-bridge-v1.json" && candidate.line === 126);
assert.ok(finiteSpinAdjacency, "missing finite Spin adjacency regression fixture");
assert.ok(!finiteSpinAdjacency.resolvedGroups.some((entry) => entry.groupId === "grp:C2"), "C2/B2 type must not resolve to the cyclic group C2");
for (const groupId of ["grp:Dic11", "grp:SL2F23", "grp:Sp2F23", "grp:Sp4F23", "grp:Spin5F23"]) {
  assert.ok(finiteSpinAdjacency.resolvedGroups.some((entry) => entry.groupId === groupId), `finite Spin adjacency missing ${groupId}`);
}

const braidCenterQuotient = scan.relationshipCandidates.find((candidate) => candidate.path === "corpus/claims/0000-0099/40_grand_synthesis_spin23_pole.md" && candidate.line === 137);
assert.ok(braidCenterQuotient, "missing B3 center quotient regression fixture");
for (const groupId of ["grp:B3Braid", "grp:PSL2Z"]) {
  assert.ok(braidCenterQuotient.resolvedGroups.some((entry) => entry.groupId === groupId), `braid center quotient missing ${groupId}`);
}
const typeB3FalsePositive = scan.relationshipCandidates.some((candidate) => candidate.resolvedGroups.some((entry) => entry.groupId === "grp:B3Braid")
  && /(?:root\s+system|Dynkin|Weyl|Lie\s+type|type)\s*(?:[^\n]{0,18})B_?3|B_?3(?:[^\n]{0,18})(?:root\s+system|Dynkin|Weyl|Lie\s+type|type)/i.test(candidate.excerpt)
  && !/\bbraid\b/i.test(candidate.excerpt));
assert.equal(typeB3FalsePositive, false, "root/type B3 context must not resolve to the braid group");

const labelledSMCover = scan.relationshipCandidates.find((candidate) => candidate.path === "corpus/claims/0000-0099/02_furey_comprehensive_research_review.md" && candidate.line === 161);
assert.ok(labelledSMCover, "missing labelled Standard Model cover regression fixture");
for (const groupId of ["grp:SMCover", "grp:SU3xSU2", "grp:SU2xU1"]) {
  assert.ok(labelledSMCover.resolvedGroups.some((entry) => entry.groupId === groupId), `labelled Standard Model product missing ${groupId}`);
}
const globalSMQuotient = scan.relationshipCandidates.find((candidate) => candidate.path === "corpus/claims/0400-0499/418_the_faithful_global_group_of_the_puncture_neutral_ternary_stabilizer_has_the_standard_z6_quotient.md" && candidate.line === 110);
assert.ok(globalSMQuotient, "missing global Standard Model quotient regression fixture");
for (const groupId of ["grp:C6", "grp:SMCover", "grp:SU3xSU2", "grp:SU2xU1"]) {
  assert.ok(globalSMQuotient.resolvedGroups.some((entry) => entry.groupId === groupId), `global Standard Model quotient missing ${groupId}`);
}
assert.ok(globalSMQuotient.resolvedGroups.some((entry) => entry.groupId === "grp:C6" && /mathbb/.test(entry.matchedAlias)), "blackboard-bold cyclic kernel must retain its exact matched spelling");

const c9PhysicalQuotient = scan.relationshipCandidates.find((candidate) => candidate.path === "corpus/claims/1100-1199/1181_symplectic_reduction_by_the_gauged_colour_centre_takes_the_z9_lift_from_81_to_9_torus_states_and_descends_the_pairing_to_level_three.md" && candidate.line === 26);
assert.ok(c9PhysicalQuotient, "missing C9/C3 exact quotient regression fixture");
for (const groupId of ["grp:C3", "grp:C9"]) {
  assert.ok(c9PhysicalQuotient.resolvedGroups.some((entry) => entry.groupId === groupId), `C9 quotient fixture missing ${groupId}`);
}
assert.ok(c9PhysicalQuotient.predicates.includes("isomorphism"), "C9/C3 fixture must retain quotient-isomorphism syntax");

const mod2ProjectiveFixture = scan.relationshipCandidates.find((candidate) => candidate.path === "corpus/claims/0100-0199/140_braid_congruence_reductions_and_finite_shadows.md" && candidate.line === 93);
assert.ok(mod2ProjectiveFixture, "missing PSL2F2/S3 projective-line regression fixture");
for (const groupId of ["grp:PSL2F2", "grp:S3"]) {
  assert.ok(mod2ProjectiveFixture.resolvedGroups.some((entry) => entry.groupId === groupId), `mod-two projective fixture missing ${groupId}`);
}
assert.ok(mod2ProjectiveFixture.resolvedGroups.some((entry) => entry.groupId === "grp:S3" && entry.matchedAlias === "S_3"), "algorithm 11 must retain the reviewed TeX short alias");

for (const [line, projectiveId, alternatingId, alternatingAlias] of [
  [97, "grp:PSL2F3", "grp:A4", "A_4"],
  [101, "grp:PSL2F5", "grp:A5", "A_5"]
]) {
  const fixture = scan.relationshipCandidates.find((candidate) => candidate.path === "corpus/claims/0100-0199/140_braid_congruence_reductions_and_finite_shadows.md" && candidate.line === line);
  assert.ok(fixture, `missing odd-prime projective regression fixture at line ${line}`);
  for (const groupId of [projectiveId, alternatingId]) {
    assert.ok(fixture.resolvedGroups.some((entry) => entry.groupId === groupId), `odd-prime projective fixture at line ${line} missing ${groupId}`);
  }
  assert.ok(fixture.resolvedGroups.some((entry) => entry.groupId === alternatingId && entry.matchedAlias === alternatingAlias), `algorithm 11 must retain reviewed TeX alias ${alternatingAlias}`);
}

const quarticProductFixture = scan.relationshipCandidates.find((candidate) => candidate.path === "corpus/claims/0500-0599/526_the_common_intersection_separates_one_qutrit_glue_from_a_quartic_binary_lift.md" && candidate.line === 33);
assert.ok(quarticProductFixture, "missing compact TeX direct-sum regression fixture");
for (const groupId of ["grp:C2", "grp:C4", "grp:C4xC2cubed"]) {
  assert.ok(quarticProductFixture.resolvedGroups.some((entry) => entry.groupId === groupId), `quartic direct-sum fixture missing ${groupId}`);
}
assert.ok(quarticProductFixture.predicates.includes("direct_product"), "algorithm 11 must type TeX oplus as a direct product");

const rankTwoCrtFixture = scan.relationshipCandidates.find((candidate) => candidate.path === "corpus/claims/0500-0599/506_the_cross_prime_phase_module_is_the_discriminant_form_of_a_rank_four_lorentzian_even_lattice.md" && candidate.line === 14);
assert.ok(rankTwoCrtFixture, "missing rank-two CRT regression fixture");
for (const groupId of ["grp:C2", "grp:C3", "grp:V4", "grp:C6xC6"]) {
  assert.ok(rankTwoCrtFixture.resolvedGroups.some((entry) => entry.groupId === groupId), `rank-two CRT fixture missing ${groupId}`);
}
assert.ok(rankTwoCrtFixture.predicates.includes("direct_product"));

const crossPrimePath = "corpus/claims/0500-0599/506_the_cross_prime_phase_module_is_the_discriminant_form_of_a_rank_four_lorentzian_even_lattice.md";
assert.ok(mentionEvidenceFor("grp:C12", crossPrimePath, 54), "the excluded C12^2 state-group candidate must remain visible");
assert.ok(mentionEvidenceFor("grp:C12", crossPrimePath, 70), "the explicit not-C12^2 correction must remain visible");
const valueGroupFixture = scan.relationshipCandidates.find((candidate) => candidate.path === crossPrimePath && candidate.line === 73);
assert.ok(valueGroupFixture, "missing mu4 x mu3 ~= mu12 value-group fixture");
for (const groupId of ["grp:C3", "grp:C4", "grp:C12"]) {
  assert.ok(valueGroupFixture.resolvedGroups.some((entry) => entry.groupId === groupId), `value-group CRT fixture missing ${groupId}`);
}
assert.ok(valueGroupFixture.predicates.includes("direct_product"));
assert.ok(valueGroupFixture.predicates.includes("isomorphism"));

const hadamardPath = "corpus/claims/0500-0599/544_the_common_hadamard_fiber_is_U8_plus_minus2_plus_Uminus18.md";
const hadamardTwoPrimaryFixture = scan.relationshipCandidates.find((candidate) => candidate.path === hadamardPath && candidate.line === 168);
assert.ok(hadamardTwoPrimaryFixture, "missing Hadamard two-primary decomposition fixture");
for (const groupId of ["grp:C2", "grp:C8", "grp:C8xC8", "grp:HadamardDisc2"]) {
  assert.ok(hadamardTwoPrimaryFixture.resolvedGroups.some((entry) => entry.groupId === groupId), `Hadamard two-primary fixture missing ${groupId}`);
}
assert.ok(hadamardTwoPrimaryFixture.predicates.includes("direct_product"));
assert.ok(mentionEvidenceFor("grp:C18", hadamardPath, 160), "Hadamard invariant-factor C18 summand must remain visible");
assert.ok(mentionEvidenceFor("grp:C18xC18", hadamardPath, 160), "Hadamard repeated C18 summand must resolve as C18^2");

const fundamentalGroupPath = "corpus/claims/1700-1799/1755_a_concrete_three_generation_heterotic_e6_quotient_still_leaves_the_axial_normalization_continuous.md";
const c12FundamentalGroupFixture = scan.relationshipCandidates.find((candidate) => candidate.path === fundamentalGroupPath && candidate.line === 86);
assert.ok(c12FundamentalGroupFixture?.resolvedGroups.some((entry) => entry.groupId === "grp:C12"), "C12 fundamental-group role must remain visible");

const gl4IntegralPath = "corpus/claims/0500-0599/532_coordinate_exchange_and_d2_root_exchange_are_conjugate_away_from_two_but_not_integrally.md";
assert.ok(mentionEvidenceFor("grp:GL4Z", gl4IntegralPath, 73), "integral GL(4,Z) conjugacy obstruction must resolve");
const sp4RationalPath = "corpus/claims/0500-0599/543_the_hadamard_transition_is_a_degree_24_rational_symplectic_correspondence_between_index_six_fibers.md";
assert.ok(mentionEvidenceFor("grp:Sp4Q", sp4RationalPath, 231), "rational Sp(4,Q) membership must resolve");
const gl4FinitePath = "corpus/claims/0700-0799/764_pure_d5_weyl_puncture_motion_has_only_identity_or_swap_transport_and_cannot_realize_the_order_three_carrier_color_cycle.md";
const gl4FiniteFixture = scan.relationshipCandidates.find((candidate) => candidate.path === gl4FinitePath && candidate.line === 47);
assert.ok(gl4FiniteFixture?.resolvedGroups.some((entry) => entry.groupId === "grp:GL4F3"), "GL(4,3) ambient conjugacy fixture must resolve");
assert.ok(gl4FiniteFixture?.resolvedGroups.some((entry) => entry.groupId === "grp:Sp4F3"), "Sp(4,3) subgroup fixture must resolve");
assert.ok(gl4FiniteFixture.predicates.includes("conjugacy"), "matrix conjugacy must be typed separately from group isomorphism");
const gl5BinaryPath = "corpus/claims/0500-0599/552_the_standard_model_3_plus_2_flag_plus_additivity_selects_an_ambient_five_bit_form.md";
assert.ok(mentionEvidenceFor("grp:GL5F2", gl5BinaryPath, 80), "GL(5,2) quadratic-form isometry context must resolve");

const documentPaths = new Set();
for (const dependency of scan.documentDependencies) {
  assert.ok(!documentPaths.has(dependency.path), `duplicate document dependency ${dependency.path}`);
  documentPaths.add(dependency.path);
  linesFor(dependency.path);
  for (const groupId of dependency.groupIds) assert.ok(groupIds.has(groupId), `${dependency.path}: unknown group ${groupId}`);
  for (const candidateId of dependency.relationCandidateIds) {
    const candidate = candidateById.get(candidateId);
    assert.ok(candidate, `${dependency.path}: unknown candidate ${candidateId}`);
    assert.equal(candidate.path, dependency.path, `${candidateId}: wrong document dependency`);
  }
}
assert.equal(documentPaths.size, scan.statistics.documentsWithGroupDependencies);

const clusteredEvidence = new Set();
const clusterIds = new Set();
for (const cluster of scan.relationshipClusters) {
  assert.ok(!clusterIds.has(cluster.id), `duplicate cluster ${cluster.id}`);
  clusterIds.add(cluster.id);
  assert.equal(cluster.status, "candidate_cluster_unreviewed");
  for (const groupId of cluster.groupIds) assert.ok(groupIds.has(groupId), `${cluster.id}: unknown group ${groupId}`);
  for (const evidenceId of cluster.evidenceIds) {
    const candidate = candidateById.get(evidenceId);
    assert.ok(candidate, `${cluster.id}: unknown evidence ${evidenceId}`);
    assert.ok(!clusteredEvidence.has(evidenceId), `${evidenceId}: appears in multiple clusters`);
    clusteredEvidence.add(evidenceId);
    assert.deepEqual([...new Set(candidate.resolvedGroups.map((entry) => entry.groupId))].sort(), cluster.groupIds, `${cluster.id}: group signature drift`);
    assert.deepEqual([...candidate.predicates].sort(), cluster.predicates, `${cluster.id}: predicate signature drift`);
    assert.equal(candidate.polarity, cluster.polarity, `${cluster.id}: polarity drift`);
  }
  assert.deepEqual([...new Set(cluster.evidenceIds.map((id) => candidateById.get(id).path))].sort(), cluster.paths, `${cluster.id}: path summary drift`);
  assert.equal(Object.values(cluster.confidenceCounts).reduce((sum, count) => sum + count, 0), cluster.evidenceIds.length, `${cluster.id}: confidence count drift`);
}
assert.equal(clusterIds.size, scan.statistics.relationshipClusters);
assert.equal(clusteredEvidence.size, candidateById.size, "every candidate must belong to exactly one cluster");

for (const unresolved of scan.unresolvedGroupTokens) {
  assert.ok(unresolved.token && unresolved.occurrences >= unresolved.examples.length, `invalid unresolved token ${unresolved.token}`);
  for (const example of unresolved.examples) assertLocation(example);
}
assert.equal(scan.unresolvedGroupTokens.length, scan.statistics.unresolvedTokenKinds);

assert.equal(ambiguityRegister.schema, "mathematical-group-token-ambiguity-register/1");
assert.match(ambiguityRegister.authority, /disambiguation_policy_not_a_mathematical_identification/);
const ambiguityTokens = new Set();
for (const rule of ambiguityRegister.rules) {
  assert.ok(!ambiguityTokens.has(rule.token), `duplicate ambiguity rule ${rule.token}`);
  ambiguityTokens.add(rule.token);
  assert.ok(ambiguityRegister.classificationVocabulary[rule.classification], `${rule.token}: unknown ambiguity classification`);
  assert.ok(rule.reason, `${rule.token}: missing reason`);
  for (const groupId of rule.candidateRefs ?? []) assert.ok(groupIds.has(groupId), `${rule.token}: unknown candidate group ${groupId}`);
  if (rule.canonicalToken) assert.ok(rule.canonicalToken !== rule.token, `${rule.token}: canonical token must differ`);
}
const unresolvedByToken = new Map(scan.unresolvedGroupTokens.map((record) => [record.token, record]));
assert.ok(!unresolvedByToken.has("\\mathbb Z_9"), "blackboard-bold C9 corpus notation must not remain unresolved");
const c9MentionEvidence = scan.exactMentionEvidence.find((record) => record.groupId === "grp:C9");
assert.ok(c9MentionEvidence && c9MentionEvidence.evidence.length >= 200, "C9 should recover the established order-nine corpus seam");
for (const matchedAlias of ["Z9", "\\mathbb Z_9"]) {
  assert.ok(c9MentionEvidence.evidence.some((evidence) => evidence.matchedAlias === matchedAlias), `C9 mention evidence missing ${matchedAlias}`);
}
const shellSymmetryPath = "corpus/claims/0500-0599/556_the_order_72_shell_symmetry_lifts_elementwise_but_the_integral_extension_does_not_split.md";
for (const groupId of ["grp:OPlus4F2", "grp:S3WrC2", "grp:S3xS3"]) {
  const mentionRecord = scan.exactMentionEvidence.find((record) => record.groupId === groupId);
  assert.ok(mentionRecord?.evidence.some((evidence) => evidence.path === shellSymmetryPath), `${groupId}: decorated shell-symmetry notation must resolve in the source claim`);
}
const matchedParityPath = "corpus/claims/0400-0499/495_the_two_adic_closure_has_index_eighty_for_equal_discriminant_five_and_twenty_otherwise.md";
const matchedParityMentions = scan.exactMentionEvidence.find((record) => record.groupId === "grp:MatchedParityS3S3");
assert.ok(matchedParityMentions?.evidence.some((evidence) => evidence.path === matchedParityPath && /times_/.test(evidence.matchedAlias)), "subscripted S3 fiber-product notation must resolve as one typed group");
const flagStabilizerPath = "corpus/claims/0500-0599/553_the_standard_model_flag_is_an_index_six_stabilizer_inside_the_ambient_five_bit_orthogonal_group.md";
const flagStabilizerMentions = scan.exactMentionEvidence.find((record) => record.groupId === "grp:S3xC2");
assert.ok(flagStabilizerMentions?.evidence.some((evidence) => evidence.path === flagStabilizerPath), "S3 times S2 flag-stabilizer notation must resolve as S3 x C2");
const shellOrthogonalMentions = scan.exactMentionEvidence.find((record) => record.groupId === "grp:OPlus4F2");
assert.ok(shellOrthogonalMentions?.evidence.some((evidence) => evidence.path === flagStabilizerPath && evidence.matchedAlias === "O(q_J)"), "the reviewed quadratic-form name O(q_J) must resolve to the typed plus orthogonal group");
const dressedComponentPath = "corpus/claims/1000-1099/1093_the_order_nine_operator_is_a_gauge_dressed_component_of_SU4_times_Z3_and_the_three_family_obstruction_moves_into_mixed_weak_anomalies.md";
const dressedComponentMentions = scan.exactMentionEvidence.find((record) => record.groupId === "grp:H4mu3");
assert.ok(dressedComponentMentions?.evidence.some((evidence) => evidence.path === dressedComponentPath && /SU\(4\).*Z_3/.test(evidence.matchedAlias)), "SU(4) times Z3 notation must resolve to the typed determinant-mu3 subgroup");
const a5GatePath = "corpus/claims/1200-1299/1229_conjugate_z3_sectors_are_degenerate_for_same_parity_probes_but_an_oriented_odd_probe_separates_them_without_solving_a5.md";
assert.ok(!scan.relationshipCandidates.some((candidate) => candidate.path === a5GatePath && candidate.resolvedGroups.some((group) => group.groupId === "grp:A5")), "programme gate A5 must not be promoted to the alternating group");
const a5GroupPath = "corpus/claims/0100-0199/140_braid_congruence_reductions_and_finite_shadows.md";
const a5GroupMentions = scan.exactMentionEvidence.find((record) => record.groupId === "grp:A5");
assert.ok(a5GroupMentions?.evidence.some((evidence) => evidence.path === a5GroupPath), "genuine alternating-group A5 notation must remain resolvable");
for (const record of scan.classifiedUnresolvedTokens) {
  assert.ok(unresolvedByToken.has(record.token), `${record.token}: classified token is not unresolved`);
  assert.ok(ambiguityTokens.has(record.token), `${record.token}: classified token lacks a rule`);
  assert.equal(record.occurrences, unresolvedByToken.get(record.token).occurrences, `${record.token}: occurrence drift`);
}
for (const coordinateToken of ["Z_1", "Z_1}"]) {
  const classified = scan.classifiedUnresolvedTokens.find((record) => record.token === coordinateToken);
  assert.ok(classified, `${coordinateToken}: expected reviewed coordinate ambiguity`);
  assert.ok(["overloaded_label", "encoding_variant"].includes(classified.classification), `${coordinateToken}: wrong coordinate ambiguity class`);
}
for (const record of scan.unclassifiedGroupTokens) {
  assert.ok(unresolvedByToken.has(record.token), `${record.token}: unclassified token is not unresolved`);
  assert.ok(!ambiguityTokens.has(record.token), `${record.token}: unclassified token has a rule`);
}
assert.equal(scan.classifiedUnresolvedTokens.length, scan.statistics.classifiedAmbiguityKinds);
assert.equal(scan.unclassifiedGroupTokens.length, scan.statistics.unclassifiedTokenKinds);
assert.equal(scan.classifiedUnresolvedTokens.reduce((sum, record) => sum + record.occurrences, 0), scan.statistics.classifiedAmbiguityOccurrences);
assert.equal(scan.unclassifiedGroupTokens.reduce((sum, record) => sum + record.occurrences, 0), scan.statistics.unclassifiedTokenOccurrences);
assert.equal(scan.classifiedUnresolvedTokens.length + scan.unclassifiedGroupTokens.length, scan.unresolvedGroupTokens.length, "ambiguity partition mismatch");
assert.deepEqual(
  Object.fromEntries([...new Set(scan.classifiedUnresolvedTokens.map((record) => record.classification))].sort()
    .map((classification) => [classification, scan.classifiedUnresolvedTokens.filter((record) => record.classification === classification).length])),
  scan.statistics.ambiguityClassificationCounts,
  "ambiguity classification summary drift"
);

console.log(
  `Mathematical group corpus scan: PASS files=${scan.coverage.filesScanned}; mentions=${exactMentionCount}; ` +
  `candidates=${candidateById.size}; clusters=${clusterIds.size}; unresolved=${scan.unresolvedGroupTokens.length}; ` +
  `classified=${scan.classifiedUnresolvedTokens.length}; unclassified=${scan.unclassifiedGroupTokens.length}; ` +
  `coverageGaps=${scan.coverage.skippedLargeFiles.length}`
);
