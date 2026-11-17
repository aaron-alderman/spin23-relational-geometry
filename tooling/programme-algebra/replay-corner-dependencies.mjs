import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { runRobustPlanner } from "./replay-budget-cache.mjs";
import { cornerProbes } from "./corner-probes.mjs";

const root = resolve(import.meta.dirname, "../..");
const lane = "corpus/programmes/programme-algebra/learning";
const caseDir = lane + "/fresh-agent-calibration-box";
const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const digest = value => hash(JSON.stringify(value));
const margin = 64 * Number.EPSILON;

async function load(path) {
  const bytes = await readFile(resolve(root, path));
  return { data: JSON.parse(bytes), pin: { path, sha256: hash(bytes) } };
}

const [archive, prior, bart, lorax] = await Promise.all([
  load(caseDir + "/replay.json"),
  load(lane + "/budget-cache-replay.json"),
  load(caseDir + "/bart.json"),
  load(caseDir + "/lorax.json")
]);
for (const pin of archive.data.localPins) {
  assert.equal(hash(await readFile(resolve(root, pin.path))), pin.sha256, pin.path);
}
for (const { pin } of [bart, lorax, archive]) {
  assert.deepEqual(pin, prior.data.sources.find(source => source.path === pin.path));
}

const tables = { exit: new Map(), branch: new Map(), corner: new Map() };

function remember(stage, inputs, owner, calculate) {
  const key = digest(inputs);
  const table = tables[stage];
  const existing = table.get(key);
  if (existing) return { ...existing, reused: true };
  const entry = { key, inputs, value: calculate(), recordedBy: owner };
  table.set(key, entry);
  return { ...entry, reused: false };
}

function consume({ label, example, reply, priorAdmission }) {
  const admission = {
    factsSha256: digest(example),
    replySha256: digest(reply),
    origin: priorAdmission ? "pinned archived planner run" : "new exact planner run",
    status: reply.status
  };
  assert.equal(reply.case, example.id);
  assert.equal(reply.suppliedRoutes, 0);
  if (reply.status !== "executed") return { label, admission };

  const { anyExit, branch } = reply.bound.perTrial.sourceEvent;
  const { corner } = reply;
  assert.equal(anyExit.model, "constant-total-hazard");
  assert.equal(example.facts.trials.type, "independent-identical-bernoulli");
  assert.equal(anyExit.lifetime.seconds, corner.lifetimeSeconds);
  assert.equal(anyExit.timeSeconds, example.facts.timeSeconds);
  assert.equal(branch.requested, example.facts.requestedBranch);
  assert.deepEqual(branch.relativeRates, corner.relativeRates);
  assert.equal(reply.bound.perTrial.detector.probability, corner.detectorProbability);
  assert.equal(reply.bound.perTrial.detector.type, "absolute-peak-acceptance");

  const ratio = anyExit.timeSeconds / corner.lifetimeSeconds;
  const exit = remember("exit", [anyExit.model, ratio], label, () => -Math.expm1(-ratio));
  // Preserve rate iteration order so reduction agrees with the exact planner.
  const rates = Object.entries(corner.relativeRates);
  const selected = corner.relativeRates[branch.requested];
  const branchShare = remember("branch", [branch.requested, rates], label, () =>
    selected / rates.reduce((sum, [, rate]) => sum + rate, 0)
  );
  const logMiss = remember("corner", [exit.key, branchShare.key, corner.detectorProbability], label, () =>
    -Math.log1p(-exit.value * branchShare.value * corner.detectorProbability)
  );
  assert.equal(exit.value, anyExit.probability);
  assert.equal(branchShare.value, branch.conditionalBranchShare);
  const p = exit.value * branchShare.value * corner.detectorProbability;
  assert.equal(p, reply.bound.perTrial.probability);

  const required = -Math.log1p(-example.facts.trials.targetProbability);
  const boundary = [reply.minimumTrialsAcrossBox - 1, reply.minimumTrialsAcrossBox].map(trials => {
    const residual = trials * logMiss.value - required;
    assert.ok(Math.abs(residual) > margin * Math.max(1, required));
    return { trials, meetsTarget: residual >= 0 };
  });
  assert.deepEqual(boundary.map(result => result.meetsTarget), [false, true]);
  return {
    label, admission, exit, branchShare, logMiss,
    nominalMinimum: reply.nominal.minimumTrials,
    boundary
  };
}

const rows = [];
for (const probe of cornerProbes(archive.data, bart.data, lorax.data)) {
  const reply = probe.priorAdmission ?? await runRobustPlanner(probe.example);
  rows.push(consume({ ...probe, reply }));
}

const [b, shifted, l, short, higher, unmatched, dependent] = rows;
assert.notEqual(shifted.admission.factsSha256, b.admission.factsSha256);
assert.notEqual(shifted.admission.replySha256, b.admission.replySha256);
assert.notEqual(shifted.nominalMinimum, b.nominalMinimum);
assert.deepEqual(shifted.boundary, b.boundary);
for (const key of ["exit", "branchShare", "logMiss"]) assert.equal(shifted[key].recordedBy, b.label);
assert.equal(l.exit.recordedBy, b.label);
assert.equal(l.branchShare.recordedBy, b.label);
assert.equal(l.logMiss.reused, false);
assert.equal(short.exit.reused, false);
assert.equal(short.branchShare.recordedBy, b.label);
assert.equal(higher.exit.recordedBy, b.label);
assert.equal(higher.branchShare.reused, false);
for (const refused of [unmatched, dependent]) {
  assert.equal(refused.admission.status, "no-complete-chain");
  assert.equal(refused.logMiss, undefined);
}

const receipt = {
  sources: [prior.pin, archive.pin, bart.pin, lorax.pin],
  operation: {
    id: "calibration-box/reuse-admitted-corner-dependencies",
    inputType: "successful-robust-planner-reply",
    outputType: "corner-log-miss-with-dependency-identities",
    compose: [
      "constant-total-hazard and window/lifetime -> exit probability",
      "requested branch and complete ordered corner rates -> branch fraction",
      "exit key, branch key and matched corner acceptance -> negative log miss per independent preparation"
    ],
    boundary: "Keep case admission and numeric dependency identities separate. Missing or failed admission cannot borrow a result, even when the numeric inputs match. This replay measures post-admission reconstruction; the existing admission call already evaluates the corner."
  },
  postAdmissionEvaluations: {
    perStageWithoutReuse: rows.filter(row => row.admission.status === "executed").length,
    withReuse: Object.fromEntries(Object.entries(tables).map(([stage, table]) => [stage, table.size]))
  },
  rows
};
console.log(JSON.stringify(receipt, null, 2));
