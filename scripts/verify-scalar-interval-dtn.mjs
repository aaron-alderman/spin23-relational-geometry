#!/usr/bin/env node

const gcd=(a,b)=>b===0n?(a<0n?-a:a):gcd(b,a%b);
const F=(n,d=1n)=>{n=BigInt(n);d=BigInt(d);if(d<0n){n=-n;d=-d;}const g=gcd(n,d);return[n/g,d/g];};
const add=(a,b)=>F(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
const sub=(a,b)=>F(a[0]*b[1]-b[0]*a[1],a[1]*b[1]);
const mul=(a,b)=>F(a[0]*b[0],a[1]*b[1]);
const div=(a,b)=>F(a[0]*b[1],a[1]*b[0]);
const eq=(a,b)=>a[0]===b[0]&&a[1]===b[1];
const show=a=>a[1]===1n?`${a[0]}`:`${a[0]}/${a[1]}`;
const c=F(5,3),s=F(4,3),one=F(1),zero=F(0);
// m=1, mL=log 3, so cosh=5/3 and sinh=4/3.
const a=div(c,s),b=div(F(-1),s);
const X=[[a,b],[b,a]];
const even=add(a,b),odd=sub(a,b);
const transfer=[[c,s],[s,c]];
const detT=sub(mul(c,c),mul(s,s));
// Glue two identical intervals and eliminate the middle boundary value.
const correction=div(mul(b,b),mul(F(2),a));
const Xeff=[[sub(a,correction),F(-correction[0],correction[1])],[F(-correction[0],correction[1]),sub(a,correction)]];
const c2=add(mul(c,c),mul(s,s)),s2=mul(F(2),mul(s,c));
const expected2=[[div(c2,s2),div(F(-1),s2)],[div(F(-1),s2),div(c2,s2)]];
const matrixEq=(u,v)=>u.every((r,i)=>r.every((x,j)=>eq(x,v[i][j])));
const fmt=m=>m.map(r=>r.map(show));
const report={
  protocol:"scalar-interval-dirichlet-to-neumann/1",
  parameters:{mass:"1",length:"log(3)",cosh_mL:show(c),sinh_mL:show(s)},
  responseMatrix:fmt(X),
  evenResponse:show(even),oddResponse:show(odd),positive:eq(even,F(1,2))&&eq(odd,F(2)),
  transferDeterminant:show(detT),
  gluedResponseMatrix:fmt(Xeff),
  doubledIntervalExpected:fmt(expected2),
  gluingMatchesDoubledInterval:matrixEq(Xeff,expected2),
  conclusion:"A concrete bulk field produces the positive two-face Jordan Hessian, and interval gluing is exact Schur/symplectic composition."
};
report.passed=report.positive&&eq(detT,one)&&report.gluingMatchesDoubledInterval;
console.log(JSON.stringify(report,null,2));if(!report.passed)process.exitCode=1;
