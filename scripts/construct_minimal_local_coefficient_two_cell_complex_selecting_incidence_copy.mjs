import assert from 'node:assert/strict';

const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const rank=A=>{const M=A.map(r=>r.map(Number));let row=0;for(let c=0;c<M[0].length&&row<M.length;c++){let p=row;while(p<M.length&&Math.abs(M[p][c])<1e-10)p++;if(p===M.length)continue;[M[row],M[p]]=[M[p],M[row]];const d=M[row][c];M[row]=M[row].map(x=>x/d);for(let i=0;i<M.length;i++)if(i!==row){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[row][j]);}row++;}return row;};
const det2=([[a,b],[c,d]])=>a*d-b*c;
const gcd=(a,b)=>b===0?Math.abs(a):gcd(b,a%b);

// Multiplicity coordinates are (u,d,uc); dc is reconstructed by cycle
// closure as u+d-uc.  These two proposed 2-cell boundaries impose u=d
// and u=-uc.
const Dsel=[[1,-1,0],[1,0,1]];
const v=[1,1,-1];
assert.deepEqual(mm(Dsel,v.map(x=>[x])).flat(),[0,0]);
assert.equal(rank(Dsel),2);

// Smith invariant check: gcd of all entries is one and gcd of maximal
// minors is one, so SNF(Dsel)=diag(1,1); cokernel has no torsion.
const entries=Dsel.flat();
const minors=[
  det2(Dsel.map(r=>[r[0],r[1]])),
  det2(Dsel.map(r=>[r[0],r[2]])),
  det2(Dsel.map(r=>[r[1],r[2]]))
];
const d1=entries.reduce(gcd,0);
const d1d2=minors.reduce(gcd,0);
assert.equal(d1,1);
assert.equal(d1d2,1);

// Tensor with the rank-two augmentation ideal.  Coordinates are interleaved
// by multiplicity copy: (u0,u1,d0,d1,uc0,uc1).
const D6=Array.from({length:4},(_,r)=>Array.from({length:6},(_,c)=>{
  const outCopy=Math.floor(r/2),outAug=r%2;
  const inCopy=Math.floor(c/2),inAug=c%2;
  return outAug===inAug?Dsel[outCopy][inCopy]:0;
}));
const Bker=[
  [1,0],[0,1],
  [1,0],[0,1],
  [-1,0],[0,-1]
];
assert.ok(mm(D6,Bker).flat().every(x=>x===0));
assert.equal(rank(D6),4);
assert.equal(rank(Bker),2);

// Color action on I in basis (1-g,g-g^2).  The selecting boundary is
// C3-equivariant because it acts only in multiplicity space.
const C=[[-1,-1],[1,0]];
const C3in=Array.from({length:6},(_,r)=>Array.from({length:6},(_,c)=>
  Math.floor(r/2)===Math.floor(c/2)?C[r%2][c%2]:0));
const C2out=Array.from({length:4},(_,r)=>Array.from({length:4},(_,c)=>
  Math.floor(r/2)===Math.floor(c/2)?C[r%2][c%2]:0));
assert.deepEqual(mm(D6,C3in),mm(C2out,D6));

// The induced action on the selected kernel is again precisely C.
assert.deepEqual(mm(C3in,Bker),mm(Bker,C));

// Incidence multiplicity operator has the same simple eigendirection.
const M=[[4,-1,1],[-1,4,1],[1,1,4]];
assert.deepEqual(mm(M,v.map(x=>[x])).flat(),v.map(x=>2*x));

console.log(JSON.stringify({
  protocol:'minimal-local-coefficient-two-cell-selector/1',
  proposedMultiplicityBoundary:Dsel,
  relation:'Dsel(u,d,uc)=(u-d,u+uc)',
  primitiveKernelGenerator:v,
  reconstructedDcCoefficient:v[0]+v[1]-v[2],
  smithInvariants:[d1,d1d2/d1],
  torsionFreeCokernel:true,
  augmentationTensorBoundary:D6,
  integralKernelBasis:Bker,
  kernelRank:rank(Bker),
  colorEquivariant:true,
  inducedKernelColorAction:C,
  equalsIncidenceLowEigenspace:true,
  interpretation:'Adding two I-valued face-flatness constraints, represented by the cochain differential with rows u-d and u+uc, selects exactly the incidence copy as its primitive cocycle kernel.',
  caveat:'The algebraic cochain completion is minimal and exact, but physical faces realizing this coboundary have not yet been derived from the Furey ribbon, Yukawa structure, or a Ward identity.',
  passed:true
},null,2));
