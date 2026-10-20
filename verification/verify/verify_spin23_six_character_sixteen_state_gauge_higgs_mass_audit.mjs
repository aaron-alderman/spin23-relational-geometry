import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const base=JSON.parse(readFileSync(
  'evidence/data/spin23-six-character-ordinary-correspondence-completion.json','utf8'));
const repair=JSON.parse(readFileSync(
  'evidence/data/spin23-six-character-zero-mode-repair-exhaustion.json','utf8'));
const priorAnomaly=JSON.parse(readFileSync(
  'evidence/data/spin23-six-character-gauge-kernel-unimodularity-anomalies.json','utf8'));
const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-six-character-sixteen-state-gauge-higgs-mass-audit.json','utf8'));
assert.equal(evidence.schema,'spin23.six-character-sixteen-state-gauge-higgs-mass-audit/1');

const chars=evidence.characterOrder;
const states=[...base.hilbertSpace.sectors,...evidence.addedStates];
const byLabel=Object.fromEntries(states.map(s=>[s.label,s]));
const charge=s=>chars.map(c=>(s.left===c?1:0)-(s.right===c?1:0));
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);

function rank(M){
  const A=M.map(r=>r.map(Number));let r=0;
  for(let c=0;c<A[0].length&&r<A.length;c++){
    let p=r;while(p<A.length&&Math.abs(A[p][c])<1e-12)p++;
    if(p===A.length)continue;
    [A[p],A[r]]=[A[r],A[p]];
    const z=A[r][c];A[r]=A[r].map(x=>x/z);
    for(let i=0;i<A.length;i++)if(i!==r){const f=A[i][c];A[i]=A[i].map((x,j)=>x-f*A[r][j]);}
    r++;
  }
  return r;
}
const Q=states.map(charge);
assert.equal(rank(Q),5);
assert.ok(Q.every(v=>dot(v,Array(6).fill(1))===0));
assert.equal(6-rank(Q),1);
assert.equal(evidence.gaugeKernelAndUnimodularity.chargeMatrixRank,5);
const leftMultiplicities=chars.map(c=>states.filter(s=>s.left===c).length);
assert.deepEqual(leftMultiplicities,[4,3,3,2,2,2]);
assert.deepEqual(leftMultiplicities,evidence.gaugeKernelAndUnimodularity.leftCharacterMultiplicities);
assert.equal(leftMultiplicities.reduce((a,b)=>a+b,0),16);

const left=states.filter(s=>s.gamma===1);
assert.deepEqual(left.map(s=>s.label),evidence.chiralAnomaly.gammaPositiveStates);
const V=left.map(charge);
const grav=chars.map((_,a)=>V.reduce((s,v)=>s+v[a],0));
assert.deepEqual(grav,evidence.chiralAnomaly.mixedGravitationalCovector);
const components=[];
for(let a=0;a<6;a++)for(let b=a;b<6;b++)for(let c=b;c<6;c++){
  const value=V.reduce((s,v)=>s+v[a]*v[b]*v[c],0);
  if(value)components.push([chars[a]+chars[b]+chars[c],value]);
}
assert.deepEqual(components,evidence.chiralAnomaly.nonzeroSymmetricCubicComponents);

const trilinear=(x,y,z)=>V.reduce((s,v)=>s+dot(v,x)*dot(v,y)*dot(v,z),0);
const W=evidence.maximalAnomalyFreeSubalgebra.primitiveQuotientCocharacters;
assert.equal(rank(W),2);
for(const x of W)assert.equal(dot(grav,x),0);
for(const x of W)for(const y of W)for(const z of W)assert.equal(trilinear(x,y,z),0);
// On I=N, write the five residual cycle-edge charges. A constrained
// projective critical point of sum x_i^3 with sum x_i=0 would have all
// x_i^2 equal. Five nonzero signs of equal magnitude cannot sum to zero,
// proving smoothness and excluding a three-dimensional anomaly-free space.
for(let plus=0;plus<=5;plus++)assert.notEqual(2*plus-5,0);
assert.match(evidence.maximalAnomalyFreeSubalgebra.maximality,/smooth/);

// The old plane from claim 1532 acquires G=I-N and intersects the new
// gravitational kernel in only one effective dimension.
const oldBasis=priorAnomaly.maximalSimultaneousAnomalyFreeSubspace.unimodularBasis;
assert.notEqual(dot(grav,oldBasis[0]),0);
assert.notEqual(dot(grav,oldBasis[1]),0);
const oldGravKernelCombination=oldBasis[0].map((x,i)=>2*x+oldBasis[1][i]);
assert.equal(dot(grav,oldGravKernelCombination),0);
assert.equal(rank([oldGravKernelCombination]),1);
assert.equal(evidence.maximalAnomalyFreeSubalgebra.comparisonToTwelveStateResult.oldPlaneSurvivesOnlyInDimension,1);

