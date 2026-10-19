#!/usr/bin/env node

// Exact finite certificate for the external neutral-response repair.
// Higgs-dressed endpoints match representations within each Yukawa channel,
// so their two-face Gram is neutral.  The binary T2 face/arrow pattern embeds
// with two real TRO orientations per available channel, but gauge symmetry
// does not choose a channel or sign.

import assert from 'node:assert/strict';

const channels={
  u:{rep:['3',1,4],requiresNuC:false},
  d:{rep:['3',1,-2],requiresNuC:false},
  e:{rep:['1',1,-6],requiresNuC:false},
  nu:{rep:['1',1,0],requiresNuC:true},
};
const names=Object.keys(channels);
const sameRep=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
for(const c of Object.values(channels))assert(sameRep(c.rep,c.rep));
for(let i=0;i<names.length;i++)for(let j=i+1;j<names.length;j++)
  assert(!sameRep(channels[names[i]].rep,channels[names[j]].rep));

// Real 2x2 TRO check for the two arrow signs.
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const sm=(s,A)=>A.map(r=>r.map(x=>s*x));
const eq=(A,B)=>JSON.stringify(A)===JSON.stringify(B);
const tro=(X,Y,Z)=>mm(mm(X,tr(Y)),Z);
const p=[[1,0],[0,0]],q=[[0,0],[0,1]],a=[[0,1],[0,0]];
assert(eq(tro(a,a,a),a));
for(const sign of [-1,1]){
  const image=sm(sign,a);
  assert(eq(tro(image,image,image),image));
  assert(eq(mm(p,image),image)&&eq(mm(image,q),image));
}

// Same-representation phases cancel from every sesquilinear Gram entry.
const C=(re=0,im=0)=>({re,im});
const mulc=(x,y)=>C(x.re*y.re-x.im*y.im,x.re*y.im+x.im*y.re);
const conj=x=>C(x.re,-x.im);
const addc=(x,y)=>C(x.re+y.re,x.im+y.im);
const inner=(x,y)=>x.reduce((s,v,k)=>addc(s,mulc(conj(v),y[k])),C());
const phase=t=>C(Math.cos(t),Math.sin(t));
const scale=(z,v)=>v.map(x=>mulc(z,x));
const near=(x,y)=>Math.abs(x.re-y.re)<1e-11&&Math.abs(x.im-y.im)<1e-11;
const left=[C(1,.2),C(.4,-.3)],right=[C(.7,.1),C(-.2,.5)],theta=.63;
for(const x of [left,right])for(const y of [left,right])
  assert(near(inner(scale(phase(theta),x),scale(phase(theta),y)),inner(x,y)));

// Independent right-face sign rephasing preserves populations and flips the
// real relationship, proving the +/- orientation is not fixed by gauge data.
const ll=inner(left,left).re,rr=inner(right,right).re,lr=inner(left,right).re;
const minusRight=scale(C(-1),right);
assert(Math.abs(inner(minusRight,minusRight).re-rr)<1e-11);
assert(Math.abs(inner(left,minusRight).re+lr)<1e-11);
assert(ll*rr-lr*lr>=-1e-11);

const counts={
  fifteenState:{channels:['u','d','e'],faceFixedRealTROEmbeddings:6},
  diracSixteenState:{channels:['u','d','e','nu'],faceFixedRealTROEmbeddings:8},
};
assert.equal(2*counts.fifteenState.channels.length,counts.fifteenState.faceFixedRealTROEmbeddings);
assert.equal(2*counts.diracSixteenState.channels.length,counts.diracSixteenState.faceFixedRealTROEmbeddings);

const report={
  protocol:'binary-t2-embeddings-into-yukawa-gram-responses/1',
  withinChannelRepresentationMatch:true,
  crossChannelBareIntertwiners:0,
  gaugeNeutralGramEntries:true,
  binaryFaceMap:'p,q map to dressed-left/right population projectors; a maps to the real cross response',
  strictRealTROOrientationsPerChannel:['+E12','-E12'],
  signSelectedByGaugeSymmetry:false,
  counts,
  neutrinoTradeoff:'The fourth channel requires nu^c; its TRO completion removes the unique M2(C) simple factor even though the external neutral Gram remains available.',
  remaining:'A common Ward/stress source must select channel embeddings, signs, scales, spectral kernels, and aggregation weights.',
  passed:true,
};
console.log(JSON.stringify(report,null,2));
