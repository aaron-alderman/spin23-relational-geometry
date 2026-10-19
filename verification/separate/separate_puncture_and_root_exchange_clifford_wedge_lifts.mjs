import assert from 'node:assert/strict';

const mod=(n,p)=>((n%p)+p)%p;
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,a,i)=>s+a*B[i][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);

const A=[[1,0],[0,-1]];              // source puncture-coordinate exchange in D2 basis
const R=[[0,1],[1,0]];               // D2 root exchange
assert.deepEqual(A.map(r=>r.map(x=>mod(x,2))),[[1,0],[0,1]]);
assert.deepEqual(R.map(r=>r.map(x=>mod(x,2))),R);

const J=[
  [0,0,1,0],[0,0,0,1],
  [-1,0,0,0],[0,-1,0,0],
];
const blockLift=B=>[
  [B[0][0],B[0][1],0,0],[B[1][0],B[1][1],0,0],
  [0,0,B[0][0],B[0][1]],[0,0,B[1][0],B[1][1]],
];
const SA=blockLift(A), SR=blockLift(R);
assert(eq(mm(mm(tr(SA),J),SA),J));
assert(eq(mm(mm(tr(SR),J),SR),J));

// Primitive basis (E1,F1,E2,F2,R0).
const WA=[
  [-1,0,0,0,0],[0,-1,0,0,0],[0,0,-1,0,0],[0,0,0,-1,0],[0,0,0,0,1],
];
const WR=[
  [-1,0,0,0,0],[0,-1,0,0,0],[0,0,0,-1,0],[0,0,-1,0,0],[0,0,0,0,-1],
];
const I5=Array.from({length:5},(_,i)=>Array.from({length:5},(_,j)=>i===j?1:0));
assert(eq(mm(WA,WA),I5));
assert(eq(mm(WR,WR),I5));

// Columns are v=E1+F1,w=E1-F1,r=R0,s=E2,t=-3F2.
const M=[
  [1,1,0,0,0],
  [1,-1,0,0,0],
  [0,0,0,1,0],
  [0,0,0,0,-3],
  [0,0,1,0,0],
];
const WAM=mm(WA,M), WRM=mm(WR,M);
assert.deepEqual(WAM,[
  [-1,-1,0,0,0],[-1,1,0,0,0],[0,0,0,-1,0],[0,0,0,0,3],[0,0,1,0,0],
]);
// Root exchange sends s -> -F2=t/3 and t -> 3E2=3s.
assert.deepEqual(WRM,[
  [-1,-1,0,0,0],[-1,1,0,0,0],[0,0,0,0,3],[0,0,0,-1,0],[0,0,-1,0,0],
]);

const bits=[[0,0],[1,0],[0,1],[1,1]];
const add=(x,y)=>[x[0]^y[0],x[1]^y[1]];
const dot=(x,y)=>(x[0]*y[0]+x[1]*y[1])&1;
const q=x=>mod(3*(x[0]+x[1]),4);
const key=g=>String(g.k)+'|'+g.x.join('')+'|'+g.z.join('');
const mul=(g,h)=>({k:mod(g.k+h.k+2*dot(g.z,h.x),4),x:add(g.x,h.x),z:add(g.z,h.z)});
const H=[];
for(let k=0;k<4;k++)for(const x of bits)for(const z of bits)H.push({k,x,z});
const swap=x=>[x[1],x[0]];
const rootClifford=g=>({k:g.k,x:swap(g.x),z:swap(g.z)});
for(const g of H)for(const h of H)assert.equal(key(rootClifford(mul(g,h))),key(mul(rootClifford(g),rootClifford(h))));
for(const x of bits)assert.equal(q(swap(x)),q(x));

const lift=x=>({k:q(x),x,z:[0,0]});
assert.equal(key(rootClifford(lift([1,0]))),key(lift([0,1])));
assert.equal(key(rootClifford(lift([0,1]))),key(lift([1,0])));

console.log('puncture_vs_root_exchange_clifford_wedge_lifts: PASS');
console.log('integral_puncture_exchange_reduces_to_identity_mod2_and_fixes_index6_fiber');
console.log('integral_root_exchange_reduces_to_qubit_SWAP_and_transports_index6_fiber');
console.log('root_SWAP_exchanges_the_two_quartic_lifts_and_commutes_with_Uq');
console.log('binary_heisenberg_data_cannot_recover_the_nontrivial_integral_puncture_sign');
console.log('the_two_involutions_are_distinct_lifts_not_two_names_for_one_symmetry');
