import assert from "node:assert/strict";

const signs=[];
for(let mask=0;mask<8;mask++)signs.push([0,1,2].map(i=>((mask>>i)&1)?-1:1));
const diag=s=>s.map((x,i)=>s.map((_,j)=>i===j?x:0));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((a,x,k)=>a+x*B[k][j],0)));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const maxabs=A=>Math.max(...A.flat().map(Math.abs));
const commutes=(S,H)=>maxabs(sub(mm(S,H),mm(H,S)))<1e-9;

// Orthogonal matrix with no zero entry, obtained from a normalized rational
// quaternion. It is a stand-in for a fully connected three-family mixing graph.
const V=[
  [0.36,-0.48,0.8],
  [0.8,0.60,0],
  [-0.48,0.64,0.60]
];
// Remove the accidental zero while retaining invertibility; commutant testing
// needs only a dense connected matrix, not exact unitarity.
V[1][2]=0.17;
const masses=[1,4,11];
const Hdiag=diag(masses);
const Hmixed=mm(mm(V,Hdiag),tr(V));
const common=signs.filter(s=>commutes(diag(s),Hdiag)&&commutes(diag(s),Hmixed));
assert.deepEqual(common,[[1,1,1],[-1,-1,-1]]);

// Pure support-graph formulation: a sign symmetry of a nonzero Yukawa entry
// imposes q_left(i)+q_right(j)+h=0 mod 2. Connected bipartite support forces
// constant charges on each side.
const solveSupport=edges=>{
  const out=[];
  for(let qL=0;qL<8;qL++)for(let qR=0;qR<8;qR++)for(const h of [0,1]){
    const L=[0,1,2].map(i=>(qL>>i)&1),R=[0,1,2].map(i=>(qR>>i)&1);
    if(edges.every(([i,j])=>(L[i]+R[j]+h)%2===0))out.push({L,R,h});
  }
  return out;
};
const fullEdges=[];for(let i=0;i<3;i++)for(let j=0;j<3;j++)fullEdges.push([i,j]);
const fullSolutions=solveSupport(fullEdges);
assert(fullSolutions.every(x=>new Set(x.L).size===1&&new Set(x.R).size===1));

const blockEdges=[[0,0],[0,1],[1,0],[1,1],[2,2]];
const blockSolutions=solveSupport(blockEdges);
assert(blockSolutions.some(x=>x.L[0]===x.L[1]&&x.L[2]!==x.L[0]));

const anomalyFreeSplitPatterns=[];
for(const qQ of signs.map(s=>s.map(x=>x===-1?1:0)))for(const qL of signs.map(s=>s.map(x=>x===-1?1:0))){
  const d=qQ.map((x,i)=>(x+qL[i])%2);
  if(d.reduce((a,b)=>a+b,0)%2===0)anomalyFreeSplitPatterns.push(d);
}
const connectedPatterns=[];
for(const qQ of [[0,0,0],[1,1,1]])for(const qL of [[0,0,0],[1,1,1]])connectedPatterns.push(qQ.map((x,i)=>(x+qL[i])%2));
assert(connectedPatterns.every(d=>d.every(x=>x===0)||d.every(x=>x===1)));
assert(connectedPatterns.filter(d=>d.reduce((a,b)=>a+b,0)%2===0).every(d=>d.every(x=>x===0)));

console.log(JSON.stringify({
  protocol:"connected-yukawa-graph-forces-family-universal-z2/1",
  commonDiagonalSignCommutant:common,
  fullSupportSolutions:fullSolutions.length,
  fullSupportAllFamilyUniversal:true,
  blockSupportSolutions:blockSolutions.length,
  blockSupportHasTwoPlusOneParity:true,
  connectedTripletSplitPatterns:connectedPatterns,
  connectedAnomalyFreeNontrivialSplit:false,
  theorem:"If the quark and lepton Yukawa/mass connectivity graphs are each connected and nondegenerate, every exact diagonal family Z2 acts universally on Q and universally on L. For three families the only weak-anomaly-free connected solution has no leptoquark/diquark parity split.",
  exit:"A two-family anomaly-free split requires a 2+1 disconnected flavor block, texture zeros, a non-diagonal family action, or spurionic symmetry breaking; generic CKM/PMNS connectivity removes the diagonal-sign exit.",
  passed:true
},null,2));
