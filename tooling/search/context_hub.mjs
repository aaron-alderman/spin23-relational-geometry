#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_RETRIEVAL_WEIGHTS, searchCorpus } from "./search_corpus.mjs";

const defaultRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

function terms(value) {
  return new Set([...value.toLowerCase().matchAll(/[\p{L}\p{N}]+/gu)].map(match => match[0]).filter(token => token.length > 2));
}

const sha256 = value => createHash("sha256").update(value).digest("hex");

function similarity(left, right) {
  const intersection = [...left].filter(token => right.has(token)).length;
  const union = new Set([...left, ...right]).size;
  return union ? intersection / union : 0;
}

function sourceKind(path) {
  if (path.startsWith("verification/")) return "verification";
  if (path.includes("/syntheses/")) return "synthesis";
  if (path.includes("/claims/")) return "claim";
  if (path.includes("/programmes/frontier-physics-targets/")) return "assessment";
  if (path.includes("/programmes/")) return "programme";
  if (path.startsWith("book/")) return "reader";
  return "navigation";
}

function sensitivity(spread) {
  if (spread >= 50) return "high";
  if (spread >= 15) return "moderate";
  return "low";
}

export function selectSources(candidates, maximum, task, adaptation) {
  if (!candidates.length) return [];
  const navigationRequested = /\b(?:map|overview|navigate|navigation|start|structure|front door|what is here)\b/iu.test(task);
  const answerBearing = candidates.filter(item => sourceKind(item.path) !== "navigation");
  const rawPool = !navigationRequested && answerBearing.length >= Math.min(maximum, 2) ? answerBearing : candidates;
  const pool = rawPool.map(item => {
    if (!adaptation) return { ...item, selectionScore: item.score, posteriorUtility: null, posteriorVariance: null };
    const estimate = adaptation.sources[item.path] ?? adaptation.prior;
    const selectionScore = (1 - adaptation.adaptiveWeight) * item.score
      + adaptation.adaptiveWeight * estimate.utilityMean
      + adaptation.explorationWeight * Math.sqrt(estimate.utilityVariance);
    return { ...item, selectionScore, posteriorUtility: estimate.utilityMean, posteriorVariance: estimate.utilityVariance };
  }).sort((left, right) => right.selectionScore - left.selectionScore || left.rank - right.rank);
  const selected = [pool[0]];
  const selectedKinds = new Set([sourceKind(pool[0].path)]);
  const tokenSets = new Map(pool.map(item => [item.path, terms(`${item.title} ${item.snippet}`)]));
  while (selected.length < maximum) {
    const remaining = pool.filter(item => !selected.includes(item));
    if (!remaining.length) break;
    let best = null;
    for (const candidate of remaining) {
      const redundancy = Math.max(...selected.map(item => similarity(tokenSets.get(candidate.path), tokenSets.get(item.path))));
      const kind = sourceKind(candidate.path);
      const diversityBonus = selectedKinds.has(kind) ? 0 : 0.1;
      const stabilityPenalty = Math.min(candidate.selectorRankSpread / 500, 0.08);
      const utility = candidate.selectionScore - 0.2 * redundancy + diversityBonus - stabilityPenalty;
      if (!best || utility > best.utility || (utility === best.utility && candidate.rank < best.candidate.rank)) best = { candidate, utility };
    }
    selected.push(best.candidate);
    selectedKinds.add(sourceKind(best.candidate.path));
  }
  if (adaptation && selected.length) {
    let explorationTarget = null;
    if (adaptation.explorationWeight > 0) {
      explorationTarget = pool.filter(item => !selected.includes(item)).sort((left, right) => {
        const leftUnobserved = Object.hasOwn(adaptation.sources, left.path) ? 0 : 1;
        const rightUnobserved = Object.hasOwn(adaptation.sources, right.path) ? 0 : 1;
        return rightUnobserved - leftUnobserved || right.posteriorVariance - left.posteriorVariance || right.selectionScore - left.selectionScore || left.rank - right.rank;
      })[0] ?? null;
      if (explorationTarget) selected[selected.length - 1] = explorationTarget;
    }
    explorationTarget ??= [...selected].sort((left, right) => right.posteriorVariance - left.posteriorVariance || left.rank - right.rank)[0];
    for (const item of selected) item.selectionRole = item === explorationTarget ? "explore" : "exploit";
  }
  return selected;
}

