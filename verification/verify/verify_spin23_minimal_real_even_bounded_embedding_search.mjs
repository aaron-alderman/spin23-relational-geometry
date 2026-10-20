import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-minimal-real-even-bounded-embedding-search.json','utf8'));

const states=['PN','IN','IP','SP','NP','NI','PI','PS'];
const allowed=[
  ['PN','IN'],['IN','IP'],['IP','SP'],
  ['NP','NI'],['NI','PI'],['PI','PS']
];
const dangerous=[['PN','NP'],['PN','NI']];
const J={PN:'NP',IN:'NI',IP:'PI',SP:'PS',NP:'PN',NI:'IN',PI:'IP',PS:'SP'};

let relationSolutions=0;
let relationWitness=null;
for(let mask=0;mask<2**states.length;mask++){
  const s=Object.fromEntries(states.map((v,i)=>[v,(mask&(1<<i))?1:-1]));
  const allowedEven=allowed.every(([u,v])=>s[u]*s[v]===1);
  const JOdd=states.every(v=>s[J[v]]===-s[v]);
  const dangerousOdd=dangerous.every(([u,v])=>s[u]*s[v]===-1);
  if(allowedEven&&JOdd&&dangerousOdd){relationSolutions++; relationWitness??=s;}
}
assert.equal(relationSolutions,2);

const signs=[-1,1];
let aggregateSolutions=0;
let aggregateWitness=null;
for(const d1 of signs) for(const y1 of signs)
for(const d2 of signs) for(const y2 of signs)
for(const d3 of signs) for(const y3 of signs){
  const v=[[d1,y1],[d2,y2],[d3,y3]];
  let aligned=true;
  for(let i=0;i<3;i++) for(let j=i+1;j<3;j++){
    if(v[i][0]*v[j][1]-v[j][0]*v[i][1]!==0) aligned=false;
  }
  if(aligned){aggregateSolutions++; aggregateWitness??=v;}
}
assert.equal(aggregateSolutions,16);
assert.equal(relationSolutions*aggregateSolutions,32);

// Field order L,H,P,S,N. Constraint products are standard Dirac,
// Majorana sewing, and the dangerous composite respectively.
const fieldAssignments=[];
for(let mask=0;mask<32;mask++){
  const f=Array.from({length:5},(_,i)=>(mask&(1<<i))?1:-1);
  const [L,H,P,S,N]=f;
  fieldAssignments.push({f,constraints:[L*H*P===1,S*P*N===1,S*L*H*N===-1]});
}
const allThree=fieldAssignments.filter(x=>x.constraints.every(Boolean));
assert.equal(allThree.length,0);

const dropping=[];
for(let drop=0;drop<3;drop++){
  const solutions=fieldAssignments.filter(x=>x.constraints.every((ok,i)=>i===drop||ok));
  dropping.push(solutions.length);
}
assert.deepEqual(dropping,[8,8,8]);

assert.equal(evidence.relationalCover.solutions,relationSolutions);
assert.equal(evidence.aggregateRank.solutions,aggregateSolutions);
assert.equal(evidence.joinedRelationalModel.solutions,32);
assert.equal(evidence.ordinaryFieldDescent.solutions,0);
assert.deepEqual(evidence.ordinaryFieldDescent.solutionsAfterDroppingEachCoreConstraint,dropping);
assert.equal(evidence.theorems.boundedRelationalModelSatisfiable,true);
assert.equal(evidence.theorems.ordinaryFieldParityDescentSatisfiable,false);
assert.equal(evidence.theorems.fullPhysicalPatiSalamEmbeddingEstablished,false);

assert.ok(relationWitness);
assert.ok(aggregateWitness);
console.log('PASS 1516: the joined bounded relational model has 32 witnesses, while ordinary five-field parity descent is UNSAT with an inclusion-minimal three-vertex core.');
