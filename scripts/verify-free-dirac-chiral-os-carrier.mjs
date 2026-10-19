#!/usr/bin/env node

const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(a,A)=>A.map(r=>r.map(x=>a*x));
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const I=[[1,0],[0,1]],sx=[[0,1],[1,0]],sz=[[1,0],[0,-1]];
const trace=A=>A[0][0]+A[1][1];
const det=A=>A[0][0]*A[1][1]-A[0][1]*A[1][0];
const maxAbs=A=>Math.max(...A.flat().map(Math.abs));
const m=2,k=1.5,omega=Math.hypot(m,k);
const h=add(scale(k,sz),scale(m,sx));
const h2=mul(h,h);
const P=scale(0.5,add(I,scale(1/omega,h)));
const P2=mul(P,P);
const eigenvalues=[0,1]; // follows from h^2=omega^2 I.
const times=[0.15,0.7,1.2];
const K=[];
for(let i=0;i<times.length;i++)for(let a=0;a<2;a++){
  const row=[];
  for(let j=0;j<times.length;j++)for(let b=0;b<2;b++)
    row.push(Math.exp(-omega*(times[i]+times[j]))*P[a][b]);
  K.push(row);
}
const quadratic=(A,v)=>v.reduce((sum,x,i)=>
  sum+x*v.reduce((s,y,j)=>s+A[i][j]*y,0),0);
const tests=[
  [1,0,0,0,0,0],
  [0,1,-1,0,0.5,0.2],
  [1,-2,0.3,0.7,-0.4,1.1]
];
const lorentz={
  t:trace(P)/2,
  x:(P[0][0]-P[1][1])/2,
  y:P[0][1]
};
const report={
  protocol:"free-dirac-chiral-os-carrier/1",
  scope:"one free massive Dirac fixed-helicity/momentum sector in a real chiral basis",
  parameters:{mass:m,momentum:k,omega},
  chiralHamiltonian:{formula:"h(k)=k sigma_z + m sigma_x",matrix:h},
  checks:{
    hSquared:h2,
    hSquaredEqualsOmegaSquaredIdentity:maxAbs(add(h2,scale(-(omega**2),I)))<1e-12,
    positiveEnergyProjector:P,
    projectorIdempotent:maxAbs(add(P2,scale(-1,P)))<1e-12,
    projectorTrace:trace(P),
    projectorDeterminant:det(P),
    projectorEigenvalues:eigenvalues
  },
  osKernel:{
    formula:"K_{ia,jb}=exp[-omega(t_i+t_j)] P_+(k)_{ab}",
    positiveTimes:times,
    matrix:K,
    testedQuadraticForms:tests.map(v=>quadratic(K,v)),
    factorization:"P_+=u u^T and exp[-omega(t_i+t_j)]=q_i q_j, so K=(q tensor u)(q tensor u)^T."
  },
  jordanCoordinates:{
    ...lorentz,
    determinantIdentityError:Math.abs(det(P)-
      (lorentz.t**2-lorentz.x**2-lorentz.y**2)),
    interpretation:"The reflected positive-energy projector is a rank-one boundary ray of H2(R)_+; mass is the off-diagonal chiral relation."
  },
  physics:[
    "At m=0 the two chiral faces decouple and the projector lies on a diagonal cone ray.",
    "At m nonzero the mass term supplies the real off-diagonal relation.",
    "Changing momentum sign exchanges the diagonal chiral weighting while preserving positivity."
  ],
  limitations:[
    "This is a free fixed-helicity checkpoint, not an interacting four-dimensional OS theorem.",
    "Gauge dressing, wave-function renormalization, multiparticle cuts and contact terms remain to be included.",
    "Generic spin/momentum directions can produce complex Pauli components; the CP-even real projection must then be justified."
  ]
};
report.passed=report.checks.hSquaredEqualsOmegaSquaredIdentity&&
  report.checks.projectorIdempotent&&Math.abs(trace(P)-1)<1e-12&&
  Math.abs(det(P))<1e-12&&
  report.osKernel.testedQuadraticForms.every(x=>x>=-1e-10)&&
  report.jordanCoordinates.determinantIdentityError<1e-12;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
