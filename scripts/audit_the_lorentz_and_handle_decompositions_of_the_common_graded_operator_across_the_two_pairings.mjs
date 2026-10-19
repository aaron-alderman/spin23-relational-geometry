import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((row,i)=>row.map((x,j)=>x+B[i][j]));
const scale=(a,A)=>A.map(row=>row.map(x=>a*x));
const transpose=A=>A[0].map((_,j)=>A.map(row=>row[j]));
const zero=()=>Array.from({length:4},()=>Array(4).fill(0));
const close=(A,B)=>A.every((row,i)=>row.every((x,j)=>Math.abs(x-B[i][j])<1e-10));
const inverse=A=>{const n=A.length,M=A.map((r,i)=>[...r,...Array.from({length:n},(_,j)=>+(i===j))]);for(let c=0;c<n;c++){let p=c;while(p<n&&Math.abs(M[p][c])<1e-12)p++;assert.ok(p<n);[M[c],M[p]]=[M[p],M[c]];const q=M[c][c];for(let j=0;j<2*n;j++)M[c][j]/=q;for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];for(let j=0;j<2*n;j++)M[i][j]-=f*M[c][j];}}return M.map(r=>r.slice(n));};
const rank=mats=>{const M=mats.map(A=>A.flat().slice());let r=0;for(let c=0;c<16;c++){let p=r;while(p<M.length&&Math.abs(M[p][c])<1e-10)p++;if(p===M.length)continue;[M[r],M[p]]=[M[p],M[r]];const q=M[r][c];for(let j=c;j<16;j++)M[r][j]/=q;for(let i=0;i<M.length;i++)if(i!==r){const f=M[i][c];for(let j=c;j<16;j++)M[i][j]-=f*M[r][j];}r++;}return r;};
const symmetricBasis=[];for(let i=0;i<4;i++)for(let j=i;j<4;j++){const S=zero();S[i][j]=1;S[j][i]=1;symmetricBasis.push(S);}
const spBasis=J=>{const Jinv=inverse(J);return symmetricBasis.map(S=>mm(Jinv,S));};
const decomposition=(J,G)=>{const basis=spBasis(J),Ginv=inverse(G),ad=X=>mm(mm(G,X),Ginv);for(const X of basis)assert.ok(close(add(mm(transpose(X),J),mm(J,X)),zero()));const fixed=basis.map(X=>scale(.5,add(X,ad(X)))),odd=basis.map(X=>scale(.5,add(X,scale(-1,ad(X)))));return {fixedDimension:rank(fixed),oddDimension:rank(odd)};};

const Omega=[[0,0,1,0],[0,0,0,1],[-1,0,0,0],[0,-1,0,0]];
const Jdiag=[[0,1,0,0],[-1,0,0,0],[0,0,0,1],[0,0,-1,0]];
const Jcode=[[0,1,0,0],[-1,0,0,0],[0,0,0,-1],[0,0,1,0]];
const G=[[0,1,0,0],[-1,0,0,0],[0,0,0,-1],[0,0,1,0]];
const P=[[1,1,-1,-1],[0,-1,0,1],[1,0,1,0],[0,1,0,1]],Pinv=inverse(P),Z=mm(mm(P,G),Pinv);
const I=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>+(i===j)));
assert.ok(close(mm(G,G),scale(-1,I)));
assert.ok(close(mm(mm(transpose(G),Omega),G),scale(-1,Omega)));
assert.ok(close(mm(mm(transpose(G),Jdiag),G),Jdiag));
assert.ok(close(mm(mm(transpose(Z),Jcode),Z),Jcode));
assert.ok(close(mm(mm(transpose(P),Jcode),P),scale(-2,Jdiag)));

const fourier=decomposition(Omega,G),handle=decomposition(Jdiag,G),selector=decomposition(Jcode,Z);
assert.deepEqual(fourier,{fixedDimension:6,oddDimension:4});
assert.deepEqual(handle,{fixedDimension:4,oddDimension:6});
assert.deepEqual(selector,handle);
const handleMetric=mm(Jdiag,G);
assert.ok(close(handleMetric,[[-1,0,0,0],[0,-1,0,0],[0,0,1,0],[0,0,0,1]]));

console.log(JSON.stringify({
  protocol:'graded-operator-two-pairing-decomposition-audit/1',
  commonOperator:'G=diag(epsilon,-epsilon), transported as Z=P G P^-1',
  fourierTyping:{relation:'G^T Omega G=-Omega',decomposition:fourier,fixedAlgebra:'sl(2,C)_R = so(1,3)',oddSector:'R^(1,3)'},
  handleTyping:{relation:'G^T Jdiag G=Jdiag',decomposition:handle,compatibleMetric:handleMetric,metricSignature:'(2,2)',fixedAlgebra:'u(1,1) = su(1,1) plus u(1)'},
  selectorTyping:{relation:'Z^T Jcode Z=Jcode',decomposition:selector},
  theorem:'The Lorentz 6+4 split and the coherent-handle symplectic lift are two pairing-dependent roles of one abstract operator; they cannot be asserted simultaneously on one fixed alternating form.',
  boundary:'A physical synthesis requires an explicit pairing-switching interface, a bi-symplectic/groupoid formulation, or a proof that only one pairing is dynamical in each chart.',
  passed:true
},null,2));
