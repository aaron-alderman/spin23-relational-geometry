import assert from 'node:assert/strict';

const p=3, mod=n=>((n%p)+p)%p;
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>mod(r.reduce((s,a,i)=>s+a*B[i][j],0))));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const inv2=A=>{
  const d=mod(A[0][0]*A[1][1]-A[0][1]*A[1][0]);
  const di=d===1?1:2;
  return [[mod(di*A[1][1]),mod(-di*A[0][1])],[mod(-di*A[1][0]),mod(di*A[0][0])]];
};
const key=A=>A.flat().join(',');
const I2=[[1,0],[0,1]], neg=B=>B.map(r=>r.map(x=>mod(-x)));
const P=[[0,1],[1,0]];
const A=[[1,0],[0,2]];
const R=P;
const H=[[1,1],[1,2]], Hi=inv2(H);

assert.deepEqual(mm(mm(Hi,P),H),A); // puncture exchange in the D2 root basis
assert.deepEqual(mm(mm(Hi,A),H),R); // external Hadamard conjugacy

const codePuncture=[I2,neg(I2),P,neg(P)];
const codeRoot=codePuncture.map(C=>mm(mm(Hi,C),H));
assert.deepEqual(new Set(codeRoot.map(key)),new Set([I2,neg(I2),A,neg(A)].map(key)));
assert(!new Set(codeRoot.map(key)).has(key(R)));
assert(!new Set(codeRoot.map(key)).has(key(H)));

const I4=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>i===j?1:0));
const blockDiagDual=B=>{
  const D=tr(inv2(B));
  return [
    [B[0][0],B[0][1],0,0],[B[1][0],B[1][1],0,0],
    [0,0,D[0][0],D[0][1]],[0,0,D[1][0],D[1][1]],
  ];
};
const lowerShear=K=>[
  [1,0,0,0],[0,1,0,0],
  [K[0][0],K[0][1],1,0],[K[1][0],K[1][1],0,1],
];
const K=[[0,2],[2,0]];
const LA=blockDiagDual(A), LR=blockDiagDual(R), LH=blockDiagDual(H);
const LK=lowerShear(K), minusI=neg(I4);

// A sends K to -K, so the source action plus mutual phase is dihedral,
// with an additional central global sign.
assert.deepEqual(mm(mm(A,K),A),neg(K));

const generate=generators=>{
  const group=new Map([[key(I4),I4]]);
  let changed=true;
  while(changed){
    changed=false;
    for(const g of [...group.values()])for(const s of generators){
      for(const h of [mm(g,s),mm(s,g)]) if(!group.has(key(h))){group.set(key(h),h);changed=true;}
    }
  }
  return group;
};
const sourceWithoutSign=generate([LA,LK]);
assert.equal(sourceWithoutSign.size,6);
assert(!sourceWithoutSign.has(key(minusI)));
const group=generate([LA,LK,minusI]);
assert.equal(group.size,12);
assert(!group.has(key(LR)));
assert(!group.has(key(LH)));

// Every generated element has X-block in {+/-I,+/-A}; the mutual shear
// cannot manufacture the missing root exchange in that block.
const allowedX=new Set([I2,neg(I2),A,neg(A)].map(key));
for(const g of group){
  const M=g[1], X=M.slice(0,2).map(r=>r.slice(0,2));
  assert(allowedX.has(key(X)));
}

console.log('qutrit_code_actions_phase_shear_external_hadamard: PASS');
console.log('code_puncture_actions_pmI_pmP_become_pmI_pmA_in_D2_root_basis');
console.log('root_exchange_R_and_Hadamard_H_are_absent_from_the_code_logical_action_image');
console.log('source_actions_plus_mutual_Kplus_shear_generate_order12');
console.log('generated_group_is_S3_times_C2_with_X_blocks_only_pmI_pmA');
console.log('root_exchange_remains_absent_after_adjoining_the_qutrit_mutual_phase');
console.log('odd_prime_Hadamard_conjugacy_is_an_external_equivalence_not_a_source_code_symmetry');
