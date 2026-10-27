import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { adaptClaimipediaManifest, adaptExperimentEvidence, adaptExternalLiterature, adaptSourceryDerivations, createRepositoryFederatedContext } from "../../tooling/search/registered_federation_adapters.mjs";

const root = new URL("../..", import.meta.url).pathname.replace(/^\/(?:([A-Za-z]:))/u, "$1");

test("registered adapters preserve native Claimipedia, Sourcery, experiment and bibliographic identities", () => {
  const claim = adaptClaimipediaManifest({ root, query: "projector stationarity response", limit: 2 })[0];
  assert.match(claim.objectId, /#claim:/u);
  assert.match(claim.status, /^claimipedia:/u);
  assert.equal(claim.relation.kind, "revision-pinned-join");
  assert.ok(claim.relation.target.startsWith("corpus/claims/"));
  assert.equal(claim.promotionAuthority, false);
  const derivation = adaptSourceryDerivations({ root, query: "orientation quarter turn projector", limit: 3 });
  assert.ok(derivation.some(item => item.objectId.includes("forbidden-orientation-promotion") && item.status.includes("composer-admitted=false")));
  const experiment = adaptExperimentEvidence({ root, query: "Co2MnGa Casimir spectral Hall coverage", limit: 3 });
  assert.ok(experiment.some(item => item.objectId.endsWith("admissibility-casimir-spectral-coverage-gate-v1.json")));
  const literature = adaptExternalLiterature({ root, query: "same carrier Casimir thermoelectric", limit: 4 });
  assert.ok(literature.some(item => item.objectId.includes("FPT-003")));
  assert.ok(literature.every(item => /^https?:\/\//u.test(item.bibliographicIdentity.url)));
  assert.ok(literature.every(item => item.bibliographicIdentity.searchedAt === "2026-10-25"));
});

test("repository federation can compose all six requested lanes without promotion leakage", () => {
  const packet = createRepositoryFederatedContext({ root, query: "admissibility frontier response selection projector boundary evidence", perLaneLimit: 2, maxSources: 12 });
  assert.deepEqual(packet.laneReceipts.map(item => item.lane), ["canonical-corpus", "claimipedia", "sourcery-derivation", "publication", "experiment", "external-literature"]);
  assert.ok(packet.laneReceipts.every(item => item.supplied > 0));
  assert.ok(packet.sources.every(item => item.readAuthority && !item.promotionAuthority));
  assert.equal(packet.authority.globalScalarRank, false);
  assert.equal(packet.authority.crossLanePromotion, false);
  assert.match(packet.receiptSha256, /^[0-9a-f]{64}$/u);
});

test("external literature fails closed without a dated primary-source identity", t => {
  const directory = mkdtempSync(join(tmpdir(), "spin23-literature-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  writeFileSync(join(directory, "bad.json"), JSON.stringify({ commonProtocol: { searchedAt: "2026-10-25" }, records: [{ targetId: "FPT-X", label: "bad", strongestSupport: { finding: "missing URL" }, strongestOpposition: { url: "https://example.test/opposition", finding: "bounded" } }] }));
  assert.throws(() => adaptExternalLiterature({ root: directory, query: "bad", path: "bad.json" }), /bibliographic identity/iu);
});
