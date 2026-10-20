import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-anchor-dynamical-ordering-interval-observable.json','utf8'));
const chamber=JSON.parse(readFileSync(
  'evidence/data/spin23-anchor-cut-weighted-robustness.json','utf8'));
const feshbach=JSON.parse(readFileSync(
  'evidence/data/spin23-sixteen-state-five-role-feshbach-resolvent.json','utf8'));
assert.equal(evidence.schema,'spin23.anchor-dynamical-ordering-interval-observable/1');
assert.equal(chamber.H16.irredundantFacetCount,6);
assert.equal(feshbach.forbiddenSupportAndCofactor.intervalProtectedResolventZero,false);

// The one-singlet potential is a sum of squares.  Its unique zero has sigma=1
// and lies strictly inside all six H16 anchor facets.
const a=1/4,eta=1,Lambda=1;
const vacuum={sigma:1,x:1,y:1-a,z:1,u:1+a,v:1+a,r:1,s:1};
const V=q=>(q.sigma*q.sigma-1)**2+eta*(q.sigma-1)**2+Lambda*(
  (q.x-1)**2+(q.z-1)**2+(q.r-1)**2+(q.s-1)**2+
  (q.y-(1-a*q.sigma))**2+(q.u-(1+a*q.sigma))**2+
  (q.v-(1+a*q.sigma))**2);
assert.equal(V(vacuum),0);
for(const q of [
  {...vacuum,sigma:-1}, {...vacuum,y:1}, {...vacuum,u:1},
  {...vacuum,sigma:0.9,y:0.8,u:1.2,v:1.2}
])assert.ok(V(q)>0);

const margins=q=>[
  q.u-q.y,q.v-q.y,q.x+q.z-q.y,q.x+q.r-q.y,q.x+q.s-q.y,q.r+q.s-q.y
];
assert.deepEqual(margins(vacuum),[0.5,0.5,1.25,1.25,1.25,1.25]);
assert.equal(Math.min(...margins(vacuum)),evidence.orderingModel.witness.minimumFacetMargin);

// Positive definiteness follows from the exact Schur complement.  The four
// spectator weights and y,u,v have diagonal 2 Lambda; after eliminating y,u,v
// the remaining sigma entry is 8+2 eta.
const sigmaDiagonal=8+2*eta+6*Lambda*a*a;
const mixedSquaredSum=3*(2*Lambda*a)**2/(2*Lambda);
assert.equal(sigmaDiagonal-mixedSquaredSum,8+2*eta);
assert.ok(sigmaDiagonal-mixedSquaredSum>0);

// The recorded L-infinity radius is sharp at the two one-edge facets: shifts
// just inside preserve the chamber, while opposite shifts at the boundary tie.
const perturb=(d)=>({...vacuum,y:vacuum.y+d,u:vacuum.u-d,v:vacuum.v-d,
  x:vacuum.x-d,z:vacuum.z-d,r:vacuum.r-d,s:vacuum.s-d});
assert.ok(margins(perturb(0.249)).every(m=>m>0));
assert.equal(margins(perturb(0.25))[0],0);
assert.equal(evidence.orderingModel.witness.independentWeightLinfinityRadius,0.25);

const inv=M=>{
  const n=M.length,A=M.map((row,i)=>[...row,...Array.from({length:n},(_,j)=>i===j?1:0)]);
  for(let c=0;c<n;c++){
    let p=c;while(p<n&&Math.abs(A[p][c])<1e-12)p++;
    assert.ok(p<n);[A[p],A[c]]=[A[c],A[p]];
    const pivot=A[c][c];A[c]=A[c].map(x=>x/pivot);
    for(let i=0;i<n;i++)if(i!==c){const f=A[i][c];A[i]=A[i].map((x,j)=>x-f*A[c][j]);}
  }
  return A.map(row=>row.slice(n));
};
const close=(x,y,tol=1e-9)=>Math.abs(x-y)<tol;
const grading=evidence.intervalObservable.grading;

function sheet(p,diagonal=0){
  const {x,y,g,h,u,v,w}=p;
  const D=Array.from({length:8},()=>Array(8).fill(0));
  for(const [i,j,q] of [[0,1,x],[1,2,y],[2,3,g],[3,4,h],[3,5,u],[4,6,v],[5,7,w]])
    D[i][j]=D[j][i]=q;
  D[0][0]=diagonal;
  return D;
}
const resolvent=(D,z)=>inv(D.map((row,i)=>row.map((q,j)=>(i===j?z:0)-q)));
const chiralDefect=D=>Math.max(...D.flatMap((row,i)=>row.map((q,j)=>Math.abs((grading[i]*grading[j]+1)*q))));

