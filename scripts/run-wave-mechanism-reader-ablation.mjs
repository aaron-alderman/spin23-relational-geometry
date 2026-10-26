#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";

const source=JSON.parse(fs.readFileSync(new URL("../evidence/data/wave-geometry-mechanism-workbench-v1.json",import.meta.url),"utf8"));
const round=(x,n=8)=>Number(x.toFixed(n));
const cases=source.inverseDecompiler.results.map(row=>({id:row.blindId,truth:row.truth,features:{...row.features,coherentPhaseStructure:false}}));
const readers=[
  {id:"R1",name:"spatial support",features:["spatialPropagation"],cost:1,resolutionExponent:.15},
  {id:"R2",name:"projection geometry",features:["projectionRankLoss","higherProjectionDegeneracy"],cost:2,resolutionExponent:1.15},
  {id:"R3",name:"response spectrum",features:["retardedPole"],cost:2,resolutionExponent:.55},
  {id:"R4",name:"quantization and periodicity",features:["quantized","periodicCarrier"],cost:4,resolutionExponent:.45},
  {id:"R5",name:"constitutive-field typing",features:["classicalConstitutive"],cost:1,resolutionExponent:.2},
  {id:"R6",name:"jump and entropy",features:["fieldJump","entropyCondition"],cost:2,resolutionExponent:1.35},
  {id:"R7",name:"directional transport",features:["anisotropicGroupVelocity"],cost:3,resolutionExponent:1},
  {id:"R8",name:"coherent phase",features:["coherentPhaseStructure"],cost:2,resolutionExponent:.7}
];
const readerById=new Map(readers.map(r=>[r.id,r]));
const signature=(row,ids)=>ids.flatMap(id=>readerById.get(id).features.map(f=>row.features[f]?1:0)).join("");
const partition=ids=>{
  const groups=new Map();
  for(const row of cases){const sig=signature(row,ids);if(!groups.has(sig))groups.set(sig,[]);groups.get(sig).push(row.truth);}
  return[...groups.values()].map(group=>group.sort()).sort((a,b)=>a.join("|").localeCompare(b.join("|")));
};
const subsets=[];
for(let mask=0;mask<2**readers.length;mask++){
  const ids=readers.filter((_,i)=>mask&(1<<i)).map(r=>r.id),groups=partition(ids),cost=ids.reduce((s,id)=>s+readerById.get(id).cost,0);
  subsets.push({readerIds:ids,cost,classCount:groups.length,partition:groups,fullySeparating:groups.every(g=>g.length===1)});
}
const separating=subsets.filter(s=>s.fullySeparating),minimumCost=Math.min(...separating.map(s=>s.cost));
const minimumSeparators=separating.filter(s=>s.cost===minimumCost).map(s=>({readerIds:s.readerIds,cost:s.cost}));
const primary=minimumSeparators[0].readerIds;

const cheapestCompletions=selected=>{
  const selectedSet=new Set(selected),candidates=subsets.filter(s=>selected.every(id=>s.readerIds.includes(id))&&s.fullySeparating);
  const additionalCost=s=>s.readerIds.filter(id=>!selectedSet.has(id)).reduce((sum,id)=>sum+readerById.get(id).cost,0);
  const min=Math.min(...candidates.map(additionalCost));
  return candidates.filter(s=>additionalCost(s)===min).map(s=>({add:s.readerIds.filter(id=>!selectedSet.has(id)),additionalCost:min}));
};
const leaveOneOut=primary.map(removed=>{
  const selected=primary.filter(id=>id!==removed),groups=partition(selected);
  return{removed,selected,equivalenceClasses:groups.filter(g=>g.length>1),cheapestCompletions:cheapestCompletions(selected)};
});
const singleReaderAblations=readers.map(r=>({readerId:r.id,readerName:r.name,cost:r.cost,classCount:partition([r.id]).length,equivalenceClasses:partition([r.id]).filter(g=>g.length>1)}));

