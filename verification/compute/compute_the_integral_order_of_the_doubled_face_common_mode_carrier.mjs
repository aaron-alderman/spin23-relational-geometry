import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((row,i)=>row.map((x,j)=>x+B[i][j]));
const scale=(a,A)=>A.map(row=>row.map(x=>a*x));
const transpose=A=>A[0].map((_,j)=>A.map(row=>row[j]));
const bracket=(A,B)=>add(mm(A,B),scale(-1,mm(B,A)));
const zero=()=>Array.from({length:4},()=>Array(4).fill(0));
const mod=(x,p)=>((x%p)+p)%p;

const J=[[0,0,1,1],[0,0,1,0],[-1,-1,0,0],[-1,0,0,0]];
const seeds={
  normal:[[0,0,2,4],[0,0,-1,-2],[0,0,0,0],[0,0,0,0]],
  tangent:[[0,0,0,0],[0,0,1,0],[0,0,0,0],[0,0,0,0]],
  relationship:[[0,0,-1,0],[0,0,0,-1],[0,0,0,0],[0,0,0,0]],
  coherentHandle:[[-1,0,-2,-4],[0,-1,0,2],[1,2,1,0],[0,-1,0,1]]
};
for(const X of Object.values(seeds)) assert.deepEqual(add(mm(transpose(X),J),mm(J,X)),zero());

// J has block A=[[1,1],[1,0]].  The unimodular basis change below sends it to J0.
const R=[[1,0,0,0],[0,1,0,0],[0,0,0,1],[0,0,1,-1]];
const Rinv=[[1,0,0,0],[0,1,0,0],[0,0,1,1],[0,0,1,0]];
const J0=[[0,0,1,0],[0,0,0,1],[-1,0,0,0],[0,-1,0,0]];
assert.deepEqual(mm(mm(transpose(R),J),R),J0);
const standard=Object.fromEntries(Object.entries(seeds).map(([n,X])=>[n,mm(mm(Rinv,X),R)]));

// Integral coordinates for [[a,b],[c,-a^T]], with b and c symmetric.
const coords=X=>{
  assert.deepEqual(add(mm(transpose(X),J0),mm(J0,X)),zero());
  assert.equal(X[0][3],X[1][2]);
  assert.equal(X[2][1],X[3][0]);
  return [X[0][0],X[0][1],X[1][0],X[1][1],X[0][2],X[0][3],X[1][3],X[2][0],X[2][1],X[3][1]];
};
const neg=x=>x===0?0:-x;
const fromCoords=v=>[[v[0],v[1],v[4],v[5]],[v[2],v[3],v[5],v[6]],[v[7],v[8],neg(v[0]),neg(v[2])],[v[8],v[9],neg(v[1]),neg(v[3])]];
for(const X of Object.values(standard)) assert.deepEqual(fromCoords(coords(X)),X);

const modInverse=(a,p)=>{for(let x=1;x<p;x++)if(mod(a*x,p)===1)return x;throw new Error('noninvertible');};
const modRank=(vectors,p)=>{if(vectors.length===0)return 0;const width=vectors[0].length,M=vectors.map(v=>v.map(x=>mod(x,p)));let r=0;for(let c=0;c<width;c++){let q=r;while(q<M.length&&M[q][c]===0)q++;if(q===M.length)continue;[M[r],M[q]]=[M[q],M[r]];const u=modInverse(M[r][c],p);for(let j=c;j<width;j++)M[r][j]=mod(M[r][j]*u,p);for(let i=0;i<M.length;i++)if(i!==r&&M[i][c]){const f=M[i][c];for(let j=c;j<width;j++)M[i][j]=mod(M[i][j]-f*M[r][j],p);}r++;}return r;};
const modClosureBasis=p=>{const basis=[];for(const X of Object.values(standard)){const v=coords(X);if(modRank([...basis,v],p)>basis.length)basis.push(v.map(x=>mod(x,p)));}let changed=true;while(changed){changed=false;const snapshot=basis.slice();for(let i=0;i<snapshot.length;i++)for(let j=i+1;j<snapshot.length;j++){const v=coords(bracket(fromCoords(snapshot[i]),fromCoords(snapshot[j]))).map(x=>mod(x,p));if(modRank([...basis,v],p)>basis.length){basis.push(v);changed=true;}}}return basis;};
const modularBases={p2:modClosureBasis(2),p3:modClosureBasis(3),p5:modClosureBasis(5)};
const modularDimensions=Object.fromEntries(Object.entries(modularBases).map(([p,b])=>[p,b.length]));
assert.deepEqual(modularDimensions,{p2:5,p3:10,p5:10});