// Chiral anticommutation makes every same-grade resolvent entry odd in z.
// In particular I-N=(0,2) and P-P=(1,1) obey the interval pairing, despite
// being generically nonzero away from zero.
for(const p of [
  {x:2,y:3,g:5,h:7,u:11,v:13,w:17},
  {x:-2,y:5,g:3,h:-4,u:6,v:7,w:9}
]){
  const D=sheet(p);
  assert.equal(chiralDefect(D),0);
  for(const z of [1.25,2.5,6.5]){
    const Gp=resolvent(D,z),Gm=resolvent(D,-z);
    for(let i=0;i<8;i++)for(let j=0;j<8;j++)
      assert.ok(close(grading[i]*grading[j]*Gp[i][j],-Gm[i][j],1e-8));
    assert.ok(close(Gp[0][2],-Gm[0][2],1e-8));
    assert.ok(close(Gp[1][1],-Gm[1][1],1e-8));
  }
  assert.ok(Math.abs(resolvent(D,1.25)[0][2])>1e-8);
}

// A same-grade diagonal perturbation breaks both the grading and the paired
// identity.  This records the exact robustness boundary rather than silently
// treating the sum rule as generic.
const broken=sheet({x:2,y:3,g:5,h:7,u:11,v:13,w:17},0.2);
assert.ok(chiralDefect(broken)>0);
const Bp=resolvent(broken,1.25),Bm=resolvent(broken,-1.25);
assert.ok(Math.abs(Bp[0][2]+Bm[0][2])>1e-8);

// With complex Hermitian edge phases the ordered retarded/advanced identity
// remains exact, but an ordered off-diagonal retarded integral need not be
// odd by itself.  The reciprocal symmetrization is the phase-robust object.
const complexResolvent=(edges,E,eps)=>{
  const n=8,Re=Array.from({length:n},()=>Array(n).fill(0));
  const Im=Array.from({length:n},()=>Array(n).fill(0));
  for(const [i,j,re,im] of edges){
    Re[i][j]=Re[j][i]=re; Im[i][j]=im; Im[j][i]=-im;
  }
  const A=Re.map((row,i)=>row.map((x,j)=>(i===j?E:0)-x));
  const B=Im.map((row,i)=>row.map((x,j)=>(i===j?eps:0)-x));
  const block=Array.from({length:2*n},(_,i)=>Array.from({length:2*n},(_,j)=>{
    if(i<n&&j<n)return A[i][j];
    if(i<n&&j>=n)return -B[i][j-n];
    if(i>=n&&j<n)return B[i-n][j];
    return A[i-n][j-n];
  }));
  const R=inv(block);
  return (i,j)=>[R[i][j],R[i+n][j]];
};
const complexEdges=[
  [0,1,2,1],[1,2,3,-0.5],[2,3,5,0.75],[3,4,7,0],
  [3,5,11,-1],[4,6,13,0.25],[5,7,17,-0.4]
];
const energy=5,eps=0.3;
const GRp=complexResolvent(complexEdges,energy,eps);
const GRm=complexResolvent(complexEdges,-energy,eps);
const GAm=complexResolvent(complexEdges,-energy,-eps);
for(const [i,j] of [[0,2],[1,1]]){
  const a=GRp(i,j),b=GAm(i,j);
  assert.ok(close(a[0],-b[0],1e-8)&&close(a[1],-b[1],1e-8));
}
const orderedPair=GRp(0,2)[0]+GRm(0,2)[0];
assert.ok(Math.abs(orderedPair)>1e-8);
const symPair=(GRp(0,2)[0]+GRp(2,0)[0]+GRm(0,2)[0]+GRm(2,0)[0])/2;
assert.ok(close(symPair,0,1e-8));

assert.equal(evidence.decision.orderingDerivedFromExistingSpin23Data,false);
assert.match(evidence.decision.intervalLevelReplacement,/chiral energy-reflection/);
assert.match(evidence.intervalObservable.dispersiveIntervalObservable,/positive real \(reciprocal\)/);
assert.match(evidence.intervalObservable.generalHermitianDispersiveObservable,/G\^R_ji/);
assert.match(evidence.intervalObservable.robustness,/symmetrization is exact for arbitrary phases/);
assert.match(evidence.boundary,/does not provide the physical Pati-Salam lift/);

console.log('PASS 1558: one biased real singlet gives a unique positive stable vacuum strictly inside all six H16 anchor facets, with an open robustness radius. The chiral sheet has exact retarded/advanced energy reflection; real-reciprocal weights give the ordered even-window sum rule, while arbitrary complex Hermitian phases require reciprocal symmetrization. There is no pointwise interval zero, and same-grade terms break the sum rule.');
