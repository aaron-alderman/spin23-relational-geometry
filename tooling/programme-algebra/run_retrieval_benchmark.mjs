#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { gunzipSync } from "node:zlib";
import { fileURLToPath } from "node:url";
import { searchCorpus } from "../search/search_corpus.mjs";

const root = resolve(process.cwd());
const here = dirname(fileURLToPath(import.meta.url));
const defaultCasesPath = join(here, "benchmark_cases_v1.json");
const manifestPath = join(root, "corpus", "programmes", "programme-algebra", "generated", "programme_algebra_v1.json");
const stop = new Set(["a", "an", "and", "are", "as", "at", "be", "because", "by", "for", "from", "in", "is", "it", "of", "on", "or", "the", "their", "this", "to", "which", "while", "with"]);
const sha256 = value => createHash("sha256").update(value).digest("hex");
const tokens = value => [...String(value ?? "").normalize("NFKD").toLowerCase().matchAll(/[\p{L}\p{N}]+/gu)].map(match => match[0]).filter(token => token.length > 1 && !stop.has(token));

function add(index, path, value, weight = 1) {
  if (!path || !value) return;
  const entry = index.get(path) ?? new Map();
  for (const token of tokens(typeof value === "string" ? value : JSON.stringify(value))) entry.set(token, (entry.get(token) ?? 0) + weight);
  index.set(path, entry);
}

function tableRows(table) {
  const columns = new Map(table.columns.map((column, index) => [column, index]));
  return table.rows.map(row => Object.fromEntries([...columns].map(([column, index]) => [column, row[index]])));
}

export function buildAlgebraIndex(algebra) {
  const index = new Map();
  const documentPath = new Map();
  const transformationById = new Map(algebra.transformations.map(item => [item.id, item]));
  for (const object of algebra.objects) {
    const path = object.extension?.canonicalPath ?? object.provenance?.sourcePath;
    if (object.profile === "source-document") documentPath.set(object.id, path);
    add(index, path, [object.label, path, object.profile, object.kernel, object.extension?.structuralSummary], 2);
  }
  for (const unit of tableRows(algebra.objectTables.units)) add(index, unit.sourcePath, [unit.label, unit.role, unit.form, unit.status], 1);
  for (const record of tableRows(algebra.objectTables.records)) add(index, record.sourcePath, [record.label, record.keys, record.recordKind, record.semanticProfile, record.adapterId, record.adapterStatus, record.protocol], 2);
  for (const transformation of algebra.transformations) {
    const path = transformation.provenance?.sourcePath;
    add(index, path, [transformation.family, transformation.kind, transformation.changes, transformation.assumptions, transformation.losses, transformation.evidenceRefs, transformation.validation], 3);
  }
  for (const route of algebra.epistemicRouteReceipts) {
    const routeDocuments = new Set([route.from, route.to]);
    for (const stepId of route.steps) {
      const step = transformationById.get(stepId);
      if (step) { routeDocuments.add(step.from); routeDocuments.add(step.to); }
    }
    const labels = [...routeDocuments].map(id => algebra.objects.find(object => object.id === id)?.label ?? id);
    const routeValue = ["composed parent lineage route", labels, route.validation.admitted ? "admitted" : "refused", route.validation.reasons, "assumptions losses evidence", route.ale];
    for (const id of routeDocuments) add(index, documentPath.get(id), routeValue, 4);
  }
  for (const packet of algebra.empiricalReturns) add(index, packet.provenance.sourcePath, ["empirical return preparation intervention detector nuisance model record decision rule", packet.fields, packet.fieldMap, packet.validation], 4);
  return index;
}

function algebraSearch(index, query, limit, sourceKind = null) {
  const queryTokens = [...new Set(tokens(query))];
  const documentFrequency = new Map();
  for (const token of queryTokens) documentFrequency.set(token, [...index.values()].filter(terms => terms.has(token)).length);
  const scored = [];
  for (const [path, terms] of index) {
    if (sourceKind === "machine" && !path.endsWith(".json")) continue;
    if (sourceKind === "prose" && !path.endsWith(".md")) continue;
    let score = 0;
    let matched = 0;
    for (const token of queryTokens) {
      const frequency = terms.get(token) ?? 0;
      if (!frequency) continue;
      matched += 1;
      const idf = Math.log((index.size + 1) / ((documentFrequency.get(token) ?? 0) + 1)) + 1;
      score += idf * (1 + Math.log(frequency));
    }
    if (score > 0) scored.push({ path, score: score * (0.5 + 0.5 * matched / Math.max(queryTokens.length, 1)) });
  }
  return scored.sort((a, b) => b.score - a.score || a.path.localeCompare(b.path)).slice(0, limit).map((item, rank) => ({ rank: rank + 1, ...item }));
}

