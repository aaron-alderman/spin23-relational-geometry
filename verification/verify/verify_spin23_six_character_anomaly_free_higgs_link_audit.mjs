import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const base=JSON.parse(readFileSync(
  'evidence/data/spin23-six-character-ordinary-correspondence-completion.json','utf8'));
const anomaly=JSON.parse(readFileSync(
  'evidence/data/spin23-six-character-gauge-kernel-unimodularity-anomalies.json','utf8'));
const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-six-character-anomaly-free-higgs-link-audit.json','utf8'));
assert.equal(evidence.schema,'spin23.six-character-anomaly-free-higgs-link-audit/1');

const chars=anomaly.characterOrder;
const sectors=base.hilbertSpace.sectors;
const byLabel=Object.fromEntries(sectors.map(s=>[s.label,s]));
const w=anomaly.maximalSimultaneousAnomalyFreeSubspace.unimodularBasis;
assert.deepEqual(w,evidence.generatorNormalization.recordedUnimodularLieBasis);
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
const rawCharge=s=>chars.map(c=>(s.left===c?1:0)-(s.right===c?1:0));
const faithfulCharge=s=>[dot(rawCharge(s),w[0]),dot(rawCharge(s),w[1])/2];

// The second coordinate is integral on every state because its apparent
// half-period is precisely the common diagonal kernel.
for(const s of sectors){
  assert.equal(Math.abs(dot(rawCharge(s),w[1]))%2,0);
  assert.deepEqual(faithfulCharge(s),evidence.stateCharges[s.label]);
  assert.deepEqual(faithfulCharge(byLabel[s.J]),faithfulCharge(s).map(x=>x===0?0:-x));
}

const edgeCharge=(u,v)=>faithfulCharge(byLabel[u]).map((x,i)=>x-faithfulCharge(byLabel[v])[i]);
for(const [oriented,recorded] of Object.entries(evidence.allowedOrientedEdgeCharges)){
  const [u,v]=oriented.split('<-');
  assert.deepEqual(edgeCharge(u,v),recorded);
}

const canonical=s=>s.split('--').sort().join('--');
const baseOrbits=base.finiteDiracSupport.edgeOrbitsUnderJ.map(o=>o.map(canonical).sort());
const audited=evidence.jEdgeOrbitAudit.map(x=>x.orbit.map(canonical).sort());
assert.deepEqual(audited,baseOrbits);
for(const item of evidence.jEdgeOrbitAudit){
  const [u,v]=item.representativeOrientation.split('<-');
  assert.deepEqual(edgeCharge(u,v),item.representativeLinkCharge);
  assert.deepEqual(item.jPartnerLinkCharge,item.representativeLinkCharge.map(x=>x===0?0:-x));
  assert.equal(item.bareInvariantMass,item.representativeLinkCharge.every(x=>x===0));
}
assert.equal(evidence.jEdgeOrbitAudit.filter(x=>x.bareInvariantMass).length,0);
assert.equal(evidence.bareInvariantOrbitCount,0);
assert.equal(evidence.chargedLinkRequiredOrbitCount,5);

function rank(M){
  const A=M.map(r=>r.slice());let r=0;
  for(let c=0;c<A[0].length&&r<A.length;c++){
    let p=r;while(p<A.length&&A[p][c]===0)p++;
    if(p===A.length)continue;
    [A[p],A[r]]=[A[r],A[p]];
    const q=A[r][c];A[r]=A[r].map(x=>x/q);
    for(let i=0;i<A.length;i++)if(i!==r){const f=A[i][c];A[i]=A[i].map((x,j)=>x-f*A[r][j]);}
    r++;
  }
  return r;
}
const rows=evidence.linkChargeLattice.representativeRows;
assert.equal(rank(rows),2);
// In rank two the gcd of all entries and of all 2x2 minors are the Smith
// determinantal divisors. They are both one, so the lattice is saturated.
const gcd=(a,b)=>b===0?Math.abs(a):gcd(b,a%b);
const gcdAll=xs=>xs.reduce((a,b)=>gcd(a,b),0);
const minors=[];
for(let i=0;i<rows.length;i++)for(let j=i+1;j<rows.length;j++)
  minors.push(rows[i][0]*rows[j][1]-rows[i][1]*rows[j][0]);
assert.equal(gcdAll(rows.flat()),1);
assert.equal(gcdAll(minors),1);
assert.deepEqual(evidence.linkChargeLattice.smithInvariantFactors,[1,1]);
assert.equal(evidence.linkChargeLattice.indexInFaithfulGaugeChargeLattice,1);
assert.equal(evidence.genericVevStabilizer.continuousDimension,0);
assert.equal(evidence.genericVevStabilizer.faithfulResidualGaugeGroup,'trivial');

// Every connected component is grading-bipartite with parts 4 and 2. Any
// grading-odd matrix on this fixed support therefore has component rank at
// most four and nullity at least two, regardless of nonzero link VEVs.
const allowed=base.finiteDiracSupport.allowedEdges.map(x=>x.split('--'));
const unseen=new Set(sectors.map(s=>s.label));
const components=[];
while(unseen.size){
  const seed=unseen.values().next().value, stack=[seed], component=[];
  unseen.delete(seed);
  while(stack.length){
    const u=stack.pop();component.push(u);
    for(const [a,b] of allowed){
      const v=a===u?b:b===u?a:null;
      if(v!==null&&unseen.has(v)){unseen.delete(v);stack.push(v);}
    }
  }
  components.push(component);
}
assert.equal(components.length,2);
for(const component of components){
  const counts=[1,-1].map(g=>component.filter(x=>byLabel[x].gamma===g).length).sort((a,b)=>a-b);
  assert.deepEqual(counts,[2,4]);
}
// One nonzero point reaches rank eight, so rank eight (and nullity four) is
// the generic value on this support, while the bipartition proves it cannot
// be exceeded.
const labels=sectors.map(s=>s.label);
const index=Object.fromEntries(labels.map((x,i)=>[x,i]));
const D=Array.from({length:labels.length},()=>Array(labels.length).fill(0));
for(const [u,v] of allowed){D[index[u]][index[v]]=1;D[index[v]][index[u]]=1;}
assert.equal(rank(D),8);
assert.match(evidence.compatibilityDecision.massGapOnExactTwelveStateSupport,/UNSAT/);
assert.match(evidence.compatibilityDecision.nZXTexture,/coefficient-level/);
assert.match(evidence.compatibilityDecision.physicalScalarCompletion,/UNDERDETERMINED/);

console.log('PASS 1536: all five required J-edge orbits are charged under the faithful anomaly-free U(1)^2, their primitive link charges span a saturated rank-two lattice and generic nonzero VEVs leave no faithful gauge subgroup; relation parity and coefficient-level N-Z-X support coexist, but the fixed chiral graph still enforces four zero modes and the scalar/link completion is new data.');
