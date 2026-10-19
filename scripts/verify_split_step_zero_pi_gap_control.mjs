#!/usr/bin/env node

const z=(re=0,im=0)=>({re,im});
const add=(a,b)=>z(a.re+b.re,a.im+b.im),mul=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),scale=(a,s)=>z(a.re*s,a.im*s),conj=a=>z(a.re,-a.im),abs=a=>Math.hypot(a.re,a.im);
const mm=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,a,k)=>add(s,mul(a,B[k][j])),z())));
const dagger=A=>A[0].map((_,i)=>A.map(row=>conj(row[i])));
const maxDiff=(A,B)=>Math.max(...A.flatMap((row,i)=>row.map((x,j)=>abs(add(x,scale(B[i][j],-1))))));
const I=[[z(1),z()],[z(),z(1)]];
const coin=t=>[[z(Math.cos(t)),z(-Math.sin(t))],[z(Math.sin(t)),z(Math.cos(t))]];
const phase=x=>z(Math.cos(x),Math.sin(x));
const Sminus=k=>[[phase(-k),z()],[z(),z(1)]];
const Splus=k=>[[z(1),z()],[z(),phase(k)]];
const walk=(k,t1,t2)=>mm(mm(mm(Splus(k),coin(t2)),Sminus(k)),coin(t1));
const trace=A=>add(A[0][0],A[1][1]);
const det=A=>add(mul(A[0][0],A[1][1]),scale(mul(A[0][1],A[1][0]),-1));
const cosOmega=(k,t1,t2)=>Math.cos(k)*Math.cos(t1)*Math.cos(t2)-Math.sin(t1)*Math.sin(t2);
let maximumUnitarityError=0,maximumDeterminantError=0,maximumTraceError=0;
for(const k of [-Math.PI,-1.7,-.2,0,.9,Math.PI])for(const t1 of [-.4,.1,.7])for(const t2 of [-.5,.2,.8]){
  const U=walk(k,t1,t2);
  maximumUnitarityError=Math.max(maximumUnitarityError,maxDiff(mm(dagger(U),U),I));
  maximumDeterminantError=Math.max(maximumDeterminantError,abs(add(det(U),z(-1))));
  maximumTraceError=Math.max(maximumTraceError,abs(add(trace(U),z(-2*cosOmega(k,t1,t2)))));
}
const theta=.31,t1=theta,t2=-theta;
const zeroOmega=Math.acos(Math.max(-1,Math.min(1,cosOmega(0,t1,t2))));
const piOmega=Math.acos(Math.max(-1,Math.min(1,cosOmega(Math.PI,t1,t2))));
const piGap=Math.PI-piOmega;
const predictedPiGap=2*theta;
const slopes=[1e-2,5e-3,1e-3].map(k=>({k,omega:Math.acos(cosOmega(k,t1,t2)),velocityRatio:Math.acos(cosOmega(k,t1,t2))/k}));
const predictedVelocity=Math.cos(theta);
const massiveCases=[-.08,-.03,.03,.08].map(delta=>{
  const a=theta+delta/2,b=-theta+delta/2;
  const gap0=Math.acos(Math.max(-1,Math.min(1,cosOmega(0,a,b))));
  const gapPi=Math.PI-Math.acos(Math.max(-1,Math.min(1,cosOmega(Math.PI,a,b))));
  return {delta,gap0,predictedZeroGap:Math.abs(delta),piGap:gapPi};
});
const report={
  protocol:"split-step-zero-pi-gap-control/1",
  update:"U=S_plus(k) C(theta2) S_minus(k) C(theta1)",
  exactDispersion:"cos(omega)=cos(k)cos(theta1)cos(theta2)-sin(theta1)sin(theta2)",
  maximumUnitarityError,maximumDeterminantError,maximumTraceError,
  criticalExample:{theta1:t1,theta2:t2,zeroOmega,piOmega,piGap,predictedPiGap,slopes,predictedVelocity},
  massiveCases,
  microscopicTradeoff:{
    singleShiftWalk:"both components move one cell in opposite directions during the shift",
    splitStepWalk:"one component moves while the other is stationary in each partial shift",
    consequence:"finite causal range and unitarity remain exact, but not every elementary dependency can be assigned a null displacement during each partial substep"
  },
  interpretation:[
    "The split-step walk controls the zero and pi quasienergy gaps independently.",
    "At theta1=-theta2, the zero cone is massless with speed cos(theta), while the pi cone has gap 2|theta|.",
    "A small theta1+theta2 opens the zero-sector mass without closing the pi gap.",
    "The independent pi duplicate of the single-shift walk is therefore not universal to local discrete-time unitaries.",
    "The price is a weaker microscopic null-link claim: partial shifts contain stationary as well as moving components."
  ]
};
report.passed=maximumUnitarityError<1e-12&&maximumDeterminantError<1e-12&&maximumTraceError<1e-12&&zeroOmega<1e-12&&
  Math.abs(piGap-predictedPiGap)<1e-12&&Math.abs(slopes.at(-1).velocityRatio-predictedVelocity)<1e-6&&
  massiveCases.every(x=>Math.abs(x.gap0-x.predictedZeroGap)<1e-12&&x.piGap>.4);
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
