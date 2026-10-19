import assert from "node:assert/strict";

const tau=2*Math.PI;
const near=(a,b,tol=1e-10)=>Math.abs(a-b)<tol;
const phase=x=>({re:Math.cos(x),im:Math.sin(x)});
const mul=(a,b)=>({re:a.re*b.re-a.im*b.im,im:a.re*b.im+a.im*b.re});
const pow=(a,n)=>{let r={re:1,im:0};for(let k=0;k<n;k++)r=mul(r,a);return r;};
const same=(a,b)=>near(a.re,b.re)&&near(a.im,b.im);

const omega=phase(tau/9);
const lambda=phase(Math.PI/6);
const gColour=phase(Math.PI/18);
const gLepton=phase(-Math.PI/6);

assert(same(mul(lambda,gColour),omega));
assert(same(mul(lambda,gLepton),{re:1,im:0}));
assert(same(mul(pow(gColour,3),gLepton),{re:1,im:0})); // det g=1

const U=[omega,omega,omega,{re:1,im:0}];
const detU=U.reduce(mul,{re:1,im:0});
assert(same(detU,pow(omega,3)));

const gaugePowers=[];
for(let k=1;k<=9;k++){
  const determinant=pow(detU,k);
  if(same(determinant,{re:1,im:0}))gaugePowers.push(k);
}
assert.deepEqual(gaugePowers,[3,6,9]);

// Scalars coupling to two fundamental fermions transform in the inverse
// exterior/symmetric square.  cc and cl are the two Lambda^2 sectors.
const inverse=a=>({re:a.re,im:-a.im});
const scalarD=inverse(pow(omega,2));
const scalarT=inverse(omega);
assert(same(scalarD,pow(omega,7)));
assert(same(scalarT,pow(omega,8)));
assert(same(mul(scalarD,scalarT),pow(omega,6)));
const neutrinoRankOne=inverse(pow(U[3],2));
assert(same(neutrinoRankOne,{re:1,im:0}));

console.log(JSON.stringify({
  protocol:"z9-pati-salam-u4-factorization/1",
  omega:"exp(2 pi i/9)",
  factorization:{
    U:"diag(omega,omega,omega,1)",
    modulePhase:"lambda=exp(i pi/6)",
    su4Factor:"exp[(i pi/6) diag(1/3,1/3,1/3,-1)]",
    determinantSU4:1
  },
  conjugateModule:"U*=lambda^-1 g* gives charges (-1,-1,-1,0) mod 9",
  gaugePowers,
  faithfulGaugeInvariantQuotient:"Z9/<U^3> = Z3",
  inverseExteriorSquareCharges:{diquark:7,leptoquark:8,product:6},
  inverseSymmetricSquareNeutrinoCharge:0,
  theorem:"The low-energy Z9 generator is exactly a chiral module phase times a Pati-Salam SU(4) B-L gauge transformation; its cube is gauge, so its faithful action on gauge-invariant observables is Z3 baryon triality.",
  boundary:"Existence of the required opposite module phases on the complete finite real spectral triple is not proved by this representation-level factorization.",
  passed:true
},null,2));
