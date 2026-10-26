import fs from "node:fs";
import path from "node:path";
import {
  apply,maxAbs,multiply,rank,subtract,transpose,zeros,
} from "./analyze-rdg-maxwell-fixed-complex.mjs";

const ROOT=process.cwd();
const WRITE=process.argv.includes("--write");
const OUTPUT="evidence/data/rdg-maxwell-torus-flux-cut-v1.json";
const EPS=1e-12;

function gridComplex(periodicX){
  const nx=periodicX?2:3,ny=2,cellsX=2;
  const v=(x,y)=>x*ny+((y+ny)%ny);
  const vertices=nx*ny;
  const xEdges=[];for(let x=0;x<cellsX;x+=1)for(let y=0;y<ny;y+=1)xEdges.push([v(x,y),v(periodicX?(x+1)%2:x+1,y)]);
  const yEdges=[];for(let x=0;x<nx;x+=1)for(let y=0;y<ny;y+=1)yEdges.push([v(x,y),v(x,y+1)]);
  const edges=[...xEdges,...yEdges];
  const edgeIndex=(kind,x,y)=>kind==="x"?x*ny+y:xEdges.length+x*ny+y;
  const B1=zeros(vertices,edges.length);
  edges.forEach(([a,b],j)=>{B1[a][j]-=1;B1[b][j]+=1;});
  const B2=zeros(edges.length,cellsX*ny);
  for(let x=0;x<cellsX;x+=1)for(let y=0;y<ny;y+=1){
    const face=x*ny+y;
    B2[edgeIndex("x",x,y)][face]+=1;
    B2[edgeIndex("y",periodicX?(x+1)%2:x+1,y)][face]+=1;
    B2[edgeIndex("x",x,(y+1)%ny)][face]-=1;
    B2[edgeIndex("y",x,y)][face]-=1;
  }
  return {nx,ny,vertices,edges,xEdges,yEdges,B1,B2,d:[transpose(B1),transpose(B2)],v,edgeIndex};
}

function solveOne(matrix,target){
  const a=matrix.map((row,i)=>[...row,target[i]]),pivots=[];
  let pivotRow=0;
  for(let col=0;col<matrix[0].length&&pivotRow<matrix.length;col+=1){
    let pivot=pivotRow;while(pivot<matrix.length&&Math.abs(a[pivot][col])<EPS)pivot+=1;
    if(pivot===matrix.length)continue;
    [a[pivotRow],a[pivot]]=[a[pivot],a[pivotRow]];
    const divisor=a[pivotRow][col];a[pivotRow]=a[pivotRow].map(value=>value/divisor);
    for(let row=0;row<a.length;row+=1){if(row===pivotRow)continue;const factor=a[row][col];a[row]=a[row].map((value,j)=>value-factor*a[pivotRow][j]);}
    pivots.push(col);pivotRow+=1;
  }
  const solution=Array(matrix[0].length).fill(0);pivots.forEach((col,row)=>{solution[col]=a[row].at(-1);});return solution;
}

const torus=gridComplex(true),cylinder=gridComplex(false);
const betti=complex=>{
  const r0=rank(complex.d[0]),r1=rank(complex.d[1]);
  return {ranks:[r0,r1],betti:[complex.vertices-r0,complex.edges.length-r0-r1,complex.B2[0].length-r1]};
};

// Quotient chain map cylinder -> torus identifies x=2 with x=0.
const F0=zeros(torus.vertices,cylinder.vertices);
for(let x=0;x<3;x+=1)for(let y=0;y<2;y+=1)F0[torus.v(x%2,y)][cylinder.v(x,y)]=1;
const F1=zeros(torus.edges.length,cylinder.edges.length);
for(let x=0;x<2;x+=1)for(let y=0;y<2;y+=1)F1[torus.edgeIndex("x",x,y)][cylinder.edgeIndex("x",x,y)]=1;
for(let x=0;x<3;x+=1)for(let y=0;y<2;y+=1)F1[torus.edgeIndex("y",x%2,y)][cylinder.edgeIndex("y",x,y)]=1;
const F2=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>Number(i===j)));
const chainResiduals=[
  maxAbs(subtract(multiply(F0,cylinder.B1),multiply(torus.B1,F1))),
  maxAbs(subtract(multiply(F1,cylinder.B2),multiply(torus.B2,F2))),
];
const T=[transpose(F0),transpose(F1),transpose(F2)];
const cochainResiduals=[
  maxAbs(subtract(multiply(cylinder.d[0],T[0]),multiply(T[1],torus.d[0]))),
  maxAbs(subtract(multiply(cylinder.d[1],T[1]),multiply(T[2],torus.d[1]))),
];

