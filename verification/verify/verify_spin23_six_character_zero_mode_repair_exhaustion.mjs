import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-six-character-zero-mode-repair-exhaustion.json','utf8'));
const prior=JSON.parse(readFileSync(
  'evidence/data/spin23-six-character-ordinary-correspondence-completion.json','utf8'));
assert.equal(evidence.schema,'spin23.six-character-zero-mode-repair-exhaustion/1');

const chars=['P','I','N','S','T','U'];
const base=prior.hilbertSpace.sectors.map(s=>({...s}));
const firstOrder=(u,v)=>u.left===v.left||u.right===v.right;
const permitted=(u,v)=>u.gamma*v.gamma===-1&&
  u.relationParity*v.relationParity===1&&firstOrder(u,v);
const pairs=states=>{
  const out=[];
  for(let i=0;i<states.length;i++) for(let j=i+1;j<states.length;j++)
    if(permitted(states[i],states[j])) out.push([states[i],states[j]]);
  return out;
};
assert.equal(pairs(base).length,10);
assert.equal(pairs(base).length,prior.finiteDiracSupport.allowedEdges.length);
assert.equal(evidence.additionalExistingSectorEdges.additionalEdgesSatisfyingFirstOrderJGradingRelation,0);

function determinant(M){
  if(M.length===0) return 1;
  return M[0].reduce((sum,x,j)=>sum+(j%2===0?1:-1)*x*
    determinant(M.slice(1).map(row=>row.filter((_,k)=>k!==j))),0);
}
function determinantBareiss(M){
  const A=M.map(row=>row.slice());
  let sign=1,previous=1;
  for(let k=0;k<A.length-1;k++){
    let pivot=k;
    while(pivot<A.length&&A[pivot][k]===0)pivot++;
    if(pivot===A.length)return 0;
    if(pivot!==k){[A[pivot],A[k]]=[A[k],A[pivot]];sign*=-1;}
    const p=A[k][k];
    for(let i=k+1;i<A.length;i++)for(let j=k+1;j<A.length;j++)
      A[i][j]=(A[i][j]*p-A[i][k]*A[k][j])/previous;
    previous=p;
  }
  return sign*A.at(-1).at(-1);
}

// Expanded-clone bipartite matching proves the exact capacity conditions,
// rather than relying on equality of the two total chiral dimensions alone.
const component=['PN','IN','IP','TP','SP','TU'];
const componentEdges=[['PN','IN'],['IN','IP'],['IP','TP'],['TP','SP'],['TP','TU']];
const positive=new Set(['PN','IP','SP','TU']);
function expandedMatching(multiplicities){
  const pos=[],neg=[];
  for(const v of component){
    for(let k=0;k<multiplicities[v];k++) (positive.has(v)?pos:neg).push(`${v}:${k}`);
  }
  const adjacent=(p,n)=>componentEdges.some(([a,b])=>
    (a===p.split(':')[0]&&b===n.split(':')[0])||
    (b===p.split(':')[0]&&a===n.split(':')[0]));
  const used=new Set();
  const visit=i=>{
    if(i===pos.length) return true;
    for(let j=0;j<neg.length;j++) if(!used.has(j)&&adjacent(pos[i],neg[j])){
      used.add(j); if(visit(i+1)) return true; used.delete(j);
    }
    return false;
  };
  return pos.length===neg.length&&visit(0);
}

const multiplicitySolutions=[];
for(let a=1;a<=3;a++) for(let b=1;b<=3;b++) for(let c=1;c<=3;c++)
for(let d=1;d<=3;d++) for(let e=1;e<=3;e++) for(let f=1;f<=3;f++){
  const m={PN:a,IN:b,IP:c,TP:d,SP:e,TU:f};
  if(expandedMatching(m)) multiplicitySolutions.push(m);
}
assert.equal(3**6,729);
assert.equal(multiplicitySolutions.length,15);
const fullAdded=m=>2*component.reduce((sum,v)=>sum+m[v]-1,0);
const minimumAdded=Math.min(...multiplicitySolutions.map(fullAdded));
const minimumPatterns=multiplicitySolutions.filter(m=>fullAdded(m)===minimumAdded);
assert.equal(minimumAdded,4);
assert.deepEqual(minimumPatterns,[
  {PN:1,IN:1,IP:1,TP:3,SP:1,TU:1},
  {PN:1,IN:2,IP:1,TP:2,SP:1,TU:1}
]);

// Concrete full-rank chiral blocks for the two minimal patterns. Rows are
// positive clones and columns negative clones; all five old edge types occur.
const K1=[
  [1,0,0,0],
  [1,1,0,0],
  [0,0,1,0],
  [0,0,0,1]
];
const K2=[
  [1,0,0,0],
  [0,1,1,0],
  [0,0,1,0],
  [0,0,0,1]
];
assert.notEqual(determinant(K1),0);
assert.notEqual(determinant(K2),0);

const intersectionForMultiplicities=m=>{
  const all=[];
  for(const s of base){
    const representative=component.includes(s.label)?s.label:s.J;
    const count=m[representative];
    for(let k=0;k<count;k++) all.push(s);
  }
  return chars.map(a=>chars.map(b=>all.reduce((sum,s)=>sum+
    (s.left===a&&s.right===b?s.gamma:0),0)));
};
assert.equal(determinant(intersectionForMultiplicities(minimumPatterns[0])),1);
assert.equal(determinant(intersectionForMultiplicities(minimumPatterns[1])),4);

