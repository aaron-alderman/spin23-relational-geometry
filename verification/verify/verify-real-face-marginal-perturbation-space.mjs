#!/usr/bin/env node

const Z=(re=0,im=0)=>({re,im});
const add=(a,b)=>Z(a.re+b.re,a.im+b.im);
const conj=a=>Z(a.re,-a.im);
const trace=A=>A.reduce((s,r,i)=>add(s,r[i]),Z());
const diag=xs=>xs.map((x,i)=>xs.map((_,j)=>i===j?x:Z()));
const scale=(s,A)=>A.map(r=>r.map(z=>Z(s*z.re,s*z.im)));
const block=(A,C,B)=>[
  [...A[0],...C[0]],[...A[1],...C[1]],[...A[2],...C[2]],
  [...C[0].map(conj),...B[0]],[...C[1].map(conj),...B[1]],[...C[2].map(conj),...B[2]]
];
const partialFlavor=(A,C,B)=>[[trace(A),trace(C)],[conj(trace(C)),trace(B)]];
const I3=diag([Z(1),Z(1),Z(1)]);
const T1=diag([Z(1),Z(-1),Z(0)]);
const T2=diag([Z(1),Z(1),Z(-2)]);
const imaginaryC=F=>scale(-1,F).map(r=>r.map(z=>Z(-z.im,z.re))); // i F
const A=diag([Z(2),Z(3),Z(4)]),B=diag([Z(5),Z(6),Z(7)]);
const cases=[
  {name:"flavor-singlet sigma_y",C:imaginaryC(I3),expectedDangerous:true},
  {name:"traceless flavor direction 1",C:imaginaryC(T1),expectedDangerous:false},
  {name:"traceless flavor direction 2",C:imaginaryC(T2),expectedDangerous:false},
  {name:"real off-diagonal face relation",C:diag([Z(1),Z(2),Z(3)]),expectedDangerous:false}
].map(x=>{
  const marginal=partialFlavor(A,x.C,B),im=Math.abs(marginal[0][1].im);
  return {...x,marginal,imaginaryOffDiagonal:im,dangerous:im>1e-12};
});
const report={
  protocol:"real-face-marginal-perturbation-space/1",
  generalForm:"delta R=[[A,C],[C^dagger,B]], A and B Hermitian, C arbitrary complex 3x3",
  dimensions:{
    hermitian6Real:36,
    realityConstraintRank:1,
    realMarginalKernel:35
  },
  criterion:"Tr_flavor(delta R) is in H2(R) iff Im Tr(C)=0.",
  pauliForm:"The forbidden marginal functional is the coefficient of sigma_y tensor I_3. sigma_y tensor traceless flavor matrices have zero face partial trace.",
  cases,
  gaugeObservation:"Because both dressed faces carry the same gauge representation, a common gauge phase conjugates delta R trivially and does not forbid the sigma_y tensor I_3 direction.",
  protectionGate:"Real-marginal stability requires one flavor-singlet condition, not microscopic entrywise reality or removal of all complex face-flavor correlations."
};
report.passed=report.dimensions.realMarginalKernel===35&&
  cases.every(x=>x.dangerous===x.expectedDangerous)&&
  cases[0].imaginaryOffDiagonal>0&&cases.slice(1).every(x=>x.imaginaryOffDiagonal<1e-12);
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
