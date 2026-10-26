#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";

const grid=[-1,-.5,0,.5,1].flatMap(x=>[-1,-.5,0,.5,1].map(y=>({x,y})));
const channels=["mixX","mixY","coherence","width","anchor"];
const families={
  ordinary:{parameters:[],representative:{},points:()=>[{label:"ordinary",params:{}}]},
  constantTilt:{parameters:["tx","ty"],representative:{tx:.30,ty:-.20},points:()=>[-.45,-.3,-.15,0,.15,.3,.45].flatMap(tx=>[-.45,-.3,-.15,0,.15,.3,.45].map(ty=>({tx,ty}))).filter(p=>p.tx||p.ty).map(params=>({label:"constantTilt",params}))},
  finiteThickness:{parameters:["thickness"],representative:{thickness:.35},points:()=>[.1,.2,.3,.4,.5].map(thickness=>({label:"finiteThickness",params:{thickness}}))},
  constantDisplacement:{parameters:["displacement"],representative:{displacement:.40},points:()=>[-.6,-.4,-.2,.2,.4,.6].map(displacement=>({label:"constantDisplacement",params:{displacement}}))},
  smoothBend:{parameters:["curvature"],representative:{curvature:.40},points:()=>[-.6,-.4,-.2,.2,.4,.6].map(curvature=>({label:"smoothBend",params:{curvature}}))}
};

const geometry=(family,p,{tx=0,ty=0,thickness=0,displacement=0,curvature=0})=>{
  if(family==="constantTilt")return{w:tx*p.x+ty*p.y,gx:tx,gy:ty,width:0};
  if(family==="finiteThickness")return{w:0,gx:0,gy:0,width:thickness};
  if(family==="constantDisplacement")return{w:displacement,gx:0,gy:0,width:0};
  if(family==="smoothBend")return{w:.5*curvature*(p.x**2+p.y**2),gx:curvature*p.x,gy:curvature*p.y,width:0};
  return{w:0,gx:0,gy:0,width:0};
};
const observe=(family,params)=>grid.flatMap(p=>{const g=geometry(family,p,params);const d=Math.sqrt(1+g.gx**2+g.gy**2);return[g.gx/d,g.gy/d,Math.exp(-(g.width**2))-1,g.width,g.w]});
const channelIndices=enabled=>grid.flatMap((_,i)=>channels.map((name,j)=>({name,index:i*channels.length+j}))).filter(x=>enabled.includes(x.name)).map(x=>x.index);
const slice=(values,indices)=>indices.map(i=>values[i]);
const basisVector=(indices,fn)=>indices.map(index=>{const point=Math.floor(index/channels.length),channel=channels[index%channels.length];return fn(grid[point],channel)});
const nuisanceBasis=(indices,names)=>names.map(name=>basisVector(indices,(p,c)=>{
  if(name==="mixZeroX")return c==="mixX"?1:0;
  if(name==="mixZeroY")return c==="mixY"?1:0;
  if(name==="widthZero")return c==="width"?1:0;
  if(name==="coherenceZero")return c==="coherence"?1:0;
  if(name==="anchorZero")return c==="anchor"?1:0;
  if(name==="perspectiveExpansion")return c==="mixX"?p.x:c==="mixY"?p.y:0;
  return 0;
}));
const dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0);
const solve=(matrix,vector)=>{const n=vector.length;if(!n)return[];const a=matrix.map((row,i)=>[...row,vector[i]]);for(let c=0;c<n;c++){let pivot=c;for(let r=c+1;r<n;r++)if(Math.abs(a[r][c])>Math.abs(a[pivot][c]))pivot=r;[a[c],a[pivot]]=[a[pivot],a[c]];if(Math.abs(a[c][c])<1e-11)return Array(n).fill(0);const z=a[c][c];for(let j=c;j<=n;j++)a[c][j]/=z;for(let r=0;r<n;r++)if(r!==c){const f=a[r][c];for(let j=c;j<=n;j++)a[r][j]-=f*a[c][j]}}return a.map(row=>row[n])};
const residualize=(values,basis)=>{if(!basis.length)return[...values];const gram=basis.map(a=>basis.map(b=>dot(a,b))),rhs=basis.map(b=>dot(b,values)),coef=solve(gram,rhs);return values.map((v,i)=>v-basis.reduce((s,b,j)=>s+coef[j]*b[i],0))};
const norm=v=>Math.sqrt(dot(v,v));
const key=v=>v.map(x=>(Math.abs(x)<1e-8?0:x).toFixed(7)).join("|");
const rank=matrix=>{if(!matrix.length||!matrix[0]?.length)return 0;const a=matrix.map(row=>[...row]);let r=0;for(let c=0;c<a[0].length&&r<a.length;c++){let pivot=r;for(let i=r+1;i<a.length;i++)if(Math.abs(a[i][c])>Math.abs(a[pivot][c]))pivot=i;if(Math.abs(a[pivot][c])<1e-7)continue;[a[r],a[pivot]]=[a[pivot],a[r]];const z=a[r][c];for(let j=c;j<a[r].length;j++)a[r][j]/=z;for(let i=0;i<a.length;i++)if(i!==r){const f=a[i][c];for(let j=c;j<a[i].length;j++)a[i][j]-=f*a[r][j]}r++}return r};

