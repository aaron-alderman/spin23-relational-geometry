import assert from 'node:assert/strict';
import {readFileSync, writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {durationRecord, durationSummary, horizonLabel, fitLogistic, predict, brierEnvelope} from './duration_statistics.mjs';

const run = (time, event = 'close_encounter', numericalStatus = 'accepted') => ({completedCycles: time, event, numericalStatus});
const censored = durationRecord([run(100, null), run(100, null)], 100);
assert.equal(censored.status, 'administratively_right_censored');
assert.equal(censored.lowerObservedCycles, 100);
assert.equal(censored.upperObservedCycles, null);
assert.deepEqual(censored.reciprocalDurationRange, {lower: 0, upper: .01});
assert.equal(horizonLabel([run(10), run(12)], 11), null);
assert.equal(horizonLabel([run(10), run(12)], 13), 1);
assert.equal(horizonLabel([run(100, null), run(100, null)], 100), 0);
assert.equal(horizonLabel([run(100, null), run(100, null, 'unresolved')], 10), null);
assert.equal(durationRecord([run(20), run(100, null)], 100).upperObservedCycles, null);
const toy = [{runs: [run(10), run(12)]}, {runs: [run(20), run(25)]}, {runs: [run(100, null), run(100, null)]}];
const toySummary = durationSummary(toy, 100);
assert.ok(Math.abs(toySummary.restrictedMeanDuration.lower - 130 / 3) < 1e-12);
assert.ok(Math.abs(toySummary.restrictedMeanDuration.upper - 137 / 3) < 1e-12);
assert.equal(toySummary.quantiles.find(q => q.p === .5).restrictedLowerCycles, 20);
for (const side of ['Lower', 'Upper']) {
  let area = 0;
  for (let i = 0; i < toySummary.curve.length - 1; i++) area +=
    toySummary.curve[i][`survival${side}`] * (toySummary.curve[i + 1].cycles - toySummary.curve[i].cycles);
  assert.ok(Math.abs(area - toySummary.restrictedMeanDuration[side.toLowerCase()]) < 1e-12);
}
const zeroEventModel = fitLogistic(Array.from({length: 9}, (_, i) => ({label: 0, features: {x: i}})), []);
assert.ok(Math.abs(predict(zeroEventModel, {}) - .05) < 1e-10);
const learned = fitLogistic(Array.from({length: 20}, (_, i) => ({label: i >= 10 ? 1 : 0, features: {x: i}})), ['x']);
assert.ok(predict(learned, {x: 17}) > predict(learned, {x: 3}));
const scored = brierEnvelope([{probability: .2, label: 0}, {probability: .8, label: null}]);
assert.ok(Math.abs(scored.scoreLower - .04) < 1e-12);
assert.ok(Math.abs(scored.scoreUpper - .34) < 1e-12);

const root = new URL('../../', import.meta.url);
const hash = path => createHash('sha256').update(readFileSync(new URL(path, root))).digest('hex');
const read = path => JSON.parse(readFileSync(new URL(path, root), 'utf8'));
const runsPath = 'evidence/data/relational-orbital-duration-runs-v1.json';
const data = read(runsPath), results = read('evidence/data/relational-orbital-duration-analysis-v1.json');
const independent = read('evidence/data/relational-orbital-duration-fit-check-v1.json');
assert.equal(data.configSha256, hash('evidence/data/relational-orbital-duration-config-v1.json'));
assert.equal(data.engineSha256, hash('verification/dynatology/relational_persistence_engine.mjs'));
assert.equal(results.runsSha256, hash(runsPath));
assert.equal(independent.runsSha256, hash(runsPath));
assert.equal(independent.analysisSha256, hash('evidence/data/relational-orbital-duration-analysis-v1.json'));
assert.ok(independent.models.every(m => m.maximumCoefficientDifference < 1e-5 && m.gradientNorm < 1e-6));
assert.equal(results.previousAtlasSha256, hash('evidence/data/relational-orbital-persistence-v1.json'));
assert.equal(data.rows.length, 96);
assert.equal(data.rows.filter(r => r.split === 'test').length, 24);
for (const r of data.rows) {
  assert.equal(r.split, data.config.heldOutPhaseSectors.includes(r.sector) ? 'test' : 'train');
  assert.ok(Object.values(r.features).every(Number.isFinite));
  assert.deepEqual(r.runs.map(s => s.stepsPerPeriod), data.config.stepsPerInnerPeriod);
}
for (const model of results.prediction) for (const h of model.horizons) {
  const training = data.rows.filter(r => r.split === 'train' && r.earlyValid && horizonLabel(r.runs, h.cycles) !== null)
    .map(r => ({features: r.features, label: horizonLabel(r.runs, h.cycles)}));
  const refit = fitLogistic(training, data.config.models[model.name], data.config.ridgePenalty);
  assert.deepEqual(refit, h.model);
  assert.equal(h.test.total, h.test.resolved + h.test.unresolved);
  assert.ok(h.test.scoreLower <= h.test.scoreUpper);
  assert.ok(h.test.scoreLower >= 0 && h.test.scoreUpper <= 1);
  for (const prediction of h.predictions) assert.equal(data.rows.find(r => r.id === prediction.id).split, 'test');
}
assert.equal(results.boundaries.exactLifetimeCertified, false);
assert.equal(results.boundaries.physicalHazardEstimated, false);
const files = ['evidence/data/relational-orbital-duration-config-v1.json', runsPath,
  'evidence/data/relational-orbital-duration-analysis-v1.json',
  'evidence/data/relational-orbital-duration-fit-check-v1.json',
  'verification/dynatology/run_relational_duration.mjs', 'verification/dynatology/duration_statistics.mjs',
  'verification/dynatology/analyze_relational_duration.mjs', 'verification/dynatology/verify_relational_duration.mjs',
  'verification/dynatology/check_duration_fits.py', 'verification/dynatology/plot_relational_duration.py',
  'corpus/programmes/dynatology/relational_orbital_duration_v1.md',
  'evidence/figures/relational-orbital-duration-v1.png', 'evidence/figures/relational-orbital-duration-v1.svg'];
const record = {schema: 'relational-orbital-duration-verification/v1', date: '2026-10-30', status: 'pass',
  checks: ['administrative censoring retained', 'resolution disagreement retained', 'restricted-mean area identity',
    'no-event logistic fit finite', 'Brier ambiguity envelope', 'training-only fit and scaling', 'source hashes',
    'independent SciPy coefficient agreement', 'physical authority boundaries'], files: files.map(path => ({path, sha256: hash(path)}))};
writeFileSync(new URL('evidence/data/relational-orbital-duration-verification-v1.json', root), JSON.stringify(record, null, 2) + '\n');
console.log(JSON.stringify({...record, files: `${files.length} source and result hashes`}, null, 2));
