#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-pure-axial-exact-gaussian-v1.json",
  import.meta.url,
),"utf8"));

const popcount=n=>{let c=0;for(let x=n;x;x>>>=1)c+=x&1;return c;};
const wedgeSign=(left,right)=>{
  if(left&right)return 0;
  let inversions=0;
  for(let i=0;i<4;i+=1)if(left&(1<<i))inversions+=popcount(right&((1<<i)-1));
  return inversions%2?-1:1;
};
const wedge=(left,right)=>{
  const out=new Map();
  for(const [lm,lv] of left)for(const [rm,rv] of right){
    const sign=wedgeSign(lm,rm);if(!sign)continue;
    const mask=lm|rm;out.set(mask,(out.get(mask)??0)+sign*lv*rv);
  }
  return new Map([...out].filter(([,v])=>v!==0));
};
const metricSign=i=>i===0?-1:1;
const star=mask=>{
  const complement=15^mask;
  const innerSign=(mask&1)?-1:1;
  return [complement,innerSign*wedgeSign(mask,complement)];
};
const basis=i=>new Map([[1<<i,1]]);

// T[a][d] is the two-form multiplying p_d; omit no normalization.
const torsion=Array.from({length:4},(_,a)=>Array.from({length:4},(_,d)=>{
  const two=wedge(basis(a),basis(d));
  const out=new Map();
  for(const [mask,value] of two){
    const [dual,sign]=star(mask);out.set(dual,-value*sign/3);
  }
  return out;
}));

// Check p=star(sum_a e_a wedge T^a) coefficient by coefficient.
for(let d=0;d<4;d+=1){
  const three=new Map();
  for(let a=0;a<4;a+=1)for(const [mask,value] of wedge(basis(a),torsion[a][d]))
    three.set(mask,(three.get(mask)??0)+metricSign(a)*value);
  const reconstructed=new Map();
  for(const [mask,value] of three){
    const [dual,sign]=star(mask);reconstructed.set(dual,(reconstructed.get(dual)??0)+value*sign);
  }
  assert.equal(reconstructed.size,1);
  assert.ok(Math.abs(reconstructed.get(1<<d)-1)<1e-12);
}

// Check every coefficient of p_d p_f in sum_a T_a wedge T^a.
for(let d=0;d<4;d+=1)for(let f=d;f<4;f+=1){
  let coefficient=0;
  for(let a=0;a<4;a+=1){
    coefficient+=metricSign(a)*(wedge(torsion[a][d],torsion[a][f]).get(15)??0);
    if(f!==d)coefficient+=metricSign(a)*(wedge(torsion[a][f],torsion[a][d]).get(15)??0);
  }
  assert.ok(Math.abs(coefficient)<1e-12,`p_${d} p_${f} coefficient is ${coefficient}`);
}

assert.equal(evidence.actionDegreeInAxialField,2);
assert.equal(evidence.cubicAxialSelfVertex,0);
assert.equal(evidence.quarticAxialSelfVertex,0);
assert.deepEqual(evidence.axialSelfHessianSourceDerivatives,{first:0,second:0});

console.log("Spin(2,3) pure-axial exact Gaussian reduction: PASS");
console.log("  axial projector reconstruction: 4/4 basis one-forms");
console.log("  T_a wedge T^a polynomial coefficients: 10/10 zero");
console.log("  pure-axial cubic/quartic self-vertices: zero");
console.log("  next operation: mixed coframe/non-axial source expansion");
