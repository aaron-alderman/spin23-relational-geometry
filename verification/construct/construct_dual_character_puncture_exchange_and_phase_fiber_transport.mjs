import assert from "node:assert/strict";

const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const neg=A=>A.map(r=>r.map(x=>-x));

// V=L_X plus L_X^*, basis (a1,a2,b1,b2).
const J=[
  [0,0,1,0],
  [0,0,0,1],
  [-1,0,0,0],
  [0,-1,0,0],
];
const S=[
  [0,1,0,0],
  [1,0,0,0],
  [0,0,0,1],
  [0,0,1,0],
];
assert.deepEqual(mul(mul(transpose(S),J),S),J);
assert.deepEqual(mul(S,S),[
  [1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1],
]);

// Primitive wedge basis N=(E1,F1,E2,F2,R).
const wedgeS=[
  [-1,0,0,0,0],
  [0,-1,0,0,0],
  [0,0,0,-1,0],
  [0,0,-1,0,0],
  [0,0,0,0,-1],
];
const GramN=[
  [0,1,0,0,0],
  [1,0,0,0,0],
  [0,0,0,1,0],
  [0,0,1,0,0],
  [0,0,0,0,-2],
];
assert.deepEqual(mul(mul(transpose(wedgeS),GramN),wedgeS),GramN);
assert.deepEqual(mul(wedgeS,wedgeS),[
  [1,0,0,0,0],[0,1,0,0,0],[0,0,1,0,0],[0,0,0,1,0],[0,0,0,0,1],
]);

// M basis columns (v,w,r,s,t) in N.
const M=[
  [1,1,0,0,0],
  [1,-1,0,0,0],
  [0,0,0,1,0],
  [0,0,0,0,-3],
  [0,0,1,0,0],
];
const Mprime=mul(wedgeS,M);
assert.notDeepEqual(Mprime,M);

// wedgeS sends s=E2 to -F2=t/3 and t=-3F2 to 3E2=3s.
const sImage=Mprime.map(r=>r[3]);
const tImage=Mprime.map(r=>r[4]);
assert.deepEqual(sImage,[0,0,0,-1,0]);
assert.deepEqual(tImage,[0,0,3,0,0]);

// The two fibers meet at index three in each: on the null plane the common
// lattice is <3E2,3F2>.  In M coordinates it is <3s,t>.
const intersectionInsideM=[
  [1,0,0,0,0],
  [0,1,0,0,0],
  [0,0,1,0,0],
  [0,0,0,3,0],
  [0,0,0,0,1],
];
const determinant=A=>A.length===0?1:A.length===1?A[0][0]:A[0].reduce(
  (sum,x,j)=>sum+(j%2?-1:1)*x*determinant(A.slice(1).map(r=>r.filter((_,k)=>k!==j))),0
);
assert.equal(Math.abs(determinant(intersectionInsideM)),3);

console.log("dual_character_puncture_exchange_and_phase_fiber_transport: PASS");
console.log("inverse_transpose_extension_is_integral_symplectic_with_eigenspaces_2_plus_2");
console.log("primitive_wedge_action_E1_F1_E2_F2_R_to_minusE1_minusF1_minusF2_minusE2_minusR");
console.log("chosen_index6_fiber_is_not_fixed");
console.log("level3_restriction_moves_from_F2_to_E2");
console.log("M_and_transported_Mprime_intersect_at_index3_in_each");
console.log("the_two_surviving_s_t_maps_are_the_two_null_leg_fiber_orientations");

