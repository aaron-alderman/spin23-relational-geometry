#!/usr/bin/env node

const Z=(re=0,im=0)=>({re,im});
const add=(a,b)=>Z(a.re+b.re,a.im+b.im);
const sub=(a,b)=>Z(a.re-b.re,a.im-b.im);
const mul=(a,b)=>Z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const conj=a=>Z(a.re,-a.im);
const matMul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),Z())));
const matSub=(A,B)=>A.map((r,i)=>r.map((x,j)=>sub(x,B[i][j])));
const trace=A=>A.reduce((s,r,i)=>add(s,r[i]),Z());
const comm=(A,B)=>matSub(matMul(A,B),matMul(B,A));
const dagger=A=>A[0].map((_,j)=>A.map(r=>conj(r[j])));
const maxerr=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((z,j)=>Math.hypot(z.re-B[i][j].re,z.im-B[i][j].im))));
const diag=xs=>xs.map((x,i)=>xs.map((_,j)=>Z(i===j?x:0)));
const kron=(A,B)=>A.flatMap(ar=>B.map(br=>ar.flatMap(a=>br.map(b=>mul(a,b)))));
const scale=(s,A)=>A.map(r=>r.map(z=>Z(s*z.re,s*z.im)));
const Hu=diag([1,2,4]);
const Hd=[
  [Z(10),Z(1),Z(0,-1)],
  [Z(1),Z(11),Z(1)],
  [Z(0,1),Z(1),Z(12)]
];
const cpTrace=(A,B)=>trace(matMul(matMul(comm(A,B),comm(A,B)),comm(A,B)));
const T=cpTrace(Hu,Hd),Jcp=T.im;
const HuBar=Hu.map(r=>r.map(conj)),HdBar=Hd.map(r=>r.map(conj));
const Tbar=cpTrace(HuBar,HdBar),JcpBar=Tbar.im;
const sy=[[Z(),Z(0,-1)],[Z(0,1),Z()]],I3=diag([1,1,1]);
const D=scale(Jcp,kron(sy,I3));
const DspurionCP=scale(JcpBar,kron(sy.map(r=>r.map(conj)),I3));
const partialFlavor=[
  [Z(),Z(0,-3*Jcp)],
  [Z(0,3*Jcp),Z()]
];
const report={
  protocol:"jarlskog-sigma-y-counterterm/1",
  flavorInvariant:{
    traceCommutatorCube:T,
    JcpDefinition:"J_CP=Im Tr([Hu,Hd]^3)",
    Jcp,
    conjugatedTrace:Tbar,
    conjugatedJcp:JcpBar,
    oddUnderComplexConjugation:Math.abs(JcpBar+Jcp)<1e-12,
    yukawaSpurionDegree:12
  },
  candidate:{
    formula:"Delta R = J_CP sigma_y tensor I_3",
    hermitianError:maxerr(D,dagger(D)),
    carrierConjugationOdd:maxerr(kron(sy.map(r=>r.map(conj)),I3),scale(-1,kron(sy,I3)))<1e-12,
    spurionicCPInvariantError:maxerr(D,DspurionCP),
    facePartialTrace:partialFlavor,
    generatesForbiddenImaginaryMarginal:Jcp!==0
  },
  symmetry:{
    commonGaugePhase:"commutes, because the face gauge action is proportional to I_2",
    flavorBasis:"J_CP is invariant under simultaneous unitary flavor-basis conjugation by cyclicity of trace",
    implication:"Gauge invariance, flavor-basis covariance and spurionic complex conjugation do not by themselves forbid the dangerous singlet direction."
  },
  limitation:"This is a symmetry-allowed spurion structure, not a calculation showing that its radiative coefficient is nonzero. The physical CP action on dressed chiral operators must also be fixed."
};
report.passed=report.flavorInvariant.oddUnderComplexConjugation&&Jcp!==0&&
  report.candidate.hermitianError<1e-12&&report.candidate.carrierConjugationOdd&&
  report.candidate.spurionicCPInvariantError<1e-12&&
  report.candidate.generatesForbiddenImaginaryMarginal;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
