#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-critical-packet-general-pgt-specialization-obstruction-v1.json",
  import.meta.url,
),"utf8"));

const eps4=(a,b,c,d)=>{
  const x=[a,b,c,d];
  if(new Set(x).size<4)return 0;
  let inversions=0;
  for(let i=0;i<4;i++)for(let j=i+1;j<4;j++)if(x[i]>x[j])inversions++;
  return inversions%2?-1:1;
};
const pairs=[];
for(let a=0;a<4;a++)for(let b=a+1;b<4;b++)pairs.push([a,b]);
const packetVector=p=>{
  const v=[];
  for(let nu=0;nu<4;nu++)for(const [a,b] of pairs){
    let x=0;for(let mu=0;mu<4;mu++)x+=eps4(mu,nu,a,b)*p[mu];
    v.push(x);
  }
  return v;
};
const matrixRank=input=>{
  const a=input.map(r=>r.slice());
  const rows=a.length,cols=a[0].length;let rank=0;
  for(let c=0;c<cols&&rank<rows;c++){
    let pivot=rank;
    for(let r=rank+1;r<rows;r++)if(Math.abs(a[r][c])>Math.abs(a[pivot][c]))pivot=r;
    if(Math.abs(a[pivot][c])<1e-12)continue;
    [a[rank],a[pivot]]=[a[pivot],a[rank]];
    const d=a[rank][c];for(let j=c;j<cols;j++)a[rank][j]/=d;
    for(let r=0;r<rows;r++)if(r!==rank){const f=a[r][c];for(let j=c;j<cols;j++)a[r][j]-=f*a[rank][j];}
    rank++;
  }
  return rank;
};

for(const p of [[1,0,0,0],[1,2,0,0],[1,-2,3,4]]){
  const v=packetVector(p);
  assert.ok(v.some(x=>x!==0));
  const outer=v.map(x=>v.map(y=>x*y));
  assert.equal(matrixRank(outer),1);
  const p2=p.reduce((s,x)=>s+x*x,0);
  const full=Array.from({length:24},(_,i)=>Array.from({length:24},(_,j)=>i===j?p2:0));
  assert.equal(matrixRank(full),24);
}

assert.equal(evidence.connectionComponents,24);
assert.equal(evidence.packet.rankAtNonzeroMomentum,1);
assert.equal(evidence.comparisonTheory.rankAtNonzeroMomentum,24);
assert.equal(evidence.rankGap,23);
assert.equal(evidence.rankGap,
  evidence.comparisonTheory.rankAtNonzeroMomentum-evidence.packet.rankAtNonzeroMomentum);
assert.equal(evidence.packet.algebraicConnectionDirections,23);
assert.equal(evidence.packet.lorentzGhostOrder,0);
assert.equal(evidence.comparisonTheory.lorentzGhostOrder,2);
assert.deepEqual(evidence.packet.connectionSourceGhostDerivatives,[0,0]);
assert.deepEqual(evidence.packet.ordinaryJacobianSourceDerivatives,[0,0]);
assert.equal(evidence.packet.secondClassMSbarPole,0);
assert.equal(evidence.regularSpecializationExists,false);
assert.match(evidence.comparisonTheory.canonicalRescaling,/sqrt\(c1\)/);
assert.equal(evidence.firstRecommendedProfile,"t132");
assert.equal(evidence.firstCoefficientExtraction,"hTT1=y132/2");

const frac=s=>{const [a,b]=s.split("/").map(Number);return b?a/b:a;};
const source=evidence.t132Source;
const T=(a,b,c)=>frac(source.torsion[`${a}${b}${c}`]??"0");
const K=(a,b,c)=>frac(source.contorsion[`${a}${b}${c}`]??"0");
for(let a=0;a<4;a++)for(let b=0;b<4;b++)for(let c=0;c<4;c++){
  assert.ok(Math.abs(K(a,b,c)+K(a,c,b))<1e-12);
  assert.equal(T(a,b,c),K(a,b,c)-K(c,b,a));
}
assert.deepEqual(source.responseRow,[2,0,0,0,0,0,0,0,0]);
const v=packetVector(source.momentumDirection);
let vDotK=0;
for(let nu=0,I=0;nu<4;nu++)for(const [a,b] of pairs)vDotK+=v[I++]*K(nu,a,b);
assert.equal(vDotK,frac(source.packetDerivativeVectorContraction));

console.log("Spin(2,3) general-PGT specialization obstruction: PASS");
console.log("  packet connection symbol rank: 1/24");
console.log("  full-F^2 connection symbol rank: 24/24");
console.log("  rank gap: 23");
console.log("  c1 -> 0 minimal-operator limit: singular");
console.log("  t132 contorsion reconstruction and rank-one contraction: exact");
console.log("  next packet-specific trace: t132 H1/H2");