const regimes=[
  {id:"current-relative",channels:["mixX","mixY","coherence","width"],nuisances:["mixZeroX","mixZeroY","widthZero","coherenceZero","perspectiveExpansion"],meaning:"relative readers with unknown zero levels and ordinary perspective expansion"},
  {id:"calibrated-relative",channels:["mixX","mixY","coherence","width"],nuisances:[],meaning:"calibrated directional and width readers, but no absolute extra-coordinate anchor"},
  {id:"anchored-full",channels, nuisances:[],meaning:"calibrated relative readers plus an absolute displacement-sensitive anchor"}
];

const classifyRegime=regime=>{
  const indices=channelIndices(regime.channels),basis=nuisanceBasis(indices,regime.nuisances);
  const signature=(family,params)=>residualize(slice(observe(family,params),indices),basis);
  const representatives=Object.entries(families).map(([family,spec])=>({family,signature:signature(family,spec.representative)}));
  const groups=new Map();for(const item of representatives){const k=key(item.signature);if(!groups.has(k))groups.set(k,[]);groups.get(k).push(item.family)}
  const observableClasses=[...groups.values()].map((members,i)=>({classId:`${regime.id}-C${i+1}`,members}));
  const identifiability=Object.entries(families).map(([family,spec])=>{const base=signature(family,spec.representative),eps=1e-5,columns=spec.parameters.map(parameter=>{const shifted={...spec.representative,[parameter]:spec.representative[parameter]+eps};const next=signature(family,shifted);return next.map((v,i)=>(v-base[i])/eps)});const matrix=base.map((_,i)=>columns.map(col=>col[i]));return{family,parameters:spec.parameters.length,localRank:rank(matrix),identifiable:rank(matrix)===spec.parameters.length}});
  return{...regime,indices,basis,signature,observableClasses,identifiability};
};

