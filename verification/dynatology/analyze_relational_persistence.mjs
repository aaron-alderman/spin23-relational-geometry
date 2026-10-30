import assert from 'node:assert/strict';
import {readFileSync, writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {integrate} from './relational_persistence_engine.mjs';

const root = new URL('../../', import.meta.url), path = new URL('evidence/data/relational-orbital-persistence-v1.json', root);
const data = JSON.parse(readFileSync(path, 'utf8'));
assert.equal(data.mode, 'atlas');
assert.equal(data.grid.length, 408);
assert.ok(data.grid.every(p => p.resolutionRuns.length === 3));
assert.equal(data.engineSha256, createHash('sha256').update(readFileSync(new URL('./relational_persistence_engine.mjs', import.meta.url))).digest('hex'));
const horizons = data.config.monitorCycles.map(cycles => ({cycles,
  ...Object.fromEntries(['survived', 'exited', 'unresolved'].map(outcome => [outcome,
    data.grid.filter(p => p.horizons.find(h => h.cycles === cycles)?.outcome === outcome).length]))}));
for (const h of horizons) assert.equal(h.survived + h.exited + h.unresolved, data.grid.length);
for (const e of data.ensembles) for (const h of e.horizons)
  assert.equal(h.survived + h.exited + h.unresolved, h.denominator);

const perturbationWindows = data.controls.map(point => {
  const options = {masses: data.config.masses, eccentricities: data.config.eccentricities,
    ratio: point.ratio, phase: point.phase, innerPhase: data.config.innerMeanAnomaly,
    apsis: data.config.apsidalDifference};
  const base = integrate(options, {cycles: 100, stepsPerPeriod: 640, variations: true});
  return {ratio: point.ratio, phase: point.phase,
    trials: [1e-3, 5e-4].map(epsilon => {
      const actual = integrate({...options, phase: options.phase + epsilon},
        {cycles: 100, stepsPerPeriod: 640, variations: true});
      // actual carries unused parameter derivatives so that both runs retain
      // the same sequence of relation samples; predictions use base only.
      return {epsilon, windows: [1, 2, 5, 10, 20, 50, 100].map(cycles => {
        const b = base.samples.find(r => r.cycles === cycles);
        const a = actual.samples.find(r => r.cycles === cycles);
        const physicalDifference = Math.hypot(...a.values.map((x, i) => x - b.values[i]));
        return {cycles, firstDerivativeNorm: Math.hypot(...b.first), secondDerivativeNorm: Math.hypot(...b.second),
          actualDistanceChange: physicalDifference,
          firstOrderResidual: Math.hypot(...a.values.map((x, i) => x - b.values[i] - epsilon * b.first[i])),
          secondOrderResidual: Math.hypot(...a.values.map((x, i) => x - b.values[i] - epsilon * b.first[i] - .5 * epsilon ** 2 * b.second[i]))};
      })};
    })};
});
const shortTimeRefinement = [160, 320, 640, 1280].map(stepsPerPeriod => ({stepsPerPeriod,
  ...integrate(data.perturbation.base, {cycles: 10, stepsPerPeriod, variations: true}).finalRelations}));
const result = {schema: 'relational-orbital-persistence-analysis/v1', date: '2026-10-30',
  atlasSha256: createHash('sha256').update(readFileSync(path)).digest('hex'), horizons,
  resolutionDisagreements: data.grid.filter(p => p.resolutionStatus === 'outcome_disagreement').map(p => ({
    ratio: p.ratio, phase: p.phase, runs: p.resolutionRuns.map(r => ({stepsPerPeriod: r.stepsPerPeriod,
      event: r.event, completedCycles: r.completedCycles, maxEnergyError: r.maxEnergyError}))})),
  numericalGateFailures: data.grid.filter(p => p.resolutionStatus === 'energy_gate_failed').length,
  perturbationWindows, shortTimeRefinement,
  interpretation: 'Finite sampled neighbourhoods and local Taylor predictions; no certified nonlinear invariant region or astrophysical occupancy law.'};
writeFileSync(new URL('evidence/data/relational-orbital-persistence-analysis-v1.json', root), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({horizons, numericalGateFailures: result.numericalGateFailures,
  resolutionDisagreements: result.resolutionDisagreements.length,
  windows: perturbationWindows.map(p => ({ratio: p.ratio, phase: p.phase, windows: p.trials[0].windows}))}, null, 2));
