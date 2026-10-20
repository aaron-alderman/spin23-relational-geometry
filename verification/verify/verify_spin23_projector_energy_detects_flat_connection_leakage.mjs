import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-projector-energy-flat-leakage.json','utf8'));

const mul=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s+x*B[k][j],0)));
const sub=(A,B)=>A.map((row,i)=>row.map((x,j)=>x-B[i][j]));
const comm=(A,B)=>sub(mul(A,B),mul(B,A));
const norm2=A=>A.flat().reduce((s,x)=>s+x*x,0);
const isZero=A=>norm2(A)===0;

const values=[-1,0,1];
const generators=[];
for(const a of values){
  for(const b of values){
    for(const c of values){
      generators.push([[a,b],[b,c]]);
    }
  }
}

const Z=[[0,0],[0,1]];
let flat=0;
let flatLeaking=0;
let parallel=0;
let flatParallel=0;

for(const Kx of generators){
  for(const Ky of generators){
    // For A_mu=iK_mu, F_xy=-[Kx,Ky].  Its vanishing is unchanged by sign.
    const curvatureZero=isZero(comm(Kx,Ky));
    const projectorEnergy=norm2(comm(Kx,Z))+norm2(comm(Ky,Z));
    const projectorParallel=projectorEnergy===0;

    if(curvatureZero) flat+=1;
    if(curvatureZero&&!projectorParallel) flatLeaking+=1;
    if(projectorParallel) parallel+=1;
    if(curvatureZero&&projectorParallel) flatParallel+=1;

    const bx=Kx[0][1],by=Ky[0][1];
    assert.equal(projectorEnergy,2*(bx*bx+by*by));
  }
}

assert.equal(generators.length**2,729);
assert.equal(flat,265);
assert.equal(flatLeaking,184);
assert.equal(parallel,81);
assert.equal(flatParallel,81);

// Analytic counterexample: an off-diagonal connection in one direction is
// flat but has nonzero covariant derivative of the sector projector.
const Kx=[[0,1],[1,0]],Ky=[[0,0],[0,0]];
assert.equal(norm2(comm(Kx,Ky)),0);
assert.equal(norm2(comm(Kx,Z))+norm2(comm(Ky,Z)),2);

assert.equal(evidence.enumeration.totalConnectionPairs,729);
assert.equal(evidence.enumeration.flatPairs,265);
assert.equal(evidence.enumeration.flatButLeakingPairs,184);
assert.equal(evidence.enumeration.parallelPairs,81);
assert.equal(evidence.theorem.pureCurvatureImpliesParallelProjector,false);
assert.equal(evidence.theorem.positiveProjectorEnergySelectsParallelism,true);

console.log('PASS 1502: pure curvature misses 184 flat leaking connection pairs, while the positive projector energy is exactly 2(b_x^2+b_y^2) and vanishes only on the 81 parallel pairs.');
