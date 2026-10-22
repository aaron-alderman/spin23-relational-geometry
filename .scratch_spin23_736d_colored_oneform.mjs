import assert from "node:assert/strict";

const units=(rows,cols)=>{
  const out=[];
  for(let i=0;i<rows;i++)for(let j=0;j<cols;j++){
    const M=Array.from({length:rows},()=>Array(cols).fill(0));
    M[i][j]=1;out.push(M);
  }
  return out;
};
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const scale=(c,A)=>A.map(r=>r.map(x=>c*x));
const flat=A=>A.flat();
const rank=rows=>{
  const A=rows.map(r=>r.slice());let q=0;
  for(let j=0;j<(A[0]?.length||0)&&q<A.length;j++){
    const p=A.findIndex((r,i)=>i>=q&&Math.abs(r[j])>1e-10);
    if(p<0)continue;[A[q],A[p]]=[A[p],A[q]];const x=A[q][j];A[q]=A[q].map(v=>v/x);
    for(let i=0;i<A.length;i++)if(i!==q&&Math.abs(A[i][j])>1e-10){const y=A[i][j];A[i]=A[i].map((v,k)=>v-y*A[q][k]);}
    q++;
  }
  return q;
};

// Colored rectangle H_(5,2) -> H_(1,2): K maps C^3 -> C^2.
const K=[[1,0,0],[0,0,0]];
const orbit=[];
for(const A of units(2,2))for(const B of units(3,3))orbit.push(flat(mm(mm(A,K),B)));
const bifundamentalRank=rank(orbit);
assert.equal(bifundamentalRank,6);

// Two identical occurrence copies: the algebra acts trivially on copy space,
// so every one-form is Phi tensor y for one fixed Dirac/Yukawa vector y.
const y=[2,3];
const locked=orbit.map(v=>y.flatMap(c=>v.map(x=>c*x)));
assert.equal(rank(locked),6);

// If an enlarged algebra has copy projectors, the two copies fluctuate independently.
const independent=[];
for(const v of orbit){independent.push([...v,...Array(6).fill(0)]);independent.push([...Array(6).fill(0),...v]);}
assert.equal(rank(independent),12);

console.log(JSON.stringify({
  protocol:"spin23-736d-colored-bifundamental-oneform-copy-lock/1",
  rectangle:"H_(5,2) -> H_(1,2), shared right endpoint 2",
  complexifiedEndpointAlgebras:{source:"M_3(C)",target:"M_2(C)"},
  seed:K,
  oneFormSpan:"span{A K B : A in M_2(C), B in M_3(C)}",
  bifundamentalComplexDimension:bifundamentalRank,
  identicalCopyModel:{copies:2,fixedMultiplicityVector:y,oneFormComplexDimension:rank(locked)},
  copyDistinguishingExtension:{copies:2,oneFormComplexDimension:rank(independent)},
  orderOne:"The block is right-linear on the shared V_2^* factor, so [[D,L(a)],R(b)]=0.",
  conclusion:"Full matrix endpoint actions generate exactly one (2,anti-3) bifundamental multiplet. Repeated identical occurrences do not multiply the field count unless the represented algebra distinguishes copy space.",
  passed:true
},null,2));
