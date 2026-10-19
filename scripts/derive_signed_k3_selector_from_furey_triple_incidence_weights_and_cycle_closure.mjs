import assert from 'node:assert/strict';

const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const diag=v=>v.map((x,i)=>v.map((_,j)=>i===j?x:0));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const inverse=A=>{const n=A.length,M=A.map((r,i)=>[...r,...eye(n)[i]]);for(let c=0;c<n;c++){let p=c;while(p<n&&Math.abs(M[p][c])<1e-12)p++;assert(p<n);[M[c],M[p]]=[M[p],M[c]];const d=M[c][c];M[c]=M[c].map(x=>x/d);for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[c][j]);}}return M.map(r=>r.slice(n));};
const eq=(A,B,t=1e-10)=>A.every((r,i)=>r.every((x,j)=>Math.abs(x-B[i][j])<t));
const mv=(A,v)=>A.map(r=>r.reduce((s,x,j)=>s+x*v[j],0));
const parallel=(a,b)=>a.every((x,i)=>Math.abs(x*b[0]-b[i]*a[0])<1e-10);

// Independent multiplicities x=(u,d,uc), with dc=v^T x for v=(1,1,-1).
const v=[1,1,-1];
const vvT=v.map(x=>v.map(y=>x*y));
const H=add(eye(3),vvT); // coordinate Gram from u,d,uc,dc
assert.deepEqual(H,[[2,1,-1],[1,2,-1],[-1,-1,2]]);
assert.deepEqual(mv(H,v),v.map(x=>4*x));

const response=(a,b,c,e)=>add(diag([a,b,c]),scale(e,vvT));
const compressed=(a,b,c,e)=>mm(inverse(H),response(a,b,c,e));

// General invariance theorem: v is a generalized eigenvector iff the three
// primary sector weights are equal. Verify across a complete bounded census.
const census=[];
for(let a=0;a<=4;a++)for(let b=0;b<=4;b++)for(let c=0;c<=4;c++)for(let e=0;e<=3;e++){
  const preserves=parallel(mv(compressed(a,b,c,e),v),v);
  assert.equal(preserves,a===b&&b===c);
  census.push({a,b,c,e,preserves});
}

// Closed formula when primary weights coincide at A and the derived dc
// sector has weight E.
for(const [A,E] of [[5,1],[7,2],[3,3],[2,6]]){
  const beta=(E-A)/4;
  const formula=add(scale(A,eye(3)),scale(beta,vvT));
  assert.ok(eq(compressed(A,A,A,E),formula));
}

// Furey triple-incidence weights: u,d,uc have weight 5 and dc has weight 1.
const M=compressed(5,5,5,1);
assert.ok(eq(M,[[4,-1,1],[-1,4,1],[1,1,4]]));

const S=diag([1,1,-1]);
const J=Array.from({length:3},()=>Array(3).fill(1));
const LK3=add(scale(3,eye(3)),scale(-1,J));
assert.ok(eq(mm(mm(S,M),S),add(scale(2,eye(3)),LK3)));

const generalSignedFormula=(A,E)=>{
  const ground=(A+3*E)/4;
  const edge=(A-E)/4;
  return add(scale(ground,eye(3)),scale(edge,LK3));
};
for(const [A,E] of [[5,1],[7,2],[3,3],[2,6]]){
  assert.ok(eq(mm(mm(S,compressed(A,A,A,E)),S),generalSignedFormula(A,E)));
}

const lowEigenvalue=(5+3*1)/4;
const transverseEigenvalue=5;
const gap=transverseEigenvalue-lowEigenvalue;
assert.equal(lowEigenvalue,2);
assert.equal(gap,3);

console.log(JSON.stringify({
  protocol:'furey-triple-incidence-plus-cycle-closure-to-signed-k3/1',
  independentCoordinates:['u','d','uc'],
  derivedCoordinate:'dc=u+d-uc=v^T x',
  cycleVector:v,
  coordinateGram:H,
  generalResponseGram:'diag(a,b,c)+e vv^T',
  preservationTheorem:'The selected line Zv is invariant iff a=b=c; the dc weight e is arbitrary.',
  boundedCensusCases:census.length,
  boundedCensusPassed:true,
  equalPrimaryClosedForm:'H^{-1}(A I + E vv^T)=A I + ((E-A)/4) vv^T',
  signSwitchedClosedForm:'S M(A,E) S=((A+3E)/4) I + ((A-E)/4) L_K3',
  fureyWeights:{u:5,d:5,uc:5,dc:1},
  fureyCompressedOperator:M,
  fureySignedForm:'2 I + L_K3',
  lowEigenvalue,
  transverseEigenvalue,
  gap,
  uniqueLowModeCondition:'A>E',
  degeneracyCondition:'A=E makes the operator scalar and removes selection',
  inversionCondition:'A<E makes the synchronized mode the high rather than low mode',
  conclusion:'The signed K3 selector is forced algebraically by the equal 5 weights produced on u,d,uc by the established Furey triple incidence, the lower dc weight 1, and the cycle-closure embedding dc=u+d-uc. Unequal primary weights are exactly the obstruction.',
  caveat:'This derives the selector from the established incidence classifier, but the classifier still needs an action, trace, or Ward derivation to become a physical response operator.',
  passed:true
},null,2));
