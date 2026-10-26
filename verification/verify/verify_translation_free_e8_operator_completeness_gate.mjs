import assert from "node:assert/strict";
import fs from "node:fs";

const record=JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/translation-free-e8-operator-completeness-gate-v1.json",import.meta.url),"utf8"));
const K=[
  [2,-1,0,0,0,0,0,0],[-1,2,-1,0,0,0,0,0],[0,-1,2,-1,0,0,0,-1],
  [0,0,-1,2,-1,0,0,0],[0,0,0,-1,2,-1,0,0],[0,0,0,0,-1,2,-1,0],
  [0,0,0,0,0,-1,2,0],[0,0,-1,0,0,0,0,2],
];
const Kinv=[
  [4,7,10,8,6,4,2,5],[7,14,20,16,12,8,4,10],[10,20,30,24,18,12,6,15],
  [8,16,24,20,15,10,5,12],[6,12,18,15,12,8,4,9],[4,8,12,10,8,6,3,6],
  [2,4,6,5,4,3,2,3],[5,10,15,12,9,6,3,8],
];
const quadratic=(vector,matrix)=>vector.reduce((sum,x,i)=>sum+x*matrix[i]
  .reduce((inner,y,j)=>inner+y*vector[j],0),0);
const column=(matrix,index)=>matrix.map(row=>row[index]);
const sigma3=n=>{let sum=0;for(let d=1;d<=n;d+=1)if(n%d===0)sum+=d**3;return sum;};

assert.equal(record.schemaVersion,"translation-free-e8-operator-completeness-gate-v1");
const simpleEnergies=Array.from({length:8},(_,i)=>quadratic(Array.from({length:8},(_,j)=>Number(i===j)),K)/2);
const denseEnergies=Array.from({length:8},(_,i)=>quadratic(column(Kinv,i),K)/2);
assert.deepEqual(simpleEnergies,record.stepAudit.cartanKernel.vacuumStepEnergies);
assert.deepEqual(denseEnergies,record.stepAudit.inverseKernel.vacuumStepEnergies);
assert.deepEqual(denseEnergies,Kinv.map((row,i)=>row[i]/2));
assert.equal(Math.max(...denseEnergies),record.stepAudit.inverseKernel.firstCompleteCutoff);

let cumulative=1;
const counts=new Map([[0,1]]);
for(let m=1;m<=15;m+=1){cumulative+=240*sigma3(m);counts.set(m,cumulative);}
for(const item of record.inverseBranchCompleteness){
  const active=denseEnergies.filter(energy=>energy<=item.cutoff).length;
  assert.equal(item.activeVacuumChannels,active);
  assert.equal(item.missingVacuumPotentialNormSquaredFraction,1-active/8);
  assert.equal(item.basisStates,counts.get(item.cutoff));
}
for(const shell of record.thetaExtension){
  assert.equal(shell.multiplicity,240*sigma3(shell.m));
  assert.equal(shell.cumulativeStates,counts.get(shell.m));
}
assert.equal(record.inverseBranchCompleteness.at(-1).basisStates,3721681);
assert.match(record.boundary,/necessary, not sufficient/u);

console.log(JSON.stringify({
  status:"PASS",
  cartanVacuumStepEnergies:simpleEnergies,
  inverseVacuumStepEnergies:denseEnergies,
  inverseFirstOperatorCompleteCutoff:Math.max(...denseEnergies),
  inverseFirstOperatorCompleteBasis:counts.get(15),
  cutoff8MissingVacuumPotentialNormSquaredFraction:record.inverseBranchCompleteness.find(item=>item.cutoff===8).missingVacuumPotentialNormSquaredFraction,
  gapPromoted:false,
  nextGate:record.nextGate,
},null,2));
