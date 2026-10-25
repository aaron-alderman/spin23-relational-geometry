#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..', '..');
const record = JSON.parse(fs.readFileSync(path.join(root, 'evidence', 'data', 'leech-charge-shell-discrimination-v1.json'), 'utf8'));
const protocol = JSON.parse(fs.readFileSync(path.join(root, 'evidence', 'data', 'leech-charge-shell-commissioning-v1.json'), 'utf8'));
function assert(condition, message) { if (!condition) throw new Error(message); }

assert(record.schemaVersion === 'leech-charge-shell-discrimination-v1', 'wrong schema');
assert(record.protocol === protocol.schemaVersion, 'wrong protocol');
assert(record.counterfeits.length === 5, 'counterfeit suite incomplete');
const byId = Object.fromEntries(record.counterfeits.map(item => [item.id, item]));
assert(byId['graph-isolation-shift'].falseAcceptanceUpperBound < 3e-29, 'graph power too weak');
assert(byId['corona-norm-eight-shift'].falseAcceptanceUpperBound < 3e-29, 'corona power too weak');
assert(Math.abs(byId['rootful-contamination'].falseAcceptanceUpperBound - (1 - 5e-4) ** 29956) < 1e-18, 'rootful power mismatch');
assert(byId['single-pair-inversion-phase-leak'].falseAcceptanceUpperBound < 3e-13, 'phase power too weak');
assert(byId['single-pair-even-control-bias'].falseAcceptanceUpperBound < 6e-12, 'control power too weak');
assert(record.maximumCounterfeitFalseAcceptanceUpperBound === byId['rootful-contamination'].falseAcceptanceUpperBound, 'wrong weakest discriminator');
assert(record.minimumCounterfeitRejectionProbabilityLowerBound > 0.9999996, 'minimum named-counterfeit power too weak');
assert(record.decisionTruthTable.length === 4, 'parity decision table incomplete');
assert(record.decisionTruthTable.filter(item => item.meaning.includes('phase inference withheld')).length === 2, 'control-failure guard missing');

console.log(JSON.stringify({
  status: 'PASS',
  counterfeits: record.counterfeits.map(item => ({id: item.id, falseAcceptanceUpperBound: item.falseAcceptanceUpperBound})),
  maximumFalseAcceptanceUpperBound: record.maximumCounterfeitFalseAcceptanceUpperBound,
  minimumRejectionProbabilityLowerBound: record.minimumCounterfeitRejectionProbabilityLowerBound,
  parityDecisionBranches: record.decisionTruthTable.length
}));
