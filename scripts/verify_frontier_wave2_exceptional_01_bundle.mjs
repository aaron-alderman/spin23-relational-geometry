#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

const root = new URL("../", import.meta.url);
const doc = await readFile(new URL("frontier_wave2_exceptional_01_protected_furey_selector.md", root), "utf8");
const manifest = JSON.parse(await readFile(new URL("frontier_parallel_exceptional_claimipedia_manifest.json", root), "utf8"));

for (const phrase of [
  "Exchange symmetry: exact on one side, impossible on the other",
  "Family algebra: it solves alignment but not normalization",
  "The represented-one-form attempt",
  "The smallest mathematical repair",
  "Radiative protection contract",
]) assert(doc.includes(phrase), `missing documentary section: ${phrase}`);

const run = spawnSync(process.execPath, ["scripts/test_wave2_exceptional_protected_selector.mjs"], {
  cwd: new URL(".", root),
  encoding: "utf8",
});
assert.equal(run.status, 0, run.stderr);
const result = JSON.parse(run.stdout);
assert.equal(result.unitarySeparation.antiTripletExchangePossible, true);
assert.equal(result.unitarySeparation.tripletChargeSeparationPossible, false);
assert.equal(result.familyAlgebra.commutantDimension, 1);
assert.equal(result.familyAlgebra.forcesRelativeHFNormalization, false);
assert.equal(result.representedOneFormCandidate.idempotent, true);
assert.equal(result.representedOneFormCandidate.selfAdjointInCanonicalMetric, false);
assert.equal(result.representedOneFormCandidate.adjointClosureRestoresDanger, true);
assert.equal(result.representedOneFormCandidate.selfAdjointDefectInAdaptedMetric, 0);

const ids = new Set(manifest.claims.map((claim) => claim.id));
for (const id of [
  "EXCEPTIONAL-WAVE2-ANTITRIPLET-EXCHANGE",
  "EXCEPTIONAL-WAVE2-TRIPLET-UNITARY-SEPARATION-NOGO",
  "EXCEPTIONAL-WAVE2-FAMILY-SCALAR-COMMUTANT",
  "EXCEPTIONAL-WAVE2-OBLIQUE-ONEFORM-ADJOINT-OBSTRUCTION",
  "EXCEPTIONAL-WAVE2-ADAPTED-METRIC-INCIDENCE-CANDIDATE",
]) assert(ids.has(id), `missing manifest claim ${id}`);

console.log(JSON.stringify({
  ok: true,
  claimCount: manifest.claims.length,
  familyCommutantDimension: result.familyAlgebra.commutantDimension,
  tripletUnitarySeparation: result.unitarySeparation.tripletChargeSeparationPossible,
  canonicalSelfAdjoint: result.representedOneFormCandidate.selfAdjointInCanonicalMetric,
  adaptedMetricSelfAdjointDefect: result.representedOneFormCandidate.selfAdjointDefectInAdaptedMetric,
}, null, 2));
