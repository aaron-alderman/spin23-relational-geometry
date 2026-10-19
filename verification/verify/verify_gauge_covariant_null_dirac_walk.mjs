#!/usr/bin/env node

const z=(re=0,im=0)=>({re,im});
const add=(a,b)=>z(a.re+b.re,a.im+b.im);
const mul=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const scale=(a,s)=>z(a.re*s,a.im*s);
const conj=a=>z(a.re,-a.im);
const abs=a=>Math.hypot(a.re,a.im);
const phase=x=>z(Math.cos(x),Math.sin(x));
const idx=(n,N)=>((n%N)+N)%N;
const norm=psi=>psi.reduce((s,v)=>s+v.reduce((t,x)=>t+abs(x)**2,0),0);
const maxStateDiff=(a,b)=>Math.max(...a.flatMap((v,n)=>v.map((x,j)=>abs(add(x,scale(b[n][j],-1))))));
const applyCoin=(v,angle)=>{
  const c=Math.cos(angle),s=Math.sin(angle);
  return [add(scale(v[0],c),mul(z(0,-s),v[1])),add(mul(z(0,-s),v[0]),scale(v[1],c))];
};
const coinLayer=(psi,angle)=>psi.map(v=>applyCoin(v,angle));
const shift=(psi,links,charges=[1,1])=>{
  const N=psi.length,out=Array.from({length:N},()=>[z(),z()]);
  for(let n=0;n<N;n++){
    out[n][0]=mul(phase(charges[0]*links[idx(n-1,N)]),psi[idx(n-1,N)][0]);
    out[n][1]=mul(phase(-charges[1]*links[n]),psi[idx(n+1,N)][1]);
  }
  return out;
};
const step=(psi,links,m,charges=[1,1])=>coinLayer(shift(coinLayer(psi,m/2),links,charges),m/2);
const gaugeState=(psi,alpha,charges=[1,1])=>psi.map((v,n)=>v.map((x,j)=>mul(phase(charges[j]*alpha[n]),x)));
const gaugeLinks=(links,alpha)=>links.map((A,n)=>A+alpha[idx(n+1,links.length)]-alpha[n]);

const N=11;
const psi=Array.from({length:N},(_,n)=>[
  z(Math.sin(.37*n)+.2*Math.cos(.11*n),.13*Math.sin(.7*n)),
  z(.31*Math.cos(.41*n),-.17*Math.sin(.23*n))
]);
const links=Array.from({length:N},(_,n)=>.27*Math.sin(.83*n)+.09*Math.cos(.31*n));
const alpha=Array.from({length:N},(_,n)=>.43*Math.sin(.57*n)-.21*Math.cos(.19*n));
const m=.38;

const vectorCharges=[1,1];
const evolved=step(psi,links,m,vectorCharges);
const evolvedGaugeInput=step(gaugeState(psi,alpha,vectorCharges),gaugeLinks(links,alpha),m,vectorCharges);
const gaugeEvolved=gaugeState(evolved,alpha,vectorCharges);
const vectorGaugeCovarianceError=maxStateDiff(evolvedGaugeInput,gaugeEvolved);
const normError=Math.abs(norm(evolved)-norm(psi));

const chiralCharges=[2,-1];
const chiralMassless=shift(psi,links,chiralCharges);
const chiralMasslessGauge=shift(gaugeState(psi,alpha,chiralCharges),gaugeLinks(links,alpha),chiralCharges);
const chiralMasslessExpected=gaugeState(chiralMassless,alpha,chiralCharges);
const chiralMasslessCovarianceError=maxStateDiff(chiralMasslessGauge,chiralMasslessExpected);
const chiralMassive=step(psi,links,m,chiralCharges);
const chiralMassiveGauge=step(gaugeState(psi,alpha,chiralCharges),gaugeLinks(links,alpha),m,chiralCharges);
const chiralMassiveExpected=gaugeState(chiralMassive,alpha,chiralCharges);
const fixedCoinChiralCovarianceError=maxStateDiff(chiralMassiveGauge,chiralMassiveExpected);

const matrixMul=(A,B)=>A.map((row,i)=>B[0].map((_,j)=>row.reduce((s,a,k)=>add(s,mul(a,B[k][j])),z())));
const matrixDiff=(A,B)=>Math.max(...A.flatMap((row,i)=>row.map((x,j)=>abs(add(x,scale(B[i][j],-1))))));
const dressedCoin=(angle,theta)=>[
  [z(Math.cos(angle)),mul(z(0,-Math.sin(angle)),phase(theta))],
  [mul(z(0,-Math.sin(angle)),phase(-theta)),z(Math.cos(angle))]
];
let maximumDressedCoinCovarianceError=0;
for(let n=0;n<N;n++){
  const G=[[phase(chiralCharges[0]*alpha[n]),z()],[z(),phase(chiralCharges[1]*alpha[n])]];
  const Ginv=[[conj(G[0][0]),z()],[z(),conj(G[1][1])]];
  const theta=.2*Math.sin(.3*n);
  const thetaPrime=theta+(chiralCharges[0]-chiralCharges[1])*alpha[n];
  const transformedByFields=dressedCoin(m/2,thetaPrime);
  const transformedByConjugation=matrixMul(matrixMul(G,dressedCoin(m/2,theta)),Ginv);
  maximumDressedCoinCovarianceError=Math.max(maximumDressedCoinCovarianceError,matrixDiff(transformedByFields,transformedByConjugation));
}

const report={
  protocol:"gauge-covariant-null-dirac-walk/1",
  vectorlike:{charges:vectorCharges,normError,gaugeCovarianceError:vectorGaugeCovarianceError},
  chiral:{
    charges:chiralCharges,
    masslessShiftCovarianceError:chiralMasslessCovarianceError,
    fixedMassCoinCovarianceError:fixedCoinChiralCovarianceError,
    fixedCoinFails:fixedCoinChiralCovarianceError>1e-3
  },
  dressedCoin:{
    offDiagonalPhaseLaw:"theta -> theta+(q_R-q_L) alpha",
    maximumCovarianceError:maximumDressedCoinCovarianceError
  },
  interpretation:[
    "Link phases make the conditional null shift exactly locally U(1)-covariant and preserve norm.",
    "A fixed mixing coin is gauge covariant when the two faces have the same charge.",
    "When q_R differs from q_L, the massless shifts remain covariant but a fixed mass coin fails covariance.",
    "A local off-diagonal dressing with charge q_R-q_L restores coin covariance, the lattice analogue of Higgs/Yukawa dressing.",
    "This checks an Abelian one-particle operator identity, not the Standard-Model path integral, anomaly, or interacting continuum limit."
  ]
};
report.passed=normError<1e-12&&vectorGaugeCovarianceError<1e-12&&chiralMasslessCovarianceError<1e-12&&
  fixedCoinChiralCovarianceError>1e-3&&maximumDressedCoinCovarianceError<1e-12;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
