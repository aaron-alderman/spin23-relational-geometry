import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { buildSourceryAdmissionCandidate } from "../../tooling/search/generate_sourcery_admission_candidate.mjs";

const retained = JSON.parse(readFileSync(new URL("../../tooling/search/sourcery_admission_candidate_v1.json", import.meta.url), "utf8"));

test("Sourcery admission candidate exactly matches retained local sources and reflected tools", () => {
  const built = buildSourceryAdmissionCandidate();
  assert.deepEqual(retained, built);
  assert.equal(built.tools.length, 10);
  assert.equal(built.members.length, 30);
  assert.equal(built.corpusProjection.documentCount > 2000, true);
  assert.equal(built.corpusProjection.exactPayloadMaterialized, false);
  assert.match(built.corpusProjection.manifestSha256, /^[0-9a-f]{64}$/u);
  assert.equal(built.authorityBoundary.protectedRuntimeSelected, false);
  assert.match(built.candidateSha256, /^[0-9a-f]{64}$/u);
});
