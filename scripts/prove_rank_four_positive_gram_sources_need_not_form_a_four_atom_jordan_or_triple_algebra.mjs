import assert from 'node:assert/strict';

const n=4;
const zero=()=>Array.from({length:n},()=>Array(n).fill(0));
const E=i=>{const A=zero();A[i][i]=1;return A;};
const outer=v=>v.map(x=>v.map(y=>x*y));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(c,A)=>A.map(r=>r.map(x=>c*x));
const jordan=(A,B)=>scale(.5,add(mm(A,B),mm(B,A)));
const triple=(A,B,C)=>scale(.5,add(mm(mm(A,B),C),mm(mm(C,B),A)));
const flatten=A=>A.flat();
const rank=vectors=>{
  const A=vectors.map(v=>[...v]);let r=0;
  for(let c=0;c<A[0].length&&r<A.length;c++){
    let p=r;while(p<A.length&&Math.abs(A[p][c])<1e-12)p++;
    if(p===A.length)continue;
    [A[r],A[p]]=[A[p],A[r]];const d=A[r][c];A[r]=A[r].map(x=>x/d);
    for(let i=0;i<A.length;i++)if(i!==r){const f=A[i][c];A[i]=A[i].map((x,j)=>x-f*A[r][j]);}
    r++;
  }
  return r;
};
const maxerr=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.abs(x-B[i][j]))));

const v=[.5,.5,.5,.5];
const G=[E(0),E(1),E(2),outer(v)];
for(const X of G)assert.ok(maxerr(mm(X,X),X)<1e-12); // positive rank-one projectors
const sourceRank=rank(G.map(flatten));
assert.equal(sourceRank,4);

const crossJordan=jordan(G[0],G[3]);
const jordanExtendedRank=rank([...G,crossJordan].map(flatten));
assert.equal(jordanExtendedRank,5);
const crossTriple=triple(G[0],G[0],G[3]);
const tripleExtendedRank=rank([...G,crossTriple].map(flatten));
assert.equal(tripleExtendedRank,5);

// By contrast, four mutually orthogonal coordinate projectors do form R^4.
const orthogonal=[E(0),E(1),E(2),E(3)];
for(let i=0;i<4;i++)for(let j=0;j<4;j++){
  const expected=i===j?orthogonal[i]:zero();
  assert.ok(maxerr(jordan(orthogonal[i],orthogonal[j]),expected)<1e-12);
}

console.log(JSON.stringify({
  protocol:'rank-four-positive-gram-versus-jordan-closure/1',
  counterexample:{
    sources:'G1=E11, G2=E22, G3=E33, G4=|v><v| with v=(1,1,1,1)/2',
    eachSource:'positive rank-one idempotent',
    linearSourceRank:sourceRank,
    rankAfterAdjoiningJordanProduct:jordanExtendedRank,
    rankAfterAdjoiningTripleProduct:tripleExtendedRank,
    conclusion:'The four-dimensional positive source span is neither Jordan closed nor triple closed.'
  },
  closureCriterionExample:'Four mutually orthogonal coordinate projectors do realize the coordinatewise R^4 Jordan algebra.',
  sourceLabelDistinction:'Independent source couplings always have an abstract coordinate algebra R^4, but mapping its idempotents to physical Gram composites is a Jordan/triple homomorphism only under additional orthogonality and closure conditions.',
  qftBoundary:'For local composite operators the relevant product is an OPE/renormalized product, not ordinary finite-matrix multiplication; closure must be computed and cannot be inferred from source rank.',
  passed:true,
},null,2));