const bits=n=>[n&1,(n>>1)&1,(n>>2)&1,(n>>3)&1],encode=x=>x[0]+2*x[1]+4*x[2]+8*x[3];
const mod2Matrices=modularBases.p2.map(fromCoords);
const actCode=(A,v)=>encode(mm(A,bits(v).map(x=>[x])).map(row=>mod(row[0],2)));
const subspaces=new Map();for(let a=1;a<16;a++)for(let b=a+1;b<16;b++){const W=[0,a,b,a^b].sort((x,y)=>x-y);subspaces.set(W.join(','),W);}
const invariant=(W,A)=>W.every(v=>W.includes(actCode(A,v)));
const invariantLines=Array.from({length:15},(_,i)=>[0,i+1]).filter(W=>mod2Matrices.every(A=>invariant(W,A)));
const invariantPlanes=[...subspaces.values()].filter(W=>mod2Matrices.every(A=>invariant(W,A)));
const pair=(a,b)=>{const x=bits(a),y=bits(b);return mod(x[0]*y[2]+x[1]*y[3]+x[2]*y[0]+x[3]*y[1],2);};
const invariantLagrangians=invariantPlanes.filter(W=>W.every(a=>W.every(b=>pair(a,b)===0)));
const commonKernel=Array.from({length:15},(_,i)=>i+1).filter(v=>mod2Matrices.every(A=>actCode(A,v)===0));
const Widx=[1,2],Qidx=[0,3];
const blockVector=(A,rows,cols)=>rows.flatMap(i=>cols.map(j=>mod(A[i][j],2)));
const restrictedVectors=mod2Matrices.map(A=>blockVector(A,Widx,Widx));
const quotientVectors=mod2Matrices.map(A=>blockVector(A,Qidx,Qidx));
const diagonalActionVectors=mod2Matrices.map((A,i)=>[...restrictedVectors[i],...quotientVectors[i]]);
const mod2ActionRanks={onInvariantLagrangian:modRank(restrictedVectors,2),onQuotient:modRank(quotientVectors,2),jointDiagonal:modRank(diagonalActionVectors,2),offDiagonalKernel:modularDimensions.p2-modRank(diagonalActionVectors,2)};
const addMod2Matrices=chosen=>{const A=zero();for(const i of chosen)for(let r=0;r<4;r++)for(let c=0;c<4;c++)A[r][c]^=mod2Matrices[i][r][c];return A;};
const radicalCandidates=[];for(let mask=1;mask<32;mask++){const chosen=[];for(let i=0;i<5;i++)if(mask&(1<<i))chosen.push(i);const A=addMod2Matrices(chosen);if(blockVector(A,Widx,Widx).every(x=>x===0)&&blockVector(A,Qidx,Qidx).every(x=>x===0))radicalCandidates.push(A);}
const radicalBasis=[];for(const A of radicalCandidates){const v=A.flat();if(modRank([...radicalBasis.map(X=>X.flat()),v],2)>radicalBasis.length)radicalBasis.push(A);}
const zeroMod2=A=>A.flat().every(x=>mod(x,2)===0);
const radicalAbelian=radicalBasis.every((A,i)=>radicalBasis.every((B,j)=>i>=j||zeroMod2(bracket(A,B))));
const leviTraceZero=restrictedVectors.every(v=>mod(v[0]+v[3],2)===0);
assert.equal(radicalBasis.length,2);assert.equal(radicalAbelian,true);assert.equal(leviTraceZero,true);

