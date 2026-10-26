import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/translation-free-e8-few-body-clock-gap-v1.json",
  import.meta.url,
), "utf8"));

const K = [
  [2,-1,0,0,0,0,0,0],
  [-1,2,-1,0,0,0,0,0],
  [0,-1,2,-1,0,0,0,-1],
  [0,0,-1,2,-1,0,0,0],
  [0,0,0,-1,2,-1,0,0],
  [0,0,0,0,-1,2,-1,0],
  [0,0,0,0,0,-1,2,0],
  [0,0,-1,0,0,0,0,2],
];
const Kinv = [
  [4,7,10,8,6,4,2,5],
  [7,14,20,16,12,8,4,10],
  [10,20,30,24,18,12,6,15],
  [8,16,24,20,15,10,5,12],
  [6,12,18,15,12,8,4,9],
  [4,8,12,10,8,6,3,6],
  [2,4,6,5,4,3,2,3],
  [5,10,15,12,9,6,3,8],
];
const multiply = (A,B) => A.map(row => B[0].map((_,j) => row.reduce((sum,x,k) => sum + x*B[k][j], 0)));
const identity = n => Array.from({length:n}, (_,i) => Array.from({length:n}, (_,j) => Number(i === j)));

assert.equal(record.schemaVersion, "translation-free-e8-few-body-clock-gap-v1");
assert.deepEqual(multiply(K,Kinv), identity(8));
assert.deepEqual(multiply(Kinv,K), identity(8));
assert.ok(Kinv.flat().every(Number.isInteger));

// phi' = K phi is an integral compact-variable change. A column interaction
// (K e_i)^T phi therefore becomes the single dual field phi'_i on each
// chirality, reducing each interwire cosine to a two-register lock.
const originalSupports = K[0].map((_,column) => K.filter(row => row[column] !== 0).length * 2);
assert.deepEqual(originalSupports, record.compiler.originalCosineBodyCounts);
assert.ok(originalSupports.every(size => size >= 4 && size <= 8));
assert.equal(record.compiler.compiledCosineBodyCount, 2);
assert.equal(Math.max(...K.map(row => row.filter(x => x !== 0).length)), record.compiler.maximumSourceMixerDegree);

// On each bulk pair use S=Z_R Z_L^-1 and T=X_R X_L. For ZX=omega XZ,
// the omega and omega^-1 phases cancel, hence [S,T]=0. The q^2 joint
// eigenvalue pairs label the q^2-dimensional pair Hilbert space once each.
// With normalization d_q=1-cos(2pi/q), the first S or T violation costs its
// bond amplitude exactly.
for (const q of record.sweep.quditDimensions) {
  const dq = 1 - Math.cos(2*Math.PI/q);
  assert.ok(dq > 0);
  const energies = [];
  for (let m = 0; m < q; m += 1) for (let n = 0; n < q; n += 1) {
    energies.push((1-Math.cos(2*Math.PI*m/q))/dq + (1-Math.cos(2*Math.PI*n/q))/dq);
  }
  energies.sort((a,b) => a-b);
  assert.ok(Math.abs(energies[0]) < 1e-12);
  assert.ok(Math.abs(energies[1]-1) < 1e-12);
  assert.equal(energies.filter(x => Math.abs(x) < 1e-12).length, 1);
}

let state = record.sweep.seed >>> 0;
const random = () => {
  state = (1664525 * state + 1013904223) >>> 0;
  return state / 2**32;
};
const generated = [];
for (const q of record.sweep.quditDimensions) {
  for (const wires of record.sweep.wireCounts) {
    const amplitudes = Array.from({length:16*(wires-1)}, () =>
      record.sweep.amplitudeFloor + (record.sweep.amplitudeCeiling-record.sweep.amplitudeFloor)*random());
    const gap = Math.min(...amplitudes);
    generated.push({q,wires,bulkPairs:8*(wires-1),gap:Number(gap.toFixed(12))});
    assert.ok(gap >= record.sweep.amplitudeFloor);
  }
}
assert.deepEqual(generated, record.sweep.records);
assert.equal(Math.min(...generated.map(item => item.gap)), record.sweep.minimumObservedGap);
assert.ok(generated.every(item => item.gap >= record.sweep.certifiedUniformLowerBound));

for (const item of generated) {
  assert.equal(item.bulkPairs, 8*(item.wires-1));
  assert.equal(record.hardware.localTermBodyCount, 2);
  assert.equal(record.hardware.bulkInteractionGraphDegree, 1);
  assert.equal(record.hardware.freeEdgeQudits, 16);
  assert.equal(record.hardware.groundSpaceDimensionFormula, "q^16");
}

assert.equal(record.claimBoundary.continuumE8AnomalyCertified, false);
assert.equal(record.claimBoundary.rotorLimitCertified, false);
assert.equal(record.claimBoundary.clockRegularizedManyBodyGapCertified, true);

console.log(JSON.stringify({
  status: "PASS",
  compiler: {
    originalBodyCounts: originalSupports,
    compiledBodyCount: 2,
    maximumSourceMixerDegree: record.compiler.maximumSourceMixerDegree,
  },
  hardware: {
    localTermBodyCount: 2,
    bulkInteractionGraphDegree: 1,
    freeEdgeQudits: 16,
  },
  sweep: {
    quditDimensions: record.sweep.quditDimensions,
    wireCounts: record.sweep.wireCounts,
    instances: generated.length,
    uniformGapLowerBound: record.sweep.certifiedUniformLowerBound,
    minimumObservedGap: record.sweep.minimumObservedGap,
  },
  verdict: "the finite-qudit dual-basis hardware has an exact size-stable bulk gap above its edge-degenerate ground space",
  nextGate: "add a continuum kinetic metric and show clock-to-rotor convergence while retaining the E8 chiral response",
}, null, 2));
