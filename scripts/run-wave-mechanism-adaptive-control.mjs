#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";

const source=JSON.parse(fs.readFileSync(new URL("../evidence/data/wave-mechanism-reader-ablation-v1.json",import.meta.url),"utf8"));
const round=(x,n=8)=>Number(x.toFixed(n));
const readers=source.readers,readerById=new Map(readers.map(r=>[r.id,r])),cases=source.cases;
const fixedReaders=source.structuralTournament.primarySeparator;
const fixedCost=fixedReaders.reduce((s,id)=>s+readerById.get(id).cost,0);
const bitSignature=(row,id)=>readerById.get(id).features.map(f=>row.features[f]?1:0).join("");
const entropy=n=>n<=1?0:Math.log2(n);

const chooseReader=(candidates,selected)=>{
  const options=readers.filter(r=>!selected.includes(r.id)).map(reader=>{
    const groups=new Map();for(const row of candidates){const sig=bitSignature(row,reader.id);if(!groups.has(sig))groups.set(sig,[]);groups.get(sig).push(row);}
    const expected=[...groups.values()].reduce((s,g)=>s+g.length/candidates.length*entropy(g.length),0);
    const gain=entropy(candidates.length)-expected;
    return{id:reader.id,name:reader.name,cost:reader.cost,gain:round(gain),gainPerCost:round(gain/reader.cost),groupSizes:[...groups.values()].map(g=>g.length).sort((a,b)=>a-b)};
  }).filter(x=>x.gain>1e-12).sort((a,b)=>b.gainPerCost-a.gainPerCost||b.gain-a.gain||a.cost-b.cost||a.id.localeCompare(b.id));
  return options[0]??null;
};
const adaptivePaths=cases.map(truthRow=>{
  let candidates=[...cases],selected=[],cost=0;const steps=[];
  while(candidates.length>1){
    const choice=chooseReader(candidates,selected);if(!choice)break;
    const outcome=bitSignature(truthRow,choice.id);selected.push(choice.id);cost+=choice.cost;
    const before=candidates.map(x=>x.truth);candidates=candidates.filter(row=>bitSignature(row,choice.id)===outcome);
    steps.push({readerId:choice.id,readerName:choice.name,outcome,cost:choice.cost,informationGainBits:choice.gain,gainPerCost:choice.gainPerCost,candidatesBefore:before,candidatesAfter:candidates.map(x=>x.truth)});
  }
  return{truth:truthRow.truth,identified:candidates.length===1&&candidates[0].truth===truthRow.truth,totalCost:cost,selectedReaders:selected,steps,finalCandidates:candidates.map(x=>x.truth)};
});
const adaptiveSummary={fixedCompleteReaderIds:fixedReaders,fixedCost,paths:adaptivePaths,averageCost:round(adaptivePaths.reduce((s,x)=>s+x.totalCost,0)/adaptivePaths.length),maximumCost:Math.max(...adaptivePaths.map(x=>x.totalCost)),minimumCost:Math.min(...adaptivePaths.map(x=>x.totalCost))};
adaptiveSummary.averageSavingVersusFixed=round(fixedCost-adaptiveSummary.averageCost);

const dimensions=fixedReaders.flatMap(id=>readerById.get(id).features.map(feature=>({readerId:id,feature,exponent:readerById.get(id).resolutionExponent})));
const d=dimensions.length;
const correlation=Array.from({length:d},(_,i)=>Array.from({length:d},(_,j)=>i===j?1:0));
const correlate=(featureA,featureB,value)=>{const i=dimensions.findIndex(x=>x.feature===featureA),j=dimensions.findIndex(x=>x.feature===featureB);assert.ok(i>=0&&j>=0);correlation[i][j]=correlation[j][i]=value;};
correlate("projectionRankLoss","higherProjectionDegeneracy",.65);
correlate("fieldJump","entropyCondition",.75);
correlate("spatialPropagation","anisotropicGroupVelocity",.2);
correlate("spatialPropagation","fieldJump",.12);

