import fs from "node:fs";
import path from "node:path";
import {
  identity,maxAbs,multiply,rank,subtract,transpose,zeros,
} from "./analyze-rdg-maxwell-fixed-complex.mjs";

const ROOT=process.cwd();
const WRITE=process.argv.includes("--write");
const OUTPUT="evidence/data/rdg-maxwell-two-macroelement-assembly-v1.json";
const EPS=1e-12;

const coarseVertices=[0,1,2,3];
const coarseFaces=[[0,1,2],[0,2,3]];
const fineVertices=[0,1,2,3,4,5];
const fineFaces=[[0,1,4],[1,2,4],[2,0,4],[0,2,5],[2,3,5],[3,0,5]];
const edgeKey=(a,b)=>`${Math.min(a,b)}:${Math.max(a,b)}`;
const edgesFromFaces=faces=>{
  const keys=[];
  for(const [a,b,c] of faces)for(const [u,v] of [[a,b],[b,c],[c,a]])if(!keys.includes(edgeKey(u,v)))keys.push(edgeKey(u,v));
  return keys.map(key=>key.split(":").map(Number)).sort((x,y)=>x[0]-y[0]||x[1]-y[1]);
};
const coarseEdges=edgesFromFaces(coarseFaces);
const fineEdges=edgesFromFaces(fineFaces);
const boundaryMatrices=(vertices,edges,faces)=>{
  const B1=zeros(vertices.length,edges.length);
  edges.forEach(([a,b],j)=>{B1[a][j]=-1;B1[b][j]=1;});
  const B2=zeros(edges.length,faces.length);
  const edgeIndex=new Map(edges.map((edge,i)=>[edgeKey(...edge),i]));
  faces.forEach(([a,b,c],j)=>{
    for(const [u,v,coefficient] of [[b,c,1],[a,c,-1],[a,b,1]]){
      const index=edgeIndex.get(edgeKey(u,v));
      B2[index][j]+=coefficient*(u<v?1:-1);
    }
  });
  return [B1,B2];
};
const [Bc1,Bc2]=boundaryMatrices(coarseVertices,coarseEdges,coarseFaces);
const [Bf1,Bf2]=boundaryMatrices(fineVertices,fineEdges,fineFaces);
const dc=[transpose(Bc1),transpose(Bc2)],df=[transpose(Bf1),transpose(Bf2)];

const S0=zeros(6,4);for(let i=0;i<4;i+=1)S0[i][i]=1;
const S1=zeros(fineEdges.length,coarseEdges.length);
coarseEdges.forEach((edge,j)=>{S1[fineEdges.findIndex(candidate=>edgeKey(...candidate)===edgeKey(...edge))][j]=1;});
const S2=zeros(6,2);for(let j=0;j<2;j+=1)for(let i=0;i<3;i+=1)S2[3*j+i][j]=1;
const S=[S0,S1,S2],R=S.map(transpose);

const vertexMap=[0,1,2,3,0,0];
const F0=zeros(4,6);vertexMap.forEach((image,j)=>{F0[image][j]=1;});
const F1=zeros(coarseEdges.length,fineEdges.length);
fineEdges.forEach(([a,b],j)=>{
  const u=vertexMap[a],v=vertexMap[b];
  if(u===v)return;
  const index=coarseEdges.findIndex(edge=>edgeKey(...edge)===edgeKey(u,v));
  F1[index][j]=u<v?1:-1;
});
const parityRelative=(mapped,reference)=>{
  if(new Set(mapped).size<3||mapped.some(value=>!reference.includes(value)))return 0;
  const permutation=mapped.map(value=>reference.indexOf(value));
  const inversions=permutation.reduce((sum,value,i)=>sum+permutation.slice(i+1).filter(next=>value>next).length,0);
  return inversions%2===0?1:-1;
};
const F2=zeros(2,6);
fineFaces.forEach((face,j)=>{
  const mapped=face.map(vertex=>vertexMap[vertex]);
  coarseFaces.forEach((coarse,i)=>{F2[i][j]=parityRelative(mapped,coarse);});
});
const F=[F0,F1,F2],T=F.map(transpose);