let randomState=0x46325632;const random=()=>{randomState=(1664525*randomState+1013904223)>>>0;return randomState/2**32};const gaussian=()=>Math.sqrt(-2*Math.log(Math.max(random(),1e-12)))*Math.cos(2*Math.PI*random());
const distance=(a,b)=>a.reduce((s,v,i)=>s+(v-b[i])**2,0);
const injectNuisance=(values,basis,scale=.35)=>{const coefficients=basis.map(()=>(random()*2-1)*scale);return values.map((v,i)=>v+basis.reduce((s,b,j)=>s+coefficients[j]*b[i],0))};
const tournament=state=>{
  const noiseSigma=.004,likelihoodRatioPenalty=6.63;
  const candidates=Object.values(families).flatMap(spec=>spec.points()).map(item=>({...item,signature:state.signature(item.label,item.params)}));
  const classFor=family=>state.observableClasses.find(x=>x.members.includes(family)).classId;
  let correct=0,unpenalizedCorrect=0,total=0,abstentions=0;const confusion={},unpenalizedConfusion={};
  for(const truth of candidates)for(let trial=0;trial<20;trial++){
    let observed=injectNuisance(slice(observe(truth.label,truth.params),state.indices),state.basis);
    observed=observed.map(v=>v+noiseSigma*gaussian());observed=residualize(observed,state.basis);
    const scored=candidates.map(candidate=>{const residualSumSquares=distance(observed,candidate.signature),parameterCount=families[candidate.label].parameters.length;return{candidate,residualSumSquares,score:residualSumSquares+likelihoodRatioPenalty*noiseSigma**2*parameterCount}});
    const ranked=[...scored].sort((a,b)=>a.score-b.score),unpenalized=[...scored].sort((a,b)=>a.residualSumSquares-b.residualSumSquares);
    const predictedClass=classFor(ranked[0].candidate.label),truthClass=classFor(truth.label);total++;if(predictedClass===truthClass)correct++;else confusion[`${truthClass}->${predictedClass}`]=(confusion[`${truthClass}->${predictedClass}`]??0)+1;
    const unpenalizedClass=classFor(unpenalized[0].candidate.label);if(unpenalizedClass===truthClass)unpenalizedCorrect++;else unpenalizedConfusion[`${truthClass}->${unpenalizedClass}`]=(unpenalizedConfusion[`${truthClass}->${unpenalizedClass}`]??0)+1;
    if(state.observableClasses.find(x=>x.classId===predictedClass).members.length>1)abstentions++;
  }
  return{observableClassAccuracy:correct/total,unpenalizedObservableClassAccuracy:unpenalizedCorrect/total,trials:total,abstentions,noiseSigma,likelihoodRatioPenalty,confusion,unpenalizedConfusion};
};

const states=regimes.map(classifyRegime);
const result={
  schemaVersion:"0.3.0",
  shortlist:{ranking:["ordinary","constantTilt","finiteThickness","constantDisplacement","smoothBend"],selectionBasis:["parsimony","compatibility with current evidence","reader feasibility"],excluded:{crease:"current whole-cluster validation generalized worst",saddle:"adds unsupported curvature structure",defect:"localization freedoms exceed current evidence",twist:"requires a stable field and loop reader"}},
  algebra:{form:"geometry -> coupling channels -> declared reader regime -> nuisance quotient -> observable class",gridPoints:grid.length,channels},
  regimes:states.map(state=>({id:state.id,meaning:state.meaning,channels:state.channels,nuisances:state.nuisances,observableClasses:state.observableClasses,identifiability:state.identifiability,tournament:tournament(state)})),
  decisions:{
    currentRelative:"ordinary, constant tilt, finite thickness and constant displacement share one observable class; smooth bend retains a nonlinear directional remainder but remains empirically unsupported",
    calibratedRelative:"constant displacement remains aliased with ordinary; tilt, thickness and bend become separately testable",
    anchoredFull:"all five families become distinct and all non-null parameter families are locally identifiable",
    nextMeasurement:"calibrate directional and width zero levels first; add an absolute displacement-sensitive anchor only if constant displacement remains scientifically important",
    safety:"no real-data promotion; this tranche tests observability and abstention, not physical truth"
  }
};

assert.deepEqual(result.regimes.map(x=>x.observableClasses.length),[2,4,5]);
assert.equal(result.regimes[0].observableClasses.find(x=>x.members.includes("ordinary")).members.length,4);
assert.equal(result.regimes[1].observableClasses.find(x=>x.members.includes("ordinary")).members.includes("constantDisplacement"),true);
assert.equal(result.regimes[2].identifiability.filter(x=>x.family!=="ordinary").every(x=>x.identifiable),true);
assert.equal(result.regimes.every(x=>x.tournament.observableClassAccuracy>.95),true);
const output=`${JSON.stringify(result,null,2)}\n`;
if(process.argv.includes("--write")){
  fs.writeFileSync(new URL("../evidence/data/focused-geometry-tournament-v2.json",import.meta.url),output);
  console.log("wrote evidence/data/focused-geometry-tournament-v2.json");
}else console.log(output.trimEnd());