const cholesky=matrix=>{const n=matrix.length,L=Array.from({length:n},()=>Array(n).fill(0));for(let i=0;i<n;i++)for(let j=0;j<=i;j++){let sum=matrix[i][j];for(let k=0;k<j;k++)sum-=L[i][k]*L[j][k];if(i===j){assert.ok(sum>1e-12,"matrix must be positive definite");L[i][j]=Math.sqrt(sum);}else L[i][j]=sum/L[j][j];}return L;};
const solveLower=(L,b)=>{const x=[];for(let i=0;i<L.length;i++){let s=b[i];for(let j=0;j<i;j++)s-=L[i][j]*x[j];x[i]=s/L[i][i];}return x;};
const submatrix=(matrix,indices)=>indices.map(i=>indices.map(j=>matrix[i][j]));
const gaussianLogLikelihood=(observed,mean,indices,sigma,corr)=>{
  if(indices.length===0)return 0;
  const cov=submatrix(corr,indices).map(row=>row.map(x=>x*sigma*sigma)),L=cholesky(cov),delta=indices.map(i=>observed[i]-mean[i]),z=solveLower(L,delta),mahal=z.reduce((s,x)=>s+x*x,0),logDet=2*L.reduce((s,row,i)=>s+Math.log(row[i]),0);
  return-.5*(mahal+logDet+indices.length*Math.log(2*Math.PI));
};
const scenarios=[
  {id:"none",label:"correlated noise only"},
  {id:"projection_blur",label:"projection blur"},
  {id:"jump_smoothing",label:"jump smoothing"},
  {id:"directional_baseline",label:"directional false baseline"},
  {id:"combined",label:"combined bias"}
];
const hasScenario=(scenario,id)=>scenario===id||scenario==="combined";
const bias=(row,dimension,scenario)=>{
  const bit=row.features[dimension.feature]?1:0;
  if(hasScenario(scenario,"projection_blur")&&["projectionRankLoss","higherProjectionDegeneracy"].includes(dimension.feature)&&bit)return-.22;
  if(hasScenario(scenario,"jump_smoothing")&&["fieldJump","entropyCondition"].includes(dimension.feature)&&bit)return-.28;
  if(hasScenario(scenario,"directional_baseline")&&dimension.feature==="anisotropicGroupVelocity"&&!bit)return.2;
  return 0;
};
const meanVector=(row,resolution,scenario,calibrated)=>dimensions.map(dim=>(row.features[dim.feature]?1:0)*resolution**dim.exponent+(calibrated?bias(row,dim,scenario):0));
const missingProbability=(row,dim,resolution)=>Math.min(.75,.04+(1-resolution)*.28+(row.features[dim.feature]?.09:0));

let seed=0x91e10da5;
const uniform=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return(seed+.5)/4294967296};
const gaussian=()=>Math.sqrt(-2*Math.log(uniform()))*Math.cos(2*Math.PI*uniform());
const Lcorr=cholesky(correlation);
const correlatedNoise=sigma=>{const z=Array.from({length:d},gaussian),out=Array(d).fill(0);for(let i=0;i<d;i++)for(let j=0;j<=i;j++)out[i]+=Lcorr[i][j]*z[j]*sigma;return out;};
const logMissingPattern=(candidate,mask,resolution)=>dimensions.reduce((s,dim,i)=>{const p=missingProbability(candidate,dim,resolution);return s+Math.log(mask[i]?1-p:p);},0);
const posteriorDecision=(observed,mask,resolution,sigma,scenario,model,gate)=>{
  const indices=mask.map((x,i)=>x?i:-1).filter(i=>i>=0);if(indices.length===0)return{committed:false,predicted:null,confidence:1/cases.length};
  const scored=cases.map(row=>{
    const calibrated=model==="calibrated",mean=meanVector(row,resolution,scenario,calibrated);
    let ll=gaussianLogLikelihood(observed,mean,indices,sigma,calibrated?correlation:Array.from({length:d},(_,i)=>Array.from({length:d},(_,j)=>i===j?1:0)));
    if(calibrated)ll+=logMissingPattern(row,mask,resolution);
    return{truth:row.truth,ll};
  }).sort((a,b)=>b.ll-a.ll);
  const weights=scored.map(x=>Math.exp(x.ll-scored[0].ll)),total=weights.reduce((a,b)=>a+b,0),confidence=weights[0]/total;
  return{committed:confidence>=gate,predicted:scored[0].truth,confidence};
};

const noiseLevels=[.1,.2,.3,.4],resolutions=[1,.5,.25],trialsPerCase=250,posteriorGate=.8,robustness=[];
for(const scenario of scenarios)for(const resolution of resolutions)for(const sigma of noiseLevels){
  const counters={calibrated:{committed:0,correct:0,false:0},independentNaive:{committed:0,correct:0,false:0},missingCounts:Array(d).fill(0),total:0};
  for(const truthRow of cases)for(let trial=0;trial<trialsPerCase;trial++){
    counters.total++;const trueMean=meanVector(truthRow,resolution,scenario.id,true),noise=correlatedNoise(sigma),observed=trueMean.map((x,i)=>x+noise[i]),mask=dimensions.map((dim,i)=>{const present=uniform()>=missingProbability(truthRow,dim,resolution);if(!present)counters.missingCounts[i]++;return present;});
    for(const [key,model] of [["calibrated","calibrated"],["independentNaive","naive"]]){const decision=posteriorDecision(observed,mask,resolution,sigma,scenario.id,model,posteriorGate),c=counters[key];if(decision.committed){c.committed++;if(decision.predicted===truthRow.truth)c.correct++;else c.false++;}}
  }
  const summarize=c=>({coverage:round(c.committed/counters.total),selectiveAccuracy:c.committed?round(c.correct/c.committed):null,falseCommitRate:round(c.false/counters.total),abstainRate:round(1-c.committed/counters.total)});
  robustness.push({scenario:scenario.id,resolution,noiseSigma:sigma,total:counters.total,missingRates:Object.fromEntries(dimensions.map((dim,i)=>[dim.feature,round(counters.missingCounts[i]/counters.total)])),calibrated:summarize(counters.calibrated),independentNaive:summarize(counters.independentNaive)});
}

