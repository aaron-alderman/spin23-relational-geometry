#!/usr/bin/env node

const add=(a,b)=>a.map((r,i)=>r.map((x,j)=>x+b[i][j]));
const sub=(a,b)=>a.map((r,i)=>r.map((x,j)=>x-b[i][j]));
const scale=(k,a)=>a.map(r=>r.map(x=>k*x));
const transpose=a=>a[0].map((_,j)=>a.map(r=>r[j]));
const mul=(a,b)=>a.map(r=>b[0].map((_,j)=>r.reduce((s,x,k)=>s+x*b[k][j],0)));
const equal=(a,b)=>a.every((r,i)=>r.every((x,j)=>x===b[i][j]));
const zero=(n,m=n)=>Array.from({length:n},()=>Array(m).fill(0));
const flat=a=>a.flat();
const I=[[1,0],[0,1]], Z=zero(2);
const block=(a,b,c,d)=>[[...a[0],...b[0]],[...a[1],...b[1]],[...c[0],...d[0]],[...c[1],...d[1]]];
const J=block(Z,I,scale(-1,I),Z);
const rank=rows=>{const a=rows.map(r=>r.map(BigInt));let n=0;for(let c=0;c<a[0].length&&n<a.length;c++){const p=a.findIndex((r,i)=>i>=n&&r[c]!==0n);if(p<0)continue;[a[n],a[p]]=[a[p],a[n]];for(let i=0;i<a.length;i++){if(i===n||a[i][c]===0n)continue;const u=a[n][c],v=a[i][c];a[i]=a[i].map((x,j)=>u*x-v*a[n][j]);}n++;}return n;};

const sym4=[];
for(let i=0;i<4;i++)for(let j=i;j<4;j++){const s=zero(4);s[i][j]=1;s[j][i]=1;sym4.push(s);}
const generators=sym4.map(s=>mul(J,s));
const sp=x=>equal(add(mul(transpose(x),J),mul(J,x)),zero(4));

const A=[[1,2],[0,-1]], B=[[2,1],[1,0]], C=[[0,1],[1,3]];
const K=block(A,B,C,scale(-1,transpose(A)));
const X=[[1,2],[2,-1]];
const riccati=add(sub(sub(C,mul(transpose(A),X)),mul(X,A)),scale(-1,mul(mul(X,B),X)));

// Direct tangent calculation for p=Xq: pdot-X qdot.
const direct=sub(add(C,mul(scale(-1,transpose(A)),X)),mul(X,add(A,mul(B,X))));

const report={
  protocol:"quadratic-hamiltonian-jordan-flow/1",
  hessianBasisDimension:sym4.length,
  generatorRank:rank(generators.map(flat)),
  allGeneratorsSymplectic:generators.every(sp),
  map:"S symmetric -> K=J S in sp(4,R)",
  riccatiFormula:"Xdot=C-A^T X-X A-X B X",
  sampleGeneratorSymplectic:sp(K),
  sampleRiccatiSymmetric:equal(riccati,transpose(riccati)),
  directTangentMatchesRiccati:equal(riccati,direct),
  sampleRiccati:riccati,
};
report.passed=report.hessianBasisDimension===10&&report.generatorRank===10&&report.allGeneratorsSymplectic&&report.sampleGeneratorSymplectic&&report.sampleRiccatiSymmetric&&report.directTangentMatchesRiccati;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
