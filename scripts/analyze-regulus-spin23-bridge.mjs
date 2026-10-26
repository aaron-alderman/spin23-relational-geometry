import fs from "node:fs";
import path from "node:path";

const q=3;
const mod=x=>((x%q)+q)%q;
const inv=x=>x===1?1:2;
const WRITE=process.argv.includes("--write");
const OUTPUT="evidence/data/regulus-spin23-bridge-v1.json";

const vectors=(dimension,includeZero=true)=>Array.from({length:q**dimension},(_,number)=>{
  const value=[];
  for(let i=0;i<dimension;i+=1){value.push(number%q);number=Math.floor(number/q);}
  return value;
}).filter(value=>includeZero||value.some(Boolean));
const projective=x=>{
  const first=x.find(value=>value!==0);
  if(first===undefined)throw new Error("zero vector has no projective key");
  return x.map(value=>mod(inv(first)*value));
};
const key=x=>projective(x).join("");
const dot=(x,y)=>mod(x.reduce((sum,value,i)=>sum+value*y[i],0));
const add=(x,y,scale=1)=>x.map((value,i)=>mod(value+scale*y[i]));
const rank=rows=>{
  const A=rows.map(row=>row.map(mod));let r=0;
  for(let c=0;c<(A[0]?.length??0)&&r<A.length;c+=1){
    let pivot=r;while(pivot<A.length&&A[pivot][c]===0)pivot+=1;
    if(pivot===A.length)continue;
    [A[r],A[pivot]]=[A[pivot],A[r]];
    A[r]=A[r].map(value=>mod(inv(A[r][c])*value));
    for(let i=0;i<A.length;i+=1)if(i!==r&&A[i][c]){
      const factor=A[i][c];A[i]=A[i].map((value,j)=>mod(value-factor*A[r][j]));
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
    A[r]=A[r].map(value=>mod(inv(A[r][c])*value));
    for(let i=0;i<A.length;i+=1)if(i!==r&&A[i][c]){
      const factor=A[i][c];A[i]=A[i].map((value,j)=>mod(value-factor*A[r][j]));
    }
    r+=1;
  }
  return A.filter(row=>row.some(Boolean));
};
const matrixMultiply=(A,B)=>A.map(row=>B[0].map((_,j)=>mod(row.reduce((sum,value,k)=>sum+value*B[k][j],0))));
const matrixApply=(A,x)=>A.map(row=>mod(row.reduce((sum,value,i)=>sum+value*x[i],0)));
const matrixKey=A=>A.flat().map(mod).join("");
const combinations=(items,count,start=0,prefix=[],output=[])=>{
  if(prefix.length===count){output.push(prefix);return output;}
  for(let i=start;i<=items.length-(count-prefix.length);i+=1)combinations(items,count,i+1,[...prefix,items[i]],output);
  return output;
};

const symplectic=(u,v)=>mod(u[0]*v[2]+u[1]*v[3]-u[2]*v[0]-u[3]*v[1]);
const wedge=(u,v)=>[
  mod(u[0]*v[1]-u[1]*v[0]),mod(u[0]*v[2]-u[2]*v[0]),
  mod(u[0]*v[3]-u[3]*v[0]),mod(u[1]*v[2]-u[2]*v[1]),
  mod(u[1]*v[3]-u[3]*v[1]),mod(u[2]*v[3]-u[3]*v[2]),
];
const primitive=p=>[p[0],mod(-p[5]),p[2],mod(-p[3]),p[1]];
const norm=x=>mod(2*x[0]*x[1]+2*x[2]*x[3]+x[4]*x[4]);
const polar=(x,y)=>mod(norm(add(x,y))-norm(x)-norm(y));

const projectiveVectors=(dimension)=>{
  const map=new Map();
  for(const value of vectors(dimension,false))map.set(key(value),projective(value));
  return [...map.values()];
};

const all4=vectors(4);
const planeMap=new Map();
for(const u of all4)for(const v of all4){
  const R=rref([u,v]);if(R.length===2)planeMap.set(R.flat().join(""),R);
}
const lagrangians=[...planeMap.values()].filter(([u,v])=>symplectic(u,v)===0);
const pointToPlane=new Map(lagrangians.map(plane=>[key(primitive(wedge(...plane))),plane]));

const points=projectiveVectors(5).filter(point=>norm(point)===0);
const pointMap=new Map(points.map(point=>[key(point),point]));
if(points.length!==40||pointToPlane.size!==40)throw new Error("Q(4,3) point count mismatch");

const lineMap=new Map();
for(const [x,y] of combinations(points,2)){
  if(rank([x,y])!==2||polar(x,y)!==0)continue;
  const members=new Set();
  for(let a=0;a<q;a+=1)for(let b=0;b<q;b+=1){
    if(a===0&&b===0)continue;
    members.add(key(x.map((value,i)=>mod(a*value+b*y[i]))));
  }
  const memberKeys=[...members].sort();
  if(memberKeys.length!==4||memberKeys.some(member=>!pointMap.has(member)))throw new Error("invalid quadric line");
  lineMap.set(memberKeys.join("|"),memberKeys);
}
const lines=[...lineMap.values()];
const linesByPoint=new Map(points.map(point=>[key(point),[]]));
lines.forEach((line,index)=>line.forEach(point=>linesByPoint.get(point).push(index)));
const spreads=[];
const searchSpreads=(covered,chosen)=>{
  if(covered.size===points.length){spreads.push([...chosen]);return;}
  const uncovered=points.map(key).find(point=>!covered.has(point));
  for(const lineIndex of linesByPoint.get(uncovered)){
    const line=lines[lineIndex];if(line.some(point=>covered.has(point)))continue;
    const next=new Set(covered);line.forEach(point=>next.add(point));
    searchSpreads(next,[...chosen,lineIndex]);
  }
};
searchSpreads(new Set(),[]);

const spanContains=(basis,value)=>rank([...basis,value])===rank(basis);
const commonProjectiveVector=planeKeys=>{
  const planes=planeKeys.map(pointKey=>pointToPlane.get(pointKey));
  return projectiveVectors(4).filter(value=>planes.every(plane=>spanContains(plane,value)));
};
const pencilWitnesses=lines.map(line=>commonProjectiveVector(line));
if(pencilWitnesses.some(witnesses=>witnesses.length!==1))throw new Error("quadric line is not a Lagrangian pencil");

const hyperplanes=projectiveVectors(5);
const sectionSizeDistribution={};
const sectionsBySize={10:[],13:[],16:[]};
const hyperbolicSections=[];
for(const covector of hyperplanes){
  const section=points.filter(point=>dot(covector,point)===0).map(key).sort();
  sectionSizeDistribution[section.length]=(sectionSizeDistribution[section.length]??0)+1;
  sectionsBySize[section.length]?.push({covector,points:section});
  if(section.length!==16)continue;
  const sectionSet=new Set(section);
  const contained=lines.filter(line=>line.every(point=>sectionSet.has(point)));
  if(contained.length!==8)throw new Error("16-point section is not hyperbolic");
  const disjointAdjacency=contained.map((line,i)=>contained.map((other,j)=>i!==j&&!line.some(point=>other.includes(point))));
  const components=[];const seen=new Set();
  for(let start=0;start<contained.length;start+=1){
    if(seen.has(start))continue;
    const queue=[start],component=[];seen.add(start);
    while(queue.length){const i=queue.shift();component.push(i);for(let j=0;j<contained.length;j+=1)if(disjointAdjacency[i][j]&&!seen.has(j)){seen.add(j);queue.push(j);}}
    components.push(component);
  }
  if(components.length!==2||components.some(component=>component.length!==4))throw new Error("regulus ruling partition failed");
  const rulings=components.map(component=>component.map(index=>contained[index]));
  for(const ruling of rulings){
    const union=new Set(ruling.flat());if(union.size!==16)throw new Error("ruling does not partition section points");
  }
  for(const left of rulings[0])for(const right of rulings[1]){
    if(left.filter(point=>right.includes(point)).length!==1)throw new Error("opposite rulings do not meet once");
  }
  for(let side=0;side<2;side+=1)for(const triple of combinations(rulings[side],3)){
    const transversals=lines.filter(candidate=>triple.every(source=>source.some(point=>candidate.includes(point))));
    const oppositeKeys=new Set(rulings[1-side].map(line=>line.join("|")));
    if(transversals.length!==4||transversals.some(line=>!oppositeKeys.has(line.join("|"))))throw new Error("three-line regulus closure failed");
  }
  hyperbolicSections.push({covector,points:section,rulings});
}

const pointSectionCounts=Object.fromEntries(points.map(point=>[key(point),0]));
const lineSectionCounts=Object.fromEntries(lines.map(line=>[line.join("|"),0]));
for(const section of hyperbolicSections){
  for(const point of section.points)pointSectionCounts[point]+=1;
  for(const ruling of section.rulings)for(const line of ruling)lineSectionCounts[line.join("|")]+=1;
}
const distinctCounts=object=>[...new Set(Object.values(object))].sort((a,b)=>a-b);
const sectionIntersectionDistribution={};
const sectionIntersectionDegrees={};
for(let i=0;i<hyperbolicSections.length;i+=1)for(let j=i+1;j<hyperbolicSections.length;j+=1){
  const right=new Set(hyperbolicSections[j].points);
  const size=hyperbolicSections[i].points.filter(point=>right.has(point)).length;
  sectionIntersectionDistribution[size]=(sectionIntersectionDistribution[size]??0)+1;
}
for(const size of Object.keys(sectionIntersectionDistribution)){
  sectionIntersectionDegrees[size]=[...new Set(hyperbolicSections.map((section,i)=>{
    const left=new Set(section.points);
    return hyperbolicSections.filter((_,j)=>j!==i).filter(other=>other.points.filter(point=>left.has(point)).length===Number(size)).length;
  }))].sort((a,b)=>a-b);
}
const sectionAdjacent=(i,j)=>i!==j&&hyperbolicSections[i].points.filter(point=>hyperbolicSections[j].points.includes(point)).length===4;
const adjacentCommonNeighbors=new Set(),nonadjacentCommonNeighbors=new Set();
for(let i=0;i<hyperbolicSections.length;i+=1)for(let j=i+1;j<hyperbolicSections.length;j+=1){
  let common=0;
  for(let k=0;k<hyperbolicSections.length;k+=1)if(sectionAdjacent(i,k)&&sectionAdjacent(j,k))common+=1;
  (sectionAdjacent(i,j)?adjacentCommonNeighbors:nonadjacentCommonNeighbors).add(common);
}
const fiveCliques=[];
const extendClique=(chosen,candidates)=>{
  if(chosen.length===5){fiveCliques.push(chosen);return;}
  for(let position=0;position<candidates.length;position+=1){
    const vertex=candidates[position];
    const next=candidates.slice(position+1).filter(candidate=>sectionAdjacent(vertex,candidate));
    extendClique([...chosen,vertex],next);
  }
};
extendClique([],hyperbolicSections.map((_,index)=>index));
const cliquesPerSection=hyperbolicSections.map((_,index)=>fiveCliques.filter(clique=>clique.includes(index)).length);
const adjacencyCliqueMultiplicities=[];
for(let i=0;i<hyperbolicSections.length;i+=1)for(let j=i+1;j<hyperbolicSections.length;j+=1)if(sectionAdjacent(i,j)){
  adjacencyCliqueMultiplicities.push(fiveCliques.filter(clique=>clique.includes(i)&&clique.includes(j)).length);
}
const lineCandidatesMeet=(left,right)=>left!==right&&fiveCliques[left].some(section=>fiveCliques[right].includes(section));
const bipartition=selection=>{
  const color=new Map();
  for(const start of selection){
    if(color.has(start))continue;color.set(start,0);const queue=[start];
    while(queue.length){
      const current=queue.shift();
      for(const other of selection)if(lineCandidatesMeet(current,other)){
        if(!color.has(other)){color.set(other,1-color.get(current));queue.push(other);}
        else if(color.get(other)===color.get(current))return null;
      }
    }
  }
  return [selection.filter(item=>color.get(item)===0),selection.filter(item=>color.get(item)===1)];
};
const I4=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const F1=[[0,0,1,0],[0,1,0,0],[-1,0,0,0],[0,0,0,1]];
const F2=[[1,0,0,0],[0,0,0,1],[0,0,1,0],[0,-1,0,0]];
const D1=[[1,0,0,0],[0,1,0,0],[1,0,1,0],[0,0,0,1]];
const D2=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,1,0,1]];
const Swap=[[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]];
const U=[[1,0,0,0],[0,1,0,0],[0,1,1,0],[1,0,0,1]];
const group=[I4],groupKeys=new Set([matrixKey(I4)]);
for(let cursor=0;cursor<group.length;cursor+=1)for(const generator of [F1,F2,D1,D2,Swap,U]){
  const next=matrixMultiply(group[cursor],generator),nextKey=matrixKey(next);
  if(!groupKeys.has(nextKey)){groupKeys.add(nextKey);group.push(next);}
}
if(group.length!==51840)throw new Error("Sp(4,3) generation failed");
const actPoint=(matrix,pointKey)=>{
  const plane=pointToPlane.get(pointKey);
  const image=rref(plane.map(vector=>matrixApply(matrix,vector)));
  return key(primitive(wedge(...image)));
};
const sampleSectionKey=hyperbolicSections[0].points.join("|");
const sectionOrbit=new Set();let sectionStabilizer=0;
for(const matrix of group){
  const image=hyperbolicSections[0].points.map(point=>actPoint(matrix,point)).sort().join("|");
  sectionOrbit.add(image);if(image===sampleSectionKey)sectionStabilizer+=1;
}
const allSectionKeys=new Set(hyperbolicSections.map(section=>section.points.join("|")));
if(sectionOrbit.size!==45||[...sectionOrbit].some(section=>!allSectionKeys.has(section)))throw new Error("Sp(4,3) section orbit failed");
const sectionIndexByKey=new Map(hyperbolicSections.map((section,index)=>[section.points.join("|"),index]));
const actSection=(matrix,index)=>sectionIndexByKey.get(hyperbolicSections[index].points.map(point=>actPoint(matrix,point)).sort().join("|"));
const cliqueKey=clique=>[...clique].sort((a,b)=>a-b).join(",");
const cliqueKeySet=new Set(fiveCliques.map(cliqueKey)),cliqueOrbit=new Set();let cliqueStabilizer=0;
const cliqueIndexByKey=new Map(fiveCliques.map((clique,index)=>[cliqueKey(clique),index]));
const actClique=(matrix,index)=>cliqueIndexByKey.get(cliqueKey(fiveCliques[index].map(section=>actSection(matrix,section))));
for(const matrix of group){
  const image=cliqueKey(fiveCliques[0].map(section=>actSection(matrix,section)));
  if(!cliqueKeySet.has(image))throw new Error("five-clique orbit left reconstructed configuration");
  cliqueOrbit.add(image);if(image===cliqueKey(fiveCliques[0]))cliqueStabilizer+=1;
}
if(cliqueOrbit.size!==fiveCliques.length)throw new Error("five-clique action is not transitive");
const ellipticSections=sectionsBySize[10];
const ellipticKey=section=>section.points.join("|");
const ellipticIndexByKey=new Map(ellipticSections.map((section,index)=>[ellipticKey(section),index]));
const actElliptic=(matrix,index)=>ellipticIndexByKey.get(ellipticSections[index].points.map(point=>actPoint(matrix,point)).sort().join("|"));
const ellipticOrbit=new Set(),ellipticStabilizer=[],ellipticRepresentatives=new Map();
for(const matrix of group){
  const image=actElliptic(matrix,0);
  if(image===undefined)throw new Error("elliptic-section orbit left the 36-section family");
  ellipticOrbit.add(image);
  if(!ellipticRepresentatives.has(image))ellipticRepresentatives.set(image,matrix);
  if(image===0)ellipticStabilizer.push(matrix);
}
if(ellipticOrbit.size!==36||ellipticStabilizer.length!==1440)throw new Error("elliptic-section orbit/stabilizer failed");
const stabilizerCliqueOrbits=[];
const unseenCliques=new Set(fiveCliques.map((_,index)=>index));
while(unseenCliques.size){
  const representative=unseenCliques.values().next().value,orbit=new Set();
  for(const matrix of ellipticStabilizer){
    const image=actClique(matrix,representative);
    if(image===undefined)throw new Error("elliptic stabilizer left reconstructed line family");
    orbit.add(image);
  }
  orbit.forEach(index=>unseenCliques.delete(index));
  stabilizerCliqueOrbits.push([...orbit].sort((a,b)=>a-b));
}
stabilizerCliqueOrbits.sort((left,right)=>left.length-right.length);
if(stabilizerCliqueOrbits.map(orbit=>orbit.length).join(",")!=="12,15")throw new Error("elliptic stabilizer did not split 27 lines as 12+15");
const seedDoubleSix=stabilizerCliqueOrbits[0];
const doubleSixRelation=new Set();
for(const [elliptic,matrix] of ellipticRepresentatives)for(const line of seedDoubleSix){
  const imageLine=actClique(matrix,line);
  doubleSixRelation.add(`${elliptic}:${imageLine}`);
}
const doubleSixSelections=ellipticSections.map((_,elliptic)=>fiveCliques.map((__,line)=>line).filter(line=>doubleSixRelation.has(`${elliptic}:${line}`)));
const linesPerDoubleSix=[...new Set(doubleSixSelections.map(selection=>selection.length))].sort((a,b)=>a-b);
const doubleSixesPerLine=[...new Set(fiveCliques.map((_,line)=>doubleSixSelections.filter(selection=>selection.includes(line)).length))].sort((a,b)=>a-b);
const validDoubleSixGraphs=doubleSixSelections.filter(selection=>{
  const parts=bipartition(selection);
  return parts&&parts[0].length===6&&parts[1].length===6&&selection.every(line=>selection.filter(other=>lineCandidatesMeet(line,other)).length===5);
}).length;
if(doubleSixRelation.size!==432||linesPerDoubleSix.join(",")!=="12"||doubleSixesPerLine.join(",")!=="16"||validDoubleSixGraphs!==36){
  throw new Error(`double-six reconstruction failed: relation=${doubleSixRelation.size}, lines=${linesPerDoubleSix}, perLine=${doubleSixesPerLine}, graphs=${validDoubleSixGraphs}`);
}
const lineIndexByKey=new Map(lines.map((line,index)=>[line.join("|"),index]));
const actLine=(matrix,lineIndex)=>{
  const image=lines[lineIndex].map(point=>actPoint(matrix,point)).sort().join("|");
  return lineIndexByKey.get(image);
};
const spreadKey=spread=>[...spread].sort((a,b)=>a-b).join(",");
const spreadKeySet=new Set(spreads.map(spreadKey));
const spreadOrbits=[];const unseenSpreads=new Set(spreadKeySet);
while(unseenSpreads.size){
  const representative=[...unseenSpreads][0].split(",").map(Number),orbit=new Set();
  for(const matrix of group)orbit.add(spreadKey(representative.map(line=>actLine(matrix,line))));
  if([...orbit].some(item=>!spreadKeySet.has(item)))throw new Error("spread orbit left exact-cover set");
  orbit.forEach(item=>unseenSpreads.delete(item));spreadOrbits.push(orbit.size);
}
spreadOrbits.sort((a,b)=>a-b);

