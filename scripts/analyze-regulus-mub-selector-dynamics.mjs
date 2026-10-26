import fs from "node:fs";

const q=3;
const mod=x=>((x%q)+q)%q;
const inv=x=>x===1?1:2;
const WRITE=process.argv.includes("--write");
const OUTPUT="evidence/data/regulus-mub-selector-dynamics-v1.json";
const REGULUS_EVIDENCE="evidence/data/regulus-spin23-bridge-v1.json";

const vectors=(dimension,includeZero=true)=>Array.from({length:q**dimension},(_,number)=>{
  const value=[];
  for(let i=0;i<dimension;i+=1){value.push(number%q);number=Math.floor(number/q);}
  return value;
}).filter(value=>includeZero||value.some(Boolean));
const projective=value=>{
  const first=value.find(entry=>entry!==0);
  if(first===undefined)throw new Error("zero vector has no projective representative");
  return value.map(entry=>mod(inv(first)*entry));
};
const key=value=>projective(value).join("");
const rank=rows=>{
  const A=rows.map(row=>row.map(mod));let r=0;
  for(let c=0;c<(A[0]?.length??0)&&r<A.length;c+=1){
    let pivot=r;while(pivot<A.length&&A[pivot][c]===0)pivot+=1;
    if(pivot===A.length)continue;
    [A[r],A[pivot]]=[A[pivot],A[r]];
    A[r]=A[r].map(entry=>mod(inv(A[r][c])*entry));
    for(let i=0;i<A.length;i+=1)if(i!==r&&A[i][c]){
      const factor=A[i][c];A[i]=A[i].map((entry,j)=>mod(entry-factor*A[r][j]));
    }
    r+=1;
  }
  return r;
};
const rref=rows=>{
  const A=rows.map(row=>row.map(mod));let r=0;
  for(let c=0;c<(A[0]?.length??0)&&r<A.length;c+=1){
    let pivot=r;while(pivot<A.length&&A[pivot][c]===0)pivot+=1;
    if(pivot===A.length)continue;
    [A[r],A[pivot]]=[A[pivot],A[r]];
    A[r]=A[r].map(entry=>mod(inv(A[r][c])*entry));
    for(let i=0;i<A.length;i+=1)if(i!==r&&A[i][c]){
      const factor=A[i][c];A[i]=A[i].map((entry,j)=>mod(entry-factor*A[r][j]));
    }
    r+=1;
  }
  return A.filter(row=>row.some(Boolean));
};
const combinations=(items,count,start=0,prefix=[],output=[])=>{
  if(prefix.length===count){output.push(prefix);return output;}
  for(let i=start;i<=items.length-(count-prefix.length);i+=1)combinations(items,count,i+1,[...prefix,items[i]],output);
  return output;
};
const add=(left,right,leftScale=1,rightScale=1)=>left.map((entry,index)=>mod(leftScale*entry+rightScale*right[index]));
const dot=(left,right)=>mod(left.reduce((sum,entry,index)=>sum+entry*right[index],0));
const symplectic=(left,right)=>mod(left[0]*right[2]+left[1]*right[3]-left[2]*right[0]-left[3]*right[1]);
const wedge=(u,v)=>[
  mod(u[0]*v[1]-u[1]*v[0]),mod(u[0]*v[2]-u[2]*v[0]),
  mod(u[0]*v[3]-u[3]*v[0]),mod(u[1]*v[2]-u[2]*v[1]),
  mod(u[1]*v[3]-u[3]*v[1]),mod(u[2]*v[3]-u[3]*v[2]),
];
const primitive=p=>[p[0],mod(-p[5]),p[2],mod(-p[3]),p[1]];

const planeMap=new Map();
for(const u of vectors(4))for(const v of vectors(4)){
  const reduced=rref([u,v]);
  if(reduced.length===2)planeMap.set(reduced.flat().join(""),reduced);
}
const lagrangians=[...planeMap.values()].filter(([u,v])=>symplectic(u,v)===0);
if(lagrangians.length!==40)throw new Error(`expected 40 Lagrangians, got ${lagrangians.length}`);
const pointKeys=lagrangians.map(plane=>key(primitive(wedge(...plane))));
if(new Set(pointKeys).size!==40)throw new Error("Plucker map is not injective");

