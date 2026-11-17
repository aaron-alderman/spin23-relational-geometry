#!/usr/bin/env node
/** Typed two-node distributed cooling scan over solver heat exports. */
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const chemistry = [0.8, 1, 1.2].map((scale) => JSON.parse(fs.readFileSync(path.join(root, `output/plasma-heart-algebra/chemistry-coupling/result-${scale}.json`), 'utf8')));
const dt = 62.83185307179586 / 8, heatScale = 0.02, Ci = 0.5, Co = 0.7, conductance = 0.04;
const evaluate = (innerCoolingFraction, item) => { let Ti = 0.9, To = 0.9; const heat = item.ledger.heatExport; for (let cycle = 0; cycle < 8; cycle += 1) for (let i = 0; i < 9; i += 1) { const qi = heatScale * innerCoolingFraction * heat, qo = heatScale * (1 - innerCoolingFraction) * heat; Ti += dt * (qi - conductance * (Ti - 0.85)) / Ci; To += dt * (qo - conductance * (To - 0.85)) / Co; } const start = [Ti, To], history = []; for (let i = 0; i < 9; i += 1) { const qi = heatScale * innerCoolingFraction * heat, qo = heatScale * (1 - innerCoolingFraction) * heat; Ti += dt * (qi - conductance * (Ti - 0.85)) / Ci; To += dt * (qo - conductance * (To - 0.85)) / Co; history.push([Ti, To]); } return { innerCoolingFraction, reactionRateScale: item.identity?.meshIdentity?.match(/chemistry-rate-(.*)/)?.[1] ?? null, innerPeak: Math.max(...history.map((v) => v[0])), outerPeak: Math.max(...history.map((v) => v[1])), maxGradient: Math.max(...history.map((v) => Math.abs(v[0] - v[1]))), closure: Math.max(Math.abs(Ti - start[0]), Math.abs(To - start[1])), heatExportW: heat }; };
const rows = [];
for (const fraction of [0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1]) for (const item of chemistry) rows.push(evaluate(fraction, item));
const safe = rows.filter((row) => row.innerPeak <= 1 && row.maxGradient <= 0.1 && row.closure < 1e-4);
const result = { protocol: 'plasma-heart-distributed-cooling/2', constraints: { innerPeak: 1, maxGradient: 0.1 }, cases: rows, qualified: safe.length, best: safe.sort((a, b) => a.innerCoolingFraction - b.innerCoolingFraction || a.innerPeak - b.innerPeak)[0] ?? null, physicalAdmission: false, scope: 'Typed two-node thermal surrogate; cooling distribution is a design variable and not measured hardware data.' };
fs.mkdirSync(path.join(root, 'output/plasma-heart-algebra'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/distributed-cooling-evaluation.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ cases: rows.length, qualified: safe.length, best: result.best, physicalAdmission: false }, null, 2));
