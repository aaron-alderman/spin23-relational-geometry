import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const prior=JSON.parse(readFileSync(
  'evidence/data/spin23-six-character-sixteen-state-gauge-higgs-mass-audit.json','utf8'));
const catalog=JSON.parse(readFileSync(
  'evidence/data/spin23-six-link-renormalizable-phase-monomials.json','utf8'));
const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-six-link-renormalizable-potential-vacuum-audit.json','utf8'));
assert.equal(evidence.schema,'spin23.six-link-renormalizable-potential-vacuum-audit/1');
assert.equal(catalog.schema,'spin23.six-link-renormalizable-phase-monomials/1');

const names=evidence.fields.map(x=>x.name);
const charges=evidence.fields.map(x=>x.charge);
assert.deepEqual(names,catalog.fieldOrder);
assert.deepEqual(charges,catalog.charges);

function compositions(n,k,prefix=[],out=[]){
  if(n===1){out.push([...prefix,k]);return out;}
  for(let i=0;i<=k;i++)compositions(n-1,k-i,[...prefix,i],out);
  return out;
}
function enumerate(degree,Q){
  const out=[];
  for(let h=0;h<=degree;h++)for(const holomorphic of compositions(Q.length,h))
    for(const antiholomorphic of compositions(Q.length,degree-h)){
      const phaseVector=holomorphic.map((x,i)=>x-antiholomorphic[i]);
      if(phaseVector.every(x=>x===0))continue;
      const totalCharge=Q[0].map((_,j)=>phaseVector.reduce((s,x,i)=>s+x*Q[i][j],0));
      if(totalCharge.some(x=>x!==0))continue;
      const key=holomorphic.join(',')+'|'+antiholomorphic.join(',');
      const conjugateKey=antiholomorphic.join(',')+'|'+holomorphic.join(',');
      if(key>conjugateKey)continue;
      out.push({holomorphic,antiholomorphic,phaseVector});
    }
  return out;
}
for(let d=1;d<=4;d++){
  const actual=enumerate(d,charges);
  assert.equal(actual.length,evidence.renormalizableEnumeration.phaseSensitiveClassesByDegree[String(d)]);
  if(d===2)assert.deepEqual(actual,catalog.degree2);
  if(d===4)assert.deepEqual(actual,catalog.degree4);
}
assert.equal(catalog.degree2.length,7);
assert.equal(catalog.degree4.length,76);

function rank(M){
  const A=M.map(r=>r.map(Number));let r=0;
  for(let c=0;c<A[0].length&&r<A.length;c++){
    let p=r;while(p<A.length&&Math.abs(A[p][c])<1e-12)p++;
    if(p===A.length)continue;
    [A[p],A[r]]=[A[r],A[p]];
    const z=A[r][c];A[r]=A[r].map(x=>x/z);
    for(let i=0;i<A.length;i++)if(i!==r){const f=A[i][c];A[i]=A[i].map((x,j)=>x-f*A[r][j]);}
    r++;
  }
  return r;
}
const phaseRows=catalog.degree2.map(x=>x.phaseVector);
assert.equal(rank(phaseRows),4);
assert.equal(6-rank(phaseRows),2);
assert.equal(evidence.continuousRephasingAudit.genericAccidentalContinuousDimensionBeyondGauge,0);

// A saturated four-row subset of the quadratic exponent lattice has Smith
// factors (1,1,1,1), so no hidden discrete phase quotient is being counted
// as a continuous locking condition.
const lockRows=[
  [-1,1,0,0,0,0],
  [0,0,0,-1,1,0],
  [1,0,0,1,0,0],
  [0,0,1,0,0,1]
];
assert.equal(rank(lockRows),4);
const gcd=(a,b)=>b===0?Math.abs(a):gcd(b,a%b);
const determinant=M=>M.length===0?1:M[0].reduce((s,x,j)=>s+(j%2===0?1:-1)*x*
  determinant(M.slice(1).map(r=>r.filter((_,k)=>k!==j))),0);