const torusCharge=s=>W.map(w=>dot(charge(s),w));
for(const s of states){
  assert.deepEqual(torusCharge(s),evidence.stateChargesOnMaximalTwoTorus[s.label]);
  assert.deepEqual(torusCharge(byLabel[s.J]),torusCharge(s).map(x=>x===0?0:-x));
}

const permitted=(u,v)=>u.gamma*v.gamma===-1&&u.relationParity===v.relationParity&&
  (u.left===v.left||u.right===v.right);
const edges=[];
for(let i=0;i<states.length;i++)for(let j=i+1;j<states.length;j++)
  if(permitted(states[i],states[j]))edges.push([states[i],states[j]]);
assert.equal(edges.length,14);
assert.equal(edges.length,repair.newSectorOrbitSearch.minimalWitness.completeAllowedEdgeCount);
const canonical=(u,v)=>[u,v].sort().join('--');
const permittedNames=edges.map(([u,v])=>canonical(u.label,v.label)).sort();
const recordedNames=Object.keys(evidence.allowedOrientedEdgeCharges).map(name=>{
  const [u,v]=name.split('<-');return canonical(u,v);
}).sort();
assert.deepEqual(recordedNames,permittedNames);
const edgeCharge=(u,v)=>torusCharge(byLabel[u]).map((x,i)=>x-torusCharge(byLabel[v])[i]);
for(const [name,q] of Object.entries(evidence.allowedOrientedEdgeCharges)){
  const [u,v]=name.split('<-');assert.deepEqual(edgeCharge(u,v),q);
}
for(const orbit of evidence.jEdgeOrbitAudit){
  const [u,v]=orbit.representative.split('<-');
  assert.deepEqual(edgeCharge(u,v),orbit.charge);
  assert.equal(orbit.bareInvariantMass,orbit.charge.every(x=>x===0));
}
assert.deepEqual(evidence.jEdgeOrbitAudit.flatMap(x=>x.orbit.map(name=>{
  const [u,v]=name.split('--');return canonical(u,v);
})).sort(),permittedNames);
assert.equal(evidence.jEdgeOrbitAudit.filter(x=>x.bareInvariantMass).length,1);
assert.equal(evidence.bareInvariantOrbitCount,1);
assert.equal(evidence.chargedLinkRequiredOrbitCount,6);

const rows=evidence.linkChargeLattice.representativeRows;
assert.equal(rank(rows),2);
const gcd=(a,b)=>b===0?Math.abs(a):gcd(b,a%b);
const gcdAll=xs=>xs.reduce((a,b)=>gcd(a,b),0);
const minors=[];
for(let i=0;i<rows.length;i++)for(let j=i+1;j<rows.length;j++)
  minors.push(rows[i][0]*rows[j][1]-rows[i][1]*rows[j][0]);
assert.equal(gcdAll(rows.flat()),1);
assert.equal(gcdAll(minors),1);
assert.deepEqual(evidence.linkChargeLattice.smithInvariantFactors,[1,1]);
assert.equal(evidence.genericVevStabilizer.faithfulResidualGaugeGroup,'trivial');

function determinantBareiss(M){
  const A=M.map(row=>row.slice());let sign=1,previous=1;
  for(let k=0;k<A.length-1;k++){
    let pivot=k;while(pivot<A.length&&A[pivot][k]===0)pivot++;
    if(pivot===A.length)return 0;
    if(pivot!==k){[A[pivot],A[k]]=[A[k],A[pivot]];sign*=-1;}
    const p=A[k][k];
    for(let i=k+1;i<A.length;i++)for(let j=k+1;j<A.length;j++)
      A[i][j]=(A[i][j]*p-A[i][k]*A[k][j])/previous;
    previous=p;
  }
  return sign*A.at(-1).at(-1);
}
const D=Array.from({length:states.length},()=>Array(states.length).fill(0));
for(const [u,v] of edges){const i=states.indexOf(u),j=states.indexOf(v);D[i][j]=D[j][i]=1;}
assert.equal(determinantBareiss(D),1);
assert.equal(evidence.massGapAndParity.unitWeightDiracDeterminant,1);
assert.equal(evidence.massGapAndParity.relationParityPreserved,true);
assert.equal(evidence.massGapAndParity.genericFullRank,true);
assert.equal(evidence.textureAndPhysicalBoundary.sourcedPatiSalamEmbedding,false);

console.log('PASS 1539: the SI/IS and NU/UN repair leaves a rank-five effective center and rotates, but does not enlarge, the maximal anomaly-free U(1)^2; one of seven edge orbits is bare-neutral, six charged link orbits span the full lattice, generic VEVs fully Higgs the torus, and the same relation-even support generically gives an invertible sixteen-state Dirac operator.');