const hyperplanes=new Map();
for(const value of vectors(5,false))hyperplanes.set(key(value),projective(value));
const frames=[];
for(const covector of hyperplanes.values()){
  const planes=lagrangians.map((_,index)=>index).filter(index=>dot(covector,projective(primitive(wedge(...lagrangians[index]))))===0);
  if(planes.length===10)frames.push({covector,planes});
}
if(frames.length!==36)throw new Error(`expected 36 elliptic frames, got ${frames.length}`);

const planeNonzeroVectors=plane=>{
  const output=new Set();
  for(let a=0;a<q;a+=1)for(let b=0;b<q;b+=1){
    if(a===0&&b===0)continue;
    output.add(add(plane[0],plane[1],a,b).join(""));
  }
  return output;
};
for(const frame of frames){
  const covered=new Set();
  for(const index of frame.planes)for(const vector of planeNonzeroVectors(lagrangians[index]))covered.add(vector);
  if(covered.size!==80)throw new Error("frame does not partition the nonzero phase-space vectors");
  for(const [left,right] of combinations(frame.planes,2))if(rank([...lagrangians[left],...lagrangians[right]])!==4)throw new Error("frame planes are not disjoint");
}

const overlap=(left,right)=>left.planes.filter(index=>right.planes.includes(index)).length;
const overlapDistribution={},overlapDegrees={};
for(let i=0;i<frames.length;i+=1)for(let j=i+1;j<frames.length;j+=1){
  const size=overlap(frames[i],frames[j]);
  overlapDistribution[size]=(overlapDistribution[size]??0)+1;
}
for(const size of Object.keys(overlapDistribution))overlapDegrees[size]=[...new Set(frames.map((frame,i)=>frames.filter((other,j)=>i!==j&&overlap(frame,other)===Number(size)).length))];
const A=frames.map((frame,i)=>frames.map((other,j)=>i!==j&&overlap(frame,other)===4?1:0));
const common=(i,j)=>A[i].reduce((sum,entry,k)=>sum+entry*A[j][k],0);
const adjacentCommon=[],nonadjacentCommon=[];
for(let i=0;i<frames.length;i+=1)for(let j=i+1;j<frames.length;j+=1)(A[i][j]?adjacentCommon:nonadjacentCommon).push(common(i,j));
const fourGraph=[36,...new Set(A.map(row=>row.reduce((a,b)=>a+b,0))),...new Set(adjacentCommon),...new Set(nonadjacentCommon)];
const oneGraph=[36,20,10,12];
if(fourGraph.join(",")!=="36,15,6,6")throw new Error(`wrong four-overlap graph: ${fourGraph}`);
const I36=Array.from({length:36},(_,i)=>Array.from({length:36},(_,j)=>i===j?1:0));
const B=A.map((row,i)=>row.map((entry,j)=>i===j?0:1-entry));
const maximalCliques=adjacency=>{
  const output=[];
  const recurse=(clique,candidates,excluded)=>{
    if(candidates.size===0&&excluded.size===0){output.push([...clique].sort((a,b)=>a-b));return;}
    const pivot=[...new Set([...candidates,...excluded])].sort((left,right)=>{
      const leftCount=[...candidates].filter(vertex=>adjacency[left][vertex]).length;
      const rightCount=[...candidates].filter(vertex=>adjacency[right][vertex]).length;
      return rightCount-leftCount;
    })[0];
    const extensions=[...candidates].filter(vertex=>pivot===undefined||!adjacency[pivot][vertex]);
    for(const vertex of extensions){
      const neighbors=new Set(adjacency[vertex].map((entry,index)=>entry?index:null).filter(index=>index!==null));
      recurse(new Set([...clique,vertex]),new Set([...candidates].filter(item=>neighbors.has(item))),new Set([...excluded].filter(item=>neighbors.has(item))));
      candidates.delete(vertex);excluded.add(vertex);
    }
  };
  recurse(new Set(),new Set(adjacency.map((_,index)=>index)),new Set());
  return output;
};
const maximalFourCliques=maximalCliques(A),maximalOneCliques=maximalCliques(B);
const cliqueDistribution=cliques=>cliques.reduce((distribution,clique)=>({...distribution,[clique.length]:(distribution[clique.length]??0)+1}),{});
const edgeCliqueMultiplicities=(adjacency,cliques,size)=>{
  const selected=cliques.filter(clique=>clique.length===size),multiplicities=[];
  for(let i=0;i<adjacency.length;i+=1)for(let j=i+1;j<adjacency.length;j+=1)if(adjacency[i][j])multiplicities.push(selected.filter(clique=>clique.includes(i)&&clique.includes(j)).length);
  return [...new Set(multiplicities)].sort((a,b)=>a-b);
};
const cliqueComplex={
  fourBasisMaximalCliqueDistribution:cliqueDistribution(maximalFourCliques),
  fourBasisEdgeK4Multiplicity:edgeCliqueMultiplicities(A,maximalFourCliques,4),
  oneBasisMaximalCliqueDistribution:cliqueDistribution(maximalOneCliques),
  oneBasisEdgeMaximalK3Multiplicity:edgeCliqueMultiplicities(B,maximalOneCliques,3),
  oneBasisEdgeMaximalK5Multiplicity:edgeCliqueMultiplicities(B,maximalOneCliques,5),
};
if(JSON.stringify(cliqueComplex)!==JSON.stringify({fourBasisMaximalCliqueDistribution:{4:135},fourBasisEdgeK4Multiplicity:[3],oneBasisMaximalCliqueDistribution:{3:120,5:216},oneBasisEdgeMaximalK3Multiplicity:[1],oneBasisEdgeMaximalK5Multiplicity:[6]}))throw new Error(`unexpected frame clique complex: ${JSON.stringify(cliqueComplex)}`);
const regulusRecord=JSON.parse(fs.readFileSync(REGULUS_EVIDENCE,"utf8")).hyperplaneSections;
const cubicLineMeetNeighbors=regulusRecord.reconstructedTwentySeven.cubicLineMeetNeighbors.map(neighbors=>new Set(neighbors));
const doubleSixCubicLines=regulusRecord.reconstructedThirtySix.doubleSixCubicLineIndices;
if(JSON.stringify(frames.map(frame=>frame.covector))!==JSON.stringify(regulusRecord.reconstructedThirtySix.ellipticSectionCovectors))throw new Error("frame ordering does not match regulus evidence");
const commonCubicLines=clique=>doubleSixCubicLines[clique[0]].filter(line=>clique.slice(1).every(frame=>doubleSixCubicLines[frame].includes(line)));
const omittedCubicLines=clique=>{
  const union=new Set(clique.flatMap(frame=>doubleSixCubicLines[frame]));
  return Array.from({length:27},(_,line)=>line).filter(line=>!union.has(line));
};
const fiveCliqueSkewPairs=maximalOneCliques.filter(clique=>clique.length===5).map(commonCubicLines);
const skewPairKeys=new Set(fiveCliqueSkewPairs.map(pair=>pair.join(",")));
const allSkewPairKeys=new Set();
for(let left=0;left<27;left+=1)for(let right=left+1;right<27;right+=1)if(!cubicLineMeetNeighbors[left].has(right))allSkewPairKeys.add(`${left},${right}`);
if(fiveCliqueSkewPairs.some(pair=>pair.length!==2||cubicLineMeetNeighbors[pair[0]].has(pair[1]))||skewPairKeys.size!==216||[...skewPairKeys].some(pair=>!allSkewPairKeys.has(pair)))throw new Error("216 maximal one-basis K5s do not reconstruct the skew cubic-line pairs");
const doubleSixKey=selection=>[...selection].sort((a,b)=>a-b).join(",");
const doubleSixIndexByKey=new Map(doubleSixCubicLines.map((selection,index)=>[doubleSixKey(selection),index]));
const maximalTriangleClosures=maximalOneCliques.filter(clique=>clique.length===3).filter(([left,right,closure])=>{
  const leftSet=new Set(doubleSixCubicLines[left]),rightSet=new Set(doubleSixCubicLines[right]);
  const symmetricDifference=[...new Set([...leftSet,...rightSet])].filter(line=>leftSet.has(line)!==rightSet.has(line));
  return doubleSixIndexByKey.get(doubleSixKey(symmetricDifference))===closure;
}).length;
if(maximalTriangleClosures!==120)throw new Error("maximal one-basis triangles do not equal the 120 azygetic closures");
const fourCliqueOmittedTriples=maximalFourCliques.map(omittedCubicLines);
const omittedTripleMultiplicities=new Map();
for(const triple of fourCliqueOmittedTriples){
  if(triple.length!==3||!triple.every((line,i)=>triple.slice(i+1).every(other=>cubicLineMeetNeighbors[line].has(other))))throw new Error("four-basis K4 does not omit a tritangent triple");
  const tripleKey=triple.join(",");omittedTripleMultiplicities.set(tripleKey,(omittedTripleMultiplicities.get(tripleKey)??0)+1);
}
if(omittedTripleMultiplicities.size!==45||[...omittedTripleMultiplicities.values()].some(value=>value!==3))throw new Error("four-basis K4 tritangent recovery failed");
const exceptionalCliqueRecovery={
  maximalOneBasisTriangles:maximalTriangleClosures,
  triangleMeaning:"the 120 maximal K3s are exactly the symmetric-difference closures of azygetic double-six pairs",
  maximalOneBasisFiveCliques:fiveCliqueSkewPairs.length,
  fiveCliqueMeaning:"intersection of the five double-sixes is a unique skew pair of cubic lines; all 216 skew pairs occur once",
  maximalFourBasisFourCliques:fourCliqueOmittedTriples.length,
  fourCliqueMeaning:"the union of the four double-sixes omits one three-line tritangent; each of the 45 tritangents occurs for exactly three K4s",
  distinctRecoveredSkewPairs:skewPairKeys.size,
  distinctRecoveredTritangents:omittedTripleMultiplicities.size,
};
const intMatrixMultiply=(left,right)=>left.map(row=>right[0].map((_,j)=>row.reduce((sum,entry,k)=>sum+entry*right[k][j],0)));
const intMatrixLinear=(iCoefficient,aCoefficient,bCoefficient)=>I36.map((row,i)=>row.map((entry,j)=>iCoefficient*entry+aCoefficient*A[i][j]+bCoefficient*B[i][j]));
const intMatricesEqual=(left,right)=>left.every((row,i)=>row.every((entry,j)=>entry===right[i][j]));
if(!intMatricesEqual(intMatrixMultiply(A,A),intMatrixLinear(15,6,6)))throw new Error("A4 multiplication failed");
if(!intMatricesEqual(intMatrixMultiply(B,B),intMatrixLinear(20,12,10)))throw new Error("A1 multiplication failed");
if(!intMatricesEqual(intMatrixMultiply(A,B),intMatrixLinear(0,8,9)))throw new Error("A4 A1 multiplication failed");

