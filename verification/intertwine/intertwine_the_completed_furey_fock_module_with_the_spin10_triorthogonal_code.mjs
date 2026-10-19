import assert from 'node:assert/strict';

const range=n=>Array.from({length:n},(_,i)=>i);
const key=v=>v.join(',');
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const eq=(A,B)=>A.every((r,i)=>r.every((x,j)=>x===B[i][j]));
const zero=n=>Array.from({length:n},()=>Array(n).fill(0));

const labelOccupation=o=>{
  if(o.length===0)return 'nu^c';
  if(o.length===2&&o[0]<=3&&o[1]>=4)return `${o[1]===5?'u':'d'}_${o[0]}`;
  if(o.length===2&&o.every(i=>i<=3))return `u^c_${[1,2,3].find(i=>!o.includes(i))}`;
  if(o.join('')==='45')return 'e^c';
  if(o.length===4){
    const missing=[1,2,3,4,5].find(i=>!o.includes(i));
    if(missing<=3)return `d^c_${missing}`;
    return missing===4?'nu':'e';
  }
  throw new Error(`unlabelled ${o}`);
};

const states=[];
for(let mask=0;mask<32;mask++){
  const occupied=range(5).filter(i=>(mask>>i)&1).map(i=>i+1);
  if(occupied.length%2===0){
    const q=range(5).map(i=>occupied.includes(i+1)?-1:1);
    states.push({occupied,q,field:labelOccupation(occupied)});
  }
}
assert.equal(states.length,16);
assert.equal(new Set(states.map(s=>s.field)).size,16);
const byField=new Map(states.map((s,i)=>[s.field,{...s,index:i}]));

// Ordered weight table in Prakash--Ramya, Table 2, followed by the removed nu^c.
const paperTable=[
  ['d^c_1',[1,-1,-1,-1,-1]],['d^c_2',[-1,1,-1,-1,-1]],
  ['u^c_3',[-1,-1,1,1,1]],['d^c_3',[-1,-1,1,-1,-1]],
  ['u^c_2',[-1,1,-1,1,1]],['u^c_1',[1,-1,-1,1,1]],
  ['e^c',[1,1,1,-1,-1]],['d_1',[-1,1,1,-1,1]],
  ['d_2',[1,-1,1,-1,1]],['u_3',[1,1,-1,1,-1]],
  ['d_3',[1,1,-1,-1,1]],['u_2',[1,-1,1,1,-1]],
  ['u_1',[-1,1,1,1,-1]],['e',[-1,-1,-1,-1,1]],
  ['nu',[-1,-1,-1,1,-1]],['nu^c',[1,1,1,1,1]],
];
for(const [field,q] of paperTable) assert.deepEqual(byField.get(field).q,q,field);

// The permutation matrix is the exact representation-space intertwiner.
const P=zero(16);
paperTable.forEach(([field],row)=>P[row][byField.get(field).index]=1);
assert.ok(eq(mm(P,tr(P)),range(16).map(i=>range(16).map(j=>i===j?1:0))));

// Furey occupation operators pull the Spin(10) weights back by Q_i=1-2N_i.
for(const s of states) for(let i=0;i<5;i++) assert.equal(s.q[i],1-2*Number(s.occupied.includes(i+1)));

