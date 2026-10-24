import { createHash } from "node:crypto";
import { buildCorpusContext } from "./context_hub.mjs";
import { searchCorpus } from "./search_corpus.mjs";
import { verifyBeliefState } from "./belief_state.mjs";

const sha256 = value => createHash("sha256").update(typeof value === "string" ? value : JSON.stringify(value)).digest("hex");

function sourceView(source) {
  return {
    path: source.path,
    title: source.title,
    status: source.status,
    rank: source.rank,
    selectionScore: Number((source.selectionScore ?? source.score).toFixed(6)),
    posteriorUtility: source.posteriorUtility,
    posteriorVariance: source.posteriorVariance,
    selectionRole: source.selectionRole ?? null,
  };
}

export function buildAdaptiveCorpusContext({
  root = process.cwd(),
  task,
  beliefState,
  profile,
  maxSources = 6,
  maxCharacters = 12000,
  graphWeight = 0.3,
  adaptiveWeight = 0.15,
  explorationWeight = 0.03,
} = {}) {
  const state = verifyBeliefState(beliefState);
  const selectedProfile = profile ?? state.episode.profile;
  if (typeof adaptiveWeight !== "number" || !Number.isFinite(adaptiveWeight) || adaptiveWeight < 0 || adaptiveWeight > 0.2) throw new Error("adaptiveWeight must be from 0 to 0.2");
  if (typeof explorationWeight !== "number" || !Number.isFinite(explorationWeight) || explorationWeight < 0 || explorationWeight > 0.05) throw new Error("explorationWeight must be from 0 to 0.05");
  const identity = searchCorpus({ root, query: task, profile: selectedProfile, graphWeight, limit: 1 });
  if (identity.corpusContentSha256 !== state.episode.corpusContentSha256) throw new Error("beliefState corpus identity is stale; initialize a new episode before adaptive selection");
  const hasLearnedSources = Object.keys(state.sources).length > 0;
  const effectiveAdaptiveWeight = hasLearnedSources ? adaptiveWeight : 0;
  const effectiveExplorationWeight = hasLearnedSources ? explorationWeight : 0;
  const common = { root, task, profile: selectedProfile, maxSources, maxCharacters, graphWeight };
  const baseline = buildCorpusContext(common);
  const adaptive = buildCorpusContext({
    ...common,
    adaptation: {
      sources: state.sources,
      prior: state.policy.prior,
      adaptiveWeight: effectiveAdaptiveWeight,
      explorationWeight: effectiveExplorationWeight,
      stateSha256: state.stateSha256,
    },
  });
  const baselinePaths = baseline.sources.map(source => source.path);
  const adaptivePaths = adaptive.sources.map(source => source.path);
  const baselinePositions = new Map(baselinePaths.map((path, index) => [path, index + 1]));
  const adaptivePositions = new Map(adaptivePaths.map((path, index) => [path, index + 1]));
  const allPaths = [...new Set([...baselinePaths, ...adaptivePaths])];
  const movements = allPaths.map(path => ({
    path,
    baselinePosition: baselinePositions.get(path) ?? null,
    adaptivePosition: adaptivePositions.get(path) ?? null,
    delta: baselinePositions.has(path) && adaptivePositions.has(path) ? baselinePositions.get(path) - adaptivePositions.get(path) : null,
    disposition: !baselinePositions.has(path) ? "added" : !adaptivePositions.has(path) ? "omitted" : baselinePositions.get(path) === adaptivePositions.get(path) ? "unchanged" : "moved",
  }));
  const payload = {
    protocol: "spin23-corpus-adaptive-context/1",
    task: task.trim(),
    beliefStateSha256: state.stateSha256,
    corpusContentSha256: identity.corpusContentSha256,
    controls: { requestedAdaptiveWeight: adaptiveWeight, effectiveAdaptiveWeight, maximumAdaptiveWeight: 0.2, requestedExplorationWeight: explorationWeight, effectiveExplorationWeight, maximumExplorationWeight: 0.05, emptyStatePreservesBaseline: !hasLearnedSources },
    baseline: { receipt: baseline.receipt, sources: baseline.sources.map(sourceView) },
    adaptive: { ...adaptive, context: undefined, sources: adaptive.sources.map(sourceView) },
    movements,
    context: adaptive.context,
    authority: { readOnly: true, entails: false, empiricalAuthority: false, corpusPromotion: false, changesTruthStatus: false, modelWeightTraining: false },
  };
  return { ...payload, adaptiveContextSha256: sha256(payload) };
}

