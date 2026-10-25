#!/usr/bin/env node

import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildCorpusContext } from "./context_hub.mjs";

const allowedProfiles = ["all", "interpret", "choose-work", "audit", "experiment"];

function unique(values) {
  return [...new Set(values)];
}

function validate({ task, baselineProfile, profiles, graphWeights, maxSources, maxCharacters }) {
  if (typeof task !== "string" || task.trim().length < 2 || task.length > 500) throw new Error("task must contain 2 to 500 characters");
  if (!allowedProfiles.includes(baselineProfile)) throw new Error("baselineProfile is invalid");
  if (!Array.isArray(profiles) || profiles.length > 5 || profiles.some(profile => !allowedProfiles.includes(profile))) throw new Error("profiles must contain at most five declared profiles");
  if (!Array.isArray(graphWeights) || graphWeights.length < 1 || graphWeights.length > 5 || graphWeights.some(value => typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > 0.6)) {
    throw new Error("graphWeights must contain one to five finite values from 0 to 0.6");
  }
  if (!Number.isInteger(maxSources) || maxSources < 2 || maxSources > 10) throw new Error("maxSources must be an integer from 2 to 10");
  if (!Number.isInteger(maxCharacters) || maxCharacters < 4000 || maxCharacters > 16000) throw new Error("maxCharacters must be an integer from 4000 to 16000 for each variant");
}

