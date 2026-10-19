import assert from 'node:assert/strict';

const channels=[
  {name:'u',left:{color:3,sixY:3+1},right:{color:3,sixY:4}},
  {name:'d',left:{color:3,sixY:-3+1},right:{color:3,sixY:-2}},
  {name:'e',left:{color:1,sixY:-3-3},right:{color:1,sixY:-6}},
  {name:'nu',left:{color:1,sixY:3-3},right:{color:1,sixY:0}},
];
for(const f of channels){assert.equal(f.left.color,f.right.color);assert.equal(f.left.sixY,f.right.sixY);}

const rank=M=>{const A=M.map(r=>[...r]);let q=0;for(let c=0;c<A[0].length&&q<A.length;c++){let p=q;while(p<A.length&&Math.abs(A[p][c])<1e-12)p++;if(p===A.length)continue;[A[q],A[p]]=[A[p],A[q]];const d=A[q][c];A[q]=A[q].map(x=>x/d);for(let i=0;i<A.length;i++)if(i!==q){const f=A[i][c];A[i]=A[i].map((x,j)=>x-f*A[q][j]);}q++;}return q;};
const det=A=>{const B=A.map(r=>[...r]);let d=1;for(let c=0;c<B.length;c++){let p=c;while(p<B.length&&Math.abs(B[p][c])<1e-12)p++;if(p===B.length)return 0;if(p!==c){[B[c],B[p]]=[B[p],B[c]];d=-d;}const x=B[c][c];d*=x;for(let i=c+1;i<B.length;i++){const f=B[i][c]/x;for(let j=c;j<B.length;j++)B[i][j]-=f*B[c][j];}}return d;};
const I4=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>i===j?1:0));
assert.equal(rank(I4),4);
const fifteenState=I4.slice(0,3);
assert.equal(rank(fifteenState),3);

const spin2=[3,3,1,1]; // simple color-multiplicity aggregate
const spin0=[1,2,4,8]; // illustrative non-proportional trace/threshold aggregate
const quarkContrast=[1,-1,0,0];
const leptonContrast=[0,0,1,-1];
const hybrid=[spin2,spin0,quarkContrast,leptonContrast];
assert.equal(rank(hybrid),4);
assert.equal(det(hybrid),-66);

// Determinant coefficients for a general second stress/trace row (a,b,c,d).
const determinantCoefficients=I4.map(e=>det([spin2,e,quarkContrast,leptonContrast]));
assert.deepEqual(determinantCoefficients,[2,2,-6,-6]);

console.log(JSON.stringify({
  protocol:'neutral-yukawa-gram-source-rank/1',
  matchedChannels:channels,
  sixteenStateSourceMatrix:'I4 from separately sourced u,d,e,nu neutral Gram operators',
  sixteenStateRank:rank(I4),
  fifteenStateRankWithoutNuRight:rank(fifteenState),
  fifteenStateHiddenDimension:4-rank(fifteenState),
  hybridRankFourExample:{rows:['spin-2 aggregate','independent spin-0/threshold aggregate','u-d neutral contrast','e-nu neutral contrast'],determinant:det(hybrid)},
  hybridGenericCondition:'For second aggregate row (a,b,c,d), determinant=2[(a+b)-3(c+d)]; rank four requires the second aggregate not have the same quark/lepton ratio as the color-multiplicity row.',
  conclusion:'Four separately sourced Higgs-dressed Yukawa Gram operators form a legal gauge-neutral rank-four source algebra only in the nu_R-completed branch. The 15-state u,d,e set has rank at most three. Total stress plus two neutral contrasts can reach rank four only if its two Lorentz aggregates are independently weighted.',
  boundary:'Source rank is kinematic sufficiency, not a physical projector map. Operator mixing, contacts, vanishing cross spectra or an unsourced nu_R channel may reduce the effective rank.',
  passed:true,
},null,2));
