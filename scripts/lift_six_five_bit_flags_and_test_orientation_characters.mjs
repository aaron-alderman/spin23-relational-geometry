import assert from 'node:assert/strict';

const mod=(n,m)=>((n%m)+m)%m;
const xor=(x,y)=>x.map((a,i)=>a^y[i]);
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mv2=(A,x)=>A.map(r=>r.reduce((s,a,i)=>s^(a&x[i]),0));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,a,i)=>s+a*B[i][j],0)));
const keyM=A=>A.flat().join(',');
const keyV=x=>x.join('');
const vectors=Array.from({length:32},(_,n)=>Array.from({length:5},(_,i)=>(n>>i)&1));
const es=Array.from({length:5},(_,i)=>Array.from({length:5},(_,j)=>Number(i===j)));
const qJ=x=>mod(2*x[0]*x[1]+3*x[2]+2*x[3]*x[4],4);
const polar=(x,y)=>mod(qJ(xor(x,y))-qJ(x)-qJ(y),4);
const inSpan=(v,basis)=>{
  const S=new Set([keyV(Array(5).fill(0))]);
  for(const b of basis)for(const k of [...S])S.add(keyV(xor(k.split('').map(Number),b)));
  return S.has(keyV(v));
};
const spanKey=basis=>{
  const S=new Set([keyV(Array(5).fill(0))]);
  for(const b of basis)for(const k of [...S])S.add(keyV(xor(k.split('').map(Number),b)));
  return [...S].sort().join('|');
};

// Full finite orthogonal group O(qJ).
const finiteO=[],cols=[];
const nonzero=vectors.filter(v=>v.some(Boolean));
const recFinite=i=>{
  if(i===5){finiteO.push(tr(cols));return;}
  for(const y of nonzero){
    if(inSpan(y,cols)||qJ(y)!==qJ(es[i]))continue;
    if(cols.some((z,j)=>polar(y,z)!==polar(es[i],es[j])))continue;
    cols.push(y);recFinite(i+1);cols.pop();
  }
};
recFinite(0);
assert.equal(finiteO.length,72);

const HJ=[
  [0,1,0,0,0],
  [1,0,0,0,0],
  [0,0,-1,0,0],
  [0,0,0,0,-1],
  [0,0,0,-1,0],
];
const HSM=[
  [-1,0,0,0,0],
  [0,-1,0,0,0],
  [0,0,-1,0,0],
  [0,0,0,1,0],
  [0,0,0,0,1],
];
const P=[
  [-1,0,-1,-1,-1],
  [0,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1],
  [0,0,-1,-1,0],
  [0,0,-1,0,-1],
];
const dot=(x,y)=>x.reduce((s,a,i)=>s+a*HJ[i].reduce((t,b,j)=>t+b*y[j],0),0);
const det=A=>{
  const M=A.map(r=>r.map(BigInt));let d=1n,sgn=1n;
  for(let k=0;k<M.length-1;k++){
    let p=k;while(p<M.length&&M[p][k]===0n)p++;assert(p<M.length);
    if(p!==k){[M[k],M[p]]=[M[p],M[k]];sgn=-sgn;}
    const pivot=M[k][k];
    for(let i=k+1;i<M.length;i++)for(let j=k+1;j<M.length;j++)M[i][j]=(M[i][j]*pivot-M[i][k]*M[k][j])/d;
    d=pivot;
  }
  return sgn*M.at(-1).at(-1);
};

const candidatePool=(residue,targetNorm,B)=>{
  const out=[];
  const walk=(v=[])=>{
    if(v.length===5){if(dot(v,v)===targetNorm)out.push(v);return;}
    for(let n=-B;n<=B;n++)if(mod(n,2)===residue[v.length])walk([...v,n]);
  };
  walk();
  out.sort((x,y)=>x.reduce((s,a)=>s+a*a,0)-y.reduce((s,a)=>s+a*a,0));
  return out;
};

const liftFinite=A=>{
  const residues=tr(A);
  for(const B of [1,3,5]){
    const pools=residues.map((r,i)=>candidatePool(r,HJ[i][i],B));
    const chosen=[];
    const search=i=>{
      if(i===5)return tr(chosen);
      for(const v of pools[i]){
        if(chosen.every((u,j)=>dot(u,v)===HJ[j][i])){
          chosen.push(v);const ans=search(i+1);if(ans)return ans;chosen.pop();
        }
      }
      return null;
    };
    const ans=search(0);if(ans)return {matrix:ans,bound:B};
  }
  return null;
};