function configurations(baselineProfile, profiles, graphWeights, baselineGraphWeight) {
  const candidates = [
    { profile: baselineProfile, graphWeight: baselineGraphWeight, changedAxis: "baseline" },
    ...unique(profiles).map(profile => ({ profile, graphWeight: baselineGraphWeight, changedAxis: "profile" })),
    ...unique(graphWeights).map(graphWeight => ({ profile: baselineProfile, graphWeight, changedAxis: "graphWeight" })),
  ];
  const seen = new Set();
  return candidates.filter(item => {
    const key = `${item.profile}\0${item.graphWeight}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function intersection(sets) {
  if (!sets.length) return new Set();
  return new Set([...sets[0]].filter(value => sets.slice(1).every(set => set.has(value))));
}

function jaccard(left, right) {
  const union = new Set([...left, ...right]);
  if (!union.size) return 1;
  return [...left].filter(value => right.has(value)).length / union.size;
}

function renderSummary(result) {
  const variants = result.variants.map(item => `- ${item.id}: ${item.sources.map(source => source.title).join(" | ")}`);
  const invariant = result.stability.invariantSources.map(item => item.title).join(" | ") || "none";
  const sensitive = result.stability.selectorSensitiveSources.slice(0, 12).map(item => `${item.title} (${item.presence}/${result.variants.length})`).join(" | ") || "none";
  return `# Corpus context sweep\n\n**Task:** ${result.task}\n**Variants:** ${result.variants.length}\n**Mean pairwise source overlap:** ${result.stability.meanPairwiseJaccard}\n**Minimum pairwise source overlap:** ${result.stability.minimumPairwiseJaccard}\n\n## Variants\n\n${variants.join("\n")}\n\n## Invariant source core\n\n${invariant}\n\n## Selector-sensitive perimeter\n\n${sensitive}\n\nThis is a context-stability result. Answer stability requires running the same model, model settings and prompt against every retained context packet.`;
}

export function buildContextSweep({
  root = process.cwd(),
  task,
  baselineProfile = "all",
  profiles = ["interpret", "experiment", "audit"],
  baselineGraphWeight = 0.2,
  graphWeights = [0.1, 0.2, 0.35],
  maxSources = 6,
  maxCharacters = 8000,
  includeContexts = false,
} = {}) {
  validate({ task, baselineProfile, profiles, graphWeights, maxSources, maxCharacters });
  if (typeof baselineGraphWeight !== "number" || !Number.isFinite(baselineGraphWeight) || baselineGraphWeight < 0 || baselineGraphWeight > 0.6) throw new Error("baselineGraphWeight must be from 0 to 0.6");
  if (typeof includeContexts !== "boolean") throw new Error("includeContexts must be boolean");
  const configs = configurations(baselineProfile, profiles, graphWeights, baselineGraphWeight);
  if (configs.length > 8) throw new Error("context sweep is bounded to eight one-factor variants");
  const variants = configs.map((config, index) => {
    const packet = buildCorpusContext({ root, task, profile: config.profile, graphWeight: config.graphWeight, maxSources, maxCharacters });
    return {
      id: `v${index + 1}-${config.profile}-g${config.graphWeight.toFixed(2)}`,
      ...config,
      receipt: packet.receipt,
      budget: packet.budget,
      coverage: packet.coverage,
      sources: packet.sources.map(source => ({
        rank: source.rank,
        path: source.path,
        uri: source.uri,
        title: source.title,
        kind: source.kind,
        status: source.status,
        reason: source.reason,
        selectorSensitivity: source.selectorSensitivity,
        sourceSha256: source.sourceSha256,
      })),
      omittedCandidates: packet.omittedCandidates,
      ...(includeContexts ? { context: packet.context } : {}),
    };
  });
  const pathSets = variants.map(variant => new Set(variant.sources.map(source => source.path)));
  const core = intersection(pathSets);
  const catalogue = new Map();
  for (const variant of variants) for (const source of variant.sources) {
    const item = catalogue.get(source.path) ?? { ...source, presence: 0, variants: [] };
    item.presence += 1;
    item.variants.push(variant.id);
    catalogue.set(source.path, item);
  }
  const pairs = [];
  for (let left = 0; left < variants.length; left += 1) for (let right = left + 1; right < variants.length; right += 1) {
    pairs.push({ left: variants[left].id, right: variants[right].id, sourceJaccard: Number(jaccard(pathSets[left], pathSets[right]).toFixed(6)) });
  }
  const values = pairs.map(pair => pair.sourceJaccard);
  const result = {
    protocol: "spin23-corpus-context-sweep/1",
    task: task.trim(),
    sweep: { baselineProfile, baselineGraphWeight, profiles: unique(profiles), graphWeights: unique(graphWeights), method: "one factor at a time" },
    authority: { readOnly: true, entails: false, empiricalAuthority: false, corpusPromotion: false, answerStabilityEstablished: false },
    variants,
    stability: {
      invariantSources: [...core].map(path => catalogue.get(path)).sort((a, b) => a.rank - b.rank),
      robustSources: [...catalogue.values()].filter(item => item.presence >= Math.ceil(variants.length * 0.75)).sort((a, b) => b.presence - a.presence || a.rank - b.rank),
      selectorSensitiveSources: [...catalogue.values()].filter(item => item.presence < variants.length).sort((a, b) => b.presence - a.presence || a.rank - b.rank),
      pairwise: pairs,
      meanPairwiseJaccard: values.length ? Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(6)) : 1,
      minimumPairwiseJaccard: values.length ? Math.min(...values) : 1,
    },
    downstreamEvaluation: {
      instruction: "Run the same model, model settings and answer prompt once against each variant context. Compare atomic claims, verdicts and cited source paths across variants.",
      stable: "claim appears with the same verdict and source support in every variant",
      contextConditional: "claim appears only when particular sources or selector settings are present",
      conflict: "the same claim receives incompatible verdicts across variants",
      unsupported: "claim is emitted without a source present in that variant",
    },
  };
  return { ...result, summary: renderSummary(result) };
}

function parseArguments(argv) {
  const options = {};
  const positional = [];
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--task" || value === "-q") options.task = argv[++index];
    else if (value === "--profile") options.baselineProfile = argv[++index];
    else if (value === "--profiles") options.profiles = argv[++index].split(",").filter(Boolean);
    else if (value === "--graph-weights") options.graphWeights = argv[++index].split(",").map(Number);
    else if (value === "--max-sources") options.maxSources = Number(argv[++index]);
    else if (value === "--max-characters") options.maxCharacters = Number(argv[++index]);
    else if (value === "--include-contexts") options.includeContexts = true;
    else if (value === "--json") options.json = true;
    else positional.push(value);
  }
  options.task ??= positional.join(" ");
  return options;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const options = parseArguments(process.argv.slice(2));
    const result = buildContextSweep(options);
    console.log(options.json ? JSON.stringify(result, null, 2) : result.summary);
  } catch (error) {
    console.error(error.message);
    console.error("Usage: node tooling/search/context_sweep.mjs --task \"Casimir boundary detection\" [--profiles interpret,experiment,audit] [--graph-weights 0.1,0.2,0.35] [--include-contexts] [--json]");
    process.exitCode = 1;
  }
}