const benchmark=robustness.filter(x=>x.resolution===.5&&x.noiseSigma===.3);
const short={geometric_fold_caustic:"fold",isolated_resonance:"resonance",classical_pressure_wave:"pressure",phonon_focusing:"phonon",cusp_without_shock:"cusp",riemann_shock_without_cusp:"shock"};
const W=1200,H=780,panel=(x,y,w,h,title,body)=>`<g transform="translate(${x} ${y})"><rect width="${w}" height="${h}" rx="12" fill="#fbfbfd" stroke="#d7dbe5"/><text x="18" y="28" font-size="17" font-weight="700" fill="#152033">${title}</text>${body}</g>`;
const text="#526079",good="#247f77",bad="#c74f2d",blue="#315fa8",muted="#d9dee8";
const pathRows=adaptivePaths.map((p,i)=>{const chain=p.steps.map(s=>s.readerId).join(" → ");return`<text x="18" y="${62+i*36}" font-size="12" fill="${text}">${short[p.truth]}: ${chain}</text><text x="430" y="${62+i*36}" font-size="12" fill="#152033">cost ${p.totalCost}</text>`;}).join("");
const adaptiveBody=`<text x="18" y="46" font-size="11" fill="${text}">reader path depends on earlier outcomes</text>${pathRows}<text x="18" y="286" font-size="12" fill="#152033">average ${round(adaptiveSummary.averageCost,2)} · fixed ${fixedCost} · saving ${round(adaptiveSummary.averageSavingVersusFixed,2)}</text>`;
const maxFalse=Math.max(...benchmark.flatMap(x=>[x.calibrated.falseCommitRate,x.independentNaive.falseCommitRate,.01]));
let biasBars="";benchmark.forEach((row,i)=>{const y=62+i*48,w1=230*row.calibrated.falseCommitRate/maxFalse,w2=230*row.independentNaive.falseCommitRate/maxFalse;biasBars+=`<text x="18" y="${y+12}" font-size="11" fill="${text}">${row.scenario.replaceAll("_"," ")}</text><rect x="170" y="${y}" width="${round(w1,2)}" height="12" fill="${good}"/><rect x="170" y="${y+17}" width="${round(w2,2)}" height="12" fill="${bad}"/><text x="${176+w1}" y="${y+10}" font-size="9" fill="#152033">${round(row.calibrated.falseCommitRate,3)}</text><text x="${176+w2}" y="${y+27}" font-size="9" fill="#152033">${round(row.independentNaive.falseCommitRate,3)}</text>`;});
const biasBody=`<text x="18" y="46" font-size="11" fill="${text}">false-commit rate · resolution .5 · noise .3</text>${biasBars}<text x="18" y="310" font-size="11" fill="${good}">calibrated correlated model</text><text x="220" y="310" font-size="11" fill="${bad}">independent naive model</text>`;
const heat=(metric,model,x0,y0,label)=>{let out=`<text x="${x0}" y="${y0-10}" font-size="11" fill="${text}">${label}</text>`;for(let i=0;i<resolutions.length;i++)for(let j=0;j<noiseLevels.length;j++){const row=robustness.find(r=>r.scenario==="combined"&&r.resolution===resolutions[i]&&r.noiseSigma===noiseLevels[j]),v=row[model][metric]??0,hue=round(120*(metric==="falseCommitRate"?1-Math.min(1,v/.15):v));out+=`<rect x="${x0+j*48}" y="${y0+i*48}" width="42" height="40" rx="3" fill="hsl(${hue} 52% 72%)"/><text x="${x0+7+j*48}" y="${y0+25+i*48}" font-size="10" fill="#152033">${round(v,2)}</text>`;}return out;};
const heatBody=`${heat("coverage","calibrated",42,68,"calibrated coverage")}${heat("falseCommitRate","calibrated",285,68,"calibrated false commits")}${heat("falseCommitRate","independentNaive",528,68,"naive false commits")}<text x="42" y="236" font-size="10" fill="${text}">rows resolution 1, .5, .25 · columns noise .1, .2, .3, .4</text>`;
const corrCells=correlation.flatMap((row,i)=>row.map((v,j)=>`<rect x="${72+j*34}" y="${58+i*34}" width="28" height="28" rx="3" fill="hsl(${round(210-180*Math.abs(v))} 50% ${round(92-35*Math.abs(v))}%)"/><text x="${77+j*34}" y="${76+i*34}" font-size="8" fill="#152033">${round(v,2)}</text>`)).join("");
const corrLabels=dimensions.map((dim,i)=>`<text x="${78+i*34}" y="48" font-size="9" fill="${text}">${i+1}</text><text x="48" y="${76+i*34}" font-size="9" fill="${text}">${i+1}</text>`).join("");
const corrBody=`${corrCells}${corrLabels}<text x="18" y="286" font-size="10" fill="${text}">1 spatial · 2–3 projection · 4–5 jump · 6 transport</text><text x="18" y="306" font-size="10" fill="${text}">missingness depends on resolution and latent signal</text>`;
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="#f1f3f7"/><g font-family="system-ui,sans-serif">${panel(20,20,500,340,"Adaptive structural policy",adaptiveBody)}${panel(540,20,640,340,"Bias calibration comparison",biasBody)}${panel(20,380,760,350,"Combined bias, correlation and missingness",heatBody)}${panel(800,380,380,350,"Declared correlation",corrBody)}<text x="20" y="762" font-size="12" fill="${text}">Adaptive-control workbench v1 · glass-box reader choice · abstention preserved</text></g></svg>\n`;
const figureSha256=crypto.createHash("sha256").update(svg).digest("hex");

const result={schemaVersion:"0.1.0",status:"deterministic adaptive measurement and misspecification workbench",authority:{sourcePath:"evidence/data/wave-mechanism-reader-ablation-v1.json",sourceFigureSha256:source.figure.sha256},adaptiveStructuralPolicy:adaptiveSummary,robustnessModel:{dimensions,correlation,scenarios,noiseLevels,resolutions,trialsPerCase,posteriorGate,missingness:"p_missing=.04+.28(1-resolution)+.09*latent_positive, capped at .75",biases:{projectionBlur:"-0.22 on positive projection fields",jumpSmoothing:"-0.28 on positive jump/entropy fields",directionalBaseline:"+0.20 on negative anisotropic-transport fields",combined:"all three"},models:{calibrated:"correlated Gaussian likelihood plus declared systematic means and missingness likelihood",independentNaive:"independent Gaussian likelihood, zero systematic bias and ignored missingness mechanism"},results:robustness,benchmark},figure:{path:"evidence/figures/wave-mechanism-adaptive-control-v1.svg",sha256:figureSha256},glassBox:{readerChoiceTrace:true,exactCandidateSets:true,declaredCosts:true,declaredCovariance:true,declaredBiases:true,missingnessVisible:true,abstentionVisible:true,noLlmRequired:true},applicationBoundary:{neutral:true,statement:"the policy and robustness results are synthetic controls; application requires a calibrated carrier-specific forward model and loss"},verdict:{adaptive:`outcome-conditioned selection reduces average synthetic reader cost from ${fixedCost} to ${adaptiveSummary.averageCost}`,misspecification:"under declared correlated noise, bias and MNAR dropout, calibrated and naive likelihoods remain separately reported; attractive aggregate accuracy cannot replace coverage and false-commit rates",nextGate:"instantiate the policy on one real acoustic or elastic dataset with immutable raw observations and a preregistered detector model"}};

assert.ok(adaptivePaths.every(x=>x.identified));
assert.ok(adaptiveSummary.averageCost<fixedCost);
assert.ok(robustness.some(x=>x.calibrated.abstainRate>0));
assert.ok(robustness.some(x=>x.independentNaive.falseCommitRate>x.calibrated.falseCommitRate));
assert.equal(result.glassBox.noLlmRequired,true);
assert.equal(result.applicationBoundary.neutral,true);

const output=`${JSON.stringify(result,null,2)}\n`;
if(process.argv.includes("--write")){
  fs.writeFileSync(new URL("../evidence/data/wave-mechanism-adaptive-control-v1.json",import.meta.url),output);
  fs.writeFileSync(new URL("../evidence/figures/wave-mechanism-adaptive-control-v1.svg",import.meta.url),svg);
  console.log("wrote wave mechanism adaptive-control evidence and figure");
}else console.log(output.trimEnd());
