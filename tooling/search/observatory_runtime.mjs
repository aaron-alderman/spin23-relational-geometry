import { randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildAdaptiveCorpusContext } from "./adaptive_context.mjs";
import { createAnswerReceipt } from "./answer_stability.mjs";
import { initializeBeliefState, sha256, stableStringify, updateBeliefState } from "./belief_state.mjs";
import { selectSources } from "./context_hub.mjs";
import { createEpisodeStore } from "./episode_store.mjs";
import { searchCorpus } from "./search_corpus.mjs";

const profiles = new Set(["all", "interpret", "choose-work", "audit", "experiment"]);
const id = prefix => `${prefix}_${randomBytes(8).toString("hex")}`;
const bounded = (value, minimum, maximum, name) => {
  if (typeof value !== "number" || !Number.isFinite(value) || value < minimum || value > maximum) throw new Error(`${name} must be from ${minimum} to ${maximum}`);
  return value;
};

function normalizedControls(controls = {}) {
  if (!controls || Array.isArray(controls) || typeof controls !== "object") throw new Error("controls must be an object");
  const profile = controls.profile ?? "all";
  if (!profiles.has(profile)) throw new Error("controls.profile is invalid");
  const maxSources = controls.maxSources ?? 6;
  const maxCharacters = controls.maxCharacters ?? 12000;
  if (!Number.isInteger(maxSources) || maxSources < 2 || maxSources > 10) throw new Error("controls.maxSources must be from 2 to 10");
  if (!Number.isInteger(maxCharacters) || maxCharacters < 4000 || maxCharacters > 30000) throw new Error("controls.maxCharacters must be from 4000 to 30000");
  return {
    profile,
    graphWeight: bounded(controls.graphWeight ?? 0.2, 0, 0.6, "controls.graphWeight"),
    adaptiveWeight: bounded(controls.adaptiveWeight ?? 0.15, 0, 0.2, "controls.adaptiveWeight"),
    explorationWeight: bounded(controls.explorationWeight ?? 0.03, 0, 0.05, "controls.explorationWeight"),
    processVariance: bounded(controls.processVariance ?? 0.01, 0.0001, 0.1, "controls.processVariance"),
    maxSources,
    maxCharacters,
  };
}
function normalizedTaskSchedule(taskSchedule, objective) {
  if (taskSchedule === undefined || taskSchedule === null) return [];
  if (!Array.isArray(taskSchedule) || taskSchedule.length < 2 || taskSchedule.length > 100) throw new Error("taskSchedule must contain 2 to 100 preregistered tasks");
  const normalized = taskSchedule.map((task, index) => {
    const value = typeof task === "string" ? task.trim() : "";
    if (value.length < 2 || value.length > 500) throw new Error(`taskSchedule item ${index + 1} is invalid`);
    return value;
  });
  if (new Set(normalized).size !== normalized.length) throw new Error("taskSchedule tasks must be unique");
  if (normalized.includes(objective.trim())) throw new Error("taskSchedule tasks must be scoped subquestions, not a duplicate of the umbrella objective");
  return normalized;
}
function jaccard(left, right) {
  const a = new Set(left);
  const b = new Set(right);
  const union = new Set([...a, ...b]);
  return union.size ? [...a].filter(value => b.has(value)).length / union.size : 1;
}
function deriveEpisode(record) {
  const created = record.events[0].payload;
  let beliefState = created.initialBeliefState;
  let controls = created.controls;
  let frozen = false;
  const turns = [];
  const answers = [];
  const proposals = new Map();
  const decisions = [];
  const replays = [];
  for (const event of record.events.slice(1)) {
    if (event.type === "episode.controls-changed") controls = event.payload.controls;
    else if (event.type === "episode.frozen") frozen = true;
    else if (event.type === "episode.unfrozen") frozen = false;
    else if (event.type === "turn.planned") turns.push(event.payload);
    else if (event.type === "answer.recorded") answers.push(event.payload);
    else if (event.type === "update.proposed") proposals.set(event.payload.proposalId, { ...event.payload, status: "pending" });
    else if (event.type === "update.approved") {
      const proposal = proposals.get(event.payload.proposalId);
      if (!proposal) throw new Error(`approved proposal ${event.payload.proposalId} is missing`);
      proposal.status = "approved";
      proposal.decision = event.payload;
      beliefState = proposal.successorState;
      decisions.push(event.payload);
    } else if (event.type === "update.rejected") {
      const proposal = proposals.get(event.payload.proposalId);
      if (!proposal) throw new Error(`rejected proposal ${event.payload.proposalId} is missing`);
      proposal.status = "rejected";
      proposal.decision = event.payload;
      decisions.push(event.payload);
    } else if (event.type === "update.rolled-back") {
      beliefState = event.payload.targetState;
      decisions.push(event.payload);
    } else if (event.type === "replay.completed") replays.push(event.payload);
  }
  return { ...record, objective: created.objective, taskSchedule: created.taskSchedule ?? [], profile: created.profile, corpusContentSha256: created.corpusContentSha256, beliefState, controls, frozen, turns, answers, proposals: [...proposals.values()], decisions, replays };
}
function episodeMetrics(episode) {
  const estimates = Object.values(episode.beliefState.sources);
  const planned = episode.turns;
  const overlaps = planned.map(turn => jaccard(turn.plan.baseline.sources.map(source => source.path), turn.plan.adaptive.sources.map(source => source.path)));
  const approved = episode.proposals.filter(item => item.status === "approved");
  const innovations = approved.flatMap(item => item.report.innovations);
  const observationOutcomes = approved.flatMap(item => item.observations.map(observation => {
    const turn = observation.turnId ? planned.find(candidate => candidate.turnId === observation.turnId) : planned.at(-1);
    if (!turn) return null;
    const baseline = turn.plan.baseline.sources.some(source => source.path === observation.sourcePath);
    const adaptive = turn.plan.adaptive.sources.some(source => source.path === observation.sourcePath);
    const positive = (observation.value ?? 0.5) > 0.5;
    const delta = adaptive === baseline ? 0 : adaptive ? (positive ? 1 : -1) : (positive ? -1 : 1);
    return delta;
  }).filter(value => value !== null));
  return {
    turns: planned.length,
    answers: episode.answers.length,
    observedSources: estimates.length,
    pendingProposals: episode.proposals.filter(item => item.status === "pending").length,
    approvedUpdates: approved.length,
    rejectedUpdates: episode.proposals.filter(item => item.status === "rejected").length,
    rollbacks: episode.events.filter(item => item.type === "update.rolled-back").length,
    independentEvidenceFamilies: episode.beliefState.evidenceFamilies.filter(item => item.independenceClass === "independent-verifier" || item.independenceClass === "external-observation").length,
    conflicts: approved.flatMap(item => item.observations).filter(item => item.type === "answer-conflict" || item.type === "verification-fail").length,
    meanUtility: estimates.length ? estimates.reduce((sum, item) => sum + item.utilityMean, 0) / estimates.length : 0.5,
    meanVariance: estimates.length ? estimates.reduce((sum, item) => sum + item.utilityVariance, 0) / estimates.length : 0.25,
    meanAbsoluteInnovation: innovations.length ? innovations.reduce((sum, item) => sum + Math.abs(item.residual), 0) / innovations.length : 0,
    meanBaselineAdaptiveJaccard: overlaps.length ? overlaps.reduce((sum, value) => sum + value, 0) / overlaps.length : 1,
    adaptiveOutcomeBalance: observationOutcomes.reduce((sum, value) => sum + value, 0),
    adaptiveOutcomeObservations: observationOutcomes.length,
  };
}
function publicEpisode(episode) {
  const pending = episode.proposals.find(item => item.status === "pending") ?? null;
  const admittedHistory = [episode.events[0].payload.initialBeliefState, ...episode.proposals.filter(item => item.status === "approved").map(item => item.successorState)]
    .map(state => ({ stateSha256: state.stateSha256, sequence: state.sequence, current: state.stateSha256 === episode.beliefState.stateSha256 }));
  return {
    protocol: "spin23-context-hub-observatory/1",
    episodeId: episode.episodeId,
    revision: episode.revision,
    headSha256: episode.headSha256,
    objective: episode.objective,
    taskSchedule: episode.taskSchedule,
    profile: episode.profile,
    corpusContentSha256: episode.corpusContentSha256,
    frozen: episode.frozen,
    controls: episode.controls,
    beliefState: episode.beliefState,
    governance: {
      admittedStateSha256: episode.beliefState.stateSha256,
      candidateStateSha256: pending?.successorState.stateSha256 ?? null,
      policySha256: sha256(stableStringify(episode.controls)),
      objectiveSha256: sha256(episode.objective),
      taskScheduleSha256: sha256(stableStringify(episode.taskSchedule)),
      profileSha256: sha256(episode.profile),
      admittedHistory,
    },
    turns: episode.turns,
    answers: episode.answers,
    proposals: episode.proposals,
    decisions: episode.decisions,
    replays: episode.replays,
    timeline: episode.events.map(event => ({ revision: event.revision, type: event.type, recordedAt: event.recordedAt, eventSha256: event.eventSha256, previousEventSha256: event.previousEventSha256 })),
    metrics: episodeMetrics(episode),
    authority: { localEpisodeMemory: true, requiresApprovalForLearning: true, changesTruthStatus: false, corpusPromotion: false, modelWeightTraining: false },
  };
}

