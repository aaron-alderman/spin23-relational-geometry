#!/usr/bin/env node
/** Validate, integrate, and Pareto-rank externally resolved typed packets. */
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const arg = process.argv.indexOf('--inputs');
const inputs = arg >= 0 ? process.argv[arg + 1].split(',') : ['output/plasma-heart-algebra/3d-cycle-packet.json', 'output/plasma-heart-algebra/quasi1d-cycle-packet.json'];
const read = (file) => JSON.parse(fs.readFileSync(path.resolve(root, file), 'utf8'));
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const validate = (sample) => {
  if (!Number.isFinite(sample.time) || !Number.isFinite(sample.inputPowerW) || sample.inputPowerW < 0) throw new Error('sample time/power invalid');
  const force = [0, 0, 0], torque = [0, 0, 0]; let heat = 0;
  for (const face of sample.faces ?? []) {
    if (!(face.area > 0) || !Array.isArray(face.normal) || !Array.isArray(face.velocity) || !Array.isArray(face.emStress)) throw new Error('face contract invalid');
    const em = face.emStress.map((row) => dot(row, face.normal));
    const massFlux = face.density * dot(face.velocity, face.normal);
    const dF = face.velocity.map((v, i) => face.area * (massFlux * v + face.pressure * face.normal[i] - em[i]));
    dF.forEach((value, i) => { force[i] += value; });
    cross(face.position, dF).forEach((value, i) => { torque[i] += value; });
    heat += Math.max(0, face.heatFlux ?? 0) * face.area;
  }
  return { force, forceMagnitudeN: Math.hypot(...force), torque, heatOutW: heat };
};
const evaluate = (source) => {
  const packet = read(source), samples = [...packet.samples].sort((a, b) => a.time - b.time);
  if (samples.length < 2) throw new Error(`${source}: at least two samples required`);
  const vals = samples.map(validate), period = Number(packet.period ?? (samples.at(-1).time - samples[0].time));
  if (!(period > 0)) throw new Error(`${source}: period invalid`);
  const trap = (field) => samples.slice(0, -1).reduce((sum, sample, i) => sum + 0.5 * (field(sample, i) + field(samples[i + 1], i + 1)) * (samples[i + 1].time - sample.time), 0) / period;
  const force = [0, 1, 2].map((j) => trap((_, i) => vals[i].force[j]));
  const power = trap((sample) => sample.inputPowerW), heat = trap((_, i) => vals[i].heatOutW);
  const energy = samples.map((s) => s.energyResidualW), entropy = samples.map((s) => s.entropyProductionW);
  return { source, solverFamilies: [...new Set(samples.map((s) => s.metadata?.solver ?? 'unknown'))].sort(), meanForceN: Math.hypot(...force), meanPowerW: power, forcePerPowerNPerW: Math.hypot(...force) / Math.max(power, 1e-30), meanHeatOutW: heat, periodicClosure: Math.max(Math.abs(vals[0].forceMagnitudeN - vals.at(-1).forceMagnitudeN), Math.abs(samples[0].inputPowerW - samples.at(-1).inputPowerW)), energyClosureProvided: energy.every((x) => Number.isFinite(x)), energyResidualMaxW: Math.max(...energy.map((x) => Math.abs(x))), entropyProductionNonnegative: entropy.every((x) => Number.isFinite(x) && x >= 0) };
};
const candidates = inputs.map(evaluate);
const dominates = (a, b) => a.forcePerPowerNPerW >= b.forcePerPowerNPerW && a.meanHeatOutW <= b.meanHeatOutW && (a.forcePerPowerNPerW > b.forcePerPowerNPerW || a.meanHeatOutW < b.meanHeatOutW);
const front = candidates.filter((candidate) => !candidates.some((other) => other !== candidate && dominates(other, candidate)));
const families = [...new Set(candidates.flatMap((candidate) => candidate.solverFamilies))].sort();
const result = { protocol: 'plasma-heart-external-packet-pareto/2', candidates, front, frontCount: front.length, solverFamilyCount: families.length, solverFamilies: families, allDistinctSolverFamilies: families.length === candidates.length, allClosureQualified: candidates.every((x) => x.periodicClosure < 1e-8), allEnergyQualified: candidates.every((x) => x.energyClosureProvided && x.energyResidualMaxW < 1e-8 && x.entropyProductionNonnegative), physicalAdmission: false, scope: 'Typed Pareto reduction of externally resolved packets; physical admission still requires solver metadata and independent energy closure.' };
fs.mkdirSync(path.join(root, 'output/plasma-heart-algebra'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/external-packet-pareto-evaluation.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ candidates: candidates.length, frontCount: front.length, allClosureQualified: result.allClosureQualified, physicalAdmission: false }, null, 2));
