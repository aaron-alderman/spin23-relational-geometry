#!/usr/bin/env node

const C=(re=0,im=0)=>({re,im});
const add=(a,b)=>C(a.re+b.re,a.im+b.im);
const mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const conj=a=>C(a.re,-a.im);
const scale=(s,a)=>C(s*a.re,s*a.im);
const wedge=(a,b)=>mul(a,conj(b)).im;
const families={
  aligned:[
    {mass2:1,rho:C(1,0.5)},
    {mass2:4,rho:C(2,1)}
  ],
  misaligned:[
    {mass2:1,rho:C(1,0)},
    {mass2:4,rho:C(0,1)}
  ]
};
const M=(family,q2)=>family.reduce((s,r)=>add(s,scale(1/(q2+r.mass2),r.rho)),C());
const dM=(family,q2)=>family.reduce((s,r)=>add(s,scale(-1/(q2+r.mass2)**2,r.rho)),C());
const curvature=(family,q2)=>mul(conj(M(family,q2)),dM(family,q2)).im;
const qs=[0,0.7,3,10];
const summarize=family=>({
  spectralPairWedges:family.flatMap((r,i)=>family.slice(i+1).map(s=>wedge(r.rho,s.rho))),
  values:qs.map(q2=>({q2,M:M(family,q2),phase:Math.atan2(M(family,q2).im,M(family,q2).re),phaseCurvatureNumerator:curvature(family,q2)})),
  valuePairWedges:qs.flatMap((q,i)=>qs.slice(i+1).map(r=>wedge(M(family,q),M(family,r))))
});
const aligned=summarize(families.aligned),misaligned=summarize(families.misaligned);
const p=0.4,q=2.2,m=1.3,J=0.08,a=0.2,b=0.5,c=0.9;
const scalar=x=>m*(1+a*x);
const pseudoscalar=x=>J*(b+c*x);
const localWedge=scalar(p)*pseudoscalar(q)-pseudoscalar(p)*scalar(q);
const expected=m*J*(c-a*b)*(q-p);
const report={
  protocol:"spectral-wedge-and-phase-curvature/1",
  definitions:{
    crossFormFactor:"M(q^2)=integral rho(s)/(q^2+s) ds or a finite pole sum",
    spectralWedge:"W_rho(s,t)=Im[rho(s) conjugate(rho(t))]",
    momentumWedge:"W(p,q)=Im[M(p) conjugate(M(q))]",
    phaseCurvature:"Omega(q^2)=Im[conjugate(M) dM/dq^2]=|M|^2 d(arg M)/dq^2"
  },
  aligned,
  misaligned,
  twoFormFactorToy:{
    scalar:"m_s(r)=m(1+a r)",
    pseudoscalar:"m_p(r)=J(b+c r)",
    parameters:{p,q,m,J,a,b,c},
    wedge:localWedge,
    expected,
    obstructionCoefficient:"c-a b",
    matches:Math.abs(localWedge-expected)<1e-12
  },
  criteria:{
    alignedSpectralDensity:"All spectral pair wedges vanish.",
    alignedEuclideanFamily:"All momentum wedges and phase-curvature numerators vanish away from zeros.",
    absorptiveData:"For a cut, rho(s) is proportional to the discontinuity; unequal discontinuity phases give a nonzero spectral wedge."
  }
};
const nearZero=xs=>xs.every(x=>Math.abs(x)<1e-12);
report.passed=nearZero(aligned.spectralPairWedges)&&nearZero(aligned.valuePairWedges)&&
  aligned.values.every(v=>Math.abs(v.phaseCurvatureNumerator)<1e-12)&&
  misaligned.spectralPairWedges.some(x=>Math.abs(x)>1e-4)&&
  misaligned.valuePairWedges.some(x=>Math.abs(x)>1e-4)&&
  misaligned.values.some(v=>Math.abs(v.phaseCurvatureNumerator)>1e-4)&&
  report.twoFormFactorToy.matches&&Math.abs(localWedge)>1e-6;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
