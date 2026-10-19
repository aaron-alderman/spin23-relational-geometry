import assert from 'node:assert/strict';

const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(c,A)=>A.map(r=>r.map(x=>c*x));
const eq=(A,B,t=1e-9)=>A.every((r,i)=>r.every((x,j)=>Math.abs(x-B[i][j])<t));
function inv(A){const n=A.length,M=A.map((r,i)=>[...r,...Array.from({length:n},(_,j)=>i===j?1:0)]);for(let c=0;c<n;c++){let p=c;while(p<n&&Math.abs(M[p][c])<1e-12)p++;assert.ok(p<n);[M[c],M[p]]=[M[p],M[c]];const d=M[c][c];for(let j=0;j<2*n;j++)M[c][j]/=d;for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];for(let j=0;j<2*n;j++)M[i][j]-=f*M[c][j];}}return M.map(r=>r.slice(n));}

const Jc=[[0,1,-1,0],[-1,0,1,0],[1,-1,0,0],[0,0,0,0]];
const Jf=[[0,0,0,1],[0,0,0,1],[0,0,0,1],[-1,-1,-1,0]];
// Canonical columns p1,p2,q1,q2 in the original b_i basis.
const C=[[1/3,-1/3,0,-1/3],[1/3,2/3,0,-1/3],[1/3,-1/3,0,2/3],[0,0,1,0]];
const H=[[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]]; // swap handles 1 and 2
assert.ok(eq(mul(H,H),Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>i===j?1:0))));
const Hb=mul(mul(C,H),inv(C));

function canonicalForm(a,b){
  const Jab=add(scale(a,Jc),scale(b,Jf));
  return mul(mul(tr(C),Jab),C);
}
const samples=[[1,1],[1,-1],[2,3],[-4,5]].map(([a,b])=>{
  const K=canonicalForm(a,b);
  const pulled=mul(mul(tr(H),K),H);
  const swapped=canonicalForm(b,a);
  assert.ok(eq(pulled,swapped));
  return {a,b,symplectic:eq(pulled,K),antiSymplectic:eq(pulled,scale(-1,K))};
});
assert.deepEqual(samples.map(x=>[x.symplectic,x.antiSymplectic]),[[true,false],[false,true],[false,false],[false,false]]);

// H is integral in the completed canonical lattice; its original A4-coordinate
// matrix has thirds, demonstrating that it is not an ordinary S5 lattice permutation.
assert.ok(Hb.flat().some(x=>Math.abs(3*x-Math.round(3*x))<1e-9&&Math.abs(x-Math.round(x))>1e-9));

console.log(JSON.stringify({
  protocol:'handle-exchange-selects-oriented-color-area-ratio/1',
  canonicalHandleExchange:H,
  actionOnFamily:'H^T J(a,b) H = J(b,a)',
  symplecticExchangeCondition:'a=b',
  antiSymplecticExchangeCondition:'a=-b',
  matrixInOriginalA4Basis:Hb,
  integralOnCompletedLattice:true,
  ordinaryS5PermutationOnA4:false,
  codeShadow:'simultaneous logical X1<->X2 and Z1<->Z2 swap',
  samples,
  conclusion:'A symplectic handle-exchange symmetry fixes the previously free area ratio to a=b. An anti-symplectic exchange fixes a=-b. The exchange is canonical on the completed lattice but is not an ordinary microscopic oscillator permutation.',
  boundary:'The physical punctures and sewn Furey handles are distinguishable, so existence of the integral exchange does not prove it is an exact symmetry.',
  passed:true,
},null,2));
