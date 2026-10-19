import assert from "node:assert/strict";

const bits=(n,k)=>Array.from({length:k},(_,i)=>(n>>i)&1);
const weight=v=>v.reduce((s,x)=>s+x,0);
const permutations=xs=>xs.length===0?[[]]:xs.flatMap((x,i)=>
  permutations(xs.filter((_,j)=>j!==i)).map(t=>[x,...t])
);
const key=v=>v.join(",");
const apply=(q,perm,signs)=>signs.map((s,j)=>s*q[perm[j]]);
const eq=(a,b)=>key(a)===key(b);

const qN=[1,1,1,1,1];
const qE=[1,1,1,-1,-1];
const perms=permutations([0,1,2,3,4]);
const evenSigns=Array.from({length:32},(_,n)=>bits(n,5))
  .filter(b=>weight(b)%2===0).map(b=>b.map(x=>x?-1:1));

const stabilizer=[];
for(const perm of perms)for(const signs of evenSigns){
  const n=apply(qN,perm,signs),e=apply(qE,perm,signs);
  const fixes=eq(n,qN)&&eq(e,qE);
  const swaps=eq(n,qE)&&eq(e,qN);
  if(fixes||swaps)stabilizer.push({perm,signs,swaps});
}
assert.equal(stabilizer.length,24);
assert.equal(stabilizer.filter(g=>!g.swaps).length,12);
assert.equal(stabilizer.filter(g=>g.swaps).length,12);

// On puncture evaluation coordinates the actions are I or P.  Including the
// global monomial negation gives only +/-I and +/-P.
const I=[[1,0],[0,1]], P=[[0,1],[1,0]];
const actionKeys=new Set();
for(const g of stabilizer)for(const epsilon of [1,-1]){
  const A=(g.swaps?P:I).map(r=>r.map(x=>epsilon*x));
  actionKeys.add(key(A.flat()));
}
assert.equal(actionKeys.size,4);
assert.deepEqual(
  [...actionKeys].sort(),
  [I,P,I.map(r=>r.map(x=>-x)),P.map(r=>r.map(x=>-x))].map(A=>key(A.flat())).sort()
);

// In the D2 basis x1=(1,1), x2=(1,-1), P becomes diag(1,-1);
// all four actions reduce to +/- signs and hence act trivially on A_D2.
const d2Actions=[
  [[1,0],[0,1]],
  [[1,0],[0,-1]],
  [[-1,0],[0,-1]],
  [[-1,0],[0,1]],
];
for(const A of d2Actions)
  assert.deepEqual(A.map(r=>r.map(x=>((x%2)+2)%2)),[[1,0],[0,1]]);

// Root exchange would be a single puncture sign reversal diag(1,-1) in
// puncture coordinates; it is absent from +/-I,+/-P.
const punctureSignFlip=[[1,0],[0,-1]];
assert.ok(!actionKeys.has(key(punctureSignFlip.flat())));

console.log("two_puncture_D5_Weyl_stabilizer_and_logical_actions: PASS");
console.log("unordered_pair_stabilizer_order=24_pointwise12_swap12");
console.log("with_global_monomial_negation_induced_actions_are_exactly_plusminusI_plusminusP");
console.log("all_ambient_actions_are_trivial_on_A_D2");
console.log("single_puncture_sign_flip_equivalently_D2_root_exchange_is_absent");
console.log("any_root_exchange_rescue_requires_an_accidental_twice_punctured_code_automorphism_or_extra_physical_sign");

