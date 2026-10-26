import fs from "node:fs";
import path from "node:path";
import {
  identity,maxAbs,multiply,rank,subtract,transpose,zeros,
} from "./analyze-rdg-maxwell-fixed-complex.mjs";

const ROOT=process.cwd();
const WRITE=process.argv.includes("--write");
const OUTPUT="evidence/data/rdg-maxwell-remeshing-retract-v1.json";
const add=(a,b)=>a.map((row,i)=>row.map((value,j)=>value+b[i][j]));
function inverse(matrix){
  const n=matrix.length;
  const a=matrix.map((row,i)=>[...row,...identity(n)[i]]);
  for(let col=0;col<n;col+=1){
    let pivot=col;
    while(pivot<n&&Math.abs(a[pivot][col])<1e-12)pivot+=1;
    if(pivot===n)throw new Error("singular Gram matrix");
    [a[col],a[pivot]]=[a[pivot],a[col]];
    const divisor=a[col][col];
    a[col]=a[col].map(value=>value/divisor);
    for(let row=0;row<n;row+=1){
      if(row===col)continue;
      const factor=a[row][col];
      a[row]=a[row].map((value,j)=>value-factor*a[col][j]);
    }
  }
  return a.map(row=>row.slice(n));
}

// Coarse oriented disk: boundary edges 01, 12, 20 and face 012.
const Bc1=[[-1,0,1],[1,-1,0],[0,1,-1]];
const Bc2=[[1],[1],[1]];
const dc=[transpose(Bc1),transpose(Bc2)];

// Stellar subdivision with centre 3. Edges: 01,12,20,03,13,23.
// Faces: 013,123,203.
const Bf1=[
  [-1,0,1,-1,0,0],
  [1,-1,0,0,-1,0],
  [0,1,-1,0,0,-1],
  [0,0,0,1,1,1],
];
const Bf2=[
  [1,0,0],
  [0,1,0],
  [0,0,1],
  [-1,0,1],
  [1,-1,0],
  [0,1,-1],
];
const df=[transpose(Bf1),transpose(Bf2)];

// Subdivision chain map S: coarse chains -> fine chains.
const S0=[
  [1,0,0],[0,1,0],[0,0,1],[0,0,0],
];
const S1=[
  [1,0,0],[0,1,0],[0,0,1],[0,0,0],[0,0,0],[0,0,0],
];
const S2=[[1],[1],[1]];
const S=[S0,S1,S2];

// Simplicial collapse F: centre 3 -> vertex 0. Fine chains -> coarse chains.
const F0=[
  [1,0,0,1],[0,1,0,0],[0,0,1,0],
];
const F1=[
  [1,0,0,0,-1,0],
  [0,1,0,0,0,0],
  [0,0,1,0,0,1],
];
const F2=[[0,1,0]];
const F=[F0,F1,F2];

const chainSubdivisionResiduals=[
  maxAbs(subtract(multiply(Bf1,S1),multiply(S0,Bc1))),
  maxAbs(subtract(multiply(Bf2,S2),multiply(S1,Bc2))),
];
const chainCollapseResiduals=[
  maxAbs(subtract(multiply(F0,Bf1),multiply(Bc1,F1))),
  maxAbs(subtract(multiply(F1,Bf2),multiply(Bc2,F2))),
];

// Cochain transport T=F^*: coarse -> fine; restriction R=S^*: fine -> coarse.
const T=F.map(transpose);
const R=S.map(transpose);
const cochainTransportResiduals=[
  maxAbs(subtract(multiply(df[0],T[0]),multiply(T[1],dc[0]))),
  maxAbs(subtract(multiply(df[1],T[1]),multiply(T[2],dc[1]))),
];
const cochainRestrictionResiduals=[
  maxAbs(subtract(multiply(dc[0],R[0]),multiply(R[1],df[0]))),
  maxAbs(subtract(multiply(dc[1],R[1]),multiply(R[2],df[1]))),
];
const retractResiduals=T.map((_,k)=>maxAbs(subtract(multiply(R[k],T[k]),identity([3,3,1][k]))));
const P=T.map((_,k)=>multiply(T[k],R[k]));
const Q=P.map((matrix,k)=>subtract(identity([4,6,3][k]),matrix));
const projectorResiduals=P.map(matrix=>maxAbs(subtract(multiply(matrix,matrix),matrix)));
const projectorChainResiduals=[
  maxAbs(subtract(multiply(df[0],P[0]),multiply(P[1],df[0]))),
  maxAbs(subtract(multiply(df[1],P[1]),multiply(P[2],df[1]))),
];
const defectChainResiduals=[
  maxAbs(subtract(multiply(df[0],Q[0]),multiply(Q[1],df[0]))),
  maxAbs(subtract(multiply(df[1],Q[1]),multiply(Q[2],df[1]))),
];

