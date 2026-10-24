import assert from "node:assert/strict";
import test from "node:test";
import { compareAnswerReceipts, createAnswerReceipt } from "../../tooling/search/answer_stability.mjs";

const source = "corpus/programmes/admissibility/admissibility_02_casimir_as_first_generative_probe.md";
const sourceSha256 = "c".repeat(64);
const common = {
  contextSources: [{ path: source, sourceSha256 }],
  model: { name: "test-model", version: "1", settings: { temperature: 0 } },
  prompt: "Explain the result using only the supplied context.",
};

test("answer receipts bind claims, citations, model and context identities", () => {
  const receipt = createAnswerReceipt({
    ...common,
    contextReceipt: { contextSha256: "a".repeat(64), sourceSetSha256: "b".repeat(64), selector: { profile: "audit" } },
    answer: "A bounded test answer.",
    claims: [
      { key: "casimir.boundary", statement: "The observable depends on boundary conditions.", verdict: "supported", sourcePaths: [source] },
      { key: "outside.context", statement: "An outside claim was introduced.", verdict: "uncertain", sourcePaths: ["corpus/not-in-context.md"] },
    ],
  });
  assert.match(receipt.receiptSha256, /^[0-9a-f]{64}$/u);
  assert.equal(receipt.coverage.claims, 2);
  assert.equal(receipt.coverage.unsupportedClaims, 1);
  assert.equal(receipt.claims[0].unsupportedSourcePaths.length, 0);
  assert.equal(receipt.claims[1].unsupportedSourcePaths.length, 1);
});

test("answer stability separates invariant, conditional, conflicting and unsupported claims", () => {
  const first = createAnswerReceipt({
    ...common,
    contextReceipt: { contextSha256: "1".repeat(64), sourceSetSha256: "3".repeat(64) },
    answer: "First answer.",
    claims: [
      { key: "stable.claim", statement: "The boundary matters.", verdict: "supported", sourcePaths: [source] },
      { key: "conflict.claim", statement: "The selector is intrinsic.", verdict: "supported", sourcePaths: [source] },
      { key: "conditional.claim", statement: "One packet adds a platform claim.", verdict: "conditional", sourcePaths: [source] },
      { key: "unsupported.claim", statement: "An uncited extension appears.", verdict: "uncertain", sourcePaths: ["corpus/outside.md"] },
    ],
  });
  const second = createAnswerReceipt({
    ...common,
    contextReceipt: { contextSha256: "2".repeat(64), sourceSetSha256: "4".repeat(64) },
    answer: "Second answer.",
    claims: [
      { key: "stable.claim", statement: "The boundary matters.", verdict: "supported", sourcePaths: [source] },
      { key: "conflict.claim", statement: "The selector is intrinsic.", verdict: "rejected", sourcePaths: [source] },
      { key: "unsupported.claim", statement: "An uncited extension appears.", verdict: "uncertain", sourcePaths: ["corpus/outside.md"] },
    ],
  });
  const comparison = compareAnswerReceipts([first, second]);
  assert.equal(comparison.comparable, true);
  assert.equal(comparison.counts["stable-exact"], 1);
  assert.equal(comparison.counts["context-conditional"], 1);
  assert.equal(comparison.counts.conflict, 1);
  assert.equal(comparison.counts.unsupported, 1);
  assert.match(comparison.comparisonSha256, /^[0-9a-f]{64}$/u);
});

test("answer comparison rejects a tampered receipt", () => {
  const receipt = createAnswerReceipt({
    ...common,
    contextReceipt: { contextSha256: "5".repeat(64), sourceSetSha256: "6".repeat(64) },
    answer: "Original answer.",
    claims: [{ key: "stable.claim", statement: "The boundary matters.", verdict: "supported", sourcePaths: [source] }],
  });
  const tampered = structuredClone(receipt);
  tampered.claims[0].verdict = "rejected";
  assert.throws(() => compareAnswerReceipts([receipt, tampered]), /integrity check failed/iu);
});
