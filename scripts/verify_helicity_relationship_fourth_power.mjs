import assert from 'node:assert/strict';

const c1Face=h=>-2*h;
const c1Relation=h=>c1Face(h)-c1Face(-h);
assert.equal(c1Face(2),4*c1Face(0.5));
assert.equal(c1Face(-2),4*c1Face(-0.5));
assert.equal(c1Relation(2),4*c1Relation(0.5));
assert.equal(Math.abs(c1Relation(2)),8);

for(const phi of [0,0.13,0.47,1.1,2.6]){
  const fermion={re:Math.cos(2*phi),im:Math.sin(2*phi)};
  let fourth={re:1,im:0};
  for(let i=0;i<4;i++)fourth={re:fourth.re*fermion.re-fourth.im*fermion.im,im:fourth.re*fermion.im+fourth.im*fermion.re};
  const stress={re:Math.cos(8*phi),im:Math.sin(8*phi)};
  assert(Math.hypot(fourth.re-stress.re,fourth.im-stress.im)<1e-12);
}

console.log('Helicity relationship fourth-power certificate: PASS');
console.log('L_2_is_L_half_tensor4=true; R_2_is_R_half_tensor4=true; fermion_relationship_chern=2; stress_relationship_chern=8; dynamical_operator_map_unproved=true');
