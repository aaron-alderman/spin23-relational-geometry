#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

const root = new URL("../", import.meta.url);
const doc = await readFile(new URL("frontier_wave3_uv_01_anomaly_completion_orientation_no_go.md", root), "utf8");
const manifest = JSON.parse(await readFile(new URL("frontier_parallel_exceptional_claimipedia_manifest.json", root), "utf8"));

for (const phrase of [
  "Smallest completion audit",
  "Local anomalies",
  "Global anomalies",
  "Orientation-blindness theorem",
  "Counterterm and threshold dichotomy",
  "Larger finite triple",
  "Smallest way to reopen the branch",
]) assert(doc.includes(phrase), `missing section: ${phrase}`);

const run = spawnSync(process.execPath, ["verification/analyze/analyze_frontier_wave3_uv_completion.mjs"], {
  cwd: new URL(".", root),
  encoding: "utf8",
});
assert.equal(run.status, 0, run.stderr);
const result = JSON.parse(run.stdout);
assert.equal(result.localAnomalies.deduplicated.xCubed, 1131);
assert.equal(result.localAnomalies.multiplicity.xCubed, 1157);
assert.equal(result.minimalLocalEftCompletion.admitsBothRays, true);
assert.equal(result.minimalLocalEftCompletion.physicalAlpRemainingWithOnePhase, false);
assert.equal(result.globalAudit.parity, 0);
assert.equal(result.orientationBlindness.sameInvariantData, true);
assert.equal(result.countertermDichotomy.unsplitNeutralModulusAllowsMisalignment, true);
assert.equal(result.countertermDichotomy.splitCharacterProtectsSuppliedProjector, true);
assert.equal(result.countertermDichotomy.protectedThresholdCrossPropagator, 0);
assert.notEqual(result.countertermDichotomy.genericThresholdCrossPropagator, 0);

const ids = new Set(manifest.claims.map((claim) => claim.id));
for (const id of [
  "EXCEPTIONAL-WAVE3-BOTH-RAYS-LOCAL-ANOMALOUS",
  "EXCEPTIONAL-WAVE3-GS-PAIRED-COMPLETION",
  "EXCEPTIONAL-WAVE3-ANOMALY-ORIENTATION-BLINDNESS",
  "EXCEPTIONAL-WAVE3-SINGLE-SPURION-DICHOTOMY",
  "EXCEPTIONAL-WAVE3-FINITE-TRIPLE-RELATIVE-EMBEDDING-BOUNDARY",
]) assert(ids.has(id), `missing claim ${id}`);

console.log(JSON.stringify({
  ok: true,
  claimCount: manifest.claims.length,
  anomalies: result.localAnomalies,
  projectorOrbit: result.orientationBlindness.projectorOrbit,
  pairedCompletion: result.minimalLocalEftCompletion.admitsBothRays,
}, null, 2));
