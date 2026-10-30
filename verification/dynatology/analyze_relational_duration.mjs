import {readFileSync, writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {durationRecord, durationSummary, horizonLabel, fitLogistic, predict, brierEnvelope} from './duration_statistics.mjs';

const root = new URL('../../', import.meta.url);
const runPath = 'evidence/data/relational-orbital-duration-runs-v1.json';
const data = JSON.parse(readFileSync(new URL(runPath, root), 'utf8')), {config, rows} = data;
const atlas = JSON.parse(readFileSync(new URL('evidence/data/relational-orbital-persistence-v1.json', root), 'utf8'));
const prediction = Object.entries(config.models).map(([name, names]) => ({name,
  horizons: config.monitorCycles.map(cycles => {
    const eligible = rows.filter(r => r.earlyValid).map(r => ({...r, label: horizonLabel(r.runs, cycles)}));
    const training = eligible.filter(r => r.split === 'train' && r.label !== null);
    const model = fitLogistic(training, names, config.ridgePenalty);
    const predictions = eligible.filter(r => r.split === 'test').map(r => ({id: r.id, label: r.label,
      probability: predict(model, r.features)}));
    return {cycles, model, test: brierEnvelope(predictions), predictions,
      trainingUnresolved: eligible.filter(r => r.split === 'train' && r.label === null).length};
  })}));
const result = {schema: 'relational-orbital-duration-analysis/v1', date: config.date,
  runsSha256: createHash('sha256').update(readFileSync(new URL(runPath, root))).digest('hex'),
  previousAtlasSha256: createHash('sha256').update(readFileSync(new URL('evidence/data/relational-orbital-persistence-v1.json', root))).digest('hex'),
  wholeSample: durationSummary(rows, config.primaryHorizon),
  byRatio: config.semimajorAxisRatios.map(ratio => ({ratio,
    ...durationSummary(rows.filter(r => r.ratio === ratio), config.primaryHorizon)})),
  previousNeighbourhoods: atlas.ensembles.map(e => ({center: e.center,
    ...durationSummary(e.members, atlas.counts.cycles, 'resolutionRuns')})),
  durations: rows.map(r => ({id: r.id, ratio: r.ratio, phase: r.phase, split: r.split,
    ...durationRecord(r.runs, config.primaryHorizon)})),
  prediction, primaryHorizon: config.primaryHorizon,
  boundaries: {infiniteLifetimeIdentified: false, physicalHazardEstimated: false,
    confidenceIntervalComputed: false, exactLifetimeCertified: false,
    predictionTarget: 'exit by each finite horizon, conditional on surviving the ten-cycle feature window',
    predictorInterpretation: 'Frozen ridge logistic models on a declared deterministic design; not a derived perturbation lifetime bound',
    labelPolicy: 'Unresolved training labels omitted; unresolved test labels retained in best/worst score bounds. Omission can be informative.',
    extrapolation: 'No estimate of unrestricted mean or unobserved tail; no reciprocal duration called an escape rate'}};
writeFileSync(new URL('evidence/data/relational-orbital-duration-analysis-v1.json', root), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({wholeSample: {...result.wholeSample, curve: `${result.wholeSample.curve.length} points`},
  byRatio: result.byRatio.map(r => ({ratio: r.ratio, counts: r.counts,
    restrictedMeanDuration: r.restrictedMeanDuration, quantiles: r.quantiles})),
  prediction: prediction.map(m => ({name: m.name, horizons: m.horizons.map(h => ({cycles: h.cycles,
    trainingRows: h.model?.trainingRows, trainingExits: h.model?.trainingExits, test: h.test}))}))}, null, 2));