const torusFlux=Array(4).fill(1);
const cylinderFlux=apply(T[2],torusFlux);
const potential=solveOne(cylinder.d[1],cylinderFlux);
const reconstructionResidual=Math.max(...apply(cylinder.d[1],potential).map((value,i)=>Math.abs(value-cylinderFlux[i])));
const fundamental=Array(4).fill(1);
const boundary=apply(cylinder.B2,fundamental);
const boundaryCirculation=boundary.reduce((sum,value,i)=>sum+value*potential[i],0);
const fluxSum=cylinderFlux.reduce((a,b)=>a+b,0);
const leftBoundary=Array(cylinder.edges.length).fill(0),rightBoundary=Array(cylinder.edges.length).fill(0);
for(let y=0;y<2;y+=1){leftBoundary[cylinder.edgeIndex("y",0,y)]=-1;rightBoundary[cylinder.edgeIndex("y",2,y)]=1;}
const leftCirculation=leftBoundary.reduce((sum,value,i)=>sum+value*potential[i],0);
const rightCirculation=rightBoundary.reduce((sum,value,i)=>sum+value*potential[i],0);
const boundarySplitResidual=Math.max(...boundary.map((value,i)=>Math.abs(value-leftBoundary[i]-rightBoundary[i])));
const augmentedRank=rank(torus.d[1].map((row,i)=>[...row,torusFlux[i]]));

const record={
  schemaVersion:"rdg-maxwell-torus-flux-cut-v1",
  date:"2026-10-26",
  purpose:"Move a source-free non-bounding torus H2 flux into boundary Wilson data by cutting one periodic direction.",
  carriers:{
    torus:{dimensions:[torus.vertices,torus.edges.length,4],...betti(torus)},
    cylinder:{dimensions:[cylinder.vertices,cylinder.edges.length,4],...betti(cylinder)},
  },
  cutMap:{
    description:"identify cylinder x=2 boundary with x=0 to recover the 2x2 periodic torus",
    chainResiduals,
    cochainResiduals,
  },
  fluxTransfer:{
    torusFlux,
    torusFluxSum:4,
    torusD1Rank:rank(torus.d[1]),
    torusD1WithFluxRank:augmentedRank,
    cylinderFlux,
    cylinderPotential:potential,
    reconstructionResidual,
    boundaryChain:boundary,
    boundarySplitResidual,
    leftBoundaryCirculation:leftCirculation,
    rightBoundaryCirculation:rightCirculation,
    netBoundaryCirculation:boundaryCirculation,
    retainedFlux:fluxSum,
    stokesResidual:Math.abs(boundaryCirculation-fluxSum),
    conclusion:"The non-exact torus face flux becomes exact on the cut cylinder. Its period is the difference of Wilson circulations on the two new boundary circles.",
  },
  sourceFreeInterpretation:{
    embedding:"Treat the 2-torus as an xy cross-section of the periodic three-torus from Bridge 02 and the face cochain as constant B_z.",
    gauss:"The corresponding three-dimensional face field has d2 B=0 exactly and the xy two-cycle is non-bounding, so nonzero flux requires no magnetic charge.",
    contrast:"Unlike the punctured-sphere example, this is a source-free global flux sector.",
  },
  compactPhase:{
    torusFluxPhase:{re:Math.cos(4),im:Math.sin(4)},
    boundaryWilsonRatioPhase:{re:Math.cos(boundaryCirculation),im:Math.sin(boundaryCirculation)},
    residual:Math.hypot(Math.cos(4)-Math.cos(boundaryCirculation),Math.sin(4)-Math.sin(boundaryCirculation)),
  },
  verdict:"A source-free non-bounding H2 flux obeys the same topology receipt: cutting the torus converts bulk flux into the relative Wilson circulation of the two new boundaries, without invoking magnetic charge or losing the global record.",
};

if(WRITE){
  fs.mkdirSync(path.dirname(path.join(ROOT,OUTPUT)),{recursive:true});
  fs.writeFileSync(path.join(ROOT,OUTPUT),`${JSON.stringify(record,null,2)}\n`);
}
console.log(JSON.stringify({output:OUTPUT,wrote:WRITE,...record},null,2));

