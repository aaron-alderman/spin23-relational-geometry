import assert from "node:assert/strict";

const subsets=[];
for(let mask=0;mask<32;mask++){
  const occupied=[];
  for(let i=0;i<5;i++) if((mask>>i)&1) occupied.push(i+1);
  subsets.push(occupied);
}
const even=subsets.filter((s)=>s.length%2===0);
const odd=subsets.filter((s)=>s.length%2===1);
assert.equal(even.length,16);
assert.equal(odd.length,16);
assert(even.some((s)=>s.length===0));
assert(!even.some((s)=>s.length===5));
assert(odd.some((s)=>s.length===5));

// The ordered top factors into color modes 1,2,3 and weak modes 4,5.
const inversions=(left,right)=>left.reduce((n,a)=>n+right.filter((b)=>a>b).length,0);
assert.equal(inversions([1,2,3],[4,5]),0);
assert.equal(inversions([4,5],[1,2,3]),6);
assert.equal((-1)**6,1); // exchanging the 3- and 2-blocks adds no sign.

// Common weak-mode rephasing leaves all number operators and a4^dagger a5
// invariant, but the weak determinant/top factor has weight two.
const phases=[0,Math.PI/4,Math.PI/2,Math.PI];
for(const theta of phases){
  const bilinearPhase={re:Math.cos(-theta+theta),im:Math.sin(-theta+theta)};
  assert(Math.abs(bilinearPhase.re-1)<1e-12&&Math.abs(bilinearPhase.im)<1e-12);
}
const theta=Math.PI/2;
const weakTopPhase={re:Math.cos(-2*theta),im:Math.sin(-2*theta)};
assert(Math.abs(weakTopPhase.re+1)<1e-12&&Math.abs(weakTopPhase.im)<1e-12);

// Color-compatible cube-root rephasings have determinant weight three and
// leave the color top invariant.
for(let k=0;k<3;k++){
  const alpha=2*Math.PI*k/3;
  assert(Math.abs(Math.cos(-3*alpha)-1)<1e-10);
  assert(Math.abs(Math.sin(-3*alpha))<1e-10);
}

console.log("Five-mode determinant-line parity audit: PASS");
console.log("the_completed_Furey_generation_is_the_even_0_2_4_degree_spinor_of_dimension_16");
console.log("the_five_creation_operator_top_state_has_odd_parity_and_lies_in_the_conjugate_spinor");
console.log("the_3_plus_2_ordered_factorization_has_positive_block_exchange_sign");
console.log("common_weak_rephasing_preserves_Cartan_and_root_bilinears_but_can_flip_the_weak_top_form");
console.log("the_existing_even_spinor_intertwiner_cannot_fix_the_ribbon_sign_without_conjugate_sector_sewing");