const record={
  schemaVersion:"regulus-spin23-bridge-v1",
  date:"2026-10-26",
  purpose:"Test whether reguli supply an exact local two-ruling closure geometry inside the corpus's 40-point qutrit Lagrangian/Spin(2,3) carrier.",
  ambientGeometry:{
    realStatement:"The Klein quadric Gr(2,4) in P(Lambda^2 R^4) has split signature (3,3); imposing a nondegenerate symplectic form selects the primitive hyperplane and its (2,3) projective null quadric LGr(2,4).",
    groupChain:"Spin_0(3,3) ~= SL(4,R), with symplectic stabilizer Sp(4,R) ~= Spin_0(2,3).",
    regulusStatement:"A nonsingular plane section of the Klein quadric is a conic representing one ruling; the polar plane section represents the opposite ruling.",
  },
  finiteCarrier:{
    field:"F3",
    totalTwoPlanes:planeMap.size,
    lagrangianPlanes:lagrangians.length,
    projectiveNullPoints:points.length,
    quadricLines:lines.length,
    pointsPerLine:[...new Set(lines.map(line=>line.length))],
    linesPerPoint:[...new Set(points.map(point=>lines.filter(line=>line.includes(key(point))).length))],
    eachQuadricLineIsLagrangianPencil:pencilWitnesses.every(witnesses=>witnesses.length===1),
    spreads:{
      definition:"ten pairwise disjoint quadric lines partitioning all 40 points",
      count:spreads.length,
      linesPerSpread:[...new Set(spreads.map(spread=>spread.length))],
      pspOrbitSizes:spreadOrbits,
    },
  },
  hyperplaneSections:{
    projectiveHyperplanes:hyperplanes.length,
    sizeDistribution:sectionSizeDistribution,
    hyperbolicSections:hyperbolicSections.length,
    pointsPerHyperbolicSection:16,
    linesPerHyperbolicSection:8,
    rulingSizes:[4,4],
    sectionCountPerPoint:distinctCounts(pointSectionCounts),
    sectionCountPerLine:distinctCounts(lineSectionCounts),
    pairIntersectionDistribution:sectionIntersectionDistribution,
    pairIntersectionDegrees:sectionIntersectionDegrees,
    fourPointIntersectionGraph:{
      vertices:hyperbolicSections.length,
      degree:sectionIntersectionDegrees[4],
      adjacentCommonNeighbors:[...adjacentCommonNeighbors].sort((a,b)=>a-b),
      nonadjacentCommonNeighbors:[...nonadjacentCommonNeighbors].sort((a,b)=>a-b),
      stronglyRegularParameters:[45,12,[...adjacentCommonNeighbors][0],[...nonadjacentCommonNeighbors][0]],
      comparisonBoundary:"These are the parameters of the 45-object tritangent-plane graph. Parameters and group order do not by themselves supply a canonical cubic-surface labelling.",
    },
    reconstructedTwentySeven:{
      maximalFiveCliques:fiveCliques.length,
      sectionsPerClique:[...new Set(fiveCliques.map(clique=>clique.length))],
      cliquesPerSection:[...new Set(cliquesPerSection)].sort((a,b)=>a-b),
      cliquesPerAdjacentPair:[...new Set(adjacencyCliqueMultiplicities)].sort((a,b)=>a-b),
      incidence:"27 five-cliques x 5 sections = 45 sections x 3 five-cliques = 135 incidences",
      interpretation:"Treating the 45 regulus-pair sections as tritangent candidates, their 27 maximal five-cliques reconstruct the line candidates: five tritangents through each line and three lines in each tritangent.",
    },
    reconstructedThirtySix:{
      ellipticSections:ellipticSections.length,
      ellipticStabilizerOrbitOnTwentySeven:stabilizerCliqueOrbits.map(orbit=>orbit.length),
      incidencePairs:doubleSixRelation.size,
      linesPerEllipticSection:linesPerDoubleSix,
      ellipticSectionsPerLine:doubleSixesPerLine,
      graph:"each selected 12-line subgraph is bipartite 6+6, with degree five: K_6,6 minus a perfect matching",
      verifiedForAllEllipticSections:validDoubleSixGraphs===ellipticSections.length,
      interpretation:"The 36 elliptic sections reconstruct the 36 double-sixes, not merely their count.",
    },
  },
  closure:{
    verifiedForEveryHyperbolicSection:true,
    statement:"Any three lines in either ruling have exactly the four lines of the opposite ruling as common transversals among all 40 polar-space lines.",
    detector:"A fourth disjoint line belongs to the same regulus precisely when it preserves the complete four-transversal family.",
    interpretation:"Three local relation pencils generate a finite admissible closure; the opposite ruling is its relational dual, and fourth-line survival is an exact closure detector.",
  },
  exceptionalComparison:{
    sp4Order:group.length,
    projectiveSp4Order:group.length/2,
    hyperbolicSectionOrbit:sectionOrbit.size,
    fullSp4StabilizerOrder:sectionStabilizer,
    projectiveStabilizerOrder:sectionStabilizer/2,
    reconstructedLineOrbit:cliqueOrbit.size,
    fullSp4LineStabilizerOrder:cliqueStabilizer,
    projectiveLineStabilizerOrder:cliqueStabilizer/2,
    ellipticSectionOrbit:ellipticOrbit.size,
    fullSp4EllipticStabilizerOrder:ellipticStabilizer.length,
    projectiveEllipticStabilizerOrder:ellipticStabilizer.length/2,
    exactStatement:"PSp(4,3) acts transitively on the 45 regulus-pair sections, 27 reconstructed line candidates and 36 elliptic sections; their projective stabilizers have orders 576, 960 and 720 respectively.",
    cubicSurfaceComparison:"The even symmetry group of the 27-line/45-tritangent cubic-surface configuration is PSp(4,3), and the full Weyl group W(E6) has order 51840. The present 45-object orbit is therefore the correct finite group action to compare with tritangent planes.",
    boundary:"Equal degree, stabilizer order and strongly regular parameters do not yet provide a canonical label-preserving bijection to a chosen cubic surface. Sp(4,3) itself must not be identified with W(E6): its central quotient PSp(4,3) is the even subgroup in the classical cubic-surface action.",
  },
  sample:{
    hyperplaneCovector:hyperbolicSections[0]?.covector,
    rulingA:hyperbolicSections[0]?.rulings[0],
    rulingB:hyperbolicSections[0]?.rulings[1],
  },
  verdict:"Regulus geometry is not decorative: it gives an exact two-face closure unit inside Q(4,3), while the symplectic primitive slice explains why the ambient Klein Spin(3,3) line carrier descends to the corpus's Spin(2,3) null carrier. No dynamics or physical identification follows from incidence alone.",
};

if(WRITE){
  fs.mkdirSync(path.dirname(OUTPUT),{recursive:true});
  fs.writeFileSync(OUTPUT,`${JSON.stringify(record,null,2)}\n`);
}
console.log(JSON.stringify({output:OUTPUT,wrote:WRITE,...record},null,2));
