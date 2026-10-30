import assert from 'node:assert/strict';
import {readFileSync, writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {initialState, accelerations, step, integrate, relational, invariants} from './relational_persistence_engine.mjs';

const norm = a => Math.hypot(...a);
const diff = (a, b) => a.map((x, i) => x - b[i]);
const records = {};

// Exact two-body Kepler orbit: timestep refinement must show fourth order.
const errors = [80, 160, 320].map(stepsPerPeriod => {
  const opts = {masses: [1, .001, 0], ratio: 2, eccentricities: [.2, .2], phase: 1};
  const start = initialState(opts);
  const end = integrate(opts, {cycles: 10, stepsPerPeriod}).state;
  return norm([end.q[2] - end.q[0] - start.q[2] + start.q[0],
    end.q[3] - end.q[1] - start.q[3] + start.q[1]]);
});
assert.ok(errors[0] / errors[1] > 13 && errors[1] / errors[2] > 13, JSON.stringify(errors));
records.keplerPositionErrors = errors;

const opts = {ratio: 2 ** (2 / 3), phase: 1.2};
const s = initialState({...opts, variations: true});
accelerations(s);
const eps = 1e-4;
const plus = initialState({...opts, phase: opts.phase + eps});
const minus = initialState({...opts, phase: opts.phase - eps});
accelerations(plus); accelerations(minus);
const firstForceError = norm(Array.from(s.da, (x, i) => x - (plus.a[i] - minus.a[i]) / (2 * eps)));
const secondForceError = norm(Array.from(s.d2a, (x, i) => x - (plus.a[i] - 2 * s.a[i] + minus.a[i]) / eps ** 2));
assert.ok(firstForceError < 2e-7 && secondForceError < 2e-7, `${firstForceError}, ${secondForceError}`);
records.forceDerivativeErrors = {firstForceError, secondForceError};

const nominal = integrate(opts, {cycles: 2, variations: true});
const hs = [1e-3, 5e-4, 2.5e-4];
const residuals = hs.map(h => {
  const actual = integrate({...opts, phase: opts.phase + h}, {cycles: 2}).finalRelations.values;
  const {values, first, second} = nominal.finalRelations;
  return {h, first: norm(actual.map((x, i) => x - values[i] - h * first[i])),
    second: norm(actual.map((x, i) => x - values[i] - h * first[i] - .5 * h * h * second[i]))};
});
for (let i = 0; i < 2; i++) {
  assert.ok(residuals[i].first / residuals[i + 1].first > 3.7, JSON.stringify(residuals));
  assert.ok(residuals[i].second / residuals[i + 1].second > 6, JSON.stringify(residuals));
}
records.trajectoryTaylorResiduals = residuals;

const reversible = initialState(opts), original = [...reversible.q, ...reversible.v];
const h = reversible.period / 160;
for (let k = 0; k < 1600; k++) step(reversible, h);
for (let k = 0; k < 1600; k++) step(reversible, -h);
records.reversibilityError = norm(diff([...reversible.q, ...reversible.v], original));
assert.ok(records.reversibilityError < 1e-9);

const base = integrate(opts, {cycles: 20});
const scaled = integrate({...opts, lengthScale: 10}, {cycles: 20});
records.scaleSimilarityError = norm(diff(base.finalRelations.values, scaled.finalRelations.values));
assert.ok(records.scaleSimilarityError < 1e-8);
assert.ok(base.maxAngularMomentumError < 1e-10 && base.maxEnergyError < 1e-5);

// The complete finite-time map is symplectic. This is a 12D map, not the
// proposed 4D reduced periodic-orbit return map. Use canonical coordinates
// Q=sqrt(m) q, P=sqrt(m) v for well-conditioned finite differences.
const mass = [1, .001, .001], J = Array.from({length: 12}, () => Array(12).fill(0));
for (let i = 0; i < 6; i++) { J[i][i + 6] = 1; J[i + 6][i] = -1; }
const M = Array.from({length: 12}, () => Array(12).fill(0));
const dh = 1e-6;
for (let col = 0; col < 12; col++) {
  const states = [-1, 1].map(sign => {
    const state = initialState(opts), k = col % 6;
    (col < 6 ? state.q : state.v)[k] += sign * dh / Math.sqrt(mass[Math.floor(k / 2)]);
    for (let n = 0; n < 40; n++) step(state, state.period / 160);
    return [...state.q, ...state.v].map((x, i) => x * Math.sqrt(mass[Math.floor((i % 6) / 2)]));
  });
  for (let row = 0; row < 12; row++) M[row][col] = (states[1][row] - states[0][row]) / (2 * dh);
}
let symplecticError = 0;
for (let i = 0; i < 12; i++) for (let j = 0; j < 12; j++) {
  let value = 0;
  for (let k = 0; k < 6; k++) value += M[k][i] * M[k + 6][j] - M[k + 6][i] * M[k][j];
  symplecticError = Math.max(symplecticError, Math.abs(value - J[i][j]));
}
assert.ok(symplecticError < 3e-6, String(symplecticError));
records.symplecticFiniteDifferenceError = symplecticError;
records.status = 'pass';
records.engineSha256 = createHash('sha256').update(readFileSync(new URL('./relational_persistence_engine.mjs', import.meta.url))).digest('hex');
if (process.argv.includes('--record')) writeFileSync(new URL('../../evidence/data/relational-orbital-persistence-verification-v1.json', import.meta.url), JSON.stringify(records, null, 2) + '\n');
console.log(JSON.stringify(records, null, 2));
