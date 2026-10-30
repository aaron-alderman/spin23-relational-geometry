import {readFileSync, writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {TAU, integrate, summary} from './relational_persistence_engine.mjs';

const root = new URL('../../', import.meta.url);
const configPath = 'evidence/data/relational-orbital-duration-config-v1.json';
const configText = readFileSync(new URL(configPath, root), 'utf8'), config = JSON.parse(configText);
const modelText = readFileSync(new URL(config.modelSource, root), 'utf8'), model = JSON.parse(modelText);
const monitor = {...model, monitorCycles: config.monitorCycles};
const rows = [], started = Date.now();
for (const ratio of config.semimajorAxisRatios) for (let phaseIndex = 0; phaseIndex < config.phaseCount; phaseIndex++) {
  const phase = TAU * (phaseIndex + config.phaseOffsetInGridCells) / config.phaseCount;
  const sector = Math.floor(config.phaseSectors * (phaseIndex + config.phaseOffsetInGridCells) / config.phaseCount);
  const split = config.heldOutPhaseSectors.includes(sector) ? 'test' : 'train';
  const options = {masses: model.masses, eccentricities: model.eccentricities,
    ratio, phase, innerPhase: model.innerMeanAnomaly, apsis: model.apsidalDifference};
  const early = integrate(options, {cycles: config.earlyFeatureCycles,
    stepsPerPeriod: config.earlyFeatureStepsPerPeriod, variations: true, config: monitor});
  const earlyValid = early.numericalStatus === 'accepted' && early.event === null
    && early.completedCycles === config.earlyFeatureCycles;
  const first = Math.max(...early.samples.map(s => Math.hypot(...s.first)));
  const second = Math.max(...early.samples.map(s => Math.hypot(...s.second)));
  const runs = config.stepsPerInnerPeriod.map(stepsPerPeriod => ({stepsPerPeriod,
    ...summary(integrate(options, {cycles: config.primaryHorizon, stepsPerPeriod, config: monitor}))}));
  rows.push({id: `${ratio.toFixed(3)}:${phaseIndex}`, ratio, phase, phaseIndex, sector, split,
    earlyValid, earlyEvent: early.event, features: {logSizeRatio: Math.log(ratio), sinPhase: Math.sin(phase),
      cosPhase: Math.cos(phase), logFirstResponse: Math.log1p(first), logSecondResponse: Math.log1p(second)},
    earlyDiagnostics: {maxEnergyError: early.maxEnergyError, firstResponse: first, secondResponse: second}, runs});
  if ((phaseIndex + 1) % 6 === 0) console.log(JSON.stringify({ratio, phasesCompleted: phaseIndex + 1,
    totalPhases: config.phaseCount, elapsedSeconds: (Date.now() - started) / 1000}));
}
const result = {schema: 'relational-orbital-duration-runs/v1', id: config.id, date: config.date,
  config, configSha256: createHash('sha256').update(configText).digest('hex'),
  modelSha256: createHash('sha256').update(modelText).digest('hex'),
  engineSha256: createHash('sha256').update(readFileSync(new URL('./relational_persistence_engine.mjs', import.meta.url))).digest('hex'),
  rows, elapsedSeconds: (Date.now() - started) / 1000,
  scope: 'Finite two-resolution duration follow-up; feature horizon, phase-sector test split and model list frozen before collection.'};
writeFileSync(new URL('evidence/data/relational-orbital-duration-runs-v1.json', root), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({rows: rows.length, train: rows.filter(r => r.split === 'train').length,
  test: rows.filter(r => r.split === 'test').length, elapsedSeconds: result.elapsedSeconds}));
