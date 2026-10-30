import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createCorpusSearchMcp } from "../../tooling/search/corpus_search_mcp.mjs";
import { sha256 } from "../../tooling/search/belief_state.mjs";

const root = new URL("../../", import.meta.url);
const server = createCorpusSearchMcp({ root });
const request = (id, method, params) => server.rpc({ jsonrpc: "2.0", id, method, ...(params ? { params } : {}) });
const sourcePath = "corpus/programmes/admissibility/admissibility_02_casimir_as_first_generative_probe.md";
const sourceVersionSha256 = sha256(readFileSync(new URL(`../../${sourcePath}`, import.meta.url), "utf8"));
const observation = (type, path = sourcePath) => ({ type, sourcePath: path, evidenceSha256: "e".repeat(64), evidenceFamilySha256: "e".repeat(64), sourceVersionSha256, producer: "mcp-test", independenceClass: "external-observation", selectionArm: "external" });

test("MCP advertises bounded read-only corpus retrieval", async () => {
  const initialized = await request(1, "initialize");
  assert.equal(initialized.result.serverInfo.name, "spin23-corpus-search");
  const listed = await request(2, "tools/list");
  assert.deepEqual(listed.result.tools.map(tool => tool.name), ["corpus_contribution_beacon", "corpus_search", "corpus_context", "corpus_context_sweep", "corpus_answer_receipt", "corpus_answer_stability", "corpus_belief_initialize", "corpus_belief_update", "corpus_adaptive_context", "corpus_read"]);
  assert.ok(listed.result.tools.every(tool => tool.annotations.readOnlyHint === true));
});

test("MCP contribution beacon invites bounded work without starting an episode", async () => {
  const response = await request(17, "tools/call", { name: "corpus_contribution_beacon", arguments: {} });
  assert.equal(response.result.isError, undefined);
  const beacon = response.result.structuredContent;
  assert.equal(beacon.protocol, "spin23-context-hub-contribution-beacon/1");
  assert.equal(beacon.status, "live-local");
  assert.deepEqual(beacon.openOpportunities.map(item => item.id), ["BEACON-002", "BEACON-003", "BEACON-004"]);
  assert.ok(beacon.completedMilestones.some(item => item.id === "BEACON-005"));
  assert.equal(beacon.completedMilestones.some(item => item.id === "BEACON-001"), true);
  assert.equal(beacon.authority.proposalOnly, true);
  assert.equal(beacon.authority.changesTruthStatus, false);
  assert.match(beacon.beaconSha256, /^[0-9a-f]{64}$/u);
});

