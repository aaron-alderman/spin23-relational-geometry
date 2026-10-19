#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

const root = new URL("../", import.meta.url);
const doc = await readFile(new URL("frontier_parallel_exceptional_02_z9_threshold_and_seven_nine_mask.md", root), "utf8");
const manifest = JSON.parse(await readFile(new URL("frontier_parallel_exceptional_claimipedia_manifest.json", root), "utf8"));

for (const required of [
  "mixing selector, not a vertex selector",
  "No single charge for the same exceptional singlet",
  "Scope of “complete inventory”",
  "do not cite baryon triality as the reason",
]) {
  assert(doc.includes(required), `missing documentary result: ${required}`);
}

const ids = new Set(manifest.claims.map((claim) => claim.id));
assert.equal(ids.size, manifest.claims.length, "claim ids must be unique");
for (const id of [
  "EXCEPTIONAL-RANK1-NONSELECTOR",
  "EXCEPTIONAL-Z9-NINE-VERTEX-NEUTRALITY",
  "EXCEPTIONAL-Z9-NOT-SEVEN-NINE-SELECTOR",
  "EXCEPTIONAL-Z9-BLOCK-PROTECTION",
  "EXCEPTIONAL-Z9-MINIMAL-CUBIC-INCOMPATIBILITY",
]) {
  assert(ids.has(id), `missing claim ${id}`);
}

for (const claim of manifest.claims) {
  assert(Array.isArray(claim.dependencies));
  assert(Array.isArray(claim.falsifiers) && claim.falsifiers.length > 0);
  assert(Array.isArray(claim.evidenceFiles) && claim.evidenceFiles.length > 0);
}

const certificate = spawnSync(process.execPath, ["scripts/test_exceptional_z9_heavy_threshold_and_seven_nine_mask.mjs"], {
  cwd: new URL(".", root),
  encoding: "utf8",
});
assert.equal(certificate.status, 0, certificate.stderr);
const result = JSON.parse(certificate.stdout);
assert.equal(result.sevenVersusNine.neutralVertexCount, 9);
assert.equal(result.sevenVersusNine.z9DeletesExcludedDiquarkVertices, false);
assert.equal(result.singletScan.some((row) => row.allows_complete_x_10_10), false);

console.log(JSON.stringify({
  ok: true,
  claims: manifest.claims.length,
  neutralVertices: result.sevenVersusNine.neutralVertexCount,
  completeSingletSolutions: result.singletScan.filter((row) => row.allows_complete_x_10_10).length,
}, null, 2));
