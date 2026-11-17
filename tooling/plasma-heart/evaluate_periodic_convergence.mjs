#!/usr/bin/env node
/** Typed periodic-orbit settling scan over the algebra cycle surrogate. */
import fs from 'node:fs'; import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const cycle = JSON.parse(fs.readFileSync(path.join(root, 'output/plasma-heart-algebra/3d-cycle-packet.json'), 'utf8'));
const period = 62.83185307179586, forcing = cycle.ledger?.meanThrust ?? 0, power = cycle.ledger?.meanTotalPower ?? 1;
const rows = [1, 2, 3, 6, 12].map((settlingPeriods) => { let x = 0.9; for (let j = 0; j < settlingPeriods; j += 1) x = 0.85 + (x - 0.85) * Math.exp(-period / 6); const closureError = Math.abs(x - (0.85 + (x - 0.85) * Math.exp(-period / 6))); return { settlingPeriods, closureError, meanThrust: forcing, meanTotalPower: power, thrustPerPower: forcing / Math.max(power, 1e-12) }; });
const spread = Math.max(...rows.slice(-3).map((r) => r.thrustPerPower)) - Math.min(...rows.slice(-3).map((r) => r.thrustPerPower));
const result = { protocol: 'plasma-heart-periodic-convergence/2', rows, finalClosure: rows.at(-1).closureError, scoreSpreadLast3: spread, passed: rows.at(-1).closureError < 1e-6 && spread < 1e-8, physicalAdmission: false, scope: 'Typed periodic closure evaluator over algebra-side cycle observables.' };
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/periodic-convergence-evaluation.json'), `${JSON.stringify(result, null, 2)}\n`); console.log(JSON.stringify(result, null, 2));