function inverse(matrix){
  const n=matrix.length,a=matrix.map((row,i)=>[...row,...identity(n)[i]]);
  for(let col=0;col<n;col+=1){
    let pivot=col;while(pivot<n&&Math.abs(a[pivot][col])<EPS)pivot+=1;
    if(pivot===n)throw new Error("singular matrix");
    [a[col],a[pivot]]=[a[pivot],a[col]];
    const divisor=a[col][col];a[col]=a[col].map(value=>value/divisor);
    for(let row=0;row<n;row+=1){if(row===col)continue;const factor=a[row][col];a[row]=a[row].map((value,j)=>value-factor*a[col][j]);}
  }
  return a.map(row=>row.slice(n));
}

const localMetrics=[
  [[2,0,0,-1],[0,1,0,0],[0,0,1,0],[-1,0,0,1]],
  [[2,0,0,0,1,0],[0,1,0,0,0,0],[0,0,2,0,0,-1],[0,0,0,1,0,0],[1,0,0,0,1,0],[0,0,-1,0,0,1]],
  [[2,1,1],[1,1,1],[1,1,2]],
];
const fineMetrics=[zeros(6,6),zeros(fineEdges.length,fineEdges.length),zeros(6,6)];
const coarseMetrics=[zeros(4,4),zeros(coarseEdges.length,coarseEdges.length),zeros(2,2)];
const macros=[{face:[0,1,2],center:4,fineFaceOffset:0},{face:[0,2,3],center:5,fineFaceOffset:3}];
const fineEdgeIndex=new Map(fineEdges.map((edge,i)=>[edgeKey(...edge),i]));
const coarseEdgeIndex=new Map(coarseEdges.map((edge,i)=>[edgeKey(...edge),i]));
const addLocal=(global,local,indices,signs=indices.map(()=>1))=>local.forEach((row,i)=>row.forEach((value,j)=>{global[indices[i]][indices[j]]+=signs[i]*signs[j]*value;}));
for(const macro of macros){
  const [a,b,c]=macro.face,centre=macro.center;
  const vertexIndices=[a,b,c,centre];
  addLocal(fineMetrics[0],localMetrics[0],vertexIndices);
  addLocal(coarseMetrics[0],identity(3),[a,b,c]);
  const localOrientedEdges=[[a,b],[b,c],[c,a],[a,centre],[b,centre],[c,centre]];
  const fineEdgeIndices=localOrientedEdges.map(edge=>fineEdgeIndex.get(edgeKey(...edge)));
  const fineEdgeSigns=localOrientedEdges.map(([u,v])=>u<v?1:-1);
  addLocal(fineMetrics[1],localMetrics[1],fineEdgeIndices,fineEdgeSigns);
  const coarseOrientedEdges=[[a,b],[b,c],[c,a]];
  addLocal(coarseMetrics[1],identity(3),coarseOrientedEdges.map(edge=>coarseEdgeIndex.get(edgeKey(...edge))),coarseOrientedEdges.map(([u,v])=>u<v?1:-1));
  addLocal(fineMetrics[2],localMetrics[2],[macro.fineFaceOffset,macro.fineFaceOffset+1,macro.fineFaceOffset+2]);
  addLocal(coarseMetrics[2],[[1]],[macro.fineFaceOffset/3]);
}

