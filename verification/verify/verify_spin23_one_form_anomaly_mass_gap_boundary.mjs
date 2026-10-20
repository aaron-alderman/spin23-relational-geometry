import fs from 'node:fs';
import assert from 'node:assert/strict';

const path = new URL('../../evidence/data/spin23-one-form-anomaly-mass-gap-boundary.json', import.meta.url);
const d = JSON.parse(fs.readFileSync(path, 'utf8'));

assert.equal(d.schema, 'spin23.one-form-anomaly-mass-gap-boundary.v1');
const phases = Object.fromEntries(d.theta_pi_anomaly_matching.map(x => [x.phase, x.allowed]));
assert.equal(phases.unique_trivial_gapped_CP_and_center_symmetric, false);
assert.equal(phases.gapped_CP_broken_two_vacua_center_symmetric, true);
assert.equal(phases.gapless_anomaly_matching, true);
assert.equal(phases.gapped_topological_order, true);

const c = d.finite_countermodel;
assert.equal(c.string_tension > 0, true);
assert.equal(c.center_order_unchanged, true);
for (let i = 0; i < c.box_lengths.length; i++) {
  const expected = 2 * Math.PI / c.box_lengths[i];
  assert.ok(Math.abs(c.neutral_gaps[i] - expected) < 1e-14);
  if (i) assert.ok(c.neutral_gaps[i] < c.neutral_gaps[i - 1]);
}
assert.equal(c.infinite_volume_gap, 0);

assert.equal(d.spin23_boundary.center_isomorphism, false);
assert.equal(d.spin23_boundary['compact_color_center'], 'Z_3 for pure SU(3)');
assert.equal(d.spin23_boundary['spin23_cover_center'], 'Z_2');
assert.equal(d.spin23_boundary.broken_gravity_requires_massless_spin2, true);
assert.equal(d.spin23_boundary.scale_transport, false);
assert.ok(d.logical_nonimplications.length >= 5);

console.log('PASS spin23 one-form anomaly / mass-gap boundary');
