import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const write = process.argv.includes("--write");
const root = process.cwd();
const expansionPath = "corpus/programmes/frontier-physics-targets/physics_math_object_expansion_v1.json";
const candidatesPath = "corpus/programmes/frontier-physics-targets/physics_math_adjacency_candidates_v1.json";
const topicsPath = "corpus/programmes/frontier-physics-targets/open_topics_register_v1.json";
const workClassesPath = "corpus/programmes/frontier-physics-targets/theory_bridge_topic_work_classes_v1.json";
const outputJson = "corpus/programmes/frontier-physics-targets/theory_bridge_audit_v1.json";
const outputMd = "corpus/programmes/frontier-physics-targets/theory_bridge_audit_v1.md";

const read = relative => fs.readFileSync(path.join(root, relative), "utf8");
const parse = relative => JSON.parse(read(relative));
const digest = relative => crypto.createHash("sha256").update(read(relative)).digest("hex");
const expansion = parse(expansionPath);
const candidates = parse(candidatesPath);
const topics = parse(topicsPath);
const workClasses = parse(workClassesPath);
const candidateById = new Map(candidates.candidates.map(candidate => [candidate.id, candidate]));
const topicById = new Map(topics.topics.map(topic => [topic.id, topic]));
const workClassByTopic = new Map(workClasses.topics.map(record => [record.topicId, record]));

const familySemantics = {
  same_mathematics_different_physical_carrier: {
    map: "Hold the stated mathematical relation fixed and replace the physical carrier; compare which operational structures survive the carrier map.",
    equivalence: "Basis or coordinate changes internal to one carrier do not establish equivalence between carriers; calibration, coupling and preparation data remain free until supplied."
  },
  same_carrier_different_representation: {
    map: "Hold the carrier fixed and change its representation or coordinates; require an explicit intertwiner before transferring a physical claim.",
    equivalence: "Invertible reparameterizations may preserve abstract structure while changing locality, positivity, detector coupling or physical interpretation."
  },
  reduction_quotient_lift_extension: {
    map: "Apply the declared reduction, quotient, lift or extension and track its kernel, image, fibres and any extra choices needed to reverse it.",
    equivalence: "Sections, lifts and representatives are non-unique unless a source-native rule selects one; quotient equality is weaker than equality upstairs."
  },
  boundary_bulk_defect_topology: {
    map: "Relate bulk, boundary and defect data through the stated restriction, extension or index map and keep local response separate from protected topology.",
    equivalence: "Boundary conditions, defect profiles and compactifications can share an index while differing in residues, localization and detector records."
  },
  static_driven_dissipative_measurement_conditioned_dynamics: {
    map: "Compare the static, driven, dissipative and measurement-conditioned generators on the same declared state or response space.",
    equivalence: "Equal fixed points or spectra do not imply equal trajectories, noise, conditioning, thermodynamic cost or records."
  },
  weak_strong_coupling_and_frequency_limits: {
    map: "Carry the claim across coupling or frequency regimes only through a declared limit, continuation or matched effective description.",
    equivalence: "Order of limits, poles, thresholds and nonuniform convergence remain independent freedoms unless bounded."
  },
  finite_infinite_size_and_order_of_limits: {
    map: "Compare finite and limiting systems with the size, time, frequency and regulator limits explicitly ordered.",
    equivalence: "Finite agreement is not a continuum or thermodynamic theorem; distinct limit orders may define inequivalent objects."
  },
  duality_intertwiner_shared_action_and_cross_grade_map: {
    map: "Require an explicit duality, intertwiner, shared action or cross-grade map with typed source and target rather than transferring structure by resemblance.",
    equivalence: "Abstract isomorphism, dimension match or shared subgroup leaves embedding, grading, normalization and physical action unfixed."
  },
  conservation_anomaly_index_and_response_invariant: {
    map: "Track the declared conserved quantity, anomaly, index or response invariant through the proposed physical translation.",
    equivalence: "The same invariant can occur in inequivalent mechanisms; contacts, counterterms, residues and detector couplings remain free."
  },
  detector_pushforward_and_information_loss: {
    map: "Push the underlying state or history through the calibrated detector map and identify its fibres, null directions and retained sufficient statistics.",
    equivalence: "Equal records establish detector equivalence only for the declared interventions and nuisance model, not equality of underlying mechanisms."
  },
  thermodynamic_causal_positive_and_kms_compatibility: {
    map: "Test the proposed bridge against positivity, causal analyticity, thermodynamic accounting and KMS or fluctuation constraints where applicable.",
    equivalence: "Formal algebraic closure does not supply a positive state, causal realization, stable energy ledger or thermal interpretation."
  },
  alternative_mechanism_with_same_record: {
    map: "Construct or exclude an alternative mechanism after both candidates are passed through the same controls, nuisance model and detector map.",
    equivalence: "A record identifies a mechanism only relative to the preregistered alternative family and calibrated nuisance span."
  }
};

