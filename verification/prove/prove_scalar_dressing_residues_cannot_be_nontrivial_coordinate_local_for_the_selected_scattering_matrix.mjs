import assert from 'node:assert/strict';

const z=(re=0,im=0)=>({re,im}),add=(a,b)=>z(a.re+b.re,a.im+b.im),sub=(a,b)=>z(a.re-b.re,a.im-b.im);
const mulz=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),abs2=a=>a.re*a.re+a.im*a.im;
const mmul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mulz(x,B[k][j])),z())));
const comm=(A,B)=>{const AB=mmul(A,B),BA=mmul(B,A);return AB.map((r,i)=>r.map((x,j)=>sub(x,BA[i][j])));};
const frob2=A=>A.flat().reduce((s,x)=>s+abs2(x),0),diag=xs=>xs.map((x,i)=>xs.map((_,j)=>z(i===j?x:0)));
const q=(re,im=0)=>z(re/85,im/85);
const S0=[[q(21,-52),q(-18,-4),q(58,-6),q(4,-18)],[q(-18,-4),q(64,-33),q(11,-7),q(33,-21)],[q(58,-6),q(11,-7),q(-26,-53),q(7,11)],[q(4,-18),q(33,-21),q(7,11),q(-64,33)]];
for(let i=0;i<4;i++)for(let j=0;j<4;j++)if(i!==j)assert.ok(abs2(S0[i][j])>0);

const commutingBinary=[];
for(let mask=0;mask<16;mask++){
  const bits=Array.from({length:4},(_,i)=>(mask>>i)&1),P=diag(bits),n=frob2(comm(P,S0));
  if(n<1e-20)commutingBinary.push({mask,bits});
}
assert.deepEqual(commutingBinary.map(x=>x.mask),[0,15]);
const named={
  firstHandle:diag([1,0,1,0]),
  secondHandle:diag([0,1,0,1]),
  leftSide:diag([1,1,0,0]),
  rightSide:diag([0,0,1,1]),
};
const namedCommutatorNorms=Object.fromEntries(Object.entries(named).map(([k,P])=>[k,Math.sqrt(frob2(comm(P,S0)))]));
assert.ok(Object.values(namedCommutatorNorms).every(x=>x>0));

// For a diagonal D, [D,S0]_ij=(d_i-d_j)S0_ij. Since every off-diagonal
// entry is nonzero, commutation forces d_i=d_j for all i,j.
const diagonalCommutantDimension=1;

console.log(JSON.stringify({
  protocol:'scalar-dressing-residue-coordinate-locality-no-go/1',
  allOffDiagonalCheckpointEntriesNonzero:true,
  commutingBinaryCoordinateProjectors:commutingBinary,
  diagonalCommutantDimension,
  namedProjectorCommutatorNorms:namedCommutatorNorms,
  functionalCalculus:'H(z)=i(I+f(z)S0)(I-f(z)S0)^-1 commutes with S0 for every z; its pole residues therefore lie in the S0 commutant.',
  conclusion:'No nontrivial coordinate-local handle, side or singleton projector can be a residue projector of the scalar-dressed response. Its spectral residues are coherent relational channels, unless frequency dependence becomes genuinely matrix-valued.',
  boundary:'This no-go concerns coordinate-local supports in the declared scattering basis. A source-derived non-diagonal Furey support map could still align typed matter with the spectral channels.',
  passed:true,
},null,2));
