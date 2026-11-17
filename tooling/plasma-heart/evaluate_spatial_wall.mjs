#!/usr/bin/env node
/** Typed spatial-wall two-node periodic thermal screen. */
import fs from 'node:fs'; import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const period = 62.83185307179586, steps = 160, dt = period / steps, Ci = 0.6, Co = 0.8, kwall = 0.12, hamb = 0.04;
let Ti = 0.9, To = 0.9; const history = [];
const source = (t) => 0.012 * (1 + 0.25 * Math.sin(2 * Math.PI * t / period));
const cooling = (t) => 0.01 * (1 + 0.15 * Math.cos(2 * Math.PI * t / period));
for (let orbit = 0; orbit < 8; orbit += 1) for (let i = 0; i < steps; i += 1) { const t = i * dt, q = source(t), c = cooling(t); Ti += dt * (q - kwall * (Ti - To)) / Ci; To += dt * (kwall * (Ti - To) - hamb * (To - 1) - c) / Co; }
const start = [Ti, To]; for (let i = 0; i < steps; i += 1) { const t = i * dt, q = source(t), c = cooling(t); Ti += dt * (q - kwall * (Ti - To)) / Ci; To += dt * (kwall * (Ti - To) - hamb * (To - 1) - c) / Co; history.push([Ti, To]); }
const result = { protocol: 'plasma-heart-spatial-wall/2', parameters: { innerHeatCapacity: Ci, outerHeatCapacity: Co, wallConductance: kwall, ambientConductance: hamb }, innerTemperaturePeak: Math.max(...history.map((x) => x[0])), outerTemperaturePeak: Math.max(...history.map((x) => x[1])), innerTemperatureMin: Math.min(...history.map((x) => x[0])), outerTemperatureMin: Math.min(...history.map((x) => x[1])), maxInnerOuterGradient: Math.max(...history.map((x) => x[0] - x[1])), periodicClosure: Math.max(Math.abs(Ti - start[0]), Math.abs(To - start[1])), physicalAdmission: false, scope: 'Typed two-node radial wall surrogate; full 3D conduction/FSI remains unresolved.' };
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/spatial-wall-evaluation.json'), `${JSON.stringify(result, null, 2)}\n`); console.log(JSON.stringify(result, null, 2));
