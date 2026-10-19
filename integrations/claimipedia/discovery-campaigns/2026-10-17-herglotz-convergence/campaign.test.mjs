import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");

test("compiler binds every graph edge to the declared source-ledger basis", () => {
  execFileSync(process.execPath, [resolve(here, "compile-campaign.mjs")], { encoding: "utf8" });
  const receipt = JSON.parse(readFileSync(resolve(generated, "compiler-receipt.json"), "utf8"));
  const compiled = JSON.parse(readFileSync(resolve(generated, "compiled-graph.json"), "utf8"));
  assert.equal(receipt.driftDetected, false);
  assert.equal(receipt.sourceCount, 11);
  assert.equal(receipt.anchorCount, 23);
  assert.equal(compiled.graph.transformations.length, 12);
  assert.ok(compiled.graph.transformations.every((rule) => rule.evidenceRefs.length > 0));
});

test("compiler fails closed when a source digest drifts", () => {
  const temp = mkdtempSync(resolve(tmpdir(), "claimipedia-campaign-"));
  const spec = JSON.parse(readFileSync(resolve(here, "campaign-spec.json"), "utf8"));
  spec.sources[0].sha256 = "0".repeat(64);
  const badSpec = resolve(temp, "bad-spec.json");
  writeFileSync(badSpec, JSON.stringify(spec));
  const result = spawnSync(process.execPath, [resolve(here, "compile-campaign.mjs"), badSpec, resolve(temp, "out")], { encoding: "utf8" });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /hash drift/);
});

test("live docket preserves rejection, loss and authority receipts", () => {
  const live = JSON.parse(readFileSync(resolve(generated, "live-results.json"), "utf8"));
  const docket = JSON.parse(readFileSync(resolve(generated, "discovery-docket.json"), "utf8"));
  assert.equal(live.passed, true);
  assert.equal(docket.summary.candidateCount, 4);
  assert.deepEqual(docket.summary.routesWithCandidates, ["conserved-current-route", "domain-wall-route", "thermal-stress-route"]);
  assert.ok(docket.summary.invalidRuleIds.includes("counterexample-kms-without-common-temperature"));
  assert.ok(docket.candidates.every((candidate) => candidate.losses.length > 0));
  assert.equal(docket.authority.proposalOnly, true);
  assert.equal(docket.authority.entails, false);
  assert.equal(docket.authority.automaticCorpusAdmission, false);
});

test("ranking is attention ordering rather than scientific authority", () => {
  const docket = JSON.parse(readFileSync(resolve(generated, "discovery-docket.json"), "utf8"));
  assert.equal(docket.authority.ranking, "attention-ordering-only");
  assert.ok(docket.candidates.every((candidate) => candidate.ranking.authority === "attention-ordering-only"));
  const scores = docket.candidates.map((candidate) => candidate.ranking.attentionScore);
  assert.deepEqual(scores, [...scores].sort((left, right) => right - left));
});

test("independent and cross-domain synthesis certificates are retained", () => {
  const receipt = JSON.parse(readFileSync(resolve(generated, "verification-receipt.json"), "utf8"));
  assert.equal(receipt.passed, true);
  assert.equal(receipt.certificateCount, 11);
  assert.ok(receipt.certificates.some((certificate) => certificate.script.endsWith("verify-stratified-schur-sewing.mjs")));
});
