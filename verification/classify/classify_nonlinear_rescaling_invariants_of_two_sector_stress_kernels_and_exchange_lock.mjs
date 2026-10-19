import assert from 'node:assert/strict';

const rho=C=>C[0][1]/Math.sqrt(C[0][0]*C[1][1]);
const transform=(r,s,C)=>[[r*r*C[0][0],r*s*C[0][1]],[r*s*C[1][0],s*s*C[1][1]]];
const swap=C=>[[C[1][1],C[1][0]],[C[0][1],C[0][0]]];

const samples=[
  [[2,.5],[.5,3]],
  [[5,-1],[-1,4]],
  [[1,.9],[.9,1]],
  [[7,0],[0,2]]
];
for(const C of samples){
  assert.ok(C[0][0]>0&&C[1][1]>0&&C[0][0]*C[1][1]-C[0][1]**2>0);
  assert.ok(Math.abs(rho(C))<1);
  assert.ok(Math.abs(rho(transform(7/3,11/5,C))-rho(C))<1e-12);
  assert.ok(Math.abs(rho(swap(C))-rho(C))<1e-12);
}

// Many positive ratio functions obey the same normalization f(0)=1.
const functions={
  constant:r=>1,
  exponential:r=>Math.exp(r),
  evenQuadratic:r=>1+r*r,
  mobius:r=>(2+r)/(2-r)
};
for(const f of Object.values(functions)){
  assert.ok(Math.abs(f(0)-1)<1e-12);
  for(const C of samples)assert.ok(f(rho(C))>0);
}
assert.ok(new Set(Object.values(functions).map(f=>f(.4).toFixed(12))).size===4);

// If an exact sector swap exchanges a and b, the projective ratio q=b/a must
// map to 1/q. But rho is unchanged by the swap. Therefore q(rho)=1/q(rho);
// positivity forces q=1 pointwise.
for(const C of samples){
  const r=rho(C),q=functions.constant(r);
  assert.ok(Math.abs(q-1/q)<1e-12);
}
const exchangeEquivariantPositiveRatio='q(rho)=1';

console.log(JSON.stringify({
  protocol:'nonlinear-rescaling-invariants-and-sector-exchange-lock/1',
  positiveKernelInvariant:'rho=C_st/sqrt(C_ss*C_tt), with |rho|<1',
  invariantUnderIndependentPositiveRescaling:true,
  invariantUnderSectorSwap:true,
  positiveRatioFreedom:Object.keys(functions),
  commonNormalizationAtRhoZero:'all displayed functions have q(0)=1 but differ away from zero',
  withoutExchange:'q=b/a may be any positive function f(rho), so nonlinear naturality is infinitely underdetermined',
  withExactSectorExchange:exchangeEquivariantPositiveRatio,
  exchangeBoundary:'The required exchange is a symmetry of the two composite response operators, not the excluded linear map between the underlying SU(3) singlet and triplet fields.',
  orientationBoundary:'A positive ratio q cannot encode the sign of rho as an independent alternating direction; it only changes the relative scale of Ks and Kt.',
  conclusion:'Normalized cross stress does not select the symplectic pencil without a composite-sector exchange or a dynamical function f. If an exact composite exchange exists, positivity forces the equal-ratio line.',
  passed:true
},null,2));
