#!/usr/bin/env node
/** Probe or invoke an external solver without changing algebraic authority. */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '../..');
const ir = JSON.parse(fs.readFileSync(path.join(root, 'corpus/programmes/programme-algebra/plasma_heart_solver_ir_v1.json'), 'utf8'));
const engineArg = process.argv.indexOf('--engine');
const engine = engineArg >= 0 ? process.argv[engineArg + 1] : 'custom';
const execute = process.argv.includes('--execute');
const all = process.argv.includes('--all');
const inputArg = process.argv.indexOf('--input');
const outputArg = process.argv.indexOf('--output');
const input = inputArg >= 0 ? process.argv[inputArg + 1] : null;
const output = outputArg >= 0 ? process.argv[outputArg + 1] : 'output/plasma-heart-algebra/custom-solver-result.json';
const commands = {
  openfoam: ['foamRun', 'simpleFoam'],
  elmer: ['ElmerSolver'],
  su2: ['SU2_CFD'],
  precice: ['precice'],
  custom: [process.execPath],
  support: ['chtMultiRegionFoam', 'gmsh', 'fenics', 'dolfinx', 'elmergrid', 'getdp']
};
const supported = Object.hasOwn(ir.lowering, engine);
const candidates = commands[engine] ?? [];
const probes = candidates.map((command) => {
  if (engine === 'custom' && command === process.execPath) return { command, available: fs.existsSync(command), location: command };
  const result = spawnSync(process.platform === 'win32' ? 'where.exe' : 'which', [command], { encoding: 'utf8' });
  return { command, available: result.status === 0, location: result.status === 0 ? result.stdout.trim().split(/\r?\n/)[0] : null };
});
const available = probes.some((probe) => probe.available);
const refusal = !supported ? `unsupported engine: ${engine}` : !available ? `no executable found for ${engine}` : null;
const record = {
  protocol: 'plasma-heart-solver-adapter/1',
  authority: ir.authority,
  engine,
  supported,
  probes,
  mode: all ? 'all-probe' : execute ? 'execute-requested' : 'probe-only',
  executed: false,
  physicalAdmission: false,
  refusal,
  lowering: supported ? ir.lowering[engine] : null,
  invariants: ir.invariants,
  scope: 'Availability and boundary probe. A solver result is never synthesized and cannot promote physical status.'
};
if (execute && engine === 'custom' && !refusal) {
  if (!input) {
    record.refusal = 'custom execution requires --input';
  } else {
    const run = spawnSync(process.execPath, ['tooling/plasma-heart/run_custom_solver.mjs', '--input', input, '--output', output], { cwd: root, encoding: 'utf8' });
    record.executed = run.status === 0;
    record.execution = { status: run.status, output, stdout: run.stdout?.trim() ?? '', stderr: run.stderr?.trim() ?? '' };
    if (run.status !== 0) record.refusal = 'custom solver execution failed';
  }
}
if (all) {
  record.engines = Object.fromEntries(Object.keys(commands).map((name) => [name, commands[name].map((command) => {
    if (name === 'custom' && command === process.execPath) return { command, available: fs.existsSync(command), location: command };
    const result = spawnSync(process.platform === 'win32' ? 'where.exe' : 'which', [command], { encoding: 'utf8' });
    return { command, available: result.status === 0, location: result.status === 0 ? result.stdout.trim().split(/\r?\n/)[0] : null };
  })]));
}
console.log(JSON.stringify(record, null, 2));
if (refusal) process.exitCode = 2;
