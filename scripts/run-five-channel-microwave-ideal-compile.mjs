import fs from "node:fs";

const readInt=(name,fallback)=>{const p=process.argv.find(x=>x.startsWith(`--${name}=`));return p?Number.parseInt(p.split("=")[1],10):fallback;};
const N=5, LAYERS=readInt("layers",6), BITS=readInt("bits",6), LEVELS=2**BITS, TAU=2*Math.PI;
const outName=LAYERS===6&&BITS===6?"five-channel-microwave-ideal-compile-v1.json":`five-channel-microwave-ideal-compile-${LAYERS}layer-${BITS}bit-v1.json`;
const OUT=new URL(`../evidence/data/${outName}`,import.meta.url);

const mat=()=>({r:new Float64Array(N*N),i:new Float64Array(N*N)});
const eye=()=>{const A=mat();for(let k=0;k<N;k++)A.r[k*N+k]=1;return A;};
const realMat=A=>{const X=mat();for(let a=0;a<N;a++)for(let b=0;b<N;b++)X.r[a*N+b]=A[a][b];return X;};
const mul=(A,B)=>{const C=mat();for(let a=0;a<N;a++)for(let b=0;b<N;b++){let rr=0,ii=0;for(let k=0;k<N;k++){const ar=A.r[a*N+k],ai=A.i[a*N+k],br=B.r[k*N+b],bi=B.i[k*N+b];rr+=ar*br-ai*bi;ii+=ar*bi+ai*br;}C.r[a*N+b]=rr;C.i[a*N+b]=ii;}return C;};
const diag=ph=>{const D=mat();for(let k=0;k<N;k++){D.r[k*N+k]=Math.cos(ph[k]);D.i[k*N+k]=Math.sin(ph[k]);}return D;};
const pairLayer=pairs=>{const A=eye(),q=1/Math.sqrt(2);for(const [a,b] of pairs){A.r[a*N+a]=q;A.r[b*N+b]=q;A.i[a*N+b]=-q;A.i[b*N+a]=-q;}return A;};
const F=mul(pairLayer([[0,1],[2,3]]),pairLayer([[1,2],[3,4]]));

const architecture=phases=>{let U=F;for(let m=0;m<LAYERS;m++)U=mul(F,mul(diag(phases.slice(m*N,(m+1)*N)),U));return U;};
const overlap=(T,U)=>{let r=0,i=0;for(let k=0;k<N*N;k++){r+=T.r[k]*U.r[k]+T.i[k]*U.i[k];i+=T.r[k]*U.i[k]-T.i[k]*U.r[k];}return {r,i};};
const score=(T,U)=>{const z=overlap(T,U);return Math.hypot(z.r,z.i)/N;};
const errorFromScore=f=>Math.sqrt(Math.max(0,2-2*Math.min(1,f)));

const evaluate=(T,p)=>score(T,architecture(p));

// Analytic gradient of phase-invariant Hilbert--Schmidt fidelity.
const valueGradient=(T,p)=>{
  const states=[F];
  const Ds=[];
  for(let m=0;m<LAYERS;m++){const D=diag(p.slice(m*N,(m+1)*N));Ds.push(D);states.push(mul(F,mul(D,states[m])));}
  const U=states[LAYERS],z=overlap(T,U),zabs=Math.hypot(z.r,z.i),g=new Float64Array(LAYERS*N);
  const posts=Array(LAYERS);posts[LAYERS-1]=eye();
  for(let m=LAYERS-2;m>=0;m--)posts[m]=mul(posts[m+1],mul(F,Ds[m+1]));
  for(let m=0;m<LAYERS;m++){
    const left=mul(posts[m],F),right=states[m];
    for(let n=0;n<N;n++){
      const er=Math.cos(p[m*N+n]),ei=Math.sin(p[m*N+n]);
      // i exp(i phi)
      const dr=-ei,di=er;
      let dzr=0,dzi=0;
      for(let a=0;a<N;a++)for(let b=0;b<N;b++){
        const lr=left.r[a*N+n],li=left.i[a*N+n];
        const rr=right.r[n*N+b],ri=right.i[n*N+b];
        const xr=dr*rr-di*ri,xi=dr*ri+di*rr;
        const ur=lr*xr-li*xi,ui=lr*xi+li*xr;
        const tr=T.r[a*N+b],ti=T.i[a*N+b];
        dzr+=tr*ur+ti*ui;dzi+=tr*ui-ti*ur;
      }
      g[m*N+n]=zabs<1e-15?0:(z.r*dzr+z.i*dzi)/(N*zabs);
    }
  }
  return {value:zabs/N,gradient:g};
};

let rngState=0x51c0ffee;
const rand=()=>{rngState|=0;rngState=(rngState+0x6D2B79F5)|0;let t=Math.imul(rngState^(rngState>>>15),1|rngState);t=(t+Math.imul(t^(t>>>7),61|t))^t;return ((t^(t>>>14))>>>0)/4294967296;};
const wrap=x=>{x%=TAU;return x<0?x+TAU:x;};

