#!/usr/bin/env node
/** Verify the algebra-first migration boundary and custom numerical evaluator. */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '../..');
const read = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8'));
const retirement = read('corpus/programmes/programme-algebra/plasma_heart_retirement_manifest_v1.json');
const matrix = read('corpus/programmes/programme-algebra/plasma_heart_migration_matrix_v1.json');
const inventoryPath = path.join(root, 'output/plasma-heart-algebra/legacy-python-inventory.json');
const failures = [];
if (!fs.existsSync(inventoryPath)) failures.push('legacy inventory has not been generated');
const inventory = fs.existsSync(inventoryPath) ? JSON.parse(fs.readFileSync(inventoryPath, 'utf8')) : null;
if (inventory && inventory.count !== retirement.legacyInventory.expectedFileCount) failures.push(`inventory count ${inventory.count} != expected ${retirement.legacyInventory.expectedFileCount}`);
if (inventory) for (const entry of inventory.entries) if (!matrix.classes[entry.class]) failures.push(`unmapped legacy class: ${entry.class}`);
for (const gate of retirement.replacementGates) if (gate.status === 'complete' && !fs.existsSync(path.join(root, gate.path))) failures.push(`missing complete gate: ${gate.path}`);
for (const target of retirement.retiredTargets ?? []) if (fs.existsSync(path.join(root, target.path))) failures.push(`retired target still exists: ${target.path}`);
const node = process.execPath;
const evaluator = spawnSync(node, ['tooling/plasma-heart/evaluate_solver_packet.mjs', '--input', 'tooling/plasma-heart/fixtures/minimal_solver_packet.json'], { cwd: root, encoding: 'utf8' });
if (evaluator.status !== 0) failures.push('custom evaluator failed on minimal packet');
for (const script of ['evaluate_mhd_coupled_cycle_ledger.mjs','evaluate_fully_coupled_power_ledger.mjs','evaluate_combined_force_ledger.mjs','evaluate_total_power_ledger.mjs','evaluate_3d_cycle_pareto.mjs','evaluate_radiation_cycle_pareto.mjs','evaluate_radiation_uncertainty_robust.mjs','evaluate_resolved_estimator.mjs','evaluate_phase_jitter.mjs','evaluate_final_screening_selector.mjs','evaluate_compressible_euler_3d.mjs','evaluate_compressible_mhd_source.mjs','evaluate_field_port_asymmetry.mjs','evaluate_external_packet_pareto.mjs','generate_quasi1d_cycle_packet.mjs','generate_3d_cycle_packet.mjs','evaluate_3d_cycle_estimator.mjs','evaluate_adaptive_geometry_policy.mjs','evaluate_3d_cycle_robust.mjs','evaluate_3d_cycle_chemthermal_robust.mjs','evaluate_combined_physics_robust.mjs','evaluate_combined_robust.mjs','evaluate_chemistry_robust.mjs','evaluate_pressure_robust.mjs','evaluate_actuator_constraints.mjs','evaluate_distributed_cooling.mjs','evaluate_periodic_convergence.mjs','evaluate_rigid_body.mjs','evaluate_wall_conductance.mjs','evaluate_spatial_wall.mjs','evaluate_spatial_optimization.mjs','evaluate_robust_cycle.mjs','evaluate_timing_robust.mjs','evaluate_timing_pareto.mjs','evaluate_geometry_pareto_resolved.mjs','evaluate_geometry_robust.mjs','evaluate_robust_geometry_pareto.mjs','evaluate_pareto_summary.mjs','evaluate_feedback_query.mjs','verify_feedback_algebra.mjs','evaluate_feedback_state_space.mjs','run_solver_suite.mjs','evaluate_cycle_optimization.mjs','evaluate_teng_transducer.mjs','evaluate_thermoelectric.mjs','evaluate_capacitive_electrostatic.mjs','evaluate_conversion_port_pareto.mjs','evaluate_coupled_conversion_cycle.mjs','evaluate_solver_conversion_coupling.mjs','lower_conversion_ports.mjs','emit_conversion_case.mjs']) {
  const run = spawnSync(node, [`tooling/plasma-heart/${script}`], { cwd: root, encoding: 'utf8' });
  if (run.status !== 0) failures.push(`${script} failed: ${run.stderr || run.stdout}`);
  else {
    try {
      const summary = JSON.parse(run.stdout);
      if (summary.physicalAdmission !== false) failures.push(`${script} did not preserve physicalAdmission=false`);
    } catch { failures.push(`${script} did not emit JSON summary`); }
  }
}
const result = {
  protocol: 'plasma-heart-migration-verification/1',
  passed: failures.length === 0,
  inventoryCount: inventory?.count ?? null,
  replacementGateCount: retirement.replacementGates.length,
  physicalAdmission: false,
  failures,
  scope: 'Migration coverage and custom evaluator regression only; it does not admit physical performance or retire files.'
};
console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;
