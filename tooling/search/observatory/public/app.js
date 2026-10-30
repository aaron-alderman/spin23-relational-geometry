const $ = selector => document.querySelector(selector);
const state = { episodes: [], episode: null, contributions: [] };

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"]/gu, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character]);
}

function shortHash(value) { return value ? `${value.slice(0, 8)}…${value.slice(-6)}` : "—"; }
function fixed(value, digits = 3) { return Number(value ?? 0).toFixed(digits); }
function toast(message, error = false) {
  const element = $("#toast");
  element.textContent = message;
  element.className = error ? "show error" : "show";
  setTimeout(() => { element.className = ""; }, 3600);
}

async function api(path, options = {}) {
  let token = sessionStorage.getItem("contextHubOperatorToken");
  let response = await fetch(path, { ...options, headers: { ...(options.body ? { "content-type": "application/json" } : {}), ...(token ? { authorization: `Bearer ${token}` } : {}), ...options.headers } });
  if (response.status === 401 && options.method === "POST") {
    token = window.prompt("Observatory operator token (stored for this browser tab only):")?.trim();
    if (token) {
      sessionStorage.setItem("contextHubOperatorToken", token);
      response = await fetch(path, { ...options, headers: { ...(options.body ? { "content-type": "application/json" } : {}), authorization: `Bearer ${token}`, ...options.headers } });
    }
  }
  const value = await response.json();
  if (!response.ok) throw new Error(value.error ?? `Request failed: ${response.status}`);
  return value;
}

async function refreshEpisodes(selectId) {
  const result = await api("/api/episodes");
  state.episodes = result.episodes;
  renderEpisodeList();
  const target = selectId ?? state.episode?.episodeId;
  if (target && state.episodes.some(item => item.episodeId === target)) await loadEpisode(target);
}

async function refreshContributions() {
  const result = await api("/api/contributions");
  state.contributions = result.contributions;
  const pending = state.contributions.filter(item => item.disposition === "pending");
  $("#contribution-count").textContent = `${pending.length} pending`;
  $("#contribution-list").innerHTML = state.contributions.length ? state.contributions.map(item => {
    const dependency = item.dependencies.length ? `<small>depends on ${item.dependencies.map(escapeHtml).join(" · ")}</small>` : "";
    const claim = item.claim ? `<small>claimed by ${escapeHtml(item.claim.actor)}</small>` : "";
    const impact = item.impacts.length ? `<small>${item.impacts.length} downstream impact${item.impacts.length === 1 ? "" : "s"}: ${item.impacts.map(entry => `${escapeHtml(entry.kind)} → ${escapeHtml(entry.target)}`).join(" · ")}</small>` : "";
    const coordination = item.disposition === "pending" ? `<div class="proposal-actions">${item.claim ? `<button class="secondary" data-contribution-action="release" data-contribution="${item.contributionId}">Release</button>` : `<button class="secondary" data-contribution-action="claim" data-contribution="${item.contributionId}">Claim work</button>`}<button class="secondary approve" data-contribution-decision="accept" data-contribution="${item.contributionId}">Accept receipt</button><button class="secondary reject" data-contribution-decision="reject" data-contribution="${item.contributionId}">Reject</button></div>` : `<div class="proposal-actions"><button class="secondary" data-contribution-action="impact" data-contribution="${item.contributionId}">Record downstream impact</button></div>`;
    return `<article class="contribution-item"><div><strong>${escapeHtml(item.proposed.type)}</strong><small>${escapeHtml(item.proposed.contributor)} · ${escapeHtml(item.proposed.profile)} · ${escapeHtml(item.contributionId)}</small><p>${escapeHtml(item.proposed.narrowConclusion)}</p>${dependency}${claim}${impact}<code>${shortHash(item.headSha256)}</code></div><span class="state-pill ${item.disposition === "pending" ? "live" : ""}">${escapeHtml(item.disposition)}</span>${coordination}</article>`;
  }).join("") : '<p class="muted">No outside contributions yet.</p>';
  document.querySelectorAll("[data-contribution-decision]").forEach(button => button.addEventListener("click", () => decideContribution(button.dataset.contribution, button.dataset.contributionDecision)));
  document.querySelectorAll("[data-contribution-action]").forEach(button => button.addEventListener("click", () => coordinateContribution(button.dataset.contribution, button.dataset.contributionAction)));
}