const charges=s=>{
  const [q1,q2,q3,q4,q5]=s.q;
  const T3L=(q4-q5)/4;
  const T3R=(q4+q5)/4;
  const BmL=(q1+q2+q3)/3;
  const Y=BmL/2-T3R;
  return {T3L,T3R,BmL,Y,Q:T3L+Y};
};
const expectedFamilies={
  'nu^c':{T3L:0,BmL:1,Y:0,Q:0},'e^c':{T3L:0,BmL:1,Y:1,Q:1},
  'nu':{T3L:.5,BmL:-1,Y:-.5,Q:0},'e':{T3L:-.5,BmL:-1,Y:-.5,Q:-1},
};
for(const s of states){
  const c=charges(s);
  const expected=expectedFamilies[s.field] ??
    (s.field.startsWith('u^c')?{T3L:0,BmL:-1/3,Y:-2/3,Q:-2/3}:
    s.field.startsWith('d^c')?{T3L:0,BmL:-1/3,Y:1/3,Q:1/3}:
    s.field.startsWith('u_')?{T3L:.5,BmL:1/3,Y:1/6,Q:2/3}:
    s.field.startsWith('d_')?{T3L:-.5,BmL:1/3,Y:1/6,Q:-1/3}:null);
  assert.ok(expected,s.field);
  for(const [name,value] of Object.entries(expected))assert.ok(Math.abs(c[name]-value)<1e-12,`${s.field} ${name}`);
}

// Pullback of the anomaly cubic to the five Furey number operators.
const fullTensor=Array.from({length:5},()=>Array.from({length:5},()=>Array(5).fill(0)));
const puncturedTensor=Array.from({length:5},()=>Array.from({length:5},()=>Array(5).fill(0)));
for(let i=0;i<5;i++)for(let j=0;j<5;j++)for(let k=0;k<5;k++){
  fullTensor[i][j][k]=states.reduce((s,x)=>s+x.q[i]*x.q[j]*x.q[k],0);
  puncturedTensor[i][j][k]=states.filter(x=>x.field!=='nu^c').reduce((s,x)=>s+x.q[i]*x.q[j]*x.q[k],0);
  assert.equal(fullTensor[i][j][k],0);
  assert.equal(puncturedTensor[i][j][k],-1);
}

// Every one-particle rank-one anomaly tensor is -a^3, a=(1,1,1,1,1).
const a=[1,1,1,1,1];
for(let i=0;i<5;i++)for(let j=0;j<5;j++)for(let k=0;k<5;k++)
  assert.equal(puncturedTensor[i][j][k],-a[i]*a[j]*a[k]);

// Weak Weyl transposition acts inside the completed Furey endpoint model.
const reflect=s=>{
  const q=[s.q[0],s.q[1],s.q[2],s.q[4],s.q[3]];
  return states.find(x=>key(x.q)===key(q));
};
const weakPairs={};
for(const s of states)weakPairs[s.field]=reflect(s).field;
for(let c=1;c<=3;c++){
  assert.equal(weakPairs[`u_${c}`],`d_${c}`);
  assert.equal(weakPairs[`d_${c}`],`u_${c}`);
  assert.equal(weakPairs[`u^c_${c}`],`u^c_${c}`);
  assert.equal(weakPairs[`d^c_${c}`],`d^c_${c}`);
}
assert.equal(weakPairs.nu,'e'); assert.equal(weakPairs.e,'nu');
assert.equal(weakPairs['nu^c'],'nu^c'); assert.equal(weakPairs['e^c'],'e^c');

console.log(JSON.stringify({
  protocol:'completed-furey-fock-to-spin10-triorthogonal-code-intertwiner/1',
  stateCount:states.length,
  map:'q_i = 1 - 2 N_i on the even five-mode Fock space',
  exactPaperTableMatches:paperTable.length,
  preservedCharges:['T3L','T3R','B-L','Y','Qem'],
  representationIntertwiner:'the permutation P from local occupation order to the published weight-table order',
  anomalyPullback:{fullGeneration:'identically zero rank-three tensor',puncturedNuC:'-a tensor a tensor a, a=(1,1,1,1,1)',tensorRank:1},
  weakWeylPairs:weakPairs,
  implication:'The completed Furey five-mode module and the Spin(10) code use exactly the same labelled weight representation, not merely the same dimension.',
  limitation:'This representation-level identification does not prove that the source division-algebra product equals the Spin(10) Clifford product, nor that the anomaly cubic equals the middle-slot response tensor.',
  passed:true
},null,2));
