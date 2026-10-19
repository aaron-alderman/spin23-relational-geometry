#!/usr/bin/env node

const zeros=(n,m=n)=>Array.from({length:n},()=>Array(m).fill(0));
const mm=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s+x*B[k][j],0)));
const transpose=A=>A[0].map((_,j)=>A.map(row=>row[j]));
const maxDiff=(A,B)=>Math.max(...A.flatMap((row,i)=>row.map((x,j)=>Math.abs(x-B[i][j]))));
const coinLayer=(N,theta)=>{const C=zeros(2*N),c=Math.cos(theta),s=Math.sin(theta);for(let n=0;n<N;n++){C[2*n][2*n]=c;C[2*n][2*n+1]=-s;C[2*n+1][2*n]=s;C[2*n+1][2*n+1]=c;}return C;};
const reflectingShift=N=>{const S=zeros(2*N);for(let n=0;n<N;n++){
  const r=2*n,l=2*n+1;
  if(n<N-1)S[2*(n+1)][r]=1;else S[2*n+1][r]=1;
  if(n>0)S[2*(n-1)+1][l]=1;else S[0][l]=1;
}return S;};
const identity=n=>{const A=zeros(n);for(let i=0;i<n;i++)A[i][i]=1;return A;};
const inverse=A=>{const n=A.length,M=A.map((r,i)=>[...r,...identity(n)[i]]);for(let k=0;k<n;k++){
  let p=k;for(let i=k+1;i<n;i++)if(Math.abs(M[i][k])>Math.abs(M[p][k]))p=i;
  if(Math.abs(M[p][k])<1e-14)throw new Error("singular");[M[k],M[p]]=[M[p],M[k]];
  const d=M[k][k];for(let j=0;j<2*n;j++)M[k][j]/=d;
  for(let i=0;i<n;i++)if(i!==k){const f=M[i][k];for(let j=0;j<2*n;j++)M[i][j]-=f*M[k][j];}
}return M.map(r=>r.slice(n));};
const sub=(A,rows,cols)=>rows.map(i=>cols.map(j=>A[i][j]));
const schur=(H,boundary)=>{const all=Array.from({length:H.length},(_,i)=>i),interior=all.filter(i=>!boundary.includes(i));const Hbb=sub(H,boundary,boundary),Hbi=sub(H,boundary,interior),Hii=sub(H,interior,interior);const corr=mm(mm(Hbi,inverse(Hii)),transpose(Hbi));return Hbb.map((row,i)=>row.map((x,j)=>x-corr[i][j]));};
const eliminateIndex=(A,k)=>{const keep=Array.from({length:A.length},(_,i)=>i).filter(i=>i!==k),out=zeros(A.length-1);for(let a=0;a<keep.length;a++)for(let b=0;b<keep.length;b++)out[a][b]=A[keep[a]][keep[b]]-A[keep[a]][k]*A[k][keep[b]]/A[k][k];return out;};
const eliminateInterior=(H,boundary,reverse=false)=>{let A=H.map(r=>r.slice()),labels=Array.from({length:H.length},(_,i)=>i);let targets=labels.filter(i=>!boundary.includes(i));if(reverse)targets=targets.reverse();for(const label of targets){const k=labels.indexOf(label);A=eliminateIndex(A,k);labels.splice(k,1);}return boundary.map(i=>boundary.map(j=>A[labels.indexOf(i)][labels.indexOf(j)]));};
const choleskyPositive=A=>{const n=A.length,L=zeros(n);for(let i=0;i<n;i++)for(let j=0;j<=i;j++){let s=A[i][j];for(let k=0;k<j;k++)s-=L[i][k]*L[j][k];if(i===j){if(s<=1e-12)return false;L[i][j]=Math.sqrt(s);}else L[i][j]=s/L[j][j];}return true;};
const data=[];let passed=true;
for(const N of [3,4,6,8])for(const r of [.2,.65,.9])for(const theta of [.11,.47]){
  const U=mm(reflectingShift(N),coinLayer(N,theta)),UtU=mm(transpose(U),U),I=identity(2*N);
  const Q=I.map((row,i)=>row.map((x,j)=>x-r*U[i][j])),H=mm(transpose(Q),Q),boundary=[0,2*N-1],X=schur(H,boundary);
  const det=X[0][0]*X[1][1]-X[0][1]*X[1][0],trace=X[0][0]+X[1][1],disc=Math.sqrt(Math.max(0,(X[0][0]-X[1][1])**2+4*X[0][1]**2)),eig=[(trace-disc)/2,(trace+disc)/2];
  const sewForward=eliminateInterior(H,boundary,false),sewReverse=eliminateInterior(H,boundary,true);
  const row={N,r,theta,orthogonalityError:maxDiff(UtU,I),HPositive:choleskyPositive(H),X,determinant:det,eigenvalues:eig,sewingForwardError:maxDiff(X,sewForward),sewingReverseError:maxDiff(X,sewReverse)};
  row.passed=row.orthogonalityError<1e-12&&row.HPositive&&det>0&&eig[0]>0&&row.sewingForwardError<1e-10&&row.sewingReverseError<1e-10;
  passed&&=row.passed;data.push(row);
}
const report={
  protocol:"walk-two-port-h2r-response/1",
  construction:"H=(I-rU)^T(I-rU), 0<r<1; retain the inward ports R_left and L_right; eliminate all internal amplitudes by Schur complement.",
  data,
  exactStructure:[
    "A real orthogonal finite walk gives a real positive precision matrix H.",
    "Schur complementation preserves positivity, so the two-port response X is in the positive cone of H2(R).",
    "Eliminating internal variables in either order gives the same X, an exact finite sewing property.",
    "The construction depends on r, coin angle, boundary reflection, and port choice; H2(R) positivity alone does not select a unique physical carrier.",
    "No Sp(4,R) action has been derived from walk symmetries; only the candidate cone on which its conformal action could operate has emerged."
  ],
  passed
};
console.log(JSON.stringify(report,null,2));
if(!passed)process.exitCode=1;
