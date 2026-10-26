import fs from "node:fs";
import path from "node:path";
import {
  identity,maxAbs,multiply,rank,subtract,transpose,zeros,
} from "./analyze-rdg-maxwell-fixed-complex.mjs";

const ROOT=process.cwd();
const WRITE=process.argv.includes("--write");
const OUTPUT="evidence/data/rdg-maxwell-local-remesh-family-v1.json";

const coarseEdges=[[0,1],[1,2],[2,0]];
const fineEdges=[[0,1],[1,2],[2,0],[0,3],[1,3],[2,3]];
const fineFaces=[[0,1,3],[1,2,3],[2,0,3]];
const Bc1=[[-1,0,1],[1,-1,0],[0,1,-1]];
const Bc2=[[1],[1],[1]];
const Bf1=[[-1,0,1,-1,0,0],[1,-1,0,0,-1,0],[0,1,-1,0,0,-1],[0,0,0,1,1,1]];
const Bf2=[[1,0,0],[0,1,0],[0,0,1],[-1,0,1],[1,-1,0],[0,1,-1]];
const S=[
  [[1,0,0],[0,1,0],[0,0,1],[0,0,0]],
  [[1,0,0],[0,1,0],[0,0,1],[0,0,0],[0,0,0],[0,0,0]],
  [[1],[1],[1]],
];
const R=S.map(transpose);

const orientedEdge=(a,b)=>{
  if(a===b)return null;
  for(let i=0;i<coarseEdges.length;i+=1){
    const [u,v]=coarseEdges[i];
    if(a===u&&b===v)return {index:i,sign:1};
    if(a===v&&b===u)return {index:i,sign:-1};
  }
  throw new Error(`missing coarse edge ${a}->${b}`);
};
const faceSign=vertices=>{
  if(new Set(vertices).size<3)return 0;
  const inversions=vertices.reduce((sum,value,i)=>sum+vertices.slice(i+1).filter(next=>value>next).length,0);
  return inversions%2===0?1:-1;
};

const cases=[0,1,2].map(target=>{
  const vertexMap=[0,1,2,target];
  const F0=zeros(3,4);
  vertexMap.forEach((image,j)=>{F0[image][j]=1;});
  const F1=zeros(3,6);
  fineEdges.forEach(([a,b],j)=>{
    const image=orientedEdge(vertexMap[a],vertexMap[b]);
    if(image)F1[image.index][j]=image.sign;
  });
  const F2=zeros(1,3);
  fineFaces.forEach((face,j)=>{F2[0][j]=faceSign(face.map(vertex=>vertexMap[vertex]));});
  const F=[F0,F1,F2];
  const T=F.map(transpose);
  const P=T.map((matrix,k)=>multiply(matrix,R[k]));
  const chainResiduals=[
    maxAbs(subtract(multiply(F0,Bf1),multiply(Bc1,F1))),
    maxAbs(subtract(multiply(F1,Bf2),multiply(Bc2,F2))),
  ];
  const retractResiduals=T.map((matrix,k)=>maxAbs(subtract(multiply(R[k],matrix),identity(matrix[0].length))));
  const diagonalObstructions=P.map(matrix=>{
    for(let i=0;i<matrix.length;i+=1)for(let j=0;j<matrix.length;j+=1){
      if(Math.abs(matrix[i][j])>1e-12&&Math.abs(matrix[j][i])<1e-12)return {row:i,column:j,value:matrix[i][j]};
    }
    return null;
  });
  return {
    centreMapsTo:target,
    chainResiduals,
    retractResiduals,
    projectorRanks:P.map(rank),
    diagonalMetricObstructions:diagonalObstructions,
    allDegreesObstructPositiveDiagonalSelfAdjointness:diagonalObstructions.every(Boolean),
  };
});

const record={
  schemaVersion:"rdg-maxwell-local-remesh-family-v1",
  date:"2026-10-26",
  purpose:"Exhaust the boundary-fixed simplicial collapse family for the minimal stellar triangle remesh and test local diagonal metric compatibility.",
  family:{
    fineCentreChoices:[0,1,2],
    boundaryRule:"vertices 0,1,2 remain fixed; centre vertex 3 must map to one coarse vertex",
    exhaustiveWithinRule:true,
    cases,
  },
  result:{
    chainMapCases:cases.filter(item=>item.chainResiduals.every(value=>value===0)).length,
    retractCases:cases.filter(item=>item.retractResiduals.every(value=>value===0)).length,
    positiveDiagonalMetricCompatibleCases:cases.filter(item=>!item.allDegreesObstructPositiveDiagonalSelfAdjointness).length,
    conclusion:"All three simplicial collapses are exact cochain retracts, and all three have one-way projector support in every degree. No strictly positive diagonal metric can make their reconstruction projectors self-adjoint.",
  },
  boundary:{
    proved:"finite no-go for boundary-fixed simplicial vertex collapses of this one-face stellar subdivision",
    notProved:"no-go for general weighted cochain maps, other subdivisions, block-local Hodge matrices or finite-element commuting projections",
    nextRoute:"enlarge the transport family beyond vertex maps or accept sparse block couplings as the minimal local metric unit",
  },
  verdict:"The first nontrivial remesh family closes the gauge/retract gates but not the positive diagonal-Hodge gate. The obstruction is family-wide rather than an artefact of choosing which original vertex receives the centre.",
};

if(WRITE){
  fs.mkdirSync(path.dirname(path.join(ROOT,OUTPUT)),{recursive:true});
  fs.writeFileSync(path.join(ROOT,OUTPUT),`${JSON.stringify(record,null,2)}\n`);
}
console.log(JSON.stringify({output:OUTPUT,wrote:WRITE,...record},null,2));

