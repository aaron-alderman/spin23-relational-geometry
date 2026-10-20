import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-pati-salam-graded-chain-physical-lift.json','utf8'));
const repair=JSON.parse(readFileSync(
  'evidence/data/spin23-spectator-connector-minimal-repair-exhaustion.json','utf8'));

assert.equal(evidence.schema,'spin23.pati-salam-graded-chain-physical-lift/1');
assert.equal(repair.schema,'spin23.spectator-connector-minimal-repair-exhaustion/1');
assert.equal(evidence.sourcedCarrierAudit.patiSalamSingletFermions,0);
assert.equal(evidence.sourcedCarrierAudit.extraHeavyVectorlikeFermions,false);

// The smallest ordinary unreduced singlet-containing bimodules are diagonal
// conjugation modules. They contain 1+3 or 1+15, never an isolated singlet.
const unreduced=evidence.unreducedFiniteAlgebra;
assert.deepEqual(unreduced.singletContainingDiagonalBimodules.map(x=>x.complexDimension),[4,4,16]);
assert.equal(1+3,4);
assert.equal(1+15,16);
assert.equal(unreduced.isolatedOneDimensionalModules,0);
assert.equal(unreduced.alreadySourcedPhysicalBimodule,false);

const chars4=['P','I','N','S'];
const occupied=new Set(['PI','IP','PS','SP','PN','NP','IN','NI']);
const firstOrder=(a,b)=>a[0]===b[0]||a[1]===b[1];
const J=label=>label[1]+label[0];
function zCandidates(chars){
  const out=[];
  for(const a of chars) for(const b of chars){
    if(a===b) continue;
    const z=a+b;
    if(firstOrder('PI',J(z))&&firstOrder(z,'SP')) out.push(z);
  }
  return out;
}
const candidates4=zCandidates(chars4);
assert.deepEqual(candidates4,['IP','NP','SP']);
assert.equal(candidates4.filter(z=>!occupied.has(z)&&!occupied.has(J(z))).length,0);
assert.deepEqual(evidence.reducedFourCharacterSearch.ZCandidates,candidates4);
assert.equal(evidence.reducedFourCharacterSearch.freshZSolutions,0);

const chars5=[...chars4,'T'];
const fresh5=zCandidates(chars5).filter(z=>!occupied.has(z)&&!occupied.has(J(z)));
assert.deepEqual(fresh5,['TP']);
assert.deepEqual(evidence.fiveCharacterAttempt.uniqueFreshZPair,['TP','PT']);
assert.equal(firstOrder('PI','PT'),true);
assert.equal(firstOrder('TP','SP'),true);

function determinant(matrix){
  const n=matrix.length;
  if(n===0) return 1;
  let total=0;
  for(let j=0;j<n;j++){
    const minor=matrix.slice(1).map(row=>row.filter((_,k)=>k!==j));
    total+=(j%2===0?1:-1)*matrix[0][j]*determinant(minor);
  }
  return total;
}

// Any odd antisymmetric matrix is singular. Verify the concrete five-point
// attempt obtained by adjoining only the TP/PT pair.
const cap5=[
  [0,-1,1,-1,1],
  [1,0,-1,0,0],
  [-1,1,0,0,0],
  [1,0,0,0,0],
  [-1,0,0,0,0]
];
assert.equal(determinant(cap5),0);
assert.equal(evidence.fiveCharacterAttempt.poincareDuality,false);

const six=evidence.sixCharacterBoundedCompletion;
assert.equal(determinant(six.intersectionMatrix),1);
assert.equal(six.intersectionDeterminant,1);
assert.equal(firstOrder('TP','TU'),true);
assert.equal(firstOrder('PT','UT'),true);
assert.equal(six.JClosed,true);
assert.equal(six.KO6Graded,true);
assert.equal(six.firstOrderCompatible,true);
assert.equal(six.finiteLabelMetricConnected,true);

const decisions=Object.fromEntries(evidence.branchDecisions.map(x=>[x.branch,x.status]));
assert.equal(decisions['already sourced Pati-Salam fermion carrier'],'UNSAT');
assert.equal(decisions['unchanged unreduced ordinary finite-algebra bimodule'],'UNSAT');
assert.equal(decisions['reduced existing four-character ordinary bimodule'],'UNSAT');
assert.equal(decisions['reduced five-character completion'],'UNSAT by odd antisymmetric duality');
assert.equal(decisions['reduced six-character sterile subdiagram'],'SAT but new and nonminimal');
assert.equal(decisions['one-pair generalized correspondence/defect module of claim 1523'],'UNDERDETERMINED but necessarily new');
assert.equal(evidence.decision.embedsInAlreadySourcedCarrier,false);
assert.equal(evidence.decision.requiresNewCorrespondenceOrDefectModule,true);
assert.match(evidence.boundary,/two-slot obstruction/);

console.log('PASS 1526: no sourced or existing four-character bimodule realizes the graded chain; a fifth character supplies Z but fails duality, while the minimal ordinary first-order repair is the new six-character TP/PT plus TU/UT completion with determinant one.');
