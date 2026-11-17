import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const tolerance = 1e-12;
const unit = value => Number.isFinite(value) && value >= 0 && value <= 1;
const signature = {
  inputTypes: ["finite-window-branch-probability", "absolute-peak-acceptance"],
  outputType: "finite-window-registered-peak-probability"
};

async function rowsFromReceipt(path) {
  const absolute = resolve(process.cwd(), path);
  const bytes = await readFile(absolute);
  const receipt = JSON.parse(bytes);
  const pin = {
    path: relative(root, absolute).replaceAll("\\", "/"),
    sha256: createHash("sha256").update(bytes).digest("hex")
  };
  const rows = [];
  for (const [arm, run] of Object.entries(receipt.runs)) {
    findDetections(run.composed?.stdout, arm, rows);
  }
  assert.ok(rows.length, "No supported detector observations in " + pin.path);
  return { pin, rows };
}

function findDetections(record, at, rows) {
  if (!record || typeof record !== "object") return;
  if (record.detector && record.sourceEvent) {
    const detector = record.detector;
    const source = record.sourceEvent;
    if (record.status === "executed" && source.status === "executed" &&
        detector.type === signature.inputTypes[1] &&
        detector.eventSelection === "emission-window-eventual-peak" &&
        detector.branch === source.branch?.requested && detector.geometry &&
        unit(source.probability) && unit(detector.probability) && unit(record.probability)) {
      rows.push({
        at,
        case: record.case,
        sourceEvent: source.probability,
        acceptance: detector.probability,
        registered: record.probability
      });
    }
    return;
  }
  for (const [key, value] of Object.entries(record)) findDetections(value, at + "." + key, rows);
}

const evaluators = {
  "source-only": (row, scale) => scale * row.sourceEvent,
  "acceptance-only": (row, scale) => scale * row.acceptance,
  "product": (row, scale) => scale * row.sourceEvent * row.acceptance
};

function predict(candidate, row) {
  return evaluators[candidate.expression](row, candidate.scale);
}

function evaluate(candidate, rows) {
  const observations = rows.map(row => {
    const prediction = predict(candidate, row);
    return { at: row.at, expected: row.registered, prediction, absoluteError: Math.abs(row.registered - prediction) };
  });
  return {
    candidate,
    passed: observations.every(result => unit(result.prediction) && result.absoluteError <= tolerance),
    maxAbsoluteError: Math.max(...observations.map(result => result.absoluteError)),
    observations
  };
}

function fit({ pin, rows }) {
  const anchor = rows[0];
  const candidates = [
    { expression: "source-only", scale: 1 },
    { expression: "acceptance-only", scale: 1 },
    { expression: "product", scale: 1 }
  ];
  for (const [expression, input] of [
    ["source-only", anchor.sourceEvent], ["acceptance-only", anchor.acceptance]
  ]) {
    if (input > 0) candidates.push({ expression, scale: anchor.registered / input, fittedAt: anchor.at });
  }
  const fitted = candidates.map(candidate => evaluate(candidate, rows));
  return {
    signature,
    origin: pin,
    fitRows: rows,
    fitted,
    remaining: fitted.filter(result => result.passed).map(result => result.candidate),
    authority: "Candidates from replay observations and a fixed expression grammar. Fitting never grants scientific or execution authority."
  };
}

async function challenge(proposal, holdouts) {
  assert.deepEqual(proposal.signature, signature);
  const [origin, ...sample] = await Promise.all([
    rowsFromReceipt(resolve(root, proposal.origin.path)), ...holdouts.map(rowsFromReceipt)
  ]);
  assert.deepEqual(fit(origin), proposal, "Proposal does not reproduce from its pinned receipt.");
  assert.ok(sample.every(item => item.pin.sha256 !== proposal.origin.sha256), "Held-out records must differ from fit records.");
  assert.equal(new Set(sample.map(item => item.pin.sha256)).size, sample.length, "Do not count copies of one record as additional cases.");
  const rows = sample.flatMap(item => item.rows.map(row => ({ ...row, at: item.pin.path + "#" + row.at })));
  const discriminates = proposal.fitRows.every(fitted =>
    rows.some(row => Math.abs(row.sourceEvent - fitted.sourceEvent) > tolerance));
  const results = proposal.remaining.map(candidate => evaluate(candidate, rows));
  const survivors = results.filter(result => result.passed).map(result => result.candidate);
  return {
    signature,
    origin: proposal.origin,
    holdouts: sample.map(item => item.pin),
    changedSourceProbability: discriminates,
    status: !discriminates ? "axis-not-varied"
      : survivors.length === 1 ? "one-replay-survivor"
      : survivors.length ? "still-ambiguous" : "no-candidate-survives",
    results,
    survivors,
    authority: "A held-out software replay check under the existing detector implementation. It supplies neither independent physical evidence nor a new admission."
  };
}

async function measuredCheck(proposal, path) {
  const checked = await rowsFromReceipt(resolve(root, proposal.origin.path));
  assert.deepEqual(fit(checked), proposal);
  const study = JSON.parse(await readFile(path, "utf8"));
  const { emissionProbability, publishedRelativeBiasLimit, observations } = study;
  assert.ok(unit(emissionProbability) && emissionProbability > 0 && unit(publishedRelativeBiasLimit));
  assert.ok(study.calibrationSource && study.validationSource && study.calibrationSource !== study.validationSource);
  assert.ok(study.evidenceFamily && observations.length);
  const results = proposal.remaining.map(candidate => {
    // In the inverse readout, activity is proportional to counts divided by
    // the product of efficiency and photon yield. The efficiency cancels
    // when comparing these two forms with the same instrument calibration.
    assert.ok(["product", "acceptance-only"].includes(candidate.expression));
    const scale = emissionProbability / predict(candidate, { sourceEvent: emissionProbability, acceptance: 1 });
    const points = observations.map(row => {
      const adjustedBqPerL = row.reportedBqPerL * scale;
      const relativeBias = adjustedBqPerL / row.referenceBqPerL - 1;
      return { ...row, adjustedBqPerL, relativeBias };
    });
    return { candidate, points, passed: points.every(row => Math.abs(row.relativeBias) <= publishedRelativeBiasLimit) };
  });
  return {
    evidenceFamily: study.evidenceFamily,
    source: study.source,
    origin: proposal.origin,
    publishedRelativeBiasLimit,
    results,
    authority: study.limits
  };
}

const [command, path, ...holdouts] = process.argv.slice(2);
let output;
if (command === "fit" && path && !holdouts.length) {
  output = fit(await rowsFromReceipt(path));
} else if (command === "challenge" && path && holdouts.length) {
  output = await challenge(JSON.parse(await readFile(path, "utf8")), holdouts);
} else if (command === "measured-check" && path && holdouts.length === 1) {
  output = await measuredCheck(JSON.parse(await readFile(path, "utf8")), holdouts[0]);
} else {
  throw new Error("Usage: audit-learning-proposals.mjs fit DETECTOR_RECEIPT | challenge PROPOSAL HELD_OUT_RECEIPT... | measured-check PROPOSAL STUDY");
}
console.log(JSON.stringify(output, null, 2));
