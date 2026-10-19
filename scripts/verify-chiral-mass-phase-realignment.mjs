#!/usr/bin/env node

const C=(re=0,im=0)=>({re,im});
const mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const conj=a=>C(a.re,-a.im);
const expi=x=>C(Math.cos(x),Math.sin(x));
const abs=a=>Math.hypot(a.re,a.im);
const sub=(a,b)=>C(a.re-b.re,a.im-b.im);
const transformOffDiagonal=(z,alpha)=>mul(expi(alpha),z);
const masses=[
  {scalar:3,pseudoscalar:4},
  {scalar:6,pseudoscalar:8}
];
const z=m=>C(m.scalar,-m.pseudoscalar);
const theta=Math.atan2(masses[0].pseudoscalar,masses[0].scalar);
const aligned=masses.map(m=>transformOffDiagonal(z(m),theta));
const misalignedMasses=[
  {scalar:3,pseudoscalar:4},
  {scalar:4,pseudoscalar:3}
];
const attempted=misalignedMasses.map(m=>transformOffDiagonal(z(m),theta));
const phaseAligned=(a,b)=>Math.abs(mul(a,conj(b)).im)<1e-12;
const v=246;
const engineeringDimensions={
  H:1,L:1.5,eR:1.5,
  HdaggerL:2.5,
  normalizedHdaggerL:2.5-1,
  eR:1.5,
  normalization:"chi_L_tilde=(sqrt(2)/v) H^dagger L"
};
const report={
  protocol:"chiral-mass-phase-realignment/1",
  dimensionalAudit:engineeringDimensions,
  lorentzDictionary:{
    sigmaX:"scalar Dirac mass direction m_s bar(psi) psi",
    sigmaY:"pseudoscalar Dirac mass direction i m_p bar(psi) gamma_5 psi",
    relativeFaceRephasing:"axial rotation of the chiral components"
  },
  commonPhaseFamily:{
    masses,
    chosenAngle:theta,
    transformedOffDiagonals:aligned,
    allReal:aligned.every(w=>Math.abs(w.im)<1e-12),
    interpretation:"One constant scalar/pseudoscalar ratio rotates to a real H2(R) slice."
  },
  unequalPhaseFamily:{
    masses:misalignedMasses,
    initiallyAligned:phaseAligned(z(misalignedMasses[0]),z(misalignedMasses[1])),
    transformedOffDiagonals:attempted,
    secondRemainsComplex:Math.abs(attempted[1].im)>1e-12,
    interpretation:"One rephasing cannot realify two inequivalent spectral phases."
  },
  anomalyCaveat:"A chiral field redefinition may shift anomalous theta terms; this certificate tests only the finite-dimensional face response."
};
report.passed=engineeringDimensions.normalizedHdaggerL===engineeringDimensions.eR&&
  report.commonPhaseFamily.allReal&&!report.unequalPhaseFamily.initiallyAligned&&
  report.unequalPhaseFamily.secondRemainsComplex;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
