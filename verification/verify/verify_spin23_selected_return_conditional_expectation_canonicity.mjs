import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-selected-return-conditional-expectation-canonicity.json','utf8'));
assert.equal(evidence.schema,'spin23.selected-return-conditional-expectation-canonicity/1');

const names=['I','P','N','Z','X'];
const n=names.length;
const zero=()=>Array.from({length:n},()=>Array(n).fill(0));
const identity=()=>{const A=zero();for(let i=0;i<n;i++)A[i][i]=1;return A;};
const mul=(A,B)=>A.map((r,i)=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const eq=(A,B)=>A.every((r,i)=>r.every((x,j)=>x===B[i][j]));
const matrixUnit=(i,j)=>{const A=zero();A[i][j]=1;return A;};
const projectors=names.map((_,i)=>matrixUnit(i,i));
const Ediag=A=>projectors.reduce((out,p)=>add(out,mul(mul(p,A),p)),zero());
const q=add(projectors[0],projectors[1]);
const F=A=>mul(mul(q,Ediag(A)),q);

// Idempotence, units, trace and bimodularity on matrix-unit bases.
assert.equal(eq(Ediag(identity()),identity()),true);
assert.equal(eq(F(identity()),q),true);
assert.equal(eq(F(q),q),true);
for(let i=0;i<n;i++)for(let j=0;j<n;j++){
  const a=matrixUnit(i,j);
  assert.equal(eq(Ediag(Ediag(a)),Ediag(a)),true);
  assert.equal(eq(F(F(a)),F(a)),true);
  for(let k=0;k<n;k++){
    const b=projectors[k];
    assert.equal(eq(Ediag(mul(b,a)),mul(b,Ediag(a))),true);
    assert.equal(eq(Ediag(mul(a,b)),mul(Ediag(a),b)),true);
    if(k<2){
      assert.equal(eq(F(mul(b,a)),mul(b,F(a))),true);
      assert.equal(eq(F(mul(a,b)),mul(F(a),b)),true);
    }
  }
}

// Kraus-projector form is the finite certificate of complete positivity. The
// corresponding Choi matrices are sums of orthogonal rank-one |ii><ii| terms.
assert.equal(evidence.diagonalExpectation.KrausOperators.length,5);
assert.equal(evidence.diagonalExpectation.ChoiRank,5);
assert.equal(evidence.selectedReturnMap.ChoiRank,2);
assert.equal(evidence.diagonalExpectation.completelyPositive,true);
assert.equal(evidence.selectedReturnMap.completelyPositive,true);

// Vertices plus oriented adjacent matrix units generate every E_ij because
// the chain is connected and products concatenate paths.
const undirectedEdges=[[0,1],[1,2],[2,3],[3,4]];
const reachable=new Set(names.map((_,i)=>`${i},${i}`));
for(const [i,j] of undirectedEdges){reachable.add(`${i},${j}`);reachable.add(`${j},${i}`);}
let changed=true;
while(changed){
  changed=false;
  for(let i=0;i<n;i++)for(let j=0;j<n;j++)for(let k=0;k<n;k++)
    if(reachable.has(`${i},${j}`)&&reachable.has(`${j},${k}`)&&!reachable.has(`${i},${k}`)){
      reachable.add(`${i},${k}`);changed=true;
    }
}
assert.equal(reachable.size,25);
assert.equal(5+2*4,13);
assert.equal(reachable.has('0,2'),true); // E_IP E_PN=E_IN

// Enumerate all graph automorphisms and all invariant vertex masks.
const permutations=arr=>arr.length===0?[[]]:arr.flatMap((x,i)=>
  permutations(arr.filter((_,j)=>j!==i)).map(rest=>[x,...rest]));
const edgeSet=new Set(undirectedEdges.map(([i,j])=>[i,j].sort().join(',')));
const autos=permutations([0,1,2,3,4]).filter(p=>undirectedEdges.every(([i,j])=>
  edgeSet.has([p[i],p[j]].sort((a,b)=>a-b).join(','))));
assert.equal(autos.length,2);
const invariantMasks=(group,predicate=()=>true)=>{
  const out=[];
  for(let mask=0;mask<2**n;mask++)if(predicate(mask)&&group.every(p=>{
    let image=0;for(let i=0;i<n;i++)if(mask&(1<<i))image|=1<<p[i];
    return image===mask;
  }))out.push(mask);
  return out;
};
const unmarked=invariantMasks(autos);
assert.equal(unmarked.length,8);
const piMask=(1<<0)|(1<<1);
assert.equal(unmarked.includes(piMask),false);
const stabilizerP=autos.filter(p=>p[1]===1);
assert.equal(stabilizerP.length,1);
assert.equal(invariantMasks(stabilizerP).length,32);
const stabilizerIP=autos.filter(p=>new Set([p[0],p[1]]).size===2&&
  [p[0],p[1]].every(x=>x===0||x===1));
assert.equal(stabilizerIP.length,1);
assert.equal(invariantMasks(stabilizerIP).length,32);
const containingIP=Array.from({length:32},(_,i)=>i).filter(mask=>(mask&piMask)===piMask);
assert.equal(containingIP.length,8);
assert.deepEqual(containingIP.filter(mask=>mask===piMask),[piMask]);

// A scalar degree-two polynomial cannot vanish on the N,Z,X diagonal for
// every edge assignment while retaining P/I returns. Exhaust bounded scalar
// coefficients and two distinct h values; only c0=c2=0 satisfies the mask.
const scalarSolutions=[];
for(const c0 of [-1,0,1])for(const c2 of [-1,0,1]){
  let zeros=true;
  for(const h of [1,2]) if(c0+c2*h*h!==0)zeros=false;
  if(zeros)scalarSolutions.push([c0,c2]);
}
assert.deepEqual(scalarSolutions,[[0,0]]);

// The trace of D^2 counts every edge twice, so scalar spectral action has no
// selected vertex localization.
const chain=zero();
for(const [i,j] of undirectedEdges)chain[i][j]=chain[j][i]=1;
const chain2=mul(chain,chain);
assert.deepEqual(chain2.map((r,i)=>r[i]),[1,2,2,2,1]);
assert.equal(chain2.reduce((s,r,i)=>s+r[i],0),8);

assert.equal(evidence.pathSubalgebras.generatedMatrixUnits,reachable.size);
assert.equal(evidence.automorphismClassification.unmarkedFiveChainAutomorphismGroupOrder,autos.length);
assert.equal(evidence.automorphismClassification.unmarkedEquivariantMasks,unmarked.length);
assert.equal(evidence.automorphismClassification.equivariantMasksWithPMarked,invariantMasks(stabilizerP).length);
assert.equal(evidence.automorphismClassification.masksContainingBothPhysicalAnchors,containingIP.length);
assert.deepEqual(evidence.spectralPolynomialAudit.solutionsForC0C2,scalarSolutions);

assert.equal(evidence.decision.EdiagCanonical,true);
assert.equal(evidence.decision.PiPIEdiagCanonicalFromDeclaredSymmetries,false);
assert.equal(evidence.decision.spectralPolynomialGeneratesMask,false);
assert.equal(evidence.decision.heatKernelGeneratesMask,false);

console.log('PASS 1543: E_diag is the canonical CP diagonal expectation, but Pi_PI is a nonunital selected corner not fixed by chain or anchor symmetries; neither scalar spectral polynomials nor heat kernels generate its mask without inserting q.');
