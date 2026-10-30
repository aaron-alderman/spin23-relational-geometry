import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {TAU, integrate, summary} from './relational_persistence_engine.mjs';

const root = new URL('../../', import.meta.url);
const configPath = new URL('evidence/data/relational-orbital-persistence-config-v1.json', root);
const configText = readFileSync(configPath, 'utf8'), config = JSON.parse(configText);
const output = new URL('evidence/data/relational-orbital-persistence-v1.json', root);
const quick = process.argv.includes('--pilot');
const counts = quick ? {ratios: 9, phases: 12, cycles: 100} : {
  ratios: config.semimajorAxisRatios.count, phases: config.outerMeanAnomalyCount,
  cycles: Math.max(...config.monitorCycles)};
const optionsFor = (ratio, phase) => ({masses: config.masses, eccentricities: config.eccentricities,
  ratio, phase, innerPhase: config.innerMeanAnomaly, apsis: config.apsidalDifference});
const grid = [], started = Date.now();
const resolutions = quick ? [config.stepsPerInnerPeriod] :
  [config.stepsPerInnerPeriod, 2 * config.stepsPerInnerPeriod, 4 * config.stepsPerInnerPeriod];
for (const resolution of resolutions) for (let i = 0; i < counts.ratios; i++) {
  const ratio = config.semimajorAxisRatios.min + i *
    (config.semimajorAxisRatios.max - config.semimajorAxisRatios.min) / (counts.ratios - 1);
  for (let j = 0; j < counts.phases; j++) {
    const phase = TAU * j / counts.phases;
    const run = integrate(optionsFor(ratio, phase), {cycles: counts.cycles,
      stepsPerPeriod: resolution, config});
    const index = i * counts.phases + j;
    if (!grid[index]) grid[index] = {ratio, phase, resolutionRuns: []};
    grid[index].resolutionRuns.push({stepsPerPeriod: resolution, ...summary(run)});
  }
  console.log(JSON.stringify({stage: 'grid', stepsPerPeriod: resolution, row: i + 1, rows: counts.ratios,
    elapsedSeconds: (Date.now() - started) / 1000}));
}
function mergeResolutions(runs) {
  const finest = runs.at(-1);
  const diagnosticPass = runs.every(r => r.numericalStatus === 'accepted');
  const sameOutcome = runs.every(r => r.event === finest.event);
  return {...finest, numericalStatus: diagnosticPass && sameOutcome ? 'accepted' : 'unresolved',
    resolutionStatus: !diagnosticPass ? 'energy_gate_failed' : sameOutcome ? 'repeatable_outcome' : 'outcome_disagreement',
    completedCycles: sameOutcome ? Math.max(...runs.map(r => r.completedCycles)) : finest.completedCycles,
    horizons: config.monitorCycles.filter(n => n <= counts.cycles).map(cycles => {
      const outcomes = runs.map(r => r.numericalStatus !== 'accepted' ? 'unresolved' :
        r.event && r.completedCycles <= cycles ? 'exited' : 'survived');
      return {cycles, outcome: outcomes.every(x => x === outcomes[0]) ? outcomes[0] : 'unresolved'};
    })};
}
for (const point of grid) Object.assign(point, mergeResolutions(point.resolutionRuns));
const accepted = grid.filter(r => r.numericalStatus === 'accepted');
const survived = accepted.filter(r => r.event === null);
const exited = accepted.filter(r => r.event !== null);
// Predeclared selection: nearest-to-2:1 surviving and failing grid points;
// deterministic tie-breaking by phase. These are exploratory exemplars,
// not held-out confirmations of a mechanism.
const periodRatio = a => Math.sqrt(a ** 3 * (config.masses[0] + config.masses[1]) /
  (config.masses[0] + config.masses[2]));
const nearResonance = rows => [...rows].sort((a, b) =>
  Math.abs(periodRatio(a.ratio) - 2) - Math.abs(periodRatio(b.ratio) - 2) || a.phase - b.phase)[0];
const mixedRatios = [...new Set(exited.map(r => r.ratio))].filter(ratio => survived.some(r => r.ratio === ratio));
mixedRatios.sort((a, b) => Math.abs(periodRatio(a) - 2) - Math.abs(periodRatio(b) - 2));
const mixedRatio = mixedRatios[0];
const selected = [nearResonance(survived),
  nearResonance(survived.filter(r => r.ratio === mixedRatio)),
  nearResonance(exited.filter(r => r.ratio === mixedRatio))]
  .filter((r, i, rows) => r && rows.findIndex(x => x?.ratio === r.ratio && x?.phase === r.phase) === i);
