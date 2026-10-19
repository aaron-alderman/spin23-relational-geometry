#!/usr/bin/env node

const norm=v=>Math.hypot(v.x,v.y,v.z);
const det=v=>v.t*v.t-v.x*v.x-v.y*v.y-v.z*v.z;
const eig=v=>[v.t-norm(v),v.t+norm(v)];
const rotate=(v,a)=>({
  ...v,
  x:Math.cos(a)*v.x-Math.sin(a)*v.y,
  y:Math.sin(a)*v.x+Math.cos(a)*v.y
});
const wedge=(u,v)=>u.x*v.y-u.y*v.x;
const K1={label:"p1",t:3,z:0.4,x:1,y:0};
const K2={label:"p2",t:3.2,z:-0.2,x:0.8,y:0.6};
const angle=-Math.atan2(K1.y,K1.x);
const R1=rotate(K1,angle),R2=rotate(K2,angle);
const arbitrary=0.73;
const report={
  protocol:"dirac-face-form-factor-wedge/1",
  dictionary:{
    t:"average positive spectral/kinetic weight",
    z:"chiral or axial face imbalance",
    x:"scalar left-right connector",
    y:"pseudoscalar left-right connector",
    matrix:"K=t I+z sigma_z+x sigma_x+y sigma_y"
  },
  samples:[K1,K2].map(K=>({...K,determinant:det(K),eigenvalues:eig(K),positive:eig(K)[0]>0})),
  rephasing:{
    action:"A fixed axial/relative-face phase rotates the (x,y) plane.",
    chosenAngle:angle,
    transformed:[R1,R2],
    firstReal:Math.abs(R1.y)<1e-12,
    secondStillComplex:Math.abs(R2.y)>1e-12
  },
  wedgeInvariant:{
    formula:"W(p,q)=x(p)y(q)-y(p)x(q)=Im[z(p) conjugate(z(q))] up to sign convention",
    value:wedge(K1,K2),
    afterArbitraryRotation:wedge(rotate(K1,arbitrary),rotate(K2,arbitrary)),
    rotationInvariant:Math.abs(wedge(K1,K2)-wedge(rotate(K1,arbitrary),rotate(K2,arbitrary)))<1e-12,
    nonzeroObstructsOneRealSlice:wedge(K1,K2)!==0
  },
  criterion:"For a family with at least one nonzero off-diagonal vector, one fixed chiral rotation makes every kernel real iff W(p,q)=0 for every pair.",
  cone:{
    H2C:"t^2-x^2-y^2-z^2 >= 0",
    H2R:"the selected hyperplane y=0 after one fixed rotation"
  }
};
report.passed=report.samples.every(s=>s.positive&&s.determinant>0)&&
  report.rephasing.firstReal&&report.rephasing.secondStillComplex&&
  report.wedgeInvariant.rotationInvariant&&report.wedgeInvariant.nonzeroObstructsOneRealSlice;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
