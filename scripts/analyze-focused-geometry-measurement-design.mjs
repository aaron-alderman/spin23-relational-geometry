#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";

const grid=[-1,-.5,0,.5,1].flatMap(x=>[-1,-.5,0,.5,1].map(y=>({x,y})));
const bundles={directional:["mixX","mixY"],coherence:["coherence"],width:["width"],anchor:["anchor"]};
const families=["ordinary","constantTilt","finiteThickness","constantDisplacement","smoothBend"];
const representatives={ordinary:{},constantTilt:{amplitude:.3,angle:-.588},finiteThickness:{amplitude:.3},constantDisplacement:{amplitude:.3},smoothBend:{amplitude:.3}};
const state=(family,p,{amplitude=0,angle=0})=>{
  if(family==="constantTilt")return{w:amplitude*(Math.cos(angle)*p.x+Math.sin(angle)*p.y),gx:amplitude*Math.cos(angle),gy:amplitude*Math.sin(angle),width:0};
  if(family==="finiteThickness")return{w:0,gx:0,gy:0,width:amplitude};
  if(family==="constantDisplacement")return{w:amplitude,gx:0,gy:0,width:0};
  if(family==="smoothBend")return{w:.5*amplitude*(p.x**2+p.y**2),gx:amplitude*p.x,gy:amplitude*p.y,width:0};
  return{w:0,gx:0,gy:0,width:0};
};
const observation=(family,params)=>grid.map(p=>{const s=state(family,p,params),d=Math.sqrt(1+s.gx**2+s.gy**2);return{mixX:s.gx/d,mixY:s.gy/d,coherence:Math.exp(-(s.width**2))-1,width:s.width,anchor:s.w}});
const flatten=(rows,selected)=>rows.flatMap(row=>selected.flatMap(bundle=>bundles[bundle].map(channel=>row[channel])));
const powerset=values=>Array.from({length:2**values.length-1},(_,mask)=>values.filter((_,i)=>(mask+1)&(1<<i)));
const dot=(a,b)=>a.reduce((sum,v,i)=>sum+v*b[i],0);
const solve=(matrix,vector)=>{const n=vector.length;if(!n)return[];const a=matrix.map((row,i)=>[...row,vector[i]]);for(let c=0;c<n;c++){let pivot=c;for(let r=c+1;r<n;r++)if(Math.abs(a[r][c])>Math.abs(a[pivot][c]))pivot=r;[a[c],a[pivot]]=[a[pivot],a[c]];if(Math.abs(a[c][c])<1e-12)return Array(n).fill(0);const z=a[c][c];for(let j=c;j<=n;j++)a[c][j]/=z;for(let r=0;r<n;r++)if(r!==c){const f=a[r][c];for(let j=c;j<=n;j++)a[r][j]-=f*a[c][j]}}return a.map(row=>row[n])};
const residualize=(values,basis)=>{if(!basis.length)return[...values];const coefficients=solve(basis.map(a=>basis.map(b=>dot(a,b))),basis.map(b=>dot(b,values)));return values.map((v,i)=>v-basis.reduce((sum,b,j)=>sum+coefficients[j]*b[i],0))};
const key=values=>values.map(v=>(Math.abs(v)<1e-9?0:v).toFixed(8)).join("|");
const basisFor=(selected,policy)=>{
  const channels=selected.flatMap(bundle=>bundles[bundle]);
  const vector=fn=>grid.flatMap(p=>channels.map(channel=>fn(p,channel)));
  const basis=[];
  if(policy!=="calibrated")for(const channel of channels)basis.push(vector((_,c)=>c===channel?1:0));
  if(policy==="affine-unknown"){
    if(channels.includes("anchor")){basis.push(vector((p,c)=>c==="anchor"?p.x:0));basis.push(vector((p,c)=>c==="anchor"?p.y:0))}
    if(channels.includes("mixX")&&channels.includes("mixY"))basis.push(vector((p,c)=>c==="mixX"?p.x:c==="mixY"?p.y:0));
  }
  return basis;
};
const partition=(selected,policy)=>{
  const basis=basisFor(selected,policy),groups=new Map();
  for(const family of families){const signature=residualize(flatten(observation(family,representatives[family]),selected),basis),k=key(signature);if(!groups.has(k))groups.set(k,[]);groups.get(k).push(family)}
  return[...groups.values()];
};
const subsetResults=powerset(Object.keys(bundles)).map(selected=>({selected,cost:selected.reduce((sum,b)=>sum+bundles[b].length,0),partitions:Object.fromEntries(["calibrated","zero-unknown","affine-unknown"].map(policy=>[policy,partition(selected,policy)]))}));
const minimalFor=policy=>subsetResults.filter(x=>x.partitions[policy].length===families.length).filter(x=>!subsetResults.some(y=>y!==x&&y.cost<x.cost&&y.partitions[policy].length===families.length)).map(x=>({readerBundles:x.selected,scalarChannels:x.cost}));

