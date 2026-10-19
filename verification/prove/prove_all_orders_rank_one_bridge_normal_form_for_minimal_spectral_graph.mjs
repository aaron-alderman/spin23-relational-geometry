import assert from "node:assert/strict";

const nodes=["L","R","Lc","Rc"];
const edges={
  L:[{to:"R",f:"Sigma"},{to:"Lc",f:"HL"}],
  R:[{to:"L",f:"Sigma†"},{to:"Rc",f:"HR"}],
  Lc:[{to:"L",f:"HL†"},{to:"Rc",f:"SigmaBar"}],
  Rc:[{to:"R",f:"HR†"},{to:"Lc",f:"SigmaBar†"}]
};
const count=(w,f)=>w.reduce((n,x)=>n+Number(x===f),0);
const candidate=w=>count(w,"HL")===1&&count(w,"HL†")===0&&count(w,"HR")>=1;
const alternatingBridgeSequence=seq=>seq.length>=3&&seq[0]==="HR†"&&seq.at(-1)==="HR†"&&seq.every((x,i)=>x===(i%2===0?"HR†":"HR"));
const cutAtHL=w=>{const i=w.indexOf("HL");return [...w.slice(i),...w.slice(0,i)];};

const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A.reduce((s,r,i)=>s+r[i],0);
const anti=entries=>{const A=Array.from({length:4},()=>Array(4).fill(0));for(const [i,j,x] of entries){A[i][j]=x;A[j][i]=-x;}return A;};
const diag=xs=>xs.map((x,i)=>xs.map((_,j)=>i===j?x:0));
const AL=anti([[0,1,2],[0,2,-1],[0,3,3],[1,2,4],[1,3,-2],[2,3,5]]);
const AR=anti([[0,1,-3],[0,2,2],[0,3,1],[1,2,-4],[1,3,6],[2,3,2]]);
const v=[0,0,0,1];
const P=v.map(x=>v.map(y=>x*y));
const D=diag([2,3,5,-7]);
const DB=diag([11,13,17,19]);
const matrixFor=(f,chosen,seen)=>{
  if(f==="HL")return [AL,seen];
  if(f==="HR"){const next=seen+1;return [next===chosen?AR:P,next];}
  if(f==="HR†")return [P,seen];
  if(f==="Sigma"||f==="Sigma†")return [D,seen];
  return [DB,seen];
};
const evaluate=(word,chosen)=>{
  let seen=-1;const mats=[];
  for(const f of word){const [M,s]=matrixFor(f,chosen,seen);mats.push(M);seen=s;}
  return tr(mats.slice(1).reduce((Q,M)=>mm(Q,M),mats[0]));
};

const scans={};
for(const length of [2,4,6,8,10,12,14,16]){
  let closed=0,candidates=0,selections=0;
  const go=(start,node,word,k)=>{
    if(k===length){
      if(node!==start)return;
      closed++;
      if(!candidate(word))return;
      candidates++;
      const normal=cutAtHL(word);
      const seq=normal.filter(f=>f==="HR"||f==="HR†");
      assert(alternatingBridgeSequence(seq));
      const n=count(normal,"HR");
      for(let i=0;i<n;i++){assert.equal(evaluate(normal,i),0);selections++;}
      return;
    }
    for(const e of edges[node])go(start,e.to,[...word,e.f],k+1);
  };
  for(const s of nodes)go(s,s,[],0);
  scans[length]={closed,candidates,retainedRightSixSelections:selections};
}
assert.equal(scans[4].candidates,0);
assert(scans[6].candidates>0);
assert(scans[16].retainedRightSixSelections>0);

// Algebraic kernel used by the proof.
assert.equal(tr(mm(mm(P,AR),P)),0);
assert.deepEqual(mm(D,P),mm(P,D));
assert.deepEqual(mm(DB,P),mm(P,DB));

console.log(JSON.stringify({
  protocol:"all-orders-rank-one-bridge-normal-form/1",
  scannedLengths:scans,
  graphLemma:"Deleting the unique HL edge leaves the tree Lc--Rc--R--L. The R--Rc bridge crossings in any path from Lc to L therefore alternate, start with HR† and end with HR†.",
  operatorLemma:"Every retained HR six lies between two HR† rank-one projectors. Excursions between successive bridge crossings remain on one component of the cut tree and evaluate to maps preserving the vacuum line when Sigma and SigmaBar do.",
  kernelIdentity:"P_v M_left A_R M_right P_v = 0 whenever M_left and M_right preserve span(v), because v^T A_R v = 0.",
  scanResult:"Every candidate and every retained-HR choice through length 16 evaluates to zero for independent diagonal Sigma/SigmaBar transports.",
  theorem:"At every spectral word length in the minimal four-sector graph, a VEV reduction with exactly one H_L six, one H_R six, no left-H VEV, one rank-one right-ten vacuum line and line-preserving Sigma transports has zero holomorphic cross-six coefficient.",
  boundary:"This is an all-orders theorem for the bare spectral matrix-word algebra under the stated vacuum hypotheses. It does not constrain nonminimal finite-Dirac edges, multiple breaking lines, line-rotating vacua, independent gauge-invariant counterterms, or quantum corrections outside the spectral-action boundary condition.",
  passed:true
},null,2));
