import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"../..");
const data=JSON.parse(readFileSync(path.join(root,"evidence/data/spin23-triangle-centered-cubic-elimination.json"),"utf8"));

function eig3(A){
  A=A.map(r=>r.slice());
  for(let k=0;k<80;k+=1){
    let p=0,q=1;
    for(let i=0;i<3;i+=1)for(let j=i+1;j<3;j+=1)if(Math.abs(A[i][j])>Math.abs(A[p][q]))[p,q]=[i,j];
    if(Math.abs(A[p][q])<1e-7)break;
    const phi=.5*Math.atan2(2*A[p][q],A[q][q]-A[p][p]),c=Math.cos(phi),s=Math.sin(phi);
    const app=c*c*A[p][p]-2*s*c*A[p][q]+s*s*A[q][q],aqq=s*s*A[p][p]+2*s*c*A[p][q]+c*c*A[q][q];
    for(let r=0;r<3;r+=1)if(r!==p&&r!==q){const arp=A[r][p],arq=A[r][q];A[r][p]=A[p][r]=c*arp-s*arq;A[r][q]=A[q][r]=s*arp+c*arq;}
    A[p][p]=app;A[q][q]=aqq;A[p][q]=A[q][p]=0;
  }
  return [A[0][0],A[1][1],A[2][2]].sort((x,y)=>x-y);
}
const w=data.spectralWitness,{a,b,c,eta}=w;
const D=[a+c,a+b,b+c],H=[[0,a,-c],[a,0,b],[-c,b,0]];
const matrix=s=>D.map((d,i)=>D.map((_,j)=>(i===j?d:0)+s*H[i][j]));
const eu=eig3(matrix(-1)),ed=eig3(matrix(eta));
const ratio=e=>(e[1]-e[0])/(e[2]-e[0]);
const ru=ratio(eu),rd=ratio(ed);
assert.equal(data.documentId,1480);
assert.ok(Math.abs(ru-data.targets.up)<2e-14);
assert.ok(Math.abs(rd-data.targets.down)<2e-14);
assert.ok(Math.abs(w.bOverA-b/a)<1e-9&&Math.abs(w.bOverC-b/c)<1e-9);
const z=r=>-((r+1)*(2*r-1)*(2-r))/((r*r-r+1)**1.5);
assert.ok(z(data.targets.up)>1.999999998&&z(data.targets.down)>1.999999);
assert.equal(data.centeredInvariant.holonomyEliminated,true);
assert.equal(data.verdict.spectralTargetsCompatible,true);
assert.equal(data.verdict.mixingJoined,false);
assert.equal(data.verdict.globalNoGoEstablished,false);
assert.equal(data.verdict.physicalAdmissionChanged,false);
console.log(`PASS 1480: one delta=pi triangle reproduces both affine mass-squared locations (ru=${ru.toExponential(6)}, rd=${rd.toExponential(6)}); spectral compatibility is established without joining CKM mixing.`);
