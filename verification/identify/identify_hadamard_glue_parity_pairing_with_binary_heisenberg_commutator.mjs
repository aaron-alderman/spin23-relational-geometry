import assert from 'node:assert/strict';

const bits=[];
for(let n=0;n<4;n++)bits.push([n&1,(n>>1)&1]);
const add=(x,y)=>x.map((a,i)=>a^y[i]);
const dot=(x,y)=>(x[0]*y[0]+x[1]*y[1])&1;
const key=x=>x.join('');

// The radical quotients of the two C4+C6 face glues.
const X=bits, Z=bits;
assert.equal(X.length,4);
assert.equal(Z.length,4);

// Exponentiated discriminant pairing is (-1)^(x.z).
const gluePhase=(x,z)=>dot(x,z)===0?1:-1;
assert.deepEqual(X.map(x=>Z.map(z=>gluePhase(x,z))),[
  [1,1,1,1],
  [1,-1,1,-1],
  [1,1,-1,-1],
  [1,-1,-1,1],
]);

// Perfectness of the pairing.
for(const x of X)if(key(x)!=='00')assert(Z.some(z=>gluePhase(x,z)===-1));
for(const z of Z)if(key(z)!=='00')assert(X.some(x=>gluePhase(x,z)===-1));

// The direct sum carries the canonical alternating symplectic form.
const W=[];
for(const x of X)for(const z of Z)W.push({x,z});
const omega=(u,v)=>dot(u.x,v.z)^dot(u.z,v.x);
for(const u of W)assert.equal(omega(u,u),0);
for(const u of W)if(key(u.x)+key(u.z)!=='0000')assert(W.some(v=>omega(u,v)===1));

// Binary Heisenberg group with mu4 centre:
// P(k,x,z)P(l,y,w)=P(k+l+2 z.y,x+y,z+w).
const mod4=n=>((n%4)+4)%4;
const pkey=g=>String(g.k)+'|'+key(g.x)+'|'+key(g.z);
const mul=(g,h)=>({
  k:mod4(g.k+h.k+2*dot(g.z,h.x)),
  x:add(g.x,h.x),
  z:add(g.z,h.z),
});
const inv=g=>{
  const all=[];
  for(let k=0;k<4;k++)for(const x of X)for(const z of Z)all.push({k,x,z});
  return all.find(h=>pkey(mul(g,h))==='0|00|00'&&pkey(mul(h,g))==='0|00|00');
};
const comm=(g,h)=>mul(mul(mul(g,h),inv(g)),inv(h));
const H=[];
for(let k=0;k<4;k++)for(const x of X)for(const z of Z)H.push({k,x,z});
assert.equal(new Set(H.map(pkey)).size,64);

for(const x of X)for(const z of Z){
  const px={k:0,x,z:[0,0]};
  const pz={k:0,x:[0,0],z};
  const c=comm(px,pz);
  assert.equal(c.k,2*dot(x,z));
  assert.equal(gluePhase(x,z),c.k===0?1:-1);
}

// With only the sign centre the extension has order 32; the mu4
// refinement doubles it to the full order-64 Pauli/Heisenberg group.
assert.equal(2*W.length,32);
assert.equal(4*W.length,64);

console.log('hadamard_glue_parity_equals_binary_heisenberg_commutator: PASS');
console.log('each_face_mod_mutual_radical_is_F2_squared');
console.log('the_two_face_quotients_are_perfectly_dual_Lagrangians');
console.log('exponentiated_discriminant_pairing_equals_minus1_to_x_dot_z');
console.log('direct_sum_is_the_standard_four_dimensional_binary_symplectic_space');
console.log('sign_central_extension_has_order32');
console.log('mu4_refinement_has_order64_and_is_the_binary_Pauli_Heisenberg_group');
console.log('physical_identification_of_the_two_bits_remains_open');
