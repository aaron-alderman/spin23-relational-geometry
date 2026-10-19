import assert from 'node:assert/strict';

const m=0.08389390482432013;
const normalizedMapSufficientError=m/4;
const kappaMaximumWithNoUnitaryError=(1+normalizedMapSufficientError)/(1-normalizedMapSufficientError);
const budget=kappa=>{
  const r=(kappa-1)/(kappa+1);
  const allowedUnitaryError=(normalizedMapSufficientError-r)/(1+r);
  return{kappa,positiveFactorError:r,allowedUnitaryError};
};
const budgets=[1,1.005,1.01,1.02,1.04,kappaMaximumWithNoUnitaryError].map(budget);
assert.ok(budgets.slice(0,-1).every(x=>x.allowedUnitaryError>0));
assert.ok(Math.abs(budgets.at(-1).allowedUnitaryError)<1e-12);

// Direct two-dimensional examples.
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const mv=(A,v)=>A.map(r=>r.reduce((s,x,j)=>s+x*v[j],0));
const norm=v=>Math.hypot(...v),normalize=v=>{const n=norm(v);return v.map(x=>x/n);};
const expectation=v=>v[0]*v[0]-v[1]*v[1];
const rot=a=>[[Math.cos(a),-Math.sin(a)],[Math.sin(a),Math.cos(a)]];
const theta=.5*Math.acos(m),v=[Math.cos(theta),Math.sin(theta)];
const examples=[
  {kappa:1.01,eta:.01},
  {kappa:1.02,eta:.008},
  {kappa:1.04,eta:.001},
].map(({kappa,eta})=>{
  const alpha=2*Math.asin(eta/2),W=rot(alpha),U=[[kappa,0],[0,1]],A=mm(W,U),w=normalize(mv(A,v));
  const b=budget(kappa),epsilonBound=(1+b.positiveFactorError)*eta+b.positiveFactorError;
  assert.ok(eta<b.allowedUnitaryError);assert.ok(epsilonBound<normalizedMapSufficientError);assert.ok(expectation(w)>0);
  return{kappa,unitaryOperatorError:eta,combinedScaledMapErrorBound:epsilonBound,resultingFluxImbalance:expectation(w)};
});

console.log(JSON.stringify({
  protocol:'polar-source-map-orientation-stability-budget/1',
  orbitMinimumFluxImbalance:m,
  normalizedVectorLemma:'If ||cA-I||<=epsilon, then ||Av/||Av||-v||<=2epsilon and the grading expectation changes by at most 4epsilon.',
  sufficientScaledMapError:normalizedMapSufficientError,
  polarBound:'For A=WU, kappa=smax(U)/smin(U), r=(kappa-1)/(kappa+1), optimal c=2/(smax+smin): ||cA-I|| <= r+(1+r)||W-I||.',
  maximumConditionNumberWithPerfectUnitaryFactor:kappaMaximumWithNoUnitaryError,
  budgets,
  directExamples:examples,
  conclusion:'A general invertible source map preserves every orbit-wide orientation sign if its optimally scaled polar error satisfies r+(1+r)eta<m/4. With no unitary error this certificate allows condition number below 1.04284557; increasing anisotropy consumes the coherent rotation budget.',
  boundary:'This is a sufficient uniform bound, not a sharp joint condition-number/rotation theorem. It assumes invertibility, rank-one separately normalized sources and a common positive polar factor.',
  passed:true,
},null,2));
