import assert from "node:assert/strict";

const P=[1,1,1,-1];
const pairs=[[0,1],[0,2],[1,2],[0,3],[1,3],[2,3]];
const wedgeSigns=pairs.map(([i,j])=>P[i]*P[j]);
assert.deepEqual(wedgeSigns,[1,1,1,-1,-1,-1]);

const parity=x=>{
  let n=0;for(let i=0;i<x.length;i++)for(let j=i+1;j<x.length;j++)if(x[i]>x[j])n++;
  return n%2?-1:1;
};
const eps=(a,b,c,d)=>new Set([a,b,c,d]).size===4?parity([a,b,c,d]):0;
const J=Array.from({length:6},()=>Array(6).fill(0));
for(let i=0;i<6;i++)for(let j=0;j<6;j++){const [a,b]=pairs[i],[c,d]=pairs[j];J[i][j]=eps(a,b,c,d);}
const transformed=J.map((r,i)=>r.map((x,j)=>wedgeSigns[i]*x*wedgeSigns[j]));
for(let i=0;i<6;i++)for(let j=0;j<6;j++)assert.equal(transformed[i][j]+J[i][j],0);

const symPairs=[];for(let i=0;i<4;i++)for(let j=i;j<4;j++)symPairs.push([i,j]);
const symmetricSigns=symPairs.map(([i,j])=>P[i]*P[j]);
const neutrinoIndex=symPairs.findIndex(([i,j])=>i===3&&j===3);
assert.equal(symmetricSigns[neutrinoIndex],1);

const fermionParity={Q:1,L:-1,uc:1,dc:1,ec:-1,nuc:-1};
const currentParity={
  QL:fermionParity.Q*fermionParity.L,
  ucec:fermionParity.uc*fermionParity.ec,
  dcnuc:fermionParity.dc*fermionParity.nuc,
  QQ:fermionParity.Q**2,
  ucdc:fermionParity.uc*fermionParity.dc
};
assert.deepEqual(currentParity,{QL:-1,ucec:-1,dcnuc:-1,QQ:1,ucdc:1});
const scalarParity={T:-1,D:1};
assert.equal(scalarParity.T*currentParity.QL,1);
assert.equal(scalarParity.T*currentParity.ucec,1);
assert.equal(scalarParity.T*currentParity.dcnuc,1);
assert.equal(scalarParity.D*currentParity.QQ,1);
assert.equal(scalarParity.D*currentParity.ucdc,1);
assert.equal(scalarParity.T*scalarParity.D,-1);

const families=3;
const weakInstantonLeptonParity=(-1)**families;
assert.equal(weakInstantonLeptonParity,-1);

console.log(JSON.stringify({
  protocol:"residual-colour-lepton-reflection-and-weak-anomaly/1",
  fundamentalReflection:P,
  determinant:P.reduce((a,b)=>a*b,1),
  exteriorSquare:{basis:pairs.map(([i,j])=>`e${i+1}^e${j+1}`),signs:wedgeSigns,epsilonFormSign:-1},
  symmetricSquare:{basis:symPairs.map(([i,j])=>`e${i+1}e${j+1}`),signs:symmetricSigns,neutrinoDirection:"e4e4",neutrinoSign:symmetricSigns[neutrinoIndex]},
  fermionParity,currentParity,scalarParity,
  selection:{hermitianTripletMixing:"even",holomorphicTripletCompanionMixing:"odd"},
  weakAnomaly:{families,leptonZeroModesPerElectroweakInstanton:families,parity:weakInstantonLeptonParity,consequence:"the three-generation 't Hooft vertex is odd under lepton parity"},
  theorem:"The colour-lepton reflection leaves the rank-one neutrino and diagonal Sigma vacua invariant, makes the leptoquark half of the six odd and the diquark half even, permits Hermitian like-sector mixing and forbids the epsilon/Pfaffian companion mixing in the reflection-even perturbative action.",
  boundary:"Its fermionic realization is lepton parity. With three weak lepton doublets it is instanton-anomalous, so it is a perturbative Ward selection rule rather than an exact nonperturbative global symmetry unless additional ultraviolet data cancel or replace the anomaly.",
  passed:true
},null,2));
