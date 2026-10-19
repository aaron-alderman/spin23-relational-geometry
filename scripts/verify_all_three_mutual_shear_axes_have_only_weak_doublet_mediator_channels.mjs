import assert from "node:assert/strict";

const q={
  nuc:[1,1,1,1,1],
  ec:[1,1,1,-1,-1],
  uc1:[1,-1,-1,1,1],
  d1:[-1,1,1,-1,1],
  e:[-1,-1,-1,-1,1],
  nu:[-1,-1,-1,1,-1],
  dc1:[1,-1,-1,-1,-1],
};
const add=(a,b)=>a.map((x,i)=>x+b[i]);
const neg=(a)=>a.map(x=>-x);
const eq=(a,b)=>a.every((x,i)=>x===b[i]);
const vectorDirection=(v)=>{
  const nz=v.map((x,i)=>x?i+1:null).filter(Boolean);
  if(nz.length!==1||Math.abs(v[nz[0]-1])!==2)return null;
  return {index:nz[0],sign:Math.sign(v[nz[0]-1])};
};

// Z_D: nu^c + e = d_1 + u^c_1, mediated by +2e_5.
assert(eq(add(q.nuc,q.e),add(q.d1,q.uc1)));
assert.deepEqual(vectorDirection(add(q.nuc,q.e)),{index:5,sign:1});

// Z_C: e^c + e = d_1 + d^c_1, mediated by -2e_4.
assert(eq(add(q.ec,q.e),add(q.d1,q.dc1)));
assert.deepEqual(vectorDirection(add(q.ec,q.e)),{index:4,sign:-1});

// Z_C+Z_D: nu^c+nu=-(e^c+e) and nu^c+e=-(e^c+nu),
// so the charged-lepton quartet has both weak-doublet channels.
assert(eq(add(q.nuc,q.nu),neg(add(q.ec,q.e))));
assert(eq(add(q.nuc,q.e),neg(add(q.ec,q.nu))));
assert.deepEqual(vectorDirection(add(q.nuc,q.nu)),{index:4,sign:1});
assert.deepEqual(vectorDirection(add(q.nuc,q.e)),{index:5,sign:1});

const allDirections=[5,4,4,5];
assert(allDirections.every(i=>i>=4));
assert.equal(allDirections.some(i=>i<=3),false);

// The weak root e4-e5 exchanges the two oscillator directions and the two
// components of Q and L; it is already part of the certified SM root action.
const weakSwap=(v)=>[v[0],v[1],v[2],v[4],v[3]];
assert(eq(weakSwap([0,0,0,2,0]),[0,0,0,0,2]));
assert(eq(weakSwap(q.e),q.nu));

console.log("Mutual-shear weak-mediator audit: PASS");
console.log("Z_D_relation_nuc_plus_e_equals_d1_plus_uc1_uses_plus_2e5");
console.log("Z_C_relation_ec_plus_e_equals_d1_plus_dc1_uses_minus_2e4");
console.log("Z_C_plus_Z_D_charged_lepton_relation_has_both_2e4_and_2e5_weak_channels");
console.log("none_of_the_three_axes_requires_a_colored_vector_10_direction");
console.log("the_certified_weak_root_exchanges_the_two_mediator_directions_and_e_nu_components");
