#!/usr/bin/env node

const transform=(a,b,c,delta)=>({
  diagonal:[a,c],
  upper:{re:b*Math.cos(delta),im:b*Math.sin(delta)},
  lower:{re:b*Math.cos(delta),im:-b*Math.sin(delta)},
  determinant:a*c-b*b
});
const samples=[0,Math.PI/7,Math.PI/2,Math.PI,2*Math.PI];
const transformed=samples.map(delta=>({
  delta,
  ...transform(2,0.7,3,delta),
  remainsReal:Math.abs(Math.sin(delta))<1e-12
}));
const chargeTests=[
  {q1:1,q2:1},
  {q1:-1,q2:-1},
  {q1:1,q2:0},
  {q1:1,q2:-1}
].map(({q1,q2})=>{
  const phis=[0.2,0.7,1.3,2.1];
  const errors=phis.map(phi=>Math.abs(Math.sin((q1-q2)*phi)));
  return {q1,q2,maximumRealityError:Math.max(...errors),continuousRealSlicePreserved:q1===q2};
});
const report={
  protocol:"two-face-u1-real-slice/1",
  action:"D H D^dagger with D=diag(exp(i alpha),exp(i beta))",
  transformedOffDiagonal:"b -> b exp(i(alpha-beta))",
  pointwiseCriterion:"H2(R) is preserved iff alpha-beta is 0 or pi modulo 2pi.",
  continuousU1Criterion:"For charges q1,q2 and arbitrary phi, H2(R) is preserved iff q1=q2.",
  samples:transformed,
  chargeTests,
  coneFacts:{
    positivityPreservedInH2C:true,
    determinantPreserved:true,
    unequalContinuousPhases:"leave H2(R) and require the extra imaginary off-diagonal coordinate of H2(C)"
  },
  physicalGate:[
    "A common Berry or gauge phase acts trivially on the two-face density.",
    "A continuous unequal face phase complexifies the carrier from dimension 3 to dimension 4.",
    "The only nontrivial relative action remaining inside H2(R) is the discrete sign b -> -b."
  ]
};
report.passed=transformed[0].remainsReal&&!transformed[1].remainsReal&&
  !transformed[2].remainsReal&&transformed[3].remainsReal&&
  chargeTests.every(x=>x.continuousRealSlicePreserved===(x.maximumRealityError<1e-12));
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
