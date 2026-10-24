import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { buildAdaptiveCorpusContext } from "../../tooling/search/adaptive_context.mjs";
import { compareAnswerReceipts, createAnswerReceipt } from "../../tooling/search/answer_stability.mjs";
import { observationsFromAnswerStability, observationsFromContextSweep, observationsFromVerification } from "../../tooling/search/belief_observations.mjs";
import { initializeBeliefState, updateBeliefState, verifyBeliefState } from "../../tooling/search/belief_state.mjs";
import { buildContextSweep } from "../../tooling/search/context_sweep.mjs";
import { searchCorpus } from "../../tooling/search/search_corpus.mjs";

const root = new URL("../../", import.meta.url);
const objective = "Casimir boundaries and thermoelectric detection";
const corpusIdentity = () => searchCorpus({ root, query: objective, limit: 1 }).corpusContentSha256;
const sourcePath = "corpus/programmes/admissibility/admissibility_02_casimir_as_first_generative_probe.md";
const evidenceSha256 = "e".repeat(64);

test("belief initialization is deterministic, caller-owned and authority bounded", () => {
  const options = { objective, profile: "experiment", corpusContentSha256: corpusIdentity() };
  const first = initializeBeliefState(options);
  const second = initializeBeliefState(options);
  assert.deepEqual(first, second);
  assert.equal(first.sequence, 0);
  assert.equal(first.authority.externalTelosRequired, true);
  assert.equal(first.authority.changesTruthStatus, false);
  assert.equal(first.authority.corpusPromotion, false);
  assert.equal(verifyBeliefState(first), first);
});

test("Kalman-like update is deterministic and stronger evidence produces a larger gain", () => {
  const state = initializeBeliefState({ objective, profile: "experiment", corpusContentSha256: corpusIdentity() });
  const weak = updateBeliefState({ beliefState: state, observations: [{ type: "user-rating", sourcePath, value: 1, noiseVariance: 0.8 }] });
  const strong = updateBeliefState({ beliefState: state, observations: [{ type: "user-rating", sourcePath, value: 1, noiseVariance: 0.05 }] });
  const repeated = updateBeliefState({ beliefState: state, observations: [{ type: "user-rating", sourcePath, value: 1, noiseVariance: 0.05 }] });
  assert.deepEqual(strong, repeated);
  assert.ok(strong.report.innovations[0].gain > weak.report.innovations[0].gain);
  assert.ok(strong.state.sources[sourcePath].utilityMean > weak.state.sources[sourcePath].utilityMean);
  assert.ok(strong.state.sources[sourcePath].utilityVariance < state.policy.prior.utilityVariance);
});

test("conflict and source change retain uncertainty instead of creating false certainty", () => {
  const initial = initializeBeliefState({ objective, corpusContentSha256: corpusIdentity() });
  const supported = updateBeliefState({ beliefState: initial, observations: [{ type: "verification-pass", sourcePath, evidenceSha256 }] }).state;
  assert.throws(() => updateBeliefState({ beliefState: supported, observations: [{ type: "verification-pass", sourcePath, evidenceSha256 }] }), /already been applied/iu);
  const conflicted = updateBeliefState({ beliefState: supported, observations: [{ type: "answer-conflict", sourcePath, evidenceSha256 }] }).state;
  assert.ok(conflicted.sources[sourcePath].utilityVariance > supported.sources[sourcePath].utilityVariance);
  const changed = updateBeliefState({ beliefState: conflicted, observations: [{ type: "source-changed", sourcePath, evidenceSha256 }] });
  assert.equal(changed.state.sources[sourcePath].utilityMean, 0.5);
  assert.equal(changed.state.sources[sourcePath].utilityVariance, 0.5);
  assert.equal(changed.report.innovations[0].reset, true);
});

test("belief update rejects tampering, undeclared controls and stale corpus identity", () => {
  const state = initializeBeliefState({ objective, corpusContentSha256: corpusIdentity() });
  const tampered = structuredClone(state);
  tampered.episode.objective = "changed behind the receipt";
  assert.throws(() => verifyBeliefState(tampered), /integrity check failed/iu);
  assert.throws(() => updateBeliefState({ beliefState: state, observations: [{ type: "verification-pass", sourcePath, evidenceSha256, invented: true }] }), /unknown fields/iu);
  assert.throws(() => updateBeliefState({ beliefState: state, observations: [{ type: "verification-pass", sourcePath }] }), /evidenceSha256 is required/iu);
  assert.throws(() => updateBeliefState({ beliefState: state, observations: [{ type: "verification-pass", sourcePath, evidenceSha256 }, { type: "verification-pass", sourcePath, evidenceSha256 }] }), /duplicate observations/iu);
  assert.throws(() => updateBeliefState({ beliefState: state, observations: [{ type: "verification-pass", sourcePath, evidenceSha256 }], corpusContentSha256: "f".repeat(64) }), /stale/iu);
});

