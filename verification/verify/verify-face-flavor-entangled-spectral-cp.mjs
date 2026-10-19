#!/usr/bin/env node

const Z=(re=0,im=0)=>({re,im});
const add=(a,b)=>Z(a.re+b.re,a.im+b.im);
const sub=(a,b)=>Z(a.re-b.re,a.im-b.im);
const mul=(a,b)=>Z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const conj=a=>Z(a.re,-a.im);
const abs=a=>Math.hypot(a.re,a.im);
const zero=()=>Z();
const outer=v=>v.map(x=>v.map(y=>mul(x,conj(y))));
const matMul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),zero())));
const matSub=(A,B)=>A.map((r,i)=>r.map((x,j)=>sub(x,B[i][j])));
const det2=A=>sub(mul(A[0][0],A[1][1]),mul(A[0][1],A[1][0]));
const det3=A=>{
  const p1=mul(A[0][0],sub(mul(A[1][1],A[2][2]),mul(A[1][2],A[2][1])));
  const p2=mul(A[0][1],sub(mul(A[1][0],A[2][2]),mul(A[1][2],A[2][0])));
  const p3=mul(A[0][2],sub(mul(A[1][0],A[2][1]),mul(A[1][1],A[2][0])));
  return add(sub(p1,p2),p3);
};
const flatten=V=>V.flat();
const partialFlavor=R=>Array.from({length:2},(_,a)=>Array.from({length:2},(_,b)=>{
  let s=zero();for(let f=0;f<3;f++)s=add(s,R[3*a+f][3*b+f]);return s;
}));
const partialFace=R=>Array.from({length:3},(_,f)=>Array.from({length:3},(_,g)=>{
  let s=zero();for(let a=0;a<2;a++)s=add(s,R[3*a+f][3*a+g]);return s;
}));
const inner=(a,b)=>a.reduce((s,x,i)=>add(s,mul(conj(x),b[i])),zero());
const maxImag=A=>Math.max(...A.flat().map(z=>Math.abs(z.im)));
const trace=A=>A.reduce((s,r,i)=>add(s,r[i]),zero());

const Vu=[
  [Z(1),Z(0),Z(0)],
  [Z(0),Z(2),Z(0)]
];
const Vd=[
  [Z(1),Z(1),Z(0,1)],
  [Z(1),Z(0,1),Z(1,1)]
];
const psiU=flatten(Vu),psiD=flatten(Vd);
const Ru=outer(psiU),Rd=outer(psiD);
const Fu=partialFlavor(Ru),Fd=partialFlavor(Rd);
const Hu=partialFace(Ru),Hd=partialFace(Rd);
const comm=matSub(matMul(Hu,Hd),matMul(Hd,Hu));
const comm3=matMul(matMul(comm,comm),comm);
const cpDet=det3(comm),cpTrace=trace(comm3);
const q2=1.4,mu2=2.0,md2=5.0;
const spectral=Ru.map((r,i)=>r.map((z,j)=>add(
  Z(z.re/(q2+mu2),z.im/(q2+mu2)),
  Z(Rd[i][j].re/(q2+md2),Rd[i][j].im/(q2+md2))
)));
const probes=[
  [Z(1),Z(),Z(),Z(),Z(),Z()],
  [Z(1),Z(0,1),Z(-0.5),Z(0.2,-0.1),Z(),Z(1)],
  [Z(0.3),Z(-1,0.4),Z(0,0.2),Z(0.7),Z(-0.2,-0.5),Z(1.1)]
];
const quad=(R,v)=>inner(v,R.map(row=>row.reduce((s,z,j)=>add(s,mul(z,v[j])),zero()))).re;
const schmidtDet=V=>sub(mul(V[0][0],V[1][1]),mul(V[0][1],V[1][0]));
const report={
  protocol:"face-flavor-entangled-spectral-cp/1",
  amplitudes:{Vu,Vd},
  residueFacts:{
    construction:"R_f=vec(V_f) vec(V_f)^dagger",
    rankOnePositive:true,
    flavorSchmidtRankAtLeastTwo:{
      upMinor:schmidtDet(Vu),
      downMinor:schmidtDet(Vd),
      bothNonzero:abs(schmidtDet(Vu))>1e-12&&abs(schmidtDet(Vd))>1e-12
    }
  },
  faceMarginals:{
    up:Fu,down:Fd,
    maximumImaginaryPart:Math.max(maxImag(Fu),maxImag(Fd)),
    determinants:[det2(Fu),det2(Fd)],
    realPositive:true
  },
  flavorMarginals:{up:Hu,down:Hd},
  cpOddInvariant:{
    determinantOfCommutator:cpDet,
    traceCommutatorCube:cpTrace,
    nonzero:Math.abs(cpDet.im)>1e-12&&Math.abs(cpTrace.im)>1e-12
  },
  spectralResponse:{
    formula:"C(q^2)=Ru/(q^2+mu^2)+Rd/(q^2+md^2)",
    q2,mu2,md2,
    testedQuadraticForms:probes.map(v=>quad(spectral,v)),
    positiveByResidueSum:true
  },
  conclusion:"Positive rank-one residues may be genuinely face-flavor entangled, retain real positive H2(R) face marginals, and induce a nonzero CP-odd invariant between complex flavor marginals."
};
report.passed=report.residueFacts.flavorSchmidtRankAtLeastTwo.bothNonzero&&
  report.faceMarginals.maximumImaginaryPart<1e-12&&
  report.faceMarginals.determinants.every(z=>Math.abs(z.im)<1e-12&&z.re>=-1e-12)&&
  report.cpOddInvariant.nonzero&&report.spectralResponse.testedQuadraticForms.every(x=>x>=-1e-12);
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
