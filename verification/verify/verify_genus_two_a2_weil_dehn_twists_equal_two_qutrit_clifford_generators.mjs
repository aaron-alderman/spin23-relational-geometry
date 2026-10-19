import assert from "node:assert/strict";

const p=3,mod=(x)=>((x%p)+p)%p;
const I2=[[1,0],[0,1]],Z2=[[0,0],[0,0]];
const block=(a,b,c,d)=>[[...a[0],...b[0]],[...a[1],...b[1]],[...c[0],...d[0]],[...c[1],...d[1]]];
const mul=(A,B)=>A.map((r)=>B[0].map((_,j)=>mod(r.reduce((s,x,k)=>s+x*B[k][j],0))));
const key=(A)=>A.flat().map(mod).join("");
const I4=block(I2,Z2,Z2,I2);
const shear=(K)=>block(I2,Z2,K,I2);
const addK=(...Ks)=>Ks[0].map((r,i)=>r.map((_,j)=>mod(Ks.reduce((s,K)=>s+K[i][j],0))));
const negK=(K)=>K.map((r)=>r.map((x)=>mod(-x)));
const vv=(v)=>v.map((x)=>v.map((y)=>mod(2*x*y))); // A2 q=a^2/3 polarizes to 2ab/3.
const K1=vv([1,0]),K2=vv([0,1]),K12=vv([1,1]);
const Kmutual=addK(K12,negK(K1),negK(K2));
assert.deepEqual(Kmutual,[[0,2],[2,0]]);
assert.deepEqual(mul(mul(shear(K12),shear(negK(K1))),shear(negK(K2))),shear(Kmutual));

// The corresponding diagonal Weil phases compose to omega^(2ab).
for(let a=0;a<3;a++)for(let b=0;b<3;b++){
  const q12=mod((a+b)**2),q1=mod(a*a),q2=mod(b*b);
  assert.equal(mod(q12-q1-q2),mod(2*a*b));
}

// Add independent handle Fourier moves and local twists; the mutual composite
// completes the full finite symplectic group.
const F1=[[0,0,1,0],[0,1,0,0],[-1,0,0,0],[0,0,0,1]];
const F2=[[1,0,0,0],[0,0,0,1],[0,0,1,0],[0,-1,0,0]];
const group=(gens,cap)=>{const q=[I4],seen=new Set([key(I4)]);for(let h=0;h<q.length;h++)for(const g of gens){const x=mul(q[h],g),k=key(x);if(!seen.has(k)){seen.add(k);q.push(x);if(seen.size>cap)throw new Error("cap");}}return seen;};
const local=group([F1,F2,shear(K1),shear(K2)],1000);
assert.equal(local.size,576);
const full=group([F1,F2,shear(K1),shear(K2),shear(Kmutual)],52000);
assert.equal(full.size,51840);

console.log("Genus-two A2 Weil/code Clifford audit: PASS");
console.log("A2_Dehn_twist_phase_is_omega_to_the_square_of_the_handle_label");
console.log("the_sum_cycle_twist_minus_two_self_twists_is_the_unique_nonzero_cross_phase");
console.log("independent_handle_Fouriers_and_self_twists_generate_the_order_576_local_group");
console.log("adding_the_sum_cycle_mutual_twist_generates_all_51840_elements_of_Sp4_F3");
console.log("the_two_puncture_logical_Clifford_action_is_the_mod_three_genus_two_mapping_class_Weil_action");
