#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createObservatoryRuntime } from "./observatory_runtime.mjs";
import { createContributionStore } from "./contribution_store.mjs";
import { sha256, stableStringify } from "./belief_state.mjs";

const moduleDirectory = dirname(fileURLToPath(import.meta.url));
const defaultRoot = resolve(moduleDirectory, "../..");
const defaultPolicy = resolve(moduleDirectory, "collective_instrument_policy_v1.json");

const counts = values => Object.fromEntries([...values.reduce((map, value) => map.set(value, (map.get(value) ?? 0) + 1), new Map())].sort(([left], [right]) => left.localeCompare(right)));
const maximumShare = values => values.length ? Math.max(...Object.values(counts(values))) / values.length : 1;
const sum = (values, key) => values.reduce((total, value) => total + (value[key] ?? 0), 0);

export function auditCollectivePopulation({ episodes, contributions, policy }) {
  if (!policy || policy.protocol !== "spin23-context-hub-collective-instrument-policy/1") throw new Error("collective instrument policy is invalid");
  if (!Array.isArray(episodes) || !Array.isArray(contributions)) throw new Error("collective population must contain episode and contribution arrays");
  const objectives = episodes.map(item => item.objective);
  const corpusIdentities = [...new Set(episodes.map(item => item.corpusContentSha256))].sort();
  const observations = episodes.flatMap(episode => (episode.proposals ?? []).flatMap(proposal => proposal.observations ?? []));
  const selectedSources = episodes.flatMap(episode => (episode.turns ?? []).flatMap(turn => turn.plan?.adaptive?.sources?.map(source => source.path) ?? []));
  const familySourceKeys = observations.map(item => `${item.evidenceFamilySha256}\0${item.sourcePath}`);
  const independenceClasses = counts(observations.map(item => item.independenceClass));
  const contributors = contributions.map(item => item.proposed.contributor);
  const dispositions = counts(contributions.map(item => item.disposition));
  const impactReceipts = contributions.flatMap(item => item.impacts ?? []);
  const accepted = dispositions.accepted ?? 0;
  const rejected = dispositions.rejected ?? 0;
  const metrics = {
    episodes: episodes.length,
    uniqueObjectives: new Set(objectives).size,
    maximumObjectiveEpisodeShare: maximumShare(objectives),
    corpusIdentities,
    episodesByCorpusIdentity: counts(episodes.map(item => item.corpusContentSha256)),
    turns: sum(episodes.map(item => item.metrics), "turns"),
    answers: sum(episodes.map(item => item.metrics), "answers"),
    approvedEpisodeUpdates: sum(episodes.map(item => item.metrics), "approvedUpdates"),
    rejectedEpisodeUpdates: sum(episodes.map(item => item.metrics), "rejectedUpdates"),
    rollbacks: sum(episodes.map(item => item.metrics), "rollbacks"),
    frozenEpisodes: episodes.filter(item => item.frozen).length,
    replays: episodes.reduce((total, item) => total + (item.replays?.length ?? 0), 0),
    observations: observations.length,
    independenceClasses,
    independentEvidenceFamilies: new Set(observations.filter(item => ["independent-verifier", "external-observation"].includes(item.independenceClass)).map(item => item.evidenceFamilySha256)).size,
    externalOrIndependentObservations: observations.filter(item => ["independent-verifier", "external-observation"].includes(item.independenceClass)).length,
    evidenceFamilySourceReplays: familySourceKeys.length - new Set(familySourceKeys).size,
    selectedSourceOccurrences: selectedSources.length,
    distinctSelectedSources: new Set(selectedSources).size,
    maximumSourceSelectionShare: maximumShare(selectedSources),
    contributions: contributions.length,
    distinctContributors: new Set(contributors).size,
    maximumContributorShare: maximumShare(contributors),
    contributionDispositions: dispositions,
    acceptedContributions: accepted,
    rejectedContributions: rejected,
    pendingContributions: dispositions.pending ?? 0,
    impactReceipts: impactReceipts.length,
    activeClaims: contributions.filter(item => item.claim).length,
  };
  const authorityBoundariesPreserved = episodes.every(item => item.authority?.changesTruthStatus === false && item.authority?.corpusPromotion === false && item.authority?.modelWeightTraining === false)
    && contributions.every(item => item.authority?.changesTruthStatus === false && item.authority?.corpusPromotion === false && item.authority?.modelWeightTraining === false && item.authority?.admissionEffect === false);
  const allChainsReplayable = episodes.every(item => /^[0-9a-f]{64}$/u.test(item.headSha256 ?? "") && item.timeline?.length === item.revision)
    && contributions.every(item => /^[0-9a-f]{64}$/u.test(item.headSha256 ?? "") && item.timeline?.length === item.revision);
  const t = policy.thresholds;
  const gates = {
    enoughEpisodes: metrics.episodes >= t.minimumEpisodes,
    enoughUniqueObjectives: metrics.uniqueObjectives >= t.minimumUniqueObjectives,
    enoughAnswers: metrics.answers >= t.minimumAnswers,
    enoughReplays: metrics.replays >= t.minimumReplays,
    rollbackObserved: metrics.rollbacks >= t.minimumRollbacks,
    freezeObserved: metrics.frozenEpisodes >= t.minimumFrozenEpisodes,
    negativeEpisodeGovernanceObserved: metrics.rejectedEpisodeUpdates >= t.minimumRejectedEpisodeUpdates,
    independentEvidenceObserved: metrics.independentEvidenceFamilies >= t.minimumIndependentEvidenceFamilies && metrics.externalOrIndependentObservations >= t.minimumExternalOrIndependentObservations,
    sourceConcentrationBounded: metrics.maximumSourceSelectionShare <= t.maximumSourceSelectionShare,
    objectiveConcentrationBounded: metrics.maximumObjectiveEpisodeShare <= t.maximumObjectiveEpisodeShare,
    enoughContributions: metrics.contributions >= t.minimumContributions,
    contributorDiversity: metrics.distinctContributors >= t.minimumDistinctContributors && metrics.maximumContributorShare <= t.maximumContributorShare,
    positiveContributionGovernanceObserved: metrics.acceptedContributions >= t.minimumAcceptedContributions,
    negativeContributionGovernanceObserved: metrics.rejectedContributions >= t.minimumRejectedContributions,
    downstreamImpactObserved: metrics.impactReceipts >= t.minimumImpactReceipts,
    exactCorpusIdentityPerEpisode: !policy.requiredInvariants.exactCorpusIdentityPerEpisode || episodes.every(item => /^[0-9a-f]{64}$/u.test(item.corpusContentSha256 ?? "")),
    allChainsReplayable: !policy.requiredInvariants.allChainsReplayable || allChainsReplayable,
    authorityBoundariesPreserved: !policy.requiredInvariants.authorityBoundariesPreserved || authorityBoundariesPreserved,
    noEvidenceFamilySourceReplay: !policy.requiredInvariants.noEvidenceFamilySourceReplay || metrics.evidenceFamilySourceReplays === 0,
    bothPositiveAndNegativeGovernanceObserved: !policy.requiredInvariants.bothPositiveAndNegativeGovernanceObserved || (accepted > 0 && rejected > 0 && metrics.approvedEpisodeUpdates > 0 && metrics.rejectedEpisodeUpdates > 0),
  };
  const population = {
    episodes: episodes.map(item => ({ episodeId: item.episodeId, revision: item.revision, headSha256: item.headSha256 })).sort((a, b) => a.episodeId.localeCompare(b.episodeId)),
    contributions: contributions.map(item => ({ contributionId: item.contributionId, revision: item.revision, headSha256: item.headSha256 })).sort((a, b) => a.contributionId.localeCompare(b.contributionId)),
  };
  return {
    protocol: "spin23-context-hub-collective-instrument-audit/1",
    policySha256: sha256(policy),
    populationSha256: sha256(population),
    population,
    metrics,
    gates,
    mature: Object.values(gates).every(Boolean),
    missingGates: Object.entries(gates).filter(([, passed]) => !passed).map(([name]) => name),
    authority: { attentionAuditOnly: true, scientificTruthEstablished: false, corpusPromotion: false, modelWeightTraining: false },
  };
}

