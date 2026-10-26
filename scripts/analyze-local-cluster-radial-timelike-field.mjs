#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";

const snapshot=JSON.parse(fs.readFileSync(new URL("../evidence/data/local-cluster-director-field-full-snapshot-v1.json",import.meta.url),"utf8"));
const prior=JSON.parse(fs.readFileSync(new URL("../evidence/data/local-cluster-director-field-spike-v1.json",import.meta.url),"utf8"));
const rows=snapshot.clusters;
const dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0),norm=v=>Math.hypot(...v),unit=v=>{const n=norm(v);return n<1e-12?null:v.map(x=>x/n)};
const mean=vectors=>vectors[0].map((_,i)=>vectors.reduce((s,v)=>s+v[i],0)/vectors.length);
const median=values=>{const s=[...values].sort((a,b)=>a-b),m=Math.floor(s.length/2);return s.length%2?s[m]:(s[m-1]+s[m])/2};
const q=u=>[u[0]**2,u[1]**2,u[2]**2,u[0]*u[1],u[0]*u[2],u[1]*u[2]];
const error=(a,b)=>a.reduce((s,v,i)=>s+(v-b[i])**2,0);
const direction=(theta,phi)=>[Math.sin(theta)*Math.cos(phi),Math.sin(theta)*Math.sin(phi),Math.cos(theta)];
const rankOneFlat=train=>{
  const matrix=Array.from({length:3},()=>[0,0,0]);for(const row of train)for(let i=0;i<3;i++)for(let j=0;j<3;j++)matrix[i][j]+=row.directorIcrs[i]*row.directorIcrs[j]/train.length;
  let v=unit([1,.7,.3]);for(let iteration=0;iteration<100;iteration++)v=unit(matrix.map(r=>dot(r,v)));return v;
};
const predict=(fit,position)=>{
  const dx=position.map((v,i)=>(v-fit.origin[i])/100),u=unit(fit.n.map((v,i)=>v+fit.kappa*dx[i]));return u?q(u):null;
};
const fitRadial=train=>{
  const origin=mean(train.map(row=>row.centreIcrsPc));
  const objective=([theta,phi,kappa])=>{const fit={origin,n:direction(theta,phi),kappa};let total=0;for(const row of train){const predicted=predict(fit,row.centreIcrsPc);if(!predicted)return 1e9;total+=error(q(row.directorIcrs),predicted)}return total/train.length};
  const starts=[];const count=96,kappas=[-10,-3,-1,-.3,-.1,-.03,-.01,0,.01,.03,.1,.3,1,3,10];
  for(let i=0;i<count;i++){const z=1-2*(i+.5)/count,theta=Math.acos(z),phi=Math.PI*(3-Math.sqrt(5))*i;for(const kappa of kappas)starts.push({p:[theta,phi,kappa],value:objective([theta,phi,kappa])})}
  starts.sort((a,b)=>a.value-b.value);let best=starts[0];
  for(const start of starts.slice(0,24)){
    let p=[...start.p],value=start.value,steps=[.3,.3,Math.max(.1,Math.abs(p[2])*.35)];
    for(let iteration=0;iteration<120;iteration++){
      let improved=false;for(let j=0;j<3;j++)for(const sign of [-1,1]){const candidate=[...p];candidate[j]+=sign*steps[j];if(j===2&&Math.abs(candidate[j])>20)continue;const score=objective(candidate);if(score<value-1e-12){p=candidate;value=score;improved=true}}
      if(!improved)steps=steps.map(x=>x/2);if(Math.max(...steps)<1e-7)break;
    }
    if(value<best.value)best={p,value};
  }
  const [theta,phi,kappa]=best.p,n=direction(theta,phi),centre=Math.abs(kappa)<1e-8?null:origin.map((v,i)=>v-100*n[i]/kappa);
  return{origin,n,kappa,trainingMeanProjectorError:best.value,finiteCentreIcrsPc:centre,centreDistanceFromTrainingOriginPc:centre?norm(centre.map((v,i)=>v-origin[i])):null};
};

