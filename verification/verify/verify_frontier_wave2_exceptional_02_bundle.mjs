#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

const root = new URL("../", import.meta.url);
const doc = await readFile(new URL("frontier_wave2_exceptional_02_minimal_finite_superselection_boundary.md", root), "utf8");
const manifest = JSON.parse(await readFile(new URL("frontier_parallel_exceptional_claimipedia_manifest.json", root), "utf8"));

for (const phrase of [
  "Algebra, representation, reality and grading",
  "Protected branch",
  "Mixing branch",
  "Junk quotient",
  "Superselection theorem",
  "Why the label is arbitrary",
]) assert(doc.includes(phrase), "missing section: " + phrase);

const run = spawnSync(process.execPath, ["verification/construct/construct_wave2_exceptional_minimal_finite_triple.mjs"], {
  cwd: new URL(".", root),
  encoding: "utf8",
});
assert.equal(run.status, 0, run.stderr);
const result = JSON.parse(run.stdout);
assert.equal(result.representation.pSelfAdjointDefect, 0);
assert.equal(result.realEvenTriple.KOConvention, 6);
assert.equal(result.protectedBranch.firstOrderDefect, 0);
assert.equal(result.protectedBranch.representedOneFormDimension, 0);
assert.equal(result.protectedBranch.thresholdCrossPropagator, 0);
assert(result.mixingBranch.firstOrderDefect > 0);
assert.equal(result.mixingBranch.representedOneFormDimension, 2);
assert.equal(result.mixingBranch.degreeOneJunkDimension, 0);
assert.notEqual(result.mixingBranch.thresholdCrossPropagator, 0);

const ids = new Set(manifest.claims.map((claim) => claim.id));
for (const id of [
  "EXCEPTIONAL-WAVE2-MINIMAL-REAL-EVEN-SELECTOR",
  "EXCEPTIONAL-WAVE2-PROTECTION-DIFFERENTIAL-DICHOTOMY",
  "EXCEPTIONAL-WAVE2-SUPERSELECTION-ORIENTATION-BOUNDARY",
  "EXCEPTIONAL-WAVE2-TENSORED-SELECTOR-COMPLETION",
]) assert(ids.has(id), "missing claim " + id);

console.log(JSON.stringify({
  ok: true,
  claimCount: manifest.claims.length,
  protectedOneForms: result.protectedBranch.representedOneFormDimension,
  mixedOneForms: result.mixingBranch.representedOneFormDimension,
  degreeOneJunk: result.mixingBranch.degreeOneJunkDimension,
  projectorEmbedding: result.representation.abstractEmbeddingModuli,
}, null, 2));