const controls = selected.map(point => {
  return {ratio: point.ratio, phase: point.phase, runs: point.resolutionRuns};
});
const ensembles = selected.map(point => {
  const members = [];
  for (let k = 0; k < config.ensemble.size; k++) {
    // Fixed low-discrepancy design over two relational initial coordinates.
    const u = (k + .5) / config.ensemble.size;
    const v = ((k * .6180339887498949) % 1);
    const ratio = point.ratio * (1 + (2 * u - 1) * config.ensemble.periodRatioRelativeHalfWidth) ** (2 / 3);
    const phase = point.phase + (2 * v - 1) * config.ensemble.phaseHalfWidthRadians;
    const resolutionRuns = [4, 8].map(multiplier => {
      const stepsPerPeriod = multiplier * config.stepsPerInnerPeriod;
      return {stepsPerPeriod, ...summary(integrate(optionsFor(ratio, phase),
        {cycles: counts.cycles, stepsPerPeriod, config}))};
    });
    members.push({ratio, phase, ...mergeResolutions(resolutionRuns), resolutionRuns});
  }
  return {center: {ratio: point.ratio, phase: point.phase}, members,
    horizons: config.monitorCycles.filter(n => n <= counts.cycles).map(cycles => ({cycles,
      survived: members.filter(r => r.horizons.find(h => h.cycles === cycles)?.outcome === 'survived').length,
      exited: members.filter(r => r.horizons.find(h => h.cycles === cycles)?.outcome === 'exited').length,
      unresolved: members.filter(r => r.horizons.find(h => h.cycles === cycles)?.outcome === 'unresolved').length,
      denominator: members.length}))};
});
const variationalOptions = optionsFor(2 ** (2 / 3), 1.2);
const variationalBase = integrate(variationalOptions, {cycles: 10, stepsPerPeriod: 320, variations: true});
const perturbation = {base: variationalOptions, cycles: 10, stepsPerPeriod: 320,
  baseRelations: variationalBase.finalRelations,
  trials: [1e-3, 5e-4, 2.5e-4, 1.25e-4].map(epsilon => {
    const actual = integrate({...variationalOptions, phase: variationalOptions.phase + epsilon},
      {cycles: 10, stepsPerPeriod: 320}).finalRelations.values;
    const {values, first, second} = variationalBase.finalRelations;
    return {epsilon, firstOrderResidual: Math.hypot(...actual.map((x, i) => x - values[i] - epsilon * first[i])),
      secondOrderResidual: Math.hypot(...actual.map((x, i) => x - values[i] - epsilon * first[i] - .5 * epsilon ** 2 * second[i]))};
  })};
const scaleOptions = optionsFor(2 ** (2 / 3), 1.2);
const scaleRuns = [1, 10, 100].map(lengthScale => ({lengthScale,
  ...summary(integrate({...scaleOptions, lengthScale}, {cycles: 100, stepsPerPeriod: 320}))}));
const scaleControl = {cycles: 100, stepsPerPeriod: 320, runs: scaleRuns,
  maxDimensionlessDistanceDifference: Math.max(...scaleRuns.slice(1).map(r =>
    Math.hypot(...r.finalRelations.values.map((x, i) => x - scaleRuns[0].finalRelations.values[i]))))};
const result = {schema: 'relational-orbital-persistence/v1', id: config.id, date: '2026-10-30',
  status: 'finite_time_numerical_pilot', mode: quick ? 'pilot' : 'atlas',
  configSha256: createHash('sha256').update(configText).digest('hex'),
  engineSha256: createHash('sha256').update(readFileSync(new URL('./relational_persistence_engine.mjs', import.meta.url))).digest('hex'),
  config, counts, summary: {total: grid.length, accepted: accepted.length, survived: survived.length,
    exited: exited.length, unresolved: grid.length - accepted.length,
    maxAcceptedEnergyError: Math.max(...accepted.map(r => r.maxEnergyError)),
    maxAcceptedAngularMomentumError: Math.max(...accepted.map(r => r.maxAngularMomentumError))},
  grid, controls, ensembles, perturbation, scaleControl,
  boundaries: {quantumSelectionDerived: false, solarSystemFit: false, infiniteStabilityProved: false,
    reducedFourDimensionalReturnMapConstructed: false, periodicOrbitSolved: false,
    rigorousTimeBoundProved: false, allGridPointsRefined: !quick,
    eventMeaning: 'first detected violation of a monitoring criterion; radial exit is not an asymptotic ejection proof',
    eventResolution: 'checked at positive full-step endpoints; crossing time uncertain by at least one full step; short crossings may be missed',
    energyGate: 'sampled once per initial inner period and at termination; necessary diagnostic, not trajectory accuracy certification',
    statistics: 'deterministic exploratory sampling; survival fraction is conditional on this design, not an astrophysical probability'}};
writeFileSync(output, JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({output: fileURLToPath(output), summary: result.summary,
  controls: controls.map(c => ({ratio: c.ratio, phase: c.phase,
    runs: c.runs.map(r => ({steps: r.stepsPerPeriod, event: r.event, cycles: r.completedCycles,
      energy: r.maxEnergyError, status: r.numericalStatus}))})),
  ensembles: ensembles.map(e => ({center: e.center, horizons: e.horizons})), perturbation,
  scaleError: scaleControl.maxDimensionlessDistanceDifference, elapsedSeconds: (Date.now() - started) / 1000}, null, 2));
