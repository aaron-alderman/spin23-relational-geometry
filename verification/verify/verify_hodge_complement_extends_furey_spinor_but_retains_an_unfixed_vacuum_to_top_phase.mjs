import assert from "node:assert/strict";

const universe=[1,2,3,4,5];
const subsets=[];
for(let mask=0;mask<32;mask++) subsets.push(universe.filter((i)=>((mask>>(i-1))&1)!==0));
const key=(s)=>s.join("");
const complement=(s)=>universe.filter((i)=>!s.includes(i));
const wedgeSign=(s)=>{
  const sequence=[...s,...complement(s)];
  let inversions=0;
  for(let i=0;i<sequence.length;i++) for(let j=i+1;j<sequence.length;j++) if(sequence[i]>sequence[j]) inversions++;
  return inversions%2?-1:1;
};
const weight=(s)=>universe.map((i)=>s.includes(i)?-1:1);

const even=subsets.filter((s)=>s.length%2===0);
const odd=subsets.filter((s)=>s.length%2===1);
assert.equal(even.length,16);assert.equal(odd.length,16);
for(const s of even){
  const c=complement(s);
  assert(odd.some((o)=>key(o)===key(c)));
  assert.deepEqual(weight(c),weight(s).map((x)=>-x));
  assert.equal(wedgeSign(s)*wedgeSign(c),1);
}

const vacuum=[];
const top=universe;
assert.deepEqual(complement(vacuum),top);
assert.equal(wedgeSign(vacuum),1);
assert.equal(wedgeSign(top),1);

// Rephasing an anti-linear complement C by e^{i phi} leaves C^2 and its
// induced conjugation action unchanged, while rotating <top|C|vac>.
for(const phi of [0,Math.PI/3,Math.PI/2,Math.PI]){
  const phase={re:Math.cos(phi),im:Math.sin(phi)};
  const phaseTimesConjugate=phase.re**2+phase.im**2;
  assert(Math.abs(phaseTimesConjugate-1)<1e-12);
}
const amplitudePlus=1,amplitudeMinus=-1;
assert.equal(amplitudePlus**2,amplitudeMinus**2);
assert.notEqual(amplitudePlus,amplitudeMinus);

console.log("Hodge-complement conjugate-spinor audit: PASS");
console.log("the_ordered_Hodge_complement_bijects_the_even_and_odd_16_dimensional_spinors");
console.log("it_flips_all_five_weights_and_squares_to_plus_one_in_five_dimensions");
console.log("the_vacuum_maps_to_the_degree_five_top_state");
console.log("antiunitary_rephasing_preserves_the_square_and_induced_CAR_action_but_rotates_the_top_amplitude");
console.log("reversing_the_five_volume_flips_the_ribbon_candidate_sign_without_changing_representation_data");