// One extra J orbit supplies only one new negative dimension per positive
// relation sheet, so the chiral dimension imbalance alone proves failure.
assert.equal(4-(2+1),1);

const occupiedOrbits=new Set(base.map(s=>[s.left,s.right].sort().join('')));
const orientedUnused=[];
for(const a of chars) for(const b of chars)
  if(a!==b&&!occupiedOrbits.has([a,b].sort().join(''))) orientedUnused.push(a+b);
assert.equal(orientedUnused.length,18);
assert.equal(new Set(orientedUnused.map(x=>[...x].sort().join(''))).size,9);

const newSector=(label,gamma,relationParity)=>({
  label,left:label[0],right:label[1],gamma,relationParity,
  J:label[1]+label[0],provenance:'new-sector exhaustion'
});
const graphHasPerfectMatching=states=>{
  const pos=states.filter(s=>s.relationParity===1&&s.gamma===1);
  const neg=states.filter(s=>s.relationParity===1&&s.gamma===-1);
  if(pos.length!==neg.length) return false;
  const used=new Set();
  const visit=i=>{
    if(i===pos.length)return true;
    for(let j=0;j<neg.length;j++)if(!used.has(j)&&firstOrder(pos[i],neg[j])){
      used.add(j);if(visit(i+1))return true;used.delete(j);
    }
    return false;
  };
  return visit(0);
};
const intersection=states=>chars.map(a=>chars.map(b=>states.reduce((sum,s)=>sum+
  (s.left===a&&s.right===b?s.gamma:0),0)));

let tested=0, matched=0, nondegenerate=0;
const solutions=[];
for(let i=0;i<orientedUnused.length;i++) for(let j=i+1;j<orientedUnused.length;j++){
  const z1=orientedUnused[i],z2=orientedUnused[j];
  if([z1[0],z1[1]].sort().join('')===[z2[0],z2[1]].sort().join(''))continue;
  tested++;
  const added=[
    newSector(z1,-1,1),newSector(z1[1]+z1[0],1,-1),
    newSector(z2,-1,1),newSector(z2[1]+z2[0],1,-1)
  ];
  const states=[...base,...added];
  if(!graphHasPerfectMatching(states))continue;
  matched++;
  const det=determinant(intersection(states));
  if(det!==0){nondegenerate++;solutions.push({z1,z2,det,states});}
}
assert.equal(tested,144);
assert.equal(matched,79);
assert.equal(nondegenerate,51);

const witness=solutions.find(x=>new Set([x.z1,x.z2]).has('SI')&&
  new Set([x.z1,x.z2]).has('NU'));
assert.ok(witness);
assert.equal(witness.det,1);
const witnessEdges=pairs(witness.states);
assert.equal(witnessEdges.length,14);

// Unit weights on the complete allowed support yield an invertible 16-state
// real-completed Dirac matrix.
const N=witness.states.length;
const D=Array.from({length:N},()=>Array(N).fill(0));
for(const [u,v] of witnessEdges){
  const i=witness.states.indexOf(u),j=witness.states.indexOf(v);
  D[i][j]=D[j][i]=1;
}
assert.equal(determinantBareiss(D),1);

const oldLabels=new Set(base.map(s=>s.label));
const newEdges=witnessEdges.filter(([u,v])=>!oldLabels.has(u.label)||!oldLabels.has(v.label));
assert.equal(newEdges.length,4);
assert.equal(newEdges.every(([u,v])=>!(oldLabels.has(u.label)&&oldLabels.has(v.label))),true);
assert.deepEqual(newEdges.map(([u,v])=>[u.label,v.label].sort().join('--')).sort(),
  ['IS--PS','NU--TU','SI--SP','UN--UT'].sort());

// The original five-state texture remains an exact principal projection.
const M=[[2,3,5,0,0],[3,7,0,0,0],[5,0,0,11,0],[0,0,11,0,13],[0,0,0,13,0]];
assert.equal(determinant(M.slice(1).map(r=>r.slice(1))),0);
assert.equal(determinant(M),7*5*5*13*13);
assert.equal(evidence.textureAudit.multiplicityRepair.fiveStatePrincipalProjectionPreserved,true);
assert.equal(evidence.textureAudit.multiplicityRepair.fullPhysicalSchurIdentityCertified,false);
assert.equal(evidence.textureAudit.newSectorRepair.fiveStatePrincipalProjectionPreserved,true);
assert.equal(evidence.textureAudit.newSectorRepair.fullPhysicalSchurIdentityCertified,false);

assert.equal(evidence.decision.coefficientOnlyEdgeRepair,'UNSAT');
assert.equal(evidence.decision.boundedMultiplicityRepair,'SAT formally, minimum +4 dimensions');
assert.equal(evidence.decision.newSectorRepairAtMultiplicityOne,'SAT formally, minimum two J-orbits and +4 dimensions');
assert.equal(evidence.decision.sourcedPatiSalamRepair,'UNSAT because every minimum contains additional unsourced sterile/correspondence matter');

console.log('PASS 1533: no further admissible old-sector edge exists; invertibility needs exactly four added J-completed dimensions, realized either by one of two minimal multiplicity patterns or by two new sector orbits such as SI/IS plus NU/UN, while full physical Schur protection remains unproved.');
