import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';

const r=JSON.parse(fs.readFileSync('evidence/data/t1-t2-action-mass-gap-audit-v1.json','utf8'));
for(const [p,hash] of Object.entries(r.sources))
 assert.equal(crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex'),hash,p);
const add=(A,B)=>A.map((row,i)=>row.map((x,j)=>x+B[i][j]));
const scale=(a,A)=>A.map(row=>row.map(x=>a*x));
const mul=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s+x*B[k][j],0)));
const maxAbs=A=>Math.max(...A.flat().map(Math.abs));
const close=(A,B)=>assert(maxAbs(add(A,scale(-1,B)))<1e-11);
const I=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>+(i===j)));
function block(M){const a=M.length,b=M[0].length;
 return Array.from({length:a+b},(_,i)=>Array.from({length:a+b},(_,j)=>
  i<a&&j>=a?M[i][j-a]:i>=a&&j<a?M[j][i-a]:0));}
const grading=(a,b)=>I(a+b).map((row,i)=>row.map(x=>i<a?x:-x));
// Arbitrary unequal singular values: anticommutation does not imply B^2=Delta^2 I.
for(const M of [[[1,2],[3,5]],[[1,0],[0,2]],[[1,2],[3,4],[5,6]]]){
 const B=block(M),A=grading(M.length,M[0].length),B2=mul(B,B);
 assert(maxAbs(add(mul(A,B),mul(B,A)))===0);
 for(const p of [-2,-.25,0,.7,3]){
  const H=add(scale(p,A),B);
  close(mul(H,H),add(scale(p*p,I(H.length)),B2));
 }
}
const nonscalar=mul(block([[1,0],[0,2]]),block([[1,0],[0,2]]));
assert.notEqual(nonscalar[0][0],nonscalar[1][1]);
// The unpaired row is a literal zero eigenvector in the 8+7 example.
const M87=Array.from({length:8},(_,i)=>Array.from({length:7},(_,j)=>i===j?j+1:0));
const B87=block(M87);assert(B87.every(row=>row[7]===0));
// A symmetry-allowed diagonal offset can close the zero-energy gap entirely.
const A=grading(1,1),B=block([[1]]),offset=I(2);
assert(maxAbs(add(mul(A,add(B,offset)),mul(add(B,offset),A)))>0);
const H0=add(B,offset);assert.equal(H0[0][0]*H0[1][1]-H0[0][1]*H0[1][0],0);
// Independently check stationary scalar vacuum, Hessian and positive Dirac branch.
const p=r.classicalUniformActionCounterfamily.parameters;
for(const row of r.classicalUniformActionCounterfamily.rows){
 assert(Math.abs(-(p.mu**2)*row.v+p.lambda*row.v**3)<1e-12);
 assert.equal((-(p.mu**2)+3*p.lambda*row.v**2)/p.Zphi,row.scalarFrequencySquared);
 const mass=row.y*row.v/p.Zpsi;
 for(const momentum of [-3,0,2]){
  const H=add(scale(momentum,A),scale(mass,block([[1]])));
  close(mul(H,H),scale(momentum**2+row.restGap**2,I(2)));
 }
}
const [zero,one,two]=r.classicalUniformActionCounterfamily.rows;
assert.equal(zero.restGap,0);assert(one.restGap>0);assert.equal(two.restGap,2*one.restGap);
assert.equal(one.scalarFrequencySquared,two.scalarFrequencySquared);
assert.equal(r.corpusBranches.scalarWall341.fullWallSpectrumHasZeroMode,true);
assert.equal(r.corpusBranches.minimalSpin23Action1596.additionalMassiveVacuumPoles,0);
assert.equal(r.verdict.anticommutingPhysicalT1T2OperatorsDerived,false);
assert.equal(r.verdict.positivePhysicalT1T2RestGapDerived,false);
assert.equal(r.verdict.gapMagnitudePredictedWithoutFreeCoupling,false);
const receipt=JSON.parse(fs.readFileSync(r.sourceVerificationReceipt,'utf8'));
assert.equal(receipt.checks.length,6);assert(receipt.checks.every(x=>x.exitCode===0));
console.log(JSON.stringify({passed:true,checks:['source hashes and archived execution receipts',
 'cross-sector anticommutation for square and rectangular blocks','dispersion square',
 'anticommutation does not force equal masses','8+7 unmatched zero',
 'diagonal-term gap-closing counterexample','vacuum and canonical-curvature calculation',
 'fixed-normalization Yukawa family changes gap','bulk versus wall and physical-status boundaries'],
 scope:'Conditional operator/action audit; no physical T1/T2 intertwiner or parameter-free mass prediction'},null,2));
