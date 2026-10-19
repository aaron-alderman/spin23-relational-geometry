import assert from 'node:assert/strict';

const mod3 = (n) => ((n % 3) + 3) % 3;
const assignments = [];
for (let mask = 0; mask < 8; mask++) {
  const b = [0, 1, 2].map((i) => (mask >> i) & 1);
  const edgeCentralExponents = [0, 1, 2].map((i) => (1 + b[i] + b[mod3(i + 1)]) % 2);
  const cancelledEdges = edgeCentralExponents.filter((x) => x === 0).length;
  assignments.push({ b, edgeCentralExponents, cancelledEdges });
}
assert.equal(assignments.filter((x) => x.cancelledEdges === 3).length, 0);
assert.equal(Math.max(...assignments.map((x) => x.cancelledEdges)), 2);
assert.equal(assignments.filter((x) => x.cancelledEdges === 2).length, 6);
assert.equal(assignments.filter((x) => x.cancelledEdges === 0).length, 2);
for (const x of assignments) assert.equal(x.edgeCentralExponents.reduce((a, b) => (a + b) % 2, 0), 1);

// A global Pfaffian sign adds the same bit to every face and changes no edge condition.
for (const x of assignments) {
  const shifted = x.b.map((v) => v ^ 1);
  const exponents = [0, 1, 2].map((i) => (1 + shifted[i] + shifted[mod3(i + 1)]) % 2);
  assert.deepEqual(exponents, x.edgeCentralExponents);
}

// The canonical double cover is a six-cycle and admits alternating face bits.
const doubleCoverBits = [0, 1, 0, 1, 0, 1];
const coverExponents = doubleCoverBits.map((v, i) => (1 + v + doubleCoverBits[(i + 1) % 6]) % 2);
assert.deepEqual(coverExponents, [0, 0, 0, 0, 0, 0]);

console.log(JSON.stringify({
  protocol: 'odd-cycle-sideband-assignment-obstruction/1',
  baseFaces: ['R0=F', 'R1=FA', 'R2=FA^2'],
  adjacentBaseProducts: 'R_i R_{i+1}=A (indices mod 3)',
  coherentEdgeExponent: 'e_i=1+b_i+b_{i+1} mod 2',
  exhaustiveAssignments: assignments,
  globalSolutions: 0,
  bestStaticAssignment: { cancelledEdges: 2, unavoidableCentralEdges: 1 },
  triangleFlux: 'sum_i e_i = 1 mod 2 for every vertex assignment',
  globalPfaffianSign: 'b_i -> b_i+1 leaves every e_i unchanged',
  doubleCover: { cycleLength: 6, alternatingBits: doubleCoverBits, allEdgesCancelled: true },
  theorem: 'No static facewise sideband label cancels the dicyclic cocycle on all three placement Coxeter paths. The obstruction is the odd-cycle Z2 flux; it disappears on the canonical double cover.',
  boundary: 'A path-dependent interface, doubled placement cover, or additional idler/inflow datum can evade the obstruction. The calculation does not select which physical resolution occurs.',
  passed: true,
}, null, 2));