test("empty belief preserves baseline selection and learned context exposes bounded adaptation", () => {
  const state = initializeBeliefState({ objective, profile: "experiment", corpusContentSha256: corpusIdentity() });
  const empty = buildAdaptiveCorpusContext({ root, task: objective, beliefState: state, maxSources: 4, maxCharacters: 6000 });
  assert.deepEqual(empty.adaptive.sources.map(source => source.path), empty.baseline.sources.map(source => source.path));
  assert.equal(empty.controls.emptyStatePreservesBaseline, true);
  const learned = updateBeliefState({ beliefState: state, observations: [{ type: "verification-pass", sourcePath, evidenceSha256 }] }).state;
  const adaptive = buildAdaptiveCorpusContext({ root, task: objective, beliefState: learned, maxSources: 4, maxCharacters: 6000, adaptiveWeight: 0.2, explorationWeight: 0.05 });
  assert.equal(adaptive.protocol, "spin23-corpus-adaptive-context/1");
  assert.equal(adaptive.controls.effectiveAdaptiveWeight, 0.2);
  assert.equal(adaptive.authority.changesTruthStatus, false);
  assert.ok(adaptive.adaptive.sources.some(source => source.selectionRole === "explore"));
  assert.match(adaptive.context, /Utility estimates guide context only and are not truth probabilities/iu);
});

test("verified utility can move a previously omitted tied source into bounded adaptive context", t => {
  const fixture = mkdtempSync(join(tmpdir(), "spin23-belief-"));
  t.after(() => rmSync(fixture, { recursive: true, force: true }));
  const directory = join(fixture, "corpus", "programmes");
  mkdirSync(directory, { recursive: true });
  const content = "# Boundary response candidate\n\nA boundary response candidate for controlled retrieval.\n";
  for (const name of ["alpha.md", "beta.md", "zeta.md"]) writeFileSync(join(directory, name), content);
  const task = "boundary response candidate";
  const identity = searchCorpus({ root: fixture, query: task, limit: 1 }).corpusContentSha256;
  const initial = initializeBeliefState({ objective: task, profile: "experiment", corpusContentSha256: identity });
  const target = "corpus/programmes/zeta.md";
  const learned = updateBeliefState({ beliefState: initial, observations: [
    { type: "sweep-invariant", sourcePath: target, evidenceSha256: "1".repeat(64) },
    { type: "answer-stable", sourcePath: target, evidenceSha256: "2".repeat(64) },
    { type: "verification-pass", sourcePath: target, evidenceSha256: "3".repeat(64) },
  ] }).state;
  const result = buildAdaptiveCorpusContext({ root: fixture, task, beliefState: learned, maxSources: 2, maxCharacters: 4000, adaptiveWeight: 0.2, explorationWeight: 0 });
  assert.equal(result.baseline.sources.some(source => source.path === target), false);
  assert.equal(result.adaptive.sources.some(source => source.path === target), true);
  assert.equal(result.movements.find(item => item.path === target).disposition, "added");
});

test("typed adapters translate sweeps, answer comparisons and verification without mutation", () => {
  const sweep = buildContextSweep({ root, task: objective, profiles: ["experiment"], graphWeights: [0.15], maxSources: 3, maxCharacters: 4000 });
  const sweepObservations = observationsFromContextSweep(sweep);
  assert.ok(sweepObservations.length > 0);
  assert.ok(sweepObservations.every(item => ["sweep-invariant", "retrieved"].includes(item.type)));

  const receipt = (contextHash, verdict) => createAnswerReceipt({
    contextReceipt: { contextSha256: contextHash.repeat(64), sourceSetSha256: "c".repeat(64) },
    contextSources: [{ path: sourcePath, sourceSha256: "d".repeat(64) }],
    model: { name: "test-model" },
    prompt: "Assess the boundary claim.",
    answer: `The verdict is ${verdict}.`,
    claims: [{ key: "boundary.claim", statement: "The boundary matters.", verdict, sourcePaths: [sourcePath] }],
  });
  const receipts = [receipt("a", "supported"), receipt("b", "rejected")];
  const comparison = compareAnswerReceipts(receipts);
  const answerObservations = observationsFromAnswerStability(comparison, receipts);
  assert.deepEqual(answerObservations.map(item => item.type), ["answer-conflict"]);
  const verification = observationsFromVerification({ sourcePaths: [sourcePath], passed: true, verificationSha256: "b".repeat(64) });
  assert.deepEqual(verification.map(item => item.type), ["verification-pass"]);
});

