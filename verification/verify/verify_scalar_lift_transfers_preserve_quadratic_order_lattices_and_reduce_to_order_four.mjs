import assert from "node:assert/strict";

const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const inv2=(A)=>{const d=A[0][0]*A[1][1]-A[0][1]*A[1][0];return [[A[1][1]/d,-A[0][1]/d],[-A[1][0]/d,A[0][0]/d]];};
const near=(A,B)=>A.every((r,i)=>r.every((x,j)=>Math.abs(x-B[i][j])<1e-12));
const mod=(x,p=3)=>((x%p)+p)%p;
const modM=(A)=>A.map(r=>r.map(x=>mod(x)));
const powMod=(A,n)=>{let R=[[1,0],[0,1]],B=modM(A);while(n){if(n&1)R=modM(mul(R,B));B=modM(mul(B,B));n>>=1;}return R;};

const Tminus=[[3,1],[8,3]],Tplus=[[1.5,.5],[2.5,1.5]];
const Cminus=[[0,-1],[1,6]],Cplus=[[0,-1],[1,3]];

// Cyclic basis B=(e1,T e1) converts each transfer to its companion form.
const Bminus=[[1,3],[0,8]],Bplus=[[1,1.5],[0,2.5]];
assert(near(mul(mul(inv2(Bminus),Tminus),Bminus),Cminus));
assert(near(mul(mul(inv2(Bplus),Tplus),Bplus),Cplus));
assert(Cminus.flat().every(Number.isInteger));
assert(Cplus.flat().every(Number.isInteger));

const trace=(A)=>A[0][0]+A[1][1],det=(A)=>A[0][0]*A[1][1]-A[0][1]*A[1][0];
assert.deepEqual([trace(Cminus),det(Cminus)],[6,1]);
assert.deepEqual([trace(Cplus),det(Cplus)],[3,1]);
assert.equal(trace(Cminus)**2-4*det(Cminus),32);
assert.equal(trace(Cplus)**2-4*det(Cplus),5);

const I=[[1,0],[0,1]],minusI=[[2,0],[0,2]];
for(const C of [Cminus,Cplus]){
  assert.deepEqual(powMod(C,2),minusI);
  assert.deepEqual(powMod(C,4),I);
  assert.notDeepEqual(modM(C),I);
  assert.notDeepEqual(powMod(C,2),I);
}
assert.deepEqual(modM(Cminus),[[0,2],[1,0]]);
assert.deepEqual(modM(Cplus),[[0,2],[1,0]]);

// Cayley-Hamilton gives an integral recurrence for every subdivision power.
for(const C of [Cminus,Cplus]){
  const t=trace(C),C2=mul(C,C);
  assert.deepEqual(C2,C.map((r,i)=>r.map((x,j)=>t*x-(i===j?1:0))));
}

console.log("Quadratic-order transfer lattice and mod-three audit: PASS");
console.log("Kminus_transfer_preserves_an_integral_trace_6_lattice_of_discriminant_32");
console.log("Kplus_transfer_preserves_an_integral_trace_3_lattice_of_discriminant_5");
console.log("both_companion_transfers_reduce_to_0_minus1__1_0_modulo_three");
console.log("the_common_reduction_has_square_minus_identity_and_order_four");
console.log("all_sewing_powers_follow_integral_Cayley_Hamilton_recurrences_in_the_adapted_lattices");
