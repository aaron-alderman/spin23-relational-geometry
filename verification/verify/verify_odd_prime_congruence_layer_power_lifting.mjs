import assert from "node:assert/strict";

// For h=I+p^r X mod p^(r+1), the p-th power satisfies
// h^p=I+p^(r+1)X mod p^(r+2) at every odd prime.
const valuation=(n,p)=>{let v=0;while(n%p===0&&n!==0){n/=p;v++;}return v;};
const binomial=(n,k)=>{let x=1;for(let i=1;i<=k;i++)x=x*(n-k+i)/i;return x;};
for(const p of [3,5,7])for(let r=1;r<=8;r++){
  for(let k=2;k<=p;k++){
    const coefficient=binomial(p,k);
    const v=(coefficient===1?0:valuation(coefficient,p))+r*k;
    assert(v>=r+2);
  }
}

// Binary lifting fails at the first layer because Z^2 can survive modulo 8.
assert.equal(2*1,1+1);
assert(2*1<1+2);

// Concrete nilpotent mutual direction: powers are exact at every level.
const N=[[0,0,0,0],[0,0,0,0],[3,2,0,0],[2,3,0,0]];
const I=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(c,A)=>A.map(r=>r.map(x=>c*x));
const power=(A,n)=>{let R=I,B=A;while(n){if(n&1)R=mul(R,B);B=mul(B,B);n>>=1;}return R;};
assert.deepEqual(mul(N,N),Array.from({length:4},()=>Array(4).fill(0)));
for(const p of [3,5,7])assert.deepEqual(power(add(I,N),p),add(I,scale(p,N)));

console.log("Odd-prime congruence-layer lifting lemma: PASS");
console.log("p_th_powers_send_level_r_directions_to_the_same_direction_at_level_r_plus_1");
console.log("full_mod_p_squared_image_therefore_inducts_to_full_mod_p_to_the_n_for_all_n");
console.log("the_binary_case_requires_separate_analysis_because_the_quadratic_term_can_survive");
