import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-common-coefficient-line-rg-invariance.json','utf8'));
assert.equal(evidence.schema,'spin23.common-coefficient-line-rg-invariance/1');

const det=(u,v)=>u[0]*v[1]-u[1]*v[0];
const add=(u,v)=>u.map((x,i)=>x+v[i]);
const scale=(a,u)=>u.map(x=>a*x);
const mv=(A,v)=>A.map(row=>row.reduce((s,x,j)=>s+x*v[j],0));
const subM=(A,B)=>A.map((row,i)=>row.map((x,j)=>x-B[i][j]));
const addScalarI=(A,a)=>A.map((row,i)=>row.map((x,j)=>x+(i===j?a:0)));
const mm=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s+x*B[k][j],0)));

function directMinorDerivative(c,Li,Lj,Ai,Aj,si=[0,0],sj=[0,0]){
  const ki=scale(Li,c),kj=scale(Lj,c);
  const bi=add(mv(Ai,ki),si),bj=add(mv(Aj,kj),sj);
  return det(bi,kj)+det(ki,bj);
}

function theoremMinorDerivative(c,Li,Lj,Ai,Aj,si=[0,0],sj=[0,0]){
  return Li*Lj*det(c,mv(subM(Aj,Ai),c))
    -Lj*det(c,si)+Li*det(c,sj);
}

// Exact theorem audit, including homogeneous mixing and additive poles.
const vals=[-1,0,1];
const matrices=[];
for(const a of vals)for(const b of vals)for(const q of vals)for(const d of vals)
  matrices.push([[a,b],[q,d]]);
const c=[1,1];
let identityFailures=0,fixedLineMatrices=0,tangentPairs=0;
for(const A of matrices){
  if(det(c,mv(A,c))===0)fixedLineMatrices++;
  for(const B of matrices){
    const direct=directMinorDerivative(c,2,-3,A,B,[1,-1],[-1,1]);
    const theorem=theoremMinorDerivative(c,2,-3,A,B,[1,-1],[-1,1]);
    if(direct!==theorem)identityFailures++;
    if(theoremMinorDerivative(c,1,1,A,B)===0)tangentPairs++;
  }
}
assert.deepEqual(evidence.finiteAudit.matrixEntryAlphabet,vals);
assert.deepEqual(evidence.finiteAudit.testRay,c);
assert.deepEqual(
  {matrixCount:matrices.length,fixedLineMatrices,orderedMatrixPairs:matrices.length**2,
    rankOneTangentPairs:tangentPairs,rankOneTransversePairs:matrices.length**2-tangentPairs,
    identityFailures},
  {
    matrixCount:evidence.finiteAudit.matrixCount,
    fixedLineMatrices:evidence.finiteAudit.fixedLineMatrices,
    orderedMatrixPairs:evidence.finiteAudit.orderedMatrixPairs,
    rankOneTangentPairs:evidence.finiteAudit.rankOneTangentPairs,
    rankOneTransversePairs:evidence.finiteAudit.rankOneTransversePairs,
    identityFailures:evidence.finiteAudit.identityFailures,
  },
);

// Riccati/projective beta function for every bounded mixing matrix and ratio.
for(const A of matrices)for(const r of [-2,-1,1,2]){
  const [a,b]=A[0], [q,d]=A[1];
  const beta=mv(A,[1,r]);
  const direct=beta[1]-r*beta[0];
  assert.equal(direct,q+(d-a)*r-b*r*r);
}

// A copy-dependent diagonal anomalous dimension is an exact counterexample.
const bad=evidence.minimalCountertermProxy.counterexample;
assert.equal(det(scale(bad.Lambdas[0],bad.c),scale(bad.Lambdas[1],bad.c)),bad.initialMinor);
assert.equal(
  directMinorDerivative(bad.c,...bad.Lambdas,bad.A1,bad.A2,bad.s1,bad.s2),
  bad.minorDerivative,
);

// A universal projective action preserves alignment even while its ray runs.
const running=evidence.minimalCountertermProxy.universalRunningRay;
const Ar1=addScalarI(running.A,running.columnScalarShifts[0]);
const Ar2=addScalarI(running.A,running.columnScalarShifts[1]);
assert.equal(directMinorDerivative(running.c,1,2,Ar1,Ar2),running.minorDerivative);
const [[ra,rb],[rq,rd]]=running.A;
assert.equal(rq+(rd-ra)-rb,running.ratioDerivativeAtR1);
assert.notEqual(running.ratioDerivativeAtR1,0);

// The Ward-positive proxy has a common eigenline, so the ratio is fixed.
const ward=evidence.minimalCountertermProxy.wardEigenline;
assert.deepEqual(mv(ward.A,ward.c),scale(ward.eigenvalue,ward.c));
const Aw1=addScalarI(ward.A,ward.columnScalarShifts[0]);
const Aw2=addScalarI(ward.A,ward.columnScalarShifts[1]);
assert.equal(directMinorDerivative(ward.c,1,2,Aw1,Aw2),ward.minorDerivative);
const [[wa,wb],[wq,wd]]=ward.A;
assert.equal(wq+(wd-wa)-wb,ward.ratioDerivativeAtR1);
assert.equal(ward.ratioDerivativeAtR1,0);

// An additive off-line pole violates alignment even when A_i are identical.
const additive=evidence.minimalCountertermProxy.additivePoleCounterexample;
assert.equal(
  directMinorDerivative(additive.c,...additive.Lambdas,
    additive.A1,additive.A2,additive.s1,additive.s2),
  additive.minorDerivative,
);
assert.notEqual(additive.minorDerivative,0);

// The formal exchange Z2 of claim 1528 is an exact Ward-positive case.
// Every counterterm matrix commuting with P has form [[u,v],[v,u]], so both
// exchange eigendirections are invariant. An invariant additive pole is on
// the selected eigendirection as well.
const P=evidence.wardClosureConditions.exchangeZ2Proxy.generator;
let commutingCount=0;
for(const A of matrices){
  if(JSON.stringify(mm(A,P))!==JSON.stringify(mm(P,A)))continue;
  commutingCount++;
  assert.equal(det([1,1],mv(A,[1,1])),0);
  assert.equal(det([1,-1],mv(A,[1,-1])),0);
}
assert.equal(commutingCount,9);
assert.equal(det([1,1],[3,3]),0);
assert.equal(det([1,-1],[3,-3]),0);

assert.equal(evidence.decision.treeLevelCommonSymbolSufficient,false);
assert.equal(evidence.decision.genericFixedRatioInvariant,false);
assert.equal(evidence.decision.genericMultiCopyAlignmentInvariant,false);
assert.match(evidence.decision.conditionalFixedRatio,/Ward eigenline/);
assert.match(evidence.verdict,/not generically RG invariant/);

console.log('PASS 1530: the exact projective-minor beta identity holds for all 6561 bounded anomalous-matrix pairs; 5454 are transverse on the test ray. Universal projective flow preserves a running common ray, while a fixed ratio requires a common Ward eigenline and no transverse additive pole.');