function fusionSearch(canonical, algebraic, query, limit) {
  const machineIntent = /\b(?:machine|ledger|protocol|record|field|batch|empirical return|common algebra|json)\b/iu.test(query);
  const weights = machineIntent ? { canonical: 0.35, algebra: 0.65 } : { canonical: 0.65, algebra: 0.35 };
  const scores = new Map();
  for (const item of canonical) scores.set(item.path, (scores.get(item.path) ?? 0) + weights.canonical / (20 + item.rank));
  for (const item of algebraic) scores.set(item.path, (scores.get(item.path) ?? 0) + weights.algebra / (20 + item.rank));
  return [...scores].map(([path, score]) => ({ path, score })).sort((a, b) => b.score - a.score || a.path.localeCompare(b.path)).slice(0, limit).map((item, rank) => ({ rank: rank + 1, ...item }));
}

function routedSearch(canonical, algebraic, query, limit, sourceKind = null) {
  const machineIntent = sourceKind ? sourceKind === "machine" : /\b(?:machine|ledger|protocol|record|field|batch|empirical return|common algebra|json|register|audit)\b/iu.test(query);
  const primary = machineIntent ? algebraic : canonical;
  const secondary = machineIntent ? canonical : algebraic;
  const seen = new Set();
  return [...primary, ...secondary].filter(item => {
    if (seen.has(item.path)) return false;
    seen.add(item.path);
    return true;
  }).slice(0, limit).map((item, rank) => ({ rank: rank + 1, path: item.path, sourceLane: primary.includes(item) ? (machineIntent ? "algebra" : "canonical") : (machineIntent ? "canonical" : "algebra") }));
}

const rankOf = (rows, path) => rows.find(item => item.path === path)?.rank ?? null;
const scoreSummary = (rows, key) => ({
  recallAt5: rows.filter(row => row[key] !== null && row[key] <= 5).length / rows.length,
  recallAt10: rows.filter(row => row[key] !== null && row[key] <= 10).length / rows.length,
  meanReciprocalRank: rows.reduce((sum, row) => sum + (row[key] ? 1 / row[key] : 0), 0) / rows.length,
});

