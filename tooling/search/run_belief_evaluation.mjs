#!/usr/bin/env node

import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { initializeBeliefState, updateBeliefState } from "./belief_state.mjs";
import { searchCorpus } from "./search_corpus.mjs";

const defaultRoot = new URL("../../", import.meta.url);
const usefulSource = "corpus/programmes/admissibility/admissibility_02_casimir_as_first_generative_probe.md";
const distractorSource = "corpus/README.md";

function runSequence(initial, observations) {
  let state = initial;
  const predictions = [];
  for (const observation of observations) {
    const predicted = state.sources[observation.sourcePath]?.utilityMean ?? state.policy.prior.utilityMean;
    const updated = updateBeliefState({ beliefState: state, observations: [observation] });
    predictions.push({ predicted, observed: updated.report.observations[0].value, residual: updated.report.innovations[0].residual });
    state = updated.state;
  }
  return { state, predictions };
}

export function runBeliefEvaluation({ root = defaultRoot } = {}) {
  const identity = searchCorpus({ root, query: "Casimir boundaries and thermoelectric detection", limit: 1 }).corpusContentSha256;
  const initial = initializeBeliefState({ objective: "Casimir boundaries and thermoelectric detection", profile: "experiment", corpusContentSha256: identity });
  const evidenceSha256 = "e".repeat(64);
  const consistent = runSequence(initial, [
    { type: "sweep-invariant", sourcePath: usefulSource, evidenceSha256 },
    { type: "answer-stable", sourcePath: usefulSource, evidenceSha256 },
    { type: "verification-pass", sourcePath: usefulSource, evidenceSha256 },
    { type: "answer-conflict", sourcePath: distractorSource, evidenceSha256 },
    { type: "verification-fail", sourcePath: distractorSource, evidenceSha256 },
  ]);
  const beforeConflict = consistent.state.sources[usefulSource];
  const conflict = updateBeliefState({ beliefState: consistent.state, observations: [{ type: "answer-conflict", sourcePath: usefulSource, evidenceSha256: "f".repeat(64) }] });
  const recovered = updateBeliefState({ beliefState: conflict.state, observations: [{ type: "verification-pass", sourcePath: usefulSource, evidenceSha256: "a".repeat(64) }] });
  const brier = consistent.predictions.reduce((sum, item) => sum + (item.predicted - item.observed) ** 2, 0) / consistent.predictions.length;
  const metrics = {
    usefulPosterior: consistent.state.sources[usefulSource].utilityMean,
    distractorPosterior: consistent.state.sources[distractorSource].utilityMean,
    usefulVarianceAfterConsistentEvidence: beforeConflict.utilityVariance,
    usefulVarianceAfterConflict: conflict.state.sources[usefulSource].utilityVariance,
    usefulPosteriorAfterRecovery: recovered.state.sources[usefulSource].utilityMean,
    meanBrierScore: Number(brier.toFixed(6)),
    deterministicReplay: JSON.stringify(runSequence(initial, [
      { type: "sweep-invariant", sourcePath: usefulSource, evidenceSha256 },
      { type: "answer-stable", sourcePath: usefulSource, evidenceSha256 },
      { type: "verification-pass", sourcePath: usefulSource, evidenceSha256 },
      { type: "answer-conflict", sourcePath: distractorSource, evidenceSha256 },
      { type: "verification-fail", sourcePath: distractorSource, evidenceSha256 },
    ]).state) === JSON.stringify(consistent.state),
  };
  const gates = {
    usefulLearned: metrics.usefulPosterior >= 0.8,
    distractorDownweighted: metrics.distractorPosterior <= 0.2,
    conflictRaisesUncertainty: metrics.usefulVarianceAfterConflict > metrics.usefulVarianceAfterConsistentEvidence,
    recoveryMovesUpward: metrics.usefulPosteriorAfterRecovery > conflict.state.sources[usefulSource].utilityMean,
    boundedCalibration: metrics.meanBrierScore <= 0.3,
    deterministicReplay: metrics.deterministicReplay,
  };
  return {
    protocol: "spin23-corpus-belief-evaluation/1",
    corpusContentSha256: identity,
    scenarios: ["consistent useful evidence", "consistent negative evidence", "conflict shock", "verified recovery", "deterministic replay"],
    metrics,
    gates,
    passed: Object.values(gates).every(Boolean),
    authority: { syntheticEvaluation: true, establishesScientificTruth: false, corpusPromotion: false },
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const report = runBeliefEvaluation();
  console.log(JSON.stringify(report, null, 2));
  if (!report.passed) process.exitCode = 1;
}

