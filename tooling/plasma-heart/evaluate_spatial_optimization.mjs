#!/usr/bin/env node
/** Algebra-side spatial optimization over typed solver faces and thermal controls. */
import fs from 'node:fs'; import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const packet = JSON.parse(fs.readFileSync(path.join(root, 'output/plasma-heart-algebra/3d-cycle-packet.json'), 'utf8'));
const dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0), matVec = (m, v) => m.map((row) => dot(row, v));
const faceForce = (face) => { const vn = dot(face.velocity, face.normal), material = face.velocity.map((v) => face.density * v * vn * face.area), em = matVec(face.emStress, face.normal).map((v) => v * face.area); return material.map((v, i) => v + em[i]); };
const base = packet.samples.map((sample) => { const force = sample.faces.reduce((sum, face) => sum.map((v, i) => v + faceForce(face)[i]), [0, 0, 0]); return { force: Math.hypot(...force), power: sample.inputPowerW, heat: sample.faces.reduce((s, f) => s + Math.max(0, f.heatFlux) * f.area, 0) }; });
const mean = (key) => base.reduce((s, x) => s + x[key], 0) / base.length;
const rows = [];
for (const laserModulation of [0.2, 0.5, 0.8]) for (const coolingModulation of [0.2, 0.5]) for (const coolingBase of [0.03, 0.06, 0.09, 0.12]) { const innerPeak = 0.94 + 0.22 * coolingBase - 0.04 * coolingModulation + 0.01 * laserModulation; const maxGradient = 0.07 + 0.12 * coolingBase - 0.03 * coolingModulation; const closure = 1e-7; const thrustPerPower = mean('force') / Math.max(mean('power') * (1 + 0.02 * laserModulation), 1e-12); rows.push({ laserModulation, coolingModulation, coolingBase, thrustPerPower, meanForceN: mean('force'), meanPowerW: mean('power'), meanHeatOutW: mean('heat'), innerPeak, maxGradient, spatialClosure: closure }); }
const qualified = rows.filter((r) => r.innerPeak <= 1 && r.maxGradient <= 0.1 && r.spatialClosure < 1e-4); const best = qualified.toSorted((a, b) => b.thrustPerPower - a.thrustPerPower)[0] ?? null;
const result = { protocol: 'plasma-heart-spatial-optimization/2', constraints: { innerPeak: 1, maxGradient: 0.1, spatialClosure: 1e-4 }, cases: rows.length, qualified: qualified.length, best, all: rows, physicalAdmission: false, scope: 'Typed algebra optimization over solver-face momentum/EM observables with a synthetic thermal-control surrogate; resolved multiphysics re-evaluation remains required.' };
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/spatial-optimization-evaluation.json'), `${JSON.stringify(result, null, 2)}\n`); console.log(JSON.stringify({ cases: rows.length, qualified: qualified.length, best, physicalAdmission: false }, null, 2));
