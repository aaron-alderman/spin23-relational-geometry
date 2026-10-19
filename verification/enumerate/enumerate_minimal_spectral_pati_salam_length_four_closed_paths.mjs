import assert from "node:assert/strict";

const nodes=["L","R","Lc","Rc"];
const edges={
  L:[{to:"R",f:"Sigma"},{to:"Lc",f:"HL"}],
  R:[{to:"L",f:"Sigma†"},{to:"Rc",f:"HR"}],
  Lc:[{to:"L",f:"HL†"},{to:"Rc",f:"SigmaBar"}],
  Rc:[{to:"R",f:"HR†"},{to:"Lc",f:"SigmaBar†"}]
};
const walks=[];
const extend=(start,node,word,visited,n)=>{
  if(n===4){if(node===start)walks.push({start,word,nodes:visited});return;}
  for(const e of edges[node])extend(start,e.to,[...word,e.f],[...visited,e.to],n+1);
};
for(const n of nodes)extend(n,n,[],[n],0);
assert.equal(walks.length,32);

const isH=f=>/^H[LR]/.test(f);
const cross=walks.filter(w=>w.word.some(f=>f==="HL"||f==="HL†")&&w.word.some(f=>f==="HR"||f==="HR†"));
assert.equal(cross.length,8);
const holomorphic=cross.filter(w=>{
  const hs=w.word.filter(isH);
  return hs.every(f=>!f.endsWith("†"))||hs.every(f=>f.endsWith("†"));
});
assert.equal(holomorphic.length,0);
for(const w of cross){
  const hs=w.word.filter(isH);
  assert.equal(hs.length,2);
  assert.equal(hs.filter(f=>f.endsWith("†")).length,1);
}

const charge={Sigma:0,"Sigma†":0,SigmaBar:0,"SigmaBar†":0,HL:2,"HL†":-2,HR:2,"HR†":-2};
const charges=walks.map(w=>w.word.reduce((s,f)=>s+charge[f],0));
assert(charges.every(q=>q===0));

const primitive=cross.map(w=>w.word.join(" "));
const canonical=[...new Set(primitive.map(word=>{
  const xs=word.split(" ");
  const rots=xs.map((_,i)=>[...xs.slice(i),...xs.slice(0,i)].join(" "));
  return rots.sort()[0];
}))];
assert.equal(canonical.length,2); // the cycle and its Hermitian reverse

// A Standard-Model-preserving SU(4) adjoint/singlet vacuum is diagonal on
// C^3_colour + C_lepton, hence its induced action on Lambda^2 C^4 preserves
// colour-colour and colour-lepton sectors.
const pairs=[[0,1],[0,2],[1,2],[0,3],[1,3],[2,3]];
const inducedDiagonal=(a,b)=>pairs.map(([i,j])=>(i===3?b:a)+(j===3?b:a));
const wedgeEigenvalues=inducedDiagonal(2,-3);
assert.deepEqual(wedgeEigenvalues,[4,4,4,-1,-1,-1]);

console.log(JSON.stringify({
  protocol:"minimal-spectral-Pati-Salam-length-four-closed-paths/1",
  nodes,
  undirectedEdges:["L--R:Sigma","L--Lc:HL","R--Rc:HR","Lc--Rc:SigmaBar"],
  closedLengthFourWalks:walks.length,
  primitiveFourSectorWalks:cross.length,
  crossHiggsCanonicalOrientations:canonical,
  holomorphicHLHRWalks:holomorphic.length,
  allClosedWalkPhaseCharges:[...new Set(charges)],
  standardModelPreservingSigmaWedgeEigenvalues:wedgeEigenvalues,
  sectorOrder:["cc","cc","cc","cl","cl","cl"],
  theorem:"In the minimal four-sector finite-Dirac graph, every length-four loop containing both H_L and H_R contains exactly one daggered H. The spectral quartic can generate Hermitian H_L–H_R communication but not a holomorphic H_L H_R Pfaffian. A colour-preserving diagonal Sigma vacuum also preserves the cc/cl split on Lambda^2 C^4.",
  boundary:"This graph theorem follows the nonzero finite-Dirac blocks printed in arXiv:1507.08161. It does not exhaust higher spectral orders, nonminimal finite blocks, self-H component contractions, or radiative counterterms after symmetry breaking.",
  passed:true
},null,2));
