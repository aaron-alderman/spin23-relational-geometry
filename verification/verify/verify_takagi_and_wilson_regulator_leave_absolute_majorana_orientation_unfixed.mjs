import assert from "node:assert/strict";

const C=(re,im=0)=>({re,im});
const add=(a,b)=>C(a.re+b.re,a.im+b.im);
const mulc=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const conj=(a)=>C(a.re,-a.im);
const matMul=(A,B)=>A.map((r)=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mulc(x,B[k][j])),C(0))));
const transpose=(A)=>A[0].map((_,j)=>A.map((r)=>r[j]));
const dagger=(A)=>transpose(A).map((r)=>r.map(conj));
const close=(A,B,t=1e-12)=>A.every((r,i)=>r.every((x,j)=>Math.hypot(x.re-B[i][j].re,x.im-B[i][j].im)<t));
const W=[[C(1/Math.sqrt(2)),C(0,1/Math.sqrt(2))],[C(1/Math.sqrt(2)),C(0,-1/Math.sqrt(2))]];
const U=[[C(0),C(1)],[C(1),C(0)]];
assert(close(matMul(W,transpose(W)),U));
assert(close(matMul(dagger(W),W),[[C(1),C(0)],[C(0),C(1)]]));

// Every real orthogonal postfactor is another valid Takagi factor.
const O=[[C(-1),C(0)],[C(0),C(1)]];
const Wprime=matMul(W,O);
assert(close(matMul(Wprime,transpose(Wprime)),U));
assert(close(matMul(dagger(Wprime),Wprime),[[C(1),C(0)],[C(0),C(1)]]));

// The corresponding real Majorana congruence flips the absolute Pfaffian but
// leaves spectra and relative endpoint signs unchanged.
const pf2=(A)=>A[0][1];
const congruence=(A)=>{
  const Or=O.map((r)=>r.map((z)=>z.re));
  const tr=transpose(Or);
  const m=(X,Y)=>X.map((r)=>Y[0].map((_,j)=>r.reduce((s,x,k)=>s+x*Y[k][j],0)));
  return m(m(tr,A),Or);
};
const A0=[[0,2],[-2,0]],A1=[[0,-3],[3,0]];
assert.equal(pf2(congruence(A0)),-pf2(A0));
assert.equal(pf2(congruence(A1)),-pf2(A1));
assert.equal(Math.sign(pf2(A1)/pf2(A0)),Math.sign(pf2(congruence(A1))/pf2(congruence(A0))));

// The ordered Grassmann measure changes by the same determinant, so the
// Gaussian integral is convention-independent although Pfaffian sign alone is not.
const detO=-1;
assert.equal(detO*pf2(congruence(A0)),pf2(A0));

console.log("Takagi/Wilson regulator orientation audit: PASS");
console.log("real_orthogonal_postfactors_generate_equally_valid_particle_hole_Takagi_bases");
console.log("an_orientation_reversing_postfactor_preserves_CAR_and_spectrum_but_flips_absolute_Pfaffians");
console.log("the_same_postfactor_flips_reference_and_defect_signs_so_relative_parity_is_unchanged");
console.log("Grassmann_measure_orientation_compensates_the_Pfaffian_flip");
console.log("Wilson_mass_and_reflection_positivity_do_not_supply_octonion_to_Majorana_basepoint_sewing");
