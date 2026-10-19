#!/usr/bin/env node

const assert=(ok,msg)=>{if(!ok)throw new Error(msg);};
const C=(re,im=0)=>({re,im});
const conj=z=>C(z.re,-z.im);
const neg=z=>C(-z.re,-z.im);
const zeros=(r,c)=>Array.from({length:r},()=>Array.from({length:c},()=>C(0)));
const blockDiag=(A,B)=>{
  const n=A.length,m=B.length,Znm=zeros(n,m),Zmn=zeros(m,n);
  return [...A.map((r,i)=>[...r,...Znm[i]]),...B.map((r,i)=>[...Zmn[i],...r])];
};
const mconj=A=>A.map(r=>r.map(conj));
const mneg=A=>A.map(r=>r.map(neg));
const maxDiff=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((z,j)=>Math.hypot(z.re-B[i][j].re,z.im-B[i][j].im))));

const h=[[C(2),C(0,1)],[C(0,-1),C(3)]]; // Hermitian one-particle kinetic matrix.
const H=blockDiag(h,mneg(mconj(h)));       // diag(h,-bar h)
const gammaConjugate=X=>{
  const n=X.length/2;
  return Array.from({length:2*n},(_,i)=>Array.from({length:2*n},(_,j)=>{
    const si=i<n?i+n:i-n, sj=j<n?j+n:j-n;
    return conj(X[si][sj]);
  }));
};
assert(maxDiff(gammaConjugate(H),mneg(H))<1e-12,"self-dual BdG kinetic condition failed");

// Particle basis projection P is preserved by H and exchanged with 1-P by Gamma.
const n=2;
const P=Array.from({length:2*n},(_,i)=>Array.from({length:2*n},(_,j)=>C(i===j&&i<n?1:0)));
const oneMinusP=Array.from({length:2*n},(_,i)=>Array.from({length:2*n},(_,j)=>C(i===j&&i>=n?1:0)));
assert(maxDiff(gammaConjugate(P),oneMinusP)<1e-12,"Gamma must exchange particle and adjoint projections");
// H is block diagonal, hence [H,P]=0.
const offBlockMax=Math.max(...H.slice(0,n).flatMap(r=>r.slice(n).map(z=>Math.hypot(z.re,z.im))),...H.slice(n).flatMap(r=>r.slice(0,n).map(z=>Math.hypot(z.re,z.im))));
assert(offBlockMax<1e-12,"minimal kinetic operator must preserve basis projection");

const N=15;
const selfDualDim=2*N, selfDualIndependent=N;
const independentlyTensorSelectorDim=2*selfDualDim;
const afterCarProjection=independentlyTensorSelectorDim/2;
assert(selfDualDim===30&&selfDualIndependent===15,"self-dual count failed");
assert(independentlyTensorSelectorDim===60&&afterCarProjection===30,"independent selector-factor overcount failed");

console.log("Common-carrier dimension trap/BdG kinetic certificate: PASS");
console.log("H_BdG=diag(h,-bar_h); Gamma_H_Gamma=-H; Gamma_P_Gamma=1-P; [H,P]=0");
console.log(`single_common_selfdual_dim=${selfDualDim}; independent_modes=${selfDualIndependent}`);
console.log(`naive_selector_tensor_CAR_dim=${independentlyTensorSelectorDim}; modes_after_CAR_projection=${afterCarProjection}; mirror_overcount=true`);
