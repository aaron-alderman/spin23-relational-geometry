import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const lane = "corpus/programmes/frontier-physics-targets";
const criteriaPath = `${lane}/corpus_completion_exit_criteria_v1.json`;
const topicsPath = `${lane}/open_topics_register_v1.json`;
const detectorPath = `${lane}/detector_frontier_register_v1.json`;
const outputPath = `${lane}/physics_math_adjacency_candidates_v1.json`;
const markdownPath = `${lane}/physics_math_adjacency_candidates_v1.md`;
const terminalPath = `${lane}/terminal_neighbourhood_candidates_v1.json`;
const crosswalkPath = `${lane}/adjacency_terminal_review_crosswalk_v1.json`;
const read = rel => JSON.parse(fs.readFileSync(path.join(root, rel), "utf8"));

const criteria = read(criteriaPath);
const topics = read(topicsPath);
const detectors = read(detectorPath);
const terminal = read(terminalPath);
const crosswalk = read(crosswalkPath);
const terminalReviews = new Map(terminal.candidates.filter(candidate => candidate.workflowStatus === "reviewed").map(candidate => [candidate.id, candidate]));
const existing = fs.existsSync(path.join(root, outputPath)) ? read(outputPath) : null;
const existingCandidates = new Map((existing?.candidates ?? []).map(candidate => [candidate.id, candidate]));

