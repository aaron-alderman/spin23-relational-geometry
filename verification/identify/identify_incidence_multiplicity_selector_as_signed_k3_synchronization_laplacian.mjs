import assert from 'node:assert/strict';

const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const rank=A=>{const M=A.map(r=>r.map(Number));let row=0;for(let c=0;c<M[0].length&&row<M.length;c++){let p=row;while(p<M.length&&Math.abs(M[p][c])<1e-10)p++;if(p===M.length)continue;[M[row],M[p]]=[M[p],M[row]];const d=M[row][c];M[row]=M[row].map(x=>x/d);for(let i=0;i<M.length;i++)if(i!==row){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[row][j]);}row++;}return row;};

const M=[[4,-1,1],[-1,4,1],[1,1,4]];
const S=[[1,0,0],[0,1,0],[0,0,-1]];
const B=[
  [1,-1,0],
  [1,0,-1],
  [0,1,-1]
];
const LK3=mm(tr(B),B);
assert.deepEqual(LK3,[[2,-1,-1],[-1,2,-1],[-1,-1,2]]);
assert.deepEqual(mm(mm(S,M),S),add(scale(2,eye(3)),LK3));

const signedIncidence=mm(B,S);
assert.deepEqual(signedIncidence,[
  [1,-1,0],   // u-d
  [1,0,1],    // u+uc
  [0,1,1]     // d+uc, dependent on the first two
]);
assert.deepEqual(signedIncidence[2],signedIncidence[1].map((x,i)=>x-signedIncidence[0][i]));

const v=[1,1,-1];
assert.ok(mm(signedIncidence,v.map(x=>[x])).flat().every(x=>x===0));
assert.equal(rank(signedIncidence),2);

const vvT=v.map(x=>v.map(y=>x*y));
assert.deepEqual(add(scale(5,eye(3)),scale(-1,M)),vvT);
const E=scale(1/3,vvT);
assert.deepEqual(mm(E,E),E);

// Any positive weighting of a connected set of triangle edges preserves the
// exact signed-constant kernel.  Demonstrate symbolically with three distinct
// positive integer weights and with either spanning tree alone.
const weightedLaplacian=weights=>{
  const W=weights.map((w,i)=>weights.map((_,j)=>i===j?w:0));
  return mm(mm(tr(signedIncidence),W),signedIncidence);
};
for(const weights of [[2,5,7],[3,11,0],[13,0,17],[0,19,23]]){
  const L=weightedLaplacian(weights);
  assert.ok(mm(L,v.map(x=>[x])).flat().every(x=>x===0));
  assert.equal(rank(L),2);
}

// Disconnecting the multiplicity graph increases the kernel and destroys
// unique-copy selection.
const disconnected=weightedLaplacian([29,0,0]);
assert.equal(rank(disconnected),1);

// In switched coordinates y=Sx, the selected copy is y=(w,w,w).  Furey
// cycle closure dc=u+d-uc is exactly the sum of the three y nodes.
const selectedX=v;
const selectedY=mm(S,selectedX.map(x=>[x])).flat();
assert.deepEqual(selectedY,[1,1,1]);
const dc=selectedX[0]+selectedX[1]-selectedX[2];
assert.equal(dc,3);

console.log(JSON.stringify({
  protocol:'signed-k3-incidence-multiplicity-selector/1',
  incidenceMultiplicityOperator:M,
  signSwitch:S,
  completeGraphIncidence:B,
  signedConstraintIncidence:signedIncidence,
  identity:'S M S = 2 I + B^T B',
  primitiveSpanningTreeRows:['u-d','u+uc'],
  redundantThirdEdge:'d+uc=(u+uc)-(u-d)',
  selectedGenerator:v,
  switchedSelectedGenerator:selectedY,
  projector:E,
  projectorIdentity:'E=(5I-M)/3=vv^T/3',
  factorThreeFromCycleClosure:'dc=u+d-uc=y1+y2+y3=3w',
  positiveConnectedEdgeReweightingPreservesExactKernel:true,
  disconnectedGraphLosesUniqueSelection:true,
  conclusion:'The incidence selector is a signed K3 synchronization Laplacian plus a scalar shift. Its primitive cochain rows are spanning-tree edge differences, and the coefficient three follows directly by summing the three synchronized signed matter nodes.',
  passed:true
},null,2));
