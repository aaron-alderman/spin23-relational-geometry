import fs from 'node:fs';
import assert from 'node:assert/strict';

const data = JSON.parse(fs.readFileSync('programme_incidence_alpaca_comparator_summary.json', 'utf8'));
const models = data.models;
const masses = ['0.1', '0.3'];
const close = (actual, expected, tolerance = 1e-12) => {
  assert.ok(Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(expected)), `${actual} != ${expected}`);
};

assert.deepEqual(models.incidence_universal.uv_physical_pattern, [-10, -6, -2]);
assert.deepEqual(models.equal_axial_universal.uv_physical_pattern, [-10, -10, -10]);
assert.deepEqual(models.top_right_only.uv_physical_pattern, [-10, 0, 0]);

for (const mass of masses) {
  const incidence = models.incidence_universal.mass_points[mass];
  const equal = models.equal_axial_universal.mass_points[mass];
  const top = models.top_right_only.mass_points[mass];
  const ratioEqual = incidence.K_BR * incidence.ctau_m / (equal.K_BR * equal.ctau_m);
  const ratioTop = incidence.K_BR * incidence.ctau_m / (top.K_BR * top.ctau_m);
  close(ratioEqual, data.derived.incidence_over_equal[`K_BR_times_ctau_${mass}`]);
  close(ratioTop, data.derived.incidence_over_top[`K_BR_times_ctau_${mass}`]);
}

const kRates = Object.values(models).map(model => model.mass_points['0.1'].K_BR);
const bRates = Object.values(models).map(model => model.mass_points['0.1'].B_BR);
close((Math.max(...kRates) - Math.min(...kRates)) / Math.min(...kRates), data.derived['production_spread_fraction_at_0.1_GeV'].K);
close((Math.max(...bRates) - Math.min(...bRates)) / Math.min(...bRates), data.derived['production_spread_fraction_at_0.1_GeV'].B);

console.log(JSON.stringify({
  status: 'pass',
  incidence_over_equal_KBR_ctau: masses.map(m => data.derived.incidence_over_equal[`K_BR_times_ctau_${m}`]),
  incidence_over_top_KBR_ctau: masses.map(m => data.derived.incidence_over_top[`K_BR_times_ctau_${m}`]),
  production_spread_fraction_at_0p1_GeV: data.derived['production_spread_fraction_at_0.1_GeV']
}, null, 2));
