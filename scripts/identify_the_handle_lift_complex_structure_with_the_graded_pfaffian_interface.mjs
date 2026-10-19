import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((sum,value,k)=>sum+value*B[k][j],0)));
const transpose=A=>A[0].map((_,j)=>A.map(row=>row[j]));
const scale=(x,A)=>A.map(row=>row.map(value=>x*value));
const close=(A,B,tolerance=1e-11)=>A.every((row,i)=>row.every((value,j)=>Math.abs(value-B[i][j])<tolerance));
const inverse=A=>{const n=A.length,M=A.map((row,i)=>[...row,...Array.from({length:n},(_,j)=>i===j?1:0)]);for(let c=0;c<n;c++){let p=c;while(p<n&&Math.abs(M[p][c])<1e-12)p++;assert.ok(p<n);[M[c],M[p]]=[M[p],M[c]];const q=M[c][c];for(let j=0;j<2*n;j++)M[c][j]/=q;for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];for(let j=0;j<2*n;j++)M[i][j]-=f*M[c][j];}}return M.map(row=>row.slice(n));};
const I4=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>i===j?1:0));
const eps=[[0,1],[-1,0]];
const Omega=[[0,0,1,0],[0,0,0,1],[-1,0,0,0],[0,-1,0,0]];
const Jdiag=[[0,1,0,0],[-1,0,0,0],[0,0,0,1],[0,0,-1,0]];
const GammaLinear=[[0,1,0,0],[-1,0,0,0],[0,0,0,-1],[0,0,1,0]]; // diag(eps,-eps)
const H=[[0,0,1,1],[0,0,0,-1],[1,1,0,0],[0,-1,0,0]];
const Jcode=[[0,1,0,0],[-1,0,0,0],[0,0,0,-1],[0,0,1,0]];
const P=[[1,1,-1,-1],[0,-1,0,1],[1,0,1,0],[0,1,0,1]];
const Pinverse=inverse(P);
const Z=mm(mm(P,GammaLinear),Pinverse);

assert.ok(close(mm(GammaLinear,GammaLinear),scale(-1,I4)));
assert.ok(close(mm(mm(transpose(GammaLinear),Omega),GammaLinear),scale(-1,Omega)));
assert.ok(close(mm(mm(transpose(GammaLinear),Jdiag),GammaLinear),Jdiag));
assert.ok(close(mm(H,Z),mm(Z,H)));
assert.ok(close(mm(Z,Z),scale(-1,I4)));
assert.ok(close(mm(mm(transpose(Z),Jcode),Z),Jcode));
assert.ok(close(mm(mm(transpose(P),Jcode),P),scale(-2,Jdiag)));

console.log(JSON.stringify({
  protocol:'pfaffian-interface-equals-handle-lift-complex-structure/1',
  commonMatrix:'Gamma_linear=diag(epsilon,-epsilon)=Z_prime',
  fourierTyping:'Gamma_linear^T Omega Gamma_linear=-Omega (anti-symplectic)',
  handleEigenTyping:'Gamma_linear^T J_diag Gamma_linear=J_diag (symplectic)',
  transport:'Z=P Gamma_linear P^-1',
  physicalBasis:'Z commutes with H, Z^2=-I, and Z^T J_code Z=J_code',
  interpretation:'The graded Pfaffian/sideband complex structure and the coherent handle-lift structure are the same abstract operator after the established change of carrier pairing.',
  boundary:'The identity closes the representation and typing bridge. It does not derive why the physical theory chooses the transported handle pairing or the index-four saturation.',
  passed:true
},null,2));