const areaFamilies = {
  "FA-01": ["same_carrier_different_representation", "reduction_quotient_lift_extension", "duality_intertwiner_shared_action_and_cross_grade_map", "alternative_mechanism_with_same_record"],
  "FA-02": ["same_mathematics_different_physical_carrier", "same_carrier_different_representation", "reduction_quotient_lift_extension", "detector_pushforward_and_information_loss", "alternative_mechanism_with_same_record"],
  "FA-03": ["same_mathematics_different_physical_carrier", "same_carrier_different_representation", "reduction_quotient_lift_extension", "detector_pushforward_and_information_loss", "alternative_mechanism_with_same_record"],
  "FA-04": ["same_mathematics_different_physical_carrier", "same_carrier_different_representation", "weak_strong_coupling_and_frequency_limits", "finite_infinite_size_and_order_of_limits", "conservation_anomaly_index_and_response_invariant", "detector_pushforward_and_information_loss", "thermodynamic_causal_positive_and_kms_compatibility", "alternative_mechanism_with_same_record"],
  "FA-05": ["same_mathematics_different_physical_carrier", "same_carrier_different_representation", "reduction_quotient_lift_extension", "boundary_bulk_defect_topology", "duality_intertwiner_shared_action_and_cross_grade_map", "conservation_anomaly_index_and_response_invariant", "detector_pushforward_and_information_loss", "alternative_mechanism_with_same_record"],
  "FA-06": ["same_mathematics_different_physical_carrier", "same_carrier_different_representation", "boundary_bulk_defect_topology", "static_driven_dissipative_measurement_conditioned_dynamics", "weak_strong_coupling_and_frequency_limits", "duality_intertwiner_shared_action_and_cross_grade_map", "detector_pushforward_and_information_loss", "alternative_mechanism_with_same_record"],
  "FA-07": ["same_mathematics_different_physical_carrier", "static_driven_dissipative_measurement_conditioned_dynamics", "weak_strong_coupling_and_frequency_limits", "finite_infinite_size_and_order_of_limits", "detector_pushforward_and_information_loss", "thermodynamic_causal_positive_and_kms_compatibility", "alternative_mechanism_with_same_record"],
  "FA-08": ["same_carrier_different_representation", "static_driven_dissipative_measurement_conditioned_dynamics", "detector_pushforward_and_information_loss", "thermodynamic_causal_positive_and_kms_compatibility", "alternative_mechanism_with_same_record"],
  "FA-09": ["static_driven_dissipative_measurement_conditioned_dynamics", "weak_strong_coupling_and_frequency_limits", "finite_infinite_size_and_order_of_limits", "detector_pushforward_and_information_loss", "thermodynamic_causal_positive_and_kms_compatibility", "alternative_mechanism_with_same_record"],
  "FA-10": ["same_mathematics_different_physical_carrier", "static_driven_dissipative_measurement_conditioned_dynamics", "weak_strong_coupling_and_frequency_limits", "finite_infinite_size_and_order_of_limits", "conservation_anomaly_index_and_response_invariant", "detector_pushforward_and_information_loss", "thermodynamic_causal_positive_and_kms_compatibility", "alternative_mechanism_with_same_record"],
  "FA-11": ["same_mathematics_different_physical_carrier", "same_carrier_different_representation", "boundary_bulk_defect_topology", "static_driven_dissipative_measurement_conditioned_dynamics", "weak_strong_coupling_and_frequency_limits", "finite_infinite_size_and_order_of_limits", "conservation_anomaly_index_and_response_invariant", "detector_pushforward_and_information_loss", "thermodynamic_causal_positive_and_kms_compatibility", "alternative_mechanism_with_same_record"],
  "FA-12": ["same_mathematics_different_physical_carrier", "same_carrier_different_representation", "boundary_bulk_defect_topology", "weak_strong_coupling_and_frequency_limits", "finite_infinite_size_and_order_of_limits", "conservation_anomaly_index_and_response_invariant", "detector_pushforward_and_information_loss", "thermodynamic_causal_positive_and_kms_compatibility", "alternative_mechanism_with_same_record"],
  "FA-13": ["same_mathematics_different_physical_carrier", "same_carrier_different_representation", "static_driven_dissipative_measurement_conditioned_dynamics", "weak_strong_coupling_and_frequency_limits", "finite_infinite_size_and_order_of_limits", "conservation_anomaly_index_and_response_invariant", "detector_pushforward_and_information_loss", "thermodynamic_causal_positive_and_kms_compatibility", "alternative_mechanism_with_same_record"],
  "FA-14": ["same_mathematics_different_physical_carrier", "same_carrier_different_representation", "reduction_quotient_lift_extension", "boundary_bulk_defect_topology", "static_driven_dissipative_measurement_conditioned_dynamics", "duality_intertwiner_shared_action_and_cross_grade_map", "conservation_anomaly_index_and_response_invariant", "detector_pushforward_and_information_loss", "alternative_mechanism_with_same_record"],
  "FA-15": ["same_mathematics_different_physical_carrier", "static_driven_dissipative_measurement_conditioned_dynamics", "weak_strong_coupling_and_frequency_limits", "finite_infinite_size_and_order_of_limits", "detector_pushforward_and_information_loss", "thermodynamic_causal_positive_and_kms_compatibility", "alternative_mechanism_with_same_record"],
  "FA-16": ["same_mathematics_different_physical_carrier", "same_carrier_different_representation", "reduction_quotient_lift_extension", "boundary_bulk_defect_topology", "finite_infinite_size_and_order_of_limits", "duality_intertwiner_shared_action_and_cross_grade_map", "conservation_anomaly_index_and_response_invariant", "detector_pushforward_and_information_loss", "alternative_mechanism_with_same_record"],
  "FA-17": ["same_mathematics_different_physical_carrier", "same_carrier_different_representation", "reduction_quotient_lift_extension", "boundary_bulk_defect_topology", "static_driven_dissipative_measurement_conditioned_dynamics", "duality_intertwiner_shared_action_and_cross_grade_map", "conservation_anomaly_index_and_response_invariant", "detector_pushforward_and_information_loss", "thermodynamic_causal_positive_and_kms_compatibility", "alternative_mechanism_with_same_record"],
  "FA-18": ["same_mathematics_different_physical_carrier", "same_carrier_different_representation", "boundary_bulk_defect_topology", "static_driven_dissipative_measurement_conditioned_dynamics", "weak_strong_coupling_and_frequency_limits", "finite_infinite_size_and_order_of_limits", "conservation_anomaly_index_and_response_invariant", "detector_pushforward_and_information_loss", "thermodynamic_causal_positive_and_kms_compatibility", "alternative_mechanism_with_same_record"],
  "FA-19": ["same_mathematics_different_physical_carrier", "same_carrier_different_representation", "reduction_quotient_lift_extension", "boundary_bulk_defect_topology", "static_driven_dissipative_measurement_conditioned_dynamics", "weak_strong_coupling_and_frequency_limits", "finite_infinite_size_and_order_of_limits", "duality_intertwiner_shared_action_and_cross_grade_map", "conservation_anomaly_index_and_response_invariant", "detector_pushforward_and_information_loss", "thermodynamic_causal_positive_and_kms_compatibility", "alternative_mechanism_with_same_record"],
  "FA-20": [...criteria.requiredAdjacencyFamilies]
};

const familyOrder = new Map(criteria.requiredAdjacencyFamilies.map((family, index) => [family, index]));
const areaLabels = new Map(detectors.frontierAreas.map(area => [area.id, area.label]));
const candidates = [];
for (const topic of topics.topics) {
  const applicable = [...new Set(topic.frontierAreaIds.flatMap(area => areaFamilies[area] ?? []))]
    .sort((a, b) => familyOrder.get(a) - familyOrder.get(b));
  for (const family of applicable) {
    const basisAreas = topic.frontierAreaIds.filter(area => areaFamilies[area]?.includes(family));
    const id = `${topic.id}:${family}`;
    const previous = existingCandidates.get(id);
    const mappedMove = crosswalk.familyToMove[family];
    const terminalReview = terminalReviews.get(`${topic.id}:${mappedMove}`);
    const derivedDisposition = terminalReview ? crosswalk.resultToDisposition[terminalReview.result] : null;
    candidates.push({
      id,
      topicId: topic.id,
      topicLabel: topic.label,
      topicStatusAtGeneration: topic.status,
      targetIds: topic.targetIds,
      frontierAreaIds: topic.frontierAreaIds,
      family,
      applicabilityBasis: basisAreas.map(area => ({ frontierAreaId: area, label: areaLabels.get(area) })),
      workflowStatus: derivedDisposition ? "dispositioned" : previous?.workflowStatus ?? "unreviewed",
      disposition: derivedDisposition ?? previous?.disposition ?? null,
      evidenceRefs: terminalReview?.evidenceRefs ?? previous?.evidenceRefs ?? [],
      reason: terminalReview ? `${terminalReview.finding} This EXIT-01 disposition is derived through the declared ${family} -> ${mappedMove} crosswalk.` : previous?.reason ?? null,
      preservedStructure: terminalReview ? crosswalk.preservedStructure : previous?.preservedStructure ?? [],
      lostStructure: terminalReview ? crosswalk.lostStructure : previous?.lostStructure ?? [],
      implications: terminalReview ? terminalReview.inheritedConsequences : previous?.implications ?? [],
      reopeningTrigger: terminalReview?.minimalReopeningDatum ?? previous?.reopeningTrigger ?? null,
      reviewer: terminalReview?.reviewer ?? previous?.reviewer ?? null,
      derivationRef: terminalReview ? crosswalkPath : previous?.derivationRef ?? null,
      sourceReviewId: terminalReview?.id ?? previous?.sourceReviewId ?? null
    });
  }
}

