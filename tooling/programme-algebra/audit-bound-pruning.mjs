import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { boundDecision } from "./bounded-target.mjs";

const root = resolve(import.meta.dirname, "../..");
const lane = "corpus/programmes/programme-algebra/learning";
const slack = 64 * Number.EPSILON;

async function read(name, expected) {
  const path = lane + "/" + name + ".json";
  const bytes = await readFile(resolve(root, path));
  const sha256 = createHash("sha256").update(bytes).digest("hex");
  if (expected) assert.equal(sha256, expected, path);
  return { data: JSON.parse(bytes), pin: { path, sha256 } };
}

function cannotMeet(rule, { upperBound, target, required, margin = 0 }) {
  assert.ok([upperBound, target, margin].every(Number.isFinite) && margin >= 0);
  assert.ok(required === ">" || required === ">=");
  const ceiling = upperBound + margin;
  if (rule === "reject-if-less") return ceiling < target;
  if (rule === "reject-if-at-most") return ceiling <= target;
  assert.equal(rule, "respect-requested-comparison");
  return boundDecision({ upperBound, target, required, margin }) === "certified-impossible";
}

const { data: plan, pin: planPin } = await read("bound-pruning-transfer-plan");
const [fitPlan, fitBudget, fitReplay, nominal, robust, partition] = await Promise.all([
  read("detector-timing-gain-replay-plan", plan.training.fitPlan),
  read("detector-timing-gain-budget", plan.training.fitBudget),
  read("detector-timing-gain-replay", plan.training.fitReplay),
  read("fixed-trial-budget-replay", plan.training.nominalBudget),
  read("calibration-box-budget-screen-replay", plan.held.robustBudget),
  read("departure-change-partition-replay", plan.held.partition)
]);
assert.equal(fitPlan.data.budget.sha256, fitBudget.pin.sha256);
assert.equal(fitReplay.data.replayPlanSha256, fitPlan.pin.sha256);
assert.equal(fitReplay.data.minimumMeanGain, fitBudget.data.minimumMeanGain);

const fitKey = row => row.source + ":" + row.bandIndex;
const skipped = new Set(fitReplay.data.proofsOfSkippedFits.map(fitKey));
const training = [
  ...fitBudget.data.evidence.map(row => ({
    case: fitKey(row),
    upperBound: row.meanReferenceError, target: fitBudget.data.minimumMeanGain, required: ">",
    rejected: skipped.has(fitKey(row))
  })),
  ...nominal.data.rows.map(({ guarded }) => ({
    case: guarded.case + "/" + guarded.trials,
    upperBound: guarded.upperProbability, target: guarded.target, required: ">=", margin: slack,
    rejected: guarded.decision === "ruled-out-by-upper-bound"
  }))
];
const equality = [
  { case: "strict requirement at equality", upperBound: 1, target: 1, required: ">", rejected: true },
  { case: "inclusive requirement at equality", upperBound: 1, target: 1, required: ">=", rejected: false }
];
const fitting = rows => plan.grammar.filter(rule => rows.every(row => cannotMeet(rule, row) === row.rejected));
const archiveCompatible = fitting(training);
assert.deepEqual(archiveCompatible, plan.grammar);
const selected = fitting([...training, ...equality]);
assert.deepEqual(selected, ["respect-requested-comparison"]);
const [rule] = selected;

const robustCases = robust.data.rows.map(({ guarded, exact }) => {
  const facts = {
    upperBound: guarded.upper.taylorLogMiss, target: guarded.requiredLogMiss, required: ">=", margin: slack
  };
  const reject = cannotMeet(rule, facts);
  assert.equal(reject, guarded.decision === "ruled-out-at-corner");
  if (reject) assert.equal(exact.meetsTarget, false);
  return { case: guarded.case, trials: guarded.trials, ...facts, reject, exactMeetsTarget: exact.meetsTarget };
});

const partitionCases = partition.data.partitions.map(part => {
  const rows = part.rows.map(row => {
    const possibleImprovement = row.packedFootprint - part.rootBytes;
    const reject = cannotMeet(rule, { upperBound: possibleImprovement, target: 0, required: ">" });
    const coldMetadataPartitionBytes = row.totalBytes + part.rootBytes;
    assert.ok(row.coldBytes <= row.packedFootprint);
    if (reject) assert.ok(coldMetadataPartitionBytes >= row.coldBytes);
    // If a verified root is already loaded, its bytes are sunk for this decision.
    const rejectPaidRoot = cannotMeet(rule, { upperBound: row.packedFootprint, target: 0, required: ">" });
    assert.equal(rejectPaidRoot, false);
    return {
      region: row.region, steps: row.steps, phase: row.phase, initial: row.initial, threshold: row.threshold,
      packedFootprint: row.packedFootprint, rootFloor: part.rootBytes, possibleImprovement, reject,
      rejectPaidRoot, observedPartitionBytes: coldMetadataPartitionBytes, observedPackedBytes: row.coldBytes
    };
  });
  return {
    trace: part.trace, blockLabels: part.blockLabels,
    questions: rows.length, rejectedBeforeOpeningRoot: rows.filter(row => row.reject).length,
    rejectedWithPaidRoot: rows.filter(row => row.rejectPaidRoot).length, rows
  };
});

console.log(JSON.stringify({
  sources: [planPin, ...[fitPlan, fitBudget, fitReplay, nominal, robust, partition].map(entry => entry.pin)],
  operation: {
    id: "bounded-target/refuse-unreachable-requirement",
    inputType: "admitted-upper-bound-with-explicit-target-comparison",
    outputType: "certified-impossible-or-unresolved",
    rule: "Use the upper bound plus any conservative numerical margin. Reject below an inclusive target and at or below a strict target.",
    limits: "The caller supplies a sound scoped bound. Cost comparisons require two routes with the same output contract and a consistent accounting basis. An unpruned case remains unresolved."
  },
  training: { rows: training, archiveCompatible, equality, selected: rule },
  held: {
    robustBudget: { plannerCallsAvoided: robustCases.filter(row => row.reject).length, rows: robustCases },
    partitionCost: partitionCases
  }
}, null, 2));
