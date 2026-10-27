#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { createHash } from "node:crypto";

const defaultBaseUrl = "http://127.0.0.1:4178";
const defaultOutput = resolve(".context-hub", "evaluations", "corpus-warmup-latest.json");
const sha256 = value => createHash("sha256").update(value).digest("hex");

// Each case is an objective-scoped, preregistered relevance check. The marker is
// deliberately a narrow textual boundary, not a claim that the source is true.
const cases = [
  {
    id: "relaxation-kms-boundary",
    profile: "audit",
    objective: "What remains open after positive stationary Gaussian fluctuation completion for causal hydrodynamic relaxation modes?",
    expectedSource: "corpus/programmes/admissibility/admissibility_104_relaxation_auxiliary_gaussian_kms_completion.md",
    marker: /exact quantum|nonlinear KMS/iu,
  },
  {
    id: "chiral-defect-index",
    profile: "audit",
    objective: "Does a minimal chiral defect retain a robust continuous datum beyond its signed index?",
    expectedSource: "corpus/programmes/admissibility/admissibility_105_fixed_index_defect_information_no_go.md",
    marker: /no robust continuous datum|signed index/iu,
  },
  {
    id: "global-detector-injectivity",
    profile: "audit",
    objective: "Why can locally adequate detector information still fail to identify a global physical state?",
    expectedSource: "corpus/programmes/admissibility/admissibility_107_global_nonlinear_detector_injectivity.md",
    marker: /global identification|injectiv/iu,
  },
  {
    id: "d4-operator-boundary",
    profile: "audit",
    objective: "Does a shared D4 action choose a unique localized operator, or is another selector required?",
    expectedSource: "corpus/programmes/admissibility/admissibility_108_d4_shared_action_operator_boundary.md",
    marker: /does not choose|localized operator/iu,
  },
  {
    id: "four-mode-action-record",
    profile: "experiment",
    objective: "Can one action generate the four-mode bench record, and what physical gates remain after that construction?",
    expectedSource: "corpus/programmes/admissibility/admissibility_109_four_mode_sk_action_to_record.md",
    marker: /four-mode|bench record/iu,
  },
  {
    id: "jordan-positive-order",
    profile: "audit",
    objective: "Does the Jordan face inside the relation quotient select its own positive order?",
    expectedSource: "corpus/programmes/admissibility/admissibility_111_relation_quotient_jordan_face_and_positive_order_boundary.md",
    marker: /positive order|Jordan face/iu,
  },
  {
    id: "alp-three-source-test",
    profile: "experiment",
    objective: "Why is the public ALP UFO only a two-control slice rather than the complete three-source experiment?",
    expectedSource: "corpus/programmes/admissibility/admissibility_113_the_public_alp_ufo_is_a_two_control_slice_not_the_three_source_test.md",
    marker: /two-control slice|three-source/iu,
  },
  {
    id: "sixth-coordinate-phase-reference",
    profile: "experiment",
    objective: "What minimal second-gauge detector can expose the sixth coordinate, and why does it require a phase reference?",
    expectedSource: "corpus/programmes/admissibility/admissibility_116_the_minimal_second_gauge_detector_needs_a_phase_reference.md",
    marker: /phase reference|sixth coordinate/iu,
  },
  {
    id: "odd-resonance-sign",
    profile: "experiment",
    objective: "Can an odd resonance moment provide the missing sign in the active gauge-detector programme?",
    expectedSource: "corpus/programmes/admissibility/admissibility_117_an_odd_resonance_moment_can_supply_the_missing_sign.md",
    marker: /odd resonance moment|missing sign/iu,
  },
  {
    id: "pagerank-perron-finesse",
    profile: "interpret",
    objective: "How are PageRank, Perron selection and the finesse trade-off related without turning navigation rank into truth?",
    expectedSource: "corpus/programmes/frontier-physics-targets/page_rank_perron_selector_bridge_v1.md",
    marker: /PageRank|Perron/iu,
  },
  {
    id: "yig-tripod-gate",
    profile: "experiment",
    objective: "What does the YIG three-mode no-go rule out, and why is a calibrated four-mode tripod the next gate?",
    expectedSource: "corpus/programmes/admissibility/admissibility_62_yig_three_mode_no_go_and_four_mode_tripod_gate.md",
    marker: /three-mode|four-mode tripod/iu,
  },
  {
    id: "storage-typing-loewner",
    profile: "audit",
    objective: "Why does storage typing reverse the population-wide cross-frequency Loewner verdict?",
    expectedSource: "corpus/programmes/admissibility/admissibility_96_population_storage_corrected_loewner_certificate.md",
    marker: /storage typing|cross-frequency/iu,
  },
];

