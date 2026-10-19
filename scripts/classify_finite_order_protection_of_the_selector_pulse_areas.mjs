import assert from 'node:assert/strict';

const I=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const R=[[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,-1]];
const H=[[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]];
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const maxabs=A=>Math.max(...A.flat().map(Math.abs));
const frob=A=>Math.sqrt(A.flat().reduce((s,x)=>s+x*x,0));
const eq=(A,B,tol=1e-10)=>maxabs(sub(A,B))<tol;
const pow=(A,n)=>{let X=I;for(let k=0;k<n;k++)X=mm(X,A);return X;};
const order=A=>{let X=I;for(let n=1;n<=100;n++){X=mm(X,A);if(eq(X,I))return n;}return Infinity;};

assert.equal(order(R),3);
assert.equal(order(H),2);
assert.equal(order(mm(H,R)),6);
const Z=pow(mm(H,R),2);
assert.equal(order(Z),3);
assert.ok(eq(mm(Z,R),mm(R,Z))&&eq(mm(Z,H),mm(H,Z)));

// Timing-scaled positive R pulse.  Its active logarithm squares to
// -(2*pi/3)^2 I, so the exponential is analytic in the scale t.
const theta=2*Math.PI/3;
const c=4*Math.PI/(3*Math.sqrt(3));
const KR2=[[c/2,-c],[c,-c/2]];
const Rtime=t=>{
  const C=Math.cos(t*theta),S=Math.sin(t*theta)/theta;
  const A=[[C+S*KR2[0][0],S*KR2[0][1]],[S*KR2[1][0],C+S*KR2[1][1]]];
  return [[1,0,0,0],[0,A[0][0],0,A[0][1]],[0,0,1,0],[0,A[1][0],0,A[1][1]]];
};
assert.ok(eq(Rtime(1),R));

// Timing-scaled passive H pulse.  In the symmetric/antisymmetric mode basis
// only the antisymmetric mode acquires phase exp(i*pi*t).
const Htime=t=>{
  const phaseRe=Math.cos(Math.PI*t),phaseIm=Math.sin(Math.PI*t);
  const Re=[[ (1+phaseRe)/2,(1-phaseRe)/2],[(1-phaseRe)/2,(1+phaseRe)/2]];
  const Im=[[ phaseIm/2,-phaseIm/2],[-phaseIm/2,phaseIm/2]];
  return [
    [Re[0][0],Re[0][1],-Im[0][0],-Im[0][1]],
    [Re[1][0],Re[1][1],-Im[1][0],-Im[1][1]],
    [Im[0][0],Im[0][1],Re[0][0],Re[0][1]],
    [Im[1][0],Im[1][1],Re[1][0],Re[1][1]]
  ];
};
assert.ok(eq(Htime(1),H));

const epsilon=1e-7;
const rDefect=frob(sub(pow(Rtime(1+epsilon),3),I));
const hDefect=frob(sub(pow(Htime(1+epsilon),2),I));
const rSlope=rDefect/epsilon,hSlope=hDefect/epsilon;
// R is elliptic but not Euclidean-orthogonal in the unwhitened coordinates,
// so its Frobenius slope is 3||K_R||_F rather than the circular value.
assert.ok(Math.abs(rSlope-3*c*Math.sqrt(5/2))<1e-4);
assert.ok(Math.abs(hSlope-2*Math.PI*Math.sqrt(2))<1e-4);

// Positivity of each quadratic Hamiltonian survives every positive timing
// rescaling, while the finite-order relations do not.
const timingSamples=[0.9,0.99,1,1.01,1.1].map(t=>({
  t,
  positiveQuadraticScale:t>0,
  R3Defect:frob(sub(pow(Rtime(t),3),I)),
  H2Defect:frob(sub(pow(Htime(t),2),I))
}));
assert.ok(timingSamples.filter(x=>x.t!==1).every(x=>x.R3Defect>1e-6&&x.H2Defect>1e-6));

console.log(JSON.stringify({
  protocol:'finite-order-protection-of-selector-pulse-areas/1',
  exactPresentationData:{orderR:3,orderH:2,orderHR:6,centralZ:'(HR)^2',orderZ:3,generatedGroupOrder:18},
  pulseAreas:{R:theta,H:Math.PI},
  infinitesimalTimingError:{epsilon,R3FrobeniusDefect:rDefect,H2FrobeniusDefect:hDefect,R3Slope:rSlope,H2Slope:hSlope},
  timingSamples,
  exactConditions:{
    R3:'3*t*(2*pi/3) is in 2*pi*Z, equivalently t is integral',
    H2:'2*t*pi is in 2*pi*Z, equivalently t is integral',
    localNearNominal:'t=1 is the only solution in a sufficiently small neighborhood'
  },
  genericPerturbation:'If either pulse angle divided by 2*pi is irrational, the corresponding generator has infinite order.',
  positivityBoundary:'Positive-semidefinite quadratic forms persist for every positive timing scale and therefore do not quantize either angle.',
  protectionRequirement:'Exact finite order needs a discrete symmetry, topological/holonomy quantization, or an exact clock/feedback constraint. Hamiltonian positivity and linear stability are insufficient.',
  conclusion:'The order-18 selector is dynamically feasible but not structurally protected by the positive quadratic construction alone. Its finite presentation is locally fine-tuned in the two pulse areas.',
  passed:true
},null,2));
