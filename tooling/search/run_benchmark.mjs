#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { searchCorpus } from "./search_corpus.mjs";
import { buildCorpusContext } from "./context_hub.mjs";

const moduleDirectory = dirname(fileURLToPath(import.meta.url));
const defaultRoot = resolve(moduleDirectory, "../..");
const defaultCases = resolve(moduleDirectory, "benchmark_cases.json");
const defaultBaseline = resolve(moduleDirectory, "benchmark_baseline_v1.json");
const sha256 = value => createHash("sha256").update(value).digest("hex");

export function runBenchmark({ root = defaultRoot, casesPath = defaultCases, withContext = true } = {}) {
  const suite = JSON.parse(readFileSync(casesPath, "utf8"));
  if (suite.schema !== "spin23-corpus-retrieval-benchmark/v1" || !Array.isArray(suite.cases) || suite.cases.length < 1) throw new Error("A valid retrieval benchmark suite is required");
  const started = performance.now();
  let corpusContentSha256 = null;
  let evidenceSpineSha256 = null;
  const cases = suite.cases.map(item => {
    const before = performance.now();
    const result = searchCorpus({ root, query: item.query, profile: item.profile ?? "all", limit: item.limit ?? suite.defaults?.limit ?? 10 });
    corpusContentSha256 ??= result.corpusContentSha256;
    evidenceSpineSha256 ??= result.evidenceSpineSha256;
    const paths = result.results.map(entry => entry.path);
    const required = item.mustFind ?? [];
    const missing = required.filter(path => !paths.includes(path));
    const firstRelevantRank = required.map(path => paths.indexOf(path) + 1).filter(rank => rank > 0).sort((a, b) => a - b)[0] ?? null;
    const forbidden = (item.mustNotTop ?? []).filter(path => paths.slice(0, 3).includes(path));
    const correctionPassed = !item.expectedCorrection || result.corrections.some(correction => correction.from === item.expectedCorrection.from && correction.to === item.expectedCorrection.to);
    let context = null;
    if (withContext && item.context) {
      const packet = buildCorpusContext({ root, task: item.query, profile: item.profile ?? "all", maxSources: 5, maxCharacters: 6000 });
      context = {
        sourceKinds: packet.coverage.sourceKinds,
        minimumKinds: item.context.minimumKinds ?? 1,
        passed: packet.coverage.sourceKinds.length >= (item.context.minimumKinds ?? 1),
        receipt: packet.receipt.contextSha256,
      };
    }
    const passed = missing.length === 0 && forbidden.length === 0 && correctionPassed && (context?.passed ?? true);
    return {
      id: item.id,
      lane: item.lane,
      query: item.query,
      profile: item.profile ?? "all",
      passed,
      firstRelevantRank,
      reciprocalRank: firstRelevantRank ? Number((1 / firstRelevantRank).toFixed(6)) : 0,
      missing,
      forbidden,
      correctionPassed,
      context,
      topResults: result.results.slice(0, 5).map(entry => ({ rank: entry.rank, path: entry.path, status: entry.status })),
      durationMs: Number((performance.now() - before).toFixed(3)),
    };
  });
  const lanes = Object.fromEntries([...new Set(cases.map(item => item.lane))].sort().map(lane => {
    const members = cases.filter(item => item.lane === lane);
    return [lane, { cases: members.length, passed: members.filter(item => item.passed).length }];
  }));
  const report = {
    schema: "spin23-corpus-retrieval-benchmark-report/v1",
    suite: suite.schema,
    authorityBoundary: suite.authorityBoundary,
    corpusIdentity: { contentSha256: corpusContentSha256, evidenceSpineSha256 },
    summary: {
      cases: cases.length,
      passed: cases.filter(item => item.passed).length,
      failed: cases.filter(item => !item.passed).length,
      passRate: Number((cases.filter(item => item.passed).length / cases.length).toFixed(6)),
      meanReciprocalRank: Number((cases.reduce((sum, item) => sum + item.reciprocalRank, 0) / cases.length).toFixed(6)),
      correctionCases: cases.filter(item => item.query.includes("casmir") || item.query.includes("nearnst")).length,
      contextCases: cases.filter(item => item.context).length,
      durationMs: Number((performance.now() - started).toFixed(3)),
    },
    lanes,
    cases,
  };
  return report;
}

export function benchmarkBaseline(report, casesPath = defaultCases) {
  const payload = {
    schema: "spin23-corpus-retrieval-benchmark-baseline/v1",
    suiteSha256: sha256(readFileSync(casesPath)),
    authorityBoundary: report.authorityBoundary,
    corpusIdentity: report.corpusIdentity,
    summary: Object.fromEntries(Object.entries(report.summary).filter(([key]) => key !== "durationMs")),
    lanes: report.lanes,
    cases: report.cases.map(item => ({
      id: item.id,
      lane: item.lane,
      profile: item.profile,
      passed: item.passed,
      firstRelevantRank: item.firstRelevantRank,
      reciprocalRank: item.reciprocalRank,
      correctionPassed: item.correctionPassed,
      context: item.context ? { sourceKinds: item.context.sourceKinds, minimumKinds: item.context.minimumKinds, passed: item.context.passed } : null,
      topResults: item.topResults,
    })),
  };
  return { ...payload, baselineSha256: sha256(JSON.stringify(payload)) };
}

function render(report) {
  const failures = report.cases.filter(item => !item.passed).map(item => `- ${item.id}: missing=${item.missing.join(",") || "none"}; forbidden=${item.forbidden.join(",") || "none"}; correction=${item.correctionPassed}; context=${item.context?.passed ?? "n/a"}`);
  return `Corpus retrieval benchmark\n${report.summary.passed}/${report.summary.cases} passed · MRR=${report.summary.meanReciprocalRank} · ${report.summary.durationMs} ms\nLanes: ${Object.entries(report.lanes).map(([lane, value]) => `${lane} ${value.passed}/${value.cases}`).join("; ")}\n${failures.length ? `\nFailures:\n${failures.join("\n")}` : "\nAll cases passed."}`;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const json = process.argv.includes("--json");
  const write = process.argv.includes("--write");
  const withoutContext = process.argv.includes("--without-context");
  try {
    const report = runBenchmark({ withContext: !withoutContext });
    if (write) {
      const baseline = benchmarkBaseline(report);
      writeFileSync(defaultBaseline, `${JSON.stringify(baseline, null, 2)}\n`);
      console.log(`Wrote tooling/search/benchmark_baseline_v1.json ${baseline.baselineSha256}`);
    } else console.log(json ? JSON.stringify(report, null, 2) : render(report));
    if (report.summary.failed) process.exitCode = 1;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
