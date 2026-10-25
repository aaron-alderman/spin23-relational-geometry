#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { searchCorpus } from "./search_corpus.mjs";

// These paraphrases deliberately avoid copying source titles verbatim. The first
// group is a calibration set; the second is a holdout set. A single expected
// source makes the metrics easy to audit, but does not assert that other sources
// are irrelevant or that the expected source is true.
export const benchmarkCases = [
  {
    split: "calibration",
    id: "relaxation-open-quantum-boundary",
    profile: "audit",
    query: "After a classical stationary noise completion of causal relaxation, which quantum equilibrium requirement is still unresolved?",
    expectedSource: "corpus/programmes/admissibility/admissibility_104_relaxation_auxiliary_gaussian_kms_completion.md",
  },
  {
    split: "calibration",
    id: "defect-continuous-information",
    profile: "audit",
    query: "Can a small chiral imperfection carry continuously varying protected information in addition to an integer orientation count?",
    expectedSource: "corpus/programmes/admissibility/admissibility_105_fixed_index_defect_information_no_go.md",
  },
  {
    split: "calibration",
    id: "detector-local-global",
    profile: "audit",
    query: "Why are measurements that distinguish every nearby perturbation insufficient to reconstruct the state everywhere?",
    expectedSource: "corpus/programmes/admissibility/admissibility_107_global_nonlinear_detector_injectivity.md",
  },
  {
    split: "calibration",
    id: "shared-symmetry-selector",
    profile: "audit",
    query: "If several observables transform under the same square symmetry, what prevents symmetry alone from naming one of them?",
    expectedSource: "corpus/programmes/admissibility/admissibility_108_d4_shared_action_operator_boundary.md",
  },
  {
    split: "calibration",
    id: "single-action-bench-record",
    profile: "experiment",
    query: "What construction produces the complete four-channel laboratory record while leaving calibration and realization checks open?",
    expectedSource: "corpus/programmes/admissibility/admissibility_109_four_mode_sk_action_to_record.md",
  },
  {
    split: "calibration",
    id: "quotient-order-selection",
    profile: "audit",
    query: "Once relations define the Jordan quotient, does that algebraic face determine which elements count as positive?",
    expectedSource: "corpus/programmes/admissibility/admissibility_111_relation_quotient_jordan_face_and_positive_order_boundary.md",
  },
  {
    split: "holdout",
    id: "alp-missing-control",
    profile: "experiment",
    query: "Which independent experimental source is absent when a public axion-like implementation exposes only two adjustable inputs?",
    expectedSource: "corpus/programmes/admissibility/admissibility_113_the_public_alp_ufo_is_a_two_control_slice_not_the_three_source_test.md",
  },
  {
    split: "holdout",
    id: "phase-referenced-extra-coordinate",
    profile: "experiment",
    query: "What is the smallest additional readout that reveals the hidden final degree of freedom, and what reference must accompany it?",
    expectedSource: "corpus/programmes/admissibility/admissibility_116_the_minimal_second_gauge_detector_needs_a_phase_reference.md",
  },
  {
    split: "holdout",
    id: "resonant-sign-recovery",
    profile: "experiment",
    query: "Which antisymmetric frequency statistic can recover an otherwise invisible polarity in the active measurement design?",
    expectedSource: "corpus/programmes/admissibility/admissibility_117_an_odd_resonance_moment_can_supply_the_missing_sign.md",
  },
  {
    split: "holdout",
    id: "navigation-not-truth",
    profile: "interpret",
    query: "How can stationary graph centrality guide attention while a concentration tradeoff stops that ranking from becoming an epistemic verdict?",
    expectedSource: "corpus/programmes/frontier-physics-targets/page_rank_perron_selector_bridge_v1.md",
  },
  {
    split: "holdout",
    id: "magnetic-mode-next-gate",
    profile: "experiment",
    query: "After the three-oscillator magnetic design is ruled out, what calibrated geometry is the next admissible test?",
    expectedSource: "corpus/programmes/admissibility/admissibility_62_yig_three_mode_no_go_and_four_mode_tripod_gate.md",
  },
  {
    split: "holdout",
    id: "population-storage-reversal",
    profile: "audit",
    query: "Why does assigning the correct stored quantity to each member overturn the aggregate monotonicity judgement across frequencies?",
    expectedSource: "corpus/programmes/admissibility/admissibility_96_population_storage_corrected_loewner_certificate.md",
  },
];

const rankOf = (result, path) => {
  const item = result.results.find(candidate => candidate.path === path);
  return item?.rank ?? null;
};

function summarize(rows, split) {
  const selected = rows.filter(row => split === "all" || row.split === split);
  const score = key => ({
    recallAt6: selected.filter(row => row[key] !== null && row[key] <= 6).length / selected.length,
    recallAt12: selected.filter(row => row[key] !== null && row[key] <= 12).length / selected.length,
    meanReciprocalRank: selected.reduce((sum, row) => sum + (row[key] === null ? 0 : 1 / row[key]), 0) / selected.length,
  });
  return { cases: selected.length, legacy: score("legacyRank"), enhanced: score("enhancedRank") };
}

