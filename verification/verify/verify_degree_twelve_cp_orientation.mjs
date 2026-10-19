#!/usr/bin/env node

import assert from "node:assert/strict";

const z=(re=0,im=0)=>({re,im});
const add=(a,b)=>z(a.re+b.re,a.im+b.im);
const sub=(a,b)=>z(a.re-b.re,a.im-b.im);
const mul=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const conj=(a)=>z(a.re,-a.im);
const abs2=(a)=>a.re*a.re+a.im*a.im;
const matMul=(A,B)=>A.map((row,i)=>B[0].map((_,j)=>row.reduce((s,x,k)=>add(s,mul(x,B[k][j])),z())));
const dagger=(A)=>A[0].map((_,j)=>A.map(row=>conj(row[j])));
const matSub=(A,B)=>A.map((r,i)=>r.map((x,j)=>sub(x,B[i][j])));
const trace=(A)=>A.reduce((s,r,i)=>add(s,r[i]),z());
const diag=(v)=>v.map((x,i)=>v.map((_,j)=>z(i===j?x:0)));
const frob2=(A)=>A.flat().reduce((s,x)=>s+abs2(x),0);

function pmns(t12,t23,t13,delta){
  const c12=Math.cos(t12),s12=Math.sin(t12),c23=Math.cos(t23),s23=Math.sin(t23),c13=Math.cos(t13),s13=Math.sin(t13);
  const em=z(Math.cos(delta),-Math.sin(delta)), ep=conj(em);
  return [
    [z(c12*c13),z(s12*c13),mul(z(s13),em)],
    [sub(z(-s12*c23),mul(z(c12*s23*s13),ep)),sub(z(c12*c23),mul(z(s12*s23*s13),ep)),z(s23*c13)],
    [sub(z(s12*s23),mul(z(c12*c23*s13),ep)),sub(z(-c12*s23),mul(z(s12*c23*s13),ep)),z(c23*c13)]
  ];
}

function invariants(delta){
  const A=diag([1,4,9]), U=pmns(0.58,0.79,0.15,delta), B=matMul(matMul(U,diag([2,7,11])),dagger(U));
  const C=matSub(matMul(A,B),matMul(B,A));
  const cp=mul(z(0,1),trace(matMul(matMul(C,C),C)));
  return {commutatorNorm:frob2(C),cp:cp.re,cpImaginaryResidue:cp.im};
}

const plus=invariants(1.2), minus=invariants(-1.2);
assert.ok(Math.abs(plus.commutatorNorm-minus.commutatorNorm)<1e-10);
assert.ok(Math.abs(plus.cp+minus.cp)<1e-10);
assert.ok(Math.abs(plus.cp)>1e-6);
assert.ok(Math.abs(plus.cpImaginaryResidue)<1e-10);

console.log(JSON.stringify({
  protocol:"degree-twelve-cp-orientation-certificate/1",
  deltaPlus:plus,
  deltaMinus:minus,
  degreeEightCpEven:true,
  degreeTwelvePseudoscalarOdd:true,
  passed:true
},null,2));

