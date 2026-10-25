#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..', '..');
const record = JSON.parse(fs.readFileSync(path.join(
  root, 'evidence', 'data', 'leech-cutoff-charge-shell-enumeration-v1.json'
), 'utf8'));
const leech = JSON.parse(fs.readFileSync(path.join(
  root, 'evidence', 'data', 'leech-explicit-k-matrix-v1.json'
), 'utf8'));
function assert(condition, message) { if (!condition) throw new Error(message); }

assert(record.schemaVersion === 'leech-cutoff-charge-shell-enumeration-v1', 'wrong schema');
assert(record.configuration.cutoff === 2 && record.configuration.method === 'orbit', 'wrong construction');
assert(record.enumeration.generatedNormFourOrbit === leech.source.catalogueClaims.kissingNumber, 'orbit/kissing mismatch');
assert(record.enumeration.generatedNormFourOrbit === 196560, 'wrong full orbit');
assert(record.enumeration.shellCounts['4'] === 196512, 'wrong retained shell');
assert(record.enumeration.excludedNormFourVectorsByCutoff === 48, 'wrong cutoff exclusion');
assert(record.enumeration.minimumNonzeroNorm === 4, 'wrong minimum norm');
assert(record.enumeration.inversionClosed === true, 'retained shell must be inversion closed');
const graph = record.normFourSingleChargeGraph;
assert(graph.vertices === 196512 && graph.undirectedEdges === 75856, 'wrong shell graph size');
assert(graph.maximumDegree === 12, 'wrong maximum degree');
assert(graph.isolatedVertices === 110242, 'wrong isolated count');
assert(Object.values(graph.degreeHistogram).reduce((sum, value) => sum + value, 0) === graph.vertices, 'degree histogram total mismatch');
assert(Object.entries(graph.degreeHistogram).reduce((sum, [degree, count]) => sum + Number(degree) * count, 0) === 2 * graph.undirectedEdges, 'handshake identity failed');
assert(graph.restrictedPotentialGershgorinLower === 18, 'wrong restricted potential bound');
assert(Math.abs(graph.restrictedHamiltonianLowerAtRatioPoint01 - 18.02) < 1e-14, 'wrong restricted Hamiltonian bound');
assert(graph.coordinateCutoffBlockedHops === 220544, 'wrong blocked-hop count');
assert(graph.exteriorHops === 9060320, 'wrong exterior-hop count');
assert(2 * graph.undirectedEdges + graph.exteriorHops + graph.coordinateCutoffBlockedHops === 48 * graph.vertices, 'full hop census failed');
assert(graph.exteriorHopsByTargetNorm['0'] === 32, 'wrong zero-charge incidence');
assert(graph.exteriorHopsByTargetNorm['2'] === undefined, 'rootless norm-two shell must be absent');
assert(graph.exteriorHopsByTargetNorm['6'] === 1592382, 'wrong norm-six incidence');
assert(graph.exteriorHopsByTargetNorm['8'] === 3339938, 'wrong norm-eight incidence');

console.log(JSON.stringify({
  status: 'PASS',
  completeOrbit: record.enumeration.generatedNormFourOrbit,
  retainedAtCutoffTwo: graph.vertices,
  excluded: record.enumeration.excludedNormFourVectorsByCutoff,
  edges: graph.undirectedEdges,
  isolated: graph.isolatedVertices,
  maximumDegree: graph.maximumDegree,
  restrictedHamiltonianLower: graph.restrictedHamiltonianLowerAtRatioPoint01,
  exteriorHops: graph.exteriorHops,
  normSixHops: graph.exteriorHopsByTargetNorm['6'],
  normEightHops: graph.exteriorHopsByTargetNorm['8']
}));
