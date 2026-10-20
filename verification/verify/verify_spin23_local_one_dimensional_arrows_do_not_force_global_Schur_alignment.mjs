import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-local-Hom-global-alignment-no-go.json','utf8'));

const signs=[-1,1];
let total=0,aligned=0,misaligned=0;

// Three mediator copies.  Each individual L->P_i and P_i->N arrow carries
// one scalar, but the six scalars need not factor through one common ray.
for(const d1 of signs) for(const y1 of signs)
for(const d2 of signs) for(const y2 of signs)
for(const d3 of signs) for(const y3 of signs){
  const columns=[[d1,y1],[d2,y2],[d3,y3]];
  const minors=[];
  for(let i=0;i<columns.length;i++){
    for(let j=i+1;j<columns.length;j++){
      minors.push(columns[i][0]*columns[j][1]-columns[j][0]*columns[i][1]);
    }
  }
  const rankOne=minors.every(x=>x===0);
  total+=1;
  if(rankOne) aligned+=1; else misaligned+=1;
}

assert.equal(total,64);
assert.equal(aligned,16);
assert.equal(misaligned,48);

// Explicit counterexample with every local Hom coordinate nonzero.
const v1=[1,1],v2=[1,-1];
assert.notEqual(v1[0]*v2[1]-v2[0]*v1[1],0);

assert.equal(evidence.enumeration.threeMediatorSignAssignments,64);
assert.equal(evidence.enumeration.globallyAligned,16);
assert.equal(evidence.enumeration.misaligned,48);
assert.equal(evidence.theorem.localOneDimensionalHomImpliesGlobalAlignment,false);
assert.equal(evidence.theorem.globalAlignmentIsRankOneDeterminantalCondition,true);

console.log('PASS 1510: one scalar on each local arrow still gives 48 misaligned cases among 64 three-mediator sign assignments; global protection is the rank-one minor ideal, not local Hom dimension.');
