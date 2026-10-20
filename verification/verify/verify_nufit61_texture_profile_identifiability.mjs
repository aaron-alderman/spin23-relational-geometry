import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence = JSON.parse(readFileSync('evidence/data/spin23-nufit61-texture-profile-identifiability.json', 'utf8'));

const sections = [
  ['T23','DMA','DCP'],
  ['T13','T12'], ['T13','DMS'], ['T12','DMS'], ['T13','T23'],
  ['T13','DMA'], ['T23','DMA'], ['T13','DCP'], ['T23','DCP'],
  ['DMA','DCP'], ['T12','T23'], ['T12','DCP'], ['T12','DMA'],
  ['DMS','T23'], ['DMS','DCP'], ['DMS','DMA'],
  ['T13'], ['T12'], ['T23'], ['DCP'], ['DMS'], ['DMA'],
];

assert.equal(sections.length, 22);
const relevant = new Set(['T12','T13','DMS','DMA']);
const overlap = section => section.filter(x => relevant.has(x)).length;
assert.equal(Math.max(...sections.map(overlap)), 2);
assert.equal(sections.some(section => [...relevant].every(x => section.includes(x))), false);
assert.equal(evidence.largestPublishedJointOverlapWithRelevantSet, 2);
assert.equal(evidence.containsFullRelevantJointProfile, false);

// Exact non-identifiability witness. Two four-variable costs have identical
// profiled minima on every proper subset, yet different minima on a four-way
// constraint.
const points = Array.from({length: 16}, (_, n) => [0,1,2,3].map(i => (n >> i) & 1));
const parity = x => x.reduce((a, b) => a + b, 0) & 1;
const evenCost = x => parity(x);
const oddCost = x => 1 - parity(x);

function assignments(indices) {
  return Array.from({length: 2 ** indices.length}, (_, n) =>
    indices.map((_, j) => (n >> j) & 1));
}

function profile(cost, indices, values) {
  return Math.min(...points
    .filter(x => indices.every((index, j) => x[index] === values[j]))
    .map(cost));
}

for (let mask = 1; mask < 15; mask++) {
  const indices = [0,1,2,3].filter(i => (mask >> i) & 1);
  for (const values of assignments(indices)) {
    assert.equal(profile(evenCost, indices, values), 0);
    assert.equal(profile(oddCost, indices, values), 0);
  }
}

const evenConstraint = points.filter(x => parity(x) === 0);
assert.equal(Math.min(...evenConstraint.map(evenCost)), 0);
assert.equal(Math.min(...evenConstraint.map(oddCost)), 1);

// The electron-normal triangle defect is nontrivial in each of the four
// variables at a representative interior point.
function defect({m1, s12, s13, dm21, dm31}) {
  const lengths = [
    m1 * (1-s12) * (1-s13),
    Math.sqrt(m1*m1 + dm21) * s12 * (1-s13),
    Math.sqrt(m1*m1 + dm31) * s13,
  ];
  return 2*Math.max(...lengths) - lengths.reduce((a,b) => a+b, 0);
}

const p = {m1: 0.004, s12: 0.3088, s13: 0.02248, dm21: 7.537e-5, dm31: 2.511e-3};
for (const [key, step] of [['s12',1e-4],['s13',1e-5],['dm21',1e-7],['dm31',1e-6]]) {
  const q = {...p, [key]: p[key] + step};
  assert.notEqual(defect(q), defect(p), `triangle defect must depend on ${key}`);
}

assert.match(evidence.verdict, /not identifiable/);
console.log('PASS 1491: NuFIT 6.1 publishes no joint profile for the four electron-zero variables, and exact parity costs prove that even all proper-subset profiles cannot identify a four-way constrained likelihood.');
