import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = path.resolve(import.meta.dirname, '../..');
const ledgerPath = path.join(root, 'evidence/data/spin23-ym-action-scale-terminal-exhaustion.json');
const d = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));

assert.equal(d.schema, 'spin23.ym-action-scale-terminal-exhaustion.v1');
assert.equal(d.new_claims.length, 28);
assert.equal(new Set(d.new_claims).size, d.new_claims.length);
assert.equal(d.route_families.length, 20);
assert.equal(d.irreducible_open_gates.length, 5);
assert.ok(d.positive_results.length >= 6);
assert.ok(d.exact_no_gos.length >= 6);

const claimDirs = [
  path.join(root, 'corpus/claims/1500-1599'),
  path.join(root, 'corpus/claims/1600-1699')
];
const claimFiles = claimDirs.flatMap(dir => fs.readdirSync(dir));
for (const n of d.new_claims) {
  assert.ok(claimFiles.some(file => file.startsWith(`${n}_`)), `missing claim ${n}`);
}

const allRouted = new Set(d.route_families.flatMap(x => x.claims));
for (const n of d.new_claims) assert.ok(allRouted.has(n), `unrouted claim ${n}`);

assert.equal(d.completion_vector.finite_compact_tools, true);
assert.equal(d.completion_vector.four_dimensional_YM_theorem, false);
assert.equal(d.completion_vector.healthy_classical_critical_gravity_sector, true);
assert.equal(d.completion_vector.radiatively_closed_Spin23_quantum_action, false);
assert.equal(d.completion_vector.derived_multi_scale_portal, true);
assert.equal(d.completion_vector.parameter_free_color_hierarchy, false);
assert.equal(d.completion_vector.radiatively_stable_observed_cosmological_constant, false);
assert.equal(d.completion_vector.tree_level_weak_field_observable_map, true);

const requiredEvidence = [
  'spin23-su2-heat-kernel-transfer-exhaustion.json',
  'spin23-explicit-macdowell-mansouri-spectrum.json',
  'spin23-first-order-pseudoscalar-torsion-sector.json',
  'spin23-numerical-lattice-glueball-continuum-audit.json',
  'spin23-radiative-selector-portal-construction.json',
  'spin23-complete-quadratic-axial-torsion-no-go.json',
  'spin23-wilson-loop-schwinger-dyson-bootstrap.json',
  'spin23-critical-pgt-pseudoscalar-class.json',
  'spin23-critical-pgt-lense-thirring-spin-yukawa.json'
];
for (const file of requiredEvidence) {
  assert.ok(fs.existsSync(path.join(root, 'evidence/data', file)), `missing evidence ${file}`);
}

console.log('Spin(2,3) / Yang-Mills action-scale terminal exhaustion ledger: PASS');
console.log(`  ${d.new_claims.length} new claims routed through ${d.route_families.length} method families`);
console.log(`  positive constructions: ${d.positive_results.length}; exact no-gos: ${d.exact_no_gos.length}`);
console.log(`  irreducible gates: ${d.irreducible_open_gates.map(x => x.id).join(', ')}`);
