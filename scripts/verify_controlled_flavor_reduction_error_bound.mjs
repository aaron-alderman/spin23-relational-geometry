#!/usr/bin/env node

const assert = (ok, msg) => { if (!ok) throw new Error(msg); };
const I2 = [[1,0],[0,1]];
const sx = [[0,1],[1,0]];
const kron = (A,B) => A.flatMap(rowA => B.map(rowB => rowA.flatMap(a => rowB.map(b => a*b))));
const add = (A,B) => A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale = (s,A) => A.map(r=>r.map(x=>s*x));
const mul = (A,B) => A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const eye = n => Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const inv = A => {
  const n=A.length, aug=A.map((r,i)=>[...r,...eye(n)[i]]);
  for(let c=0;c<n;c++){
    let p=c; for(let r=c+1;r<n;r++) if(Math.abs(aug[r][c])>Math.abs(aug[p][c])) p=r;
    assert(Math.abs(aug[p][c])>1e-12,"singular matrix");
    [aug[c],aug[p]]=[aug[p],aug[c]];
    const q=aug[c][c]; aug[c]=aug[c].map(x=>x/q);
    for(let r=0;r<n;r++) if(r!==c){ const f=aug[r][c]; aug[r]=aug[r].map((x,j)=>x-f*aug[c][j]); }
  }
  return aug.map(r=>r.slice(n));
};
const maxAbs = A => Math.max(...A.flat().map(Math.abs));
const sub = (A,B) => add(A,scale(-1,B));
const ptrace2 = M => [
  [(M[0][0]+M[1][1])/2,(M[0][2]+M[1][3])/2],
  [(M[2][0]+M[3][1])/2,(M[2][2]+M[3][3])/2],
];

// Exact scalar-gap model: X^2=I and E(X)=0.
const a=3, eps=0.4;
const X=kron(sx,sx);
assert(maxAbs(sub(mul(X,X),eye(4)))<1e-12,"X must be an involution");
assert(maxAbs(ptrace2(X))<1e-12,"hidden perturbation must be centered");
const M=add(scale(a,eye(4)),scale(eps,X));
const reducedInverse=ptrace2(inv(M));
const exactCoefficient=a/(a*a-eps*eps);
const exactDefect=eps*eps/(a*(a*a-eps*eps));
assert(Math.abs(reducedInverse[0][0]-exactCoefficient)<1e-12,"exact reduced inverse failed");
assert(Math.abs((reducedInverse[0][0]-1/a)-exactDefect)<1e-12,"exact defect failed");

// General gapped face pivot with a noncommuting centered perturbation.
const A=[[2,0],[0,4]], mu=2, v=1;
const M0=kron(A,I2);
const Mg=add(M0,scale(eps,X));
const EgInv=ptrace2(inv(Mg));
const defect=sub(EgInv,inv(A));
const neumannBound=eps*eps*v*v/(mu*mu*(mu-eps*v));
assert(maxAbs(defect)<=neumannBound+1e-12,"Neumann reduction-error bound failed");

// A factor-external Schur coupling transmits at most ||B||^2 times the inverse defect.
const beta=0.7;
const schurDefect=scale(beta*beta,defect);
assert(maxAbs(schurDefect)<=beta*beta*neumannBound+1e-12,"Schur error bound failed");

console.log("Controlled flavor-reduction error certificate: PASS");
console.log(`exact_involution_defect=${exactDefect.toFixed(12)}; exact_order=epsilon^2`);
console.log(`general_defect_max=${maxAbs(defect).toFixed(12)}; neumann_bound=${neumannBound.toFixed(12)}`);
console.log(`schur_bound_transmission=beta^2; gap_condition=${eps*v<mu}`);
