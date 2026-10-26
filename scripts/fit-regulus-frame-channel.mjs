import fs from "node:fs";
import {pathToFileURL} from "node:url";

const evidence=JSON.parse(fs.readFileSync(new URL("../evidence/data/regulus-mub-selector-dynamics-v1.json",import.meta.url),"utf8"));
const fourNeighbors=evidence.overlapAssociationScheme.fourBasisNeighbors.map(neighbors=>new Set(neighbors));
const oneNeighbors=evidence.overlapAssociationScheme.oneBasisNeighbors.map(neighbors=>new Set(neighbors));
const size=fourNeighbors.length;

const relation=(row,column)=>row===column?"identity":fourNeighbors[row].has(column)?"fourBasis":oneNeighbors[row].has(column)?"oneBasis":null;
const mean=values=>values.reduce((sum,value)=>sum+value,0)/values.length;
const rms=values=>Math.sqrt(mean(values.map(value=>value*value)));

export const buildInvariantChannel=({alpha,beta,gamma})=>{
  if(Math.abs(alpha+beta+gamma-1)>1e-12)throw new Error("alpha + beta + gamma must equal one");
  return Array.from({length:size},(_,row)=>Array.from({length:size},(_,column)=>{
    const type=relation(row,column);
    return type==="identity"?alpha:type==="fourBasis"?beta/15:type==="oneBasis"?gamma/20:0;
  }));
};

export const fitFrameChannel=(matrix,{leakageByInput=null}={})=>{
  if(!Array.isArray(matrix)||matrix.length!==size||matrix.some(row=>!Array.isArray(row)||row.length!==size))throw new Error(`matrix must be ${size} x ${size}`);
  if(matrix.flat().some(value=>!Number.isFinite(value)||value<0))throw new Error("matrix entries must be finite and nonnegative");
  if(leakageByInput!==null&&(!Array.isArray(leakageByInput)||leakageByInput.length!==size||leakageByInput.some(value=>!Number.isFinite(value)||value<0||value>1)))throw new Error(`leakageByInput must contain ${size} probabilities`);
  const byRelation={identity:[],fourBasis:[],oneBasis:[]};
  for(let row=0;row<size;row+=1)for(let column=0;column<size;column+=1)byRelation[relation(row,column)].push(matrix[row][column]);
  const cellMeans=Object.fromEntries(Object.entries(byRelation).map(([name,values])=>[name,mean(values)]));
  const alpha=cellMeans.identity,beta=15*cellMeans.fourBasis,gamma=20*cellMeans.oneBasis;
  const fittedRowSum=alpha+beta+gamma;
  const residuals=[],entries=[];
  for(let row=0;row<size;row+=1)for(let column=0;column<size;column+=1){
    const fitted=relation(row,column)==="identity"?alpha:relation(row,column)==="fourBasis"?beta/15:gamma/20;
    residuals.push(matrix[row][column]-fitted);entries.push(matrix[row][column]);
  }
  const rowSums=matrix.map(row=>row.reduce((sum,value)=>sum+value,0));
  return {
    schemaVersion:"regulus-frame-channel-fit-v1",
    fittedWeights:{alpha,beta,gamma,sum:fittedRowSum},
    sectorEigenvalues:{uniform:fittedRowSum,dimension15:alpha+(beta-gamma)/5,dimension20:alpha-beta/5+gamma/10},
    normalizedFrobeniusResidual:rms(residuals)/(rms(entries)||1),
    absoluteFrobeniusResidual:Math.sqrt(residuals.reduce((sum,value)=>sum+value*value,0)),
    withinRelationRms:{
      identity:rms(byRelation.identity.map(value=>value-cellMeans.identity)),
      fourBasis:rms(byRelation.fourBasis.map(value=>value-cellMeans.fourBasis)),
      oneBasis:rms(byRelation.oneBasis.map(value=>value-cellMeans.oneBasis)),
    },
    rowSumRange:[Math.min(...rowSums),Math.max(...rowSums)],
    leakage:leakageByInput===null?null:{mean:mean(leakageByInput),maximum:Math.max(...leakageByInput),byInput:leakageByInput},
    interpretation:"Residual zero means the supplied conditional frame kernel lies exactly in span{I,A4,A1}. A nonzero residual rejects relation invariance at the supplied numerical precision but does not diagnose its physical cause.",
  };
};

const isMain=process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href;
if(isMain){
  const inputPath=process.argv[2];
  if(!inputPath)throw new Error("usage: node scripts/fit-regulus-frame-channel.mjs <channel.json>");
  const input=JSON.parse(fs.readFileSync(inputPath,"utf8"));
  console.log(JSON.stringify(fitFrameChannel(input.matrix,{leakageByInput:input.leakageByInput??null}),null,2));
}
