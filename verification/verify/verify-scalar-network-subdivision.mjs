#!/usr/bin/env node

const gcd=(a,b)=>b===0n?(a<0n?-a:a):gcd(b,a%b);
const F=(n,d=1n)=>{n=BigInt(n);d=BigInt(d);if(d<0n){n=-n;d=-d;}const g=gcd(n,d);return[n/g,d/g];};
const add=(a,b)=>F(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
const sub=(a,b)=>F(a[0]*b[1]-b[0]*a[1],a[1]*b[1]);
const mul=(a,b)=>F(a[0]*b[0],a[1]*b[1]);
const div=(a,b)=>F(a[0]*b[1],a[1]*b[0]);
const neg=a=>F(-a[0],a[1]);
const eq=(a,b)=>a[0]===b[0]&&a[1]===b[1];
const show=a=>a[1]===1n?`${a[0]}`:`${a[0]}/${a[1]}`;
const zero=F(0),one=F(1),two=F(2);
const matrixEq=(u,v)=>u.every((r,i)=>r.every((x,j)=>eq(x,v[i][j])));
const matMul=(A,B)=>[
  [add(mul(A[0][0],B[0][0]),mul(A[0][1],B[1][0])),add(mul(A[0][0],B[0][1]),mul(A[0][1],B[1][1]))],
  [add(mul(A[1][0],B[0][0]),mul(A[1][1],B[1][0])),add(mul(A[1][0],B[0][1]),mul(A[1][1],B[1][1]))]
];
const det=A=>sub(mul(A[0][0],A[1][1]),mul(A[0][1],A[1][0]));
const fmt=A=>A.map(r=>r.map(show));

// For u=log(t), exp(u)=t is rational and so are cosh(u), sinh(u).
const interval=t=>{
  t=BigInt(t);
  const c=F(t*t+1n,2n*t);
  const s=F(t*t-1n,2n*t);
  const T=[[c,s],[s,c]];
  const X=[[div(c,s),div(F(-1),s)],[div(F(-1),s),div(c,s)]];
  return {t,c,s,T,X};
};

// Glue adjacent two-boundary quadratic forms and eliminate their shared value.
const glue=(X,Y)=>{
  const middle=add(X[1][1],Y[0][0]);
  const leftMiddle=X[0][1],middleRight=Y[0][1];
  return [
    [sub(X[0][0],div(mul(leftMiddle,leftMiddle),middle)),neg(div(mul(leftMiddle,middleRight),middle))],
    [neg(div(mul(leftMiddle,middleRight),middle)),sub(Y[1][1],div(mul(middleRight,middleRight),middle))]
  ];
};

const i2=interval(2),i3=interval(3),i5=interval(5),i30=interval(30);
const transferProduct=matMul(matMul(i2.T,i3.T),i5.T);
const leftAssociated=glue(glue(i2.X,i3.X),i5.X);
const rightAssociated=glue(i2.X,glue(i3.X,i5.X));
const spectral=t=>add(t.T[0][0],t.T[0][1]); // exp(u)

const report={
  protocol:"scalar-network-subdivision/1",
  subdivision:["log(2)","log(3)","log(5)"],
  totalLength:"log(30)",
  transferProduct:fmt(transferProduct),
  transferExpected:fmt(i30.T),
  transferDeterminant:show(det(transferProduct)),
  multiplicativeSpectralParameter:{
    factors:[show(spectral(i2)),show(spectral(i3)),show(spectral(i5))],
    product:show(mul(mul(spectral(i2),spectral(i3)),spectral(i5))),
    total:show(spectral(i30))
  },
  leftAssociatedResponse:fmt(leftAssociated),
  rightAssociatedResponse:fmt(rightAssociated),
  expectedResponse:fmt(i30.X),
  responseDeterminant:show(det(i30.X)),
  observations:[
    "Schur gluing is associative on these exact interval responses.",
    "The response determinant is fixed to m^2=1 and therefore does not encode length.",
    "The transfer spectral parameter exp(mL) is multiplicative, so rapidity mL is additive under subdivision."
  ]
};
report.passed=matrixEq(transferProduct,i30.T)&&eq(det(transferProduct),one)&&
  matrixEq(leftAssociated,rightAssociated)&&matrixEq(leftAssociated,i30.X)&&
  eq(mul(mul(spectral(i2),spectral(i3)),spectral(i5)),spectral(i30))&&eq(det(i30.X),one);
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
