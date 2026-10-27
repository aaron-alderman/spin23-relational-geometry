import assert from "node:assert/strict";
import test from "node:test";
import { composeFederatedContext } from "../../tooling/search/federated_context.mjs";

const hash = character => character.repeat(64);
const item = (objectId, contentSha256, score, target = objectId) => ({ objectId, contentSha256, revision: `rev:${contentSha256}`, status: "proposal", withinLaneScore: score, relation: { kind: "revision-pinned-join", target }, readAuthority: true, promotionAuthority: false });

test("federation preserves lane-native order, quotas, identities and non-promotion", () => {
  const result = composeFederatedContext({
    lanes: {
      "canonical-corpus": [item("corpus/a", hash("a"), 9), item("corpus/b", hash("b"), 8)],
      claimipedia: [item("claim/a", hash("a"), 50, "corpus/a"), item("claim/c", hash("c"), 40)],
      publication: [item("book/d", hash("d"), 100)],
    },
    quotas: { "canonical-corpus": 2, claimipedia: 2, publication: 1 },
    maxSources: 5,
  });
  assert.deepEqual(result.sources.map(source => source.objectId), ["corpus/a", "book/d", "corpus/b", "claim/c"]);
  assert.equal(result.sources.some(source => source.objectId === "claim/a"), false, "same source identity must not be multiplied across lanes");
  assert.equal(result.authority.globalScalarRank, false);
  assert.equal(result.authority.crossLanePromotion, false);
  assert.match(result.receiptSha256, /^[0-9a-f]{64}$/u);
});

test("federation rejects unpinned, opaque or promotion-capable inputs", () => {
  assert.throws(() => composeFederatedContext({ lanes: { unknown: [] } }), /lane unknown/iu);
  assert.throws(() => composeFederatedContext({ lanes: { claimipedia: [{ ...item("claim/a", hash("a"), 1), revision: "" }] } }), /immutable/iu);
  assert.throws(() => composeFederatedContext({ lanes: { claimipedia: [{ ...item("claim/a", hash("a"), 1), promotionAuthority: true }] } }), /non-promoting/iu);
});
