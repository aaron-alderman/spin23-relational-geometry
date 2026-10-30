import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { buildCorpusProjectionManifest } from "../../tooling/search/generate_corpus_projection_manifest.mjs";

const retained = JSON.parse(readFileSync(new URL("../../tooling/search/corpus_projection_manifest_v1.json", import.meta.url), "utf8"));

test("corpus projection manifest binds every indexed object and exact retrieval identity", () => {
  const built = buildCorpusProjectionManifest();
  assert.deepEqual(retained, built);
  assert.equal(built.objects.length, built.documentCount);
  assert.equal(new Set(built.objects.map(item => item.path)).size, built.documentCount);
  assert.equal(built.objects.every(item => /^[0-9a-f]{64}$/u.test(item.sha256)), true);
  assert.equal(built.materializationContract.grantsAdmissionAuthority, false);
  assert.match(built.manifestSha256, /^[0-9a-f]{64}$/u);
});
