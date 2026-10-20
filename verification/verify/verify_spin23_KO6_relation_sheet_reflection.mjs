import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-KO6-relation-sheet-reflection.json','utf8'));

const states=['PN','IN','IP','SP','NP','NI','PI','PS'];
const sheetA=['PN','IN','IP','SP'];
const sheetB=['NP','NI','PI','PS'];
const J={PN:'NP',IN:'NI',IP:'PI',SP:'PS',NP:'PN',NI:'IN',PI:'IP',PS:'SP'};
const allowedEdges=[
  ['PN','IN'],['IN','IP'],['IP','SP'],
  ['NP','NI'],['NI','PI'],['PI','PS'],
];
const dangerousEdges=[['PN','NP'],['PN','NI']]; // two orientable D_N anchor choices
const chirality={PN:1,IN:-1,IP:1,SP:-1,NP:-1,NI:1,PI:-1,PS:1};

const assignments=[];
for(let mask=0;mask<2**states.length;mask++){
  const sign={};
  states.forEach((v,i)=>{sign[v]=(mask&(1<<i)) ? 1 : -1;});
  assignments.push(sign);
}

const preservesAllowed=s=>allowedEdges.every(([u,v])=>s[u]*s[v]===1);
const antiCommutesJ=s=>states.every(v=>s[J[v]]===-s[v]);
const dangerousOdd=s=>dangerousEdges.every(([u,v])=>s[u]*s[v]===-1);

const edgePreserving=assignments.filter(preservesAllowed);
const realOdd=edgePreserving.filter(antiCommutesJ);
const fullyProtecting=realOdd.filter(dangerousOdd);

assert.equal(assignments.length,256);
assert.equal(edgePreserving.length,4);
assert.equal(realOdd.length,2);
assert.equal(fullyProtecting.length,2);

const witness=Object.fromEntries([...sheetA.map(v=>[v,1]),...sheetB.map(v=>[v,-1])]);
assert.equal(preservesAllowed(witness),true);
assert.equal(antiCommutesJ(witness),true);
assert.equal(dangerousOdd(witness),true);

// Both gradings are diagonal, hence commute.  The listed KO-6 chirality
// reverses under J, while relation-sheet parity also reverses under J.
for(const v of states){
  assert.equal(chirality[J[v]],-chirality[v]);
  assert.equal(witness[J[v]],-witness[v]);
  assert.equal(chirality[v]*witness[v],witness[v]*chirality[v]);
}

// The desired Majorana and safe Dirac edges are even.
assert.equal(witness.PI*witness.NI,1);
assert.equal(witness.PN*witness.IN,1);

assert.equal(evidence.enumeration.allDiagonalInvolutions,256);
assert.equal(evidence.enumeration.preserveAllAllowedEdges,4);
assert.equal(evidence.enumeration.alsoAnticommuteWithJ,2);
assert.equal(evidence.enumeration.alsoMakeDangerousDiracEdgesOdd,2);
assert.equal(evidence.theorem.uniqueNontrivialReflectionUpToSign,true);

console.log('PASS 1505: among 256 diagonal involutions, exactly two (overall-sign partners) preserve all six path edges, anticommute with J, and make both orientable dangerous Dirac anchors odd.');
