import assert from "node:assert/strict";

const nodes=["L","R","Lc","Rc"];
const edges={
  L:[{to:"R",f:"Sigma"},{to:"Lc",f:"HL"}],
  R:[{to:"L",f:"Sigma†"},{to:"Rc",f:"HR"}],
  Lc:[{to:"L",f:"HL†"},{to:"Rc",f:"SigmaBar"}],
  Rc:[{to:"R",f:"HR†"},{to:"Lc",f:"SigmaBar†"}]
};
const enumerate=n=>{
  const out=[];
  const go=(start,node,word,k)=>{
    if(k===n){if(node===start)out.push(word);return;}
    for(const e of edges[node])go(start,e.to,[...word,e.f],k+1);
  };
  for(const s of nodes)go(s,s,[],0);
  return out;
};
const rotations=xs=>xs.map((_,i)=>[...xs.slice(i),...xs.slice(0,i)]);
const canonical=xs=>rotations(xs).map(x=>x.join(" ")).sort()[0];
const counts=(w,f)=>w.filter(x=>x===f).length;

// After symmetry breaking only H_R/H_R† and Sigma-type factors may be replaced
// by VEVs; H_L has zero VEV. A residual holomorphic H_L H_R bilinear therefore
// requires exactly one HL, no HL†, at least one HR, and all other H edges in R.
const candidate=w=>counts(w,"HL")===1&&counts(w,"HL†")===0&&counts(w,"HR")>=1;
const antiCandidate=w=>counts(w,"HL†")===1&&counts(w,"HL")===0&&counts(w,"HR†")>=1;

const report={};
for(const n of [2,4,6,8]){
  const walks=enumerate(n);
  const c=walks.filter(candidate), a=walks.filter(antiCandidate);
  report[n]={closedWalks:walks.length,candidates:c.length,antiCandidates:a.length,canonicalCandidates:[...new Set(c.map(canonical))]};
}
assert.equal(report[2].candidates,0);
assert.equal(report[4].candidates,0);
assert(report[6].candidates>0);
assert.equal(report[6].canonicalCandidates.length,1);

const first=report[6].canonicalCandidates[0].split(" ");
assert.equal(counts(first,"HL"),1);
assert.equal(counts(first,"HR"),1);
assert.equal(counts(first,"HR†"),2);
assert.equal(first.filter(f=>f.startsWith("Sigma")).length,2);

const phase={HL:2,"HL†":-2,HR:2,"HR†":-2,Sigma:0,"Sigma†":0,SigmaBar:0,"SigmaBar†":0};
assert.equal(first.reduce((s,f)=>s+phase[f],0),0);

const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A.reduce((s,r,i)=>s+r[i],0);
const anti=entries=>{const A=Array.from({length:4},()=>Array(4).fill(0));for(const [i,j,x] of entries){A[i][j]=x;A[j][i]=-x;}return A;};
const AL=anti([[0,1,2],[0,2,-1],[0,3,3],[1,2,4],[1,3,-2],[2,3,5]]);
const AR=anti([[0,1,-3],[0,2,2],[0,3,1],[1,2,-4],[1,3,6],[2,3,2]]);
const outer=v=>v.map(x=>v.map(y=>x*y));
const S1=outer([0,0,0,1]);
const Sg=[[2,1,0,1],[1,3,2,0],[0,2,5,-1],[1,0,-1,4]];
const D=[[2,0,0,0],[0,2,0,0],[0,0,2,0],[0,0,0,-3]];
const evalResidual=(word,S,chosenHR)=>{
  let seen=-1;
  const mats=word.map(f=>{
    if(f==="HL")return AL;
    if(f==="HR"){seen++;return seen===chosenHR?AR:S;}
    if(f==="HR†")return S;
    return D;
  });
  return tr(mats.slice(1).reduce((P,M)=>mm(P,M),mats[0]));
};
const componentAudit={};
for(const n of [6,8])componentAudit[n]=report[n].canonicalCandidates.map(word=>{
  const xs=word.split(" "), k=counts(xs,"HR");
  return {word,rankOne:Array.from({length:k},(_,i)=>evalResidual(xs,S1,i)),generic:Array.from({length:k},(_,i)=>evalResidual(xs,Sg,i))};
});
assert(componentAudit[6].flatMap(x=>x.rankOne).every(x=>x===0));
assert(componentAudit[6].flatMap(x=>x.generic).some(x=>x!==0));
assert(componentAudit[8].flatMap(x=>x.rankOne).every(x=>x===0));

console.log(JSON.stringify({
  protocol:"first-higher-spectral-holomorphic-cross-six-path/1",
  scan:report,
  firstOrder:6,
  firstCanonicalWord:first.join(" "),
  residualInterpretation:"choose the single HL and HR as six fields; replace the two HR† factors by conjugate right-ten rank-one VEVs and the two Sigma factors by neutral vacua",
  componentAudit,
  suppression:"appears first in the a6 / Lambda^2 part of a four-dimensional spectral-action expansion, not in the renormalizable a4 scalar potential",
  theorem:"The minimal finite graph excludes a VEV-reduced holomorphic H_L H_R bilinear through length four and admits its first graph-theoretic candidate at length six. The SU(4) matrix contraction of every canonical candidate through length eight vanishes for a rank-one right-ten VEV and colour-preserving diagonal Sigma, while a generic symmetric ten spurion reopens the length-six channel.",
  boundary:"The component audit proves an SU(4)-factor zero for the stated rank-one/diagonal vacuum and selected bilinear through length eight. It is not an all-orders proof, does not enumerate independent index contractions beyond the spectral matrix word, and does not include loop counterterms.",
  passed:true
},null,2));
