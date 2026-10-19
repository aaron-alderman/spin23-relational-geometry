import assert from 'node:assert/strict';

const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const inverse2=([[a,b],[c,d]])=>{const q=a*d-b*c;return [[d/q,-b/q],[-c/q,a/q]];};
const rank=A=>{const M=A.map(r=>r.map(Number));let row=0;for(let c=0;c<M[0].length&&row<M.length;c++){let p=row;while(p<M.length&&Math.abs(M[p][c])<1e-10)p++;if(p===M.length)continue;[M[row],M[p]]=[M[p],M[row]];const d=M[row][c];M[row]=M[row].map(x=>x/d);for(let i=0;i<M.length;i++)if(i!==row){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[row][j]);}row++;}return row;};

const C=[[0,-1],[1,-1]];
const Cinv=mm(C,C);
assert.deepEqual(mm(C,Cinv),eye(2));

// Solve C^T G C=G for G=[[a,b],[b,c]].  Build the homogeneous linear
// constraint matrix by evaluating the three basis symmetric matrices.
const symBasis=[[[1,0],[0,0]],[[0,1],[1,0]],[[0,0],[0,1]]];
const defects=symBasis.map(G=>add(mm(mm(tr(C),G),C),scale(-1,G)));
const equations=[];
for(const [i,j] of [[0,0],[0,1],[1,1]])equations.push(defects.map(D=>D[i][j]));
assert.equal(rank(equations),2);
const invariantMetricDimension=3-rank(equations);
assert.equal(invariantMetricDimension,1);

const G=[[2,-1],[-1,2]];
assert.deepEqual(mm(mm(tr(C),G),C),G);

const D=add(eye(2),scale(-1,C));
const Dreverse=add(eye(2),scale(-1,Cinv));
const Ddag=mm(mm(inverse2(G),tr(D)),G);
assert.deepEqual(Ddag,Dreverse);
const Delta=mm(Ddag,D);
const DeltaReverse=mm(D,Ddag);
assert.deepEqual(Delta,scale(3,eye(2)));
assert.deepEqual(DeltaReverse,Delta);

// The incidence-selected multiplicity relation uses the eigenvalue of this
// kinetic operator, but the selector equation itself is additional data.
const selected={u:1,d:1,uc:-1,dc:3};
assert.equal(3*selected.d-selected.dc,0);

console.log(JSON.stringify({
  protocol:'c3-invariant-hodge-metric-and-selector-orientation/1',
  augmentationColorAction:C,
  invariantSymmetricMetricDimension:invariantMetricDimension,
  primitiveInvariantMetric:G,
  forwardDifference:D,
  metricAdjointDifference:Ddag,
  reverseDifference:Dreverse,
  hodgeLaplacian:Delta,
  hodgeLaplacianOnI:'3 identity',
  orientationReversedLaplacian:DeltaReverse,
  orientationReversalChangesLaplacian:false,
  selectorConstitutiveEquation:'D^dagger D d = dc',
  selectorEquationForcedByTopology:false,
  conclusion:'C3 covariance fixes the positive augmentation metric up to scale and makes the color Laplacian canonically 3I. The equation matching that Laplacian to dc is nevertheless constitutive/dynamical, and orientation reversal cannot supply the remaining Z2 saturation because the Laplacian is orientation even.',
  passed:true
},null,2));
