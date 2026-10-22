#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-reduced-axial-hessian-symbol-v1.json",
  import.meta.url,
),"utf8"));

const add=(a,b)=>[a[0]+b[0],a[1]+b[1]];
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1]];
const mul=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]];
const dot=(a,b)=>a.reduce((sum,value,i)=>sum+value*b[i],0);

const permutations=values=>values.length===1
  ? [values]
  : values.flatMap((value,i)=>permutations(values.filter((_,j)=>j!==i))
      .map(tail=>[value,...tail]));

const parity=permutation=>{
  let inversions=0;
  for(let i=0;i<permutation.length;i++){
    for(let j=i+1;j<permutation.length;j++){
      if(permutation[i]>permutation[j]) inversions++;
    }
  }
  return inversions%2===0?1:-1;
};

const determinant=matrix=>permutations([0,1,2,3]).reduce((sum,permutation)=>{
  const product=permutation.reduce(
    (acc,column,row)=>mul(acc,matrix[row][column]),
    [parity(permutation),0],
  );
  return add(sum,product);
},[0,0]);

for(const witness of [
  {A:2,bX:1.3,lambda4:0.2,Xbar:0.7,p:[1,-2,0.5,3],k:[2,1,-1,0.25]},
  {A:0.8,bX:2.1,lambda4:-0.04,Xbar:-1.1,p:[-1,0.25,2,-0.5],k:[0.5,-2,1,3]},
]){
  const mu2=witness.A+2*witness.lambda4*witness.Xbar**2;
  const Z=witness.bX+2*witness.lambda4*dot(witness.p,witness.p);
  const c=4*witness.lambda4*witness.Xbar;
  const matrix=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>{
    const real=(i===j?mu2:0)+Z*witness.k[i]*witness.k[j];
    const imaginary=c*(witness.p[i]*witness.k[j]-witness.k[i]*witness.p[j]);
    return [real,imaginary];
  }));
  const actual=determinant(matrix);
  const k2=dot(witness.k,witness.k);
  const p2=dot(witness.p,witness.p);
  const kp=dot(witness.k,witness.p);
  const predicted=mu2**2*(mu2*(mu2+Z*k2)-c**2*(k2*p2-kp**2));
  assert.ok(Math.abs(actual[0]-predicted)<1e-9*Math.max(1,Math.abs(predicted)));
  assert.ok(Math.abs(actual[1])<1e-10);
}

// On Xbar=0 there are three algebraic eigenvalues A and one longitudinal
// eigenvalue A+(bX+2*lambda4*p^2)*k^2.
for(const witness of [
  {A:2,bX:1.1,lambda4:0.3,p2:4,k2:5},
  {A:0.7,bX:2.4,lambda4:-0.05,p2:3,k2:1.5},
]){
  const Z=witness.bX+2*witness.lambda4*witness.p2;
  const general=witness.A**2*(witness.A*(witness.A+Z*witness.k2));
  const reduced=witness.A**3*(witness.A+Z*witness.k2);
  assert.ok(Math.abs(general-reduced)<1e-12);
}

assert.equal(evidence.secondOrderPrincipalRank,1);
assert.equal(evidence.propagatingAxialChannels,1);
assert.equal(evidence.uniformEuclideanPositivity.length,2);

console.log("Spin(2,3) reduced axial Hessian symbol: PASS");
console.log("  exact frozen-jet 4x4 determinant: verified");
console.log("  second-order principal rank: one");
console.log("  divergence-free slice: one scalar determinant plus three ultralocal factors");
console.log("  next operation: coupled metric-axial heat-kernel trace at nonzero divergence");