const chainResiduals=[
  maxAbs(subtract(multiply(F0,Bf1),multiply(Bc1,F1))),
  maxAbs(subtract(multiply(F1,Bf2),multiply(Bc2,F2))),
];
const retractResiduals=T.map((matrix,k)=>maxAbs(subtract(multiply(R[k],matrix),identity(matrix[0].length))));
const metricPullbackResiduals=T.map((matrix,k)=>maxAbs(subtract(multiply(multiply(transpose(matrix),fineMetrics[k]),matrix),coarseMetrics[k])));
const weightedRestrictions=T.map((matrix,k)=>multiply(multiply(inverse(coarseMetrics[k]),transpose(matrix)),fineMetrics[k]));
const weightedRestrictionResiduals=weightedRestrictions.map((matrix,k)=>maxAbs(subtract(matrix,R[k])));
const P=T.map((matrix,k)=>multiply(matrix,R[k]));
const selfAdjointResiduals=P.map((matrix,k)=>maxAbs(subtract(multiply(transpose(matrix),fineMetrics[k]),multiply(fineMetrics[k],matrix))));
const restrictionChainResiduals=[
  maxAbs(subtract(multiply(dc[0],R[0]),multiply(R[1],df[0]))),
  maxAbs(subtract(multiply(dc[1],R[1]),multiply(R[2],df[1]))),
];
const symmetryResiduals=fineMetrics.map(matrix=>maxAbs(subtract(matrix,transpose(matrix))));
const fullRanks=fineMetrics.map(rank);
const offDiagonalCounts=fineMetrics.map(matrix=>matrix.flatMap((row,i)=>row.filter((value,j)=>i!==j&&Math.abs(value)>EPS)).length);
const crossMacroCouplings=[
  Math.abs(fineMetrics[0][4][5]),
  ...[...fineEdgeIndex.entries()].filter(([key])=>key.includes("4")).flatMap(([,i])=>[...fineEdgeIndex.entries()].filter(([key])=>key.includes("5")).map(([,j])=>Math.abs(fineMetrics[1][i][j]))),
  ...[0,1,2].flatMap(i=>[3,4,5].map(j=>Math.abs(fineMetrics[2][i][j]))),
];

const record={
  schemaVersion:"rdg-maxwell-two-macroelement-assembly-v1",
  date:"2026-10-26",
  purpose:"Test whether two exact sparse remesh metrics assemble across a shared edge without losing chain adjointness, positivity or macroelement locality.",
  mesh:{
    coarse:{vertices:4,edges:coarseEdges.length,faces:2,facesList:coarseFaces},
    fine:{vertices:6,edges:fineEdges.length,faces:6,centres:[4,5]},
    sharedCoarseEdge:[0,2],
  },
  topology:{
    coarseRanks:[rank(dc[0]),rank(dc[1])],
    fineRanks:[rank(df[0]),rank(df[1])],
    coarseBetti:[4-rank(dc[0]),coarseEdges.length-rank(dc[0])-rank(dc[1]),2-rank(dc[1])],
    fineBetti:[6-rank(df[0]),fineEdges.length-rank(df[0])-rank(df[1]),6-rank(df[1])],
  },
  assembly:{
    chainResiduals,
    retractResiduals,
    metricPullbackResiduals,
    weightedRestrictionResiduals,
    projectorSelfAdjointResiduals:selfAdjointResiduals,
    restrictionChainResiduals,
    metricSymmetryResiduals:symmetryResiduals,
    fineMetricRanks:fullRanks,
    fineMetricDimensions:fineMetrics.map(matrix=>matrix.length),
    offDiagonalEntries:offDiagonalCounts,
    directCentreToCentreOrCrossMacroResidual:maxAbs([crossMacroCouplings]),
    coarseMetrics,
    conclusion:"Standard additive macroelement assembly preserves the exact metric pullback, weighted-adjoint restriction, chain map and self-adjoint reconstruction identities across the shared edge.",
  },
  positivity:{
    argument:"Each assembled fine metric is a sum of positive local Gram forms. Every global degree of freedom lies in at least one macroelement, so the sum is positive definite; full matrix rank is independently reported.",
    verifiedFullRanks:fullRanks.every((value,k)=>value===fineMetrics[k].length),
  },
  locality:{
    meaning:"No coupling directly joins the two centre stars or faces belonging exclusively to different macroelements. Shared vertices and the shared edge mediate assembly.",
    crossMacroResidual:maxAbs([crossMacroCouplings]),
  },
  verdict:"The sparse macroelement escape survives the first overlap test. Two locally exact remesh blocks assemble into positive global metrics while retaining cochain transport, weighted adjointness and energy-orthogonal reconstruction; arbitrary meshes and conditioning remain open.",
};

if(WRITE){
  fs.mkdirSync(path.dirname(path.join(ROOT,OUTPUT)),{recursive:true});
  fs.writeFileSync(path.join(ROOT,OUTPUT),`${JSON.stringify(record,null,2)}\n`);
}
console.log(JSON.stringify({output:OUTPUT,wrote:WRITE,...record},null,2));

