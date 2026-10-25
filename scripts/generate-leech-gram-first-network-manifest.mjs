#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const analysis = JSON.parse(execFileSync(
  process.execPath,
  [path.join(root, 'scripts', 'analyze-leech-pareto-transformers.mjs'), '--full'],
  {encoding: 'utf8'}
));
const selected = analysis.results.find(item => item.id === 'gram-first');
if (!selected) throw new Error('gram-first factor missing');
const G = selected.gram.map(row => row.map(BigInt));
const n = G.length;

const gcd = (a, b) => {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
};
const rational = (numerator, denominator = 1n) => {
  if (denominator < 0n) { numerator = -numerator; denominator = -denominator; }
  const divisor = gcd(numerator, denominator);
  return {numerator: numerator / divisor, denominator: denominator / divisor};
};
const add = (a, b) => rational(a.numerator * b.denominator + b.numerator * a.denominator, a.denominator * b.denominator);
const subtract = (a, b) => rational(a.numerator * b.denominator - b.numerator * a.denominator, a.denominator * b.denominator);
const multiply = (a, b) => rational(a.numerator * b.numerator, a.denominator * b.denominator);
const divide = (a, b) => rational(a.numerator * b.denominator, a.denominator * b.numerator);
const text = value => value.denominator === 1n ? `${value.numerator}` : `${value.numerator}/${value.denominator}`;

const L = Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => rational(i === j ? 1n : 0n)));
const D = [];
for (let j = 0; j < n; j += 1) {
  let diagonal = rational(G[j][j]);
  for (let k = 0; k < j; k += 1) diagonal = subtract(diagonal, multiply(multiply(L[j][k], L[j][k]), D[k]));
  D[j] = diagonal;
  for (let i = j + 1; i < n; i += 1) {
    let value = rational(G[i][j]);
    for (let k = 0; k < j; k += 1) value = subtract(value, multiply(multiply(L[i][k], L[j][k]), D[k]));
    L[i][j] = divide(value, D[j]);
  }
}

const offDiagonalTransformerRatios = [];
for (let row = 0; row < n; row += 1) for (let column = 0; column < row; column += 1) {
  if (L[row][column].numerator === 0n) continue;
  offDiagonalTransformerRatios.push({
    inputPort: row,
    capacitorCoordinate: column,
    ratio: text(L[row][column])
  });
}

for (let i = 0; i < n; i += 1) for (let j = 0; j < n; j += 1) {
  let reconstructed = rational(0n);
  for (let k = 0; k < n; k += 1) reconstructed = add(reconstructed, multiply(multiply(L[i][k], D[k]), L[j][k]));
  if (reconstructed.denominator !== 1n || reconstructed.numerator !== G[i][j]) {
    throw new Error(`network reconstruction failed at ${i},${j}`);
  }
}

const output = {
  schemaVersion: 'leech-gram-first-ideal-network-manifest-v1',
  date: '2026-10-26',
  source: analysis.schemaVersion,
  basis: selected.id,
  portCount: n,
  constitutiveLaw: 'G = L D L^T with capacitor coordinates x = L^T phi',
  globalScale: 'one positive fitted capacitance scale multiplies every diagonalCapacitance',
  diagonalCapacitors: D.map((value, coordinate) => ({coordinate, relativeCapacitance: text(value)})),
  unityPaths: Array.from({length: n}, (_, port) => ({inputPort: port, capacitorCoordinate: port, ratio: '1'})),
  offDiagonalTransformerRatios,
  counts: {
    capacitors: D.length,
    unityPaths: n,
    signedOffDiagonalRatios: offDiagonalTransformerRatios.length,
    totalModeMixingTerms: n + offDiagonalTransformerRatios.length
  },
  coordinateTransform: selected.transform,
  targetGramMatrix: selected.gram,
  commissioning: {
    measurement: 'measure the complete symmetric 24-port capacitance/admittance matrix at the declared operating band, fit one positive global scale, and retain the full covariance',
    pass: 'positive definiteness plus propagated inverse-metric error below one percent globally or on a preregistered occupied subspace',
    requiredNonidealities: ['finite bandwidth', 'loss tangent', 'transformer phase', 'stray capacitance', 'mutual-inductance error', 'routing crosstalk']
  },
  boundary: 'This exact ideal-network manifest removes coefficient ambiguity. It is not a planar layout, foundry model, finite-bandwidth simulation or fabricated carrier.'
};

if (process.argv.includes('--write')) {
  fs.writeFileSync(path.join(root, 'evidence', 'data', 'leech-gram-first-ideal-network-manifest-v1.json'), `${JSON.stringify(output, null, 2)}\n`);
}
console.log(JSON.stringify(output, null, 2));
