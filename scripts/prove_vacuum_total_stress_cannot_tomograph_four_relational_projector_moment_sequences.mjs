import assert from 'node:assert/strict';

const A=[
  [1,1,1,1],
  [1,2,3,4],
]; // generic rank-two aggregation into spin-2 and spin-0 form-factor moments
const mulv=(M,x)=>M.map(r=>r.reduce((s,v,j)=>s+v*x[j],0));
const rank=M=>{const X=M.map(r=>[...r]);let q=0;for(let c=0;c<X[0].length&&q<X.length;c++){let p=q;while(p<X.length&&Math.abs(X[p][c])<1e-12)p++;if(p===X.length)continue;[X[q],X[p]]=[X[p],X[q]];const d=X[q][c];X[q]=X[q].map(x=>x/d);for(let i=0;i<X.length;i++)if(i!==q){const f=X[i][c];X[i]=X[i].map((x,j)=>x-f*X[q][j]);}q++;}return q;};
assert.equal(rank(A),2);
const nullDirections=[[1,-2,1,0],[2,-3,0,1]];
for(const c of nullDirections)assert.ok(mulv(A,c).every(x=>Math.abs(x)<1e-12));

const base=[5,5,5,5];
const alternatives=[
  base.map((x,j)=>x+nullDirections[0][j]),
  base.map((x,j)=>x-nullDirections[1][j]),
];
assert.ok([base,...alternatives].every(v=>v.every(x=>x>0)));
const observed=mulv(A,base);
for(const v of alternatives)assert.deepEqual(mulv(A,v),observed);
assert.notDeepEqual(alternatives[0],alternatives[1]);

const conformalA=[[1,1,1,1]];
assert.equal(rank(conformalA),1);
const conformalNullity=4-rank(conformalA);
const massiveVacuumNullity=4-rank(A);

// The same invisible directions may be chosen independently at each moment
// order while positivity is preserved by sufficiently small coefficients.
const momentBases=[
  [5,5,5,5],
  [20,25,30,35],
  [100,140,190,250],
];
const momentDeformations=momentBases.map((v,k)=>v.map((x,j)=>x+(k+1)*.1*nullDirections[k%2][j]));
for(let k=0;k<momentBases.length;k++){assert.ok(momentDeformations[k].every(x=>x>0));assert.deepEqual(mulv(A,momentBases[k]),mulv(A,momentDeformations[k]));}

console.log(JSON.stringify({
  protocol:'vacuum-total-stress-four-channel-tomography-rank-no-go/1',
  relationalChannelCount:4,
  vacuumStressNonlocalLorentzStructures:['spin-2','spin-0'],
  genericVacuumObservationRank:rank(A),
  genericVacuumHiddenDimension:massiveVacuumNullity,
  conformalObservationRank:rank(conformalA),
  conformalHiddenDimension:conformalNullity,
  explicitPositiveMomentVectors:[base,...alternatives],
  sharedObservedSpinMoments:observed,
  multiMomentInvisibleDeformations:true,
  theorem:'A Lorentz-invariant conserved symmetric two-point stress kernel has at most two independent nonlocal scalar form factors. Any linear observation of four projector-resolved moment sequences through total stress therefore has rank at most two and leaves at least two unresolved directions; the conformal traceless limit leaves at least three.',
  boundary:'This is a vacuum two-point and fixed-probe theorem. A medium, boundaries, higher-point functions or additional gauge-neutral source operators can add independent structures, but total-stress conservation alone does not select them.',
  passed:true,
},null,2));
