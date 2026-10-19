#!/usr/bin/env node

// Coordinates X(t,x,y)=[[t+x,y],[y,t-x]], det X=t^2-x^2-y^2.
const det=([t,x,y])=>t*t-x*x-y*y;
const trace=([t])=>2*t;
const rotateXY=([t,x,y],c,s)=>[t,c*x-s*y,s*x+c*y];
const rotateTX=([t,x,y],c,s)=>[c*t-s*x,s*t+c*x,y];
const q=[1,0,0];
const compactJordanRotation=rotateXY([2,3,4],0,1);
const custodialMix=rotateTX(q,0,1);
const report={
  protocol:"jordan-custodial-symmetry-tension/1",
  jordanCoordinates:"X=[[t+x,y],[y,t-x]]",
  determinantForm:"t^2-x^2-y^2",
  jordanCompactAutomorphism:"SO(2) rotations of (x,y), fixing t",
  checks:{
    so2PreservesDeterminant:det([2,3,4])===det(compactJordanRotation),
    so2PreservesTrace:trace([2,3,4])===trace(compactJordanRotation),
    rotationMixingTraceChangesDeterminant:{before:det(q),after:det(custodialMix)},
    rotationMixingTraceChangesTrace:{before:trace(q),after:trace(custodialMix)}
  },
  conclusion:"The SO(3)_R needed for exact custodial bitriplet symmetry rotates the Jordan trace axis into traceless axes and is not an automorphism of H2(R) or its determinant cone. Only its SO(2) subgroup is Jordan-native.",
  remainingOpening:"SO(3)_R may be an accidental symmetry of the locking kinetic/potential sector that is explicitly broken to the Jordan-native SO(2) by other interactions."
};
report.passed=report.checks.so2PreservesDeterminant&&report.checks.so2PreservesTrace&&
  report.checks.rotationMixingTraceChangesDeterminant.before===1&&report.checks.rotationMixingTraceChangesDeterminant.after===-1&&
  report.checks.rotationMixingTraceChangesTrace.before===2&&report.checks.rotationMixingTraceChangesTrace.after===0;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
