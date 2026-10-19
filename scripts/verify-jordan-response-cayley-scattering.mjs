#!/usr/bin/env node

const gcd=(a,b)=>b===0n?(a<0n?-a:a):gcd(b,a%b);
const F=(n,d=1n)=>{n=BigInt(n);d=BigInt(d);if(d<0n){n=-n;d=-d;}const g=gcd(n,d);return[n/g,d/g];};
const add=(a,b)=>F(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
const sub=(a,b)=>F(a[0]*b[1]-b[0]*a[1],a[1]*b[1]);
const mul=(a,b)=>F(a[0]*b[0],a[1]*b[1]);
const div=(a,b)=>F(a[0]*b[1],a[1]*b[0]);
const eq=(a,b)=>a[0]===b[0]&&a[1]===b[1];
const show=a=>a[1]===1n?`${a[0]}`:`${a[0]}/${a[1]}`;
const I=[[F(1),F(0)],[F(0),F(1)]];
const addM=(A,B)=>A.map((r,i)=>r.map((x,j)=>add(x,B[i][j])));
const subM=(A,B)=>A.map((r,i)=>r.map((x,j)=>sub(x,B[i][j])));
const mulM=(A,B)=>A.map((r,i)=>B[0].map((_,j)=>add(mul(r[0],B[0][j]),mul(r[1],B[1][j]))));
const det=A=>sub(mul(A[0][0],A[1][1]),mul(A[0][1],A[1][0]));
const inv=A=>{const d=det(A);return [[div(A[1][1],d),div(F(-A[0][1][0],A[0][1][1]),d)],[div(F(-A[1][0][0],A[1][0][1]),d),div(A[0][0],d)]];};
const matrixEq=(A,B)=>A.every((r,i)=>r.every((x,j)=>eq(x,B[i][j])));
const fmt=A=>A.map(r=>r.map(show));

const X=[[F(5,4),F(-3,4)],[F(-3,4),F(5,4)]];
const S=mulM(subM(X,I),inv(addM(X,I)));
const reconstructed=mulM(addM(I,S),inv(subM(I,S)));
const even=add(S[0][0],S[0][1]);
const odd=sub(S[0][0],S[0][1]);
const defect=subM(I,mulM(S,S));

const report={
  protocol:"jordan-response-cayley-scattering/1",
  responseMatrix:fmt(X),
  scatteringMatrix:fmt(S),
  scatteringEigenvalues:{even:show(even),odd:show(odd)},
  strictContraction:even[0]*even[0]<even[1]*even[1]&&odd[0]*odd[0]<odd[1]*odd[1],
  positivityDefect:fmt(defect),
  reconstructedResponse:fmt(reconstructed),
  interpretation:"The positive reciprocal response maps bijectively to a real symmetric strict contraction at unit reference impedance."
};
report.passed=matrixEq(S,[[F(0),F(-1,3)],[F(-1,3),F(0)]])&&
  report.strictContraction&&matrixEq(defect,[[F(8,9),F(0)],[F(0),F(8,9)]])&&matrixEq(reconstructed,X);
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
