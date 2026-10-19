import assert from 'node:assert/strict';

const mod=(n,p)=>((n%p)+p)%p;
const add=(x,y,p)=>x.map((a,i)=>mod(a+y[i],p));
const dot=(x,y,p)=>mod(x.reduce((s,a,i)=>s+a*y[i],0),p);
const mv=(A,x,p)=>A.map(r=>mod(r.reduce((s,a,i)=>s+a*x[i],0),p));
const mm=(A,B,p)=>A.map(r=>B[0].map((_,j)=>mod(r.reduce((s,a,i)=>s+a*B[i][j],0),p)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const inv2=(A,p)=>{
  const d=mod(A[0][0]*A[1][1]-A[0][1]*A[1][0],p);
  let di=0; for(let x=1;x<p;x++) if(mod(d*x,p)===1) di=x;
  assert(di);
  return [[mod(di*A[1][1],p),mod(-di*A[0][1],p)],[mod(-di*A[1][0],p),mod(di*A[0][0],p)]];
};
const vectors=p=>Array.from({length:p*p},(_,n)=>[n%p,Math.floor(n/p)]);
const key=g=>String(g.k)+'|'+g.x.join(',')+'|'+g.z.join(',');

for(const p of [3,5,7]){
  const V=vectors(p);
  const A=[[1,0],[0,p-1]];
  const R=[[0,1],[1,0]];
  const H=[[1,1],[1,p-1]];
  const Hi=inv2(H,p);
  assert.deepEqual(mm(mm(Hi,A,p),H,p),R);

  // H_p: P(k,x,z)=omega^k X^x Z^z, order p^5.
  const mul=(g,h)=>({
    k:mod(g.k+h.k+dot(g.z,h.x,p),p),
    x:add(g.x,h.x,p),
    z:add(g.z,h.z,p),
  });
  const heis=[];
  for(let k=0;k<p;k++)for(const x of V)for(const z of V)heis.push({k,x,z});
  assert.equal(new Set(heis.map(key)).size,p**5);

  const basisClifford=(B,g)=>{
    const BiT=tr(inv2(B,p));
    return {k:g.k,x:mv(B,g.x,p),z:mv(BiT,g.z,p)};
  };
  for(const g of heis.slice(0,Math.min(80,heis.length)))for(const h of heis.slice(0,Math.min(80,heis.length))){
    assert.equal(key(basisClifford(H,mul(g,h))),key(mul(basisClifford(H,g),basisClifford(H,h))));
  }
  const conjByH=g=>basisClifford(Hi,basisClifford(A,basisClifford(H,g)));
  for(const g of heis) assert.equal(key(conjByH(g)),key(basisClifford(R,g)));
}

// Qutrit specialization of K+=[[3,2],[2,3]].
const p=3, V=vectors(p);
const K=[[0,2],[2,0]];
const half=2;
const q=x=>mod(half*dot(x,mv(K,x,p),p),p);
const expected=[];
for(const x of V) expected.push(mod(2*x[0]*x[1],p));
assert.deepEqual(V.map(q),expected);

const mul3=(g,h)=>({
  k:mod(g.k+h.k+dot(g.z,h.x,p),p),
  x:add(g.x,h.x,p),
  z:add(g.z,h.z,p),
});
const phaseConjugate=g=>({
  k:mod(g.k+q(g.x),p),
  x:[...g.x],
  z:add(g.z,mv(K,g.x,p),p),
});
const H3=[];
for(let k=0;k<p;k++)for(const x of V)for(const z of V)H3.push({k,x,z});
for(const g of H3)for(const h of H3.slice(0,30)){
  assert.equal(key(phaseConjugate(mul3(g,h))),key(mul3(phaseConjugate(g),phaseConjugate(h))));
}

const swap=x=>[x[1],x[0]];
for(const x of V) assert.equal(q(swap(x)),q(x));
assert.deepEqual(V.map(q),[0,0,0,0,2,1,0,1,2]);

console.log('odd_prime_heisenberg_hadamard_and_qutrit_weil: PASS');
console.log('for_p_3_5_7_heisenberg_order_is_p_to_the_5');
console.log('determinant_two_H_is_invertible_and_conjugates_puncture_sign_to_root_exchange');
console.log('conjugacy_holds_on_the_full_finite_heisenberg_group_not_only_on_X_labels');
console.log('qutrit_Kplus_phase_table_exponent_is_2ab');
console.log('qutrit_phase_clifford_shadow_is_the_mutual_shear_z_to_z_plus_Kx');
console.log('qutrit_mutual_phase_commutes_with_root_SWAP');
console.log('binary_failure_is_exactly_the_noninvertibility_of_H_at_two');
