#!/usr/bin/env node

const z=(re=0,im=0)=>({re,im});
const add=(a,b)=>z(a.re+b.re,a.im+b.im),mul=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),scale=(a,s)=>z(a.re*s,a.im*s),conj=a=>z(a.re,-a.im),abs=a=>Math.hypot(a.re,a.im),cz=x=>typeof x==="number"?z(x):x;
const zeros=(n,m=n)=>Array.from({length:n},()=>Array.from({length:m},()=>z()));
const I=n=>{const A=zeros(n);for(let i=0;i<n;i++)A[i][i]=z(1);return A;};
const mm=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>add(s,mul(cz(x),cz(B[k][j]))),z())));
const madd=(A,B)=>A.map((r,i)=>r.map((x,j)=>add(cz(x),cz(B[i][j]))));
const mscale=(A,s)=>A.map(r=>r.map(x=>mul(cz(x),cz(s))));
const tr=A=>A[0].map((_,j)=>A.map(r=>cz(r[j]))),dag=A=>tr(A).map(r=>r.map(conj));
const inverse=A=>{const n=A.length,M=A.map((r,i)=>[...r.map(cz),...I(n)[i]]);for(let k=0;k<n;k++){let p=k;for(let i=k+1;i<n;i++)if(abs(M[i][k])>abs(M[p][k]))p=i;if(abs(M[p][k])<1e-12)throw Error("singular");[M[k],M[p]]=[M[p],M[k]];const d=M[k][k],di=z(d.re/(d.re*d.re+d.im*d.im),-d.im/(d.re*d.re+d.im*d.im));for(let j=0;j<2*n;j++)M[k][j]=mul(M[k][j],di);for(let i=0;i<n;i++)if(i!==k){const f=M[i][k];for(let j=0;j<2*n;j++)M[i][j]=add(M[i][j],scale(mul(f,M[k][j]),-1));}}return M.map(r=>r.slice(n));};
const maxDiff=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>abs(add(cz(x),scale(cz(B[i][j]),-1))))));
const hermitianImag=A=>mscale(madd(A,mscale(dag(A),z(-1))),z(0,-.5));
const positiveHerm2=A=>A[0][0].re>1e-12&&Math.abs(A[0][0].im)<1e-10&&Math.abs(A[1][1].im)<1e-10&&A[0][0].re*A[1][1].re-abs(A[0][1])**2>1e-12;
const rz=n=>Array.from({length:n},()=>Array(n).fill(0));
const rmm=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s+x*B[k][j],0)));
const coins=angles=>{const C=rz(2*angles.length);angles.forEach((a,n)=>{const c=Math.cos(a),s=Math.sin(a);C[2*n][2*n]=c;C[2*n][2*n+1]=-s;C[2*n+1][2*n]=s;C[2*n+1][2*n+1]=c;});return C;};
const shift=N=>{const S=rz(2*N);for(let n=0;n<N;n++){if(n<N-1)S[2*(n+1)][2*n]=1;else S[2*n+1][2*n]=1;if(n>0)S[2*(n-1)+1][2*n+1]=1;else S[0][2*n+1]=1;}return S;};
const N=6,Ureal=rmm(shift(N),coins(Array.from({length:N},(_,n)=>.28+.17*Math.sin(.63*n)+.04*n))),phaseOrigin=.37;
const rowPhases=Array.from({length:2*N},(_,j)=>phaseOrigin+.09*j+.04*Math.sin(.71*j));
const U=Ureal.map((row,i)=>row.map(x=>mul(z(x),z(Math.cos(rowPhases[i]),Math.sin(rowPhases[i]))))),Id=I(2*N);
const Hc=mm(mscale(madd(Id,U),z(0,1)),inverse(madd(Id,mscale(U,z(-1)))));
const hermitianError=maxDiff(Hc,dag(Hc));
const spectral=z(.23,.37);
const R=inverse(Hc.map((row,i)=>row.map((x,j)=>add(x,i===j?scale(spectral,-1):z()))));
const ports=[0,2*N-1],Zc=ports.map(i=>ports.map(j=>R[i][j])),Yc=hermitianImag(Zc);
const K=Ureal.map((row,i)=>row.map((x,j)=>(x+Ureal[j][i])/2)),Kres=inverse(K.map((row,i)=>row.map((x,j)=>add(z(x),i===j?scale(spectral,-1):z())))),Zs=ports.map(i=>ports.map(j=>Kres[i][j]));
const phases=[-.9,-.3,.3,.9].map(omega=>({omega,cayleyCot:1/Math.tan(omega/2),cosine:Math.cos(omega),principalLog:omega}));
const eps=1e-5;
const report={
  protocol:"cayley-orientation-parent-domain/1",
  quasienergyOriginShift:phaseOrigin,
  orientedRowPhases:rowPhases,
  cayleyHamiltonian:"H_C=i(I+U)(I-U)^-1",
  hermitianError,
  cayleyBoundaryResponse:Zc,
  cayleyTransposeSymmetryError:maxDiff(Zc,tr(Zc)),
  cayleyHermitianImaginaryPart:Yc,
  cayleyImaginaryPositive:positiveHerm2(Yc),
  cosineBoundaryResponse:Zs,
  cosineTransposeSymmetryError:maxDiff(Zs,tr(Zs)),
  phaseMaps:phases,
  singularityComparison:{cayleyNearZero:1/Math.tan(eps/2),cayleyAtPi:1/Math.tan(Math.PI/2),principalLogCut:"discontinuous at plus/minus pi",cosineBounded:[-1,1]},
  domainComparison:{
    orientationCompleteTube:"Herm(2,C)+i Herm_2(C)_+, conformal group SU(2,2), locally Spin_0(2,4)",
    reciprocalSymmetricSlice:"Sym_2(R)+i Sym_2(R)_+, conformal group Sp(4,R), locally Spin_0(2,3)",
    realCarrierDimensions:{parent:4,slice:3},
    conformalDimensions:{parent:15,slice:10,complement:5}
  },
  interpretation:[
    "The Cayley transform is self-adjoint and retains the sign of quasienergy away from its eigenvalue-one pole.",
    "Its two-port retarded resolvent has positive Hermitian imaginary part but is generically not transpose-symmetric.",
    "The natural orientation-complete response therefore belongs to the Herm(2,C) tube domain with SU(2,2) or Spin(2,4) conformal geometry.",
    "The cosine response is transpose-symmetric and lies in the genus-two Siegel domain with Sp(4,R) or Spin(2,3), but identifies omega with minus omega.",
    "A reciprocity or real-structure selector that enforces transpose symmetry is now a precise candidate for the Spin(2,4)-to-Spin(2,3) descent."
  ]
};
report.passed=hermitianError<1e-10&&report.cayleyImaginaryPositive&&report.cayleyTransposeSymmetryError>1e-4&&report.cosineTransposeSymmetryError<1e-10&&
  Math.abs(phases[0].cayleyCot+phases.at(-1).cayleyCot)<1e-12&&report.domainComparison.conformalDimensions.complement===5;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
