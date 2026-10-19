#!/usr/bin/env node

const cutoff=4;
const basis=[];
for(let n1=0;n1<cutoff;n1++)for(let n2=0;n2<cutoff;n2++)basis.push([n1,n2]);
const index=new Map(basis.map((n,i)=>[n.join(","),i]));
const N=basis.length;
const zero=()=>Array.from({length:N},()=>Array(N).fill(0));
const mul=(a,b)=>a.map(r=>b[0].map((_,j)=>r.reduce((s,x,k)=>s+x*b[k][j],0)));
const scale=(k,a)=>a.map(r=>r.map(x=>k*x));
const equal=(a,b)=>a.every((r,i)=>r.every((x,j)=>x===b[i][j]));
const P=zero();basis.forEach(([a,b],i)=>P[i][i]=(-1)**(a+b));
const lowering=mode=>{const a=zero();basis.forEach((n,j)=>{if(n[mode]>0){const m=[...n];m[mode]-=1;a[index.get(m.join(","))][j]=1;}});return a;};
const a1=lowering(0),a2=lowering(1),I=zero();for(let i=0;i<N;i++)I[i][i]=1;
const report={
  protocol:"metaplectic-minus-identity-parity-truncation/1",
  cutoffPerMode:cutoff,
  basisDimension:N,
  paritySquaredIsIdentity:equal(mul(P,P),I),
  parityConjugatesA1ToMinusA1:equal(mul(mul(P,a1),P),scale(-1,a1)),
  parityConjugatesA2ToMinusA2:equal(mul(mul(P,a2),P),scale(-1,a2)),
  evenStates:basis.filter(([a,b])=>(a+b)%2===0).length,
  oddStates:basis.filter(([a,b])=>(a+b)%2===1).length,
  conclusion:"A lift of phase-space inversion acts as parity, not one scalar phase on the full Fock space.",
};
report.passed=report.paritySquaredIsIdentity&&report.parityConjugatesA1ToMinusA1&&report.parityConjugatesA2ToMinusA2;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
