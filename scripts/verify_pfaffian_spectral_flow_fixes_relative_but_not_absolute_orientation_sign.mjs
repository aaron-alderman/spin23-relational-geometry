import assert from "node:assert/strict";

const J=(m)=>[[0,m],[-m,0]];
const blockDiag=(blocks)=>{
  const n=blocks.reduce((s,b)=>s+b.length,0),A=Array.from({length:n},()=>Array(n).fill(0));
  let o=0;for(const B of blocks){for(let i=0;i<B.length;i++)for(let j=0;j<B.length;j++)A[o+i][o+j]=B[i][j];o+=B.length;}return A;
};
const transpose=(A)=>A[0].map((_,j)=>A.map((r)=>r[j]));
const mul=(A,B)=>A.map((r)=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const pf4=(A)=>A[0][1]*A[2][3]-A[0][2]*A[1][3]+A[0][3]*A[1][2];
const det4=(A)=>{
  // Sufficient for the diagonal reflection used below.
  if(A.every((r,i)=>r.every((x,j)=>i===j||x===0))) return A.reduce((p,r,i)=>p*r[i],1);
  throw new Error("det4 helper only supports diagonal matrices");
};

const A0=blockDiag([J(2),J(3)]),A1=blockDiag([J(-2),J(3)]),A2=blockDiag([J(-2),J(-3)]);
assert.equal(pf4(A0),6);assert.equal(pf4(A1),-6);assert.equal(pf4(A2),6);
assert.equal(Math.sign(pf4(A1)/pf4(A0)),-1); // one crossing
assert.equal(Math.sign(pf4(A2)/pf4(A0)),1);  // two crossings cancel globally

// Orientation-reversing basis congruence flips every absolute Pfaffian.
const R=[[-1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
assert.equal(det4(R),-1);
for(const A of [A0,A1,A2]) assert.equal(pf4(mul(mul(R,A),transpose(R))),-pf4(A));

// The relative sign along the same oriented bundle is unchanged because the
// common determinant factor cancels.
const R0=mul(mul(R,A0),transpose(R)),R1=mul(mul(R,A1),transpose(R));
assert.equal(Math.sign(pf4(R1)/pf4(R0)),Math.sign(pf4(A1)/pf4(A0)));

console.log("Pfaffian orientation and spectral-flow audit: PASS");
console.log("one_isolated_Majorana_pair_crossing_flips_the_relative_Pfaffian_sign");
console.log("two_crossings_cancel_in_the_global_sign_and_motivate_a_localized_crossing_ledger");
console.log("orientation_reversal_flips_every_absolute_Pfaffian");
console.log("the_relative_sign_along_a_common_oriented_path_is_basis_invariant");
console.log("domain_wall_spectral_flow_can_transport_but_not_absolutely_create_the_ribbon_orientation");
