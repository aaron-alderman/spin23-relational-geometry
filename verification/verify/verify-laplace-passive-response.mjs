#!/usr/bin/env node

const gcd=(a,b)=>b===0n?(a<0n?-a:a):gcd(b,a%b);
const F=(n,d=1n)=>{n=BigInt(n);d=BigInt(d);if(d<0n){n=-n;d=-d;}const g=gcd(n,d);return[n/g,d/g];};
const add=(a,b)=>F(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
const sub=(a,b)=>F(a[0]*b[1]-b[0]*a[1],a[1]*b[1]);
const mul=(a,b)=>F(a[0]*b[0],a[1]*b[1]);
const div=(a,b)=>F(a[0]*b[1],a[1]*b[0]);
const eq=(a,b)=>a[0]===b[0]&&a[1]===b[1];
const show=a=>a[1]===1n?`${a[0]}`:`${a[0]}/${a[1]}`;

// m=1, Laplace s=3/4, kappa=sqrt(m^2+s^2)=5/4,
// and choose L=(4/5)log(3), so kappa L=log(3).
const m=F(1),sLaplace=F(3,4),kappa=F(5,4);
const cosh=F(5,3),sinh=F(4,3);
const scale=div(kappa,sinh);
const X=[[mul(scale,cosh),mul(scale,F(-1))],[mul(scale,F(-1)),mul(scale,cosh)]];
const Z=X.map(r=>r.map(x=>div(x,sLaplace)));
const eigen=M=>({even:add(M[0][0],M[0][1]),odd:sub(M[0][0],M[0][1])});
const xEig=eigen(X),zEig=eigen(Z);
const kappaSquared=mul(kappa,kappa);
const expectedKappaSquared=add(mul(m,m),mul(sLaplace,sLaplace));

const report={
  protocol:"laplace-passive-two-boundary-response/1",
  parameters:{mass:show(m),laplaceFrequency:show(sLaplace),kappa:show(kappa),length:"(4/5)log(3)"},
  dispersionCheck:{kappaSquared:show(kappaSquared),massSquaredPlusS2:show(expectedKappaSquared)},
  forceResponse: X.map(r=>r.map(show)),
  forceResponseEigenvalues:{even:show(xEig.even),odd:show(xEig.odd)},
  impedanceFromBoundaryVelocity:Z.map(r=>r.map(show)),
  impedanceEigenvalues:{even:show(zEig.even),odd:show(zEig.odd)},
  positiveRealAxisCheck:zEig.even[0]>0n&&zEig.odd[0]>0n,
  conclusion:"The causal Laplace-domain boundary impedance is X(s)/s, not X(s); its positive-real property replaces static Euclidean cone positivity."
};
report.passed=eq(kappaSquared,expectedKappaSquared)&&eq(xEig.even,F(5,8))&&
  eq(xEig.odd,F(5,2))&&eq(zEig.even,F(5,6))&&eq(zEig.odd,F(10,3))&&report.positiveRealAxisCheck;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
