import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/translation-free-e8-adaptive-shell-solver-plan-v1.json",
  import.meta.url,
), "utf8"));
const K = [
  [2,-1,0,0,0,0,0,0],[-1,2,-1,0,0,0,0,0],
  [0,-1,2,-1,0,0,0,-1],[0,0,-1,2,-1,0,0,0],
  [0,0,0,-1,2,-1,0,0],[0,0,0,0,-1,2,-1,0],
  [0,0,0,0,0,-1,2,0],[0,0,-1,0,0,0,0,2],
];
const Kinv = [
  [4,7,10,8,6,4,2,5],[7,14,20,16,12,8,4,10],
  [10,20,30,24,18,12,6,15],[8,16,24,20,15,10,5,12],
  [6,12,18,15,12,8,4,9],[4,8,12,10,8,6,3,6],
  [2,4,6,5,4,3,2,3],[5,10,15,12,9,6,3,8],
];
const multiply = (A,B) => A.map(row => B[0].map((_,j) =>
  row.reduce((sum,x,k) => sum+x*B[k][j],0)));
const identity = n => Array.from({length:n},(_,i) =>
  Array.from({length:n},(_,j) => Number(i===j)));
const sigma3 = n => {
  let sum = 0;
  for (let divisor=1; divisor<=n; divisor+=1) if (n%divisor===0) sum += divisor**3;
  return sum;
};

assert.equal(record.schemaVersion, "translation-free-e8-adaptive-shell-solver-plan-v1");
assert.deepEqual(multiply(K,Kinv),identity(8));
let cumulative = 1;
for (const shell of record.thetaSeries.shells) {
  const multiplicity = shell.m===0 ? 1 : 240*sigma3(shell.m);
  if (shell.m>0) cumulative += multiplicity;
  assert.equal(shell.normSquared,2*shell.m);
  assert.equal(shell.multiplicity,multiplicity);
  assert.equal(shell.cumulativeStates,cumulative);
}

// Exact integral change of variables on several deterministic charge vectors.
const vectors = [
  [1,0,0,0,0,0,0,0],[1,-2,3,-1,0,2,-1,1],
  [2,1,-1,0,3,-2,1,-3],[-1,-1,-1,-1,-1,-1,-1,-1],
];
const vectorMultiply = (A,v) => A.map(row => row.reduce((sum,x,i) => sum+x*v[i],0));
const quadratic = (v,A) => v.reduce((sum,x,i) => sum+x*A[i].reduce((s,y,j) => s+y*v[j],0),0);
for (const m of vectors) {
  const n = vectorMultiply(K,m);
  assert.deepEqual(vectorMultiply(Kinv,n),m);
  assert.equal(quadratic(n,Kinv),quadratic(m,K));
}

const maximumStepL1 = Math.max(...Array.from({length:8},(_,column) =>
  Kinv.reduce((sum,row) => sum+Math.abs(row[column]),0)));
assert.equal(maximumStepL1,record.commonBasisDifferentOperators.maximumStepL1Norm);
assert.deepEqual(record.solverPlan.basisSizes,
  record.solverPlan.cutoffSequenceKineticEnergy.map(cutoff =>
    record.thetaSeries.shells.find(shell => shell.m===cutoff).cumulativeStates));
for (let i=0;i<record.solverPlan.basisSizes.length;i+=1) {
  const memory = 4*8*record.solverPlan.basisSizes[i]/2**20;
  assert.ok(Math.abs(memory-record.solverPlan.fourVectorMemoryMiB[i])<0.001);
}
assert.equal(record.solverPlan.maximumNeighborsPerState,16);
assert.match(record.boundary,/not yet the continuum gap/u);

console.log(JSON.stringify({
  status:"PASS",
  exactSharedShells:record.thetaSeries.shells.length,
  largestCertifiedShell:record.thetaSeries.shells.at(-1),
  nonlinearCutoffBasisSizes:record.solverPlan.basisSizes,
  maximumPotentialNeighbors:record.solverPlan.maximumNeighborsPerState,
  maximumDenseStepL1:maximumStepL1,
  nonlinearSpectrumEstablished:false,
  nextGate:record.nextGate,
},null,2));
