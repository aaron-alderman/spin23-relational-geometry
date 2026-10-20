import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const path='evidence/data/spin23-next-investigation-priority-roadmap.json';
const roadmap=JSON.parse(readFileSync(path,'utf8'));

assert.equal(roadmap.schema,'spin23.next-investigation-priority-roadmap/1');
assert.ok(roadmap.decisionQuestion.length>20);
assert.ok(roadmap.decisionPrinciple.length>40);
assert.ok(roadmap.centralGate.includes('global Schur ray'));

const investigations=roadmap.investigations;
assert.equal(investigations.length,8);
assert.deepEqual(investigations.map(x=>x.rank),[1,2,3,4,5,6,7,8]);
assert.equal(new Set(investigations.map(x=>x.id)).size,investigations.length);

const required=[
  'tier','id','title','impact','tractability','whyProgrammeShifting',
  'firstExecutableArtifact','positiveResult','negativeResult','status'
];
for(const item of investigations){
  for(const field of required){
    assert.equal(typeof item[field],'string',`${item.id}.${field} must be a string`);
    assert.ok(item[field].trim().length>0,`${item.id}.${field} must be nonempty`);
  }
  assert.ok(Array.isArray(item.dependencies) && item.dependencies.length>0,
    `${item.id}.dependencies must be nonempty`);
}

for(const item of investigations.slice(0,4)){
  assert.ok(!item.status.includes('blocked'),`top-four item ${item.id} may not be blocked`);
  assert.ok(item.firstExecutableArtifact.length>40,
    `top-four item ${item.id} needs a concrete first artifact`);
}

assert.equal(investigations[0].id,'physical-aggregate-intertwiner-census');
assert.equal(investigations[1].id,'complex-indefinite-schur-locus');
assert.equal(investigations[2].id,'one-loop-determinantal-ideal-tangency');
assert.equal(investigations.at(-1).status,'externally-blocked');

assert.ok(Array.isArray(roadmap.deprioritized) && roadmap.deprioritized.length>=5);
assert.equal(new Set(roadmap.deprioritized.map(x=>x.id)).size,roadmap.deprioritized.length);
for(const item of roadmap.deprioritized){
  assert.ok(item.id.length>0);
  assert.ok(item.reason.length>30,`${item.id} needs a substantive reason`);
}

assert.ok(Array.isArray(roadmap.immediateTranche) && roadmap.immediateTranche.length===3);
assert.ok(roadmap.verdict.includes('Pati-Salam'));
assert.ok(roadmap.verdict.includes('one-loop'));

console.log('PASS 1511: eight investigations are ranked with executable artifacts, decisive outcomes, dependencies, and explicit deprioritization; the physical aggregate intertwiner census is first.');
