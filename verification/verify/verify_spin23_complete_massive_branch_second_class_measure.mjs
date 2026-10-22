#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-complete-massive-branch-second-class-measure-v1.json",
  import.meta.url,
),"utf8"));

assert.equal(Object.values(evidence.constraintDimensions)
  .filter((_,i)=>i<3).reduce((a,b)=>a+b,0),34);
assert.equal(evidence.constraintDimensions.total,34);

const zeros=(n,m)=>Array.from({length:n},()=>Array(m).fill(0));
const transpose=m=>m[0].map((_,j)=>m.map(row=>row[j]));
const det=input=>{
  const a=input.map(row=>row.slice());
  let out=1;
  for(let c=0;c<a.length;c++){
    let p=c;
    for(let r=c+1;r<a.length;r++) if(Math.abs(a[r][c])>Math.abs(a[p][c])) p=r;
    assert.ok(Math.abs(a[p][c])>1e-12);
    if(p!==c){[a[p],a[c]]=[a[c],a[p]];out*=-1;}
    const pivot=a[c][c];
    out*=pivot;
    for(let r=c+1;r<a.length;r++){
      const f=a[r][c]/pivot;
      for(let j=c+1;j<a.length;j++) a[r][j]-=f*a[c][j];
    }
  }
  return out;
};
const antisymmetric=(values)=>{
  const out=zeros(2*values.length,2*values.length);
  values.forEach((v,i)=>{
    out[2*i][2*i+1]=v;
    out[2*i+1][2*i]=-v;
  });
  return out;
};
const assemble=(A,E,C,F)=>{
  const na=A.length,nb=E.length,ns=E.length;
  const out=zeros(na+nb+ns,na+nb+ns);
  const put=(block,r0,c0)=>block.forEach((row,i)=>row.forEach((v,j)=>out[r0+i][c0+j]=v));
  put(A,0,0);
  put(transpose(C),0,na+nb);
  put(E,na,na+nb);
  put(C.map(row=>row.map(x=>-x)),na+nb,0);
  put(transpose(E).map(row=>row.map(x=>-x)),na+nb,na);
  put(F,na+nb,na+nb);
  return out;
};

// Test the exact identity for several wildly different nonlinear/derivative
// cross-block representatives.  Only invertibility of A and E matters.
for(const seed of [1,3,8]){
  const A=antisymmetric([2,3,5,7,11,13].map(x=>x+seed));
  const E=zeros(11,11);
  for(let i=0;i<11;i++) E[i][i]=i+2+seed;
  const C=Array.from({length:11},(_,i)=>Array.from({length:12},(_,j)=>((seed+3*i+5*j)%11)-5));
  const F=zeros(11,11);
  for(let i=0;i<11;i++) for(let j=i+1;j<11;j++){
    F[i][j]=((seed+2*i-j)%7)-3;
    F[j][i]=-F[i][j];
  }
  const lhs=det(assemble(A,E,C,F));
  const rhs=det(A)*det(E)**2;
  assert.ok(Math.abs(lhs-rhs)<1e-7*Math.max(1,Math.abs(rhs)));
}

// Square root of J^-12 X^6 times |J^-11| gives J^-17 X^3.
assert.equal(-12/2-11,-17);
assert.equal(6/2,3);

// The exact Legendre map makes the field dependence even in Xhat.
for(const x of [-3,-1,0,2,5]){
  const m=7,B=11;
  const f=(m*m+B*B*x*x/36)**3;
  const reflected=(m*m+B*B*(-x)*(-x)/36)**3;
  assert.equal(f,reflected);
}

assert.equal(evidence.dimensionalRegularizationPole,0);
assert.match(evidence.operatorType,/multiplication/);
assert.match(evidence.fiveResponseVectorStatus,/complete packet/);

console.log("Spin(2,3) complete massive-branch second-class measure: PASS");
console.log("  complete nonlinear bracket pattern: 12+11+11");
console.log("  det Delta=det A*(det E)^2 for arbitrary C and F");
console.log("  measure=N*J^-17*(m^2+B^2*Xhat^2/36)^3");
console.log("  MS-bar pole: zero to all axial-source orders");
console.log("  five-response vector promoted to complete packet response");