async function decideContribution(contributionId, decision) {
  try { await api(`/api/contributions/${contributionId}/decision`, { method: "POST", body: JSON.stringify({ decision, actor: contributionOperator(), reason: "Disposition recorded through the local Observatory; no admission effect." }) }); await refreshContributions(); toast(`Contribution ${decision}ed; attention state unchanged.`); }
  catch (error) { toast(error.message, true); }
}

function contributionOperator() {
  const actor = $("#contribution-operator").value.trim();
  if (!actor) throw new Error("Enter an operator identity before coordinating work.");
  return actor;
}

async function coordinateContribution(contributionId, action) {
  try {
    const actor = contributionOperator();
    let payload = { actor };
    if (action === "impact") {
      const target = window.prompt("Exact downstream target (file, test, episode or work item):");
      if (!target) return;
      const kind = window.prompt("Impact kind: documentation, test, episode-proposal, linked-work, or no-change", "linked-work");
      if (!kind) return;
      payload = { actor, target, kind };
    }
    await api(`/api/contributions/${contributionId}/${action}`, { method: "POST", body: JSON.stringify(payload) });
    await refreshContributions();
    toast(`${action} event recorded; admission state unchanged.`);
  } catch (error) { toast(error.message, true); }
}

function renderEpisodeList() {
  $("#episode-list").innerHTML = state.episodes.length ? state.episodes.map(episode => `
    <button class="episode-item ${episode.episodeId === state.episode?.episodeId ? "active" : ""}" data-episode="${episode.episodeId}">
      <strong>${escapeHtml(episode.objective)}</strong><span>${escapeHtml(episode.profile)} · r${episode.revision} · ${episode.metrics.turns} turns${episode.frozen ? " · frozen" : ""}</span>
    </button>`).join("") : '<p class="muted">No episodes yet.</p>';
  document.querySelectorAll("[data-episode]").forEach(button => button.addEventListener("click", () => loadEpisode(button.dataset.episode)));
}

async function loadEpisode(episodeId) {
  state.episode = await api(`/api/episodes/${episodeId}`);
  renderEpisodeList();
  renderEpisode();
}

function renderEpisode() {
  const episode = state.episode;
  $("#empty-state").hidden = true;
  $("#episode-view").hidden = false;
  $("#episode-id").textContent = `${episode.episodeId} · revision ${episode.revision}`;
  $("#episode-objective").textContent = episode.objective;
  $("#episode-meta").textContent = `${episode.profile} profile${episode.taskSchedule.length ? ` · ${episode.taskSchedule.length} preregistered tasks` : " · exact-objective turns"} · corpus ${shortHash(episode.corpusContentSha256)} · policy ${shortHash(episode.governance.policySha256)} · admitted ${shortHash(episode.governance.admittedStateSha256)}${episode.governance.candidateStateSha256 ? ` · candidate ${shortHash(episode.governance.candidateStateSha256)}` : ""}`;
  $("#corpus-short").textContent = shortHash(episode.corpusContentSha256);
  $("#head-hash").textContent = `head ${shortHash(episode.headSha256)}`;
  $("#freeze-state").textContent = episode.frozen ? "learning frozen" : "learning open";
  $("#freeze-state").className = `state-pill ${episode.frozen ? "frozen" : "live"}`;
  $("#freeze-toggle").textContent = episode.frozen ? "Unfreeze" : "Freeze learning";
  renderMetrics(episode.metrics);
  renderControls(episode.controls);
  renderContext(episode.turns.at(-1));
  renderAnswer(episode.answers.at(-1), episode.turns.at(-1));
  renderBeliefs(episode.beliefState.sources);
  renderProposal(episode.proposals.find(item => item.status === "pending"));
  renderRollback(episode.governance.admittedHistory);
  renderObservationSources(episode.turns.at(-1));
  renderReplay(episode.replays.at(-1));
  renderTimeline(episode.timeline);
}

function renderMetrics(metrics) {
  const values = [
    ["turns", metrics.turns], ["observed sources", metrics.observedSources], ["mean uncertainty", fixed(metrics.meanVariance)],
    ["mean innovation", fixed(metrics.meanAbsoluteInnovation)], ["independent families", metrics.independentEvidenceFamilies], ["selection overlap", fixed(metrics.meanBaselineAdaptiveJaccard)], ["adaptive balance", `${metrics.adaptiveOutcomeBalance >= 0 ? "+" : ""}${metrics.adaptiveOutcomeBalance}`],
  ];
  $("#metrics").innerHTML = values.map(([label, value]) => `<div class="metric"><span>${label}</span><strong>${value}</strong></div>`).join("");
}

