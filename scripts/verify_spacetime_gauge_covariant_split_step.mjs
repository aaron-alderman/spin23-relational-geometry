#!/usr/bin/env node

const z=(re=0,im=0)=>({re,im});
const add=(a,b)=>z(a.re+b.re,a.im+b.im),mul=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),scale=(a,s)=>z(a.re*s,a.im*s),abs=a=>Math.hypot(a.re,a.im),phase=x=>z(Math.cos(x),Math.sin(x));
const idx=(n,N)=>((n%N)+N)%N;
const norm=psi=>psi.reduce((s,v)=>s+v.reduce((t,x)=>t+abs(x)**2,0),0);
const maxDiff=(a,b)=>Math.max(...a.flatMap((v,n)=>v.map((x,j)=>abs(add(x,scale(b[n][j],-1))))));
const coin=(psi,angle,phis)=>psi.map((v,n)=>{const c=Math.cos(angle),s=Math.sin(angle),p=phis[n];return [add(scale(v[0],c),mul(z(0,-s),mul(phase(p),v[1]))),add(mul(z(0,-s),mul(phase(-p),v[0])),scale(v[1],c))];});
const shiftMinus=(psi,A,q)=>{const N=psi.length,out=Array.from({length:N},()=>[z(),z()]);for(let n=0;n<N;n++){out[n][0]=mul(phase(q[0]*A[idx(n-1,N)]),psi[idx(n-1,N)][0]);out[n][1]=psi[n][1];}return out;};
const shiftPlus=(psi,A,q)=>{const N=psi.length,out=Array.from({length:N},()=>[z(),z()]);for(let n=0;n<N;n++){out[n][0]=psi[n][0];out[n][1]=mul(phase(-q[1]*A[n]),psi[idx(n+1,N)][1]);}return out;};
const temporal=(psi,B,q)=>psi.map((v,n)=>v.map((x,a)=>mul(phase(q[a]*B[n]),x)));
const gaugeState=(psi,alpha,q)=>psi.map((v,n)=>v.map((x,a)=>mul(phase(q[a]*alpha[n]),x)));
const gaugeSpatial=(A,alpha)=>A.map((x,n)=>x+alpha[idx(n+1,A.length)]-alpha[n]);
const gaugeTemporal=(B,from,to)=>B.map((x,n)=>x+to[n]-from[n]);
const gaugePhi=(phi,alpha,q)=>phi.map((x,n)=>x+(q[0]-q[1])*alpha[n]);
const evolve=(psi,d)=>{
  let x=coin(psi,d.t1,d.phi1); x=temporal(x,d.B[0],d.q);
  x=shiftMinus(x,d.Aminus,d.q); x=temporal(x,d.B[1],d.q);
  x=coin(x,d.t2,d.phi2); x=temporal(x,d.B[2],d.q);
  x=shiftPlus(x,d.Aplus,d.q); x=temporal(x,d.B[3],d.q);
  return x;
};

const N=9,q=[-1/2,-1];
const data={q,t1:.29,t2:-.29,
  phi1:Array.from({length:N},(_,n)=>.17*Math.sin(.3*n)),phi2:Array.from({length:N},(_,n)=>-.19*Math.cos(.4*n)),
  Aminus:Array.from({length:N},(_,n)=>.13*Math.sin(.6*n)),Aplus:Array.from({length:N},(_,n)=>-.09*Math.cos(.51*n)),
  B:Array.from({length:4},(_,s)=>Array.from({length:N},(_,n)=>.07*Math.sin(.37*n+.41*s)))};
const psi=Array.from({length:N},(_,n)=>[z(.3*Math.sin(.2*n),.11*Math.cos(.7*n)),z(.27*Math.cos(.43*n),-.16*Math.sin(.31*n))]);
const alpha=Array.from({length:5},(_,s)=>Array.from({length:N},(_,n)=>.32*Math.sin(.23*n+.52*s)-.08*Math.cos(.61*n-.17*s)));
const evolved=evolve(psi,data);
const transformed={...data,
  phi1:gaugePhi(data.phi1,alpha[0],q),phi2:gaugePhi(data.phi2,alpha[2],q),
  Aminus:gaugeSpatial(data.Aminus,alpha[1]),Aplus:gaugeSpatial(data.Aplus,alpha[3]),
  B:data.B.map((b,s)=>gaugeTemporal(b,alpha[s],alpha[s+1]))};
const evolvedTransformed=evolve(gaugeState(psi,alpha[0],q),transformed);
const expected=gaugeState(evolved,alpha[4],q);
const covarianceError=maxDiff(evolvedTransformed,expected),normError=Math.abs(norm(evolved)-norm(psi));
const bad={...transformed,B:data.B.map(b=>b.slice())};
const missingTemporalTransportError=maxDiff(evolve(gaugeState(psi,alpha[0],q),bad),expected);
const report={
  protocol:"spacetime-gauge-covariant-split-step/1",
  slices:["C1 at 0","Sminus at 1","C2 at 2","Splus at 3","output at 4"],
  spatialLinkLaw:"A_s(n)->A_s(n)+alpha_s(n+1)-alpha_s(n)",
  temporalLinkLaw:"B_s(n)->B_s(n)+alpha_(s+1)(n)-alpha_s(n)",
  higgsCoinLaw:"phi_s(n)->phi_s(n)+(q0-q1)alpha_s(n)",
  normError,covarianceError,missingTemporalTransportError,
  temporalLinksNecessary:missingTemporalTransportError>1e-3,
  geometry:{
    temporalEdges:"Delta x=0 with positive substep time, hence timelike in a Lorentzian embedding",
    spatialMovingEdges:"can be assigned causal or null displacement depending on the chosen substep duration",
    conclusion:"full substep-resolved gauge covariance makes timelike temporal transport explicit"
  },
  interpretation:[
    "Independent gauge transformations on all five substep slices are exactly covariant when spatial and temporal links transform as a spacetime lattice connection.",
    "Leaving temporal links inert produces a finite covariance failure.",
    "The two Higgs coins live on their own time slices and obey the local intertwiner law there.",
    "Temporal links are unitary and local but correspond to stationary timelike edges, so a literal all-relations-null ontology is not maintained.",
    "This is still a one-particle Abelian construction and does not establish gauge dynamics, Gauss law, or anomalies."
  ]
};
report.passed=normError<1e-12&&covarianceError<1e-12&&missingTemporalTransportError>1e-3;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