const C=(re=0,im=0)=>[re,im];
const cadd=(a,b)=>C(a[0]+b[0],a[1]+b[1]);
const cmul=(a,b)=>C(a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]);
const cscale=(a,s)=>C(a[0]*s,a[1]*s);
const cconj=a=>C(a[0],-a[1]);
const cabs=a=>Math.hypot(a[0],a[1]);
const omegaPower=power=>{
  const angle=2*Math.PI*mod(power)/3;
  return C(Math.cos(angle),Math.sin(angle));
};
const zeroMatrix=()=>Array.from({length:9},()=>Array.from({length:9},()=>C()));
const matrixAdd=(left,right)=>left.map((row,i)=>row.map((entry,j)=>cadd(entry,right[i][j])));
const matrixScale=(matrix,scalar)=>matrix.map(row=>row.map(entry=>Array.isArray(scalar)?cmul(entry,scalar):cscale(entry,scalar)));
const matrixMultiply=(left,right)=>left.map((row,i)=>right[0].map((_,j)=>row.reduce((sum,entry,k)=>cadd(sum,cmul(entry,right[k][j])),C())));
const matrixTrace=matrix=>matrix.reduce((sum,row,i)=>cadd(sum,row[i]),C());
const matrixAdjoint=matrix=>matrix.map((_,i)=>matrix.map((row,j)=>cconj(row[i])));
const matrixResidual=(left,right)=>Math.max(...left.flatMap((row,i)=>row.map((entry,j)=>cabs(cadd(entry,cscale(right[i][j],-1))))));
const identity=zeroMatrix();for(let i=0;i<9;i+=1)identity[i][i]=C(1,0);
const weyl=label=>{
  const [x1,x2,z1,z2]=label,matrix=zeroMatrix();
  const prefactor=omegaPower(2*mod(x1*z1+x2*z2));
  for(let j1=0;j1<3;j1+=1)for(let j2=0;j2<3;j2+=1){
    const input=3*j1+j2,output=3*mod(j1+x1)+mod(j2+x2);
    matrix[output][input]=cmul(prefactor,omegaPower(z1*j1+z2*j2));
  }
  return matrix;
};
const projector=(plane,a,b)=>{
  let output=zeroMatrix();
  for(let s=0;s<3;s+=1)for(let t=0;t<3;t+=1){
    const label=add(plane[0],plane[1],s,t);
    output=matrixAdd(output,matrixScale(weyl(label),omegaPower(-a*s-b*t)));
  }
  return matrixScale(output,1/9);
};
const bases=lagrangians.map(plane=>Array.from({length:3},(_,a)=>Array.from({length:3},(_,b)=>projector(plane,a,b))).flat());
for(let plane=0;plane<bases.length;plane+=1)for(let state=0;state<bases[plane].length;state+=1)for(let row=0;row<9;row+=1)for(let column=0;column<9;column+=1){
  const entry=bases[plane][state][row][column];
  if(!entry||!Number.isFinite(entry[0])||!Number.isFinite(entry[1]))throw new Error(`non-finite projector entry at plane=${plane}, state=${state}, row=${row}, column=${column}: ${JSON.stringify(entry)}`);
}
const projectorKey=matrix=>matrix.flat().flatMap(entry=>entry.map(value=>Math.round(value*1e12))).join(",");
const distinctStabilizerProjectors=new Set(bases.flat().map(projectorKey)).size;
if(distinctStabilizerProjectors!==360)throw new Error(`expected 360 distinct stabilizer projectors, got ${distinctStabilizerProjectors}`);
let maxHermitianResidual=0,maxIdempotencyResidual=0,maxCompletenessResidual=0,maxWithinBasisOverlapResidual=0,maxMubResidual=0;
for(const basis of bases){
  let sum=zeroMatrix();
  for(let i=0;i<9;i+=1){
    const P=basis[i];sum=matrixAdd(sum,P);
    maxHermitianResidual=Math.max(maxHermitianResidual,matrixResidual(P,matrixAdjoint(P)));
    maxIdempotencyResidual=Math.max(maxIdempotencyResidual,matrixResidual(P,matrixMultiply(P,P)));
    for(let j=0;j<9;j+=1){
      const value=matrixTrace(matrixMultiply(P,basis[j]))[0];
      maxWithinBasisOverlapResidual=Math.max(maxWithinBasisOverlapResidual,Math.abs(value-(i===j?1:0)));
    }
  }
  maxCompletenessResidual=Math.max(maxCompletenessResidual,matrixResidual(sum,identity));
}
let disjointPlanePairs=0;
for(let i=0;i<lagrangians.length;i+=1)for(let j=i+1;j<lagrangians.length;j+=1){
  if(rank([...lagrangians[i],...lagrangians[j]])!==4)continue;
  disjointPlanePairs+=1;
  for(const P of bases[i])for(const Q of bases[j]){
    const value=matrixTrace(matrixMultiply(P,Q));
    maxMubResidual=Math.max(maxMubResidual,Math.abs(value[0]-1/9),Math.abs(value[1]));
  }
}
const numericalTolerance=1e-10;
if(Math.max(maxHermitianResidual,maxIdempotencyResidual,maxCompletenessResidual,maxWithinBasisOverlapResidual,maxMubResidual)>numericalTolerance)throw new Error("explicit Pauli-projector MUB verification failed");

