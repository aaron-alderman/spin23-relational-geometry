#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-nonaxial-quadratic-response-design-v1.json",
  import.meta.url,
),"utf8"));

const n=4;
const gcd=(a,b)=>b===0n?a:gcd(b,a%b);
const rank=input=>{
  if(!input.length)return 0;
  const A=input.map(r=>r.map(BigInt)); let out=0;
  for(let c=0;c<A[0].length&&out<A.length;c++){
    let p=out; while(p<A.length&&A[p][c]===0n)p++;
    if(p===A.length)continue;
    [A[out],A[p]]=[A[p],A[out]];
    for(let i=0;i<A.length;i++)if(i!==out&&A[i][c]!==0n){
      const x=A[i][c],y=A[out][c];
      for(let j=c;j<A[0].length;j++)A[i][j]=A[i][j]*y-A[out][j]*x;
      let g=0n;
      for(let j=c;j<A[0].length;j++){const v=A[i][j]<0n?-A[i][j]:A[i][j];g=gcd(g,v);}
      if(g>1n)for(let j=c;j<A[0].length;j++)A[i][j]/=g;
    }
    out++;
  }
  return out;
};
const determinant=input=>{
  const A=input.map(r=>r.map(BigInt)); const N=A.length; let sign=1n,prev=1n;
  for(let k=0;k<N-1;k++){
    let p=k; while(p<N&&A[p][k]===0n)p++;
    if(p===N)return 0n;
    if(p!==k){[A[k],A[p]]=[A[p],A[k]];sign=-sign;}
    const pivot=A[k][k];
    for(let i=k+1;i<N;i++)for(let j=k+1;j<N;j++)A[i][j]=(A[i][j]*pivot-A[i][k]*A[k][j])/prev;
    prev=pivot;
  }
  return sign*A[N-1][N-1];
};
const eps=(a,b,c,d)=>{
  const q=[a,b,c,d]; if(new Set(q).size<4)return 0;
  let s=1; for(let i=0;i<4;i++)for(let j=i+1;j<4;j++)if(q[i]>q[j])s=-s;
  return s;
};
const rowFromKT=(k,t)=>{
  const tr=Array(n).fill(0),d1=Array.from({length:n},()=>Array(n).fill(0)),d2=Array.from({length:n},()=>Array(n).fill(0));
  for(let b=0;b<n;b++)for(let a=0;a<n;a++)tr[b]+=t[a][a][b];
  for(let a=0;a<n;a++)for(let b=0;b<n;b++)for(let m=0;m<n;m++){d1[a][b]+=k[m]*t[m][a][b];d2[a][b]+=k[m]*t[a][m][b];}
  let H1=0,H2=0,H3=0,H4=0,H5=0,H6=0,H7=0,H8=0,H9=0;
  for(let m=0;m<n;m++)for(let a=0;a<n;a++)for(let b=0;b<n;b++)for(let c=0;c<n;c++){H1+=(k[m]*t[a][b][c])**2;H2+=k[m]*t[a][b][c]*k[m]*t[a][c][b];}
  for(let m=0;m<n;m++)for(let b=0;b<n;b++)H3+=(k[m]*tr[b])**2;
  for(let a=0;a<n;a++)for(let b=0;b<n;b++){H4+=d1[a][b]**2;H5+=d1[a][b]*d1[b][a];H6+=d2[a][b]**2;H7+=d1[a][b]*d2[a][b];H8+=d2[a][b]*k[a]*tr[b];}
  let td1=0; for(let a=0;a<n;a++)td1+=d1[a][a]; H9=td1**2;
  return [H1,H2,H3,H4,H5,H6,H7,H8,H9];
};
const axialRow=(k,S)=>{
  const t=Array.from({length:n},()=>Array.from({length:n},()=>Array(n).fill(0)));
  for(let a=0;a<n;a++)for(let b=0;b<n;b++)for(let c=0;c<n;c++)for(let d=0;d<n;d++)t[a][b][c]+=eps(a,b,c,d)*S[d];
  return rowFromKT(k,t);
};
const generatedRow=seed=>{
  const next=()=>{seed=(1664525*seed+1013904223)>>>0;return seed;};
  const k=Array.from({length:n},()=>next()%7-3);
  const t=Array.from({length:n},()=>Array.from({length:n},()=>Array(n).fill(0)));
  for(let a=0;a<n;a++)for(let c=a+1;c<n;c++)for(let b=0;b<n;b++){const x=next()%7-3;t[a][b][c]=x;t[c][b][a]=-x;}
  return rowFromKT(k,t);
};

assert.deepEqual(axialRow([1,0,0,0],[1,0,0,0]),evidence.axialRows[0]);
assert.deepEqual(axialRow([1,0,0,0],[0,1,0,0]),evidence.axialRows[1]);
const generated=evidence.generator.seeds.map(generatedRow);
assert.deepEqual(generated,evidence.additionalRows);
const TT=[...evidence.axialRows,...generated];
assert.equal(rank(TT),9);
assert.equal(determinant(TT).toString(),evidence.ttDesign.determinant);

const RT=evidence.rtDesign.probes.map(p=>p.row);
assert.equal(rank(RT),2);
assert.equal(Number(determinant(RT)),evidence.rtDesign.determinant);
assert.equal(evidence.newEvaluations.flat+evidence.newEvaluations.curved,evidence.newEvaluations.total);
assert.equal(evidence.newEvaluations.total,9);
assert.match(evidence.decision,/full-rank/);

console.log("Spin(2,3) nonaxial quadratic response design: PASS");
console.log("  axial derivative-torsion seed rank: 2");
console.log("  seven added flat jets: TT rank 9");
console.log(`  det M_TT=${evidence.ttDesign.determinant}`);
console.log("  two curved linear-torsion probes: RT rank 2, det=48");
console.log("  minimum new evaluations: 7 flat + 2 curved = 9");
