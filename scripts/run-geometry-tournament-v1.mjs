#!/usr/bin/env node
import assert from "node:assert/strict";

const grid = [-1,-0.5,0,0.5,1].flatMap(x => [-1,-0.5,0,0.5,1].map(y => ({x,y})));
const geometries = {
  flat:p=>({w:0,gx:0,gy:0,width:0,holonomy:0}), displaced:p=>({w:.7,gx:0,gy:0,width:0,holonomy:0}),
  tilt:p=>({w:.65*p.x,gx:.65,gy:0,width:0,holonomy:0}),
  bend:p=>({w:.45*(p.x**2+p.y**2),gx:.9*p.x,gy:.9*p.y,width:0,holonomy:0}),
  saddle:p=>({w:.45*(p.x**2-p.y**2),gx:.9*p.x,gy:-.9*p.y,width:0,holonomy:0}),
  crease:p=>({w:.65*Math.abs(p.x),gx:.65*Math.sign(p.x),gy:0,width:0,holonomy:0}),
  thickness:p=>({w:0,gx:0,gy:0,width:.35,holonomy:0}),
  gradedThickness:p=>({w:0,gx:0,gy:0,width:.15+.1*(p.x+1),holonomy:0}),
  defect:p=>{const e=Math.exp(-(p.x**2+p.y**2)/.18);return{w:.65*e,gx:-.65*2*p.x/.18*e,gy:-.65*2*p.y/.18*e,width:0,holonomy:0}},
  twist:p=>({w:0,gx:-.35*p.y,gy:.35*p.x,width:0,holonomy:.3*(p.x**2+p.y**2)})
};
const couplings = {
  transparent:{adds:["amplitude"],apply:(g,s)=>({...s,amplitude:(s.amplitude??1)})},
  projection:{adds:["amplitude"],apply:(g,s)=>({...s,amplitude:(s.amplitude??1)/Math.sqrt(1+g.gx**2+g.gy**2)})},
  distanceAttenuation:{adds:["amplitude"],apply:(g,s)=>({...s,amplitude:(s.amplitude??1)*Math.exp(-Math.abs(g.w))})},
  signedDisplacement:{adds:["signed"],apply:(g,s)=>({...s,signed:g.w})},
  phaseDelay:{adds:["phase"],apply:(g,s)=>({...s,phase:(s.phase??0)+g.w})},
  orthogonalMixing:{adds:["mix"],apply:(g,s)=>{const d=Math.sqrt(1+g.gx**2+g.gy**2);return{...s,mix:[g.gx/d,g.gy/d]}}},
  thicknessAverage:{adds:["coherence","width"],apply:(g,s)=>({...s,coherence:Math.exp(-(g.width**2)),width:g.width})},
  parallelTransport:{adds:["holonomy"],apply:(g,s)=>({...s,holonomy:g.holonomy})}
};
const readers = {
  aggregateGain:{requires:["amplitude"],read:s=>[s.amplitude]},
  signedChannel:{requires:["signed"],read:s=>[s.signed]},
  phaseQuadrature:{requires:["phase"],read:s=>[(s.amplitude??1)*Math.cos(s.phase),(s.amplitude??1)*Math.sin(s.phase)]},
  twoChannel:{requires:["mix"],read:s=>s.mix},
  widthMoments:{requires:["coherence","width"],read:s=>[s.coherence,s.width]},
  loopClosure:{requires:["holonomy"],read:s=>[s.holonomy]}
};
const couplingNames=Object.keys(couplings); const nontrivial=couplingNames.filter(x=>x!=="transparent");
const words=[["transparent"],...nontrivial.map(x=>[x])];
for(let i=0;i<nontrivial.length;i++)for(let j=i+1;j<nontrivial.length;j++)words.push([nontrivial[i],nontrivial[j]]);
const applyWord=(g,word)=>word.reduce((s,name)=>couplings[name].apply(g,s),{});
const compatible=(word,reader)=>{const keys=new Set(word.flatMap(name=>couplings[name].adds));return readers[reader].requires.every(key=>keys.has(key));};
const models=[];
for(const geometry of Object.keys(geometries))for(const word of words)for(const reader of Object.keys(readers))if(compatible(word,reader))models.push({id:`${geometry}__${word.join("+")}__${reader}`,geometry,word,reader});
const rawSignature=model=>grid.flatMap(p=>readers[model.reader].read(applyWord(geometries[model.geometry](p),model.word)));
const solve=(m,v)=>{const n=v.length,a=m.map((r,i)=>[...r,v[i]]);for(let c=0;c<n;c++){let p=c;for(let r=c+1;r<n;r++)if(Math.abs(a[r][c])>Math.abs(a[p][c]))p=r;[a[c],a[p]]=[a[p],a[c]];if(Math.abs(a[c][c])<1e-12)return Array(n).fill(0);const z=a[c][c];for(let j=c;j<=n;j++)a[c][j]/=z;for(let r=0;r<n;r++)if(r!==c){const f=a[r][c];for(let j=c;j<=n;j++)a[r][j]-=f*a[c][j]}}return a.map(r=>r[n])};
const removePlane=values=>{const m=Array.from({length:3},()=>[0,0,0]),v=[0,0,0];grid.forEach((p,k)=>{const d=[1,p.x,p.y];for(let i=0;i<3;i++){v[i]+=d[i]*values[k];for(let j=0;j<3;j++)m[i][j]+=d[i]*d[j]}});const b=solve(m,v);return values.map((x,k)=>x-(b[0]+b[1]*grid[k].x+b[2]*grid[k].y))};
const canonical=(reader,values)=>{
  if(reader==="aggregateGain"){const mean=values.reduce((a,b)=>a+b,0)/values.length;return values.map(v=>v/mean)}
  if(reader==="signedChannel")return removePlane(values);
  if(reader==="phaseQuadrature"){const pairs=grid.map((_,i)=>[values[2*i],values[2*i+1]]);const phi=Math.atan2(pairs[0][1],pairs[0][0]);const meanAmp=pairs.reduce((s,p)=>s+Math.hypot(...p),0)/pairs.length;return pairs.flatMap(p=>[(p[0]*Math.cos(phi)+p[1]*Math.sin(phi))/meanAmp,(-p[0]*Math.sin(phi)+p[1]*Math.cos(phi))/meanAmp])}
  if(reader==="widthMoments"){const widths=grid.map((_,i)=>values[2*i+1]);const mean=widths.reduce((a,b)=>a+b,0)/widths.length;return grid.flatMap((_,i)=>[values[2*i],widths[i]-mean])}
  if(reader==="loopClosure"){const offset=values[0];return values.map(v=>v-offset)}
  return values;
};
const key=v=>v.map(x=>(Math.abs(x)<1e-10?0:x).toFixed(8)).join("|");
const groups=new Map();for(const model of models){const k=`${model.reader}|${key(canonical(model.reader,rawSignature(model)))}`;if(!groups.has(k))groups.set(k,[]);groups.get(k).push(model)}
const classes=[...groups.values()]; const reps=classes.map(group=>group[0]);
const classIdFor=modelId=>{const index=classes.findIndex(group=>group.some(model=>model.id===modelId));return `GT1-${String(index+1).padStart(3,"0")}`};
let state=0x56314745;const random=()=>{state=(1664525*state+1013904223)>>>0;return state/2**32};const gaussian=()=>Math.sqrt(-2*Math.log(Math.max(random(),1e-12)))*Math.cos(2*Math.PI*random());
const injectNuisance=(reader,values)=>{const out=[...values],a=.65+.7*random(),offset=-.5+random();if(reader==="aggregateGain")return out.map(v=>a*v);if(reader==="signedChannel")return out.map((v,k)=>v+offset+.4*grid[k].x-.25*grid[k].y);if(reader==="phaseQuadrature"){const phi=-1+2*random();return grid.flatMap((_,i)=>{const x=out[2*i],y=out[2*i+1];return[a*(x*Math.cos(phi)-y*Math.sin(phi)),a*(x*Math.sin(phi)+y*Math.cos(phi))]})}if(reader==="widthMoments")return grid.flatMap((_,i)=>[out[2*i],out[2*i+1]+offset]);if(reader==="loopClosure")return out.map(v=>v+offset);return out};
const dist=(a,b)=>a.reduce((s,v,i)=>s+(v-b[i])**2,0);let correct=0,total=0;const confusion={};
for(const truth of reps)for(let t=0;t<30;t++){const noisy=injectNuisance(truth.reader,rawSignature(truth)).map(v=>v+.005*gaussian());const observed=canonical(truth.reader,noisy);const ranked=reps.filter(x=>x.reader===truth.reader).map(x=>({id:x.id,d:dist(observed,canonical(x.reader,rawSignature(x)))})).sort((a,b)=>a.d-b.d);total++;if(ranked[0].id===truth.id)correct++;else confusion[`${truth.id}->${ranked[0].id}`]=(confusion[`${truth.id}->${ranked[0].id}`]??0)+1}
const result={schemaVersion:"0.2.0",grammar:{geometryTypes:Object.keys(geometries),couplingTypes:couplingNames,readerTypes:Object.keys(readers),maxCouplingWordLength:2,canonicalCouplingWords:words.length,compatibleComposites:models.length},nuisanceQuotient:{sourceGain:true,signedAffineTrend:true,globalPhaseAndGain:true,widthOffset:true,loopOffset:true},reduction:{canonicalObservableClasses:classes.length,mergedCompositeCount:models.length-classes.length,largestAliasClass:Math.max(...classes.map(x=>x.length)),sampleAliases:classes.filter(x=>x.length>1).slice(0,12).map(x=>x.map(m=>m.id))},hypothesisLibrary:reps.map((model,index)=>({classId:`GT1-${String(index+1).padStart(3,"0")}`,representative:model.id,geometry:model.geometry,couplingWord:model.word,reader:model.reader,aliasCount:classes[index].length})),syntheticConfusion:{classes:reps.length,trialsPerClass:30,totalTrials:total,noiseSigma:.005,accuracy:correct/total,confusion},dogfood:{m44ConstantTiltAggregate:{classId:classIdFor("tilt__projection__aggregateGain"),decision:"aliases the flat aggregate-gain class after source-normalization nuisance quotient; total brightness cannot identify constant tilt"},localDirectorBend:{classId:classIdFor("bend__orthogonalMixing__twoChannel"),decision:"reader is structurally capable, but the eight-cluster empirical tournament preferred a flat field; hold curvature"},localDirectorCrease:{classId:classIdFor("crease__orthogonalMixing__twoChannel"),decision:"reader is structurally capable, but the empirical crease model generalized worst; retire for current data"},displacementAttenuation:{classId:classIdFor("displaced__distanceAttenuation__aggregateGain"),decision:"requires an absolute distance-sensitive gain calibration absent from the current M44 reader"}},admission:{admittedClasses:correct===total?reps.length:reps.length-Object.keys(confusion).length,realDataPromotion:false,rule:"only nuisance-stable canonical classes that recover under the declared reader enter later real-data tournaments"}};
assert.equal(result.grammar.maxCouplingWordLength,2);assert.ok(result.reduction.mergedCompositeCount>0);assert.ok(result.syntheticConfusion.accuracy>.95);assert.equal(result.admission.realDataPromotion,false);
console.log(JSON.stringify(result,null,2));
