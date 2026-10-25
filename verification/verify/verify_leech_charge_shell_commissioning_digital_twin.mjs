#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..', '..');
const record = JSON.parse(fs.readFileSync(path.join(root, 'evidence', 'data', 'leech-charge-shell-commissioning-digital-twin-v1.json'), 'utf8'));
function assert(condition, message) { if (!condition) throw new Error(message); }

assert(record.schemaVersion === 'leech-charge-shell-commissioning-digital-twin-v1', 'wrong schema');
assert(record.inputs.includes('leech-charge-shell-drift-robust-likelihood-v1'), 'robust likelihood input missing');
assert(record.acquisitionModel.robustRootfulTotalTrials === 2478300, 'wrong rootful budget');
assert(record.acquisitionModel.robustOddFamilyTotalTrials === 8337280, 'wrong odd-family budget');
assert(record.acquisitionModel.evenControlTotalShots === 516928, 'Hadamard budget correction missing');
const byId = Object.fromEntries(record.cases.map(item => [item.id, item]));
assert(byId['ideal-leech-shell']?.allPass === true, 'ideal shell rejected');
assert(record.decision.everyNamedCounterfeitRejected === true, 'a named counterfeit passed');
assert(record.decision.eachCounterfeitRejectedByNamedObservable.graphIsolation, 'graph counterfeit not localized');
assert(record.decision.eachCounterfeitRejectedByNamedObservable.coronaNormEight, 'corona counterfeit not localized');
assert(record.decision.eachCounterfeitRejectedByNamedObservable.rootful, 'rootful counterfeit not localized');
assert(record.decision.eachCounterfeitRejectedByNamedObservable.inversionLeak, 'inversion counterfeit not localized');
assert(record.decision.eachCounterfeitRejectedByNamedObservable.evenBias, 'even-control counterfeit not localized');
assert(byId['single-pair-inversion-phase-leak'].phaseControlMeaning === 'relative inversion phase/coherence failure', 'phase truth table failed');
assert(byId['single-pair-even-control-bias'].phaseControlMeaning.includes('phase inference withheld'), 'even failure did not withhold phase inference');
assert(record.boundary.includes('not the physical carrier'), 'synthetic boundary missing');

console.log(JSON.stringify({
  status: 'PASS',
  cases: record.cases.map(item => ({id: item.id, allPass: item.allPass, failedGates: Object.entries(item.gates).filter(([, pass]) => !pass).map(([gate]) => gate)})),
  rootfulTrials: record.acquisitionModel.robustRootfulTotalTrials,
  oddFamilyTrials: record.acquisitionModel.robustOddFamilyTotalTrials,
  evenControlShots: record.acquisitionModel.evenControlTotalShots,
  idealAccepted: record.decision.idealAccepted,
  everyNamedCounterfeitRejected: record.decision.everyNamedCounterfeitRejected
}));