let seed=0x6d2b79f5;
const uniform=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return(seed+.5)/4294967296};
const gaussian=()=>Math.sqrt(-2*Math.log(uniform()))*Math.cos(2*Math.PI*uniform());
const dimensions=ids=>ids.flatMap(id=>readerById.get(id).features.map(feature=>({readerId:id,feature})));
const expectedVector=(row,ids,resolution)=>dimensions(ids).map(d=>(row.features[d.feature]?1:0)*resolution**readerById.get(d.readerId).resolutionExponent);
const noiseLevels=[0,.05,.1,.2,.3,.4,.5],resolutions=[1,.75,.5,.25],trialsPerCase=400,posteriorGate=.8;
const noiseSurface=[];
for(const resolution of resolutions)for(const sigma of noiseLevels){
  let committed=0,correct=0,falseCommits=0,total=0;
  const prototypes=cases.map(row=>({truth:row.truth,v:expectedVector(row,primary,resolution)}));
  for(const row of cases){
    const expected=expectedVector(row,primary,resolution);
    for(let trial=0;trial<trialsPerCase;trial++){
      total++;
      const observed=expected.map(x=>x+(sigma?gaussian()*sigma:0));
      const scored=prototypes.map(p=>({truth:p.truth,d2:p.v.reduce((s,x,i)=>s+(observed[i]-x)**2,0)})).sort((a,b)=>a.d2-b.d2);
      let confidence=1;
      if(sigma>0){const weights=scored.map(x=>Math.exp(-(x.d2-scored[0].d2)/(2*sigma*sigma))),z=weights.reduce((a,b)=>a+b,0);confidence=weights[0]/z;}
      if(confidence>=posteriorGate){committed++;if(scored[0].truth===row.truth)correct++;else falseCommits++;}
    }
  }
  noiseSurface.push({resolution,noiseSigma:sigma,total,coverage:round(committed/total),selectiveAccuracy:committed?round(correct/committed):null,falseCommitRate:round(falseCommits/total),abstainRate:round(1-committed/total)});
}

const structuralAbstention=subsets.map(s=>({readerIds:s.readerIds,classCount:s.classCount,ambiguousClassCount:s.partition.filter(g=>g.length>1).length,largestClass:Math.max(...s.partition.map(g=>g.length)),correctOutput:"return the exact equivalence class rather than force a singleton"}));
const nullReaders=readers.filter(r=>new Set(cases.map(c=>signature(c,[r.id]))).size===1).map(r=>r.id);

const W=1200,H=760,panel=(x,y,w,h,title,body)=>`<g transform="translate(${x} ${y})"><rect width="${w}" height="${h}" rx="12" fill="#fbfbfd" stroke="#d7dbe5"/><text x="18" y="28" font-size="17" font-weight="700" fill="#152033">${title}</text>${body}</g>`;
const colors={on:"#315fa8",off:"#e7eaf0",text:"#526079",good:"#247f77",bad:"#c74f2d",accent:"#b47b13"};
const shortName={geometric_fold_caustic:"fold caustic",isolated_resonance:"resonance",classical_pressure_wave:"pressure wave",phonon_focusing:"phonon focus",cusp_without_shock:"cusp",riemann_shock_without_cusp:"shock"};
let matrix="";
for(let j=0;j<readers.length;j++)matrix+=`<text x="${190+j*40}" y="54" font-size="11" fill="${colors.text}">${readers[j].id}</text>`;
for(let i=0;i<cases.length;i++){
  matrix+=`<text x="18" y="${82+i*34}" font-size="12" fill="${colors.text}">${cases[i].id} · ${shortName[cases[i].truth]}</text>`;
  for(let j=0;j<readers.length;j++){const active=signature(cases[i],[readers[j].id]).includes("1");matrix+=`<rect x="${183+j*40}" y="${66+i*34}" width="24" height="24" rx="4" fill="${active?colors.on:colors.off}"/>`;}
}
matrix+=`<text x="18" y="294" font-size="11" fill="${colors.text}">R8 is intentionally null for this benchmark.</text>`;

const maxCost=Math.max(...subsets.map(s=>s.cost)),scatter=subsets.map(s=>{const x=38+s.cost/maxCost*500,y=285-(s.classCount-1)/5*220;return`<circle cx="${round(x,2)}" cy="${round(y,2)}" r="${s.fullySeparating?3.4:2}" fill="${s.fullySeparating?colors.good:"#9ca7b8"}" opacity=".72"/>`;}).join("");
const scatterBody=`<line x1="38" y1="285" x2="540" y2="285" stroke="#a7adba"/><line x1="38" y1="65" x2="38" y2="285" stroke="#a7adba"/>${scatter}<text x="220" y="316" font-size="12" fill="${colors.text}">total reader cost</text><text x="12" y="55" font-size="11" fill="${colors.text}">6 classes</text><text x="18" y="299" font-size="11" fill="${colors.text}">1</text>`;

const heat=(metric,x0,y0,label)=>{
  let out=`<text x="${x0}" y="${y0-10}" font-size="12" fill="${colors.text}">${label}</text>`;
  for(let i=0;i<resolutions.length;i++)for(let j=0;j<noiseLevels.length;j++){
    const row=noiseSurface.find(r=>r.resolution===resolutions[i]&&r.noiseSigma===noiseLevels[j]),value=row[metric]??0,hue=round(120*value);
    out+=`<rect x="${x0+j*43}" y="${y0+i*42}" width="38" height="36" rx="3" fill="hsl(${hue} 52% 72%)"/><text x="${x0+5+j*43}" y="${y0+23+i*42}" font-size="9" fill="#152033">${round(value,2)}</text>`;
  }
  return out;
};
let heatLabels="";for(let j=0;j<noiseLevels.length;j++)heatLabels+=`<text x="${42+j*43}" y="246" font-size="9" fill="${colors.text}">${noiseLevels[j]}</text>`;
for(let i=0;i<resolutions.length;i++)heatLabels+=`<text x="12" y="${82+i*42}" font-size="9" fill="${colors.text}">${resolutions[i]}</text>`;
const heatBody=`${heat("coverage",42,62,"coverage")}${heat("selectiveAccuracy",382,62,"selective accuracy")}${heatLabels}<text x="122" y="270" font-size="11" fill="${colors.text}">noise sigma →</text><text x="12" y="290" font-size="11" fill="${colors.text}">resolution rows: 1, .75, .5, .25</text>`;

