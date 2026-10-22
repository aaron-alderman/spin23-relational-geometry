#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-sparse-derivative-torsion-response-inverse-v1.json",
  import.meta.url,
),"utf8"));

const n=4;
const gcd=(a,b)=>b===0n?a:gcd(b,a%b);
const det=input=>{
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
const rowFromT=t=>{
  const k=evidence.momentum;
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
const torsion=labels=>{
  const t=Array.from({length:n},()=>Array.from({length:n},()=>Array(n).fill(0)));
  for(const label of labels){const [a,b,c]=label.split("").map(Number);t[a][b][c]+=1;t[c][b][a]-=1;}
  return t;
};
const sparseLabels=[["001"],["011"],["021"],["102"],["112"],["132"],["001","122"]];
const rows=sparseLabels.map(x=>rowFromT(torsion(x)));
assert.deepEqual(rows,evidence.matrix.slice(2));
assert.equal(det(evidence.matrix).toString(),evidence.determinant);

const q=s=>{const [a,b]=s.split("/").map(Number);return b?a/b:a;};
const inverse=evidence.inverse.map(r=>r.map(q));
for(let i=0;i<9;i++)for(let j=0;j<9;j++){
  let x=0;for(let k=0;k<9;k++)x+=inverse[i][k]*evidence.matrix[k][j];
  assert.ok(Math.abs(x-(i===j?1:0))<1e-12);
}
const rt=evidence.curvedLinearTorsionBlock;
assert.equal(det(rt.matrix).toString(),rt.determinant);
const rtInverse=rt.inverse.map(r=>r.map(q));
for(let i=0;i<2;i++)for(let j=0;j<2;j++){
  let x=0;for(let k=0;k<2;k++)x+=rtInverse[i][k]*rt.matrix[k][j];
  assert.ok(Math.abs(x-(i===j?1:0))<1e-12);
}
assert.equal(evidence.rowOrder.length,9);
assert.match(evidence.decision,/one momentum/);

console.log("Spin(2,3) sparse derivative-torsion response inverse: PASS");
console.log("  common momentum: k=e0");
console.log("  seven new probes: one or two unit torsion components");
console.log("  det M_TT=-48");
console.log("  det M_RT=48");
console.log("  both rational inverses verified to floating reconstruction tolerance");
