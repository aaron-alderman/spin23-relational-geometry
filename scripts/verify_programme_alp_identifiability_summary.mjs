import fs from 'node:fs';
import assert from 'node:assert/strict';

const data = JSON.parse(fs.readFileSync('programme_alp_identifiability_summary.json', 'utf8'));
const local = data.local_identifiability;
assert.equal(local['all_channels_effective_rank_at_relative_1e-3'], 5);
assert.equal(local.production_and_total_width_effective_rank['relative_1e-2'], 3);
assert.equal(local.production_and_total_width_effective_rank['relative_1e-3'], 4);
assert.ok(local.all_ten_observables_singular_values[0] / local.all_ten_observables_singular_values.at(-1) > 1e8);

const fork = data.incidence_normalization_fork;
assert.deepEqual(fork.deduplicated.uv_physical_pattern, [-10, -6, -2]);
assert.deepEqual(fork.multiplicity_preserving.uv_physical_pattern, [-10, -6, -4]);
const xi100 = fork.deduplicated.ctau_100MeV_m / fork.multiplicity_preserving.ctau_100MeV_m;
assert.ok(Math.abs(xi100 / fork.XiK_deduplicated_over_multiplicity_100MeV - 1) < 2e-5);
assert.ok(fork.multiplicity_preserving.NA62_300MeV_crossing_f_GeV > fork.deduplicated.NA62_300MeV_crossing_f_GeV);

const metric = data.metric_candidate_tests.completed_furey_middle_slot_hilbert_schmidt;
assert.deepEqual(metric.weights, [14, 14, 8, 2, 6, 12]);
assert.equal(metric.kernel_dimension, 0);
assert.equal(metric.selects_deduplicated_incidence, false);
assert.equal(metric.selects_multiplicity_incidence, false);

const bottom = data.bottom_compass;
const p = bottom.predictions_at_f_1e6_GeV;
assert.ok(Math.abs(p.equal_axial / p.incidence_deduplicated / bottom.prediction_ratios.equal_over_incidence - 1) < 1e-12);
assert.ok(Math.abs(p.incidence_deduplicated / p.top_right_only / bottom.prediction_ratios.incidence_over_top - 1) < 1e-12);
assert.ok(Math.abs(bottom.Belle_Upsilon1S_observed_bound / p.incidence_deduplicated / bottom.bound_to_incidence_prediction - 1) < 1e-12);

console.log(JSON.stringify({
  status: 'pass',
  practical_low_mass_rank: local.production_and_total_width_effective_rank,
  incidence_normalization_Xi_shift: fork.XiK_deduplicated_over_multiplicity_100MeV,
  completed_middle_slot_weights: metric.weights,
  bottom_compass_current_sensitivity_gap: bottom.bound_to_incidence_prediction,
}, null, 2));
