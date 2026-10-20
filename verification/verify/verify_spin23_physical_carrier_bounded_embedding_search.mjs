import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-physical-carrier-bounded-embedding-search.json','utf8'));
const census=JSON.parse(readFileSync(
  'evidence/data/spin23-minimal-pati-salam-aggregate-intertwiner-census.json','utf8'));
const bounded=JSON.parse(readFileSync(
  'evidence/data/spin23-minimal-real-even-bounded-embedding-search.json','utf8'));

assert.equal(evidence.schema,'spin23.physical-carrier-bounded-embedding-search/1');
assert.equal(census.schema,'spin23.minimal-pati-salam-aggregate-intertwiner-census/1');
assert.equal(bounded.schema,'spin23.minimal-real-even-bounded-embedding-search/1');

const labels=['PN','IN','IP','SP','NP','NI','PI','PS'];
const sheet=new Map(labels.map((x,i)=>[x,i<4?1:-1]));
const J={PN:'NP',IN:'NI',IP:'PI',SP:'PS',NP:'PN',NI:'IN',PI:'IP',PS:'SP'};
const JPairOrbits=[['PN','NP'],['IN','NI'],['IP','PI'],['SP','PS']];
const allowed=new Set([
  ['PN','IN'],['IN','IP'],['IP','SP'],
  ['NP','NI'],['NI','PI'],['PI','PS']
].map(edgeKey));
const namedToyDangerous=new Set([['PN','NP'],['PN','NI']].map(edgeKey));
const physicalPairRoles=['L_P','R_P','R_N','X'];

function edgeKey([a,b]){return [a,b].sort().join('--');}
function* permutations(values){
  if(values.length<2){yield values; return;}
  for(let i=0;i<values.length;i++){
    const rest=values.slice(0,i).concat(values.slice(i+1));
    for(const tail of permutations(rest)) yield [values[i],...tail];
  }
}

let tested=0;
const solutions=[];
let exactNamedAnchorSolutions=0;
for(const orbitPermutation of permutations([0,1,2,3])){
  for(let orientations=0;orientations<16;orientations++){
    tested++;
    const map={};
    physicalPairRoles.forEach((role,i)=>{
      map[role]=JPairOrbits[orbitPermutation[i]][(orientations>>i)&1];
      map[`J${role}`]=J[map[role]];
    });
    const required=[
      ['L_P','R_P'],['JL_P','JR_P'],
      ['R_P','JR_N'],['JR_P','R_N'],
      ['JR_N','X'],['R_N','JX']
    ];
    if(!required.every(([a,b])=>allowed.has(edgeKey([map[a],map[b]])))) continue;
    assert.equal(new Set(required.map(([a,b])=>edgeKey([map[a],map[b]]))).size,6);
    const dangerous=edgeKey([map.L_P,map.R_N]);
    const Jdangerous=edgeKey([map.JL_P,map.JR_N]);
    assert.equal(sheet.get(map.L_P),-sheet.get(map.R_N));
    assert.equal(sheet.get(map.JL_P),-sheet.get(map.JR_N));
    assert.equal(allowed.has(dangerous),false);
    assert.equal(allowed.has(Jdangerous),false);
    if(namedToyDangerous.has(dangerous)) exactNamedAnchorSolutions++;
    solutions.push(map);
  }
}

assert.equal(tested,384);
assert.equal(solutions.length,4);
assert.equal(exactNamedAnchorSolutions,0);
assert.deepEqual(solutions[0],evidence.relationAssignmentSearch.witness);
assert.equal(evidence.relationAssignmentSearch.assignmentsTested,tested);
assert.equal(evidence.relationAssignmentSearch.solutions,solutions.length);
assert.equal(evidence.relationAssignmentSearch.allSolutionsMakeForbiddenDiracCrossSheet,true);
assert.equal(
  evidence.relationAssignmentSearch.solutionsMatchingTheTwoPreviouslyNamedToyDangerousAnchorPairs,
  exactNamedAnchorSolutions
);

// Claim 1512 reduces the physical minimal tree inventory to one selected
// mediator column. Every nonzero sign assignment to that 2 x 1 column has
// rank one, and there are no cross-column minors to impose.
assert.equal(census.boundedMaskedCompletion.aggregateColumnCount,1);
assert.equal(census.boundedMaskedCompletion.crossMediatorMinorCount,0);
let couplingAssignments=0;
let rankOneAssignments=0;
for(const d of [-1,1]) for(const y of [-1,1]){
  couplingAssignments++;
  if(d!==0||y!==0) rankOneAssignments++;
}
assert.equal(couplingAssignments,4);
assert.equal(rankOneAssignments,4);
assert.equal(evidence.aggregateHomSearch.retainedMediatorColumns,1);
assert.equal(evidence.aggregateHomSearch.minorCount,0);
assert.equal(evidence.aggregateHomSearch.rankOneAssignments,4);
assert.equal(
  evidence.vertexOrbits.find(x=>x.id==='reducible-schur-path').status,
  'graph-retained; physical Schur identification underdetermined'
);

// The relation-sheet involution still has its two overall-sign choices. The
// joined count now uses the derived one-column census, not the imposed
// three-column common-ray constraint of claim 1516.
const parityAssignments=2;
assert.equal(
  evidence.joinedRelationalCarrier.relationParityAssignmentsIncludingOverallSign,
  parityAssignments
);
const joined=solutions.length*parityAssignments*rankOneAssignments;
assert.equal(joined,32);
assert.equal(evidence.joinedRelationalCarrier.joinedWitnesses,joined);
assert.equal(evidence.joinedRelationalCarrier.status,'SAT at decorated relation-graph level');
assert.equal(bounded.theorems.fullPhysicalPatiSalamEmbeddingEstablished,false);

const decisions=Object.fromEntries(evidence.branchDecisions.map(x=>[x.branch,x.status]));
assert.equal(
  decisions['unchanged unreduced Pati-Salam algebra with literal four-character first-order lift'],
  'UNSAT'
);
assert.equal(
  decisions['reduced Standard-Model algebra direct-sum C^3 as universal family decoration'],
  'UNSAT'
);
assert.equal(decisions['ordinary unduplicated field Z2 descent'],'UNSAT');
assert.equal(
  decisions['commutant, normalizer, correspondence, Jordan, or generalized relation-module lift'],
  'UNDERDETERMINED'
);
assert.equal(evidence.minimalUnresolvedData.rows.length,2);
assert.deepEqual(
  evidence.minimalUnresolvedData.rows.map(x=>x.id),
  ['family-anchor-action','spectator-connector']
);
assert.equal(evidence.overallDecision.status,'UNDERDETERMINED');
assert.match(evidence.boundary,/not a full spectral-triple solver/);

console.log('PASS 1517: four J-equivariant physical-role lifts and the derived one-column census give 32 decorated relational witnesses; three ordinary realizations are UNSAT, while the full physical carrier remains UNDERDETERMINED by the family-action and spectator-connector rows.');
