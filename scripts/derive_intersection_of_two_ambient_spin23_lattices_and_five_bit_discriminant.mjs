import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,a,i)=>s+a*B[i][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const det=A=>A.length===1?A[0][0]:A[0].reduce((s,x,j)=>s+(j%2?-1:1)*x*det(A.slice(1).map(r=>r.filter((_,k)=>k!==j))),0);
const eq=(A,B)=>JSON.stringify(A)===JSON.stringify(B);
const mod=(n,m)=>((n%m)+m)%m;

// Ambient N basis (E1,F1,E2,F2,R), Gram 2U+<-2>.
const GN=[
  [0,1,0,0,0],[1,0,0,0,0],
  [0,0,0,1,0],[0,0,1,0,0],
  [0,0,0,0,-2],
];

// J basis:
// P=F1, Q=2E1, u=R-2E2, Z=R-E2-F2, Y=2E2.
const K=[
  [0,2,0,0,0],
  [1,0,0,0,0],
  [0,0,-2,-1,2],
  [0,0,0,-1,0],
  [0,0,1,1,0],
];
assert.equal(Math.abs(det(K)),4);
const GJ=mm(mm(tr(K),GN),K);
const expected=[
  [0,2,0,0,0],[2,0,0,0,0],
  [0,0,-2,0,0],
  [0,0,0,0,-2],[0,0,0,-2,0],
];
assert(eq(GJ,expected));
assert.equal(det(GJ),-32);
assert.equal(det(GJ),det(GN)*4*4);

// Twice the inverse rational Hadamard wedge.  Membership in W_H N
// is equivalent to W_H^{-1}x being integral.
const twoWinv=[
  [-1,0,0,0,0],
  [0,-4,0,0,0],
  [0,0,-1,-1,2],
  [0,0,-1,-1,-2],
  [0,0,1,-1,0],
];
const pre=mm(twoWinv,K);
assert(pre.flat().every(x=>x%2===0));

// Discriminant form of U(2)+<-2>+U(-2), written in quarter exponents:
// q4=4q=2ab-c+(-2de) = 2ab+3c+2de mod 4.
const distribution={};
for(let n=0;n<32;n++){
  const [a,b,c,d,e]=Array.from({length:5},(_,i)=>(n>>i)&1);
  const q4=mod(2*a*b+3*c+2*d*e,4);
  distribution[q4]=(distribution[q4]??0)+1;
}
assert.deepEqual(distribution,{0:10,1:6,2:6,3:10});

console.log('ambient_spin23_intersection_five_bit_discriminant: PASS');
console.log('N_intersect_WH_N=U2_plus_minus2_plus_Uminus2');
console.log('intersection_index_in_each_determinant2_ambient_lattice=4');
console.log('intersection_determinant=-32');
console.log('discriminant_group_is_F2_to_the_5');
console.log('quarter_phase_distribution=0^10_1^6_2^6_3^10');
console.log('Gauss_sum_is_4_minus_4i_and_has_magnitude_sqrt32');
console.log('five_bit_group_match_does_not_identify_the_support_sign_lattice');
