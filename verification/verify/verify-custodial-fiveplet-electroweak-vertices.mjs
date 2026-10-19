#!/usr/bin/env node

const C=(re=0,im=0)=>({re,im});
const add=(a,b)=>C(a.re+b.re,a.im+b.im),mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),sc=(a,s)=>C(a.re*s,a.im*s),conj=a=>C(a.re,-a.im);
const outer=(a,b)=>a.map(x=>b.map(y=>mul(x,y)));
const madd=(A,B)=>A.map((r,i)=>r.map((x,j)=>add(x,B[i][j]))),msc=(A,s)=>A.map(r=>r.map(x=>sc(x,s))),mcomplex=(A,z)=>A.map(r=>r.map(x=>mul(x,z)));
const matMul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),C())));
const inner=(A,B)=>A.reduce((s,r,i)=>r.reduce((t,x,j)=>add(t,mul(conj(x),B[i][j])),s),C());
const R=M=>M.map(r=>r.map(x=>C(x)));
const J=[
  R([[0,0,0],[0,0,-1],[0,1,0]]),
  R([[0,0,1],[0,0,0],[-1,0,0]]),
  R([[0,-1,0],[1,0,0],[0,0,0]])
];
const ep=[C(1/Math.sqrt(2)),C(0,1/Math.sqrt(2)),C()],em=ep.map(conj),e0=[C(),C(),C(1)];
const sym=(a,b)=>msc(madd(outer(a,b),outer(b,a)),1/Math.sqrt(2));
const states=[
  {q:2,X:outer(ep,ep)},{q:1,X:sym(ep,e0)},
  {q:0,X:[[C(1/Math.sqrt(6)),C(),C()],[C(),C(1/Math.sqrt(6)),C()],[C(),C(),C(-2/Math.sqrt(6))]]},
  {q:-1,X:sym(em,e0)},{q:-2,X:outer(em,em)}
];
const left=(i,X)=>mcomplex(matMul(J[i],X),C(0,1));
const right=(i,X)=>mcomplex(msc(matMul(X,J[i]),-1),C(0,1));
const matrixOf=action=>states.map(a=>states.map(b=>inner(a.X,action(b.X)))); // rows q', cols q
const ML=J.map((_,i)=>matrixOf(X=>left(i,X))),MR=J.map((_,i)=>matrixOf(X=>right(i,X)));
const msum=(A,B)=>A.map((r,i)=>r.map((x,j)=>add(x,B[i][j])));
const MC=ML.map((A,i)=>msum(A,MR[i]));
const halfCheck=ML.every((A,i)=>A.every((r,j)=>r.every((x,k)=>Math.abs(x.re-MC[i][j][k].re/2)<1e-12&&Math.abs(x.im-MC[i][j][k].im/2)<1e-12)))&&MR.every((A,i)=>A.every((r,j)=>r.every((x,k)=>Math.abs(x.re-MC[i][j][k].re/2)<1e-12&&Math.abs(x.im-MC[i][j][k].im/2)<1e-12)));
const Tplus=msum(MC[0],MC[1].map(r=>r.map(x=>mul(C(0,1),x))));
const transitions=[];
for(let col=0;col<states.length;col++)for(let row=0;row<states.length;row++){
  const z=Tplus[row][col];if(Math.hypot(z.re,z.im)>1e-10)transitions.push({from:states[col].q,to:states[row].q,magnitude:Math.hypot(z.re,z.im),expected:Math.sqrt((2-states[col].q)*(3+states[col].q))});
}
const chargeDiagonal=MC[2].every((r,i)=>r.every((z,j)=>Math.abs(z.re-(i===j?states[i].q:0))<1e-12&&Math.abs(z.im)<1e-12));
const g=3,gp=4,norm=Math.sqrt(g*g+gp*gp),s=gp/norm,c=g/norm,e=g*gp/norm;
const neutralCouplings=states.map(({q})=>({q,photon:e*q,z:e*q*(c*c-s*s)/(2*s*c)}));
const chargedWVertices=transitions.map(t=>({...t,leftProjectedMagnitude:t.magnitude/2,gaugeCoefficient:g*t.magnitude/(2*Math.sqrt(2))}));
const report={
  protocol:"custodial-fiveplet-electroweak-vertices/1",
  projectionIdentity:"P5 T_L^i P5 = P5 T_R^i P5 = (1/2) T_custodial^i",
  halfProjectionVerified:halfCheck,
  custodialChargeMatrixDiagonal:chargeDiagonal,
  chargedLadderTransitions:chargedWVertices,
  parameters:{g,gPrime:gp,sinTheta:s,cosTheta:c,e},
  neutralVertices:{photon:"e q",z:"e q(cos^2 theta-sin^2 theta)/(2 sin theta cos theta)",values:neutralCouplings},
  conclusion:"Within the physical fiveplet, left and right generators each project to half the custodial spin-2 generator. This fixes all diagonal photon/Z couplings and adjacent-charge W ladder magnitudes."
};
report.passed=halfCheck&&chargeDiagonal&&transitions.length===4&&transitions.every(t=>t.to===t.from+1&&Math.abs(t.magnitude-t.expected)<1e-12);
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