const separatorLines=minimumSeparators.slice(0,8).map((s,i)=>`<text x="18" y="${65+i*23}" font-size="12" fill="${colors.text}">${s.readerIds.join(" + ")} · cost ${s.cost}</text>`).join("");
const ambiguityLines=leaveOneOut.map((x,i)=>`<text x="18" y="${210+i*18}" font-size="10.5" fill="${colors.text}">without ${x.removed}: ${x.equivalenceClasses.map(g=>`{${g.map(y=>shortName[y]).join(", ")}}`).join(" ")||"still separated"}</text>`).join("");
const separatorBody=`<text x="18" y="48" font-size="12" fill="${colors.text}">minimum-cost complete separators</text>${separatorLines}<text x="18" y="190" font-size="12" font-weight="700" fill="#152033">leave-one-reader-out collisions</text>${ambiguityLines}`;
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="#f1f3f7"/><g font-family="system-ui,sans-serif">${panel(20,20,570,330,"Typed reader matrix",matrix)}${panel(610,20,570,330,"All 256 reader subsets",scatterBody)}${panel(20,370,760,340,"Noise, resolution and abstention",heatBody)}${panel(800,370,380,340,"Minimal separators",separatorBody)}<text x="20" y="742" font-size="12" fill="${colors.text}">Reader-ablation and minimal-separator workbench v1 · deterministic · abstention is an admissible output</text></g></svg>\n`;
const figureSha256=crypto.createHash("sha256").update(svg).digest("hex");

const result={schemaVersion:"0.1.0",status:"deterministic reader-ablation and minimal-separator workbench",authority:{sourcePath:"evidence/data/wave-geometry-mechanism-workbench-v1.json",sourceFigureSha256:source.figure.sha256},readers,cases:cases.map(c=>({id:c.id,truth:c.truth,features:c.features})),structuralTournament:{subsetCount:subsets.length,subsets,fullySeparatingCount:separating.length,minimumCost,minimumSeparators,primarySeparator:primary,nullReaders,singleReaderAblations,leaveOneOut,structuralAbstentionRule:"when a projected signature names more than one mechanism, return that equivalence class and mark singleton identification unavailable",structuralAbstention},robustnessTournament:{primarySeparator:primary,noiseLevels,resolutions,trialsPerCase,posteriorGate,noiseSurface,metrics:{coverage:"committed trials / all trials",selectiveAccuracy:"correct / committed",falseCommitRate:"incorrect committed / all trials",abstainRate:"abstained / all trials"}},figure:{path:"evidence/figures/wave-mechanism-reader-ablation-v1.svg",sha256:figureSha256},applicationBoundary:{neutral:true,noForcedLabel:true,statement:"this synthetic result tests reader sufficiency under its declared noise model; it does not establish empirical identifiability for any application"},verdict:{structural:"complete data are unnecessary, but no single reader separates all six mechanisms",minimal:`minimum total reader cost is ${minimumCost}`,robustness:"resolution loss and noise reduce confident coverage; the posterior gate preserves a visible distinction between abstention and false commitment",nextGate:"repeat with correlated noise, systematic bias and one real carrier dataset"}};

assert.equal(subsets.length,256);
assert.ok(minimumCost>0);
assert.ok(minimumSeparators.length>0);
assert.ok(minimumSeparators.every(s=>partition(s.readerIds).every(g=>g.length===1)));
assert.ok(nullReaders.includes("R8"));
assert.ok(noiseSurface.some(x=>x.abstainRate>0));
assert.ok(noiseSurface.every(x=>x.coverage+x.abstainRate>.999999&&x.coverage+x.abstainRate<1.000001));
assert.equal(result.applicationBoundary.noForcedLabel,true);

const output=`${JSON.stringify(result,null,2)}\n`;
if(process.argv.includes("--write")){
  fs.writeFileSync(new URL("../evidence/data/wave-mechanism-reader-ablation-v1.json",import.meta.url),output);
  fs.writeFileSync(new URL("../evidence/figures/wave-mechanism-reader-ablation-v1.svg",import.meta.url),svg);
  console.log("wrote wave mechanism reader-ablation evidence and figure");
}else console.log(output.trimEnd());
