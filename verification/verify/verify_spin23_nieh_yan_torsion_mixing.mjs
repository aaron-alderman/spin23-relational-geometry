#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-nieh-yan-torsion-mixing-v1.json",
  import.meta.url,
),"utf8"));

const popcount=n=>{let c=0;for(let x=n;x;x>>>=1)c+=x&1;return c;};
const wedgeSign=(left,right)=>{
  if(left&right)return 0;
  let inversions=0;
  for(let i=0;i<4;i+=1)if(left&(1<<i))inversions+=popcount(right&((1<<i)-1));
  return inversions%2?-1:1;
};
const add=(...forms)=>{
  const out=new Map();
  for(const form of forms)for(const [mask,value] of form)out.set(mask,(out.get(mask)??0)+value);
  return new Map([...out].filter(([,value])=>Math.abs(value)>1e-12));
};
const scale=(form,factor)=>new Map([...form].map(([mask,value])=>[mask,factor*value]));
const wedge=(left,right)=>{
  const out=new Map();
  for(const [lm,lv] of left)for(const [rm,rv] of right){
    const sign=wedgeSign(lm,rm);if(!sign)continue;
    const mask=lm|rm;out.set(mask,(out.get(mask)??0)+sign*lv*rv);
  }
  return new Map([...out].filter(([,value])=>Math.abs(value)>1e-12));
};
const metricSign=i=>i===0?-1:1;
const star=(form)=>{
  const out=new Map();
  for(const [mask,value] of form){
    const complement=15^mask;
    const innerSign=(mask&1)?-1:1;
    out.set(complement,(out.get(complement)??0)+value*innerSign*wedgeSign(mask,complement));
  }
  return new Map([...out].filter(([,value])=>Math.abs(value)>1e-12));
};
const basis=i=>new Map([[1<<i,1]]);
const twoMasks=[3,5,9,6,10,12];
const zeroT=()=>Array.from({length:4},()=>new Map());
const interiorBasis=(a,mask)=>{
  const indices=[];for(let i=0;i<4;i+=1)if(mask&(1<<i))indices.push(i);
  const out=new Map();
  indices.forEach((index,position)=>{if(index===a){
    const remaining=mask^(1<<index);out.set(remaining,(out.get(remaining)??0)+(position%2?-1:1));
  }});
  return out;
};
const traceOf=T=>{
  let out=new Map();
  for(let a=0;a<4;a+=1)for(const [mask,value] of T[a])out=add(out,scale(interiorBasis(a,mask),value));
  return out;
};
const axialOf=T=>{
  let three=new Map();
  for(let a=0;a<4;a+=1)three=add(three,scale(wedge(basis(a),T[a]),metricSign(a)));
  return star(three);
};
const vectorFrom=t=>Array.from({length:4},(_,a)=>scale(wedge(basis(a),t),1/3));
const axialFrom=p=>Array.from({length:4},(_,a)=>scale(star(wedge(basis(a),p)),-1/3));
const subtractT=(left,...rights)=>left.map((form,a)=>add(form,...rights.map(right=>scale(right[a],-1))));
const bilinear=(left,right)=>{
  let four=new Map();
  for(let a=0;a<4;a+=1)four=add(four,scale(wedge(left[a],right[a]),metricSign(a)));
  return star(four).get(0)??0;
};
const flat=T=>T.flatMap(form=>twoMasks.map(mask=>form.get(mask)??0));
const rank=(input,tolerance=1e-10)=>{
  const a=input.map(row=>row.slice());let r=0;
  for(let c=0;c<a[0].length&&r<a.length;c+=1){
    let p=r;for(let i=r+1;i<a.length;i+=1)if(Math.abs(a[i][c])>Math.abs(a[p][c]))p=i;
    if(Math.abs(a[p][c])<=tolerance)continue;
    [a[r],a[p]]=[a[p],a[r]];const pivot=a[r][c];
    for(let j=c;j<a[r].length;j+=1)a[r][j]/=pivot;
    for(let i=0;i<a.length;i+=1)if(i!==r){const f=a[i][c];for(let j=c;j<a[i].length;j+=1)a[i][j]-=f*a[r][j];}
    r+=1;
  }return r;
};

const traceBasis=Array.from({length:4},(_,i)=>vectorFrom(basis(i)));
const axialBasis=Array.from({length:4},(_,i)=>axialFrom(basis(i)));
const elementary=[];
for(let a=0;a<4;a+=1)for(const mask of twoMasks){const T=zeroT();T[a].set(mask,1);elementary.push(T);}
const tensorProjected=elementary.map(T=>subtractT(T,vectorFrom(traceOf(T)),axialFrom(axialOf(T))));

assert.equal(rank(traceBasis.map(flat)),evidence.torsionDimensions.trace);
assert.equal(rank(axialBasis.map(flat)),evidence.torsionDimensions.axial);
assert.equal(rank(tensorProjected.map(flat)),evidence.torsionDimensions.tensor);

for(let i=0;i<4;i+=1)for(let j=0;j<4;j+=1){
  assert.ok(Math.abs(bilinear(traceBasis[i],traceBasis[j]))<1e-12);
  assert.ok(Math.abs(bilinear(axialBasis[i],axialBasis[j]))<1e-12);
  const expected=(i===j?metricSign(i)*2/3:0);
  assert.ok(Math.abs(2*bilinear(traceBasis[i],axialBasis[j])-expected)<1e-12);
}
for(const Q of tensorProjected)for(let i=0;i<4;i+=1){
  assert.ok(Math.abs(bilinear(traceBasis[i],Q))<1e-12);
  assert.ok(Math.abs(bilinear(axialBasis[i],Q))<1e-12);
}
assert.ok(tensorProjected.some(left=>tensorProjected.some(right=>Math.abs(bilinear(left,right))>1e-12)));

assert.equal(evidence.HB1ConnectionVertices.length,3);
assert.equal(evidence.HB2ConnectionVertices.length,1);

console.log("Spin(2,3) Nieh-Yan torsion mixing: PASS");
console.log("  torsion projector ranks: 4 + 4 + 16 = 24");
console.log("  star(T_a wedge T^a)=(2/3)t.p+star(Q_a wedge Q^a)");
console.log("  fixed-coframe source vertices: HB1=3, HB2=1");
console.log("  next operation: coframe completion and Schur reduction");
