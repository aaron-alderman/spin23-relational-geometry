import fs from "node:fs";
import path from "node:path";
import {
  apply,maxAbs,rank,transpose,
} from "./analyze-rdg-maxwell-fixed-complex.mjs";

const ROOT=process.cwd();
const WRITE=process.argv.includes("--write");
const OUTPUT="evidence/data/rdg-maxwell-two-cycle-cut-v1.json";
const EPS=1e-12;

const vertices=[0,1,2,3];
const edges=[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];
// Outward orientations of the boundary of [0,1,2,3].
const faces=[[1,2,3],[0,3,2],[0,1,3],[0,2,1]];
const edgeIndex=(a,b)=>{
  const low=Math.min(a,b),high=Math.max(a,b);
  return {index:edges.findIndex(edge=>edge[0]===low&&edge[1]===high),sign:a<b?1:-1};
};
const B1=vertices.map(()=>Array(edges.length).fill(0));
edges.forEach(([a,b],j)=>{B1[a][j]=-1;B1[b][j]=1;});
const B2=edges.map(()=>Array(faces.length).fill(0));
faces.forEach(([a,b,c],j)=>{
  for(const [u,v,coefficient] of [[b,c,1],[a,c,-1],[a,b,1]]){
    const edge=edgeIndex(u,v);
    B2[edge.index][j]+=coefficient*edge.sign;
  }
});
const d0=transpose(B1),d1Sphere=transpose(B2);
const removedFace=0;
const keptFaces=[1,2,3];
const B2Disk=B2.map(row=>keptFaces.map(index=>row[index]));
const d1Disk=transpose(B2Disk);

function solveOne(matrix,target){
  const a=matrix.map((row,i)=>[...row,target[i]]);
  let pivotRow=0;
  const pivots=[];
  for(let col=0;col<matrix[0].length&&pivotRow<matrix.length;col+=1){
    let pivot=pivotRow;
    while(pivot<matrix.length&&Math.abs(a[pivot][col])<EPS)pivot+=1;
    if(pivot===matrix.length)continue;
    [a[pivotRow],a[pivot]]=[a[pivot],a[pivotRow]];
    const divisor=a[pivotRow][col];
    a[pivotRow]=a[pivotRow].map(value=>value/divisor);
    for(let row=0;row<a.length;row+=1){
      if(row===pivotRow)continue;
      const factor=a[row][col];
      a[row]=a[row].map((value,j)=>value-factor*a[pivotRow][j]);
    }
    pivots.push(col);pivotRow+=1;
  }
  for(const row of a)if(row.slice(0,-1).every(value=>Math.abs(value)<EPS)&&Math.abs(row.at(-1))>=EPS)throw new Error("inconsistent system");
  const solution=Array(matrix[0].length).fill(0);
  pivots.forEach((col,row)=>{solution[col]=a[row].at(-1);});
  return solution;
}

const sphereFlux=[1,1,1,1];
const diskFlux=[1,1,1];
const potential=solveOne(d1Disk,diskFlux);
const reconstructedDiskFlux=apply(d1Disk,potential);
const exactnessResidual=Math.max(...diskFlux.map((value,i)=>Math.abs(value-reconstructedDiskFlux[i])));
const diskFundamental=[1,1,1];
const diskBoundary=apply(B2Disk,diskFundamental);
const removedBoundary=B2.map(row=>row[removedFace]);
const boundaryCancellationResidual=Math.max(...diskBoundary.map((value,i)=>Math.abs(value+removedBoundary[i])));
const boundaryCirculation=diskBoundary.reduce((sum,value,i)=>sum+value*potential[i],0);
const diskFluxSum=diskFlux.reduce((a,b)=>a+b,0);
const totalSphereFlux=sphereFlux.reduce((a,b)=>a+b,0);
const capFlux=sphereFlux[removedFace];
const augmentedSphereRank=rank(d1Sphere.map((row,i)=>[...row,sphereFlux[i]]));

const record={
  schemaVersion:"rdg-maxwell-two-cycle-cut-v1",
  date:"2026-10-26",
  purpose:"Track a two-cycle flux class through puncturing of a tetrahedral sphere and identify its boundary/cap record.",
  carriers:{
    sphere:{dimensions:[4,6,4],differentialRanks:[rank(d0),rank(d1Sphere)],betti:[1,0,1]},
    puncturedDisk:{dimensions:[4,6,3],differentialRanks:[rank(d0),rank(d1Disk)],betti:[1,0,0]},
  },
  closedFlux:{
    orientedFaceValues:sphereFlux,
    totalSphereFlux,
    d1Rank:rank(d1Sphere),
    d1WithFluxRank:augmentedSphereRank,
    conclusion:"The constant outward face flux is a non-exact H2 representative on the closed tetrahedral sphere.",
  },
  puncture:{
    removedFace:"outward face 123",
    retainedFaceFlux:diskFlux,
    edgePotential:potential,
    reconstructedFaceFlux:reconstructedDiskFlux,
    exactnessResidual,
    boundaryChain:diskBoundary,
    removedCapBoundary:removedBoundary,
    boundaryCancellationResidual,
    boundaryCirculation,
    retainedDiskFlux:diskFluxSum,
    removedCapFlux:capFlux,
    reconstructionIdentityResidual:Math.abs(totalSphereFlux-(boundaryCirculation+capFlux)),
    conclusion:"After puncturing, the retained flux is exact. Its integral becomes the circulation on the new boundary; the removed cap flux is the additional gluing record needed to reconstruct total closed flux.",
  },
  compactPhase:{
    closedSurfacePhase:{re:Math.cos(totalSphereFlux),im:Math.sin(totalSphereFlux)},
    diskBoundaryPhase:{re:Math.cos(boundaryCirculation),im:Math.sin(boundaryCirculation)},
    capPhase:{re:Math.cos(capFlux),im:Math.sin(capFlux)},
    productResidual:Math.hypot(
      Math.cos(totalSphereFlux)-(Math.cos(boundaryCirculation)*Math.cos(capFlux)-Math.sin(boundaryCirculation)*Math.sin(capFlux)),
      Math.sin(totalSphereFlux)-(Math.sin(boundaryCirculation)*Math.cos(capFlux)+Math.cos(boundaryCirculation)*Math.sin(capFlux)),
    ),
  },
  physicalBoundary:{
    sourceFreeMaxwell:"On a closed sphere bounding a volume, d2 B=0 forces total magnetic flux to zero.",
    nonzeroExample:"The nonzero H2 class is a topological/cochain example; electromagnetically it requires magnetic charge, a deleted interior, or a non-bounding two-cycle such as a torus sector.",
    retainedLesson:"Whatever its physical source, puncturing moves the bulk H2 record into boundary circulation plus cap/gluing flux.",
  },
  verdict:"The two-cycle analogue of the Wilson cut rule holds exactly: puncturing converts a non-exact closed-surface flux into exact face curvature whose integral is recorded by boundary circulation, while the removed cap carries the remaining gluing datum.",
};

if(WRITE){
  fs.mkdirSync(path.dirname(path.join(ROOT,OUTPUT)),{recursive:true});
  fs.writeFileSync(path.join(ROOT,OUTPUT),`${JSON.stringify(record,null,2)}\n`);
}
console.log(JSON.stringify({output:OUTPUT,wrote:WRITE,...record},null,2));