const continuousCompile=(T,restarts=8,iterations=2200)=>{
  let best={score:-1,phases:null};
  for(let restart=0;restart<restarts;restart++){
    const p=Float64Array.from({length:LAYERS*N},()=>TAU*rand());
    const m=new Float64Array(p.length),v=new Float64Array(p.length);
    for(let it=1;it<=iterations;it++){
      const q=valueGradient(T,p),lr=0.055*Math.max(0.12,1-it/iterations);
      for(let k=0;k<p.length;k++){
        m[k]=0.9*m[k]+0.1*q.gradient[k];v[k]=0.999*v[k]+0.001*q.gradient[k]*q.gradient[k];
        const mh=m[k]/(1-Math.pow(0.9,it)),vh=v[k]/(1-Math.pow(0.999,it));
        p[k]=wrap(p[k]+lr*mh/(Math.sqrt(vh)+1e-8));
      }
      if(q.value>best.score)best={score:q.value,phases:Array.from(p)};
      if(errorFromScore(q.value)<1e-8)break;
    }
  }
  best.score=evaluate(T,best.phases);best.error=errorFromScore(best.score);return best;
};

const discreteCompile=(T,start)=>{
  const step=TAU/LEVELS;
  const words=Int16Array.from(start,x=>Math.round(wrap(x)/step)%LEVELS);
  const phases=()=>Array.from(words,x=>x*step);
  let best=evaluate(T,phases()),sweeps=0;
  for(;sweeps<12;sweeps++){
    const before=best;
    for(let k=0;k<words.length;k++){
      const old=words[k];let local=best,choice=old;
      for(let q=0;q<LEVELS;q++){words[k]=q;const f=evaluate(T,phases());if(f>local+1e-14){local=f;choice=q;}}
      words[k]=choice;best=local;
    }
    if(best-before<1e-12)break;
  }
  return {score:best,error:errorFromScore(best),sweeps:sweeps+1,words:Array.from(words),phasesRadians:phases()};
};

const mmReal=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const blockDiag=(A,B)=>Array.from({length:A.length+B.length},(_,i)=>Array.from({length:A.length+B.length},(_,j)=>i<A.length&&j<A.length?A[i][j]:i>=A.length&&j>=A.length?B[i-A.length][j-A.length]:0));
const c=-.5,s=Math.sqrt(3)/2;
const R2=[[c,-s],[s,c]],H2=[[-1,0],[0,-1]];
const R3=[[0,0,1],[1,0,0],[0,1,0]],H3=[[0,-1,0],[-1,0,0],[0,0,-1]];
const R=blockDiag(R2,R3),H=blockDiag(H2,H3);

const E=[[3/5,5/13],[4/5,0],[0,12/13]],gain=4/5,rt=Math.sqrt(.5);
const vp=[rt,rt],vm=[rt,-rt];
const mv=(A,v)=>A.map(r=>r.reduce((q,x,j)=>q+x*v[j],0));
const normalize=v=>{const z=Math.hypot(...v);return v.map(x=>x/z);};
const outer=(u,v)=>u.map(x=>v.map(y=>x*y));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(a,A)=>A.map(r=>r.map(x=>a*x));
const up=normalize(mv(E,vp)),um=normalize(mv(E,vm));
const e1=E.map(r=>r[0]),e2=E.map(r=>r[1]);
const u0=normalize([e1[1]*e2[2]-e1[2]*e2[1],e1[2]*e2[0]-e1[0]*e2[2],e1[0]*e2[1]-e1[1]*e2[0]]);
const cp=Math.sqrt(1-gain*gain*16/13),cm=Math.sqrt(1-gain*gain*10/13);
const A=add(scale(cp,outer(vp,vp)),scale(cm,outer(vm,vm)));
const D=scale(-1,add(add(scale(cp,outer(up,up)),scale(cm,outer(um,um))),outer(u0,u0)));
const Splus=Array.from({length:5},()=>Array(5).fill(0));
for(let i=0;i<2;i++)for(let j=0;j<2;j++)Splus[i][j]=A[i][j];
for(let i=0;i<3;i++)for(let j=0;j<2;j++){Splus[i+2][j]=gain*E[i][j];Splus[j][i+2]=gain*E[i][j];}
for(let i=0;i<3;i++)for(let j=0;j<3;j++)Splus[i+2][j+2]=D[i][j];

const targets={H,R,RH:mmReal(R,H),HR:mmReal(H,R),S_plus:Splus};
const results={};
for(const [name,T0] of Object.entries(targets)){
  const T=realMat(T0),continuous=continuousCompile(T),discrete=discreteCompile(T,continuous.phases);
  results[name]={continuousError:continuous.error,continuousScore:continuous.score,discreteError:discrete.error,discreteScore:discrete.score,discreteSweeps:discrete.sweeps,phaseWords:discrete.words};
  process.stderr.write(`${name}: continuous=${continuous.error.toExponential(4)} discrete=${discrete.error.toExponential(4)}\n`);
}

const centreThreshold=.03;
const passed=Object.values(results).every(x=>x.discreteError<=centreThreshold);
const output={
  schema:"five-channel-microwave-ideal-compile/1",date:"2026-10-25",
  architecture:{channels:N,phaseLayers:LAYERS,fixedMixingLayers:LAYERS+1,phaseElements:N*LAYERS,phaseBits:BITS,phaseLevels:LEVELS,fixedMixer:"alternating nearest-neighbour ideal 3 dB coupler layers"},
  objective:"phase-invariant normalized Frobenius error sqrt(2-2|Tr(T^dagger U)|/N)",
  optimizer:{continuous:"deterministic multi-start analytic-gradient Adam",discrete:`round then exhaustive coordinate descent over all ${LEVELS} states`,seed:"0x51c0ffee"},
  threshold:centreThreshold,results,passed,
  boundary:passed?"ideal-F discrete gate passes; measured/full-wave F and analysis-band gates remain":"ideal-F 6-bit gate fails; do not infer build readiness"
};
if(process.argv.includes("--write"))fs.writeFileSync(OUT,JSON.stringify(output,null,2)+"\n");
console.log(JSON.stringify(output));

