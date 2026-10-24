import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { benchmarkBaseline, runBenchmark } from "../../tooling/search/run_benchmark.mjs";

const root = new URL("../../", import.meta.url);

test("governed retrieval benchmark spans thirty cases and passes its declared expectations", () => {
  const report = runBenchmark({ root, withContext: true });
  assert.equal(report.summary.cases, 30);
  assert.equal(report.summary.failed, 0);
  assert.equal(report.summary.passRate, 1);
  assert.ok(report.summary.meanReciprocalRank >= 0.8);
  assert.ok(Object.keys(report.lanes).length >= 8);
  assert.equal(report.summary.correctionCases, 2);
  assert.ok(report.summary.contextCases >= 5);
  assert.match(report.corpusIdentity.contentSha256, /^[0-9a-f]{64}$/u);
  const retained = JSON.parse(readFileSync(new URL("../../tooling/search/benchmark_baseline_v1.json", import.meta.url), "utf8"));
  assert.deepEqual(retained, benchmarkBaseline(report));
});
