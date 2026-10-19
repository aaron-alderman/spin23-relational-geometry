import assert from 'node:assert/strict';

const z=(re=0,im=0)=>({re,im}),add=(a,b)=>z(a.re+b.re,a.im+b.im),sub=(a,b)=>z(a.re-b.re,a.im-b.im);
const mulz=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),conj=a=>z(a.re,-a.im);
const divz=(a,b)=>{const d=b.re*b.re+b.im*b.im;return z((a.re*b.re+a.im*b.im)/d,(a.im*b.re-a.re*b.im)/d);};
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>z(i===j?1:0)));
const mmul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mulz(x,B[k][j])),z())));
const dag=A=>A[0].map((_,j)=>A.map(r=>conj(r[j]))),trans=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const cconj=A=>A.map(r=>r.map(conj)),scale=(a,A)=>A.map(r=>r.map(x=>mulz(a,x)));
const maxerr=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.hypot(x.re-B[i][j].re,x.im-B[i][j].im))));
const blockDiag=(A,B)=>[...A.map(r=>[...r,...Array(B.length).fill(0).map(()=>z())]),...B.map(r=>[...Array(A.length).fill(0).map(()=>z()),...r])];
const swapBlocks=n=>Array.from({length:2*n},(_,i)=>Array.from({length:2*n},(_,j)=>z((i<n&&j===i+n)||(i>=n&&j===i-n)?1:0)));
const q=(re,im=0)=>z(re/85,im/85);
const S0=[[q(21,-52),q(-18,-4),q(58,-6),q(4,-18)],[q(-18,-4),q(64,-33),q(11,-7),q(33,-21)],[q(58,-6),q(11,-7),q(-26,-53),q(7,11)],[q(4,-18),q(33,-21),q(7,11),q(-64,33)]];
const gamma=2,omega0=1;
const b=w=>divz(sub(w,z(0,gamma)),add(w,z(0,gamma))),b0=b(z(omega0));
const f=w=>divz(b(w),b0),Splus=w=>scale(f(w),S0);
const reflectFrequency=w=>z(-w.re,w.im); // -conj(w)
const Sminus=w=>cconj(Splus(reflectFrequency(w)));
const Sreal=w=>blockDiag(Splus(w),Sminus(w));
const X=swapBlocks(4);
const realityTransform=w=>mmul(mmul(X,cconj(Sreal(reflectFrequency(w)))),X);

for(const w of [z(1,.3),z(-2,.7),z(0,1.1)]){
  assert.ok(maxerr(realityTransform(w),Sreal(w))<1e-11);
  const S=Sreal(w),defect=eye(8).map((r,i)=>r.map((x,j)=>sub(x,mmul(dag(S),S)[i][j])));
  assert.ok(defect.every((r,i)=>Math.abs(r[i].im)<1e-10&&r[i].re>0));
}
for(const w of [-3,-1,0,1,4]){
  const S=Sreal(z(w));assert.ok(maxerr(mmul(dag(S),S),eye(8))<1e-11);assert.ok(maxerr(trans(S),S)<1e-12);
}
assert.ok(maxerr(Splus(z(omega0)),S0)<1e-12);
assert.ok(maxerr(Sminus(z(-omega0)),cconj(S0))<1e-12);
assert.ok(maxerr(mmul(X,cconj(X)),eye(8))<1e-12);

console.log(JSON.stringify({
  protocol:'real-time-sideband-completion-of-complex-inner-checkpoint/1',
  completion:'S_real(z)=diag(S_plus(z), conjugate(S_plus(-conjugate(z))))',
  sidebandExchangeAntiunitary:'Xi=X K',
  xiSquared:1,
  realityLaw:'X conjugate(S_real(-conjugate(z))) X = S_real(z)',
  positiveFrequencyCheckpoint:'S_plus(+omega0)=S0',
  negativeFrequencyCheckpoint:'S_minus(-omega0)=conjugate(S0)',
  analyticUpperHalfPlane:true,
  reciprocal:true,
  realAxisUnitary:true,
  upperHalfPlaneStrictlyContractive:true,
  physicalDimensionStatement:'The 8-channel complex sideband presentation is constrained by Xi; negative-frequency amplitudes are not independent physical channels.',
  conclusion:'A real-time reciprocal passive completion exists without forcing the complex arithmetic checkpoint to be real. It requires an explicit frequency-sideband reality index.',
  passed:true,
},null,2));
