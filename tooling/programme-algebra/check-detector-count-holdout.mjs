import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { relative, resolve } from "node:path";
import { reveal } from "./count-outcome-custody.mjs";
import { inspectCountLineage } from "./count-evidence-lineage.mjs";

const root = resolve(import.meta.dirname, "../..");
const metric = "absolute-relative-error-to-positive-net-count";
const unit = x => Number.isFinite(x) && x >= 0 && x <= 1;
const positive = x => Number.isFinite(x) && x > 0;

async function load(file) {
  const absolute = resolve(file);
  const bytes = await readFile(absolute);
  return {
    value: JSON.parse(bytes),
    pin: { path: relative(root, absolute).replaceAll("\\", "/"), sha256: createHash("sha256").update(bytes).digest("hex") }
  };
}

async function freeze(proposalFile, planFile) {
  const [proposal, plan] = await Promise.all([load(proposalFile), load(planFile)]);
  assert.equal(plan.value.criterion.metric, metric);
  assert.ok(unit(plan.value.criterion.maximum));
  assert.ok(proposal.value.remaining.length && proposal.value.remaining.every(item =>
    ["product", "acceptance-only"].includes(item.expression) && unit(item.scale)));
  return { plan: plan.pin, proposal: proposal.pin, candidates: proposal.value.remaining };
}

async function resolveLock(lockFile) {
  const lock = await load(lockFile);
  const planFile = resolve(root, lock.value.plan.path);
  const proposalFile = resolve(root, lock.value.proposal.path);
  assert.deepEqual(await freeze(proposalFile, planFile), lock.value, "Frozen inputs or candidates changed.");
  return { lock, plan: (await load(planFile)).value };
}

async function screen(lockFile, reviewFile) {
  const { lock, plan } = await resolveLock(lockFile);
  const review = await load(reviewFile);
  assert.equal(plan.target.source, review.value.source);
  assert.equal(review.value.decision, "ineligible");
  assert.ok(review.value.missing.length);
  return { lock: lock.pin, review: review.pin, status: "ineligible", missing: review.value.missing, reason: review.value.reason };
}

async function inspect(file) {
  const dossier = await load(file);
  return { dossier: dossier.pin, ...inspectCountLineage(dossier.value.lineage) };
}

function surfaceGrid(plan) {
  const source = plan.sourceNormalization;
  const response = plan.acceptanceModel;
  assert.ok(positive(source.pointActivityBq) && unit(source.photonYield));
  assert.ok(positive(source.gridRadiusM) && positive(response.effectiveRadiusM));
  assert.ok(response.effectiveRadiusM <= source.gridRadiusM);
  assert.equal(response.effectiveRadiusM, response.averageEfficiency.averagingRadiusM,
    "Surface efficiency and response radius refer to different areas.");
  assert.ok(unit(response.averageEfficiency.probability));
  // Equations 15–17 convert the quarter-grid measurement to a full disk.
  // The symmetry and number-of-positions factors cancel in the forward map.
  const areaRatio = (response.effectiveRadiusM / source.gridRadiusM) ** 2;
  return {
    decaysPerSecond: source.pointActivityBq,
    sourceFactor: source.photonYield,
    acceptanceFor: row => {
      assert.ok(Number.isSafeInteger(row.positions) && row.positions > 0 && positive(row.secondsPerPosition));
      assert.equal(row.liveSeconds, row.positions * row.secondsPerPosition,
        "Grid exposure must match the number and duration of positions.");
      return response.averageEfficiency.probability * areaRatio;
    }
  };
}

function sourceAndAcceptance(plan) {
  const source = plan.sourceNormalization;
  if (source.type === "quarter-disk-grid") return surfaceGrid(plan);
  const { referenceActivityBq, decayConstantPerYear, elapsedYears, isotopicPurity, photonYield } = source;
  assert.ok(positive(referenceActivityBq) && positive(decayConstantPerYear) && positive(elapsedYears));
  assert.ok(unit(isotopicPurity) && unit(photonYield));
  const { simulatedHistoriesPerDistance: histories } = plan.acceptanceModel;
  assert.ok(positive(histories));
  return {
    decaysPerSecond: referenceActivityBq * Math.exp(-decayConstantPerYear * elapsedYears),
    sourceFactor: isotopicPurity * photonYield,
    acceptanceFor: row => row.simulatedNetPeakArea / histories
  };
}

