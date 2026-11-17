#!/usr/bin/env node
/** Inventory legacy Python artifacts without importing or executing them. */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const legacyRoot = path.join(root, 'output/plasma-heart-feedback');
const files = fs.readdirSync(legacyRoot).filter((name) => name.endsWith('.py')).sort();
const classify = (name) => {
  if (/reference|surface|maxwell|mhd|conductivity|euler/i.test(name)) return 'equation-or-reference';
  if (/screen|audit|verify|validate|admission|contract|mesh|convergence/i.test(name)) return 'check-or-admission';
  if (/optimize|pareto|robust|estimator|policy|timing|geometry/i.test(name)) return 'optimization-or-estimation';
  if (/packet|loader|import|export|bridge|handoff|manifest/i.test(name)) return 'io-or-bridge';
  return 'legacy-support';
};
const replacement = {
  'equation-or-reference': 'plasma_heart_algebra_v1.json + plasma_heart_solver_ir_v1.json + external solver output',
  'check-or-admission': 'lint_plasma_heart_solver_packet.mjs + IR invariants',
  'optimization-or-estimation': 'solver-backed optimizer over algebra-declared controls',
  'io-or-bridge': 'typed solver packet and engine adapter',
  'legacy-support': 'case-by-case review'
};
const entries = files.map((file) => ({ path: `output/plasma-heart-feedback/${file}`, class: classify(file), replacement: replacement[classify(file)], status: 'pending-retirement' }));
const counts = Object.fromEntries([...new Set(entries.map((entry) => entry.class))].map((key) => [key, entries.filter((entry) => entry.class === key).length]));
const report = { protocol: 'plasma-heart-python-inventory/1', root: 'output/plasma-heart-feedback', count: entries.length, counts, entries, physicalAdmission: false };
const outDir = path.join(root, 'output/plasma-heart-algebra');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'legacy-python-inventory.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ count: report.count, counts, output: 'output/plasma-heart-algebra/legacy-python-inventory.json' }, null, 2));
