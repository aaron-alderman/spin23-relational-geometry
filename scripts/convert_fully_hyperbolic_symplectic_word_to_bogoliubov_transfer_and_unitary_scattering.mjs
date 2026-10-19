import assert from 'node:assert/strict';

const z=(re=0,im=0)=>({re,im});
const add=(a,b)=>z(a.re+b.re,a.im+b.im), sub=(a,b)=>z(a.re-b.re,a.im-b.im);
const mulz=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const divz=(a,b)=>{const d=b.re*b.re+b.im*b.im;return z((a.re*b.re+a.im*b.im)/d,(a.im*b.re-a.re*b.im)/d);};
const neg=a=>z(-a.re,-a.im), conj=a=>z(a.re,-a.im), abs2=a=>a.re*a.re+a.im*a.im;
const Z=(r,c)=>Array.from({length:r},()=>Array.from({length:c},()=>z()));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>z(i===j?1:0)));
const madd=(A,B)=>A.map((r,i)=>r.map((x,j)=>add(x,B[i][j])));
const msub=(A,B)=>A.map((r,i)=>r.map((x,j)=>sub(x,B[i][j])));
const mmul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mulz(x,B[k][j])),z())));
const dag=A=>A[0].map((_,j)=>A.map(r=>conj(r[j])));
const trans=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const cconj=A=>A.map(r=>r.map(conj));
const scale=(a,A)=>A.map(r=>r.map(x=>mulz(a,x)));
const maxerr=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.hypot(x.re-B[i][j].re,x.im-B[i][j].im))));
const block=(a,b,c,d)=>[[...a[0],...b[0]],[...a[1],...b[1]],[...c[0],...d[0]],[...c[1],...d[1]]];
const inv2=A=>{const det=sub(mulz(A[0][0],A[1][1]),mulz(A[0][1],A[1][0]));return [[divz(A[1][1],det),divz(neg(A[0][1]),det)],[divz(neg(A[1][0]),det),divz(A[0][0],det)]];};
const real=A=>A.map(r=>r.map(x=>z(x,0)));
const toJSON=A=>A.map(r=>r.map(x=>({re:+x.re.toFixed(12),im:+x.im.toFixed(12)})));

const N=[[1,0,-1,1],[0,0,0,1],[-1,0,2,-1],[0,-1,-1,4]];
const A=N.slice(0,2).map(r=>r.slice(0,2)),B=N.slice(0,2).map(r=>r.slice(2,4));
const C=N.slice(2,4).map(r=>r.slice(0,2)),D=N.slice(2,4).map(r=>r.slice(2,4));
const half=z(.5,0),ihalf=z(0,.5);
const alpha=madd(scale(half,real(A.map((r,i)=>r.map((x,j)=>x+D[i][j])))),scale(ihalf,real(C.map((r,i)=>r.map((x,j)=>x-B[i][j])))));
const beta=madd(scale(half,real(A.map((r,i)=>r.map((x,j)=>x-D[i][j])))),scale(ihalf,real(C.map((r,i)=>r.map((x,j)=>x+B[i][j])))));
assert.ok(maxerr(msub(mmul(alpha,dag(alpha)),mmul(beta,dag(beta))),eye(2))<1e-10);
assert.ok(maxerr(mmul(alpha,trans(beta)),mmul(beta,trans(alpha)))<1e-10);
const T=block(alpha,beta,cconj(beta),cconj(alpha));
const Sigma=[[z(1),z(),z(),z()],[z(),z(1),z(),z()],[z(),z(),z(-1),z()],[z(),z(),z(),z(-1)]];
assert.ok(maxerr(mmul(mmul(dag(T),Sigma),T),Sigma)<1e-10);

// Transfer convention: [out_R; in_R] = T [in_L; out_L].
const a=alpha,b=beta,c=cconj(beta),d=cconj(alpha),di=inv2(d);
const S11=scale(z(-1),mmul(di,c)),S12=di;
const S21=msub(a,mmul(mmul(b,di),c)),S22=mmul(b,di);
const S=block(S11,S12,S21,S22);
assert.ok(maxerr(mmul(dag(S),S),eye(4))<1e-10);
const betaFrobenius2=beta.flat().reduce((s,x)=>s+abs2(x),0);
assert.ok(betaFrobenius2>0);

console.log(JSON.stringify({
  protocol:'hyperbolic-symplectic-to-bogoliubov-transfer-scattering/1',
  realSymplecticWord:N,
  complexPolarization:'a=(q+i p)/sqrt(2)',
  alpha:toJSON(alpha),
  beta:toJSON(beta),
  betaFrobeniusSquared:betaFrobenius2,
  bogoliubovIdentities:{alphaAlphaMinusBetaBeta:'I',alphaBetaTransposeSymmetric:true},
  transferFluxMetric:'Sigma=diag(I2,-I2)',
  pseudoUnitaryTransfer:true,
  scatteringConvention:'[out_R;in_R]=T[in_L;out_L], S:[in_L;in_R]->[out_L;out_R]',
  scatteringMatrix:toJSON(S),
  scatteringUnitary:true,
  temporalReading:'beta != 0 is active particle-hole/pair conversion',
  spatialReading:'the same beta block is reflection between counterpropagating flux channels and is compatible with passive unitary scattering',
  physicalGate:'A source-derived real structure must justify identifying the conjugate polarization with opposite spatial propagation rather than Nambu doubling.',
  passed:true,
},null,2));