function renderControls(controls) {
  const form = $("#controls-form");
  for (const key of ["graphWeight", "adaptiveWeight", "explorationWeight", "maxSources"]) form.elements[key].value = controls[key];
  $("#replay-form").elements.processVariance.value = controls.processVariance;
  $("#replay-form").elements.adaptiveWeight.value = controls.adaptiveWeight;
  updateOutputs();
}

function updateOutputs() {
  const form = $("#controls-form");
  $("#graph-out").textContent = form.elements.graphWeight.value;
  $("#adaptive-out").textContent = form.elements.adaptiveWeight.value;
  $("#explore-out").textContent = form.elements.explorationWeight.value;
  $("#sources-out").textContent = form.elements.maxSources.value;
}

function sourceCard(source, className = "") {
  return `<div class="source-card ${className} ${source.selectionRole === "explore" ? "explore" : ""}"><strong>${escapeHtml(source.title)}</strong><small>${escapeHtml(source.path)}</small><small>${escapeHtml(source.status)}${source.posteriorUtility == null ? "" : ` · μ ${fixed(source.posteriorUtility)} · P ${fixed(source.posteriorVariance)}`}</small></div>`;
}

function renderContext(turn) {
  if (!turn) { $("#context-comparison").innerHTML = '<p class="muted">Plan a turn to inspect selection.</p>'; $("#context-jaccard").textContent = "no turn"; return; }
  const baseline = turn.plan.baseline.sources;
  const adaptive = turn.plan.adaptive.sources;
  const basePaths = new Set(baseline.map(source => source.path));
  const adaptivePaths = new Set(adaptive.map(source => source.path));
  const overlap = new Set([...basePaths, ...adaptivePaths]).size ? [...basePaths].filter(path => adaptivePaths.has(path)).length / new Set([...basePaths, ...adaptivePaths]).size : 1;
  $("#context-jaccard").textContent = `Jaccard ${fixed(overlap)} · ${turn.plan.candidateUniverse?.length ?? "?"} eligible`;
  $("#context-comparison").innerHTML = `<div class="context-column"><h4>Baseline</h4>${baseline.map(source => sourceCard(source, adaptivePaths.has(source.path) ? "" : "omitted")).join("")}</div><div class="context-column"><h4>Adaptive</h4>${adaptive.map(source => sourceCard(source, basePaths.has(source.path) ? "" : "added")).join("")}</div>`;
}

function renderBeliefs(sources) {
  const entries = Object.entries(sources).sort(([, left], [, right]) => right.utilityMean - left.utilityMean);
  $("#belief-count").textContent = `${entries.length} observed`;
  $("#belief-list").innerHTML = entries.length ? entries.map(([path, estimate]) => {
    const sigma = Math.sqrt(estimate.utilityVariance);
    const low = Math.max(0, estimate.utilityMean - sigma);
    const high = Math.min(1, estimate.utilityMean + sigma);
    return `<div class="belief-row" title="${escapeHtml(path)}"><span class="belief-name">${escapeHtml(path.split("/").at(-1))}<small>${estimate.evidenceFamilyCount} families</small></span><div class="belief-track"><div class="belief-bar" style="width:${estimate.utilityMean * 100}%"></div><div class="belief-uncertainty" style="left:${low * 100}%;width:${(high - low) * 100}%"></div></div><code>${fixed(estimate.utilityMean)} ± ${fixed(sigma)}</code></div>`;
  }).join("") : '<p class="muted">No evidence has been admitted. Priors remain untouched.</p>';
}

function renderAnswer(answer, turn) {
  $("#answer-receipt").textContent = answer ? shortHash(answer.receipt.receiptSha256) : "no receipt";
  const form = $("#answer-form");
  const hasLatest = answer && answer.turnId === turn?.turnId;
  form.querySelector("button").disabled = !turn || hasLatest;
  if (turn && !form.elements.prompt.value) form.elements.prompt.value = turn.task;
}

