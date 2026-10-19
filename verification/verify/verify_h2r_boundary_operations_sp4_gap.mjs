#!/usr/bin/env node

const zeros=(n,m=n)=>Array.from({length:n},()=>Array(m).fill(0));
const I=n=>{const A=zeros(n);for(let i=0;i<n;i++)A[i][i]=1;return A;};
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mm=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(A,s)=>A.map(r=>r.map(x=>s*x));
const maxDiff=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.abs(x-B[i][j]))));
const block=(A,B,C,D)=>[...[0,1].map(i=>[...A[i],...B[i]]),...[0,1].map(i=>[...C[i],...D[i]])];
const inv2=A=>{const d=A[0][0]*A[1][1]-A[0][1]*A[1][0];return [[A[1][1]/d,-A[0][1]/d],[-A[1][0]/d,A[0][0]/d]];};
const action=(M,X)=>{const A=M.slice(0,2).map(r=>r.slice(0,2)),B=M.slice(0,2).map(r=>r.slice(2)),C=M.slice(2).map(r=>r.slice(0,2)),D=M.slice(2).map(r=>r.slice(2));return mm(add(mm(A,X),B),inv2(add(mm(C,X),D)));};
const J=block(zeros(2),I(2),scale(I(2),-1),zeros(2));
const symplecticError=M=>maxDiff(mm(mm(tr(M),J),M),J);
const G=[[1.3,.2],[-.1,.8]],GinvT=tr(inv2(G));
const B=[[.4,-.2],[-.2,.7]],C=[[-.3,.1],[.1,.2]];
const upper=block(I(2),B,zeros(2),I(2)),lower=block(I(2),zeros(2),C,I(2)),linear=block(G,zeros(2),zeros(2),GinvT),fourier=block(zeros(2),scale(I(2),-1),I(2),zeros(2));
const generators={linear,upper,lower,fourier};
const X=[[2,.3],[.3,1.1]];
const actions=Object.fromEntries(Object.entries(generators).map(([name,M])=>[name,{symplecticError:symplecticError(M),image:action(M,X),symmetryError:maxDiff(action(M,X),tr(action(M,X)))}]));
const basis=[];
for(let i=0;i<2;i++)for(let j=0;j<2;j++){const a=zeros(2);a[i][j]=1;basis.push(block(a,zeros(2),zeros(2),scale(tr(a),-1)));}
for(const [i,j] of [[0,0],[0,1],[1,1]]){const b=zeros(2);b[i][j]=b[j][i]=1;basis.push(block(zeros(2),b,zeros(2),zeros(2)));}
for(const [i,j] of [[0,0],[0,1],[1,1]]){const c=zeros(2);c[i][j]=c[j][i]=1;basis.push(block(zeros(2),zeros(2),c,zeros(2)));}
const flatten=A=>A.flat();
const rank=rows=>{const A=rows.map(r=>r.slice());let rank=0;for(let col=0;col<A[0].length&&rank<A.length;col++){let p=rank;for(let i=rank+1;i<A.length;i++)if(Math.abs(A[i][col])>Math.abs(A[p][col]))p=i;if(Math.abs(A[p][col])<1e-12)continue;[A[rank],A[p]]=[A[p],A[rank]];const d=A[rank][col];for(let j=col;j<A[0].length;j++)A[rank][j]/=d;for(let i=0;i<A.length;i++)if(i!==rank){const f=A[i][col];for(let j=col;j<A[0].length;j++)A[i][j]-=f*A[rank][j];}rank++;}return rank;};
const negativeTranslation=action(block(I(2),scale(I(2),-2),zeros(2),I(2)),I(2));
const inversionImage=action(fourier,I(2));
const positiveTranslation=action(block(I(2),I(2),zeros(2),I(2)),I(2));
const det2=A=>A[0][0]*A[1][1]-A[0][1]*A[1][0];
const positive2=A=>A[0][0]>0&&det2(A)>0;
const report={
  protocol:"h2r-boundary-operations-sp4-gap/1",
  actions,
  lieAlgebra:{aBlockDimensions:4,symmetricB:3,symmetricC:3,totalBasis:basis.length,computedRank:rank(basis.map(flatten))},
  positivityTests:{
    congruenceImage:actions.linear.image,congruencePositive:positive2(actions.linear.image),
    positiveTranslation,positiveTranslationPositive:positive2(positiveTranslation),
    negativeTranslation,negativeTranslationPositive:positive2(negativeTranslation),
    inversionImage,inversionPositive:positive2(inversionImage)
  },
  classification:[
    "GL(2,R) boundary-coordinate changes act by congruence and preserve the positive cone.",
    "Positive-semidefinite boundary additions preserve positivity but form a semigroup because their inverses need not preserve the cone.",
    "Arbitrary symmetric translations, lower shears, and inversion combine with congruences to span the 10-dimensional Sp(4,R) conformal algebra.",
    "The full conformal group acts on the compactified Jordan algebra or Siegel domain; it does not preserve every point of the real positive cone under every group element.",
    "A passive positive walk response therefore supplies a cone and restricted semigroup, not automatically the full Sp(4,R) physical symmetry."
  ]
};
report.passed=Object.values(actions).every(x=>x.symplecticError<1e-12&&x.symmetryError<1e-12)&&report.lieAlgebra.computedRank===10&&
  report.positivityTests.congruencePositive&&report.positivityTests.positiveTranslationPositive&&!report.positivityTests.negativeTranslationPositive&&!report.positivityTests.inversionPositive;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