const choose=(n,k,start=0,prefix=[],out=[])=>{
  if(prefix.length===k){out.push(prefix);return out;}
  for(let i=start;i<n;i++)choose(n,k,i+1,[...prefix,i],out);
  return out;
};
for(let k=1;k<=4;k++){
  const minors=[];
  for(const rs of choose(4,k))for(const cs of choose(6,k))
    minors.push(determinant(rs.map(i=>cs.map(j=>lockRows[i][j]))));
  assert.equal(minors.reduce(gcd,0),1);
}

// At the all-one vacuum, the witness potential is a sum of squares whose
// vanishing-constraint Jacobian has rank ten. Thus H=2 J^T J has precisely
// two zero modes, and they are the gauge tangents.
// Real coordinates are xa,ya,xb,yb,xc,yc,xe,ye,xf,yf,xg,yg.
const J=[];
for(let i=0;i<6;i++){
  const row=Array(12).fill(0);row[2*i]=2;J.push(row);
}
const row=(entries)=>{const r=Array(12).fill(0);for(const [i,x] of entries)r[i]=x;return r;};
J.push(row([[0,1],[2,-1]]),row([[1,1],[3,-1]]));
J.push(row([[6,1],[8,-1]]),row([[7,1],[9,-1]]));
J.push(row([[0,1],[6,1]]),row([[1,1],[7,1]]));
J.push(row([[4,1],[10,1]]),row([[5,1],[11,1]]));
assert.equal(rank(J),10);
const gaugeX=[0,1,0,1,0,0,0,-1,0,-1,0,0];
const gaugeY=[0,0,0,0,0,-1,0,0,0,0,0,1];
for(const v of [gaugeX,gaugeY])assert.ok(J.every(r=>r.reduce((s,x,i)=>s+x*v[i],0)===0));
assert.equal(evidence.stableVacuumWitness.hessianKernelDimension,2);
assert.equal(evidence.stableVacuumWitness.positiveDefiniteOnGaugeQuotient,true);

// The all-one link vacuum reproduces the all-unit edge matrix already
// certified for the sixteen-state repair.
assert.equal(prior.massGapAndParity.unitWeightDiracDeterminant,1);
assert.equal(evidence.stableVacuumWitness.D16Determinant,1);
assert.equal(evidence.stableVacuumWitness.allRequiredChargedVevsNonzero,true);

// Minimal repeated-charge field identification leaves four fields. Its
// exact monomial counts and quotient Hessian are independently checked.
const identifiedCharges=[[1,0],[-1,0],[0,-1],[0,1]];
assert.deepEqual([1,2,3,4].map(d=>enumerate(d,identifiedCharges).length),[0,2,0,12]);
const Jid=[];
for(let i=0;i<4;i++){const r=Array(8).fill(0);r[2*i]=2;Jid.push(r);}
const rid=(entries)=>{const r=Array(8).fill(0);for(const [i,x] of entries)r[i]=x;return r;};
Jid.push(rid([[0,1],[2,1]]),rid([[1,1],[3,1]]));
Jid.push(rid([[4,1],[6,1]]),rid([[5,1],[7,1]]));
assert.equal(rank(Jid),6);
assert.equal(evidence.minimalRepeatedChargeIdentification.quotientHessianPositive,true);
assert.match(evidence.minimalRepeatedChargeIdentification.independentYukawaDecision,/does not equate/);
assert.match(evidence.minimalRepeatedChargeIdentification.commonRayDecision,/no common/);
assert.match(evidence.physicalBoundary.nZXFullSchurProtection,/UNDERDETERMINED/);

console.log('PASS 1542: the distinct six-link theory has exactly 7 quadratic and 76 quartic phase-sensitive renormalizable classes; generic quadratic terms remove all accidental continuous rephasings beyond gauge, and an explicit open stable all-nonzero vacuum fully Higgses U(1)^2 while keeping det(D16)=1. Identifying repeated-charge fields remains viable with independent edge Yukawas but does not derive a common ray.');