const betti=(dims,d)=>{
  const ranks=d.map(rank);
  return {dimensions:dims,differentialRanks:ranks,betti:[dims[0]-ranks[0],dims[1]-ranks[0]-ranks[1],dims[2]-ranks[1]]};
};
const projectedBetti=selectors=>{
  const dims=selectors.map(rank);
  const ranks=df.map((d,k)=>rank(multiply(d,selectors[k])));
  return {dimensions:dims,differentialRanks:ranks,betti:[dims[0]-ranks[0],dims[1]-ranks[0]-ranks[1],dims[2]-ranks[1]]};
};

const metricDefects=T.map(matrix=>maxAbs(subtract(multiply(transpose(matrix),matrix),identity(matrix[0].length))));
const fineUnresolvedDimensions=Q.map(rank);
const energyRestriction=T.map(matrix=>multiply(inverse(multiply(transpose(matrix),matrix)),transpose(matrix)));
const energyProjector=T.map((matrix,k)=>multiply(matrix,energyRestriction[k]));
const energyRetractResiduals=T.map((matrix,k)=>maxAbs(subtract(multiply(energyRestriction[k],matrix),identity(matrix[0].length))));
const energyProjectorResiduals=energyProjector.map(matrix=>maxAbs(subtract(multiply(matrix,matrix),matrix)));
const energyOrthogonalityResiduals=energyProjector.map(matrix=>maxAbs(subtract(matrix,transpose(matrix))));
const energyRestrictionChainResiduals=[
  maxAbs(subtract(multiply(dc[0],energyRestriction[0]),multiply(energyRestriction[1],df[0]))),
  maxAbs(subtract(multiply(dc[1],energyRestriction[1]),multiply(energyRestriction[2],df[1]))),
];
const energyProjectorChainResiduals=[
  maxAbs(subtract(multiply(df[0],energyProjector[0]),multiply(energyProjector[1],df[0]))),
  maxAbs(subtract(multiply(df[1],energyProjector[1]),multiply(energyProjector[2],df[1]))),
];
const completeBasis=(matrix,complement)=>{
  let basis=matrix.map(row=>[...row]);
  let current=rank(basis);
  for(let col=0;col<matrix.length&&current<matrix.length;col+=1){
    const candidate=basis.map((row,i)=>[...row,complement[i][col]]);
    const next=rank(candidate);
    if(next>current){basis=candidate;current=next;}
  }
  if(current!==matrix.length)throw new Error("could not complete transport basis");
  return basis;
};
const compatibleMetrics=T.map((matrix,k)=>{
  const basis=completeBasis(matrix,Q[k]);
  const basisInverse=inverse(basis);
  const fineMetric=multiply(transpose(basisInverse),basisInverse);
  const coarseMetric=multiply(multiply(transpose(matrix),fineMetric),matrix);
  const weightedRestriction=multiply(multiply(inverse(coarseMetric),transpose(matrix)),fineMetric);
  const offDiagonalEntries=fineMetric.flatMap((row,i)=>row.filter((value,j)=>i!==j&&Math.abs(value)>1e-12)).length;
  let diagonalObstruction=null;
  for(let i=0;i<P[k].length&&!diagonalObstruction;i+=1)for(let j=0;j<P[k].length;j+=1){
    if(Math.abs(P[k][i][j])>1e-12&&Math.abs(P[k][j][i])<1e-12){diagonalObstruction={row:i,column:j,value:P[k][i][j]};break;}
  }
  return {
    weightedRestrictionResidual:maxAbs(subtract(weightedRestriction,R[k])),
    projectorSelfAdjointResidual:maxAbs(subtract(multiply(transpose(P[k]),fineMetric),multiply(fineMetric,P[k]))),
    transportIsometryResidual:maxAbs(subtract(multiply(multiply(transpose(matrix),fineMetric),matrix),coarseMetric)),
    fineMetricOffDiagonalEntries:offDiagonalEntries,
    fineMetric,
    coarseMetric,
    diagonalMetricObstruction:diagonalObstruction,
    construction:"L_f=(B^-1)^T B^-1 for a basis B=[im(T), complement]; L_c=T^T L_f T",
  };
});

