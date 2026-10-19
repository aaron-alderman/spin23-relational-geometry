import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const documents = [
  "frontier_parallel_topology_01_source_to_furey_face_intertwiner.md",
  "frontier_parallel_topology_02_represented_calculus_holonomy_fork.md",
  "frontier_parallel_topology_03_research_docket.md",
  "frontier_parallel_topology_04_degree_three_seam_calculus_and_junk.md",
  "frontier_parallel_topology_05_mixed_dga_and_superconnection_stop.md",
];
const certificates = [
  "scripts/classify_frontier_source_to_face_intertwiners.mjs",
  "scripts/classify_frontier_represented_calculus_holonomy.mjs",
  "scripts/compute_frontier_one_seam_degree_three_calculus.mjs",
  "scripts/test_frontier_mixed_dga_and_superconnection_seam.mjs",
];
const manifestPath = "frontier_parallel_topology_claimipedia_manifest.json";

for (const path of [...documents, ...certificates, manifestPath]) assert.ok(existsSync(path), `missing ${path}`);

for (const certificate of certificates) {
  const run = spawnSync(process.execPath, [certificate], { encoding: "utf8" });
  assert.equal(run.status, 0, run.stderr);
  const receipt = JSON.parse(run.stdout);
  assert.equal(receipt.passed, true);
}

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
assert.equal(manifest.protocol, "claimipedia-frontier-claim-candidate-manifest/1");
assert.ok(manifest.claims.length >= 15);
assert.equal(new Set(manifest.claims.map((claim) => claim.id)).size, manifest.claims.length);
for (const claim of manifest.claims) {
  assert.ok(manifest.epistemicStates.includes(claim.epistemicState));
  assert.ok(claim.dependencies.length > 0);
  assert.ok(claim.falsifier.length > 0);
  assert.ok(claim.evidence.length > 0);
  for (const path of claim.evidence) assert.ok(existsSync(path), `missing evidence ${path}`);
}
assert.equal(manifest.review.automaticPromotion, false);
assert.equal(manifest.authority.entailsPhysicalMobiusHolonomy, false);

console.log(JSON.stringify({
  protocol: "frontier-parallel-topology-bundle-verification/1",
  documents,
  certificates,
  claimCount: manifest.claims.length,
  epistemicStateCounts: Object.fromEntries(manifest.epistemicStates.map((state) => [
    state,
    manifest.claims.filter((claim) => claim.epistemicState === state).length,
  ])),
  passed: true,
}, null, 2));