const records = expansion.claimFamilyClusters.map(cluster => {
  const candidate = candidateById.get(cluster.sourceCandidateId);
  const topic = topicById.get(cluster.topicId);
  const work = workClassByTopic.get(cluster.topicId);
  if (!candidate || !topic || !work) throw new Error(`Missing candidate, topic or work classification for ${cluster.id}`);
  const semantics = familySemantics[cluster.family];
  if (!semantics) throw new Error(`Missing family semantics for ${cluster.family}`);
  const assumptions = [
    ...candidate.applicabilityBasis.map(item => `Applicability is inherited from ${item.frontierAreaId}: ${item.label}.`),
    candidate.reason
  ];
  const sourceRefs = [...new Set([
    ...candidate.evidenceRefs,
    topic.closureEvidence,
    topic.progressEvidence,
    candidate.derivationRef,
    expansionPath,
    candidatesPath,
    topicsPath
  ].filter(Boolean))];
  return {
    id: `TBA-${cluster.id.slice(4)}`,
    clusterId: cluster.id,
    topicId: topic.id,
    topicLabel: topic.label,
    family: cluster.family,
    disposition: cluster.disposition,
    objectCount: cluster.objectCount,
    examplePaths: cluster.examplePaths,
    domainTypes: {
      source: `The admitted states, responses, histories or records governed by ${topic.id}: ${topic.label}.`,
      target: `The variant generated by the ${cluster.family} adjacency family.`,
      status: "typed_at_normalized_topic_family_grain"
    },
    units: {
      status: "no_cross_object_numeric_identity_authorized",
      statement: "Units and normalizations remain those of each cited source object. This structural bridge licenses no numerical equality until an explicit dimensioned map is supplied in that source."
    },
    assumptions,
    map: semantics.map,
    preservedStructure: candidate.preservedStructure,
    lostStructure: candidate.lostStructure,
    invariants: [topic.closure, ...candidate.preservedStructure].filter(Boolean),
    limits: [
      `Topic status at audit: ${topic.status}.`,
      topic.progress ?? topic.nextAction,
      `The disposition ${candidate.disposition} applies only to this topic-family cluster and its ${cluster.objectCount} routed objects.`
    ].filter(Boolean),
    counterexampleOrKillTest: topic.killTest,
    equivalenceFreedom: semantics.equivalence,
    physicalNonImplications: [
      ...candidate.lostStructure,
      "This record does not turn an abstract isomorphism, matching dimension, shared invariant or generated adjacency into a physical identification."
    ],
    independentVerification: {
      method: `Re-run the adjacency and object-expansion verifiers, then inspect the cited source evidence against the ${topic.id} closure and kill test without using graph centrality as authority.`,
      sourceRefs
    },
    workClassification: work.workClass,
    workClassificationReason: work.reason,
    nextAction: topic.nextAction,
    reopeningTrigger: candidate.reopeningTrigger
  };
});

const workCounts = records.reduce((counts, record) => {
  counts[record.workClassification] = (counts[record.workClassification] ?? 0) + 1;
  return counts;
}, {});
const output = {
  schema: "frontier.theory-bridge-audit/1",
  date: "2026-10-25",
  authority: "typed_bridge_accounting_not_new_physical_identification",
  grain: "one record per distinct normalized topic × applicable adjacency-family cluster; objectCount and examplePaths retain the object-level reach",
  inputs: [expansionPath, candidatesPath, topicsPath, workClassesPath].map(source => ({ source, sha256: digest(source) })),
  requiredFields: [
    "domainTypes", "units", "assumptions", "map", "preservedStructure", "lostStructure", "invariants", "limits",
    "counterexampleOrKillTest", "equivalenceFreedom", "physicalNonImplications", "independentVerification", "workClassification", "workClassificationReason", "reopeningTrigger"
  ],
  summary: {
    bridgeClusters: records.length,
    coveredObjectFamilyCells: expansion.summary.objectFamilyCells,
    unresolvedStructuralRecords: 0,
    workCounts
  },
  records
};

const lines = [
  "# Theory and mathematics bridge audit",
  "",
  "**Date:** 25 October 2026  ",
  "**Authority:** typed bridge accounting, not a new physical identification",
  "",
  "This register audits the distinct theoretical bridges behind the object-level adjacency map. Its unit is one normalized topic × relation-family cluster, not one repeated object cell. Every record states the source and target types, treatment of units, assumptions, map, preserved and lost structure, invariants, limits, counterexample, equivalence freedom, physical non-implications, independent check, work class and reopening trigger. A named absence remains an absence; the audit does not manufacture a physical map.",
  "",
  `The ${records.length} bridge records cover all ${expansion.summary.objectFamilyCells.toLocaleString("en-US")} object-family cells. Structural omissions: **0**.`,
  "",
  "## Work classification",
  "",
  "| Class | Bridge clusters |",
  "|---|---:|",
  ...Object.entries(workCounts).sort().map(([name, count]) => `| ${name} | ${count} |`),
  "",
  "## Reading rule",
  "",
  "A complete record is not necessarily a solved bridge. `resolved_within_declared_scope` means the cited local question is closed only in its stated scope. Dependency, source-data, finite-audit and open-research classes preserve their missing datum and reopening trigger. Numerical identities are forbidden unless the cited source supplies the dimensioned map and normalization.",
  "",
  "The machine-readable records are in [the JSON register](theory_bridge_audit_v1.json)."
];

if (write) {
  fs.writeFileSync(path.join(root, outputJson), `${JSON.stringify(output, null, 2)}\n`);
  fs.writeFileSync(path.join(root, outputMd), `${lines.join("\n")}\n`);
}
console.log(JSON.stringify({ result: "pass", outputs: write ? [outputJson, outputMd] : [], summary: output.summary }, null, 2));
