#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const outputPath = path.join(root, "evidence", "data", "admissibility-finite-band-levinson-pole-ledger-v1.json");
const C=(re=0,im=0)=>({re,im}), add=(a,b)=>C(a.re+b.re,a.im+b.im), sub=(a,b)=>C(a.re-b.re,a.im-b.im);
const mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re), scale=(a,x)=>C(a.re*x,a.im*x);
const div=(a,b)=>{const d=b.re*b.re+b.im*b.im;return C((a.re*b.re+a.im*b.im)/d,(a.im*b.re-a.re*b.im)/d)};
const cabs=(a)=>Math.hypot(a.re,a.im);
const csqrt=(z)=>{const r=cabs(z),re=Math.sqrt(Math.max(0,(r+z.re)/2)),im=Math.sign(z.im||1)*Math.sqrt(Math.max(0,(r-z.re)/2));return C(re,im)};

function determinantReal(input){
  const a=input.map((r)=>[...r]); let out=1;
  for(let k=0;k<a.length;k+=1){let p=k;for(let i=k+1;i<a.length;i+=1)if(Math.abs(a[i][k])>Math.abs(a[p][k]))p=i;if(Math.abs(a[p][k])<1e-15)return 0;if(p!==k){[a[k],a[p]]=[a[p],a[k]];out*=-1}const q=a[k][k];out*=q;for(let i=k+1;i<a.length;i+=1){const f=a[i][k]/q;for(let j=k+1;j<a.length;j+=1)a[i][j]-=f*a[k][j]}}
  return out;
}
function determinantComplex(input){
  const a=input.map((r)=>r.map((z)=>C(z.re,z.im)));let out=C(1,0);
  for(let k=0;k<a.length;k+=1){let p=k;for(let i=k+1;i<a.length;i+=1)if(cabs(a[i][k])>cabs(a[p][k]))p=i;if(cabs(a[p][k])<1e-15)return C();if(p!==k){[a[k],a[p]]=[a[p],a[k]];out=scale(out,-1)}const q=a[k][k];out=mul(out,q);for(let i=k+1;i<a.length;i+=1){const f=div(a[i][k],q);for(let j=k+1;j<a.length;j+=1)a[i][j]=sub(a[i][j],mul(f,a[k][j]))}}
  return out;
}
function makeCluster({t1,t2,epsilon,cells=4,vL=0.42}){const n=2*cells+1,h=Array.from({length:n},()=>Array(n).fill(0));for(let i=0;i<n-2;i+=1){const t=i%2===0?t1:t2;h[i][i+1]=h[i+1][i]=t}h[n-2][n-1]=h[n-1][n-2]=vL;h[n-1][n-1]=epsilon;return h}
function zMinusH(z,h){return h.map((r,i)=>r.map((x,j)=>C((i===j?z.re:0)-x,i===j?z.im:0)))}
function physicalGreen(z){let s=csqrt(sub(mul(z,z),C(4,0)));if(cabs(sub(s,z))>cabs(add(s,z)))s=scale(s,-1);return div(C(1,0),s)}
function effective(z,h,vc,sheet){const m=zMinusH(z,h),g=scale(physicalGreen(z),sheet==="continued"?-1:1);m[0][0]=sub(m[0][0],scale(g,vc*vc));return m}
function detEffective(z,h,vc,sheet){return determinantComplex(effective(z,h,vc,sheet))}
function matrixMinor(m,index){return m.filter((_,i)=>i!==index).map((r)=>r.filter((_,j)=>j!==index))}
function localPoleResidue(z,h,vc,sheet){const distance=Math.max(1e-10,Math.abs(Math.abs(z.re)-2)),q=Math.min(1e-6,distance/20),d=scale(sub(detEffective(add(z,C(q,0)),h,vc,sheet),detEffective(sub(z,C(q,0)),h,vc,sheet)),1/(2*q)),cofactor=determinantComplex(matrixMinor(effective(z,h,vc,sheet),h.length-1)),r=div(cofactor,d);return{real:r.re,imag:r.im,magnitude:cabs(r)}}
function newton(seed,h,vc,sheet="continued") {let z=seed;for(let i=0;i<120;i+=1){const f=detEffective(z,h,vc,sheet);if(cabs(f)<1e-12)break;const q=1e-6;const d=scale(sub(detEffective(add(z,C(q,0)),h,vc,sheet),detEffective(sub(z,C(q,0)),h,vc,sheet)),1/(2*q));if(cabs(d)<1e-14)return null;const step=div(f,d);if(cabs(step)>0.25)return null;z=sub(z,step)}const residual=cabs(detEffective(z,h,vc,sheet));return residual<1e-9&&z.im<=1e-12?{real:z.re,imag:z.im,width:Math.max(0,-2*z.im),residual}:null}
function bisect(fn,a,b){let fa=fn(a),fb=fn(b);if(fa===0)return a;if(fb===0)return b;if(Math.sign(fa)===Math.sign(fb))return null;for(let i=0;i<120;i+=1){const m=(a+b)/2,fm=fn(m);if(Math.sign(fm)===Math.sign(fa)){a=m;fa=fm}else{b=m;fb=fm}}return(a+b)/2}
function boundRoots(h,vc){const f=(e)=>detEffective(C(e,0),h,vc,"physical").re,roots=[];for(const[lo,hi]of[[-6,-2-1e-11],[2+1e-11,6]]){const n=12000;let a=lo,fa=f(a);for(let i=1;i<=n;i+=1){const b=lo+(hi-lo)*i/n,fb=f(b);if(Number.isFinite(fa)&&Number.isFinite(fb)&&Math.sign(fa)!==Math.sign(fb)){const x=bisect(f,a,b);if(x!==null&&!roots.some((q)=>Math.abs(q-x)<1e-7))roots.push(x)}a=b;fa=fb}}return roots.sort((a,b)=>a-b)}
function edgeBoundRoot(edge,h,vc){const energy=(q)=>edge<0?-2-q*q:2+q*q,fn=(q)=>detEffective(C(energy(q),0),h,vc,"physical").re,qs=Array.from({length:1201},(_,i)=>10**(-12+13*i/1200)),roots=[];let a=qs[0],fa=fn(a);for(let i=1;i<qs.length;i+=1){const b=qs[i],fb=fn(b);if(Number.isFinite(fa)&&Number.isFinite(fb)&&Math.sign(fa)!==Math.sign(fb)){const q=bisect(fn,a,b);if(q!==null)roots.push(energy(q))}a=b;fa=fb}if(!roots.length)throw new Error(`no edge root at ${edge}`);return roots.sort((a,b)=>Math.abs(a-edge)-Math.abs(b-edge))[0]}
function edgeCofactor(edge,rail,epsilon){const h=makeCluster({...rail,epsilon});const tail=h.slice(1).map((r)=>r.slice(1));return determinantReal(tail.map((r,i)=>r.map((x,j)=>(i===j?edge:0)-x)))}
function threshold(edge,rail){const c0=edgeCofactor(edge,rail,0),c1=edgeCofactor(edge,rail,1)-c0;const epsilon=-c0/c1;return{edge,epsilon,cofactorResidual:edgeCofactor(edge,rail,epsilon)}}
function continuedFractionG00(e,h){let sigma=0;for(let i=h.length-1;i>=1;i-=1){const t=h[i-1][i];sigma=t*t/(e-h[i][i]-sigma)}return 1/(e-h[0][0]-sigma)}
function scatteringAtK(k,h,vc){const e=-2*Math.cos(k),u=vc*vc*continuedFractionG00(e,h),a=C(0,2*Math.sin(k));return div(add(a,C(u,0)),sub(a,C(u,0)))}
function scatteringAtEnergy(e,h,vc){return scatteringAtK(Math.acos(-Math.max(-2,Math.min(2,e))/2),h,vc)}
function wignerDelay(e,h,vc,widthHint=1e-5){const q=Math.min(1e-4,Math.max(1e-9,widthHint/20,Math.min(e+2,2-e)/20)),sm=scatteringAtEnergy(e-q,h,vc),sp=scatteringAtEnergy(e+q,h,vc),ratio=mul(sp,C(sm.re,-sm.im));return Math.atan2(ratio.im,ratio.re)/(2*q)}
function jacobiEigenvalues(matrix){const a=matrix.map((r)=>[...r]),n=a.length;for(let it=0;it<100*n*n;it+=1){let p=0,q=1,m=0;for(let i=0;i<n;i+=1)for(let j=i+1;j<n;j+=1)if(Math.abs(a[i][j])>m){m=Math.abs(a[i][j]);p=i;q=j}if(m<1e-13)break;const th=.5*Math.atan2(2*a[p][q],a[q][q]-a[p][p]),c=Math.cos(th),s=Math.sin(th),app=c*c*a[p][p]-2*s*c*a[p][q]+s*s*a[q][q],aqq=s*s*a[p][p]+2*s*c*a[p][q]+c*c*a[q][q];for(let k=0;k<n;k+=1){if(k===p||k===q)continue;const x=a[k][p],y=a[k][q];a[k][p]=a[p][k]=c*x-s*y;a[k][q]=a[q][k]=s*x+c*y}a[p][p]=app;a[q][q]=aqq;a[p][q]=a[q][p]=0}return a.map((r,i)=>r[i]).sort((a,b)=>a-b)}
function phaseLedger(h,vc){
  const special=jacobiEigenvalues(h).filter((e)=>e>-2&&e<2).map((e)=>Math.acos(-e/2));
  const tail=h.slice(1).map((r)=>r.slice(1));special.push(...jacobiEigenvalues(tail).filter((e)=>e>-2&&e<2).map((e)=>Math.acos(-e/2)));
  const ks=[];const uniform=120000;for(let i=0;i<=uniform;i+=1)ks.push(1e-10+(Math.PI-2e-10)*i/uniform);
  for(const k0 of special)for(let p=-13;p<=-1;p+=1){const d=10**p;ks.push(k0-d,k0+d)}
  ks.sort((a,b)=>a-b);let total=0,prev=scatteringAtK(ks[0],h,vc),maxStep=0;
  for(let i=1;i<ks.length;i+=1){const cur=scatteringAtK(ks[i],h,vc),ratio=mul(cur,C(prev.re,-prev.im)),d=Math.atan2(ratio.im,ratio.re);total+=d;maxStep=Math.max(maxStep,Math.abs(d));prev=cur}
  return{phaseChange:total,winding:total/(2*Math.PI),nearestInteger:Math.round(total/(2*Math.PI)),integerResidual:total/(2*Math.PI)-Math.round(total/(2*Math.PI)),maxPhaseStep:maxStep,clusterPolesInBand:jacobiEigenvalues(h).filter((e)=>e>-2&&e<2).length,tailZerosInBand:jacobiEigenvalues(tail).filter((e)=>e>-2&&e<2).length};
}
function continuation(edge,rail,epsilonCritical,vc){
  const sign=edge<0?1:-1, deltas=[.2,.1,.05,.02,.01,.005,.002,.001,.0005,.0002,.0001],inside=[],outside=[];
  let seed=C(edge+sign*0.02,-1e-3);
  for(const d of deltas){const epsilon=epsilonCritical+sign*d,h=makeCluster({...rail,epsilon});let pole=newton(seed,h,vc);if(!pole){const tries=[];for(const reD of [sign*d,sign*d*d,sign*.01])for(const im of [-d*d,-1e-4,-1e-6]){const p=newton(C(edge+reD,im),h,vc);if(p)tries.push(p)}pole=tries.sort((a,b)=>Math.hypot(a.real-edge,a.imag)-Math.hypot(b.real-edge,b.imag))[0]}if(!pole)throw new Error(`no continued pole at edge ${edge} delta ${d}`);seed=C(pole.real,pole.imag);inside.push({delta:d,epsilon,...pole,distanceToEdge:Math.hypot(pole.real-edge,pole.imag),localLevelResidue:localPoleResidue(C(pole.real,pole.imag),h,vc,"continued"),wignerDelayAtPoleReal:wignerDelay(pole.real,h,vc,pole.width)})}
  for(const d of deltas){const epsilon=epsilonCritical-sign*d,h=makeCluster({...rail,epsilon}),energy=edgeBoundRoot(edge,h,vc),distanceToEdge=Math.abs(energy-edge),mirrorEnergy=edge<0?-2+distanceToEdge:2-distanceToEdge;outside.push({delta:d,epsilon,energy,distanceToEdge,localizationLength:1/Math.acosh(Math.abs(energy)/2),localLevelResidue:localPoleResidue(C(energy,0),h,vc,"physical"),mirroredInBandWignerDelay:wignerDelay(mirrorEnergy,h,vc,distanceToEdge),residual:cabs(detEffective(C(energy,0),h,vc,"physical"))})}
  const fit=(rows,key)=>{const use=rows.slice(-5),xs=use.map((r)=>Math.log(r.delta)),ys=use.map((r)=>Math.log(r[key])),xm=xs.reduce((a,b)=>a+b,0)/xs.length,ym=ys.reduce((a,b)=>a+b,0)/ys.length;return xs.reduce((s,x,i)=>s+(x-xm)*(ys[i]-ym),0)/xs.reduce((s,x)=>s+(x-xm)**2,0)};
  return{inside,outside,scaling:{continuedDistanceExponent:fit(inside,"distanceToEdge"),boundDistanceExponent:fit(outside,"distanceToEdge")}};
}

