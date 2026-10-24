import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { createEpisodeStore } from "../../tooling/search/episode_store.mjs";
import { createObservatoryRuntime } from "../../tooling/search/observatory_runtime.mjs";
import { startObservatoryServer } from "../../tooling/search/observatory_server.mjs";

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), "spin23-observatory-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const directory = join(root, "corpus", "programmes");
  mkdirSync(directory, { recursive: true });
  const content = "# Boundary response candidate\n\nA boundary response candidate for controlled context selection.\n";
  for (const name of ["alpha.md", "beta.md", "zeta.md"]) writeFileSync(join(directory, name), content);
  return { root, stateRoot: join(root, ".state", "episodes") };
}

test("episode store is append-only, revision-guarded and hash-chain verified", t => {
  const { stateRoot } = fixture(t);
  let tick = 0;
  const store = createEpisodeStore({ root: stateRoot, idFactory: () => "ep_1111111111111111", now: () => `2026-10-25T00:00:0${tick++}.000Z` });
  const created = store.create({ objective: "bounded attention" });
  assert.equal(created.revision, 1);
  const appended = store.append(created.episodeId, "episode.frozen", { frozen: true }, { expectedRevision: 1 });
  assert.equal(appended.revision, 2);
  assert.throws(() => store.append(created.episodeId, "episode.unfrozen", { frozen: false }, { expectedRevision: 1 }), /revision conflict/iu);
  const path = appended.path;
  const lines = readFileSync(path, "utf8").trimEnd().split("\n");
  const tampered = JSON.parse(lines[1]);
  tampered.payload.frozen = false;
  lines[1] = JSON.stringify(tampered);
  writeFileSync(path, `${lines.join("\n")}\n`);
  assert.throws(() => store.load(created.episodeId), /integrity verification/iu);
});
test("runtime executes plan, answer, proposed update, approval, monitoring and replay", t => {
  const { root, stateRoot } = fixture(t);
  const runtime = createObservatoryRuntime({ root, stateRoot, idFactory: () => "ep_2222222222222222" });
  let episode = runtime.createEpisode({ objective: "boundary response candidate", profile: "experiment" });
  assert.equal(episode.revision, 1);
  assert.equal(episode.authority.requiresApprovalForLearning, true);
  const planned = runtime.planTurn(episode.episodeId, { task: "boundary response candidate" });
  episode = planned.episode;
  assert.equal(planned.turn.plan.baseline.sources.length, 3);
  assert.equal(planned.turn.plan.controls.emptyStatePreservesBaseline, true);
  assert.ok(planned.turn.plan.candidateUniverse.length >= 3);
  assert.match(planned.turn.plan.candidateUniverseSha256, /^[0-9a-f]{64}$/u);
  assert.throws(() => runtime.planTurn(episode.episodeId, { task: "a different objective" }), /exactly match/iu);
  const source = planned.turn.plan.adaptive.sources[0];
  const answer = runtime.recordAnswer(episode.episodeId, {
    turnId: planned.turn.turnId,
    model: { name: "test-model", settings: { temperature: 0 } },
    prompt: "Assess the candidate.",
    answer: "The source is useful for this bounded task.",
    claims: [{ key: "candidate.utility", statement: "The source is useful for this bounded task.", verdict: "supported", sourcePaths: [source.path] }],
  });
  assert.match(answer.answer.receipt.receiptSha256, /^[0-9a-f]{64}$/u);
  const proposed = runtime.proposeUpdate(episode.episodeId, { observations: [{ type: "verification-pass", sourcePath: source.path, evidenceSha256: "a".repeat(64), turnId: planned.turn.turnId }] });
  assert.equal(proposed.episode.beliefState.sequence, 0, "proposal must not mutate active state");
  assert.equal(proposed.proposal.successorState.sequence, 1);
  episode = runtime.decideUpdate(episode.episodeId, proposed.proposal.proposalId, { decision: "approve", reason: "Fixture verification." });
  assert.equal(episode.beliefState.sequence, 1);
  assert.equal(episode.metrics.approvedUpdates, 1);
  assert.equal(episode.beliefState.evidenceFamilies.length, 1);
  assert.equal(episode.beliefState.evidenceFamilies[0].independenceClass, "same-run");
  assert.ok(episode.metrics.meanUtility > 0.5);
  const replayed = runtime.replay(episode.episodeId, { processVariance: 0.02, adaptiveWeight: 0.2 });
  assert.equal(replayed.episode.beliefState.stateSha256, episode.beliefState.stateSha256, "replay must not mutate the live state");
  assert.equal(replayed.replay.turnComparisons.length, 1);
  assert.equal(replayed.replay.turnComparisons[0].candidateUniverseSha256, planned.turn.plan.candidateUniverseSha256);
  const admittedSha256 = episode.governance.admittedHistory.find(item => item.sequence === 0).stateSha256;
  episode = runtime.rollback(episode.episodeId, { targetStateSha256: admittedSha256, reason: "Exercise reversible admission." });
  assert.equal(episode.beliefState.sequence, 0);
  assert.equal(episode.metrics.rollbacks, 1);
  const rollbackReplay = runtime.replay(episode.episodeId, {});
  assert.equal(rollbackReplay.replay.finalStateSha256, episode.beliefState.stateSha256, "replay must apply recorded rollback events");
  assert.throws(() => runtime.proposeUpdate(episode.episodeId, { observations: [{ type: "verification-pass", sourcePath: source.path, sourceVersionSha256: "f".repeat(64), evidenceSha256: "b".repeat(64), turnId: planned.turn.turnId }] }), /sourceVersionSha256/iu);
  assert.throws(() => runtime.proposeUpdate(episode.episodeId, { observations: [{ type: "verification-pass", sourcePath: source.path, evidenceSha256: "c".repeat(64) }] }), /recorded turn/iu);
  assert.throws(() => runtime.proposeUpdate(episode.episodeId, { observations: [{ type: "verification-pass", sourcePath: source.path, evidenceSha256: "d".repeat(64), turnId: planned.turn.turnId, independenceClass: "independent-verifier" }] }), /host-derived/iu);
  episode = runtime.setFrozen(episode.episodeId, true);
  assert.equal(episode.frozen, true);
  assert.throws(() => runtime.proposeUpdate(episode.episodeId, { observations: [{ type: "user-rating", sourcePath: source.path, value: 1 }] }), /frozen/iu);
  assert.throws(() => runtime.setControls(episode.episodeId, { adaptiveWeight: 0.1 }), /frozen/iu);
  assert.throws(() => runtime.rollback(episode.episodeId, { targetStateSha256: proposed.proposal.successorState.stateSha256 }), /frozen/iu);
  assert.equal(runtime.listEpisodes()[0].metrics.turns, 1);
});
test("local Observatory server exposes static UI and the episode API", async t => {
  const { root, stateRoot } = fixture(t);
  const running = await startObservatoryServer({ root, stateRoot, port: 0 });
  t.after(() => new Promise(resolve => running.server.close(resolve)));
  const health = await fetch(`${running.url}/api/health`).then(response => response.json());
  assert.equal(health.status, "ok");
  const page = await fetch(running.url);
  assert.equal(page.status, 200);
  assert.match(await page.text(), /Context Hub Observatory/iu);
  const createdResponse = await fetch(`${running.url}/api/episodes`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ objective: "boundary response candidate", profile: "audit" }) });
  assert.equal(createdResponse.status, 201);
  const created = await createdResponse.json();
  const listed = await fetch(`${running.url}/api/episodes`).then(response => response.json());
  assert.equal(listed.episodes[0].episodeId, created.episodeId);
  const plannedResponse = await fetch(`${running.url}/api/episodes/${created.episodeId}/turns`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ task: "boundary response candidate" }) });
  assert.equal(plannedResponse.status, 201);
  const planned = await plannedResponse.json();
  assert.equal(planned.episode.metrics.turns, 1);
  assert.equal(planned.episode.authority.corpusPromotion, false);
});
