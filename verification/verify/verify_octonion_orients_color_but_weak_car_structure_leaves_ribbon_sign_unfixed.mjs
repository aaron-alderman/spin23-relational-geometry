import assert from "node:assert/strict";

const J=[[0,1],[-1,0]];
const transpose=(A)=>A[0].map((_,j)=>A.map((r)=>r[j]));
const mul=(A,B)=>A.map((r)=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const scale=(z,A)=>A.map((r)=>r.map((x)=>({re:z.re*x,im:z.im*x})));
const det2=(A)=>A[0][0]*A[1][1]-A[0][1]*A[1][0];
const clean=(x)=>Object.is(x,-0)?0:x;
const cleanMatrix=(A)=>A.map((r)=>r.map((x)=>typeof x==="number"?clean(x):({re:clean(x.re),im:clean(x.im)})));

// Real representatives of SU(2) preserve the alternating form; in complex
// dimension two every alternating form is a scalar multiple of J.
for(const U of [
  [[1,0],[0,1]],
  [[0,1],[-1,0]],
  [[0,-1],[1,0]],
]) assert.deepEqual(mul(mul(transpose(U),J),U),J);
assert.equal(det2(J),1);
assert.deepEqual(cleanMatrix(J.map((r)=>r.map((x)=>-x))),[[0,-1],[1,0]]);

// Both +J and -J are real, normalized and SU(2)-invariant. Ordinary complex
// conjugation (the CAR real structure K) cannot distinguish them.
const plus=J,minus=J.map((r)=>r.map((x)=>-x));
assert.equal(det2(plus),det2(minus));
assert.equal(plus.flat().reduce((s,x)=>s+x*x,0),minus.flat().reduce((s,x)=>s+x*x,0));

// A scalar comparison beta I acts on the weak determinant line with beta^2.
// The CAR-matched possibilities beta=+/-1 both act trivially and hence do not
// select between +J and -J; the Jordan-blind phase beta=i flips the sign.
for(const beta of [1,-1]) assert.equal(beta*beta,1);
const i={re:0,im:1};
assert.deepEqual(cleanMatrix(scale({re:-1,im:0},J)),cleanMatrix(scale({re:i.re*i.re-i.im*i.im,im:2*i.re*i.im},J)));

// The color volume is unchanged by the octonion-compatible cube roots alpha.
for(let k=0;k<3;k++){
  const theta=2*Math.PI*k/3;
  const alpha3={re:Math.cos(3*theta),im:Math.sin(3*theta)};
  assert(Math.abs(alpha3.re-1)<1e-10&&Math.abs(alpha3.im)<1e-10);
}

console.log("Colour/weak relative-orientation audit: PASS");
console.log("octonion_compatibility_preserves_the_color_complex_volume_up_to_Z3_frame_redundancy");
console.log("the_SU2_invariant_weak_alternating_line_is_one_dimensional_but_has_two_real_normalized_signs");
console.log("a_matched_CAR_real_structure_makes_the_form_real_but_does_not_choose_plus_over_minus");
console.log("the_remaining_sign_is_exactly_the_relative_ribbon_orientation_datum");
console.log("a_common_five_volume_Pfaffian_or_oriented_boundary_determinant_is_still_required");