const dispositioned = candidates.filter(candidate => candidate.workflowStatus === "dispositioned").length;
const byFamily = Object.fromEntries(criteria.requiredAdjacencyFamilies.map(family => [family, candidates.filter(candidate => candidate.family === family).length]));
const byTopicStatus = Object.fromEntries(topics.statuses.map(status => [status, candidates.filter(candidate => candidate.topicStatusAtGeneration === status).length]));
const output = {
  schema: "frontier.physics-math-adjacency-candidates/1",
  date: new Date().toISOString().slice(0, 10),
  authority: "First normalized topic-level candidate universe for EXIT-01. It generates questions, not scientific relationships; no candidate is admitted until reviewed and dispositioned with evidence.",
  scope: "All maintained open-topic records crossed with every adjacency family declared applicable to any of their frontier areas. Claim-family and object-level expansion remains a later EXIT-01 layer.",
  criteriaRef: criteriaPath,
  sourceRefs: [topicsPath, detectorPath, terminalPath, crosswalkPath],
  workflowStatuses: ["unreviewed", "in_review", "dispositioned", "challenged"],
  allowedDispositions: criteria.requiredAdjacencyDispositions,
  areaFamilyMatrix: Object.fromEntries(Object.entries(areaFamilies).map(([area, families]) => [area, { label: areaLabels.get(area), families }])),
  summary: {
    topics: topics.topics.length,
    frontierAreas: detectors.frontierAreas.length,
    adjacencyFamilies: criteria.requiredAdjacencyFamilies.length,
    candidates: candidates.length,
    dispositioned,
    unreviewed: candidates.length - dispositioned,
    byFamily,
    byTopicStatus,
    exit01Passed: dispositioned === candidates.length && candidates.length > 0
  },
  candidates
};

const markdown = `# Physics–mathematics adjacency candidates v1\n\n` +
  `**Generated:** ${output.date}\n\n**Status:** topic-level candidate universe generated; ${output.summary.unreviewed} candidates remain unreviewed\n\n**Machine authority:** [adjacency candidate register](physics_math_adjacency_candidates_v1.json)\n\n` +
  `This is the first finite search universe under [EXIT-01](corpus_completion_exit_criteria_v1.md). It crosses all ${output.summary.topics} maintained topics with every adjacency family applicable to their ${output.summary.frontierAreas} frontier areas, producing **${output.summary.candidates} candidate questions**. Generation is not evidence of a relationship. Every candidate begins unreviewed and must acquire one allowed disposition, exact evidence, a reason, preserved and lost structure, implications and a reopening trigger.\n\n` +
  `## Candidate counts by relation family\n\n| Family | Candidates |\n|---|---:|\n${Object.entries(byFamily).map(([family, count]) => `| ${family.replaceAll("_", " ")} | ${count} |`).join("\n")}\n\n` +
  `## Completion boundary\n\nEXIT-01 cannot pass when a candidate is unreviewed, multiply classified, unsupported, or missing consequence and reopening data. Topic-level completion will still not be whole-corpus completion: authoritative claim families and newly discovered physical or mathematical objects must then be expanded and deduplicated against this normalized layer.\n\n` +
  `## Reproduction\n\n~~~powershell\nnode scripts/generate-physics-math-adjacency-candidates.mjs --write\nnode verification/frontier-physics-targets/verify_physics_math_adjacency_candidates.mjs\n~~~\n`;

if (!process.argv.includes("--write")) {
  console.log(JSON.stringify(output.summary, null, 2));
  process.exit(0);
}
fs.writeFileSync(path.join(root, outputPath), `${JSON.stringify(output, null, 2)}\n`);
fs.writeFileSync(path.join(root, markdownPath), markdown);
console.log(JSON.stringify({ result: "pass", outputs: [outputPath, markdownPath], summary: output.summary }, null, 2));
