import assert from 'node:assert/strict';

const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const I=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const R=[[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,-1]];
const H=[[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]];
const K=[[1,0,0,0],[0,1,0,0],[0,0,-1,0],[0,0,0,-1]];
const N=[[1,0,-1,1],[0,0,0,1],[-1,0,2,-1],[0,-1,-1,4]];
const key=JSON.stringify,eq=(A,B)=>key(A)===key(B),pow=(A,n)=>{let X=I;while(n--)X=mul(A,X);return X;};
const generate=(gens,cap=Infinity)=>{const q=[I],seen=new Set([key(I)]);for(let i=0;i<q.length&&q.length<=cap;i++)for(const g of gens){const X=mul(g,q[i]),k=key(X);if(!seen.has(k)){seen.add(k);q.push(X);}}return q;};
const G=generate([R,H]);assert.equal(G.length,18);
assert.ok(eq(mul(mul(K,H),K),H));
const KRK=mul(mul(K,R),K);assert.equal(G.some(g=>eq(g,KRK)),false);
const W=pow(mul(K,R),2);
assert.deepEqual(W,[[1,0,0,0],[0,1,0,-1],[0,0,1,0],[0,-1,0,2]]);
assert.equal(W.reduce((s,r,i)=>s+r[i],0),5);

// In handle order (p1,q1,p2,q2), W=I2 direct-sum M with tr(M)=3.
const order=[0,2,1,3],reorder=A=>order.map(i=>order.map(j=>A[i][j]));
const Wr=reorder(W),Nr=reorder(N),M=[[1,-1],[-1,2]];
assert.deepEqual(Wr,[[1,0,0,0],[0,1,0,0],[0,0,...M[0]],[0,0,...M[1]]]);
const topRight=[Nr[0].slice(2),Nr[1].slice(2)];
assert.deepEqual(topRight,[[0,1],[0,-1]]);

// If W^k commuted with N, top-right blocks would require B M^k=B.
// The nonzero row (0,1) would then be a left eigenvector of M^k at eigenvalue 1.
// M has eigenvalues (3 +/- sqrt(5))/2, so no nonzero power has eigenvalue 1.
const conjugates=new Set;
const inv=A=>{const aug=A.map((r,i)=>[...r,...I[i]]);for(let c=0;c<4;c++){let p=c;while(p<4&&aug[p][c]===0)p++;assert.ok(p<4);[aug[c],aug[p]]=[aug[p],aug[c]];const d=aug[c][c];aug[c]=aug[c].map(x=>x/d);for(let i=0;i<4;i++)if(i!==c){const f=aug[i][c];aug[i]=aug[i].map((x,j)=>x-f*aug[c][j]);}}return aug.map(r=>r.slice(4));};
for(let k=0;k<16;k++){const X=pow(W,k);conjugates.add(key(mul(mul(X,N),inv(X))));}
assert.equal(conjugates.size,16);
const extendedPrefix=generate([R,H,K],10000);assert.ok(extendedPrefix.length>10000);

console.log(JSON.stringify({
  protocol:'flux-reversal-infinite-selector-extension/1',
  finiteSymplecticGroupOrder:G.length,
  fluxInvolutionSquared:2,
  commutesWithHandleExchange:true,
  normalizesOrientedColor:false,
  hyperbolicWord:'W=(K R)^2',
  hyperbolicWordMatrix:W,
  hyperbolicBlock:{matrix:M,trace:3,polynomial:'x^2-3x+1'},
  extendedGroupInfinite:true,
  checkedDistinctCheckpointConjugatesUnderWPowers:conjugates.size,
  infiniteOrbitProof:'In handle order W=I2+M. The checkpoint top-right block contains row (0,1). Commutation with W^k would make it a left eigenvector of M^k with eigenvalue 1, impossible for k!=0 because M has positive reciprocal eigenvalues off the unit circle.',
  conclusion:'Flux reversal cannot be adjoined as another finite background generator. It must be treated as a fiber antiunitary real structure over the finite C3 x S3 base, or else the selector-background group and checkpoint orbit become infinite.',
  passed:true,
},null,2));