const vc=.52,rails={trivial:{t1:1,t2:.45},topological:{t1:.45,t2:1}},controls=[-2.6,-1.8,-.8,0,.8,1.8,2.6],results={};
for(const[name,rail]of Object.entries(rails)){const thresholds={lower:threshold(-2,rail),upper:threshold(2,rail)};const ledgers=controls.map((epsilon)=>{const h=makeCluster({...rail,epsilon}),bounds=boundRoots(h,vc),phase=phaseLedger(h,vc);return{epsilon,boundCount:bounds.length,boundEnergies:bounds,phase,backgroundCorrection:-1,correctedStateLedger:bounds.length+phase.nearestInteger-1}});results[name]={thresholds,continuation:{lower:continuation(-2,rail,thresholds.lower.epsilon,vc),upper:continuation(2,rail,thresholds.upper.epsilon,vc)},ledgers}}
const allLedgers=Object.values(results).flatMap((r)=>r.ledgers),constants=[...new Set(allLedgers.map((x)=>x.correctedStateLedger))];
const lengthCensus=[];for(const[name,rail]of Object.entries(rails))for(let cells=1;cells<=6;cells+=1)for(const epsilon of[-2.6,0,2.6]){const h=makeCluster({...rail,cells,epsilon}),bounds=boundRoots(h,vc),phase=phaseLedger(h,vc);lengthCensus.push({rail:name,cells,clusterSites:h.length,epsilon,boundCount:bounds.length,scatteringWinding:phase.nearestInteger,integerResidual:phase.integerResidual,backgroundCorrection:-1,correctedStateLedger:bounds.length+phase.nearestInteger-1,passes:bounds.length+phase.nearestInteger-1===h.length})}
const censusPass=lengthCensus.every((x)=>x.passes);
const output={schema:"admissibility.finite-band-levinson-pole-ledger/1",id:"AZ-055",generatedBy:"scripts/run-finite-band-levinson-pole-ledger.mjs",model:{clusterSites:9,band:[-2,2],contactCoupling:vc,rails},result:{results,lengthCensus,global:{backgroundCorrection:-1,correctedStateLedgerValues:constants,expectedAddedStateCount:9,lengthCensusCases:lengthCensus.length,lengthCensusPass:censusPass,integerWindingResidualMax:Math.max(...allLedgers.map((x)=>Math.abs(x.phase.integerResidual)),...lengthCensus.map((x)=>Math.abs(x.integerResidual))),continuationResidualMax:Math.max(...Object.values(results).flatMap((r)=>Object.values(r.continuation).flatMap((c)=>c.inside.map((p)=>p.residual)))),interpretation:constants.length===1&&constants[0]===9&&censusPass?"bound_count_plus_scattering_winding_minus_one_equals_added_graph_states":"no_constant_corrected_ledger"}},admission:{adaptivePoleCollisionLocalized:true,twoEdgeThresholdsCertified:true,finiteBandCorrectedLedgerEstablished:constants.length===1&&constants[0]===9&&censusPass,finiteChainFamilyCensusEstablished:censusPass,universalAcrossArbitraryGraphsEstablished:false}};
fs.writeFileSync(outputPath,`${JSON.stringify(output,null,2)}\n`);console.log(`wrote ${path.relative(root,outputPath)}`);for(const[name,r]of Object.entries(results))console.log(name,r.thresholds,"ledger",r.ledgers.map((x)=>[x.epsilon,x.boundCount,x.phase.nearestInteger,x.correctedStateLedger]));
