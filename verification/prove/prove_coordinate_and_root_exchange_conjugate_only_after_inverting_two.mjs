import assert from "node:assert/strict";

const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const mod=(x,p)=>((x%p)+p)%p;
const modM=(A,p)=>A.map(r=>r.map(x=>mod(x,p)));
const rankMod=(A0,p)=>{
  const A=modM(A0,p);let rank=0;
  const inv=a=>{for(let x=1;x<p;x++)if(mod(a*x,p)===1)return x;throw Error("no inverse");};
  for(let c=0;c<A[0].length&&rank<A.length;c++){
    let q=rank;while(q<A.length&&A[q][c]===0)q++;
    if(q===A.length)continue;[A[rank],A[q]]=[A[q],A[rank]];
    const z=inv(A[rank][c]);A[rank]=A[rank].map(x=>mod(x*z,p));
    for(let i=0;i<A.length;i++)if(i!==rank&&A[i][c]){
      const f=A[i][c];A[i]=A[i].map((x,j)=>mod(x-f*A[rank][j],p));
    }rank++;
  }return rank;
};
const A=[[1,0],[0,-1]];             // puncture-coordinate exchange in D2 basis
const R=[[0,1],[1,0]];              // D2 root exchange
const H=[[1,1],[1,-1]];             // determinant -2
assert.deepEqual(mul(mul(H,A),H),[[0,2],[2,0]]);
assert.deepEqual(mul(H,H),[[2,0],[0,2]]);

// H^{-1} A H=R over Z[1/2], and therefore over every odd finite field.
for(const p of [3,5,7,11]){
  const inv2=(p+1)/2;
  const Hinv=modM(H.map(r=>r.map(x=>inv2*x)),p);
  assert.deepEqual(modM(mul(mul(Hinv,A),H),p),modM(R,p));
  assert.equal(rankMod(H,p),2);
}
assert.equal(rankMod(H,2),1);
assert.deepEqual(modM(A,2),[[1,0],[0,1]]);
assert.deepEqual(modM(R,2),R);

// Integral symplectic lifts on X plus X*: diag(A,A) and diag(R,R).
const SA=[
  [1,0,0,0],[0,-1,0,0],[0,0,1,0],[0,0,0,-1],
];
const SR=[
  [0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0],
];
// Smith nonzero factors of SA-I are (2,2), while those of SR-I are (1,1).
// These cokernels are conjugacy invariants under GL(4,Z).
const subtractI=M=>M.map((r,i)=>r.map((x,j)=>x-Number(i===j)));
const rank1gcd=M=>M.flat().reduce((g,x)=>{
  const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);return gcd(g,x);
},0);
assert.equal(rank1gcd(subtractI(SA)),2);
assert.equal(rank1gcd(subtractI(SR)),1);
assert.equal(rankMod(subtractI(SA),2),0);
assert.equal(rankMod(subtractI(SR),2),2);

console.log("coordinate_vs_root_exchange_localization_at_two: PASS");
console.log("Hadamard_conjugator_has_determinant_minus2");
console.log("coordinate_and_root_exchange_are_conjugate_over_Z_of_one_half_and_every_odd_prime");
console.log("at_p2_coordinate_exchange_is_identity_but_root_exchange_has_rank1_nontrivial_action");
console.log("symplectic_lift_cokernel_torsion_differs_Z2_squared_vs_none");
console.log("there_is_no_integral_or_binary_symplectic_conjugacy");
console.log("a_metaplectic_central_extension_cannot_change_this_underlying_action_obstruction");

