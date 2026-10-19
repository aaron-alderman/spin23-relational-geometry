import assert from "node:assert/strict";

const det=A=>A.length===0?1:A.length===1?A[0][0]:A[0].reduce(
  (s,x,j)=>s+(j%2?-1:1)*x*det(A.slice(1).map(r=>r.filter((_,k)=>k!==j))),0
);
const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const mv=(A,v)=>A.map(r=>r.reduce((s,x,i)=>s+x*v[i],0));
const inverseRational=A=>{
  const d=det(A),cof=A.map((_,i)=>A.map((__,j)=>{
    const minor=A.filter((_,r)=>r!==i).map(row=>row.filter((_,c)=>c!==j));
    return ((i+j)%2?-1:1)*det(minor);
  }));
  return transpose(cof).map(r=>r.map(x=>x/d));
};
const mod=(x,n)=>((x%n)+n)%n;
const scale=(n,A)=>A.map(r=>r.map(x=>n*x));

// Inclusion I -> M, M basis (v,w,r,s,t).
const A=[
  [1,-1,3,-7,3],
  [-1,-1,-3,7,-3],
  [0,0,-4,4,0],
  [0,-2,-2,4,0],
  [0,0,2,-4,2],
];
assert.equal(Math.abs(det(A)),32);
const Ainv=inverseRational(A);

// Source-derived puncture exchange in the D2 basis acts on the primitive
// wedge as (-E1,-F1,-E2,-F2,+R), hence on (v,w,r,s,t):
const P=[
  [-1,0,0,0,0],
  [0,-1,0,0,0],
  [0,0,1,0,0],
  [0,0,0,-1,0],
  [0,0,0,0,-1],
];
const PN=scale(-1,P); // compose with global lattice negation
for(const action of [P,PN]){
  const onI=mul(mul(Ainv,action),A);
  assert.ok(onI.flat().every(Number.isInteger));
  assert.equal(Math.abs(det(onI)),1);
}

// Exact quotient keys using adj(A)/det(A).
const adj=Ainv.map(r=>r.map(x=>x*det(A)));
const qkey=x=>mv(adj,x).map(z=>mod(z,32)).join(",");
const reps=new Map();
for(let a=0;a<4;a++)for(let b=0;b<2;b++)for(let c=0;c<2;c++)for(let d=0;d<2;d++){
  const x=[0,b,a,c,d];reps.set(qkey(x),x);
}
assert.equal(reps.size,32);

let pFixed=0,pnInversions=0;
for(const x of reps.values()){
  if(qkey(mv(P,x))===qkey(x))pFixed++;
  if(qkey(mv(PN,x))===qkey(x.map(z=>-z)))pnInversions++;
}
assert.equal(pFixed,32);
assert.equal(pnInversions,32);

// The r-coordinate modulo four is a well-defined surjective character because
// every I generator has r-coordinate divisible by four.
assert.ok(A[2].every(x=>mod(x,4)===0));
const chi=x=>mod(x[2],4);
assert.deepEqual([0,1,2,3].map(a=>chi([0,0,a,0,0])),[0,1,2,3]);
for(const x of reps.values()){
  assert.equal(chi(mv(P,x)),chi(x));
  assert.equal(chi(mv(PN,x)),mod(-chi(x),4));
}

console.log("puncture_exchange_and_global_negation_on_quartic_character: PASS");
console.log("both_actions_preserve_the_common_intersection_I");
console.log("source_D2_puncture_exchange_acts_trivially_on_all_of_G=M_over_I");
console.log("composition_with_global_negation_acts_by_group_inversion");
console.log("r_coordinate_mod4_is_a_well_defined_surjective_character_chi");
console.log("puncture_exchange_fixes_chi_while_global_negated_exchange_sends_chi_to_minus_chi");
console.log("the_fourth_root_character_i_to_the_chi_is_complex_conjugated");
console.log("quartic_orientation_is_independent_of_the_falsified_support_swap_equivariance");

