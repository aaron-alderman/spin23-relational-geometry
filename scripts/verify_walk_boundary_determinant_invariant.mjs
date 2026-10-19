#!/usr/bin/env node

const zeros=(n,m=n)=>Array.from({length:n},()=>Array(m).fill(0));
const mm=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const I=n=>{const A=zeros(n);for(let i=0;i<n;i++)A[i][i]=1;return A;};
const inv=A=>{const n=A.length,M=A.map((r,i)=>[...r,...I(n)[i]]);for(let k=0;k<n;k++){let p=k;for(let i=k+1;i<n;i++)if(Math.abs(M[i][k])>Math.abs(M[p][k]))p=i;[M[k],M[p]]=[M[p],M[k]];const d=M[k][k];if(Math.abs(d)<1e-14)throw Error("singular");for(let j=0;j<2*n;j++)M[k][j]/=d;for(let i=0;i<n;i++)if(i!==k){const f=M[i][k];for(let j=0;j<2*n;j++)M[i][j]-=f*M[k][j];}}return M.map(r=>r.slice(n));};
const sub=(A,rs,cs)=>rs.map(i=>cs.map(j=>A[i][j]));
const response=(H,B)=>{const all=Array.from({length:H.length},(_,i)=>i),J=all.filter(i=>!B.includes(i)),bb=sub(H,B,B),bi=sub(H,B,J),corr=mm(mm(bi,inv(sub(H,J,J))),tr(bi));return bb.map((r,i)=>r.map((x,j)=>x-corr[i][j]));};
const det2=X=>X[0][0]*X[1][1]-X[0][1]*X[1][0];
const coins=angles=>{const C=zeros(2*angles.length);angles.forEach((a,n)=>{const c=Math.cos(a),s=Math.sin(a);C[2*n][2*n]=c;C[2*n][2*n+1]=-s;C[2*n+1][2*n]=s;C[2*n+1][2*n+1]=c;});return C;};
const shift=N=>{const S=zeros(2*N);for(let n=0;n<N;n++){if(n<N-1)S[2*(n+1)][2*n]=1;else S[2*n+1][2*n]=1;if(n>0)S[2*(n-1)+1][2*n+1]=1;else S[0][2*n+1]=1;}return S;};
const precision=(N,r,angles)=>{const U=mm(shift(N),coins(angles)),Q=I(2*N).map((row,i)=>row.map((x,j)=>x-r*U[i][j]));return mm(tr(Q),Q);};
const data=[];let maximumHomogeneousError=0,maximumHeterogeneousDeviation=0;
for(const N of [2,3,5,7,10])for(const r of [.07,.31,.72,.94]){
  const angleFamilies=[Array.from({length:N},(_,n)=>.23),Array.from({length:N},(_,n)=>.11+.37*Math.sin(.73*n)),Array.from({length:N},(_,n)=>-.42+.19*Math.cos(.29*n*n))];
  for(let family=0;family<angleFamilies.length;family++){
    const H=precision(N,r,angleFamilies[family]),expected=(1-r*r)**2;
    const inward=det2(response(H,[0,2*N-1])),outward=det2(response(H,[1,2*N-2])),sameSide=det2(response(H,[0,1]));
    const error=Math.abs(inward-expected);
    if(family===0)maximumHomogeneousError=Math.max(maximumHomogeneousError,error);else maximumHeterogeneousDeviation=Math.max(maximumHeterogeneousDeviation,error);
    data.push({N,r,family,inwardDeterminant:inward,expected,error,outwardDeterminant:outward,sameSideDeterminant:sameSide});
  }
}
const scaleTests=[.4,1.3,2.1].map(s=>{const N=6,r=.61,H=precision(N,r,Array.from({length:N},(_,n)=>.2+.1*n)),X=response(H,[0,2*N-1]);const original=det2(X),rescaled=X.map((row,i)=>row.map((x,j)=>x/(s*s)));return {commonPortCoordinateScale:s,originalDeterminant:original,rescaledDeterminant:det2(rescaled),expected:original/s**4};});
const report={
  protocol:"walk-boundary-determinant-invariant/1",
  testedFamily:"reflecting nearest-neighbor walk with arbitrary site-dependent SO(2) coins; inward ports R_left and L_right",
  homogeneousLaw:"det X=(1-r^2)^2 for the tested spatially homogeneous SO(2) coin family",
  maximumHomogeneousError,
  maximumHeterogeneousDeviation,
  data,
  scaleTests,
  scope:[
    "The determinant law survives all tested lengths and uniform coin angles at machine precision.",
    "Heterogeneous site coins violate the law, so it is not a universal interior-independent invariant.",
    "Alternative outgoing or same-side port pairs do not generally share the same determinant, so the inward-port orientation matters.",
    "A common rescaling of boundary coordinates changes det X by the inverse fourth power; the numerical scale is not canonical until port normalization is fixed.",
    "The homogeneous identity motivates a transfer/continuant proof, but heterogeneity already falsifies its promotion to an arbitrary-walk theorem."
  ]
};
report.passed=maximumHomogeneousError<1e-10&&maximumHeterogeneousDeviation>1e-3&&scaleTests.every(x=>Math.abs(x.rescaledDeterminant-x.expected)<1e-10);
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
