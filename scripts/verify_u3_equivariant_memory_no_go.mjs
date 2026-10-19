#!/usr/bin/env node

import assert from "node:assert/strict";

const mul = (A, B) => A.map((row, i) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const tr = (A) => A.reduce((s, row, i) => s + row[i], 0);
const eye = [[1,0,0],[0,1,0],[0,0,1]];
const scale = (a,A) => A.map(r=>r.map(x=>a*x));
const add = (A,B) => A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const transpose = (A) => A[0].map((_,j)=>A.map(r=>r[j]));
const comm = (A,B) => add(mul(A,B),scale(-1,mul(B,A)));
const frob2 = (A) => A.flat().reduce((s,x)=>s+x*x,0);

const P0 = [[1,0,0],[0,0,0],[0,0,0]];
const c=Math.cos(0.731), s=Math.sin(0.731);
const U=[[c,-s,0],[s,c,0],[0,0,1]];
const P1=mul(mul(U,P0),transpose(U));
const X = (P) => add(eye,scale(-3,P));
const D = (P,m0,m1) => add(scale(m0,eye),scale(m1,X(P)));

for (const P of [P0,P1]) {
  assert.ok(frob2(comm(P,D(P,5,2))) < 1e-24);
  assert.ok(Math.abs(tr(D(P,5,2))-15) < 1e-12);
  assert.ok(Math.abs(tr(mul(D(P,5,2),D(P,5,2)))-99) < 1e-12);
}

const conjugated=mul(mul(U,D(P0,5,2)),transpose(U));
assert.ok(frob2(add(conjugated,scale(-1,D(P1,5,2)))) < 1e-24);

console.log(JSON.stringify({
  protocol:"u3-equivariant-memory-no-go-certificate/1",
  memoryEigenvalues:[1,7,7],
  traceInvariant:15,
  traceSquareInvariant:99,
  conjugationCovariant:true,
  tangentOrientationPotential:false,
  passed:true
},null,2));