export function runProgrammeAlgebraRetrievalBenchmark({ casesPath = defaultCasesPath, limit } = {}) {
  const suite = JSON.parse(readFileSync(casesPath, "utf8"));
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const archivePath = join(dirname(manifestPath), manifest.archive.path);
  if (!existsSync(archivePath)) throw new Error("programme algebra archive missing; run the compiler with --write");
  const archiveBytes = readFileSync(archivePath);
  if (sha256(archiveBytes) !== manifest.archive.compressedSha256) throw new Error("programme algebra archive hash mismatch");
  const algebra = JSON.parse(gunzipSync(archiveBytes));
  const index = buildAlgebraIndex(algebra);
  const effectiveLimit = limit ?? suite.defaults?.limit ?? 20;
  const cases = suite.cases.map(testCase => {
    const canonical = (testCase.sourceKind === "machine" ? [] : searchCorpus({ root, query: testCase.query, profile: "all", limit: effectiveLimit }).results).map(item => ({ rank: item.rank, path: item.path, score: item.score }));
    const algebraic = algebraSearch(index, testCase.query, effectiveLimit, testCase.sourceKind ?? null);
    const fusion = fusionSearch(canonical, algebraic, testCase.query, effectiveLimit);
    const routed = routedSearch(canonical, algebraic, testCase.query, effectiveLimit, testCase.sourceKind ?? null);
    return {
      ...testCase,
      canonicalRank: rankOf(canonical, testCase.expectedSource),
      algebraRank: rankOf(algebraic, testCase.expectedSource),
      fusionRank: rankOf(fusion, testCase.expectedSource),
      routedRank: rankOf(routed, testCase.expectedSource),
      movement: (rankOf(canonical, testCase.expectedSource) ?? effectiveLimit + 1) - (rankOf(algebraic, testCase.expectedSource) ?? effectiveLimit + 1),
      canonicalTop5: canonical.slice(0, 5).map(item => item.path),
      algebraTop5: algebraic.slice(0, 5).map(item => item.path),
      fusionTop5: fusion.slice(0, 5).map(item => item.path),
      routedTop5: routed.slice(0, 5).map(item => item.path),
    };
  });
  const summaries = {};
  for (const split of ["all", "calibration", "holdout", "validation", "faceted-validation"]) {
    const rows = split === "all" ? cases : cases.filter(item => item.split === split);
    summaries[split] = { cases: rows.length, canonical: scoreSummary(rows, "canonicalRank"), algebra: scoreSummary(rows, "algebraRank"), fusion: scoreSummary(rows, "fusionRank"), routed: scoreSummary(rows, "routedRank") };
  }
  const gates = {
    holdoutRecallAt10NonRegressing: summaries.holdout.algebra.recallAt10 >= summaries.holdout.canonical.recallAt10,
    holdoutMrrNonRegressing: summaries.holdout.algebra.meanReciprocalRank >= summaries.holdout.canonical.meanReciprocalRank,
    machineOnlyHoldoutRecovered: cases.filter(item => item.split === "holdout" && item.expectedSource.endsWith(".json")).every(item => item.algebraRank !== null),
    atLeastOneHeldOutImprovement: cases.some(item => item.split === "holdout" && item.movement > 0),
    routedValidationRecallAt10AtLeastBestLane: summaries.validation.routed.recallAt10 >= Math.max(summaries.validation.canonical.recallAt10, summaries.validation.algebra.recallAt10),
    routedValidationMrrNonRegressing: summaries.validation.routed.meanReciprocalRank >= Math.max(summaries.validation.canonical.meanReciprocalRank, summaries.validation.algebra.meanReciprocalRank),
    routedValidationMarkdownNonRegressing: cases.filter(item => item.split === "validation" && item.expectedSource.endsWith(".md")).every(item => item.routedRank !== null && item.routedRank <= item.canonicalRank),
    routedValidationMachineRecoveredAt10: cases.filter(item => item.split === "validation" && !item.expectedSource.endsWith(".md")).every(item => item.routedRank !== null && item.routedRank <= 10),
    facetedValidationRecallAt10Complete: summaries["faceted-validation"].routed.recallAt10 === 1,
    facetedValidationMrrAtLeastBestLane: summaries["faceted-validation"].routed.meanReciprocalRank >= Math.max(summaries["faceted-validation"].canonical.meanReciprocalRank, summaries["faceted-validation"].algebra.meanReciprocalRank),
    facetedValidationKindRespected: cases.filter(item => item.split === "faceted-validation").every(item => item.routedTop5.every(path => item.sourceKind === "machine" ? path.endsWith(".json") : path.endsWith(".md"))),
  };
  return {
    protocol: "spin23-programme-algebra-retrieval-comparison/1",
    generatedAt: "2026-10-26T00:00:00.000Z",
    authorityBoundary: suite.authorityBoundary,
    suite: { path: "tooling/programme-algebra/benchmark_cases_v1.json", sha256: sha256(readFileSync(casesPath)), cases: suite.cases.length },
    corpusDigest: algebra.sources.corpus.digest,
    algebraArchiveSha256: manifest.archive.compressedSha256,
    controls: { canonical: "existing Markdown lexical/claim/semantic/graph search", algebra: "hash-bound document, unit, record, transformation, route and empirical-return projection", fusion: "discarded intent-weighted reciprocal-rank fusion control", routed: "keyword intent routing for the first validation stratum; explicit machine/prose source-kind selection for the later faceted-validation stratum", limit: effectiveLimit },
    diagnostics: {
      naiveFusionHoldoutPassed: summaries.holdout.fusion.recallAt10 >= Math.max(summaries.holdout.canonical.recallAt10, summaries.holdout.algebra.recallAt10)
        && summaries.holdout.fusion.meanReciprocalRank >= summaries.holdout.canonical.meanReciprocalRank,
      interpretation: "The failed fusion and keyword-router controls remain visible. The later typed-facet result tests a different, explicit interface and cannot retroactively qualify either failed design."
    },
    summary: summaries,
    gates,
    qualified: Object.values(gates).every(Boolean),
    cases,
  };
}

