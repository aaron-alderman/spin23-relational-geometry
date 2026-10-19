#!/usr/bin/env node

const C=(re=0,im=0)=>({re,im});
const add=(a,b)=>C(a.re+b.re,a.im+b.im);
const mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const expi=x=>C(Math.cos(x),Math.sin(x));
const scale=(z,a)=>C(z.re*a,z.im*a);
const sub=(a,b)=>C(a.re-b.re,a.im-b.im);
const abs=z=>Math.hypot(z.re,z.im);
const spinorN=(theta,phi)=>[
  C(Math.cos(theta/2)),
  scale(expi(phi),Math.sin(theta/2))
];
const spinorS=(theta,phi)=>[
  scale(expi(-phi),Math.cos(theta/2)),
  C(Math.sin(theta/2))
];
const vecScale=(z,v)=>v.map(x=>mul(z,x));
const vecError=(u,v)=>Math.max(...u.map((x,i)=>abs(sub(x,v[i]))));
const samples=[
  {theta:0.4,phi:0.7},
  {theta:1.3,phi:2.2},
  {theta:2.6,phi:5.1}
];
const transitions=samples.map(p=>{
  const n=spinorN(p.theta,p.phi),s=spinorS(p.theta,p.phi);
  return {
    ...p,
    errorFor_uN_equals_expiphi_uS:vecError(n,vecScale(expi(p.phi),s))
  };
});
const AN=theta=>(1-Math.cos(theta))/2;
const AS=theta=>-(1+Math.cos(theta))/2;
const curvature=theta=>0.5*Math.sin(theta);
const n=20000,dtheta=Math.PI/n;
let integral=0;
for(let i=0;i<n;i++){
  const theta=(i+0.5)*dtheta;
  integral+=curvature(theta)*dtheta*2*Math.PI;
}
const chern=integral/(2*Math.PI);
const equatorBerryPhase=2*Math.PI*AN(Math.PI/2);
const report={
  protocol:"helicity-hopf-real-bundle-obstruction/1",
  northPatch:"u_N=(cos(theta/2), exp(i phi) sin(theta/2))",
  southPatch:"u_S=(exp(-i phi) cos(theta/2), sin(theta/2))",
  overlapTransition:"u_N=exp(i phi) u_S",
  transitionChecks:transitions,
  berryConnections:{
    north:"A_N=(1-cos theta)dphi/2",
    south:"A_S=-(1+cos theta)dphi/2",
    overlapDifference:"A_N-A_S=dphi",
    sampleDifferenceAtTheta1:AN(1)-AS(1)
  },
  curvature:"F=(1/2) sin(theta) dtheta wedge dphi",
  curvatureIntegral:integral,
  firstChernNumber:chern,
  equator:{
    berryPhase:equatorBerryPhase,
    holonomy:C(Math.cos(equatorBerryPhase),Math.sin(equatorBerryPhase))
  },
  topology:{
    positiveHelicityChern:1,
    negativeHelicityChern:-1,
    pairedDiracChern:0,
    hopfMeaning:"The normalized helicity spinor is the Hopf U(1) bundle S^3 -> S^2.",
    realLineObstruction:"A complex line admitting a global real line reduction over S^2 would have c1=0; c1=1 forbids it."
  },
  carrierConsequence:"The fixed-helicity eigenvector is patchwise. A derived response inherits the Berry U(1) only if it is phase-sensitive or the transition acts nontrivially on face space; the free chiral density is phase-neutral.",
  conclusion:"No globally smooth helicity eigenvector exists. This does not prevent a global helicity projector or a global real chiral partial trace; those descent checks are performed separately."
};
report.passed=transitions.every(x=>x.errorFor_uN_equals_expiphi_uS<1e-12)&&
  Math.abs(report.berryConnections.sampleDifferenceAtTheta1-1)<1e-12&&
  Math.abs(chern-1)<1e-8&&
  Math.abs(equatorBerryPhase-Math.PI)<1e-12&&
  report.topology.pairedDiracChern===0;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
