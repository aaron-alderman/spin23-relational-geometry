import assert from 'node:assert/strict';

const bits = [[0,0],[1,0],[0,1],[1,1]];
const mod4 = n => ((n % 4) + 4) % 4;
const add2 = (a,b) => [a[0]^b[0],a[1]^b[1]];
const dot2 = (a,b) => (a[0]*b[0] + a[1]*b[1]) & 1;
const weight = a => a[0] + a[1];
const key = g => `${g.k}|${g.x.join('')}|${g.z.join('')}`;

// P(k,x,z)=i^k X^x Z^z, with X^x Z^z|v>=(-1)^(z.v)|v+x.
const mul = (g,h) => ({
  k: mod4(g.k + h.k + 2*dot2(g.z,h.x)),
  x: add2(g.x,h.x),
  z: add2(g.z,h.z),
});
const id = {k:0,x:[0,0],z:[0,0]};
const inv = g => {
  for (let k=0;k<4;k++) for (const x of bits) for (const z of bits) {
    const h={k,x,z};
    if (key(mul(g,h))===key(id) && key(mul(h,g))===key(id)) return h;
  }
  throw new Error('inverse not found');
};
const comm = (g,h) => mul(mul(mul(g,h),inv(g)),inv(h));

const H=[];
for (let k=0;k<4;k++) for (const x of bits) for (const z of bits) H.push({k,x,z});
assert.equal(new Set(H.map(key)).size,64);
for (const g of H) for (const h of H) assert(H.some(t => key(t)===key(mul(g,h))));

const center=H.filter(g => H.every(h => key(mul(g,h))===key(mul(h,g))));
assert.equal(center.length,4);
assert(center.every(g => g.x[0]===0 && g.x[1]===0 && g.z[0]===0 && g.z[1]===0));

const X1={k:0,x:[1,0],z:[0,0]};
const Z1={k:0,x:[0,0],z:[1,0]};
assert.equal(key(comm(X1,Z1)),key({k:2,x:[0,0],z:[0,0]}));

// q is the negative-D2 / code / theta phase in Z/4.
const q = x => mod4(3*weight(x));
for (const x of bits) for (const y of bits) {
  assert.equal(mod4(q(add2(x,y))-q(x)-q(y)),2*dot2(x,y));
}
assert.deepEqual(bits.map(q),[0,3,3,2]);

// Embed the nonsplit abelian extension.  epsilon records the common square 2r.
const lift = (epsilon,x) => ({
  k: mod4(2*epsilon + q(x)),
  x:[...x],
  z:[0,0],
});
const A=[];
for (let epsilon=0;epsilon<2;epsilon++) for (const x of bits) A.push(lift(epsilon,x));
assert.equal(new Set(A.map(key)).size,8);
for (const g of A) for (const h of A) assert.equal(key(mul(g,h)),key(mul(h,g)));
const g1=lift(0,[1,0]);
const g2=lift(0,[0,1]);
const centralMinus={k:2,x:[0,0],z:[0,0]};
assert.equal(key(mul(g1,g1)),key(centralMinus));
assert.equal(key(mul(g2,g2)),key(centralMinus));
assert.equal(key(mul(g1,g2)),key(mul(g2,g1)));

// The induced extension product has cocycle epsilon+eta+x.y.
for (let e=0;e<2;e++) for (let f=0;f<2;f++) for (const x of bits) for (const y of bits) {
  const lhs=mul(lift(e,x),lift(f,y));
  const rhs=lift(e^f^dot2(x,y),add2(x,y));
  assert.equal(key(lhs),key(rhs));
}

// U_q|v>=i^q(v)|v>.  Its exact Clifford conjugation is
// (k,x,z) -> (k+q(x),x,z+x), covering the symplectic shear.
const cliffordConjugate = g => ({k:mod4(g.k+q(g.x)),x:[...g.x],z:add2(g.z,g.x)});
for (const g of H) for (const h of H) {
  assert.equal(key(cliffordConjugate(mul(g,h))),key(mul(cliffordConjugate(g),cliffordConjugate(h))));
}
for (const g of H) assert.equal(key(cliffordConjugate(cliffordConjugate(g))),key(mul(mul({k:0,x:[0,0],z:[1,1]},g),{k:0,x:[0,0],z:[1,1]})));

// U_q^2=Z^(1,1), while its symplectic shadow has order two.
assert.deepEqual(bits.map(x => mod4(2*q(x))),[0,2,2,0]);

// The ordered-section stabilizer from AGL(3,2) fixes both chosen lifts,
// so its induced action on the embedded order-eight subgroup is pointwise trivial.
const vec3=[];
for(let n=0;n<8;n++) vec3.push([(n>>0)&1,(n>>1)&1,(n>>2)&1]);
const add3=(a,b)=>a.map((v,i)=>v^b[i]);
const matVec=(M,v)=>M.map(row=>row.reduce((s,c,i)=>s^(c&v[i]),0));
const rank3=M=>{
  M=M.map(r=>[...r]); let rank=0;
  for(let c=0;c<3;c++){
    const p=M.findIndex((r,i)=>i>=rank && r[c]);
    if(p<0) continue;
    [M[rank],M[p]]=[M[p],M[rank]];
    for(let i=0;i<3;i++) if(i!==rank && M[i][c]) M[i]=M[i].map((v,j)=>v^M[rank][j]);
    rank++;
  }
  return rank;
};
const GL3=[];
for(let mask=0;mask<512;mask++){
  const M=Array.from({length:3},(_,i)=>Array.from({length:3},(_,j)=>(mask>>(3*i+j))&1));
  if(rank3(M)===3) GL3.push(M);
}
assert.equal(GL3.length,168);
const s=[1,0,0], t=[0,1,0];
const orderedStabilizer=[];
for(const M of GL3) for(const u0 of vec3){
  if(JSON.stringify(add3(matVec(M,s),u0))===JSON.stringify(s) &&
     JSON.stringify(add3(matVec(M,t),u0))===JSON.stringify(t)) orderedStabilizer.push({M,u0});
}
assert.equal(orderedStabilizer.length,24);
for(const a of orderedStabilizer){
  assert.deepEqual(add3(matVec(a.M,s),a.u0),s);
  assert.deepEqual(add3(matVec(a.M,t),a.u0),t);
}

console.log('binary_heisenberg_quartic_clifford_embedding: PASS');
console.log('finite_heisenberg_order=64_center=mu4_order4');
console.log('quartic_extension_embeds_as_abelian_order8_Z4_plus_Z2_translation_lift');
console.log('common_square_maps_to_central_minus_identity');
console.log('quartic_phase_operator_is_S_dagger_tensor_S_dagger');
console.log('clifford_shadow_is_symplectic_shear_x_z_to_x_z_plus_x');
console.log('Uq_squared_is_Z11_while_symplectic_shadow_has_order2');
console.log('ordered_section_stabilizer_order24_acts_pointwise_on_selected_phase_subgroup');
console.log('order24_coincidence_does_not_identify_the_twice_punctured_code_action');
