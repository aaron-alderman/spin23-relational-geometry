#!/usr/bin/env node

import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const manifestPath = "reflexive_closure_claimipedia_manifest.json";
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const receiptPath = "reflexive_closure_claimipedia_triage_receipt.json";
const receipt = JSON.parse(readFileSync(receiptPath, "utf8"));
const publicationPath = "frontier_parallel_claimipedia_publication_batch.json";
const publication = JSON.parse(readFileSync(publicationPath, "utf8"));

assert.equal(manifest.protocol, "claimipedia-frontier-claim-candidate-manifest/1");
assert.equal(manifest.date, "2026-10-19");
assert.equal(manifest.claims.length, 43);
assert.equal(new Set(manifest.claims.map((claim) => claim.id)).size, manifest.claims.length);

for (const claim of manifest.claims) {
  assert.ok(manifest.epistemicStates.includes(claim.epistemicState), `bad state ${claim.id}`);
  assert.ok(claim.dependencies.length > 0, `missing dependencies ${claim.id}`);
  assert.ok(claim.falsifier.length > 0, `missing falsifier ${claim.id}`);
  assert.ok(claim.evidence.length > 0, `missing evidence ${claim.id}`);
  for (const path of claim.evidence) assert.ok(existsSync(path), `missing evidence ${path}`);
}

const expectedStates = {
  established: 17,
  conditional: 12,
  indeterminate: 1,
  obstructed: 12,
  interpretive: 1,
};
const states = Object.fromEntries(manifest.epistemicStates.map((state) => [
  state,
  manifest.claims.filter((claim) => claim.epistemicState === state).length,
]));
assert.deepEqual(states, expectedStates);

assert.equal(manifest.review.automaticPromotion, false);
assert.equal(manifest.review.automaticCorpusAdmission, false);
assert.equal(manifest.authority.proposalOnly, true);
assert.equal(manifest.authority.entailsScientificTruth, false);
assert.equal(manifest.authority.entailsTheologicalTruth, false);

assert.equal(receipt.candidateId, "9c8ace41c238ef3482160e618ac393fdd0c3fb4d78fda04783389225bb03619c");
assert.equal(receipt.receipt.candidateCount, 1);
assert.equal(receipt.receipt.validTransformationCount, 7);
assert.deepEqual(receipt.rejectedRoutes.map((route) => route.id), [
  "pure-bf-reconstructs-projector",
  "biblical-election-selects-projector",
]);
assert.equal(receipt.reviewHandoff.automaticCorpusAdmission, false);
assert.equal(receipt.authority.proposalOnly, true);

const packet = publication.packets.find((item) => item.manifest === manifestPath);
assert.ok(packet, "publication packet missing");
assert.equal(packet.status, "composer-reviewed-derived-claim-proposal");
assert.equal(packet.triageReceipt, receiptPath);
assert.equal(publication.latestTriageReceipt, receiptPath);
assert.equal(publication.candidateClaimCount, 161);
assert.equal(publication.syncStatusDocument, "claimipedia_sync_status_2026-10-19.md");
assert.ok(existsSync(publication.syncStatusDocument));

const certificate = spawnSync(process.execPath, ["scripts/verify_reflexive_closure_v1.mjs"], { encoding: "utf8" });
assert.equal(certificate.status, 0, certificate.stderr);
assert.match(certificate.stdout, /PASS/);
for (const path of [
  "scripts/verify_u3_equivariant_memory_no_go.mjs",
  "scripts/verify_first_nonaligning_flavour_potential.mjs",
  "scripts/verify_degree_twelve_cp_orientation.mjs",
  "scripts/classify_degree_eight_two_hermitian_invariants.mjs",
  "scripts/verify_degree_eight_three_family_no_go.mjs",
  "scripts/verify_degree_ten_three_family_no_go.mjs",
  "scripts/verify_cp_even_degree_sixteen_threshold.mjs",
  "scripts/verify_four_moments_equal_double_jordan_frame.mjs",
  "scripts/verify_ordered_frame_equivariant_return_no_go.mjs",
  "scripts/verify_single_link_two_moment_no_go.mjs",
  "scripts/verify_multi_link_isotropic_blindness.mjs",
]) {
  const run = spawnSync(process.execPath, [path], { encoding: "utf8" });
  assert.equal(run.status, 0, run.stderr);
  assert.equal(JSON.parse(run.stdout).passed, true);
}

console.log(JSON.stringify({
  protocol: "reflexive-closure-claimipedia-bundle-verification/1",
  manifest: manifestPath,
  triageReceipt: receiptPath,
  publicationBatch: publicationPath,
  claimCount: manifest.claims.length,
  epistemicStateCounts: states,
  algebraicCertificate: "PASS",
  automaticPromotion: false,
  automaticCorpusAdmission: false,
  passed: true
}, null, 2));

