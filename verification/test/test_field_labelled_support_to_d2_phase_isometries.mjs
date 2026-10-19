import assert from "node:assert/strict";

const mod=(x,n)=>((x%n)+n)%n;
const bits=(n,k)=>Array.from({length:k},(_,i)=>(n>>i)&1);
const xor=(a,b)=>a.map((x,i)=>x^b[i]);
const mv=(A,v)=>A.map(r=>r.reduce((s,x,i)=>s^(x&v[i]),0));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s^(x&B[k][j]),0)));
const key=A=>A.flat().join("");
const rank2=(A0)=>{
  const A=A0.map(r=>r.slice());let rank=0;
  for(let c=0;c<A[0].length&&rank<A.length;c++){
    let p=rank;while(p<A.length&&!A[p][c])p++;
    if(p===A.length)continue;[A[rank],A[p]]=[A[p],A[rank]];
    for(let i=0;i<A.length;i++)if(i!==rank&&A[i][c])A[i]=xor(A[i],A[rank]);
    rank++;
  }return rank;
};
const q4=([radical,a,b])=>mod(3*a+3*b,4);
const vectors=Array.from({length:8},(_,n)=>bits(n,3));
const GL3=[];
for(let n=0;n<512;n++){
  const z=bits(n,9),A=Array.from({length:3},(_,i)=>z.slice(3*i,3*i+3));
  if(rank2(A)===3)GL3.push(A);
}
assert.equal(GL3.length,168);

const isometries=GL3.filter(A=>vectors.every(v=>q4(mv(A,v))===q4(v)));
assert.equal(isometries.length,8);
// Requiring the oriented section <x,y> to map to the target discriminant
// section <alpha,beta> removes additions of the radical and leaves two maps.
const sectionIsometries=isometries.filter(A=>A[0][1]===0&&A[0][2]===0);
assert.equal(sectionIsometries.length,2);

const sourcePunctureExchange=[
  [1,0,0],[0,0,1],[0,1,0],
];
// Actual coordinate exchange on D2: x1 fixed, x2 negated.  Modulo D2 on
// A_D2, negation is identity; the Tor generator is also fixed.
const targetCoordinateExchange=[
  [1,0,0],[0,1,0],[0,0,1],
];
const equivariantForCoordinateExchange=sectionIsometries.filter(A=>
  key(mm(A,sourcePunctureExchange))===key(mm(targetCoordinateExchange,A))
);
assert.equal(equivariantForCoordinateExchange.length,0);

// The D2 root swap x1<->x2 is physical coordinate sign reversal
// (p1,p2)->(p1,-p2).  It swaps the two discriminant generators.
const targetRootSwap=sourcePunctureExchange.map(r=>r.slice());
const equivariantForRootSwap=sectionIsometries.filter(A=>
  key(mm(A,sourcePunctureExchange))===key(mm(targetRootSwap,A))
);
assert.equal(equivariantForRootSwap.length,2);

// Field labelling x->alpha and y->beta chooses the identity isometry.
const labelled=[
  [1,0,0],[0,1,0],[0,0,1],
];
assert.ok(sectionIsometries.some(A=>key(A)===key(labelled)));
assert.equal(q4([0,1,0]),3);
assert.equal(q4([0,0,1]),3);
assert.equal(q4([0,1,1]),2);

console.log("field_labelled_support_to_D2_phase_isometries: PASS");
console.log("quadratic_isometries_of_degenerate_three_bit_module=8");
console.log("oriented_section_preserving_isometries=2");
console.log("field_labels_choose_one_of_the_two");
console.log("actual_puncture_coordinate_exchange_acts_trivially_on_Tor_plus_A_D2");
console.log("support_weak_swap_has_no_equivariant_quadratic_isometry_to_actual_puncture_exchange");
console.log("D2_root_swap_equivalently_second_puncture_sign_flip_does_induce_the_required_discriminant_swap");
console.log("quadratic_match_and_raw_puncture_exchange_match_require_distinct_lifts");