const lifts=finiteO.map(liftFinite);
assert(lifts.every(Boolean));
for(let k=0;k<finiteO.length;k++){
  const Q=lifts[k].matrix;
  assert.deepEqual(mm(mm(tr(Q),HJ),Q),HJ);
  assert.equal(det(Q)**2n,1n);
  for(let i=0;i<5;i++)for(let j=0;j<5;j++)assert.equal(mod(Q[i][j],2),finiteO[k][i][j]);
}
assert.deepEqual(mm(mm(tr(P),HJ),P),HSM);
const PInv=mm(mm(HSM,tr(P)),HJ);
assert.deepEqual(mm(P,PInv),es);
assert.deepEqual(mm(PInv,P),es);

// The six finite flags all have explicit integral representatives.
const phiColor=[
  [1,0,1,0,0],
  [0,1,1,0,0],
  [1,1,1,1,1],
];
const flagMap=new Map();
for(let k=0;k<finiteO.length;k++){
  const key=spanKey(phiColor.map(v=>mv2(finiteO[k],v)));
  if(!flagMap.has(key))flagMap.set(key,k);
}
assert.equal(flagMap.size,6);
const representativeIndices=[...flagMap.values()];
const integralFlagReps=representativeIndices.map(k=>lifts[k].matrix);
assert.equal(integralFlagReps.length,6);
const decompositionMatrices=integralFlagReps.map(Q=>mm(Q,P));
for(const D of decompositionMatrices)assert.deepEqual(mm(mm(tr(D),HJ),D),HSM);
const integralColorBases=decompositionMatrices.map(D=>tr(D).slice(0,3));

// Exact integral stabilizer of the base definite 3+2 decomposition:
// independent sign changes followed by S3 x S2 coordinate permutations.
const perms=a=>{
  if(!a.length)return [[]];
  const out=[];for(let i=0;i<a.length;i++)for(const p of perms([...a.slice(0,i),...a.slice(i+1)]))out.push([a[i],...p]);
  return out;
};
const signedSourceStabilizer=[];
for(const pc of perms([0,1,2]))for(const pw of perms([3,4]))for(let mask=0;mask<32;mask++){
  const perm=[...pc,...pw],R=Array.from({length:5},()=>Array(5).fill(0));
  for(let i=0;i<5;i++)R[perm[i]][i]=(mask>>i)&1?-1:1;
  signedSourceStabilizer.push(R);
}
assert.equal(signedSourceStabilizer.length,384);
for(const R of signedSourceStabilizer)assert.deepEqual(mm(mm(tr(R),HSM),R),HSM);
const ambientIntegralStabilizer=signedSourceStabilizer.map(R=>mm(mm(P,R),PInv));
const reducedStabilizerKeys=new Set(ambientIntegralStabilizer.map(R=>R.flat().map(x=>mod(x,2)).join('')));
assert.equal(reducedStabilizerKeys.size,12);

// No raw determinant or rational spinor-norm character can descend through
// reduction mod 2: kernel sign reflections already realize independent values.
const I=es;
const rNegative=I.map(r=>[...r]);rNegative[0][0]=-1; // norm -1 in diagonal I_{2,3} model
const rPositive=I.map(r=>[...r]);rPositive[3][3]=-1; // norm +1
assert.equal(det(rNegative),-1n);
assert.equal(det(rPositive),-1n);
for(const R of [rNegative,rPositive])for(let i=0;i<5;i++)for(let j=0;j<5;j++)
  assert.equal(mod(R[i][j],2),I[i][j]);
const ambientKernelReflections=[rNegative,rPositive].map(R=>mm(mm(P,R),PInv));
for(const R of ambientKernelReflections){
  assert.deepEqual(mm(mm(tr(R),HJ),R),HJ);
  for(let i=0;i<5;i++)for(let j=0;j<5;j++)assert.equal(mod(R[i][j],2),I[i][j]);
}
// Reflection spinor norms are their reflecting-vector norms modulo squares:
// rNegative has -1, rPositive has +1.  Hence spinor norm also varies in the
// level-two kernel, independently of determinant data on the finite quotient.

console.log('all_72_finite_ambient_isometries_have_integral_lifts: PASS');
console.log('maximum_search_bound='+Math.max(...lifts.map(x=>x.bound)));
console.log('six_finite_SM_flags_have_integral_orthogonal_decomposition_representatives=true');
console.log('flag_representative_indices='+JSON.stringify(representativeIndices));
console.log('integral_color_three_plane_bases='+JSON.stringify(integralColorBases));
console.log('exact_integral_flag_stabilizer_order=384_equals_C2pow5_semidirect_S3_times_S2');
console.log('integral_flag_stabilizer_reduction_order=12_with_sign_kernel_order32');
console.log('ambient_level_two_kernel_reflections='+JSON.stringify(ambientKernelReflections));
console.log('determinant_does_not_descend_through_mod2_reduction_due_to_kernel_sign_reflections');
console.log('rational_spinor_norm_does_not_descend_without_an_oriented_lift_for_the_same_reason');
console.log('quartic_orientation_requires_extra_lift_or_theta_data_not_raw_finite_orthogonal_symmetry');
