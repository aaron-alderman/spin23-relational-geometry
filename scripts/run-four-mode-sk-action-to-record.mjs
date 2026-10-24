#!/usr/bin/env node
import {mkdirSync,writeFileSync} from "node:fs";
import {dirname,resolve} from "node:path";
const root=resolve(import.meta.dirname,".."), outputPath=resolve(root,"evidence/data/four-mode-sk-action-to-record-v1.json");
const write=process.argv.includes("--write"), coupling=2, linewidth=0.1;
const settings={exact:[0,0,0],resolved:[2,-0.3,-1.7]};
const c=(re=0,im=0)=>({re,im});
const add=(a,b)=>c(a.re+b.re,a.im+b.im), sub=(a,b)=>c(a.re-b.re,a.im-b.im);
const mul=(a,b)=>c(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const div=(a,b)=>{const d=b.re*b.re+b.im*b.im;return c((a.re*b.re+a.im*b.im)/d,(a.im*b.re-a.re*b.im)/d);};
const abs2=a=>a.re*a.re+a.im*a.im;
function solve(input,b){
  const a=input.map(row=>row.map(z=>c(z.re,z.im))), x=b.map(z=>c(z.re,z.im)), n=a.length;
  for(let i=0;i<n;i+=1){let p=i;for(let j=i+1;j<n;j+=1)if(abs2(a[j][i])>abs2(a[p][i]))p=j;[a[i],a[p]]=[a[p],a[i]];[x[i],x[p]]=[x[p],x[i]];
    const pivot=a[i][i];for(let k=i;k<n;k+=1)a[i][k]=div(a[i][k],pivot);x[i]=div(x[i],pivot);
    for(let j=0;j<n;j+=1)if(j!==i){const f=a[j][i];for(let k=i;k<n;k+=1)a[j][k]=sub(a[j][k],mul(f,a[i][k]));x[j]=sub(x[j],mul(f,x[i]));}}
  return x;
}
const hamiltonian=outer=>[[0,coupling,coupling,coupling],[coupling,outer[0],0,0],[coupling,0,outer[1],0],[coupling,0,0,outer[2]]];
const frequencies=Array.from({length:49},(_,i)=>-6+i*0.25);
const audits={}; let maxEquationResidual=0,maxBalanceResidual=0,minNoiseEigenvalue=linewidth;
for(const [name,outer] of Object.entries(settings)){
  const H=hamiltonian(outer); const records=[];
  for(const omega of frequencies){
    const D=H.map((row,i)=>row.map((value,j)=>c((i===j?omega:0)-value,i===j?linewidth/2:0)));
    const drive=[c(1),c(),c(),c()], amplitude=solve(D,drive);
    const equation=D.map((row,i)=>row.reduce((sum,z,j)=>add(sum,mul(z,amplitude[j])),c()));
    maxEquationResidual=Math.max(maxEquationResidual,...equation.map((z,i)=>Math.sqrt(abs2(sub(z,drive[i])))));
    const dissipated=(linewidth/2)*amplitude.reduce((sum,z)=>sum+abs2(z),0);
    const injected=-amplitude[0].im;
    maxBalanceResidual=Math.max(maxBalanceResidual,Math.abs(dissipated-injected));
    records.push({omega,detectorAmplitude:amplitude,dissipatedPower:dissipated,injectedPower:injected});
  }
  audits[name]={outerDetunings:outer,hamiltonian:H,records};
}
const output={protocol:"four-mode-sk-action-to-record/1",packet:"AZ-109",topics:["OT-027","OT-010"],parent:"AZ-059",
  action:{form:"S_SK = integral a_a^dagger[(i d_t-H)+i kappa/2]a_r + h.c. + i kappa(2n+1)a_a^dagger a_a + source and calibrated detector terms",retardedOperator:"D_R(omega)=(omega+i kappa/2)I-H",amplitudeMap:"a=D_R^-1 B u",lossMap:"P_loss=(kappa/2)||a||^2",detectorMap:"y=C a",noiseKernel:"N=kappa(2n+1)I"},
  calibratedCarrier:{commonFrequencyMHz:100,couplingMHz:coupling,linewidthMHz:linewidth,drivePort:"hub",detectorPorts:"four complex resonator amplitudes",settings},audits,
  certificate:{frequencyCases:frequencies.length*Object.keys(settings).length,maximumEquationResidual:maxEquationResidual,maximumPowerBalanceResidual:maxBalanceResidual,minimumNoiseEigenvalue:minNoiseEigenvalue,operatorAmplitudeLossDetectorGeneratedTogether:true},
  decision:{engineeredBenchActionToRecordClosed:true,claimipediaRelationToPhysicalOperatorClosed:false,sourceNativeNaturalCarrierEstablished:false,ot027GloballyClosed:false,ot046LocalizedOperatorSupplied:false,newPhysicsEvidence:false},
  nextGate:"fit this frozen action prospectively to the built four-port carrier with calibration covariance, or supply a source-native relation-to-operator dictionary whose held-out records are not programmed into the hardware"};
if(write){mkdirSync(dirname(outputPath),{recursive:true});writeFileSync(outputPath,JSON.stringify(output,null,2)+"\n");console.log("wrote "+outputPath);}
console.log(JSON.stringify({frequencyCases:output.certificate.frequencyCases,maximumEquationResidual:maxEquationResidual,maximumPowerBalanceResidual:maxBalanceResidual,minimumNoiseEigenvalue:minNoiseEigenvalue,decision:output.decision},null,2));