function stripFences(text) {
  return text.replace(/^\s*```[^\r\n]*\r?\n[\s\S]*?^\s*```\s*$/gmu, "");
}

function excerptFor(text, queryTerms, maximum) {
  const clean = stripFences(text);
  const blocks = clean.split(/\r?\n\s*\r?\n/u).map((block, index) => ({ block: block.trim(), index })).filter(item => item.block);
  const ranked = blocks.map(item => {
    const lower = item.block.toLowerCase();
    const hits = [...queryTerms].reduce((sum, token) => sum + (lower.match(new RegExp(token.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&"), "gu"))?.length ?? 0), 0);
    return { ...item, score: hits + (/^#{1,6}\s/u.test(item.block) ? 0.25 : 0) };
  }).sort((left, right) => right.score - left.score || left.index - right.index);
  const chosen = ranked.slice(0, 2).sort((left, right) => left.index - right.index).map(item => item.block.replace(/^#{1,6}\s*/u, ""));
  let excerpt = chosen.join("\n\n");
  if (!excerpt) excerpt = clean.trim();
  if (excerpt.length > maximum) excerpt = `${excerpt.slice(0, Math.max(0, maximum - 1)).trimEnd()}…`;
  return excerpt;
}

function inclusionReason(item, kind, newKind) {
  const reasons = [];
  if (item.rank === 1) reasons.push("strongest direct retrieval match");
  else if (item.graphScore > item.lexicalScore) reasons.push("linked context beyond the literal query");
  else reasons.push("high direct relevance");
  if (newKind) reasons.push(`${kind} perspective`);
  if (sensitivity(item.selectorRankSpread) !== "low") reasons.push(`${sensitivity(item.selectorRankSpread)} selector sensitivity retained as a warning`);
  if (item.selectionRole === "explore") reasons.push("highest retained posterior uncertainty");
  else if (item.posteriorUtility !== null && item.posteriorUtility !== undefined) reasons.push("bounded learned source utility");
  return reasons.join("; ");
}

export function buildCorpusContext({ root = defaultRoot, task, profile = "all", maxSources = 6, maxCharacters = 12000, graphWeight = DEFAULT_RETRIEVAL_WEIGHTS.graphWeight, claimWeight = DEFAULT_RETRIEVAL_WEIGHTS.claimWeight, semanticWeight = DEFAULT_RETRIEVAL_WEIGHTS.semanticWeight, adaptation = null } = {}) {
  if (typeof task !== "string" || task.trim().length < 2 || task.length > 500) throw new Error("task must contain 2 to 500 characters");
  if (!Number.isInteger(maxSources) || maxSources < 2 || maxSources > 10) throw new Error("maxSources must be an integer from 2 to 10");
  if (!Number.isInteger(maxCharacters) || maxCharacters < 4000 || maxCharacters > 30000) throw new Error("maxCharacters must be an integer from 4000 to 30000");
  const corpusRoot = resolve(root instanceof URL ? fileURLToPath(root) : root);
  const search = searchCorpus({ root: corpusRoot, query: task.trim(), profile, graphWeight, claimWeight, semanticWeight, limit: Math.max(24, maxSources * 4) });
  if (adaptation) {
    if (!adaptation.sources || typeof adaptation.sources !== "object" || Array.isArray(adaptation.sources)) throw new Error("adaptation.sources must be an object");
    if (!adaptation.prior || typeof adaptation.prior.utilityMean !== "number" || typeof adaptation.prior.utilityVariance !== "number") throw new Error("adaptation.prior is invalid");
    if (typeof adaptation.adaptiveWeight !== "number" || adaptation.adaptiveWeight < 0 || adaptation.adaptiveWeight > 0.2) throw new Error("adaptation.adaptiveWeight must be from 0 to 0.2");
    if (typeof adaptation.explorationWeight !== "number" || adaptation.explorationWeight < 0 || adaptation.explorationWeight > 0.05) throw new Error("adaptation.explorationWeight must be from 0 to 0.05");
  }
  const selected = selectSources(search.results, maxSources, task, adaptation);
  const candidateUniverse = search.results.map(item => ({
    ...item,
    sourceSha256: sha256(readFileSync(join(corpusRoot, ...item.path.split("/")), "utf8")),
  }));
  const selectedPaths = new Set(selected.map(item => item.path));
  const followUps = search.results.filter(item => !selectedPaths.has(item.path)).slice(0, 5).map(item => ({ path: item.path, title: item.title, status: item.status }));
  const adaptationLine = adaptation
    ? `**Adaptation:** bounded source-utility weight ${adaptation.adaptiveWeight}; exploration weight ${adaptation.explorationWeight}; state ${adaptation.stateSha256}. Utility estimates guide context only and are not truth probabilities.  \n`
    : "";
  const header = `# Tailored corpus context\n\n**Task:** ${task.trim()}  \n**Profile:** ${profile}  \n**Retrieval:** document BM25, claim-level passage matching, confidence-gated corpus-local distributional expansion, exact cross-reference passage bridges and personalized PageRank; selector sweep ${search.method.selectorSweep.join(", ")}  \n${adaptationLine}**Authority:** navigation and context only. Preserve every source's declared status; links, semantic associations and ranks do not establish truth.\n\n`;
  const footer = `\n## Deliberate omissions\n\nThis packet is budgeted, not exhaustive. ${search.results.length - selected.length} retrieved candidates were omitted from the packet. Use \`corpus_read\` for full sources and rerun \`corpus_context\` when the task changes.\n\n**Next candidates:** ${followUps.map(item => `${item.title} (${item.path})`).join("; ") || "none"}.`;
  const seenKinds = new Set();
  const metadata = selected.map((item, index) => {
    const kind = sourceKind(item.path);
    const newKind = !seenKinds.has(kind);
    seenKinds.add(kind);
    const evidenceLine = item.claimEvidence
      ? `- Evidence spine: claim ${item.claimEvidence.legacyId}; identity ${item.claimEvidence.identityState}; source/evidence/certificate coverage ${item.claimEvidence.coverage.source}/${item.claimEvidence.coverage.evidence}/${item.claimEvidence.coverage.certificate}; ${item.claimEvidence.evidenceLinks.length} retained joins\n`
      : "";
    return {
      ...item,
      kind,
      selectorSensitivity: sensitivity(item.selectorRankSpread),
      reason: inclusionReason(item, kind, newKind),
      uri: `corpus:///${item.path}`,
      heading: `## Source ${index + 1}: ${item.title}\n\n- Path: \`${item.path}\`\n- Kind: ${kind}\n- Declared status: ${item.status}\n${evidenceLine}- Inclusion: ${inclusionReason(item, kind, newKind)}\n- Retrieval: score ${item.score}; lexical ${item.lexicalScore}; claim ${item.claimScore ?? 0}; semantic ${item.semanticScore ?? 0}; graph ${item.graphScore}; selector sensitivity ${sensitivity(item.selectorRankSpread)} (rank spread ${item.selectorRankSpread})${item.posteriorUtility === null || item.posteriorUtility === undefined ? "" : `; posterior utility ${item.posteriorUtility}; variance ${item.posteriorVariance}; role ${item.selectionRole}`}\n${item.claimMatch ? `- Claim focus: ${item.claimMatch.role} at lines ${item.claimMatch.lineStart}-${item.claimMatch.lineEnd}; identity ${item.claimMatch.claimSha256}\n` : ""}${item.semanticBridge ? `- Cross-reference bridge: ${item.semanticBridge.sourcePath} lines ${item.semanticBridge.lineStart}-${item.semanticBridge.lineEnd}; identity ${item.semanticBridge.bridgeSha256}\n` : ""}\n`,
    };
  });
  const separators = Math.max(0, metadata.length - 1) * 2;
  const fixedCharacters = header.length + footer.length + metadata.reduce((sum, item) => sum + item.heading.length, 0) + separators;
  const perSource = Math.max(256, Math.floor((maxCharacters - fixedCharacters) / Math.max(metadata.length, 1)));
  const queryTerms = terms(search.correctedQuery || task);
  const sources = metadata.map(item => {
    const text = readFileSync(join(corpusRoot, ...item.path.split("/")), "utf8");
    const excerpt = excerptFor(text, queryTerms, perSource);
    const { heading, ...source } = item;
    return { ...source, sourceSha256: sha256(text), excerptSha256: sha256(excerpt), excerpt };
  });
  let context = `${header}${sources.map((item, index) => `${metadata[index].heading}${item.excerpt}`).join("\n\n")}${footer}`;
  if (context.length > maxCharacters) context = `${context.slice(0, maxCharacters - 1).trimEnd()}…`;
  const sourceSetSha256 = sha256(sources.map(source => `${source.path}\0${source.sourceSha256}`).join("\n"));
  return {
    protocol: "spin23-corpus-context/1",
    task: task.trim(),
    profile,
    budget: { maximumCharacters: maxCharacters, usedCharacters: context.length, estimatedTokens: Math.ceil(context.length / 4), maximumSources: maxSources, selectedSources: sources.length },
    query: { corrected: search.correctedQuery, corrections: search.corrections, documentsSearched: search.documents },
    authority: { readOnly: true, entails: false, empiricalAuthority: false, corpusPromotion: false },
    coverage: { sourceKinds: [...new Set(sources.map(source => source.kind))], navigationSuppressedUnlessRequested: true },
    receipt: { contextSha256: sha256(context), sourceSetSha256, selector: { profile, graphWeight, claimWeight, semanticWeight, sweep: search.method.selectorSweep, semanticExpansion: search.method.semanticExpansion, ...(adaptation ? { adaptiveWeight: adaptation.adaptiveWeight, explorationWeight: adaptation.explorationWeight, explorationReserved: adaptation.explorationWeight > 0, beliefStateSha256: adaptation.stateSha256 } : {}) } },
    adaptation: adaptation ? { active: true, stateSha256: adaptation.stateSha256, adaptiveWeight: adaptation.adaptiveWeight, explorationWeight: adaptation.explorationWeight, explorationReserved: adaptation.explorationWeight > 0, learnedSources: Object.keys(adaptation.sources).length } : { active: false },
    sources,
    candidateUniverse,
    candidateUniverseSha256: sha256(candidateUniverse.map(item => `${item.path}\0${item.sourceSha256}\0${item.rank}\0${item.score}`).join("\n")),
    omittedCandidates: followUps,
    context,
  };
}

function parseArguments(argv) {
  const options = {};
  const positional = [];
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--task" || value === "-q") options.task = argv[++index];
    else if (value === "--profile") options.profile = argv[++index];
    else if (value === "--max-sources") options.maxSources = Number(argv[++index]);
    else if (value === "--max-characters") options.maxCharacters = Number(argv[++index]);
    else if (value === "--json") options.json = true;
    else positional.push(value);
  }
  options.task ??= positional.join(" ");
  return options;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const options = parseArguments(process.argv.slice(2));
    const packet = buildCorpusContext(options);
    console.log(options.json ? JSON.stringify(packet, null, 2) : packet.context);
  } catch (error) {
    console.error(error.message);
    console.error("Usage: node tooling/search/context_hub.mjs --task \"Casimir boundary response\" [--profile experiment] [--max-sources 6] [--max-characters 12000] [--json]");
    process.exitCode = 1;
  }
}
