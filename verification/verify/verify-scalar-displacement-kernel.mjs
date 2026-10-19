#!/usr/bin/env node

const gcd=(a,b)=>b===0n?(a<0n?-a:a):gcd(b,a%b);
const F=(n,d=1n)=>{n=BigInt(n);d=BigInt(d);if(d<0n){n=-n;d=-d;}const g=gcd(n,d);return[n/g,d/g];};
const add=(a,b)=>F(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
const sub=(a,b)=>F(a[0]*b[1]-b[0]*a[1],a[1]*b[1]);
const mul=(a,b)=>F(a[0]*b[0],a[1]*b[1]);
const eq=(a,b)=>a[0]===b[0]&&a[1]===b[1];
const show=a=>a[1]===1n?`${a[0]}`:`${a[0]}/${a[1]}`;

// m=1, L=log(3): tanh(L/2)=1/2, sinh(L/2)^2=1/3.
const dEven=F(3,8);       // (1/2) sech^2(L/2)
const dOdd=F(-3,2);       // -(1/2) csch^2(L/2)
const diagonal=mul(F(1,2),add(dEven,dOdd));
const offDiagonal=mul(F(1,2),sub(dEven,dOdd));
const D=[[diagonal,offDiagonal],[offDiagonal,diagonal]];
const determinant=sub(mul(diagonal,diagonal),mul(offDiagonal,offDiagonal));
const trace=add(diagonal,diagonal);
const recoveredEven=add(diagonal,offDiagonal);
const recoveredOdd=sub(diagonal,offDiagonal);

const report={
  protocol:"scalar-boundary-displacement-kernel/1",
  parameters:{mass:"1",length:"log(3)"},
  displacementKernel:D.map(r=>r.map(show)),
  evenDerivative:show(recoveredEven),
  oddDerivative:show(recoveredOdd),
  trace:show(trace),
  determinant:show(determinant),
  signature:"(1,1)",
  interpretation:[
    "The static Dirichlet-to-Neumann matrix is positive definite.",
    "Its fixed-source length derivative is indefinite: the even response rises and the odd response falls.",
    "Response positivity therefore does not imply positivity of the displacement kernel."
  ]
};
report.passed=eq(recoveredEven,dEven)&&eq(recoveredOdd,dOdd)&&
  determinant[0]<0n&&eq(diagonal,F(-9,16))&&eq(offDiagonal,F(15,16));
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
