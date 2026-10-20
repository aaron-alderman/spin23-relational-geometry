import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-six-character-ordinary-correspondence-completion.json','utf8'));
assert.equal(evidence.schema,'spin23.six-character-ordinary-correspondence-completion/1');

const chars=['P','I','N','S','T','U'];
const sectors=evidence.hilbertSpace.sectors;
const labels=sectors.map(s=>s.label);
const byLabel=Object.fromEntries(sectors.map((s,i)=>[s.label,{...s,index:i}]));
const n=sectors.length;

assert.equal(n,12);
assert.equal(new Set(labels).size,12);
assert.deepEqual(new Set(sectors.map(s=>s.left)),new Set(chars));
assert.deepEqual(new Set(sectors.map(s=>s.right)),new Set(chars));

// The antilinear part of J is immaterial on these real test matrices.  Its
// permutation part exchanges the two character slots.
for(const s of sectors){
  assert.equal(byLabel[s.J].J,s.label);
  assert.equal(byLabel[s.J].left,s.right);
  assert.equal(byLabel[s.J].right,s.left);
  assert.equal(byLabel[s.J].gamma,-s.gamma);
  assert.equal(byLabel[s.J].relationParity,-s.relationParity);
}

const zeroMatrix=(rows=n,cols=n)=>Array.from({length:rows},()=>Array(cols).fill(0));
const identity=()=>{
  const out=zeroMatrix();
  for(let i=0;i<n;i++) out[i][i]=1;
  return out;
};
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const mul=(A,B)=>A.map((r,i)=>B[0].map((_,j)=>r.reduce((v,x,k)=>v+x*B[k][j],0)));
const scalar=(q,A)=>A.map(r=>r.map(x=>q*x));
const eq=(A,B)=>A.every((r,i)=>r.every((x,j)=>x===B[i][j]));
const diag=values=>values.map((x,i)=>values.map((_,j)=>i===j?x:0));

const Gamma=diag(sectors.map(s=>s.gamma));
const Rel=diag(sectors.map(s=>s.relationParity));
const J=zeroMatrix();
for(const s of sectors) J[byLabel[s.J].index][byLabel[s.label].index]=1;
assert.equal(eq(mul(J,J),identity()),true);
assert.equal(eq(add(mul(J,Gamma),mul(Gamma,J)),zeroMatrix()),true);
assert.equal(eq(add(mul(J,Rel),mul(Rel,J)),zeroMatrix()),true);

const pi=Object.fromEntries(chars.map(c=>[c,diag(sectors.map(s=>s.left===c?1:0))]));
const pio=Object.fromEntries(chars.map(c=>[c,diag(sectors.map(s=>s.right===c?1:0))]));
for(const a of chars) for(const b of chars)
  assert.equal(eq(sub(mul(pi[a],pio[b]),mul(pio[b],pi[a])),zeroMatrix()),true);

const firstOrder=(u,v)=>u.left===v.left||u.right===v.right;
const allPairs=[];
for(let i=0;i<n;i++) for(let j=i+1;j<n;j++) allPairs.push([sectors[i],sectors[j]]);
const chiralityPairs=allPairs.filter(([u,v])=>u.gamma*v.gamma===-1);
const relationPairs=allPairs.filter(([u,v])=>u.relationParity*v.relationParity===1);
const bothPairs=allPairs.filter(([u,v])=>u.gamma*v.gamma===-1&&u.relationParity*v.relationParity===1);
const allowedPairs=bothPairs.filter(([u,v])=>firstOrder(u,v));
const edgeName=([u,v])=>[u.label,v.label].sort().join('--');
const allowedNames=allowedPairs.map(edgeName).sort();
const recordedNames=evidence.finiteDiracSupport.allowedEdges.map(x=>x.split('--').sort().join('--')).sort();

assert.equal(allPairs.length,66);
assert.equal(chiralityPairs.length,36);
assert.equal(relationPairs.length,30);
assert.equal(bothPairs.length,16);
assert.equal(allowedPairs.length,10);
assert.deepEqual(allowedNames,recordedNames);

const D=zeroMatrix();
for(const [u,v] of allowedPairs){
  const i=byLabel[u.label].index;
  const j=byLabel[v.label].index;
  D[i][j]=1;
  D[j][i]=1;
}
assert.equal(eq(add(mul(D,Gamma),mul(Gamma,D)),zeroMatrix()),true);
assert.equal(eq(sub(mul(D,Rel),mul(Rel,D)),zeroMatrix()),true);
assert.equal(eq(sub(mul(D,J),mul(J,D)),zeroMatrix()),true);

// Test the first-order condition as matrices on all minimal idempotents.
for(const a of chars) for(const b of chars){
  const comm=sub(mul(D,pi[a]),mul(pi[a],D));
  const doubleComm=sub(mul(comm,pio[b]),mul(pio[b],comm));
  assert.equal(eq(doubleComm,zeroMatrix()),true);
}

// The intersection form is Tr(gamma pi(e_i) pi_o(e_j)).
const intersection=chars.map(a=>chars.map(b=>sectors.reduce(
  (sum,s)=>sum+(s.left===a&&s.right===b?s.gamma:0),0)));
assert.deepEqual(intersection,evidence.realEvenStructure.intersectionMatrix);

