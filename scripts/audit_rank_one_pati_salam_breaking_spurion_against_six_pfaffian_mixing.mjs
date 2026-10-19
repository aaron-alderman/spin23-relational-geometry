import assert from "node:assert/strict";

const perms = xs => xs.length === 0 ? [[]] : xs.flatMap((x,i)=>perms(xs.filter((_,j)=>j!==i)).map(p=>[x,...p]));
const eps = xs => {
  if(new Set(xs).size<4)return 0;
  let n=0;
  for(let i=0;i<4;i++)for(let j=i+1;j<4;j++)if(xs[i]>xs[j])n++;
  return n%2?-1:1;
};

const anti = entries => {
  const A=Array.from({length:4},()=>Array(4).fill(0));
  for(const [i,j,x] of entries){A[i][j]=x;A[j][i]=-x;}
  return A;
};
const A=anti([[0,1,2],[0,2,-1],[0,3,3],[1,2,4],[1,3,-2],[2,3,5]]);
const B=anti([[0,1,-3],[0,2,2],[0,3,1],[1,2,-4],[1,3,6],[2,3,2]]);
const outer=v=>v.map(x=>v.map(y=>x*y));
const Srank1=outer([1,2,-1,3]);
const Sgeneric=[[2,1,0,1],[1,3,2,0],[0,2,5,-1],[1,0,-1,4]];

// All delta-contraction patterns of A^{ij}B^{kl}S^*_{mn}S^*_{pq}.
// A permutation sends the four upper slots [i,j,k,l] to the lower slots.
const contraction=(S,p)=>{
  let sum=0;
  for(let i=0;i<4;i++)for(let j=0;j<4;j++)for(let k=0;k<4;k++)for(let l=0;l<4;l++){
    const up=[i,j,k,l];
    const low=p.map(t=>up[t]);
    sum+=A[i][j]*B[k][l]*S[low[0]][low[1]]*S[low[2]][low[3]];
  }
  return sum;
};
const ps=perms([0,1,2,3]);
const rankOneValues=ps.map(p=>contraction(Srank1,p));
const genericValues=ps.map(p=>contraction(Sgeneric,p));
assert(rankOneValues.every(x=>x===0));
assert(genericValues.some(x=>x!==0));

const pfaffianPair=(X,Y)=>{
  let sum=0;
  for(let i=0;i<4;i++)for(let j=0;j<4;j++)for(let k=0;k<4;k++)for(let l=0;l<4;l++)sum+=eps([i,j,k,l])*X[i][j]*Y[k][l];
  return sum;
};
const pfAB=pfaffianPair(A,B);
assert.notEqual(pfAB,0);

// The epsilon contraction of two symmetric tensors vanishes identically.
const epsSS=S=>{
  let sum=0;
  for(let i=0;i<4;i++)for(let j=0;j<4;j++)for(let k=0;k<4;k++)for(let l=0;l<4;l++)sum+=eps([i,j,k,l])*S[i][j]*S[k][l];
  return sum;
};
assert.equal(epsSS(Srank1),0);
assert.equal(epsSS(Sgeneric),0);

console.log(JSON.stringify({
  protocol:"rank-one-PS-breaking-spurion-versus-six-Pfaffian/1",
  phaseBookkeeping:{qSix:1,qTen:1,qPfaffian:2,qNeutralQuartic:"q(6)+q(6)-q(10)-q(10)=0"},
  directPfaffianWitness:pfAB,
  deltaContractionPatterns:ps.length,
  rankOneInducedValues:rankOneValues,
  genericSymmetricSpurionHasNonzeroChannel:genericValues.some(x=>x!==0),
  genericNonzeroValues:[...new Set(genericValues.filter(x=>x!==0))],
  symmetricEpsilonContraction:{rankOne:epsSS(Srank1),generic:epsSS(Sgeneric)},
  theorem:"The common H-phase can be broken by a charged 10-plet vacuum, and gauge/phase bookkeeping allows 6·6·10†·10†. Nevertheless every direct SU(4) delta contraction vanishes when the symmetric breaking spurion has rank one; a generic higher-rank symmetric spurion reopens the channel.",
  boundary:"This is a complete contraction audit for two antisymmetric upper tensors and two identical symmetric lower tensors using Kronecker pairings, not a derivation of the unpublished complete Model C spectral potential or a proof against multi-spurion and loop-induced mixing.",
  passed:true
},null,2));
