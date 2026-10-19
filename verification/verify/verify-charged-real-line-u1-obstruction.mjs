#!/usr/bin/env node

const rotate=(q,theta,v)=>[
  Math.cos(q*theta)*v[0]-Math.sin(q*theta)*v[1],
  Math.sin(q*theta)*v[0]+Math.cos(q*theta)*v[1]
];
const wedge=(u,v)=>u[0]*v[1]-u[1]*v[0];
const linePreserved=(q,theta,phi)=>{
  const v=[Math.cos(phi),Math.sin(phi)];
  return Math.abs(wedge(v,rotate(q,theta,v)))<1e-10;
};
const q=1;
const testAngles=[0,Math.PI/7,Math.PI/2,Math.PI,2*Math.PI];
const arbitraryLines=[0,0.23,Math.PI/4,1.1];
const audit=testAngles.map(theta=>({
  theta,
  preservesAllTestLines:arbitraryLines.every(phi=>linePreserved(q,theta,phi)),
  expectedStabilizer:Math.abs(Math.sin(q*theta))<1e-10
}));
const genericFails=arbitraryLines.every(phi=>!linePreserved(q,Math.PI/2,phi));
const neutralWorks=testAngles.every(theta=>arbitraryLines.every(phi=>
  linePreserved(0,theta,phi)));
const report={
  protocol:"charged-real-line-u1-obstruction/1",
  theorem:"A nonzero-charge complex one-dimensional U(1) representation is a real two-plane rotation. No real line is invariant under every rotation.",
  proofIdentity:"For a line vector v_phi, wedge(v_phi,R(q theta)v_phi)=sin(q theta), independent of phi.",
  preHiggs:{field:"e^c-like E<-C relation",hypercharge:1,continuousRealLineStabilizer:"theta=n pi, a Z2 image"},
  postHiggs:{electricCharge:1,higgsVacuumElectricCharge:0,conclusion:"Electroweak breaking leaves continuous U(1)_em acting on the line, so it does not make the fixed H2(R) slice invariant."},
  audit,
  genericQuarterTurnDestroysEveryRealLine:genericFails,
  neutralRepresentationPreservesRealLines:neutralWorks,
  survivingOptions:[
    "treat the real line as gauge fixing rather than an invariant observable",
    "use a gauge-covariant rotating real subbundle and retain its connection/holonomy",
    "replace the charged off-diagonal field by a gauge-invariant dressed or bilinear observable",
    "lock to an independent gauge-neutral external M2 factor"
  ],
  conclusion:"The direct fixed-real-slice identification is incompatible with both pre-Higgs hypercharge and post-Higgs electromagnetism for the charged e^c linking edge."
};
report.passed=audit.every(x=>x.preservesAllTestLines===x.expectedStabilizer)&&
  genericFails&&neutralWorks;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
