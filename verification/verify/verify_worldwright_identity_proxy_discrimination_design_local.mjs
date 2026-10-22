#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const evidencePath = resolve(root, "evidence/data/worldwright-identity-proxy-discrimination-design-local-v1.json");
const harnessPath = resolve(root, "verification/experiments/design_worldwright_identity_proxy_discrimination.mjs");
const evidence = JSON.parse(await readFile(evidencePath, "utf8"));
const run = spawnSync(process.execPath, [harnessPath], { encoding: "utf8" });

assert.equal(run.status, 0, `${run.stdout}\n${run.stderr}`);
assert.deepEqual(JSON.parse(run.stdout), evidence, "checked-in evidence differs from deterministic design output");
assert.equal(evidence.schema, "worldwright.identity-proxy-discrimination-design.local/1");
assert.equal(evidence.exactRepeat, true);
assert.match(evidence.designHash, /^sha256:[0-9a-f]{64}$/);
assert.equal(evidence.source.fileSha256, createHash("sha256")
  .update((await readFile(resolve(root, "evidence/data/worldwright-identity-functional-form-robustness-local-v1.json"), "utf8")).replace(/\r\n/g, "\n"))
  .digest("hex"));

const screens = evidence.design.candidateIntermediateLevels;
assert.deepEqual(screens.map(screen => screen.salience), [0.25, 0.5, 0.75]);
assert.deepEqual(screens.map(screen => screen.distinctSignatures), [5, 5, 6]);
assert.deepEqual(screens.map(screen => screen.separablePairs), [14, 14, 15]);
assert.equal(screens[2].minimumPairwiseGapCells, 6);
assert.equal(evidence.design.recommendedCore.primaryDiscriminationLevel, 0.75);
assert.equal(evidence.design.recommendedCore.curvatureReplicationLevel, 0.25);
assert.deepEqual(evidence.design.resolutionPlanning.map(item => item.conservativeIndependentBinomialNPerArm), [328, 545, 1785, 16057, 21855]);
assert.equal(evidence.falsificationRules.length, 4);
assert.ok(Object.values(evidence.authority).every(value => value === false));

console.log("Worldwright identity proxy discrimination design: PASS");
console.log("  salience 0.75 separates 15/15 law pairs; closest gap is 6/640 classifications");
console.log("  staged empirical gate specified; no empirical or policy authority granted");