function parseArgs(argv) {
  const result = { baseUrl: defaultBaseUrl, output: defaultOutput };
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === "--base-url") result.baseUrl = argv[++index];
    else if (argv[index] === "--out") result.output = resolve(argv[++index]);
    else throw new Error(`unknown argument: ${argv[index]}`);
  }
  return result;
}

async function api(baseUrl, path, { method = "GET", body } = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: body === undefined ? {} : { "content-type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(`${method} ${path}: ${response.status} ${payload.error ?? JSON.stringify(payload)}`);
  return payload;
}

const position = (sources, path) => {
  const index = sources.findIndex(source => source.path === path);
  return index < 0 ? null : index + 1;
};

async function runCase(baseUrl, testCase) {
  const sourceText = readFileSync(resolve(testCase.expectedSource), "utf8");
  if (!testCase.marker.test(sourceText)) throw new Error(`${testCase.id}: preregistered marker is absent from ${testCase.expectedSource}`);
  const sourceVersionSha256 = sha256(sourceText);
  const episode = await api(baseUrl, "/api/episodes", {
    method: "POST",
    body: {
      objective: testCase.objective,
      profile: testCase.profile,
      controls: { adaptiveWeight: 0.2, explorationWeight: 0.05, graphWeight: 0.3, maxSources: 6, maxCharacters: 12000 },
    },
  });
  const first = await api(baseUrl, `/api/episodes/${episode.episodeId}/turns`, { method: "POST", body: { task: testCase.objective } });
  const firstBaseline = first.turn.plan.baseline.sources;
  const firstAdaptive = first.turn.plan.adaptive.sources;
  const candidateRank = first.turn.plan.candidateUniverse.find(source => source.path === testCase.expectedSource)?.rank ?? null;
  const proposed = await api(baseUrl, `/api/episodes/${episode.episodeId}/proposals`, {
    method: "POST",
    body: {
      observations: [{
        type: "verification-pass",
        sourcePath: testCase.expectedSource,
        sourceVersionSha256,
        turnId: first.turn.turnId,
        value: 0.95,
        noiseVariance: 0.05,
        note: `Preregistered corpus-relevance check ${testCase.id}: exact source bytes contain the declared boundary marker. This is attention evidence, not truth promotion.`,
      }],
    },
  });
  const approved = await api(baseUrl, `/api/episodes/${episode.episodeId}/proposals/${proposed.proposal.proposalId}/decision`, {
    method: "POST",
    body: { decision: "approve", reason: "Exact source identity and preregistered boundary marker verified for this objective-scoped retrieval episode." },
  });
  const second = await api(baseUrl, `/api/episodes/${episode.episodeId}/turns`, { method: "POST", body: { task: testCase.objective } });
  const secondBaseline = second.turn.plan.baseline.sources;
  const secondAdaptive = second.turn.plan.adaptive.sources;
  const adaptivePosition = position(secondAdaptive, testCase.expectedSource);
  let answerReceiptSha256 = null;
  if (adaptivePosition !== null) {
    const answer = await api(baseUrl, `/api/episodes/${episode.episodeId}/answers`, {
      method: "POST",
      body: {
        turnId: second.turn.turnId,
        model: { name: "corpus-warmup-relevance-check", version: "1", settings: { generativeAnswer: false } },
        prompt: testCase.objective,
        answer: "The preregistered source was recovered in the adaptive context; its declared status and boundary remain unchanged.",
        claims: [{
          key: `${testCase.id}.retrieval`,
          statement: "The preregistered source was recovered in the adaptive context without changing its declared authority.",
          verdict: "supported",
          sourcePaths: [testCase.expectedSource],
          notes: "Retrieval relevance only; no scientific or epistemic promotion.",
        }],
      },
    });
    answerReceiptSha256 = answer.answer.receipt.receiptSha256;
  }
  const replay = await api(baseUrl, `/api/episodes/${episode.episodeId}/replay`, {
    method: "POST",
    body: { adaptiveWeight: 0.2, explorationWeight: 0.05, graphWeight: 0.3, processVariance: 0.01 },
  });
  const sourceEstimate = approved.beliefState.sources[testCase.expectedSource];
  return {
    id: testCase.id,
    episodeId: episode.episodeId,
    corpusContentSha256: episode.corpusContentSha256,
    objective: testCase.objective,
    profile: testCase.profile,
    expectedSource: testCase.expectedSource,
    sourceVersionSha256,
    candidateRank,
    before: {
      baselinePosition: position(firstBaseline, testCase.expectedSource),
      adaptivePosition: position(firstAdaptive, testCase.expectedSource),
      baselineEqualsAdaptive: JSON.stringify(firstBaseline.map(source => source.path)) === JSON.stringify(firstAdaptive.map(source => source.path)),
    },
    after: {
      baselinePosition: position(secondBaseline, testCase.expectedSource),
      adaptivePosition,
      addedByAdaptation: position(secondBaseline, testCase.expectedSource) === null && adaptivePosition !== null,
      utilityMean: sourceEstimate.utilityMean,
      utilityVariance: sourceEstimate.utilityVariance,
    },
    answerReceiptSha256,
    replay: {
      turns: replay.replay.turnComparisons.length,
      finalStateMatchesLive: replay.replay.finalStateSha256 === approved.beliefState.stateSha256,
    },
    authorityPreserved: approved.authority.changesTruthStatus === false && approved.authority.corpusPromotion === false && approved.authority.modelWeightTraining === false,
  };
}

async function runAdversarialCanary(baseUrl) {
  const testCase = cases.find(item => item.id === "jordan-positive-order");
  const expectedText = readFileSync(resolve(testCase.expectedSource), "utf8");
  const episode = await api(baseUrl, "/api/episodes", {
    method: "POST",
    body: {
      objective: testCase.objective,
      profile: testCase.profile,
      controls: { adaptiveWeight: 0.2, explorationWeight: 0.05, graphWeight: 0.3, maxSources: 6, maxCharacters: 12000 },
    },
  });
  const initialStateSha256 = episode.beliefState.stateSha256;
  const first = await api(baseUrl, `/api/episodes/${episode.episodeId}/turns`, { method: "POST", body: { task: testCase.objective } });
  const distractor = first.turn.plan.baseline.sources.find(source => source.path !== testCase.expectedSource);
  if (!distractor) throw new Error("adversarial canary could not identify a competing selected source");
  const proposed = await api(baseUrl, `/api/episodes/${episode.episodeId}/proposals`, {
    method: "POST",
    body: {
      observations: [
        {
          type: "verification-pass",
          sourcePath: testCase.expectedSource,
          sourceVersionSha256: sha256(expectedText),
          turnId: first.turn.turnId,
          value: 0.95,
          noiseVariance: 0.05,
          note: "Adversarial relevance canary: preregistered target contains the objective boundary.",
        },
        {
          type: "verification-fail",
          sourcePath: distractor.path,
          sourceVersionSha256: distractor.sourceSha256,
          turnId: first.turn.turnId,
          value: 0.05,
          noiseVariance: 0.05,
          note: "Adversarial relevance canary: this competing source is not the preregistered answer-bearing target for the exact objective. This does not reject its scientific content.",
        },
      ],
    },
  });
  const approved = await api(baseUrl, `/api/episodes/${episode.episodeId}/proposals/${proposed.proposal.proposalId}/decision`, {
    method: "POST",
    body: { decision: "approve", reason: "Exercise bounded positive and adverse attention evidence against exact source receipts." },
  });
  const second = await api(baseUrl, `/api/episodes/${episode.episodeId}/turns`, { method: "POST", body: { task: testCase.objective } });
  const beforeExpected = position(first.turn.plan.baseline.sources, testCase.expectedSource);
  const afterExpected = position(second.turn.plan.adaptive.sources, testCase.expectedSource);
  const beforeDistractor = position(first.turn.plan.baseline.sources, distractor.path);
  const afterDistractor = position(second.turn.plan.adaptive.sources, distractor.path);
  const rolledBack = await api(baseUrl, `/api/episodes/${episode.episodeId}/rollback`, {
    method: "POST",
    body: { targetStateSha256: initialStateSha256, reason: "Adversarial canary: prove admitted attention state is reversible." },
  });
  const third = await api(baseUrl, `/api/episodes/${episode.episodeId}/turns`, { method: "POST", body: { task: testCase.objective } });
  const rollbackRestoredParity = JSON.stringify(third.turn.plan.baseline.sources.map(source => source.path)) === JSON.stringify(third.turn.plan.adaptive.sources.map(source => source.path));
  await api(baseUrl, `/api/episodes/${episode.episodeId}/freeze`, { method: "POST", body: { frozen: true } });
  let frozenUpdateRefused = false;
  try {
    await api(baseUrl, `/api/episodes/${episode.episodeId}/proposals`, {
      method: "POST",
      body: { observations: [{ type: "user-rating", sourcePath: distractor.path, turnId: third.turn.turnId, value: 0.5 }] },
    });
  } catch (error) {
    frozenUpdateRefused = /frozen/iu.test(error.message);
  }
  return {
    episodeId: episode.episodeId,
    corpusContentSha256: episode.corpusContentSha256,
    target: testCase.expectedSource,
    distractor: distractor.path,
    beforeExpected,
    afterExpected,
    beforeDistractor,
    afterDistractor,
    targetDidNotWorsen: afterExpected !== null && (beforeExpected === null || afterExpected <= beforeExpected),
    distractorDidNotImprove: afterDistractor === null || afterDistractor >= beforeDistractor,
    adverseEvidenceRaisedVariance: approved.beliefState.sources[distractor.path].utilityVariance > approved.beliefState.sources[testCase.expectedSource].utilityVariance,
    rollbackRestoredParity,
    rollbackRecorded: rolledBack.metrics.rollbacks === 1,
    frozenUpdateRefused,
  };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const health = await api(options.baseUrl, "/api/health");
  const startedAt = new Date().toISOString();
  const results = [];
  for (const testCase of cases) {
    process.stderr.write(`warmup ${results.length + 1}/${cases.length}: ${testCase.id}\n`);
    let result = null;
    for (let attempt = 1; attempt <= 3 && result === null; attempt += 1) {
      try {
        result = await runCase(options.baseUrl, testCase);
      } catch (error) {
        if (!/corpus identity is stale/iu.test(error.message) || attempt === 3) throw error;
        process.stderr.write(`  corpus drift refused attempt ${attempt}; restarting this objective from current bytes\n`);
      }
    }
    results.push(result);
  }
  process.stderr.write("adversarial canary: positive/adverse evidence, rollback and freeze\n");
  const adversarialCanary = await runAdversarialCanary(options.baseUrl);

  // Exercise the objective firewall against a real warmed episode.
  let crossObjectiveRefused = false;
  try {
    await api(options.baseUrl, `/api/episodes/${results[0].episodeId}/turns`, { method: "POST", body: { task: cases[1].objective } });
  } catch (error) {
    crossObjectiveRefused = /exactly match/iu.test(error.message);
  }
  const corpusIdentities = [...new Set([...results.map(result => result.corpusContentSha256), adversarialCanary.corpusContentSha256])];
  const report = {
    protocol: "spin23-corpus-observatory-warmup-evaluation/1",
    startedAt,
    completedAt: new Date().toISOString(),
    corpusContentSha256: corpusIdentities.length === 1 ? corpusIdentities[0] : null,
    corpusIdentities,
    cases: results,
    adversarialCanary,
    metrics: {
      cases: results.length,
      candidateRecall: results.filter(result => result.candidateRank !== null).length / results.length,
      baselineRecallAt6: results.filter(result => result.before.baselinePosition !== null).length / results.length,
      adaptiveRecallAt6AfterWarmup: results.filter(result => result.after.adaptivePosition !== null).length / results.length,
      rescuedIntoContext: results.filter(result => result.after.addedByAdaptation).length,
      answerReceipts: results.filter(result => result.answerReceiptSha256).length,
      exactEmptyStateParity: results.every(result => result.before.baselineEqualsAdaptive),
      deterministicReplay: results.every(result => result.replay.finalStateMatchesLive),
      authorityPreserved: results.every(result => result.authorityPreserved),
      crossObjectiveRefused,
      singleCorpusIdentity: corpusIdentities.length === 1,
      adverseEvidenceBehavedDirectionally: adversarialCanary.targetDidNotWorsen && adversarialCanary.distractorDidNotImprove && adversarialCanary.adverseEvidenceRaisedVariance,
      rollbackRestoredParity: adversarialCanary.rollbackRestoredParity && adversarialCanary.rollbackRecorded,
      frozenUpdateRefused: adversarialCanary.frozenUpdateRefused,
    },
    gates: {},
    authority: {
      scope: "objective-scoped local attention utility",
      sameRunEvidenceOnly: true,
      scientificTruthEstablished: false,
      corpusPromotion: false,
      modelWeightTraining: false,
    },
  };
  report.gates = {
    allExpectedSourcesInCandidateUniverse: report.metrics.candidateRecall === 1,
    adaptationDoesNotReduceExpectedRecall: report.metrics.adaptiveRecallAt6AfterWarmup >= report.metrics.baselineRecallAt6,
    allWarmEpisodesProduceReceipts: report.metrics.answerReceipts === results.length,
    emptyStateExactlyMatchesBaseline: report.metrics.exactEmptyStateParity,
    replayMatchesLiveState: report.metrics.deterministicReplay,
    authorityBoundaryPreserved: report.metrics.authorityPreserved,
    objectiveFirewallHolds: report.metrics.crossObjectiveRefused,
    singleCorpusIdentity: report.metrics.singleCorpusIdentity,
    adverseEvidenceBehavesDirectionally: report.metrics.adverseEvidenceBehavedDirectionally,
    rollbackRestoresEmptyStateParity: report.metrics.rollbackRestoredParity,
    freezeRefusesLearning: report.metrics.frozenUpdateRefused,
  };
  report.passed = Object.values(report.gates).every(Boolean);
  mkdirSync(dirname(options.output), { recursive: true });
  writeFileSync(options.output, `${JSON.stringify(report, null, 2)}\n`, { flag: "w" });
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (!report.passed) process.exitCode = 1;
}

main().catch(error => {
  process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
  process.exitCode = 1;
});