function determinant(M){
  if(M.length===0) return 1;
  return M[0].reduce((sum,x,j)=>{
    const minor=M.slice(1).map(row=>row.filter((_,k)=>k!==j));
    return sum+(j%2===0?1:-1)*x*determinant(minor);
  },0);
}
assert.equal(determinant(intersection),1);

// Character-level support is connected even though the real-completed state
// graph has the expected two J-related components.
const graphComponents=(vertices,edges)=>{
  const unseen=new Set(vertices);
  const out=[];
  while(unseen.size){
    const seed=unseen.values().next().value;
    const stack=[seed], component=[];
    unseen.delete(seed);
    while(stack.length){
      const u=stack.pop(); component.push(u);
      for(const [a,b] of edges){
        const v=a===u?b:b===u?a:null;
        if(v!==null&&unseen.has(v)){unseen.delete(v);stack.push(v);}
      }
    }
    out.push(component);
  }
  return out;
};
const stateEdges=allowedPairs.map(([u,v])=>[u.label,v.label]);
const stateComponents=graphComponents(labels,stateEdges);
assert.deepEqual(stateComponents.map(x=>x.length).sort((a,b)=>a-b),[6,6]);
const charEdges=[];
for(const [u,v] of allowedPairs){
  if(u.left===v.left) charEdges.push([u.right,v.right]);
  if(u.right===v.right) charEdges.push([u.left,v.left]);
}
assert.equal(graphComponents(chars,charEdges).length,1);

// Exact unit-weight characteristic polynomial.  Polynomials use ascending
// coefficient order.  A recursive determinant is small enough at 6x6.
const pAdd=(p,q)=>Array.from({length:Math.max(p.length,q.length)},(_,i)=>(p[i]||0)+(q[i]||0));
const pMul=(p,q)=>{
  const out=Array(p.length+q.length-1).fill(0);
  for(let i=0;i<p.length;i++) for(let j=0;j<q.length;j++) out[i+j]+=p[i]*q[j];
  return out;
};
const pScale=(q,p)=>p.map(x=>q*x);
const pDet=M=>{
  if(M.length===0) return [1];
  let out=[0];
  for(let j=0;j<M.length;j++){
    const minor=M.slice(1).map(row=>row.filter((_,k)=>k!==j));
    out=pAdd(out,pScale(j%2===0?1:-1,pMul(M[0][j],pDet(minor))));
  }
  while(out.length>1&&out.at(-1)===0) out.pop();
  return out;
};
const componentLabels=stateComponents[0];
const componentIndices=componentLabels.map(x=>byLabel[x].index);
const A=componentIndices.map(i=>componentIndices.map(j=>D[i][j]));
const lambdaMinusA=A.map((row,i)=>row.map((x,j)=>i===j?[-x,1]:[-x]));
assert.deepEqual(pDet(lambdaMinusA),[0,0,5,0,-5,0,1]);

// The component has rank four and nullity two; J doubles that kernel.
function rank(M){
  const A=M.map(r=>r.slice()); let r=0;
  for(let c=0;c<A[0].length&&r<A.length;c++){
    let p=r; while(p<A.length&&Math.abs(A[p][c])<1e-12)p++;
    if(p===A.length)continue;
    [A[p],A[r]]=[A[r],A[p]];
    const q=A[r][c]; for(let j=c;j<A[0].length;j++)A[r][j]/=q;
    for(let i=0;i<A.length;i++)if(i!==r){const f=A[i][c];for(let j=c;j<A[0].length;j++)A[i][j]-=f*A[r][j];}
    r++;
  }
  return r;
}
assert.equal(rank(A),4);
assert.equal(rank(D),8);
assert.equal(n-rank(D),4);

// Exhaust the same nonzero coefficient box used for the bounded texture
// claim.  The protected cofactor and determinant identity coexist exactly.
const alphabet=[-2,-1,1,2];
let checked=0;
for(const A0 of alphabet) for(const x of alphabet) for(const y of alphabet)
for(const d0 of alphabet) for(const g of alphabet) for(const h of alphabet){
  const M=[
    [A0,x,y,0,0], [x,d0,0,0,0], [y,0,0,g,0],
    [0,0,g,0,h], [0,0,0,h,0]
  ];
  const cofactor=M.slice(1).map(row=>row.slice(1));
  assert.equal(determinant(cofactor),0);
  assert.equal(determinant(M),d0*y*y*h*h);
  assert.notEqual(determinant(M),0);
  checked++;
}
assert.equal(checked,4096);
assert.equal(evidence.connectorTexture.boundedNonzeroAssignmentsChecked,checked);

assert.equal(evidence.physicalCarrierAudit.genuineSourcedPatiSalamEmbedding,false);
assert.equal(evidence.decision.ordinarySixCharacterFiniteGeometry,'SAT');
assert.equal(evidence.decision.invertibleTwelveStateFiniteDirac,'UNSAT on the exact allowed support');
assert.equal(evidence.decision.embedsSourcedPatiSalamCarrier,'UNSAT');

console.log('PASS 1529: the unique six-character support is a real-even first-order C^6 geometry with det(cap)=1 and connected character graph; its 12-state Dirac operator has four forced zero modes, the five-state cofactor texture survives only at coefficient level, and four new label states prevent a sourced Pati-Salam embedding.');