export function runRetrievalIntelligenceBenchmark({
  root = resolve("."),
  limit = 25,
  enhancedWeights = { graphWeight: 0.3, claimWeight: 0.17, semanticWeight: 0.08 },
} = {}) {
  let corpusContentSha256 = null;
  const rows = benchmarkCases.map(testCase => {
    const common = { root, query: testCase.query, profile: testCase.profile, limit, graphWeight: 0.3 };
    const legacy = searchCorpus({ ...common, claimWeight: 0, semanticWeight: 0 });
    const enhanced = searchCorpus({ ...common, ...enhancedWeights });
    corpusContentSha256 ??= enhanced.corpusContentSha256;
    if (enhanced.corpusContentSha256 !== corpusContentSha256 || legacy.corpusContentSha256 !== corpusContentSha256) {
      throw new Error(`${testCase.id}: corpus identity changed during retrieval benchmark (expected ${corpusContentSha256}, legacy ${legacy.corpusContentSha256 ?? "missing"}, enhanced ${enhanced.corpusContentSha256 ?? "missing"})`);
    }
    const enhancedTarget = enhanced.results.find(candidate => candidate.path === testCase.expectedSource);
    return {
      ...testCase,
      legacyRank: rankOf(legacy, testCase.expectedSource),
      enhancedRank: rankOf(enhanced, testCase.expectedSource),
      movement: (rankOf(legacy, testCase.expectedSource) ?? limit + 1) - (rankOf(enhanced, testCase.expectedSource) ?? limit + 1),
      claimReceipt: enhancedTarget?.claimMatch ? {
        role: enhancedTarget.claimMatch.role,
        lineStart: enhancedTarget.claimMatch.lineStart,
        lineEnd: enhancedTarget.claimMatch.lineEnd,
        claimSha256: enhancedTarget.claimMatch.claimSha256,
      } : null,
      semanticBridgeReceipt: enhancedTarget?.semanticBridge ? {
        sourcePath: enhancedTarget.semanticBridge.sourcePath,
        lineStart: enhancedTarget.semanticBridge.lineStart,
        lineEnd: enhancedTarget.semanticBridge.lineEnd,
        bridgeSha256: enhancedTarget.semanticBridge.bridgeSha256,
      } : null,
    };
  });
  const summary = {
    all: summarize(rows, "all"),
    calibration: summarize(rows, "calibration"),
    holdout: summarize(rows, "holdout"),
  };
  const gates = {
    holdoutRecallAt6NonRegressing: summary.holdout.enhanced.recallAt6 >= summary.holdout.legacy.recallAt6,
    holdoutMrrNonRegressing: summary.holdout.enhanced.meanReciprocalRank >= summary.holdout.legacy.meanReciprocalRank,
    atLeastOneHeldOutImprovement: rows.some(row => row.split === "holdout" && row.movement > 0),
    materialHeldOutMrrImprovement: summary.holdout.enhanced.meanReciprocalRank >= summary.holdout.legacy.meanReciprocalRank * 1.25,
    exactClaimReceipts: rows.every(row => row.enhancedRank === null || /^[0-9a-f]{64}$/u.test(row.claimReceipt?.claimSha256 ?? "")),
    exactBridgeReceipts: rows.every(row => !row.semanticBridgeReceipt || /^[0-9a-f]{64}$/u.test(row.semanticBridgeReceipt.bridgeSha256)),
  };
  return {
    benchmark: "corpus-retrieval-intelligence-v1",
    corpusContentSha256,
    authorityBoundary: "This measures source recovery for preregistered navigation targets. It does not establish source truth, completeness, or scientific validity.",
    controls: {
      legacy: { lexical: 0.7, claim: 0, semantic: 0, graph: 0.3 },
      enhanced: {
        lexical: 1 - enhancedWeights.graphWeight - enhancedWeights.claimWeight - enhancedWeights.semanticWeight,
        claim: enhancedWeights.claimWeight,
        semantic: enhancedWeights.semanticWeight,
        graph: enhancedWeights.graphWeight,
      },
      semanticMechanism: "confidence-gated corpus-local claim-unit term co-occurrence plus exact cross-reference passage bridges; no external embedding model",
      limit,
    },
    summary,
    gates,
    qualified: Object.values(gates).every(Boolean),
    cases: rows,
  };
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : "";
if (invokedPath === fileURLToPath(import.meta.url)) {
  const outputIndex = process.argv.indexOf("--out");
  if (outputIndex >= 0 && !process.argv[outputIndex + 1]) throw new Error("--out requires a path");
  const result = runRetrievalIntelligenceBenchmark();
  const rendered = `${JSON.stringify(result, null, 2)}\n`;
  if (outputIndex >= 0) {
    const output = resolve(process.argv[outputIndex + 1]);
    mkdirSync(dirname(output), { recursive: true });
    writeFileSync(output, rendered);
    process.stdout.write(`${output}\n`);
  } else process.stdout.write(rendered);
  if (!result.qualified) process.exitCode = 1;
}
