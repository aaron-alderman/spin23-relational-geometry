import assert from 'node:assert/strict';

const z=(re=0,im=0)=>({re,im});
const add=(a,b)=>z(a.re+b.re,a.im+b.im),sub=(a,b)=>z(a.re-b.re,a.im-b.im);
const mulz=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),conj=a=>z(a.re,-a.im);
const divz=(a,b)=>{const d=b.re*b.re+b.im*b.im;return z((a.re*b.re+a.im*b.im)/d,(a.im*b.re-a.re*b.im)/d);};
const abs2=a=>a.re*a.re+a.im*a.im;
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>z(i===j?1:0)));
const diag=xs=>xs.map((x,i)=>xs.map((_,j)=>i===j?x:z()));
const mmul=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>add(s,mulz(x,B[k][j])),z())));
const madd=(A,B)=>A.map((r,i)=>r.map((x,j)=>add(x,B[i][j]))),msub=(A,B)=>A.map((r,i)=>r.map((x,j)=>sub(x,B[i][j])));
const dag=A=>A[0].map((_,j)=>A.map(row=>conj(row[j]))),trans=A=>A[0].map((_,j)=>A.map(row=>row[j]));
const cconj=A=>A.map(row=>row.map(conj));
const maxerr=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.hypot(x.re-B[i][j].re,x.im-B[i][j].im))));
const inv=A=>{const n=A.length,M=A.map((r,i)=>[...r,...eye(n)[i]]);for(let c=0;c<n;c++){let p=c;while(p<n&&abs2(M[p][c])<1e-20)p++;assert.ok(p<n);[M[c],M[p]]=[M[p],M[c]];const d=M[c][c];M[c]=M[c].map(x=>divz(x,d));for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];M[i]=M[i].map((x,j)=>sub(x,mulz(f,M[c][j])));}}return M.map(r=>r.slice(n));};
const det=A=>{const M=A.map(r=>r.map(x=>({...x})));let out=z(1);for(let c=0;c<M.length;c++){let p=c;while(p<M.length&&abs2(M[p][c])<1e-20)p++;assert.ok(p<M.length);if(p!==c){[M[c],M[p]]=[M[p],M[c]];out=mulz(z(-1),out);}const d=M[c][c];out=mulz(out,d);for(let i=c+1;i<M.length;i++){const f=divz(M[i][c],d);for(let j=c;j<M.length;j++)M[i][j]=sub(M[i][j],mulz(f,M[c][j]));}}return out;};
const positiveDefinite=A=>{for(let n=1;n<=A.length;n++){const d=det(A.slice(0,n).map(r=>r.slice(0,n)));if(Math.abs(d.im)>1e-8||d.re<1e-10)return false;}return true;};
const blockDiag=(A,B)=>[...A.map(r=>[...r,...Array(B.length).fill(0).map(()=>z())]),...B.map(r=>[...Array(A.length).fill(0).map(()=>z()),...r])];
const swapBlocks=n=>Array.from({length:2*n},(_,i)=>Array.from({length:2*n},(_,j)=>z((i<n&&j===i+n)||(i>=n&&j===i-n)?1:0)));

const q=(re,im=0)=>z(re/85,im/85);
const S0=[
  [q(21,-52),q(-18,-4),q(58,-6),q(4,-18)],
  [q(-18,-4),q(64,-33),q(11,-7),q(33,-21)],
  [q(58,-6),q(11,-7),q(-26,-53),q(7,11)],
  [q(4,-18),q(33,-21),q(7,11),q(-64,33)],
];
assert.ok(maxerr(mmul(dag(S0),S0),eye(4))<1e-12);
assert.ok(maxerr(trans(S0),S0)<1e-12);
assert.ok(S0.flatMap((r,i)=>r.filter((_,j)=>i!==j)).every(x=>abs2(x)>0));

const omega0=1,gammas=[2,3,5,7],labels=['u','d','e','nu'];
const b=(w,g)=>divz(sub(w,z(0,g)),add(w,z(0,g)));
const factors=w=>gammas.map(g=>divz(b(w,g),b(z(omega0),g)));
const D=w=>diag(factors(w));
const S=w=>mmul(mmul(D(w),S0),D(w));
assert.ok(maxerr(S(z(omega0)),S0)<1e-12);

const boundaryChecks=[-4,-.5,0,1,2.5,8].map(omega=>{
  const X=S(z(omega));
  assert.ok(maxerr(mmul(dag(X),X),eye(4))<1e-10);
  assert.ok(maxerr(trans(X),X)<1e-12);
  assert.ok(X.flatMap((r,i)=>r.filter((_,j)=>i!==j)).every(x=>abs2(x)>1e-20));
  return {omega,factorModuli:factors(z(omega)).map(x=>Math.sqrt(abs2(x))),allCrossEntriesNonzero:true};
});

const upperChecks=[[0,.2],[1,.4],[-2,1],[3,2]].map(([x,y])=>{
  const w=z(x,y),X=S(w),defect=msub(eye(4),mmul(dag(X),X));
  assert.ok(positiveDefinite(defect));
  const F=mmul(madd(eye(4),X),inv(msub(eye(4),X)));
  const herm=madd(F,dag(F)).map(r=>r.map(v=>mulz(z(.5),v)));
  assert.ok(positiveDefinite(herm));
  return {frequency:{re:x,im:y},factorModuli:factors(w).map(v=>Math.sqrt(abs2(v))),schurDefectPositive:true,cayleyPositiveReal:true};
});

const reflect=w=>z(-w.re,w.im);
const Sminus=w=>cconj(S(reflect(w)));
const Sreal=w=>blockDiag(S(w),Sminus(w));
const X8=swapBlocks(4);
for(const w of [z(1,.3),z(-2,.7),z(0,1.1)])assert.ok(maxerr(mmul(mmul(X8,cconj(Sreal(reflect(w)))),X8),Sreal(w))<1e-10);

const sampleD=D(z(.3));
assert.ok(maxerr(mmul(sampleD,S0),trans(mmul(sampleD,S0)))>1e-4);

console.log(JSON.stringify({
  protocol:'typed-diagonal-potapov-congruence/1',
  response:'S(z)=D(z) S0 D(z)',
  typedFactors:labels.map((label,i)=>({label,gamma:gammas[i],projector:'|'+i+'><'+i+'|'})),
  checkpointFrequency:omega0,
  checkpointRecovered:true,
  genuinelyMatrixValued:new Set(gammas).size>1,
  reciprocalCongruenceRequired:true,
  realAxisInnerChecks:boundaryChecks,
  upperHalfPlaneChecks:upperChecks,
  realTimeSidebandReality:true,
  localFactorButRelationalResidueTheorem:'At every finite real frequency each diagonal factor is nonzero and every off-diagonal entry D_i S0_ij D_j remains nonzero. No proper coordinate subspace is invariant. Hence a simple Cayley pole residue, whose range is a unit-eigenspace of S, cannot be coordinate-local.',
  freeContinuousParameters:gammas.length,
  checkpointConstraintsOnGammas:0,
  conclusion:'Typed coordinate-local Potapov scattering factors coexist with passivity, reciprocity and reality, but they do not yield coordinate-local Cayley spectral residues and the one checkpoint leaves all four pole scales free.',
  passed:true,
},null,2));