export function createObservatoryRuntime({ root = process.cwd(), stateRoot, now, idFactory } = {}) {
  const corpusRoot = resolve(root instanceof URL ? fileURLToPath(root) : root);
  const store = createEpisodeStore({ ...(stateRoot ? { root: stateRoot } : {}), ...(now ? { now } : {}), ...(idFactory ? { idFactory } : {}) });
  const current = episodeId => deriveEpisode(store.load(episodeId));
  const view = episodeId => publicEpisode(current(episodeId));

  function createEpisode({ objective, taskSchedule, profile = "all", controls = {} } = {}) {
    const normalizedObjective = typeof objective === "string" ? objective.trim() : "";
    if (normalizedObjective.length < 2 || normalizedObjective.length > 500) throw new Error("objective must contain 2 to 500 characters");
    const normalized = normalizedControls({ ...controls, profile });
    const schedule = normalizedTaskSchedule(taskSchedule, normalizedObjective);
    const identity = searchCorpus({ root: corpusRoot, query: normalizedObjective, profile, limit: 1 });
    const initialBeliefState = initializeBeliefState({ objective: normalizedObjective, taskSchedule: schedule, profile, corpusContentSha256: identity.corpusContentSha256, processVariance: normalized.processVariance });
    const record = store.create({ objective: normalizedObjective, taskSchedule: schedule, profile, corpusContentSha256: identity.corpusContentSha256, controls: normalized, initialBeliefState });
    return publicEpisode(deriveEpisode(record));
  }

  function listEpisodes() {
    return store.list().map(record => {
      const episode = deriveEpisode(record);
      return { episodeId: episode.episodeId, objective: episode.objective, profile: episode.profile, revision: episode.revision, frozen: episode.frozen, updatedAt: episode.events.at(-1).recordedAt, metrics: episodeMetrics(episode) };
    });
  }

  function planTurn(episodeId, { task } = {}) {
    const episode = current(episodeId);
    const normalizedTask = task === undefined ? episode.objective : typeof task === "string" ? task.trim() : "";
    const allowed = episode.taskSchedule.length ? episode.taskSchedule.includes(normalizedTask) : normalizedTask === episode.objective;
    if (!allowed) throw new Error(episode.taskSchedule.length ? "turn task is outside the preregistered taskSchedule" : "turn task must exactly match the episode objective; create a new episode for a different objective");
    const plan = buildAdaptiveCorpusContext({ root: corpusRoot, task: normalizedTask, beliefState: episode.beliefState, ...episode.controls });
    const turn = { turnId: id("turn"), task: normalizedTask, stateSha256: episode.beliefState.stateSha256, policySha256: sha256(stableStringify(episode.controls)), controls: episode.controls, plan };
    const record = store.append(episodeId, "turn.planned", turn, { expectedRevision: episode.revision });
    return { episode: publicEpisode(deriveEpisode(record)), turn };
  }

  function recordAnswer(episodeId, { turnId, model, prompt, answer, claims } = {}) {
    const episode = current(episodeId);
    const turn = episode.turns.find(item => item.turnId === turnId);
    if (!turn) throw new Error("turnId does not identify a planned turn");
    if (episode.answers.some(item => item.turnId === turnId)) throw new Error("this turn already has an answer receipt");
    const receipt = createAnswerReceipt({ contextReceipt: turn.plan.adaptive.receipt, contextSources: turn.plan.adaptive.sources, model, prompt, answer, claims });
    const payload = { answerId: id("answer"), turnId, receipt };
    const record = store.append(episodeId, "answer.recorded", payload, { expectedRevision: episode.revision });
    return { episode: publicEpisode(deriveEpisode(record)), answer: payload };
  }

  function proposeUpdate(episodeId, { observations } = {}) {
    const episode = current(episodeId);
    if (episode.frozen) throw new Error("episode learning is frozen");
    if (episode.proposals.some(item => item.status === "pending")) throw new Error("resolve the pending proposal before creating another");
    if (!Array.isArray(observations)) throw new Error("observations must be an array");
    const normalized = observations.map((observation, index) => {
      if (typeof observation.turnId !== "string") throw new Error("every observation must identify its recorded turn");
      const turn = episode.turns.find(item => item.turnId === observation.turnId);
      if (!turn) throw new Error("observation turnId does not identify a recorded turn");
      const selected = turn ? [...turn.plan.adaptive.sources, ...turn.plan.baseline.sources].find(source => source.path === observation.sourcePath) : null;
      if (typeof observation.sourcePath !== "string" || observation.sourcePath.includes("..") || observation.sourcePath.includes("\\")) throw new Error("observation sourcePath is invalid");
      let actualSourceSha256;
      try { actualSourceSha256 = sha256(readFileSync(join(corpusRoot, ...observation.sourcePath.split("/")), "utf8")); }
      catch { throw new Error("observation sourcePath is not a readable corpus source"); }
      if (selected?.sourceSha256 && selected.sourceSha256 !== actualSourceSha256) throw new Error("selected source version no longer matches the recorded turn");
      if (observation.sourceVersionSha256 && observation.sourceVersionSha256 !== actualSourceSha256) throw new Error("observation sourceVersionSha256 does not match the source bytes");
      const isHuman = observation.type === "user-rating";
      const producer = isHuman ? "observatory-human-policy" : "observatory-local-proposal";
      const independenceClass = isHuman ? "human-policy" : "same-run";
      if (observation.producer && observation.producer !== producer) throw new Error("local Observatory producer identity is host-derived");
      if (observation.independenceClass && observation.independenceClass !== independenceClass) throw new Error("local Observatory independenceClass is host-derived");
      const evidenceSha256 = observation.evidenceSha256 ?? sha256(stableStringify({ episodeId, turnId: turn?.turnId ?? null, index, sourcePath: observation.sourcePath, type: observation.type, value: observation.value, producer }));
      const selectionArm = turn.plan.adaptive.sources.some(source => source.path === observation.sourcePath) ? (selected?.selectionRole === "explore" ? "exploration" : "adaptive") : turn.plan.baseline.sources.some(source => source.path === observation.sourcePath) ? "baseline" : "external";
      if (observation.selectionArm && observation.selectionArm !== selectionArm) throw new Error("observation selectionArm does not match the recorded turn");
      return {
        ...observation,
        turnId: turn?.turnId ?? null,
        evidenceSha256,
        evidenceFamilySha256: observation.evidenceFamilySha256 ?? sha256(stableStringify({ episodeId, turnId: turn?.turnId ?? null, evidenceSha256, producer })),
        sourceVersionSha256: actualSourceSha256,
        producer,
        independenceClass,
        selectionArm,
      };
    });
    const estimatorObservations = normalized.map(({ turnId: _turnId, ...observation }) => observation);
    const updated = updateBeliefState({ beliefState: episode.beliefState, observations: estimatorObservations, corpusContentSha256: episode.corpusContentSha256 });
    const acceptedObservations = updated.report.observations.map((observation, index) => ({
      type: observation.type,
      sourcePath: observation.sourcePath,
      value: observation.value,
      noiseVariance: observation.noiseVariance,
      note: observation.note,
      evidenceSha256: observation.evidenceSha256,
      evidenceFamilySha256: observation.evidenceFamilySha256,
      sourceVersionSha256: observation.sourceVersionSha256,
      producer: observation.producer,
      independenceClass: observation.independenceClass,
      selectionArm: observation.selectionArm,
      turnId: normalized[index].turnId ?? null,
    }));
    const proposal = { proposalId: id("proposal"), priorStateSha256: episode.beliefState.stateSha256, successorState: updated.state, report: updated.report, observations: acceptedObservations };
    const record = store.append(episodeId, "update.proposed", proposal, { expectedRevision: episode.revision });
    return { episode: publicEpisode(deriveEpisode(record)), proposal };
  }

  function decideUpdate(episodeId, proposalId, { decision, reason = null } = {}) {
    const episode = current(episodeId);
    const proposal = episode.proposals.find(item => item.proposalId === proposalId);
    if (!proposal || proposal.status !== "pending") throw new Error("proposal is not pending");
    if (decision !== "approve" && decision !== "reject") throw new Error("decision must be approve or reject");
    if (decision === "approve" && episode.frozen) throw new Error("episode learning is frozen");
    if (decision === "approve" && proposal.priorStateSha256 !== episode.beliefState.stateSha256) throw new Error("proposal is stale against the active belief state");
    if (reason !== null && (typeof reason !== "string" || reason.length > 1000)) throw new Error("decision reason is invalid");
    const payload = { proposalId, decision, reason, priorStateSha256: proposal.priorStateSha256, successorStateSha256: proposal.successorState.stateSha256 };
    const type = decision === "approve" ? "update.approved" : "update.rejected";
    const record = store.append(episodeId, type, payload, { expectedRevision: episode.revision });
    return publicEpisode(deriveEpisode(record));
  }

  function setControls(episodeId, controls) {
    const episode = current(episodeId);
    if (episode.frozen) throw new Error("episode policy is frozen");
    const normalized = normalizedControls({ ...episode.controls, ...controls, profile: episode.profile });
    if (normalized.processVariance !== episode.controls.processVariance) throw new Error("processVariance is fixed for an episode; use replay or create a new episode to change it");
    const record = store.append(episodeId, "episode.controls-changed", { controls: normalized }, { expectedRevision: episode.revision });
    return publicEpisode(deriveEpisode(record));
  }

  function setFrozen(episodeId, frozen) {
    if (typeof frozen !== "boolean") throw new Error("frozen must be boolean");
    const episode = current(episodeId);
    const record = store.append(episodeId, frozen ? "episode.frozen" : "episode.unfrozen", { frozen }, { expectedRevision: episode.revision });
    return publicEpisode(deriveEpisode(record));
  }

  function rollback(episodeId, { targetStateSha256, reason = null } = {}) {
    const episode = current(episodeId);
    if (episode.frozen) throw new Error("episode learning is frozen");
    if (reason !== null && (typeof reason !== "string" || reason.length > 1000)) throw new Error("rollback reason is invalid");
    const admissibleStates = [episode.events[0].payload.initialBeliefState, ...episode.proposals.filter(item => item.status === "approved").map(item => item.successorState)];
    const targetState = admissibleStates.find(state => state.stateSha256 === targetStateSha256);
    if (!targetState) throw new Error("rollback target is not a previously admitted state");
    if (targetState.stateSha256 === episode.beliefState.stateSha256) throw new Error("rollback target is already admitted");
    const payload = { rollbackId: id("rollback"), fromStateSha256: episode.beliefState.stateSha256, targetStateSha256, targetState, reason };
    const record = store.append(episodeId, "update.rolled-back", payload, { expectedRevision: episode.revision });
    return publicEpisode(deriveEpisode(record));
  }

  function replay(episodeId, { processVariance, adaptiveWeight, explorationWeight, graphWeight } = {}) {
    const episode = current(episodeId);
    const controls = normalizedControls({ ...episode.controls, processVariance: processVariance ?? episode.controls.processVariance, adaptiveWeight: adaptiveWeight ?? episode.controls.adaptiveWeight, explorationWeight: explorationWeight ?? episode.controls.explorationWeight, graphWeight: graphWeight ?? episode.controls.graphWeight });
    let state = initializeBeliefState({ objective: episode.objective, taskSchedule: episode.taskSchedule, profile: episode.profile, corpusContentSha256: episode.corpusContentSha256, processVariance: controls.processVariance });
    const replayStateByRecordedSha256 = new Map([[episode.events[0].payload.initialBeliefState.stateSha256, state]]);
    const proposalById = new Map(episode.proposals.map(proposal => [proposal.proposalId, proposal]));
    const turnComparisons = [];
    for (const event of episode.events.slice(1)) {
      if (event.type === "turn.planned") {
        const universe = event.payload.plan.candidateUniverse;
        if (!Array.isArray(universe) || !universe.length) throw new Error("recorded turn predates candidate-universe receipts and cannot be replayed faithfully");
        const alternativeSources = selectSources(universe, controls.maxSources, event.payload.task, {
          sources: state.sources,
          prior: state.policy.prior,
          adaptiveWeight: Object.keys(state.sources).length ? controls.adaptiveWeight : 0,
          explorationWeight: Object.keys(state.sources).length ? controls.explorationWeight : 0,
          stateSha256: state.stateSha256,
        });
        turnComparisons.push({
          turnId: event.payload.turnId,
          recordedAdaptiveSources: event.payload.plan.adaptive.sources.map(source => source.path),
          replayAdaptiveSources: alternativeSources.map(source => source.path),
          sourceJaccard: jaccard(event.payload.plan.adaptive.sources.map(source => source.path), alternativeSources.map(source => source.path)),
          candidateUniverseSha256: event.payload.plan.candidateUniverseSha256,
          candidateUniverseSize: universe.length,
        });
      } else if (event.type === "update.approved") {
        const proposal = proposalById.get(event.payload.proposalId);
        const estimatorObservations = proposal.observations.map(({ turnId: _turnId, ...observation }) => observation);
        state = updateBeliefState({ beliefState: state, observations: estimatorObservations, corpusContentSha256: episode.corpusContentSha256 }).state;
        replayStateByRecordedSha256.set(proposal.successorState.stateSha256, state);
      } else if (event.type === "update.rolled-back") {
        const target = replayStateByRecordedSha256.get(event.payload.targetStateSha256);
        if (!target) throw new Error("rollback target has no counterfactual replay state");
        state = target;
      }
    }
    const sourceDiffs = [...new Set([...Object.keys(episode.beliefState.sources), ...Object.keys(state.sources)])].map(path => ({ path, recorded: episode.beliefState.sources[path] ?? null, replay: state.sources[path] ?? null }));
    const replayResult = { replayId: id("replay"), controls, finalStateSha256: state.stateSha256, recordedStateSha256: episode.beliefState.stateSha256, sourceDiffs, turnComparisons };
    const record = store.append(episodeId, "replay.completed", replayResult, { expectedRevision: episode.revision });
    return { episode: publicEpisode(deriveEpisode(record)), replay: replayResult };
  }

  return Object.freeze({ store, createEpisode, listEpisodes, getEpisode: view, planTurn, recordAnswer, proposeUpdate, decideUpdate, setControls, setFrozen, rollback, replay });
}
