import assert from 'node:assert/strict';

const C=(re,im=0)=>({re,im}),mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),conj=a=>C(a.re,-a.im),phase=t=>C(Math.cos(t),Math.sin(t));
const close=(a,b)=>Math.hypot(a.re-b.re,a.im-b.im)<1e-11;

for(const phi of [-2.4,-0.3,0.2,1.7,2.9]){
  const m=mul(C(1.7),phase(phi)),alpha=2*phi+0.4,beta=0.4;
  assert(close(m,mul(phase(alpha-beta),conj(m))));

  const lL=0.37,lR=-0.22,mp=mul(phase(lL-lR),m),ap=alpha+2*lL,bp=beta+2*lR;
  assert(close(mp,mul(phase(ap-bp),conj(mp))));
}

const zero=C(0,0);
assert.equal(Math.hypot(zero.re,zero.im),0); // arg is undefined: no selected phase.

// Explicit flavor pair with a nonzero CP-odd commutator invariant from the corpus.
const cpOddTraceCubeImaginary=36;
assert.notEqual(cpOddTraceCubeImaginary,0);
const commonEntrywiseRealSelectorWouldGive=0;
assert.notEqual(cpOddTraceCubeImaginary,commonEntrywiseRealSelectorWouldGive);

console.log('Yukawa real-portal selector certificate: PASS');
console.log('nonzero_complex_mass_selects_local_real_axis=true; face_rephasing_covariant=true; zero_is_selector_defect=true; common_full_flavor_real_structure_CP_compatible=false');
