#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

const root = new URL("../", import.meta.url);
const doc = await readFile(new URL("frontier_parallel_exceptional_03_distinct_clebsch_selector.md", root), "utf8");
const manifest = JSON.parse(await readFile(new URL("frontier_parallel_exceptional_claimipedia_manifest.json", root), "utf8"));

for (const phrase of [
  "distinct Clebsches can engineer the seven-channel vector",
  "The family-matrix obstruction",
  "Why the algebraic zero is not symmetry protected",
  "Radiative stability",
]) assert(doc.includes(phrase), `missing documentary result: ${phrase}`);

const run = spawnSync(process.execPath, ["verification/analyze/analyze_exceptional_distinct_clebsch_selector.mjs"], {
  cwd: new URL(".", root),
  encoding: "utf8",
});
assert.equal(run.status, 0, run.stderr);
const result = JSON.parse(run.stdout);
assert.equal(result.algebraicWitness.channels.QQ, 0);
assert.equal(result.algebraicWitness.channels.ucdc, 0);
assert.equal(result.algebraicWitness.preservesRightOrientation, true);
assert.equal(result.flavorObstruction.genericIndependentHFHasNontrivialSelector, false);
assert.equal(result.completeInventory.unitaryBasisChangeCanDeleteAllDangerSources, false);
assert.equal(result.radiativeTest.protectedBySpin10Alone, false);

const requiredClaims = [
  "EXCEPTIONAL-DISTINCT-CLEBSCH-ALGEBRAIC-WITNESS",
  "EXCEPTIONAL-DISTINCT-CLEBSCH-GENERIC-FLAVOR-NOGO",
  "EXCEPTIONAL-120-CANNOT-CANCEL-SYMMETRIC-SOURCES",
  "EXCEPTIONAL-DISTINCT-CLEBSCH-NOT-RADIATIVELY-PROTECTED",
];
const ids = new Set(manifest.claims.map((claim) => claim.id));
for (const id of requiredClaims) assert(ids.has(id), `missing claim ${id}`);

console.log(JSON.stringify({
  ok: true,
  claimCount: manifest.claims.length,
  algebraicWitness: result.algebraicWitness.channels,
  protected: result.radiativeTest.protectedBySpin10Alone,
}, null, 2));
