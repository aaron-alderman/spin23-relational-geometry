import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const write = process.argv.includes("--write");
const corpusRoot = path.join(root, "corpus");
const outputJson = "corpus/programmes/frontier-physics-targets/transition_operator_propagation_audit_v1.json";
const outputMd = "corpus/programmes/frontier-physics-targets/transition_operator_propagation_audit_v1.md";
const reference = "corpus/programmes/admissibility/admissibility_127_transition_operators_selection_rules_and_lifetime_frontier.md";

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

const reviewed = [
  ["corpus/EXPLANATORY_STANDARD.md", "governing_rule", "The eight-field ledger is a publication rule and separates operator bottlenecks from effective widths and barrier escape."],
  [reference, "complete_reference_bridge", "Established atomic/nuclear bridge, rate architecture and three-gate ion experiment."],
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
  ["corpus/syntheses/the_admissibility_frontier_current_synthesis.md", "synthesis_bridge", "The current synthesis routes transition claims to the established bridge."]
].map(([documentPath, disposition, reason]) => {
  const record = census.find(item => item.path === documentPath);
  if (!record) throw new Error(`Missing reviewed document: ${documentPath}`);
  return { path: documentPath, disposition, reason, referencesAZ127: record.referencesAZ127, digest: record.digest };
});

const counts = census.reduce((acc, record) => {
  acc[record.route] = (acc[record.route] ?? 0) + 1;
  return acc;
}, {});
const candidates = census.filter(record => record.route !== "no_transition_operator_trigger");
const nonRateOperatorUsages = census
  .filter(record => record.route === "operator_rate_claim_candidate" && !record.hasRateContext && !reviewed.some(item => item.path === record.path))
  .map(record => record.path);
const unreviewedOperatorCandidates = census
  .filter(record => record.route === "operator_rate_claim_candidate" && record.hasRateContext && !record.referencesAZ127 && !reviewed.some(item => item.path === record.path))
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
  openWork: {
    statement: "The standard and authoritative frontier spine are propagated. Remaining operator-rate candidates require semantic triage; bulk insertion of atomic terminology is forbidden.",
    unreviewedOperatorCandidates
  },
  census
};

const md = `# Transition-operator propagation audit v1

**Date:** 26 October 2026
**Status:** governing rule and authoritative frontier spine propagated; semantic triage remains open
**Machine authority:** [JSON audit](transition_operator_propagation_audit_v1.json)
**Reference bridge:** [AZ-127](../admissibility/admissibility_127_transition_operators_selection_rules_and_lifetime_frontier.md)

## Result

The audit scans **${output.totals.markdownDocumentsScanned}** Markdown documents and routes **${output.totals.candidateDocuments}** for possible transition, spectral or metastability relevance. **${reviewed.length}** authoritative documents have an explicit reviewed disposition, **${linkedContextualCandidates.length}** additional operator/rate candidates carry the AZ-127 boundary in context, and **${nonRateOperatorUsages.length}** are excluded because their full document contains no decay/capture/lifetime/width context. **${unreviewedOperatorCandidates.length}** rate-context candidates remain for semantic triage.

This is intentionally not a global search-and-replace. “Radiative stability,” a graph transition, a resonance pole, detector lag and an atomic decay do not name the same thing. The audit makes that difference visible and keeps the unresolved set enumerable.

## The rule now carried by the corpus

A lower-energy or otherwise available final state is only a possible destination. A physical rate additionally requires a typed interaction operator, a nonzero matrix element, phase space and competing-channel accounting. A measured record further requires separation of population decay from dephasing/environmental width, angular or polarization acceptance, detector response and an observation window.

Barrier escape and hysteresis use a different mechanism ledger. Effective pole or resonator calculations may remain effective, but must not be promoted to microscopic lifetimes without the missing operator-level data.

## Reviewed propagation spine

| Document | Disposition | Reason |
|---|---|---|
${reviewed.map(record => `| \`${record.path}\` | \`${record.disposition}\` | ${record.reason} |`).join("\n")}

## Open work

The remaining list is a review queue, not a defect count. Many hits are expected exclusions or use “transition” in another domain. Each must receive one of four human dispositions: eight-field operator ledger; effective-spectral boundary; barrier/kinetic boundary; or nonphysical/metaphorical exclusion. The full path list and content digests are in the JSON audit so completion cannot be declared by prose alone.

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
