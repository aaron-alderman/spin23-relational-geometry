import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-sequential-seesaw-bridge-cancellation.json','utf8'));

function inv2(A){
  const det=A[0][0]*A[1][1]-A[0][1]*A[1][0];
  assert.notEqual(det,0);
  return [[A[1][1]/det,-A[0][1]/det],[-A[1][0]/det,A[0][0]/det]];
}
function dot(u,A,v){return u.reduce((s,x,i)=>s+x*v.reduce((t,y,j)=>t+A[i][j]*y,0),0);}

function sequential({a,x,y,d,dP,rIndependent=0}){
  const c=[x,y];
  const B=[[d,0],[0,0]];
  const Mq=B.map((row,i)=>row.map((value,j)=>value-c[i]*c[j]/a));
  const rCorrelated=c.map(value=>-dP*value/a);
  const contact=-dP*dP/a;
  const qContribution=-dot(rCorrelated,inv2(Mq),rCorrelated);
  const correlatedTotal=contact+qContribution;

  const fullInversePP=0; // exact cofactor: det[[d,0],[0,0]]=0
  const fullAligned=-dP*dP*fullInversePP;

  // Exact inverse entries needed for an independent null-line Dirac term.
  const inversePN=1/y;
  const inverseNN=(x*x-a*d)/(d*y*y);
  const independentFull=-2*dP*rIndependent*inversePN-rIndependent*rIndependent*inverseNN;
  return {Mq,rCorrelated,contact,qContribution,correlatedTotal,fullAligned,independentFull};
}

const witnesses=[
  {a:5,x:2,y:3,d:7,dP:11},
  {a:-4,x:3,y:2,d:5,dP:7},
  {a:9,x:-2,y:5,d:-3,dP:4},
];

for(const witness of witnesses){
  const result=sequential(witness);
  assert.notEqual(result.rCorrelated[1],0,'sequential matching must generate an apparent null-line Dirac coupling');
  assert.ok(Math.abs(result.correlatedTotal)<1e-10,'correlated Schur package must cancel');
  assert.ok(result.fullAligned===0);
  const withIndependent=sequential({...witness,rIndependent:0.13});
  assert.ok(Math.abs(withIndependent.independentFull)>1e-8,'an independent null-line operator must lift the texture');
}

assert.equal(evidence.theorem.correlatedSequentialPackagePreservesTextureZero,true);
assert.equal(evidence.theorem.independentDiracLeakageStillLiftsTexture,true);
assert.match(evidence.correctionToPortalCensus,/not.*cut/i);

console.log('PASS 1497: integrating out the selected heavy neutrino generates an apparent Dirac bridge, but its correlated Schur package cancels exactly; only independent leakage lifts the texture.');