async function predict(lockFile) {
  const { lock, plan } = await resolveLock(lockFile);
  const { provenance, acquisitions } = plan;
  const ids = acquisitions.map(row => row.id);
  assert.deepEqual(ids, provenance.heldOutAcquisitions);
  assert.ok(ids.length && ids.every(id => typeof id === "string" && id));
  assert.equal(new Set(ids).size, ids.length);
  const dependencies = [...provenance.acceptanceEvidence, ...provenance.sourceEvidence];
  assert.ok(provenance.acceptanceEvidence.length && provenance.sourceEvidence.length);
  assert.ok(!dependencies.some(id => ids.includes(id)), "Outcome acquisition appears among prediction inputs.");
  assert.ok(!acquisitions.some(row => "netPeakArea" in row), "Outcome counts must be kept in the observation file.");
  if (plan.lineage) {
    assert.deepEqual(plan.lineage.outcomes, ids);
    assert.deepEqual(plan.lineage.predictionRoots, dependencies);
    const audit = inspectCountLineage(plan.lineage);
    assert.equal(audit.status, "no-declared-outcome-reuse", JSON.stringify(audit.collisions));
  }
  const { decaysPerSecond, sourceFactor, acceptanceFor } = sourceAndAcceptance(plan);
  const predictions = acquisitions.map(row => {
    const acceptance = acceptanceFor(row);
    assert.ok(unit(acceptance) && positive(row.liveSeconds));
    const exposure = row.liveSeconds * decaysPerSecond;
    const candidates = lock.value.candidates.map(candidate => ({
      candidate,
      predictedNetPeakArea: exposure * acceptance * candidate.scale *
        (candidate.expression === "product" ? sourceFactor : 1)
    }));
    return { id: row.id, ...(row.distanceCm === undefined ? {} : { distanceCm: row.distanceCm }), exposure, acceptance, candidates };
  });
  return {
    lock: lock.pin,
    evidenceFamily: plan.evidenceFamily,
    mode: plan.mode,
    criterion: plan.criterion,
    decaysPerSecond,
    sourceFactor,
    predictions
  };
}

async function score(lockFile, predictionFile, observationsFile) {
  const predicted = await load(predictionFile);
  assert.deepEqual(await predict(lockFile), predicted.value, "Frozen predictions do not reproduce.");
  const observed = await load(observationsFile);
  assert.equal(observed.value.evidenceFamily, predicted.value.evidenceFamily);
  assert.deepEqual(observed.value.observations.map(row => row.id), predicted.value.predictions.map(row => row.id));
  const results = predicted.value.predictions.map((prediction, index) => {
    const observedNetPeakArea = observed.value.observations[index].netPeakArea;
    assert.ok(positive(observedNetPeakArea));
    return {
      id: prediction.id,
      observedNetPeakArea,
      results: prediction.candidates.map(row => {
        const relativeError = row.predictedNetPeakArea / observedNetPeakArea - 1;
        return { ...row, relativeError, passed: Math.abs(relativeError) <= predicted.value.criterion.maximum };
      })
    };
  });
  return {
    prediction: predicted.pin,
    observations: observed.pin,
    evidenceFamily: predicted.value.evidenceFamily,
    mode: predicted.value.mode,
    results,
    authority: predicted.value.mode === "retrospective-surface-grid"
      ? "One published evidence family. Geometry-matched simulated acceptance and published measured net counts. Retrospective, with no new measurement or nanosecond transfer test."
      : "One published evidence family. Computed acceptance on a different calibration source and published fitted net counts, with no new measurement or nanosecond transfer test."
  };
}

async function scoreSealed(bindingFile, observationsFile, openingFile) {
  const custody = await reveal(bindingFile, observationsFile, openingFile);
  const result = await score(resolve(root, custody.lock.path), resolve(root, custody.prediction.path), observationsFile);
  assert.deepEqual(result.prediction, custody.prediction);
  assert.deepEqual(result.observations, custody.observation);
  return { ...result, custody };
}

const [command, ...args] = process.argv.slice(2);
const commands = { freeze: [2, freeze], screen: [2, screen], inspect: [1, inspect], predict: [1, predict], score: [3, score], "score-sealed": [3, scoreSealed] };
const handler = Object.hasOwn(commands, command) ? commands[command] : null;
if (!handler || args.length !== handler[0]) {
  throw new Error("Usage: check-detector-count-holdout.mjs freeze PROPOSAL PLAN | screen LOCK REVIEW | inspect DOSSIER | predict LOCK | score LOCK PREDICTION OBSERVATIONS | score-sealed BINDING OBSERVATIONS OPENING");
}
console.log(JSON.stringify(await handler[1](...args), null, 2));
