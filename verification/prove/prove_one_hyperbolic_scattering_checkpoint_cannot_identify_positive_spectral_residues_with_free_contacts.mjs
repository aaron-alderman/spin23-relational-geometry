import assert from 'node:assert/strict';

const z=(re=0,im=0)=>({re,im}),add=(a,b)=>z(a.re+b.re,a.im+b.im),sub=(a,b)=>z(a.re-b.re,a.im-b.im);
const mulz=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),conj=a=>z(a.re,-a.im);
const divz=(a,b)=>{const d=b.re*b.re+b.im*b.im;return z((a.re*b.re+a.im*b.im)/d,(a.im*b.re-a.re*b.im)/d);};
const abs2=a=>a.re*a.re+a.im*a.im,eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>z(i===j?1:0)));
const madd=(A,B)=>A.map((r,i)=>r.map((x,j)=>add(x,B[i][j]))),msub=(A,B)=>A.map((r,i)=>r.map((x,j)=>sub(x,B[i][j])));
const mmul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mulz(x,B[k][j])),z())));
const dag=A=>A[0].map((_,j)=>A.map(r=>conj(r[j]))),scale=(a,A)=>A.map(r=>r.map(x=>mulz(a,x)));
const maxerr=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.hypot(x.re-B[i][j].re,x.im-B[i][j].im))));
const inv=A=>{const n=A.length,M=A.map((r,i)=>[...r,...eye(n)[i]]);for(let c=0;c<n;c++){let p=c;while(p<n&&abs2(M[p][c])<1e-20)p++;assert.ok(p<n);[M[c],M[p]]=[M[p],M[c]];const d=M[c][c];M[c]=M[c].map(x=>divz(x,d));for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];M[i]=M[i].map((x,j)=>sub(x,mulz(f,M[c][j])));}}return M.map(r=>r.slice(n));};
const choleskyPositive=A=>{const n=A.length,L=Array.from({length:n},()=>Array.from({length:n},()=>z()));for(let i=0;i<n;i++)for(let j=0;j<=i;j++){let s=A[i][j];for(let k=0;k<j;k++)s=sub(s,mulz(L[i][k],conj(L[j][k])));if(i===j){assert.ok(Math.abs(s.im)<1e-8&&s.re>1e-10);L[i][j]=z(Math.sqrt(s.re));}else L[i][j]=divz(s,L[j][j]);}return L;};
const q=(re,im=0)=>z(re/85,im/85);
const S0=[[q(21,-52),q(-18,-4),q(58,-6),q(4,-18)],[q(-18,-4),q(64,-33),q(11,-7),q(33,-21)],[q(58,-6),q(11,-7),q(-26,-53),q(7,11)],[q(4,-18),q(33,-21),q(7,11),q(-64,33)]];
const cayley=S=>mmul(madd(eye(4),S),inv(msub(eye(4),S)));
const HfromS=S=>scale(z(0,1),cayley(S));
const Hboundary=HfromS(S0);
assert.ok(maxerr(Hboundary,dag(Hboundary))<1e-10);
const constantModel=Hboundary;
assert.ok(maxerr(constantModel,Hboundary)<1e-12);

const gamma=2,omega0=1,b=w=>divz(sub(w,z(0,gamma)),add(w,z(0,gamma))),b0=b(z(omega0));
const f=w=>divz(b(w),b0),S=w=>scale(f(w),S0);
const w0=z(1,.4),H=HfromS(S(w0));
const A=scale(z(.5),madd(H,dag(H)));
const B=scale(z(0,-.5),msub(H,dag(H)));
choleskyPositive(B);
const m=3,den=(m-w0.re)**2+w0.im**2;
const R=scale(z(den/w0.im),B);choleskyPositive(R);
const C=msub(A,scale(z((m-w0.re)/den),R));
assert.ok(maxerr(C,dag(C))<1e-10);
const Hmodel=madd(C,scale(divz(z(1),sub(z(m),w0)),R));
assert.ok(maxerr(Hmodel,H)<1e-9);

console.log(JSON.stringify({
  protocol:'one-point-herglotz-residue-nonidentifiability/1',
  boundaryCheckpoint:{frequency:omega0,cayleyHIsHermitian:true,zeroPoleConstantRealization:true},
  interiorCheckpoint:{frequency:w0,pole:m,residuePositiveDefinite:true,contactHermitian:true,reconstructionError:maxerr(Hmodel,H)},
  genericFormula:'For z0=x+iy and H(z0)=A+iB with B>=0, choose R=B*((m-x)^2+y^2)/y and C=A-R*(m-x)/((m-x)^2+y^2). Then H(z)=C+R/(m-z) matches H(z0).',
  nonidentifiability:'With free Hermitian contacts, one boundary checkpoint selects no poles or residues; even one interior value admits an arbitrary real pole m with a compensating positive residue and contact.',
  requiredAdditionalData:['fixed UV/contact normalization','multiple frequency values','frequency derivatives or moments','typed residue-range constraints'],
  passed:true,
},null,2));
