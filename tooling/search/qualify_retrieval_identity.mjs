#!/usr/bin/env node

import { execFile } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { benchmarkBaseline, runBenchmark } from "./run_benchmark.mjs";

const execFileAsync = promisify(execFile);
const modulePath = fileURLToPath(import.meta.url);
const moduleDirectory = dirname(modulePath);
const root = resolve(moduleDirectory, "../..");
const baselinePath = resolve(moduleDirectory, "benchmark_baseline_v1.json");
const reportPath = resolve(moduleDirectory, "retrieval_identity_qualification_v1.json");

function runLocal(mode, ordinal) {
  const report = runBenchmark({ root, withContext: true });
  const baseline = benchmarkBaseline(report);
  return { mode, ordinal, contentSha256: report.corpusIdentity.contentSha256, evidenceSpineSha256: report.corpusIdentity.evidenceSpineSha256, baselineSha256: baseline.baselineSha256, cases: report.summary.cases, failed: report.summary.failed, meanReciprocalRank: report.summary.meanReciprocalRank };
}

async function runWorker(ordinal) {
  const { stdout } = await execFileAsync(process.execPath, [modulePath, "--worker", String(ordinal)], { cwd: root, maxBuffer: 1024 * 1024 });
  return JSON.parse(stdout);
}

export async function qualifyRetrievalIdentity() {
  const retained = JSON.parse(readFileSync(baselinePath, "utf8"));
  const serial = [runLocal("serial", 1), runLocal("serial", 2)];
  const parallel = await Promise.all([runWorker(1), runWorker(2)]);
  const runs = [...serial, ...parallel];
  const expected = { contentSha256: retained.corpusIdentity.contentSha256, evidenceSpineSha256: retained.corpusIdentity.evidenceSpineSha256, baselineSha256: retained.baselineSha256 };
  const mismatches = runs.filter(run => run.failed !== 0 || run.contentSha256 !== expected.contentSha256 || run.evidenceSpineSha256 !== expected.evidenceSpineSha256 || run.baselineSha256 !== expected.baselineSha256);
  return {
    protocol: "spin23-retrieval-identity-qualification/1",
    qualification: "clean-process repeated serial and parallel benchmark identity",
    expected,
    runs,
    mismatches,
    passed: mismatches.length === 0,
    authority: { navigationQualificationOnly: true, scientificTruthEstablished: false, corpusPromotion: false },
  };
}

if (process.argv.includes("--worker")) {
  const ordinal = Number(process.argv[process.argv.indexOf("--worker") + 1] ?? 0);
  process.stdout.write(`${JSON.stringify(runLocal("parallel-clean-process", ordinal))}\n`);
} else if (process.argv[1] && resolve(process.argv[1]) === modulePath) {
  qualifyRetrievalIdentity().then(report => {
    if (process.argv.includes("--write")) writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    if (!report.passed) process.exitCode = 1;
  }).catch(error => { process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`); process.exitCode = 1; });
}
