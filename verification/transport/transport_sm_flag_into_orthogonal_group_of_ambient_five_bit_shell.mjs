import assert from 'node:assert/strict';

const mod=(n,m)=>((n%m)+m)%m;
const xor=(x,y)=>x.map((a,i)=>a^y[i]);
const mv=(A,x)=>A.map(r=>r.reduce((s,a,i)=>s^(a&x[i]),0));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,a,i)=>s^(a&B[i][j]),0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const keyM=A=>A.flat().join('');
const keyV=x=>x.join('');
const vectors=Array.from({length:32},(_,n)=>Array.from({length:5},(_,i)=>(n>>i)&1));
const es=Array.from({length:5},(_,i)=>Array.from({length:5},(_,j)=>Number(i===j)));
const qJ=x=>mod(2*x[0]*x[1]+3*x[2]+2*x[3]*x[4],4);
const polar=(x,y)=>mod(qJ(xor(x,y))-qJ(x)-qJ(y),4);

const inverse=A0=>{
  const n=A0.length,A=A0.map((r,i)=>[...r,...Array.from({length:n},(_,j)=>Number(i===j))]);
  for(let c=0;c<n;c++){
    let p=c;while(p<n&&!A[p][c])p++;if(p===n)return null;
    [A[c],A[p]]=[A[p],A[c]];
    for(let i=0;i<n;i++)if(i!==c&&A[i][c])A[i]=A[i].map((v,j)=>v^A[c][j]);
  }
  return A.map(r=>r.slice(n));
};
const inSpan=(v,basis)=>{
  const S=new Set([keyV(Array(5).fill(0))]);
  for(const b of basis)for(const k of [...S])S.add(keyV(xor(k.split('').map(Number),b)));
  return S.has(keyV(v));
};

// Exhaust O(qJ) by choosing images of a basis and enforcing q and polar data.
const orthogonal=[];
const cols=[];
const nonzero=vectors.filter(v=>v.some(Boolean));
const rec=i=>{
  if(i===5){orthogonal.push(tr(cols));return;}
  for(const y of nonzero){
    if(inSpan(y,cols)||qJ(y)!==qJ(es[i]))continue;
    let ok=true;
    for(let j=0;j<i;j++)if(polar(y,cols[j])!==polar(es[i],es[j])){ok=false;break;}
    if(!ok)continue;
    cols.push(y);rec(i+1);cols.pop();
  }
};
rec(0);
assert.equal(orthogonal.length,72);
assert.equal(new Set(orthogonal.map(keyM)).size,72);
for(const A of orthogonal)for(const x of vectors)assert.equal(qJ(mv(A,x)),qJ(x));

// Additive SM form and explicit source-to-ambient isometry from Cycle 468.
const qSM=x=>mod(3*(x[0]+x[1]+x[2])+x[3]+x[4],4);
const phiCols=[
  [1,0,1,0,0],
  [0,1,1,0,0],
  [1,1,1,1,1],
  [1,1,1,1,0],
  [1,1,1,0,1],
];
const Phi=tr(phiCols),PhiInv=inverse(Phi);
assert(PhiInv);
for(const x of vectors)assert.equal(qJ(mv(Phi,x)),qSM(x));

const perms=a=>{
  if(!a.length)return [[]];
  const out=[];for(let i=0;i<a.length;i++)for(const p of perms([...a.slice(0,i),...a.slice(i+1)]))out.push([a[i],...p]);
  return out;
};
const S3=perms([0,1,2]),S2=perms([3,4]);
const sourceGroup=[];
for(const pc of S3)for(const pw of S2){
  const p=[...pc,...pw],P=Array.from({length:5},()=>Array(5).fill(0));
  for(let i=0;i<5;i++)P[p[i]][i]=1;
  sourceGroup.push(P);
}
assert.equal(sourceGroup.length,12);
const transported=sourceGroup.map(P=>mm(mm(Phi,P),PhiInv));
const Okeys=new Set(orthogonal.map(keyM));
for(const A of transported)assert(Okeys.has(keyM(A)));
assert.equal(new Set(transported.map(keyM)).size,12);

const spanKey=basis=>{
  const S=new Set([keyV(Array(5).fill(0))]);
  for(const b of basis)for(const k of [...S])S.add(keyV(xor(k.split('').map(Number),b)));
  return [...S].sort().join('|');
};
const colorBasis=phiCols.slice(0,3);
const colorKey=spanKey(colorBasis);
const stabilizer=orthogonal.filter(A=>spanKey(colorBasis.map(v=>mv(A,v)))===colorKey);
assert.equal(stabilizer.length,12);
assert.deepEqual(new Set(stabilizer.map(keyM)),new Set(transported.map(keyM)));
const flagOrbit=new Set(orthogonal.map(A=>spanKey(colorBasis.map(v=>mv(A,v)))));
assert.equal(flagOrbit.size,6);

// The characteristic vector of the nonalternating polar form is fixed.
const characteristic=[0,0,1,0,0];
for(const A of orthogonal)assert.deepEqual(mv(A,characteristic),characteristic);

console.log('transported_SM_flag_in_ambient_five_bit_orthogonal_group: PASS');
console.log('full_orthogonal_group_order=72_is_Oplus4_2');
console.log('transported_S3_times_S2_has_order12_and_preserves_qJ');
console.log('transported_group_is_exact_stabilizer_of_the_3_plus_2_orthogonal_decomposition');
console.log('ambient_module_contains_6_such_SM_flag_embeddings');
console.log('all_isometries_fix_the_characteristic_odd_vector');
console.log('finite_group_embedding_is_exact_integral_lift_is_proved_in_companion_cycle_470_physical_selection_remains_open');
