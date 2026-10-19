import assert from 'node:assert/strict';

const zero = () => Array.from({ length: 4 }, () => Array(4).fill(0));
const multiply = (A,B) => A.map(row => B[0].map((_,j) => row.reduce((sum,value,k) => sum + value * B[k][j],0)));
const add = (A,B) => A.map((row,i) => row.map((value,j) => value + B[i][j]));
const scale = (x,A) => A.map(row => row.map(value => x * value));
const transpose = A => A[0].map((_,j) => A.map(row => row[j]));
const trace = A => A.reduce((sum,row,i) => sum + row[i],0);
const close = (A,B,tolerance=1e-12) => A.every((row,i) => row.every((value,j) => Math.abs(value-B[i][j]) < tolerance));
const bracket = (A,B) => add(multiply(A,B),scale(-1,multiply(B,A)));

const I4 = zero(); for(let i=0;i<4;i++) I4[i][i]=1;
const omega = zero(); for(let i=0;i<2;i++){ omega[i][i+2]=1; omega[i+2][i]=-1; }
const eps = [[0,1],[-1,0]];
const Gamma = zero();
for(let i=0;i<2;i++) for(let j=0;j<2;j++){ Gamma[i][j]=eps[i][j]; Gamma[i+2][j+2]=-eps[i][j]; }
const GammaInverse = scale(-1,Gamma);
assert.ok(close(multiply(Gamma,Gamma),scale(-1,I4)));
assert.ok(close(multiply(multiply(transpose(Gamma),omega),Gamma),scale(-1,omega)));

const spBasis=[];
for(let i=0;i<2;i++) for(let j=0;j<2;j++){ const X=zero(); X[i][j]=1; X[j+2][i+2]=-1; spBasis.push(X); }
for(const [i,j] of [[0,0],[0,1],[1,1]]){ const X=zero(); X[i][j+2]=1; X[j][i+2]=1; spBasis.push(X); }
for(const [i,j] of [[0,0],[0,1],[1,1]]){ const X=zero(); X[i+2][j]=1; X[j+2][i]=1; spBasis.push(X); }
for(const X of spBasis) assert.ok(close(add(multiply(transpose(X),omega),multiply(omega,X)),zero()));

const adGamma = X => multiply(multiply(Gamma,X),GammaInverse);
const fixed = spBasis.map(X => scale(0.5,add(X,adGamma(X)))).filter((X,index,array) => {
  const flat=X.flat(); if(flat.every(v=>Math.abs(v)<1e-12)) return false;
  // keep greedily independent via exact-pattern rank below
  const prior=array.slice(0,index).filter(Y=>Y.flat().some(v=>Math.abs(v)>1e-12));
  const rank = vectors => { const A=vectors.map(V=>V.flat().slice()); let r=0; for(let c=0;c<16;c++){let p=r;while(p<A.length&&Math.abs(A[p][c])<1e-10)p++;if(p===A.length)continue;[A[r],A[p]]=[A[p],A[r]];const q=A[r][c];for(let j=c;j<16;j++)A[r][j]/=q;for(let i=0;i<A.length;i++)if(i!==r){const f=A[i][c];for(let j=c;j<16;j++)A[i][j]-=f*A[r][j];}r++;}return r;};
  return rank([...prior,X])>rank(prior);
});
const anti = spBasis.map(X => scale(0.5,add(X,scale(-1,adGamma(X))))).filter((X,index,array) => {
  const flat=X.flat(); if(flat.every(v=>Math.abs(v)<1e-12)) return false;
  const prior=array.slice(0,index).filter(Y=>Y.flat().some(v=>Math.abs(v)>1e-12));
  const rank = vectors => { const A=vectors.map(V=>V.flat().slice()); let r=0; for(let c=0;c<16;c++){let p=r;while(p<A.length&&Math.abs(A[p][c])<1e-10)p++;if(p===A.length)continue;[A[r],A[p]]=[A[p],A[r]];const q=A[r][c];for(let j=c;j<16;j++)A[r][j]/=q;for(let i=0;i<A.length;i++)if(i!==r){const f=A[i][c];for(let j=c;j<16;j++)A[i][j]-=f*A[r][j];}r++;}return r;};
  return rank([...prior,X])>rank(prior);
});
assert.equal(fixed.length,6);
assert.equal(anti.length,4);
for(const X of fixed) assert.ok(close(adGamma(X),X));
for(const X of anti) assert.ok(close(adGamma(X),scale(-1,X)));

const eigenParity = X => close(adGamma(X),X) ? 1 : close(adGamma(X),scale(-1,X)) ? -1 : 0;
const nonzero = X => X.flat().some(v=>Math.abs(v)>1e-12);
for(const X of fixed) for(const Y of fixed){ const B=bracket(X,Y); if(nonzero(B)) assert.equal(eigenParity(B),1); }
for(const X of fixed) for(const Y of anti){ const B=bracket(X,Y); if(nonzero(B)) assert.equal(eigenParity(B),-1); }
for(const X of anti) for(const Y of anti){ const B=bracket(X,Y); if(B.flat().some(v=>Math.abs(v)>1e-12)) assert.equal(eigenParity(B),1); }

// A transparent basis for the odd sector gives trace-form signature (3,1).
const p=[];
for(const A of [[[1,0],[0,-1]],[[0,1],[1,0]]]){const X=zero();for(let i=0;i<2;i++)for(let j=0;j<2;j++){X[i][j]=A[i][j];X[i+2][j+2]=-A[j][i];}p.push(X);}
{const X=zero();X[0][2]=1;X[1][3]=1;p.push(X);}
{const X=zero();X[2][0]=1;X[3][1]=1;p.push(X);}
for(const X of p) assert.equal(eigenParity(X),-1);
const gram=p.map(X=>p.map(Y=>trace(multiply(X,Y))));
assert.ok(close(gram,[[4,0,0,0],[0,4,0,0],[0,0,0,2],[0,0,2,0]]));

console.log(JSON.stringify({
  protocol:'graded-interface-lorentz-symmetric-pair/1',
  carrier:'C^2 realified to R^4',
  symplecticForm:'Omega=[[0,I],[-I,0]]',
  interface:'Gamma=diag(epsilon,-epsilon), Gamma^2=-I and Gamma^T Omega Gamma=-Omega',
  decomposition:{fixedDimension:fixed.length,oddDimension:anti.length,brackets:'[k,k] subset k; [k,p] subset p; [p,p] subset k'},
  fixedAlgebra:'centralizer of an anti-symplectic complex structure: sp(2,C) as a real algebra = sl(2,C)_R = so(1,3)',
  oddMetric:{traceGram:gram,signature:'(3,1)'},
  spin23Meaning:'Under sp(4,R)=so(2,3), the Gamma-fixed algebra is Lorentz so(1,3) and the four-dimensional complement is its vector/AdS-translation sector.',
  boundary:'This identifies the symmetric-pair decomposition. It does not show that the presently derived physical generators span all ten infinitesimal directions.',
  passed:true
},null,2));
