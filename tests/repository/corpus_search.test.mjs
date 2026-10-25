import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { searchCorpus } from "../../tooling/search/search_corpus.mjs";

const root = new URL("../../", import.meta.url);

test("hybrid corpus search corrects domain spelling and returns live local paths", () => {
  const result = searchCorpus({ root, query: "casmir boundary response", limit: 10 });
  assert.ok(result.corrections.some(item => item.from === "casmir" && item.to === "casimir"));
  assert.match(result.corpusContentSha256, /^[0-9a-f]{64}$/u);
  assert.match(result.evidenceSpineSha256, /^[0-9a-f]{64}$/u);
  assert.ok(result.results.some(item => /casimir/iu.test(`${item.title} ${item.snippet}`)));
  for (const item of result.results) assert.equal(existsSync(new URL(item.path, root)), true, item.path);
});

test("PageRank selector query retrieves the dedicated bridge with transparent scoring", () => {
  const result = searchCorpus({ root, query: "PageRank Perron selector fidelity", limit: 5 });
  assert.equal(result.results[0].path, "corpus/programmes/frontier-physics-targets/page_rank_perron_selector_bridge_v1.md");
  assert.ok(result.results[0].lexicalScore > 0);
  assert.ok(result.results[0].graphScore > 0);
  assert.ok(result.results[0].claimScore > 0);
  assert.ok(result.results[0].claimMatch);
  assert.match(result.results[0].claimMatch.claimSha256, /^[0-9a-f]{64}$/u);
  assert.ok(result.results[0].claimMatch.lineStart >= 1);
  assert.equal(Object.keys(result.results[0].selectorSweep).length, 3);
  assert.match(result.method.authorityBoundary, /do not change epistemic status/iu);
});

test("claim-level and cross-reference retrieval exposes exact passage identity without opaque embeddings", () => {
  const result = searchCorpus({ root, query: "Why can locally adequate detector information fail global identification?", limit: 8, profile: "audit" });
  const target = result.results.find(item => item.path === "corpus/programmes/admissibility/admissibility_107_global_nonlinear_detector_injectivity.md");
  assert.ok(target, "expected detector-injectivity source in bounded results");
  assert.ok(target.claimScore > 0);
  assert.ok(target.semanticScore > 0);
  assert.match(target.claimMatch.claimSha256, /^[0-9a-f]{64}$/u);
  assert.ok(["status", "boundary", "falsifier", "assumption", "result", "context", "evidence"].includes(target.claimMatch.role));
  assert.ok(result.method.semanticExpansion.every(item => item.token.length <= 32 && /\p{L}/u.test(item.token)));
  assert.match(result.method.semantic, /confidence|cross-reference|no external embedding/iu);
  assert.equal(target.semanticBridge?.targetPath, target.path);
  assert.match(target.semanticBridge?.bridgeSha256 ?? "", /^[0-9a-f]{64}$/u);
  assert.ok(target.semanticBridge.lineStart >= 1);
  assert.ok(target.semanticBridge.lineEnd - target.semanticBridge.lineStart <= 8, "bridge receipts must remain bounded passages rather than whole navigation lists");
  assert.match(result.method.claim, /list item|table row/iu);
  assert.deepEqual(Object.keys(result.method.finalWeights), ["lexical", "claim", "semantic", "graph"]);
});

test("warm retrieval is byte-for-byte deterministic after sparse candidate evaluation", () => {
  const options = { root, query: "global detector identification phase reference", limit: 10, profile: "audit" };
  const first = searchCorpus(options);
  const second = searchCorpus(options);
  assert.deepEqual(second, first);
});

test("graph propagation surfaces linked context while preserving declared status", () => {
  const result = searchCorpus({ root, query: "finite band Levinson pole collision", limit: 12, profile: "experiment" });
  assert.ok(result.results.some(item => item.graphScore > item.lexicalScore));
  assert.ok(result.results.every(item => typeof item.status === "string" && item.status.length > 0));
  assert.equal(result.profile, "experiment");
});

test("no-match retrieval still returns an exact corpus identity and declared method", () => {
  const result = searchCorpus({ root, query: "zzzxxyyqqq vvwwkkjjj", limit: 4, profile: "all" });
  assert.deepEqual(result.results, []);
  assert.match(result.corpusContentSha256, /^[0-9a-f]{64}$/u);
  assert.match(result.method.semantic, /confidence-gated/iu);
  assert.deepEqual(Object.keys(result.method.finalWeights), ["lexical", "claim", "semantic", "graph"]);
});

test("numbered claim results carry bounded evidence-spine metadata", () => {
  const result = searchCorpus({ root, query: "Jordan triple determines sp4 real exact closure", limit: 8, profile: "audit" });
  const claim = result.results.find(item => item.path === "corpus/claims/0000-0099/42_jordan_triple_to_sp4r_determination.md");
  assert.ok(claim?.claimEvidence);
  assert.equal(claim.claimEvidence.legacyId, 42);
  assert.equal(typeof claim.claimEvidence.coverage.certificate, "string");
  assert.ok(Array.isArray(claim.claimEvidence.evidenceLinks));
  assert.ok(claim.claimEvidence.evidenceLinks.length <= 24);
});

