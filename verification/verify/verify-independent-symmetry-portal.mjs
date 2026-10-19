#!/usr/bin/env node

// Unknown bilinear matrix M has shape 3 x 4:
// external coordinates (trace,x,z), internal coordinates (trace,a,b,c).
const n=12;
const idx=(i,j)=>4*i+j;
const rows=[];
const addEquation=coeff=>rows.push(coeff);
const zeroRow=()=>Array(n).fill(0);
const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const E=[
  [0,0,0],
  [0,0,-1],
  [0,1,0]
];
const Jx=[
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,-1],
  [0,0,1,0]
];
const Jy=[
  [0,0,0,0],
  [0,0,0,1],
  [0,0,0,0],
  [0,-1,0,0]
];
const Jz=[
  [0,0,0,0],
  [0,0,-1,0],
  [0,1,0,0],
  [0,0,0,0]
];
// External invariance E^T M=0.
const Et=transpose(E);
for(let i=0;i<3;i++)for(let j=0;j<4;j++){
  const row=zeroRow();
  for(let k=0;k<3;k++)row[idx(k,j)]+=Et[i][k];
  addEquation(row);
}
// Internal invariance M J=0 for all three so(3) generators.
for(const J of [Jx,Jy,Jz])for(let i=0;i<3;i++)for(let j=0;j<4;j++){
  const row=zeroRow();
  for(let k=0;k<4;k++)row[idx(i,k)]+=J[k][j];
  addEquation(row);
}
const rank=A=>{
  A=A.filter(r=>r.some(x=>x!==0)).map(r=>r.slice());
  let pivot=0;
  for(let col=0;col<n&&pivot<A.length;col++){
    let p=pivot;while(p<A.length&&A[p][col]===0)p++;
    if(p===A.length)continue;
    [A[pivot],A[p]]=[A[p],A[pivot]];
    const d=A[pivot][col];for(let j=col;j<n;j++)A[pivot][j]/=d;
    for(let i=0;i<A.length;i++)if(i!==pivot&&A[i][col]!==0){
      const f=A[i][col];for(let j=col;j<n;j++)A[i][j]-=f*A[pivot][j];
    }
    pivot++;
  }
  return pivot;
};
const r=rank(rows),nullity=n-r;
const traceTrace=Array(n).fill(0);traceTrace[idx(0,0)]=1;
const satisfies=v=>rows.every(row=>row.reduce((s,x,i)=>s+x*v[i],0)===0);
const report={
  protocol:"independent-symmetry-bilinear-portal/1",
  externalRepresentation:"H2(R)=1+2 under its connected automorphism SO(2)",
  internalRepresentation:"H2(C)=1+3 under SU(2)/SO(3) conjugation",
  bilinearCoefficientCount:n,
  constraintRank:r,
  invariantSpaceDimension:nullity,
  invariantBasis:["tr(X_ext) tr(H_int)"],
  traceTraceSatisfiesAllGenerators:satisfies(traceTrace),
  conclusion:[
    "Independent external and internal symmetry permits exactly one bilinear portal, the product of traces.",
    "No traceless cross-coupling is invariant without an additional locking tensor or subgroup identification.",
    "The symmetry-safe portal preserves internal complex phases but has no power to select the internal H2(R) real form."
  ]
};
report.passed=r===11&&nullity===1&&report.traceTraceSatisfiesAllGenerators;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