const fullFit=fitRadial(rows),folds=[],errors={meanProjectorFlat:[],rankOneFlat:[],radial:[]};
for(let holdout=0;holdout<rows.length;holdout++){
  const train=rows.filter((_,i)=>i!==holdout),test=rows[holdout],observed=q(test.directorIcrs),meanQ=mean(train.map(row=>q(row.directorIcrs))),flatDirection=rankOneFlat(train),radial=fitRadial(train);
  const foldErrors={meanProjectorFlat:error(observed,meanQ),rankOneFlat:error(observed,q(flatDirection)),radial:error(observed,predict(radial,test.centreIcrsPc))};
  for(const key of Object.keys(errors))errors[key].push(foldErrors[key]);
  folds.push({heldOut:test.name,errors:foldErrors,kappaPer100Pc:radial.kappa,centreDistanceFromTrainingOriginPc:radial.centreDistanceFromTrainingOriginPc,finiteCentreIcrsPc:radial.finiteCentreIcrsPc});
}
const summaries=Object.fromEntries(Object.entries(errors).map(([model,values])=>[model,{meanProjectorComponentSquaredError:values.reduce((a,b)=>a+b,0)/values.length,medianProjectorComponentSquaredError:median(values)}]));
const radialWins=errors.radial.filter((value,i)=>value<errors.meanProjectorFlat[i]).length;
const result={
  schemaVersion:"0.1.0",status:"retrospective radial-director organization spike; not a timelike coupling test",
  authority:{sourceSnapshot:"evidence/data/local-cluster-director-field-full-snapshot-v1.json",catalogue:snapshot.authority,normalizedRowHashes:Object.fromEntries(rows.map(row=>[row.name,row.normalizedRowsSha256]))},
  hypothesis:{field:"tau(x)=f(|x-X0|)",localDirector:"grad(tau) parallel to x-X0",projectiveReader:"Q=u u^T, so source versus sink sign is not identified",nestedNull:"kappa=0 is the rank-one flat director at an infinite centre",parameterization:"u(x)=normalize(n+kappa*(x-origin)/100 pc); X0=origin-100 pc*n/kappa"},
  fullFit:{kappaPer100Pc:fullFit.kappa,centreDistanceFromSampleOriginPc:fullFit.centreDistanceFromTrainingOriginPc,finiteCentreIcrsPc:fullFit.finiteCentreIcrsPc,trainingMeanProjectorError:fullFit.trainingMeanProjectorError},
  leaveOneClusterOut:{folds,summaries,radialWinsAgainstMeanProjectorFlat:radialWins,priorPublishedScores:prior.leaveOneClusterOut},
  timelikeBoundary:{tested:"ordinary three-dimensional radial organization of residual-gradient axes",notTested:["Lorentzian metric signature","hyperbolic rapidity response","clock transport","carrier-specific redshift law","spacelike induced-metric bound"],euclideanAngleReuseAllowed:false},
  verdict:null
};
const radialScore=summaries.radial.meanProjectorComponentSquaredError,flatScore=summaries.meanProjectorFlat.meanProjectorComponentSquaredError;
result.verdict=radialScore<flatScore?{finiteRadialOrganizationPreferred:true,statement:"the finite radial director improves whole-cluster holdout over the mean-projector flat model; replication and centre stability remain required"}:{finiteRadialOrganizationPreferred:false,statement:"the radial family does not improve whole-cluster holdout over the mean-projector flat field; a common finite centre is not identified"};
result.verdict.physicalTimelikeClaim=false;result.verdict.nextGate="repeat with full astrometric covariance, independent spectroscopy and a larger preregistered cluster sample; only then test centre stability and a Lorentzian carrier law";

assert.equal(rows.length,8);
assert.ok(Math.abs(summaries.meanProjectorFlat.meanProjectorComponentSquaredError-prior.leaveOneClusterOut.flat.meanProjectorComponentSquaredError)<1e-12);
assert.equal(result.timelikeBoundary.euclideanAngleReuseAllowed,false);
assert.equal(result.verdict.physicalTimelikeClaim,false);
const output=`${JSON.stringify(result,null,2)}\n`;
if(process.argv.includes("--write")){fs.writeFileSync(new URL("../evidence/data/local-cluster-radial-timelike-field-v1.json",import.meta.url),output);console.log("wrote evidence/data/local-cluster-radial-timelike-field-v1.json")}else console.log(output.trimEnd());
