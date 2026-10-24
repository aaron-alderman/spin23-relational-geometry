import fs from "node:fs";

const N=5,LAYERS=6,TAU=2*Math.PI;
const IN=new URL("../evidence/data/five-channel-microwave-ideal-compile-6layer-8bit-v1.json",import.meta.url);
const OUT=new URL("../evidence/data/five-channel-microwave-drift-envelope-v1.json",import.meta.url);
const compiled=JSON.parse(fs.readFileSync(IN));

const mat=()=>({r:new Float64Array(N*N),i:new Float64Array(N*N)});
const eye=()=>{const A=mat();for(let k=0;k<N;k++)A.r[k*N+k]=1;return A;};
const mul=(A,B)=>{const C=mat();for(let a=0;a<N;a++)for(let b=0;b<N;b++){let rr=0,ii=0;for(let k=0;k<N;k++){const ar=A.r[a*N+k],ai=A.i[a*N+k],br=B.r[k*N+b],bi=B.i[k*N+b];rr+=ar*br-ai*bi;ii+=ar*bi+ai*br;}C.r[a*N+b]=rr;C.i[a*N+b]=ii;}return C;};
const pairLayer=(pairs,errors=[])=>{const A=eye();for(let q=0;q<pairs.length;q++){const [a,b]=pairs[q],theta=Math.PI/4+(errors[q]??0),c=Math.cos(theta),s=Math.sin(theta);A.r[a*N+a]=c;A.r[b*N+b]=c;A.i[a*N+b]=-s;A.i[b*N+a]=-s;}return A;};
const mixer=(errors=[0,0,0,0])=>mul(pairLayer([[0,1],[2,3]],errors.slice(0,2)),pairLayer([[1,2],[3,4]],errors.slice(2,4)));
const diag=(words,phaseErrors,amplitudeDb)=>{const D=mat();for(let k=0;k<N;k++){const p=TAU*words[k]/256+phaseErrors[k],a=10**(amplitudeDb[k]/20);D.r[k*N+k]=a*Math.cos(p);D.i[k*N+k]=a*Math.sin(p);}return D;};
const architecture=(words,mixerErrors,phaseErrors,amplitudeDb)=>{let U=mixer(mixerErrors[0]);for(let m=0;m<LAYERS;m++)U=mul(mixer(mixerErrors[m+1]),mul(diag(words.slice(m*N,(m+1)*N),phaseErrors[m],amplitudeDb[m]),U));return U;};
const normalizedShapeError=(A,B)=>{let ar=0,ai=0,na=0,nb=0;for(let k=0;k<N*N;k++){ar+=A.r[k]*B.r[k]+A.i[k]*B.i[k];ai+=A.i[k]*B.r[k]-A.r[k]*B.i[k];na+=A.r[k]**2+A.i[k]**2;nb+=B.r[k]**2+B.i[k]**2;}const f=Math.min(1,Math.hypot(ar,ai)/Math.sqrt(na*nb));return Math.sqrt(Math.max(0,2-2*f));};

const zeroMix=()=>Array.from({length:LAYERS+1},()=>Array(4).fill(0));
const zeroPhase=()=>Array.from({length:LAYERS},()=>Array(N).fill(0));
const targets=Object.fromEntries(Object.entries(compiled.results).map(([name,x])=>[name,{words:x.phaseWords,baseline:architecture(x.phaseWords,zeroMix(),zeroPhase(),zeroPhase())}]));

let state=0xd21f7a9b;
const rand=()=>{state|=0;state=(state+0x6D2B79F5)|0;let t=Math.imul(state^(state>>>15),1|state);t=(t+Math.imul(t^(t>>>7),61|t))^t;return ((t^(t>>>14))>>>0)/4294967296;};
const sym=bound=>(2*rand()-1)*bound;
const deg=x=>x*Math.PI/180;
const percentile=(xs,p)=>xs.slice().sort((a,b)=>a-b)[Math.min(xs.length-1,Math.floor(p*xs.length))];

const base={couplerAngleDegrees:0.05,phaseStateDegrees:0.10,amplitudeStateDb:0.01};
const scales=[0,0.25,0.5,1,2,2.5,3,3.5,3.75,4,8];
const trials=1000,rows=[];
for(const scale of scales){
  const maxima=[];
  for(let trial=0;trial<trials;trial++){
    const me=Array.from({length:LAYERS+1},()=>Array.from({length:4},()=>deg(sym(scale*base.couplerAngleDegrees))));
    const pe=Array.from({length:LAYERS},()=>Array.from({length:N},()=>deg(sym(scale*base.phaseStateDegrees))));
    const ae=Array.from({length:LAYERS},()=>Array.from({length:N},()=>sym(scale*base.amplitudeStateDb)));
    let worst=0;
    for(const x of Object.values(targets))worst=Math.max(worst,normalizedShapeError(architecture(x.words,me,pe,ae),x.baseline));
    maxima.push(worst);
  }
  rows.push({scale,couplerAngleDegrees:scale*base.couplerAngleDegrees,phaseStateDegrees:scale*base.phaseStateDegrees,amplitudeStateDb:scale*base.amplitudeStateDb,median:percentile(maxima,.5),p95:percentile(maxima,.95),maximum:Math.max(...maxima),passesP95:percentile(maxima,.95)<=.015});
}

const lastPassing=rows.filter(x=>x.passesP95).at(-1)??null;
const weakestCrossAmplitude=4/13,weakestCrossRelativeDb=-20*Math.log10(weakestCrossAmplitude),phasePathLossDb=36,clearanceDb=20;
const dynamicRange={weakestCrossAmplitude,weakestCrossRelativeDb,phasePathLossDb,requiredFormula:"phasePathLossDb + ancillaryLossDb + weakestCrossRelativeDb + clearanceDb",examples:[5,10,15].map(ancillaryLossDb=>({ancillaryLossDb,requiredDynamicRangeDb:phasePathLossDb+ancillaryLossDb+weakestCrossRelativeDb+clearanceDb}))};
const output={schema:"five-channel-microwave-drift-envelope/1",date:"2026-10-25",seed:"0xd21f7a9b",trialsPerScale:trials,metric:"global-complex-scale-invariant normalized shape error",baseUnit:base,allowance:.015,rows,lastPassing,dynamicRange,boundary:"drift envelope uses the ideal calibrated mixer and frozen eight-bit words; it does not replace measured/full-wave F(f) compilation"};
if(process.argv.includes("--write"))fs.writeFileSync(OUT,JSON.stringify(output,null,2)+"\n");
console.log(JSON.stringify(output));

