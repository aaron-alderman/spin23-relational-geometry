import assert from 'node:assert/strict';

const mod=(n,m)=>((n%m)+m)%m;
const dot=(x,y)=>x[0]*y[1]+x[1]*y[0]-x[2]*y[2]-x[3]*y[4]-x[4]*y[3];
const norm=x=>dot(x,x);
const det=A=>{
  const M=A.map(r=>r.map(BigInt));
  let d=1n,sgn=1n;
  for(let k=0;k<M.length-1;k++){
    let p=k;while(p<M.length&&M[p][k]===0n)p++;
    assert(p<M.length);
    if(p!==k){[M[k],M[p]]=[M[p],M[k]];sgn=-sgn;}
    const pivot=M[k][k];
    for(let i=k+1;i<M.length;i++)for(let j=k+1;j<M.length;j++)
      M[i][j]=(M[i][j]*pivot-M[i][k]*M[k][j])/d;
    d=pivot;
  }
  return sgn*M.at(-1).at(-1);
};
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,a,k)=>s+a*B[k][j],0)));

// Divide both even Gram matrices by two.  An isometry for these primitive
// odd unimodular forms is equivalently an isometry for the original lattices.
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

// Cycle 468 finite isometry, listed by columns in the ambient J basis.
const residues=[
  [1,0,1,0,0],
  [0,1,1,0,0],
  [1,1,1,1,1],
  [1,1,1,1,0],
  [1,1,1,0,1],
];
const targets=[-1,-1,-1,1,1];

const candidates=(r,target,B)=>{
  const out=[];
  const walk=(a=[])=>{
    if(a.length===5){if(norm(a)===target)out.push(a);return;}
    for(let n=-B;n<=B;n++)if(mod(n,2)===r[a.length])walk([...a,n]);
  };
  walk();
  out.sort((x,y)=>x.reduce((s,a)=>s+a*a,0)-y.reduce((s,a)=>s+a*a,0));
  return out;
};

let lift=null,boundUsed=null;
for(let B=1;B<=7&&!lift;B+=2){
  const pools=residues.map((r,i)=>candidates(r,targets[i],B));
  const chosen=[];
  const search=i=>{
    if(i===5){lift=tr(chosen);return true;}
    for(const v of pools[i]){
      if(chosen.every(u=>dot(u,v)===0)){
        chosen.push(v);
        if(search(i+1))return true;
        chosen.pop();
      }
    }
    return false;
  };
  if(search(0))boundUsed=B;
}
assert(lift,'no bounded lift found');
assert.equal(det(lift)**2n,1n);
assert.deepEqual(mm(mm(tr(lift),HJ),lift),HSM);
for(let j=0;j<5;j++)for(let i=0;i<5;i++)assert.equal(mod(lift[i][j],2),residues[j][i]);

// The integral lift induces exactly q_SM on the discriminant generators.
const qJ=x=>mod(2*x[0]*x[1]+3*x[2]+2*x[3]*x[4],4);
const qSM=x=>mod(3*(x[0]+x[1]+x[2])+x[3]+x[4],4);
for(let n=0;n<32;n++){
  const x=Array.from({length:5},(_,i)=>(n>>i)&1);
  const y=lift.map(r=>r.reduce((s,a,i)=>s+a*x[i],0));
  assert.equal(qJ(y.map(a=>mod(a,2))),qSM(x));
}

console.log('specific_finite_Phi_has_integral_unimodular_lift: PASS');
console.log('search_bound='+boundUsed);
console.log('integral_lift_columns='+JSON.stringify(tr(lift)));
console.log('determinant='+det(lift));
console.log('P_transpose_HJ_P_equals_HSM=true');
console.log('P_mod2_equals_Phi=true');
console.log('natural_source_sign_lattice_is_not_this_lift_the_additive_phase_lattice_is');