function renderProposal(proposal) {
  if (!proposal) { $("#proposal-panel").innerHTML = '<p class="muted">No pending proposal. Evidence cannot change the active state until it is approved here.</p>'; return; }
  $("#proposal-panel").innerHTML = `<div class="proposal"><p><strong>${proposal.observations.length} observation${proposal.observations.length === 1 ? "" : "s"}</strong><br><span class="muted">${shortHash(proposal.priorStateSha256)} → ${shortHash(proposal.successorState.stateSha256)}</span></p>${proposal.report.innovations.map(item => `<div class="innovation"><span>${escapeHtml(item.type)} · ${escapeHtml(item.sourcePath.split("/").at(-1))}</span><strong>${item.residual >= 0 ? "+" : ""}${fixed(item.residual)}</strong></div>`).join("")}<div class="proposal-actions"><button class="secondary approve" data-decision="approve">Approve successor</button><button class="secondary reject" data-decision="reject">Reject</button></div></div>`;
  document.querySelectorAll("[data-decision]").forEach(button => button.addEventListener("click", () => decide(proposal.proposalId, button.dataset.decision)));
}

function renderRollback(history) {
  const form = $("#rollback-form");
  const choices = history.filter(item => !item.current);
  form.elements.targetStateSha256.innerHTML = choices.length ? choices.map(item => `<option value="${item.stateSha256}">sequence ${item.sequence} · ${shortHash(item.stateSha256)}</option>`).join("") : '<option value="">No earlier admitted state</option>';
  form.querySelector("button").disabled = !choices.length || state.episode.frozen;
}

function renderObservationSources(turn) {
  const select = $("#observation-form").elements.sourcePath;
  const sources = turn?.plan.adaptive.sources ?? [];
  select.innerHTML = sources.length ? sources.map(source => `<option value="${escapeHtml(source.path)}">${escapeHtml(source.title)}</option>`).join("") : '<option value="">Plan a turn first</option>';
}

function renderReplay(replay) {
  $("#replay-result").innerHTML = replay ? `<strong>Replay ${escapeHtml(replay.replayId)}</strong><br>${replay.turnComparisons.length} turns · mean source overlap ${fixed(replay.turnComparisons.length ? replay.turnComparisons.reduce((sum, item) => sum + item.sourceJaccard, 0) / replay.turnComparisons.length : 1)}<br>Recorded ${shortHash(replay.recordedStateSha256)}<br>Counterfactual ${shortHash(replay.finalStateSha256)}` : "No counterfactual replay yet.";
}

function renderTimeline(timeline) {
  $("#timeline").innerHTML = [...timeline].reverse().map(event => `<li><strong>r${event.revision} · ${escapeHtml(event.type)}</strong><span>${new Date(event.recordedAt).toLocaleString()}</span><br><span>${shortHash(event.eventSha256)}</span></li>`).join("");
}

async function decide(proposalId, decision) {
  try { state.episode = await api(`/api/episodes/${state.episode.episodeId}/proposals/${proposalId}/decision`, { method: "POST", body: JSON.stringify({ decision }) }); renderEpisode(); renderEpisodeList(); toast(`Proposal ${decision}d.`); }
  catch (error) { toast(error.message, true); }
}

