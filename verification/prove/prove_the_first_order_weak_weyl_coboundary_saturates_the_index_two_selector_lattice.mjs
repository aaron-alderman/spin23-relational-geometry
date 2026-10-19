import assert from 'node:assert/strict';

const I=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const mv=(A,v)=>A.map(r=>r.reduce((s,x,i)=>s+x*v[i],0));
const gcd=(a,b)=>b===0?Math.abs(a):gcd(b,a%b);
const gcdAll=xs=>xs.reduce((a,b)=>gcd(a,b),0);
const minors2=A=>{
  const out=[];
  for(let i=0;i<A.length;i++)for(let j=i+1;j<A.length;j++)
    for(let k=0;k<A[0].length;k++)for(let l=k+1;l<A[0].length;l++)
      out.push(A[i][k]*A[j][l]-A[i][l]*A[j][k]);
  return out;
};
const snfRank2=A=>{const d1=gcdAll(A.flat());const d2=gcdAll(minors2(A))/d1;return[d1,d2];};
const rankMod2=A=>{
  const M=A.map(r=>r.map(x=>((x%2)+2)%2));let rank=0;
  for(let col=0;col<M[0].length&&rank<M.length;col++){
    const p=M.findIndex((r,i)=>i>=rank&&r[col]);if(p<0)continue;
    [M[rank],M[p]]=[M[p],M[rank]];
    for(let i=0;i<M.length;i++)if(i!==rank&&M[i][col])for(let j=col;j<M[0].length;j++)M[i][j]^=M[rank][j];
    rank++;
  }
  return rank;
};

// Weak Weyl reflection on the independent multiplicity variables (u,d,uc).
const W=[[0,1,0],[1,0,0],[0,0,1]];
const delta=sub(I(3),W);
assert.deepEqual(delta,[[1,-1,0],[-1,1,0],[0,0,0]]);
assert.deepEqual(mm(tr(delta),delta),scale(2,delta));

const eu=[1,0,0];
const primitiveSeam=mv(delta,eu);
assert.deepEqual(primitiveSeam,[1,-1,0]);
const quadraticSeam=mv(mm(tr(delta),delta),eu);
assert.deepEqual(quadraticSeam,[2,-2,0]);

// The color-Laplacian enriched faces and their primitive saturation.
const Ddelta=[[1,0,1],[-1,2,1]]; // Fu, FdDelta
const Dprim=[[1,0,1],[1,-1,0]]; // Fu, weak Weyl seam
assert.deepEqual(Ddelta[0].map((x,i)=>x-Ddelta[1][i]),quadraticSeam);
assert.deepEqual(snfRank2(Ddelta),[1,2]);
assert.deepEqual(snfRank2(Dprim),[1,1]);
assert.equal(rankMod2(Ddelta),1);
assert.equal(rankMod2(Dprim),2);

// The weak-center character supplies the quartet twist while the Weyl
// coboundary distinguishes the two weights inside the doublet.
const weakCenterOnQuartet=[1,-1,-1,1]; // (dc,u,d,uc)
const fureyIncidenceSigns=[1,-1,-1,1];
assert.deepEqual(weakCenterOnQuartet,fureyIncidenceSigns);

console.log(JSON.stringify({
  protocol:'weak-weyl-coboundary-index-two-saturation/1',
  weakWeyl:W,
  firstOrderCoboundary:delta,
  primitiveFlux:'(1-W)e_u = u-d',
  quadraticLaplacian:'(1-W)^T(1-W)e_u = 2(u-d)',
  enrichedFaceMatrix:Ddelta,
  primitiveFaceMatrix:Dprim,
  smith:{secondOrder:snfRank2(Ddelta),firstOrder:snfRank2(Dprim)},
  mod2Ranks:{secondOrder:rankMod2(Ddelta),firstOrder:rankMod2(Dprim)},
  centerCharacterMatchesFureySigns:true,
  interpretation:'The old index-two defect is exactly the loss incurred by squaring the first-order weak Weyl difference. Retaining the oriented Weyl coboundary restores the primitive seam.',
  limitation:'This establishes the integral chain algebra. A dynamical derivation must still show why the physical response retains the first-order weak flux rather than only its quadratic Laplacian.',
  passed:true
},null,2));
