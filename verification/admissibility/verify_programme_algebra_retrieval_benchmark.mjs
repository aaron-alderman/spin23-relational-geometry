#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.cwd());
const readJson = path => JSON.parse(readFileSync(resolve(root, path), "utf8"));
const sha256 = value => createHash("sha256").update(value).digest("hex");
const report = readJson("corpus/programmes/programme-algebra/generated/PROGRAMME_ALGEBRA_RETRIEVAL_BENCHMARK.json");
const manifest = readJson("corpus/programmes/programme-algebra/generated/programme_algebra_v1.json");
const suiteBytes = readFileSync(resolve(root, report.suite.path));
const failures = [];

if (report.protocol !== "spin23-programme-algebra-retrieval-comparison/1") failures.push("protocol mismatch");
if (report.suite.cases !== 24 || report.cases.length !== 24) failures.push("expected twenty-four preregistered cases");
if (sha256(suiteBytes) !== report.suite.sha256) failures.push("benchmark suite hash mismatch");
if (report.corpusDigest !== manifest.sources.corpus.digest) failures.push("corpus digest mismatch");
if (report.algebraArchiveSha256 !== manifest.archive.compressedSha256) failures.push("algebra archive mismatch");
for (const split of ["calibration", "holdout", "validation", "faceted-validation"]) if (report.cases.filter(item => item.split === split).length !== 6) failures.push(`${split} does not contain six cases`);
if (report.summary.holdout.algebra.recallAt10 <= report.summary.holdout.canonical.recallAt10) failures.push("algebra does not widen held-out Recall@10");
if (report.summary.holdout.algebra.meanReciprocalRank <= report.summary.holdout.canonical.meanReciprocalRank) failures.push("algebra does not improve held-out MRR");
if (report.diagnostics.naiveFusionHoldoutPassed !== false) failures.push("failed fusion control was not retained");
if (report.qualified !== false) failures.push("replacement benchmark must remain open after validation failure");
if (Object.values(report.gates).every(Boolean)) failures.push("validation failure boundary disappeared");
if (!Object.hasOwn(report.gates, "facetedValidationRecallAt10Complete")) failures.push("typed-facet candidate gate missing");
if (!report.cases.filter(item => item.split === "faceted-validation").every(item => ["machine", "prose"].includes(item.sourceKind))) failures.push("typed-facet cases lack an explicit source kind");
if (!/navigation and structural recovery only/iu.test(report.authorityBoundary)) failures.push("authority boundary missing");

console.log(JSON.stringify({
  protocol: "verify-spin23-programme-algebra-retrieval-benchmark/1",
  passed: failures.length === 0,
  failures,
  qualified: report.qualified,
  summary: report.summary,
  gates: report.gates,
}, null, 2));
if (failures.length) process.exitCode = 1;
