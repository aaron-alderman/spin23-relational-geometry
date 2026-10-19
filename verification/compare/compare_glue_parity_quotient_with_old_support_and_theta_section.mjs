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

// Old source-wedge intersection I inside M, basis (v,w,r,s,t).
const I=[
  [1,-1,3,-7,3],
  [-1,-1,-3,7,-3],
  [0,0,-4,4,0],
  [0,-2,-2,4,0],
  [0,0,2,-4,2],
];
const d=Math.abs(det(I)); assert.equal(d,32);
const adjI=adj(I);
const cosetKey=x=>mv(adjI,x).map(v=>mod(v,d)).join(',');

// New Hadamard-glue parity quotient.
const pi=x=>[mod(x[0]+x[1],2),mod(x[3]+x[4],2)];

// pi vanishes on every old-I generator, so it descends through G=M/I.
for(let j=0;j<5;j++)assert.deepEqual(pi(I.map(r=>r[j])),[0,0]);

const classes=new Map();
for(let a=0;a<4;a++)for(let b=0;b<4;b++)for(let c=0;c<4;c++)for(let e=0;e<4;e++)for(let f=0;f<4;f++){
  const x=[a,b,c,e,f], k=cosetKey(x);
  if(!classes.has(k))classes.set(k,x);
}
assert.equal(classes.size,32);
const fibers=new Map();
for(const x of classes.values()){const k=pi(x).join('');fibers.set(k,(fibers.get(k)??0)+1);}
assert.deepEqual(Object.fromEntries([...fibers].sort()),{'00':8,'01':8,'10':8,'11':8});

const v=[1,0,0,0,0], w=[0,1,0,0,0], r=[0,0,1,0,0], s=[0,0,0,1,0], t=[0,0,0,0,1];
assert.deepEqual(pi(w),[1,0]); // color/selector radical
assert.deepEqual(pi(s),[0,1]);
assert.deepEqual(pi(t),[0,1]);
assert.deepEqual(pi(add(s,t)),[0,0]); // oriented weak difference is killed
assert.deepEqual(pi(r),[0,0]); // independent quartic orientation direction is killed

const theta1=add(s,scale(-1,r));
const theta2=add(t,scale(-1,r));
assert.deepEqual(pi(theta1),[0,1]);
assert.deepEqual(pi(theta2),[0,1]);

// Puncture exchange s<->t is trivial on the quotient.
const exchange=x=>[x[0],x[1],x[2],x[4],x[3]];
for(const x of classes.values())assert.deepEqual(pi(exchange(x)),pi(x));

console.log('glue_parity_vs_old_support_theta_section: PASS');
console.log('glue_parity_descends_surjectively_from_G=M_over_I_with_kernel_order8');
console.log('color_selector_w_maps_to_first_bit');
console.log('both_oriented_weak_classes_s_t_map_to_the_same_second_bit');
console.log('weak_difference_s_plus_t_is_killed');
console.log('both_theta_lifts_s_minus_r_t_minus_r_collapse_to_one_parity_class');
console.log('quartic_r_direction_is_killed_and_cannot_supply_mu4_through_this_quotient');
console.log('puncture_exchange_is_trivial_on_the_glue_parity_quotient');