function metric(value) { return Number(value).toFixed(3); }
function renderMarkdown(report) {
  const rows = report.cases.map(item => `| ${item.split} | ${item.id} | ${item.canonicalRank ?? "—"} | ${item.algebraRank ?? "—"} | ${item.fusionRank ?? "—"} | ${item.routedRank ?? "—"} |`).join("\n");
  const summaries = ["calibration", "holdout", "validation", "faceted-validation"].map(split => {
    const value = report.summary[split];
    return `| ${split} | ${value.cases} | ${metric(value.canonical.recallAt10)} / ${metric(value.canonical.meanReciprocalRank)} | ${metric(value.algebra.recallAt10)} / ${metric(value.algebra.meanReciprocalRank)} | ${metric(value.fusion.recallAt10)} / ${metric(value.fusion.meanReciprocalRank)} | ${metric(value.routed.recallAt10)} / ${metric(value.routed.meanReciprocalRank)} |`;
  }).join("\n");
  const failed = Object.entries(report.gates).filter(([, passed]) => !passed).map(([gate]) => `- \`${gate}\``).join("\n") || "- None";
  const facet = report.summary["faceted-validation"];
  return `# Programme Algebra Retrieval Benchmark

**Generated:** 26 October 2026

**Replacement verdict:** **OPEN — benchmark not qualified**

## Outcome

The algebraic projection materially widens retrieval: on the original holdout it raises Recall@10 from **${metric(report.summary.holdout.canonical.recallAt10)}** to **${metric(report.summary.holdout.algebra.recallAt10)}** and MRR from **${metric(report.summary.holdout.canonical.meanReciprocalRank)}** to **${metric(report.summary.holdout.algebra.meanReciprocalRank)}**, principally by recovering JSON ledgers, transformation sources and empirical-return records absent from Markdown search. It is not a drop-in replacement: algebra-only ranking worsens the prose lineage cases, naive score fusion fails, and the keyword intent router does not pass its separately frozen validation stratum.

The later, separately frozen typed-facet candidate scores Recall@10 **${metric(facet.routed.recallAt10)}** and MRR **${metric(facet.routed.meanReciprocalRank)}**. This is evidence about an explicit source-kind interface, not permission to erase the failed router result or replace canonical retrieval.

## Metrics

Each cell is Recall@10 / mean reciprocal rank.

| Split | Cases | Canonical | Algebra | Naive fusion | Routed |
|---|---:|---:|---:|---:|---:|
${summaries}

## Case ledger

| Split | Case | Canonical rank | Algebra rank | Fusion rank | Routed rank |
|---|---|---:|---:|---:|---:|
${rows}

## Failed replacement gates

${failed}

## Implications

1. **Keep both indices.** Canonical Markdown search remains better for ordinary prose and exact conceptual destinations.
2. **Use algebra for source classes the current index cannot see.** JSON records, empirical packets, explicit refusals and transformation-family sources are the demonstrated gain.
3. **Do not average scores blindly.** The retained fusion control buries machine sources without reliably improving prose.
4. **Do not infer output lane from broad keywords alone.** “Protocol” can name a prose research document as easily as a machine schema.
5. **Treat source kind as an explicit selector.** The typed facet is a user- or query-planner declaration, not a semantic fact inferred from loose vocabulary.
6. **Next gate:** test typed facets on a larger untouched query set, then compare reasoning answers and provenance—not retrieval alone—before considering replacement.

## Authority boundary

${report.authorityBoundary}

- Corpus digest: \`${report.corpusDigest}\`
- Algebra archive: \`${report.algebraArchiveSha256}\`
- Suite: \`${report.suite.sha256}\`
`;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const outputIndex = process.argv.indexOf("--out");
  const reportIndex = process.argv.indexOf("--report");
  const report = runProgrammeAlgebraRetrievalBenchmark();
  const rendered = `${JSON.stringify(report, null, 2)}\n`;
  if (outputIndex >= 0) {
    const output = resolve(process.argv[outputIndex + 1]);
    mkdirSync(dirname(output), { recursive: true });
    writeFileSync(output, rendered);
    process.stdout.write(`${output}\n`);
  } else process.stdout.write(rendered);
  if (reportIndex >= 0) {
    const output = resolve(process.argv[reportIndex + 1]);
    mkdirSync(dirname(output), { recursive: true });
    writeFileSync(output, renderMarkdown(report), "utf8");
    process.stdout.write(`${output}\n`);
  }
  if (!report.qualified) process.exitCode = 1;
}
