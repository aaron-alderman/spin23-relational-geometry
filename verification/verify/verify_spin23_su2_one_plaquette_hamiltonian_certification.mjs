#!/usr/bin/env node

import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-su2-one-plaquette-hamiltonian-certification.json",
  import.meta.url,
),"utf8"));
assert.equal(evidence.schema,"spin23.su2-one-plaquette-hamiltonian-certification/1");
assert.match(evidence.status,/no uniform continuum or volume theorem/);

const matrix=(kappa,N,boundaryShift=0)=>Array.from({length:N+1},(_,i)=>Array.from({length:N+1},(_,j)=>{
  if(i===j){const spin=i/2;return spin*(spin+1)+2*kappa-(i===N?boundaryShift:0);}
  return Math.abs(i-j)===1?-kappa:0;
}));
const jacobi=(input)=>{
  const n=input.length,A=input.map(r=>[...r]),V=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
  for(let sweep=0;sweep<100;sweep++){
    let off=0;
    for(let p=0;p<n-1;p++)for(let q=p+1;q<n;q++)off=Math.max(off,Math.abs(A[p][q]));
    if(off<1e-13)break;
    for(let p=0;p<n-1;p++)for(let q=p+1;q<n;q++){
      const apq=A[p][q]; if(Math.abs(apq)<1e-15)continue;
      const phi=.5*Math.atan2(2*apq,A[q][q]-A[p][p]),c=Math.cos(phi),s=Math.sin(phi);
      for(let k=0;k<n;k++)if(k!==p&&k!==q){const akp=A[k][p],akq=A[k][q];A[k][p]=A[p][k]=c*akp-s*akq;A[k][q]=A[q][k]=s*akp+c*akq;}
      const app=A[p][p],aqq=A[q][q];A[p][p]=c*c*app-2*s*c*apq+s*s*aqq;A[q][q]=s*s*app+2*s*c*apq+c*c*aqq;A[p][q]=A[q][p]=0;
      for(let k=0;k<n;k++){const vkp=V[k][p],vkq=V[k][q];V[k][p]=c*vkp-s*vkq;V[k][q]=s*vkp+c*vkq;}
    }
  }
  const order=Array.from({length:n},(_,i)=>i).sort((i,j)=>A[i][i]-A[j][j]);
  return {values:order.map(i=>A[i][i]),vectors:order.map(i=>V.map(r=>r[i]))};
};
const certify=(kappa,N,k)=>{
  const spec=jacobi(matrix(kappa,N)),U=spec.values[k],v=spec.vectors[k];
  const jp=(N+1)/2,T=jp*(jp+1);
  if(U>=T)return null;
  const delta=kappa*kappa/(T-U);
  const lowerSpec=jacobi(matrix(kappa,N,delta));
  const L=lowerSpec.values[k],rho=kappa*Math.abs(v[N]);
  assert.ok(L<=U+1e-10);
  return {L,U,rho,T,delta};
};
const certifyGap=(kappa,N)=>{
  const e0=certify(kappa,N,0),e1=certify(kappa,N,1);
  if(!e0||!e1)return null;
  return {e0,e1,lower:e1.L-e0.U,upper:e1.U-e0.L,width:(e1.U-e0.L)-(e1.L-e0.U)};
};

// Character multiplication is a half-step nearest-neighbor operator. Its
// finite adjacency spectrum remains inside [-2,2], so 2I-A is positive.
for(const N of evidence.cutoffs){
  const adjacency=matrix(1,N).map((r,i)=>r.map((x,j)=>i===j?0:(Math.abs(i-j)===1?1:0)));
  const av=jacobi(adjacency).values;
  assert.ok(av[0]>-2-1e-12&&av.at(-1)<2+1e-12);
}

const rows=[];
for(const kappa of evidence.couplings){
  let chosen=null;
  for(const N of evidence.cutoffs){
    const gap=certifyGap(kappa,N);
    if(!gap)continue;
    if(gap.lower>0&&gap.width/((gap.lower+gap.upper)/2)<1e-8){chosen={N,...gap};break;}
  }
  assert.ok(chosen,`no certified cutoff for kappa=${kappa}`);
  const g=(1/(2*kappa))**.25,dimensionless=(chosen.lower+chosen.upper)/2;
  const latticeGapLower=2*g*g*chosen.lower,latticeGapUpper=2*g*g*chosen.upper;
  rows.push({kappa,g,N:chosen.N,gapLower:chosen.lower,gapUpper:chosen.upper,latticeGapLower,latticeGapUpper,residual0:chosen.e0.rho,residual1:chosen.e1.rho});
  assert.ok(chosen.e0.rho<1&&chosen.e1.rho<1);
}
assert.ok(rows[0].gapLower>.7&&rows[0].gapUpper<.9);
assert.ok(rows.at(-1).N>=rows[0].N);
for(let i=0;i<rows.length;i++){
  const r=rows[i],expected=evidence.certifiedResults[i];
  assert.equal(r.kappa,expected.kappa);assert.equal(r.N,expected.cutoffN);
  assert.ok(Math.abs(r.g-expected.g)<1e-9);
  assert.ok(Math.abs(r.gapLower-expected.gapLower)<1e-9);
  assert.ok(Math.abs(r.gapUpper-expected.gapUpper)<1e-9);
  assert.ok(Math.abs(r.latticeGapLower-expected.aGapLower)<1e-8);
  assert.ok(Math.abs(r.latticeGapUpper-expected.aGapUpper)<1e-8);
}

// Independent large-cutoff reference must lie inside every certified interval.
for(const row of rows){
  const ref=jacobi(matrix(row.kappa,48)).values;
  const gap=ref[1]-ref[0];
  assert.ok(gap>=row.gapLower-1e-10&&gap<=row.gapUpper+1e-10);
}

// Strong-coupling kappa=0 is diagonal and has exact gap 3/4.
const free=jacobi(matrix(0,4)).values;
assert.equal(free[1]-free[0],.75);

// Fixed one-plaquette weak-coupling gap stays at cutoff scale in lattice units.
assert.ok(rows.at(-1).latticeGapLower>1);
assert.ok(rows.at(-1).latticeGapUpper<4);
assert.ok(evidence.constructiveBoundary.provedHere.length>=4);
assert.ok(evidence.constructiveBoundary.notProved.length>=4);
assert.match(evidence.volumeObstruction.gapProblem,/difference of two extensive energies/);

console.log("SU(2) one-plaquette Hamiltonian certification: PASS");
for(const r of rows)console.log(`  kappa=${r.kappa.toFixed(2)} g=${r.g.toFixed(5)} N=${r.N} Delta_h=[${r.gapLower.toFixed(10)},${r.gapUpper.toFixed(10)}] aDelta=[${r.latticeGapLower.toFixed(8)},${r.latticeGapUpper.toFixed(8)}] rho=(${r.residual0.toExponential(2)},${r.residual1.toExponential(2)})`);
console.log("  boundary: finite Schur/residual certificates converge, but neither their constants nor the cutoff-scale gap are uniform in volume and continuum limits");