const record={
  schemaVersion:"regulus-mub-selector-dynamics-v1",
  date:"2026-10-27",
  finiteOperatorModel:{
    phaseSpace:"F_3^4 with coordinates (x_1,x_2,z_1,z_2)",
    hilbertDimension:9,
    lagrangianCommutingClasses:lagrangians.length,
    stabilizerStates:distinctStabilizerProjectors,
    frames:frames.length,
    basesPerFrame:[...new Set(frames.map(frame=>frame.planes.length))],
    statesPerFrame:90,
    nonidentityPaulisPerBasis:8,
    nonidentityPaulisCoveredPerFrame:80,
    disjointPlanePairs,
    displacementConvention:"D(x,z)=omega^(2 x.z) X^x Z^z over F_3; on an isotropic plane D(u)D(v)=D(u+v)",
    rankOneProjectorFormula:"P_(a,b)=1/9 sum_(s,t in F_3) omega^(-as-bt) D(su+tv)",
    maximumNumericalResiduals:{
      hermitian:maxHermitianResidual,
      idempotency:maxIdempotencyResidual,
      completeness:maxCompletenessResidual,
      withinBasisOrthogonality:maxWithinBasisOverlapResidual,
      mutuallyUnbiased:maxMubResidual,
    },
    tolerance:numericalTolerance,
    representativeFrame:frames[0],
    framePlaneIndices:frames.map(frame=>frame.planes),
    lagrangianGenerators:lagrangians,
    interpretation:"The 40 Lagrangian planes give all 360 two-qutrit stabilizer states. Each of the 36 elliptic frames selects ten disjoint commuting classes and therefore 90 states in a complete stabilizer MUB.",
  },
  overlapAssociationScheme:{
    framePairOverlapDistribution:overlapDistribution,
    degreeByOverlap:overlapDegrees,
    fourBasisNeighbors:A.map(row=>row.map((entry,index)=>entry?index:null).filter(index=>index!==null)),
    oneBasisNeighbors:B.map(row=>row.map((entry,index)=>entry?index:null).filter(index=>index!==null)),
    fourBasisGraphParameters:fourGraph,
    oneBasisGraphParameters:oneGraph,
    adjacencyEigenvalues:{fourBasis:{15:1,3:15,"-3":20},oneBasis:{20:1,2:20,"-4":15}},
    boseMesnerMultiplication:{
      verifiedByExactMatrixProducts:true,
      A4Squared:"15 I + 6 A4 + 6 A1",
      A1Squared:"20 I + 12 A4 + 10 A1",
      A4A1:"8 A4 + 9 A1",
    },
    cliqueComplex,
    maximalOneBasisTriangles:maximalOneCliques.filter(clique=>clique.length===3),
    maximalOneBasisFiveCliques:maximalOneCliques.filter(clique=>clique.length===5),
    maximalFourBasisFourCliques:maximalFourCliques,
    exceptionalCliqueRecovery,
    interpretation:"Every relation-invariant linear operator on the 36 frames is x I + y A4 + z A1 and has only three spectral sectors of dimensions 1, 15 and 20.",
  },
  heckeCompression:{
    fullWeylGroupOrder:51840,
    doubleSixStabilizerOrder:1440,
    flagStabilizerOrder:120,
    flagsPerFrame:12,
    flagCarrier:"W(E6)/S5, dimension 432, commutant dimension 26",
    frameCarrier:"W(E6)/H_double-six, dimension 36, commutant dimension 3",
    subgroupIndex:"[H_double-six:S5]=12",
    moduleMap:"sum or average the twelve incident line flags over each double-six/frame",
    interpretation:"The 36-frame Bose-Mesner algebra is the fiber-constant Hecke compression of the 432-flag carrier, not an unrelated small matrix algebra.",
  },
  noiseChannel:{
    stochasticFamily:"K = alpha I + beta A4/15 + gamma A1/20, with alpha+beta+gamma=1 and alpha,beta,gamma>=0",
    sectorEigenvalues:{uniform:"1",dimension15:"alpha + (beta-gamma)/5",dimension20:"alpha - beta/5 + gamma/10"},
    continuousGenerator:"Q = u(A4-15I) + v(A1-20I), u,v>=0",
    generatorEigenvalues:{uniform:"0",dimension15:"-12u-24v",dimension20:"-18u-18v"},
    rateInverse:"v = r15/12 - r20/18; u = r20/9 - r15/12 for positive decay rates r15=12u+24v and r20=18u+18v",
    identifiability:"The two nontrivial decay rates recover u and v uniquely; held-out transitions test whether a device respects the association scheme.",
    carrierBoundary:"This is a Markov channel on frame labels, appropriate to Clifford-valued control noise or a coarse-grained selector variable. A generic quantum CPTP map need not send a complete stabilizer frame to another frame and therefore has an additional leakage sector.",
    boundary:"A relation-invariant irreducible Markov channel converges to the uniform frame distribution. It cannot select one frame spontaneously as a linear equilibrium process.",
  },
  selectorDynamics:{
    freeEnergy:"F(p)=T sum_i p_i log p_i - 1/2 p^T(j0 I+j4 A4+j1 A1)p - h.p",
    uniformHessianSectors:{dimension15:"36T-(j0+3j4-4j1)",dimension20:"36T-(j0-3j4+2j1)"},
    firstInstability:"The larger of j0+3j4-4j1 and j0-3j4+2j1 determines whether the first symmetry-breaking mode lies in the 15- or 20-dimensional exceptional sector.",
    zeroTemperatureRelationOptimization:{
      theorem:"By Motzkin-Straus, maximizing p^T A p on the probability simplex gives 1-1/omega(A), attained on uniform distributions over maximum cliques.",
      fourBasisAttraction:"omega(A4)=4, so pure attractive four-basis coupling has 135 K4-supported optimum clusters, each associated with a tritangent omission.",
      oneBasisAttraction:"omega(A1)=5, so pure attractive one-basis coupling has 216 K5-supported optimum clusters, each associated with a skew cubic-line pair.",
      energies:"for F=-j p^T A p/2, the optimum energies are -3j4/8 and -2j1/5 respectively",
    },
    uniqueSelectionBoundary:"With h=0 the equations may break symmetry but cannot canonically name one of 36 equivalent frames. A unique frame requires an external field, boundary condition, initial-condition choice, nonlinear history or source-derived asymmetry.",
  },
  liftObstructions:{
    integralCarrier:"Reduction Sp(4,Z) -> Sp(4,F_3) supplies the finite carrier and is surjective, so individual finite transformations have integral lifts.",
    noEquivariantIntegralSection:"A section would embed the order-51840 Sp(4,F_3) into GL(4,Z), but finite subgroups of GL(4,Z) have maximal order 1152. Therefore the full finite action has no faithful four-dimensional integral section.",
    realCarrier:"The mod-three carrier may be the special fibre of a real/integral symplectic system, but the 36-frame finite symmetry does not lift as the same faithful subgroup of Sp(4,R).",
    noFaithfulRealFourCarrier:"Every finite subgroup of Sp(4,R) is conjugate into U(2). A faithful PSp(4,3) action there would induce a faithful projective two-dimensional unitary representation, impossible by the classification of finite rotation groups.",
    consequence:"The integral and real lifts are quotient/transport constructions with congruence-kernel ambiguity, not a canonical embedding of the complete finite configuration.",
  },
  experimentalBoundary:{
    nearestTest:"Prepare and measure the ten stabilizer bases belonging to selected frames on one two-qutrit device; apply calibrated frame-preserving Clifford controls or a coarse-grained selector process; estimate the 36x36 conditional kernel and project it onto span{I,A4,A1}.",
    leakageTest:"First quantify probability mass not describable as any of the 36 frames. Only the conditional frame-preserving component is eligible for the three-parameter association-scheme model.",
    nullModel:"A generic calibrated channel need not be constant on the one-basis and four-basis relation classes.",
    positiveResult:"Small residual outside the three-dimensional Bose-Mesner algebra, plus held-out prediction of both decay sectors, establishes the exceptional incidence as an operational organizing symmetry of that device.",
    negativeResult:"A resolved residual falsifies the relation-invariant dynamics while leaving the exact finite geometry intact.",
    physicsBoundary:"Neither outcome identifies a fundamental interaction, spacetime structure or E8 root carrier.",
  },
};

if(WRITE){fs.mkdirSync("evidence/data",{recursive:true});fs.writeFileSync(OUTPUT,`${JSON.stringify(record,null,2)}\n`);}
console.log(JSON.stringify({output:OUTPUT,wrote:WRITE,...record},null,2));
