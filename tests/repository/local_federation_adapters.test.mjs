import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { adaptLocalFederationResult, createLocalFederatedContext } from "../../tooling/search/local_federation_adapters.mjs";

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), "spin23-federation-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, "corpus", "claims"), { recursive: true });
  mkdirSync(join(root, "book", "edition-3", "chapters"), { recursive: true });
  writeFileSync(join(root, "corpus", "claims", "one.md"), "# One\n\nCanonical statement.\n");
  writeFileSync(join(root, "book", "edition-3", "chapters", "one.md"), "# Reading surface\n\n[Source](../../../corpus/claims/one.md)\n");
  return root;
}
const result = (path, score) => ({ path, score, title: path, status: "qualified", snippet: "bounded", retrievalSupport: { class: "direct-passage" } });

test("local federation pins exact canonical and publication bytes and preserves authored crossings", t => {
  const root = fixture(t);
  const search = () => ({ query: "one", profile: "all", corpusContentSha256: "c".repeat(64), evidenceSpineSha256: "e".repeat(64), results: [result("book/edition-3/chapters/one.md", 5), result("corpus/claims/one.md", 4)] });
  const packet = createLocalFederatedContext({ root, query: "one", search, perLaneLimit: 2 });
  assert.deepEqual(packet.sources.map(source => source.lane), ["canonical-corpus", "publication"]);
  assert.equal(packet.sources[1].relation.kind, "authored-link");
  assert.equal(packet.sources[1].relation.target, "corpus/claims/one.md");
  assert.match(packet.sources[0].contentSha256, /^[0-9a-f]{64}$/u);
  assert.equal(packet.authority.crossLanePromotion, false);
  assert.equal(packet.adapters.publication.authority, "reading surface only");
});

test("local federation rejects missing and non-canonical source identities and ignores undeclared lanes", t => {
  const root = fixture(t);
  assert.throws(() => adaptLocalFederationResult({ root, corpusContentSha256: "c".repeat(64), result: result("corpus/claims/missing.md", 1) }), /ENOENT/iu);
  assert.throws(() => adaptLocalFederationResult({ root, corpusContentSha256: "c".repeat(64), result: result("corpus/claims/../claims/one.md", 1) }), /not canonical/iu);
  assert.equal(adaptLocalFederationResult({ root, corpusContentSha256: "c".repeat(64), result: result("tooling/search/FEDERATION.md", 1) }), null);
});
