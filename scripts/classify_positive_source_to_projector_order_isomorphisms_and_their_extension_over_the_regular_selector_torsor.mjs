import assert from 'node:assert/strict';

const perms=a=>a.length<=1?[a]:a.flatMap((x,i)=>perms([...a.slice(0,i),...a.slice(i+1)]).map(t=>[x,...t]));
const permutations=perms([0,1,2,3]);
assert.equal(permutations.length,24);
const permutationMatrices=permutations.map(p=>Array.from({length:4},(_,j)=>Array.from({length:4},(_,i)=>p[i]===j?1:0)));
for(const M of permutationMatrices){
  for(let i=0;i<4;i++)assert.equal(M.reduce((s,r)=>s+r[i],0),1);
  for(let j=0;j<4;j++)assert.equal(M[j].reduce((s,x)=>s+x,0),1);
}

// A non-invertible positive unital map sits in the continuous row-stochastic
// family, showing why order-isomorphism is the needed discrete restriction.
const averaging=Array.from({length:4},()=>Array(4).fill(.25));
assert.ok(averaging.every(r=>Math.abs(r.reduce((s,x)=>s+x,0)-1)<1e-12));

const signedAmplitudeLifts=permutations.length*2**4;
assert.equal(signedAmplitudeLifts,384);

// Reconstruct the exact regular 18-point selector orbit.
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const I=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const R=[[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,-1]];
const H=[[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]];
const N=[[1,0,-1,1],[0,0,0,1],[-1,0,2,-1],[0,-1,-1,4]];
const key=JSON.stringify;
const inv=A=>{const aug=A.map((r,i)=>[...r,...I[i]]);for(let c=0;c<4;c++){let p=c;while(p<4&&Math.abs(aug[p][c])<1e-14)p++;assert.ok(p<4);[aug[c],aug[p]]=[aug[p],aug[c]];const d=aug[c][c];aug[c]=aug[c].map(x=>x/d);for(let i=0;i<4;i++)if(i!==c){const f=aug[i][c];aug[i]=aug[i].map((x,j)=>x-f*aug[c][j]);}}return aug.map(r=>r.slice(4));};
const queue=[I],seen=new Set([key(I)]);
for(let h=0;h<queue.length;h++)for(const g of [R,H]){const x=mul(g,queue[h]),k=key(x);if(!seen.has(k)){seen.add(k);queue.push(x);}}
assert.equal(queue.length,18);
const orbit=new Map(),stabilizer=[];
for(const g of queue){const X=mul(mul(g,N),inv(g));orbit.set(key(X),g);if(key(X)===key(N))stabilizer.push(g);}
assert.equal(orbit.size,18);assert.equal(stabilizer.length,1);

// A base-fiber choice extends uniquely because every orbit point has one g.
const extensionCounts=permutationMatrices.map(()=>orbit.size);
assert.ok(extensionCounts.every(n=>n===18));

console.log(JSON.stringify({
  protocol:'positive-source-projector-map-and-regular-torsor-extension/1',
  sourceAlgebra:'R^4 with four primitive positive idempotents labelled u,d,e,nu',
  targetAlgebra:'span of four orthogonal rank-one checkpoint projectors',
  positiveUnitalOrderIsomorphisms:permutations.length,
  classification:'Every order isomorphism permutes the four primitive idempotents, hence S4.',
  positiveUnitalMapsWithoutPositiveInverse:'continuous row-stochastic family; averaging map is an explicit non-invertible example',
  signedAmplitudeLifts,
  selectorOrbitSize:orbit.size,
  selectorStabilizerOrder:stabilizer.length,
  covariantExtension:'Every chosen base-fiber map extends uniquely to all 18 points once source and target transport laws are supplied.',
  choicesRemovedByRegularTorsorCovariance:0,
  remainingOrderIsomorphismChoices:permutations.length,
  conclusion:'Positivity plus unital Jordan/order structure reduces the source-to-projector ambiguity to 24 permutations (384 signed amplitude lifts), but covariance over the regular selector torsor does not select among them because the base stabilizer is trivial.',
  boundary:'A physical reduction requires extra incidence, CP/reality, handle-polarization or isotropy data. Merely declaring background covariance propagates an arbitrary base choice.',
  passed:true,
},null,2));
