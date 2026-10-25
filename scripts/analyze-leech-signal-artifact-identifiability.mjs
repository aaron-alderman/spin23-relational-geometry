#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function rank(matrix) {
  const a = matrix.map(row => row.map(Number));
  let pivotRow = 0;
  for (let col = 0; col < (a[0]?.length ?? 0) && pivotRow < a.length; col += 1) {
    let pivot = pivotRow;
    while (pivot < a.length && Math.abs(a[pivot][col]) < 1e-12) pivot += 1;
    if (pivot === a.length) continue;
    [a[pivotRow], a[pivot]] = [a[pivot], a[pivotRow]];
    const scale = a[pivotRow][col];
    for (let j = col; j < a[pivotRow].length; j += 1) a[pivotRow][j] /= scale;
    for (let i = 0; i < a.length; i += 1) {
      if (i === pivotRow) continue;
      const factor = a[i][col];
      for (let j = col; j < a[i].length; j += 1) a[i][j] -= factor * a[pivotRow][j];
    }
    pivotRow += 1;
  }
  return pivotRow;
}

const baseRows = [0, 1].map(signal => ({
  signal,
  row: [1, signal, signal]
}));
const baseColumns = ['intercept', 'physical_signal', 'signal_label_artifact'];

const factorialRows = [];
for (const signal of [0, 1]) {
  for (const route of [0, 1]) {
    for (const detector of [0, 1]) {
      for (const injection of [0, 1]) {
        const routed = Number(detector === route);
        const physical = signal * routed;
        factorialRows.push({
          signal,
          route,
          detector,
          injection,
          row: [
            1,
            physical,
            signal,
            detector,
            signal * detector,
            injection,
            injection * signal,
            injection * detector
          ],
          adversarialRow: [
            1,
            physical,
            signal,
            detector,
            signal * detector,
            injection,
            injection * signal,
            injection * detector,
            physical
          ]
        });
      }
    }
  }
}

const controlledColumns = [
  'intercept',
  'physical_routed_signal',
  'common_signal_state_artifact',
  'detector_offset',
  'detector_specific_signal_artifact',
  'injection_response',
  'signal_dependent_injection_response',
  'detector_dependent_injection_response'
];
const adversarialColumns = [...controlledColumns, 'route_following_artifact'];
const baseRank = rank(baseRows.map(item => item.row));
const controlledRank = rank(factorialRows.map(item => item.row));
const adversarialRank = rank(factorialRows.map(item => item.adversarialRow));

const output = {
  schemaVersion: 'leech-signal-artifact-identifiability-v1',
  date: '2026-10-26',
  theorem: {
    baseDesign: {
      rows: baseRows.length,
      columns: baseColumns,
      rank: baseRank,
      nullity: baseColumns.length - baseRank,
      conclusion: 'signal/blank observations alone cannot distinguish physical signal from an artifact carrying the same signal label'
    },
    routeSwappedInjectionDesign: {
      rows: factorialRows.length,
      columns: controlledColumns,
      rank: controlledRank,
      nullity: controlledColumns.length - controlledRank,
      conclusion: 'random route swapping across two detectors with randomized injection identifies the routed physical coefficient against common and detector-specific signal-state artifacts and injection-response changes'
    },
    adversarialExtension: {
      rows: factorialRows.length,
      columns: adversarialColumns,
      rank: adversarialRank,
      nullity: adversarialColumns.length - adversarialRank,
      exactCollision: ['physical_routed_signal', 'route_following_artifact'],
      conclusion: 'an artifact that follows the same randomized route as the physical signal is observationally identical to that signal'
    }
  },
  factorialCells: factorialRows.map(({signal, route, detector, injection}) => ({signal, route, detector, injection})),
  executionContract: [
    'randomize signal state, route assignment and synthetic injection independently inside every acquisition block',
    'record both detectors on every trial and retain the committed route schedule',
    'fit the full controlled design including signal-by-detector and injection interactions',
    'require full column rank and a lower confidence bound on injection response in both signal states',
    'repeat with the physical route exchanged while detector electronics and analysis labels remain fixed',
    'do not claim identification against route-following artifacts without a second physical modality or an independently calibrated causal intervention'
  ],
  promotionRule: 'The route-swapped coefficient may qualify the Wave 7.222 likelihood only when the controlled design remains full rank after missing-cell removal and both detector-specific injection efficiencies meet the preregistered lower bound.',
  boundary: 'This is an exact identifiability certificate for a declared linear response model. It neither supplies the carrier nor excludes nonlinear, history-dependent or route-following artifacts.'
};

if (process.argv.includes('--write')) {
  fs.writeFileSync(path.join(root, 'evidence', 'data', 'leech-signal-artifact-identifiability-v1.json'), `${JSON.stringify(output, null, 2)}\n`);
}
console.log(JSON.stringify(output, null, 2));
