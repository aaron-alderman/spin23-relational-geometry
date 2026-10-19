#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

const root = new URL("../", import.meta.url);
const doc = await readFile(new URL("frontier_wave4_topology_01_cross_carrier_module_audit.md", root), "utf8");
const manifest = JSON.parse(await readFile(new URL("frontier_parallel_topology_claimipedia_manifest.json", root), "utf8"));

for (const phrase of [
  "Typed target",
  "Peirce/Jordan candidate",
  "Ribbon and three-relationship candidate",
  "Golay and lattice candidates",
  "\\(Spin(2,3)\\) candidate",
  "Cross-carrier theorem",
  "First missing datum",
  "Final classification",
]) assert(doc.includes(phrase), `missing section: ${phrase}`);

const run = spawnSync(process.execPath, ["verification/analyze/analyze_frontier_wave4_topology_cross_carrier.mjs"], {
  cwd: new URL(".", root), encoding: "utf8",
});
assert.equal(run.status, 0, run.stderr);
const x = JSON.parse(run.stdout);
assert.equal(x.peirce.realDimension, 3);
assert.equal(x.peirce.endomorphismCommutantDimension, 2);
assert.equal(x.peirce.maximumEquivariantRankToTrivialMediator, 1);
assert.equal(x.ribbonAndContrast.endomorphismCommutantDimension, 2);
assert.equal(x.ribbonAndContrast.maximumEquivariantRankToTrivialMediator, 1);
assert.equal(x.ribbonAndContrast.nonScalarInvariantGramExists, true);
assert.equal(x.golayAndLattice.canonicalRealPositiveThreeModule, false);
assert.equal(x.spin23.nontrivialThreeDimensionalLinearRepresentation, false);
assert.equal(x.spin23.definingVectorInvariantDimension, 0);
assert.equal(x.spin23.h2SectionOrbitDimension, 6);

const ids = new Set(manifest.claims.map((claim) => claim.id));
for (const id of [
  "spin23.topology.W4C-01",
  "spin23.topology.W4C-02",
  "spin23.topology.W4C-03",
  "spin23.topology.W4C-04",
  "spin23.topology.W4C-05",
]) assert(ids.has(id), `missing manifest claim ${id}`);

console.log(JSON.stringify({
  ok: true,
  claimCount: manifest.claims.length,
  peirceHomRank: x.peirce.maximumEquivariantRankToTrivialMediator,
  ribbonCommutantDimension: x.ribbonAndContrast.endomorphismCommutantDimension,
  spin23ThreeModule: x.spin23.nontrivialThreeDimensionalLinearRepresentation,
  firstMissingDatum: x.verdict.firstMissingDatum,
}, null, 2));