const record={
  schemaVersion:"rdg-maxwell-remeshing-retract-v1",
  date:"2026-10-26",
  purpose:"Construct an exact topology-preserving remesh as a cochain retract and identify its reconstruction projector and unresolved fine modes.",
  complexes:{
    coarse:{description:"one oriented triangular disk",...betti([3,3,1],dc)},
    fine:{description:"stellar subdivision into faces 013, 123 and 203",...betti([4,6,3],df)},
  },
  chainMaps:{
    subdivisionResiduals:chainSubdivisionResiduals,
    collapseResiduals:chainCollapseResiduals,
    meaning:"S subdivides the coarse face into three fine faces; F collapses the centre vertex to coarse vertex 0.",
  },
  cochainMaps:{
    transport:"T=F^*: coarse cochains -> fine cochains",
    restriction:"R=S^*: fine cochains -> coarse cochains",
    transportCommutatorResiduals:cochainTransportResiduals,
    restrictionCommutatorResiduals:cochainRestrictionResiduals,
    retractResiduals,
    meaning:"Both maps commute with d and R_k T_k=I on every coarse degree.",
  },
  reconstruction:{
    definition:"P_k=T_k R_k on fine cochains; Q_k=I-P_k",
    projectorResiduals,
    projectorChainResiduals,
    defectChainResiduals,
    admittedSubcomplex:projectedBetti(P),
    unresolvedSubcomplex:projectedBetti(Q),
    unresolvedDimensions:fineUnresolvedDimensions,
    meaning:"P is an idempotent chain projector onto coarse-representable fine data; Q records internal fine modes erased by restriction.",
  },
  metricBoundary:{
    euclideanIsometryResiduals:metricDefects,
    euclideanLeastSquares:{
      retractResiduals:energyRetractResiduals,
      projectorResiduals:energyProjectorResiduals,
      orthogonalityResiduals:energyOrthogonalityResiduals,
      restrictionChainResiduals:energyRestrictionChainResiduals,
      projectorChainResiduals:energyProjectorChainResiduals,
    },
    compatibleMetricConstruction:compatibleMetrics,
    conclusion:"Chain-safe transport is not automatically an isometry. Euclidean least squares is orthogonal but not a chain map. A positive compatible metric exists algebraically and makes the chain-safe restriction the weighted adjoint, but it is non-diagonal: locality is an additional gate.",
  },
  rdgInterpretation:{
    gamma:"restriction R extracts the coarse relational state",
    sigma:"reconstruction T, or P=TR when acting on fine data",
    delta:"Q=I-TR is the unresolved fine-scale residual",
    qGate:"admit a remesh only when T and R commute with d and declared metric/energy tolerances also pass",
  },
  verdict:"A nontrivial topology-preserving geometry change can be made gauge-safe through a cochain retract. It yields an exact RDG-style reconstruction projector and residual detector, but metric and energy compatibility remain independent gates.",
};

if(WRITE){
  fs.mkdirSync(path.dirname(path.join(ROOT,OUTPUT)),{recursive:true});
  fs.writeFileSync(path.join(ROOT,OUTPUT),`${JSON.stringify(record,null,2)}\n`);
}
console.log(JSON.stringify({output:OUTPUT,wrote:WRITE,...record},null,2));