$("#create-episode").addEventListener("click", async () => {
  try {
    const objective = $("#objective").value.trim();
    const profile = $("#new-profile").value;
    const taskSchedule = $("#task-schedule").value.split(/\r?\n/u).map(value => value.trim()).filter(Boolean);
    const episode = await api("/api/episodes", { method: "POST", body: JSON.stringify({ objective, profile, ...(taskSchedule.length ? { taskSchedule } : {}) }) });
    $("#objective").value = "";
    $("#task-schedule").value = "";
    await refreshEpisodes(episode.episodeId);
    toast("Episode created with an untouched prior.");
  } catch (error) { toast(error.message, true); }
});
$("#contribution-form").addEventListener("submit", async event => {
  event.preventDefault();
  try {
    const data = Object.fromEntries(new FormData(event.currentTarget));
    data.sourcePaths = data.sourcePaths.split(/\r?\n/u).map(value => value.trim()).filter(Boolean);
    data.dependsOn = data.dependsOn.split(/\r?\n/u).map(value => value.trim()).filter(Boolean);
    const contribution = await api("/api/contributions", { method: "POST", body: JSON.stringify(data) });
    event.currentTarget.reset();
    await refreshContributions();
    toast(`Contribution receipt ${shortHash(contribution.headSha256)} recorded.`);
  } catch (error) { toast(error.message, true); }
});
$("#refresh").addEventListener("click", () => refreshEpisodes().catch(error => toast(error.message, true)));
$("#freeze-toggle").addEventListener("click", async () => {
  try { state.episode = await api(`/api/episodes/${state.episode.episodeId}/freeze`, { method: "POST", body: JSON.stringify({ frozen: !state.episode.frozen }) }); renderEpisode(); renderEpisodeList(); }
  catch (error) { toast(error.message, true); }
});
$("#controls-form").addEventListener("input", updateOutputs);
$("#controls-form").addEventListener("submit", async event => {
  event.preventDefault();
  try {
    const data = Object.fromEntries(new FormData(event.currentTarget));
    for (const key of Object.keys(data)) data[key] = Number(data[key]);
    state.episode = await api(`/api/episodes/${state.episode.episodeId}/controls`, { method: "POST", body: JSON.stringify(data) });
    renderEpisode(); toast("Control event appended.");
  } catch (error) { toast(error.message, true); }
});
$("#turn-form").addEventListener("submit", async event => {
  event.preventDefault();
  try { const result = await api(`/api/episodes/${state.episode.episodeId}/turns`, { method: "POST", body: JSON.stringify({ task: new FormData(event.currentTarget).get("task") }) }); state.episode = result.episode; renderEpisode(); renderEpisodeList(); toast("Baseline and adaptive contexts recorded."); }
  catch (error) { toast(error.message, true); }
});
$("#observation-form").addEventListener("submit", async event => {
  event.preventDefault();
  try {
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const turnId = state.episode.turns.at(-1)?.turnId;
    const observation = { type: data.type, sourcePath: data.sourcePath, turnId, note: "Proposed through the local Observatory." };
    if (data.evidenceSha256.trim()) observation.evidenceSha256 = data.evidenceSha256.trim();
    if (data.evidenceFamilySha256.trim()) observation.evidenceFamilySha256 = data.evidenceFamilySha256.trim();
    if (data.type === "user-rating") { observation.value = Number(data.value); observation.noiseVariance = Number(data.noiseVariance); }
    const result = await api(`/api/episodes/${state.episode.episodeId}/proposals`, { method: "POST", body: JSON.stringify({ observations: [observation] }) });
    state.episode = result.episode; renderEpisode(); renderEpisodeList(); toast("Update calculated; active state is unchanged pending approval.");
  } catch (error) { toast(error.message, true); }
});
$("#rollback-form").addEventListener("submit", async event => {
  event.preventDefault();
  try { const data = Object.fromEntries(new FormData(event.currentTarget)); state.episode = await api(`/api/episodes/${state.episode.episodeId}/rollback`, { method: "POST", body: JSON.stringify(data) }); renderEpisode(); renderEpisodeList(); toast("Rollback appended; prior admitted state restored without erasing history."); }
  catch (error) { toast(error.message, true); }
});
$("#answer-form").addEventListener("submit", async event => {
  event.preventDefault();
  try {
    const data = Object.fromEntries(new FormData(event.currentTarget));
    let claims;
    try { claims = JSON.parse(data.claims); } catch { throw new Error("Atomic claims must be valid JSON."); }
    const turnId = state.episode.turns.at(-1)?.turnId;
    const result = await api(`/api/episodes/${state.episode.episodeId}/answers`, { method: "POST", body: JSON.stringify({ turnId, model: { name: data.modelName }, prompt: data.prompt, answer: data.answer, claims }) });
    state.episode = result.episode; renderEpisode(); renderEpisodeList(); toast(`Answer receipt ${shortHash(result.answer.receipt.receiptSha256)} recorded.`);
  } catch (error) { toast(error.message, true); }
});
$("#replay-form").addEventListener("submit", async event => {
  event.preventDefault();
  try { const data = Object.fromEntries(new FormData(event.currentTarget)); for (const key of Object.keys(data)) data[key] = Number(data[key]); const result = await api(`/api/episodes/${state.episode.episodeId}/replay`, { method: "POST", body: JSON.stringify(data) }); state.episode = result.episode; renderEpisode(); renderEpisodeList(); toast("Counterfactual replay recorded; active belief was not changed."); }
  catch (error) { toast(error.message, true); }
});

Promise.all([refreshEpisodes(), refreshContributions()]).catch(error => toast(error.message, true));
