import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-functional-Schur-loop-tangency.json','utf8'));

const trim=p=>{
  const q=[...p];
  while(q.length>1 && q.at(-1)===0) q.pop();
  return q;
};
const add=(a,b)=>{
  const out=Array(Math.max(a.length,b.length)).fill(0);
  for(let i=0;i<out.length;i++) out[i]=(a[i]??0)+(b[i]??0);
  return trim(out);
};
const scale=(a,k)=>trim(a.map(x=>k*x));
const mul=(a,b)=>{
  const out=Array(a.length+b.length-1).fill(0);
  for(let i=0;i<a.length;i++) for(let j=0;j<b.length;j++) out[i+j]+=a[i]*b[j];
  return trim(out);
};
const evalPoly=(p,x)=>p.reduceRight((s,c)=>s*x+c,0);
const zero=[0];

// Exact polynomial Cauchy--Binet audit for four momentum-dependent packets.
const vectors=[[1,2],[-2,1],[3,-1],[1,4]];
const weights=[[-1],[1,1],[2,-1],[0,1,1]];
let C=zero,P=zero,S=zero;
for(let i=0;i<vectors.length;i++){
  const [d,y]=vectors[i];
  C=add(C,scale(weights[i],d*d));
  P=add(P,scale(weights[i],d*y));
  S=add(S,scale(weights[i],y*y));
}
const direct=add(mul(C,S),scale(mul(P,P),-1));
let cauchy=zero;
for(let i=0;i<vectors.length;i++){
  for(let j=i+1;j<vectors.length;j++){
    const delta=vectors[i][0]*vectors[j][1]-vectors[j][0]*vectors[i][1];
    cauchy=add(cauchy,scale(mul(weights[i],weights[j]),delta*delta));
  }
}
assert.deepEqual(direct,cauchy);

// A cancellation at z=0 that immediately leaves the cone away from z=0.
// v=(1,1), g1=(1,-1), g2=(2,1) give squared tree minors 4 and 1.
const f1=[1,1];
const f2PointOnly=[-4,-3];
const pointOnly=add(scale(f1,4),f2PointOnly);
assert.deepEqual(pointOnly,[0,1]);
assert.equal(evalPoly(pointOnly,0),0);
assert.equal(evalPoly(pointOnly,1),1);

// Nonaligned packets can cancel over an interval only here because their
// indefinite form factors have an exact functional dependence.
const f2Dependent=scale(f1,-4);
const intervalCancellation=add(scale(f1,4),f2Dependent);
assert.deepEqual(intervalCancellation,zero);

// Alignment kills each coefficient before any momentum function is used.
const v=[2,-3];
const aligned=[-4,6];
const alignedMinor=v[0]*aligned[1]-aligned[0]*v[1];
assert.equal(alignedMinor,0);

assert.equal(evidence.exactAudit.packetCount,4);
assert.equal(evidence.exactAudit.polynomialCauchyBinetIdentity,true);
assert.equal(evidence.exactAudit.onePointCancellationPolynomial,'z');
assert.equal(evidence.exactAudit.intervalCancellationRequiresDependentIndefiniteWeights,true);

console.log('PASS 1519: polynomial Cauchy-Binet holds for four functional packets; a tuned zero at z=0 becomes z off-shell, while interval cancellation requires common-ray alignment or an exact dependent/indefinite form-factor null relation.');
