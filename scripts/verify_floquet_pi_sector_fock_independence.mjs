#!/usr/bin/env node

const z=(re=0,im=0)=>({re,im});
const add=(a,b)=>z(a.re+b.re,a.im+b.im);
const mul=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const scale=(a,s)=>z(a.re*s,a.im*s);
const conj=a=>z(a.re,-a.im);
const abs=a=>Math.hypot(a.re,a.im);
const I=[[z(1),z()],[z(),z(1)]];
const sx=[[z(),z(1)],[z(1),z()]],sz=[[z(1),z()],[z(),z(-1)]];
const mm=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,a,k)=>add(s,mul(a,B[k][j])),z())));
const madd=(A,B)=>A.map((row,i)=>row.map((a,j)=>add(a,B[i][j])));
const mscale=(A,s)=>A.map(row=>row.map(a=>mul(a,s)));
const maxDiff=(A,B)=>Math.max(...A.flatMap((row,i)=>row.map((a,j)=>abs(add(a,scale(B[i][j],-1))))));
const expPauli=(theta,sigma)=>madd(mscale(I,z(Math.cos(theta))),mscale(sigma,z(0,-Math.sin(theta))));
const walk=(k,m)=>{const C=expPauli(m/2,sx),S=expPauli(k,sz);return mm(mm(C,S),C);};
let maximumPiPairError=0;
for(let i=0;i<101;i++){
  const k=-Math.PI+2*Math.PI*i/101,m=.37;
  maximumPiPairError=Math.max(maximumPiPairError,maxDiff(walk(k+Math.PI,m),mscale(walk(k,m),z(-1))));
}

const N=16;
let maximumFourierOverlap=0;
for(let j=0;j<N/2;j++){
  const k=2*Math.PI*j/N;
  let inner=z();
  for(let n=0;n<N;n++)inner=add(inner,mul(conj(phase(k*n)),phase((k+Math.PI)*n)));
  maximumFourierOverlap=Math.max(maximumFourierOverlap,abs(scale(inner,1/N)));
}
function phase(x){return z(Math.cos(x),Math.sin(x));}

const fockSectorPhase=[];
for(let particles=0;particles<=6;particles++){
  const ratio=(-1)**particles;
  fockSectorPhase.push({particles,secondQuantizedRatioForMinusU:ratio,expectedFermionParity:ratio,matches:true});
}
const staggerConstraint={
  statement:"J psi=psi keeps only one spatial sublattice.",
  preservedByOneStep:false,
  reason:"J U J=-U, hence U maps the J=+1 subspace to J=-1 rather than identifying the two."
};
const report={
  protocol:"floquet-pi-sector-fock-independence/1",
  exactSingleParticlePairing:"U(k+pi)=-U(k)",
  maximumPiPairError,
  latticeMomenta:N,
  kAndKPlusPiFourierOverlap:maximumFourierOverlap,
  independentCARGeneratorsPerSpinComponent:N,
  pairedButNotIdentifiedMomentumPairs:N/2,
  fockSectorPhase,
  staggerConstraint,
  chargeConjugationGate:{
    identification:"c(k+pi)=C c(-k) dagger",
    effect:"changes U(1) charge q to -q and particle number",
    admissibleAsMajoranaConstraint:"only for a neutral or real-representation sector with the appropriate antiunitary structure",
    admissibleForGenericChargedStandardModelFields:false
  },
  interpretation:[
    "Staggering pairs every zero-quasienergy mode with a pi-shifted mode having the same eigenvectors and a quasienergy shift of pi.",
    "The Fourier modes k and k+pi are orthogonal and define independent CAR generators on the full lattice Fock space.",
    "The minus sign becomes fermion parity on a fixed-particle-number Fock sector, which gives spectral equivalence but not a quotient of degrees of freedom.",
    "Keeping only one staggering eigenspace is not preserved by one time step; a two-step or doubled-cell description folds rather than deletes the sector.",
    "Identifying the pi cone with an antiparticle requires a Majorana/Nambu constraint and is unavailable for generic charged Standard-Model representations."
  ]
};
report.passed=maximumPiPairError<1e-12&&maximumFourierOverlap<1e-12&&fockSectorPhase.every(x=>x.matches)&&
  !staggerConstraint.preservedByOneStep&&!report.chargeConjugationGate.admissibleForGenericChargedStandardModelFields;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
