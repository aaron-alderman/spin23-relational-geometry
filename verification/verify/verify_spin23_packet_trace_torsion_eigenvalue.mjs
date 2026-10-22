#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-packet-trace-torsion-eigenvalue-v1.json",
  import.meta.url,
),"utf8"));

const popcount=n=>{let c=0;for(let x=n;x;x>>>=1)c+=x&1;return c;};
const wedgeSign=(left,right)=>{
  if(left&right)return 0;let inversions=0;
  for(let i=0;i<4;i+=1)if(left&(1<<i))inversions+=popcount(right&((1<<i)-1));
  return inversions%2?-1:1;
};
const add=(...forms)=>{const out=new Map();for(const form of forms)for(const [m,v] of form)out.set(m,(out.get(m)??0)+v);return out;};
const scale=(form,factor)=>new Map([...form].map(([m,v])=>[m,factor*v]));
const wedge=(left,right)=>{const out=new Map();for(const [lm,lv] of left)for(const [rm,rv] of right){const sign=wedgeSign(lm,rm);if(sign)out.set(lm|rm,(out.get(lm|rm)??0)+sign*lv*rv);}return out;};
const metricSign=i=>i===0?-1:1;
const star=form=>{const out=new Map();for(const [mask,value] of form){const complement=15^mask;const innerSign=(mask&1)?-1:1;out.set(complement,(out.get(complement)??0)+value*innerSign*wedgeSign(mask,complement));}return out;};
const basis=i=>new Map([[1<<i,1]]);

for(let source=0;source<4;source+=1){
  const t=Array(4).fill(0);t[source]=1;
  const T=Array.from({length:4},(_,a)=>scale(wedge(basis(a),basis(source)),1/3));
  let norm=new Map();
  for(let a=0;a<4;a+=1)norm=add(norm,scale(wedge(T[a],star(T[a])),metricSign(a)));
  const expectedNorm=metricSign(source)/3;
  assert.ok(Math.abs((norm.get(15)??0)-expectedNorm)<1e-12);

  // K_ab=(t_b e_a-t_a e_b)/3 for T^a=e^a wedge t/3.
  const K=Array.from({length:4},()=>Array.from({length:4},()=>new Map()));
  for(let a=0;a<4;a+=1)for(let b=0;b<4;b+=1){
    K[a][b]=scale(add(
      scale(basis(a),metricSign(a)*t[b]),
      scale(basis(b),-metricSign(b)*t[a])
    ),1/3);
  }
  const R=Array.from({length:4},()=>Array.from({length:4},()=>new Map()));
  for(let a=0;a<4;a+=1)for(let b=0;b<4;b+=1)for(let c=0;c<4;c+=1)
    R[a][b]=add(R[a][b],scale(wedge(K[a][c],K[c][b]),metricSign(c)));

  let einsteinCartan=new Map();
  for(let a=0;a<4;a+=1)for(let b=0;b<4;b+=1){
    const eLowerA=scale(basis(a),metricSign(a));
    const eLowerB=scale(basis(b),metricSign(b));
    const etaAB=star(wedge(eLowerA,eLowerB));
    const raisedR=scale(R[a][b],metricSign(a)*metricSign(b));
    einsteinCartan=add(einsteinCartan,wedge(raisedR,etaAB));
  }
  const expectedEC=-2*metricSign(source)/3;
  assert.ok(Math.abs((einsteinCartan.get(15)??0)-expectedEC)<1e-12);
}

for(const witness of [{a1:1,kappa:2,bX:3},{a1:4,kappa:0.5,bX:0.25}]){
  const a2=-2*witness.a1;
  const Ct=(a2-2)/(3*witness.kappa);
  const original=-2*witness.bX**2/(9*Ct);
  const critical=witness.kappa*witness.bX**2/(3*(witness.a1+1));
  assert.ok(Math.abs(original-critical)<1e-12);
  assert.notEqual(Ct,0);
}

assert.match(evidence.Ct,/a2-2/);
assert.match(evidence.criticalCt,/a1\+1/);

console.log("Spin(2,3) packet trace-torsion eigenvalue: PASS");
console.log("  Einstein-Cartan trace coefficient: -2/3");
console.log("  trace-projector norm coefficient: +1/3");
console.log("  Ct=(a2-2)/(3 kappa)=-2(a1+1)/(3 kappa) on the critical surface");
console.log("  fixed-coframe Schur coefficient: kappa bX^2/(3(a1+1))");
