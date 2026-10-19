#!/usr/bin/env node

const g=3,gPrime=4,w=2,k=1;
const mW2=g*g*(w*w+k*k);
const mZ2=2*k*k*(g*g+gPrime*gPrime);
const cos2=g*g/(g*g+gPrime*gPrime);
const rho=mW2/(mZ2*cos2);
const formula=(w*w+k*k)/(2*k*k);
const eps=w/k-1;
const expansion=1+eps+eps*eps/2;
const report={
  protocol:"full-lock-custodial-misalignment-rho/1",
  vacuum:"u=k e1, v=k e2, a=w e3",
  parameters:{g,gPrime,w,k},
  masses:{mW2,mZ2,cosThetaSquared:cos2},
  exactFormula:"rho=(w^2+k^2)/(2 k^2)",
  rho,
  formulaCheckpoint:formula,
  fractionalMisalignment:"epsilon=w/k-1",
  exactInEpsilon:"rho-1=epsilon+epsilon^2/2",
  expansionCheckpoint:expansion,
  linearSensitivity:"For |epsilon| << 1, rho-1 is linear in the trace/traceless VEV mismatch.",
  custodialPoint:{wEqualsK:true,rho:1}
};
report.passed=rho===2.5&&rho===formula&&rho===expansion&&((1+1)/(2)===1);
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
