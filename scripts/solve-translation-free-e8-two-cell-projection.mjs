#!/usr/bin/env node
import assert from "node:assert/strict";
import {spawnSync} from "node:child_process";
import fs from "node:fs";

const args=Object.fromEntries(process.argv.slice(2).map(argument=>{const [name,value="true"]=argument.replace(/^--/u,"").split("=");return [name,value];}));
const cutoffs=args.cutoffs??"4,6,8";
const couplings=(args.couplings??"0,0.01,0.025,0.05,0.1").split(",").map(Number);
const requestedRoots=Number(args.roots??4);
const solverArgs=["scripts/solve-translation-free-e8-joined-rotor.mjs",`--cutoffs=${cutoffs}`,"--branches=cartan-kernel","--method=davidson",`--roots=${requestedRoots}`,`--maxSubspace=${args.maxSubspace??32}`,`--cycles=${args.cycles??80}`,`--potential=${args.potential??0.5}`];
const child=spawnSync(process.execPath,solverArgs,{encoding:"utf8",maxBuffer:64*1024*1024});
if(child.status!==0)throw new Error(child.stderr||`single-cell solver exited ${child.status}`);
const single=JSON.parse(child.stdout);

const eigensystem=matrix=>{
  const A=matrix.map(row=>[...row]);const n=A.length;
  const V=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>Number(i===j)));
  for(let step=0;step<200000;step+=1){
    let p=0,q=1,m=0;for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)if(Math.abs(A[i][j])>m){m=Math.abs(A[i][j]);p=i;q=j;}
    if(m<1e-13)break;
    const angle=.5*Math.atan2(2*A[p][q],A[q][q]-A[p][p]),c=Math.cos(angle),s=Math.sin(angle),app=A[p][p],aqq=A[q][q],apq=A[p][q];
    for(let k=0;k<n;k++)if(k!==p&&k!==q){const kp=A[k][p],kq=A[k][q];A[k][p]=A[p][k]=c*kp-s*kq;A[k][q]=A[q][k]=s*kp+c*kq;}
    A[p][p]=c*c*app-2*s*c*apq+s*s*aqq;A[q][q]=s*s*app+2*s*c*apq+c*c*aqq;A[p][q]=A[q][p]=0;
    for(let k=0;k<n;k++){const vp=V[k][p],vq=V[k][q];V[k][p]=c*vp-s*vq;V[k][q]=s*vp+c*vq;}
  }
  return A.map((row,i)=>({energy:row[i],vector:V.map(r=>r[i])})).sort((a,b)=>a.energy-b.energy);
};

const records=single.records.map(record=>{
  const roots=record.levels.length,dimension=roots*roots;
  assert.equal(roots,requestedRoots);
  const parity=record.diagnostics.levels.map(x=>Math.sign(x.parityExpectation));
  const C=record.diagnostics.projectedCosineMatrices,A=record.diagnostics.projectedSineProxyMatrices;
  let cosineSymmetryError=0,sineAntisymmetryError=0;
  for(let i=0;i<8;i++)for(let a=0;a<roots;a++)for(let b=0;b<roots;b++){
    cosineSymmetryError=Math.max(cosineSymmetryError,Math.abs(C[i][a][b]-C[i][b][a]));
    sineAntisymmetryError=Math.max(sineAntisymmetryError,Math.abs(A[i][a][b]+A[i][b][a]));
  }
  const interaction=Array.from({length:dimension},()=>Array(dimension).fill(0));
  for(let a=0;a<roots;a++)for(let b=0;b<roots;b++)for(let c=0;c<roots;c++)for(let d=0;d<roots;d++){
    const row=a*roots+b,column=c*roots+d;
    for(let i=0;i<8;i++)interaction[row][column]+=C[i][a][c]*C[i][b][d]-A[i][a][c]*A[i][b][d];
  }
  const sweeps=couplings.map(J=>{
    const H=interaction.map((row,index)=>row.map((value,column)=>-J*value+(index===column?record.levels[Math.floor(index/roots)].energy+record.levels[index%roots].energy:0)));
    const solved=eigensystem(H);const ground=solved[0].energy;
    const levels=solved.slice(0,8).map(item=>{
      let swap=0,inversion=0,excitationNumber=0;
      for(let a=0;a<roots;a++)for(let b=0;b<roots;b++){
        const index=a*roots+b,weight=item.vector[index]**2;
        swap+=item.vector[index]*item.vector[b*roots+a];
        inversion+=weight*parity[a]*parity[b];
        excitationNumber+=weight*(Number(a>0)+Number(b>0));
      }
      return {energy:item.energy,gap:item.energy-ground,swapExpectation:swap,inversionExpectation:inversion,projectedExcitationNumber:excitationNumber};
    });
    return {intercellCoupling:J,levels,firstGap:levels[1].gap,secondGap:levels[2].gap,firstDoubletSplitting:levels[2].energy-levels[1].energy};
  });
  return {cutoff:record.cutoffKineticEnergy,basisStates:record.basisStates,singleCellLevels:record.levels.map(x=>x.energy),singleCellResiduals:record.levels.map(x=>x.residual),singleCellBoundaryProbabilities:record.diagnostics.levels.map(x=>x.boundaryProbability),singleCellParities:parity,projectedDimension:dimension,operatorChecks:{cosineSymmetryError,sineAntisymmetryError},sweeps};
});
const output={schemaVersion:"translation-free-e8-two-cell-projection-output-v1",settings:{cutoffs:cutoffs.split(",").map(Number),couplings,localRoots:requestedRoots,localPotential:Number(args.potential??0.5),interaction:"-J sum_i [C_i tensor C_i - A_i tensor A_i], A=i sin(theta) real proxy",constantOffsetOmitted:true},records};
if(args.output)fs.writeFileSync(args.output,`${JSON.stringify(output,null,2)}\n`);
console.log(JSON.stringify(args.output?{schemaVersion:output.schemaVersion,output:args.output,records:records.map(record=>({cutoff:record.cutoff,basisStates:record.basisStates,maximumResidual:Math.max(...record.singleCellResiduals),maximumBoundaryProbability:Math.max(...record.singleCellBoundaryProbabilities),operatorChecks:record.operatorChecks,sweep:record.sweeps.map(item=>({J:item.intercellCoupling,firstGap:item.firstGap,secondGap:item.secondGap,firstDoubletSplitting:item.firstDoubletSplitting}))}))}:output,null,2));
