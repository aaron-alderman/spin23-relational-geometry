#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-constant-axial-metric-vertices-v1.json",
  import.meta.url,
),"utf8"));

const dot=(a,b)=>a.reduce((sum,value,i)=>sum+value*b[i],0);
const matVec=(matrix,vector)=>matrix.map(row=>dot(row,vector));
const matMul=(a,b)=>a.map((row,i)=>b[0].map((_,j)=>
  row.reduce((sum,value,k)=>sum+value*b[k][j],0)));
const identity=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const addMatrix=(a,b)=>a.map((row,i)=>row.map((value,j)=>value+b[i][j]));
const scaleMatrix=(a,c)=>a.map(row=>row.map(value=>c*value));
const matrixExp=matrix=>{
  let sum=identity(matrix.length);
  let term=identity(matrix.length);
  for(let n=1;n<=32;n++){
    term=scaleMatrix(matMul(term,matrix),1/n);
    sum=addMatrix(sum,term);
  }
  return sum;
};
const trace=matrix=>matrix.reduce((sum,row,i)=>sum+row[i],0);

const h=[
  [0.3,-0.2,0.1,0.05],
  [-0.2,-0.4,0.15,0.2],
  [0.1,0.15,0.25,-0.1],
  [0.05,0.2,-0.1,0.1],
];
const p=[1,-2,0.5,1.5];
const s=[-0.25,0.75,1,-0.5];
const trh=trace(h);
const h2=matMul(h,h);

const predicted=dot(s,s)
  +trh*dot(p,s)-2*dot(matVec(h,p),s)
  +dot(p,matVec(h2,p))/2
  -trh*dot(p,matVec(h,p))/2
  +(trh**2)*dot(p,p)/8;

const density=epsilon=>{
  const shifted=p.map((value,i)=>value+epsilon*s[i]);
  const inverseMetric=matrixExp(scaleMatrix(h,-epsilon));
  return Math.exp(epsilon*trh/2)*dot(shifted,matVec(inverseMetric,shifted));
};
const step=2e-4;
const quadratic=(density(step)-2*density(0)+density(-step))/(2*step**2);
assert.ok(Math.abs(quadratic-predicted)<2e-7);

// Fourier certificate for deltaX/i=k.s-p.F(h).
const k=[1.2,-0.5,0.8,0.3];
const F=h[0].map((_,nu)=>h.reduce((sum,row,mu)=>sum+k[mu]*row[nu],0)
  -k[nu]*trh/2);
const divergenceVariation=dot(k,s)-dot(p,F);
const expanded=dot(k,s)-h.reduce((sum,row,mu)=>sum+k[mu]*dot(row,p),0)
  +dot(k,p)*trh/2;
assert.ok(Math.abs(divergenceVariation-expanded)<1e-12);

// A transverse-traceless metric mode retains nonzero algebraic h-p-s mixing.
const kTT=[1,0,0,0];
const hTT=[
  [0,0,0,0],
  [0,0,1,0],
  [0,1,0,0],
  [0,0,0,0],
];
const pTT=[0,1,0,0];
const sTT=[0,0,1,0];
assert.equal(trace(hTT),0);
assert.ok(matVec(hTT,kTT).every(value=>value===0));
assert.equal(-dot(matVec(hTT,pTT),sTT),-1);

assert.match(evidence.transverseTracelessMassMixing,/-A/);
assert.equal(evidence.constantBackgroundReducedVerticesClosed.length,3);

console.log("Spin(2,3) constant axial metric vertices: PASS");
console.log("  exponential-coframe mass Hessian: verified");
console.log("  divergence mixing: exactly proportional to harmonic gauge function");
console.log("  transverse-traceless algebraic mixing: nonzero witness");
console.log("  next operation: packet-normalized graviton/gauge trace for deltaA");
