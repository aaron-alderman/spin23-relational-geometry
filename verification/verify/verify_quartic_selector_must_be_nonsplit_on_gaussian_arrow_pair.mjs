#!/usr/bin/env node

// Exact certificate: an F2 cohomology class cannot acquire an odd Z4 phase
// through a group homomorphism.  The Gaussian pi^3 quotient supplies the
// required nonsplit C4 direction; selecting it needs a quadratic/central lift.

import assert from 'node:assert/strict';

// Hom(F2^4,Z4): each basis image is annihilated by two, hence 0 or 2.
const homs=[];
for(let mask=0;mask<16;mask++){
  const images=Array.from({length:4},(_,j)=>((mask>>j)&1)?2:0);
  homs.push(images);
}
assert.equal(homs.length,16);
assert(homs.every(images=>images.every(x=>x===0||x===2)));
assert(homs.every(images=>images.every(x=>x%2===0)));

// In the named H1 basis (u,e1,e0,e4), k=u+e1 has mask 3 and the E12
// candidate pair has masks 4 and 7.  Eight sign characters distinguish the
// pair, but no linear character gives either candidate an odd fourth-root phase.
const parity=n=>{let p=0;while(n){p^=1;n&=n-1;}return p;};
const evalHom=(images,mask)=>images.reduce((s,x,j)=>((mask>>j)&1)?(s+x)%4:s,0);
const kMask=3,candidates=[4,7];
const distinguishers=homs.filter(h=>evalHom(h,kMask)===2);
assert.equal(distinguishers.length,8);
assert(homs.every(h=>candidates.every(c=>evalHom(h,c)%2===0)));

// Minimal odd lift is quadratic: q(0)=0,q(1)=1 has defect 2xy.
const q=x=>x?1:0;
for(const x of [0,1])for(const y of [0,1])
  assert.equal((q(x)+q(y)-q(x^y)+4)%4,2*(x&y));

// Gaussian arithmetic at pi^3.  The ideal (pi^3) has generator -2+2i.
const G=(a=0,b=0)=>({a,b});
const add=(z,w)=>G(z.a+w.a,z.b+w.b);
const neg=z=>G(-z.a,-z.b);
const mul=(z,w)=>G(z.a*w.a-z.b*w.b,z.a*w.b+z.b*w.a);
const conj=z=>G(z.a,-z.b);
const pi=G(1,1),pi2=mul(pi,pi),pi3=mul(pi2,pi),i=G(0,1),one=G(1);
const divisible=(z,p)=>{
  const n=p.a*p.a+p.b*p.b,num=mul(z,conj(p));
  return num.a%n===0&&num.b%n===0;
};
const equivalent=(z,w)=>divisible(add(z,neg(w)),pi3);
const reps=[];
for(let a=0;a<4;a++)for(let b=0;b<4;b++){
  const z=G(a,b);
  if(!reps.some(r=>equivalent(z,r)))reps.push(z);
}
assert.equal(reps.length,8);
const order=z=>{
  let s=G();
  for(let n=1;n<=8;n++){s=add(s,z);if(divisible(s,pi3))return n;}
  throw new Error('order not found');
};
const orders=reps.map(order).sort((a,b)=>a-b);
assert.deepEqual(orders,[1,2,2,2,4,4,4,4]);
assert.equal(order(i),4);
const residue=z=>((z.a+z.b)%2+2)%2;
assert.equal(reps.filter(z=>residue(z)===0).length,4);

const report={
  protocol:'quartic-selector-must-be-nonsplit-on-gaussian-arrow-pair/1',
  H1:'F2^4 with basis (u,e1,e0,e4)',
  arrowCandidateMasks:candidates,
  invisibleDifferenceMask:kMask,
  linearHomomorphismsToZ4:homs.length,
  charactersDistinguishingCandidatePairBySign:distinguishers.length,
  oddQuarticPhasesFromLinearCharacters:0,
  quadraticLift:{q0:q(0),q1:q(1),defect:'q(x)+q(y)-q(x+y)=2xy mod 4'},
  gaussianPi3:{ring:'Z[i]/(1+i)^3',cardinality:reps.length,additiveGroup:'C4 + C2',elementOrderDistribution:orders,iOrder:order(i),residueKernelSize:reps.filter(z=>residue(z)===0).length},
  conclusion:'A sign character can distinguish e0 from e0+k, but multiplication by i requires a nonsplit quadratic/central lift through the Gaussian pi^3 ring.',
  passed:true,
};
console.log(JSON.stringify(report,null,2));
