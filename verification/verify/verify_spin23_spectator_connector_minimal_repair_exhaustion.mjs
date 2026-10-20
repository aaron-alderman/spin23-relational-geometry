import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-spectator-connector-minimal-repair-exhaustion.json','utf8'));
assert.equal(evidence.schema,'spin23.spectator-connector-minimal-repair-exhaustion/1');

function determinant(matrix){
  const n=matrix.length;
  if(n===0) return 1;
  if(n===1) return matrix[0][0];
  let total=0;
  for(let j=0;j<n;j++){
    const minor=matrix.slice(1).map(row=>row.filter((_,k)=>k!==j));
    total+=(j%2===0?1:-1)*matrix[0][j]*determinant(minor);
  }
  return total;
}

const repairs=Object.fromEntries(evidence.repairAudit.map(x=>[x.id,x.status]));
assert.equal(repairs['junk-trivial'],'UNSAT');
assert.equal(repairs['zero-vacuum-or-kinetic-only'],'UNSAT under same-operator physical connectedness');
assert.equal(repairs['direct-rank-one-Schur-block'],'UNSAT with exact relation-sheet parity');
assert.equal(repairs['one-intermediate-graded-chain'],'SAT at categorical signed-mass-graph level');

// A direct rank-one repair is algebraically possible: e M-m^2=0. It needs
// both endpoint diagonal terms, which the direct relation-sheet assignment
// makes odd. Verify the identity on complete outer-product packets.
for(const p of [-2,-1,1,2]) for(const q of [-2,-1,1,2]){
  const e=p*p, m=p*q, M=q*q;
  assert.equal(e*M-m*m,0);
}
// With no intermediate pair the general N-X complementary block has
// determinant e*M-m^2. For a nonzero connector, a zero determinant requires
// both diagonal coefficients to be nonzero; those are precisely the two
// relation-odd self terms in the direct Row-B assignment.
for(const e of [-2,-1,0,1,2]) for(const m of [-2,-1,1,2])
for(const M of [-2,-1,0,1,2]){
  if(e*M-m*m===0){
    assert.notEqual(e,0);
    assert.notEqual(M,0);
  }
}

const grading=evidence.minimalCategoricalRepair.grading;
// A symmetric Weyl coefficient u-v is a doubled-Hilbert edge u--Jv.
// Since J reverses KO-6 chirality, equal Weyl chiralities make that edge odd.
assert.equal(grading.weylRoles.N*(-grading.weylRoles.Z),-1);
assert.equal(grading.weylRoles.Z*(-grading.weylRoles.X),-1);
assert.equal(grading.JRoles.JN*grading.weylRoles.Z,-1);
assert.equal(grading.JRoles.JZ*grading.weylRoles.X,-1);
const parity=evidence.minimalCategoricalRepair.relationParity;
// J also reverses relation parity. Alternating Weyl-role parities therefore
// make the represented mass edges u--Jv relation-even.
assert.equal(parity.weylRoles.N*(-parity.weylRoles.Z),1);
assert.equal(parity.weylRoles.Z*(-parity.weylRoles.X),1);
assert.equal(parity.JRoles.JN*parity.weylRoles.Z,1);
assert.equal(parity.JRoles.JZ*parity.weylRoles.X,1);

// The abstract Weyl-role sign of X is retained, but X and JX exchange the
// spectator character slots. Relative to the direct witness, this reverses
// the KO-6 sign attached to that slot and hence flips the corresponding row
// and column of the four-character intersection form.
const cap=[
  [0,-1,1,1],
  [1,0,-1,0],
  [-1,1,0,0],
  [-1,0,0,0]
];
const flip=[1,1,1,-1];
const capReassigned=cap.map((row,i)=>row.map((v,j)=>flip[i]*v*flip[j]));
assert.equal(determinant(cap),1);
assert.equal(determinant(capReassigned),1);
assert.equal(evidence.minimalCategoricalRepair.fourCharacterIntersectionDeterminantAfterRelationReassignment,1);
assert.match(evidence.minimalCategoricalRepair.spectatorPairReassignment,/character slot is therefore reversed/);

// Exhaust the nonzero bounded integer witness family. The complementary
// N-Z-X chain always has a zero determinant, the full heavy matrix is
// invertible, and every required connector edge is nonzero.
const vals=[-2,-1,1,2];
let tested=0;
for(const a of vals) for(const x of vals) for(const y of vals)
for(const d of vals) for(const g of vals) for(const h of vals){
  const heavy=[
    [a,x,y,0,0],
    [x,d,0,0,0],
    [y,0,0,g,0],
    [0,0,g,0,h],
    [0,0,0,h,0]
  ];
  const complement=heavy.slice(1).map(row=>row.slice(1));
  const chain=complement.slice(1).map(row=>row.slice(1));
  assert.equal(determinant(chain),0);
  assert.equal(determinant(complement),0);
  assert.equal(determinant(heavy),d*y*y*h*h);
  assert.notEqual(determinant(heavy),0);
  // Explicit complementary zero mode (I,N,Z,X)=(0,h,0,-g).
  const nullVector=[0,h,0,-g];
  const image=complement.map(row=>row.reduce((s,v,j)=>s+v*nullVector[j],0));
  assert.deepEqual(image,[0,0,0,0]);
  tested++;
}
assert.equal(tested,4**6);
assert.equal(evidence.heavyMatrixRepair.selectedCofactor,0);
assert.equal(evidence.heavyMatrixRepair.fullDeterminant,'d*y^2*h^2');
assert.equal(evidence.heavyMatrixRepair.texturePreserved,true);
assert.match(evidence.heavyMatrixRepair.noExactZeroMode,/no quantitative lower mass bound/);

assert.equal(evidence.minimality.minimumExtraJPairOrbits,1);
assert.equal(evidence.minimality.minimumPrimitiveConnectorEdgeOrbits,2);
assert.equal(evidence.decision.categoricalSignedGraphStatus,'SAT');
assert.equal(evidence.decision.physicalPatiSalamFiniteTripleStatus,'UNDERDETERMINED');
assert.match(evidence.boundary,/minimality statement is restricted/i);
assert.match(evidence.boundary,/not an ordinary module/);

console.log(`PASS 1523: junk, zero-vacuum, and direct parity-compatible Schur repairs fail; one extra J-pair and the graded N--Z--X chain preserve connectedness and the selected cofactor in all ${tested} bounded nonzero witnesses.`);
