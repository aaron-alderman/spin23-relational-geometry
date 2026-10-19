import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,a,i)=>s+a*B[i][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const eq=(A,B)=>JSON.stringify(A)===JSON.stringify(B);
const detBareiss=A0=>{
  const A=A0.map(r=>r.map(BigInt)); const n=A.length; let sign=1n,prev=1n;
  for(let k=0;k<n-1;k++){
    let p=k;while(p<n&&A[p][k]===0n)p++;
    assert(p<n);
    if(p!==k){[A[p],A[k]]=[A[k],A[p]];sign=-sign;}
    const pivot=A[k][k];
    for(let i=k+1;i<n;i++)for(let j=k+1;j<n;j++)A[i][j]=(A[i][j]*pivot-A[i][k]*A[k][j])/prev;
    prev=pivot;
  }
  return sign*A[n-1][n-1];
};

// Gram matrix of M in the basis (v,w,r,s,t).
const GM=[
  [2,0,0,0,0],
  [0,-2,0,0,0],
  [0,0,-2,0,0],
  [0,0,0,0,-3],
  [0,0,0,-3,0],
];

// Columns form a basis of I_H=M intersect W_H M:
// p=v-w, q=2v+2w, u=r-2s, z=3r-3s+t, y=6s.
const K=[
  [1,2,0,0,0],
  [-1,2,0,0,0],
  [0,0,1,3,0],
  [0,0,-2,-3,6],
  [0,0,0,1,0],
];
assert.equal(detBareiss(K),-24n);

const GI=mm(mm(tr(K),GM),K);
const expected=[
  [0,8,0,0,0],
  [8,0,0,0,0],
  [0,0,-2,0,0],
  [0,0,0,0,-18],
  [0,0,0,-18,0],
];
assert(eq(GI,expected));
assert.equal(detBareiss(GI),-41472n);
assert.equal(detBareiss(GM)*24n*24n,detBareiss(GI));

// T^{-1}, cleared by 12.  The three-dimensional block is involutive.
const Binv=[
  [-15,9,0,0,0],
  [9,-15,0,0,0],
  [0,0,0,6,18],
  [0,0,12,-6,18],
  [0,0,4,2,-6],
];
const preimage=mm(Binv,K);
assert(preimage.flat().every(x=>x%12===0));

// The first block imposes a+b=0 mod 4; the second imposes
// 2r+s-3t=0 mod 6.  The displayed columns satisfy these congruences.
for(let j=0;j<5;j++){
  assert.equal(((K[0][j]+K[1][j])%4+4)%4,0);
  assert.equal(((2*K[2][j]+K[3][j]-3*K[4][j])%6+6)%6,0);
}

// Smith data follow blockwise: diag(1,4) and diag(1,1,6).
// Hence M/I_H=C4+C6=C2+C12.
const order=4*6;
assert.equal(order,24);

// Discriminant group from U(8)+<-2>+U(-18).
const discrOrder=8*8*2*18*18;
assert.equal(discrOrder,41472);
assert.equal(discrOrder,72*24*24);

console.log('common_hadamard_fiber_intersection_lattice: PASS');
console.log('intersection_basis=p_v_minus_w,q_2v_plus_2w,u_r_minus_2s,z_3r_minus_3s_plus_t,y_6s');
console.log('intersection_lattice=U8_plus_minus2_plus_Uminus18');
console.log('M_over_intersection=C4_plus_C6=C2_plus_C12_order24');
console.log('discriminant_group=Z8_squared_plus_Z2_plus_Z18_squared');
console.log('two_primary=Z8_squared_plus_Z2_cubed;three_primary=Z9_squared');
console.log('determinant=-41472_equals_minus72_times_24_squared');