let randomState=0x4d445631;const random=()=>{randomState=(1664525*randomState+1013904223)>>>0;return randomState/2**32};const gaussian=()=>Math.sqrt(-2*Math.log(Math.max(random(),1e-12)))*Math.cos(2*Math.PI*random());
const amplitudes=[.01,.02,.04,.06,.08,.1,.15,.2,.3,.4,.6],noiseLevels=[.002,.004,.008,.016,.032],trials=300,selected=["width","anchor"],penalty=6.63;
const distance=(a,b)=>a.reduce((sum,v,i)=>sum+(v-b[i])**2,0);
const familyCandidates=family=>{
  if(family==="constantTilt")return amplitudes.flatMap(amplitude=>Array.from({length:12},(_,i)=>({amplitude,angle:i*Math.PI/6})));
  if(family==="constantDisplacement"||family==="smoothBend")return amplitudes.flatMap(amplitude=>[{amplitude},{amplitude:-amplitude}]);
  return amplitudes.map(amplitude=>({amplitude}));
};
const detectionSurface=[];
for(const family of families.filter(x=>x!=="ordinary"))for(const noiseSigma of noiseLevels){
  const nullSignature=flatten(observation("ordinary",{}),selected),parameterCount=family==="constantTilt"?2:1,candidates=familyCandidates(family).map(params=>flatten(observation(family,params),selected));
  const detect=observed=>Math.min(...candidates.map(candidate=>distance(observed,candidate)+penalty*noiseSigma**2*parameterCount))<distance(observed,nullSignature);
  let falsePositives=0;for(let t=0;t<trials;t++){const observed=nullSignature.map(v=>v+noiseSigma*gaussian());if(detect(observed))falsePositives++}
  const power=[];for(const amplitude of amplitudes){let detected=0;const truthParams=family==="constantTilt"?{amplitude,angle:-.588}:{amplitude};const truth=flatten(observation(family,truthParams),selected);for(let t=0;t<trials;t++){const observed=truth.map(v=>v+noiseSigma*gaussian());if(detect(observed))detected++}power.push({amplitude,power:detected/trials})}
  detectionSurface.push({family,noiseSigma,falsePositiveRate:falsePositives/trials,power,minimumAmplitudeAt95Power:power.find(x=>x.power>=.95)?.amplitude??null});
}

const multiFamilySurface=[];
for(const noiseSigma of noiseLevels){
  const candidates=[{family:"ordinary",params:{},signature:flatten(observation("ordinary",{}),selected)}];
  for(const family of families.filter(x=>x!=="ordinary"))for(const params of familyCandidates(family))candidates.push({family,params,signature:flatten(observation(family,params),selected)});
  let correct=0,total=0;const confusion={};
  for(const family of families){
    const params=family==="ordinary"?{}:family==="constantTilt"?{amplitude:.1,angle:-.588}:{amplitude:.1},truth=flatten(observation(family,params),selected);
    for(let t=0;t<trials;t++){
      const observed=truth.map(v=>v+noiseSigma*gaussian());
      const predicted=[...candidates].sort((a,b)=>{const ak=a.family==="ordinary"?0:a.family==="constantTilt"?2:1,bk=b.family==="ordinary"?0:b.family==="constantTilt"?2:1;return distance(observed,a.signature)+penalty*noiseSigma**2*ak-(distance(observed,b.signature)+penalty*noiseSigma**2*bk)})[0].family;
      total++;if(predicted===family)correct++;else confusion[`${family}->${predicted}`]=(confusion[`${family}->${predicted}`]??0)+1;
    }
  }
  multiFamilySurface.push({noiseSigma,truthAmplitude:.1,accuracy:correct/total,trials:total,confusion});
}

const result={
  schemaVersion:"0.1.0",
  source:"focused geometry tournament v2 shortlist",
  readerBundles:bundles,
  nuisancePolicies:{calibrated:"reader zero and spatial calibration retained", "zero-unknown":"one unknown constant zero per scalar channel", "affine-unknown":"constant zeros plus affine anchor drift and perspective expansion"},
  enumeration:{subsetsTested:subsetResults.length,results:subsetResults.map(x=>({readerBundles:x.selected,scalarChannels:x.cost,observableClasses:Object.fromEntries(Object.entries(x.partitions).map(([policy,groups])=>[policy,groups.length]))})),minimalSeparatingSets:{calibrated:minimalFor("calibrated"),zeroUnknown:minimalFor("zero-unknown"),affineUnknown:minimalFor("affine-unknown")}},
  selectedDesign:{readerBundles:selected,reason:"smallest calibrated linear-response design; width is preferred to coherence because coherence is only quadratically sensitive near zero",semanticCoverage:{ordinary:"zero reference",constantTilt:"linear anchor plane",finiteThickness:"width",constantDisplacement:"constant anchor",smoothBend:"quadratic anchor surface"}},
  sensitivity:{trialsPerCell:trials,likelihoodRatioPenalty:penalty,amplitudes,noiseLevels,oneVersusOrdinary:detectionSurface,fiveWayAtAmplitudePointOne:multiFamilySurface},
  decisions:{
    smallestCalibratedDesign:"absolute spatial anchor plus width reader",
    calibrationInvariant:"no tested reader subset separates all five if every channel zero is unknown; displacement necessarily aliases ordinary",
    affineInvariant:"if the anchor is only defined modulo an affine plane, both displacement and tilt lose absolute identifiability",
    operationalNext:"measure or bound anchor-zero, anchor-affine and width-zero calibration errors before collecting a larger hypothesis vocabulary",
    claimBoundary:"sensitivity values use dimensionless normalized channels and are design diagnostics, not astronomical instrument requirements"
  }
};

assert.equal(result.enumeration.subsetsTested,15);
assert.deepEqual(result.enumeration.minimalSeparatingSets.calibrated,[{readerBundles:["coherence","anchor"],scalarChannels:2},{readerBundles:["width","anchor"],scalarChannels:2}]);
assert.equal(result.enumeration.minimalSeparatingSets.zeroUnknown.length,0);
assert.equal(result.enumeration.minimalSeparatingSets.affineUnknown.length,0);
assert.equal(detectionSurface.every(row=>row.falsePositiveRate<=.05),true);
const output=`${JSON.stringify(result,null,2)}\n`;
if(process.argv.includes("--write")){fs.writeFileSync(new URL("../evidence/data/focused-geometry-measurement-design-v1.json",import.meta.url),output);console.log("wrote evidence/data/focused-geometry-measurement-design-v1.json")}else console.log(output.trimEnd());
