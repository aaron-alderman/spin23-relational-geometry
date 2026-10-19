import assert from 'node:assert/strict';

const det=A=>A.length===1?A[0][0]:A[0].reduce((s,x,j)=>s+(j%2?-1:1)*x*det(A.slice(1).map(r=>r.filter((_,k)=>k!==j))),0);
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mv=(A,v)=>A.map(r=>r.reduce((s,a,i)=>s+a*v[i],0));
const adj=A=>tr(A.map((_,i)=>A.map((__,j)=>{
  const m=A.filter((_,r)=>r!==i).map(row=>row.filter((_,c)=>c!==j));
  return ((i+j)&1?-1:1)*det(m);
})));
const mod=(n,m)=>((n%m)+m)%m;
const add=(x,y)=>x.map((a,i)=>a+y[i]);
const scale=(a,x)=>x.map(v=>a*v);

const Iold=[
  [1,-1,3,-7,3],[-1,-1,-3,7,-3],[0,0,-4,4,0],
  [0,-2,-2,4,0],[0,0,2,-4,2],
];
const d=Math.abs(det(Iold)), adjI=adj(Iold);
const coset=x=>mv(adjI,x).map(v=>mod(v,d)).join(',');
const pi=x=>[mod(x[0]+x[1],2),mod(x[3]+x[4],2)];

const classes=new Map();
for(let a=0;a<4;a++)for(let b=0;b<4;b++)for(let c=0;c<4;c++)for(let e=0;e<4;e++)for(let f=0;f<4;f++){
  const x=[a,b,c,e,f],k=coset(x);if(!classes.has(k))classes.set(k,x);
}
assert.equal(classes.size,32);
const kernel=[...classes.values()].filter(x=>pi(x)[0]===0&&pi(x)[1]===0);
assert.equal(kernel.length,8);

const r=[0,0,1,0,0];
const delta=[0,0,0,1,1]; // s+t, the oriented weak difference
const generated=new Map();
for(let a=0;a<4;a++)for(let b=0;b<2;b++){
  const x=add(scale(a,r),scale(b,delta));generated.set(coset(x),x);
}
assert.equal(generated.size,8);
assert.deepEqual(new Set(generated.keys()),new Set(kernel.map(coset)));
assert.notEqual(coset(scale(2,r)),coset([0,0,0,0,0]));
assert.equal(coset(scale(4,r)),coset([0,0,0,0,0]));
assert.equal(coset(scale(2,delta)),coset([0,0,0,0,0]));

// New face quotient M/I_H = C4+C6.
const rho=x=>[mod(x[0]+x[1],4),mod(2*x[2]+x[3]-3*x[4],6)];
assert.deepEqual(rho(r),[0,2]);
assert.deepEqual(rho(delta),[0,4]);
assert.deepEqual(rho(add(r,delta)),[0,0]);

// Both images lie in the C2+C3 mutual radical: both coefficients are even.
// Pairing with any opposite-face class (c,d) is (A*c+B*d)/2 mod 1.
for(let c=0;c<4;c++)for(let e=0;e<6;e++){
  for(const x of [rho(r),rho(delta)]){
    assert.equal(mod(x[0]*c+x[1]*e,2),0);
  }
}

console.log('orientation_weak_difference_across_intersections: PASS');
console.log('old_glue_parity_kernel_is_Z4_r_plus_Z2_s_plus_t_of_order8');
console.log('in_M_over_IH_r_maps_to_order3_class_2h6');
console.log('in_M_over_IH_s_plus_t_maps_to_inverse_order3_class_4h6');
console.log('r_plus_s_plus_t_lies_in_the_common_Hadamard_core_IH');
console.log('both_classes_are_in_the_mutual_radical_and_invisible_to_the_opposite_face');
console.log('Hadamard_core_converts_old_quartic_orientation_and_weak_difference_into_a_ternary_radical_pair');
