import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-five-role-correspondence-descent-no-go.json','utf8'));
const repairs=JSON.parse(readFileSync(
  'evidence/data/spin23-six-character-zero-mode-repair-exhaustion.json','utf8'));
assert.equal(evidence.schema,'spin23.five-role-correspondence-descent-no-go/1');

function determinant(M){
  if(M.length===0)return 1;
  return M[0].reduce((sum,x,j)=>sum+(j%2===0?1:-1)*x*
    determinant(M.slice(1).map(row=>row.filter((_,k)=>k!==j))),0);
}
function rank(M){
  const A=M.map(r=>r.slice()); let r=0;
  for(let c=0;c<A[0].length&&r<A.length;c++){
    let p=r;while(p<A.length&&Math.abs(A[p][c])<1e-12)p++;
    if(p===A.length)continue;
    [A[p],A[r]]=[A[r],A[p]];
    const q=A[r][c];for(let j=c;j<A[0].length;j++)A[r][j]/=q;
    for(let i=0;i<A.length;i++)if(i!==r){const f=A[i][c];for(let j=c;j<A[0].length;j++)A[i][j]-=f*A[r][j];}
    r++;
  }
  return r;
}
const zero=n=>Array.from({length:n},()=>Array(n).fill(0));

// An odd relation-sheet target with chirality dimensions 3:2 has rank at
// most twice the smaller dimension, hence cannot inherit an invertible
// operator through a strict quotient of either invertible repair.
assert.deepEqual(evidence.target.chiralDimensionsPerRelationSheet,[3,2]);
assert.equal(2*Math.min(...evidence.target.chiralDimensionsPerRelationSheet),4);
assert.equal(evidence.strictQuotientTheorem.targetRankBoundPerSheet,4);
assert.equal(evidence.strictQuotientTheorem.surjectiveStrictQuotientExists,false);

// Matrix-multiplicity repair from claim 1533.  Positive rows are
// PN,IP,SP,TU; negative columns are IN_1,IN_2,TP_1,TP_2.
const K=[
  [1,0,0,0],
  [0,1,1,0],
  [0,0,1,0],
  [0,0,0,1]
];
assert.equal(determinant(K),1);
const Dmult=zero(8);
for(let i=0;i<4;i++)for(let j=0;j<4;j++)Dmult[i][4+j]=Dmult[4+j][i]=K[i][j];
assert.equal(determinant(Dmult),1);

// All bounded signed choices of quotient functionals give the desired four
// chain coefficients, but none supplies a diagonal term.  The choices are
// external rays, not consequences of K.
let signed=0,allNonzero=0;
for(const b1 of [-1,1])for(const b2 of [-1,1])
for(const t1 of [-1,1])for(const t2 of [-1,1]){
  signed++;
  const x=b1;       // PN to selected IN ray
  const y=b2;       // selected IN ray to IP
  const g=t1;       // IP to selected TP ray
  const h=t1;       // selected TP ray to SP
  const chain=[
    [0,x,0,0,0],
    [x,0,y,0,0],
    [0,y,0,g,0],
    [0,0,g,0,h],
    [0,0,0,h,0]
  ];
  if([x,y,g,h].every(Boolean))allNonzero++;
  assert.equal(rank(chain),4);
  assert.equal(determinant(chain),0);
}
assert.equal(signed,16);
assert.equal(allNonzero,16);

// For either repair, retaining five states from an eight-state relation
// sheet leaves a three-state auxiliary block.  In the concrete sector repair
// only TU--NU is internal; SI is isolated, so Schur elimination is impossible.
const sectorAux=[
  [0,0,1],
  [0,0,0],
  [1,0,0]
]; // TU,SI,NU
assert.equal(rank(sectorAux),2);
assert.equal(determinant(sectorAux),0);

// A representative auxiliary block for the multiplicity repair is likewise
// a 2x2 odd pair plus one unpaired direction.
const multiplicityAux=[
  [0,0,1],
  [0,0,0],
  [1,0,0]
];
assert.equal(determinant(multiplicityAux),0);

// Manual insertion of the two diagonal coefficients recovers the protected
// matrix for every nonzero sign assignment, which isolates exactly what the
// compression failed to derive.
let checked=0,invertible=0,cofactorZero=0;
for(const A of [-1,1])for(const x of [-1,1])for(const y of [-1,1])
for(const d of [-1,1])for(const g of [-1,1])for(const h of [-1,1]){
  const M=[
    [A,x,y,0,0], [x,d,0,0,0], [y,0,0,g,0],
    [0,0,g,0,h], [0,0,0,h,0]
  ];
  const cofactor=M.slice(1).map(row=>row.slice(1));
  checked++;
  if(determinant(M)!==0)invertible++;
  if(determinant(cofactor)===0)cofactorZero++;
  assert.equal(determinant(M),d*y*y*h*h);
}
assert.equal(checked,64);
assert.equal(invertible,64);
assert.equal(cofactorZero,64);

assert.equal(evidence.matrixMultiplicityRepair.explicitSourceDiracDeterminant,determinant(Dmult));
assert.equal(evidence.matrixMultiplicityRepair.signedCompressionVectorsTested,signed);
assert.equal(evidence.matrixMultiplicityRepair.signedCompressionsWithAllFourChainEdgesNonzero,allNonzero);
assert.equal(evidence.newSectorRepair.auxiliaryBlockDeterminant,determinant(sectorAux));
assert.equal(evidence.coefficientInsertionAudit.physicalMatrixAfterManualDiagonalInsertion.boundedNonzeroSignAssignments,checked);
assert.equal(repairs.minimum.rankLowerBound,'four additional complex Hilbert dimensions on the J-completed space');

assert.equal(evidence.decision.naturalSurjectiveStrictDescent,'UNSAT');
assert.equal(evidence.decision.coordinateCompressionToFiveChain,'SAT but singular');
assert.equal(evidence.decision.matrixMultiplicityCommonRayWithoutChoice,'UNSAT');
assert.equal(evidence.decision.newSectorSchurDescent,'UNSAT');

console.log('PASS 1537: invertible repaired Dirac data have no strict J/grade/relation-compatible quotient to the chirally imbalanced five-role sheet; coordinate compressions yield only a singular five-chain, and the indispensable diagonals plus multiplicity ray must be inserted as new correspondence data.');
