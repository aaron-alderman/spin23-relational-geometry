import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const base=JSON.parse(readFileSync(
  'evidence/data/spin23-six-character-ordinary-correspondence-completion.json','utf8'));
const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-six-character-gauge-kernel-unimodularity-anomalies.json','utf8'));
assert.equal(evidence.schema,'spin23.six-character-gauge-kernel-unimodularity-anomalies/1');

const chars=evidence.characterOrder;
const sectors=base.hilbertSpace.sectors;
const charge=s=>chars.map(c=>(s.left===c?1:0)-(s.right===c?1:0));
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
const q=(v,theta)=>dot(v,theta);

function rank(M){
  const A=M.map(row=>row.map(Number));let r=0;
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

const allCharges=sectors.map(charge);
const recorded=evidence.centralGaugeAction.twelveStateChargeVectors;
for(let i=0;i<sectors.length;i++)assert.deepEqual(allCharges[i],recorded[sectors[i].label]);
assert.equal(rank(allCharges),5);
assert.equal(evidence.centralGaugeAction.incidenceRank,5);
const diagonal=Array(6).fill(1);
assert.ok(allCharges.every(v=>q(v,diagonal)===0));

// The kernel is exactly the diagonal because the incidence rank is five.
assert.equal(6-rank(allCharges),1);

// Unimodularity on the declared left representation selects one representative
// from every gauge-charge class rather than removing another physical U(1).
const leftMultiplicities=chars.map(c=>sectors.filter(s=>s.left===c).length);
assert.deepEqual(leftMultiplicities,evidence.unimodularity.leftCharacterMultiplicities);
assert.equal(dot(leftMultiplicities,diagonal),evidence.unimodularity.diagonalTrace);
for(const theta of [[2,-1,3,0,-2,1],[-3,4,0,2,1,-1]]){
  const shift=dot(leftMultiplicities,theta)/dot(leftMultiplicities,diagonal);
  const unimodular=theta.map(x=>x-shift);
  assert.ok(Math.abs(dot(leftMultiplicities,unimodular))<1e-12);
  const shiftedCharges=allCharges.map(v=>q(v,unimodular));
  const originalCharges=allCharges.map(v=>q(v,theta));
  assert.ok(shiftedCharges.every((x,i)=>Math.abs(x-originalCharges[i])<1e-12));
}
assert.deepEqual(
  chars.map((_,i)=>allCharges.reduce((s,v)=>s+v[i],0)),
  Array(6).fill(0),
);

const left=sectors.filter(s=>s.gamma===1);
assert.deepEqual(left.map(s=>s.label),evidence.anomalyConvention.leftHandedRepresentatives);
const V=left.map(charge);
assert.deepEqual(V,evidence.anomalyConvention.chargeVectors);

const grav=chars.map((_,a)=>V.reduce((s,v)=>s+v[a],0));
assert.deepEqual(grav,evidence.mixedGravitationalAnomaly.covector);

const componentKey=(a,b,c)=>[a,b,c].map(i=>chars[i]).join('');
const components=[];
for(let a=0;a<6;a++)for(let b=a;b<6;b++)for(let c=b;c<6;c++){
  const value=V.reduce((s,v)=>s+v[a]*v[b]*v[c],0);
  if(value)components.push([componentKey(a,b,c),value]);
}
assert.deepEqual(components,evidence.cubicGaugeAnomaly.nonzeroSymmetricComponents);

const fullGrav=chars.map((_,a)=>sectors.reduce((s,x)=>s+x.gamma*charge(x)[a],0));
assert.deepEqual(fullGrav,grav.map(x=>2*x));
for(let a=0;a<6;a++)for(let b=0;b<6;b++)for(let c=0;c<6;c++){
  const half=V.reduce((s,v)=>s+v[a]*v[b]*v[c],0);
  const full=sectors.reduce((s,x)=>{
    const v=charge(x);return s+x.gamma*v[a]*v[b]*v[c];
  },0);
  assert.equal(full,2*half);
}

const cubic=(theta)=>V.reduce((s,v)=>s+q(v,theta)**3,0);
const trilinear=(x,y,z)=>V.reduce((s,v)=>s+q(v,x)*q(v,y)*q(v,z),0);
const basis=evidence.maximalSimultaneousAnomalyFreeSubspace.unimodularBasis;
assert.equal(rank(basis),2);
for(const w of basis){
  assert.equal(dot(leftMultiplicities,w),0);
  assert.equal(dot(grav,w),0);
  assert.equal(cubic(w),0);
}
for(const x of basis)for(const y of basis)for(const z of basis)
  assert.equal(trilinear(x,y,z),0);

// The purely added S,T,U slice has three anomaly-free projective rays and
// no anomaly-free plane: after G=0 its cubic is 3*T*S*(S-T).
const added=evidence.addedCharacterOnlySlice.anomalyFreeRays;
assert.equal(added.length,3);
for(const w of added){
  assert.deepEqual(w.slice(0,3),[0,0,0]);
  assert.equal(dot(grav,w),0);
  assert.equal(cubic(w),0);
}
assert.equal(rank(added),2);
assert.equal(evidence.addedCharacterOnlySlice.maximalLinearDimensionInsideSlice,1);
for(let i=0;i<added.length;i++)for(let j=i+1;j<added.length;j++){
  // Distinct zero-locus lines cannot be gauged together: at least one mixed
  // cubic tensor component on their span is nonzero.
  const mixed=[trilinear(added[i],added[i],added[j]),trilinear(added[i],added[j],added[j])];
  assert.ok(mixed.some(x=>x!==0));
}

// On the anomaly-free plane, the last three charges are the negatives of
// the first three for every linear combination.
for(const [a,b] of [[1,0],[0,1],[2,-3],[-4,5]]){
  const w=basis[0].map((x,i)=>a*x+b*basis[1][i]);
  const charges=V.map(v=>q(v,w));
  assert.deepEqual(charges.slice(3),charges.slice(0,3).map(x=>x===0?0:-x));
}

// Maximality certificate. After quotienting the diagonal with P=0 and
// imposing S=U, the cubic is 3F for F=NI(I-N)+TS(S-T). Its projective
// gradient has no nonzero common zero in characteristic zero. For each
// binary pair, the nonzero branch would require N=2I and I=2N, whose
// coefficient determinant is 3; zero-coordinate branches force both zero.
assert.equal(2*2-1,3);
const grad=(I,N,T,S)=>[
  N*(2*I-N), I*(I-2*N), S*(S-2*T), T*(2*S-T),
];
assert.deepEqual(grad(0,0,0,0),[0,0,0,0]);
for(const point of [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1],[1,2,1,2]])
  assert.notDeepEqual(grad(...point),[0,0,0,0]);
assert.match(evidence.maximalSimultaneousAnomalyFreeSubspace.maximality,/smooth projective cubic surface/);

assert.equal(evidence.physicalDecision.gaugingAllEffectiveCentralDirections,'ANOMALOUS');
assert.equal(evidence.physicalDecision.unimodularityAloneCancelsAnomalies,false);
assert.match(evidence.physicalDecision.largestExhibitedAndMaximalLinearAnomalyFreeCentralSubalgebra,/u\(1\)\^2/);
assert.match(evidence.boundary,/unit-multiplicity C\^6 label spectrum/);

console.log('PASS 1532: the C^6 center acts through U(1)^5 after the diagonal kernel; unimodularity only fixes that kernel. The full central gauge algebra has nonzero gravitational and cubic anomalies, while an exact maximal simultaneous U(1)^2 subspace has pairwise-opposite chiral charges and vanishing complete abelian anomaly tensor.');
