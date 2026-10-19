#!/usr/bin/env node

const z=(re=0,im=0)=>({re,im});
const add=(a,b)=>z(a.re+b.re,a.im+b.im),mul=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),scale=(a,s)=>z(a.re*s,a.im*s),conj=a=>z(a.re,-a.im),abs=a=>Math.hypot(a.re,a.im);
const cz=x=>typeof x==="number"?z(x):x;
const zeros=(n,m=n)=>Array.from({length:n},()=>Array.from({length:m},()=>z()));
const mm=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>add(s,mul(cz(x),cz(B[k][j]))),z())));
const tr=A=>A[0].map((_,j)=>A.map(r=>cz(r[j])));
const madd=(A,B)=>A.map((r,i)=>r.map((x,j)=>add(cz(x),cz(B[i][j]))));
const mscale=(A,s)=>A.map(r=>r.map(x=>mul(cz(x),cz(s))));
const ident=n=>{const A=zeros(n);for(let i=0;i<n;i++)A[i][i]=z(1);return A;};
const inverse=A=>{const n=A.length,M=A.map((r,i)=>[...r.map(cz),...ident(n)[i]]);for(let k=0;k<n;k++){let p=k;for(let i=k+1;i<n;i++)if(abs(M[i][k])>abs(M[p][k]))p=i;if(abs(M[p][k])<1e-13)throw Error("singular");[M[k],M[p]]=[M[p],M[k]];const d=M[k][k],di=z(d.re/(d.re*d.re+d.im*d.im),-d.im/(d.re*d.re+d.im*d.im));for(let j=0;j<2*n;j++)M[k][j]=mul(M[k][j],di);for(let i=0;i<n;i++)if(i!==k){const f=M[i][k];for(let j=0;j<2*n;j++)M[i][j]=add(M[i][j],scale(mul(f,M[k][j]),-1));}}return M.map(r=>r.slice(n));};
const maxDiff=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>abs(add(cz(x),scale(cz(B[i][j]),-1))))));
const realMatrix=A=>A.map(r=>r.map(cz));
const block=(A,B,C,D)=>[...[0,1].map(i=>[...A[i],...B[i]]),...[0,1].map(i=>[...C[i],...D[i]])];
const action=(M,X)=>{const A=realMatrix(M.slice(0,2).map(r=>r.slice(0,2))),B=realMatrix(M.slice(0,2).map(r=>r.slice(2))),C=realMatrix(M.slice(2).map(r=>r.slice(0,2))),D=realMatrix(M.slice(2).map(r=>r.slice(2)));return mm(madd(mm(A,X),B),inverse(madd(mm(C,X),D)));};
const imag=A=>A.map(r=>r.map(x=>cz(x).im));
const positive2=A=>A[0][0]>1e-12&&A[0][0]*A[1][1]-A[0][1]*A[1][0]>1e-12;

const rz=n=>Array.from({length:n},()=>Array(n).fill(0));
const rmm=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s+x*B[k][j],0)));
const rtr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const coins=angles=>{const C=rz(2*angles.length);angles.forEach((a,n)=>{const c=Math.cos(a),s=Math.sin(a);C[2*n][2*n]=c;C[2*n][2*n+1]=-s;C[2*n+1][2*n]=s;C[2*n+1][2*n+1]=c;});return C;};
const shift=N=>{const S=rz(2*N);for(let n=0;n<N;n++){if(n<N-1)S[2*(n+1)][2*n]=1;else S[2*n+1][2*n]=1;if(n>0)S[2*(n-1)+1][2*n+1]=1;else S[0][2*n+1]=1;}return S;};
const N=7,U=rmm(shift(N),coins(Array.from({length:N},(_,n)=>.13+.21*Math.sin(.4*n)))),K=U.map((row,i)=>row.map((x,j)=>(x+U[j][i])/2));
const spectral=z(.17,.43),A=realMatrix(K).map((row,i)=>row.map((x,j)=>add(x,i===j?scale(spectral,-1):z()))),R=inverse(A),ports=[0,2*N-1],Z=ports.map(i=>ports.map(j=>R[i][j]));
const y=spectral.im,Kx=K.map((row,i)=>row.map((v,j)=>v-(i===j?spectral.re:0))),Kx2=rmm(Kx,Kx),P=Kx2.map((row,i)=>row.map((v,j)=>v+(i===j?y*y:0)));
const rinv=M=>inverse(realMatrix(M)).map(r=>r.map(x=>x.re));
const predictedImag=ports.map(i=>ports.map(j=>y*rinv(P)[i][j]));
const I2=[[1,0],[0,1]],O2=[[0,0],[0,0]],G=[[1.2,.1],[-.2,.9]],GinvT=rtr(rinv(G)),Bs=[[.2,-.1],[-.1,.3]],Cs=[[-.15,.07],[.07,.11]];
const gens={linear:block(G,O2,O2,GinvT),upper:block(I2,Bs,O2,I2),lower:block(I2,O2,Cs,I2),fourier:block(O2,[[-1,0],[0,-1]],I2,O2)};
const transformed=Object.fromEntries(Object.entries(gens).map(([name,M])=>{const W=action(M,Z);return [name,{symmetryError:maxDiff(W,tr(W)),imaginaryPart:imag(W),imaginaryPositive:positive2(imag(W))}];}));
const report={
  protocol:"walk-siegel-resolvent-sp4-action/1",
  selfAdjointWalkVariable:"K=(U+U^T)/2",
  spectralParameter:spectral,
  boundaryResolvent:Z,
  symmetryError:maxDiff(Z,tr(Z)),
  imaginaryPart:imag(Z),
  imaginaryPositive:positive2(imag(Z)),
  resolventImaginaryIdentityError:maxDiff(realMatrix(imag(Z)),realMatrix(predictedImag)),
  transformed,
  informationLoss:{
    statement:"K records cos(quasienergy) and identifies omega with -omega.",
    consequence:"The Siegel response is causal/positive but does not retain the full orientation of the unitary Floquet spectrum."
  },
  interpretation:[
    "The compressed resolvent of the real symmetric walk variable K is a complex symmetric two-port matrix with positive imaginary part for Im(zeta)>0.",
    "This places the response in the genus-two Siegel upper half-space, the natural domain of the full Sp(4,R) fractional action.",
    "Explicit symplectic generators preserve symmetry and positive imaginary part.",
    "The construction is canonical once K and the ports are chosen, but choosing K=(U+U^T)/2 discards quasienergy orientation and is not yet forced by the microscopic theory."
  ]
};
report.passed=report.symmetryError<1e-12&&report.imaginaryPositive&&report.resolventImaginaryIdentityError<1e-11&&Object.values(transformed).every(x=>x.symmetryError<1e-11&&x.imaginaryPositive);
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