test("MCP search returns structured, authority-bounded graph results", async () => {
  const response = await request(3, "tools/call", {
    name: "corpus_search",
    arguments: { query: "casmir boundary response", limit: 4, profile: "experiment" },
  });
  assert.equal(response.result.isError, undefined);
  assert.equal(response.result.structuredContent.protocol, "spin23-corpus-search-mcp/1");
  assert.equal(response.result.structuredContent.results.length, 4);
  assert.match(response.result.structuredContent.results[0].uri, /^corpus:\/\/\//u);
  assert.ok(response.result.structuredContent.results[0].claimMatch);
  assert.equal(typeof response.result.structuredContent.results[0].semanticScore, "number");
  assert.equal(response.result.structuredContent.authority.entails, false);
  assert.match(response.result.content[0].text, /Ranks guide retrieval only/iu);
});

test("MCP read returns bounded source text and rejects traversal", async () => {
  const read = await request(4, "tools/call", {
    name: "corpus_read",
    arguments: { path: "corpus/programmes/admissibility/admissibility_02_casimir_as_first_generative_probe.md", maxCharacters: 512 },
  });
  assert.equal(read.result.structuredContent.characters, 512);
  assert.equal(read.result.structuredContent.truncated, true);
  assert.match(read.result.structuredContent.content, /Casimir/iu);

  const rejected = await request(5, "tools/call", { name: "corpus_read", arguments: { path: "../README.md" } });
  assert.equal(rejected.result.isError, true);
  assert.match(rejected.result.content[0].text, /outside|relative|escape/iu);
});

test("MCP context hub produces a tailored packet inside its context budget", async () => {
  const response = await request(7, "tools/call", {
    name: "corpus_context",
    arguments: { task: "How do Casimir boundaries connect to thermoelectric detection?", profile: "experiment", maxSources: 4, maxCharacters: 8000, claimWeight: 0.2, semanticWeight: 0.1 },
  });
  assert.equal(response.result.isError, undefined);
  const packet = response.result.structuredContent;
  assert.equal(packet.protocol, "spin23-corpus-context/1");
  assert.equal(packet.sources.length, 4);
  assert.ok(packet.budget.usedCharacters <= 8000);
  assert.match(packet.receipt.contextSha256, /^[0-9a-f]{64}$/u);
  assert.match(packet.receipt.sourceSetSha256, /^[0-9a-f]{64}$/u);
  assert.equal(packet.receipt.selector.claimWeight, 0.2);
  assert.equal(packet.receipt.selector.semanticWeight, 0.1);
  assert.match(response.result.content[0].text, /Tailored corpus context/iu);
  assert.match(response.result.content[0].text, /Declared status/iu);
  assert.match(response.result.content[0].text, /Deliberate omissions/iu);
  assert.ok(new Set(packet.sources.map(source => source.kind)).size >= 2);
  assert.ok(packet.sources.every(source => source.excerpt && source.reason && source.uri && /^[0-9a-f]{64}$/u.test(source.sourceSha256)));
});

test("MCP context sweep separates invariant core from selector-sensitive perimeter", async () => {
  const response = await request(8, "tools/call", {
    name: "corpus_context_sweep",
    arguments: {
      task: "How do Casimir boundaries connect to thermoelectric detection?",
      baselineProfile: "all",
      profiles: ["interpret", "experiment"],
      graphWeights: [0.1, 0.2, 0.35],
      maxSources: 4,
      maxCharacters: 5000,
    },
  });
  assert.equal(response.result.isError, undefined);
  const sweep = response.result.structuredContent;
  assert.equal(sweep.protocol, "spin23-corpus-context-sweep/1");
  assert.equal(sweep.variants.length, 5);
  assert.equal(sweep.authority.answerStabilityEstablished, false);
  assert.ok(sweep.stability.invariantSources.length > 0);
  assert.ok(sweep.stability.pairwise.length === 10);
  assert.ok(sweep.stability.meanPairwiseJaccard >= 0 && sweep.stability.meanPairwiseJaccard <= 1);
  assert.match(response.result.content[0].text, /context-stability result/iu);
});

test("MCP search fails closed on undeclared controls", async () => {
  const rejected = await request(6, "tools/call", {
    name: "corpus_search",
    arguments: { query: "Casimir", graphWeight: 0.95 },
  });
  assert.equal(rejected.result.isError, true);
  assert.match(rejected.result.content[0].text, /graphWeight/iu);
});

test("MCP belief loop is caller-owned, hash-bound and context-adaptive", async () => {
  const initialized = await request(9, "tools/call", {
    name: "corpus_belief_initialize",
    arguments: { objective: "Casimir boundaries and thermoelectric detection", profile: "experiment" },
  });
  assert.equal(initialized.result.isError, undefined);
  const initial = initialized.result.structuredContent;
  assert.equal(initial.protocol, "spin23-corpus-belief-state/2");
  assert.equal(initial.authority.corpusPromotion, false);
  assert.match(initialized.result.content[0].text, /No server-side state was stored/iu);

  const updated = await request(10, "tools/call", {
    name: "corpus_belief_update",
    arguments: { beliefState: initial, observations: [observation("verification-pass")] },
  });
  assert.equal(updated.result.isError, undefined);
  const successor = updated.result.structuredContent.state;
  assert.equal(successor.sequence, 1);
  assert.ok(successor.sources[sourcePath].utilityMean > 0.5);
  assert.match(updated.result.structuredContent.report.updateSha256, /^[0-9a-f]{64}$/u);

  const context = await request(11, "tools/call", {
    name: "corpus_adaptive_context",
    arguments: { task: "Casimir boundaries and thermoelectric detection", beliefState: successor, maxSources: 3, maxCharacters: 5000 },
  });
  assert.equal(context.result.isError, undefined);
  assert.equal(context.result.structuredContent.protocol, "spin23-corpus-adaptive-context/1");
  assert.equal(context.result.structuredContent.authority.changesTruthStatus, false);
  assert.equal(context.result.structuredContent.controls.maximumAdaptiveWeight, 0.2);
  assert.match(context.result.content[0].text, /Adaptation:/iu);
});

test("MCP belief loop rejects tampered state and excess adaptive influence", async () => {
  const initialized = await request(12, "tools/call", { name: "corpus_belief_initialize", arguments: { objective: "Casimir boundary" } });
  const tampered = structuredClone(initialized.result.structuredContent);
  tampered.episode.objective = "silently changed";
  const rejectedState = await request(13, "tools/call", { name: "corpus_belief_update", arguments: { beliefState: tampered, observations: [observation("retrieved")] } });
  assert.equal(rejectedState.result.isError, true);
  assert.match(rejectedState.result.content[0].text, /integrity/iu);
  const rejectedWeight = await request(14, "tools/call", { name: "corpus_adaptive_context", arguments: { task: "Casimir boundary", beliefState: initialized.result.structuredContent, adaptiveWeight: 0.21 } });
  assert.equal(rejectedWeight.result.isError, true);
  assert.match(rejectedWeight.result.content[0].text, /adaptiveWeight/iu);
  const rejectedSource = await request(15, "tools/call", { name: "corpus_belief_update", arguments: { beliefState: initialized.result.structuredContent, observations: [observation("retrieved", "corpus/not-present.md")] } });
  assert.equal(rejectedSource.result.isError, true);
  assert.match(rejectedSource.result.content[0].text, /does not exist/iu);
  const staleSource = await request(16, "tools/call", { name: "corpus_belief_update", arguments: { beliefState: initialized.result.structuredContent, observations: [{ ...observation("retrieved"), sourceVersionSha256: "0".repeat(64) }] } });
  assert.equal(staleSource.result.isError, true);
  assert.match(staleSource.result.content[0].text, /source identity is stale/iu);
});
