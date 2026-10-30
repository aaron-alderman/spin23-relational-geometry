import assert from 'node:assert/strict';
import {readFileSync, writeFileSync, existsSync} from 'node:fs';
import {createHash} from 'node:crypto';

const root = new URL('../../', import.meta.url);
const read = path => JSON.parse(readFileSync(new URL(path, root), 'utf8'));
const hash = path => createHash('sha256').update(readFileSync(new URL(path, root))).digest('hex');
const atlasPath = 'evidence/data/relational-orbital-persistence-v1.json';
const atlas = read(atlasPath), analysis = read('evidence/data/relational-orbital-persistence-analysis-v1.json');
const independent = read('evidence/data/relational-orbital-persistence-independent-v1.json');
const numerical = read('evidence/data/relational-orbital-persistence-verification-v1.json');
assert.equal(atlas.engineSha256, hash('verification/dynatology/relational_persistence_engine.mjs'));
assert.equal(numerical.engineSha256, atlas.engineSha256);
assert.equal(atlas.configSha256, hash('evidence/data/relational-orbital-persistence-config-v1.json'));
assert.equal(analysis.atlasSha256, hash(atlasPath));
assert.equal(independent.atlasSha256, hash(atlasPath));
assert.equal(atlas.grid.length, atlas.counts.ratios * atlas.counts.phases);
for (const p of atlas.grid) {
  assert.equal(p.resolutionRuns.length, 3);
  for (const r of p.resolutionRuns) {
    assert.ok(r.completedCycles > 0 && r.completedCycles <= atlas.counts.cycles);
    if (!r.event) assert.equal(r.completedCycles, atlas.counts.cycles);
    assert.ok(Number.isFinite(r.maxEnergyError));
    assert.ok(r.maxAngularMomentumError < 1e-9);
  }
}
for (const h of analysis.horizons) assert.equal(h.survived + h.exited + h.unresolved, atlas.grid.length);
for (const e of atlas.ensembles) {
  for (const member of e.members) assert.deepEqual(member.resolutionRuns.map(r => r.stepsPerPeriod), [640, 1280]);
  for (const h of e.horizons) assert.equal(h.survived + h.exited + h.unresolved, e.members.length);
}
assert.ok(independent.controls.every(r => r.sameMonitoredOutcomeAsAllSplittings));
assert.ok(independent.controls.every(r => r.maxSampledRelativeEnergyError < 1e-6));
const refined = independent.shortTimeRefinement;
assert.ok(refined[0].distanceErrorAgainstDOP853 / refined[1].distanceErrorAgainstDOP853 > 12);
assert.ok(refined[1].distanceErrorAgainstDOP853 / refined[2].distanceErrorAgainstDOP853 > 12);
const taylor = independent.independentTaylorComparison[0].refinements.at(-1);
assert.ok(taylor.firstOrderResidual / taylor.secondOrderResidual > 100);
assert.equal(atlas.boundaries.quantumSelectionDerived, false);
assert.equal(atlas.boundaries.rigorousTimeBoundProved, false);
assert.equal(atlas.boundaries.reducedFourDimensionalReturnMapConstructed, false);
for (const path of ['evidence/figures/relational-orbital-persistence-v1.png',
  'evidence/figures/relational-orbital-persistence-v1.svg',
  'corpus/programmes/dynatology/relational_orbital_persistence_v1.md']) assert.ok(existsSync(new URL(path, root)), path);
const files = ['verification/dynatology/relational_persistence_engine.mjs',
  'verification/dynatology/run_relational_persistence.mjs',
  'verification/dynatology/analyze_relational_persistence.mjs',
  'verification/dynatology/independent_relational_persistence.py',
  'verification/dynatology/plot_relational_persistence.py',
  'verification/dynatology/verify_relational_persistence.mjs',
  'verification/dynatology/verify_relational_persistence_evidence.mjs',
  'evidence/data/relational-orbital-persistence-config-v1.json', atlasPath,
  'evidence/data/relational-orbital-persistence-analysis-v1.json',
  'evidence/data/relational-orbital-persistence-independent-v1.json',
  'evidence/data/relational-orbital-persistence-verification-v1.json',
  'evidence/figures/relational-orbital-persistence-v1.png',
  'evidence/figures/relational-orbital-persistence-v1.svg',
  'corpus/programmes/dynatology/relational_orbital_persistence_v1.md'];
const record = {schema: 'relational-orbital-persistence-evidence-check/v1', status: 'pass', date: '2026-10-30',
  horizons: analysis.horizons, independentControlsAgree: true,
  independentSecondOrderImprovementFactor: taylor.firstOrderResidual / taylor.secondOrderResidual,
  files: files.map(path => ({path, sha256: hash(path)}))};
writeFileSync(new URL('evidence/data/relational-orbital-persistence-evidence-check-v1.json', root), JSON.stringify(record, null, 2) + '\n');
console.log(JSON.stringify({...record, files: `${files.length} hashed artifacts`}, null, 2));
