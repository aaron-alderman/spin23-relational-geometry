import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-sector-reflection-leakage-naturalness.json','utf8'));

const mul=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((row,i)=>row.map((x,j)=>x+B[i][j]));
const scale=(s,A)=>A.map(row=>row.map(x=>s*x));

const Z=[[0,0],[0,1]];
const I=[[1,0],[0,1]];
const Gamma=add(I,scale(-2,Z));

for(const a of [-1,0,2]){
  for(const b of [-3,-1,0,1,4]){
    for(const c of [-2,0,3]){
      const K=[[a,b],[b,c]];
      const reflected=mul(mul(Gamma,K),Gamma);
      const reflectedB=b===0 ? 0 : -b;
      assert.deepEqual(reflected,[[a,reflectedB],[reflectedB,c]]);
      const even=scale(0.5,add(K,reflected));
      const odd=scale(0.5,add(K,scale(-1,reflected)));
      assert.deepEqual(even,[[a,0],[0,c]]);
      assert.deepEqual(odd,[[0,b],[b,0]]);
    }
  }
}

// In one real leakage direction, sector reflection b -> -b keeps exactly
// the even monomials through quartic order.
const degrees=[0,1,2,3,4];
const parityEven=degrees.filter(n=>n%2===0);
const parityOdd=degrees.filter(n=>n%2===1);
assert.deepEqual(parityEven,[0,2,4]);
assert.deepEqual(parityOdd,[1,3]);

// A permitted source displaces the positive quadratic minimum exactly.
const m2=5;
const j=[2,-3];
const minimum=j.map(x=>-x/m2);
const potential=x=>m2*(x[0]**2+x[1]**2)+2*(j[0]*x[0]+j[1]*x[1]);
assert.deepEqual(minimum,[-0.4,0.6]);
assert.ok(Math.abs(potential(minimum)+13/5)<1e-12);
assert.ok(potential(minimum)<potential([0,0]));

assert.equal(evidence.theorem.commonChargeForbidsLinearSource,false);
assert.equal(evidence.theorem.sectorReflectionForbidsOddLeakageTerms,true);
assert.equal(evidence.theorem.positiveMassAloneGuaranteesExactMaskWithSources,false);
assert.equal(evidence.polynomialAudit.evenMonomialsThroughQuartic,3);
assert.equal(evidence.polynomialAudit.oddMonomialsForbidden,2);

console.log('PASS 1503: Gamma=I-2Z fixes diagonal transport and flips leakage; it removes the two odd monomials through quartic order, while a permitted current displaces the positive-mass minimum by B=-J/m^2.');
