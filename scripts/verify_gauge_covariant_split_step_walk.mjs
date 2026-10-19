#!/usr/bin/env node

const z=(re=0,im=0)=>({re,im});
const add=(a,b)=>z(a.re+b.re,a.im+b.im),mul=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),scale=(a,s)=>z(a.re*s,a.im*s),abs=a=>Math.hypot(a.re,a.im),phase=x=>z(Math.cos(x),Math.sin(x));
const idx=(n,N)=>((n%N)+N)%N;
const norm=psi=>psi.reduce((s,v)=>s+v.reduce((t,x)=>t+abs(x)**2,0),0);
const maxDiff=(a,b)=>Math.max(...a.flatMap((v,n)=>v.map((x,j)=>abs(add(x,scale(b[n][j],-1))))));
const coinAt=(v,angle,phi)=>{
  const c=Math.cos(angle),s=Math.sin(angle);
  return [add(scale(v[0],c),mul(z(0,-s),mul(phase(phi),v[1]))),add(mul(z(0,-s),mul(phase(-phi),v[0])),scale(v[1],c))];
};
const coinLayer=(psi,angle,phis)=>psi.map((v,n)=>coinAt(v,angle,phis[n]));
const shiftMinus=(psi,links,charges)=>{
  const N=psi.length,out=Array.from({length:N},()=>[z(),z()]);
  for(let n=0;n<N;n++){out[n][0]=mul(phase(charges[0]*links[idx(n-1,N)]),psi[idx(n-1,N)][0]);out[n][1]=psi[n][1];}
  return out;
};
const shiftPlus=(psi,links,charges)=>{
  const N=psi.length,out=Array.from({length:N},()=>[z(),z()]);
  for(let n=0;n<N;n++){out[n][0]=psi[n][0];out[n][1]=mul(phase(-charges[1]*links[n]),psi[idx(n+1,N)][1]);}
  return out;
};
const step=(psi,links,charges,t1,t2,phi1,phi2)=>shiftPlus(coinLayer(shiftMinus(coinLayer(psi,t1,phi1),links,charges),t2,phi2),links,charges);
const gaugeState=(psi,alpha,charges)=>psi.map((v,n)=>v.map((x,j)=>mul(phase(charges[j]*alpha[n]),x)));
const gaugeLinks=(links,alpha)=>links.map((A,n)=>A+alpha[idx(n+1,links.length)]-alpha[n]);
const gaugeCoinPhases=(phis,alpha,charges)=>phis.map((p,n)=>p+(charges[0]-charges[1])*alpha[n]);

const N=13,charges=[-1/2,-1],t1=.31,t2=-.31;
const psi=Array.from({length:N},(_,n)=>[z(.4*Math.sin(.31*n),.2*Math.cos(.53*n)),z(.3*Math.cos(.47*n),-.17*Math.sin(.29*n))]);
const links=Array.from({length:N},(_,n)=>.16*Math.sin(.71*n)-.08*Math.cos(.37*n));
const alpha=Array.from({length:N},(_,n)=>.38*Math.sin(.43*n)+.11*Math.cos(.67*n));
const phi1=Array.from({length:N},(_,n)=>.21*Math.sin(.23*n));
const phi2=Array.from({length:N},(_,n)=>-.13*Math.cos(.41*n));
const evolved=step(psi,links,charges,t1,t2,phi1,phi2);
const transformedInput=gaugeState(psi,alpha,charges),transformedLinks=gaugeLinks(links,alpha);
const transformedPhi1=gaugeCoinPhases(phi1,alpha,charges),transformedPhi2=gaugeCoinPhases(phi2,alpha,charges);
const evolvedTransformed=step(transformedInput,transformedLinks,charges,t1,t2,transformedPhi1,transformedPhi2);
const expected=gaugeState(evolved,alpha,charges);
const fullCovarianceError=maxDiff(evolvedTransformed,expected);
const normError=Math.abs(norm(evolved)-norm(psi));
const badPhi2=phi2.slice();
const badEvolved=step(transformedInput,transformedLinks,charges,t1,t2,transformedPhi1,badPhi2);
const undressedSecondCoinError=maxDiff(badEvolved,expected);

const report={
  protocol:"gauge-covariant-split-step-walk/1",
  update:"U=S_plus[A] C2[Phi2] S_minus[A] C1[Phi1]",
  charges,
  normError,
  fullCovarianceError,
  undressedSecondCoinError,
  bothCoinsMustTransform:undressedSecondCoinError>1e-3,
  staticGaugeScope:{
    checked:"site-dependent spatial U(1) gauge transformations common to all substeps",
    notChecked:"independent time-dependent gauge transformations at intermediate substep times",
    missingForFullSpacetimeGaugeTheory:"temporal link variables or a declared instantaneous operator factorization"
  },
  interpretation:[
    "Each partial conditional shift is exactly gauge covariant when its moving component carries the appropriate oriented link transporter.",
    "For unequal face charges, both local coins must transform as Higgs intertwiners; dressing only one coin fails covariance.",
    "The complete static-gauge split step is exactly norm preserving and covariant.",
    "Gauge covariance permits two ordered Higgs coins but does not select their angles, relative phase, or internal Furey block origin.",
    "A fully spacetime-dependent gauge transformation requires temporal transport between substeps or treating the factorization as internal to one time slice."
  ]
};
report.passed=normError<1e-12&&fullCovarianceError<1e-12&&undressedSecondCoinError>1e-3;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
