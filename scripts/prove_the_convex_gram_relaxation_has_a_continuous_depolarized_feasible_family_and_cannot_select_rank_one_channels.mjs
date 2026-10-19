import assert from 'node:assert/strict';

const checkpoint=[
  {projector:'P0',handle:2*0.9365327081761695-1,side:2*0.29181450639011813-1,cell:'CR'},
  {projector:'P1',handle:2*0.8590875421771935-1,side:2*0.6583741528870738-1,cell:'CL'},
  {projector:'P2',handle:2*0.15536151359175113-1,side:2*0.9515781350035442-1,cell:'DL'},
  {projector:'P3',handle:2*0.049018236054885526-1,side:2*0.09823320571926383-1,cell:'DR'},
];
const desired={CR:{h:1,s:-1},CL:{h:1,s:1},DL:{h:-1,s:1},DR:{h:-1,s:-1}};
assert.ok(checkpoint.every(x=>desired[x.cell].h*x.handle>0&&desired[x.cell].s*x.side>0));

const epsilons=[0,0.25,0.75,0.99,1];
const family=epsilons.map(epsilon=>{
  const channels=checkpoint.map(x=>{
    // Q_f(epsilon)=(1-epsilon)P_pi(f)+epsilon I/4. Both gradings are traceless.
    const handle=(1-epsilon)*x.handle,side=(1-epsilon)*x.side;
    const purity=(1-epsilon)**2+2*(1-epsilon)*(epsilon/4)+epsilon**2/4;
    return{cell:x.cell,handle,side,purity,strictlyFeasible:desired[x.cell].h*handle>0&&desired[x.cell].s*side>0};
  });
  return{epsilon,channels,allStrict:channels.every(x=>x.strictlyFeasible)};
});
assert.ok(family.slice(0,-1).every(x=>x.allStrict));
assert.equal(family.at(-1).allStrict,false);
assert.ok(family[1].channels.every(x=>x.purity<1));

// Coefficient matrix in the checkpoint spectral algebra is doubly stochastic:
// W=(1-epsilon)I+epsilon J/4.  This proves positivity, unit trace and sum Q_f=I.
const rowColumnAudit=epsilons.map(epsilon=>{
  const W=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>(1-epsilon)*(i===j?1:0)+epsilon/4));
  const rows=W.map(r=>r.reduce((a,b)=>a+b,0));
  const cols=W[0].map((_,j)=>W.reduce((a,r)=>a+r[j],0));
  assert.ok(W.flat().every(x=>x>=0));
  assert.ok([...rows,...cols].every(x=>Math.abs(x-1)<1e-12));
  return{epsilon,minimumCoefficient:Math.min(...W.flat()),rows,columns:cols};
});

console.log(JSON.stringify({
  protocol:'convex-gram-relaxation-nonselection/1',
  imposedConvexConstraints:[
    'Q_f positive semidefinite',
    'Tr Q_f=1',
    'sum_f Q_f=I',
    'Q_f commutes with the checkpoint scattering matrix',
    'each Q_f has the prescribed strict handle and side bias signs',
  ],
  construction:'Q_f(epsilon)=(1-epsilon)P_pi(f)+epsilon I/4, 0<=epsilon<1',
  family,
  rowColumnAudit,
  rankOneEndpoint:'epsilon=0 only',
  excludedNonconvexCondition:'Tr(Q_f^2)=1, equivalently rank(Q_f)=1 for a positive unit-trace Q_f',
  conclusion:'The natural SDP relaxation is continuously feasible all the way from the spectral permutation to the maximally mixed boundary. It can test compatibility and optimize margin, but cannot derive purity, multiplicativity, or a unique source-to-projector map.',
  boundary:'Additional affine covariance constraints may shrink this family, but any derivation of primitive spectral channels must ultimately restore rank one/order-isomorphism or an equivalent nonconvex algebraic condition.',
  passed:true,
},null,2));
