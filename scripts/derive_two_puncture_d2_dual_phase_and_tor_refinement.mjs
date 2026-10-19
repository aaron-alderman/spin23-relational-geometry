import assert from "node:assert/strict";

const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const mod=(x,n)=>((x%n)+n)%n;
const rank2=(A0)=>{
  const A=A0.map(r=>r.map(x=>mod(x,2)));let rank=0;
  for(let c=0;c<A[0].length&&rank<A.length;c++){
    let p=rank;while(p<A.length&&!A[p][c])p++;
    if(p===A.length)continue;[A[rank],A[p]]=[A[p],A[rank]];
    for(let i=0;i<A.length;i++)if(i!==rank&&A[i][c])
      A[i]=A[i].map((x,j)=>x^A[rank][j]);
    rank++;
  }return rank;
};
const mv=(A,v)=>A.map(r=>r.reduce((s,x,i)=>s+x*v[i],0));
const bits=(n,k)=>Array.from({length:k},(_,i)=>(n>>i)&1);

// Evaluation of the five Cartan charges on the punctures (nu^c,e^c).
const E=[
  [1,1,1,1,1],
  [1,1,1,-1,-1],
];
// The image is D2 with basis x1=(1,1), x2=(1,-1).
const B=[
  [1,1],
  [1,-1],
];
assert.equal(Math.abs(B[0][0]*B[1][1]-B[0][1]*B[1][0]),2);
for(const col of transpose(E))assert.equal(mod(col[0]-col[1],2),0);
assert.ok(transpose(E).some(v=>v[0]===1&&v[1]===1));
assert.ok(transpose(E).some(v=>v[0]===1&&v[1]===-1));
assert.deepEqual(mul(transpose(B),B),[[2,0],[0,2]]);

// Dual basis y1=(1/2,1/2), y2=(1/2,-1/2).  For negative D2 the
// discriminant quadratic form has quarter exponents q4=3(a+b).
const q4=([a,b])=>mod(3*a+3*b,4);
assert.deepEqual([bits(0,2),bits(1,2),bits(2,2),bits(3,2)].map(q4),[0,3,3,2]);

// Base change to F2 is not left exact: B mod 2 has rank one and kernel
// <(1,1)>.  This is Tor_1(Z2,F2), the extra integral parity bit.
assert.equal(rank2(B),1);
const kernelVectors=Array.from({length:4},(_,n)=>bits(n,2))
  .filter(v=>mv(B,v).every(x=>mod(x,2)===0));
assert.deepEqual(kernelVectors,[[0,0],[1,1]]);

// T=Tor plus A_D2 has the same degenerate quarter-phase module as the
// support defect: radical line tau and anisotropic quotient.
const qT=([tau,a,b])=>q4([a,b]);
const distribution={};
for(let n=0;n<8;n++){
  const q=qT(bits(n,3));distribution[q]=(distribution[q]??0)+1;
}
assert.deepEqual(distribution,{0:2,2:2,3:4});
const polar2=(u,v)=>mod(qT(u.map((x,i)=>x^v[i]))-qT(u)-qT(v),4)/2;
const radical=Array.from({length:8},(_,n)=>bits(n,3)).filter(u=>
  Array.from({length:8},(_,n)=>bits(n,3)).every(v=>polar2(u,v)===0)
);
assert.deepEqual(radical,[[0,0,0],[1,0,0]]);

// Puncture exchange is diag(1,-1) on the D2 basis and the same inverse
// transpose action on its dual.  It is symplectic and has 2+2 eigenspaces.
const J=[
  [0,0,1,0],[0,0,0,1],[-1,0,0,0],[0,-1,0,0],
];
const S=[
  [1,0,0,0],[0,-1,0,0],[0,0,1,0],[0,0,0,-1],
];
assert.deepEqual(mul(mul(transpose(S),J),S),J);

// Primitive wedge action in (E1,F1,E2,F2,R).
const wedgeS=[
  [-1,0,0,0,0],
  [0,-1,0,0,0],
  [0,0,-1,0,0],
  [0,0,0,-1,0],
  [0,0,0,0,1],
];
const M=[
  [1,1,0,0,0],
  [1,-1,0,0,0],
  [0,0,0,1,0],
  [0,0,0,0,-3],
  [0,0,1,0,0],
];
// Each M generator maps to plus or minus itself: the source-derived D2
// involution fixes the index-six fiber.
const Mimage=mul(wedgeS,M);
assert.deepEqual(Mimage,[
  [-1,-1,0,0,0],
  [-1,1,0,0,0],
  [0,0,0,-1,0],
  [0,0,0,0,3],
  [0,0,1,0,0],
]);

console.log("two_puncture_D2_dual_phase_and_Tor_refinement: PASS");
console.log("integral_logical_X_lattice_is_D2_index2_in_Z2");
console.log("negative_D2_discriminant_quarter_phase_table=00:0,10:3,01:3,11:2");
console.log("binary_base_change_has_rank1_and_Tor_line_generated_by_11");
console.log("Tor_plus_discriminant_plane_has_distribution_0^2_2^2_3^4_and_one_dimensional_radical");
console.log("puncture_exchange_extends_symplectically_on_D2_plus_D2dual_with_2_plus_2_eigenspaces");
console.log("in_the_D2_integral_basis_the_primitive_wedge_action_fixes_the_index6_phase_fiber");
console.log("the_naive_Z2_puncture_basis_and_the_D2_basis_differ_by_index2_not_by_GL2Z");

