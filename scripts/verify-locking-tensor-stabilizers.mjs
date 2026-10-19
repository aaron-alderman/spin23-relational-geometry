#!/usr/bin/env node

const rank=A=>{
  A=A.filter(r=>r.some(x=>x!==0)).map(r=>r.map(Number));
  if(!A.length)return 0;
  let p=0,n=A[0].length;
  for(let c=0;c<n&&p<A.length;c++){
    let q=p;while(q<A.length&&Math.abs(A[q][c])<1e-12)q++;
    if(q===A.length)continue;
    [A[p],A[q]]=[A[q],A[p]];
    const d=A[p][c];for(let j=c;j<n;j++)A[p][j]/=d;
    for(let i=0;i<A.length;i++)if(i!==p&&Math.abs(A[i][c])>1e-12){
      const f=A[i][c];for(let j=c;j<n;j++)A[i][j]-=f*A[p][j];
    }
    p++;
  }
  return p;
};
const matMul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const gram=K=>matMul(transpose(K),K);
const invariants=K=>{
  const G=gram(K),tr=G[0][0]+G[1][1],det=G[0][0]*G[1][1]-G[0][1]*G[1][0];
  return{traceKtK:tr,detKtK:det,discriminant:tr*tr-4*det};
};
// Build the six equations in (wx,wy,wz,b) from A(omega)K-KB(b)=0.
const equations=K=>{
  const basisA=[
    [[0,0,0],[0,0,-1],[0,1,0]],
    [[0,0,1],[0,0,0],[-1,0,0]],
    [[0,-1,0],[1,0,0],[0,0,0]]
  ];
  const B=[[0,-1],[1,0]];
  const cols=[];
  for(const A of basisA)cols.push(matMul(A,K).flat());
  cols.push(matMul(K,B).flat().map(x=>-x));
  return Array.from({length:6},(_,i)=>cols.map(c=>c[i]));
};
const classify=(name,K)=>{
  const r=rank(equations(K));
  return{name,K,invariants:invariants(K),stabilizerLieDimension:4-r,orbitDimension:r};
};
const cases=[
  classify("zero",[[0,0],[0,0],[0,0]]),
  classify("rank-one",[[1,0],[0,0],[0,0]]),
  classify("rank-two isotropic",[[1,0],[0,1],[0,0]]),
  classify("rank-two anisotropic",[[2,0],[0,1],[0,0]])
];
const report={
  protocol:"locking-tensor-stabilizers/1",
  action:"K -> R K S^T for SO(3)_internal x SO(2)_external",
  cases,
  isotropicMeaning:"K^T K=lambda I selects an oriented internal two-frame; KK^T=lambda(I-n n^T) selects its normal.",
  conclusion:[
    "A generic unequal rank-two lock breaks all continuous product symmetry.",
    "The equal-singular-value lock has a one-dimensional diagonal SO(2) stabilizer and a three-dimensional orbit.",
    "Equal singular values are required for a residual continuous U(1)-like symmetry."
  ]
};
report.passed=cases[0].stabilizerLieDimension===4&&cases[1].stabilizerLieDimension===1&&
  cases[2].stabilizerLieDimension===1&&cases[3].stabilizerLieDimension===0&&
  cases[2].invariants.discriminant===0&&cases[3].invariants.discriminant>0;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
