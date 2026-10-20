import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-selected-anchor-projection-lattice-audit.json','utf8'));
const baseEvidence=JSON.parse(readFileSync(
  'evidence/data/spin23-six-character-ordinary-correspondence-completion.json','utf8'));
assert.equal(evidence.schema,'spin23.selected-anchor-projection-lattice-audit/1');

const base=baseEvidence.hilbertSpace.sectors.map(s=>({...s}));
const added=[
  {label:'SI',left:'S',right:'I',gamma:-1,relationParity:1,J:'IS'},
  {label:'IS',left:'I',right:'S',gamma:1,relationParity:-1,J:'SI'},
  {label:'NU',left:'N',right:'U',gamma:-1,relationParity:1,J:'UN'},
  {label:'UN',left:'U',right:'N',gamma:1,relationParity:-1,J:'NU'}
];
const repaired=[...base,...added];
const chars=['P','I','N','S','T','U'];
const qLabels=new Set(['PN','NP','IN','NI']);

const groupBy=(states,key)=>Object.fromEntries(chars.map(c=>[c,states.filter(s=>s[key]===c)]));
const isFiberUnion=(states,key,selected)=>Object.values(groupBy(states,key)).every(fiber=>{
  const hits=fiber.filter(s=>selected.has(s.label)).length;
  return hits===0||hits===fiber.length;
});
const commutantDimension=groups=>Object.values(groups).reduce((sum,x)=>sum+x.length**2,0);
const refinedCommutantDimension=(states,selected)=>{
  let total=0;
  for(const fiber of Object.values(groupBy(states,'left'))){
    const inside=fiber.filter(s=>selected.has(s.label)).length;
    const outside=fiber.length-inside;
    total+=inside**2+outside**2;
  }
  return total;
};
const refinedBlockCount=(states,selected)=>Object.values(groupBy(states,'left')).reduce((sum,fiber)=>{
  const inside=fiber.some(s=>selected.has(s.label));
  const outside=fiber.some(s=>!selected.has(s.label));
  return sum+(inside?1:0)+(outside?1:0);
},0);

for(const [states,key] of [[base,'twelveStateModel'],[repaired,'sixteenStateSectorRepair']]){
  const record=evidence[key];
  const orbits=new Set(states.map(s=>[s.label,s.J].sort().join('/')));
  assert.equal(states.length,record.sectorCount);
  assert.equal(orbits.size,record.JOrbitCount);
  assert.equal(2**states.length,record.jointLeftRightDiagonalProjectionLatticeSize);
  assert.equal(2**orbits.size,record.JInvariantJointProjectionLatticeSize);
  assert.equal(isFiberUnion(states,'left',qLabels),false);
  assert.equal(isFiberUnion(states,'right',qLabels),false);
  assert.equal(commutantDimension(groupBy(states,'left')),record.representedCommutantDimensionBeforeQ);
  assert.equal(refinedCommutantDimension(states,qLabels),record.representedCommutantDimensionAfterQ);
  assert.equal(refinedBlockCount(states,qLabels),record.abelianBlockCountAfterQ);
  for(const s of states)if(qLabels.has(s.label))assert.equal(qLabels.has(s.J),true);
}

const choose2=n=>n*(n-1)/2;
assert.equal(choose2(6),evidence.twelveStateModel.rankFourJInvariantProjectionsFromTwoOrbits);
assert.equal(choose2(8),evidence.sixteenStateSectorRepair.rankFourJInvariantProjectionsFromTwoOrbits);

// The path/Jordan associative closure has every matrix unit inside each
// connected relation sheet.  Count reachability pairs directly.
const allowed=(u,v)=>u.gamma*v.gamma===-1&&u.relationParity===v.relationParity&&
  (u.left===v.left||u.right===v.right);
const components=states=>{
  const unseen=new Set(states.map(s=>s.label)),out=[];
  while(unseen.size){
    const seed=unseen.values().next().value,stack=[seed],part=[];unseen.delete(seed);
    while(stack.length){
      const label=stack.pop(),u=states.find(s=>s.label===label);part.push(label);
      for(const v of states)if(unseen.has(v.label)&&allowed(u,v)){unseen.delete(v.label);stack.push(v.label);}
    }
    out.push(part);
  }
  return out;
};
const baseComponents=components(base),repairedComponents=components(repaired);
assert.deepEqual(baseComponents.map(x=>x.length).sort((a,b)=>a-b),[6,6]);
assert.deepEqual(repairedComponents.map(x=>x.length).sort((a,b)=>a-b),[8,8]);
assert.equal(baseComponents.reduce((s,x)=>s+x.length**2,0),72);
assert.equal(repairedComponents.reduce((s,x)=>s+x.length**2,0),128);
assert.equal(baseComponents.some(part=>part.every(x=>qLabels.has(x))),false);
assert.equal(repairedComponents.some(part=>part.every(x=>qLabels.has(x))),false);

// Only the already allowed IN--IP edge and its J partner cross Q's boundary.
const crossingEdges=[];
for(let i=0;i<base.length;i++)for(let j=i+1;j<base.length;j++)if(allowed(base[i],base[j])){
  if(qLabels.has(base[i].label)!==qLabels.has(base[j].label))
    crossingEdges.push([base[i].label,base[j].label].sort().join('--'));
}
assert.deepEqual(crossingEdges.sort(),['IN--IP','NI--PI'].sort());

// Multiplicity repair dimensions and the cost of a rank-one selected line.
const multiplicities={PN:1,NP:1,IN:2,NI:2,IP:1,PI:1,PS:1,SP:1,TP:2,PT:2,TU:1,UT:1};
const expanded=[];
for(const s of base)for(let k=0;k<multiplicities[s.label];k++)expanded.push({...s,copy:k});
const expandedGroups=Object.fromEntries(chars.map(c=>[c,expanded.filter(s=>s.left===c)]));
assert.equal(expanded.length,16);
assert.equal(commutantDimension(expandedGroups),54);
// q selects PN,NP and one line rather than both copies of IN,NI.
const selectedMultiplicity=s=>s.label==='PN'||s.label==='NP'||
  ((s.label==='IN'||s.label==='NI')&&s.copy===0);
let after=0,blocks=0;
for(const fiber of Object.values(expandedGroups)){
  const inside=fiber.filter(selectedMultiplicity).length,outside=fiber.length-inside;
  after+=inside**2+outside**2;
  blocks+=(inside?1:0)+(outside?1:0);
}
assert.equal(after,38);
assert.equal(blocks,9);
assert.equal(evidence.sixteenStateMultiplicityRepair.exactPhysicalQInJointRepresentedOppositeAlgebra,false);
assert.equal(evidence.sixteenStateMultiplicityRepair.exactPhysicalQInJointCommutant,true);

assert.equal(evidence.decision.projectionExistsInJointDiagonalMultiplicityOne,true);
assert.equal(evidence.decision.projectionExistsInRepresentedC6Alone,false);
assert.equal(evidence.decision.projectionUnique,false);
assert.equal(evidence.decision.projectionCentralInGeneratedPathAlgebra,false);
assert.deepEqual(evidence.adjoiningAudit.commutatorSupport,crossingEdges.sort());

console.log('PASS 1548: Q_anchor is a nonminimal joint left/right sector sum in multiplicity-one models, not a C^6 central projection or path-algebra central projection; the multiplicity repair needs a new rank-one ray, and adjoining Q refines the gauge/commutant without creating a forbidden primitive edge.');
