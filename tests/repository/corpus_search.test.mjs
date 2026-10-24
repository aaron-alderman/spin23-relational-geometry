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
  assert.equal(Object.keys(result.results[0].selectorSweep).length, 3);
  assert.match(result.method.authorityBoundary, /do not change epistemic status/iu);
});

test("graph propagation surfaces linked context while preserving declared status", () => {
  const result = searchCorpus({ root, query: "finite band Levinson pole collision", limit: 12, profile: "experiment" });
  assert.ok(result.results.some(item => item.graphScore > item.lexicalScore));
  assert.ok(result.results.every(item => typeof item.status === "string" && item.status.length > 0));
  assert.equal(result.profile, "experiment");
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

