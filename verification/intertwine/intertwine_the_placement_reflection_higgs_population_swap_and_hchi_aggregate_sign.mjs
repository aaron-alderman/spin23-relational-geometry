import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const eq=(A,B)=>A.every((r,i)=>r.every((x,j)=>Math.abs(x-B[i][j])<1e-12));
const det=A=>A[0][0]*A[1][1]-A[0][1]*A[1][0];
const I=[[1,0],[0,1]];
const F=[[1,0],[1,-1]]; // placement A2 reflection
const X=[[0,1],[1,0]]; // Higgs population swap
const D=[[1,0],[0,-1]]; // hchi aggregate sign, up to overall sign
const P=[[1,1],[0,1]]; // unimodular placement-to-Higgs intertwiner
const S=[[2,0],[1,1]]; // placement reflection eigenbasis
const W=[[1,1],[1,-1]]; // unnormalized Walsh/Hadamard eigenbasis of X
assert.ok(eq(mm(F,P),mm(P,X)));
assert.ok(eq(mm(F,S),mm(S,D)));
assert.ok(eq(mm(X,W),mm(W,D)));
assert.equal(det(P),1); assert.equal(det(S),2); assert.equal(det(W),-2);

const PpF=[[1,0],[.5,0]], PmF=[[0,0],[-.5,1]];
const PpX=[[.5,.5],[.5,.5]], PmX=[[.5,-.5],[-.5,.5]];
const PpD=[[1,0],[0,0]], PmD=[[0,0],[0,1]];
for(const [R,A,B] of [[P,F,X],[S,F,D],[W,X,D]])assert.ok(eq(mm(R,B),mm(A,R)));
for(const [plus,minus] of [[PpF,PmF],[PpX,PmX],[PpD,PmD]]){
  assert.ok(eq(mm(plus,plus),plus)&&eq(mm(minus,minus),minus));
  assert.ok(eq(mm(plus,minus),[[0,0],[0,0]]));
}
assert.ok(eq(mm(PpF,P),mm(P,PpX))&&eq(mm(PmF,P),mm(P,PmX)));
assert.ok(eq(mm(PpF,S),mm(S,PpD))&&eq(mm(PmF,S),mm(S,PmD)));
assert.ok(eq(mm(PpX,W),mm(W,PpD))&&eq(mm(PmX,W),mm(W,PmD)));

// Smith nonzero invariant of A-I for rank-one 2x2 matrices is gcd of entries.
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a};
const smithOne=A=>A.flat().reduce(gcd,0);
const minusI=A=>A.map((r,i)=>r.map((x,j)=>x-(i===j)));
const smith={placement:smithOne(minusI(F)),higgsSwap:smithOne(minusI(X)),hchiSign:smithOne(minusI(D))};
assert.deepEqual(smith,{placement:1,higgsSwap:1,hchiSign:2});

console.log(JSON.stringify({
  protocol:'placement-higgs-hchi-reflection-intertwiners/1',
  reflections:{placement:F,higgsPopulationSwap:X,hchiAggregateSign:D},
  intertwiners:{placementToHiggs:{matrix:P,determinant:det(P),unimodular:true},placementToHchiEigenbasis:{matrix:S,determinant:det(S),unimodular:false,index:2},higgsToHchiWalshBasis:{matrix:W,determinant:det(W),unimodular:false,index:2}},
  projectors:{placement:{plus:PpF,minus:PmF},higgs:{plus:PpX,minus:PmX},hchi:{plus:PpD,minus:PmD}},
  smithOfReflectionMinusIdentity:smith,
  theorem:'The placement reflection and Higgs population swap are GL(2,Z)-conjugate. The hchi sign is their diagonal eigenbasis form only after an index-two transform; no GL(2,Z) conjugacy to D exists.',
  physicalBoundary:'This identifies the Higgs ray as the strongest integral source of the face reflection. It does not derive the silver eigenvalues or prove the hchi grading is inserted dynamically.',
  passed:true
},null,2));
