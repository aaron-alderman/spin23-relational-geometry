#!/usr/bin/env node
/** Record the non-retired Python boundary and the evidence still required. */
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const inventory = JSON.parse(fs.readFileSync(path.join(root, 'output/plasma-heart-algebra/legacy-python-inventory.json'), 'utf8'));
const exact = new Set([
  'feedback.py', 'run.py', 'cycle_optimize.py', 'spatial_optimize.py',
  '3d_cycle_chemthermal_robust.py', '3d_cycle_estimator.py', '3d_cycle_robust.py',
  'adaptive_geometry_policy.py', 'chemistry_robust.py', 'combined_physics_robust_pareto.py',
  'combined_robust.py', 'external_cycle_optimizer.py', 'external_packet_pareto.py',
  'pareto_summary.py', 'pressure_robust.py', 'resolved_geometry_pareto.py',
  'resolved_geometry_robust.py', 'resolved_robust_pareto.py', 'resolved_timing_pareto.py',
  'resolved_timing_robust.py', 'robust_cycle.py', 'spatial_wall_screen.py',
  'distributed_cooling_screen.py', 'resolved_actuator_gate.py', 'phase_jitter.py',
  'estimator_screen.py', 'field_port_screen.py', 'final_screening_selector.py',
  'periodic_convergence.py', 'rigid_body_screen.py', 'wall_conductance_screen.py',
  'boundary_screen.py', 'verify.py', 'query.py', '3d_cycle_packet.py',
  'quasi1d_cycle_packet.py', 'three_d_loader.py', 'compressible_euler_3d_reference.py',
  'compressible_mhd_source_reference.py', 'mhd_coupled_cycle_ledger.py'
]);
const rows = inventory.entries.filter((entry) => exact.has(path.basename(entry.path))).map((entry) => ({
  path: entry.path,
  class: entry.class,
  disposition: 'retain-pending-equivalent-solver',
  missingEvidence: entry.class === 'equation-or-reference'
    ? ['volumetric solver equivalence', 'mesh/timestep convergence', 'independent solver comparison']
    : entry.class === 'optimization-or-estimation'
      ? ['typed objective over solver outputs', 'control bounds', 'uncertainty/convergence evidence']
      : ['typed packet/bridge equivalence', 'negative-path verification', 'physicalAdmission=false']
}));
const result = {
  protocol: 'plasma-heart-remaining-legacy-audit/1',
  inventoryCount: inventory.count,
  retainedPendingCount: rows.length,
  rows,
  deletionBlockers: [
    { boundary: 'feedback-kernel', files: ['output/plasma-heart-feedback/feedback.py', 'output/plasma-heart-feedback/run.py', 'output/plasma-heart-feedback/query.py', 'output/plasma-heart-feedback/verify.py'], evidenceRequired: ['typed replacement of the 12-state thermochemical/controller model', 'energy, entropy, nuclei and gyro ledgers', 'stationary and programmed-policy refusal semantics'] },
    { boundary: 'volumetric-and-coupled-solvers', files: [], evidenceRequired: ['independent external solver comparison remains unavailable; custom volumetric evaluator is synthetic only'] },
    { boundary: 'thermal-rigid-ode', files: [], evidenceRequired: ['full coupled thermal/rigid solver and independent conservation comparison remain unresolved'] },
    { boundary: 'external-engine-availability', files: [], evidenceRequired: ['installed OpenFOAM, Elmer, SU2 or preCICE executable plus a passing lowered case'] }
  ],
  physicalAdmission: false,
  scope: 'Boundary report only; it authorizes no deletion and distinguishes unresolved equations, optimization, and packet bridges.'
};
fs.mkdirSync(path.join(root, 'output/plasma-heart-algebra'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/remaining-legacy-audit.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ retainedPendingCount: rows.length, inventoryCount: inventory.count, physicalAdmission: false }, null, 2));