// Collect left-normed integral commutators.  One index-32 minor, together with the
// mod-2 codimension-five lower bound, determines the exact full-rank lattice index.
const all=[];
const seen=new Set();
const addUnique=X=>{const v=coords(X),k=v.join(',');if(v.some(Boolean)&&!seen.has(k)){seen.add(k);all.push(X);return true;}return false;};
let frontier=Object.values(standard);for(const X of frontier)addUnique(X);
for(let depth=2;depth<=7;depth++){
  const next=[];
  for(const S of Object.values(standard))for(const X of frontier){const C=bracket(S,X);if(addUnique(C))next.push(C);}
  frontier=next;
  if(frontier.length===0)break;
}
const vectors=all.map(coords);

const floorDiv=(a,b)=>{assert.ok(b>0n);let q=a/b,r=a%b;if(r<0n)q--;return q;};
const rowHNF=rows=>{const A=rows.map(row=>row.map(BigInt));let r=0;for(let c=0;c<10&&r<A.length;c++){
  while(true){let p=-1;for(let i=r;i<A.length;i++)if(A[i][c]!==0n&&(p<0||(A[i][c]<0n?-A[i][c]:A[i][c])<(A[p][c]<0n?-A[p][c]:A[p][c])))p=i;if(p<0)break;[A[r],A[p]]=[A[p],A[r]];if(A[r][c]<0n)A[r]=A[r].map(x=>-x);let changed=false;for(let i=r+1;i<A.length;i++)if(A[i][c]!==0n){const q=A[i][c]/A[r][c];for(let j=0;j<10;j++)A[i][j]-=q*A[r][j];if(A[i][c]!==0n)changed=true;}if(!changed)break;}
  if(A[r][c]===0n)continue;
  for(let i=0;i<r;i++){const q=floorDiv(A[i][c],A[r][c]);for(let j=0;j<10;j++)A[i][j]-=q*A[r][j];}
  r++;
}return A.filter(row=>row.some(x=>x!==0n));};
const hnf=rowHNF(vectors);
assert.equal(hnf.length,10);
let exactIndex=1n;for(let i=0;i<10;i++)exactIndex*=hnf[i][i];
const reduceByHNF=v=>{const x=v.map(BigInt);for(let i=0;i<10;i++){assert.ok(hnf[i][i]>0n);if(x[i]%hnf[i][i]!==0n)return false;const q=x[i]/hnf[i][i];for(let j=i;j<10;j++)x[j]-=q*hnf[i][j];}return x.every(a=>a===0n);};
for(const v of vectors)assert.ok(reduceByHNF(v));
const hnfMatrices=hnf.map(row=>fromCoords(row.map(Number)));
for(let i=0;i<10;i++)for(let j=i+1;j<10;j++)assert.ok(reduceByHNF(coords(bracket(hnfMatrices[i],hnfMatrices[j]))));
assert.equal(exactIndex,512n);

console.log(JSON.stringify({
  protocol:'doubled-face-common-mode-integral-order/1',
  commonModeForm:J,
  standardSymplecticForm:J0,
  seedCoordinates:Object.fromEntries(Object.entries(standard).map(([n,X])=>[n,coords(X)])),
  modularClosureDimensions:modularDimensions,
  mod2InvariantStructure:{commonKernel,invariantLines,invariantPlanes,invariantLagrangians,actionRanks:mod2ActionRanks,leviTraceZero,abelianRadicalDimension:radicalBasis.length,radicalAbelian},
  collectedCommutators:vectors.length,
  indexLowerBoundFromMod2:2**(10-modularDimensions.p2),
  hermiteDiagonal:hnf.map((row,i)=>Number(row[i])),
  generatedLieOrderIndex:Number(exactIndex),
  generatedLieOrderIndexAsPowerOfTwo:9,
  bracketClosedHermiteBasis:true,
  theorem:'The minimally normalized common-mode generators span sp(4,Q), but their integral Lie order has exact index 2^9 in the full Chevalley lattice sp(4,Z).',
  interpretation:'The factor-two repair selects a unique carrier but does not give the full split C2 Chevalley order; it defines a proper level-two congruence-type order whose reduction mod 2 has dimension five.',
  passed:true
},null,2));