function parseArgs(argv) {
  const result = { root: defaultRoot, stateRoot: null, contributionRoot: null, policy: defaultPolicy, out: null };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--root") result.root = resolve(argv[++index]);
    else if (value === "--state-root") result.stateRoot = resolve(argv[++index]);
    else if (value === "--contribution-root") result.contributionRoot = resolve(argv[++index]);
    else if (value === "--policy") result.policy = resolve(argv[++index]);
    else if (value === "--out") result.out = resolve(argv[++index]);
    else throw new Error(`unknown argument: ${value}`);
  }
  result.stateRoot ??= resolve(result.root, ".context-hub", "episodes");
  result.contributionRoot ??= resolve(result.root, ".context-hub", "contributions");
  return result;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const options = parseArgs(process.argv.slice(2));
  const runtime = createObservatoryRuntime({ root: options.root, stateRoot: options.stateRoot });
  const episodes = runtime.listEpisodes().map(item => runtime.getEpisode(item.episodeId));
  const contributions = createContributionStore({ root: options.contributionRoot }).list();
  const report = auditCollectivePopulation({ episodes, contributions, policy: JSON.parse(readFileSync(options.policy, "utf8")) });
  const output = `${JSON.stringify(report, null, 2)}\n`;
  if (options.out) writeFileSync(options.out, output);
  process.stdout.write(output);
  if (!report.mature) process.exitCode = 2;
}
